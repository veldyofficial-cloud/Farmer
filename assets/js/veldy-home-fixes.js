(function(){
  var STYLE_ID='veldy-home-fixes-style';

  function ensureStyle(){
    var st=document.getElementById(STYLE_ID);
    if(st)return; // rewriting the style would re-trigger the MutationObserver below on every frame
    st=document.createElement('style');
    st.id=STYLE_ID;
    (document.head||document.documentElement).appendChild(st);
    st.textContent=
      'html,body{overflow-x:clip!important}' +
      'section[data-framer-name="Testimonial"],section[data-framer-name="Testimonial"] [data-framer-name="Container"]{overflow:visible!important}' +
      'section[data-framer-name="Testimonial"] [data-framer-name="Container"]{position:relative!important;align-items:stretch!important}' +
      'section[data-framer-name="Testimonial"] [data-framer-name="Container"]>[data-framer-name="Sticky"]{position:-webkit-sticky!important;position:sticky!important;top:0!important;height:100vh!important;min-height:100vh!important;z-index:1!important;align-self:stretch!important;overflow:visible!important}' +
      'section[data-framer-name="Testimonial"] [data-framer-name="Testimonial Cards"]{position:relative!important;z-index:2!important}' +
      'section[data-framer-name="Client"],section[data-framer-name="Client"] [data-framer-name="Scroll Animation Section"]{overflow:visible!important}' +
      'section[data-framer-name="Client"] [data-framer-name="Scroll Animation Section"]{position:relative!important;min-height:2100px!important;height:auto!important}' +
      'section[data-framer-name="Client"] [data-framer-name="Scroll Animation Section"]>[data-framer-name="Sticky"]{position:-webkit-sticky!important;position:sticky!important;top:0!important;height:100vh!important;min-height:100vh!important;z-index:2!important;align-self:stretch!important;overflow:visible!important}' +
      '.framer-l8tp04,.framer-hrs0gc,.framer-1ue40ad,.framer-bngqg2,.framer-1snsm42,.framer-1oqrrs3{width:100vw!important;max-width:none!important;position:relative!important;left:50%!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.framer-dlgb9u-container{width:100vw!important;max-width:none!important;position:relative!important;left:50%!important;margin-left:-50vw!important;margin-right:-50vw!important}' +
      '.framer-dlgb9u-container>.framer-YOzNv{width:100%!important;max-width:none!important}' +
      '@media(max-width:809.98px){section[data-framer-name="Client"] [data-framer-name="Scroll Animation Section"]{min-height:1500px!important}section[data-framer-name="Testimonial"] [data-framer-name="Container"]>[data-framer-name="Sticky"],section[data-framer-name="Client"] [data-framer-name="Scroll Animation Section"]>[data-framer-name="Sticky"]{height:100svh!important;min-height:100svh!important}}';
  }

  function important(el,prop,val){
    if(el)el.style.setProperty(prop,val,'important');
  }

  var ARTICLE_CARD_SELECTOR='a.framer-15ho39z,a.framer-h0rdv8,a.framer-1su5na9,a.framer-14bojy4';

  function disableArticleCards(){
    document.querySelectorAll(ARTICLE_CARD_SELECTOR).forEach(function(card){
      card.removeAttribute('href');
      card.removeAttribute('target');
      card.setAttribute('data-veldy-article-disabled','1');
      card.style.setProperty('cursor','default','important');
      card.querySelectorAll('[data-framer-cursor]').forEach(function(el){
        el.removeAttribute('data-framer-cursor');
        el.style.setProperty('cursor','default','important');
      });
    });
  }

  function blockArticleCardClick(e){
    var card=e.target&&e.target.closest&&e.target.closest(ARTICLE_CARD_SELECTOR);
    if(!card)return;
    e.preventDefault();
    e.stopPropagation();
    if(e.stopImmediatePropagation)e.stopImmediatePropagation();
  }

  function repair(){
    ensureStyle();
    disableArticleCards();

    var testimonial=document.querySelector('section[data-framer-name="Testimonial"]');
    var tContainer=testimonial&&testimonial.querySelector('[data-framer-name="Container"]');
    var tSticky=tContainer&&tContainer.querySelector(':scope > [data-framer-name="Sticky"]');
    var tCards=testimonial&&testimonial.querySelector('[data-framer-name="Testimonial Cards"]');

    important(testimonial,'overflow','visible');
    important(tContainer,'overflow','visible');
    important(tContainer,'position','relative');
    if(tSticky){
      important(tSticky,'position','sticky');
      important(tSticky,'top','0');
      important(tSticky,'height',window.innerWidth<=809?'100svh':'100vh');
      important(tSticky,'min-height',window.innerWidth<=809?'100svh':'100vh');
      important(tSticky,'z-index','1');
      important(tSticky,'overflow','visible');
    }
    if(tCards){
      important(tCards,'position','relative');
      important(tCards,'z-index','2');
    }

    var client=document.querySelector('section[data-framer-name="Client"]');
    var cScroll=client&&client.querySelector('[data-framer-name="Scroll Animation Section"]');
    var cSticky=cScroll&&cScroll.querySelector(':scope > [data-framer-name="Sticky"]');

    important(client,'overflow','visible');
    important(cScroll,'overflow','visible');
    important(cScroll,'position','relative');
    important(cScroll,'height','auto');
    important(cScroll,'min-height',window.innerWidth<=809?'1500px':'2100px');
    if(cSticky){
      important(cSticky,'position','sticky');
      important(cSticky,'top','0');
      important(cSticky,'height',window.innerWidth<=809?'100svh':'100vh');
      important(cSticky,'min-height',window.innerWidth<=809?'100svh':'100vh');
      important(cSticky,'z-index','2');
      important(cSticky,'overflow','visible');
    }

  }

  var queued=false;
  function schedule(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(function(){queued=false;repair();});
  }

  document.addEventListener('click',blockArticleCardClick,true);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair);else repair();
  [60,220,600,1200,2500,5000].forEach(function(t){setTimeout(repair,t);});
  window.addEventListener('load',repair);
  window.addEventListener('resize',schedule);
  try{new MutationObserver(schedule).observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
})();