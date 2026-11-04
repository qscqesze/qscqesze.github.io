#!/usr/bin/env python3
"""Validate generated local links, assets, anchors, and duplicate HTML ids."""

from __future__ import annotations

import argparse
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


@dataclass
class Document:
    ids: set[str] = field(default_factory=set)
    duplicate_ids: set[str] = field(default_factory=set)
    links: list[str] = field(default_factory=list)
    assets: list[str] = field(default_factory=list)


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.document = Document()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        element_id = values.get("id")
        if element_id:
            if element_id in self.document.ids:
                self.document.duplicate_ids.add(element_id)
            self.document.ids.add(element_id)

        if tag == "a" and values.get("href"):
            self.document.links.append(values["href"] or "")
        elif tag in {"img", "script", "source"} and values.get("src"):
            self.document.assets.append(values["src"] or "")
        elif tag == "link" and values.get("href"):
            rel = (values.get("rel") or "").lower()
            if any(kind in rel for kind in ("stylesheet", "icon", "manifest")):
                self.document.assets.append(values["href"] or "")


def candidate_paths(site_root: Path, page: Path, path: str) -> list[Path]:
    target = site_root / path.lstrip("/") if path.startswith("/") else page.parent / path
    target = target.resolve()
    if not path:
        return [page]
    if path.endswith("/"):
        return [target / "index.html"]
    if target.suffix:
        return [target]
    return [target, target.with_suffix(".html"), target / "index.html"]


def local_reference(reference: str) -> tuple[str, str] | None:
    parsed = urlparse(reference.strip())
    if not reference.strip() or parsed.scheme or parsed.netloc or reference.startswith("//"):
        return None
    return unquote(parsed.path), unquote(parsed.fragment)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("site", nargs="?", default="_site", type=Path)
    args = parser.parse_args()
    site_root = args.site.resolve()

    documents: dict[Path, Document] = {}
    for page in sorted(site_root.rglob("*.html")):
        html_parser = SiteParser()
        html_parser.feed(page.read_text(encoding="utf-8"))
        documents[page.resolve()] = html_parser.document

    errors: set[str] = set()
    for page, document in documents.items():
        page_label = page.relative_to(site_root)
        for duplicate_id in document.duplicate_ids:
            errors.add(f"{page_label}: duplicate id #{duplicate_id}")

        for reference in document.links + document.assets:
            local = local_reference(reference)
            if local is None:
                continue
            path, fragment = local
            candidates = candidate_paths(site_root, page, path)
            target = next((candidate for candidate in candidates if candidate.exists()), None)
            if target is None:
                errors.add(f"{page_label}: missing target {reference}")
                continue
            if fragment and target.suffix == ".html":
                target_document = documents.get(target.resolve())
                if target_document and fragment not in target_document.ids:
                    errors.add(f"{page_label}: missing anchor {reference}")

    if errors:
        print(f"Site validation failed with {len(errors)} issue(s):")
        for error in sorted(errors):
            print(f"- {error}")
        return 1

    print(f"Site validation passed for {len(documents)} HTML files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
