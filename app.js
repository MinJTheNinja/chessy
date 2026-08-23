const board = document.querySelector("#chessBoard");
const menuToggle = document.querySelector("#menuToggle");
const languageSelect = document.querySelector("#languageSelect");
const pieceEditionControls = document.querySelectorAll("[data-piece-edition]");
const sidebarMenu = document.querySelector("#sidebarMenu");
const syncState = document.querySelector("#syncState");
const queueTime = document.querySelector("#queueTime");
const queueProgress = document.querySelector("#queueProgress");
const queuePrompt = document.querySelector("#queuePrompt");
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
const howToPlayFrame = document.querySelector(".how-to-play-frame");
const howToPlayShell = document.querySelector("#howToPlayShell");
const howToPlayView = document.querySelector(".how-to-play-view");
const showTutorialGuideButton = document.querySelector("#showTutorialGuide");
const showPuzzleGuideButton = document.querySelector("#showPuzzleGuide");
const tutorialPuzzleNote = document.querySelector("#tutorialPuzzleNote");
const trainingModuleList = document.querySelector("#trainingModuleList");
const trainingModuleToolbar = document.querySelector("#trainingModuleToolbar");
const activeTrainingModuleTitle = document.querySelector("#activeTrainingModuleTitle");
const backToTrainingModulesButton = document.querySelector("#backToTrainingModules");
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
const notificationButton = document.querySelector("#notificationButton");
const notificationCount = document.querySelector("#notificationCount");
const notificationPanel = document.querySelector("#notificationPanel");
const notificationList = document.querySelector("#notificationList");
const clearNotificationsButton = document.querySelector("#clearNotifications");
const activeMatchesCount = document.querySelector("#activeMatchesCount");
const subtitleSessionsCount = document.querySelector("#subtitleSessionsCount");
const welcomeName = document.querySelector("#welcomeName");
const dashboardHeroAvatar = document.querySelector("#dashboardHeroAvatar");
const dashboardStreak = document.querySelector("#dashboardStreak");
const dashboardEasyElo = document.querySelector("#dashboardEasyElo");
const leaderboardList = document.querySelector("#leaderboardList");
const leaderboardButtons = document.querySelectorAll("[data-leaderboard-period]");
const leaderboardScopeButtons = document.querySelectorAll("[data-leaderboard-scope]");
const leagueCodeInput = document.querySelector("#leagueCodeInput");
const joinLeagueButton = document.querySelector("#joinLeagueButton");
const createLeagueButton = document.querySelector("#createLeagueButton");
const leagueStatus = document.querySelector("#leagueStatus");
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
const pieceEditionStorageKey = "easyMatePieceEdition";
let leaderboardPeriod = "weekly";
let leaderboardScope = "mine";
let leaderboardPage = 0;
const leaderboardPageSize = 10;
let cachedTrainingState = null;
let trainingModuleOpen = false;
let howToPlayResizeObserver = null;
let howToPlayResizeFrame = 0;

const koreanText = {
  "Notifications": "알림",
  "Clear": "지우기",
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
  "No notifications yet.": "아직 알림이 없어요. 매칭이 시작되면 이곳에 알려드릴게요.",
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
  setText(mainTutorialButton, korean ? "훈련장으로 가기" : "Go to training");
  if (!currentUser) {
    setText(loginButton, korean ? "로그인" : "Login");
    setText(signupButton, korean ? "새 계정" : "New account");
    setText(authSubmit, authMode === "login" ? (korean ? "로그인" : "Log in") : (korean ? "계정 만들기" : "Create account"));
  }
  setText(tutorialLoginButton, korean ? "로그인 화면으로 가기" : "Go to login");
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

function pieceSvg(pieceCode, edition = "beta") {
  return normalizePieceEdition(edition) === "cheoinseong" ? cheoinseongPieceSvg(pieceCode) : betaPieceSvg(pieceCode);
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
let missionIndex = 0;
let currentManner = 42.8;
let backendOnline = false;
let currentUser = null;
let selectedPieceEdition = "cheoinseong";
let currentMatchPlayers = [];
let currentMatchId = null;
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
let notifications = [];
let unreadNotifications = 0;
let cachedAdminData = null;
let cachedLobbyData = null;
let adminCommandBuffer = "";
let forumFilter = "All";
let forumPosts = [];
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
  if (generateReviewButton) generateReviewButton.hidden = true;
  newGameButton.hidden = !isEnded;
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
  authStatus.textContent =
    mode === "login" ? translateCopy("Enter your existing email and password.") : translateCopy("Create an account to save matches and language review.");
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
    tutorialSrc: nextModule ? `/assets/how-to-play.html?module=${nextModule.id}` : "",
    puzzleUnlocked: !nextModule,
    completedModules,
    modules: modules.map((module) => ({ ...module, completed: completedModules.includes(module.id) })),
    reviewOptions: modules.filter((module) => completedModules.includes(module.id)).map((module) => ({ module: module.id, title: module.title })),
  };
}

