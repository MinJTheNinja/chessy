const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "generated_models");
fs.mkdirSync(OUT, { recursive: true });

const CFG = {
  square: 24,
  margin: 10,
  tileHeight: 4,
  darkLift: 0,
  borderWidth: 1.6,
  borderHeight: 1.4,
  socket: 0,
  setupMarkHeight: 0.8,
  peg: 0,
  pegHeight: 0,
  magnetPocketDiameter: 10.2,
  magnetPocketDepth: 2.2,
  pieceSegments: 96,
};

function mesh(name) {
  return { name, tris: [] };
}

function tri(m, a, b, c) {
  m.tris.push([a, b, c]);
}

function normal(a, b, c) {
  const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
  const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
  const nx = uy * vz - uz * vy;
  const ny = uz * vx - ux * vz;
  const nz = ux * vy - uy * vx;
  const len = Math.hypot(nx, ny, nz) || 1;
  return [nx / len, ny / len, nz / len];
}

function addBox(m, x0, y0, z0, x1, y1, z1) {
  const v = [
    [x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0],
    [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1],
  ];
  const faces = [
    [0, 2, 1], [0, 3, 2],
    [4, 5, 6], [4, 6, 7],
    [0, 1, 5], [0, 5, 4],
    [1, 2, 6], [1, 6, 5],
    [2, 3, 7], [2, 7, 6],
    [3, 0, 4], [3, 4, 7],
  ];
  faces.forEach(f => tri(m, v[f[0]], v[f[1]], v[f[2]]));
}

function addRotBox(m, cx, cy, z0, len, width, height, angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  const pts = [
    [-len / 2, -width / 2], [len / 2, -width / 2],
    [len / 2, width / 2], [-len / 2, width / 2],
  ].map(([x, y]) => [cx + x * c - y * s, cy + x * s + y * c]);
  const v = pts.map(p => [p[0], p[1], z0]).concat(pts.map(p => [p[0], p[1], z0 + height]));
  [[0,2,1],[0,3,2],[4,5,6],[4,6,7],[0,1,5],[0,5,4],[1,2,6],[1,6,5],[2,3,7],[2,7,6],[3,0,4],[3,4,7]]
    .forEach(f => tri(m, v[f[0]], v[f[1]], v[f[2]]));
}

function addTriPrism(m, pts, z0, z1) {
  const bot = pts.map(p => [p[0], p[1], z0]);
  const top = pts.map(p => [p[0], p[1], z1]);
  tri(m, bot[0], bot[2], bot[1]);
  tri(m, top[0], top[1], top[2]);
  for (let i = 0; i < 3; i++) {
    const j = (i + 1) % 3;
    tri(m, bot[i], bot[j], top[j]);
    tri(m, bot[i], top[j], top[i]);
  }
}

function addArrow(m, cx, cy, z, length, width, height, angle, twoHead = false) {
  addRotBox(m, cx, cy, z, length - width * 2, width, height, angle);
  const c = Math.cos(angle), s = Math.sin(angle);
  const head = (dir) => {
    const tip = [cx + c * length / 2 * dir, cy + s * length / 2 * dir];
    const base = [cx + c * (length / 2 - width * 2) * dir, cy + s * (length / 2 - width * 2) * dir];
    const p = [-s * width * 1.35, c * width * 1.35];
    addTriPrism(m, [tip, [base[0] + p[0], base[1] + p[1]], [base[0] - p[0], base[1] - p[1]]], z, z + height);
  };
  head(1);
  if (twoHead) head(-1);
}

function addRing(m, z0, z1, outerR, innerR, seg = 72, cx = 0, cy = 0) {
  for (let i = 0; i < seg; i++) {
    const a0 = Math.PI * 2 * i / seg;
    const a1 = Math.PI * 2 * (i + 1) / seg;
    const o0 = [Math.cos(a0) * outerR, Math.sin(a0) * outerR];
    const o1 = [Math.cos(a1) * outerR, Math.sin(a1) * outerR];
    const n0 = [Math.cos(a0) * innerR, Math.sin(a0) * innerR];
    const n1 = [Math.cos(a1) * innerR, Math.sin(a1) * innerR];
    const P = p => [p[0] + cx, p[1] + cy];
    const po0 = P(o0), po1 = P(o1), pn0 = P(n0), pn1 = P(n1);
    tri(m, [po0[0], po0[1], z0], [po1[0], po1[1], z0], [pn1[0], pn1[1], z0]);
    tri(m, [po0[0], po0[1], z0], [pn1[0], pn1[1], z0], [pn0[0], pn0[1], z0]);
    tri(m, [po0[0], po0[1], z1], [pn1[0], pn1[1], z1], [po1[0], po1[1], z1]);
    tri(m, [po0[0], po0[1], z1], [pn0[0], pn0[1], z1], [pn1[0], pn1[1], z1]);
    tri(m, [po0[0], po0[1], z0], [po0[0], po0[1], z1], [po1[0], po1[1], z1]);
    tri(m, [po0[0], po0[1], z0], [po1[0], po1[1], z1], [po1[0], po1[1], z0]);
    tri(m, [pn0[0], pn0[1], z0], [pn1[0], pn1[1], z1], [pn0[0], pn0[1], z1]);
    tri(m, [pn0[0], pn0[1], z0], [pn1[0], pn1[1], z0], [pn1[0], pn1[1], z1]);
  }
}

