# qscqesze 的个人博客

这是我的个人博客源码，在线地址：[qscqesze.github.io](https://qscqesze.github.io/)。

我是 qscqesze，常驻北京。目前在 MiniMax 做软件工程师，也以 [SurprisingStudio](https://surprising.studio/) 的名义开发独立游戏。我关注 AI 驱动的系统与创意工具，也喜欢游戏设计、算法优化、旅行和历史。

## 这里写什么

- AI、系统工程与复杂技术的拆解
- 独立游戏的设计、开发与复盘
- 旅行中的城市、历史和现场观察
- 从博客园迁移来的早期算法与生活记录

站点的主要入口包括[文章](https://qscqesze.github.io/)、[分类](https://qscqesze.github.io/categories/)、[独立游戏](https://qscqesze.github.io/indie-games/)、[旧文](https://qscqesze.github.io/tags/#旧文)、[留言](https://qscqesze.github.io/guestbook/)、[访问统计](https://qscqesze.github.io/stats/)和[关于我](https://qscqesze.github.io/about/)。

## 仓库结构

- `_posts/`：现在持续更新的文章
- `_legacy/`：从博客园迁移的旧文，不出现在首页和 RSS 中
- `_pages/`：关于、留言、统计、归档等独立页面
- `images/`：文章图片与站点图标
- `stats-worker/`：访问统计使用的 Cloudflare Worker
- `.github/workflows/pages.yml`：GitHub Pages 构建与部署流程

## 本地运行

项目使用 Ruby 3.2.2 和 Jekyll：

```bash
bundle install
bundle exec jekyll serve
```

浏览器访问 <http://localhost:4000>。提交到 `master` 分支后，GitHub Actions 会自动构建并发布站点。

## 中英文版本与自动翻译

站点以中文文章为原稿，英文文章在构建前生成到 `_en_posts/`，最终作为普通静态页面发布在 `/en/` 下。中英文页面通过 `translation_url` 互相绑定，导航栏右上角可以切换语言，页面也会输出相应的 canonical、`hreflang` 和独立英文 Feed。

`translation.auto_after` 之后发布的新文章会默认自动生成英文版；单篇文章可以用 `translate: false` 关闭。若要为更早的旧文章补生成英文版，则在 front matter 中加入 `translate: true`，并补齐中英文互链：

```yaml
lang: zh-CN
translation_key: article-slug
translation_url: /en/posts/article-slug/
translate: true
```

在 GitHub 仓库的 **Settings → Secrets and variables → Actions** 中添加 repository secret `OPENAI_API_KEY` 后，每次 Pages 构建都会检查所有 `translate: true` 的文章。只有原文哈希发生变化或英文版缺失时才会请求翻译，生成结果会写入 `_en_posts/` 并由 Actions 提交回仓库。可选的 repository variable `OPENAI_TRANSLATION_MODEL` 能覆盖默认模型 `gpt-5.6-terra`。

本地检查英文缓存是否与中文原稿一致：

```bash
python -m pip install -r requirements-translation.txt
python scripts/translate_posts.py --all --check
```

本地重新生成指定文章（需要 `OPENAI_API_KEY`）：

```bash
python scripts/translate_posts.py --source _posts/YYYY-MM-DD-slug.md --force
```

## 联系我

- 邮箱：[qscqesze@gmail.com](mailto:qscqesze@gmail.com)
- GitHub：[@qscqesze](https://github.com/qscqesze)
- 独立游戏：[surprising.studio](https://surprising.studio/)

站点基于 [Academic Pages](https://academicpages.github.io/) 与 [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) 演化而来，相关代码遵循仓库中的 MIT License。