function activeTrainingState() {
  return currentUser ? cachedTrainingState || currentUser.training || localTrainingState() : localTrainingState();
}

const trainingModuleDescriptions = {
  1: "기물의 움직임과 왕끼리 붙을 수 없는 규칙을 배워요.",
  2: "각 기물이 상대 기물을 잡는 방법을 연습해요.",
  3: "체크를 피하고, 막고, 공격한 기물을 잡아봐요.",
  4: "여러 체크메이트 모양과 승리 조건을 배워요.",
};

const trainingModuleArt = {
  1: { src: "/assets/tutorial-pieces/g_pawn.png", alt: "고려 꼬마 창병" },
  2: { src: "/assets/tutorial-pieces/g_bishop.png", alt: "고려 승려" },
  3: { src: "/assets/tutorial-pieces/g_king.png", alt: "고려 임금님" },
  4: { src: "/assets/tutorial-pieces/g_knight.png", alt: "고려 백마 기수" },
};

function renderTrainingModuleList() {
  if (!trainingModuleList) return;
  const state = activeTrainingState();
  const nextModuleId = Number(state.nextModule?.id || 0);
  trainingModuleList.innerHTML = "";
  (state.modules || []).forEach((module) => {
    const moduleId = Number(module.id);
    const completed = Boolean(module.completed);
    const current = moduleId === nextModuleId;
    const accessible = completed || current;
    const card = document.createElement("article");
    card.className = `training-module-row${completed ? " completed" : ""}${current ? " current" : ""}${accessible ? "" : " locked"}`;
    const art = trainingModuleArt[moduleId] || trainingModuleArt[1];
    card.innerHTML = `
      <div class="training-module-art"><img src="${art.src}" alt="${art.alt}" /></div>
      <div class="training-module-copy">
        <span class="training-module-index">모듈 ${moduleId}</span>
        <h3>${module.title}</h3>
        <p>${trainingModuleDescriptions[moduleId] || "체스의 기본 규칙을 배워요."}</p>
      </div>
      <div class="training-module-action"><span>${completed ? "완료" : current ? "학습 가능" : "잠김"}</span></div>`;
    const control = document.createElement("button");
    control.type = "button";
    control.className = "training-module-open";
    control.textContent = completed ? "다시 학습하기" : current ? "시작하기" : "이전 모듈을 먼저 완료하세요";
    if (accessible) {
      control.setAttribute("aria-label", `${module.title} ${control.textContent}`);
      control.addEventListener("click", () => openTrainingModule(moduleId));
    } else {
      control.disabled = true;
    }
    card.querySelector(".training-module-action")?.append(control);
    trainingModuleList.append(card);
  });

  const completedModules = (state.completedModules || []).map(Number);
  const reviewModule = completedModules.at(-1);
  const review = document.createElement("footer");
  review.className = "training-review-row";
  review.innerHTML = `
    <div>
      <span class="training-module-index">복습 퀴즈</span>
      <p>${reviewModule ? "배운 규칙을 한 문제로 확인해 볼까요?" : "모듈을 완료하면 복습 퀴즈를 시작할 수 있어요."}</p>
    </div>`;
  const reviewControl = document.createElement("button");
  reviewControl.type = "button";
  reviewControl.className = "training-review-open";
  reviewControl.textContent = "복습 퀴즈 시작";
  reviewControl.disabled = !reviewModule;
  if (reviewModule) reviewControl.addEventListener("click", () => openTrainingReview(reviewModule));
  review.append(reviewControl);
  trainingModuleList.append(review);
}

