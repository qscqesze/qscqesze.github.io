(() => {
  const reader = document.querySelector('[data-comic-reader]');
  if (!reader) return;
  const pages = Array.from(reader.querySelectorAll('.manga-page'));
  if (!pages.length) return;
  const picker = reader.querySelector('#reader-page');
  const previous = reader.querySelector('[data-reader-prev]');
  const next = reader.querySelector('[data-reader-next]');
  const progress = reader.querySelector('.reader-progress');
  const status = reader.querySelector('[data-reader-status]');
  const ending = reader.querySelector('.reader-ending');
  const themeButton = reader.querySelector('[data-reader-theme]');
  const widthButton = reader.querySelector('[data-reader-width]');
  const fullscreenButton = reader.querySelector('[data-reader-fullscreen]');
  const key = 'comic-progress:' + reader.dataset.comicReader;
  let current = 0;
  let mode = 'scroll';
  let frame = 0;
  let navigating = false;

  function readStorage(name) {
    try { return JSON.parse(localStorage.getItem(name)); } catch (_) { return null; }
  }
  function writeStorage(name, value) {
    try { localStorage.setItem(name, JSON.stringify(value)); } catch (_) { /* Storage is optional. */ }
  }
  function fromHash() {
    return pages.findIndex(page => '#' + page.id === location.hash);
  }
  function remember() {
    writeStorage(key, { index: current, pageId: pages[current].id });
  }
  function syncControls() {
    picker.value = String(current);
    progress.value = current + 1;
    progress.setAttribute('aria-valuetext', pages[current].dataset.pageLabel);
    previous.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    status.textContent = pages[current].dataset.pageLabel + '，共 ' + pages.length + ' 张';
  }
  function preload(index) {
    // Decode only the current and next page eagerly, leaving the rest lazy.
    pages.slice(index, index + 2).forEach(page => { page.querySelector('img').loading = 'eager'; });
  }
  function renderPages() {
    pages.forEach((page, index) => { page.hidden = mode === 'paged' && index !== current; });
    ending.hidden = mode === 'paged' && current !== pages.length - 1;
    syncControls();
    preload(current);
  }
  function showPage(index, updateUrl = true) {
    if (!Number.isInteger(index)) return;
    current = Math.max(0, Math.min(pages.length - 1, index));
    navigating = true;
    renderPages();
    if (updateUrl) history.replaceState(null, '', '#' + pages[current].id);
    if (mode === 'paged') window.scrollTo({ top: 0, behavior: 'instant' });
    else pages[current].scrollIntoView({ block: 'start', behavior: 'instant' });
    remember();
    requestAnimationFrame(() => { navigating = false; });
  }
  function setMode(value, reposition = true) {
    mode = value === 'paged' ? 'paged' : 'scroll';
    reader.dataset.readerMode = mode;
    reader.querySelectorAll('[data-mode]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    });
    reader.querySelector('[data-reader-tip]').textContent = mode === 'paged' ? '左右方向键或滑动翻页' : '向下滚动阅读';
    writeStorage('comic-reader-mode', mode);
    renderPages();
    if (reposition) showPage(current);
  }
  function syncTheme() {
    const dark = document.documentElement.dataset.theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.textContent = dark ? '日间' : '夜间';
    themeButton.setAttribute('aria-label', dark ? '切换到日间背景' : '切换到夜间背景');
  }
  function measureChrome() {
    const top = reader.querySelector('.reader-header').getBoundingClientRect().height;
    const bottom = reader.querySelector('.reader-footer').getBoundingClientRect().height;
    reader.style.setProperty('--reader-top', top + 'px');
    reader.style.setProperty('--reader-bottom', bottom + 'px');
  }

  reader.querySelectorAll('[data-reader-controls]').forEach(control => { control.hidden = false; });
  const saved = readStorage(key);
  const hashIndex = fromHash();
  if (hashIndex >= 0) current = hashIndex;
  else if (saved && Number.isInteger(saved.index)) current = Math.max(0, Math.min(pages.length - 1, saved.index));
  setMode(readStorage('comic-reader-mode'), false);
  syncTheme();
  measureChrome();

  previous.addEventListener('click', () => showPage(current - 1));
  next.addEventListener('click', () => showPage(current + 1));
  picker.addEventListener('change', () => showPage(Number(picker.value)));
  reader.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => setMode(button.dataset.mode));
  });
  widthButton.addEventListener('click', () => {
    const wide = reader.dataset.readerWide !== 'true';
    reader.dataset.readerWide = String(wide);
    widthButton.setAttribute('aria-pressed', String(wide));
    widthButton.textContent = wide ? '适屏' : '宽幅';
    showPage(current);
  });
  themeButton.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    if (dark) document.documentElement.dataset.theme = 'dark';
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) { /* Optional persistence. */ }
    syncTheme();
  });

  if (document.fullscreenEnabled && document.documentElement.requestFullscreen) {
    fullscreenButton.hidden = false;
    fullscreenButton.addEventListener('click', async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
        else await document.documentElement.requestFullscreen();
      } catch (_) { status.textContent = '浏览器暂不支持全屏，可以继续阅读。'; }
    });
    document.addEventListener('fullscreenchange', () => {
      fullscreenButton.textContent = document.fullscreenElement ? '退出全屏' : '全屏';
    });
  }

  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input, select, textarea, [contenteditable="true"]')) return;
    let index;
    if (event.key === 'ArrowRight' || (mode === 'paged' && event.key === 'PageDown')) index = current + 1;
    if (event.key === 'ArrowLeft' || (mode === 'paged' && event.key === 'PageUp')) index = current - 1;
    if (event.key === 'Home') index = 0;
    if (event.key === 'End') index = pages.length - 1;
    if (index !== undefined) { event.preventDefault(); showPage(index); }
  });

  // Ignore pinch zoom and vertical gestures; preserve native scrolling and image links.
  let touchStart = null;
  const stage = reader.querySelector('.reader-pages');
  stage.addEventListener('touchstart', event => {
    touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  stage.addEventListener('touchmove', event => {
    if (event.touches.length !== 1) touchStart = null;
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!touchStart || mode !== 'paged' || (window.visualViewport && window.visualViewport.scale > 1.05)) { touchStart = null; return; }
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      event.preventDefault();
      showPage(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: false });

  function trackScroll() {
    frame = 0;
    if (mode !== 'scroll' || navigating) return;
    const readingLine = reader.querySelector('.reader-header').getBoundingClientRect().bottom + (innerHeight - parseFloat(reader.style.getPropertyValue('--reader-top'))) * .3;
    let index = 0;
    pages.forEach((page, i) => { if (page.getBoundingClientRect().top <= readingLine) index = i; });
    if (index === current) return;
    current = index;
    syncControls();
    remember();
    // Keep a copied URL and refresh anchored to the page currently being read.
    history.replaceState(null, '', '#' + pages[current].id);
  }
  window.addEventListener('scroll', () => {
    if (!frame) frame = requestAnimationFrame(trackScroll);
  }, { passive: true });
  window.addEventListener('hashchange', () => {
    const index = fromHash();
    if (index >= 0) showPage(index, false);
  });
  window.addEventListener('pagehide', remember);
  window.addEventListener('resize', measureChrome);
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(measureChrome);
    observer.observe(reader.querySelector('.reader-header'));
    observer.observe(reader.querySelector('.reader-footer'));
  }
  requestAnimationFrame(() => {
    if (current > 0 || hashIndex >= 0) showPage(current);
    else remember();
  });
})();