function addCylinder(m, cx, cy, z0, z1, r, seg = 72) {
  for (let i = 0; i < seg; i++) {
    const a0 = Math.PI * 2 * i / seg;
    const a1 = Math.PI * 2 * (i + 1) / seg;
    const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r];
    const p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
    tri(m, [cx, cy, z0], [p1[0], p1[1], z0], [p0[0], p0[1], z0]);
    tri(m, [cx, cy, z1], [p0[0], p0[1], z1], [p1[0], p1[1], z1]);
    tri(m, [p0[0], p0[1], z0], [p1[0], p1[1], z0], [p1[0], p1[1], z1]);
    tri(m, [p0[0], p0[1], z0], [p1[0], p1[1], z1], [p0[0], p0[1], z1]);
  }
}

function addSphere(m, cx, cy, cz, r, seg = 48, rings = 24, scaleZ = 1) {
  for (let j = 0; j < rings; j++) {
    const t0 = Math.PI * j / rings;
    const t1 = Math.PI * (j + 1) / rings;
    for (let i = 0; i < seg; i++) {
      const a0 = Math.PI * 2 * i / seg;
      const a1 = Math.PI * 2 * (i + 1) / seg;
      const p = (t, a) => [
        cx + Math.sin(t) * Math.cos(a) * r,
        cy + Math.sin(t) * Math.sin(a) * r,
        cz + Math.cos(t) * r * scaleZ,
      ];
      tri(m, p(t0, a0), p(t1, a0), p(t1, a1));
      tri(m, p(t0, a0), p(t1, a1), p(t0, a1));
    }
  }
}

function addEllipsoid(m, cx, cy, cz, rx, ry, rz, seg = 48, rings = 24) {
  for (let j = 0; j < rings; j++) {
    const t0 = Math.PI * j / rings;
    const t1 = Math.PI * (j + 1) / rings;
    for (let i = 0; i < seg; i++) {
      const a0 = Math.PI * 2 * i / seg;
      const a1 = Math.PI * 2 * (i + 1) / seg;
      const p = (t, a) => [
        cx + Math.sin(t) * Math.cos(a) * rx,
        cy + Math.sin(t) * Math.sin(a) * ry,
        cz + Math.cos(t) * rz,
      ];
      tri(m, p(t0, a0), p(t1, a0), p(t1, a1));
      tri(m, p(t0, a0), p(t1, a1), p(t0, a1));
    }
  }
}

function addFrustum(m, cx, cy, z0, z1, r0, r1, seg = 48) {
  for (let i = 0; i < seg; i++) {
    const a0 = Math.PI * 2 * i / seg;
    const a1 = Math.PI * 2 * (i + 1) / seg;
    const b0 = [cx + Math.cos(a0) * r0, cy + Math.sin(a0) * r0, z0];
    const b1 = [cx + Math.cos(a1) * r0, cy + Math.sin(a1) * r0, z0];
    const t0 = [cx + Math.cos(a0) * r1, cy + Math.sin(a0) * r1, z1];
    const t1 = [cx + Math.cos(a1) * r1, cy + Math.sin(a1) * r1, z1];
    tri(m, b0, b1, t1);
    tri(m, b0, t1, t0);
    if (r0 > 0) tri(m, [cx, cy, z0], b1, b0);
    if (r1 > 0) tri(m, [cx, cy, z1], t0, t1);
  }
}

function translateNew(m, start, dx, dy, dz) {
  for (let ti = start; ti < m.tris.length; ti++) {
    m.tris[ti] = m.tris[ti].map(p => [p[0] + dx, p[1] + dy, p[2] + dz]);
  }
}

