"""Build the VELDY profile from the reviewed VE2 copy and existing work assets."""
from pathlib import Path
from html import escape as e
from urllib.parse import unquote, urlsplit
import json, re
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'profile'
DATA = json.loads((ROOT / 'scripts/profile-source.json').read_text(encoding='utf-8'))
sections = {}
number = None
for p in DATA['paragraphs']:
    m = re.match(r'^(\d{2})\. ', p['text'])
    if m and p['style'] == 'HEADING_3':
        number = int(m[1]); sections[number] = []
    elif number:
        sections[number].append(p['text'])

# Monday explicitly excludes paid/search/SMS/email marketing and conversion
# claims, even where the approved Doc still contains those older phrases.
sections[3] = [t.replace('콘텐츠 전략과 제작부터 검색, CRM, 성과 분석까지 브랜드 성장을 위한 마케팅을 운영합니다.',
    '콘텐츠 전략과 제작, 브랜드 헤리티지 정리, 채널 아이덴티티 구축과 운영을 통해 브랜드의 자사 채널을 성장시킵니다.').replace(
    'Content · Social · Video · Performance · CRM · Analytics', 'Content · Social · Video · Heritage · Channel Identity · Analytics') for t in sections[3]]
sections[7] = [t.replace('검색 의도 분석', '고객 관심사 분석') for t in sections[7]]
sections[8] = ['콘텐츠와 데이터를\n브랜드 자산으로 연결합니다.',
    '브랜드의 역사와 주요 활동, 상품과 서비스 정보를 일관된 콘텐츠로 축적하고 자사 채널을 지속적으로 운영합니다.',
    'Brand Heritage\n브랜드의 역사 · 주요 활동 · 성과 · 핵심 자산 정리',
    'Channel Identity\n비주얼과 메시지 기준 · 채널별 콘텐츠 카테고리 · 발행 기준',
    'Product & Service Content\n상품과 서비스의 특징 · 가치 · 이용 정보 안내',
    'Content Analytics\n도달 · 유입 · 참여 · 채널별 성장 추이 · 콘텐츠 개선']
sections[11] = [t.replace('GROWTH\nSearch · Paid Media · CRM','CHANNELS\nHeritage · Identity · Content') for t in sections[11]]

def text(t): return e(t).replace('\n','<br>')
def tag(n, title): return f'<div class="section-label"><span>[{n:02d}]</span><span>{title}</span></div>'
def paras(items): return ''.join(f'<p>{text(t)}</p>' for t in items)
def details(items):
    html = ''
    for t in items:
        if '\n' in t:
            title, body = t.split('\n', 1)
            html += f'<div class="detail-row"><h3>{e(title)}</h3><p>{text(body)}</p></div>'
        else: html += f'<p>{text(t)}</p>'
    return html

projects=[]
for slug in ['hemingway-audio','delta','sungdong','valuechainbooks','crystaloz','davinci-code','patchking','soulju','teoljabi','bibimcha','mobiltech','dreamu','ordinary-cookies','gilbot-travel','sushi-nova','jjjd','yeokdae-jjambbong','kozie']:
    path=ROOT/'work'/f'{slug}.html'
    soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
    title=soup.title.get_text().split(' - ')[0].split(' | ')[0]
    og=soup.select_one('meta[property="og:image"]')
    work=soup.select_one('section[data-framer-name="Work"]')
    img=work.select_one('img') if work else None
    # Real cover, in order: the page's injected gallery (urls=[...]), a project og:image
    # (the site default VELDY crest does not count), then the CMS image in the Work section.
    gallery=re.search(r'urls=\["([^"]+)"',path.read_text(encoding='utf-8'))
    og_src=og.get('content','') if og else ''
    if 'sgnWS67NxQQsmxbcLnkchAISWVM' in og_src: og_src=''
    src=gallery[1] if gallery else og_src or (img.get('src','') if img else '')
    if src and not src.startswith('http'):
        resolved=(path.parent/unquote(urlsplit(src).path)).resolve()
        src='../'+resolved.relative_to(ROOT).as_posix() if resolved.exists() else ''
    cat=soup.select_one('.framer-15bf1mu p')
    projects.append(dict(slug=slug,title=title,image=src,category=cat.get_text(' ',strip=True) if cat else 'Brand Design'))

def project_cards(items):
    return ''.join(f'<a class="project-card" href="../work/{p["slug"]}.html"><div class="project-image"><img src="{e(p["image"])}" alt="{e(p["title"])} 프로젝트" loading="lazy"><span class="project-arrow" aria-hidden="true">↗</span></div><div class="project-meta"><h3>{e(p["title"])}</h3><span>{e(p["category"])}</span></div></a>' for p in items)

