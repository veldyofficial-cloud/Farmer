"""Apply the reviewed Monday feedback to the static HTML exports (idempotent)."""
from pathlib import Path
import json
import re
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DESCRIPTION = ('Branding, website design, and marketing for Value Chain Books, '
               'with a clear visual identity and a typography-led website that presents its books and content.')
changed = []
for path in [*ROOT.glob('*.html'), *ROOT.joinpath('work').glob('*.html'), *ROOT.joinpath('article').glob('*.html')]:
    source = path.read_text(encoding='utf-8')
    original = source
    prefix = '../' if path.parent != ROOT else ''
    if path.parent.name == 'work':
        soup = BeautifulSoup(source, 'html.parser')
        links = [a.get('href') for a in soup.select('a')
                 if 'livewebsite' in a.get_text('', strip=True).lower() and a.get('href')]
        website = links[0] if links else None
        # Mobiltech currently points to an unrelated dental practice. Do not
        # invent its replacement; keep the CTA hidden pending a verified URL.
        if path.stem in ('delta', 'mobiltech'):
            website = None
        config = {'website': website}
        if path.stem == 'delta':
            config.update(title='Delta Air Lines', category='Graphic Design')
            source = source.replace('Halo Wear', 'Delta Air Lines')
            source = source.replace('>Creative Direction<', '>Graphic Design<')
        if path.stem == 'valuechainbooks':
            config.update(title='Value Chain Books', category='Branding & Web Site & Marketing', description=DESCRIPTION)
            source = source.replace('Arc &amp; Bloom', 'Value Chain Books').replace('Arc & Bloom', 'Value Chain Books')
            source = source.replace('>Web Site &amp; Marketing<', '>Branding &amp; Web Site &amp; Marketing<')
            source = source.replace('Architected a sophisticated digital library for Valuechain Books, translating intellectual depth into a clean, typography-focused editorial experience.', DESCRIPTION)
        source = re.sub(r'(<time\b[^>]*datetime="(\d{4})[^>]*>)[^<]*(</time>)', r'\1\2\3', source)
        if 'id="veldy-feedback-style"' not in source:
            source = source.replace('</head>', '<style id="veldy-feedback-style">section[data-framer-name="Work"] .framer-1ttyydr{display:none!important}section[data-framer-name="Work"] a[hidden]{display:none!important}</style>\n</head>')
        # Hide absent/unrelated live-site destinations before hydration as well.
        if not website:
            source = re.sub(r'<a\b[^>]*>.*?</a>', lambda m: m.group(0).replace('<a ', '<a hidden ', 1)
                            if 'livewebsite' in BeautifulSoup(m.group(0), 'html.parser').get_text('',strip=True).lower()
                            and not re.search(r'<a\b[^>]*\bhidden\b', m.group(0).split('>')[0]) else m.group(0), source, flags=re.S)
        config_tag = '<script id="veldy-feedback-config" type="application/json">' + json.dumps(config) + '</script>'
        if 'id="veldy-feedback-config"' in source:
            source = re.sub(r'<script id="veldy-feedback-config".*?</script>', lambda _: config_tag, source, flags=re.S)
        else:
            source = source.replace('</body>', config_tag + '\n</body>')
    if 'src="' + prefix + 'assets/js/veldy-inquiry.js' not in source:
        source = source.replace('</body>', '<script src="' + prefix + 'assets/js/veldy-inquiry.js?v=20261026"></script>\n</body>')
    if 'assets/js/veldy-feedback.js' not in source:
        source = source.replace('</body>', '<script src="' + prefix + 'assets/js/veldy-feedback.js?v=20261026"></script>\n</body>')
    source = re.sub(r'(assets/js/veldy-(?:partners|inquiry)\.js)(?:\?v=[^"\s]+)?', r'\1?v=20261026', source)
    if source != original:
        path.write_text(source, encoding='utf-8')
        changed.append(str(path.relative_to(ROOT)))
print(json.dumps(changed, indent=2))