function writeStl(m, filename) {
  const lines = [`solid ${m.name}`];
  for (const t of m.tris) {
    const n = normal(t[0], t[1], t[2]);
    lines.push(` facet normal ${n[0].toFixed(6)} ${n[1].toFixed(6)} ${n[2].toFixed(6)}`, "  outer loop");
    t.forEach(p => lines.push(`   vertex ${p[0].toFixed(4)} ${p[1].toFixed(4)} ${p[2].toFixed(4)}`));
    lines.push("  endloop", " endfacet");
  }
  lines.push(`endsolid ${m.name}`);
  fs.writeFileSync(path.join(OUT, filename), lines.join("\n"));
}

function addSocketTile(m, x, y, z0, h, socket) {
  const s = CFG.square;
  const g = (s - socket) / 2;
  addBox(m, x, y, z0, x + g, y + s, z0 + h);
  addBox(m, x + s - g, y, z0, x + s, y + s, z0 + h);
  addBox(m, x + g, y, z0, x + s - g, y + g, z0 + h);
  addBox(m, x + g, y + s - g, z0, x + s - g, y + s, z0 + h);
}

function addSetupMark(m, cx, cy, z, type) {
  const h = CFG.setupMarkHeight, w = 1.25, L = 9;
  if (type === "rook") {
    addRotBox(m, cx, cy, z, L, w, h, 0); addRotBox(m, cx, cy, z, L, w, h, Math.PI / 2);
  } else if (type === "bishop") {
    addRotBox(m, cx, cy, z, L, w, h, Math.PI / 4); addRotBox(m, cx, cy, z, L, w, h, -Math.PI / 4);
  } else if (type === "knight") {
    addRotBox(m, cx - 2, cy, z, 8, w, h, Math.PI / 2); addRotBox(m, cx + 1.5, cy + 3.4, z, 7, w, h, 0);
  } else if (type === "queen") {
    addRotBox(m, cx, cy - 1, z, 8, w, h, 0); addRotBox(m, cx, cy + 1.8, z, 8, w, h, 0);
    addRotBox(m, cx - 3.2, cy, z, 5, w, h, Math.PI / 2); addRotBox(m, cx + 3.2, cy, z, 5, w, h, Math.PI / 2);
  } else if (type === "king") {
    addRotBox(m, cx, cy, z, L, w, h, 0); addRotBox(m, cx, cy, z, L, w, h, Math.PI / 2);
    addRotBox(m, cx, cy + 3.8, z, 5.5, w, h, 0);
  } else if (type === "pawn") {
    addRing(m, z, z + h, 3.2, 1.5, 36, cx, cy);
  }
}

function buildBoard() {
  const m = mesh("accessible_tactile_chess_board");
  const board = CFG.square * 8;
  const total = board + CFG.margin * 2;
  const start = -board / 2;
  addBox(m, -total / 2, -total / 2, 0, total / 2, total / 2, CFG.tileHeight);
  for (let i = 0; i <= 8; i++) {
    const p = start + i * CFG.square;
    addBox(m, p - CFG.borderWidth / 2, start, CFG.tileHeight, p + CFG.borderWidth / 2, start + board, CFG.tileHeight + CFG.borderHeight);
    addBox(m, start, p - CFG.borderWidth / 2, CFG.tileHeight, start + board, p + CFG.borderWidth / 2, CFG.tileHeight + CFG.borderHeight);
  }
  writeStl(m, "accessible_tactile_board_8x8.stl");
}

function radiusFor(profile, z) {
  for (let i = 0; i < profile.length - 1; i++) {
    const [z0, r0] = profile[i], [z1, r1] = profile[i + 1];
    if (z >= z0 && z <= z1) {
      const t = (z - z0) / (z1 - z0);
      return r0 + (r1 - r0) * (0.5 - Math.cos(t * Math.PI) / 2);
    }
  }
  return profile[profile.length - 1][1];
}

function addRevolvedPiece(m, profile, height, fluteDepth = 0.05) {
  const seg = CFG.pieceSegments, rings = 112;
  const verts = [];
  for (let iz = 0; iz <= rings; iz++) {
    const z = height * iz / rings;
    const baseR = radiusFor(profile, z);
    const row = [];
    const inGrip = z > height * 0.25 && z < height * 0.62;
    for (let i = 0; i < seg; i++) {
      const a = Math.PI * 2 * i / seg;
      const flute = inGrip ? 1 - fluteDepth * Math.pow((1 + Math.cos(a * 8)) / 2, 2) : 1;
      const r = baseR * flute;
      row.push([Math.cos(a) * r, Math.sin(a) * r, z]);
    }
    verts.push(row);
  }
  for (let iz = 0; iz < rings; iz++) {
    for (let i = 0; i < seg; i++) {
      const j = (i + 1) % seg;
      tri(m, verts[iz][i], verts[iz][j], verts[iz + 1][j]);
      tri(m, verts[iz][i], verts[iz + 1][j], verts[iz + 1][i]);
    }
  }
  const bottom = [0, 0, 0], top = [0, 0, height];
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    tri(m, bottom, verts[0][j], verts[0][i]);
    tri(m, top, verts[rings][i], verts[rings][j]);
  }
}