refs=DATA['references']
for r in refs:
    r['pages']=7 if r['slug']=='junish-keyvisual' else 6 if r['slug']=='valuechain-keyvisual' else 1
    r['preview']='teoljabi-cover.jpg' if r['slug']=='teoljabi-profile' else r['slug']+('-7' if r['slug']=='junish-keyvisual' else '-6' if r['slug']=='valuechain-keyvisual' else '')+'.jpg'
    r['kind']={'키비주얼':'keyvisual','브랜드 매뉴얼':'manual','회사소개서':'profile','브로슈어':'brochure'}[r['category']]
    # Preserve the source grouping while showing the actual deliverable type.
    r['label']='브랜드 가이드' if r['slug'] in ['soulju-profile','sushinova-profile','bibimcha-profile'] else '브랜드 아이덴티티' if r['slug']=='davinci-profile' else r['category']

nav='''<a class="skip" href="#main">본문 바로가기</a><header class="site-header"><a class="brand" href="./" aria-label="VELDY 회사소개서 홈"><img src="assets/brand/veldy-logo-white.png?v=1" alt="VELDY" width="1914" height="305"></a><span class="header-note header-clock"><span>Seoul (KR)</span><time id="profile-clock">--:-- --</time></span><button class="menu-toggle" aria-expanded="false" aria-controls="navigation">메뉴 <span aria-hidden="true">☰</span></button><nav id="navigation" aria-label="주요 메뉴"><a href="./#about">About</a><a href="./#capabilities">Expertise</a><a href="./#work">Work</a><a href="./#references">References</a><a href="./#contact">Contact ↗</a></nav></header>'''
hero=f'''<section class="hero" aria-labelledby="cover-title"><video class="hero-video" autoplay muted loop playsinline aria-hidden="true" poster="framerusercontent.com/images/EoBMupP4sDoc2Zgcjt3OXKz2mg_width%3D2912%26height%3D1632.jpg"><source src="framerusercontent.com/assets/sN3VZaLzM7Q3.mp4" type="video/mp4"></video><div class="hero-shade"></div><div class="hero-content"><p class="eyebrow">COMPANY PROFILE · VELDY</p><h1 id="cover-title">VELDY<span>PROFILE</span></h1><div class="hero-bottom"><p class="hero-small">Brand Strategy<br>Content & Growth<br>Business Operations</p><div><h2>{text(sections[1][2])}</h2><p>{text(sections[1][3])}</p><a class="pill" href="#work">프로젝트 살펴보기 <span>↘</span></a></div></div></div><button class="video-toggle" aria-label="배경 영상 일시정지">영상 정지 Ⅱ</button></section>'''
about=f'<section class="section" id="about">{tag(2,"ABOUT VELDY")}<div class="split"><h2 class="display">Strategy<br>to Execution<span class="accent">.</span></h2><div class="body-copy">{paras(sections[2][1:])}<a class="text-link" href="#capabilities">우리의 전문 영역 ↘</a></div></div></section>'
caps=f'<section class="section" id="capabilities">{tag(3,"CAPABILITIES")}<h2 class="section-heading">Three Capabilities.<br><span class="muted">One Direction.</span></h2><div class="cap-grid">'
for i in range(3):
    part=sections[3][1+i*3:4+i*3]
    caps+=f'<a class="cap" href="#{["brand","content","operations"][i]}"><span class="cap-num">0{i+1} ↗</span><h3>{e(part[0])}</h3><p>{e(part[1])}</p><small>{e(part[2])}</small></a>'
caps+='</div></section>'
# Process: the Precept orbit (approved replacement for the template's hover-only steps),
# embedded as a sticky iframe whose scroll position follows this page.
approach=(f'<section class="section approach-section" id="approach">{tag(4,"OUR APPROACH")}<div class="split"><h2 class="section-heading">From Insight<br>to Continuous<br><span class="muted">Improvement.</span></h2><p class="process-intro">{text(sections[4][-1])}</p></div></section>'
    '<section class="orbit-host" id="process-orbit" aria-label="협업 과정"><iframe class="orbit-frame" src="precept.framer.website/orbit.html" title="Process steps" tabindex="-1"></iframe></section>')

