(function () {
  // Paul Morphy vs Duke of Brunswick and Count Isouard, Paris, 1858.
  // Score: https://www.wollongongchess.com/games/1858-morphy-opera/
  const score = "e4 e5 Nf3 d6 d4 Bg4 dxe5 Bxf3 Qxf3 dxe5 Bc4 Nf6 Qb3 Qe7 Nc3 c6 Bg5 b5 Nxb5 cxb5 Bxb5+ Nbd7 O-O-O Rd8 Rxd7 Rxd7 Rd1 Qe6 Bxd7+ Nxd7 Qb8+ Nxb8 Rd8#".split(" ");
  const moments = {
    hayeoga: {ply: 12, san: "Qb3", heading: "제안 앞에서 어디를 향할까요?", connection: "여러 길 중 어디에 힘을 실을지 고르는 순간을 하여가의 선택과 나란히 살펴봅니다."},
    danshim: {ply: 18, san: "Nxb5", heading: "계획을 지키며 어떤 수를 둘까요?", connection: "기꺼이 위험을 감수한 수를 단심가의 흔들리지 않는 마음과 비교해 봅니다."},
    seonjukgyo: {ply: 24, san: "Rxd7", heading: "위험을 알면서 어떤 수를 둘까요?", connection: "룩을 내어주며 길을 여는 수를 선죽교 앞의 결단에 비유해 봅니다."},
    cheonjang: {ply: 32, san: "Rd8#", heading: "바뀐 판에서 마지막 수를 찾아보세요", connection: "예상 밖의 희생 뒤에 나타난 길을 읽는 경험을 천장행렬의 전환과 나란히 살펴봅니다."},
  };
  const glyphs = {w:{k:"♔",q:"♕",r:"♖",b:"♗",n:"♘",p:"♙"},b:{k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"}};
  const names = {k:"킹",q:"퀸",r:"룩",b:"비숍",n:"나이트",p:"폰"};

  function mount(root, station, {translate = value => value, onComplete = () => {}, onNext = () => {}} = {}) {
    const moment = moments[station.slug];
    if (!moment) return;
    const board = root.querySelector(".poeun-opera-board");
    const message = root.querySelector(".poeun-opera-message");
    const result = root.querySelector(".poeun-choice-result");
    const before = root.querySelector(".poeun-opera-before");
    const number = Math.floor(moment.ply / 2) + 1;
    root.querySelector(".poeun-opera-heading").textContent = translate(moment.heading);
    root.querySelector(".poeun-opera-connection").textContent = translate(moment.connection);
    before.textContent = `${number}. ${moment.san} · ${translate("백 차례")}`;
    import("/assets/vendor/chess.js").then(({Chess}) => {
      if (!board.isConnected) return;
      const game = new Chess();
      score.slice(0, moment.ply).forEach(move => game.move(move));
      let selected = null;
      let finished = false;
      function render() {
        const moves = selected ? game.moves({square:selected, verbose:true}) : [];
        const destinations = new Set(moves.map(move => move.to));
        board.innerHTML = "";
        for (let rank = 8; rank >= 1; rank--) for (const file of "abcdefgh") {
          const square = `${file}${rank}`;
          const piece = game.get(square);
          const button = document.createElement("button");
          button.type = "button";
          button.className = `poeun-opera-square ${((file.charCodeAt(0) - 97 + rank) % 2) ? "dark" : "light"}`;
          if (selected === square) button.classList.add("selected");
          if (destinations.has(square)) button.classList.add("destination");
          button.dataset.square = square;
          button.disabled = finished;
          button.textContent = piece ? glyphs[piece.color][piece.type] : "";
          button.setAttribute("aria-label", `${square}${piece ? ` ${translate(piece.color === "w" ? "백" : "흑")} ${translate(names[piece.type])}` : ""}${destinations.has(square) ? `, ${translate("이동 가능")}` : ""}`);
          button.addEventListener("click", () => {
            if (finished) return;
            if (selected && destinations.has(square)) {
              const move = game.move({from:selected,to:square,promotion:"q"});
              finished = true;
              selected = null;
              render();
              result.hidden = false;
              result.querySelector("strong").textContent = `${number}. ${move.san}`;
              const recorded = move.san === moment.san;
              const english = translate("움직일 백 기물을 선택하세요.") !== "움직일 백 기물을 선택하세요.";
              result.querySelector("p").textContent = recorded
                ? translate("기록된 대국과 같은 수를 두었어요. 이 장면을 포은 이야기와 함께 생각해 보세요.")
                : english
                  ? `You played ${move.san}. The recorded move was ${moment.san}. The next chapter follows the historical game score.`
                  : `당신의 수는 ${move.san}입니다. 기록된 대국에서는 ${moment.san}을 두었습니다. 다음 장은 실제 기록의 수순으로 이어집니다.`;
              result.querySelector(".poeun-virtue-tag").textContent = translate(station.tag);
              onComplete(station.slug);
              result.scrollIntoView({behavior:"smooth",block:"nearest"});
            } else {
              selected = piece?.color === "w" ? square : null;
              message.textContent = selected ? translate("파란 표시 중 한 칸을 선택하세요.") : translate("움직일 백 기물을 선택하세요.");
              render();
            }
          });
          board.append(button);
        }
      }
      message.textContent = translate("움직일 백 기물을 선택하세요.");
      render();
    }).catch(() => { message.textContent = translate("체스판을 불러오지 못했습니다. 페이지를 새로고침해 주세요."); });
    root.querySelector(".poeun-next").onclick = onNext;
  }
  window.PoeunOperaGame = {mount};
})();
