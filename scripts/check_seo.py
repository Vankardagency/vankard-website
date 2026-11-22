"""Check generated HTML without executing JavaScript. Run after npm run build."""
from pathlib import Path
from html.parser import HTMLParser
import json, os
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit
root=Path(__file__).resolve().parents[1]/'dist'
production=os.environ.get('SEARCH_INDEXABLE')=='true'
origin=os.environ.get('SITE_URL','').rstrip('/')
class Page(HTMLParser):
 def __init__(self):
  super().__init__(convert_charrefs=True); self.h1=0;self.title='';self.in_title=False;self.main=False;self.meta={};self.links=[];self.canonical=[];self.jsons=[];self.json_text='';self.in_json=False;self.skip=0;self.text=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='h1':self.h1+=1
  if t=='main':self.main=True
  if t=='title':self.in_title=True
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a['href'])
  if t=='a':self.links.append(a.get('href',''))
  if t=='script' and a.get('type')=='application/ld+json':self.in_json=True;self.json_text=''
  if t in ('script','style'):self.skip+=1
 def handle_endtag(self,t):
  if t=='title':self.in_title=False
  if t=='script' and self.in_json:self.jsons.append(json.loads(self.json_text));self.in_json=False
  if t in ('script','style'):self.skip-=1
 def handle_data(self,d):
  if self.in_title:self.title+=d
  if self.in_json:self.json_text+=d
  if not self.skip:self.text.append(d)
seen_titles=set();seen_descriptions=set();pages={}
for file in sorted(root.rglob('*.html')):
 path='/'+str(file.relative_to(root)).replace('index.html','')
 p=Page();p.feed(file.read_text());pages[path]=p
 assert p.h1==1,(path,'must have exactly one H1')
 assert p.main,(path,'missing main landmark')
 assert p.title and p.title not in seen_titles,(path,'missing or duplicate title')
 seen_titles.add(p.title)
 desc=p.meta.get('description','')
 assert len(desc)>40 and desc not in seen_descriptions,(path,'missing or duplicate description')
 seen_descriptions.add(desc)
 error=path=='/404.html'
 assert p.meta.get('robots')==('index,follow,max-image-preview:large' if production and not error else 'noindex,follow'),(path,'incorrect indexing policy')
 if production and not error:
  assert p.canonical==[origin+path],(path,'incorrect canonical')
  assert p.meta.get('og:url')==origin+path,(path,'incorrect Open Graph URL')
  assert len(p.jsons)==1,(path,'missing JSON-LD graph')
  graph=p.jsons[0]['@graph'];types=[node['@type'] for node in graph]
  assert 'Organization' in types and 'WebSite' in types
  if path.startswith('/blog/') and path!='/blog/':assert 'BlogPosting' in types
  if path=='/faq/':
   faq=next(n for n in graph if n['@type']=='FAQPage')
   visible=' '.join(p.text)
   assert len(faq['mainEntity'])==8
   for q in faq['mainEntity']:assert q['name'] in visible and q['acceptedAnswer']['text'] in visible
  if path=='/pricing/':
   service=next(n for n in graph if n['@type']=='Service')
   assert [o['price'] for o in service['offers']]==['18000','8000']
 for href in p.links:
  if href.startswith('/'):
   target=root/urlsplit(href).path.lstrip('/')
   assert target.is_file() or (target/'index.html').is_file(),(path,'broken internal link',href)
price_text=' '.join(pages['/pricing/'].text)
for price in ['1,648.35','4,945.05','2,197.80','6,000','8,000','18,000','No performance guarantee. No refunds.']:assert price in price_text,('price not readable without JS',price)
assert 'What is Vankard?' in ' '.join(pages['/'].text)
robots=(root/'robots.txt').read_text()
sitemap=ET.fromstring((root/'sitemap.xml').read_text())
urls=[node.text for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
if production:
 assert 'Allow: /' in robots and 'Disallow: /' not in robots
 assert 'Sitemap: '+origin+'/sitemap.xml' in robots
 assert set(urls)=={origin+p for p in pages if p!='/404.html'},'Sitemap does not match indexable routes'
else:
 assert 'Disallow: /' in robots
 assert not urls
print(f'PASS: {len(pages)} HTML routes; unique metadata, semantic headings, internal links, no-JavaScript pricing, robots and sitemap.')
if production:print('PASS: production canonicals and Organization, WebSite, breadcrumb, Service, FAQ and article JSON-LD checks.')
else:print('PASS: staging noindex policy; no production domain invented.')
