(function(){
  var STYLE_ID='veldy-global-fullbleed-style';
  var FULL='veldy-section-fullbleed';
  var STRIP='veldy-section-strip';
  var TICKER='veldy-section-logo-ticker';
  var MARQUEE='veldy-fullbleed-marquee';
  var MARQUEE_ANCESTOR='veldy-fullbleed-marquee-ancestor';
  var LINE='veldy-section-divider';

  function style(){
    var s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;(document.head||document.documentElement).appendChild(s);}
    s.textContent=
      'html,body{overflow-x:clip!important}' +
      '.'+FULL+'{box-sizing:border-box!important;width:100vw!important;max-width:none!important;min-width:100vw!important;position:relative!important;left:50%!important;right:auto!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.'+FULL+'-parent{overflow:visible!important}' +
      'body [data-framer-name="Line"].'+LINE+'.'+LINE+'{box-sizing:border-box!important;flex:none!important;width:min(100%,1480px,calc(100vw - 48px))!important;min-width:0!important;max-width:1480px!important;align-self:center!important;position:relative!important;left:auto!important;right:auto!important;margin-left:auto!important;margin-right:auto!important}' +
      '.'+STRIP+'{overflow:hidden!important;justify-content:flex-start!important;gap:0!important}' +
      '.'+STRIP+'>.veldy-strip-track{display:flex!important;flex:none!important;width:max-content!important;animation:veldyStripMove 34s linear infinite!important;will-change:transform}' +
      '.'+STRIP+' .veldy-strip-group{display:flex!important;flex:none!important;width:100vw!important;min-width:100vw!important;align-items:center!important;justify-content:space-around!important;gap:48px!important}' +
      '.'+STRIP+' .veldy-strip-group>*{flex:none!important}' +
      '.'+MARQUEE+'{box-sizing:border-box!important;width:100vw!important;min-width:100vw!important;max-width:none!important;position:relative!important;left:auto!important;right:auto!important;margin-left:calc(50% - 50vw)!important;margin-right:calc(50% - 50vw)!important;overflow:hidden!important}' +
      '.'+MARQUEE_ANCESTOR+'{overflow:visible!important}' +
      '.'+MARQUEE+' .framer-l8l2zr-container{width:100%!important;min-width:100%!important;max-width:none!important}' +
      '.'+MARQUEE+' .framer-l8l2zr-container>section{width:100%!important;min-width:100%!important;max-width:none!important}' +
      'section[data-framer-name="Services"]{overflow:visible!important}' +
      'section[data-framer-name="Services"] .framer-dlgb9u-container{box-sizing:border-box!important;flex:none!important;width:100vw!important;min-width:100vw!important;max-width:none!important;align-self:center!important;position:relative!important;left:auto!important;right:auto!important;margin-left:0!important;margin-right:0!important;transform:none!important;overflow:visible!important;background:#fff!important;z-index:2!important}' +
      'section[data-framer-name="Services"] .framer-dlgb9u-container>.framer-YOzNv{box-sizing:border-box!important;width:100%!important;min-width:100%!important;max-width:none!important;position:relative!important;left:auto!important;right:auto!important;margin-left:0!important;margin-right:0!important;transform:none!important;overflow:hidden!important}' +
      'footer .framer-drotkq-container,footer .framer-ic9f1x{box-sizing:border-box!important;width:min(100%,1480px,calc(100vw - 48px))!important;min-width:0!important;max-width:1480px!important;align-self:center!important;position:relative!important;left:auto!important;right:auto!important;margin-left:auto!important;margin-right:auto!important;transform:none!important}' +
      '@keyframes veldyStripMove{from{transform:translateX(0)}to{transform:translateX(-100vw)}}' +
      '@keyframes veldyStripMoveMobile{from{transform:translateX(0)}to{transform:translateX(-50%)}}' +
      '@media(max-width:809px){body [data-framer-name="Line"].'+LINE+'.'+LINE+'{width:min(100%,calc(100vw - 40px))!important;max-width:none!important}footer .framer-drotkq-container,footer .framer-ic9f1x{width:min(100%,calc(100vw - 40px))!important;max-width:none!important}.'+STRIP+'>.veldy-strip-track{animation:veldyStripMoveMobile 30s linear infinite!important}.'+STRIP+' .veldy-strip-group{box-sizing:border-box!important;width:max-content!important;min-width:100vw!important;justify-content:flex-start!important;gap:72px!important;padding:0 40px!important}}';
  }

  function rgbWhite(v){
    if(!v||v==='transparent'||v==='rgba(0, 0, 0, 0)')return false;
    var m=v.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/i);
    return !!m && (+m[1]>=235&&+m[2]>=235&&+m[3]>=235);
  }

  function add(el){
    if(!el||!el.classList)return;
    el.classList.add(FULL);
    if(el.parentElement)el.parentElement.classList.add(FULL+'-parent');
  }

  function interactiveAncestorBeforeSection(el){
    var p=el.parentElement;
    while(p && p.tagName!=='SECTION' && p.tagName!=='BODY'){
      if(p.tagName==='A' || p.hasAttribute('data-framer-cursor'))return true;
      p=p.parentElement;
    }
    return false;
  }

  function richDirect(el){
    return [].slice.call(el.children||[]).filter(function(ch){
      return ch.matches('[data-framer-component-type="RichTextContainer"]');
    });
  }

  function makeTextStrip(el){
    if(!el||el.classList.contains(STRIP)||el.querySelector('.veldy-strip-track'))return;
    var kids=richDirect(el);
    if(kids.length<4)return;
    var group=document.createElement('div');group.className='veldy-strip-group';
    kids.forEach(function(k){group.appendChild(k);});
    var clone=group.cloneNode(true);
    var track=document.createElement('div');track.className='veldy-strip-track';
    track.appendChild(group);track.appendChild(clone);
    el.appendChild(track);
    el.classList.add(STRIP);
  }

  function markTextStrips(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('body *').forEach(function(el){
      if(el.closest('section[data-framer-name="Testimonial"],section[data-framer-name="Client"]'))return;
      if(el.closest('.veldy-strip-track'))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height||r.height<12||r.height>90)return;
      if(r.width<Math.min(vw*.45,480))return;
      if(!rgbWhite(getComputedStyle(el).backgroundColor))return;
      if(el.querySelectorAll('img').length>0)return;
      var kids=richDirect(el);
      if(kids.length<4||kids.length>8)return;
      add(el);makeTextStrip(el);
    });
  }

  function targetMarqueePage(){
    var p=(location.pathname||'').toLowerCase().replace(/\/+$/,'');
    var last=(p.split('/').pop()||'');
    if(last===''||last==='index.html'||last==='farmer')return true;
    if(last==='work'||last==='work.html')return true;
    return p.indexOf('/work/')!==-1;
  }

  function markHeaderMarquees(){
    if(!targetMarqueePage())return;
    document.querySelectorAll('.framer-rEGzF').forEach(function(el){
      if(!el.querySelector('[data-framer-name="Header Text"]'))return;
      if(!el.classList.contains(MARQUEE))el.classList.add(MARQUEE);
      var p=el.parentElement;
      while(p&&p!==document.body&&p!==document.documentElement){
        p.classList.add(MARQUEE_ANCESTOR);
        if(p.tagName==='SECTION'&&p.hasAttribute('data-framer-name'))break;
        p=p.parentElement;
      }
    });
  }

  function forceTextStripFullBleed(el){
    if(!el)return;
    add(el);
    makeTextStrip(el);
    var p=el.parentElement;
    while(p&&p!==document.body&&p!==document.documentElement){
      p.classList.add(FULL+'-parent');
      if(p.tagName==='SECTION')break;
      p=p.parentElement;
    }
  }

  function markRequestedFullBleedStrips(){
    document.querySelectorAll('section[data-framer-name="Services"] .framer-dlgb9u-container > .framer-YOzNv').forEach(function(el){
      if(!el)return;
      el.classList.remove(FULL);
      makeTextStrip(el);
      var p=el.parentElement;
      while(p&&p!==document.body&&p!==document.documentElement){
        p.classList.add(FULL+'-parent');
        if(p.tagName==='SECTION')break;
        p=p.parentElement;
      }
    });
    [
      'section[data-framer-name="Experience"] .framer-1tu45ze-container > .framer-YOzNv',
      'section[data-framer-name="Contact"] .framer-aizku7-container > .framer-YOzNv'
    ].forEach(function(sel){
      document.querySelectorAll(sel).forEach(forceTextStripFullBleed);
    });
  }

  function repairDosigokganTitle(){
    document.querySelectorAll('[id="raven-claw-card-3"] .framer-2dlte1 h3').forEach(function(el){
      if((el.textContent||'').trim()!=='Dosigokgan')el.textContent='Dosigokgan';
    });
  }

  function markLogoTickers(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('body *').forEach(function(el){
      if(el.closest('section[data-framer-name="Testimonial"],section[data-framer-name="Client"]'))return;
      if(el.classList.contains(TICKER))return;
      var r=el.getBoundingClientRect();
      if(!r.width||!r.height||r.height<45||r.height>190)return;
      if(r.width<Math.min(vw*.6,650))return;
      if(!rgbWhite(getComputedStyle(el).backgroundColor))return;
      if(el.querySelectorAll('img').length<5)return;
      add(el);el.classList.add(TICKER);
    });
  }

  function markSectionLines(){
    var vw=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);
    document.querySelectorAll('[data-framer-name="Line"]').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(!r.width||r.width<Math.min(vw*.48,520)||r.height>3)return;
      if(interactiveAncestorBeforeSection(el))return;
      el.classList.remove(FULL);
      el.classList.add(LINE);
    });
  }

  function repair(){
    style();
    document.querySelectorAll('header,footer').forEach(add);
    markSectionLines();
    markTextStrips();
    markRequestedFullBleedStrips();
    repairDosigokganTitle();
    markHeaderMarquees();
    markLogoTickers();
  }

  var queued=false;
  function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;repair();});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
  [60,220,600,1200,2500,5000].forEach(function(t){setTimeout(repair,t);});
  window.addEventListener('load',repair);
  window.addEventListener('resize',schedule);
  try{new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();

/* KakaoTalk floating contact button: fixed across all VELDY pages (desktop + mobile). */
(function () {
  var ID = 'veldy-kakao-floating';
  var STYLE_ID = 'veldy-kakao-floating-style';
  var KAKAO_URL = 'https://pf.kakao.com/_WYExcs';
  var IMAGE_URL = 'https://vendor-cdn.imweb.me/images/kakao-talk-button-default.svg';

  function mount() {
    if (!document.body || document.getElementById(ID)) return;

    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent =
        '#' + ID + '{position:fixed;right:24px;bottom:24px;width:64px;height:64px;z-index:2147483000;display:flex;align-items:center;justify-content:center;cursor:pointer;line-height:0;touch-action:manipulation;transition:transform .2s ease}' +
        '#' + ID + ':hover{transform:translateY(-3px)}' +
        '#' + ID + ':focus-visible{outline:3px solid #ffe812;outline-offset:4px;border-radius:50%}' +
        '#' + ID + ' img{display:block;width:100%;height:100%;object-fit:contain}' +
        '@media(max-width:767px){#' + ID + '{width:56px;height:56px;right:16px;bottom:calc(16px + env(safe-area-inset-bottom, 0px))}}' +
        '@media(prefers-reduced-motion:reduce){#' + ID + '{transition:none}}';
      (document.head || document.documentElement).appendChild(style);
    }

    var a = document.createElement('a');
    a.id = ID;
    a.href = KAKAO_URL;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', '카카오톡 문의하기');
    a.setAttribute('title', '카카오톡 문의하기');
    var img = document.createElement('img');
    img.src = IMAGE_URL;
    img.alt = '';
    img.width = 64;
    img.height = 64;
    img.decoding = 'async';
    a.appendChild(img);
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
