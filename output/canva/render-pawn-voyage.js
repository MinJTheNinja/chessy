const path = require("path");
const { chromium } = require("playwright");

(async () => {
  const root = __dirname;
  const html = "file:///" + path.join(root, "pawn-voyage-a4.html").replace(/\\/g, "/");
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 3508, height: 2480 }, deviceScaleFactor: 1 });
  await page.goto(html, { waitUntil: "networkidle" });

  for (const id of ["page1", "page2"]) {
    const el = await page.$(`#${id}`);
    await el.screenshot({ path: path.join(root, `${id}.png`) });
  }

  await browser.close();
})();