function renderTrainingControls() {
  const state = activeTrainingState();
  const puzzleUnlocked = Boolean(state.puzzleUnlocked);
  if (showPuzzleGuideButton) {
    showPuzzleGuideButton.textContent = currentInterfaceLanguage() === "Korean" ? "퍼즐" : "Puzzle";
    showPuzzleGuideButton.classList.toggle("locked", !puzzleUnlocked);
    showPuzzleGuideButton.setAttribute("aria-disabled", puzzleUnlocked ? "false" : "true");
  }
  if (tutorialLoginButton) tutorialLoginButton.hidden = Boolean(currentUser);
  if (tutorialPuzzleNote) {
    tutorialPuzzleNote.hidden = puzzleUnlocked;
    tutorialPuzzleNote.textContent =
      currentInterfaceLanguage() === "Korean"
        ? "모든 훈련 모듈을 완료하면 퍼즐을 열 수 있습니다."
        : "Finish every training module to unlock puzzles.";
  }
  renderTrainingModuleList();
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

function showTrainingModuleHome() {
  trainingModuleOpen = false;
  howToPlayShell?.classList.remove("puzzle-mode");
  howToPlayView?.classList.remove("puzzle-mode");
  resetHowToPlayFrameSizing();
  trainingModuleList?.removeAttribute("hidden");
  howToPlayShell?.setAttribute("hidden", "");
  showTutorialGuideButton?.classList.add("active");
  showPuzzleGuideButton?.classList.remove("active");
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
  howToPlayShell?.removeAttribute("hidden");
  trainingModuleToolbar?.removeAttribute("hidden");
  if (activeTrainingModuleTitle) activeTrainingModuleTitle.textContent = `모듈 ${normalizedModuleId} · ${module.title}`;
  if (howToPlayFrame) howToPlayFrame.src = `/assets/how-to-play.html?module=${normalizedModuleId}&v=20260820-module-flow`;
  showTutorialGuideButton?.classList.add("active");
  showPuzzleGuideButton?.classList.remove("active");
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
  howToPlayShell?.removeAttribute("hidden");
  trainingModuleToolbar?.removeAttribute("hidden");
  if (activeTrainingModuleTitle) activeTrainingModuleTitle.textContent = `모듈 ${normalizedModuleId} · 복습 퀴즈`;
  if (howToPlayFrame) howToPlayFrame.src = `/assets/how-to-play.html?module=${normalizedModuleId}&review=1`;
  showTutorialGuideButton?.classList.add("active");
  showPuzzleGuideButton?.classList.remove("active");
  howToPlayShell?.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const nextMode = mode === "puzzle" && puzzleUnlocked ? "puzzle" : "tutorial";
  howToPlayShell?.classList.toggle("puzzle-mode", nextMode === "puzzle");
  howToPlayView?.classList.toggle("puzzle-mode", nextMode === "puzzle");
  if (nextMode === "puzzle") {
    trainingModuleOpen = false;
    trainingModuleList?.setAttribute("hidden", "");
    howToPlayShell?.removeAttribute("hidden");
    trainingModuleToolbar?.setAttribute("hidden", "");
    const currentFramePath = howToPlayFrame ? new URL(howToPlayFrame.src, window.location.href).pathname : "";
    if (howToPlayFrame && currentFramePath !== "/assets/goryeo-vs-mongol-puzzle.html") {
      howToPlayFrame.src = "/assets/goryeo-vs-mongol-puzzle.html";
    } else {
      watchPuzzleFrameHeight();
    }
  } else if (trainingModuleOpen) {
    resetHowToPlayFrameSizing();
    trainingModuleList?.setAttribute("hidden", "");
    howToPlayShell?.removeAttribute("hidden");
    trainingModuleToolbar?.removeAttribute("hidden");
  } else {
    resetHowToPlayFrameSizing();
    trainingModuleList?.removeAttribute("hidden");
    howToPlayShell?.setAttribute("hidden", "");
  }
  showTutorialGuideButton?.classList.toggle("active", nextMode === "tutorial");
  showPuzzleGuideButton?.classList.toggle("active", nextMode === "puzzle");
  renderTrainingControls();
}

function updateTutorialGateState() {
  const required = isStudentTutorialRequired();
  const complete = isStudentTutorialComplete();
  document.body.classList.toggle("tutorial-required", required);
  document.body.classList.toggle("tutorial-complete", complete);
  if (tutorialGateNote) tutorialGateNote.hidden = !required;
  if (tutorialLoginButton) tutorialLoginButton.hidden = Boolean(currentUser);
  setHowToPlayMode(showPuzzleGuideButton?.classList.contains("active") ? "puzzle" : "tutorial");
  document.querySelectorAll("[data-view-link]").forEach((link) => {
    const blocked = required && link.dataset.viewLink !== "how-to-play";
    link.classList.toggle("tutorial-locked-link", blocked);
    link.setAttribute("aria-disabled", blocked ? "true" : "false");
  });
}

async function completeStudentTutorial(module) {
  const moduleId = Number(module) || activeTrainingState().nextModule?.id;
  const wasAlreadyCompleted = activeTrainingState().completedModules?.includes(moduleId);
  if (wasAlreadyCompleted) {
    setView("how-to-play");
    if (moduleId < 4) openTrainingModule(moduleId + 1);
    else showTrainingModuleHome();
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
  trainingModuleOpen = false;
  updateTutorialGateState();
  await refreshTrainingState();
  setView("how-to-play");
  if (moduleId < 4) openTrainingModule(moduleId + 1);
  else showTrainingModuleHome();
}

async function completePuzzle(payload = {}) {
  if (!currentUser || !backendOnline) {
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
      body: { puzzleId: payload.puzzleId || "goryeo-vs-mongol", stars: payload.stars || 0 },
    });
    cachedTrainingState = data.state;
    currentUser = data.user || currentUser;
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
    let data = await api(`/api/matches/${matchId}`);
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
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(currentInterfaceLanguage() === "Korean" ? "체스 시계 종료" : "Chess clock expired", {
      body: translateCopy(result),
    });
  }
  if (backendOnline) {
    await finishMatch(result, { review: false, statusText: currentInterfaceLanguage() === "Korean" ? "시간이 끝났습니다" : "Time expired" });
  }
}

