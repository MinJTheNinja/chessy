const board = document.querySelector("#chessBoard");
const menuToggle = document.querySelector("#menuToggle");
const languageSelect = document.querySelector("#languageSelect");
const pieceEditionControls = document.querySelectorAll("[data-piece-edition]");
const sidebarMenu = document.querySelector("#sidebarMenu");
const syncState = document.querySelector("#syncState");
const queueTime = document.querySelector("#queueTime");
const queueProgress = document.querySelector("#queueProgress");
const queuePrompt = document.querySelector("#queuePrompt");
const queueTipPanel = document.querySelector("#queueTipPanel");
const queueTip = document.querySelector("#queueTip");
const nextQueueTipButton = document.querySelector("#nextQueueTip");
const findMatchButton = document.querySelector("#findMatch");
const cancelMatchSearchButton = document.querySelector("#cancelMatchSearch");
const showCreateSeekButton = document.querySelector("#showCreateSeek");
const showFriendRoomButton = document.querySelector("#showFriendRoom");
const seekComposer = document.querySelector("#seekComposer");
const friendRoomDialog = document.querySelector("#friendRoomDialog");
const closeFriendRoomButton = document.querySelector("#closeFriendRoom");
const resignMatchButton = document.querySelector("#resignMatch");
const drawMatchButton = document.querySelector("#drawMatch");
const matchResult = document.querySelector("#matchResult span");
const newGameButton = document.querySelector("#newGame");
const matchHomeButton = document.querySelector("#matchHome");
const matchLayout = document.querySelector("#matchLayout");
const partnerLanguage = document.querySelector("#partnerLanguage");
const partnerName = document.querySelector("#partnerName");
const partnerId = document.querySelector("#partnerId");
const boardPartnerName = document.querySelector("#boardPartnerName");
const boardPartnerId = document.querySelector("#boardPartnerId");
const selfPlayerName = document.querySelector("#selfPlayerName");
const voiceRing = document.querySelector("#voiceRing");
const startVoiceCallButton = document.querySelector("#startVoiceCall");
const endVoiceCallButton = document.querySelector("#endVoiceCall");
const remoteVoiceAudio = document.querySelector("#remoteVoiceAudio");
const voiceStatusMessages = document.querySelectorAll("[data-voice-status]");
const reportUserButton = document.querySelector("#reportUser");
const mannerTemp = document.querySelector("#mannerTemp");
const dashboardTemp = document.querySelector("#dashboardTemp");
const profileTemp = document.querySelector("#profileTemp");
const nextMissionButton = document.querySelector("#nextMission");
const icebreakerText = document.querySelector("#icebreakerText");
const sttToggle = document.querySelector("#sttToggle");
const translationToggle = document.querySelector("#translationToggle");
const sttPill = document.querySelector("#sttPill");
const sttStatusText = document.querySelector("#sttStatusText");
const translatedSpeech = document.querySelector("#translatedSpeech");
const originalSpeech = document.querySelector("#originalSpeech");
const subtitleSize = document.querySelector("#subtitleSize");
const contrastToggle = document.querySelector("#contrastToggle");
const activateStt = document.querySelector("#activateStt");
const sttSourceLanguage = document.querySelector("#sttSourceLanguage");
const subtitleTargetLanguage = document.querySelector("#subtitleTargetLanguage");
const matchActivateStt = document.querySelector("#matchActivateStt");
const matchSttSourceLanguage = document.querySelector("#matchSttSourceLanguage");
const matchSubtitleTargetLanguage = document.querySelector("#matchSubtitleTargetLanguage");
const matchOriginalSpeech = document.querySelector("#matchOriginalSpeech");
const matchTranslatedSpeech = document.querySelector("#matchTranslatedSpeech");
const matchSttStatus = document.querySelector("#matchSttStatus");
const matchSessionDuration = document.querySelector("#matchSessionDuration");
const matchWordsRecognized = document.querySelector("#matchWordsRecognized");
const wordsRecognized = document.querySelector("#wordsRecognized");
const sessionDuration = document.querySelector("#sessionDuration");
const latencyText = document.querySelector("#latencyText");
const dashboardLatency = document.querySelector("#dashboardLatency");
const generateReviewButton = document.querySelector("#generateReview");
const refreshReviewButton = document.querySelector("#refreshReview");
const pronunciationStatus = document.querySelector("#pronunciationStatus");
const reviewStatus = document.querySelector("#reviewStatus");
const serverStatus = document.querySelector("#serverStatus");
const authForm = document.querySelector("#authForm");
const entryAuth = document.querySelector(".entry-auth");
const authEmail = document.querySelector("#authEmail");
const authDisplayNameField = document.querySelector("#authDisplayNameField");
const authDisplayName = document.querySelector("#authDisplayName");
const authPassword = document.querySelector("#authPassword");
const authConfirmPasswordField = document.querySelector("#authConfirmPasswordField");
const authConfirmPassword = document.querySelector("#authConfirmPassword");
const authLanguagePair = document.querySelector("#authLanguagePair");
const authStatus = document.querySelector("#authStatus");
const authSubmit = document.querySelector("#authSubmit");
const continueToDashboardButton = document.querySelector("#continueToDashboard");
const googleSignInButton = document.querySelector("#googleSignIn");
const googleSignInSlot = document.querySelector("#googleSignInSlot");
const tutorialGateNote = document.querySelector("#tutorialGateNote");
const tutorialLoginButton = document.querySelector("#tutorialLoginButton");
const mainAccountButton = document.querySelector("#mainAccountButton");
const mainTutorialButton = document.querySelector("#mainTutorialButton");
const entryTypewriter = document.querySelector("#entryTypewriter");
const entryTypewriterText = document.querySelector(".entry-typewriter-text");
const howToPlayFrame = document.querySelector(".how-to-play-frame");
const howToPlayShell = document.querySelector("#howToPlayShell");
const howToPlayView = document.querySelector(".how-to-play-view");
const showTutorialGuideButton = document.querySelector("#showTutorialGuide");
const showPuzzleGuideButton = document.querySelector("#showPuzzleGuide");
const showCheoinseongGuideButton = document.querySelector("#showCheoinseongGuide");
const trainingEditionLabel = document.querySelector("#trainingEditionLabel");
const trainingEditionButtons = [...document.querySelectorAll("[data-training-edition]")];
const tutorialPuzzleNote = document.querySelector("#tutorialPuzzleNote");
const trainingModuleList = document.querySelector("#trainingModuleList");
const puzzlePathList = document.querySelector("#puzzlePathList");
const cheoinseongPathList = document.querySelector("#cheoinseongPathList");
const trainingModuleToolbar = document.querySelector("#trainingModuleToolbar");
const activeTrainingModuleTitle = document.querySelector("#activeTrainingModuleTitle");
const headerProfile = document.querySelector("#headerProfile");
const headerProfileButton = document.querySelector("#headerProfileButton");
const headerProfileMenu = document.querySelector("#headerProfileMenu");
const headerProfileName = document.querySelector("#headerProfileName");
const headerProfileAvatar = document.querySelector("#headerProfileAvatar");
const headerSignOutButton = document.querySelector("#headerSignOut");
const deleteAccountButton = document.querySelector("#deleteAccount");
const deleteAccountConfirm = document.querySelector("#deleteAccountConfirm");
const contrastModeButton = document.querySelector("#contrastModeButton");
const textSizeSlider = document.querySelector("#textSizeSlider");
const settingsAccountName = document.querySelector("#settingsAccountName");
const signupButton = document.querySelector("#signupButton");
const loginButton = document.querySelector("#loginButton");
const activeMatchesCount = document.querySelector("#activeMatchesCount");
const subtitleSessionsCount = document.querySelector("#subtitleSessionsCount");
const welcomeName = document.querySelector("#welcomeName");
const dashboardHeroAvatar = document.querySelector("#dashboardHeroAvatar");
const dashboardStreak = document.querySelector("#dashboardStreak");
const dashboardEasyElo = document.querySelector("#dashboardEasyElo");
const leaderboardList = document.querySelector("#leaderboardList");
const homeLeaderboardTab = document.querySelector("#homeLeaderboardTab");
const homeQuestTab = document.querySelector("#homeQuestTab");
const homeLeaderboardPanel = document.querySelector("#homeLeaderboardPanel");
const homeQuestPanel = document.querySelector("#homeQuestPanel");
const homeThemeToggle = document.querySelector("#homeThemeToggle");
const homeThemePopover = document.querySelector("#homeThemePopover");
const activeMatchReturn = document.querySelector("#activeMatchReturn");
const activeMatchReturnLabel = document.querySelector("#activeMatchReturnLabel");
const activeMatchReturnTitle = document.querySelector("#activeMatchReturnTitle");
const activeMatchReturnMeta = document.querySelector("#activeMatchReturnMeta");
const resumeMatchButton = document.querySelector("#resumeMatchButton");
const homeDailyPuzzleButton = document.querySelector("#homeDailyPuzzleButton");
const leaderboardButtons = document.querySelectorAll("[data-leaderboard-period]");
const leaderboardScopeButtons = document.querySelectorAll("[data-leaderboard-scope]");
const leagueCodeInput = document.querySelector("#leagueCodeInput");
const joinLeagueButton = document.querySelector("#joinLeagueButton");
const createLeagueButton = document.querySelector("#createLeagueButton");
const leagueStatus = document.querySelector("#leagueStatus");
const leagueActionButtons = document.querySelectorAll("[data-league-action]");
const leagueActionPanels = document.querySelectorAll("[data-league-panel]");
const leagueActionPopover = document.querySelector("#leagueActionPopover");
const closeLeagueActionPopoverButton = document.querySelector("#closeLeagueActionPopover");
const createdLeagueCode = document.querySelector("#createdLeagueCode");
const todayQuestList = document.querySelector("#todayQuestList");
const conversationGoal = document.querySelector("#conversationGoal");
const forumPostTitle = document.querySelector("#forumPostTitle");
const forumPostCategory = document.querySelector("#forumPostCategory");
const forumPostBody = document.querySelector("#forumPostBody");
const forumPostList = document.querySelector("#forumPostList");
const homeForumList = document.querySelector("#homeForumList");
const publishForumPostButton = document.querySelector("#publishForumPost");
const showForumComposerButton = document.querySelector("#showForumComposer");
const forumComposer = document.querySelector("#forumComposer");
const forumFilterButtons = document.querySelectorAll("[data-forum-filter]");
const forumNoticeOption = forumPostCategory?.querySelector('option[value="Notice"]');
const shopInterestStatus = document.querySelector("#shopInterestStatus");
const shopProductGrid = document.querySelector("#shopProductGrid");
const staffProductForm = document.querySelector("#staffProductForm");
const staffProductImage = document.querySelector("#staffProductImage");
const staffProductImageUrl = document.querySelector("#staffProductImageUrl");
const staffProductName = document.querySelector("#staffProductName");
const staffProductPrice = document.querySelector("#staffProductPrice");
const staffProductDescription = document.querySelector("#staffProductDescription");
const publishStaffProductButton = document.querySelector("#publishStaffProduct");
const staffProductStatus = document.querySelector("#staffProductStatus");
const vocabList = document.querySelector("#vocabList");
const culturalTitle = document.querySelector("#culturalTitle");
const culturalBody = document.querySelector("#culturalBody");
const culturalPrompt = document.querySelector("#culturalPrompt");
const quickPairGrid = document.querySelector("#quickPairGrid");
const lobbySummary = document.querySelector("#lobbySummary");
const seekTimeControl = document.querySelector("#seekTimeControl");
const createSeekButton = document.querySelector("#createSeek");
const openSeeksList = document.querySelector("#openSeeksList");
const refreshLobbyButton = document.querySelector("#refreshLobby");
const createPrivateChallengeButton = document.querySelector("#createPrivateChallenge");
const privateChallengeCode = document.querySelector("#privateChallengeCode");
const privateChallengeInput = document.querySelector("#privateChallengeInput");
const joinPrivateChallengeButton = document.querySelector("#joinPrivateChallenge");
const matchRoomLink = document.querySelector("#matchRoomLink");
const copyMatchRoomLinkButton = document.querySelector("#copyMatchRoomLink");
const friendRoomStatus = document.querySelector("#friendRoomStatus");
const matchSourceBadge = document.querySelector("#matchSourceBadge");
const timeControlBadge = document.querySelector("#timeControlBadge");
const whiteClock = document.querySelector("#whiteClock");
const blackClock = document.querySelector("#blackClock");
const whiteClockCard = document.querySelector("#whiteClockCard");
const blackClockCard = document.querySelector("#blackClockCard");
const refreshAdminButton = document.querySelector("#refreshAdmin");
const adminStatus = document.querySelector("#adminStatus");
const adminUsersCount = document.querySelector("#adminUsersCount");
const adminMatchesCount = document.querySelector("#adminMatchesCount");
const adminReportsCount = document.querySelector("#adminReportsCount");
const shopInterestCount = document.querySelector("#shopInterestCount");
const adminMatchesList = document.querySelector("#adminMatchesList");
const adminUsersList = document.querySelector("#adminUsersList");
const adminReportsList = document.querySelector("#adminReportsList");
const shopInterestList = document.querySelector("#shopInterestList");
const adminMatchSearch = document.querySelector("#adminMatchSearch");
const adminUserSearch = document.querySelector("#adminUserSearch");
const profileStatus = document.querySelector("#profileStatus");
const profileAvatar = document.querySelector("#profileAvatar");
const profileAvatarButton = document.querySelector("#profileAvatarButton");
const profileImageFile = document.querySelector("#profileImageFile");
const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const profileBioText = document.querySelector("#profileBioText");
const editProfileNameButton = document.querySelector("#editProfileName");
const profileNameEditor = document.querySelector("#profileNameEditor");
const saveProfileNameButton = document.querySelector("#saveProfileName");
const editProfileBioButton = document.querySelector("#editProfileBio");
const profileBioEditor = document.querySelector("#profileBioEditor");
const saveProfileBioButton = document.querySelector("#saveProfileBio");
const profileLanguageText = document.querySelector("#profileLanguageText");
const profileDisplayName = document.querySelector("#profileDisplayName");
const profileLanguagePair = document.querySelector("#profileLanguagePair");
const profilePieceEdition = document.querySelector("#profilePieceEdition");
const profileImage = document.querySelector("#profileImage");
const profileBio = document.querySelector("#profileBio");
const saveProfileButton = document.querySelector("#saveProfile");
const peerFeedbackType = document.querySelector("#peerFeedbackType");
const peerFeedbackNote = document.querySelector("#peerFeedbackNote");
const submitPeerFeedbackButton = document.querySelector("#submitPeerFeedback");
const badgeList = document.querySelector("#badgeList");
const badgeDetails = document.querySelector("#badgeDetails");
const profileStreak = document.querySelector("#profileStreak");
const profileEasyElo = document.querySelector("#profileEasyElo");
const profileSideElo = document.querySelector("#profileSideElo");
const profileUserId = document.querySelector("#profileUserId");
const profileLessonsCount = document.querySelector("#profileLessonsCount");
const profileQuestionsCount = document.querySelector("#profileQuestionsCount");
const profileTestsCount = document.querySelector("#profileTestsCount");
const cultureGuideList = document.querySelector("#cultureGuideList");
const cultureGuideInput = document.querySelector("#cultureGuideInput");
const saveCultureGuideButton = document.querySelector("#saveCultureGuide");
const demoAuthAllowed = ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
const studentTutorialRequiredKey = "easyMateStudentTutorialRequired";
const studentTutorialCompleteKey = "easyMateStudentTutorialComplete";
const completedTrainingModulesKey = "easyMateCompletedTrainingModules";
const completedPuzzleStagesKey = "easyMateCompletedPuzzleStages";
const dailyQuestStorageKey = "easyMateDailyQuestProgress";
const pieceEditionStorageKey = "easyMatePieceEdition";
let leaderboardPeriod = "weekly";
let leaderboardScope = "mine";
let leaderboardPage = 0;
const leaderboardPageSize = 10;
let leagueActionMode = null;
let cachedTrainingState = null;
let trainingModuleOpen = false;
let trainingModuleTransition = null;
let howToPlayResizeObserver = null;
let howToPlayResizeFrame = 0;

const koreanText = {
  "English": "영어",
  "Korean": "한국어",
  "Thai": "태국어",
  "Japanese": "일본어",
  "Player": "플레이어",
  "Profile": "프로필",
  "Settings": "설정",
  "Sign out": "로그아웃",
  "Menu": "메뉴",
  "Dashboard": "대시보드",
  "Messages": "메시지",
  "Forum": "게시판",
  "Shop": "상점",
  "Staff": "스태프",
  "Staff tools": "스태프 도구",
  "Staff operations": "스태프 운영",
  "Login": "로그인",
  "New user": "새 계정",
  "Language selection": "언어 선택",
  "Email": "이메일",
  "Display name": "표시 이름",
  "Password": "비밀번호",
  "Confirm password": "비밀번호 확인",
  "Log in": "로그인",
  "Create account": "계정 만들기",
  "Demo sign in": "Google 로그인",
  "Continue to play": "계속 플레이",
  "Enter password": "비밀번호 입력",
  "Enter password again": "비밀번호 다시 입력",
  "Fastest": "가장 빠름",
  "Quick pair": "빠른 매칭",
  "Start matching immediately with default settings.": "기본 설정으로 바로 매칭을 시작합니다.",
  "Custom": "맞춤",
  "Create game": "게임 만들기",
  "Choose time, language, and conversation goal.": "시간, 언어, 대화 목표를 선택합니다.",
  "Private": "비공개",
  "Play with a friend": "친구와 플레이",
  "Create a room or join one with a code.": "방을 만들거나 코드로 참여합니다.",
  "Bullet": "불릿",
  "Blitz": "블리츠",
  "Study": "스터디",
  "Casual": "캐주얼",
  "Rated": "레이팅",
  "Cancel": "취소",
  "Match status": "매칭 상태",
  "Choose mode": "모드 선택",
  "Default search": "기본 검색",
  "Fast chess, short phrases": "빠른 체스, 짧은 표현",
  "Quick talk between moves": "수 사이에 짧게 대화",
  "Rapid Talk": "래피드 토크",
  "Best for caption practice": "자막 연습에 적합",
  "Slow game, deeper review": "느린 게임, 깊은 복습",
  "Game type": "게임 유형",
  "Time control": "시간 제한",
  "Partner language": "파트너 언어",
  "Conversation goal": "대화 목표",
  "Explain chess moves": "체스 수 설명하기",
  "Practice daily conversation": "일상 대화 연습",
  "Learn sports phrases": "스포츠 표현 배우기",
  "Create live game": "라이브 게임 만들기",
  "Friend room": "친구 방",
  "Create private room": "비공개 방 만들기",
  "Join room": "방 참여",
  "Room code": "방 코드",
  "Enter code": "코드 입력",
  "Announcements, questions, and open discussion for players.": "공지, 질문, 플레이어들의 자유로운 대화 공간입니다.",
  "Back to dashboard": "대시보드로 돌아가기",
  "← Back to dashboard": "← 대시보드로 돌아가기",
  "??Back to dashboard": "← 대시보드로 돌아가기",
  "+ New post": "+ 새 글",
  "New post": "새 글",
  "Title": "제목",
  "Enter a title": "제목 입력",
  "Category": "분류",
  "Notice": "공지",
  "Notice (staff only)": "공지 (스태프 전용)",
  "Question": "질문",
  "Free": "자유",
  "Message": "내용",
  "Write your message": "내용을 작성하세요",
  "Publish": "게시",
  "All": "전체",
  "Live Chess Hardware": "라이브 체스 하드웨어",
  "Boards made for chess and language practice.": "체스와 언어 연습을 위해 만든 보드입니다.",
  "Sell your dedicated board here with product details, reservation interest, and future checkout flow.": "상품 정보, 관심 예약, 향후 결제 흐름을 이곳에서 관리합니다.",
  "Reserve interest": "관심 예약",
  "Join waitlist": "대기자 명단 참여",
  "Prototype": "프로토타입",
  "Studio": "스튜디오",
  "Accessory": "액세서리",
  "Founder's Board": "파운더스 보드",
  "Coach Board": "코치 보드",
  "Travel Kit": "여행 키트",
  "Portable tournament-size board for live matches, captions, and lesson review.": "라이브 매치, 자막, 수업 복습을 위한 휴대용 토너먼트 크기 보드입니다.",
  "Larger tabletop board for tutors, clubs, and language exchange sessions.": "튜터, 동아리, 언어 교환 세션을 위한 큰 탁상용 보드입니다.",
  "Compact pieces, carrying case, and setup guide for in-person practice games.": "대면 연습 게임을 위한 소형 말, 휴대 케이스, 설치 가이드입니다.",
  "$149 estimated": "예상가 $149",
  "$229 estimated": "예상가 $229",
  "$49 estimated": "예상가 $49",
  "Select a product to save interest.": "관심 상품을 선택하세요.",
  "Staff only": "스태프 전용",
  "Register product": "상품 등록",
  "Add shop items with a photo, name, price, and description.": "사진, 이름, 가격, 설명을 넣어 상품을 등록합니다.",
  "Product photo": "상품 사진",
  "Photo URL": "사진 URL",
  "Product name": "상품 이름",
  "Board name": "보드 이름",
  "Price": "가격",
  "Description": "설명",
  "Short product details": "짧은 상품 설명",
  "Add product": "상품 추가",
  "Only staff can register products.": "스태프만 상품을 등록할 수 있습니다.",
  "Product added.": "상품이 추가되었습니다.",
  "Product deleted.": "상품이 삭제되었습니다.",
  "Product not found.": "상품을 찾을 수 없습니다.",
  "Delete product": "상품 삭제",
  "Staff access required.": "스태프 권한이 필요합니다.",
  "Ready to add a shop product.": "상점 상품을 추가할 수 있습니다.",
  "Add a product name, price, and description.": "상품 이름, 가격, 설명을 입력하세요.",
  "Product Interest": "상품 관심 예약",
  "Players who reserved interest in shop products appear here.": "상점 상품에 관심 예약한 플레이어가 여기에 표시됩니다.",
  "No product interest yet.": "아직 상품 관심 예약이 없습니다.",
  "Refresh Staff Data": "스태프 데이터 새로고침",
  "Notice permission": "공지 권한",
  "Only staff can publish posts in the Notice category.": "스태프만 공지 분류로 글을 올릴 수 있습니다.",
  "Open forum": "포럼 열기",
  "Product registration": "상품 등록",
  "Add products with a photo, name, price, and description.": "사진, 이름, 가격, 설명을 넣어 상품을 등록합니다.",
  "Open shop": "상점 열기",
  "Users": "사용자",
  "Active matches": "진행 중 매치",
  "Open reports": "열린 신고",
  "Product interest": "상품 관심",
  "Match Monitor": "매치 모니터",
  "Review live match logs and intervene when safety reports arrive.": "라이브 매치 기록을 확인하고 안전 신고가 들어오면 개입합니다.",
  "Search matches": "매치 검색",
  "User Management": "사용자 관리",
  "Manage user accounts, profile flags, and repeated feedback patterns.": "사용자 계정, 프로필 표시, 반복 피드백 패턴을 관리합니다.",
  "Search users": "사용자 검색",
  "Safety and Moderation": "안전 및 관리",
  "Warnings are tracked with context from transcript, match result, and reports.": "경고는 대화 기록, 매치 결과, 신고 맥락과 함께 추적됩니다.",
  "Open menu": "메뉴 열기",
  "Open profile menu": "프로필 메뉴 열기",
};
Object.assign(koreanText, {
  "EasyMate Chess Matching": "EasyMate 체스 매칭",
  "EasyMate home": "EasyMate 홈",
  "Piece edition": "말 디자인 선택",
  "Chess . Conversation . Connection": "체스 · 대화 · 연결",
  "Make chess easier!": "체스를 더 쉽게!",
  "Start with account": "계정으로 시작",
  "View tutorial first": "연습마당으로 가기",
  "EasyMate Account": "EasyMate 계정",
  "Start a conversation": "대화를 시작하세요",
  "Choose a language pair and enter with your account to start live chess matching.":
    "언어 조합을 고르고 계정으로 입장하면 실시간 체스 매칭을 시작할 수 있습니다.",
  "New account": "새 계정",
  "Name shown to opponents": "상대에게 보일 이름",
  "Demo login": "Google 로그인",
  "Enter your existing email and password.": "기존 이메일과 비밀번호를 입력하세요.",
  "Create an account to save matches and language review.": "대국과 언어 복습을 저장하려면 계정을 만드세요.",
  "How it works": "이렇게 진행합니다",
  "Request a meeting": "만남 신청",
  "Connect through a welfare center or online matching.": "복지관 또는 온라인 매칭을 통해 파트너를 연결합니다.",
  "Play chess": "체스 한 판",
  "Beginners are welcome. Conversation comes before rules.": "초보자도 괜찮습니다. 규칙보다 대화가 먼저입니다.",
  "Share stories": "이야기 나누기",
  "After the game, continue the relationship through voice letters and review.":
    "게임 뒤 보이스레터와 복습으로 관계를 이어갑니다.",
  "App workspace": "앱 작업 공간",
  "Play": "대국",
  "Tutorial": "튜토리얼",
  "Overview": "한눈에 보기",
  "Start playing": "대국을 시작하세요",
  "Find an opponent and start a live chess language match.": "상대를 찾아 체스를 두며 언어 대화를 시작합니다.",
  "AI Language Review": "AI 언어 복습",
  "Review vocabulary, culture notes, and pronunciation after a match.": "대국 뒤 단어, 문화 메모, 발음을 다시 확인합니다.",
  "Profile and Culture": "프로필과 문화",
  "Manage your profile, badges, feedback, and culture guide.": "프로필, 배지, 피드백, 문화 노트를 관리합니다.",
  "Announcements, questions, and player discussions.": "공지, 질문, 플레이어 이야기를 모아 봅니다.",
  "Chessboards": "체스보드",
  "Explore physical boards for live language chess.": "현장 언어 체스에 쓸 실물 보드를 살펴봅니다.",
  "Caption sessions": "자막 세션",
  "Avg. latency": "평균 지연",
  "Manner badge": "매너 배지",
  "Friendly conversation partner": "친절한 대화 상대",
  "Trusted conversation partner": "믿음직한 대화 상대",
  "New conversation sprout": "새싹 대화 연습 중",
  "Needs a staff check": "운영자 확인 필요",
  "Find a game": "상대 찾기",
  "Finding a player": "상대를 찾는 중",
  "Live match": "실시간 대국",
  "Match result": "대국 결과",
  "Quick pair": "퀵 매칭",
  "Start matching immediately with default settings.": "기본 설정으로 바로 상대를 찾습니다.",
  "Choose time, language, and conversation goal.": "시간, 언어, 대화 목표를 고릅니다.",
  "Create a room or join one with a code.": "방을 만들거나 코드로 참여합니다.",
  "Default search": "기본 검색",
  "Fast chess, short phrases": "짧은 표현으로 빠르게 둡니다.",
  "Quick talk between moves": "수 사이에 짧게 대화합니다.",
  "Best for caption practice": "자막 연습에 가장 좋습니다.",
  "Slow game, deeper review": "천천히 두고 깊게 복습합니다.",
  "Friendly": "친선",
  "Recorded": "기록",
  "Select how you want to play.": "원하는 대국 방식을 선택하세요.",
  "Language Pool": "언어 풀",
  "Match by conversation fit": "대화 목표로 매칭",
  "Find players who want the same language practice while playing chess.":
    "체스를 두며 같은 언어 연습을 원하는 플레이어를 찾습니다.",
  "Live pools ready": "대기 풀 준비됨",
  "Match by shared settings": "같은 설정으로 매칭",
  "Live chess ready": "실시간 체스 준비됨",
  "No active clock yet": "아직 시작된 시계가 없어요.",
  "Synchronized chess board": "실시간 체스 보드",
  "Game status": "대국 상태",
  "In progress": "대국 중",
  "New game": "새 대국",
  "Generate AI Review": "AI 복습 만들기",
  "Match information and live captions": "대국 정보와 실시간 자막",
  "Ready": "준비 전",
  "Partner waiting": "상대 대기",
  "Waiting": "대기 중",
  "Manner promise": "매너 약속",
  "Start with polite speech.": "존댓말로 시작해요.",
  "If a message feels uncomfortable, you can report it at any time.": "불편한 말이 들리면 언제든 신고할 수 있습니다.",
  "Live captions during chess match": "대국 중 실시간 자막",
  "Live captions": "실시간 자막",
  "Captions while playing": "두면서 바로 보기",
  "Start captions": "자막 시작",
  "Stop captions": "자막 중지",
  "Source": "말하는 언어",
  "Browser Default": "브라우저 기본값",
  "Translate": "번역",
  "Status": "상태",
  "Paused": "일시 중지",
  "Time": "시간",
  "Not started": "시작 전",
  "Words": "단어",
  "No words yet": "아직 없음",
  "Original": "원문",
  "Original theme": "오리지널",
  "EasyMate & Yongin Cultural Center": "EasyMate & 용인문화원",
  "Korean-themed chess": "한국 테마 체스",
  "EasyMate lets you play puzzles and matches with the theme you choose.":
    "내가 고른 테마로 퍼즐과 대국을 둘 수 있는 EasyMate만의 설정입니다.",
  "Translation": "번역",
  "Offer draw": "무승부 제안",
  "Resign": "기권",
  "Report": "신고하기",
  "You": "나",
  "Start mic": "마이크 시작",
  "End voice": "통화 종료",
  "Start a matched game, then turn on your mic.": "매칭 후 마이크를 켜세요.",
  "Open games": "열린 게임",
  "Players waiting": "대기 중인 플레이어",
  "Refresh": "새로고침",
  "Partner": "파트너",
  "Submit safety report": "신고하기",
  "Icebreaker mission": "첫 만남 미션",
  "Ask your partner what opening they enjoy most.": "상대가 좋아하는 오프닝을 물어보세요.",
  "Compliment one move and ask why they chose it.": "좋았던 수 하나를 칭찬하고 왜 그 수를 골랐는지 물어보세요.",
  "Explain your next move in one short sentence.": "다음 수를 한 문장으로 짧게 설명해보세요.",
  "Ask your partner how to say 'good game' in their language.": "파트너의 언어로 '좋은 경기였어요'를 어떻게 말하는지 물어보세요.",
  "Send one chess phrase to the subtitle view for practice.": "체스 표현 하나를 자막으로 말해 연습해보세요.",
  "Next mission": "다음 미션",
  "Create or join a room": "방 만들기 또는 참여",
  "Create room": "방 만들기",
  "Join with code": "코드로 참여",
  "Room link": "방 링크",
  "No match yet": "아직 만들어진 방이 없어요",
  "Copy room link": "방 링크 복사",
  "Match Result": "대국 복습",
  "Back to Match": "대국으로 돌아가기",
  "Regenerate Review": "복습 다시 만들기",
  "Click any word to replay pronunciation.": "단어를 누르면 발음을 다시 들을 수 있어요.",
  "Vocabulary Chest": "단어 상자",
  "Key match vocabulary": "대국 중 나온 핵심 표현",
  "7 items ready": "7개 표현 준비됨",
  "Cultural Exchange Insight": "문화 교류 메모",
  'Detected reference: saying "GG"': '"GG" 인사 표현 발견',
  "Research prompt: compare polite post-game phrases in your partner's language.":
    "다음 질문: 파트너의 언어에서는 대국 뒤 어떤 말로 예의를 표현하나요?",
  "Save to Culture Guide": "문화 노트에 저장",
  "Guide": "가이드",
  "How to play": "튜토리얼",
  "Tutorial and puzzle": "튜토리얼과 퍼즐",
  "EasyMate tutorial": "EasyMate 튜토리얼",
  "Back to dashboard": "대국으로 돌아가기",
  "No posts yet.": "아직 게시글이 없어요. 첫 질문이나 공지를 남겨보세요.",
  "Live Chess Hardware": "실물 체스 키트",
  "Boards made for chess and language practice.": "체스와 언어 연습을 위한 보드입니다.",
  "Reserve interest": "관심 예약",
  "User Profile": "사용자 프로필",
  "English learner, Korean speaker": "영어 학습자, 한국어 사용자",
  "Language pair": "언어 조합",
  "Cheoinseong Edition": "처인성 에디션",
  "Beta Edition": "Beta 에디션",
  "Add a short intro for language partners.": "언어 파트너에게 보여줄 짧은 소개를 적어보세요.",
  "Save Profile": "프로필 저장",
  "Peer feedback": "파트너 피드백",
  "Helpful and respectful": "친절하고 존중해요",
  "Clear communicator": "설명이 또렷해요",
  "Needs moderation attention": "운영자 확인이 필요해요",
  "Note": "메모",
  "Optional feedback note": "선택 사항: 피드백 메모",
  "Submit Peer Feedback": "피드백 보내기",
  "Badges": "배지",
  "Culture Guide": "문화 노트",
  "Culture note": "문화 노트",
  "Save a culture note": "문화 노트 저장",
  "Save Culture Note": "문화 노트 저장",
  "Account": "계정",
  "Accessibility": "접근성",
  "Adjust the interface for readability.": "읽기 편하도록 화면을 조정합니다.",
  "Interface language": "화면 언어",
  "High contrast": "고대비",
  "Larger text": "큰 글자",
  "Adjust the app text size.": "앱 글자 크기를 조정합니다.",
  "Text size": "글자 크기",
  "Signed in": "로그인됨",
  "Delete account": "계정 삭제",
  "Admin Panel": "운영자 전용",
  "Safety and moderation": "안전 관리",
  "Refresh Admin Data": "운영자 데이터 새로고침",
  "Admin tools load after signing in with an admin account.": "운영자 계정으로 로그인해야 이 화면을 볼 수 있습니다.",
  "Search matches": "대국 검색",
  "Player, status, result, time control": "플레이어, 상태, 결과, 시간 제한",
  "Search users": "사용자 검색",
  "Name, email, role, warning count": "이름, 이메일, 역할, 경고 수",
  "Safety warning": "안전 알림",
  "Possible disrespectful speech detected.": "불편한 말이 감지되었을 수 있습니다.",
  "Safety report": "안전 신고",
  "open": "열림",
  "matched": "매칭됨",
  "ended": "종료됨",
  "resolved": "해결됨",
  "Draw agreed": "무승부 합의",
  "Draw accepted": "무승부 수락",
  "White lost on time": "백 시간패",
  "Black lost on time": "흑 시간패",
  "White won by checkmate": "백 체크메이트 승",
  "Black won by checkmate": "흑 체크메이트 승",
  "Game over": "대국 종료",
  "Time expired": "시간이 끝났습니다",
  "Account deleted": "계정 삭제됨",
});
Object.assign(koreanText, {
  "View tutorial first": "훈련장으로 가기",
  "Start a conversation": "계정으로 입장하기",
  "Play": "플레이",
  "Today's quests": "오늘의 퀘스트",
  "Solve 5 puzzles": "퍼즐 5개 풀기",
  "Play 2 games": "대국 2판 두기",
  "Meet a new player": "새 플레이어 만나기",
  "Tutorial": "훈련장",
  "Start playing": "플레이를 시작하세요",
  "Profile and Culture": "프로필",
  "Manage your profile, badges, feedback, and culture guide.": "아이디, streak, Easy Elo, 배지를 확인합니다.",
  "How to play": "훈련장",
  "Tutorial and puzzle": "훈련장과 퍼즐",
  "EasyMate tutorial": "EasyMate 훈련장",
});

