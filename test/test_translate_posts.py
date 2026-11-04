import importlib.util
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "translate_posts.py"
SPEC = importlib.util.spec_from_file_location("translate_posts", SCRIPT)
translate_posts = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(translate_posts)


class TranslatePostsTest(unittest.TestCase):
    def test_parse_document_and_opt_in(self):
        metadata, body = translate_posts.parse_document(
            "---\ntitle: 测试\ntranslate: true\n---\n\n正文\n"
        )
        self.assertEqual(metadata["title"], "测试")
        self.assertTrue(translate_posts.is_opted_in(metadata))
        self.assertEqual(body, "正文\n")

    def test_posts_after_launch_are_automatic_unless_disabled(self):
        launch = datetime(2026, 7, 28, 19, tzinfo=timezone.utc)
        self.assertTrue(
            translate_posts.is_opted_in(
                {"date": datetime(2026, 7, 29, 19, tzinfo=timezone.utc)}, launch
            )
        )
        self.assertFalse(
            translate_posts.is_opted_in(
                {"date": datetime(2026, 7, 29, 19, tzinfo=timezone.utc), "translate": False},
                launch,
            )
        )

    def test_permalink_uses_english_prefix(self):
        source = translate_posts.SOURCE_DIR / "2026-07-28-example.md"
        self.assertEqual(
            translate_posts.english_permalink({"permalink": "/posts/example/"}, source),
            "/en/posts/example/",
        )

    def test_validation_preserves_structural_targets(self):
        source = "See [x](https://example.com/a).[^1]\n\n```text\nstatus = open\n```\n\n[^1]: Ref"
        translated = {
            "title": "Title",
            "excerpt": "Excerpt",
            "body": "Read [x](https://example.com/a).[^1]\n\n```text\nstatus = open\n```\n\n[^1]: Ref",
        }
        translate_posts.validate_translation(source, translated)
        translated["body"] = translated["body"].replace("https://example.com/a", "https://example.com/b")
        with self.assertRaises(translate_posts.TranslationError):
            translate_posts.validate_translation(source, translated)

    def test_existing_hash_reads_generated_front_matter(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "post.md"
            path.write_text("---\nsource_hash: abc123\n---\nBody\n", encoding="utf-8")
            self.assertEqual(translate_posts.existing_hash(path), "abc123")


if __name__ == "__main__":
    unittest.main()
