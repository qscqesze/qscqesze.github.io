const root = document.querySelector('[data-site-search]');

if (root) {
  const form = root.querySelector('.site-search__form');
  const input = root.querySelector('.site-search__input');
  const status = root.querySelector('[data-search-status]');
  const results = root.querySelector('[data-search-results]');
  const indexPromise = fetch('/search.json', { credentials: 'same-origin' }).then((response) => {
    if (!response.ok) throw new Error(`Search index returned ${response.status}`);
    return response.json();
  });

  const normalize = (value) => String(value || '').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  const values = (value) => Array.isArray(value) ? value : [];

  const scorePost = (post, query, terms) => {
    const title = normalize(post.title);
    const excerpt = normalize(post.excerpt);
    const categories = normalize(values(post.categories).join(' '));
    const tags = normalize(values(post.tags).join(' '));
    const content = normalize(post.content);
    const haystack = `${title} ${categories} ${tags} ${excerpt} ${content}`;

    if (!terms.every((term) => haystack.includes(term))) return 0;

    let score = 1;
    if (title.includes(query)) score += 80;
    if (tags.includes(query)) score += 45;
    if (categories.includes(query)) score += 35;
    if (excerpt.includes(query)) score += 20;
    terms.forEach((term) => {
      if (title.includes(term)) score += 24;
      if (tags.includes(term)) score += 12;
      if (categories.includes(term)) score += 10;
      if (excerpt.includes(term)) score += 5;
    });
    return score;
  };

  const resultCard = (post) => {
    const article = document.createElement('article');
    article.className = 'site-search__result';

    const title = document.createElement('h2');
    title.className = 'site-search__result-title';
    const link = document.createElement('a');
    link.href = post.url;
    link.textContent = post.title;
    title.append(link);

    const meta = document.createElement('p');
    meta.className = 'site-search__result-meta';
    const topics = values(post.categories).join(' · ');
    meta.textContent = [post.date, topics, post.legacy ? '旧文' : ''].filter(Boolean).join(' · ');

    const excerpt = document.createElement('p');
    excerpt.className = 'site-search__result-excerpt';
    excerpt.textContent = post.excerpt || normalize(post.content).slice(0, 180);

    article.append(title, meta, excerpt);
    return article;
  };

  let searchVersion = 0;
  const runSearch = async () => {
    const version = ++searchVersion;
    const query = normalize(input.value);
    results.replaceChildren();

    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', input.value.trim());
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);

    if (!query) {
      status.textContent = '输入关键词开始搜索。';
      return;
    }

    status.textContent = '正在搜索…';

    try {
      const index = await indexPromise;
      if (version !== searchVersion) return;
      const terms = query.split(' ').filter(Boolean);
      const matches = index
        .map((post) => ({ post, score: scorePost(post, query, terms) }))
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
        .slice(0, 30);

      status.textContent = matches.length
        ? `找到 ${matches.length} 篇相关内容${matches.length === 30 ? '（最多显示 30 篇）' : ''}。`
        : '没有找到相关内容，可以换一个更短的关键词。';
      results.append(...matches.map(({ post }) => resultCard(post)));
    } catch (error) {
      status.textContent = '搜索索引暂时无法加载，请稍后重试。';
    }
  };

  let inputTimer;
  input.addEventListener('input', () => {
    window.clearTimeout(inputTimer);
    inputTimer = window.setTimeout(runSearch, 120);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.clearTimeout(inputTimer);
    runSearch();
  });

  const initialQuery = new URLSearchParams(window.location.search).get('q');
  if (initialQuery) {
    input.value = initialQuery;
    runSearch();
  }
}