const englishText = Object.entries(koreanText).reduce((map, [english, korean]) => {
  map[korean] = english;
  return map;
}, {});
englishText["프로필"] = "Profile";
englishText["프로필과 문화"] = "Profile";
Object.assign(englishText, {
  "홈": "Home",
  "플레이": "Play",
  "훈련장": "Training",
  "게시판": "Forum",
  "상점": "Shop",
  "나": "Profile",
  "환영합니다,": "Welcome,",
  "님!": "!",
  "오늘의 퍼즐: 성문 뒤의 함정": "Today's puzzle: Trap Behind the Gate",
  "성문 뒤의 함정": "Trap Behind the Gate",
  "몽골 칸이 병사들 뒤에 숨었어요. 뒷줄이 텅 비었네요?": "The Mongol Khan is hidden behind soldiers. The back rank is empty.",
  "풀기": "Solve",
  "Easy Elo 리더보드 · 주간": "Easy Elo Leaderboard · Weekly",
  "내 리그": "My League",
  "전체": "All",
  "연속 학습일": "Learning Streak",
  "둔 대국": "Games Played",
  "푼 퍼즐": "Puzzles Solved",
  "받은 배지": "Badges Earned",
  "보드 테마": "Board Theme",
  "보드 테마란?": "What is a board theme?",
  "내가 고른 테마로 퍼즐과 대국을 둘 수 있는 EasyMate만의 설정입니다.": "An EasyMate setting that applies your chosen theme to puzzles and games.",
  "오리지널": "Original",
  "기본 체스판": "Standard chessboard",
  "처인성": "Cheoinseong",
  "한국 테마 체스": "Korean themed chess",
  "훈련장 진행": "Training Progress",
  "체스 기물 움직임": "Chess Piece Movement",
  "기물 잡기": "Capturing Pieces",
  "기물의 움직임": "Piece Movement",
  "체크에서 벗어나기": "Escaping Check",
  "체크메이트": "Checkmate",
  "복습할 모듈을 골라 한 문제로 확인해 볼까요?": "Choose a completed module for a review quiz.",
  "복습할 모듈을 골라 네 문제로 확인해 볼까요?": "Choose a completed module for a four-question review.",
  "복습 퀴즈 시작": "Start Review Quiz",
  "완료한 모듈이 없습니다": "No completed modules",
  "답글 입력": "Write a reply",
  "답글 등록": "Post reply",
  "체크에서 벗어나는 법": "Escaping Check",
  "훈련장으로 →": "Go to Training →",
  "참가 코드": "Join Code",
  "참여하기": "Join",
  "리그 만들기": "Create League",
  "참여": "Join",
  "코드 생성": "Generate Code",
  "코드 생성 전": "No code yet",
  "새 리그 코드 생성": "Create League Code",
  "아직 참여한 리그가 없습니다.": "You have not joined a league yet.",
  "퀵 매칭": "Quick Match",
  "게임 만들기": "Create Game",
  "친구와 플레이": "Play with a Friend",
  "상대 찾기": "Find an Opponent",
  "시간 제한": "Time Control",
  "열린 방": "Open Rooms",
  "대기 중인 대국": "Waiting Games",
  "새로고침": "Refresh",
  "맞춤": "Custom",
  "방 만들기": "Create Room",
  "코드로 참여": "Join with Code",
  "대국 설정": "Game Settings",
  "친선": "Casual",
  "기록": "Rated",
  "비공개": "Private",
  "방 링크": "Room Link",
  "방 링크 복사": "Copy Room Link",
  "대국 복습": "Game Review",
  "단어 상자": "Vocabulary Chest",
  "문화 교류 메모": "Cultural Exchange Notes",
  "문화 노트에 저장": "Save to Culture Notes",
  "공지": "Notice",
  "질문": "Question",
  "자유": "Free",
  "새 글": "New Post",
  "제목": "Title",
  "분류": "Category",
  "내용": "Content",
  "게시": "Publish",
  "설정": "Settings",
  "화면 언어": "Display Language",
  "영어": "English",
  "한국어": "Korean",
  "읽기 편하게": "Reading Comfort",
  "고대비": "High Contrast",
  "앱 글자 크기": "App Text Size",
  "계정": "Account",
  "계정 삭제": "Delete Account",
  "로그아웃": "Log Out",
  "비밀번호 바꾸기": "Change Password",
  "삭제하려면 아래에": "To delete, type",
  "를 입력하세요.": "below.",
  "저장된 프로필을 불러오려면 로그인하세요.": "Sign in to load your saved profile.",
  "프로필을 불러오는 중...": "Loading profile...",
  "프로필을 저장하는 중...": "Saving profile...",
  "프로필이 저장되었습니다.": "Profile saved.",
  "Easy Elo를 올리며 훈련 중입니다.": "Training to raise my Easy Elo.",
  "연속 학습일": "Learning Streak",
  "받은 배지": "Badges Earned",
  "첫 출석": "First Check-in",
  "첫 플레이": "First Game",
  "대화 리스너": "Conversation Listener",
  "매너 플레이어": "Manner Player",
  "복습 퀴즈": "Review Quiz",
  "다시 학습": "Study Again",
  "학습 가능": "Available",
  "잠김": "Locked",
  "이전 모듈을 먼저 완료하세요": "Complete the previous module first.",
  "시작하기": "Start",
  "모든 훈련 모듈을 완료하면 퍼즐을 열 수 있습니다.": "Complete all training modules to unlock puzzles.",
  "퍼즐": "Puzzles",
});
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();
let applyingLanguage = false;
let interfaceLanguageObserver = null;
let languageApplyFrame = 0;
const pendingLanguageRoots = new Set();

function currentInterfaceLanguage() {
  return languageSelect?.value || "Korean";
}

function translateCopy(value) {
  const text = String(value ?? "");
  return currentInterfaceLanguage() === "Korean" ? koreanText[text] || text : englishText[text] || text;
}

function originalCopy(value) {
  const text = String(value ?? "");
  return englishText[text] || text;
}

function canonicalOriginalText(value) {
  const text = String(value ?? "");
  const leading = text.match(/^\s*/)?.[0] || "";
  const trailing = text.match(/\s*$/)?.[0] || "";
  const trimmed = text.trim();
  if (!trimmed) return text;
  return `${leading}${originalCopy(trimmed)}${trailing}`;
}

function updateLandingHeroCopy() {
  const entryTitle = document.querySelector("#entryTitle");
  if (!entryTitle) return;
  entryTitle.innerHTML =
    currentInterfaceLanguage() === "Korean"
      ? "EasyMate"
      : "EasyMate";
}

function translateTextNode(node) {
  const currentText = node.textContent;
  if (!currentText || !currentText.trim()) return;

  let original = originalTextNodes.get(node);
  if (currentInterfaceLanguage() === "Korean") {
    const currentTrimmed = currentText.trim();
    const previousTranslation = original ? translateCopy(original.trim()) : null;
    if (!original || currentTrimmed !== previousTranslation) {
      original = canonicalOriginalText(currentText);
      originalTextNodes.set(node, original);
    }
    const trimmed = original.trim();
    const translated = koreanText[trimmed];
    if (!translated) return;
    if (node.parentElement?.tagName === "OPTION" && !node.parentElement.hasAttribute("value")) {
      node.parentElement.value = trimmed;
    }
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    node.textContent = `${leading}${translated}${trailing}`;
    return;
  }

  if (original) {
    node.textContent = canonicalOriginalText(original);
    return;
  }
  const canonical = canonicalOriginalText(currentText);
  if (canonical !== currentText) {
    originalTextNodes.set(node, canonical);
    node.textContent = canonical;
  }
}

function translateAttribute(element, attribute) {
  if (!element.hasAttribute(attribute)) return;
  const currentValue = element.getAttribute(attribute);
  if (!currentValue) return;

  let originals = originalAttributes.get(element);
  if (!originals) {
    originals = {};
    originalAttributes.set(element, originals);
  }

  if (currentInterfaceLanguage() === "Korean") {
    const previousTranslation = originals[attribute] ? translateCopy(originals[attribute]) : null;
    if (!originals[attribute] || currentValue !== previousTranslation) originals[attribute] = originalCopy(currentValue);
    const translated = koreanText[originals[attribute]];
    if (translated) element.setAttribute(attribute, translated);
    return;
  }

  if (originals[attribute]) {
    element.setAttribute(attribute, originalCopy(originals[attribute]));
    return;
  }
  const canonical = originalCopy(currentValue);
  if (canonical !== currentValue) {
    originals[attribute] = canonical;
    element.setAttribute(attribute, canonical);
  }
}

function applyInterfaceLanguage(root = document.body) {
  if (!root || applyingLanguage) return;
  applyingLanguage = true;
  document.documentElement.lang = currentInterfaceLanguage() === "Korean" ? "ko" : "en";
  updateLandingHeroCopy();

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(translateTextNode);

  root.querySelectorAll?.("[placeholder], [aria-label], [title]").forEach((element) => {
    ["placeholder", "aria-label", "title"].forEach((attribute) => translateAttribute(element, attribute));
  });
  applyingLanguage = false;
  syncLocalizedControls();
}

function syncLocalizedControls() {
  const korean = currentInterfaceLanguage() === "Korean";
  document.querySelectorAll("[data-profile-language]").forEach((input) => {
    input.checked = input.value === currentInterfaceLanguage();
  });
  const setText = (element, text) => {
    if (element && element.textContent !== text) element.textContent = text;
  };
  setText(document.querySelector('[data-leaderboard-scope="mine"]'), korean ? "내 리그" : "My league");
  setText(document.querySelector('[data-leaderboard-scope="all"]'), korean ? "전체" : "All");
  setText(document.querySelector('[data-leaderboard-period="weekly"]'), korean ? "주간" : "Weekly");
  setText(document.querySelector('[data-leaderboard-period="alltime"]'), korean ? "전체 기간" : "All time");
  setText(document.querySelector('[data-league-action="join"]'), korean ? "참여하기" : "Join");
  setText(document.querySelector('[data-league-action="create"]'), korean ? "리그 만들기" : "Create league");
  setText(joinLeagueButton, korean ? "참여" : "Join");
  setText(createLeagueButton, korean ? "코드 생성" : "Generate code");
  closeLeagueActionPopoverButton?.setAttribute("aria-label", korean ? "리그 코드 창 닫기" : "Close league code dialog");
  setText(mainTutorialButton, korean ? "훈련장으로 가기" : "Go to training");
  if (!currentUser) {
    setText(loginButton, korean ? "로그인" : "Login");
    setText(signupButton, korean ? "새 계정" : "New account");
    setText(authSubmit, authMode === "login" ? (korean ? "로그인" : "Log in") : (korean ? "계정 만들기" : "Create account"));
  }
  setText(tutorialLoginButton, korean ? "로그인 화면으로 가기" : "Go to login");
  renderLeagueAction();
  renderTodayQuests();
  renderTrainingControls();
}

function observeInterfaceLanguage() {
  interfaceLanguageObserver?.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

function scheduleInterfaceLanguageApply(root = document.body) {
  const element = root instanceof Element ? root : root?.parentElement;
  if (element) pendingLanguageRoots.add(element);
  if (languageApplyFrame) return;
  languageApplyFrame = window.requestAnimationFrame(() => {
    languageApplyFrame = 0;
    interfaceLanguageObserver?.disconnect();
    const roots = [...pendingLanguageRoots].filter(
      (candidate, index, candidates) => !candidates.some((other, otherIndex) => otherIndex !== index && other.contains(candidate)),
    );
    pendingLanguageRoots.clear();
    roots.forEach((candidate) => applyInterfaceLanguage(candidate));
    observeInterfaceLanguage();
  });
}

const pieceCodes = {
  white: {
    p: "wp",
    n: "wn",
    b: "wb",
    r: "wr",
    q: "wq",
    k: "wk",
  },
  black: {
    p: "bp",
    n: "bn",
    b: "bb",
    r: "br",
    q: "bq",
    k: "bk",
  },
};

const pieceNames = {
  p: "pawn",
  n: "knight",
  b: "bishop",
  r: "rook",
  q: "queen",
  k: "king",
};

const pieceEditionNames = {
  original: "Original Edition",
  cheoinseong: "Cheoinseong Edition",
  beta: "Beta Edition",
};

function normalizePieceEdition(edition) {
  return Object.prototype.hasOwnProperty.call(pieceEditionNames, edition) ? edition : "cheoinseong";
}

function betaPieceSvg(pieceCode) {
  const color = pieceCode?.[0] === "w" ? "white" : "black";
  const type = pieceCode?.[1] || "p";
  const light = color === "white";
  const fill = light ? "#fbf6e8" : "#10202a";
  const stroke = light ? "#40514f" : "#071117";
  const accent = light ? "#d9d1be" : "#28434b";
  const common = `fill="${fill}" stroke="${stroke}" stroke-width="4.6" stroke-linejoin="round" stroke-linecap="round"`;
  const base = `<path ${common} d="M22 78h56l7 10H15z"/><path ${common} d="M29 67h42l5 11H24z"/>`;
  const details = {
    p: `<circle ${common} cx="50" cy="27" r="13"/><path ${common} d="M37 67c3-19 8-27 13-27s10 8 13 27z"/>${base}`,
    n: `<path ${common} d="M30 78c5-18 5-31 18-43l-9-13c19 1 34 10 40 25 4 10 0 21-11 29l8 12H27z"/><path fill="${accent}" stroke="${stroke}" stroke-width="3" d="M50 33l-6 9 12-3z"/><circle fill="${light ? stroke : "#d8efe8"}" cx="61" cy="42" r="2.7"/>${base}`,
    b: `<path ${common} d="M50 14c15 11 22 25 14 39-4 8-10 12-14 18-4-6-10-10-14-18-8-14-1-28 14-39z"/><path fill="none" stroke="${stroke}" stroke-width="4" d="M56 29L44 47"/>${base}`,
    r: `<path ${common} d="M24 20h11v9h10v-9h10v9h10v-9h11v24H24z"/><path ${common} d="M31 44h38v27H31z"/>${base}`,
    q: `<circle fill="${fill}" stroke="${stroke}" stroke-width="4" cx="25" cy="27" r="6"/><circle fill="${fill}" stroke="${stroke}" stroke-width="4" cx="50" cy="20" r="6"/><circle fill="${fill}" stroke="${stroke}" stroke-width="4" cx="75" cy="27" r="6"/><path ${common} d="M22 35l13 30h30l13-30-20 17-8-26-8 26z"/>${base}`,
    k: `<path fill="none" stroke="${stroke}" stroke-width="6" d="M50 13v24M39 25h22"/><path ${common} d="M50 34c13 8 19 18 18 33H32c-1-15 5-25 18-33z"/>${base}`,
  };

  return `<svg viewBox="0 0 100 100" role="img" aria-label="${color} ${pieceNames[type] || "piece"}">${details[type] || details.p}</svg>`;
}

function cheoinseongPieceSvg(pieceCode) {
  const color = pieceCode?.[0] === "w" ? "white" : "black";
  const type = pieceCode?.[1] || "p";
  const assets = {
    wp: "/assets/cheoinseong/pieces/goryeo-people-pawn.png?v=20260904-board-grounding",
    wn: "/assets/cheoinseong/pieces/goryeo-cavalry-knight.png?v=20260904-board-grounding",
    wb: "/assets/cheoinseong/pieces/goryeo-monk-soldier-bishop.png?v=20260904-board-grounding",
    wr: "/assets/cheoinseong/pieces/goryeo-cheoinseong-wall-rook.png?v=20260904-board-grounding",
    wk: "/assets/cheoinseong/pieces/goryeo-king.png?v=20260904-board-grounding",
    bp: "/assets/cheoinseong/pieces/mongol-infantry-pawn.png?v=20260904-board-grounding",
    bn: "/assets/cheoinseong/pieces/mongol-cavalry-knight.png?v=20260904-board-grounding",
    bb: "/assets/cheoinseong/pieces/mongol-adviser-bishop.png?v=20260904-board-grounding",
    br: "/assets/cheoinseong/pieces/mongol-siege-tower-rook.png?v=20260904-board-grounding",
    bk: "/assets/cheoinseong/pieces/mongol-salitai-king-v2.png?v=20260904-board-grounding",
  };
  const asset = assets[pieceCode] || assets.wp;
  return `<img class="cheoinseong-piece-image cheoinseong-piece-${type}" src="${asset}" alt="${pieceEditionNames.cheoinseong} ${color} ${pieceNames[type] || "piece"}" decoding="async">`;

  const goryeo = color === "white";
  const fill = goryeo ? "#f4ead5" : "#4b241b";
  const robe = goryeo ? "#7b9276" : "#7f3228";
  const trim = goryeo ? "#b9934b" : "#c29a50";
  const stroke = goryeo ? "#263831" : "#1b0f0d";
  const shadow = goryeo ? "#d8ccb4" : "#2a1714";
  const common = `stroke="${stroke}" stroke-width="4.2" stroke-linejoin="round" stroke-linecap="round"`;
  const base = `<path fill="${shadow}" ${common} d="M20 79h60l7 10H13z"/><path fill="${goryeo ? "#7c8f72" : "#5b251f"}" ${common} d="M29 69h42l6 11H23z"/>`;
  const bead = `<circle fill="${trim}" stroke="${stroke}" stroke-width="2.2" cx="42" cy="43" r="2.8"/><circle fill="${trim}" stroke="${stroke}" stroke-width="2.2" cx="50" cy="45" r="2.8"/><circle fill="${trim}" stroke="${stroke}" stroke-width="2.2" cx="58" cy="43" r="2.8"/>`;
  const details = goryeo
    ? {
        p: `<circle fill="${fill}" ${common} cx="50" cy="26" r="12"/><path fill="${robe}" ${common} d="M36 68c2-16 8-26 14-26s12 10 14 26z"/><path fill="none" stroke="${trim}" stroke-width="3" d="M42 48l16 13"/>${base}`,
        n: `<path fill="${fill}" ${common} d="M27 73c2-22 18-38 34-43 16 8 21 23 13 38l7 14H25z"/><path fill="${robe}" stroke="${stroke}" stroke-width="3" d="M46 39l-7 11 14-5z"/><circle fill="${stroke}" cx="61" cy="45" r="2.6"/>${base}`,
        b: `<circle fill="${fill}" ${common} cx="50" cy="23" r="11"/><path fill="${robe}" ${common} d="M34 68c4-22 10-33 16-33s12 11 16 33z"/>${bead}<path fill="none" stroke="${trim}" stroke-width="3.2" d="M50 35v30"/>${base}`,
        r: `<path fill="#7c7668" ${common} d="M23 27h11v-7h12v7h8v-7h12v7h11v17H23z"/><path fill="#8b8170" ${common} d="M28 43h44v29H28z"/><path fill="none" stroke="${stroke}" stroke-width="3" d="M36 52h28M36 62h28M44 44v28M57 44v28"/>${base}`,
        q: `<path fill="${robe}" ${common} d="M23 67c4-23 13-36 27-36s23 13 27 36z"/><path fill="none" stroke="${trim}" stroke-width="4" d="M33 26h34M50 14v18"/><circle fill="${trim}" stroke="${stroke}" stroke-width="3" cx="50" cy="18" r="7"/>${bead}${base}`,
        k: `<path fill="${robe}" ${common} d="M25 68c4-22 14-34 25-34s21 12 25 34z"/><circle fill="${fill}" ${common} cx="50" cy="25" r="12"/><path fill="none" stroke="${trim}" stroke-width="4" d="M35 20c9-7 21-7 30 0"/><path fill="none" stroke="${trim}" stroke-width="3" d="M70 20c7 15 6 29-2 43"/>${bead}${base}`,
      }
    : {
        p: `<circle fill="${fill}" ${common} cx="50" cy="27" r="12"/><path fill="${robe}" ${common} d="M35 68c3-17 9-27 15-27s12 10 15 27z"/><path fill="none" stroke="${trim}" stroke-width="3" d="M39 46h22M50 39v29"/>${base}`,
        n: `<path fill="${fill}" ${common} d="M26 74c3-24 19-40 35-45 17 9 22 25 13 40l7 13H25z"/><path fill="${robe}" stroke="${stroke}" stroke-width="3" d="M45 39l-7 11 14-5z"/><circle fill="${trim}" cx="61" cy="44" r="2.7"/>${base}`,
        b: `<path fill="${robe}" ${common} d="M49 15c13 11 18 22 15 34-3 10-8 15-14 20-6-5-11-10-14-20-3-12 2-23 13-34z"/><path fill="none" stroke="${trim}" stroke-width="4" d="M38 30c8 5 17 5 25 0"/><circle fill="${trim}" stroke="${stroke}" stroke-width="3" cx="50" cy="24" r="6"/>${base}`,
        r: `<path fill="#6a3c23" ${common} d="M25 25h9v-7h12v7h8v-7h12v7h9v17H25z"/><path fill="#7b4728" ${common} d="M29 42h42v31H29z"/><path fill="none" stroke="${trim}" stroke-width="3" d="M37 51h26M37 61h26M45 43v30M57 43v30"/>${base}`,
        q: `<circle fill="${trim}" stroke="${stroke}" stroke-width="4" cx="25" cy="28" r="6"/><circle fill="${trim}" stroke="${stroke}" stroke-width="4" cx="50" cy="19" r="6"/><circle fill="${trim}" stroke="${stroke}" stroke-width="4" cx="75" cy="28" r="6"/><path fill="${robe}" ${common} d="M22 36l14 30h28l14-30-20 16-8-25-8 25z"/>${base}`,
        k: `<path fill="${robe}" ${common} d="M28 68c3-20 12-32 22-32s19 12 22 32z"/><circle fill="${fill}" ${common} cx="50" cy="26" r="11"/><path fill="none" stroke="${trim}" stroke-width="4" d="M38 18h24M50 13v20"/><path fill="none" stroke="${trim}" stroke-width="3" d="M65 36l7 26"/>${base}`,
      };

  return `<svg viewBox="0 0 100 100" role="img" aria-label="${pieceEditionNames.cheoinseong} ${color} ${pieceNames[type] || "piece"}">${details[type] || details.p}</svg>`;
}

function originalPieceSprite(pieceCode) {
  const color = pieceCode?.[0] === "w" ? "white" : "black";
  const type = pieceCode?.[1] || "p";
  return `<img class="original-piece-image original-piece-${type}" src="/assets/original-chess-pieces-v1/${type}.png" alt="${pieceEditionNames.original} ${color} ${pieceNames[type] || "piece"}" decoding="async">`;
}

function pieceSvg(pieceCode, edition = "beta") {
  const normalizedEdition = normalizePieceEdition(edition);
  if (normalizedEdition === "original") return originalPieceSprite(pieceCode);
  return normalizedEdition === "cheoinseong" ? cheoinseongPieceSvg(pieceCode) : betaPieceSvg(pieceCode);
}

const initialPieces = {
  a8: "br",
  b8: "bn",
  c8: "bb",
  d8: "bq",
  e8: "bk",
  f8: "bb",
  g8: "bn",
  h8: "br",
  a7: "bp",
  b7: "bp",
  c7: "bp",
  d7: "bp",
  e7: "bp",
  f7: "bp",
  g7: "bp",
  h7: "bp",
  a2: "wp",
  b2: "wp",
  c2: "wp",
  d2: "wp",
  e2: "wp",
  f2: "wp",
  g2: "wp",
  h2: "wp",
  a1: "wr",
  b1: "wn",
  c1: "wb",
  d1: "wq",
  e1: "wk",
  f1: "wb",
  g1: "wn",
  h1: "wr",
};

const missions = [
  "상대가 좋아하는 오프닝을 물어보세요.",
  "좋았던 수 하나를 칭찬하고 왜 그 수를 골랐는지 물어보세요.",
  "다음 수를 한 문장으로 짧게 설명해보세요.",
  "파트너의 언어로 '좋은 경기였어요'를 어떻게 말하는지 물어보세요.",
  "체스 표현 하나를 자막으로 말해 연습해보세요.",
];

const queueTips = [
  {
    ko: "첫 수를 두기 전에 상대에게 좋아하는 오프닝을 물어보세요.",
    en: "Before the first move, ask your opponent about their favorite opening.",
  },
  {
    ko: "기물이 공격받으면 먼저 안전한 칸, 막는 수, 잡는 수를 차례로 확인해보세요.",
    en: "When a piece is attacked, check safe squares, blocks, and captures in that order.",
  },
  {
    ko: "대국 중에는 짧은 문장 하나만 말해도 충분합니다. '좋은 수네요'부터 시작해보세요.",
    en: "One short sentence is enough during a match. Start with 'Nice move.'",
  },
  {
    ko: "상대의 마지막 수를 확인한 뒤 내 수를 고르면 실수를 줄일 수 있어요.",
    en: "Review your opponent's last move before choosing yours to reduce mistakes.",
  },
  {
    ko: "매칭은 이 화면을 떠나도 계속됩니다. 홈의 진행 중인 대국에서 다시 들어올 수 있어요.",
    en: "Matching continues if you leave this screen. Re-enter from the active match panel on Home.",
  },
];

const defaultReview = {
  vocabulary: [
    {
      term: "calm position",
      translation: "침착한 포지션",
      context: "공격하기 전 조용한 오프닝을 고른 이유를 설명할 때 나온 표현입니다.",
      pronunciationText: "calm position",
      language: "en-US",
    },
    {
      term: "London System",
      translation: "런던 시스템",
      context: "초보자도 안정적으로 둘 수 있는 계획을 이야기할 때 나온 오프닝입니다.",
      pronunciationText: "London System",
      language: "en-US",
    },
    {
      term: "knight fork",
      translation: "나이트 포크",
      context: "나이트가 두 기물을 동시에 공격했을 때 나온 표현입니다.",
      pronunciationText: "knight fork",
      language: "en-US",
    },
    {
      term: "center control",
      translation: "중앙 장악",
      context: "어떤 수가 전략적으로 좋은지 설명할 때 쓰기 좋은 표현입니다.",
      pronunciationText: "center control",
      language: "en-US",
    },
    {
      term: "good game",
      translation: "좋은 경기였어요",
      context: "대국이 끝난 뒤 예의 있게 마무리할 때 쓰는 말입니다.",
      pronunciationText: "good game",
      language: "en-US",
    },
  ],
  culturalInsight: {
    title: '"GG" 인사 표현 발견',
    summary: 'AI가 "GG"와 "good game"을 서로 존중하는 마무리 표현으로 확인했습니다.',
    researchPrompt: "파트너의 언어에서는 대국 뒤 어떤 말로 예의를 표현하나요?",
  },
};

let pieces = { ...initialPieces };
let queueInterval;
let queuePollInterval;
let queuePollBusy = false;
let missionIndex = 0;
let currentManner = 42.8;
let backendOnline = false;
let currentUser = null;
let selectedPieceEdition = "cheoinseong";
let currentMatchPlayers = [];
let currentMatchId = null;
let resumableMatch = null;
let resumableOpenSeek = null;
let resumableChallenge = null;
let queueTipIndex = 0;
let drawOfferFromOpponent = false;
let selectedSquare = null;
let legalMoveTargets = [];
let boardOrientation = "white";
let socket = null;
let authMode = "login";
let googleClientId = "";
let googleLoginReady = false;
let googleScriptPromise = null;
let boardInitialized = false;
let reviewInitialized = false;
let forumInitialized = false;
let forumPollInterval = null;
let forumRefreshPromise = null;
let forumPostsSignature = "";
let trainingModuleRenderSignature = "";
let puzzlePathRenderSignature = "";
let shopInitialized = false;
let cachedSpeechVoices = [];
let peerConnection = null;
let localVoiceStream = null;
let pendingVoiceOffer = null;
let makingVoiceOffer = false;
let ignoredVoiceOffer = false;
let pendingIceCandidates = [];
let voiceConnectTimeout = null;
let voiceOfferRetryTimer = null;
let voiceOfferRetryCount = 0;
let voiceRtcConfig = null;
let voiceRtcConfigLoadedAt = 0;
let clockSnapshot = null;
let clockInterval = null;
let timeoutNotifiedFor = null;
let speechRecognition = null;
let sttListening = false;
let sttShouldRestart = false;
let sttInterimLines = [];
let sttSessionStart = null;
let sttSessionTimer = null;
let cachedAdminData = null;
let cachedLobbyData = null;
let adminCommandBuffer = "";
let adminSearchFrame = 0;
let forumFilter = "Question";
let forumPosts = [];
let expandedForumPostId = null;
let staffShopProducts = [];
let deletedShopProductIds = [];

const defaultShopProducts = [
  {
    id: "default-founders-board",
    tag: "Prototype",
    name: "Founder's Board",
    description: "Portable tournament-size board for live matches, captions, and lesson review.",
    price: "$149 estimated",
  },
  {
    id: "default-coach-board",
    tag: "Studio",
    name: "Coach Board",
    description: "Larger tabletop board for tutors, clubs, and language exchange sessions.",
    price: "$229 estimated",
  },
  {
    id: "default-travel-kit",
    tag: "Accessory",
    name: "Travel Kit",
    description: "Compact pieces, carrying case, and setup guide for in-person practice games.",
    price: "$49 estimated",
  },
];

const voiceClientId =
  window.crypto?.randomUUID?.() || `voice_${Date.now()}_${Math.random().toString(16).slice(2)}`;

const fallbackRtcConfig = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
      ],
    },
  ],
  iceCandidatePoolSize: 4,
};

function setVoiceStatus(message, statusElement) {
  if (statusElement) statusElement.textContent = message;
  voiceStatusMessages.forEach((element) => {
    if (element !== statusElement) element.textContent = message;
  });
}

function sendSocketMessage(data) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return false;
  socket.send(JSON.stringify(data));
  return true;
}

function sendVoiceSignal(data) {
  if (!currentMatchId) return false;
  return sendSocketMessage({
    ...data,
    matchId: currentMatchId,
    from: voiceClientId,
  });
}

function sendSubtitleSignal(data) {
  if (!currentMatchId) return false;
  return sendSocketMessage({
    ...data,
    type: "stt:subtitle",
    matchId: currentMatchId,
    from: voiceClientId,
    speaker: sttSpeakerName(),
    sourceLanguage: sttLanguage(),
  });
}

function waitForSocketOpen() {
  if (socket?.readyState === WebSocket.OPEN) return Promise.resolve(true);
  if (!socket || socket.readyState !== WebSocket.CONNECTING) return Promise.resolve(false);

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => resolve(false), 2500);
    socket.addEventListener(
      "open",
      () => {
        window.clearTimeout(timeout);
        resolve(true);
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        window.clearTimeout(timeout);
        resolve(false);
      },
      { once: true },
    );
  });
}

function updateSpeechVoices() {
  if (!("speechSynthesis" in window)) return [];
  cachedSpeechVoices = window.speechSynthesis.getVoices();
  return cachedSpeechVoices;
}

if ("speechSynthesis" in window) {
  updateSpeechVoices();
  window.speechSynthesis.onvoiceschanged = updateSpeechVoices;
}

function speakText(text, options = {}) {
  const phrase = String(text || "").trim();
  const statusElement = options.statusElement || null;
  const label = options.label || phrase;

  if (!phrase) {
    setVoiceStatus("No voice text is available.", statusElement);
    return false;
  }

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    setVoiceStatus("Voice playback is not available in this browser.", statusElement);
    return false;
  }

  const lang = options.lang || "en-US";
  const voices = updateSpeechVoices();
  const langRoot = lang.split("-")[0];
  const voice =
    voices.find((item) => item.lang === lang) ||
    voices.find((item) => item.lang?.startsWith(langRoot)) ||
    voices.find((item) => item.default);

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(phrase);
  utterance.lang = lang;
  utterance.rate = options.rate || 0.88;
  utterance.pitch = options.pitch || 1;
  if (voice) utterance.voice = voice;

  utterance.onstart = () => setVoiceStatus(`Playing: ${label}`, statusElement);
  utterance.onend = () => setVoiceStatus(`Finished: ${label}`, statusElement);
  utterance.onerror = () => {
    setVoiceStatus("Could not play audio. Check browser or system sound, then click again.", statusElement);
  };

  setVoiceStatus(`Starting: ${label}`, statusElement);
  window.speechSynthesis.speak(utterance);
  window.setTimeout(() => window.speechSynthesis.resume(), 120);
  return true;
}