function addTopGuide(m, type, z) {
  const h = 0.45, len = 10, w = 0.75;
  if (type === "rook") {
    addArrow(m, 0, 0, z, len, w, h, 0, true); addArrow(m, 0, 0, z, len, w, h, Math.PI / 2, true);
  } else if (type === "bishop") {
    addArrow(m, 0, 0, z, len, w, h, Math.PI / 4, true); addArrow(m, 0, 0, z, len, w, h, -Math.PI / 4, true);
  } else if (type === "queen") {
    addArrow(m, 0, 0, z, 15, w, h, 0, true); addArrow(m, 0, 0, z, 15, w, h, Math.PI / 2, true);
    addArrow(m, 0, 0, z, 15, w, h, Math.PI / 4, true); addArrow(m, 0, 0, z, 15, w, h, -Math.PI / 4, true);
  } else if (type === "king") {
    addRotBox(m, 0, 0, z, 15, 1.7, h, 0); addRotBox(m, 0, 0, z, 15, 1.7, h, Math.PI / 2);
  } else if (type === "knight") {
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
      addRotBox(m, Math.cos(a) * 3, Math.sin(a) * 3, z, 9, w, h, a);
      addRotBox(m, Math.cos(a) * 6 - Math.sin(a) * 3, Math.sin(a) * 6 + Math.cos(a) * 3, z, 7, w, h, a + Math.PI / 2);
    }
  } else {
    addRing(m, z, z + h, 4.2, 1.8, 48);
  }
}

function addPegAndPocket(m) {
  // Flat bases are intentional so adhesive magnets can be attached after printing.
}

function pieceProfile(type, height, baseR, topR) {
  const profiles = {
    pawn: [[0, baseR], [2.5, baseR + 1], [5.5, baseR * 0.86], [height * 0.30, baseR * 0.50], [height * 0.62, baseR * 0.42], [height * 0.75, topR * 0.95], [height * 0.83, topR * 0.7]],
    rook: [[0, baseR], [3, baseR + 1.2], [7, baseR * 0.86], [height * 0.34, baseR * 0.48], [height * 0.68, baseR * 0.57], [height * 0.80, topR * 0.95], [height * 0.91, topR]],
    knight: [[0, baseR], [3, baseR + 1.2], [7, baseR * 0.86], [height * 0.30, baseR * 0.50], [height * 0.64, baseR * 0.48], [height * 0.78, topR * 0.80]],
    bishop: [[0, baseR], [3, baseR + 1.2], [7, baseR * 0.86], [height * 0.30, baseR * 0.50], [height * 0.62, baseR * 0.43], [height * 0.78, topR * 0.75], [height * 0.91, topR * 0.95]],
    queen: [[0, baseR], [3, baseR + 1.2], [7, baseR * 0.86], [height * 0.30, baseR * 0.50], [height * 0.64, baseR * 0.45], [height * 0.78, topR * 0.78], [height * 0.90, topR]],
    king: [[0, baseR], [3, baseR + 1.2], [7, baseR * 0.86], [height * 0.30, baseR * 0.50], [height * 0.64, baseR * 0.45], [height * 0.80, topR * 0.72], [height * 0.91, topR * 0.9]],
  };
  return profiles[type];
}

function addRookTop(m, h, r) {
  addCylinder(m, 0, 0, h * 0.82, h * 0.94, r * 0.92, 96);
  addRing(m, h * 0.93, h + 2.0, r * 1.08, r * 0.68, 96);
  for (let i = 0; i < 6; i++) {
    const a = Math.PI * 2 * i / 6;
    const x = Math.cos(a) * r * 0.82;
    const y = Math.sin(a) * r * 0.82;
    addRotBox(m, x, y, h + 1.6, r * 0.58, r * 0.34, 5.6, a);
  }
  addRing(m, h + 0.3, h + 0.9, r * 0.52, r * 0.26, 72);
}

