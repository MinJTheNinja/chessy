(function () {
  let disposeCurrent = () => {};
  const safe = (v) => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function mount(container, station, {onComplete = () => {}, onBack = () => {}, onNext = () => {}, completed = false, isLast = false} = {}) {
    disposeCurrent();
    let disposed = false;
    let timer = 0;
    disposeCurrent = () => { disposed = true; clearTimeout(timer); };
    const virtues = station.virtues ? `<div class="poeun-virtues" aria-label="기물과 덕목">${station.virtues.map(([glyph,piece,virtue]) => `<div class="poeun-virtue"><span aria-hidden="true">${glyph}</span><strong>${piece}</strong><small>${virtue}</small></div>`).join("")}</div>` : "";
    const glyphs = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
    const board = `<figure class="poeun-board-figure"><div class="poeun-mini-board" role="img" aria-label="채워진 글리프로 표시한 여섯 종류의 체스 기물">${Array.from({length:64}, (_,i) => `<span class="${(Math.floor(i/8)+i%8)%2 ? "dark" : "light"}" aria-hidden="true">${i < 8 ? glyphs[i] : i < 16 ? "♟" : ""}</span>`).join("")}</div><figcaption>${safe(station.caption)}</figcaption></figure>`;
    const sceneAlt = {
      osang: "정자 안 체스판에 여섯 종류의 기물이 놓인 모습",
      hayeoga: "칡덩굴 아래에서 이방원이 정몽주에게 제안하는 모습",
      danshim: "정몽주가 붓으로 답가를 적는 모습",
      seonjukgyo: "정몽주가 선죽교 앞 갈림길에 선 모습",
      cheonjang: "영천으로 향하던 행렬과 바람에 날리는 명정",
    };
    const portrait = `<img class="poeun-narrator" src="/assets/poeun/dansimi.png" alt="이야기하는 단심이" width="150" height="137" />`;
    const scene = `<img class="poeun-scene-image" src="/assets/poeun/scene-${safe(station.slug)}.png" alt="${safe(sceneAlt[station.slug] || station.caption)}" width="1672" height="941" decoding="async" />`;
    container.innerHTML = `<article class="poeun-story-chapter"><header class="poeun-station-header"><button type="button" class="poeun-back" aria-label="포은 경로로 돌아가기"><span aria-hidden="true">←</span> 경로로</button><span>포은문화제 · 단심이의 체스 이야기</span></header><div class="poeun-story-card">${station.sourceLabel ? `<span class="poeun-source-label">${safe(station.sourceLabel)}</span>` : ""}<span class="poeun-kicker">${safe(station.title)}</span><h2>${safe(station.title)}</h2><div class="poeun-scene-frame" style="--poeun-scene:url('/assets/poeun/scene-${safe(station.slug)}.png')">${scene}<div class="poeun-narration">${portrait}<div class="poeun-bubble"><span class="poeun-bubble-text" aria-hidden="true"></span><span class="poeun-sr-only">${safe(station.story)}</span></div></div></div><button type="button" class="poeun-skip">설명 건너뛰기</button></div><div class="poeun-after-story" hidden>${virtues}${board}<section class="poeun-choice"><h3>${safe(station.question)}</h3><div class="poeun-choice-options">${station.options.map((o,i) => `<button type="button" data-choice="${i}">${safe(o.label)}</button>`).join("")}</div></section></div><section class="poeun-choice-result" role="status" hidden><strong>그 선택의 의미</strong><p></p><span class="poeun-virtue-tag">${safe(station.tag)}</span>${station.note ? `<p class="poeun-chapter-note">${safe(station.note)}</p>` : ""}<div class="poeun-actions"><button type="button" class="poeun-button primary poeun-next">${isLast ? "마무리 보기 →" : "다음 장 →"}</button><button type="button" class="poeun-button secondary poeun-route">경로로</button></div></section></article>`;
    const bubble = container.querySelector(".poeun-bubble-text");
    const afterStory = container.querySelector(".poeun-after-story");
    const skip = container.querySelector(".poeun-skip");
    const sentences = station.story.match(/[^.!?]+[.!?]?/g)?.map(part => part.trim()).filter(Boolean) || [station.story];
    function revealQuestion() {
      if (disposed || !afterStory.hidden) return;
      clearTimeout(timer);
      bubble.textContent = station.story;
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
    container.querySelector(".poeun-route").onclick = onBack;
    container.querySelector(".poeun-next").onclick = onNext;
    container.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => {
      if (disposed) return;
      const option = station.options[Number(button.dataset.choice)];
      container.querySelectorAll("[data-choice]").forEach(item => { item.classList.toggle("is-chosen", item === button); item.setAttribute("aria-pressed", String(item === button)); });
      const result = container.querySelector(".poeun-choice-result");
      result.hidden = false;
      result.querySelector("p").textContent = option.feedback;
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
  window.PoeunStationUI = {mount,mountEnding,dispose:() => disposeCurrent()};
})();
