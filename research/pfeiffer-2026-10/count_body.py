"""Read-only count: narrative Han, excluding metadata and reference material."""
import json
import re
import sys
from pathlib import Path


def inspect(path):
    text = Path(path).read_text()
    body = re.sub(r'\A---\s*\n.*?\n---\s*\n', '', text, count=1, flags=re.S)
    body = body.split('## 主要资料与注释', 1)[0]
    body = re.sub(r'<figure\b.*?</figure>', '', body, flags=re.S)
    body = re.sub(r'^#+[^\n]*$|^文 /[^\n]*$', '', body, flags=re.M)
    body = re.sub(r'\[\^[^\]]+\]', '', body)
    body = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', body)
    return {
        'body_hanzi': len(re.findall(r'[\u3400-\u4dbf\u4e00-\u9fff]', body)),
        'images': len(re.findall(r'<figure\b', text)),
        'footnotes': len(re.findall(r'^\[\^\d+\]:', text, flags=re.M)),
        'note_references': [int(n) for n in re.findall(r'\[\^(\d+)\](?!:)', text)],
        'note_definitions': [int(n) for n in re.findall(r'^\[\^(\d+)\]:', text, flags=re.M)],
    }


if __name__ == '__main__':
    print(json.dumps(inspect(sys.argv[1]), ensure_ascii=False, indent=2))
