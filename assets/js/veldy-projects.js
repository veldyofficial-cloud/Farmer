(function(){
  var PROJECTS=[
    {slug:'davinci-code',title:'Davinci Code',count:'06',category:'Branding Design',href:'work/davinci-code.html',bg:'assets/img/projects/home/davinci-code-bg.webp',center:'assets/img/projects/home/davinci-code-center.webp'},
    {slug:'patchking',title:'Patchking',count:'07',category:'Brand Identity',href:'work/patchking.html',bg:'assets/img/projects/home/patchking-bg.webp',center:'assets/img/projects/home/patchking-center.webp'},
    {slug:'soulju',title:'Soulju',count:'08',category:'BI·CI & Profile',href:'work/soulju.html',bg:'assets/img/projects/home/soulju-bg.webp',center:'assets/img/projects/home/soulju-center.webp'},
    {slug:'teoljabi',title:'Teoljabi',count:'09',category:'Web Site & Branding',href:'work/teoljabi.html',bg:'assets/img/projects/home/teoljabi-bg.webp',center:'assets/img/projects/home/teoljabi-center.webp'},
    {slug:'bibimcha',title:'Bibimcha',count:'10',category:'Branding Design',href:'work/bibimcha.html',bg:'assets/img/projects/home/bibimcha-bg.webp',center:'assets/img/projects/home/bibimcha-center.webp'}
  ];

  function ensureStyle(){
    var st=document.getElementById('vp-project-fix-style');
    if(!st){st=document.createElement('style');st.id='vp-project-fix-style';(document.head||document.documentElement).appendChild(st);}
    st.textContent=
      '#vp-home-clones,#vp-work-clones{box-sizing:border-box;width:100%;display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:24px;row-gap:130px;margin:120px 0 0;padding:0;overflow:visible}' +
      '#vp-home-clones>a,#vp-work-clones>a{width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;align-self:start;cursor:none!important}' +
      'section[data-framer-name="Work"] .vp-work-project{width:100%!important;max-width:none!important;min-width:0!important;margin:0!important;align-self:stretch!important}' +
      '#vp-home-clones>a:nth-child(1),#vp-work-clones>a:nth-child(1){grid-column:1 / span 7}' +
      '#vp-home-clones>a:nth-child(2),#vp-work-clones>a:nth-child(2){grid-column:1 / span 5}' +
      '#vp-home-clones>a:nth-child(3),#vp-work-clones>a:nth-child(3){grid-column:8 / span 5;margin-top:110px!important}' +
      '#vp-home-clones>a:nth-child(4),#vp-work-clones>a:nth-child(4){grid-column:3 / span 7}' +
      '#vp-home-clones>a:nth-child(5),#vp-work-clones>a:nth-child(5){grid-column:8 / span 5}' +
      /* HOME: crop background + actual center image only; keep card group/title/count untouched. */
      '#vp-home-clones .vp-project-davinci-code [data-framer-name="Image/Video"],#vp-home-clones .vp-project-teoljabi [data-framer-name="Image/Video"]{position:absolute!important;inset:auto!important;left:50%!important;top:50%!important;height:100%!important;width:auto!important;aspect-ratio:1/1!important;transform:translate(-50%,-50%)!important;border-radius:10px!important;overflow:hidden!important}' +
      '#vp-home-clones .vp-project-patchking [data-framer-name="Image/Video"]{position:absolute!important;inset:auto!important;left:50%!important;top:50%!important;height:100%!important;width:auto!important;aspect-ratio:3/4!important;transform:translate(-50%,-50%)!important;border-radius:10px!important;overflow:hidden!important}' +
      '#vp-home-clones .vp-project-soulju [data-framer-name="Image/Video"]{position:absolute!important;inset:auto!important;left:50%!important;top:50%!important;width:100%!important;height:auto!important;aspect-ratio:2/1!important;transform:translate(-50%,-50%)!important;border-radius:10px!important;overflow:hidden!important}' +

      '#vp-home-clones .vp-project-davinci-code [data-framer-name="Inner Image"],#vp-home-clones .vp-project-patchking [data-framer-name="Inner Image"],#vp-home-clones .vp-project-soulju [data-framer-name="Inner Image"],#vp-home-clones .vp-project-teoljabi [data-framer-name="Inner Image"]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:2!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;overflow:visible!important}' +

      '#vp-home-clones .vp-project-davinci-code [data-framer-name="Inner Image"]>[data-framer-name="Image"],#vp-home-clones .vp-project-teoljabi [data-framer-name="Inner Image"]>[data-framer-name="Image"]{position:relative!important;width:50%!important;height:auto!important;aspect-ratio:1/1!important;flex:none!important;border-radius:10px!important;overflow:hidden!important}' +
      '#vp-home-clones .vp-project-patchking [data-framer-name="Inner Image"]>[data-framer-name="Image"]{position:relative!important;height:50%!important;width:auto!important;aspect-ratio:3/4!important;flex:none!important;border-radius:10px!important;overflow:hidden!important}' +
      '#vp-home-clones .vp-project-soulju [data-framer-name="Inner Image"]>[data-framer-name="Image"]{position:relative!important;width:50%!important;height:auto!important;aspect-ratio:2/1!important;flex:none!important;border-radius:10px!important;overflow:hidden!important}' +

      '#vp-home-clones .vp-project-davinci-code [data-framer-name="Image/Video"] img,#vp-home-clones .vp-project-teoljabi [data-framer-name="Image/Video"] img,#vp-home-clones .vp-project-patchking [data-framer-name="Image/Video"] img,#vp-home-clones .vp-project-soulju [data-framer-name="Image/Video"] img,#vp-home-clones .vp-project-davinci-code [data-framer-name="Inner Image"] img,#vp-home-clones .vp-project-teoljabi [data-framer-name="Inner Image"] img,#vp-home-clones .vp-project-patchking [data-framer-name="Inner Image"] img,#vp-home-clones .vp-project-soulju [data-framer-name="Inner Image"] img{width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;border-radius:inherit!important}' +

      '#vp-home-clones .vp-framer-clone:not(.vp-project-davinci-code):not(.vp-project-patchking):not(.vp-project-soulju):not(.vp-project-teoljabi) [data-framer-name="Image/Video"],#vp-home-clones .vp-framer-clone:not(.vp-project-davinci-code):not(.vp-project-patchking):not(.vp-project-soulju):not(.vp-project-teoljabi) [data-framer-name="Inner Image"],#vp-work-clones [data-framer-name="Image/Video"],#vp-work-clones [data-framer-name="Inner Image"]{position:absolute!important;inset:0!important;width:100%!important;height:100%!important}' +
      '#vp-home-clones .vp-framer-clone:not(.vp-project-davinci-code):not(.vp-project-patchking):not(.vp-project-soulju):not(.vp-project-teoljabi) [data-framer-name="Inner Image"],#vp-work-clones [data-framer-name="Inner Image"]{z-index:2!important;display:flex!important;align-items:center!important;justify-content:center!important;pointer-events:none!important;overflow:visible!important}' +
      '#vp-home-clones .vp-framer-clone:not(.vp-project-davinci-code):not(.vp-project-patchking):not(.vp-project-soulju):not(.vp-project-teoljabi) [data-framer-name="Inner Image"]>[data-framer-name="Image"],#vp-work-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"]{position:relative!important;width:50%!important;height:50%!important;flex:none!important;border-radius:10px!important;overflow:hidden!important}' +
      '#vp-home-clones [data-framer-name="Inner Image"] img,#vp-work-clones [data-framer-name="Inner Image"] img{object-fit:cover!important;object-position:center!important;border-radius:10px!important;transform:scale(1)!important;transition:transform .55s cubic-bezier(.2,.7,.2,1)!important}' +
      '#vp-home-clones [data-framer-name="Image/Video"] img,#vp-work-clones [data-framer-name="Image/Video"] img{object-fit:cover!important;object-position:center!important;transition:filter .35s ease,transform .55s cubic-bezier(.2,.7,.2,1)!important}' +
      '#vp-home-clones .vp-framer-clone:hover [data-framer-name="Image/Video"] img,#vp-work-clones .vp-framer-clone:hover [data-framer-name="Image/Video"] img{filter:brightness(.48)!important;transform:scale(1.01)!important}' +
      '#vp-home-clones .vp-framer-clone:hover [data-framer-name="Inner Image"] img,#vp-work-clones .vp-framer-clone:hover [data-framer-name="Inner Image"] img{transform:scale(1.10)!important}' +

      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Image/Video"] img{filter:brightness(1)!important;transform:scale(1)!important;transition:filter .35s ease-in-out,transform .45s ease-in-out!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"]:hover [data-framer-name="Image/Video"] img{filter:brightness(.46)!important;transform:scale(1.01)!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Inner Image"]>[data-framer-name="Image"]{transform:scale(1)!important;transform-origin:center center!important;transition:transform .45s ease-in-out!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"]:hover [data-framer-name="Inner Image"]>[data-framer-name="Image"]{transform:scale(1.10)!important}' +

      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Banner"]{z-index:7!important;display:flex!important;position:absolute!important;left:0!important;top:50%!important;width:100%!important;height:24px!important;min-height:24px!important;transform:translateY(-50%)!important;overflow:hidden!important;opacity:1!important;pointer-events:none!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Banner"] [data-framer-name="Filler"]{position:absolute!important;inset:0!important;width:100%!important;height:24px!important;top:0!important;background:#fff!important;opacity:0!important;transform:scaleY(0)!important;transform-origin:center center!important;transition:transform .32s ease-in-out,opacity .32s ease-in-out!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"]:hover [data-framer-name="Banner"] [data-framer-name="Filler"]{opacity:1!important;transform:scaleY(1)!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Banner"] [data-framer-name="Text"]{z-index:3!important;opacity:0!important;transform:none!important;margin:auto!important;transition:opacity .26s ease-in-out!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"]:hover [data-framer-name="Banner"] [data-framer-name="Text"]{opacity:1!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Banner"] [data-framer-name="Text"] p{font-family:"Inter Display","Inter Display Placeholder",sans-serif!important;font-size:16px!important;font-weight:600!important;line-height:24px!important;color:#000!important}' +

      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Title"]{height:25px!important;overflow:hidden!important;justify-content:flex-start!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Title"]>[data-framer-name="Text 1"],section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Title"]>[data-framer-name="Text 2"]{height:25px!important;min-height:25px!important;transform:translateY(0)!important;transition:transform .42s ease-in-out!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"]:hover [data-framer-name="Title"]>[data-framer-name="Text 1"],section[data-framer-name="Work"] a[data-framer-name="Project"]:hover [data-framer-name="Title"]>[data-framer-name="Text 2"]{transform:translateY(-25px)!important}' +
      'section[data-framer-name="Work"] a[data-framer-name="Project"] [data-framer-name="Count"]{transform:none!important;rotate:none!important;transition:none!important}' +
      '.vp-view-cursor{position:fixed;z-index:2147483000;left:0;top:0;display:none;pointer-events:none;transform:translate(-50%,-50%);padding:7px 14px 8px;border-radius:999px;background:#fff;color:#000;font-family:"Inter Display","Inter Display Placeholder",sans-serif;font-size:18px;font-weight:700;line-height:1;white-space:nowrap}' +
      '@media(pointer:coarse){#vp-home-clones>a,#vp-work-clones>a{cursor:pointer!important}.vp-view-cursor{display:none!important}}' +
      '@media(max-width:809.98px){section[data-framer-name="Work"] .framer-1ejixw2{gap:24px!important}section[data-framer-name="Work"] .framer-yyr9dg,section[data-framer-name="Work"] .framer-1ep4u7l,section[data-framer-name="Work"] .framer-a02h80{gap:24px!important}#vp-home-clones,#vp-work-clones{grid-template-columns:1fr;row-gap:24px!important;margin-top:0!important}#vp-home-clones>a.vp-framer-clone,#vp-work-clones>a.vp-framer-clone{grid-column:1!important;margin-top:0!important}#vp-home-clones>a:nth-child(1),#vp-home-clones>a:nth-child(2),#vp-home-clones>a:nth-child(3),#vp-home-clones>a:nth-child(4),#vp-home-clones>a:nth-child(5),#vp-work-clones>a:nth-child(1),#vp-work-clones>a:nth-child(2),#vp-work-clones>a:nth-child(3),#vp-work-clones>a:nth-child(4),#vp-work-clones>a:nth-child(5){margin-top:0!important}#vp-home-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"],#vp-work-clones [data-framer-name="Inner Image"]>[data-framer-name="Image"]{width:50%!important;height:50%!important}}';
  }

  function setImg(img,src,alt){
    if(!img)return;
    img.removeAttribute('srcset');img.removeAttribute('sizes');img.removeAttribute('width');img.removeAttribute('height');
    img.setAttribute('loading','lazy');img.setAttribute('decoding','async');
    img.setAttribute('src',src);img.setAttribute('alt',alt||'');
  }

  function cursor(){
    var c=document.getElementById('vp-view-cursor');
    if(!c){c=document.createElement('div');c.id='vp-view-cursor';c.className='vp-view-cursor';c.textContent='VIEW';document.body.appendChild(c);}
    return c;
  }

  function prepareTemplate(template,p){
    var clone=template.cloneNode(true);
    clone.classList.add('vp-framer-clone');
    if(p.slug)clone.classList.add('vp-project-'+p.slug);
    clone.setAttribute('href',p.href);
    clone.querySelectorAll('[id]').forEach(function(n){n.removeAttribute('id');});
    clone.querySelectorAll('[data-framer-appear-id]').forEach(function(n){n.removeAttribute('data-framer-appear-id');});
    clone.querySelectorAll('[data-framer-name="Image/Video"] img').forEach(function(img){setImg(img,p.bg,p.title+' background');});
    clone.querySelectorAll('[data-framer-name="Inner Image"] img').forEach(function(img){setImg(img,p.center,p.title);});
    clone.querySelectorAll('[data-framer-name="Title"] p').forEach(function(n){n.textContent=p.title;});
    clone.querySelectorAll('[data-framer-name="Count"] p').forEach(function(n){n.textContent='('+p.count+')';});
    var templateText=clone.querySelector('[data-framer-name="Banner"] [data-framer-name="Text"]');
    clone.querySelectorAll('[data-framer-name="Banner"]').forEach(function(banner){
      var txt=banner.querySelector('[data-framer-name="Text"]');
      if(!txt&&templateText){txt=templateText.cloneNode(true);banner.insertBefore(txt,banner.firstChild);}
      if(!txt){txt=document.createElement('div');txt.setAttribute('data-framer-name','Text');txt.innerHTML='<p></p>';banner.insertBefore(txt,banner.firstChild);}
      var pp=txt.querySelector('p');if(pp)pp.textContent=p.category;
      var filler=banner.querySelector('[data-framer-name="Filler"]');
      if(!filler){filler=document.createElement('div');filler.setAttribute('data-framer-name','Filler');banner.appendChild(filler);}
    });
    var c=cursor();
    clone.addEventListener('mouseenter',function(){c.style.display='block';});
    clone.addEventListener('mousemove',function(e){c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';});
    clone.addEventListener('mouseleave',function(){c.style.display='none';});
    return clone;
  }

  function buildHost(id,template){
    var host=document.createElement('div');host.id=id;
    PROJECTS.forEach(function(p){host.appendChild(prepareTemplate(template,p));});
    return host;
  }

  function fitRect(maxW,maxH,ratio){
    if(!maxW||!maxH)return {w:0,h:0};
    var w=maxW,h=w/ratio;
    if(h>maxH){h=maxH;w=h*ratio;}
    return {w:Math.round(w),h:Math.round(h)};
  }

  function applyHomeImageCrops(){
    var host=document.getElementById('vp-home-clones');if(!host)return;

    // Mobile: projects 06-10 follow the same edge-to-edge card width as projects 01-05 / Work page.
    if(window.matchMedia&&window.matchMedia('(max-width:809.98px)').matches){
      host.querySelectorAll('.vp-framer-clone').forEach(function(card){
        card.style.setProperty('width','100%','important');
        card.style.setProperty('max-width','none','important');

        card.querySelectorAll('[data-framer-name="Image/Video"]').forEach(function(bg){
          bg.style.setProperty('position','absolute','important');
          bg.style.setProperty('inset','0','important');
          bg.style.setProperty('left','0','important');
          bg.style.setProperty('top','0','important');
          bg.style.setProperty('right','0','important');
          bg.style.setProperty('bottom','0','important');
          bg.style.setProperty('width','100%','important');
          bg.style.setProperty('height','100%','important');
          bg.style.setProperty('aspect-ratio','auto','important');
          bg.style.setProperty('transform','none','important');
          bg.style.setProperty('border-radius','10px','important');
          bg.style.setProperty('overflow','hidden','important');
          bg.querySelectorAll('img').forEach(function(img){
            img.style.setProperty('width','100%','important');
            img.style.setProperty('height','100%','important');
            img.style.setProperty('object-fit','cover','important');
            img.style.setProperty('object-position','center center','important');
          });
        });

        card.querySelectorAll('[data-framer-name="Inner Image"]').forEach(function(inner){
          inner.style.setProperty('position','absolute','important');
          inner.style.setProperty('inset','0','important');
          inner.style.setProperty('width','100%','important');
          inner.style.setProperty('height','100%','important');
          inner.style.setProperty('display','flex','important');
          inner.style.setProperty('align-items','center','important');
          inner.style.setProperty('justify-content','center','important');
          var frame=inner.querySelector(':scope > [data-framer-name="Image"]');
          if(frame){
            frame.style.setProperty('position','relative','important');
            frame.style.setProperty('width','50%','important');
            frame.style.setProperty('height','50%','important');
            frame.style.setProperty('aspect-ratio','auto','important');
            frame.style.setProperty('flex','none','important');
          }
        });

        card.querySelectorAll('[data-framer-name="Banner"]').forEach(function(banner){
          banner.style.setProperty('left','0','important');
          banner.style.setProperty('width','100%','important');
          banner.style.setProperty('transform','translateY(-50%)','important');
        });
        card.querySelectorAll('[data-framer-name="Bottom"]').forEach(function(bottom){
          bottom.style.setProperty('width','100%','important');
          bottom.style.setProperty('max-width','none','important');
          bottom.style.setProperty('align-self','stretch','important');
          bottom.style.setProperty('margin-left','0','important');
          bottom.style.setProperty('margin-right','0','important');
        });
      });
      return;
    }

    var ratios={
      'davinci-code':1,
      'patchking':3/4,
      'soulju':2,
      'teoljabi':1
    };
    var alignToCrop={
      'davinci-code':true,
      'patchking':true,
      'teoljabi':true
    };
    Object.keys(ratios).forEach(function(slug){
      var card=host.querySelector('.vp-project-'+slug);if(!card)return;
      var top=card.querySelector('[data-framer-name="Top"]');if(!top)return;
      var tw=top.clientWidth||top.getBoundingClientRect().width;
      var th=top.clientHeight||top.getBoundingClientRect().height;
      if(!tw||!th)return;
      var ratio=ratios[slug];
      var outer=fitRect(tw,th,ratio);

      card.querySelectorAll('[data-framer-name="Image/Video"]').forEach(function(bg){
        bg.style.setProperty('position','absolute','important');
        bg.style.setProperty('inset','auto','important');
        bg.style.setProperty('left','50%','important');
        bg.style.setProperty('top','50%','important');
        bg.style.setProperty('width',outer.w+'px','important');
        bg.style.setProperty('height',outer.h+'px','important');
        bg.style.setProperty('transform','translate(-50%,-50%)','important');
        bg.style.setProperty('border-radius','10px','important');
        bg.style.setProperty('overflow','hidden','important');
        bg.querySelectorAll('img').forEach(function(img){
          img.style.setProperty('width','100%','important');
          img.style.setProperty('height','100%','important');
          img.style.setProperty('object-fit','cover','important');
          img.style.setProperty('object-position','center center','important');
          img.style.setProperty('border-radius','inherit','important');
        });
      });

      card.querySelectorAll('[data-framer-name="Inner Image"]').forEach(function(inner){
        inner.style.setProperty('position','absolute','important');
        inner.style.setProperty('inset','0','important');
        inner.style.setProperty('width','100%','important');
        inner.style.setProperty('height','100%','important');
        inner.style.setProperty('display','flex','important');
        inner.style.setProperty('align-items','center','important');
        inner.style.setProperty('justify-content','center','important');
        inner.style.setProperty('overflow','visible','important');

        var frame=inner.querySelector(':scope > [data-framer-name="Image"]');if(!frame)return;
        var r=fitRect(tw*.5,th*.5,ratio);
        frame.style.setProperty('position','relative','important');
        frame.style.setProperty('width',r.w+'px','important');
        frame.style.setProperty('height',r.h+'px','important');
        frame.style.setProperty('flex','none','important');
        frame.style.setProperty('border-radius','10px','important');
        frame.style.setProperty('overflow','hidden','important');
        frame.querySelectorAll('img').forEach(function(img){
          img.style.setProperty('width','100%','important');
          img.style.setProperty('height','100%','important');
          img.style.setProperty('object-fit','cover','important');
          img.style.setProperty('object-position','center center','important');
          img.style.setProperty('border-radius','inherit','important');
        });
      });

      if(alignToCrop[slug]){
        card.querySelectorAll('[data-framer-name="Banner"]').forEach(function(banner){
          banner.style.setProperty('left','50%','important');
          banner.style.setProperty('width',outer.w+'px','important');
          banner.style.setProperty('transform','translate(-50%,-50%)','important');
        });
        card.querySelectorAll('[data-framer-name="Bottom"]').forEach(function(bottom){
          bottom.style.setProperty('width',outer.w+'px','important');
          bottom.style.setProperty('max-width',outer.w+'px','important');
          bottom.style.setProperty('align-self','center','important');
          bottom.style.setProperty('margin-left','auto','important');
          bottom.style.setProperty('margin-right','auto','important');
        });
      }
    });
  }

  function findTemplate(sec){
    return sec.querySelector('a[data-framer-name="Project"][href="work/crystaloz.html"]') ||
           sec.querySelector('a[data-framer-name="Project"][href$="/work/crystaloz.html"]') ||
           [].slice.call(sec.querySelectorAll('a[data-framer-name="Project"]')).filter(function(a){return /Crystal\s*OZ/i.test(a.textContent||'');})[0];
  }

  function injectHome(){
    var old=document.getElementById('vp-home-clones');if(old)old.remove();
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var cards=sec.querySelector('[data-framer-name="Cards"]');if(!cards)return;
    var template=findTemplate(sec);if(!template)return;
    cards.appendChild(buildHost('vp-home-clones',template));
    requestAnimationFrame(applyHomeImageCrops);
    setTimeout(applyHomeImageCrops,80);
    setTimeout(applyHomeImageCrops,300);
  }

  function injectWork(){
    var old=document.getElementById('vp-work-clones');if(old)old.remove();
    document.querySelectorAll('.vp-work-project').forEach(function(n){n.remove();});
    var sec=document.querySelector('section[data-framer-name="Work"]');if(!sec)return;
    var num=sec.querySelector('[data-framer-name="Number"] h3');if(num)num.textContent='(10)';
    var template=findTemplate(sec);if(!template)return;
    var parent=template.parentElement||sec;
    PROJECTS.forEach(function(p){
      var card=prepareTemplate(template,p);
      card.classList.add('vp-work-project');
      parent.appendChild(card);
    });
  }

  function run(){
    ensureStyle();
    var path=(location.pathname||'').toLowerCase();
    var clean=path.replace(/\/+$/,'');
    var file=(clean.split('/').pop()||'');
    if(file===''||file==='index.html'||file==='farmer'){if(!document.getElementById('vp-home-clones'))injectHome();}
    if((file==='work'||file==='work.html')&&!document.querySelector('.vp-work-project'))injectWork();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
  [80,250,600,1200,2500,5000].forEach(function(t){setTimeout(function(){run();applyHomeImageCrops();},t);});
  window.addEventListener('resize',function(){requestAnimationFrame(applyHomeImageCrops);});
})();