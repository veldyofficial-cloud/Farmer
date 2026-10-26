/*
 * veldy-partners.js — full PARTNERS (subscription) section
 */
(function () {
  var FAQ_SEL = '.framer-122h8qz';

  var ROLES = [
    '브랜딩 디렉터', '챗봇 디자이너', '그래픽 디자이너', '커뮤니케이션 디자이너',
    '모션 그래픽 디자이너', '시각 디자이너', '웹 디자이너', '패키지 디자이너',
    '웹사이트 프로듀서', '비즈니스 컨설턴트', '마케팅 어드바이저', '마케팅 매니저',
    '프로젝트 매니저', '브랜드 저널리스트', '콘텐츠 작가', '콘텐츠 PD',
    '교정·교열·윤문 에디터', '촬영 감독', '영상 편집자', '번역가'
  ];

  var SERVICES = [
    { icon: 'folder', title: 'BI • CI • BX', desc: '로고 및 브랜딩' },
    { icon: 'megaphone', title: '광고 콘텐츠', desc: 'SNS 콘텐츠 / 상세페이지' },
    { icon: 'printer', title: '디지털 인쇄', desc: '포스터 / 리플렛 / 라벨 등' },
    { icon: 'package', title: '패키지', desc: '디자인 및 제작 대행' },
    { icon: 'book', title: '편집디자인', desc: '카달로그 / 책자 등' },
    { icon: 'chat', title: '마케팅 전략 기획', desc: '로드맵 제안' },
    { icon: 'quote', title: 'PPT', desc: '하단에 브리핑 자료 까지' },
    { icon: 'pen', title: '그래픽', desc: '일러스트 / 소스 개발' },
    { icon: 'video', title: '영상 편집', desc: '촬영 및 편집' }
  ];

  var LOGO_COUNT = 37;

  var TOOLS = [
    { id: 'monday', logo: 'assets/img/tools/monday.png', detail: 'assets/img/tools/monday-detail.png' },
    { id: 'gdrive', logo: 'assets/img/tools/gdrive.png', detail: 'assets/img/tools/gdrive-detail.png' }
  ];

  var SVG_PATHS = {
    folder: '<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h7a2 2 0 012 2z"/>',
    megaphone: '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 010 7.07"/>',
    printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    package: '<path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>',
    book: '<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>',
    chat: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
    quote: '<path d="M6 17h3l2-4V7H5v6h3M14 17h3l2-4V7h-6v6h3"/>',
    pen: '<path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z"/>',
    video: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>'
  };

  var MEDICAL_IMAGE = 'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?q=80&w=778&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  function enforceMedicalImage(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var imgs = scope.querySelectorAll ? scope.querySelectorAll('img') : [];
    for (var mi = 0; mi < imgs.length; mi++) {
      var img = imgs[mi];
      var src = img.getAttribute('src') || '';
      var srcset = img.getAttribute('srcset') || '';
      if (src.indexOf('qIQDXiQH2EAOXDhBR2Der0XY') !== -1 || srcset.indexOf('qIQDXiQH2EAOXDhBR2Der0XY') !== -1) {
        img.removeAttribute('srcset');
        img.setAttribute('src', MEDICAL_IMAGE);
      }
    }
  }

  function svgIcon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + (SVG_PATHS[name] || '') + '</svg>';
  }

  /* ── CSS ─────────────────────────────────────────────────────── */
  var CSS =
