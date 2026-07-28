#!/usr/bin/env python3
"""Generate cached English Jekyll documents from opted-in Chinese posts."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path
from typing import Any

import yaml


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = PROJECT_ROOT / "_posts"
OUTPUT_DIR = PROJECT_ROOT / "_en_posts"
DEFAULT_MODEL = "gpt-5.6-terra"
FRONT_MATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n?", re.DOTALL)
URL = re.compile(r"https?://[^\s)>\]\"']+")
FENCED_CODE = re.compile(r"^```[^\n]*\n.*?^```[ \t]*$", re.MULTILINE | re.DOTALL)
FOOTNOTE = re.compile(r"\[\^([^\]]+)\]")
HTML_TARGET = re.compile(r"\b(?:href|src)=[\"']([^\"']+)[\"']")


class TranslationError(RuntimeError):
    pass


def parse_document(text: str) -> tuple[dict[str, Any], str]:
    match = FRONT_MATTER.match(text)
    if not match:
        raise TranslationError("missing YAML front matter")
    metadata = yaml.safe_load(match.group(1)) or {}
    if not isinstance(metadata, dict):
        raise TranslationError("front matter must be a YAML mapping")
    return metadata, text[match.end() :]


def source_hash(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def slug_from_source(path: Path) -> str:
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", path.stem)


def output_path(source: Path) -> Path:
    return OUTPUT_DIR / source.name


def parse_datetime(value: Any) -> datetime | None:
    if isinstance(value, datetime):
        return value
    if isinstance(value, str):
        try:
            return datetime.fromisoformat(value.replace("Z", "+00:00"))
        except ValueError:
            return None
    return None


def configured_auto_after() -> datetime | None:
    config = yaml.safe_load((PROJECT_ROOT / "_config.yml").read_text(encoding="utf-8")) or {}
    return parse_datetime((config.get("translation") or {}).get("auto_after"))


def is_opted_in(metadata: dict[str, Any], auto_after: datetime | None = None) -> bool:
    if "translate" in metadata:
        return metadata.get("translate") is True
    post_date = parse_datetime(metadata.get("date"))
    if not post_date or not auto_after:
        return False
    try:
        return post_date >= auto_after
    except TypeError:
        return False


def english_permalink(metadata: dict[str, Any], source: Path) -> str:
    chinese_url = str(metadata.get("permalink") or f"/posts/{slug_from_source(source)}/")
    return f"/en{chinese_url}" if chinese_url.startswith("/") else f"/en/{chinese_url}"


def extract_output_text(response: dict[str, Any]) -> str:
    pieces: list[str] = []
    for item in response.get("output", []):
        if item.get("type") != "message":
            continue
        for content in item.get("content", []):
            if content.get("type") == "output_text" and content.get("text"):
                pieces.append(content["text"])
    if not pieces:
        raise TranslationError("the Responses API returned no output_text")
    return "".join(pieces)


def build_request(metadata: dict[str, Any], body: str, model: str) -> dict[str, Any]:
    source_payload = {
        "title": str(metadata.get("title", "")),
        "excerpt": str(metadata.get("excerpt", "")),
        "body": body,
    }
    return {
        "model": model,
        "store": False,
        "reasoning": {"effort": "low"},
        "instructions": (
            "Translate this Chinese Jekyll article into polished, publication-quality English. "
            "Preserve the author's meaning, evidentiary caution, heading hierarchy, Markdown, "
            "HTML structure and attributes, URLs, citations, footnote identifiers, tables, lists, "
            "details blocks, code fences, and all mathematical notation. Do not add facts or "
            "commentary. Keep fenced code blocks byte-for-byte identical. Translate prose, visible "
            "labels, image alt text, and captions. Because the page uses MathJax, write literal "
            "US currency as 'USD 500', never with a dollar sign that could be parsed as a formula. "
            "Return only the requested JSON object."
        ),
        "input": json.dumps(source_payload, ensure_ascii=False),
        "max_output_tokens": 30000,
        "text": {
            "verbosity": "high",
            "format": {
                "type": "json_schema",
                "name": "translated_post",
                "strict": True,
                "schema": {
                    "type": "object",
                    "properties": {
                        "title": {"type": "string"},
                        "excerpt": {"type": "string"},
                        "body": {"type": "string"},
                    },
                    "required": ["title", "excerpt", "body"],
                    "additionalProperties": False,
                },
            },
        },
    }


def call_responses_api(payload: dict[str, Any], api_key: str) -> dict[str, Any]:
    request = urllib.request.Request(
        "https://api.openai.com/v1/responses",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    last_error: Exception | None = None
    for attempt in range(3):
        try:
            with urllib.request.urlopen(request, timeout=180) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            last_error = TranslationError(f"OpenAI API error {exc.code}: {detail}")
            if exc.code < 500 and exc.code != 429:
                break
        except (urllib.error.URLError, TimeoutError) as exc:
            last_error = exc
        if attempt < 2:
            time.sleep(2**attempt)
    raise TranslationError(str(last_error or "OpenAI API request failed"))


def translate(metadata: dict[str, Any], body: str, model: str, api_key: str) -> dict[str, str]:
    response = call_responses_api(build_request(metadata, body, model), api_key)
    try:
        translated = json.loads(extract_output_text(response))
    except json.JSONDecodeError as exc:
        raise TranslationError(f"model output was not valid JSON: {exc}") from exc
    if not isinstance(translated, dict):
        raise TranslationError("model output must be a JSON object")
    return {key: str(translated.get(key, "")).strip() for key in ("title", "excerpt", "body")}


def validate_translation(source_body: str, translated: dict[str, str]) -> None:
    if not translated["title"] or not translated["excerpt"] or not translated["body"]:
        raise TranslationError("translation returned an empty title, excerpt, or body")

    translated_body = translated["body"]
    checks = {
        "URLs": (set(URL.findall(source_body)), set(URL.findall(translated_body))),
        "HTML href/src targets": (
            set(HTML_TARGET.findall(source_body)),
            set(HTML_TARGET.findall(translated_body)),
        ),
        "footnote identifiers": (
            set(FOOTNOTE.findall(source_body)),
            set(FOOTNOTE.findall(translated_body)),
        ),
    }
    for label, (source_values, translated_values) in checks.items():
        missing = source_values - translated_values
        if missing:
            raise TranslationError(f"translation lost {label}: {sorted(missing)}")

    if FENCED_CODE.findall(source_body) != FENCED_CODE.findall(translated_body):
        raise TranslationError("translation changed one or more fenced code blocks")


def build_front_matter(
    source: Path,
    source_metadata: dict[str, Any],
    translated: dict[str, str],
    digest: str,
    model: str,
) -> dict[str, Any]:
    metadata: dict[str, Any] = {
        "title": translated["title"],
        "date": source_metadata.get("date"),
        "permalink": english_permalink(source_metadata, source),
        "lang": "en",
        "translation_key": source_metadata.get("translation_key") or slug_from_source(source),
        "translation_url": source_metadata.get("permalink") or f"/posts/{slug_from_source(source)}/",
        "source": str(source.relative_to(PROJECT_ROOT)),
        "source_hash": digest,
        "translation_model": model,
        "excerpt": translated["excerpt"],
    }
    for key in ("comments", "share", "related", "read_time", "math", "header"):
        if key in source_metadata:
            metadata[key] = source_metadata[key]
    return metadata


def render_document(metadata: dict[str, Any], body: str) -> str:
    front_matter = yaml.safe_dump(
        metadata,
        allow_unicode=True,
        sort_keys=False,
        default_flow_style=False,
    ).strip()
    return f"---\n{front_matter}\n---\n\n{body.rstrip()}\n"


def existing_hash(path: Path) -> str | None:
    if not path.exists():
        return None
    try:
        metadata, _ = parse_document(path.read_text(encoding="utf-8"))
    except (OSError, TranslationError, yaml.YAMLError):
        return None
    value = metadata.get("source_hash")
    return str(value) if value else None


def selected_sources(explicit: list[str], all_opted_in: bool) -> list[Path]:
    if explicit:
        paths = [(PROJECT_ROOT / value).resolve() for value in explicit]
        for path in paths:
            if PROJECT_ROOT not in path.parents or path.parent != SOURCE_DIR:
                raise TranslationError(f"source must be a file directly under _posts: {path}")
        return sorted(paths)
    if all_opted_in:
        return sorted(SOURCE_DIR.glob("*.md"))
    raise TranslationError("pass --all or at least one --source path")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", action="append", default=[], help="Source path, repeatable")
    parser.add_argument("--all", action="store_true", help="Scan all posts and process translate: true")
    parser.add_argument("--force", action="store_true", help="Regenerate even when source_hash matches")
    parser.add_argument("--check", action="store_true", help="Only check whether translations are current")
    args = parser.parse_args()

    model = os.environ.get("OPENAI_TRANSLATION_MODEL") or DEFAULT_MODEL
    api_key = os.environ.get("OPENAI_API_KEY", "")
    stale: list[Path] = []

    try:
        sources = selected_sources(args.source, args.all)
        auto_after = configured_auto_after()
        for source in sources:
            if not source.is_file():
                raise TranslationError(f"source does not exist: {source}")
            raw = source.read_bytes()
            metadata, body = parse_document(raw.decode("utf-8"))
            if not is_opted_in(metadata, auto_after):
                if args.source:
                    print(f"skip (translate is not true): {source.relative_to(PROJECT_ROOT)}")
                continue

            digest = source_hash(raw)
            target = output_path(source)
            if not args.force and existing_hash(target) == digest:
                print(f"current: {target.relative_to(PROJECT_ROOT)}")
                continue

            stale.append(source)
            if args.check:
                print(f"stale or missing: {target.relative_to(PROJECT_ROOT)}")
                continue
            if not api_key:
                raise TranslationError("OPENAI_API_KEY is required for a missing or stale translation")

            print(f"translating {source.relative_to(PROJECT_ROOT)} with {model}")
            translated = translate(metadata, body, model, api_key)
            validate_translation(body, translated)
            output_metadata = build_front_matter(source, metadata, translated, digest, model)
            OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
            target.write_text(render_document(output_metadata, translated["body"]), encoding="utf-8")
            print(f"wrote: {target.relative_to(PROJECT_ROOT)}")
    except (OSError, UnicodeError, yaml.YAMLError, TranslationError) as exc:
        print(f"translation error: {exc}", file=sys.stderr)
        return 1

    if args.check and stale:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
