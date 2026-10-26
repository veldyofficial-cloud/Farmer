/*
 * veldy-contact.js — local (non-Framer) enhancements
 *
 * Renders an independent "Contact" element that is NOT part of Framer's DOM (so
 * Framer's responsive re-renders can never delete it), positioned to sit right
 * after the "Kakao" link and styled to match its siblings (Instagram / Blog /
 * Kakao). On hover the label plays the same per-letter "rolling text" animation
 * the Framer nav items use.
 *
 * Clicking any Contact affordance opens the shared PROJECT INQUIRY form — that
 * form and its open/submit logic live in veldy-inquiry.js, which delegates on
 * #vc-contact, so this file only has to build and place the element. We also fix
 * the broken contact-page email link so it opens Gmail.
 */
(function () {
  var EMAIL = 'veldy.official@gmail.com';
  var GMAIL = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(EMAIL);
  var BROKEN = 'https://veldy.official@gmail.com';

  // Rolling-text timing, matched to the Framer "Rolling Text" component
  // (Wt4XK6WYf.mjs): translateY(-lineHeight) per letter, staggered.
  var LINE = 17;                 // default line-height in px (nav label metrics)
  var ROLL_DUR = 0.5;            // seconds
  var ROLL_STAGGER = 0.35;       // fraction (component default 35%)
  var ROLL_EASE = 'cubic-bezier(.82,.08,.29,1)';
  var NBSP = String.fromCharCode(160);

  function ensureStyle() {
    if (document.getElementById('veldy-contact-style')) return;
    var css =
      '#vc-contact{z-index:2147483000;cursor:pointer;-webkit-font-smoothing:antialiased;text-decoration:none}' +
      '#vc-contact .vc-roll{display:inline-flex;overflow:hidden;height:var(--vc-line,' + LINE + 'px);line-height:var(--vc-line,' + LINE + 'px);vertical-align:top;padding:0}' +
      '#vc-contact .vc-ch{display:block;white-space:pre;color:inherit;text-shadow:0 var(--vc-line,' + LINE + 'px) 0 currentColor;transition:transform ' + ROLL_DUR + 's ' + ROLL_EASE + ';-webkit-backface-visibility:hidden;backface-visibility:hidden}' +
      '#vc-contact:hover .vc-ch{transform:translateY(calc(-1 * var(--vc-line,' + LINE + 'px)))}' +
      '#vc-contact.vc-footer-contact{position:relative!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;flex:none!important;overflow:hidden!important;box-sizing:border-box!important;padding:12px 18px!important;border:2px solid #fff!important;border-radius:259px!important;background:transparent!important;color:#fff!important;font-family:"Inter Display","Inter Display Placeholder",sans-serif!important;font-size:23px!important;font-weight:700!important;letter-spacing:-.3px!important;line-height:20px!important;text-transform:uppercase!important}' +
      '#vc-contact.vc-footer-contact .vc-footer-fill{position:absolute!important;left:0!important;right:0!important;height:6px!important;top:calc(115.909% - 3px)!important;background:#fff!important;border-radius:30px!important;transition:height .45s cubic-bezier(.82,.08,.29,1),top .45s cubic-bezier(.82,.08,.29,1)!important;pointer-events:none!important}' +
      '#vc-contact.vc-footer-contact:hover .vc-footer-fill{height:186px!important;top:calc(115.909% - 93px)!important}' +
      '#vc-contact.vc-footer-contact .vc-footer-label{position:relative!important;z-index:1!important;mix-blend-mode:difference!important;display:flex!important;overflow:hidden!important;height:20px!important;line-height:20px!important;margin:0!important;padding:0!important;white-space:nowrap!important}' +
      '#vc-contact.vc-footer-contact .vc-footer-label span{display:block!important;flex:none!important;font:inherit!important;line-height:20px!important;white-space:pre!important;text-shadow:0 20px 0 currentColor!important;transition:transform .5s cubic-bezier(.82,.08,.29,1)!important}' +
      '#vc-contact.vc-footer-contact:hover .vc-footer-label span{transform:translateY(-20px)!important}' +
      '@media(max-width:809.98px){#vc-contact.vc-footer-contact{padding:8px 14px!important;font-size:16px!important;line-height:16px!important}#vc-contact.vc-footer-contact .vc-footer-label{height:16px!important;line-height:16px!important}#vc-contact.vc-footer-contact .vc-footer-label span{line-height:16px!important;text-shadow:0 16px 0 currentColor!important}#vc-contact.vc-footer-contact:hover .vc-footer-label span{transform:translateY(-16px)!important}}';
    var s = document.createElement('style');
    s.id = 'veldy-contact-style';
    s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  // Open the shared inquiry form. veldy-inquiry.js also delegates clicks on
  // #vc-contact, but calling directly keeps it working even if load order slips.
  function openInquiry(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (window.VeldyInquiry && window.VeldyInquiry.open) window.VeldyInquiry.open();
  }

  function visible(a) { var r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0; }

  // Turn a container into a per-letter rolling label: one .vc-ch span per character,
  // each with a staggered transition-delay so hover rolls the letters up one after
  // another (matching Framer's Rolling Text). Font/colour are inherited from `wrap`.
  function fillRolling(wrap, text) {
    wrap.classList.add('vc-roll');
    wrap.textContent = '';
    var n = text.length;
    for (var i = 0; i < n; i++) {
      var span = document.createElement('span');
      span.className = 'vc-ch';
      span.textContent = text[i] === ' ' ? NBSP : text[i];
      var delay = n > 0 ? (ROLL_DUR / n) * i * ROLL_STAGGER : 0;
      span.style.transitionDelay = delay.toFixed(3) + 's';
      wrap.appendChild(span);
    }
    return wrap;
  }
  function buildRollingLabel(text) {
    return fillRolling(document.createElement('span'), text);
  }

  // replace the visible text ("kakao") of a cloned row with a new label
  function relabelText(root, label) {
    [].forEach.call(root.querySelectorAll('*'), function (n) {
      if (n.childElementCount === 0 && /^kakao$/i.test((n.textContent || '').trim())) n.textContent = label;
    });
  }

  // Convert the cloned Primary row's label into the same per-letter rolling label so
  // it rolls on hover like the footer link. The row stacks two identical text copies
  // ("Text 1"/"Text 2") for Framer's own hover swap; we keep the first (its preset
  // font/colour) and drop the rest so nothing shows doubled. Runs after the clone is
  // in the DOM so the line-height can be measured.
  function makePrimaryRolling(el) {
    var texts = el.querySelector('[data-framer-name="Texts"]');
    if (!texts) return;
    var blocks = texts.querySelectorAll('[data-framer-name^="Text"]');
    if (!blocks.length) return;
    for (var i = blocks.length - 1; i >= 1; i--) blocks[i].parentNode.removeChild(blocks[i]);
    var p = blocks[0].querySelector('p') || blocks[0];
    var lh = parseFloat(getComputedStyle(p).lineHeight);
    if (!lh || isNaN(lh)) lh = (parseFloat(getComputedStyle(p).fontSize) || 16) * 1.2;
    var label = (p.textContent || 'Contact').trim();
    p.style.setProperty('--vc-line', lh + 'px');
    p.style.margin = '0';
    fillRolling(p, label);
  }

  function relabelBttClone(root, label) {
    var p = root.querySelector('.framer-ultjt1-container p') || root.querySelector('p');
    if (!p) return;
    var old = [].slice.call(p.querySelectorAll('span'));
    var proto = old[0] ? old[0].cloneNode(false) : document.createElement('span');
    old.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });
    label.split('').forEach(function (ch) {
      var sp = proto.cloneNode(false);
      sp.textContent = ch;
      p.appendChild(sp);
    });
  }

  function buttonLabel(a) {
    var p = a && a.querySelector ? a.querySelector('p[class*="rolling-text-inner"]') : null;
    if (!p) return '';
    return [].map.call(p.querySelectorAll('span'), function (s) { return s.textContent; }).join('').replace(/\s+/g, '').toLowerCase();
  }

  function findCanonicalContact() {
    var all = [].slice.call(document.querySelectorAll('a.framer-znJo4[href="contact.html"]'));
    return all.filter(function (a) { return visible(a) && buttonLabel(a) === 'contact'; })[0] || null;
  }

  // Build the Contact element once. On contact.html we clone the "Primary" kakao row
  // so the arrow, divider line and typography match exactly; elsewhere we build a
  // rolling-text link matching the footer social row.
  function getEl(mode, anchor) {
    var el = document.getElementById('vc-contact');
    if (el) return el;
    ensureStyle();

    if (mode === 'primary' && anchor) {
      el = anchor.cloneNode(true);
      el.removeAttribute('href');
      el.removeAttribute('target');
      el.removeAttribute('data-framer-appear-id');
      el.style.opacity = '1';
      el.style.transform = 'none';
      [].forEach.call(el.querySelectorAll('[data-framer-appear-id]'), function (n) {
        n.removeAttribute('data-framer-appear-id');
        n.style.opacity = '1';
        n.style.transform = 'none';
      });
      relabelText(el, 'Contact');
    } else if (mode === 'btt' && anchor) {
      el = document.createElement('a');
      el.className = 'vc-footer-contact';
      el.setAttribute('href','#vldy-inquiry');
      var fill = document.createElement('div');
      fill.className = 'vc-footer-fill';
      var p = document.createElement('p');
      p.className = 'vc-footer-label';
      'CONTACT'.split('').forEach(function(ch){
        var sp=document.createElement('span');
        sp.textContent=ch;
        p.appendChild(sp);
      });
      el.appendChild(fill);
      el.appendChild(p);
    } else {
      el = document.createElement('a');
      el.appendChild(buildRollingLabel('Contact'));
    }

    el.id = 'vc-contact';
    el.setAttribute('role','button');
    el.setAttribute('aria-label','Contact');
    el.setAttribute('data-vldy-open','1');
    el.style.zIndex='2147483000';
    el.style.cursor='pointer';
    el.addEventListener('click',openInquiry);

    if (mode === 'btt' && anchor) {
      var stableWrap = anchor.closest ? anchor.closest('.framer-1tx43ga-container') : null;
      var stableParent = stableWrap && stableWrap.parentElement;
      if (stableWrap && stableParent) {
        el.style.position='relative';
        el.style.top='auto';
        el.style.left='auto';
        el.style.right='auto';
        el.style.bottom='auto';
        el.style.alignSelf='center';
        el.style.flex='none';
        stableParent.insertBefore(el,stableWrap.nextSibling);
      } else {
        el.style.position='absolute';
        document.body.appendChild(el);
      }
    } else {
      el.style.position='absolute';
      el.style.margin='0';
      document.body.appendChild(el);
    }

    if (mode === 'primary') {
      try { makePrimaryRolling(el); } catch (e) {}
    }
    return el;
  }

  function findAnchor() {
    // On contact.html the prominent contact-section list takes priority
    var prim = [].slice.call(document.querySelectorAll('a[href*="pf.kakao.com"][data-framer-name="Primary"]')).filter(visible)[0];
    if (prim) return { el: prim, mode: 'primary' };
    // On every page, anchor below the footer Back To Top button.
    // Restrict the selector to Framer's stable footer button container so header/logo
    // links ending in #top are never mistaken for the Back To Top control.
    var btt = [].slice.call(document.querySelectorAll(
      '.framer-1tx43ga-container a[href$="#top"][data-framer-name="Primary"],' +
      '.framer-1tx43ga-container a[href$="#top"][data-framer-name="Secondary"]'
    )).filter(visible)[0];
    if (btt) return { el: btt, mode: 'btt' };
    // Fallback: footer Kakao link
    var foot = [].slice.call(document.querySelectorAll('a.framer-12fazzh[href*="pf.kakao.com"]')).filter(visible)[0];
    if (foot) return { el: foot, mode: 'footer' };
    return null;
  }

  // Anchor the Contact overlay on a new line directly under Kakao, in document
  // coordinates so it scrolls naturally with the page.
  function position() {
    var footerContact = [].slice.call(document.querySelectorAll('footer a[data-vldy-open]')).filter(visible)[0];
    if (footerContact) {
      var extra = document.getElementById('vc-contact');
      if (extra) extra.style.display = 'none';
      return;
    }
    var a = findAnchor();
    if (!a) {
      // During Framer hover transitions the source button can briefly be replaced.
      // Keep the existing Contact exactly where it is instead of hiding it.
      return;
    }
    var el = getEl(a.mode, a.el);
    var r = a.el.getBoundingClientRect();
    el.style.display = 'block';
    if (a.mode === 'primary') {
      // cloned Primary row already carries the arrow, divider and typography.
      el.style.width = r.width + 'px';
      el.style.top = (r.bottom + window.scrollY + 10) + 'px';
      el.style.left = (r.left + window.scrollX) + 'px';
    } else if (a.mode === 'btt') {
      var stableWrap = a.el.closest ? a.el.closest('.framer-1tx43ga-container') : null;
      var stableParent = stableWrap && stableWrap.parentElement;
      if (stableWrap && stableParent && el.parentElement !== stableParent) {
        stableParent.insertBefore(el, stableWrap.nextSibling);
      }
      el.style.setProperty('display','flex','important');
      el.style.setProperty('position','relative','important');
      el.style.setProperty('top','auto','important');
      el.style.setProperty('left','auto','important');
      el.style.setProperty('right','auto','important');
      el.style.setProperty('bottom','auto','important');
      el.style.setProperty('align-self','center','important');
      el.style.setProperty('flex','none','important');
      // Keep Contact from being vertically compressed by the footer layout.
      var br = a.el.getBoundingClientRect();
      if (br && br.height) {
        el.style.setProperty('height', br.height + 'px', 'important');
        el.style.setProperty('min-height', br.height + 'px', 'important');
      }
      // Footer content uses a 30px gap; offset only enough to leave 12px between buttons.
      var gap = stableParent ? parseFloat(getComputedStyle(stableParent).rowGap || getComputedStyle(stableParent).gap) : 30;
      if (!isFinite(gap)) gap = 30;
      el.style.setProperty('margin-top', Math.min(0, 12 - gap) + 'px', 'important');
      el.style.setProperty('margin-bottom','0','important');
    } else {
      // match the footer social row: 14px, grey, right-aligned so it can't overflow
      el.style.height = r.height + 'px';
      el.style.lineHeight = r.height + 'px';
      el.style.fontSize = '14px';
      el.style.top = (r.bottom + window.scrollY + 4) + 'px';
      el.style.left = (r.right + window.scrollX - el.offsetWidth) + 'px';
    }
  }

  function fixEmailLinks() {
    document.querySelectorAll('a[href="' + BROKEN + '"], a[href="' + BROKEN + '/"]').forEach(function (a) {
      a.setAttribute('href', GMAIL);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener');
    });
  }

  function tightenLogoStrips() {
    [].slice.call(document.querySelectorAll('ul')).forEach(function (ul) {
      var imgs = ul.querySelectorAll('img');
      if (imgs.length < 4) return;
      var cs = getComputedStyle(ul);
      if (cs.display.indexOf('flex') === -1) return;
      var p = ul.parentElement;
      var pcs = p ? getComputedStyle(p) : null;
      if (!((pcs && pcs.overflow === 'hidden') || ul.closest('[style*="overflow:hidden"]'))) return;
      ul.style.setProperty('gap', '14px', 'important');
      ul.style.setProperty('column-gap', '14px', 'important');
    });
  }

  var pending = false;
  function apply() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      try {
        document.querySelectorAll('.veldy-mobile-footer-contact').forEach(function(n){ if(n.parentNode)n.parentNode.removeChild(n); });
        position(); fixEmailLinks(); tightenLogoStrips();
      } catch (e) {}
    });
  }

  function schedule() {
    window.__vcLoaded = true;
    apply();
    // layout settles as fonts/images load, and Framer re-renders on hydration/resize
    [120, 300, 600, 1000, 1600, 2600, 4000].forEach(function (t) { setTimeout(apply, t); });
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    window.addEventListener('load', apply);
    // Re-anchor whenever Framer re-renders the footer (cheap: only repositions).
    try { new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true }); } catch (e) {}
    // Keep it aligned during layout shifts we don't get events for.
    if (window.ResizeObserver) { try { var ro = new ResizeObserver(apply); ro.observe(document.documentElement); } catch (e) {} }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') schedule();
  else window.addEventListener('DOMContentLoaded', schedule);
})();