/* base */
'#veldy-partners{--vp-bg:var(--token-2d91bfb1-1bb0-467e-bf37-8ef020f4f815,#000);--vp-fg:var(--token-9811e40b-3ed8-4237-98e5-61535bb22d2f,#fff);--vp-mut:var(--token-af1df47b-ea84-448e-bdf0-a5ce0f875a59,#999);--vp-mut2:var(--token-e5a511bf-849c-4ac6-b942-175c537ace13,#bbb);--vp-line:var(--token-01c07c7e-a9ae-45ca-a79a-cc49e2fa5e89,rgba(187,187,187,.2));background:var(--vp-bg);color:var(--vp-fg);width:100%;font-family:"Inter","Inter Placeholder",sans-serif;-webkit-font-smoothing:antialiased}' +
'#veldy-partners *{box-sizing:border-box}' +
'#veldy-partners .vp-inner{max-width:1480px;margin:0 auto;padding:clamp(80px,9vw,140px) 24px}' +
/* meta row */
'#veldy-partners .vp-meta{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;align-items:center;border-top:1px solid var(--vp-line);padding-top:16px}' +
'#veldy-partners .vp-meta span{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:13px;font-weight:400;line-height:13px}' +
'#veldy-partners .vp-meta .m1{color:var(--vp-fg);justify-self:start}' +
'#veldy-partners .vp-meta .m2{color:var(--vp-mut);justify-self:center;text-align:center}' +
'#veldy-partners .vp-meta .m3{color:var(--vp-mut);justify-self:end;text-align:right}' +
/* hero */
'#veldy-partners .vp-hero{margin-top:clamp(40px,5vw,72px)}' +
'#veldy-partners .vp-h{margin:0;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-weight:500;font-size:clamp(30px,4.6vw,49px);line-height:1.32;letter-spacing:-.8px;color:var(--vp-fg)}' +
'#veldy-partners .vp-h em{font-style:normal}' +
'#veldy-partners .vp-lede{margin:26px 0 0;max-width:52ch;font-size:clamp(15px,1.5vw,17px);line-height:1.65;color:var(--vp-mut2)}' +
'#veldy-partners .vp-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:clamp(30px,3.5vw,42px)}' +
'#veldy-partners .vp-btn{display:inline-flex;align-items:center;gap:.5em;padding:14px 26px;border-radius:100px;font-size:14px;font-weight:500;letter-spacing:.02em;text-decoration:none;cursor:pointer;border:1px solid rgba(255,255,255,.4);background:transparent;color:var(--vp-fg);transition:background .2s,color .2s,border-color .2s}' +
'#veldy-partners .vp-btn:hover{background:var(--vp-fg);color:var(--vp-bg);border-color:var(--vp-fg)}' +
'#veldy-partners .vp-btn.mut{border-color:rgba(255,255,255,.18);color:var(--vp-mut2)}' +
'#veldy-partners .vp-btn.mut:hover{border-color:var(--vp-fg);color:var(--vp-fg)}' +
/* WHY SUBSCRIBE + icons — two-column layout */
'#veldy-partners .vp-sub-layout{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:clamp(80px,10vw,160px);padding:clamp(60px,8vw,120px) 0;align-items:end}' +
'#veldy-partners .vp-sub-left{text-align:left}' +
'#veldy-partners .vp-label{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(16px,1.8vw,22px);font-weight:700;color:var(--vp-fg);margin:0 0 clamp(28px,4vw,48px);letter-spacing:.08em}' +
'#veldy-partners .vp-q{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(24px,3.2vw,36px);font-weight:400;line-height:1.5;color:var(--vp-mut2);margin:0}' +
'#veldy-partners .vp-q strong{font-weight:700;color:var(--vp-fg)}' +
'#veldy-partners .vp-sub-heading{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(26px,3.4vw,36px);font-weight:700;color:var(--vp-fg);margin:clamp(40px,5vw,72px) 0 0;line-height:1.32;text-align:left}' +
'#veldy-partners .vp-sub-desc{margin:clamp(20px,3vw,36px) 0 0;font-size:clamp(14px,1.3vw,16px);line-height:2;color:var(--vp-mut2);text-align:left}' +
/* icons grid (right column) */
'#veldy-partners .vp-icons{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,3vw,40px)}' +
'#veldy-partners .vp-ic{text-align:center}' +
'#veldy-partners .vp-ic-circle{display:inline-flex;align-items:center;justify-content:center;width:clamp(60px,6vw,85px);height:clamp(60px,6vw,85px);border-radius:50%;border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;margin-bottom:clamp(10px,1.5vw,16px)}' +
'#veldy-partners .vp-ic-circle svg{width:38%;height:38%}' +
'#veldy-partners .vp-ic-title{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(13px,1.3vw,16px);font-weight:700;color:var(--vp-fg);margin:0 0 4px}' +
'#veldy-partners .vp-ic-desc{font-size:clamp(11px,1vw,14px);color:var(--vp-mut2);margin:0}' +
/* two-column block */
'#veldy-partners .vp-block{margin-top:clamp(72px,9vw,132px)}' +
'#veldy-partners .vp-cols{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:clamp(40px,5vw,64px)}' +
/* reasons (left column) */
'#veldy-partners .vp-reasons{align-self:start}' +
'#veldy-partners .vp-rh{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(26px,3.4vw,36px);font-weight:700;line-height:1.32;letter-spacing:normal;color:var(--vp-fg);margin:0 0 clamp(28px,3vw,40px)}' +
'#veldy-partners .vp-reason{margin-bottom:clamp(32px,4vw,56px)}' +
'#veldy-partners .vp-reason-no{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(18px,2vw,24px);font-weight:600;color:var(--vp-mut);margin:0 0 8px}' +
'#veldy-partners .vp-reason-t{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(18px,2.1vw,26px);font-weight:600;color:var(--vp-fg);margin:0;line-height:1.4}' +
/* role list (right column) — right-aligned */
'#veldy-partners .vp-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--vp-line)}' +
'#veldy-partners .vp-item{display:flex;align-items:baseline;justify-content:flex-start;gap:clamp(20px,3vw,56px);padding:clamp(16px,1.7vw,22px) 0;border-bottom:1px solid var(--vp-line);text-align:left}' +
'#veldy-partners .vp-no{flex:none;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:14px;font-weight:400;line-height:25px;color:var(--vp-mut)}' +
'#veldy-partners .vp-name{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(17px,1.7vw,19px);font-weight:500;line-height:1.3;color:var(--vp-fg)}' +
/* scrolling ticker — white bg, full bleed */
'#veldy-partners .vp-ticker-wrap{position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;width:100vw;background:#fff;margin-top:clamp(60px,8vw,120px)}' +
'#veldy-partners .vp-ticker{overflow:hidden;white-space:nowrap;height:clamp(112px,12vw,176px);padding:0;display:flex;align-items:center}' +
'#veldy-partners .vp-ticker-track{display:inline-flex;align-items:center;animation:vpScroll 40s linear infinite}' +
'#veldy-partners .vp-ticker-item{flex:none;padding:0 clamp(16px,2vw,32px)}' +
'#veldy-partners .vp-ticker-item img{height:clamp(100px,10vw,150px);max-height:calc(100% - 16px);width:auto;display:block}' +
'@keyframes vpScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}' +
/* WHY VELDY */
'#veldy-partners .vp-wv{text-align:left;margin-top:clamp(80px,10vw,140px)}' +
'#veldy-partners .vp-wv-heading{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(26px,3.4vw,36px);font-weight:700;color:var(--vp-fg);margin:0 0 clamp(40px,5vw,72px);line-height:1.4}' +
'#veldy-partners .vp-wv-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,3vw,40px);text-align:left}' +
'#veldy-partners .vp-wv-col{padding:clamp(20px,2.5vw,32px);border:1px solid var(--vp-line);border-radius:12px}' +
'#veldy-partners .vp-wv-ct{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(16px,1.6vw,22px);font-weight:700;color:var(--vp-fg);margin:0 0 clamp(16px,2vw,24px)}' +
'#veldy-partners .vp-wv-ci{font-size:clamp(14px,1.3vw,18px);color:var(--vp-mut2);margin:8px 0;line-height:1.5}' +
/* utilize + quotes — two-column layout */
'#veldy-partners .vp-util-layout{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:clamp(80px,10vw,140px);align-items:start}' +
'#veldy-partners .vp-util{text-align:left}' +
'#veldy-partners .vp-util-sm{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-weight:700;font-size:clamp(26px,3.4vw,36px);line-height:1.32;letter-spacing:normal;color:var(--vp-mut2);margin:0}' +
'#veldy-partners .vp-util-lg{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-weight:700;font-size:clamp(26px,3.4vw,36px);line-height:1.32;letter-spacing:normal;color:var(--vp-fg);margin:8px 0 0}' +
/* agency section — small body text, no label */
'#veldy-partners .vp-agency{text-align:left;margin-top:clamp(20px,2.5vw,36px)}' +
'#veldy-partners .vp-agency-body{font-size:clamp(15px,1.5vw,17px);line-height:1.65;color:var(--vp-mut2);margin:0}' +
/* quotes — left-aligned, same X coordinate */
'#veldy-partners .vp-quotes{margin:0}' +
'#veldy-partners .vp-quote{text-align:left;padding:clamp(20px,2.5vw,32px) 0;border-bottom:1px solid var(--vp-line);font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(14px,1.4vw,18px);font-weight:700;color:var(--vp-fg);line-height:1.5}' +
/* banner */
'#veldy-partners .vp-banner{margin-top:clamp(80px,10vw,140px);padding-top:clamp(40px,5vw,72px)}' +
'#veldy-partners .vp-banner-label{font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:clamp(14px,1.4vw,18px);font-weight:700;color:var(--vp-mut2);margin:0 0 16px}' +
'#veldy-partners .vp-banner .vp-h{margin-bottom:clamp(24px,3vw,36px);font-size:clamp(26px,3.4vw,36px);font-weight:700;line-height:1.32;letter-spacing:normal}' +
'#veldy-partners .vp-banner .vp-h .vp-newline{display:block}' +
/* tools section */
'#veldy-partners .vp-tools{margin-top:clamp(56px,7vw,96px);padding-top:20px;border-top:1px solid var(--vp-line)}' +
'#veldy-partners .vp-tools-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(20px,3vw,48px);margin-top:clamp(24px,3vw,40px)}' +
'#veldy-partners .vp-tool{cursor:pointer;text-align:center;padding:clamp(24px,3vw,40px) 0;border:1px solid var(--vp-line);border-radius:12px;transition:border-color .2s}' +
'#veldy-partners .vp-tool:hover{border-color:var(--vp-fg)}' +
'#veldy-partners .vp-tool img{height:clamp(28px,3vw,44px);width:auto;display:inline-block}' +
'#veldy-partners .vp-tool-detail{margin-top:clamp(20px,2.5vw,32px);display:none}' +
'#veldy-partners .vp-tool-detail.active{display:block}' +
'#veldy-partners .vp-tool-detail img{width:100%;border-radius:12px;border:1px solid var(--vp-line)}' +
/* mobile */
'@media(max-width:810px){' +
'#veldy-partners .vp-sub-layout{grid-template-columns:1fr;gap:40px}' +
'#veldy-partners .vp-util-layout{grid-template-columns:1fr;gap:32px}' +
'#veldy-partners .vp-cols{grid-template-columns:1fr;gap:28px}' +
'#veldy-partners .vp-meta{grid-template-columns:1fr auto;gap:8px}' +
'#veldy-partners .vp-meta .m2{display:none}' +
'#veldy-partners .vp-icons{grid-template-columns:repeat(3,1fr);gap:20px}' +
'#veldy-partners .vp-ic-desc{display:none}' +
'#veldy-partners .vp-wv-cols{grid-template-columns:1fr;gap:16px}' +
'#veldy-partners .vp-tools-row{grid-template-columns:1fr;gap:16px}' +
'}';

  /* ── helpers ──────────────────────────────────────────────────── */
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function meta(a, b, c) {
    return '<div class="vp-meta"><span class="m1">' + a + '</span><span class="m2">' + b + '</span><span class="m3">' + c + '</span></div>';
  }

  /* ── HTML builder ────────────────────────────────────────────── */
  function buildHTML() {
    var roleRows = ROLES.map(function (r, i) {
      return '<li class="vp-item"><span class="vp-no">' + pad2(i + 1) + '</span><span class="vp-name">' + r + '</span></li>';
    }).join('');

    var iconGrid = SERVICES.map(function (s) {
      return '<div class="vp-ic"><div class="vp-ic-circle">' + svgIcon(s.icon) + '</div>' +
        '<p class="vp-ic-title">' + s.title + '</p><p class="vp-ic-desc">' + s.desc + '</p></div>';
    }).join('');

    var logoItems = [];
    for (var li = 1; li <= LOGO_COUNT; li++) {
      var idx = (li < 10 ? '0' : '') + li;
      logoItems.push('<span class="vp-ticker-item"><img src="assets/img/logos/logo-' + idx + '.png" alt="" loading="lazy"></span>');
    }
    var tickerItems = logoItems.concat(logoItems).join('');

    var toolsRow = TOOLS.map(function (t) {
      return '<div class="vp-tool" data-tool="' + t.id + '"><img src="' + t.logo + '" alt="' + t.id + '"></div>';
    }).join('');

    var toolDetails = TOOLS.map(function (t) {
      return '<div class="vp-tool-detail" data-tool-detail="' + t.id + '"><img src="' + t.detail + '" alt="' + t.id + ' detail"></div>';
    }).join('');

    return '<div class="vp-inner">' +

      /* ── 1. HERO ─────────────────────────────────────────────── */
      meta('&copy; PARTNERS', '(VELDY&reg; &mdash; 구독)', 'SUBSCRIPTION') +
      '<div class="vp-hero">' +
        '<h2 class="vp-h">1인 급여로 전문 디자이너가<br>포함된 업무팀을 구독하세요.</h2>' +
        '<p class="vp-lede">한 명을 채용하는 비용으로 브랜딩·디자인·마케팅·콘텐츠 전문가로 구성된 팀과 함께하세요. 필요한 기간 동안 월 구독으로 이용하며, 채용과 인력 관리에 드는 부담을 줄일 수 있습니다.</p>' +
        '<div class="vp-actions">' +
          '<a class="vp-btn" href="contact.html">지금 구독하기</a>' +
          '<a class="vp-btn mut" href="https://pf.kakao.com/_WYExcs" target="_blank" rel="noopener">카카오톡 상담</a>' +
        '</div>' +
      '</div>' +

      /* ── 2. WHY SUBSCRIBE (left) + 9 ICONS (right) ────────────── */
      '<div class="vp-sub-layout">' +
        '<div class="vp-sub-left">' +
          '<p class="vp-label">WHY SUBSCRIBE?</p>' +
          '<p class="vp-q">실력있는 전문가가 <strong>필요하신가요?</strong></p>' +
          '<p class="vp-q">직원 때문에 <strong>고민이신가요?</strong></p>' +
          '<p class="vp-q">고용 비용이 <strong>부담이신가요?</strong></p>' +
          '<h3 class="vp-sub-heading">1인 급여로 각 분야 전문가로<br>구성된 팀과 함께하세요</h3>' +
          '<p class="vp-sub-desc">디자이너, 에디터, 마케터, 영상 편집자 등<br>' +
            '필요한 분야 전문가를 모두 고용할 수 있는 방법<br>' +
            '수정할 때 눈치 보지 않고 원하는 만큼 만족할 때까지</p>' +
        '</div>' +
        '<div class="vp-icons">' + iconGrid + '</div>' +
      '</div>' +

      /* ── 5. TWO-COLUMN: REASONS + ROLES (right-aligned list) ── */
      '<div class="vp-block">' +
        meta('&copy; THE TEAM', '(VELDY&reg; &mdash; 20)', 'ROLES') +
        '<div class="vp-cols">' +
          '<div class="vp-reasons">' +
            '<p class="vp-rh">고용 대신 구독해야 하는 이유</p>' +
            '<div class="vp-reason">' +
              '<p class="vp-reason-no">01</p>' +
              '<p class="vp-reason-t">노 인턴<em>!</em></p>' +
              '<p class="vp-reason-t">업무 적응기간이 필요 없습니다</p>' +
            '</div>' +
            '<div class="vp-reason">' +
              '<p class="vp-reason-no">02</p>' +
              '<p class="vp-reason-t">역량이 부족한 직원을</p>' +
              '<p class="vp-reason-t">고용하게 될 위험이 없습니다</p>' +
            '</div>' +
            '<div class="vp-reason">' +
              '<p class="vp-reason-no">03</p>' +
              '<p class="vp-reason-t">해고로 인한 부담이 없습니다</p>' +
              '<p class="vp-reason-t">필요한 기간만큼만 구독하면 됩니다</p>' +
            '</div>' +
          '</div>' +
          '<ul class="vp-list">' + roleRows + '</ul>' +
        '</div>' +
      '</div>' +

      /* ── 6. SCROLLING TICKER — white bg, full bleed ──────────── */
      '<div class="vp-ticker-wrap"><div class="vp-ticker"><div class="vp-ticker-track">' + tickerItems + '</div></div></div>' +

      /* ── 7. WHY VELDY ────────────────────────────────────────── */
      '<div class="vp-wv">' +
        '<p class="vp-label">WHY VELDY?</p>' +
        '<p class="vp-wv-heading">기업들이 밸디의<br>전문가 팀을 구독하는 이유</p>' +
        '<div class="vp-wv-cols">' +
          '<div class="vp-wv-col">' +
            '<p class="vp-wv-ct">01 확실한 일정관리</p>' +
            '<p class="vp-wv-ci">스케줄 관리</p>' +
            '<p class="vp-wv-ci">업무현황 보고</p>' +
            '<p class="vp-wv-ci">카카오톡 상시 소통</p>' +
          '</div>' +
          '<div class="vp-wv-col">' +
            '<p class="vp-wv-ct">02 꼼꼼한 아카이빙</p>' +
            '<p class="vp-wv-ci">브랜드 자료</p>' +
            '<p class="vp-wv-ci">요청 사항</p>' +
            '<p class="vp-wv-ci">수행 비서 서비스</p>' +
          '</div>' +
          '<div class="vp-wv-col">' +
            '<p class="vp-wv-ct">03 합리적인 비용</p>' +
            '<p class="vp-wv-ci">3개월 단기 or 연간 구독</p>' +
            '<p class="vp-wv-ci">1인 급여로 전문가팀 구독</p>' +
            '<p class="vp-wv-ci">적립금 차감 멤버십 제도</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* ── 8. UTILIZE (left) + QUOTES (right) ──────────────────── */
      '<div class="vp-util-layout">' +
        '<div>' +
          '<div class="vp-util">' +
            '<p class="vp-util-sm">밸디 전문가팀</p>' +
            '<h3 class="vp-util-lg">이렇게 활용하세요</h3>' +
          '</div>' +
          '<div class="vp-agency">' +
            '<p class="vp-agency-body">시기별 필요한 업무 의뢰</p>' +
            '<p class="vp-agency-body">밸디는 브랜딩 영역 전반의 전문인력을 갖추고 있어</p>' +
            '<p class="vp-agency-body">업무에 필요한 전문가를 시기에 맞게 투입시켜드립니다</p>' +
          '</div>' +
        '</div>' +
        '<div class="vp-quotes">' +
          '<p class="vp-quote">&ldquo;지금 외부에 있어서요. OO프로젝트 파일 거래처로 보내주세요.&rdquo;</p>' +
          '<p class="vp-quote">&ldquo;제가 깜빡하고 자료를 못가지고 왔어요. OO파일 이메일로 보내주세요.&rdquo;</p>' +
          '<p class="vp-quote">&ldquo;이번 브로슈어는 어떤 종이 재질로 해야 좋을까요?&rdquo;</p>' +
          '<p class="vp-quote">&ldquo;거래처에서 의뢰를 받았는데, 무슨말인지 모르겠어요. 상담 부탁드립니다.&rdquo;</p>' +
        '</div>' +
      '</div>' +

      /* ── 11. BANNER — indent after ! ─────────────────────────── */
      '<div class="vp-banner">' +
        '<p class="vp-banner-label">PARTNERS</p>' +
        '<h3 class="vp-h">외주업체가 아닙니다<em>!</em><br><span class="vp-newline">파트너입니다.</span></h3>' +
        '<div class="vp-actions"><a class="vp-btn" href="contact.html">지금 구독하기</a></div>' +
      '</div>' +

      /* ── 12. TOOLS — monday / gdrive ──────────────────── */
      '<div class="vp-tools">' +
        '<div class="vp-tools-row">' + toolsRow + '</div>' +
        toolDetails +
      '</div>' +

      '</div>';
  }

  /* ── tool detail toggle ──────────────────────────────────────── */
  function initTools(root) {
    root.querySelectorAll('.vp-tool').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-tool');
        root.querySelectorAll('.vp-tool-detail').forEach(function (d) {
          d.classList.toggle('active', d.getAttribute('data-tool-detail') === id && !d.classList.contains('active'));
        });
      });
    });
  }

  /* ── injection logic (outside Framer's React tree) ───────────── */
  function ensureStyle() {
    var el = document.getElementById('veldy-partners-style');
    if (el) { if (el.textContent !== CSS) el.textContent = CSS; return; }
    var s = document.createElement('style');
    s.id = 'veldy-partners-style';
    s.textContent = CSS;
    (document.head || document.documentElement).appendChild(s);
  }

  function getNode() {
    var n = document.getElementById('veldy-partners');
    if (n) return n;
    var sec = document.createElement('section');
    sec.id = 'veldy-partners';
    sec.setAttribute('data-framer-name', 'Partners');
    sec.setAttribute('data-vldy-independent', '1');
    sec.innerHTML = buildHTML();
    initTools(sec);
    return sec;
  }

  var observer = null;
  function placed() {
    var node = document.getElementById('veldy-partners');
    var faq = document.querySelector(FAQ_SEL);
    return !!(node && faq && node.nextElementSibling === faq && node.parentNode === faq.parentNode);
  }

  function place() {
    ensureStyle();
    var faq = document.querySelector(FAQ_SEL);
    if (!faq || !faq.parentNode) return;
    if (placed()) return;
    var node = getNode();
    if (observer) observer.disconnect();
    faq.parentNode.insertBefore(node, faq);
    if (observer) observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  var pending = false;
  function apply() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () { pending = false; try { place(); } catch (e) {} });
  }

  function boot() {
    apply();
    [120, 300, 600, 1000, 1600, 2600, 4000].forEach(function (t) { setTimeout(apply, t); });
    window.addEventListener('load', apply);
    window.addEventListener('resize', apply);
    try {
      observer = new MutationObserver(function () { if (!placed()) apply(); });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