function showQueueTip(index = queueTipIndex) {
  if (!queueTip || !queueTips.length) return;
  queueTipIndex = ((index % queueTips.length) + queueTips.length) % queueTips.length;
  const item = queueTips[queueTipIndex];
  queueTip.textContent = currentInterfaceLanguage() === "Korean" ? item.ko : item.en;
}

function renderActiveMatchReturn() {
  if (!activeMatchReturn) return;
  const hasMatch = Boolean(resumableMatch && !["ended", "waiting"].includes(resumableMatch.status));
  const hasWaitingRoom = Boolean(resumableChallenge || resumableOpenSeek);
  activeMatchReturn.hidden = !hasMatch && !hasWaitingRoom;
  if (activeMatchReturn.hidden) return;

  const isWaiting = resumableMatch?.status === "waiting" || hasWaitingRoom;
  activeMatchReturnLabel.textContent = currentInterfaceLanguage() === "Korean"
    ? isWaiting ? "친구 입장 대기 중" : "진행 중인 대국"
    : isWaiting ? "Waiting room" : "Active match";
  activeMatchReturnTitle.textContent = currentInterfaceLanguage() === "Korean"
    ? isWaiting ? "만든 방으로 돌아갈 수 있어요." : "두던 대국을 이어서 진행하세요."
    : isWaiting ? "Return to the room you created." : "Continue your active match.";
  const code = resumableChallenge?.code;
  const timeControl = resumableMatch?.timeControl || resumableOpenSeek?.timeControl || "10+0";
  activeMatchReturnMeta.textContent = currentInterfaceLanguage() === "Korean"
    ? `${timeControl}${code ? ` · 초대 코드 ${code}` : ""}`
    : `${timeControl}${code ? ` · Invite code ${code}` : ""}`;
  resumeMatchButton.textContent = currentInterfaceLanguage() === "Korean"
    ? isWaiting ? "방으로 돌아가기" : "대국 계속하기"
    : isWaiting ? "Return to room" : "Continue match";
}

function rememberMatch(match) {
  if (!match || match.status === "ended") {
    if (resumableMatch?.id === match?.id) resumableMatch = null;
  } else {
    resumableMatch = match;
  }
  renderActiveMatchReturn();
}

function clearCurrentMatch() {
  currentMatchId = null;
  currentMatchPlayers = [];
  resumableMatch = null;
  resumableChallenge = null;
  resumableOpenSeek = null;
  updateRoomLink(null);
  renderActiveMatchReturn();
}

function syncLegalLanguage() {
  const language = currentInterfaceLanguage() === "Korean" ? "ko" : "en";
  document.querySelectorAll("[data-legal-language]").forEach((section) => {
    section.hidden = section.dataset.legalLanguage !== language;
  });
}

function openLegalDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (!(dialog instanceof HTMLDialogElement)) return;
  syncLegalLanguage();
  dialog.showModal();
  dialog.querySelector("[data-close-dialog]")?.focus();
}

function setMatchState(state) {
  const allowedStates = new Set(["idle", "searching", "playing", "ended"]);
  const nextState = allowedStates.has(state) ? state : "idle";
  const isIdle = nextState === "idle";
  const isPlaying = nextState === "playing";
  const isEnded = nextState === "ended";

  matchLayout.dataset.state = nextState;
  matchLayout.classList.toggle("paired", isPlaying);
  findMatchButton.hidden = !isIdle;
  showCreateSeekButton.hidden = !isIdle;
  showFriendRoomButton.hidden = !isIdle;
  cancelMatchSearchButton.hidden = nextState !== "searching";
  if (queueTipPanel) queueTipPanel.hidden = nextState !== "searching";
  matchLayout.classList.toggle("queue-active", nextState === "searching");
  if (generateReviewButton) generateReviewButton.hidden = true;
  newGameButton.hidden = !isEnded;
  if (matchHomeButton) matchHomeButton.hidden = !isEnded;
  if (!isIdle) seekComposer.hidden = true;

  const titles = {
    idle: translateCopy("Find a game"),
    searching: translateCopy("Finding a player"),
    playing: translateCopy("Live match"),
    ended: translateCopy("Match result"),
  };
  const matchTitle = document.querySelector("#matchTitle");
  if (matchTitle) matchTitle.textContent = titles[nextState];
}

function isVoiceCallSupported() {
  return Boolean(
    navigator.mediaDevices?.getUserMedia &&
      window.RTCPeerConnection &&
      window.RTCSessionDescription &&
      window.RTCIceCandidate,
  );
}

function setVoiceCallButtons(active) {
  startVoiceCallButton.disabled = active;
  endVoiceCallButton.disabled = !active;
}

function isVoiceConnected() {
  return (
    peerConnection?.connectionState === "connected" ||
    peerConnection?.iceConnectionState === "connected" ||
    peerConnection?.iceConnectionState === "completed"
  );
}

function clearVoiceConnectTimer() {
  window.clearTimeout(voiceConnectTimeout);
  voiceConnectTimeout = null;
}

function clearVoiceOfferRetry() {
  window.clearInterval(voiceOfferRetryTimer);
  voiceOfferRetryTimer = null;
  voiceOfferRetryCount = 0;
}

function startVoiceConnectTimer() {
  clearVoiceConnectTimer();
  voiceConnectTimeout = window.setTimeout(() => {
    if (isVoiceConnected()) return;
    setVoiceStatus("Voice is taking longer than expected. Make sure your partner clicked Start mic, or tap End voice and Start mic again.");
  }, 10000);
}

function sendCurrentVoiceOffer(statusMessage = "") {
  const connection = ensureVoicePeerConnection();
  if (connection.localDescription?.type !== "offer") return false;
  const sent = sendVoiceSignal({
    type: "voice:offer",
    description: connection.localDescription,
    retry: voiceOfferRetryCount,
  });
  if (!sent) return false;
  if (statusMessage) setVoiceStatus(statusMessage);
  return true;
}

function scheduleVoiceOfferRetry() {
  clearVoiceOfferRetry();
  voiceOfferRetryTimer = window.setInterval(() => {
    if (isVoiceConnected() || peerConnection?.remoteDescription) {
      clearVoiceOfferRetry();
      return;
    }
    voiceOfferRetryCount += 1;
    if (voiceOfferRetryCount > 4) {
      clearVoiceOfferRetry();
      setVoiceStatus("Still waiting for partner voice. Ask them to tap Start mic, then try again if needed.");
      return;
    }
    sendCurrentVoiceOffer("Re-sending voice invite...");
  }, 2200);
}

function isSecureVoiceContext() {
  return (
    location.protocol === "https:" ||
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1"
  );
}

async function loadVoiceRtcConfig() {
  const now = Date.now();
  if (voiceRtcConfig && now - voiceRtcConfigLoadedAt < 10 * 60 * 1000) return voiceRtcConfig;
  voiceRtcConfig = fallbackRtcConfig;
  voiceRtcConfigLoadedAt = now;

  if (!backendOnline || !currentUser) return voiceRtcConfig;
  try {
    const data = await api("/api/voice/ice-servers");
    if (Array.isArray(data.iceServers) && data.iceServers.length) {
      voiceRtcConfig = {
        ...fallbackRtcConfig,
        iceServers: data.iceServers,
      };
      voiceRtcConfigLoadedAt = Date.now();
      if (data.provider === "metered-openrelay") setVoiceStatus("TURN relay ready. Starting voice...");
    }
  } catch {
    voiceRtcConfig = fallbackRtcConfig;
  }
  return voiceRtcConfig;
}

async function flushPendingIceCandidates() {
  if (!peerConnection?.remoteDescription) return;
  const candidates = pendingIceCandidates;
  pendingIceCandidates = [];
  for (const candidate of candidates) {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  }
}

function ensureVoicePeerConnection() {
  if (peerConnection) return peerConnection;

  peerConnection = new RTCPeerConnection(voiceRtcConfig || fallbackRtcConfig);

  peerConnection.addEventListener("icecandidate", (event) => {
    if (!event.candidate) return;
    sendVoiceSignal({
      type: "voice:ice",
      candidate: event.candidate,
    });
  });

  peerConnection.addEventListener("track", (event) => {
    const [stream] = event.streams;
    if (stream) remoteVoiceAudio.srcObject = stream;
    remoteVoiceAudio.play().catch(() => {
      setVoiceStatus("Partner voice is connected. Click the page if your browser blocks audio.");
    });
    voiceRing.classList.add("speaking");
    setVoiceStatus("Partner voice connected.");
  });

  peerConnection.addEventListener("connectionstatechange", () => {
    const state = peerConnection.connectionState;
    if (state === "connected") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call connected.");
    }
    if (state === "connecting") setVoiceStatus("Connecting voice call...");
    if (state === "failed" || state === "disconnected") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call disconnected. You can start it again.");
      setVoiceCallButtons(Boolean(localVoiceStream));
    }
    if (state === "closed") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call ended.");
    }
  });

  peerConnection.addEventListener("iceconnectionstatechange", () => {
    const state = peerConnection.iceConnectionState;
    if (state === "connected" || state === "completed") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice call connected.");
    }
    if (state === "failed") {
      clearVoiceConnectTimer();
      clearVoiceOfferRetry();
      setVoiceStatus("Voice route failed. Tap End voice, then Start mic again.");
      setVoiceCallButtons(Boolean(localVoiceStream));
    }
  });

  return peerConnection;
}

async function attachLocalVoiceStream() {
  if (localVoiceStream) return localVoiceStream;

  localVoiceStream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
    video: false,
  });

  const connection = ensureVoicePeerConnection();
  localVoiceStream.getTracks().forEach((track) => connection.addTrack(track, localVoiceStream));
  return localVoiceStream;
}

async function acceptVoiceOffer(description) {
  await loadVoiceRtcConfig();
  const connection = ensureVoicePeerConnection();
  await connection.setRemoteDescription(new RTCSessionDescription(description));
  await flushPendingIceCandidates();
  const answer = await connection.createAnswer();
  await connection.setLocalDescription(answer);
  const socketReady = await waitForSocketOpen();
  if (!socketReady) throw new Error("Live voice socket is still connecting. Try again in a moment.");
  sendVoiceSignal({
    type: "voice:answer",
    description: connection.localDescription,
  });
  setVoiceCallButtons(true);
  startVoiceConnectTimer();
  setVoiceStatus("Microphone on. Connecting voice...");
}

async function startVoiceCall() {
  if (!isVoiceCallSupported()) {
    setVoiceStatus("This browser does not support live microphone calls.");
    return;
  }
  if (!backendOnline) {
    setVoiceStatus("Start the backend before using live voice.");
    return;
  }
  if (!currentMatchId) {
    setVoiceStatus("Start or join a match before turning on your mic.");
    return;
  }
  if (!isSecureVoiceContext()) {
    setVoiceStatus("Microphone needs HTTPS. Render is OK, and localhost is OK.");
    return;
  }

  try {
    setVoiceStatus("Requesting microphone permission...");
    connectSocket(currentMatchId);
    const socketReady = await waitForSocketOpen();
    if (!socketReady) throw new Error("Live voice socket is still connecting. Try again in a moment.");
    await loadVoiceRtcConfig();
    await attachLocalVoiceStream();
    voiceRing.classList.add("speaking");
    sendVoiceSignal({ type: "voice:ready" });

    if (pendingVoiceOffer) {
      const offer = pendingVoiceOffer;
      pendingVoiceOffer = null;
      await acceptVoiceOffer(offer);
      return;
    }

    const connection = ensureVoicePeerConnection();
    makingVoiceOffer = true;
    const offer = await connection.createOffer({ offerToReceiveAudio: true });
    await connection.setLocalDescription(offer);
    sendCurrentVoiceOffer();
    scheduleVoiceOfferRetry();
    setVoiceCallButtons(true);
    startVoiceConnectTimer();
    setVoiceStatus("Microphone on. Waiting for partner...");
  } catch (error) {
    const message = error.name === "NotAllowedError" ? "Microphone permission was blocked." : `Voice error: ${error.message}`;
    endVoiceCall(false);
    setVoiceStatus(message);
  } finally {
    makingVoiceOffer = false;
  }
}

function endVoiceCall(notifyPartner = true) {
  if (notifyPartner) sendVoiceSignal({ type: "voice:end" });
  clearVoiceConnectTimer();
  clearVoiceOfferRetry();

  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  if (localVoiceStream) {
    localVoiceStream.getTracks().forEach((track) => track.stop());
    localVoiceStream = null;
  }

  pendingVoiceOffer = null;
  pendingIceCandidates = [];
  ignoredVoiceOffer = false;
  remoteVoiceAudio.srcObject = null;
  voiceRing.classList.remove("speaking");
  setVoiceCallButtons(false);
  setVoiceStatus("Voice call ended.");
}

async function handleVoiceSignal(message) {
  if (!message.matchId || message.matchId !== currentMatchId || message.from === voiceClientId) return;

  if (message.type === "voice:end") {
    endVoiceCall(false);
    return;
  }

  if (!isVoiceCallSupported()) {
    setVoiceStatus("Live voice is not supported in this browser.");
    return;
  }

  try {
    const connection = ensureVoicePeerConnection();

    if (message.type === "voice:ready") {
      if (!localVoiceStream) {
        setVoiceStatus("Partner is ready for voice. Click Start mic to connect.");
        return;
      }
      if (connection.signalingState === "have-local-offer" && connection.localDescription?.type === "offer") {
        sendCurrentVoiceOffer("Partner is ready. Re-sending voice invite...");
        scheduleVoiceOfferRetry();
        startVoiceConnectTimer();
        return;
      }
      if (connection.signalingState === "stable" && !isVoiceConnected() && !makingVoiceOffer) {
        makingVoiceOffer = true;
        try {
          const offer = await connection.createOffer({ offerToReceiveAudio: true });
          await connection.setLocalDescription(offer);
          sendCurrentVoiceOffer();
          scheduleVoiceOfferRetry();
          startVoiceConnectTimer();
          setVoiceStatus("Partner mic is ready. Connecting voice...");
        } finally {
          makingVoiceOffer = false;
        }
      }
      return;
    }

    if (message.type === "voice:offer") {
      if (
        localVoiceStream &&
        connection.signalingState === "stable" &&
        connection.remoteDescription?.type === "offer" &&
        connection.localDescription?.type === "answer"
      ) {
        sendVoiceSignal({
          type: "voice:answer",
          description: connection.localDescription,
        });
        setVoiceStatus("Re-sent voice confirmation.");
        return;
      }

      const offerCollision = makingVoiceOffer || connection.signalingState !== "stable";
      ignoredVoiceOffer = offerCollision && voiceClientId.localeCompare(message.from || "") < 0;
      if (ignoredVoiceOffer) return;

      if (offerCollision) {
        await connection.setLocalDescription({ type: "rollback" });
      }

      if (!localVoiceStream) {
        pendingVoiceOffer = message.description;
        setVoiceStatus("Partner started voice. Click Start mic to join.");
        return;
      }

      await acceptVoiceOffer(message.description);
      return;
    }

    if (message.type === "voice:answer") {
      if (connection.signalingState !== "have-local-offer") return;
      await connection.setRemoteDescription(new RTCSessionDescription(message.description));
      await flushPendingIceCandidates();
      clearVoiceOfferRetry();
      startVoiceConnectTimer();
      setVoiceStatus("Partner accepted voice. Connecting...");
      return;
    }

    if (message.type === "voice:ice" && message.candidate) {
      if (!connection.remoteDescription) {
        pendingIceCandidates.push(message.candidate);
        return;
      }
      if (!ignoredVoiceOffer) await connection.addIceCandidate(new RTCIceCandidate(message.candidate));
    }
  } catch (error) {
    setVoiceStatus(`Voice connection issue: ${error.message}`);
  }
}

function handleSubtitleSignal(message) {
  if (!message.matchId || message.matchId !== currentMatchId || message.from === voiceClientId) return;
  const text = String(message.text || "").trim();
  if (!text) return;
  const opponent =
    message.speaker ||
    document.querySelector("#boardPartnerName")?.textContent ||
    document.querySelector("#partnerName")?.textContent ||
    "Partner";
  appendFinalSubtitle({
    speaker: opponent,
    text,
    sourceLanguage: message.sourceLanguage || "",
    persist: false,
  });
}

function setServerStatus(text, online) {
  if (!serverStatus) return;
  serverStatus.textContent = text;
  serverStatus.classList.toggle("online", online === true);
  serverStatus.classList.toggle("offline", online === false);
}

function isStaffUser(user = currentUser) {
  return user?.role === "staff" || user?.role === "admin";
}

function renderStaffAccessState() {
  const canUseStaffTools = isStaffUser();
  document.querySelectorAll(".staff-only").forEach((element) => {
    element.hidden = !canUseStaffTools;
  });
  if (forumNoticeOption) {
    forumNoticeOption.disabled = !canUseStaffTools;
    forumNoticeOption.hidden = !canUseStaffTools;
    forumNoticeOption.textContent = canUseStaffTools ? "Notice" : "Notice (staff only)";
  }
  if (forumPostCategory?.value === "Notice" && !canUseStaffTools) {
    forumPostCategory.value = "Question";
  }
  if (staffProductStatus) {
    staffProductStatus.textContent = translateCopy(
      canUseStaffTools ? "Ready to add a shop product." : "Only staff can register products.",
    );
  }
}

function renderAuthState() {
  const signedIn = Boolean(currentUser);
  document.body.classList.toggle("is-signed-in", signedIn);
  authForm.classList.toggle("signed-in", signedIn);
  if (!document.body.classList.contains("auth-entry-open") || signedIn) entryAuth.hidden = true;
  headerProfile.hidden = !signedIn;
  if (signedIn) {
    headerProfileName.textContent = currentUser.displayName || translateCopy("Player");
    renderAvatar(headerProfileAvatar, currentUser, "Player");
    if (settingsAccountName) {
      settingsAccountName.textContent =
        currentInterfaceLanguage() === "Korean"
          ? `${currentUser.displayName || "플레이어"}님으로 로그인됨`
          : `Signed in as ${currentUser.displayName || "Player"}`;
    }
    updateHeaderPieceEditionToggle(currentUser.pieceEdition);
  } else {
    if (settingsAccountName) settingsAccountName.textContent = currentInterfaceLanguage() === "Korean" ? "로그아웃됨" : "Signed out";
    updateHeaderPieceEditionToggle(selectedPieceEdition);
    closeProfileMenu();
    if (authSubmit.disabled) document.body.classList.remove("auth-entry-open");
  }
  if (headerSignOutButton) headerSignOutButton.disabled = !signedIn;
  updateDeleteAccountButtonState();
  continueToDashboardButton.hidden = !signedIn;
  loginButton.textContent = signedIn ? translateCopy("Play") : translateCopy("Login");
  signupButton.textContent = signedIn ? translateCopy("Sign out") : translateCopy("New account");
  loginButton.classList.toggle("active", !signedIn && authMode === "login");
  signupButton.classList.toggle("active", !signedIn && authMode === "signup");
  authSubmit.textContent = signedIn ? translateCopy("Signed in") : authMode === "login" ? translateCopy("Log in") : translateCopy("Create account");
  authSubmit.disabled = signedIn;
  googleSignInButton.hidden = googleLoginReady;
  googleSignInButton.disabled = signedIn;
  if (googleSignInSlot) googleSignInSlot.hidden = signedIn || !googleLoginReady;
  authEmail.disabled = signedIn;
  authDisplayName.disabled = signedIn;
  authPassword.disabled = signedIn;
  authConfirmPassword.disabled = signedIn;
  authLanguagePair.disabled = signedIn;
  authDisplayNameField.hidden = authMode === "login";
  authConfirmPasswordField.hidden = authMode === "login" || !authPassword.value;
  authPassword.autocomplete = authMode === "login" ? "current-password" : "new-password";
  renderStaffAccessState();
  renderTrainingControls();
  updateTutorialGateState();
}

function updateHeaderPieceEditionToggle(edition = currentUser?.pieceEdition) {
  const activeEdition = normalizePieceEdition(edition);
  selectedPieceEdition = activeEdition;
  applyPieceEditionTheme(activeEdition);
  pieceEditionControls.forEach((control) => {
    const active = control.dataset.pieceEdition === activeEdition;
    control.classList.toggle("active", active);
    control.setAttribute("aria-pressed", String(active));
  });
}

async function setPieceEdition(edition) {
  const nextEdition = normalizePieceEdition(edition);
  selectedPieceEdition = nextEdition;
  writeLocalSetting(pieceEditionStorageKey, nextEdition);
  updateHeaderPieceEditionToggle(nextEdition);
  if (profilePieceEdition) profilePieceEdition.value = nextEdition;
  if (currentUser) currentUser = { ...currentUser, pieceEdition: nextEdition };
  if (currentMatchPlayers.length) {
    currentMatchPlayers = currentMatchPlayers.map((player) =>
      player.userId === currentUser?.id ? { ...player, pieceEdition: nextEdition } : player,
    );
  }
  if (boardInitialized) buildBoard();
  if (!currentUser || !backendOnline) return;

  try {
    const profile = await api("/api/profile", {
      method: "PUT",
      body: {
        displayName: currentUser.displayName,
        languagePair: currentUser.languagePair,
        pieceEdition: nextEdition,
        avatarUrl: currentUser.avatarUrl || "",
        bio: currentUser.bio || "",
      },
    });
    currentUser = profile.user;
    renderProfile(profile);
    updateHeaderPieceEditionToggle(currentUser.pieceEdition);
  } catch (error) {
    if (profileStatus) profileStatus.textContent = error.message;
  }
}

function setAuthMode(mode) {
  authMode = mode;
  authConfirmPassword.value = "";
  entryAuth.hidden = false;
  document.body.classList.add("auth-entry-open");
  renderAuthState();
  if (!currentUser) initializeGoogleLogin();
  authStatus.textContent = "";
  document.querySelector(".entry-auth")?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => (mode === "login" ? authEmail : authDisplayName).focus(), 260);
}

function readLocalSetting(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLocalSetting(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The tutorial still works for this page load if storage is unavailable.
  }
}

function removeLocalSetting(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore storage errors.
  }
}

selectedPieceEdition = normalizePieceEdition(readLocalSetting(pieceEditionStorageKey) || selectedPieceEdition);

function applyPieceEditionTheme(edition = selectedPieceEdition) {
  selectedPieceEdition = normalizePieceEdition(edition);
  document.body.classList.toggle("piece-theme-original", selectedPieceEdition === "original");
  document.body.classList.toggle("piece-theme-cheoinseong", selectedPieceEdition === "cheoinseong");
  document.body.classList.toggle("piece-theme-beta", selectedPieceEdition === "beta");
  document.body.dataset.pieceEdition = selectedPieceEdition;
}

function isStudentTutorialComplete() {
  return readLocalSetting(studentTutorialCompleteKey) === "true";
}

function isStudentTutorialRequired() {
  return readLocalSetting(studentTutorialRequiredKey) === "true" && !isStudentTutorialComplete();
}



function isTutorialRoute() {
  return /^\/tutorial\/?$/.test(location.pathname);
}

function requestedTrainingModuleId() {
  if (!isTutorialRoute()) return null;
  const moduleId = Number(new URLSearchParams(location.search).get("module"));
  return Number.isInteger(moduleId) && moduleId >= 1 && moduleId <= 4 ? moduleId : null;
}

function clearRequestedTrainingModule() {
  if (!isTutorialRoute() || !requestedTrainingModuleId()) return;
  const url = new URL(location.href);
  url.searchParams.delete("module");
  history.replaceState({ viewName: "how-to-play" }, "", `${url.pathname}${url.search}${url.hash}`);
}

function isStaffRoute() {
  return /^\/staff\/?$/.test(location.pathname);
}

function updateRouteForView(viewName) {
  if (location.protocol === "file:") return;
  if (viewName === "how-to-play") {
    if (!isTutorialRoute()) history.replaceState({ viewName }, "", "/tutorial");
    return;
  }
  if (viewName === "staff") {
    if (!isStaffRoute()) history.replaceState({ viewName }, "", "/staff");
    return;
  }
  if (isTutorialRoute() || isStaffRoute()) history.replaceState({ viewName }, "", "/");
}

function openAccountEntry(mode = "signup") {
  if (currentUser) {
    setView("dashboard");
    return;
  }
  setView("home");
  setAuthMode(mode);
}



function localTrainingState() {
  let completedModules = [];
  try {
    completedModules = JSON.parse(readLocalSetting(completedTrainingModulesKey) || "[]");
  } catch {
    completedModules = [];
  }
  if (!Array.isArray(completedModules)) completedModules = [];
  if (isStudentTutorialComplete() && !completedModules.includes(1)) completedModules.push(1);
  completedModules = [...new Set(completedModules.map(Number).filter((module) => module >= 1 && module <= 4))].sort((a, b) => a - b);
  const modules = [
    { id: 1, title: "기물의 움직임" },
    { id: 2, title: "기물 잡기" },
    { id: 3, title: "체크에서 벗어나기" },
    { id: 4, title: "체크메이트" },
  ];
  const nextModule = modules.find((module) => !completedModules.includes(module.id)) || null;
  return {
    hasTutorial: Boolean(nextModule),
    nextModule,
    tutorialSrc: nextModule ? `/assets/how-to-play.html?module=${nextModule.id}&v=20260904-continuous-page` : "",
    puzzleUnlocked: !nextModule,
    completedModules,
    completedPuzzles: [],
    reviewQuizzes: [],
    modules: modules.map((module) => ({ ...module, completed: completedModules.includes(module.id) })),
    reviewOptions: modules.filter((module) => completedModules.includes(module.id)).map((module) => ({ module: module.id, title: module.title })),
  };
}

function activeTrainingState() {
  return currentUser ? cachedTrainingState || currentUser.training || localTrainingState() : localTrainingState();
}

const trainingModuleDescriptions = {
  1: "폰, 룩, 비숍, 나이트, 퀸, 킹의 움직임과 임금끼리 싸울 수 없는 규칙을 배워요.",
  2: "각 기물이 상대 기물을 잡는 방법을 연습해요.",
  3: "체크를 피하고, 막고, 공격한 기물을 잡아봐요.",
  4: "여러 체크메이트 모양과 승리 조건을 배워요.",
};

const trainingModuleArt = {
  1: { src: "/assets/tutorial-pieces/g_pawn.png?v=20260904-board-grounding", alt: "고려 꼬마 창병" },
  2: { src: "/assets/tutorial-pieces/g_bishop.png?v=20260904-board-grounding", alt: "고려 승병" },
  3: { src: "/assets/tutorial-pieces/g_king.png?v=20260904-board-grounding", alt: "고려 임금님" },
  4: { src: "/assets/tutorial-pieces/g_knight.png?v=20260904-board-grounding", alt: "고려 백마 기수" },
};

function activeTrainingEdition() {
  return selectedPieceEdition === "original" ? "original" : "cheoinseong";
}

function trainingTutorialPath(edition = activeTrainingEdition()) {
  return edition === "original" ? "/assets/how-to-play.html" : "/assets/how-to-play-cheoinseong.html";
}

function renderTrainingEditionControls() {
  const edition = activeTrainingEdition();
  const korean = currentInterfaceLanguage() === "Korean";
  if (trainingEditionLabel) trainingEditionLabel.textContent = korean ? "튜토리얼 말 디자인" : "Tutorial piece design";
  trainingEditionButtons.forEach((button) => {
    const active = button.dataset.trainingEdition === edition;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.textContent = button.dataset.trainingEdition === "original" ? (korean ? "오리지널" : "Original") : (korean ? "고려-몽골" : "Goryeo-Mongol");
  });
}

function reloadOpenTrainingEdition() {
  if (!trainingModuleOpen || activeTrainingPathMode !== "tutorial" || !howToPlayFrame?.src) return;
  try {
    const url = new URL(howToPlayFrame.src, window.location.origin);
    if (!url.pathname.includes("how-to-play")) return;
    url.pathname = trainingTutorialPath();
    url.searchParams.set("edition", activeTrainingEdition());
    url.searchParams.set("v", "20260904-split-training");
    howToPlayFrame.src = `${url.pathname}${url.search}`;
  } catch {
    // Leave the current lesson in place if its URL cannot be normalized.
  }
}

const trainingStageIconNames = {
  1: "movement",
  2: "capture",
  3: "defense",
  4: "mate",
  puzzle: "puzzle",
  review: "review",
};

const puzzlePathStages = [
  {
    id: "s1",
    ko: "성문 뒤의 함정",
    en: "The gate behind the king",
    koDescription: "룩으로 비어 있는 뒷줄을 단숨에 장악합니다.",
    enDescription: "Use a rook to take over an exposed back rank in one move.",
  },
  {
    id: "s2",
    ko: "질식하는 칸",
    en: "Smothered king",
    koDescription: "나이트가 병사들에 갇힌 왕의 마지막 칸을 막습니다.",
    enDescription: "A knight closes the final square around a boxed-in king.",
  },
  {
    id: "s3",
    ko: "네 수 만의 기습",
    en: "Early queen attack",
    koDescription: "퀸과 비숍의 대각선 협공으로 약한 칸을 찾습니다.",
    enDescription: "Coordinate queen and bishop against an early weak square.",
  },
  {
    id: "m1",
    ko: "두 돌탑의 사다리",
    en: "Rook ladder",
    koDescription: "두 룩을 번갈아 전진시켜 왕의 공간을 줄입니다.",
    enDescription: "Advance two rooks in sequence to shrink the king's space.",
  },
  {
    id: "m2",
    ko: "임금님의 진군",
    en: "The king steps in",
    koDescription: "체크보다 먼저 왕을 전진시켜 도망길을 막습니다.",
    enDescription: "Step the king forward first to remove the escape route.",
  },
  {
    id: "m3",
    ko: "졸병의 꿈",
    en: "The pawn's dream",
    koDescription: "승격을 계산해 폰을 결정적인 퀸으로 바꿉니다.",
    enDescription: "Calculate a promotion that turns the pawn into the winning queen.",
  },
  {
    id: "h1",
    ko: "칸의 질식",
    en: "Sacrifice and smother",
    koDescription: "퀸을 희생해 나이트의 마지막 체크메이트를 만듭니다.",
    enDescription: "Sacrifice the queen to prepare the knight's final mate.",
  },
  {
    id: "h2",
    ko: "겹쳐진 돌탑",
    en: "Stacked rooks",
    koDescription: "앞 룩을 내어주고 뒤 룩으로 성문을 돌파합니다.",
    enDescription: "Offer the front rook so the rook behind can break through.",
  },
  {
    id: "cheoin-1",
    series: "cheoinseong",
    player: "/assets/cheoinseong-battle.html",
    iconIndex: 1,
    ko: "관군 없이, 스스로",
    en: "Without the royal army",
    koDescription: "처인부곡의 백성이 성벽에 다가온 몽골 병졸을 직접 막아냅니다.",
    enDescription: "The people of Cheoin stop a Mongol foot soldier approaching the wall.",
  },
  {
    id: "cheoin-2",
    series: "cheoinseong",
    player: "/assets/cheoinseong-battle.html",
    iconIndex: 2,
    ko: "몽골 기병, 성을 에워싸다",
    en: "Mongol cavalry surrounds the fort",
    koDescription: "나이트 포크로 적 지휘부와 공성탑을 동시에 위협합니다.",
    enDescription: "Use a knight fork to threaten the commander and siege tower together.",
  },
  {
    id: "cheoin-3",
    series: "cheoinseong",
    player: "/assets/cheoinseong-battle.html",
    iconIndex: 3,
    ko: "승병들, 최전선에 서다",
    en: "Monks take the front line",
    koDescription: "승병을 상징하는 비숍이 긴 대각선에서 이중공격을 만듭니다.",
    enDescription: "A bishop representing the warrior monks creates a double attack.",
  },
  {
    id: "cheoin-4",
    series: "cheoinseong",
    player: "/assets/cheoinseong-battle.html",
    iconIndex: 4,
    ko: "성벽이 버티다",
    en: "The walls hold",
    koDescription: "처인성 성벽을 상징하는 룩으로 왕과 기병을 함께 겨눕니다.",
    enDescription: "Use the rook-like fortress wall to fork the king and cavalry.",
  },
  {
    id: "cheoin-5",
    series: "cheoinseong",
    player: "/assets/cheoinseong-battle.html",
    iconIndex: 5,
    ko: "화살, 살리타이에게 향하다",
    en: "The arrow flies toward Sartai",
    koDescription: "마지막 룩 수로 뒷줄 체크메이트를 완성합니다.",
    enDescription: "Deliver the final back-rank checkmate with the rook.",
  },
];

let entryTypewriterTimer = 0;
let selectedTrainingReviewModuleId = 0;
let activeTrainingPathMode = "tutorial";

function landingTypewriterPhrase() {
  return currentInterfaceLanguage() === "Korean" ? "체스..? 엄청 쉽죠." : "chess..? it’s easy.";
}

function fitLandingTypewriter(phrase = landingTypewriterPhrase()) {
  if (!entryTypewriter || !entryTypewriterText) return;
  const previousText = entryTypewriterText.textContent;
  const styles = window.getComputedStyle(entryTypewriter);
  const maxSize = Number.parseFloat(styles.getPropertyValue("--entry-typewriter-max-size")) || 82;
  const minSize = Number.parseFloat(styles.getPropertyValue("--entry-typewriter-min-size")) || 28;
  entryTypewriter.style.fontSize = `${maxSize}px`;
  entryTypewriterText.textContent = phrase;
  const availableWidth = Math.max(1, entryTypewriter.clientWidth - 20);
  const requiredWidth = Math.max(1, entryTypewriterText.scrollWidth);
  const fittedSize = Math.max(minSize, Math.min(maxSize, Math.floor((maxSize * availableWidth) / requiredWidth)));
  entryTypewriter.style.fontSize = `${fittedSize}px`;
  entryTypewriterText.textContent = previousText;
}

