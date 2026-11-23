#!/usr/bin/env python3
"""Count narrative Han, excluding title, figures, notes and apparatus."""
from pathlib import Path
import json
import re
import sys


def counts(text):
    body = re.sub(r'\A---\n.*?\n---\n', '', text, count=1, flags=re.S)
    body = body.split('<!-- biography-body-end -->', 1)[0]
    body = re.split(r'^## 资料与注释', body, maxsplit=1, flags=re.M)[0]
    body = re.sub(r'<figure\b.*?</figure>', '', body, flags=re.S)
    body = re.sub(r'^#+[^\n]*', '', body, flags=re.M)
    body = re.sub(r'^\*\*文 /[^\n]*', '', body, flags=re.M)
    body = re.sub(r'^\[\^[^\]]+\]:[^\n]*(?:\n[ \t]+[^\n]*)*', '', body, flags=re.M)
    body = re.sub(r'\[\^[^\]]+\]', '', body)
    return {
        'body_hanzi': len(re.findall(r'[\u3400-\u4dbf\u4e00-\u9fff]', body)),
        'images': len(re.findall(r'<figure\b', text)),
        'notes': len(re.findall(r'^\[\^\d+\]:', text, flags=re.M)),
    }


if __name__ == '__main__':
    for filename in sys.argv[1:]:
        print(json.dumps({'file': filename, **counts(Path(filename).read_text())}, ensure_ascii=False))