async function requestNotificationPermission() {
  if (!("Notification" in window) || Notification.permission !== "default") return;
  try {
    await Notification.requestPermission();
  } catch {
    // Browser notification permission is optional.
  }
}

function renderNotifications() {
  notificationCount.textContent = String(unreadNotifications);
  notificationCount.hidden = unreadNotifications === 0;

  notificationList.innerHTML = "";
  if (!notifications.length) {
    const empty = document.createElement("p");
    empty.className = "notification-empty";
    empty.textContent = translateCopy("No notifications yet.");
    notificationList.append(empty);
    return;
  }

  notifications.slice(0, 12).forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    const categoryClass = String(item.category || "info").replace(/[^a-z0-9_-]/gi, "");
    button.className = `notification-item ${categoryClass || "info"}`;
    const title = document.createElement("span");
    title.textContent = translateCopy(item.title || "New notification");
    const body = document.createElement("small");
    body.textContent = translateCopy(item.body || "");
    button.append(title, body);
    button.addEventListener("click", () => {
      notificationPanel.hidden = true;
      notificationButton.setAttribute("aria-expanded", "false");
      if (item.view) setView(item.view);
    });
    notificationList.append(button);
  });
}

function addNotification({ category = "info", title = "New notification", body = "", view = null }) {
  const notification = {
    id: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
    category,
    title,
    body,
    view,
  };
  notifications.unshift(notification);
  notifications = notifications.slice(0, 30);
  unreadNotifications += 1;
  renderNotifications();

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

function handleNotificationMessage(message) {
  if (message.category === "warning" && message.userId !== currentUser?.id) return;
  if (message.fromUserId && message.fromUserId === currentUser?.id) return;

  const views = {
    "game-request": "match",
    warning: "profile",
  };

  addNotification({
    category: message.category,
    title: translateCopy(message.title || "New notification"),
    body: message.body || "",
    view: views[message.category] || null,
  });
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
    if (currentUser) connectSocket(null);
    const routedToMatch = await loadMatchFromRoute();
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
    }
    if (message.type === "match:move" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "match:ended" && matchBelongsToCurrentUser(message.match)) renderMatch(message.match);
    if (message.type === "review:generated") renderReview(message.review);
    if (message.type?.startsWith("voice:")) handleVoiceSignal(message);
    if (message.type === "stt:subtitle") handleSubtitleSignal(message);
    if (message.type === "draw:offer") handleDrawOffer(message);
    if (message.type === "notification") handleNotificationMessage(message);
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
    setView("overview");
  } catch (error) {
    authStatus.textContent = error.message;
    renderAuthState();
  }
}