function renderLandingTypewriter({ animate = true } = {}) {
  if (!entryTypewriter || !entryTypewriterText) return;
  window.clearTimeout(entryTypewriterTimer);
  const phrase = landingTypewriterPhrase();
  const characters = Array.from(phrase);
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  entryTypewriter.setAttribute("aria-label", phrase);
  entryTypewriter.classList.remove("typing", "complete");
  fitLandingTypewriter(phrase);

  if (!animate || reduceMotion) {
    entryTypewriterText.textContent = phrase;
    entryTypewriter.classList.add("complete");
    return;
  }

  entryTypewriterText.textContent = "";
  entryTypewriter.classList.add("typing");
  let characterIndex = 0;
  const pauseAfterCharacter = phrase.indexOf("?") + 1;
  const characterDelay = currentInterfaceLanguage() === "Korean" ? 105 : 78;
  const typeNextCharacter = () => {
    characterIndex += 1;
    entryTypewriterText.textContent = characters.slice(0, characterIndex).join("");
    if (characterIndex < characters.length) {
      const delay = characterIndex === pauseAfterCharacter ? 2000 : characterDelay;
      entryTypewriterTimer = window.setTimeout(typeNextCharacter, delay);
      return;
    }
    entryTypewriter.classList.remove("typing");
    entryTypewriter.classList.add("complete");
  };
  entryTypewriterTimer = window.setTimeout(typeNextCharacter, 260);
}

const todayQuestDefinitions = [
  { key: "puzzles", total: 5, ko: "퍼즐 5개 풀기", en: "Solve 5 puzzles" },
  { key: "games", total: 2, ko: "대국 2판 두기", en: "Play 2 games" },
  { key: "partners", total: 1, ko: "새 플레이어 만나기", en: "Meet a new player" },
];

function localDateKey(date = new Date()) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return localDateKey();
  const offsetMs = value.getTimezoneOffset() * 60_000;
  return new Date(value.getTime() - offsetMs).toISOString().slice(0, 10);
}

function blankDailyQuestProgress() {
  return {
    date: localDateKey(),
    puzzles: 0,
    games: 0,
    partners: 0,
  };
}

function readDailyQuestProgress() {
  try {
    const parsed = JSON.parse(readLocalSetting(dailyQuestStorageKey) || "{}");
    if (parsed?.date === localDateKey()) {
      return {
        ...blankDailyQuestProgress(),
        ...parsed,
        puzzles: Math.max(0, Number(parsed.puzzles || 0)),
        games: Math.max(0, Number(parsed.games || 0)),
        partners: Math.max(0, Number(parsed.partners || 0)),
      };
    }
  } catch {}
  return blankDailyQuestProgress();
}

function writeDailyQuestProgress(progress) {
  writeLocalSetting(dailyQuestStorageKey, JSON.stringify({ ...blankDailyQuestProgress(), ...progress, date: localDateKey() }));
}

function bumpDailyQuest(key, amount = 1) {
  const progress = readDailyQuestProgress();
  progress[key] = Math.max(0, Number(progress[key] || 0) + amount);
  writeDailyQuestProgress(progress);
  renderTodayQuests();
}

function trainingPuzzlesCompletedToday() {
  const puzzles = activeTrainingState().completedPuzzles || currentUser?.training?.completedPuzzles || [];
  return (Array.isArray(puzzles) ? puzzles : []).filter((puzzle) => puzzle?.completedAt && localDateKey(puzzle.completedAt) === localDateKey()).length;
}

function questProgressSnapshot() {
  const progress = readDailyQuestProgress();
  const achievementIds = new Set((currentUser?.achievements || []).map((achievement) => achievement.id));
  return {
    puzzles: Math.max(progress.puzzles, trainingPuzzlesCompletedToday()),
    games: Math.max(progress.games, achievementIds.has("first-match") ? 1 : 0),
    partners: Math.max(progress.partners, achievementIds.has("first-greeting") ? 1 : 0),
  };
}

function renderTodayQuests() {
  if (!todayQuestList) return;
  const progress = questProgressSnapshot();
  const korean = currentInterfaceLanguage() === "Korean";
  todayQuestList.replaceChildren();
  todayQuestDefinitions.forEach((quest) => {
    const value = Math.min(quest.total, Math.max(0, Number(progress[quest.key] || 0)));
    const item = document.createElement("li");
    item.className = "today-quest-row";
    const meters = document.createElement("span");
    meters.className = "today-quest-meter";
    meters.setAttribute("aria-hidden", "true");
    const meterCount = Math.max(quest.total, 5);
    const filledCount = Math.round((value / quest.total) * meterCount);
    for (let index = 0; index < meterCount; index += 1) {
      const tick = document.createElement("i");
      tick.className = index < filledCount ? "filled" : "";
      meters.append(tick);
    }
    const label = document.createElement("span");
    label.className = "today-quest-label";
    label.textContent = korean ? quest.ko : quest.en;
    const count = document.createElement("strong");
    count.textContent = `${value}/${quest.total}`;
    item.append(meters, label, count);
    todayQuestList.append(item);
  });
}

function renderTrainingModuleList() {
  if (!trainingModuleList) return;
  const state = activeTrainingState();
  const renderSignature = JSON.stringify({
    language: currentInterfaceLanguage(),
    edition: activeTrainingEdition(),
    next: state.nextModule?.id || null,
    completedModules: state.completedModules || [],
    completedPuzzles: state.completedPuzzles || [],
    puzzleUnlocked: Boolean(state.puzzleUnlocked),
    modules: (state.modules || []).map((module) => [module.id, module.title, Boolean(module.completed)]),
  });
  if (renderSignature === trainingModuleRenderSignature && trainingModuleList.childElementCount) return;
  trainingModuleRenderSignature = renderSignature;
  const nextModuleId = Number(state.nextModule?.id || 0);
  trainingModuleList.innerHTML = "";
  (state.modules || []).forEach((module) => {
    const moduleId = Number(module.id);
    const completed = Boolean(module.completed);
    const current = moduleId === nextModuleId;
    const accessible = completed || current;
    const card = document.createElement("article");
    card.className = `training-module-row ${moduleId % 2 ? "path-left" : "path-right"}${completed ? " completed" : ""}${current ? " current" : ""}${accessible ? "" : " locked"}`;
    card.dataset.pathStep = String(moduleId);
    const tooltipId = `trainingStageTooltip${moduleId}`;
    const status = completed ? "완료" : current ? "학습 가능" : "잠김";
    card.innerHTML = `
      <div class="training-path-anchor">
        <button class="training-path-node" type="button" aria-describedby="${tooltipId}"${accessible ? "" : ' aria-disabled="true"'}>
          <span class="training-stage-icon icon-${trainingStageIconNames[moduleId]}" aria-hidden="true"></span>
          <span class="visually-hidden">모듈 ${moduleId} · ${module.title} · ${status}</span>
        </button>
        <div class="training-path-tooltip" id="${tooltipId}" role="tooltip">
          <span class="training-module-index">모듈 ${moduleId} · ${status}</span>
          <h3>${module.title}</h3>
          <p>${trainingModuleDescriptions[moduleId] || "체스의 기본 규칙을 배워요."}</p>
          <strong>${accessible ? completed ? "눌러서 다시 학습" : "눌러서 시작" : "이전 모듈을 먼저 완료하세요"}</strong>
        </div>
      </div>`;
    const control = card.querySelector(".training-path-node");
    if (accessible) {
      control.addEventListener("click", () => openTrainingModule(moduleId));
    }
    trainingModuleList.append(card);
  });

  const puzzleUnlocked = Boolean(state.puzzleUnlocked);
  const completedPuzzles = activeTrainingState().completedPuzzles || [];
  const puzzleCompleted = readDailyQuestProgress().puzzles > 0 || (Array.isArray(completedPuzzles) && completedPuzzles.length > 0);
  const puzzleCard = document.createElement("article");
  puzzleCard.className = `training-module-row training-puzzle-row path-left${puzzleCompleted ? " completed" : ""}${puzzleUnlocked ? " current" : " locked"}`;
  puzzleCard.dataset.pathStep = "5";
  puzzleCard.innerHTML = `
    <div class="training-path-anchor">
      <button class="training-path-node" type="button" aria-describedby="trainingPuzzleTooltip"${puzzleUnlocked ? "" : ' aria-disabled="true"'}>
        <span class="training-stage-icon icon-${trainingStageIconNames.puzzle}" aria-hidden="true"></span>
        <span class="visually-hidden">퍼즐 · 성문 뒤의 함정 · ${puzzleCompleted ? "완료" : puzzleUnlocked ? "학습 가능" : "잠김"}</span>
      </button>
      <div class="training-path-tooltip" id="trainingPuzzleTooltip" role="tooltip">
        <span class="training-module-index">퍼즐 · ${puzzleCompleted ? "완료" : puzzleUnlocked ? "학습 가능" : "잠김"}</span>
        <h3>성문 뒤의 함정</h3>
        <p>${puzzleUnlocked ? "튜토리얼을 마쳤습니다. 오늘의 퍼즐로 다음 실력을 열어보세요." : "모든 튜토리얼 모듈을 완료하면 열립니다."}</p>
        <strong>${puzzleUnlocked ? "눌러서 퍼즐 풀기" : "튜토리얼을 먼저 완료하세요"}</strong>
      </div>
    </div>`;
  const puzzleControl = puzzleCard.querySelector(".training-path-node");
  if (puzzleUnlocked) {
    puzzleControl.addEventListener("click", () => setHowToPlayMode("puzzle"));
  }
  trainingModuleList.append(puzzleCard);

  const completedModules = (state.completedModules || []).map(Number);
  const reviewModules = (state.modules || []).filter((module) => completedModules.includes(Number(module.id)));
  const review = document.createElement("footer");
  review.className = "training-review-row";
  review.innerHTML = `
    <div class="training-review-intro">
      <span class="training-module-index">복습 퀴즈</span>
      <p>${reviewModules.length ? "복습할 모듈을 골라 네 문제로 확인해 볼까요?" : "모듈을 완료하면 복습 퀴즈를 시작할 수 있어요."}</p>
    </div>`;
  const reviewChooser = document.createElement("div");
  reviewChooser.className = "training-review-chooser";
  const selectedReviewModule =
    reviewModules.find((module) => Number(module.id) === selectedTrainingReviewModuleId) || reviewModules[0] || null;
  selectedTrainingReviewModuleId = Number(selectedReviewModule?.id || 0);
  const reviewMenu = document.createElement("div");
  reviewMenu.className = "training-review-menu";
  const reviewTrigger = document.createElement("button");
  reviewTrigger.type = "button";
  reviewTrigger.className = "training-review-select";
  reviewTrigger.disabled = reviewModules.length === 0;
  reviewTrigger.setAttribute("aria-haspopup", "listbox");
  reviewTrigger.setAttribute("aria-expanded", "false");
  reviewTrigger.innerHTML = `<span>${selectedReviewModule ? `모듈 ${selectedReviewModule.id} · ${selectedReviewModule.title}` : "완료한 모듈이 없습니다"}</span><span aria-hidden="true">⌄</span>`;

  const reviewOptions = document.createElement("div");
  reviewOptions.className = "training-review-options";
  reviewOptions.setAttribute("role", "listbox");
  reviewOptions.hidden = true;
  reviewModules.forEach((module) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "training-review-option";
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(Number(module.id) === selectedTrainingReviewModuleId));
    option.textContent = `모듈 ${module.id} · ${module.title}`;
    option.addEventListener("click", () => {
      selectedTrainingReviewModuleId = Number(module.id);
      reviewTrigger.querySelector("span").textContent = option.textContent;
      reviewOptions.querySelectorAll('[role="option"]').forEach((item) => {
        item.setAttribute("aria-selected", String(item === option));
      });
      reviewOptions.hidden = true;
      reviewTrigger.setAttribute("aria-expanded", "false");
      reviewTrigger.focus();
    });
    reviewOptions.append(option);
  });
  reviewTrigger.addEventListener("click", () => {
    const opening = reviewOptions.hidden;
    reviewOptions.hidden = !opening;
    reviewTrigger.setAttribute("aria-expanded", String(opening));
  });
  reviewMenu.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || reviewOptions.hidden) return;
    reviewOptions.hidden = true;
    reviewTrigger.setAttribute("aria-expanded", "false");
    reviewTrigger.focus();
  });
  reviewMenu.append(reviewTrigger, reviewOptions);

  const reviewControl = document.createElement("button");
  reviewControl.type = "button";
  reviewControl.className = "training-review-open";
  reviewControl.textContent = "복습 퀴즈 시작";
  reviewControl.disabled = reviewModules.length === 0;
  if (reviewModules.length) reviewControl.addEventListener("click", () => {
    const chosenModuleId = Number(selectedTrainingReviewModuleId || 0);
    if (chosenModuleId) openTrainingReview(chosenModuleId);
  });
  reviewChooser.append(reviewMenu, reviewControl);
  review.append(reviewChooser);
  trainingModuleList.append(review);
}

function completedPuzzleIds() {
  const completed = activeTrainingState().completedPuzzles || [];
  const ids = new Set(
    completed
      .map((puzzle) => (typeof puzzle === "string" ? puzzle : puzzle?.id))
      .filter(Boolean)
      .map(String),
  );
  try {
    const localIds = JSON.parse(readLocalSetting(completedPuzzleStagesKey) || "[]");
    if (Array.isArray(localIds)) localIds.filter(Boolean).forEach((id) => ids.add(String(id)));
  } catch {
    // Ignore malformed local progress and keep server-backed progress intact.
  }
  return ids;
}

function renderPuzzleStageList(list, seriesItem) {
  if (!list) return;
  const korean = currentInterfaceLanguage() === "Korean";
  const completed = completedPuzzleIds();
  list.replaceChildren();

  const heading = document.createElement("header");
  heading.className = "puzzle-series-heading";
  heading.innerHTML = `<span>${korean ? seriesItem.koLabel : seriesItem.enLabel}</span><h2>${korean ? seriesItem.ko : seriesItem.en}</h2>`;
  list.append(heading);

  const nextStageIndex = seriesItem.stages.findIndex((stage) => !completed.has(stage.id));
  const currentStageIndex = nextStageIndex === -1 ? seriesItem.stages.length - 1 : nextStageIndex;

  seriesItem.stages.forEach((stage, index) => {
    const isComplete = completed.has(stage.id);
    const isCurrent = index === currentStageIndex;
    const accessible = isComplete || index <= currentStageIndex;
    const status = isComplete
      ? korean ? "완료" : "Complete"
      : isCurrent
        ? korean ? "도전 가능" : "Ready"
        : korean ? "잠김" : "Locked";
    const row = document.createElement("article");
    row.className = `training-module-row puzzle-stage-row ${index % 2 ? "path-right" : "path-left"}${isComplete ? " completed" : ""}${isCurrent ? " current" : ""}${accessible ? "" : " locked"}${index === seriesItem.stages.length - 1 ? " path-last" : ""}`;
    const tooltipId = `puzzleStageTooltip-${seriesItem.id}-${index + 1}`;
    const title = korean ? stage.ko : stage.en;
    const description = korean ? stage.koDescription : stage.enDescription;
    const icon = stage.iconIndex
      ? `<span class="puzzle-stage-icon cheoinseong-stage-icon cheoinseong-stage-icon-${stage.iconIndex}" aria-hidden="true"></span>`
      : `<span class="puzzle-stage-icon puzzle-stage-icon-${index + 1}" aria-hidden="true"></span>`;
    row.innerHTML = `
      <div class="training-path-anchor">
        <button class="training-path-node" type="button" aria-describedby="${tooltipId}"${accessible ? "" : ' aria-disabled="true"'}>
          ${icon}
          <span class="visually-hidden">${index + 1}. ${title} · ${status}</span>
        </button>
        <div class="training-path-tooltip" id="${tooltipId}" role="tooltip">
          <span class="training-module-index">${korean ? "퍼즐" : "Puzzle"} ${index + 1} · ${status}</span>
          <h3>${title}</h3>
          <p>${description}</p>
          <strong>${accessible ? korean ? "눌러서 퍼즐 풀기" : "Open puzzle" : korean ? "이전 퍼즐을 먼저 완료하세요" : "Complete the previous puzzle first"}</strong>
        </div>
      </div>`;
    if (accessible) row.querySelector(".training-path-node")?.addEventListener("click", () => openPuzzleStage(stage, index));
    list.append(row);
  });
}

function renderPuzzlePath() {
  const renderSignature = `${currentInterfaceLanguage()}:${[...completedPuzzleIds()].sort().join(",")}`;
  if (
    renderSignature === puzzlePathRenderSignature &&
    puzzlePathList?.childElementCount &&
    cheoinseongPathList?.childElementCount
  ) return;
  puzzlePathRenderSignature = renderSignature;
  renderPuzzleStageList(puzzlePathList, {
    id: "goryeo",
    koLabel: "전술 퍼즐",
    enLabel: "Tactical puzzles",
    ko: "고려 vs 몽골",
    en: "Goryeo vs Mongol",
    stages: puzzlePathStages.filter((stage) => (stage.series || "goryeo") === "goryeo"),
  });
  renderPuzzleStageList(cheoinseongPathList, {
    id: "cheoinseong",
    koLabel: "역사 퍼즐",
    enLabel: "Historical puzzles",
    ko: "처인성의 마지막 화살",
    en: "The Last Arrow of Cheoinseong",
    stages: puzzlePathStages.filter((stage) => stage.series === "cheoinseong"),
  });
}

function renderTrainingControls() {
  const state = activeTrainingState();
  const puzzleUnlocked = Boolean(state.puzzleUnlocked);
  const korean = currentInterfaceLanguage() === "Korean";
  if (showPuzzleGuideButton) showPuzzleGuideButton.textContent = korean ? "퍼즐" : "Puzzle";
  if (showCheoinseongGuideButton) showCheoinseongGuideButton.textContent = korean ? "처인성" : "Cheoinseong";
  [showPuzzleGuideButton, showCheoinseongGuideButton].forEach((button) => {
    if (!button) return;
    button.classList.toggle("locked", !puzzleUnlocked);
    button.setAttribute("aria-disabled", puzzleUnlocked ? "false" : "true");
  });
  if (tutorialLoginButton) tutorialLoginButton.hidden = Boolean(currentUser);
  renderTrainingEditionControls();
  if (tutorialPuzzleNote) {
    tutorialPuzzleNote.hidden = puzzleUnlocked;
    tutorialPuzzleNote.textContent =
      currentInterfaceLanguage() === "Korean"
        ? "모든 훈련 모듈을 완료하면 퍼즐을 열 수 있습니다."
        : "Finish every training module to unlock puzzles.";
  }
  renderTrainingModuleList();
  renderPuzzlePath();
  renderHomeTrainingProgress();
}

function renderHomeTrainingProgress() {
  const completedModules = new Set((activeTrainingState().completedModules || []).map(Number));
  document.querySelectorAll("[data-home-training-module]").forEach((row) => {
    const moduleId = Number(row.dataset.homeTrainingModule);
    const complete = completedModules.has(moduleId);
    const progress = complete ? 100 : 0;
    row.querySelector("b").textContent = complete ? "1/1" : "0/1";
    row.querySelector("i").style.setProperty("--progress", `${progress}%`);
  });
}

async function refreshTrainingState() {
  if (!currentUser || !backendOnline) {
    cachedTrainingState = localTrainingState();
    renderTrainingControls();
    return cachedTrainingState;
  }
  try {
    const data = await api("/api/training/state");
    cachedTrainingState = data.state;
    currentUser = data.user || currentUser;
  } catch {
    cachedTrainingState = currentUser.training || localTrainingState();
  }
  renderTrainingControls();
  return cachedTrainingState;
}

function setActiveTrainingPathMode(mode) {
  activeTrainingPathMode = mode;
  if (howToPlayView) howToPlayView.dataset.trainingMode = mode;
  showTutorialGuideButton?.classList.toggle("active", mode === "tutorial");
  showPuzzleGuideButton?.classList.toggle("active", mode === "puzzle");
  showCheoinseongGuideButton?.classList.toggle("active", mode === "cheoinseong");
}

function showTrainingModuleHome() {
  trainingModuleOpen = false;
  howToPlayShell?.classList.remove("puzzle-mode");
  howToPlayView?.classList.remove("puzzle-mode");
  resetHowToPlayFrameSizing();
  trainingModuleList?.removeAttribute("hidden");
  puzzlePathList?.setAttribute("hidden", "");
  cheoinseongPathList?.setAttribute("hidden", "");
  howToPlayShell?.setAttribute("hidden", "");
  setActiveTrainingPathMode("tutorial");
  renderTrainingControls();
}

function showPuzzlePath(mode = "puzzle") {
  const state = activeTrainingState();
  if (!state.puzzleUnlocked) {
    showTrainingModuleHome();
    return;
  }
  const nextMode = mode === "cheoinseong" ? "cheoinseong" : "puzzle";
  trainingModuleOpen = false;
  howToPlayShell?.classList.add("puzzle-mode");
  howToPlayView?.classList.add("puzzle-mode");
  resetHowToPlayFrameSizing();
  trainingModuleList?.setAttribute("hidden", "");
  puzzlePathList?.toggleAttribute("hidden", nextMode !== "puzzle");
  cheoinseongPathList?.toggleAttribute("hidden", nextMode !== "cheoinseong");
  howToPlayShell?.setAttribute("hidden", "");
  setActiveTrainingPathMode(nextMode);
  renderTrainingControls();
}

