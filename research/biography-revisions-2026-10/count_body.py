"""Count Chinese body characters in the three revision drafts, excluding apparatus."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[2]
PROGRESS = Path(__file__).with_name('progress.json')


def body_hanzi(text):
    if text.startswith('---\n'):
        text = text.split('---', 2)[2]
    text = re.split(r'^## (?:主要资料|参考文献|年表|史料说明)', text, maxsplit=1, flags=re.M)[0]
    text = re.sub(r'<figure\b.*?</figure>', '', text, flags=re.S)
    text = re.sub(r'^#+[^\n]*', '', text, flags=re.M)
    text = re.sub(r'^\*\*文 /[^\n]*', '', text, flags=re.M)
    text = re.sub(r'^\[\^[^\]]+\]:[^\n]*(?:\n[ \t]+[^\n]*)*', '', text, flags=re.M)
    text = re.sub(r'\[\^[^\]]+\]', '', text)
    return len(re.findall(r'[\u3400-\u9fff]', text))


if __name__ == '__main__':
    records = json.loads(PROGRESS.read_text())
    for record in records:
        text = (ROOT / record['draft']).read_text()
        record['body_hanzi'] = body_hanzi(text)
        record['images'] = text.count('<figure')
    PROGRESS.write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(records, ensure_ascii=False, indent=2))