async function signOut() {
  if (!backendOnline) {
    currentUser = null;
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

    const side = document.createElement("div");
    side.className = "forum-post-side";

    const author = document.createElement("span");
    author.textContent = post.author;

    const time = document.createElement("time");
    time.textContent = post.time;

    const comments = document.createElement("span");
    comments.className = "forum-comments";
    comments.textContent = currentInterfaceLanguage() === "Korean" ? `댓글 ${post.comments || 0}` : `${post.comments || 0} comments`;

    let pinButton = null;
    if (isStaffUser()) {
      pinButton = document.createElement("button");
      pinButton.className = "forum-pin-action";
      pinButton.type = "button";
      pinButton.textContent = post.pinned
        ? currentInterfaceLanguage() === "Korean" ? "고정 해제" : "Unpin"
        : currentInterfaceLanguage() === "Korean" ? "고정" : "Pin";
      pinButton.addEventListener("click", () => toggleForumPin(post.id));
    }

    main.append(category, title);
    side.append(author, time, comments);
    if (pinButton) side.append(pinButton);
    item.append(pin, main, side);
    forumPostList.append(item);
  });
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

function publishForumPost() {
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
  forumPosts = [
    {
      id: window.crypto?.randomUUID?.() || `post_${Date.now()}`,
      title,
      category: forumPostCategory.value,
      body,
      author: currentUser?.displayName || "Guest Player",
      time: currentInterfaceLanguage() === "Korean" ? "방금 전" : "Just now",
      comments: 0,
      pinned: false,
    },
    ...forumPosts,
  ];
  forumPostTitle.value = "";
  forumPostBody.value = "";
  forumComposer.hidden = true;
  renderForumPosts();
}

function toggleForumComposer() {
  renderStaffAccessState();
  forumComposer.hidden = !forumComposer.hidden;
  if (!forumComposer.hidden) forumPostTitle.focus();
}

function toggleForumPin(postId) {
  if (!isStaffUser()) return;
  forumPosts = forumPosts.map((post) => (post.id === postId ? { ...post, pinned: !post.pinned } : post));
  renderForumPosts();
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
  if (isStudentTutorialRequired() && viewName !== "how-to-play") {
    viewName = "how-to-play";
  }
  if (viewName === "how-to-play") showTrainingModuleHome();
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
  if (viewName === "forum" && !forumInitialized) {
    renderForumPosts();
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
  menuToggle.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  sidebarMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
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
    notificationPanel.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
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
  drawOfferFromOpponent = false;
  updateRoomLink(match.id);
  updateMatchRoute(match.id);
  const matchEnded = match.status === "ended" || match.game?.gameOver;
  setMatchState(matchEnded ? "ended" : "playing");
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
  startMatchClock(match);
  connectSocket(match.id);
  if (matchEnded) {
    endVoiceCall(false);
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
    syncState.textContent =
      currentInterfaceLanguage() === "Korean" ? `${data.move.san} 수가 반영되었습니다` : `${data.move.san} accepted`;
    refreshStats();
  } catch (error) {
    selectedSquare = null;
    legalMoveTargets = [];
    buildBoard();
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

async function startQueue(label = currentInterfaceLanguage() === "Korean" ? "안전하게 대화할 수 있는 파트너를 찾는 중입니다." : "Searching for a safe partner with matching goals.", liveQueue = false, overrides = {}) {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  requestNotificationPermission();
  currentMatchId = null;
  setMatchState("searching");
  let seconds = 25;
  let progress = 22;
  cancelMatchSearchButton.hidden = false;
  queuePrompt.textContent = label;
  queueProgress.style.width = `${progress}%`;
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "검색 중" : "Searching";
  queueTime.textContent = "00:25";

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
          }
        }, 1200);
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
    seconds = Math.max(0, seconds - 1);
    progress = Math.min(95, progress + 3);
    queueTime.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
    queueProgress.style.width = `${progress}%`;
    if (seconds <= 0) {
      seconds = 25;
      progress = 42;
    }
  }, 1000);
}