function openTrainingModule(moduleId) {
  const normalizedModuleId = Math.min(4, Math.max(1, Number(moduleId) || 1));
  const state = activeTrainingState();
  const module = (state.modules || []).find((item) => Number(item.id) === normalizedModuleId);
  const completed = Boolean(module?.completed) || (state.completedModules || []).map(Number).includes(normalizedModuleId);
  const current = Number(state.nextModule?.id) === normalizedModuleId;
  if (!module || (!completed && !current)) return;
  trainingModuleOpen = true;
  howToPlayShell?.classList.remove("puzzle-mode");
  howToPlayView?.classList.remove("puzzle-mode");
  resetHowToPlayFrameSizing();
  trainingModuleList?.setAttribute("hidden", "");
  puzzlePathList?.setAttribute("hidden", "");
  cheoinseongPathList?.setAttribute("hidden", "");
  howToPlayShell?.removeAttribute("hidden");
  trainingModuleToolbar?.removeAttribute("hidden");
  const korean = currentInterfaceLanguage() === "Korean";
  if (activeTrainingModuleTitle) activeTrainingModuleTitle.textContent = `${korean ? "모듈" : "Module"} ${normalizedModuleId} · ${korean ? module.title : translateCopy(module.title)}`;
  if (howToPlayFrame) howToPlayFrame.src = `${trainingTutorialPath()}?module=${normalizedModuleId}&edition=${activeTrainingEdition()}&lang=${korean ? "ko" : "en"}&v=20260904-split-training`;
  setActiveTrainingPathMode("tutorial");
  howToPlayShell?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openTrainingReview(moduleId) {
  const normalizedModuleId = Math.min(4, Math.max(1, Number(moduleId) || 1));
  const state = activeTrainingState();
  if (!(state.completedModules || []).map(Number).includes(normalizedModuleId)) return;
  trainingModuleOpen = true;
  howToPlayShell?.classList.remove("puzzle-mode");
  howToPlayView?.classList.remove("puzzle-mode");
  resetHowToPlayFrameSizing();
  trainingModuleList?.setAttribute("hidden", "");
  puzzlePathList?.setAttribute("hidden", "");
  cheoinseongPathList?.setAttribute("hidden", "");
  howToPlayShell?.removeAttribute("hidden");
  trainingModuleToolbar?.removeAttribute("hidden");
  const korean = currentInterfaceLanguage() === "Korean";
  if (activeTrainingModuleTitle) activeTrainingModuleTitle.textContent = `${korean ? "모듈" : "Module"} ${normalizedModuleId} · ${korean ? "복습 퀴즈" : "Review Quiz"}`;
  if (howToPlayFrame) howToPlayFrame.src = `${trainingTutorialPath()}?module=${normalizedModuleId}&edition=${activeTrainingEdition()}&review=1&lang=${korean ? "ko" : "en"}&v=20260904-split-training`;
  setActiveTrainingPathMode("tutorial");
  howToPlayShell?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openPuzzleStage(stage, index = 0, options = {}) {
  if (!stage || (!options.allowLocked && !activeTrainingState().puzzleUnlocked)) return;
  trainingModuleOpen = true;
  howToPlayShell?.classList.add("puzzle-mode");
  howToPlayView?.classList.add("puzzle-mode");
  resetHowToPlayFrameSizing();
  trainingModuleList?.setAttribute("hidden", "");
  puzzlePathList?.setAttribute("hidden", "");
  cheoinseongPathList?.setAttribute("hidden", "");
  howToPlayShell?.removeAttribute("hidden");
  trainingModuleToolbar?.removeAttribute("hidden");
  const title = currentInterfaceLanguage() === "Korean" ? stage.ko : stage.en;
  if (activeTrainingModuleTitle) activeTrainingModuleTitle.textContent = `${currentInterfaceLanguage() === "Korean" ? "퍼즐" : "Puzzle"} ${index + 1} · ${title}`;
  const player = stage.player || "/assets/goryeo-vs-mongol-puzzle.html";
  const language = currentInterfaceLanguage() === "Korean" ? "ko" : "en";
  if (howToPlayFrame) howToPlayFrame.src = `${player}?puzzle=${encodeURIComponent(stage.id)}&lang=${language}&v=20260829-localized-puzzles`;
  setActiveTrainingPathMode(stage.series === "cheoinseong" ? "cheoinseong" : "puzzle");
  howToPlayShell?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncOpenTrainingFrameLanguage() {
  if (!trainingModuleOpen || !howToPlayFrame?.src || howToPlayFrame.src === "about:blank") return;
  try {
    const url = new URL(howToPlayFrame.src, window.location.origin);
    url.searchParams.set("lang", currentInterfaceLanguage() === "Korean" ? "ko" : "en");
    url.searchParams.set("locale", String(Date.now()));
    howToPlayFrame.src = `${url.pathname}${url.search}`;
  } catch {
    // Keep the current training screen if its URL cannot be normalized.
  }
}

function openRequestedTrainingModule() {
  const moduleId = requestedTrainingModuleId();
  if (moduleId) openTrainingModule(moduleId);
}

function resetHowToPlayFrameSizing() {
  howToPlayResizeObserver?.disconnect();
  howToPlayResizeObserver = null;
  if (howToPlayResizeFrame) window.cancelAnimationFrame(howToPlayResizeFrame);
  howToPlayResizeFrame = 0;
  howToPlayFrame?.style.removeProperty("height");
}

function syncPuzzleFrameHeight() {
  if (!howToPlayFrame || !howToPlayShell?.classList.contains("puzzle-mode")) return;
  try {
    const frameDocument = howToPlayFrame.contentDocument;
    if (!frameDocument?.documentElement || !frameDocument.body) return;
    frameDocument.documentElement.style.overflowY = "hidden";
    frameDocument.body.style.overflowY = "hidden";
    const appContent = frameDocument.querySelector("#app");
    const contentHeight = Math.ceil(appContent?.scrollHeight || frameDocument.body.scrollHeight);
    const currentHeight = Number.parseFloat(howToPlayFrame.style.height) || 0;
    if (contentHeight > 0 && Math.abs(currentHeight - contentHeight) > 1) {
      howToPlayFrame.style.height = `${contentHeight}px`;
    }
  } catch {
    howToPlayFrame.style.removeProperty("height");
  }
}

function schedulePuzzleFrameHeightSync() {
  if (howToPlayResizeFrame) return;
  howToPlayResizeFrame = window.requestAnimationFrame(() => {
    howToPlayResizeFrame = 0;
    syncPuzzleFrameHeight();
  });
}

function watchPuzzleFrameHeight() {
  resetHowToPlayFrameSizing();
  if (!howToPlayShell?.classList.contains("puzzle-mode")) return;
  schedulePuzzleFrameHeightSync();
  try {
    const frameDocument = howToPlayFrame?.contentDocument;
    if (!frameDocument?.documentElement || typeof ResizeObserver === "undefined") return;
    howToPlayResizeObserver = new ResizeObserver(schedulePuzzleFrameHeightSync);
    howToPlayResizeObserver.observe(frameDocument.documentElement);
  } catch {
    howToPlayResizeObserver = null;
  }
}

function setHowToPlayMode(mode) {
  const state = activeTrainingState();
  const puzzleUnlocked = Boolean(state.puzzleUnlocked);
  const requestedPathMode = mode === "cheoinseong" ? "cheoinseong" : "puzzle";
  const nextMode = ["puzzle", "cheoinseong"].includes(mode) && puzzleUnlocked ? requestedPathMode : "tutorial";
  if (nextMode === "puzzle" || nextMode === "cheoinseong") {
    showPuzzlePath(nextMode);
    return;
  } else if (trainingModuleOpen) {
    howToPlayShell?.classList.remove("puzzle-mode");
    howToPlayView?.classList.remove("puzzle-mode");
    resetHowToPlayFrameSizing();
    trainingModuleList?.setAttribute("hidden", "");
    puzzlePathList?.setAttribute("hidden", "");
    cheoinseongPathList?.setAttribute("hidden", "");
    howToPlayShell?.removeAttribute("hidden");
    trainingModuleToolbar?.removeAttribute("hidden");
  } else {
    howToPlayShell?.classList.remove("puzzle-mode");
    howToPlayView?.classList.remove("puzzle-mode");
    resetHowToPlayFrameSizing();
    trainingModuleList?.removeAttribute("hidden");
    puzzlePathList?.setAttribute("hidden", "");
    cheoinseongPathList?.setAttribute("hidden", "");
    howToPlayShell?.setAttribute("hidden", "");
  }
  setActiveTrainingPathMode(nextMode);
  renderTrainingControls();
}

function updateTutorialGateState() {
  const required = isStudentTutorialRequired();
  const complete = isStudentTutorialComplete();
  document.body.classList.toggle("tutorial-required", required);
  document.body.classList.toggle("tutorial-complete", complete);
  if (tutorialGateNote) tutorialGateNote.hidden = !required;
  if (tutorialLoginButton) tutorialLoginButton.hidden = Boolean(currentUser);
  setHowToPlayMode(activeTrainingPathMode);
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    const blocked = required && link.dataset.viewLink !== "how-to-play";
    link.classList.toggle("tutorial-locked-link", blocked);
    link.setAttribute("aria-disabled", blocked ? "true" : "false");
  });
}

async function completeStudentTutorial(module, advance = false) {
  if (trainingModuleTransition) {
    if (advance) return trainingModuleTransition.then(() => completeStudentTutorial(module, true));
    return trainingModuleTransition;
  }
  const moduleId = Number(module) || activeTrainingState().nextModule?.id;
  trainingModuleTransition = (async () => {
    const wasAlreadyCompleted = activeTrainingState().completedModules?.includes(moduleId);
    if (wasAlreadyCompleted) {
      if (advance) {
        if (moduleId < 4) openTrainingModule(moduleId + 1);
        else showTrainingModuleHome();
      }
      return;
    }
    if (currentUser && backendOnline) {
      try {
        const data = await api("/api/training/tutorial-complete", {
          method: "POST",
          body: { module: moduleId },
        });
        cachedTrainingState = data.state;
        currentUser = data.user || currentUser;
        showAchievementUnlocks(data.unlocked);
      } catch (error) {
        if (tutorialPuzzleNote) tutorialPuzzleNote.textContent = error.message;
        return;
      }
    } else {
      const state = localTrainingState();
      const nextModule = moduleId;
      if (state.nextModule && nextModule !== state.nextModule.id) {
        if (tutorialPuzzleNote) tutorialPuzzleNote.textContent = "현재 모듈을 먼저 완료하세요.";
        return;
      }
      const completed = [...(state.completedModules || []), nextModule].filter(Boolean);
      writeLocalSetting(completedTrainingModulesKey, JSON.stringify([...new Set(completed)]));
      if (nextModule === 1) writeLocalSetting(studentTutorialCompleteKey, "true");
      if (nextModule === 4) removeLocalSetting(studentTutorialRequiredKey);
      cachedTrainingState = localTrainingState();
    }

    // Keep the tutorial shell mounted. Calling setView("how-to-play") here closes
    // the iframe first, which can briefly show the puzzle home before the next module loads.
    trainingModuleOpen = true;
    updateTutorialGateState();
    if (advance) {
      if (moduleId < 4) openTrainingModule(moduleId + 1);
      else showTrainingModuleHome();
    }
    renderTrainingControls();
  })().finally(() => {
    trainingModuleTransition = null;
  });
  return trainingModuleTransition;
}

async function completePuzzle(payload = {}) {
  if (!currentUser || !backendOnline) {
    const completed = completedPuzzleIds();
    if (payload.puzzleId) completed.add(String(payload.puzzleId));
    writeLocalSetting(completedPuzzleStagesKey, JSON.stringify(Array.from(completed)));
    bumpDailyQuest("puzzles", 1);
    if (tutorialPuzzleNote) {
      tutorialPuzzleNote.hidden = false;
      tutorialPuzzleNote.textContent =
        currentInterfaceLanguage() === "Korean"
          ? "퍼즐 완료가 기록되었습니다. 로그인하면 streak가 저장됩니다."
          : "Puzzle completion recorded locally. Sign in to save streak.";
    }
    return;
  }
  try {
    const data = await api("/api/training/puzzle-complete", {
      method: "POST",
      body: {
        puzzleId: payload.puzzleId || "goryeo-vs-mongol",
        stars: payload.stars || 0,
        title: payload.title,
        theme: payload.theme,
        family: payload.family,
        level: payload.level,
        hintsUsed: payload.hintsUsed,
        durationMs: payload.durationMs,
        familyTotal: payload.familyTotal,
        levelTotal: payload.levelTotal,
      },
    });
    cachedTrainingState = data.state;
    currentUser = data.user || currentUser;
    showAchievementUnlocks(data.unlocked);
    bumpDailyQuest("puzzles", 1);
    renderAuthState();
    renderDashboardSummary();
    await refreshLeaderboard();
  } catch (error) {
    if (tutorialPuzzleNote) {
      tutorialPuzzleNote.hidden = false;
      tutorialPuzzleNote.textContent = error.message;
    }
  }
}

async function api(path, options = {}) {
  if (location.protocol === "file:") {
    throw new Error("Backend is offline. Start the local server to use app features.");
  }

  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

function routeMatchId() {
  const match = location.pathname.match(/^\/match\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function roomUrl(matchId = currentMatchId) {
  if (!matchId) return "";
  return new URL(`/match/${encodeURIComponent(matchId)}`, location.origin).href;
}

function updateRoomLink(matchId = currentMatchId) {
  const link = roomUrl(matchId);
  matchRoomLink.value = link || translateCopy("No match yet");
  copyMatchRoomLinkButton.disabled = !link;
}

function updateMatchRoute(matchId) {
  if (!matchId || location.protocol === "file:") return;
  const nextPath = `/match/${encodeURIComponent(matchId)}`;
  if (location.pathname !== nextPath) {
    history.replaceState({ matchId }, "", nextPath);
  }
}

async function copyRoomLink() {
  const link = matchRoomLink.value;
  if (!currentMatchId || !link || link === translateCopy("No match yet") || link === "No match yet") return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
    } else {
      matchRoomLink.select();
      document.execCommand("copy");
    }
    setVoiceStatus(currentInterfaceLanguage() === "Korean" ? "방 링크를 복사했습니다." : "Match room link copied.");
  } catch {
    matchRoomLink.select();
    setVoiceStatus(currentInterfaceLanguage() === "Korean" ? "방 링크를 선택했습니다. 직접 복사하세요." : "Room link selected. Copy it manually.");
  }
}

async function loadMatchFromRoute() {
  const matchId = routeMatchId();
  if (!matchId || !backendOnline) return false;

  try {
    let data;
    try {
      data = await api(`/api/matches/${matchId}`);
    } catch (error) {
      if (!currentUser) throw error;
      data = await api(`/api/matches/${matchId}/join`, { method: "POST" });
    }
    if (currentUser && !matchBelongsToCurrentUser(data.match) && matchHasOpenSlot(data.match)) {
      data = await api(`/api/matches/${matchId}/join`, { method: "POST" });
    }
    renderMatch(data.match);
    setView("dashboard");
    matchResult.textContent = data.match.result ? translateCopy(data.match.result) : currentInterfaceLanguage() === "Korean" ? "링크로 방에 참여했습니다" : "Joined room from link";
    return true;
  } catch (error) {
    setView("overview");
    matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "방을 찾을 수 없어요" : "Room not found";
    syncState.textContent = error.message;
    return true;
  }
}

function selectedPool() {
  const button = document.querySelector(".pool-button.active") || document.querySelector(".pool-button");
  return {
    id: button?.dataset.poolId || "rapid-10-0",
    timeControl: button?.dataset.timeControl || "10+0",
    rated: button?.dataset.rated === "true",
    label: button?.querySelector("span")?.textContent?.trim() || "10+0",
    name: button?.querySelector("strong")?.textContent?.trim() || "Rapid Talk",
  };
}

function activeGameType() {
  const activeMode = document.querySelector(".segment.active")?.dataset.mode || "Casual";
  return {
    mode: activeMode,
    rated: activeMode === "Rated",
  };
}

function matchBelongsToCurrentUser(match) {
  if (!currentUser || !match?.players) return true;
  return match.players.some((player) => player.userId === currentUser.id);
}

function matchHasOpenSlot(match) {
  return Boolean(match?.players?.some((player) => !player.userId));
}

function shortPlayerId(player) {
  if (!player) return translateCopy("Waiting");
  if (!player.userId) return currentInterfaceLanguage() === "Korean" ? "게스트" : "guest";
  return player.userId.replace(/^user_/, "user_").slice(0, 18);
}

function formatClock(ms) {
  const safeMs = Math.max(0, Number(ms || 0));
  const totalSeconds = Math.ceil(safeMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function clockValue(color) {
  if (!clockSnapshot) return null;
  const key = `${color}Ms`;
  const base = Number(clockSnapshot[key] || 0);
  const active = clockSnapshot.running && clockSnapshot.activeColor === color;
  const elapsed = active ? Date.now() - clockSnapshot.receivedAt : 0;
  return Math.max(0, base - elapsed);
}

function updateClockDisplay() {
  const whiteMs = clockValue("white");
  const blackMs = clockValue("black");
  whiteClock.textContent = whiteMs === null ? translateCopy("Ready") : formatClock(whiteMs);
  blackClock.textContent = blackMs === null ? translateCopy("Ready") : formatClock(blackMs);
  whiteClockCard.classList.toggle("active", clockSnapshot?.running && clockSnapshot.activeColor === "white");
  blackClockCard.classList.toggle("active", clockSnapshot?.running && clockSnapshot.activeColor === "black");
  whiteClockCard.classList.toggle("low-time", whiteMs !== null && whiteMs <= 30_000);
  blackClockCard.classList.toggle("low-time", blackMs !== null && blackMs <= 30_000);

  if (clockSnapshot?.running && clockSnapshot.activeColor) {
    const activeMs = clockSnapshot.activeColor === "white" ? whiteMs : blackMs;
    if (activeMs !== null && activeMs <= 0) {
      notifyClockTimeout(clockSnapshot.activeColor);
    }
  }
}

function startMatchClock(match) {
  window.clearInterval(clockInterval);
  if (!match?.clocks) {
    clockSnapshot = null;
    updateClockDisplay();
    return;
  }

  clockSnapshot = {
    ...match.clocks,
    running: match.status !== "ended" && match.clocks.running !== false,
    receivedAt: Date.now(),
  };
  updateClockDisplay();
  if (clockSnapshot.running) {
    clockInterval = window.setInterval(updateClockDisplay, 1000);
  }
}

async function notifyClockTimeout(color) {
  const timeoutKey = `${currentMatchId}:${color}`;
  if (!currentMatchId || timeoutNotifiedFor === timeoutKey) return;
  timeoutNotifiedFor = timeoutKey;
  const loser = color === "white" ? "White" : "Black";
  const result = `${loser} lost on time`;
  matchResult.textContent = translateCopy(result);
  syncState.textContent = currentInterfaceLanguage() === "Korean" ? "시간이 끝났습니다" : "Time expired";
  window.clearInterval(clockInterval);
  if (backendOnline) {
    await finishMatch(result, { review: false, statusText: currentInterfaceLanguage() === "Korean" ? "시간이 끝났습니다" : "Time expired" });
  }
}

function matchSourceLabel(match) {
  const source = match?.pairingType || "practice";
  const labels = {
    "quick-pool": currentInterfaceLanguage() === "Korean" ? "퀵 매칭" : "Quick pair",
    "open-seek": currentInterfaceLanguage() === "Korean" ? "만든 게임" : "Created game",
    "language-pool": currentInterfaceLanguage() === "Korean" ? "언어 매칭" : "Language match",
    "private-challenge": currentInterfaceLanguage() === "Korean" ? "친구 방" : "Friend room",
    "guest-practice": currentInterfaceLanguage() === "Korean" ? "연습 대국" : "Practice game",
    practice: currentInterfaceLanguage() === "Korean" ? "연습 대국" : "Practice game",
  };
  return labels[source] || (currentInterfaceLanguage() === "Korean" ? "대기실 매칭" : "Lobby match");
}

function matchClockLabel(match) {
  if (!match) return translateCopy("No active clock yet");
  const clock = match.timeControl || "10+0";
  const type = match.rated
    ? currentInterfaceLanguage() === "Korean" ? "기록" : "Rated"
    : currentInterfaceLanguage() === "Korean" ? "친선" : "Casual";
  const goal = match.goal || "Explain chess moves";
  return `${clock} - ${type} - ${translateCopy(goal)}`;
}

function currentPlayerColor(match) {
  if (!match?.players?.length) return "white";
  if (currentUser) {
    return match.players.find((player) => player.userId === currentUser.id)?.color || "white";
  }
  return match.players.find((player) => player.userId === null)?.color || "white";
}

function pieceEditionForColor(color) {
  if (!currentMatchPlayers.length) return selectedPieceEdition;
  if (currentPlayerColor({ players: currentMatchPlayers }) === color) return selectedPieceEdition;
  const player = currentMatchPlayers.find((item) => item.color === color);
  if (player?.pieceEdition) return normalizePieceEdition(player.pieceEdition);
  return selectedPieceEdition;
}

async function refreshStats() {
  if (!backendOnline) return;
  try {
    const stats = await api("/api/stats");
    if (activeMatchesCount) activeMatchesCount.textContent = String(stats.activeMatches);
    if (subtitleSessionsCount) subtitleSessionsCount.textContent = String(stats.subtitleSessions);
  } catch {
    // Non-critical status cards can fail without blocking play.
  }
}

function renderLobby(lobby = {}) {
  cachedLobbyData = lobby;
  const seeks = lobby.openSeeks || [];
  openSeeksList.innerHTML = "";
  const openCount = Number(lobby.openSeeksTotal ?? seeks.length);
  lobbySummary.textContent =
    currentInterfaceLanguage() === "Korean" ? `${openCount}명 대기 중` : `${openCount} live`;

  if (!seeks.length) {
    const empty = document.createElement("article");
    empty.className = "open-seek-card empty-state";

    const title = document.createElement("strong");
    title.textContent = backendOnline ? "아직 대기 중인 플레이어가 없어요" : "실시간 대기실을 불러올 수 없어요";

    const text = document.createElement("p");
    text.textContent = backendOnline
      ? "퀵 매칭으로 첫 상대를 찾아보거나 친구에게 방 코드를 보내보세요."
      : "로컬 서버를 시작하면 실제 플레이어 대기 목록을 볼 수 있습니다.";

    empty.append(title, text);
    openSeeksList.append(empty);
    return;
  }

  seeks.forEach((seek) => {
    const card = document.createElement("article");
    card.className = "open-seek-card";

    const header = document.createElement("header");
    const title = document.createElement("strong");
    title.textContent = seek.displayName || "Player";
    const time = document.createElement("span");
    time.className = "pill";
    time.textContent = seek.timeControl || "10+0";
    header.append(title, time);

    const meta = document.createElement("div");
    meta.className = "open-seek-meta";
    const type = document.createElement("span");
    type.textContent = seek.rated
      ? currentInterfaceLanguage() === "Korean" ? "기록" : "Rated"
      : currentInterfaceLanguage() === "Korean" ? "친선" : "Casual";
    const language = document.createElement("span");
    language.textContent = translateCopy(seek.partnerLanguage || "English");
    meta.append(type, language);

    const goal = document.createElement("p");
    goal.textContent = translateCopy(seek.goal || "Explain chess moves");

    const joinButton = document.createElement("button");
    joinButton.className = "button secondary full small";
    joinButton.type = "button";
    joinButton.textContent = currentInterfaceLanguage() === "Korean" ? "참여하기" : "Join game";
    joinButton.addEventListener("click", () => acceptSeek(seek));

    card.append(header, meta, goal, joinButton);
    openSeeksList.append(card);
  });
}

function adminEmpty(message) {
  const empty = document.createElement("p");
  empty.className = "admin-empty";
  empty.textContent = message;
  return empty;
}

function renderAdminList(container, items, renderItem, emptyMessage) {
  container.innerHTML = "";
  if (!items.length) {
    container.append(adminEmpty(emptyMessage));
    return;
  }
  items.forEach((item) => container.append(renderItem(item)));
}

function adminSearchText(value) {
  return String(value || "").trim().toLowerCase();
}

function adminMatchSearchText(match) {
  const players = (match.players || []).map((player) => `${player.displayName} ${player.color}`).join(" ");
  return adminSearchText(
    `${match.timeControl} ${match.status} ${match.result} ${match.moveCount} ${match.transcriptCount} ${players}`,
  );
}

function adminUserSearchText(user) {
  return adminSearchText(
    `${user.displayName} ${user.email} ${user.role} ${Number(user.mannerTemperature ?? 0).toFixed(1)} ${(user.warnings || []).length}`,
  );
}


async function refreshAdmin() {
  if (!backendOnline) {
    adminStatus.textContent = currentInterfaceLanguage() === "Korean" ? "운영자 도구를 쓰려면 서버를 시작하세요." : "Start the backend to use staff tools.";
    return;
  }
  if (!isStaffUser()) {
    adminStatus.textContent = currentInterfaceLanguage() === "Korean" ? "운영자 권한이 필요합니다." : "Staff access required.";
    return;
  }

  adminStatus.textContent = currentInterfaceLanguage() === "Korean" ? "운영자 데이터를 불러오는 중..." : "Loading staff data...";
  try {
    const data = await api("/api/admin/overview");
    renderAdminOverview(data);
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

function renderAdminOverview(data) {
  cachedAdminData = data;
  if (adminUsersCount) adminUsersCount.textContent = String(data.stats?.users || 0);
  if (adminMatchesCount) adminMatchesCount.textContent = String(data.stats?.activeMatches || 0);
  if (adminReportsCount) adminReportsCount.textContent = String(data.stats?.openReports || 0);
  if (shopInterestCount) shopInterestCount.textContent = String(data.shopInterests?.length || 0);
  if (adminStatus) {
    adminStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `운영자 데이터가 로드되었습니다. 전체 신고 ${data.stats?.totalReports || 0}건`
        : `Staff data loaded. ${data.stats?.totalReports || 0} total report(s).`;
  }

  const matchQuery = adminSearchText(adminMatchSearch?.value);
  const matches = (data.matches || []).filter((match) => !matchQuery || adminMatchSearchText(match).includes(matchQuery));
  renderAdminList(
    adminMatchesList,
    matches,
    (match) => {
      const card = document.createElement("article");
      card.className = "admin-item";
      const title = document.createElement("strong");
      title.textContent = `${match.timeControl || "10+0"} · ${match.status || "unknown"}`;
      const detail = document.createElement("p");
      detail.textContent = `${match.result || "In progress"} · ${match.moveCount || 0} move(s)`;
      const button = document.createElement("button");
      button.className = "button danger full small";
      button.type = "button";
      button.textContent = currentInterfaceLanguage() === "Korean" ? "대국 종료" : "End match";
      button.disabled = match.status === "ended";
      button.addEventListener("click", () => endAdminMatch(match.id));
      card.append(title, detail, button);
      return card;
    },
    currentInterfaceLanguage() === "Korean" ? "아직 대국이 없습니다." : "No matches yet.",
  );

  const userQuery = adminSearchText(adminUserSearch?.value);
  const users = (data.users || []).filter((adminItem) => !userQuery || adminUserSearchText(adminItem).includes(userQuery));
  renderAdminList(
    adminUsersList,
    users,
    (adminItem) => {
      const card = document.createElement("details");
      card.className = "admin-item admin-disclosure";
      const warningCount = (adminItem.warnings || []).length;
      const summary = document.createElement("summary");
      const summaryText = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = adminItem.displayName || "Player";
      const email = document.createElement("small");
      email.textContent = adminItem.email || "";
      const warningLabel = document.createElement("b");
      warningLabel.textContent =
        currentInterfaceLanguage() === "Korean" ? `경고 ${warningCount}개` : `${warningCount} warning${warningCount === 1 ? "" : "s"}`;
      summaryText.append(name, email);
      summary.append(summaryText, warningLabel);
      const detail = document.createElement("div");
      detail.className = "admin-disclosure-body";
      const score = document.createElement("p");
      score.textContent = `${adminItem.role || "player"} · ${mannerBadgeText(Number(adminItem.mannerTemperature ?? 0))}`;
      const issueButton = document.createElement("button");
      issueButton.className = "button danger full small";
      issueButton.type = "button";
      issueButton.textContent = isStaffUser(adminItem)
        ? currentInterfaceLanguage() === "Korean" ? "운영자 계정" : "Staff account"
        : currentInterfaceLanguage() === "Korean" ? "경고 주기" : "Issue warning";
      issueButton.disabled = isStaffUser(adminItem);
      issueButton.addEventListener("click", () => warnAdminUser(adminItem.id));
      const reduceButton = document.createElement("button");
      reduceButton.className = "button secondary full small";
      reduceButton.type = "button";
      reduceButton.textContent = currentInterfaceLanguage() === "Korean" ? "경고 1개 줄이기" : "Reduce one warning";
      reduceButton.disabled = warningCount === 0 || isStaffUser(adminItem);
      reduceButton.addEventListener("click", () => reduceAdminWarning(adminItem.id));
      detail.append(score, issueButton, reduceButton);
      card.append(summary, detail);
      return card;
    },
    currentInterfaceLanguage() === "Korean" ? "아직 사용자가 없습니다." : "No users yet.",
  );

  renderAdminList(
    adminReportsList,
    data.reports || [],
    (report) => {
      const card = document.createElement("article");
      card.className = "admin-item";
      const reason = document.createElement("strong");
      reason.textContent = report.reason || "Safety report";
      const status = document.createElement("span");
      status.textContent = report.status || "open";
      const reporter = document.createElement("p");
      reporter.textContent =
        currentInterfaceLanguage() === "Korean" ? `신고자: ${report.reporterName || "Guest"}` : `Reporter: ${report.reporterName || "Guest"}`;
      const detail = document.createElement("p");
      detail.textContent =
        report.detail || (currentInterfaceLanguage() === "Korean" ? "상세 내용이 없습니다." : "No details provided.");
      const resolveButton = document.createElement("button");
      resolveButton.className = "button secondary full small";
      resolveButton.type = "button";
      resolveButton.textContent =
        report.status === "resolved"
          ? currentInterfaceLanguage() === "Korean" ? "해결됨" : "Resolved"
          : currentInterfaceLanguage() === "Korean" ? "해결 처리" : "Mark resolved";
      resolveButton.disabled = report.status === "resolved";
      resolveButton.addEventListener("click", () => resolveAdminReport(report.id));
      const deleteButton = document.createElement("button");
      deleteButton.className = "button danger full small";
      deleteButton.type = "button";
      deleteButton.textContent = currentInterfaceLanguage() === "Korean" ? "신고 삭제" : "Delete report";
      deleteButton.addEventListener("click", () => deleteAdminReport(report.id));
      card.append(reason, status, reporter, detail, resolveButton, deleteButton);
      return card;
    },
    currentInterfaceLanguage() === "Korean" ? "아직 안전 신고가 없습니다." : "No safety reports yet.",
  );

  if (shopInterestList) {
    renderAdminList(
      shopInterestList,
      data.shopInterests || [],
      (interest) => {
        const card = document.createElement("article");
        card.className = "admin-item";
        const title = document.createElement("strong");
        title.textContent = interest.productName || "Product";
        const displayName = document.createElement("span");
        displayName.textContent = interest.displayName || "Guest Player";
        const email = document.createElement("p");
        email.textContent = interest.email || "No email";
        card.append(title, displayName, email);
        return card;
      },
      currentInterfaceLanguage() === "Korean" ? "아직 상품 관심 기록이 없습니다." : "No product interest yet.",
    );
  }
}

async function resolveAdminReport(reportId) {
  try {
    await api(`/api/admin/reports/${reportId}/resolve`, { method: "POST" });
    await refreshAdmin();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function deleteAdminReport(reportId) {
  try {
    await api(`/api/admin/reports/${reportId}`, { method: "DELETE" });
    await refreshAdmin();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function warnAdminUser(userId) {
  try {
    await api(`/api/admin/users/${userId}/warn`, {
      method: "POST",
      body: { reason: "Staff safety warning" },
    });
    await refreshAdmin();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function reduceAdminWarning(userId) {
  try {
    await api(`/api/admin/users/${userId}/warnings/reduce`, { method: "POST" });
    await refreshAdmin();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function endAdminMatch(matchId) {
  try {
    await api(`/api/admin/matches/${matchId}/end`, {
      method: "POST",
      body: { result: "Ended by staff" },
    });
    await refreshAdmin();
    await refreshStats();
  } catch (error) {
    adminStatus.textContent = error.message;
  }
}

async function refreshLobby() {
  if (!backendOnline) {
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
    return;
  }

  try {
    const lobby = await api("/api/matches/lobby");
    renderLobby(lobby);
  } catch (error) {
    lobbySummary.textContent = "Lobby offline";
    queuePrompt.textContent = error.message;
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
  }
}

async function checkBackend() {
  try {
    const [health, session] = await Promise.all([api("/api/health"), api("/api/session")]);
    backendOnline = Boolean(health.ok);
    setServerStatus(currentInterfaceLanguage() === "Korean" ? "서버 연결됨" : "Backend online", true);
    currentUser = session.user;
    cachedTrainingState = currentUser?.training || cachedTrainingState;
    if (currentUser) {
      authStatus.textContent =
        currentInterfaceLanguage() === "Korean" ? `${currentUser.displayName}님으로 로그인됨` : `Signed in as ${currentUser.displayName}`;
      updateTemperature(Number(currentUser.mannerTemperature ?? currentManner));
    }
    renderAuthState();
    showAchievementUnlocks(session.unlocked);
    if (currentUser) connectSocket(null);
    const routedToMatch = await loadMatchFromRoute();
    if (currentUser && !routedToMatch) await refreshActivePlayState();
    if (isStaffRoute()) {
      setView(isStaffUser() ? "staff" : "overview");
    } else if (isTutorialRoute()) {
      setView("how-to-play");
      openRequestedTrainingModule();
    } else if (currentUser && !routedToMatch) {
      setView("overview");
    }
  } catch {
    backendOnline = false;
    setServerStatus(currentInterfaceLanguage() === "Korean" ? "프로토타입 모드" : "Prototype mode", false);
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
  }
}

function connectSocket(matchId) {
  if (!backendOnline || location.protocol === "file:") return;
  if (socket && socket.readyState === WebSocket.OPEN) {
    sendSocketMessage({ type: "join", matchId, clientId: voiceClientId });
    return;
  }
  if (socket && socket.readyState === WebSocket.CONNECTING) {
    socket.addEventListener("open", () => sendSocketMessage({ type: "join", matchId, clientId: voiceClientId }), { once: true });
    return;
  }

  const protocol = location.protocol === "https:" ? "wss" : "ws";
  socket = new WebSocket(`${protocol}://${location.host}/ws`);
  socket.addEventListener("open", () => {
    sendSocketMessage({ type: "join", matchId, clientId: voiceClientId });
    syncState.textContent = currentInterfaceLanguage() === "Korean" ? "실시간 연결됨" : "Live socket connected";
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if ((message.type === "match:started" || message.type === "queue:matched" || message.type === "match:joined") && matchBelongsToCurrentUser(message.match)) {
      renderMatch(message.match);
      if (friendRoomDialog?.open && (message.match?.players || []).filter((player) => player.userId).length > 1) {
        friendRoomDialog.close();
      }
    }
    if (message.type === "match:move" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "match:ended" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "review:generated") renderReview(message.review);
    if (message.type === "forum:updated" && forumInitialized) refreshForumPosts({ quiet: true });
    if (message.type?.startsWith("voice:")) handleVoiceSignal(message);
    if (message.type === "stt:subtitle") handleSubtitleSignal(message);
    if (message.type === "draw:offer") handleDrawOffer(message);
    if (message.type === "queue:waiting") {
      queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "다른 플레이어가 들어오기를 기다리는 중입니다." : "Waiting for another player to join.";
    }
    if (message.type === "lobby:updated") refreshLobby();
  });
  socket.addEventListener("close", () => {
    syncState.textContent = currentInterfaceLanguage() === "Korean" ? "실시간 연결이 끊겼습니다" : "Live socket disconnected";
  });
}

async function signInOrRegister() {
  const email = authEmail.value.trim();
  const displayName = authDisplayName.value.trim();
  const password = authPassword.value;
  const confirmPassword = authConfirmPassword.value;
  if (!email || !password) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "계속하려면 이메일과 비밀번호를 입력하세요." : "Enter an email and password to continue.";
    return;
  }
  if (authMode === "signup" && !displayName) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "상대에게 보일 이름을 입력하세요." : "Choose a display name shown to opponents.";
    authDisplayName.focus();
    return;
  }
  if (authMode === "signup" && !confirmPassword) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "확인을 위해 비밀번호를 한 번 더 입력하세요." : "Type your password again to confirm it.";
    authConfirmPasswordField.hidden = false;
    authConfirmPassword.focus();
    return;
  }
  if (authMode === "signup" && password !== confirmPassword) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "비밀번호가 서로 다릅니다." : "Passwords do not match.";
    authConfirmPassword.focus();
    return;
  }

  authSubmit.disabled = true;
  authSubmit.textContent =
    authMode === "login"
      ? currentInterfaceLanguage() === "Korean" ? "로그인 중..." : "Logging in..."
      : currentInterfaceLanguage() === "Korean" ? "계정 만드는 중..." : "Creating account...";
  authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "계정을 확인하는 중..." : "Checking your account...";

  try {
    const data = await api(authMode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      body: {
        email,
        displayName,
        password,
        languagePair: authLanguagePair.value,
      },
    });
    currentUser = data.user;
    authStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${currentUser.displayName}님으로 로그인되었습니다. 대국을 시작하세요.`
        : `Signed in as ${currentUser.displayName}. Continue to play.`;
    authDisplayName.value = "";
    authPassword.value = "";
    authConfirmPassword.value = "";
    renderAuthState();
    connectSocket(null);
    await refreshActivePlayState();
    setView("overview");
  } catch (error) {
    authStatus.textContent = error.message;
    renderAuthState();
  }
}

async function signOut() {
  if (!backendOnline) {
    currentUser = null;
    clearCurrentMatch();
    clearProfile();
    renderAuthState();
    setView("home");
    return;
  }

  try {
    await api("/api/auth/logout", { method: "POST" });
  } catch {
    // The visible account state can still reset if the server logout response is missed.
  }
  currentUser = null;
  clearCurrentMatch();
  authEmail.disabled = false;
  authPassword.disabled = false;
  authLanguagePair.disabled = false;
  authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "로그아웃되었습니다. 언제든 다시 로그인할 수 있어요." : "Signed out. You can log in again anytime.";
  clearProfile();
  renderAuthState();
  setView("home");
}

function loadGoogleIdentityScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;
  googleScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Google 로그인 스크립트를 불러오지 못했습니다."));
    document.head.append(script);
  });
  return googleScriptPromise;
}

async function finishGoogleLogin(credential) {
  if (!credential) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "Google 로그인 응답이 비어 있습니다." : "Google login response was empty.";
    return;
  }
  authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "Google 계정을 확인하는 중..." : "Checking your Google account...";
  googleSignInButton.disabled = true;
  try {
    const data = await api("/api/auth/google", {
      method: "POST",
      body: {
        credential,
        languagePair: authLanguagePair.value,
        pieceEdition: selectedPieceEdition,
      },
    });
    currentUser = data.user;
    authStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${currentUser.displayName}님으로 Google 로그인되었습니다.`
        : `Signed in with Google as ${currentUser.displayName}.`;
    authDisplayName.value = "";
    authPassword.value = "";
    authConfirmPassword.value = "";
    renderAuthState();
    connectSocket(null);
    await refreshActivePlayState();
    setView("overview");
  } catch (error) {
    authStatus.textContent = error.message;
    renderAuthState();
  } finally {
    googleSignInButton.disabled = Boolean(currentUser);
  }
}

async function initializeGoogleLogin() {
  if (location.protocol === "file:") return;
  try {
    const config = await api("/api/config");
    googleClientId = config.googleClientId || "";
    if (!googleClientId) {
      googleLoginReady = false;
      googleSignInButton.textContent = currentInterfaceLanguage() === "Korean" ? "Google 로그인 설정 필요" : "Configure Google login";
      renderAuthState();
      return;
    }
    await loadGoogleIdentityScript();
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: (response) => finishGoogleLogin(response.credential),
      ux_mode: "popup",
    });
    if (googleSignInSlot) {
      googleSignInSlot.innerHTML = "";
      window.google.accounts.id.renderButton(googleSignInSlot, {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "rectangular",
        text: authMode === "signup" ? "signup_with" : "signin_with",
        width: Math.min(360, Math.max(240, Math.floor(googleSignInSlot.getBoundingClientRect().width || 320))),
      });
    }
    googleLoginReady = true;
    renderAuthState();
  } catch (error) {
    googleLoginReady = false;
    googleSignInButton.hidden = false;
    googleSignInButton.disabled = false;
    authStatus.textContent = error.message;
  }
}

async function deleteAccount() {
  if (!currentUser) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "계정을 삭제하려면 먼저 로그인하세요." : "Sign in before deleting an account.";
    setView("home");
    return;
  }

  const confirmed = window.confirm(
    currentInterfaceLanguage() === "Korean"
      ? "계정을 삭제할까요? 프로필, 진행 중인 방, 대기열 정보가 삭제됩니다."
      : "Delete your account? This removes your profile, active rooms, and queue entries."
  );
  if (!confirmed) return;

  if (!backendOnline) {
    currentUser = null;
    clearCurrentMatch();
    clearProfile();
    renderAuthState();
    authStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? "로컬 계정 상태를 지웠습니다. 저장된 계정 데이터 삭제는 서버를 시작한 뒤 가능합니다."
        : "Local account state cleared. Start the server to delete saved account data.";
    setView("home");
    return;
  }

  deleteAccountButton.disabled = true;
  deleteAccountButton.textContent = currentInterfaceLanguage() === "Korean" ? "삭제 중..." : "Deleting...";
  try {
    await api("/api/auth/delete", { method: "DELETE" });
    currentUser = null;
    clearCurrentMatch();
    clearProfile();
    renderAuthState();
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "계정을 삭제했습니다." : "Account deleted.";
    setView("home");
  } catch (error) {
    authStatus.textContent = error.message;
  } finally {
    deleteAccountButton.disabled = false;
    deleteAccountButton.textContent = translateCopy("Delete account");
  }
}

async function signInWithGoogle() {
  if (!googleClientId) {
    authStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? "Render 환경변수 GOOGLE_CLIENT_ID를 설정한 뒤 다시 배포하세요."
        : "Set GOOGLE_CLIENT_ID in Render and redeploy.";
    return;
  }
  try {
    await loadGoogleIdentityScript();
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        authStatus.textContent =
          currentInterfaceLanguage() === "Korean"
            ? "Google 로그인 팝업을 열 수 없습니다. 브라우저 팝업 허용 또는 아래 Google 버튼을 사용하세요."
            : "Google login popup was not shown. Allow popups or use the Google button.";
      }
    });
  } catch (error) {
    authStatus.textContent = error.message;
  }
}

function toggleContrastMode() {
  const enabled = !document.body.classList.contains("high-contrast-mode");
  document.body.classList.toggle("high-contrast-mode", enabled);
  contrastModeButton.setAttribute("aria-pressed", String(enabled));
}

const textSizeScale = [0.92, 0.96, 1, 1.06, 1.12, 1.2, 1.28];

function applyTextSize(value) {
  const sliderValue = Number(value);
  const scale = textSizeScale[sliderValue] || 1;
  document.documentElement.style.setProperty("--app-font-scale", String(scale));
  localStorage.setItem("easyMateTextSize", String(sliderValue));
}

function updateDeleteAccountButtonState() {
  if (!deleteAccountButton) return;
  deleteAccountButton.disabled = !currentUser || deleteAccountConfirm?.value.trim() !== "delete account";
}

async function deleteAccountWithTypedConfirmation() {
  if (!currentUser) {
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "계정을 삭제하려면 먼저 로그인하세요." : "Sign in before deleting an account.";
    setView("home");
    return;
  }
  if (deleteAccountConfirm?.value.trim() !== "delete account") {
    if (profileStatus) profileStatus.textContent = "계정을 삭제하려면 delete account를 정확히 입력하세요.";
    updateDeleteAccountButtonState();
    return;
  }
  if (!backendOnline) {
    currentUser = null;
    clearCurrentMatch();
    clearProfile();
    renderAuthState();
    if (deleteAccountConfirm) deleteAccountConfirm.value = "";
    updateDeleteAccountButtonState();
    authStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? "로컬 계정 상태를 지웠습니다. 저장된 계정 데이터 삭제는 서버가 필요합니다."
        : "Local account state cleared. Start the server to delete saved account data.";
    setView("home");
    return;
  }
  deleteAccountButton.disabled = true;
  deleteAccountButton.textContent = currentInterfaceLanguage() === "Korean" ? "삭제 중..." : "Deleting...";
  try {
    await api("/api/auth/delete", { method: "DELETE" });
    currentUser = null;
    clearCurrentMatch();
    clearProfile();
    renderAuthState();
    if (deleteAccountConfirm) deleteAccountConfirm.value = "";
    updateDeleteAccountButtonState();
    authStatus.textContent = currentInterfaceLanguage() === "Korean" ? "계정이 삭제되었습니다." : "Account deleted.";
    setView("home");
  } catch (error) {
    authStatus.textContent = error.message;
  } finally {
    updateDeleteAccountButtonState();
    deleteAccountButton.textContent = translateCopy("Delete account");
  }
}


async function saveInlineProfileName() {
  try {
    await saveProfilePatch({ displayName: profileDisplayName?.value.trim() || currentUser?.displayName || "", displayNameSource: "user" });
    if (profileNameEditor) profileNameEditor.hidden = true;
  } catch (error) {
    if (profileStatus) profileStatus.textContent = error.message;
  }
}

async function saveInlineProfileBio() {
  try {
    await saveProfilePatch({ bio: profileBio?.value.trim() || "" });
    if (profileBioEditor) profileBioEditor.hidden = true;
  } catch (error) {
    if (profileStatus) profileStatus.textContent = error.message;
  }
}

function readImageFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error("이미지를 읽지 못했습니다.")));
    reader.readAsDataURL(file);
  });
}

