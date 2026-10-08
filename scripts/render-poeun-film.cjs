const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || 'playwright-core');

const root = path.resolve(__dirname, '..');
const asset = name => `data:image/png;base64,${fs.readFileSync(path.join(root, 'assets/poeun', name)).toString('base64')}`;
const english = process.argv.includes('--english');
const koreanScenes = [
  ['scene-osang.png', '포은 정몽주는 누구?', '고려 말의 학자이자 외교관, 포은 정몽주를 만나볼까요?'],
  ['scene-hayeoga.png', '한 수의 선택', '새 나라로 함께 가자는 제안 앞에서, 고려를 향한 마음을 지켰다고 전해집니다.'],
  ['scene-danshim.png', '단심가', '“이 몸이 죽고 죽어”로 시작하는 답가. 변치 않는 마음을 노래합니다.'],
  ['scene-cheonjang.png', '바람이 바꾼 길', '1406년, 영천으로 가던 명정이 바람에 날려 용인에 떨어졌다는 이야기가 있어요.'],
  ['scene-seonjukgyo.png', '그래서 용인에서!', '정몽주의 묘가 있는 용인 모현에서, 포은문화제로 그를 기억합니다.'],
];
const englishScenes = [
  ['scene-osang.png', 'Who was Poeun?', 'Meet Jeong Mong-ju, a scholar and diplomat of late Goryeo.'],
  ['scene-hayeoga.png', 'A choice', 'Tradition says he held to Goryeo despite an invitation to join a new dynasty.'],
  ['scene-danshim.png', 'Dansimga', 'His answering poem speaks of an unwavering heart.'],
  ['scene-cheonjang.png', 'A changed path', 'In 1406, a funeral banner is said to have blown down in Yongin.'],
  ['scene-seonjukgyo.png', 'Why Yongin?', 'His tomb is in Mohyeon, where the Poeun Festival remembers him.'],
];
const scenes = (english ? englishScenes : koreanScenes).map(([image, title, subtitle]) => ({ image: asset(image), title, subtitle }));

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || undefined, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 800, height: 450 }, acceptDownloads: true });
    page.on('console', message => console.log('browser:', message.text()));
    page.on('pageerror', error => console.error('browser error:', error));
    await page.setContent('<html><body style="margin:0;background:#271c2c"><canvas width="800" height="450"></canvas></body></html>');
    const downloadPromise = page.waitForEvent('download', { timeout: 180000 });
    const renderPromise = page.evaluate(async ({ scenes, mascot }) => {
      const canvas = document.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      const load = src => new Promise((resolve, reject) => { const img = new Image(); img.onload = () => resolve(img); img.onerror = reject; img.src = src; });
      const images = await Promise.all(scenes.map(scene => load(scene.image)));
      const dansimi = await load(mascot);
      const stream = canvas.captureStream(15);
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 1800000 });
      const chunks = [];
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      const done = new Promise(resolve => { recorder.onstop = resolve; });
      function wrap(text, x, y, maxWidth, lineHeight) {
        let line = '';
        for (const char of text) {
          const next = line + char;
          if (ctx.measureText(next).width > maxWidth && line) { ctx.fillText(line, x, y); y += lineHeight; line = char; }
          else line = next;
        }
        if (line) ctx.fillText(line, x, y);
      }
      function draw(now) {
        const elapsed = Math.max(0, Math.min(36000, now - started));
        const index = Math.min(4, Math.floor(elapsed / 7200));
        const local = (elapsed % 7200) / 7200;
        const img = images[index];
        const zoom = 1.02 + local * .06;
        const ratio = Math.max(800 / img.width, 450 / img.height) * zoom;
        const w = img.width * ratio, h = img.height * ratio;
        ctx.drawImage(img, (800 - w) / 2 + (local - .5) * 18, (450 - h) / 2, w, h);
        const shade = ctx.createLinearGradient(0, 0, 0, 450);
        shade.addColorStop(0, '#21151855'); shade.addColorStop(.48, '#21151800'); shade.addColorStop(1, '#211518cc');
        ctx.fillStyle = shade; ctx.fillRect(0, 0, 800, 450);
        const enter = Math.min(1, local * 7);
        const dx = index % 2 ? 20 : 620;
        ctx.globalAlpha = enter;
        ctx.drawImage(dansimi, dx + (1 - enter) * 30, 198 + Math.sin(elapsed / 350) * 2, 155, 142);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#fff9eae8'; ctx.beginPath(); ctx.roundRect(34, 28, 410, 57, 12); ctx.fill();
        ctx.font = 'bold 30px "Malgun Gothic", sans-serif'; ctx.fillStyle = '#681927'; ctx.fillText(scenes[index].title, 52, 68);
        ctx.fillStyle = '#21171ce6'; ctx.beginPath(); ctx.roundRect(34, 345, 732, 76, 12); ctx.fill();
        ctx.font = 'bold 23px "Malgun Gothic", sans-serif'; ctx.fillStyle = '#fffdf7';
        wrap(scenes[index].subtitle, 54, 376, 690, 30);
        ctx.fillStyle = '#f7bd82'; ctx.fillRect(0, 445, 800 * elapsed / 36000, 5);
        if (elapsed < 36000) requestAnimationFrame(draw);
        else recorder.stop();
      }
      const started = performance.now();
      recorder.start();
      requestAnimationFrame(draw);
      await done;
      const blob = new Blob(chunks, { type: 'video/webm' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'poeun-intro.webm'; a.click();
    }, { scenes, mascot: asset('dansimi.png') });
    await Promise.race([renderPromise, new Promise((_, reject) => setTimeout(() => reject(new Error('render did not complete')), 50000))]);
    const download = await downloadPromise;
    await download.saveAs(path.join(root, `assets/poeun/poeun-intro${english ? '.en' : ''}.webm`));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
