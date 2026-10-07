/* Poeun cultural festival stations: one short, accessible interaction flow per story. */
(function () {
  const symbols = { wk: "♔", wq: "♕", wr: "♖", wb: "♗", wn: "♘", wp: "♙", bk: "♚", bq: "♛", br: "♜", bb: "♝", bn: "♞", bp: "♟" };
  const pieceNames = { k: "킹", q: "퀸", r: "룩", b: "비숍", n: "나이트", p: "폰" };
  const files = "abcdefgh";
  let disposeCurrent = () => {};

  function piecesFromFen(fen) {
    const pieces = {};
    String(fen || "").split(" ")[0].split("/").forEach((row, rowIndex) => {
      let file = 0;
      for (const char of row) {
        if (/\d/.test(char)) { file += Number(char); continue; }
        pieces[`${files[file]}${8 - rowIndex}`] = `${char === char.toUpperCase() ? "w" : "b"}${char.toLowerCase()}`;
        file += 1;
      }
    });
    return pieces;
  }

  function movePiece(pieces, uci, captureSquare) {
    const next = { ...pieces };
    const from = uci.slice(0, 2);
    const to = uci.slice(2, 4);
    if (!next[from]) return next;
    const moving = next[from];
    const enPassantSquare = moving?.[1] === "p" && from[0] !== to[0] && !next[to] ? `${to[0]}${from[1]}` : "";
    next[to] = moving;
    delete next[from];
    if (captureSquare || enPassantSquare) delete next[captureSquare || enPassantSquare];
    if (uci.length === 5) next[to] = `${next[to][0]}${uci[4]}`;
    return next;
  }

  function boardMarkup(pieces, selected, lastMove, interactive = false) {
    const cells = [];
    for (let rank = 8; rank >= 1; rank -= 1) {
      for (let file = 0; file < 8; file += 1) {
        const square = `${files[file]}${rank}`;
        const piece = pieces[square];
        const color = (rank + file) % 2 ? "light" : "dark";
        const label = `${square}, ${piece ? `${piece[0] === "w" ? "백" : "흑"} ${pieceNames[piece[1]]}` : "빈 칸"}`;
        const tag = interactive ? "button" : "span";
        cells.push(`<${tag} ${interactive ? 'type="button"' : 'aria-hidden="true"'} class="poeun-square ${color}${selected === square ? " is-selected" : ""}${lastMove?.includes(square) ? " is-last" : ""}" data-file-label="${rank === 1 ? files[file] : ""}" data-rank-label="${file === 0 ? rank : ""}" ${interactive ? `data-square="${square}" aria-label="${label}" aria-pressed="${selected === square}"` : ""}>${piece ? `<span aria-hidden="true">${symbols[piece]}</span>` : ""}</${tag}>`);
      }
    }
    return cells.join("");
  }

  function mount(container, station, { onComplete = () => {}, onBack = () => {}, onSignup = () => {}, completed = false, signedIn = false } = {}) {
    disposeCurrent();
    let phase = "hook";
    let exerciseIndex = 0;
    let pieces = {};
    let selected = "";
    let lastMove = "";
    let solved = false;
    let animationIndex = 0;
    const timers = new Set();
    const schedule = (fn, ms) => { const id = setTimeout(() => { timers.delete(id); fn(); }, ms); timers.add(id); return id; };
    const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
    disposeCurrent = clearTimers;

    const exercise = () => exerciseIndex === 0 ? station.tryIt : station.puzzles[exerciseIndex - 1];
    function renderFrame() {
      const stepLabels = ["시 한 구절", "개념 보기", "직접 두기", "3문제", "마무리"];
      const activeStep = phase === "hook" ? 0 : phase === "animation" ? 1 : phase === "exercise" ? (exerciseIndex ? 3 : 2) : 4;
      container.innerHTML = `<div class="poeun-station">
        <header class="poeun-station-header"><button type="button" class="poeun-back">← 스테이션 선택</button><span>포은문화제 · 단심이와 한 수</span><span class="poeun-time">약 90초</span></header>
        <ol class="poeun-steps" aria-label="체험 순서">${stepLabels.map((label, index) => `<li class="poeun-step${index === activeStep ? " is-current" : ""}${index < activeStep ? " is-done" : ""}"${index === activeStep ? ' aria-current="step"' : ""}>${label}</li>`).join("")}</ol>
        <div class="poeun-station-layout"><div class="poeun-mascot"><img src="/assets/poeun/dansimi.png" alt="갓과 붉은 망토를 입은 룩 캐릭터 단심이" width="330" height="330" /><p id="poeunMascotLine"></p></div><section class="poeun-panel" aria-live="polite"></section></div>
      </div>`;
      container.querySelector(".poeun-back").addEventListener("click", () => { clearTimers(); onBack(); });
    }

    function setMascot(text) { container.querySelector("#poeunMascotLine").textContent = text; }
    function panel() { return container.querySelector(".poeun-panel"); }
    function button(label, className, action) {
      const element = document.createElement("button");
      element.type = "button";
      element.className = className;
      element.textContent = label;
      element.addEventListener("click", action);
      return element;
    }
    function startAnimation() {
      clearTimers();
      phase = "animation";
      animationIndex = 0;
      pieces = piecesFromFen(station.animation.startFen);
      lastMove = "";
      renderFrame();
      setMascot("이 마음, 체스로 보면…");
      panel().innerHTML = `<span class="poeun-kicker">02 · 개념 애니메이션</span><h2>${station.title}</h2><p>${station.concept}</p><div class="poeun-board" role="group" aria-label="체스 규칙 시연"></div><p class="poeun-feedback" role="status">${station.message}</p><div class="poeun-actions"></div>`;
      const board = panel().querySelector(".poeun-board");
      const feedback = panel().querySelector(".poeun-feedback");
      const actions = panel().querySelector(".poeun-actions");
      board.innerHTML = boardMarkup(pieces, "", "");
      actions.append(button("시연 건너뛰고 직접 두기 →", "poeun-button secondary", () => { clearTimers(); startExercise(0); }));
      const steps = station.animation.steps;
      function playNext() {
        if (animationIndex >= steps.length) {
          feedback.textContent = `${station.message} 이제 직접 두어 보세요.`;
          actions.prepend(button("내가 한 수 두기 →", "poeun-button primary", () => { clearTimers(); startExercise(0); }));
          return;
        }
        const step = steps[animationIndex++];
        if (step.from && step.to) {
          pieces = movePiece(pieces, `${step.from}${step.to}`, step.captureSquare);
          lastMove = `${step.from}${step.to}`;
          board.innerHTML = boardMarkup(pieces, "", lastMove);
        }
        feedback.textContent = step.caption;
        schedule(playNext, step.durationMs || 4500);
      }
      schedule(playNext, 1800);
    }

    function startExercise(index) {
      clearTimers();
      phase = "exercise";
      exerciseIndex = index;
      solved = false;
      selected = "";
      lastMove = "";
      const item = exercise();
      pieces = piecesFromFen(item.fen);
      renderFrame();
      setMascot(index ? "한 수씩, 마음을 정해 보자!" : "이번엔 네가 직접 둬 봐!");
      const kicker = index ? `04 · 연습 ${index} / 3 · ${item.level}` : "03 · 직접 해보기";
      panel().innerHTML = `<span class="poeun-kicker">${kicker}</span><h2>${station.title}</h2><p>${item.prompt}</p><div class="poeun-board is-interactive" role="group" aria-label="클릭해서 기물을 움직이는 체스판"></div><p class="poeun-feedback" role="status">움직일 기물을 누르고 도착 칸을 누르세요.</p><div class="poeun-actions"></div>`;
      const board = panel().querySelector(".poeun-board");
      const feedback = panel().querySelector(".poeun-feedback");
      const actions = panel().querySelector(".poeun-actions");
      board.innerHTML = boardMarkup(pieces, selected, lastMove, true);
      actions.append(button("힌트 보기", "poeun-button secondary", () => { feedback.textContent = item.hint; }));
      board.addEventListener("click", (event) => {
        const square = event.target.closest("[data-square]")?.dataset.square;
        if (!square || solved) return;
        if (!selected) {
          if (!pieces[square]) { feedback.textContent = "먼저 움직일 기물을 선택해 주세요."; return; }
          selected = square;
          feedback.textContent = `${square}에서 어디로 움직일까요?`;
        } else if (selected === square) {
          selected = "";
        } else {
          const move = `${selected}${square}`;
          if (move !== item.answer.slice(0, 4)) {
            feedback.textContent = "다시 생각해 볼까요? 필요하면 힌트를 눌러 보세요.";
            selected = "";
          } else {
            pieces = movePiece(pieces, item.answer, item.captureSquare);
            lastMove = move;
            selected = "";
            solved = true;
            feedback.textContent = item.success;
            actions.innerHTML = "";
            actions.append(button(index === 3 ? "체험 마무리 →" : index === 0 ? "연습문제 시작 →" : "다음 문제 →", "poeun-button primary", () => index === 3 ? finish() : startExercise(index + 1)));
          }
        }
        board.innerHTML = boardMarkup(pieces, selected, lastMove, true);
      });
    }

    function finish() {
      clearTimers();
      phase = "finish";
      onComplete(station.slug);
      renderFrame();
      setMascot("멋진 한 수였어. 다음에도 함께 두자!");
      panel().innerHTML = `<span class="poeun-kicker">05 · 마무리</span><h2>${station.title} 완료!</h2><p>${station.message}</p><div class="poeun-cta"><strong>${signedIn ? "다음 스테이션도 이어서 두세요" : "다음에 이어서 두고 싶나요?"}</strong><p>${signedIn ? "완료 기록이 계정에 저장됩니다." : "계정을 만들면 포은 챕터의 완료 기록을 이어갈 수 있어요."}</p><div class="poeun-actions"></div></div>`;
      const actions = panel().querySelector(".poeun-actions");
      if (!signedIn) actions.append(button("무료로 가입하기", "poeun-button primary", onSignup));
      actions.append(button("다른 스테이션 보기", "poeun-button secondary", onBack));
    }

    function startHook() {
      phase = "hook";
      renderFrame();
      setMascot("이 마음, 체스로 보면…");
      panel().innerHTML = `<span class="poeun-kicker">01 · 시 한 구절</span><h2>${station.title}</h2><p class="poeun-typewriter" aria-label="${station.hook}"></p><small class="poeun-source">${station.source}</small><p>${station.line}</p><div class="poeun-actions"></div>`;
      const target = panel().querySelector(".poeun-typewriter");
      const text = station.hook;
      let cursor = 0;
      function typeNext() {
        target.textContent = text.slice(0, ++cursor);
        if (cursor < text.length) schedule(typeNext, 75);
      }
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) target.textContent = text;
      else schedule(typeNext, 250);
      panel().querySelector(".poeun-actions").append(button("체스판에서 보기 →", "poeun-button primary", startAnimation));
      if (completed) panel().querySelector(".poeun-actions").append(button("다시 풀기", "poeun-button secondary", () => startExercise(0)));
    }
    startHook();
    return clearTimers;
  }

  window.PoeunStationUI = { mount, dispose: () => disposeCurrent() };
})();