async function uploadProfileImage(file) {
  if (!file) return;
  if (file.size > 700_000) {
    if (profileStatus) profileStatus.textContent = "이미지는 700KB 이하로 업로드하세요.";
    return;
  }
  try {
    const dataUrl = await readImageFileAsDataUrl(file);
    if (profileImage) profileImage.value = dataUrl;
    await saveProfilePatch({ avatarUrl: dataUrl });
  } catch (error) {
    if (profileStatus) profileStatus.textContent = error.message;
  } finally {
    if (profileImageFile) profileImageFile.value = "";
  }
}

function forumTimeLabel(createdAt) {
  const date = new Date(createdAt);
  if (!Number.isFinite(date.getTime())) return "";
  return new Intl.DateTimeFormat(currentInterfaceLanguage() === "Korean" ? "ko-KR" : "en-US", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(date);
}

async function refreshForumPosts({ quiet = false } = {}) {
  if (!backendOnline) {
    if (!quiet) renderForumPosts();
    return;
  }
  if (forumRefreshPromise) return forumRefreshPromise;
  forumRefreshPromise = (async () => {
    try {
      const data = await api("/api/forum/posts");
      const nextPosts = Array.isArray(data.posts) ? data.posts : [];
      const nextSignature = JSON.stringify(nextPosts);
      if (nextSignature === forumPostsSignature) return;
      forumPostsSignature = nextSignature;
      forumPosts = nextPosts;
      renderForumPosts();
    } catch (error) {
      if (!quiet) {
        forumPosts = [];
        forumPostsSignature = "";
        renderForumPosts();
      }
    } finally {
      forumRefreshPromise = null;
    }
  })();
  return forumRefreshPromise;
}

async function refreshActivePlayState({ enter = false } = {}) {
  if (!backendOnline || !currentUser) {
    clearCurrentMatch();
    return null;
  }

  try {
    const data = await api("/api/matches/active");
    resumableMatch = data.match || null;
    resumableOpenSeek = data.openSeek || null;
    resumableChallenge = data.openChallenge || null;
    renderActiveMatchReturn();
    if (enter && resumableMatch) {
      renderMatch(resumableMatch);
      setView("dashboard");
    }
    return data;
  } catch {
    renderActiveMatchReturn();
    return null;
  }
}

async function resumeActivePlay() {
  const cachedMatch = resumableMatch && resumableMatch.status !== "ended" ? resumableMatch : null;
  if (cachedMatch) {
    renderMatch(cachedMatch);
    setView("dashboard");
    refreshActivePlayState().catch(() => {});
    return;
  }

  const state = await refreshActivePlayState();
  if (state?.match) {
    renderMatch(state.match);
    setView("dashboard");
    return;
  }
  if (state?.openSeek) {
    setView("dashboard");
    setMatchState("searching");
    queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "대기 중" : "Waiting";
    queueProgress.style.width = "38%";
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean"
      ? `${state.openSeek.timeControl} 방에서 상대를 기다리고 있습니다.`
      : `Waiting for an opponent in your ${state.openSeek.timeControl} room.`;
    showQueueTip();
    return;
  }
  if (state?.openChallenge) {
    privateChallengeCode.textContent = state.openChallenge.code;
    friendRoomStatus.textContent = currentInterfaceLanguage() === "Korean" ? "친구가 참여하기를 기다리고 있습니다." : "Waiting for your friend to join.";
    friendRoomDialog.showModal();
    return;
  }

  setView("dashboard");
  queuePrompt.textContent = currentInterfaceLanguage() === "Korean"
    ? "진행 중인 방을 찾지 못했습니다. 새 방을 만들거나 초대 코드를 다시 확인하세요."
    : "The room is no longer active. Create a new room or check the invite code.";
}

function setForumPolling(active) {
  window.clearInterval(forumPollInterval);
  forumPollInterval = null;
  if (!active) return;
  forumPollInterval = window.setInterval(() => {
    if (!document.hidden) refreshForumPosts({ quiet: true });
  }, 30000);
}

function renderForumPosts() {
  forumPostList.replaceChildren();
  forumFilterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.forumFilter === forumFilter);
    button.textContent = translateCopy(button.dataset.forumFilter);
  });
  const visiblePosts = (forumFilter === "All" ? forumPosts : forumPosts.filter((post) => post.category === forumFilter)).sort(
    (first, second) => Number(second.pinned) - Number(first.pinned)
  );
  renderHomeForumPreview();
  if (visiblePosts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "forum-empty";
    empty.textContent = translateCopy("No posts yet.");
    forumPostList.append(empty);
    return;
  }
  visiblePosts.forEach((post) => {
    const item = document.createElement("article");
    item.className = "forum-post";

    const pin = document.createElement("span");
    pin.className = "forum-post-pin";
    pin.textContent = post.pinned ? "고정" : "";

    const main = document.createElement("div");
    main.className = "forum-post-main";

    const category = document.createElement("span");
    category.className = `forum-post-tag ${post.category === "Question" ? "question" : post.category === "Free" ? "free" : ""}`;
    category.textContent = translateCopy(post.category);

    const title = document.createElement("h4");
    title.textContent = post.title;

    const titleLine = document.createElement("div");
    titleLine.className = "forum-post-titleline";
    titleLine.append(category, title);

    const summary = document.createElement("button");
    summary.type = "button";
    summary.className = "forum-post-summary";
    summary.setAttribute("aria-expanded", String(expandedForumPostId === post.id));
    summary.append(titleLine);
    summary.addEventListener("click", () => {
      expandedForumPostId = expandedForumPostId === post.id ? null : post.id;
      renderForumPosts();
    });

    const side = document.createElement("div");
    side.className = "forum-post-side";

    const author = document.createElement("span");
    author.textContent = post.author;

    const time = document.createElement("time");
    time.textContent = post.time;

    const comments = document.createElement("span");
    comments.className = "forum-comments";
    const replies = Array.isArray(post.comments) ? post.comments : [];
    comments.textContent = currentInterfaceLanguage() === "Korean" ? `댓글 ${replies.length}` : `${replies.length} comments`;

    let pinButton = null;
    let deleteButton = null;
    if (isStaffUser()) {
      pinButton = document.createElement("button");
      pinButton.className = "forum-pin-action";
      pinButton.type = "button";
      pinButton.textContent = post.pinned
        ? currentInterfaceLanguage() === "Korean" ? "고정 해제" : "Unpin"
        : currentInterfaceLanguage() === "Korean" ? "고정" : "Pin";
      pinButton.addEventListener("click", () => toggleForumPin(post.id));

      deleteButton = document.createElement("button");
      deleteButton.className = "forum-delete-action";
      deleteButton.type = "button";
      deleteButton.textContent = currentInterfaceLanguage() === "Korean" ? "삭제" : "Delete";
      deleteButton.addEventListener("click", () => deleteForumPost(post, deleteButton));
    }

    main.append(summary);
    if (expandedForumPostId === post.id) {
      const detail = document.createElement("section");
      detail.className = "forum-post-detail";
      const body = document.createElement("p");
      body.className = "forum-post-body";
      body.textContent = post.body || "";
      detail.append(body);
      const replyList = document.createElement("div");
      replyList.className = "forum-reply-list";
      replies.forEach((reply) => {
        const row = document.createElement("article");
        row.className = "forum-reply";
        const meta = document.createElement("div");
        meta.className = "forum-reply-meta";
        meta.textContent = `${reply.author || "Player"} · ${forumTimeLabel(reply.createdAt)}`;
        const copy = document.createElement("p");
        copy.textContent = reply.body || "";
        row.append(meta, copy);
        replyList.append(row);
      });
      detail.append(replyList);
      if (currentUser) {
        const form = document.createElement("form");
        form.className = "forum-reply-form";
        const input = document.createElement("textarea");
        input.maxLength = 1000;
        input.rows = 2;
        input.placeholder = currentInterfaceLanguage() === "Korean" ? "답글 입력" : "Write a reply";
        const submit = document.createElement("button");
        submit.type = "submit";
        submit.className = "button primary";
        submit.textContent = currentInterfaceLanguage() === "Korean" ? "답글 등록" : "Post reply";
        form.addEventListener("submit", async (event) => {
          event.preventDefault();
          const value = input.value.trim();
          if (!value) return;
          submit.disabled = true;
          try {
            await api(`/api/forum/posts/${encodeURIComponent(post.id)}/comments`, { method: "POST", body: { body: value } });
            await refreshForumPosts();
          } finally {
            submit.disabled = false;
          }
        });
        form.append(input, submit);
        detail.append(form);
      }
      main.append(detail);
    }
    side.append(author, time, comments);
    if (pinButton) side.append(pinButton);
    if (deleteButton) side.append(deleteButton);
    time.textContent = forumTimeLabel(post.createdAt);
    item.append(pin, main, side);
    forumPostList.append(item);
  });
}

async function completeReviewQuiz(payload = {}) {
  if (!currentUser || !backendOnline) return;
  try {
    const data = await api("/api/training/review-quiz", {
      method: "POST",
      body: { module: Number(payload.module) || 1, score: Number(payload.score) || 0 },
    });
    cachedTrainingState = data.state;
    currentUser = data.user || currentUser;
    showAchievementUnlocks(data.unlocked);
    renderAuthState();
    renderDashboardSummary();
  } catch (error) {
    if (tutorialPuzzleNote) {
      tutorialPuzzleNote.hidden = false;
      tutorialPuzzleNote.textContent = error.message;
    }
  }
}

function showAchievementUnlocks(unlocked = []) {
  const badges = Array.isArray(unlocked)
    ? unlocked.filter((badge) => badge?.id && badge?.name)
    : [];
  if (!badges.length) return;

  let stack = document.getElementById("achievementToastStack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "achievementToastStack";
    stack.className = "achievement-toast-stack";
    document.body.appendChild(stack);
  }

  const acknowledged = [];
  badges.forEach((badge) => {
    if (stack.querySelector(`[data-achievement-id="${badge.id}"]`)) return;
    acknowledged.push(badge.id);
    const toast = document.createElement("section");
    toast.className = "achievement-toast";
    toast.dataset.achievementId = badge.id;
    toast.setAttribute("role", "status");

    const artwork = document.createElement("img");
    artwork.className = "achievement-toast-artwork";
    artwork.src = badge.imageUrl || "/assets/badges/canva-first-step.png";
    artwork.alt = `${badge.name} 배지`;
    artwork.decoding = "async";
    artwork.addEventListener("error", () => artwork.remove(), { once: true });

    const copy = document.createElement("div");
    copy.className = "achievement-toast-copy";
    const kicker = document.createElement("span");
    kicker.className = "achievement-toast-kicker";
    kicker.textContent = currentInterfaceLanguage() === "Korean" ? "새 배지 획득" : "New badge unlocked";
    const name = document.createElement("strong");
    name.textContent = badge.name;
    const detail = document.createElement("p");
    detail.textContent = badge.detail || "프로필에서 획득 배지를 확인하세요.";
    copy.append(kicker, name, detail);

    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.className = "achievement-toast-close";
    dismiss.setAttribute("aria-label", currentInterfaceLanguage() === "Korean" ? "닫기" : "Close");
    dismiss.textContent = "×";
    dismiss.addEventListener("click", () => toast.remove());
    toast.append(artwork, copy, dismiss);
    stack.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("is-visible"));
    window.setTimeout(() => toast.remove(), 9000);
  });

  if (!acknowledged.length || !backendOnline) return;
  api("/api/achievements/acknowledge", { method: "POST", body: { ids: acknowledged } })
    .then((data) => {
      if (data?.user) currentUser = { ...currentUser, ...data.user };
    })
    .catch(() => {});
}

function renderHomeForumPreview() {
  if (!homeForumList) return;
  homeForumList.replaceChildren();
  ["Notice", "Question", "Free"].forEach((category) => {
    const item = document.createElement("li");
    const label = document.createElement("b");
    const title = document.createElement("span");
    const post = forumPosts.find((candidate) => candidate.category === category);
    label.textContent = translateCopy(category);
    title.textContent = post?.title || "";
    item.classList.toggle("is-empty", !post);
    item.append(label, title);
    homeForumList.append(item);
  });
}

async function publishForumPost() {
  const title = forumPostTitle.value.trim();
  const body = forumPostBody.value.trim();
  if (forumPostCategory.value === "Notice" && !isStaffUser()) {
    forumPostCategory.value = "Question";
    forumPostBody.focus();
    return;
  }
  if (!title || !body) {
    forumPostBody.focus();
    return;
  }
  if (!currentUser || !backendOnline) {
    forumPostBody.setCustomValidity(currentInterfaceLanguage() === "Korean" ? "게시하려면 로그인과 서버 연결이 필요합니다." : "Sign in and connect to publish.");
    forumPostBody.reportValidity();
    return;
  }
  forumPostBody.setCustomValidity("");
  publishForumPostButton.disabled = true;
  try {
    const data = await api("/api/forum/posts", {
      method: "POST",
      body: { title, body, category: forumPostCategory.value },
    });
    expandedForumPostId = data.post?.id || null;
    forumPostTitle.value = "";
    forumPostBody.value = "";
    forumComposer.hidden = true;
    await refreshForumPosts();
  } finally {
    publishForumPostButton.disabled = false;
  }
}

function toggleForumComposer() {
  renderStaffAccessState();
  forumComposer.hidden = !forumComposer.hidden;
  if (!forumComposer.hidden) forumPostTitle.focus();
}

async function toggleForumPin(postId) {
  if (!isStaffUser()) return;
  await api(`/api/forum/posts/${encodeURIComponent(postId)}/pin`, { method: "PATCH" });
  await refreshForumPosts();
}

async function deleteForumPost(post, control) {
  if (!isStaffUser() || !post?.id) return;
  const message = currentInterfaceLanguage() === "Korean"
    ? `“${post.title}” 게시글과 답글을 모두 삭제할까요?`
    : `Delete “${post.title}” and all of its replies?`;
  if (!window.confirm(message)) return;

  if (control) control.disabled = true;
  try {
    await api(`/api/forum/posts/${encodeURIComponent(post.id)}`, { method: "DELETE" });
    if (expandedForumPostId === post.id) expandedForumPostId = null;
    forumPosts = forumPosts.filter((item) => item.id !== post.id);
    renderForumPosts();
  } catch (error) {
    if (control) {
      control.disabled = false;
      control.textContent = error.message;
    }
  }
}

async function saveShopInterest(productName) {
  if (!currentUser) {
    shopInterestStatus.textContent = translateCopy("Sign in before reserving product interest.");
    return;
  }
  shopInterestStatus.textContent =
    currentInterfaceLanguage() === "Korean" ? `${translateCopy(productName)} 관심 예약을 저장하는 중...` : `Saving ${productName} interest...`;
  if (!backendOnline) {
    shopInterestStatus.textContent = translateCopy("Start the backend to save product interest for staff.");
    return;
  }
  try {
    await api("/api/shop/interests", {
      method: "POST",
      body: { productName },
    });
    shopInterestStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${translateCopy(productName)} 관심 예약이 저장되었습니다. 스태프 페이지에서 확인할 수 있습니다.`
        : `${productName} interest saved. Staff can now see it.`;
    if (isStaffUser()) await refreshAdmin();
  } catch (error) {
    shopInterestStatus.textContent = error.message;
  }
}

function loadStaffShopProducts() {
  try {
    staffShopProducts = JSON.parse(localStorage.getItem("easyMateStaffShopProducts") || "[]");
  } catch {
    staffShopProducts = [];
  }
}

function saveStaffShopProducts() {
  localStorage.setItem("easyMateStaffShopProducts", JSON.stringify(staffShopProducts));
}

function loadDeletedShopProductIds() {
  try {
    deletedShopProductIds = JSON.parse(localStorage.getItem("easyMateDeletedShopProductIds") || "[]");
  } catch {
    deletedShopProductIds = [];
  }
}

function saveDeletedShopProductIds() {
  localStorage.setItem("easyMateDeletedShopProductIds", JSON.stringify(deletedShopProductIds));
}

function ensureStaffProductIds() {
  let changed = false;
  staffShopProducts = staffShopProducts.map((product) => {
    if (product.id) return product;
    changed = true;
    return {
      ...product,
      id: window.crypto?.randomUUID?.() || `product_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    };
  });
  if (changed) saveStaffShopProducts();
}

function readStaffProductImage(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error("Could not read product image.")));
    reader.readAsDataURL(file);
  });
}

function addShopProductCard({ id, tag: productTag = "Staff pick", imageSrc, name, price, description }, { prepend = true, deletable = false } = {}) {
  if (!shopProductGrid) return;
  const card = document.createElement("article");
  card.className = "wire-card product-card";
  if (id) card.dataset.productId = id;

  if (imageSrc) {
    const image = document.createElement("img");
    image.className = "product-image";
    image.src = imageSrc;
    image.alt = name;
    image.loading = "lazy";
    image.decoding = "async";
    card.append(image);
  }

  const tag = document.createElement("span");
  tag.className = "product-tag";
  tag.textContent = translateCopy(productTag);

  const title = document.createElement("h3");
  title.textContent = name;

  const copy = document.createElement("p");
  copy.textContent = description;

  const priceText = document.createElement("strong");
  priceText.textContent = price;

  const button = document.createElement("button");
  button.className = "button secondary full";
  button.type = "button";
  button.textContent = translateCopy("Join waitlist");
  button.addEventListener("click", () => saveShopInterest(name));

  card.append(tag, title, copy, priceText, button);
  if (deletable && isStaffUser()) {
    const deleteButton = document.createElement("button");
    deleteButton.className = "button danger full product-delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = translateCopy("Delete product");
    deleteButton.addEventListener("click", () => deleteStaffProduct(id));
    card.append(deleteButton);
  }
  if (prepend) shopProductGrid.prepend(card);
  else shopProductGrid.append(card);
}

function renderStaffShopProducts() {
  loadStaffShopProducts();
  loadDeletedShopProductIds();
  ensureStaffProductIds();
  document.querySelectorAll("[data-product-id]").forEach((card) => card.remove());
  defaultShopProducts
    .filter((product) => !deletedShopProductIds.includes(product.id))
    .forEach((product) => addShopProductCard(product, { prepend: false, deletable: true }));
  staffShopProducts.forEach((product) => addShopProductCard(product, { prepend: false, deletable: true }));
}

function deleteStaffProduct(productId) {
  if (!isStaffUser() || !productId) {
    if (staffProductStatus) staffProductStatus.textContent = translateCopy("Staff access required.");
    return;
  }
  const beforeCount = staffShopProducts.length;
  staffShopProducts = staffShopProducts.filter((product) => product.id !== productId);
  const defaultProductDeleted = defaultShopProducts.some((product) => product.id === productId);
  if (defaultProductDeleted && !deletedShopProductIds.includes(productId)) {
    deletedShopProductIds.push(productId);
    saveDeletedShopProductIds();
  }
  saveStaffShopProducts();
  document.querySelector(`[data-product-id="${CSS.escape(productId)}"]`)?.remove();
  if (staffProductStatus) {
    staffProductStatus.textContent = translateCopy(
      beforeCount === staffShopProducts.length && !defaultProductDeleted ? "Product not found." : "Product deleted.",
    );
  }
}

async function publishStaffProduct() {
  if (!isStaffUser()) {
    if (staffProductStatus) staffProductStatus.textContent = translateCopy("Staff access required.");
    return;
  }
  const name = staffProductName.value.trim();
  const price = staffProductPrice.value.trim();
  const description = staffProductDescription.value.trim();
  if (!name || !price || !description) {
    if (staffProductStatus) staffProductStatus.textContent = translateCopy("Add a product name, price, and description.");
    return;
  }

  try {
    const uploadedImage = await readStaffProductImage(staffProductImage.files?.[0]);
    const imageSrc = uploadedImage || staffProductImageUrl.value.trim();
    const product = {
      id: window.crypto?.randomUUID?.() || `product_${Date.now()}_${Math.random().toString(16).slice(2)}`,
      imageSrc,
      name,
      price,
      description,
    };
    staffShopProducts.unshift(product);
    saveStaffShopProducts();
    addShopProductCard(product, { deletable: true });
    staffProductImage.value = "";
    staffProductImageUrl.value = "";
    staffProductName.value = "";
    staffProductPrice.value = "";
    staffProductDescription.value = "";
    if (staffProductStatus) staffProductStatus.textContent = translateCopy("Product added.");
  } catch (error) {
    if (staffProductStatus) staffProductStatus.textContent = error.message;
  }
}

function setView(viewName) {
  if (viewName === "match") viewName = "dashboard";
  if (viewName === "review") viewName = "dashboard";
  if (viewName === "admin") viewName = "staff";
  if (viewName === "settings") viewName = "profile";
  if (viewName === "home" && currentUser) viewName = "overview";
  if (viewName === "staff" && !isStaffUser()) viewName = "dashboard";
  updateTutorialGateState();
  const returningToActiveMatch = viewName === "dashboard" && Boolean(currentMatchId || resumableMatch || resumableChallenge || resumableOpenSeek);
  if (isStudentTutorialRequired() && viewName !== "how-to-play" && !returningToActiveMatch) {
    viewName = "how-to-play";
  }
  if (viewName === "how-to-play") showTrainingModuleHome();
  setForumPolling(viewName === "forum");
  if (viewName === "home") {
    updateRouteForView(viewName);
    document.body.classList.add("show-landing");
    document.body.classList.remove("show-how-to-play");
    document.body.classList.remove("auth-entry-open");
    entryAuth.hidden = true;
    document.querySelector("#home").scrollIntoView({ behavior: "smooth", block: "start" });
    document.querySelectorAll(".side-link").forEach((link) => link.classList.remove("active"));
    closeMenu();
    closeProfileMenu();
    return;
  }

  document.body.classList.remove("show-landing");
  document.body.classList.toggle("show-how-to-play", viewName === "how-to-play");
  updateRouteForView(viewName);
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.dataset.view === viewName);
  });
  document.querySelectorAll(".side-link").forEach((link) => {
    link.classList.toggle("active", link.dataset.viewLink === viewName);
  });
  const primaryHomeLink = document.querySelector('.desktop-header-nav [data-view-link="overview"]');
  document.querySelectorAll(".desktop-header-nav [data-view-link]").forEach((link) => {
    const isOverviewDuplicate = viewName === "overview" && link !== primaryHomeLink;
    link.classList.toggle("active", link.dataset.viewLink === viewName && !isOverviewDuplicate);
  });
  if (viewName === "dashboard") {
    if (!boardInitialized) buildBoard();
    if (!reviewInitialized) renderReview(defaultReview);
    Promise.allSettled([refreshStats(), refreshLobby()]);
  }
  if (viewName === "how-to-play") refreshTrainingState();
  if (viewName === "forum") {
    refreshForumPosts();
    forumInitialized = true;
  }
  if (viewName === "chessboards" && !shopInitialized) {
    renderStaffShopProducts();
    shopInitialized = true;
  }
  if (viewName === "stt" && !reviewInitialized) renderReview(defaultReview);
  if (viewName === "staff") refreshAdmin();
  if (viewName === "overview") {
    renderDashboardSummary();
    refreshLeaderboard();
  }
  if (viewName === "profile") refreshProfile();
  document.querySelector("#dashboard").scrollIntoView({ behavior: "smooth", block: "start" });
  closeMenu();
  closeProfileMenu();
}

function openMenu() {
  sidebarMenu.hidden = false;
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", currentInterfaceLanguage() === "Korean" ? "메뉴 닫기" : "Close menu");
}

function closeMenu() {
  sidebarMenu.hidden = true;
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", currentInterfaceLanguage() === "Korean" ? "메뉴 열기" : "Open menu");
}

function closeProfileMenu() {
  headerProfileMenu.hidden = true;
  headerProfileButton.setAttribute("aria-expanded", "false");
}

function toggleProfileMenu() {
  const willOpen = headerProfileMenu.hidden;
  headerProfileMenu.hidden = !willOpen;
  headerProfileButton.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) {
    closeMenu();
  }
}

function toggleMenu() {
  if (sidebarMenu.hidden) openMenu();
  else closeMenu();
}

function revealAdminByCommand() {
  if (!isStaffUser()) return;
  setView("staff");
}

function piecesFromBoard(boardRows) {
  const next = {};
  boardRows.forEach((row) => {
      row.forEach((piece) => {
        if (!piece) return;
      next[piece.square] = pieceCodes[piece.color][piece.type];
    });
  });
  return next;
}

function squareToCoords(square) {
  return { file: "abcdefgh".indexOf(square[0]), rank: Number(square[1]) - 1 };
}

function coordsToSquare(file, rank) {
  if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
  return `${"abcdefgh"[file]}${rank + 1}`;
}

function addSlidingMoves(targets, file, rank, color, directions) {
  directions.forEach(([fileStep, rankStep]) => {
    let nextFile = file + fileStep;
    let nextRank = rank + rankStep;
    while (true) {
      const target = coordsToSquare(nextFile, nextRank);
      if (!target) return;
      const occupant = pieces[target];
      if (!occupant) {
        targets.push(target);
      } else {
        if (occupant[0] !== color) targets.push(target);
        return;
      }
      nextFile += fileStep;
      nextRank += rankStep;
    }
  });
}