function cancelMatchSearch() {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  setMatchState("idle");
  queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "방식 선택" : "Choose mode";
  queueProgress.style.width = "0%";
  queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "검색을 취소했습니다. 대국 방식을 다시 선택하세요." : "Search canceled. Choose how you want to play.";
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "취소됨" : "Canceled";
}

function resetToNewGame() {
  clearInterval(queueInterval);
  clearInterval(queuePollInterval);
  endVoiceCall(false);
  currentMatchId = null;
  updateRoomLink(null);
  setMatchState("idle");
  queueTime.textContent = currentInterfaceLanguage() === "Korean" ? "방식 선택" : "Choose mode";
  queueProgress.style.width = "0%";
  queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "원하는 대국 방식을 선택하세요." : "Choose how you want to play.";
  matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "진행 중인 대국이 없어요" : "No active match";
  if (location.protocol !== "file:") history.replaceState({}, "", "/");
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
    setMatchState("searching");
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
    privateChallengeCode.textContent = data.challenge.code;
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "초대 코드를 만들었습니다. 친구에게 코드를 공유하세요." : "Private invite created. Share the code with a friend.";
  } catch (error) {
    queuePrompt.textContent = error.message;
  }
}

async function joinPrivateChallenge() {
  const code = privateChallengeInput.value.trim().toUpperCase();
  if (!code) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "먼저 비공개 방 코드를 입력하세요." : "Enter a private challenge code first.";
    privateChallengeInput.focus();
    return;
  }
  if (!backendOnline) {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? "비공개 방에 참여하려면 서버를 시작하세요." : "Start the backend to join private challenges.";
    return;
  }

  try {
    queuePrompt.textContent = currentInterfaceLanguage() === "Korean" ? `${code} 방에 참여하는 중입니다.` : `Joining private challenge ${code}.`;
    const data = await api(`/api/challenges/${encodeURIComponent(code)}/accept`, { method: "POST" });
    privateChallengeInput.value = "";
    renderMatch(data.match);
    matchResult.textContent = currentInterfaceLanguage() === "Korean" ? "비공개 방에 참여했습니다" : "Private challenge joined";
    await refreshStats();
    await refreshLobby();
  } catch (error) {
    queuePrompt.textContent = error.message;
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
    target.append(image);
  } else {
    target.textContent = initials(user?.displayName || fallback);
  }
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
    renderDashboardSummary();
    renderLeaderboard(data.league);
    renderAuthState();
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
    if (leagueCodeInput) leagueCodeInput.value = data.league.code;
    renderDashboardSummary();
    renderLeaderboard(data.league);
    renderAuthState();
    if (leagueStatus) leagueStatus.textContent = `새 리그 코드: ${data.league.code}`;
  } catch (error) {
    if (leagueStatus) leagueStatus.textContent = error.message;
  }
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
    empty.className = "admin-empty";
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

  pageMembers.forEach((member) => {
    const row = document.createElement("article");
    row.className = "leaderboard-row";
    const rank = document.createElement("strong");
    rank.textContent = String(member.rank);
    const avatar = document.createElement("span");
    avatar.className = "leaderboard-avatar";
    renderAvatar(avatar, member, "P");
    const info = document.createElement("div");
    const name = document.createElement("b");
    name.textContent = leaderboardScope === "all" ? maskLeaderboardName(member.displayName) : member.displayName || "Player";
    const meta = document.createElement("small");
    meta.textContent =
      currentInterfaceLanguage() === "Korean"
        ? `${Number(member.streak || 0)}일 streak`
        : `${Number(member.streak || 0)} day streak`;
    info.append(name, meta);
    const elo = document.createElement("span");
    elo.className = "leaderboard-elo";
    elo.textContent = `${Number(member.easyElo || 1000)} Elo`;
    row.append(rank, avatar, info, elo);
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
  if (profileQuestionsCount) profileQuestionsCount.textContent = String(profile.badges?.length || 0);
  if (profileTestsCount) profileTestsCount.textContent = String(profile.stats?.completedMatches || 0);
  updateTemperature(Number(user.mannerTemperature ?? currentManner));
  renderDashboardSummary();

  badgeList.innerHTML = "";
  profile.badges.forEach((badge) => {
    const item = document.createElement("span");
    item.textContent = badge.name;
    badgeList.append(item);
  });

  badgeDetails.innerHTML = "";
  profile.badges.forEach((badge) => {
    const item = document.createElement("p");
    const name = document.createElement("strong");
    name.textContent = badge.name || "Badge";
    item.append(name, document.createTextNode(` ${badge.detail || ""}`));
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
  if (
    !notificationPanel.hidden &&
    !notificationPanel.contains(event.target) &&
    !notificationButton.contains(event.target)
  ) {
    notificationPanel.hidden = true;
    notificationButton.setAttribute("aria-expanded", "false");
  }
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
  renderAuthState();
  renderDashboardSummary();
  updateTemperature(currentUser?.mannerTemperature ?? currentManner);
  if (cachedLobbyData) renderLobby(cachedLobbyData);
  if (cachedAdminData && isStaffUser()) renderAdminOverview(cachedAdminData);
  const activeView = document.querySelector(".view.active")?.dataset.view;
  if (activeView === "forum" && forumInitialized) renderForumPosts();
  if (activeView === "overview") refreshLeaderboard();
  if (activeView === "how-to-play") refreshTrainingState();
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

backToTrainingModulesButton?.addEventListener("click", () => {
  clearRequestedTrainingModule();
  showTrainingModuleHome();
});

showPuzzleGuideButton?.addEventListener("click", async () => {
  await refreshTrainingState();
  setHowToPlayMode("puzzle");
});

howToPlayFrame?.addEventListener("load", watchPuzzleFrameHeight);
window.addEventListener("resize", schedulePuzzleFrameHeightSync, { passive: true });

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin && event.origin !== "null") return;
  if (howToPlayFrame?.contentWindow && event.source !== howToPlayFrame.contentWindow) return;
  if (event.data?.type === "easymate:tutorial-complete") completeStudentTutorial(event.data.module);
  if (event.data?.type === "easymate:return-training") {
    setView("how-to-play");
    showTrainingModuleHome();
  }
  if (event.data?.type === "easymate:puzzle-complete") completePuzzle(event.data);
});

notificationButton.addEventListener("click", async (event) => {
  event.stopPropagation();
  const willOpen = notificationPanel.hidden;
  notificationPanel.hidden = !willOpen;
  notificationButton.setAttribute("aria-expanded", String(willOpen));
  if (willOpen) closeProfileMenu();
  if (willOpen) {
    unreadNotifications = 0;
    renderNotifications();
    await requestNotificationPermission();
  }
});

clearNotificationsButton.addEventListener("click", () => {
  notifications = [];
  unreadNotifications = 0;
  renderNotifications();
});

continueToDashboardButton.addEventListener("click", () => {
  setView("overview");
});

findMatchButton.addEventListener("click", quickPairFromSelectedPool);
cancelMatchSearchButton.addEventListener("click", cancelMatchSearch);
showCreateSeekButton.addEventListener("click", () => {
  seekComposer.hidden = false;
  queuePrompt.textContent = "Choose settings, then create a game.";
  seekTimeControl.focus();
});
showFriendRoomButton.addEventListener("click", () => {
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
adminMatchSearch.addEventListener("input", () => {
  if (cachedAdminData) renderAdminOverview(cachedAdminData);
});
adminUserSearch.addEventListener("input", () => {
  if (cachedAdminData) renderAdminOverview(cachedAdminData);
});

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
leagueCodeInput?.addEventListener("input", () => {
  leagueCodeInput.value = leagueCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
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
newGameButton.addEventListener("click", resetToNewGame);

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
if (isStudentTutorialRequired()) {
  setView("how-to-play");
} else if (isTutorialRoute()) {
  setView("how-to-play");
  openRequestedTrainingModule();
} else if (isStudentTutorialComplete() && !currentUser) {
  openAccountEntry("signup");
}
checkBackend();
