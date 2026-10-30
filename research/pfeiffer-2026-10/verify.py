import importlib.util
import re
from pathlib import Path
from PIL import Image

spec=importlib.util.spec_from_file_location('counter',Path(__file__).with_name('count_body.py'))
counter=importlib.util.module_from_spec(spec);spec.loader.exec_module(counter)
path=Path('_posts/2026-10-30-ida-pfeiffer.md');s=path.read_text();stats=counter.inspect(path)
assert 18000<=stats['body_hanzi']<=22000,stats
assert stats['images']==6
assert stats['note_references']==stats['note_definitions']==list(range(1,43))
fm=s.split('---',2)[1]
assert 'author: qscqesze' in fm
assert 'published:' not in fm and 'revision_status:' not in fm and '【' not in fm
assert 'permalink: /posts/ida-pfeiffer/' in fm
for figure in re.findall(r'<figure\b.*?</figure>',s,re.S):
 p=re.search(r"'(/images/[^']+)'",figure)[1]
 assert Path(p.lstrip('/')).is_file(),p
 im=Image.open(p.lstrip('/'));im.verify()
 assert re.search(r'width="\d+" height="\d+"',figure)
 assert '<figcaption>' in figure and 'href=' in figure
assert s.count('<figure')==s.count('</figure>')
print({k:stats[k] for k in ['body_hanzi','images','footnotes']})