function legalTargetsFor(square) {
  const piece = pieces[square];
  if (!piece) return [];
  const color = piece[0];
  const type = piece[1];
  const { file, rank } = squareToCoords(square);
  const targets = [];
  const pushIfOpenOrCapture = (target) => {
    if (!target) return;
    const occupant = pieces[target];
    if (!occupant || occupant[0] !== color) targets.push(target);
  };

  if (type === "p") {
    const direction = color === "w" ? 1 : -1;
    const startRank = color === "w" ? 1 : 6;
    const oneStep = coordsToSquare(file, rank + direction);
    if (oneStep && !pieces[oneStep]) {
      targets.push(oneStep);
      const twoStep = coordsToSquare(file, rank + direction * 2);
      if (rank === startRank && twoStep && !pieces[twoStep]) targets.push(twoStep);
    }
    [file - 1, file + 1].forEach((captureFile) => {
      const target = coordsToSquare(captureFile, rank + direction);
      if (target && pieces[target] && pieces[target][0] !== color) targets.push(target);
    });
  } else if (type === "n") {
    [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ].forEach(([fileStep, rankStep]) => pushIfOpenOrCapture(coordsToSquare(file + fileStep, rank + rankStep)));
  } else if (type === "b") {
    addSlidingMoves(targets, file, rank, color, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
  } else if (type === "r") {
    addSlidingMoves(targets, file, rank, color, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
  } else if (type === "q") {
    addSlidingMoves(targets, file, rank, color, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
  } else if (type === "k") {
    [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([fileStep, rankStep]) =>
      pushIfOpenOrCapture(coordsToSquare(file + fileStep, rank + rankStep)),
    );
  }

  return targets;
}

function buildBoard() {
  boardInitialized = true;
  board.innerHTML = "";
  board.dataset.orientation = boardOrientation;
  const files = boardOrientation === "black" ? ["h", "g", "f", "e", "d", "c", "b", "a"] : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = boardOrientation === "black" ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];

  ranks.forEach((rank, rankIndex) => {
    files.forEach((file, fileIndex) => {
      const id = `${file}${rank}`;
      const fileCoordinateIndex = "abcdefgh".indexOf(file);
      const square = document.createElement("button");
      square.type = "button";
      square.className = `square ${(rank + fileCoordinateIndex) % 2 === 1 ? "dark" : "light"}`;
      square.dataset.square = id;
      square.style.gridRow = String(rankIndex + 1);
      square.style.gridColumn = String(fileIndex + 1);
      square.setAttribute("aria-label", `${id} square`);
      square.addEventListener("click", () => handleSquareClick(id));

      if (selectedSquare === id) square.classList.add("selected");
      if (legalMoveTargets.includes(id)) {
        square.classList.add(pieces[id] ? "legal-capture" : "legal-move");
      }
      if (pieces[id]) {
        const piece = document.createElement("span");
        const pieceColor = pieces[id].startsWith("w") ? "white" : "black";
        const pieceEdition = pieceEditionForColor(pieceColor);
        piece.className = `piece ${pieceColor}-piece piece-${pieces[id][1]} piece-edition-${pieceEdition}`;
        piece.innerHTML = pieceSvg(pieces[id], pieceEdition);
        square.append(piece);
      }

      board.append(square);
    });
  });
}

function renderMatch(match) {
  if (!match) return;
  clearInterval(queuePollInterval);
  clearInterval(queueInterval);
  currentMatchId = match.id;
  rememberMatch(match);
  drawOfferFromOpponent = false;
  updateRoomLink(match.id);
  updateMatchRoute(match.id);
  const matchEnded = match.status === "ended" || match.game?.gameOver;
  const humanPlayerCount = (match.players || []).filter((player) => player.userId).length;
  const waitingForOpponent = !matchEnded && (match.status === "waiting" || (match.pairingType === "private-challenge" && humanPlayerCount < 2));
  if (!waitingForOpponent) {
    resumableChallenge = null;
    resumableOpenSeek = null;
    renderActiveMatchReturn();
  }
  setMatchState(matchEnded ? "ended" : waitingForOpponent ? "searching" : "playing");
  if (!matchEnded) timeoutNotifiedFor = null;
  boardOrientation = currentPlayerColor(match);
  currentMatchPlayers = match.players || [];
  if (match.game?.board) {
    pieces = piecesFromBoard(match.game.board);
    selectedSquare = null;
    buildBoard();
  }
  const opponent = match.players?.find((player) => player.userId !== currentUser?.id) || match.players?.[1];
  partnerName.textContent = opponent
    ? `${opponent.displayName} (${translateCopy(match.partnerLanguage)})`
    : `Mina K. (${translateCopy(match.partnerLanguage)})`;
  partnerId.textContent = shortPlayerId(opponent);
  boardPartnerName.textContent = opponent ? opponent.displayName : translateCopy("Partner waiting");
  boardPartnerId.textContent = shortPlayerId(opponent);
  if (selfPlayerName) selfPlayerName.textContent = currentUser?.displayName || translateCopy("You");
  voiceRing.textContent = initials(opponent?.displayName || "Mina K.");
  matchResult.textContent = match.result ? translateCopy(match.result) : translateCopy("In progress");
  const turn = match.game?.turn || "white";
  syncState.textContent = match.game?.gameOver
    ? currentInterfaceLanguage() === "Korean" ? "대국 종료" : "Game over"
    : currentInterfaceLanguage() === "Korean"
      ? `${turn === "white" ? "백" : "흑"} 차례`
      : `${turn} to move`;
  matchSourceBadge.textContent = matchSourceLabel(match);
  timeControlBadge.textContent = matchClockLabel(match);
  startMatchClock(waitingForOpponent ? { ...match, clocks: match.clocks ? { ...match.clocks, running: false } : null } : match);
  connectSocket(match.id);
  if (matchEnded) {
    endVoiceCall(false);
  } else if (waitingForOpponent) {
    startPassiveWaitingDisplay();
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean"
      ? "방이 준비되었습니다. 초대 코드나 방 링크를 친구에게 보내세요."
      : "Your room is ready. Send the invite code or room link to a friend.";
  } else if (!localVoiceStream) {
    setVoiceStatus(currentInterfaceLanguage() === "Korean" ? "매칭되었습니다. 마이크를 시작할 수 있습니다." : "Match paired. You can start your mic.");
  }
}

function localMove(from, to) {
  const piece = pieces[from];
  if (!piece) return;
  delete pieces[from];
  pieces[to] = piece;
  selectedSquare = null;
  legalMoveTargets = [];
  buildBoard();
  document.querySelector(`[data-square="${from}"]`)?.classList.add("moved");
  document.querySelector(`[data-square="${to}"]`)?.classList.add("recent");
  syncState.textContent =
    currentInterfaceLanguage() === "Korean" ? `${from}에서 ${to}로 움직였습니다` : `${from} to ${to} moved locally`;
}

async function makeMove(from, to) {
  if (!from || !to || from === to) {
    selectedSquare = null;
    legalMoveTargets = [];
    buildBoard();
    return;
  }

  if (!backendOnline || !currentMatchId) {
    localMove(from, to);
    return;
  }

  selectedSquare = null;
  legalMoveTargets = [];
  buildBoard();
  syncState.textContent = currentInterfaceLanguage() === "Korean" ? "수를 보내는 중..." : "Sending move...";

  try {
    const data = await api(`/api/matches/${currentMatchId}/move`, {
      method: "POST",
      body: { from, to, promotion: "q" },
    });
    renderMatch(data.match);
    showAchievementUnlocks(data.unlocked);
    syncState.textContent =
      currentInterfaceLanguage() === "Korean" ? `${data.move.san} 수가 반영되었습니다` : `${data.move.san} accepted`;
    refreshStats();
  } catch (error) {
    selectedSquare = null;
    legalMoveTargets = [];
    buildBoard();
    if (/match not found/i.test(error.message)) {
      const state = await refreshActivePlayState();
      if (state?.match && state.match.id !== currentMatchId) {
        renderMatch(state.match);
        syncState.textContent = currentInterfaceLanguage() === "Korean"
          ? "서버의 진행 중 대국으로 다시 연결했습니다."
          : "Reconnected to your active server match.";
        return;
      }
      clearCurrentMatch();
      setMatchState("idle");
      syncState.textContent = currentInterfaceLanguage() === "Korean"
        ? "종료되었거나 삭제된 방입니다. 새 대국을 시작하세요."
        : "This room ended or no longer exists. Start a new match.";
      return;
    }
    syncState.textContent = error.message;
  }
}

function handleSquareClick(square) {
  if (!selectedSquare) {
    if (!pieces[square]) return;
    selectedSquare = square;
    legalMoveTargets = legalTargetsFor(square);
    buildBoard();
    return;
  }
  if (pieces[square] && pieces[square][0] === pieces[selectedSquare]?.[0]) {
    selectedSquare = square;
    legalMoveTargets = legalTargetsFor(square);
    buildBoard();
    return;
  }
  if (!legalMoveTargets.includes(square)) {
    selectedSquare = null;
    legalMoveTargets = [];
    buildBoard();
    return;
  }
  makeMove(selectedSquare, square);
}

async function finishMatch(result, options = {}) {
  const review = options.review ?? true;
  setMatchState("ended");
  matchResult.textContent = translateCopy(result);
  syncState.textContent = options.statusText ? translateCopy(options.statusText) : currentInterfaceLanguage() === "Korean" ? "대국 종료" : "Match ended";
  if (generateReviewButton) generateReviewButton.textContent = translateCopy("Generate AI Review");
  window.clearInterval(clockInterval);
  if (backendOnline && currentMatchId) {
    try {
      const data = await api(`/api/matches/${currentMatchId}/end`, {
        method: "POST",
        body: { result },
      });
      renderMatch(data.match);
      await refreshStats();
    } catch (error) {
      syncState.textContent = error.message;
      return;
    }
  }
  bumpDailyQuest("games", 1);
  bumpDailyQuest("partners", 1);
  if (review) await requestReview(currentInterfaceLanguage() === "Korean" ? "완료된 대국" : "the completed match");
}

function offerDraw() {
  if (!currentMatchId) {
    matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "먼저 대국을 시작하세요" : "Start a game first";
    return;
  }
  if (drawOfferFromOpponent) {
    drawOfferFromOpponent = false;
    finishMatch("Draw agreed", { statusText: currentInterfaceLanguage() === "Korean" ? "무승부를 수락했습니다" : "Draw accepted" });
    return;
  }
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "무승부 제안함" : "Draw offered";
  syncState.textContent = currentInterfaceLanguage() === "Korean" ? "무승부를 제안했습니다. 상대 응답을 기다립니다." : "Draw offer sent. Waiting for opponent.";
  sendSocketMessage({ type: "draw:offer", matchId: currentMatchId, from: voiceClientId });
}

function handleDrawOffer(message) {
  if (!message.matchId || message.matchId !== currentMatchId || message.from === voiceClientId) return;
  drawOfferFromOpponent = true;
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "상대가 무승부를 제안했습니다" : "Draw offered by opponent";
  syncState.textContent = currentInterfaceLanguage() === "Korean" ? "수락하려면 1/2 버튼을 누르세요." : "Opponent offered a draw. Press 1/2 to accept.";
}

function startPassiveWaitingDisplay({ pollActive = true } = {}) {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  queuePollBusy = false;
  let seconds = 0;
  setMatchState("searching");
  queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "00:00 경과" : "00:00 elapsed";
  queueProgress.style.width = "38%";
  showQueueTip(0);
  queueInterval = setInterval(() => {
    seconds += 1;
    const elapsed = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    queueTime.textContent = currentInterfaceLanguage() === "Korean" ? `${elapsed} 경과` : `${elapsed} elapsed`;
    if (seconds % 7 === 0) showQueueTip(queueTipIndex + 1);
  }, 1000);
  if (!pollActive || !backendOnline || !currentUser) return;
  queuePollInterval = setInterval(async () => {
    if (queuePollBusy || document.hidden) return;
    queuePollBusy = true;
    try {
      const data = await api("/api/matches/active");
      const wasWaitingForPrivateRoom = Boolean(resumableChallenge);
      resumableChallenge = data.openChallenge || null;
      resumableOpenSeek = data.openSeek || null;
      if (data.match && data.match.status !== "waiting") {
        renderMatch(data.match);
        matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "상대가 입장했습니다" : "Your opponent joined";
      } else if (!data.match && !data.openChallenge && !data.openSeek && wasWaitingForPrivateRoom) {
        clearInterval(queueInterval);
        clearInterval(queuePollInterval);
        clearCurrentMatch();
        setMatchState("idle");
        privateChallengeCode.textContent = "----";
        const expiredMessage = currentInterfaceLanguage() === "Korean"
          ? "5분 동안 친구가 입장하지 않아 방이 만료되었습니다."
          : "The room expired because no friend joined within 5 minutes.";
        queuePrompt.textContent = expiredMessage;
        friendRoomStatus.textContent = expiredMessage;
      } else {
        resumableMatch = data.match || resumableMatch;
        renderActiveMatchReturn();
      }
    } catch {
      // WebSocket updates can still complete the waiting room.
    } finally {
      queuePollBusy = false;
    }
  }, 5000);
}

async function startQueue(label = currentInterfaceLanguage() === "Korean" ? "안전하게 대화할 수 있는 파트너를 찾는 중입니다." : "Searching for a safe partner with matching goals.", liveQueue = false, overrides = {}) {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  queuePollBusy = false;
  clearCurrentMatch();
  setMatchState("searching");
  let seconds = 0;
  cancelMatchSearchButton.hidden = false;
  queuePrompt.textContent = label;
  queueProgress.style.width = "38%";
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "검색 중" : "Searching";
  queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "00:00 경과" : "00:00 elapsed";
  showQueueTip(0);

  if (backendOnline) {
    try {
      const pool = selectedPool();
      const gameType = activeGameType();
      const endpoint = overrides.endpoint || (liveQueue ? "/api/matches/queue" : "/api/matches/start");
      const body = {
        mode: gameType.mode,
        poolId: pool.id,
        timeControl: pool.timeControl,
        rated: gameType.rated || pool.rated,
        partnerLanguage: partnerLanguage.value,
        goal: conversationGoal.value,
        ...(overrides.body || {}),
      };
      const data = await api(endpoint, {
        method: "POST",
        body,
      });

      if (data.waiting) {
        queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "조건이 맞는 플레이어를 기다리는 중입니다." : "Waiting for a matching player.";
        queuePollInterval = setInterval(async () => {
          if (currentMatchId) {
            clearInterval(queuePollInterval);
            return;
          }
          if (queuePollBusy || document.hidden) return;
          queuePollBusy = true;
          try {
            const next = await api(endpoint, { method: "POST", body });
            if (!next.waiting) {
              clearInterval(queuePollInterval);
              clearInterval(queueInterval);
              renderMatch(next.match);
              matchResult.textContent = overrides.readyText || (currentInterfaceLanguage() === "Korean" ? "상대를 찾았습니다" : "Opponent matched");
              await refreshStats();
              await refreshLobby();
            }
          } catch {
            // Keep the visible queue running if a poll misses.
          } finally {
            queuePollBusy = false;
          }
        }, 3000);
      } else {
        renderMatch(data.match);
        matchResult.textContent = overrides.readyText || (liveQueue ? currentInterfaceLanguage() === "Korean" ? "상대를 찾았습니다" : "Opponent matched" : currentInterfaceLanguage() === "Korean" ? "대국 준비 완료" : "Game ready");
      }
      await refreshStats();
      await refreshLobby();
    } catch (error) {
      queuePrompt.textContent = error.message;
      setMatchState("idle");
    }
  }

  queueInterval = setInterval(() => {
    seconds += 1;
    const elapsed = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    queueTime.textContent = currentInterfaceLanguage() === "Korean" ? `${elapsed} 경과` : `${elapsed} elapsed`;
    if (seconds % 7 === 0) showQueueTip(queueTipIndex + 1);
  }, 1000);
}

async function cancelMatchSearch() {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  if (backendOnline && currentUser) {
    try {
      await api("/api/matches/waiting", { method: "DELETE" });
    } catch {
      // The local waiting state still closes if the cancellation response is missed.
    }
  }
  clearCurrentMatch();
  setMatchState("idle");
  queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "방식 선택" : "Choose mode";
  queueProgress.style.width = "0%";
  queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "검색을 취소했습니다. 대국 방식을 다시 선택하세요." : "Search canceled. Choose how you want to play.";
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "취소됨" : "Canceled";
  if (queueTipPanel) queueTipPanel.hidden = true;
}

function resetToNewGame() {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  endVoiceCall(false);
  clearCurrentMatch();
  setMatchState("idle");
  queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "방식 선택" : "Choose mode";
  queueProgress.style.width = "0%";
  queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "원하는 대국 방식을 선택하세요." : "Choose how you want to play.";
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "진행 중인 대국이 없어요" : "No active match";
  if (location.protocol !== "file:") history.replaceState({}, "", "/");
}

function returnHomeAfterMatch() {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  endVoiceCall(false);
  clearCurrentMatch();
  setMatchState("idle");
  if (location.protocol !== "file:") history.replaceState({}, "", "/");
  setView("overview");
}

async function queueNewMatch() {
  resetToNewGame();
  setView("dashboard");
  await quickPairFromSelectedPool();
}

async function quickPairFromSelectedPool() {
  const pool = selectedPool();
  seekComposer.hidden = true;
  await startQueue(
    currentInterfaceLanguage() === "Korean"
      ? `퀵 매칭으로 ${pool.label} ${pool.name} 상대를 찾고 있습니다.`
      : `Quick pair is searching ${pool.label} ${pool.name}.`,
    false,
    {
    endpoint: "/api/matches/quick-pair",
    readyText: currentInterfaceLanguage() === "Korean" ? "퀵 매칭 완료" : "Quick pair matched",
    body: {
      pairingType: "quick-pool",
      poolId: pool.id,
      timeControl: pool.timeControl,
      rated: pool.rated,
    },
  });
}

async function acceptSeek(seek) {
  if (!backendOnline) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "실시간 게임에 참여하려면 로컬 서버를 시작하세요." : "Start the backend to join live games.";
    return;
  }

  try {
    queuePrompt.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${seek.displayName}님의 ${seek.timeControl} 게임에 참여하는 중입니다.`
        : `Joining ${seek.displayName}'s ${seek.timeControl} game.`;
    const data = await api(`/api/matches/seeks/${seek.id}/accept`, { method: "POST" });
    renderMatch(data.match);
    matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "게임에 참여했습니다" : "Game joined";
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

async function createOpenSeek() {
  const gameType = activeGameType();
  if (!backendOnline) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "실시간 게임을 만들려면 서버를 시작하고 로그인하세요." : "Start the backend and sign in to create a live game.";
    renderLobby({ openSeeks: [], openSeeksTotal: 0, queuedPlayers: 0 });
    return;
  }

  try {
    const data = await api("/api/matches/seeks", {
      method: "POST",
      body: {
        timeControl: seekTimeControl.value,
        rated: gameType.rated,
        partnerLanguage: partnerLanguage.value,
        goal: conversationGoal.value,
      },
    });
    if (data.match) {
      renderMatch(data.match);
      matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "설정에 맞는 상대를 찾았습니다" : "Matched by settings";
      await refreshStats();
      await refreshLobby();
      return;
    }
    resumableOpenSeek = data.seek;
    renderActiveMatchReturn();
    startPassiveWaitingDisplay();
    queuePrompt.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `게임을 만들었습니다. ${data.seek.timeControl}, ${translateCopy(data.seek.partnerLanguage)}, ${translateCopy(data.seek.goal)} 조건의 상대를 기다립니다.`
        : `Game created. Waiting for ${data.seek.timeControl}, ${data.seek.partnerLanguage}, ${data.seek.goal}.`;
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

async function createPrivateChallenge() {
  const pool = selectedPool();
  if (!backendOnline) {
    privateChallengeCode.textContent = "LOCAL";
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "비공개 방 미리보기를 만들었습니다. 공유 코드는 서버를 시작하면 사용할 수 있습니다." : "Private challenge preview created. Start the backend for shareable codes.";
    return;
  }

  try {
    const data = await api("/api/challenges", {
      method: "POST",
      body: {
        timeControl: pool.timeControl,
        partnerLanguage: partnerLanguage.value,
        goal: conversationGoal.value,
      },
    });
    resumableChallenge = data.challenge;
    privateChallengeCode.textContent = data.challenge.code;
    if (data.match) renderMatch(data.match);
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "초대 코드를 만들었습니다. 친구에게 코드를 공유하세요." : "Private invite created. Share the code with a friend.";
    friendRoomStatus.textContent = currentInterfaceLanguage() === "Korean"
      ? "방이 생성되었습니다. 코드나 아래 링크를 친구에게 보내세요."
      : "Room created. Send the code or link below to your friend.";
    renderActiveMatchReturn();
  } catch (error) {
    queuePrompt.textContent = error.message;
    friendRoomStatus.textContent = error.message;
  }
}

async function joinPrivateChallenge() {
  const code = privateChallengeInput.value.trim().toUpperCase();
  if (!code) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "먼저 비공개 방 코드를 입력하세요." : "Enter a private challenge code first.";
    friendRoomStatus.textContent = queuePrompt.textContent;
    privateChallengeInput.focus();
    return;
  }
  const ownChallengeCode = String(resumableChallenge?.code || privateChallengeCode.textContent || "").trim().toUpperCase();
  if (ownChallengeCode && ownChallengeCode !== "----" && code === ownChallengeCode) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean"
      ? "이미 이 방에 참여 중입니다. 만든 방으로 돌아가 친구를 기다리세요."
      : "You are already in this room. Return to it and wait for your friend.";
    friendRoomStatus.textContent = queuePrompt.textContent;
    privateChallengeInput.select();
    return;
  }
  if (!backendOnline) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "비공개 방에 참여하려면 서버를 시작하세요." : "Start the backend to join private challenges.";
    friendRoomStatus.textContent = queuePrompt.textContent;
    return;
  }

  try {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? `${code} 방에 참여하는 중입니다.` : `Joining private challenge ${code}.`;
    const data = await api(`/api/challenges/${encodeURIComponent(code)}/accept`, { method: "POST" });
    privateChallengeInput.value = "";
    renderMatch(data.match);
    friendRoomDialog.close();
    matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "비공개 방에 참여했습니다" : "Private challenge joined";
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
    friendRoomStatus.textContent = error.message;
  }
}

function updateTemperature(value) {
  const label = mannerBadgeText(value);
  mannerTemp.textContent = label;
  if (dashboardTemp) dashboardTemp.textContent = label;
  if (profileTemp) profileTemp.textContent = label;
}

function mannerBadgeText(value) {
  const score = Number(value);
  let label = "🌱 친절한 대화 상대";
  if (Number.isFinite(score) && score >= 45) label = "🌿 믿음직한 대화 상대";
  if (Number.isFinite(score) && score < 35) label = "🌱 새싹 대화 연습 중";
  if (Number.isFinite(score) && score < 25) label = "운영자 확인 필요";
  if (currentInterfaceLanguage() !== "Korean") {
    if (label.includes("믿음직")) label = "🌿 Trusted conversation partner";
    else if (label.includes("새싹")) label = "🌱 New conversation sprout";
    else if (label.includes("운영자")) label = "Needs a staff check";
    else label = "🌱 Friendly conversation partner";
  }
  return label;
}

function initials(name = "CL") {
  return name
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "CL";
}

function renderAvatar(target, user, fallback = "GP") {
  if (!target) return;
  const avatarUrl = user?.avatarUrl || "";
  target.innerHTML = "";
  if (avatarUrl) {
    const image = document.createElement("img");
    image.src = avatarUrl;
    image.alt = `${user?.displayName || "Player"} avatar`;
    image.decoding = "async";
    target.append(image);
  } else {
    target.textContent = initials(user?.displayName || fallback);
  }
}

function currentLeagueCode() {
  return String(currentUser?.leagueCode || "").trim().toUpperCase();
}

function renderLeagueAction() {
  const korean = currentInterfaceLanguage() === "Korean";
  const popoverOpen = leagueActionMode === "join" || leagueActionMode === "create";
  if (leagueActionPopover) leagueActionPopover.hidden = !popoverOpen;
  leagueActionButtons.forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-expanded", String(button.dataset.leagueAction === leagueActionMode));
  });
  leagueActionPanels.forEach((panel) => {
    const active = panel.dataset.leaguePanel === leagueActionMode;
    panel.hidden = !active;
    const title = panel.querySelector(".league-action-title");
    if (title) {
      title.textContent = panel.dataset.leaguePanel === "join"
        ? korean ? "리그 참여" : "Join a league"
        : korean ? "리그 만들기" : "Create a league";
    }
  });
  if (createdLeagueCode) {
    const code = currentLeagueCode();
    createdLeagueCode.textContent = code || (korean ? "코드 생성 전" : "No code yet");
  }
}

function setLeagueActionMode(mode) {
  const nextMode = mode === "join" || mode === "create" ? mode : null;
  leagueActionMode = nextMode === leagueActionMode ? null : nextMode;
  renderLeagueAction();
  if (leagueActionMode === "join") window.requestAnimationFrame(() => leagueCodeInput?.focus());
  if (leagueActionMode === "create") window.requestAnimationFrame(() => createLeagueButton?.focus());
}



async function joinLeague() {
  if (!currentUser) {
    if (leagueStatus) leagueStatus.textContent = "리그에 참여하려면 먼저 로그인하세요.";
    openAccountEntry("signup");
    return;
  }
  const code = leagueCodeInput?.value.trim().toUpperCase();
  if (!code) {
    if (leagueStatus) leagueStatus.textContent = "선생님에게 받은 리그 코드를 입력하세요.";
    return;
  }
  try {
    if (leagueStatus) leagueStatus.textContent = "리그에 참여하는 중...";
    const data = await api("/api/leagues/join", { method: "POST", body: { code } });
    currentUser = data.user;
    showAchievementUnlocks(data.unlocked);
    renderDashboardSummary();
    renderLeaderboard(data.league);
    renderAuthState();
    setLeagueActionMode(null);
    if (leagueStatus) leagueStatus.textContent = `참여 완료: ${data.league.code}`;
  } catch (error) {
    if (leagueStatus) leagueStatus.textContent = error.message;
  }
}

async function createLeague() {
  if (!currentUser) {
    if (leagueStatus) leagueStatus.textContent = "리그 코드를 만들려면 먼저 로그인하세요.";
    openAccountEntry("signup");
    return;
  }
  try {
    if (leagueStatus) leagueStatus.textContent = "리그 코드를 생성하는 중...";
    const data = await api("/api/leagues/create", { method: "POST", body: { name: "EasyMate Class League" } });
    currentUser = data.user;
    showAchievementUnlocks(data.unlocked);
    if (leagueCodeInput) leagueCodeInput.value = data.league.code;
    renderDashboardSummary();
    renderLeaderboard(data.league);
    renderAuthState();
    leagueActionMode = "create";
    renderLeagueAction();
    if (leagueStatus) leagueStatus.textContent = `새 리그 코드: ${data.league.code}`;
  } catch (error) {
    if (leagueStatus) leagueStatus.textContent = error.message;
  }
}

function setHomeInsightTab(tab = "leaderboard") {
  const showQuests = tab === "quests";
  homeLeaderboardPanel?.toggleAttribute("hidden", showQuests);
  homeQuestPanel?.toggleAttribute("hidden", !showQuests);
  homeLeaderboardTab?.classList.toggle("active", !showQuests);
  homeQuestTab?.classList.toggle("active", showQuests);
  homeLeaderboardTab?.setAttribute("aria-selected", showQuests ? "false" : "true");
  homeQuestTab?.setAttribute("aria-selected", showQuests ? "true" : "false");
}

function setHomeThemePopover(open) {
  if (!homeThemePopover || !homeThemeToggle) return;
  homeThemePopover.hidden = !open;
  homeThemeToggle.setAttribute("aria-expanded", open ? "true" : "false");
}

function renderDashboardSummary() {
  const user = currentUser || {};
  if (welcomeName) welcomeName.textContent = user.displayName || "Player";
  renderAvatar(dashboardHeroAvatar, user, "GP");
  if (dashboardStreak) dashboardStreak.textContent = String(Number(user.streak || 0));
  if (dashboardEasyElo) dashboardEasyElo.textContent = String(Number(user.easyElo || 1000));
  if (leagueCodeInput && user.leagueCode) leagueCodeInput.value = user.leagueCode;
  if (leagueStatus) {
    leagueStatus.textContent = user.leagueCode
      ? currentInterfaceLanguage() === "Korean"
        ? `참여 중인 리그 코드: ${user.leagueCode}`
        : `Current league code: ${user.leagueCode}`
      : currentInterfaceLanguage() === "Korean"
        ? "아직 참여한 리그가 없습니다."
        : "You have not joined a league yet.";
  }
  renderLeagueAction();
  renderTodayQuests();
  renderHomeForumPreview();
  renderHomeTrainingProgress();
  syncLocalizedControls();
}

function renderLeaderboard(data = {}) {
  if (!leaderboardList) return;
  leaderboardList.innerHTML = "";
  const members = data.members || [];
  if (!members.length) {
    const empty = document.createElement("p");
    empty.className = "leaderboard-empty";
    empty.textContent =
      data.emptyReason === "no-league"
        ? currentInterfaceLanguage() === "Korean"
          ? "아직 내 리그가 없습니다. 참가 코드를 입력하거나 새 리그 코드를 생성하세요."
          : "No league yet. Enter a code or create a new league."
        : currentInterfaceLanguage() === "Korean"
          ? "아직 리더보드에 표시할 플레이어가 없습니다."
          : "No players to show on this leaderboard yet.";
    leaderboardList.append(empty);
    return;
  }
  const pageCount = Math.max(1, Math.ceil(members.length / leaderboardPageSize));
  leaderboardPage = Math.min(leaderboardPage, pageCount - 1);
  const startIndex = leaderboardPage * leaderboardPageSize;
  const pageMembers = members.slice(startIndex, startIndex + leaderboardPageSize);

  const tableHeader = document.createElement("div");
  tableHeader.className = "leaderboard-table-header";
  tableHeader.setAttribute("aria-hidden", "true");
  tableHeader.innerHTML = `
    <span>${currentInterfaceLanguage() === "Korean" ? "순위" : "Rank"}</span>
    <span>${currentInterfaceLanguage() === "Korean" ? "이름" : "Name"}</span>
    <span>Easy Elo</span>
    <span>${currentInterfaceLanguage() === "Korean" ? "스트릭" : "Streak"}</span>`;
  leaderboardList.append(tableHeader);

  pageMembers.forEach((member) => {
    const row = document.createElement("article");
    const isCurrentUser = Boolean(currentUser && member.id === currentUser.id);
    row.className = `leaderboard-row${isCurrentUser ? " is-current" : ""}`;
    const rank = document.createElement("strong");
    rank.textContent = String(member.rank);
    const name = document.createElement("b");
    const displayName = leaderboardScope === "all" ? maskLeaderboardName(member.displayName) : member.displayName || "Player";
    name.textContent = isCurrentUser && currentInterfaceLanguage() === "Korean" ? `${displayName} (나)` : displayName;
    const elo = document.createElement("span");
    elo.className = "leaderboard-elo";
    elo.textContent = Number(member.easyElo || 1000).toLocaleString();
    const streak = document.createElement("span");
    streak.className = "leaderboard-streak";
    streak.textContent = String(Number(member.streak || 0));
    row.append(rank, name, elo, streak);
    leaderboardList.append(row);
  });

  if (pageCount > 1) {
    const pagination = document.createElement("nav");
    pagination.className = "leaderboard-pagination";
    pagination.setAttribute("aria-label", currentInterfaceLanguage() === "Korean" ? "리더보드 페이지" : "Leaderboard pages");

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "leaderboard-page-button";
    previous.textContent = "<";
    previous.disabled = leaderboardPage === 0;
    previous.setAttribute("aria-label", currentInterfaceLanguage() === "Korean" ? "이전 순위" : "Previous rankings");
    previous.addEventListener("click", () => {
      leaderboardPage -= 1;
      renderLeaderboard(data);
    });

    const pageLabel = document.createElement("span");
    pageLabel.textContent = `${leaderboardPage + 1} / ${pageCount}`;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "leaderboard-page-button";
    next.textContent = ">";
    next.disabled = leaderboardPage >= pageCount - 1;
    next.setAttribute("aria-label", currentInterfaceLanguage() === "Korean" ? "다음 순위" : "Next rankings");
    next.addEventListener("click", () => {
      leaderboardPage += 1;
      renderLeaderboard(data);
    });

    pagination.append(previous, pageLabel, next);
    leaderboardList.append(pagination);
  }
}

function maskLeaderboardName(value) {
  const characters = Array.from(String(value || "Player").trim());
  return `${characters.slice(0, 3).join("")}****`;
}

async function refreshLeaderboard() {
  if (!leaderboardList) return;
  syncLocalizedControls();
  if (!backendOnline) {
    renderLeaderboard({ members: [] });
    return;
  }
  try {
    const query = new URLSearchParams({ period: leaderboardPeriod, scope: leaderboardScope });
    if (leaderboardScope === "mine" && currentUser?.leagueCode) query.set("code", currentUser.leagueCode);
    const data = await api(`/api/leagues/leaderboard?${query.toString()}`);
    renderLeaderboard(data);
    if (leagueStatus) {
      leagueStatus.textContent = data.code
        ? currentInterfaceLanguage() === "Korean"
          ? `참여 중인 리그 코드: ${data.code}`
          : `Current league code: ${data.code}`
        : currentInterfaceLanguage() === "Korean"
          ? "아직 참여한 리그가 없습니다."
          : "You have not joined a league yet.";
    }
    renderLeagueAction();
  } catch (error) {
    if (leagueStatus) leagueStatus.textContent = error.message;
  }
}

function renderProfile(profile) {
  if (!profile?.user) return;
  const user = profile.user;
  renderAvatar(profileAvatar, user, "CL");
  profileName.textContent = user.displayName;
  profileEmail.textContent = user.email;
  if (profileLanguageText) {
    profileLanguageText.textContent = user.languagePair
      ? translateCopy(user.languagePair)
      : currentInterfaceLanguage() === "Korean" ? "언어 조합이 아직 없습니다." : "Language pair not set";
  }
  profileDisplayName.value = user.displayName || "";
  if (profileLanguagePair) profileLanguagePair.value = user.languagePair || "English to Korean";
  if (profilePieceEdition) profilePieceEdition.value = normalizePieceEdition(user.pieceEdition);
  updateHeaderPieceEditionToggle(user.pieceEdition);
  if (profileImage) profileImage.value = user.avatarUrl || "";
  if (profileBio) profileBio.value = user.bio || "";
  if (profileBioText) profileBioText.textContent = user.bio || "Easy Elo를 올리며 훈련 중입니다.";
  if (profileStreak) profileStreak.textContent = String(Number(user.streak || 0));
  if (profileEasyElo) profileEasyElo.textContent = String(Number(user.easyElo || 1000));
  if (profileSideElo) profileSideElo.textContent = String(Number(user.easyElo || 1000));
  if (profileUserId) profileUserId.textContent = user.id || "user";
  if (profileLessonsCount) profileLessonsCount.textContent = String(profile.stats?.matches || 0);
  const earnedBadges = Array.isArray(profile.badges) ? profile.badges : [];
  if (profileQuestionsCount) profileQuestionsCount.textContent = String(earnedBadges.length);
  if (profileTestsCount) profileTestsCount.textContent = String(profile.stats?.completedMatches || 0);
  updateTemperature(Number(user.mannerTemperature ?? currentManner));
  renderDashboardSummary();

  badgeList.replaceChildren();
  if (earnedBadges.length) {
    const item = document.createElement("span");
    const categories = new Set(earnedBadges.map((badge) => badge.category).filter(Boolean));
    item.textContent = currentInterfaceLanguage() === "Korean"
      ? `${earnedBadges.length}개 획득 · ${categories.size}개 분야`
      : `${earnedBadges.length} earned · ${categories.size} categories`;
    badgeList.append(item);
  }

  badgeDetails.replaceChildren();
  if (!earnedBadges.length) {
    const empty = document.createElement("p");
    empty.className = "profile-badge-empty";
    empty.textContent = currentInterfaceLanguage() === "Korean"
      ? "아직 받은 배지가 없습니다. 훈련장, 퍼즐, 대국에서 첫 배지를 획득해 보세요."
      : "No badges yet. Earn your first one in training, puzzles, or a match.";
    badgeDetails.append(empty);
  }
  earnedBadges.forEach((badge) => {
    const item = document.createElement("article");
    item.className = "profile-badge-item";

    const artwork = document.createElement("img");
    artwork.className = "profile-badge-artwork";
    artwork.src = badge.imageUrl || "/assets/badges/canva-first-step.png";
    artwork.alt = `${badge.name || "EasyMate"} 배지`;
    artwork.loading = "lazy";
    artwork.decoding = "async";
    artwork.loading = "lazy";
    artwork.addEventListener("error", () => artwork.remove(), { once: true });

    const copy = document.createElement("div");
    copy.className = "profile-badge-copy";
    if (badge.category) {
      const category = document.createElement("span");
      category.className = "profile-badge-category";
      category.textContent = badge.category;
      copy.append(category);
    }
    const name = document.createElement("strong");
    name.textContent = badge.name || "Badge";
    const detail = document.createElement("p");
    detail.textContent = badge.detail || "";
    copy.append(name, detail);
    if (badge.earnedAt) {
      const earnedAt = new Date(badge.earnedAt);
      if (!Number.isNaN(earnedAt.getTime())) {
        const time = document.createElement("time");
        time.dateTime = badge.earnedAt;
        time.textContent = new Intl.DateTimeFormat(
          currentInterfaceLanguage() === "Korean" ? "ko-KR" : "en-US",
          { year: "numeric", month: "short", day: "numeric" },
        ).format(earnedAt);
        copy.append(time);
      }
    }
    item.append(artwork, copy);
    badgeDetails.append(item);
  });

  if (cultureGuideList) cultureGuideList.innerHTML = "";
  if (cultureGuideList && !profile.cultureGuide.length) {
    const empty = document.createElement("p");
    empty.textContent = currentInterfaceLanguage() === "Korean" ? "아직 저장된 문화 노트가 없어요. 대국 뒤 인상 깊은 표현을 남겨보세요." : "No culture notes saved yet.";
    cultureGuideList?.append(empty);
  } else if (cultureGuideList) {
    profile.cultureGuide.forEach((entry) => {
      const item = document.createElement("p");
      const source = document.createElement("strong");
      source.textContent = translateCopy(entry.source || "Culture note");
      item.append(source, document.createTextNode(` ${entry.note || ""}`));
      cultureGuideList?.append(item);
    });
  }

  profileStatus.textContent =
    currentInterfaceLanguage() === "Korean"
      ? `대국 ${profile.stats.matches}개, 복습 ${profile.stats.reviews}개, 문화 노트 ${profile.stats.cultureNotes}개`
      : `${profile.stats.matches} match(es), ${profile.stats.reviews} review(s), ${profile.stats.cultureNotes} culture note(s).`;
  profileStatus.textContent = "프로필 기록을 불러왔습니다.";
}

function clearProfile() {
  renderAvatar(profileAvatar, null, "CL");
  profileName.textContent = "ChessLearner";
  profileEmail.textContent = "player@example.com";
  if (profileLanguageText) {
    profileLanguageText.textContent =
      currentInterfaceLanguage() === "Korean" ? "언어 설정을 불러오려면 로그인하세요." : "Sign in to load language settings.";
  }
  profileDisplayName.value = "";
  if (profileLanguagePair) profileLanguagePair.value = "English to Korean";
  if (profilePieceEdition) profilePieceEdition.value = "cheoinseong";
  if (profileImage) profileImage.value = "";
  if (profileBio) profileBio.value = "";
  if (profileBioText) profileBioText.textContent = "Easy Elo를 올리며 훈련 중입니다.";
  if (profileStreak) profileStreak.textContent = "0";
  if (profileEasyElo) profileEasyElo.textContent = "1000";
  if (profileSideElo) profileSideElo.textContent = "1000";
  if (profileUserId) profileUserId.textContent = "user";
  if (profileLessonsCount) profileLessonsCount.textContent = "0";
  if (profileQuestionsCount) profileQuestionsCount.textContent = "0";
  if (profileTestsCount) profileTestsCount.textContent = "0";
  badgeList.innerHTML = "";
  badgeDetails.innerHTML = "";
  if (cultureGuideList) cultureGuideList.innerHTML = "";
  profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "저장된 프로필을 불러오려면 로그인하세요." : "Sign in to load your saved profile.";
}

