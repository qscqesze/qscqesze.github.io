(() => {
  const tablist = document.querySelector('[data-comic-tabs]');
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('[data-comic-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-comic-panel]'));

  function activate(id, updateUrl = false) {
    const active = tabs.find(tab => tab.dataset.comicTab === id) || tabs[0];
    tabs.forEach(tab => {
      const selected = tab === active;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => { panel.hidden = panel.id !== active.dataset.comicTab; });
    if (updateUrl) history.replaceState(null, '', '#' + active.dataset.comicTab);
  }

  tablist.setAttribute('role', 'tablist');
  panels.forEach(panel => { panel.setAttribute('role', 'tabpanel'); panel.tabIndex = 0; });
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', tab.dataset.comicTab);
    tab.addEventListener('click', event => {
      event.preventDefault();
      activate(tab.dataset.comicTab, true);
    });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      tabs[next].focus();
      activate(tabs[next].dataset.comicTab, true);
    });
  });

  function updateProgress() {
    document.querySelectorAll('[data-continue-comic]').forEach(link => {
      const restart = link.closest('[data-comic-panel]').querySelector('[data-restart-comic]');
      link.href = link.href.split('#')[0];
      link.textContent = '开始阅读 →';
      if (restart) restart.hidden = true;
      try {
        const saved = JSON.parse(localStorage.getItem('comic-progress:' + link.dataset.continueComic));
        if (!saved || !Number.isInteger(saved.index) || saved.index <= 0 || typeof saved.pageId !== 'string' || !/^manga-(cover|page-\d+)$/.test(saved.pageId)) return;
        const label = saved.pageId === 'manga-cover' ? '封面' : '第 ' + Number(saved.pageId.split('-').pop()) + ' 页';
        link.href = link.href.split('#')[0] + '#' + saved.pageId;
        link.textContent = '继续阅读 · ' + label + ' →';
        if (restart) restart.hidden = false;
      } catch (_) { /* Reading also works without browser storage. */ }
    });
  }

  activate(location.hash.slice(1));
  updateProgress();
  window.addEventListener('hashchange', () => activate(location.hash.slice(1)));
  window.addEventListener('pageshow', updateProgress);
  window.addEventListener('storage', updateProgress);
})();
