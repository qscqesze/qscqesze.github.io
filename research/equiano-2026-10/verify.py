"""Check the actual narrative body, references and publication fields."""
from pathlib import Path
import json,re,sys

def body(text):
    if text.startswith('---\n'):text=text.split('---',2)[2]
    text=re.split(r'^## (?:主要资料|参考文献|年表|史料说明)',text,maxsplit=1,flags=re.M)[0]
    text=re.sub(r'<figure\b.*?</figure>','',text,flags=re.S)
    text=re.sub(r'^#+[^\n]*|^\*\*文 /[^\n]*','',text,flags=re.M)
    text=re.sub(r'\[\^[^\]]+\]','',text)
    return text

def verify(path):
    text=path.read_text()
    n=len(re.findall(r'[\u3400-\u9fff]',body(text)))
    refs=re.findall(r'\[\^(\d+)\]',text.split('## 主要资料与注释')[0])
    defs=re.findall(r'^\[\^(\d+)\]:',text,re.M)
    assert refs==[str(i) for i in range(1,len(refs)+1)],'references not in first-use order'
    assert refs==defs,'missing or duplicate footnote definitions'
    assert 18000<=n<=22000,n
    assert text.count('<figure')==6
    assert re.findall(r'<figcaption>图(\d+)｜',text)==list('123456')
    assert 'author: qscqesze' in text
    if path.parent.name=='_posts':
        assert 'published: false' not in text and 'revision_status:' not in text and '【研究草稿】' not in text
    print(json.dumps({'path':str(path),'body_hanzi':n,'images':6,'footnotes':len(defs)},ensure_ascii=False))

if __name__=='__main__':
    verify(Path(sys.argv[1]))