async function refreshProfile() {
  if (!backendOnline) {
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "프로필 기능을 쓰려면 로컬 서버를 시작하세요." : "Start the backend to use profile tools.";
    return;
  }
  if (!currentUser) {
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "저장된 프로필을 불러오려면 로그인하세요." : "Sign in to load your saved profile.";
    return;
  }

  profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "프로필을 불러오는 중..." : "Loading profile...";
  try {
    const profile = await api("/api/profile");
    currentUser = profile.user;
    renderProfile(profile);
    showAchievementUnlocks(profile.unlocked);
    renderAuthState();
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

async function saveProfile() {
  try {
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "프로필을 저장하는 중..." : "Saving profile...";
    const profile = await api("/api/profile", {
      method: "PUT",
      body: {
        displayName: profileDisplayName.value,
        displayNameSource: "user",
        languagePair: profileLanguagePair?.value || currentUser?.languagePair || authLanguagePair?.value || "English to Korean",
        pieceEdition: profilePieceEdition?.value,
        avatarUrl: profileImage?.value || "",
        bio: profileBio?.value || "",
      },
    });
    currentUser = profile.user;
    renderProfile(profile);
    authStatus.textContent =
      currentInterfaceLanguage() === "Korean" ? `${currentUser.displayName}님으로 로그인됨` : `Signed in as ${currentUser.displayName}`;
    updateHeaderPieceEditionToggle(currentUser.pieceEdition);
    renderAuthState();
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

async function submitPeerFeedback() {
  if (!peerFeedbackType || !peerFeedbackNote) return;
  try {
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "피드백을 보내는 중..." : "Submitting feedback...";
    const data = await api("/api/profile/feedback", {
      method: "POST",
      body: {
        kind: peerFeedbackType.value,
        note: peerFeedbackNote.value,
        matchId: currentMatchId,
      },
    });
    peerFeedbackNote.value = "";
    if (data.profile) renderProfile(data.profile);
    profileStatus.textContent = currentMatchId
      ? currentInterfaceLanguage() === "Korean"
        ? `${data.target?.displayName || "대국 파트너"}에게 피드백을 저장했습니다.`
        : `Feedback saved for ${data.target?.displayName || "your match partner"}.`
      : currentInterfaceLanguage() === "Korean"
        ? "프로필 기록에 피드백을 저장했습니다."
        : "Feedback saved to your profile history.";
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

async function saveCultureGuide() {
  if (!cultureGuideInput) return;
  try {
    const note = cultureGuideInput.value.trim();
    if (!note) {
      profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "문화 노트를 먼저 입력하세요." : "Enter a culture note first.";
      return;
    }
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "문화 노트를 저장하는 중..." : "Saving culture note...";
    const profile = await api("/api/profile/culture-guide", {
      method: "POST",
      body: { note, source: "Culture Guide" },
    });
    cultureGuideInput.value = "";
    renderProfile(profile);
  } catch (error) {
    profileStatus.textContent = error.message;
  }
}

function browserSpeechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function sttLanguage() {
  return sttSourceLanguage.value || navigator.language || "en-US";
}

function sttSpeakerName() {
  return currentUser?.displayName || "You";
}

function originalSubtitleContainers() {
  return [originalSpeech, matchOriginalSpeech].filter(Boolean);
}

function translatedSubtitleContainers() {
  return [translatedSpeech, matchTranslatedSpeech].filter(Boolean);
}

function setSttButtonText(text) {
  activateStt.textContent = text;
  if (matchActivateStt) matchActivateStt.textContent = text;
}

function setSttStatus(active, detail = "") {
  sttListening = active;
  const listeningText = currentInterfaceLanguage() === "Korean" ? "자막 듣는 중" : "Captions listening";
  const pausedText = currentInterfaceLanguage() === "Korean" ? "자막 대기 중" : "Captions paused";
  const activeDetail = currentInterfaceLanguage() === "Korean" ? "듣는 중" : "Listening";
  const pausedDetail = currentInterfaceLanguage() === "Korean" ? "대기 중" : "Paused";
  sttPill.textContent = active ? listeningText : pausedText;
  if (sttStatusText) sttStatusText.textContent = detail || (active ? activeDetail : pausedDetail);
  if (matchSttStatus) matchSttStatus.textContent = detail || (active ? activeDetail : pausedDetail);
  setSttButtonText(active ? translateCopy("Stop captions") : translateCopy("Start captions"));
}

function updateSessionDuration() {
  if (!sttSessionStart) {
    sessionDuration.textContent = translateCopy("Not started");
    if (matchSessionDuration) matchSessionDuration.textContent = translateCopy("Not started");
    return;
  }
  const elapsed = Math.floor((Date.now() - sttSessionStart) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const text = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  sessionDuration.textContent = text;
  if (matchSessionDuration) matchSessionDuration.textContent = text;
}

function startSessionTimer() {
  if (!sttSessionStart) sttSessionStart = Date.now();
  updateSessionDuration();
  window.clearInterval(sttSessionTimer);
  sttSessionTimer = window.setInterval(updateSessionDuration, 1000);
}

function stopSessionTimer() {
  window.clearInterval(sttSessionTimer);
  sttSessionTimer = null;
}

function subtitleTranslation(text) {
  const target = subtitleTargetLanguage.value || "Korean";
  return currentInterfaceLanguage() === "Korean" ? `번역 준비 중(${translateCopy(target)}): ${text}` : `Translation pending (${target}): ${text}`;
}

async function translateSubtitleText(text, options = {}) {
  if (!backendOnline || !currentUser) {
    return { text: subtitleTranslation(text), provider: "fallback" };
  }
  try {
    const data = await api("/api/translate", {
      method: "POST",
      body: {
        text,
        sourceLanguage: options.sourceLanguage || sttSourceLanguage.value || navigator.language || "en-US",
        targetLanguage: subtitleTargetLanguage.value,
      },
    });
    return {
      text: data.translation?.text || subtitleTranslation(text),
      provider: data.translation?.provider || "backend",
    };
  } catch (error) {
    return {
      text: currentInterfaceLanguage() === "Korean" ? `번역을 불러올 수 없어요: ${text}` : `Translation unavailable: ${text}`,
      provider: "fallback",
      error: error.message,
    };
  }
}

function subtitlePlaceholder(text) {
  const line = document.createElement("p");
  line.className = "subtitle-placeholder";
  line.textContent = text;
  return line;
}

function resetSubtitlePlaceholders() {
  originalSubtitleContainers().forEach((container) => {
    container.replaceChildren(
      subtitlePlaceholder(currentInterfaceLanguage() === "Korean" ? "자막을 시작하고 마이크 권한을 허용한 뒤 말해보세요." : "Start captions, allow microphone access, then speak."),
    );
  });
  translatedSubtitleContainers().forEach((container) => {
    container.replaceChildren(
      subtitlePlaceholder(currentInterfaceLanguage() === "Korean" ? "음성이 먼저 자막으로 잡히면 번역이 여기에 표시됩니다." : "Live captions capture speech first. Translation appears here."),
    );
  });
  if (wordsRecognized) wordsRecognized.textContent = translateCopy("No words yet");
  if (matchWordsRecognized) matchWordsRecognized.textContent = translateCopy("No words yet");
}

function clearSubtitlePlaceholders() {
  [...originalSubtitleContainers(), ...translatedSubtitleContainers()].forEach((container) => {
    container.querySelectorAll(".subtitle-placeholder").forEach((line) => line.remove());
  });
}

function appendSubtitleLine(container, speaker, text, className = "") {
  clearSubtitlePlaceholders();
  const line = document.createElement("p");
  if (className) line.className = className;
  const name = document.createElement("strong");
  name.textContent = `${speaker}:`;
  line.append(name, document.createTextNode(` ${text}`));
  container.append(line);
  container.scrollTop = container.scrollHeight;
  return line;
}

function appendSubtitleLines(containers, speaker, text, className = "") {
  return containers.map((container) => appendSubtitleLine(container, speaker, text, className));
}

async function persistSubtitleLine(text, translation, speaker = sttSpeakerName()) {
  if (!backendOnline || !currentMatchId) return;
  try {
    await api(`/api/matches/${currentMatchId}/transcript`, {
      method: "POST",
      body: {
        speaker,
        text,
        translation,
        kind: "speech",
      },
    });
  } catch {
    // Keep live captions running even when transcript persistence is unavailable.
  }
}

function appendRecognizedSpeech(text) {
  const phrase = String(text || "").trim();
  if (!phrase) return;
  const speaker = sttSpeakerName();

  appendFinalSubtitle({ speaker, text: phrase, sourceLanguage: sttLanguage(), persist: true });
  sendSubtitleSignal({ text: phrase });
}

function appendFinalSubtitle({ speaker, text, sourceLanguage, persist = false }) {
  const phrase = String(text || "").trim();
  if (!phrase) return;

  appendSubtitleLines(originalSubtitleContainers(), speaker, phrase);
  const translatedLines = appendSubtitleLines(
    translatedSubtitleContainers(),
    speaker,
    currentInterfaceLanguage() === "Korean" ? "번역 중..." : "Translating...",
  );
  const currentWordCount = Number(wordsRecognized.textContent);
  const nextWords = (Number.isFinite(currentWordCount) ? currentWordCount : 0) + phrase.split(/\s+/).filter(Boolean).length;
  wordsRecognized.textContent = String(nextWords);
  if (matchWordsRecognized) matchWordsRecognized.textContent = String(nextWords);

  const latency = 80 + Math.floor(Math.random() * 80);
  if (latencyText) latencyText.textContent = `${latency} ms`;
  if (dashboardLatency) dashboardLatency.textContent = `${latency} ms`;

  translateSubtitleText(phrase, { sourceLanguage }).then((result) => {
    translatedLines.forEach((line) => {
      line.replaceChildren();
      const name = document.createElement("strong");
      name.textContent = `${speaker}:`;
      line.append(name, document.createTextNode(` ${result.text}`));
    });
    if (persist) persistSubtitleLine(phrase, result.text, speaker);
    if (["nvidia", "mymemory", "backend"].includes(result.provider)) {
      const translated = currentInterfaceLanguage() === "Korean" ? "번역됨" : "Translated";
      if (sttStatusText) sttStatusText.textContent = translated;
      if (matchSttStatus) matchSttStatus.textContent = translated;
    }
  });
}

function updateInterimSpeech(text) {
  const phrase = String(text || "").trim();
  if (!phrase) {
    removeInterimSpeech();
    return;
  }
  if (!sttInterimLines.length) {
    sttInterimLines = appendSubtitleLines(originalSubtitleContainers(), sttSpeakerName(), phrase, "interim");
    return;
  }
  sttInterimLines.forEach((line) => {
    line.replaceChildren();
    const name = document.createElement("strong");
    name.textContent = `${sttSpeakerName()}:`;
    line.append(name, document.createTextNode(` ${phrase}`));
    line.parentElement.scrollTop = line.parentElement.scrollHeight;
  });
}

function removeInterimSpeech() {
  sttInterimLines.forEach((line) => line.remove());
  sttInterimLines = [];
}

function stopBrowserStt() {
  sttShouldRestart = false;
  if (speechRecognition) {
    speechRecognition.onend = null;
    try {
      speechRecognition.stop();
    } catch {
      // Browser speech recognition may already be stopped.
    }
    speechRecognition = null;
  }
  removeInterimSpeech();
  stopSessionTimer();
  setSttStatus(false, currentInterfaceLanguage() === "Korean" ? "자막을 멈췄습니다." : "Captions stopped.");
}

function startBrowserStt() {
  const Recognition = browserSpeechRecognitionCtor();
  if (!Recognition) {
    sttToggle.checked = false;
    setSttStatus(
      false,
      currentInterfaceLanguage() === "Korean"
        ? "실시간 자막은 Chrome처럼 음성 인식을 지원하는 브라우저가 필요합니다."
        : "Live captions need Chrome or another browser with speech recognition support.",
    );
    return;
  }
  if (!isSecureVoiceContext()) {
    sttToggle.checked = false;
    setSttStatus(
      false,
      currentInterfaceLanguage() === "Korean"
        ? "마이크 자막은 HTTPS가 필요합니다. Render와 localhost는 사용할 수 있습니다."
        : "Caption microphone access needs HTTPS. Render is OK, and localhost is OK.",
    );
    return;
  }

  if (speechRecognition) stopBrowserStt();

  speechRecognition = new Recognition();
  speechRecognition.lang = sttLanguage();
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.maxAlternatives = 1;
  sttShouldRestart = true;
  sttToggle.checked = true;
  startSessionTimer();
  setSttStatus(true, currentInterfaceLanguage() === "Korean" ? "음성을 듣는 중..." : "Listening for speech...");

  speechRecognition.onresult = (event) => {
    let finalText = "";
    let interimText = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      const transcript = result[0]?.transcript || "";
      if (result.isFinal) finalText += transcript;
      else interimText += transcript;
    }
    if (finalText.trim()) {
      removeInterimSpeech();
      appendRecognizedSpeech(finalText);
    } else {
      updateInterimSpeech(interimText);
    }
  };

  speechRecognition.onerror = (event) => {
    if (event.error === "no-speech") {
      setSttStatus(true, currentInterfaceLanguage() === "Korean" ? "듣는 중" : "Listening");
      return;
    }
    sttShouldRestart = false;
    sttToggle.checked = false;
    stopSessionTimer();
    const message = event.error === "not-allowed"
      ? currentInterfaceLanguage() === "Korean" ? "마이크 권한이 차단되었습니다" : "Mic permission blocked"
      : currentInterfaceLanguage() === "Korean" ? `자막 문제: ${event.error || "중지됨"}` : `Caption issue: ${event.error || "stopped"}`;
    setSttStatus(false, message);
  };

  speechRecognition.onend = () => {
    speechRecognition = null;
    if (sttShouldRestart && sttToggle.checked) {
      window.setTimeout(() => {
        if (sttShouldRestart && sttToggle.checked && !speechRecognition) startBrowserStt();
      }, 350);
      return;
    }
    stopSessionTimer();
    setSttStatus(false, currentInterfaceLanguage() === "Korean" ? "자막을 멈췄습니다." : "Captions stopped.");
  };

  try {
    speechRecognition.start();
  } catch (error) {
    sttShouldRestart = false;
    sttToggle.checked = false;
    setSttStatus(false, currentInterfaceLanguage() === "Korean" ? `자막 오류: ${error.message}` : `Caption error: ${error.message}`);
  }
}

function renderReview(review) {
  if (!reviewStatus || !pronunciationStatus || !vocabList || !culturalTitle || !culturalBody || !culturalPrompt) return;
  if (!review) return;
  reviewInitialized = true;
  reviewStatus.textContent =
    currentInterfaceLanguage() === "Korean"
      ? `${review.vocabulary.length}개 표현 생성됨`
      : `${review.vocabulary.length} items generated`;
  pronunciationStatus.textContent =
    currentInterfaceLanguage() === "Korean"
      ? "AI 복습이 만들어졌습니다. 단어를 누르면 발음을 다시 들을 수 있어요."
      : "AI review generated. Click any word to replay pronunciation.";
  vocabList.innerHTML = "";

  review.vocabulary.forEach((item) => {
    const card = document.createElement("article");
    card.className = "vocab-item";

    const button = document.createElement("button");
    button.className = "vocab-term";
    button.dataset.say = item.pronunciationText || item.term;
    button.dataset.lang = item.language || "en-US";
    button.textContent = item.term;
    button.addEventListener("click", () => playPronunciation(button));

    const translation = document.createElement("strong");
    translation.textContent = item.translation;

    const context = document.createElement("p");
    context.textContent = item.context;

    card.append(button, translation, context);
    vocabList.append(card);
  });

  culturalTitle.textContent = review.culturalInsight.title;
  culturalBody.textContent = review.culturalInsight.summary;
  culturalPrompt.textContent =
    currentInterfaceLanguage() === "Korean"
      ? `다음 질문: ${translateCopy(review.culturalInsight.researchPrompt)}`
      : `Research prompt: ${review.culturalInsight.researchPrompt}`;
}

async function requestReview(source = "the completed match") {
  if (!reviewStatus || !pronunciationStatus) return;
  reviewStatus.textContent = currentInterfaceLanguage() === "Korean" ? "생성 중" : "Generating";
  pronunciationStatus.textContent =
    currentInterfaceLanguage() === "Korean" ? `${source}에서 AI 복습을 만드는 중입니다.` : `Building AI review from ${source}.`;
  if (!backendOnline || !currentMatchId) {
    reviewStatus.textContent = currentInterfaceLanguage() === "Korean" ? "프로토타입 복습 준비됨" : "Prototype review ready";
    pronunciationStatus.textContent =
      currentInterfaceLanguage() === "Korean"
        ? "저장된 복습을 만들려면 서버를 시작하고 대국을 완료하세요."
        : "Start the backend and finish a match to generate a saved review.";
    return;
  }

  try {
    const data = await api(`/api/matches/${currentMatchId}/review`, { method: "POST" });
    renderReview(data.review);
  } catch (error) {
    pronunciationStatus.textContent = error.message;
  }
}

function playPronunciation(button) {
  const phrase = button.dataset.say || button.textContent.trim();
  const lang = button.dataset.lang || "en-US";
  speakText(phrase, {
    lang,
    label: phrase,
    statusElement: pronunciationStatus,
  });
}

resetSubtitlePlaceholders();
const savedTextSize = localStorage.getItem("easyMateTextSize");
if (savedTextSize !== null) textSizeSlider.value = savedTextSize;
applyTextSize(textSizeSlider.value);

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  closeProfileMenu();
  toggleMenu();
});

document.addEventListener("click", (event) => {
  if (!sidebarMenu.hidden && !sidebarMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  if (!headerProfileMenu.hidden && !headerProfile.contains(event.target)) closeProfileMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeProfileMenu();
  }
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
  if (event.key.length !== 1) return;
  adminCommandBuffer = `${adminCommandBuffer}${event.key.toLowerCase()}`.slice(-5);
  if (adminCommandBuffer === "admin") {
    adminCommandBuffer = "";
    revealAdminByCommand();
  }
});

interfaceLanguageObserver = new MutationObserver((records) => {
  if (applyingLanguage || currentInterfaceLanguage() !== "Korean") return;
  records.forEach((record) => {
    if (record.type === "characterData") {
      scheduleInterfaceLanguageApply(record.target);
      return;
    }
    record.addedNodes.forEach((node) => scheduleInterfaceLanguageApply(node));
  });
});

observeInterfaceLanguage();

document.querySelectorAll("[data-view-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    let viewName = link.dataset.viewLink;
    if (!viewName) return;
    event.preventDefault();
    if (link.closest(".mobile-tabbar")) {
      document.querySelectorAll(".mobile-tabbar button").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
    setView(viewName);
    if (link.closest(".desktop-header-nav")) {
      document.querySelectorAll(".desktop-header-nav [data-view-link]").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

document.querySelectorAll(".route-card").forEach((card) => {
  card.tabIndex = 0;
  card.role = "button";
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setView(card.dataset.viewLink);
    }
  });
});

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segment").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    syncState.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${button.dataset.mode === "Rated" ? "기록" : "친선"} 게임 준비됨`
        : `${button.dataset.mode} game ready`;
  });
});

document.querySelectorAll(".pool-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pool-button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const pool = selectedPool();
    queuePrompt.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${pool.label} ${pool.name}을 선택했습니다.`
        : `${pool.label} ${pool.name} selected.`;
    timeControlBadge.textContent = `${pool.timeControl} - ${
      pool.rated ? currentInterfaceLanguage() === "Korean" ? "기록" : "Rated" : currentInterfaceLanguage() === "Korean" ? "친선" : "Casual"
    } - ${translateCopy(conversationGoal.value)}`;
  });
});

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signInOrRegister();
});

authPassword.addEventListener("input", () => {
  authConfirmPasswordField.hidden = authMode === "login" || !authPassword.value;
  if (authConfirmPasswordField.hidden) authConfirmPassword.value = "";
});

googleSignInButton.addEventListener("click", signInWithGoogle);
headerProfileButton.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleProfileMenu();
});
headerSignOutButton.addEventListener("click", signOut);
deleteAccountButton.addEventListener("click", deleteAccountWithTypedConfirmation);
deleteAccountConfirm?.addEventListener("input", updateDeleteAccountButtonState);
contrastModeButton.addEventListener("click", toggleContrastMode);
textSizeSlider.addEventListener("input", (event) => applyTextSize(event.target.value));

languageSelect?.addEventListener("change", () => {
  applyInterfaceLanguage();
  syncLegalLanguage();
  renderActiveMatchReturn();
  if (!queueTipPanel?.hidden) showQueueTip();
  renderLandingTypewriter();
  renderAuthState();
  renderDashboardSummary();
  updateTemperature(currentUser?.mannerTemperature ?? currentManner);
  if (cachedLobbyData) renderLobby(cachedLobbyData);
  if (cachedAdminData && isStaffUser()) renderAdminOverview(cachedAdminData);
  const activeView = document.querySelector(".view.active")?.dataset.view;
  if (activeView === "forum" && forumInitialized) renderForumPosts();
  if (activeView === "overview") refreshLeaderboard();
  if (activeView === "how-to-play") {
    refreshTrainingState();
    syncOpenTrainingFrameLanguage();
  }
  resetSubtitlePlaceholders();
  setSttStatus(sttListening);
});

document.querySelectorAll("[data-profile-language]").forEach((input) => {
  input.addEventListener("change", () => {
    if (!input.checked || !languageSelect) return;
    languageSelect.value = input.value;
    languageSelect.dispatchEvent(new Event("change"));
  });
});

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-piece-edition]");
  if (!control) return;
  setPieceEdition(control.dataset.pieceEdition);
  if (homeThemePopover?.contains(control)) setHomeThemePopover(false);
});

trainingEditionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const edition = button.dataset.trainingEdition === "original" ? "original" : "cheoinseong";
    void setPieceEdition(edition);
    trainingModuleRenderSignature = "";
    renderTrainingEditionControls();
    renderTrainingModuleList();
    reloadOpenTrainingEdition();
  });
});

homeLeaderboardTab?.addEventListener("click", () => setHomeInsightTab("leaderboard"));
homeQuestTab?.addEventListener("click", () => setHomeInsightTab("quests"));
resumeMatchButton?.addEventListener("click", resumeActivePlay);
homeDailyPuzzleButton?.addEventListener("click", async () => {
  setView("how-to-play");
  await refreshTrainingState();
  openPuzzleStage(puzzlePathStages[0], 0, { allowLocked: true });
});
homeThemeToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  setHomeThemePopover(homeThemePopover?.hidden !== false);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".home-theme-control")) setHomeThemePopover(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setHomeThemePopover(false);
});

profilePieceEdition?.addEventListener("change", (event) => {
  setPieceEdition(event.target.value);
});

signupButton.addEventListener("click", () => {
  if (currentUser) {
    signOut();
    return;
  }
  setAuthMode("signup");
});

loginButton.addEventListener("click", () => {
  if (currentUser) {
    setView("overview");
    return;
  }
  setAuthMode("login");
});

mainAccountButton?.addEventListener("click", () => openAccountEntry("signup"));

mainTutorialButton?.addEventListener("click", () => {
  clearRequestedTrainingModule();
  setView("how-to-play");
  showTrainingModuleHome();
});

tutorialLoginButton?.addEventListener("click", () => openAccountEntry("signup"));

showTutorialGuideButton?.addEventListener("click", () => {
  clearRequestedTrainingModule();
  showTrainingModuleHome();
});

showPuzzleGuideButton?.addEventListener("click", async () => {
  await refreshTrainingState();
  setHowToPlayMode("puzzle");
});

showCheoinseongGuideButton?.addEventListener("click", async () => {
  await refreshTrainingState();
  setHowToPlayMode("cheoinseong");
});

howToPlayFrame?.addEventListener("load", watchPuzzleFrameHeight);
window.addEventListener("resize", () => {
  schedulePuzzleFrameHeightSync();
  fitLandingTypewriter();
}, { passive: true });

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin && event.origin !== "null") return;
  if (howToPlayFrame?.contentWindow && event.source !== howToPlayFrame.contentWindow) return;
  if (event.data?.type === "easymate:tutorial-complete") completeStudentTutorial(event.data.module, Boolean(event.data.advance));
  if (event.data?.type === "easymate:review-quiz-complete") completeReviewQuiz(event.data);
  if (event.data?.type === "easymate:return-training") {
    setView("how-to-play");
    showTrainingModuleHome();
  }
  if (event.data?.type === "easymate:return-puzzle-path") {
    setView("how-to-play");
    showPuzzlePath(activeTrainingPathMode === "cheoinseong" ? "cheoinseong" : "puzzle");
  }
  if (event.data?.type === "easymate:puzzle-complete") completePuzzle(event.data);
});

continueToDashboardButton.addEventListener("click", () => {
  setView("overview");
});

findMatchButton.addEventListener("click", quickPairFromSelectedPool);
cancelMatchSearchButton.addEventListener("click", cancelMatchSearch);
nextQueueTipButton?.addEventListener("click", () => showQueueTip(queueTipIndex + 1));
showCreateSeekButton.addEventListener("click", () => {
  seekComposer.hidden = false;
  queuePrompt.textContent = "Choose settings, then create a game.";
  seekTimeControl.focus();
});
showFriendRoomButton.addEventListener("click", async () => {
  const state = await refreshActivePlayState();
  if (state?.openChallenge) {
    resumableChallenge = state.openChallenge;
    privateChallengeCode.textContent = state.openChallenge.code;
    friendRoomStatus.textContent = currentInterfaceLanguage() === "Korean"
      ? "이미 만든 방이 있습니다. 같은 코드로 친구를 초대하세요."
      : "You already have a waiting room. Share the same code with your friend.";
    if (state.match) updateRoomLink(state.match.id);
  } else {
    privateChallengeCode.textContent = "----";
    friendRoomStatus.textContent = "";
  }
  friendRoomDialog.showModal();
  privateChallengeInput.focus();
});
closeFriendRoomButton.addEventListener("click", () => friendRoomDialog.close());
createSeekButton.addEventListener("click", createOpenSeek);
refreshLobbyButton.addEventListener("click", refreshLobby);
createPrivateChallengeButton.addEventListener("click", createPrivateChallenge);
joinPrivateChallengeButton.addEventListener("click", joinPrivateChallenge);
privateChallengeInput.addEventListener("input", () => {
  privateChallengeInput.value = privateChallengeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
});
privateChallengeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    joinPrivateChallenge();
  }
});
copyMatchRoomLinkButton.addEventListener("click", copyRoomLink);
refreshAdminButton.addEventListener("click", refreshAdmin);
const scheduleAdminSearchRender = () => {
  if (adminSearchFrame) return;
  adminSearchFrame = window.requestAnimationFrame(() => {
    adminSearchFrame = 0;
    if (cachedAdminData) renderAdminOverview(cachedAdminData);
  });
};
adminMatchSearch.addEventListener("input", scheduleAdminSearchRender);
adminUserSearch.addEventListener("input", scheduleAdminSearchRender);

async function saveProfilePatch(patch = {}) {
  if (!currentUser) {
    if (profileStatus) {
      profileStatus.textContent =
        currentInterfaceLanguage() === "Korean" ? "프로필을 수정하려면 먼저 로그인하세요." : "Sign in before editing your profile.";
    }
    return null;
  }
  if (profileStatus) {
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "프로필을 저장하는 중..." : "Saving profile...";
  }
  const profile = await api("/api/profile", {
    method: "PUT",
    body: { ...patch },
  });
  currentUser = profile.user;
  cachedTrainingState = profile.user?.training || cachedTrainingState;
  renderProfile(profile);
  renderAuthState();
  if (profileStatus) {
    profileStatus.textContent = currentInterfaceLanguage() === "Korean" ? "프로필이 저장되었습니다." : "Profile saved.";
  }
  return profile;
}

saveProfileButton?.addEventListener("click", saveProfile);
editProfileNameButton?.addEventListener("click", () => {
  if (profileNameEditor) profileNameEditor.hidden = !profileNameEditor.hidden;
  profileDisplayName?.focus();
});
saveProfileNameButton?.addEventListener("click", saveInlineProfileName);
profileDisplayName?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    saveInlineProfileName();
  }
});
editProfileBioButton?.addEventListener("click", () => {
  if (profileBioEditor) profileBioEditor.hidden = !profileBioEditor.hidden;
  profileBio?.focus();
});
saveProfileBioButton?.addEventListener("click", saveInlineProfileBio);
profileAvatarButton?.addEventListener("click", () => profileImageFile?.click());
profileImageFile?.addEventListener("change", () => uploadProfileImage(profileImageFile.files?.[0]));
submitPeerFeedbackButton?.addEventListener("click", submitPeerFeedback);
saveCultureGuideButton?.addEventListener("click", saveCultureGuide);
joinLeagueButton?.addEventListener("click", joinLeague);
createLeagueButton?.addEventListener("click", createLeague);
leagueActionButtons.forEach((button) => {
  button.addEventListener("click", () => setLeagueActionMode(button.dataset.leagueAction));
});
closeLeagueActionPopoverButton?.addEventListener("click", () => setLeagueActionMode(null));
document.addEventListener("click", (event) => {
  if (!leagueActionMode) return;
  if (leagueActionPopover?.contains(event.target)) return;
  if (Array.from(leagueActionButtons).some((button) => button.contains(event.target))) return;
  leagueActionMode = null;
  renderLeagueAction();
});
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !leagueActionMode) return;
  const previouslyActive = leagueActionMode;
  leagueActionMode = null;
  renderLeagueAction();
  document.querySelector(`[data-league-action="${previouslyActive}"]`)?.focus();
});
leagueCodeInput?.addEventListener("input", () => {
  leagueCodeInput.value = leagueCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
  renderLeagueAction();
});
leagueCodeInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    joinLeague();
  }
});
leaderboardButtons.forEach((button) => {
  button.addEventListener("click", () => {
    leaderboardPeriod = button.dataset.leaderboardPeriod || "weekly";
    leaderboardPage = 0;
    leaderboardButtons.forEach((item) => item.classList.toggle("active", item === button));
    refreshLeaderboard();
  });
});
leaderboardScopeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    leaderboardScope = button.dataset.leaderboardScope || "mine";
    leaderboardPage = 0;
    leaderboardScopeButtons.forEach((item) => item.classList.toggle("active", item === button));
    refreshLeaderboard();
  });
});
showForumComposerButton.addEventListener("click", toggleForumComposer);
publishForumPostButton.addEventListener("click", publishForumPost);
forumPostCategory.addEventListener("change", () => {
  if (forumPostCategory.value === "Notice" && !isStaffUser()) forumPostCategory.value = "Question";
});
forumFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    forumFilter = button.dataset.forumFilter;
    renderForumPosts();
  });
});
document.querySelectorAll("[data-shop-interest]").forEach((button) => {
  button.addEventListener("click", () => saveShopInterest(button.dataset.shopInterest));
});
publishStaffProductButton?.addEventListener("click", publishStaffProduct);

resignMatchButton.addEventListener("click", () => finishMatch("Resigned"));
drawMatchButton.addEventListener("click", offerDraw);
newGameButton.addEventListener("click", queueNewMatch);
matchHomeButton?.addEventListener("click", returnHomeAfterMatch);

document.querySelectorAll("[data-legal-dialog]").forEach((button) => {
  button.addEventListener("click", () => openLegalDialog(button.dataset.legalDialog));
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

partnerLanguage.addEventListener("change", () => {
  partnerName.textContent = `Mina K. (${partnerLanguage.value})`;
});

startVoiceCallButton.addEventListener("click", startVoiceCall);
endVoiceCallButton.addEventListener("click", () => endVoiceCall(true));

reportUserButton.addEventListener("click", async () => {
  currentManner = Math.max(0, currentManner - 1.4);
  updateTemperature(currentManner);
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "안전 신고가 접수되었습니다" : "Safety report submitted";
  if (backendOnline) {
    try {
      await api("/api/reports", {
        method: "POST",
        body: {
          matchId: currentMatchId,
          reason: "Safety report",
          detail: "Submitted from match panel.",
        },
      });
    } catch {
      // Local UI has already acknowledged the report.
    }
  }
});

nextMissionButton.addEventListener("click", () => {
  missionIndex = (missionIndex + 1) % missions.length;
  icebreakerText.textContent = missions[missionIndex];
});

sttToggle.addEventListener("change", () => {
  const active = sttToggle.checked;
  if (active) {
    startBrowserStt();
  } else {
    stopBrowserStt();
  }
});

translationToggle.addEventListener("change", () => {
  translatedSpeech.hidden = !translationToggle.checked;
  if (matchTranslatedSpeech) matchTranslatedSpeech.hidden = !translationToggle.checked;
});

subtitleSize.addEventListener("change", () => {
  [originalSpeech, translatedSpeech].forEach((block) => {
    block.classList.remove("small", "large");
    if (subtitleSize.value !== "medium") block.classList.add(subtitleSize.value);
  });
});

contrastToggle.addEventListener("change", () => {
  document.querySelector('[data-view="stt"]').classList.toggle("high-contrast", contrastToggle.checked);
  document.body.classList.toggle("high-contrast-mode", contrastToggle.checked);
  contrastModeButton.setAttribute("aria-pressed", String(contrastToggle.checked));
});

activateStt.addEventListener("click", async () => {
  if (sttListening) {
    sttToggle.checked = false;
    stopBrowserStt();
  } else {
    sttToggle.checked = true;
    startBrowserStt();
  }
});

matchActivateStt.addEventListener("click", () => {
  if (sttListening) {
    sttToggle.checked = false;
    stopBrowserStt();
  } else {
    sttToggle.checked = true;
    startBrowserStt();
  }
});

sttSourceLanguage.addEventListener("change", () => {
  matchSttSourceLanguage.value = sttSourceLanguage.value;
  if (!sttListening) return;
  stopBrowserStt();
  sttToggle.checked = true;
  startBrowserStt();
});

matchSttSourceLanguage.addEventListener("change", () => {
  sttSourceLanguage.value = matchSttSourceLanguage.value;
  if (!sttListening) return;
  stopBrowserStt();
  sttToggle.checked = true;
  startBrowserStt();
});

subtitleTargetLanguage.addEventListener("change", () => {
  matchSubtitleTargetLanguage.value = subtitleTargetLanguage.value;
});

matchSubtitleTargetLanguage.addEventListener("change", () => {
  subtitleTargetLanguage.value = matchSubtitleTargetLanguage.value;
});

generateReviewButton?.addEventListener("click", () => requestReview("the completed match"));
refreshReviewButton?.addEventListener("click", () => requestReview("the latest transcript sample"));

document.querySelectorAll(".vocab-term").forEach((button) => {
  button.addEventListener("click", () => playPronunciation(button));
});

applyPieceEditionTheme(selectedPieceEdition);
updateHeaderPieceEditionToggle(selectedPieceEdition);
updateRoomLink(null);
renderAuthState();
applyInterfaceLanguage();
syncLegalLanguage();
renderLandingTypewriter();
if (isStudentTutorialRequired()) {
  setView("how-to-play");
} else if (isTutorialRoute()) {
  setView("how-to-play");
  openRequestedTrainingModule();
} else if (isStudentTutorialComplete() && !currentUser) {
  openAccountEntry("signup");
}
checkBackend();
