// Each board uses standard FEN and UCI coordinates. Hook excerpts are from
// the public-domain sijo named in each station; wording follows common modern spelling.
window.poeunStations = [
  {
    slug: "hayeoga", title: "하여가", subtitle: "스쳐 가는 한 번의 기회",
    hook: "이런들 어떠하리 저런들 어떠하리",
    source: "이방원, 《하여가》",
    line: "단심이: 이 마음, 체스로 보면… 지나간 폰을 잡을 기회는 지금뿐이야!",
    concept: "앙파상", message: "상대 폰이 두 칸 전진해 내 폰 옆에 오면, 바로 다음 수에만 지나간 칸으로 잡을 수 있어요.",
    animation: {
      startFen: "6k1/3p4/8/4P3/8/8/8/6K1 b - - 0 1",
      steps: [
        { from: "d7", to: "d5", caption: "검은 폰이 두 칸 전진해요.", durationMs: 8000 },
        { from: "e5", to: "d6", captureSquare: "d5", caption: "바로 다음 수! 흰 폰이 지나간 칸에서 잡아요.", durationMs: 10000 },
        { caption: "앙파상 기회는 이 한 수가 지나면 사라져요.", durationMs: 4000 }
      ]
    },
    tryIt: { fen: "6k1/8/8/3pP3/8/8/8/6K1 w - d6 0 2", prompt: "방금 두 칸 나온 검은 폰을 앙파상으로 잡아 보세요.", answer: "e5d6", success: "정확해요! e5의 폰이 d6으로 가며 d5의 폰을 잡았어요.", hint: "흰 폰을 대각선 앞, d6으로 옮겨 보세요." },
    puzzles: [
      { level: "쉬움", fen: "6k1/8/8/3pP3/8/8/8/6K1 w - d6 0 2", prompt: "지금 가능한 앙파상을 두세요.", answer: "e5d6", success: "지금이 유일한 기회예요!", hint: "e5 → d6" },
      { level: "보통", fen: "6k1/8/8/4pP2/8/8/8/6K1 w - e6 0 2", prompt: "f5의 폰으로 앙파상을 두세요.", answer: "f5e6", success: "e5의 폰을 지나간 칸 e6에서 잡았어요.", hint: "f5의 폰은 e6으로 갈 수 있어요." },
      { level: "도전", fen: "6k1/8/8/8/3Pp3/8/8/6K1 b - d3 0 2", prompt: "이번엔 검은 폰 차례! 앙파상을 두세요.", answer: "e4d3", success: "검은 폰도 같은 규칙으로 앙파상을 할 수 있어요.", hint: "e4의 검은 폰을 d3으로 옮기세요." }
    ]
  },
  {
    slug: "danshim", title: "단심가", subtitle: "한 수를 정한 마음",
    hook: "임 향한 일편단심이야 가실 줄이 있으랴",
    source: "정몽주, 《단심가》",
    line: "단심이: 이 마음, 체스로 보면… 손댄 룩을 움직이고, 폰은 앞으로만 가야 해!",
    concept: "터치무브 · 룩의 직선 이동 · 폰은 후퇴 불가", message: "대회에서 자기 기물을 일부러 만졌다면 합법적으로 움직일 수 있을 때 그 기물을 움직여야 해요. 룩은 가로·세로 직선으로, 폰은 앞으로만 갑니다.",
    animation: {
      startFen: "7k/5p2/8/8/3P4/8/4R3/K7 w - - 0 1",
      steps: [
        { caption: "단심이가 e2의 룩을 골랐어요. 이제 이 룩으로 수를 둬요.", durationMs: 6000 },
        { from: "e2", to: "e7", caption: "룩은 같은 파일을 따라 곧게 올라가요.", durationMs: 9000 },
        { caption: "d4의 폰은 d3으로 뒤로 갈 수 없어요.", durationMs: 6000 }
      ]
    },
    tryIt: { fen: "7k/5p2/8/8/3P4/8/4R3/K7 w - - 0 1", prompt: "이미 e2의 룩을 만졌어요. 룩을 직선으로 e7에 두세요.", answer: "e2e7", success: "좋아요! 만진 룩을 세로로 움직였어요.", hint: "e2에서 같은 세로줄의 e7로 움직여요." },
    puzzles: [
      { level: "쉬움", fen: "7k/8/8/8/8/8/4R3/K7 w - - 0 1", prompt: "e2의 룩을 e6으로 곧게 올리세요.", answer: "e2e6", success: "룩은 세로로 곧게 움직여요.", hint: "e2 → e6" },
      { level: "보통", fen: "7k/8/8/8/3P4/8/8/K7 w - - 0 1", prompt: "d4의 폰을 합법적으로 한 칸 움직이세요.", answer: "d4d5", success: "폰은 앞으로 한 칸 나아갔어요. 뒤로는 갈 수 없어요.", hint: "흰 폰은 숫자가 커지는 방향으로 가요." },
      { level: "도전", fen: "7k/8/8/8/8/8/R3P3/K7 w - - 0 1", prompt: "a2의 룩을 만졌어요. a5로 움직여 보세요.", answer: "a2a5", success: "선택한 룩으로 합법적인 직선 이동을 했어요.", hint: "a2에서 같은 세로줄의 a5로 가요." }
    ]
  },
  {
    slug: "seonjukgyo", title: "선죽교", subtitle: "알면서도 가는 길",
    hook: "이 몸이 죽고 죽어 일백 번 고쳐 죽어",
    source: "정몽주, 《단심가》",
    line: "단심이: 이 마음, 체스로 보면… 퀸을 내어주더라도 다음 수를 봐야 해!",
    concept: "희생 후 체크메이트", message: "기물을 내어주는 수라도 다음 수에 체크메이트가 있다면 계획의 일부가 될 수 있어요. 이 예제에서는 퀸을 희생한 뒤 룩으로 마무리합니다.",
    animation: {
      startFen: "4k3/5ppp/2n5/6B1/8/1Q6/8/3R2K1 w - - 0 1",
      steps: [
        { from: "b3", to: "b8", caption: "퀸이 b8에서 체크를 걸어요.", durationMs: 6000 },
        { from: "c6", to: "b8", caption: "검은 나이트가 퀸을 잡아요.", durationMs: 6000 },
        { from: "d1", to: "d8", caption: "이제 룩이 d8로! 비숍이 룩을 지켜 체크메이트예요.", durationMs: 9000 }
      ]
    },
    tryIt: { fen: "4k3/5ppp/2n5/6B1/8/1Q6/8/3R2K1 w - - 0 1", prompt: "퀸을 내어주고 다음 룩 수를 준비하세요. 첫 수는?", answer: "b3b8", success: "Qb8+! 나이트가 잡으면 Rd8#로 이어져요.", hint: "b3의 퀸으로 b8에 체크를 걸어요." },
    puzzles: [
      { level: "쉬움", fen: "1n2k3/5ppp/8/6B1/8/8/8/3R2K1 w - - 0 2", prompt: "퀸을 내준 뒤, 룩으로 체크메이트를 완성하세요.", answer: "d1d8", success: "Rd8# 체크메이트! 비숍이 룩을 지켜요.", hint: "d1의 룩을 d8로 올리세요." },
      { level: "보통", fen: "4k3/5ppp/2n5/6B1/8/1Q6/8/3R2K1 w - - 0 1", prompt: "퀸 희생으로 체크메이트 길을 여는 첫 수는?", answer: "b3b8", success: "Qb8+! …Nxb8 뒤 Rd8#를 노려요.", hint: "b8에 퀸을 두어 체크하세요." },
      { level: "도전", fen: "3k4/ppp5/5n2/1B6/8/6Q1/8/1K2R3 w - - 0 1", prompt: "반대편 판에서도 퀸 희생의 첫 수를 찾아보세요.", answer: "g3g8", success: "Qg8+! …Nxg8 뒤 Re8#로 끝나요.", hint: "g3의 퀸을 g8로 보내세요." }
    ]
  }
];