function addBishopTop(m, h, r) {
  addSphere(m, 0, 0, h - 1.8, r * 0.95, 56, 24, 1.25);
  addRotBox(m, 0, -r * 0.16, h - r * 0.55, r * 1.8, 1.35, 2.2, Math.PI / 2.7);
  addSphere(m, 0, 0, h + r * 1.0, r * 0.22, 32, 12, 1);
}

function addQueenTop(m, h, r) {
  addFrustum(m, 0, 0, h * 0.84, h * 0.98, r * 0.70, r * 1.02, 96);
  addRing(m, h * 0.96, h + 1.2, r * 1.06, r * 0.42, 96);
  for (let i = 0; i < 8; i++) {
    const a = Math.PI * 2 * i / 8;
    const x = Math.cos(a) * r * 0.82;
    const y = Math.sin(a) * r * 0.82;
    addFrustum(m, x, y, h + 0.4, h + 7.6, 1.65, 0.25, 22);
    addSphere(m, x, y, h + 8.0, 1.55, 22, 12, 1);
  }
  addFrustum(m, 0, 0, h + 0.3, h + 9.2, 2.1, 0.35, 28);
  addSphere(m, 0, 0, h + 9.6, 1.8, 28, 14, 1);
}

function addKingTop(m, h, r) {
  addSphere(m, 0, 0, h - 0.7, r * 0.74, 64, 24, 0.85);
  addCylinder(m, 0, 0, h - 1.2, h + 1.0, r * 0.55, 72);
  addRotBox(m, 0, 0, h + 8.2, 14.5, 2.4, 2.9, 0);
  addRotBox(m, 0, 0, h + 2.0, 2.7, 2.7, 13.8, 0);
  addSphere(m, 0, 0, h + 1.7, 2.25, 32, 12, 0.55);
}

function addKnightTop(m, h, r) {
  addFrustum(m, 0, 0, h * 0.70, h * 0.86, r * 0.66, r * 0.46, 64);
  addEllipsoid(m, -1.8, 0, h + 1.4, r * 0.55, r * 0.46, r * 0.92, 52, 24);
  addEllipsoid(m, 2.0, 0, h + 7.5, r * 0.48, r * 0.42, r * 0.78, 52, 22);
  addEllipsoid(m, 6.0, 0, h + 5.3, r * 0.52, r * 0.34, r * 0.34, 40, 18);
  addFrustum(m, 8.4, 0, h + 4.3, h + 6.0, 2.2, 0.9, 28);
  addTriPrism(m, [[-1.6, -0.7], [1.4, -0.7], [0.1, 5.0]], h + 11.0, h + 14.4);
  addTriPrism(m, [[-1.4, 0.7], [1.5, 0.7], [0.0, -5.1]], h + 11.0, h + 14.2);
  addEllipsoid(m, 8.2, -1.45, h + 6.2, 0.55, 0.42, 0.55, 14, 8);
  addEllipsoid(m, 8.2, 1.45, h + 6.2, 0.55, 0.42, 0.55, 14, 8);
  addRotBox(m, 2.0, 0, h + 3.4, 6.2, 1.0, 1.0, -0.3);
}

function addPawnTop(m, h, r) {
  addSphere(m, 0, 0, h + r * 0.58, r * 0.72, 56, 24, 1);
}

function addClassicTop(m, type, height, topR) {
  if (type === "pawn") addPawnTop(m, height * 0.78, topR);
  if (type === "rook") addRookTop(m, height * 0.88, topR);
  if (type === "knight") addKnightTop(m, height * 0.76, topR);
  if (type === "bishop") addBishopTop(m, height * 0.86, topR);
  if (type === "queen") addQueenTop(m, height * 0.88, topR);
  if (type === "king") addKingTop(m, height * 0.88, topR);
}

function buildPiece(type, height, baseR, topR) {
  const m = mesh(`accessible_${type}`);
  const profile = pieceProfile(type, height, baseR, topR);
  addRevolvedPiece(m, profile, height, type === "pawn" ? 0.03 : 0.045);
  addClassicTop(m, type, height, topR);
  addPegAndPocket(m);
  writeStl(m, `accessible_${type}.stl`);
}

buildBoard();
buildPiece("pawn", 35, 8.5, 6.1);
buildPiece("rook", 43, 9.2, 7.8);
buildPiece("knight", 45, 9.2, 7.4);
buildPiece("bishop", 48, 9.2, 6.9);
buildPiece("queen", 54, 9.6, 8.1);
buildPiece("king", 58, 9.6, 7.8);

console.log(`Created STL files in ${OUT}`);
