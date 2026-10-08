(function () {
  let disposeCurrent = () => {};
  const safe = (v) => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function mount(container, station, {onComplete = () => {}, onBack = () => {}, onNext = () => {}, translate = (value) => value, completed = false, isLast = false} = {}) {
    disposeCurrent();
    let disposed = false;
    let timer = 0;
    disposeCurrent = () => { disposed = true; clearTimeout(timer); };
    const story = translate(station.story);
    const virtues = station.virtues ? `<div class="poeun-virtues" aria-label="기물과 덕목">${station.virtues.map(([glyph,piece,virtue], index) => `<button type="button" class="poeun-virtue" data-virtue="${index}" aria-expanded="false" aria-controls="poeun-virtue-reason"><span aria-hidden="true">${glyph}</span><strong>${safe(piece)}</strong><small>${safe(virtue)}</small></button>`).join("")}</div><div id="poeun-virtue-reason" class="poeun-virtue-reason" role="status" hidden><strong></strong><p></p><small>기물과 덕목의 연결은 역사적 사실이 아닌 체험을 위한 비유입니다.</small></div>` : "";
    const sceneAlt = {
      osang: "정자 안 체스판에 여섯 종류의 기물이 놓인 모습",
      hayeoga: "칡덩굴 아래에서 이방원이 정몽주에게 제안하는 모습",
      danshim: "정몽주가 붓으로 답가를 적는 모습",
      seonjukgyo: "정몽주가 선죽교 앞 갈림길에 선 모습",
      cheonjang: "영천으로 향하던 행렬과 바람에 날리는 명정",
    };
    const portrait = `<img class="poeun-narrator" src="/assets/poeun/dansimi.png" alt="이야기하는 단심이" width="150" height="137" />`;
    const scene = `<img class="poeun-scene-image" src="/assets/poeun/scene-${safe(station.slug)}.png" alt="${safe(sceneAlt[station.slug] || station.caption)}" width="1672" height="941" decoding="async" />`;
    const isOpera = station.slug !== "osang";
    const activity = isOpera
      ? `<section class="poeun-opera"><div class="poeun-opera-heading-row"><div><span class="poeun-opera-eyebrow">1858년 모르피의 오페라 대국</span><h3 class="poeun-opera-heading"></h3></div><span class="poeun-opera-before"></span></div><p class="poeun-opera-connection"></p><div class="poeun-opera-board" role="group" aria-label="오페라 대국 체스판"></div><p class="poeun-opera-message" role="status"></p><p class="poeun-opera-context">백 기물을 누른 뒤 이동할 칸을 고르세요. 다음 장은 실제 대국의 기록을 따라갑니다. 이 대국과 포은 이야기를 연결한 부분은 체험을 위한 비유입니다.</p><a class="poeun-opera-source" href="https://www.wollongongchess.com/games/1858-morphy-opera/" target="_blank" rel="noopener noreferrer">대국 기록 보기 ↗</a></section>`
      : `<section class="poeun-choice"><h3>${safe(station.question)}</h3><div class="poeun-choice-options">${station.options.map((o,i) => `<button type="button" data-choice="${i}">${safe(o.label)}</button>`).join("")}</div></section>`;
    container.innerHTML = `<article class="poeun-story-chapter"><header class="poeun-station-header"><button type="button" class="poeun-back" aria-label="뒤로가기"><span aria-hidden="true">←</span> 뒤로가기</button><span>단심이의 체스 이야기</span></header><div class="poeun-story-card"><h2>${safe(station.title)}</h2><div class="poeun-scene-frame" style="--poeun-scene:url('/assets/poeun/scene-${safe(station.slug)}.png')">${scene}<div class="poeun-narration">${portrait}<div class="poeun-bubble"><span class="poeun-bubble-text" aria-hidden="true"></span><span class="poeun-sr-only">${safe(station.story)}</span></div></div></div><button type="button" class="poeun-skip">설명 건너뛰기</button></div><div class="poeun-after-story" hidden>${virtues}${activity}</div><section class="poeun-choice-result" role="status" hidden><strong>그 선택의 의미</strong><p></p><span class="poeun-virtue-tag">${safe(station.tag)}</span>${station.note ? `<p class="poeun-chapter-note">${safe(station.note)}</p>` : ""}<div class="poeun-actions"><button type="button" class="poeun-button primary poeun-next">${isLast ? "마무리 보기 →" : "다음 장 →"}</button><button type="button" class="poeun-button secondary poeun-route">경로로</button></div></section></article>`;
    const bubble = container.querySelector(".poeun-bubble-text");
    const afterStory = container.querySelector(".poeun-after-story");
    const skip = container.querySelector(".poeun-skip");
    const sentences = story.match(/[^.!?]+[.!?]?/g)?.map(part => part.trim()).filter(Boolean) || [story];
    function revealQuestion() {
      if (disposed || !afterStory.hidden) return;
      clearTimeout(timer);
      bubble.textContent = story;
      container.querySelector(".poeun-story-card").classList.add("is-finished");
      afterStory.hidden = false;
      skip.hidden = true;
    }
    skip.onclick = revealQuestion;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) revealQuestion();
    else {
      let sentenceIndex = 0;
      let characterIndex = 0;
      function typeNext() {
        if (disposed) return;
        const sentence = sentences[sentenceIndex];
        characterIndex = Math.min(sentence.length, characterIndex + 2);
        bubble.textContent = sentence.slice(0, characterIndex);
        if (characterIndex < sentence.length) timer = setTimeout(typeNext, 32);
        else if (++sentenceIndex < sentences.length) {
          characterIndex = 0;
          timer = setTimeout(typeNext, 1050);
        } else timer = setTimeout(revealQuestion, 1100);
      }
      timer = setTimeout(typeNext, 450);
    }
    container.querySelector(".poeun-back").onclick = onBack;
    container.querySelectorAll("[data-virtue]").forEach(button => button.addEventListener("click", () => {
      const [glyph, piece, virtue, reason] = station.virtues[Number(button.dataset.virtue)];
      const detail = container.querySelector(".poeun-virtue-reason");
      container.querySelectorAll("[data-virtue]").forEach(item => item.setAttribute("aria-expanded", String(item === button)));
      detail.querySelector("strong").textContent = `${translate(piece)} · ${translate(virtue)}`;
      detail.querySelector("p").textContent = translate(reason);
      detail.hidden = false;
    }));
    container.querySelector(".poeun-route").onclick = onBack;
    container.querySelector(".poeun-next").onclick = onNext;
    if (isOpera) window.PoeunOperaGame.mount(container, station, {translate, onComplete, onNext});
    container.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
      if (disposed) return;
      const option = station.options[Number(button.dataset.choice)];
      container.querySelectorAll("[data-choice]").forEach(item => { item.classList.toggle("is-chosen", item === button); item.setAttribute("aria-pressed", String(item === button)); });
      const result = container.querySelector(".poeun-choice-result");
      result.hidden = false;
      result.querySelector("p").textContent = translate(option.feedback);
      if (!completed) { completed = true; onComplete(station.slug); }
      result.scrollIntoView({behavior:"smooth",block:"nearest"});
    }));
    return disposeCurrent;
  }
  function mountEnding(container, {onRestart, onRoute}) {
    disposeCurrent();
    container.innerHTML = `<div class="poeun-ending"><span class="poeun-ending-check" aria-hidden="true">✓</span><span class="poeun-kicker">다섯 장 완료</span><h2>당신의 단심가는?</h2><p>당신이 고른 길마다 지키고 싶은 마음이 담겨 있습니다.</p><p>부스에서 포스트잇 방명록이나 단심가 필사카드에 남겨주세요.</p><div class="poeun-actions"><button type="button" class="poeun-button primary poeun-restart">처음부터 다시</button><button type="button" class="poeun-button secondary poeun-route">경로로</button></div></div>`;
    container.querySelector(".poeun-restart").onclick = onRestart;
    container.querySelector(".poeun-route").onclick = onRoute;
  }
  function mountTransition(container, {onContinue, onBack, translate = value => value}) {
    disposeCurrent();
    container.innerHTML = `<article class="poeun-story-chapter poeun-transition"><header class="poeun-station-header"><button type="button" class="poeun-back"><span aria-hidden="true">←</span> 뒤로가기</button><span>단심이의 체스 이야기</span></header><span class="poeun-transition-step">1 / 5</span><h2></h2><p></p><button type="button" class="poeun-button primary poeun-transition-continue"></button></article>`;
    container.querySelector("h2").textContent = translate("그러면 이제 체스 대국을 통해 포은 정몽주 선생의 정신을 알아볼까요?");
    container.querySelector("p").textContent = translate("1858년 모르피의 유명한 오페라 대국에서 네 번의 수를 직접 골라 보세요. 두 이야기를 잇는 부분은 체험을 위한 비유입니다.");
    container.querySelector(".poeun-transition-continue").textContent = translate("대국 시작하기 →");
    container.querySelector(".poeun-back").onclick = onBack;
    container.querySelector(".poeun-transition-continue").onclick = onContinue;
  }
  window.PoeunStationUI = {mount,mountTransition,mountEnding,dispose:() => disposeCurrent()};
})();
