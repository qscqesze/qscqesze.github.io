"""Count narrative Han only; appendices and Markdown figures are excluded."""
import json
import re
import sys
from pathlib import Path


def count(path):
    source = Path(path).read_text()
    body = re.sub(r"\A---\s*\n.*?\n---\s*\n", "", source, count=1, flags=re.S)
    body = re.split(r"<!-- biography-body-end -->|^## (?:主要资料与工作注释|资料与注释)", body, maxsplit=1, flags=re.M)[0]
    body = re.sub(r"<figure\b.*?</figure>", "", body, flags=re.S)
    body = "\n".join(line for line in body.splitlines()
                     if not line.lstrip().startswith(("#", "**文", "![", "[^")))
    body = re.sub(r"\[\^\d+\]", "", body)
    return {"body_hanzi": len(re.findall(r"[\u3400-\u4dbf\u4e00-\u9fff]", body)),
            "images": len(re.findall(r"<figure\b", source)),
            "footnotes": len(re.findall(r"^\[\^\d+\]:", source, re.M))}


if __name__ == "__main__":
    print(json.dumps(count(sys.argv[1]), ensure_ascii=False, indent=2))