services=''
for n,id_,label in [(5,'brand','BRAND STRATEGY & IDENTITY'),(6,'experience','BRAND EXPERIENCE & DIGITAL'),(7,'content','CONTENT STRATEGY & PRODUCTION'),(8,'channels','CHANNEL CONTENT & ANALYTICS'),(9,'communications','PR & CORPORATE COMMUNICATIONS'),(10,'operations','BUSINESS OPERATIONS')]:
    items=sections[n];body=items[1:]
    body=[t for t in body if '로고 띠 슬라이드' not in t]
    services+=f'<section class="section service-section" id="{id_}">{tag(n,label)}<div class="split"><h2 class="service-heading">{text(items[0])}</h2><div class="service-content">{details(body)}</div></div>'
    if n==8:
        # Official marks (simple-icons, Wikimedia Commons, littly's own og image), shown in one white tone.
        channels=[('NAVER','naver.svg'),('NAVER TV','navertv.svg'),('Instagram','instagram.svg'),('TikTok','tiktok.svg'),('Threads','threads.svg'),('YouTube','youtube.svg'),('Facebook / Meta','meta.svg'),('Kakao Channel','kakao.svg'),('Littly','littly.png'),('Daum','daum.svg')]
        track=''.join(f'<img src="assets/channels/{f}" alt="{c}" loading="lazy">' for c,f in channels)
        services+=f'<div class="marquee logo-marquee" aria-label="운영 채널: {", ".join(c for c,_ in channels)}"><div class="marquee-track"><div>{track}</div><div aria-hidden="true">{track}</div></div></div>'
    if n==10:
        services+='<div class="tools"><span><img src="../assets/img/tools/monday.png" alt="monday.com" loading="lazy"></span><span class="tool-kakao"><img src="assets/channels/kakaotalk.svg" alt="" loading="lazy">KakaoTalk</span><span><img src="../assets/img/tools/gdrive.png" alt="Google Drive" loading="lazy"></span></div>'
    services+='</section>'
system=f'<section class="section" id="system">{tag(11,"INTEGRATED BRAND MANAGEMENT")}<h2 class="section-heading">One Brand.<br><span class="muted">One System.</span></h2><div class="system-flow">'
for item in sections[11][1:-1]:
    if item=='↓':continue
    title,body=item.split('\n',1);system+=f'<div><h3>{title}</h3><p>{e(body)}</p></div>'
system+=f'</div><p class="section-summary">{text(sections[11][-1])}</p></section>'
solutions=f'<section class="section" id="solutions">{tag(12,"SELECTED SOLUTIONS")}<div class="split"><h2 class="service-heading">{text(sections[12][0])}</h2><ul class="solution-list">'+''.join(f'<li><span>0{i+1}</span>{e(t)}</li>' for i,t in enumerate(sections[12][1:]))+'</ul></div></section>'
featured=[next(p for p in projects if p['slug']==s) for s in ['soulju','valuechainbooks','sushi-nova','davinci-code','bibimcha','yeokdae-jjambbong']]
work=f'<section class="section" id="work">{tag(13,"SELECTED WORK")}<div class="heading-row"><h2 class="section-heading">Brands in<br><span class="muted">the making.</span></h2><a class="text-link" href="projects/">전체 프로젝트 [{len(projects):02d}] ↗</a></div><div class="project-grid">{project_cards(featured)}</div></section>'

reference_html='<section class="section" id="references"><div class="section-label"><span>[13—B]</span><span>REFERENCE LIBRARY</span></div><div class="split"><h2 class="section-heading">Behind<br><span class="muted">the brand.</span></h2><div class="body-copy"><p>브랜드를 만드는 과정과 결과물을 함께 살펴보세요. 키비주얼은 브랜드가 추구하는 방향과 핵심 이미지를 정리하고, 브랜드 매뉴얼은 일관된 표현을 위한 사용 기준을 담습니다.</p><p>회사소개서와 브랜드 가이드, 브로슈어까지 실제 프로젝트 자료로 확인할 수 있습니다.</p></div></div><div class="filters" role="group" aria-label="자료 유형"><button data-filter="all" aria-pressed="true">전체</button><button data-filter="keyvisual" aria-pressed="false">키비주얼</button><button data-filter="manual" aria-pressed="false">브랜드 매뉴얼</button><button data-filter="profile" aria-pressed="false">회사소개서·가이드</button><button data-filter="brochure" aria-pressed="false">브로슈어</button></div><p class="sr-only" id="filter-status" aria-live="polite"></p><div class="reference-grid">'
for i,r in enumerate(refs):
    reference_html+=f'<article class="reference-card" data-kind="{r["kind"]}"><a class="reference-preview" href="{r["url"]}" target="_blank" rel="noopener noreferrer" aria-label="{r["brand"]} {r["label"]} 원본 새 창에서 열기"><img src="assets/references/{r["preview"]}" alt="{r["brand"]} {r["label"]}" loading="lazy"><span>바로가기 ↗</span></a><div class="reference-meta"><div><small>{r["label"]}</small><h3>{r["brand"]}</h3></div><a href="{r["url"]}" target="_blank" rel="noopener noreferrer" aria-label="{r["brand"]} {r["label"]} 원본 새 창에서 열기">원본 ↗</a></div></article>'
