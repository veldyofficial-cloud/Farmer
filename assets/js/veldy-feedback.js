/* Monday feedback, 2026-10-26. Keep static-export fixes after Framer hydration. */
(function () {
  var config = document.getElementById('veldy-feedback-config');
  var project = config ? JSON.parse(config.textContent) : null;
  var base = new URL('../../', document.currentScript.src);

  function repair() {
    if (project) {
      document.querySelectorAll('section[data-framer-name="Work"] time').forEach(function (time) {
        var year = (time.getAttribute('datetime') || '').slice(0, 4);
        if (/^\d{4}$/.test(year) && time.textContent !== year) time.textContent = year;
      });
      if (project.title) document.querySelectorAll('section[data-framer-name="Title"] h1').forEach(function (h) {
        var title = project.title + ' / ';
        if (h.textContent !== title) h.textContent = title;
      });
      if (project.category) document.querySelectorAll('.framer-15bf1mu p').forEach(function (p) {
        if (p.textContent !== project.category) p.textContent = project.category;
      });
      if (project.description) document.querySelectorAll('.framer-1xs6r9d p').forEach(function (p) {
        if (p.textContent !== project.description) p.textContent = project.description;
      });
      document.querySelectorAll('section[data-framer-name="Work"] a').forEach(function (a) {
        var p = a.querySelector('p');
        if (!p || p.textContent.replace(/\s/g, '').toLowerCase() !== 'livewebsite') return;
        if (!project.website) {
          if (!a.hidden) a.hidden = true;
          a.removeAttribute('href');
        } else {
          if (a.hidden) a.hidden = false;
          if (a.getAttribute('href') !== project.website) a.setAttribute('href', project.website);
        }
      });
    }
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      var p = a.querySelector('p[class*="rolling-text-inner"]');
      var label = p ? p.textContent.replace(/\s/g, '').toLowerCase() : '';
      if (/^mailto:/i.test(href) && (label === 'emailme' || label === 'contact')) {
        a.setAttribute('href', '#vldy-inquiry');
        a.setAttribute('data-vldy-open', '1');
        a.setAttribute('aria-label', 'Contact');
        a.removeAttribute('target');
        if (p) {
          var spans = p.querySelectorAll('span');
          'CONTACT'.split('').forEach(function (letter, i) {
            if (spans[i]) spans[i].textContent = letter;
          });
          Array.prototype.slice.call(spans, 7).forEach(function (span) { span.remove(); });
        }
        return;
      }
      // Framer regenerates extensionless routes after hydration. Use the local
      // HTML exports, including installations hosted beneath a subdirectory.
      if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;
      var url;
      try { url = new URL(href, location.href); } catch (_) { return; }
      if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
      var route = url.pathname.slice(base.pathname.length).replace(/\/$/, '');
      if (/^(gallery|work|contact)$/.test(route) || /^(work|article)\/[^/.]+$/.test(route)) {
        url.pathname = base.pathname + route + '.html';
        if (a.href !== url.href) a.setAttribute('href', url.href);
      }
    });
  }
  // The hydrated srcset keeps one pre-loaded 512px local candidate in front of the CDN candidates;
  // the browser re-uses that already-loaded file, so images stay soft. Drop it so the sharper
  // candidates (served locally by sw.js) are used.
  function fixTitle() {
    if (/Palmer/.test(document.title)) document.title = document.title.replace(/\s*-\s*Palmer.*$/, ' | VELDY Work');
    if (project && project.title && document.title.indexOf(project.title) !== 0) document.title = project.title + ' | VELDY Work';
  }
  function sharpenImages() {
    document.querySelectorAll('img[srcset]').forEach(function (img) {
      if (img.dataset.veldySharp) return;
      var parts = img.getAttribute('srcset').split(/,\s*(?=\S)/);
      if (parts.length < 2 || /^https?:/.test(parts[0]) || !/^https?:\/\/framerusercontent\.com\/images\//.test(parts[1])) return;
      img.dataset.veldySharp = '1';
      img.setAttribute('srcset', parts.slice(1).join(', '));
    });
  }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    setTimeout(function () { queued = false; repair(); sharpenImages(); fixTitle(); }, 300);   // throttled: Framer mutates the DOM continuously
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', repair);
  else repair();
  new MutationObserver(schedule).observe(document.documentElement, {subtree:true, childList:true});
  window.addEventListener('load', function () { repair(); sharpenImages(); fixTitle(); });
})();