reference_html+='</div></section>'

# Industry groups (black title block) each followed by a white band of that industry's logos.
# Logo ids are the numbered files in assets/img/logos, preprocessed into profile/assets/brands.
BRAND_LOGOS={'부동산 · 여행':['monica','18','gilbot'],'뷰티 · 메디컬':['31','01','30','28','gangnam','junish','26','08'],
 'F&B · 레스토랑':['23','37','bibimcha','soulju','ssam','34','yeonkodari','22','29','10','mandong','comma9','mojihae'],'웰니스 · 라이프스타일':['02','aviv'],
 '교육 · 아카데미 · 유학':['36','dreamu','coaching'],'금융 · 비즈니스':['m4markets'],'자동차 · 산업':['jusin','heavyduty'],
 '플랫폼':['24','aquablue','kimmyungpum','jining','33','power']}
EXPERIENCE_LOGOS=['17','20','12','15','21','14','19','27','13','04']
def logo_band(ids,label):
    if not ids:return ''
    ids=ids*max(1,-(-8//len(ids)))   # repeat short sets so the strip always fills the width
    def img(i):
        from PIL import Image
        w,h=Image.open(ROOT/f'profile/assets/brands/{i}.png').size   # even optical height: wide wordmarks shrink gently, compact marks grow
        hh=round(max(22,min(60,60*(2.5/(w/h))**0.5)))
        return f'<img src="assets/brands/{i}.png?v=20261027k" alt="" width="{w}" height="{h}" style="--h:{hh}">'
    track=''.join(img(i) for i in ids)
    return f'<div class="brand-band" role="img" aria-label="{e(label)}"><div class="marquee-track"><div>{track}</div><div aria-hidden="true">{track}</div></div></div>'
groups=sections[13]
start=next(i for i,t in enumerate(groups) if t.startswith('부동산 ·'))
end=next(i for i,t in enumerate(groups) if t.startswith('02. EXPERIENCE'))
directory=f'<section class="section directory" id="brand-directory"><div class="section-label"><span>[13—B]</span><span>BRANDS & ORGANIZATIONS</span></div><h2 class="section-heading">Across industries<span class="accent">.</span></h2></section>'
merged={}   # 종교·커뮤니티 and 개인·전문가 브랜딩 fold into 플랫폼 (Monday review, 2026-10-27)
order=[]
for group in groups[start:end]:
    title,names=group.split(chr(10),1)
    if title.startswith('문화'):continue   # 문화 · 음악 removed per Monday feedback
    names=names.replace('드림유학원','드림유치기공').replace(', 부동산읽어주는남자 에릭','').replace(', 유로구뜨','')
    if title.startswith(('플랫폼','종교','개인')):
        if '플랫폼' not in merged:order.append('플랫폼');merged['플랫폼']=[]
        merged['플랫폼'].append(names);continue
    order.append(title);merged[title]=[names]
for title in order:
    names=', '.join(merged[title])
    directory+=f'<section class="industry"><div class="industry-head"><h3>{e(title)}</h3><p>{e(names)}</p></div></section>'
exp_names=groups[end+2].replace(', 공공기관 추가 프로젝트, 추가 촬영 브랜드','')
directory+=f'<section class="industry"><div class="industry-head"><h3>Experience Across Brands & Organizations</h3><p>{e(exp_names)}</p></div></section>'
all_logos=[]
for ids in list(BRAND_LOGOS.values())+[EXPERIENCE_LOGOS]:
    all_logos+=[i for i in ids if i not in all_logos]
directory+=f'<section class="logo-wall">{logo_band(all_logos,"함께한 브랜드 로고")}</section>'
engagement=f'<section class="section" id="engagement">{tag(14,"ENGAGEMENT MODELS")}<h2 class="section-heading heading-ko">{text(sections[14][0])}</h2><div class="engagement-grid">'
for i in range(3):
    engagement+=f'<div><span>0{i+1}</span><h3>{sections[14][1+i*2]}</h3><p>{sections[14][2+i*2]}</p><a class="text-link" href="#vldy-inquiry" data-vldy-open>협업 문의 ↗</a></div>'
engagement+='</div></section>'
why=f'<section class="section" id="why">{tag(15,"WHY VELDY")}<div class="split"><h2 class="section-heading">Strategy, Creativity<br>and Operations<br><span class="muted">in One Team.</span></h2><div>{details(sections[15][1:])}</div></div></section>'
closing=f'''<footer class="section closing" id="contact">{tag(16,"LET'S WORK TOGETHER")}<h2 class="closing-title">Build the Brand.<br>Create Demand.<br><span class="muted">Operate for Growth.</span></h2><div class="closing-bottom"><p>{text(sections[16][1])}</p><a class="pill light" href="#vldy-inquiry" data-vldy-open>프로젝트 문의 <span>↗</span></a></div><div class="footer-links"><a href="mailto:veldy.official@gmail.com">veldy.official@gmail.com ↗</a><a href="https://pf.kakao.com/_WYExcs" target="_blank" rel="noopener noreferrer">Kakao ↗</a><a href="../index.html">VELDY Website ↗</a><a href="#top">Back to top ↑</a></div><div class="footer-mark"><img src="assets/brand/veldy-logo-black.png?v=1" alt="VELDY" width="1914" height="305"></div><p class="footer-caption">Integrated Brand Partner · VELDY connects strategy to execution.</p></footer>'''
dialog='''<dialog id="reference-dialog" aria-labelledby="reference-title"><div class="dialog-top"><div><small id="reference-kind"></small><h2 id="reference-title"></h2></div><button id="reference-close" aria-label="미리보기 닫기">닫기 ×</button></div><div class="dialog-pages" id="reference-pages"></div><a id="reference-original" class="pill" target="_blank" rel="noopener noreferrer">원본 전체 보기 ↗</a></dialog>'''
content=hero+about+caps+approach+services+system+solutions+work+reference_html+directory+engagement+why
def page(body,title='VELDY | Company Profile',base='./'):
    return f'''<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{title}</title><meta name="description" content="브랜드 전략에서 실행과 운영까지. VELDY의 전문 영역과 프로젝트, 브랜드 레퍼런스를 소개합니다."><base href="{base}"><link rel="stylesheet" href="assets/profile.css?v=20261027k"></head><body id="top">{nav}<main id="main">{body}</main>{closing}<script id="reference-data" type="application/json">{json.dumps(refs,ensure_ascii=False)}</script><script src="../assets/js/veldy-inquiry.js?v=20261026"></script><script src="assets/profile.js?v=20261027h" defer></script></body></html>'''

(OUT/'index.html').write_text(page(content),encoding='utf-8')
(OUT/'projects/index.html').write_text(page(f'<section class="section subpage" id="work">{tag(13,"SELECTED WORK")}<h1 class="section-heading">Selected<br><span class="muted">Projects.</span></h1><p class="section-summary">실제 프로젝트의 제작물과 업무 범위를 확인하세요.</p><div class="project-grid">{project_cards(projects)}</div><a class="pill" href="./#references">레퍼런스 자료 보기 ↗</a></section>', 'VELDY | Selected Projects', '../'),encoding='utf-8')
(OUT/'studio/index.html').write_text(page('<div class="subpage">'+about+caps+approach+why+'</div>','VELDY | About','../'),encoding='utf-8')
(OUT/'contact/index.html').write_text(page('<section class="section subpage"><p class="eyebrow">CONTACT VELDY</p><h1 class="section-heading heading-ko">브랜드의 다음 단계를<br>함께 만듭니다.</h1><p class="section-summary">프로젝트의 목표와 필요한 업무 범위를 알려주세요.</p><a class="pill light" href="#vldy-inquiry" data-vldy-open>프로젝트 문의 ↗</a></section>','VELDY | Contact','../'),encoding='utf-8')

# Unpublished template demo routes must not impersonate VELDY clients or legal
# terms. Keep their URLs working as explicit redirects to the actual profile.
for folder,target in [('projects','#work'),('articles','#content'),('privacy-policy','#contact'),('terms-of-service','#contact')]:
    for p in (OUT/folder).rglob('*.html'):
        if folder=='projects' and p.parent==OUT/folder:continue
        depth=len(p.relative_to(OUT).parts)-1
        href='../'*depth+target
        p.write_text(f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url={href}"><title>VELDY 회사소개서</title></head><body><a href="{href}">VELDY 회사소개서로 이동</a></body></html>',encoding='utf-8')
print('Built profile, studio, projects and contact; replaced unused demo routes with redirects.')
