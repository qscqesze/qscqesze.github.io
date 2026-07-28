/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

// detect OS/browser preference
const browserPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const use_theme =
    theme ||
    localStorage.getItem("theme") ||
    $("html").attr("data-theme") ||
    browserPref;

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun").addClass("fa-moon");
  } else if (use_theme === "light") {
    $("html").removeAttr("data-theme");
    $("#theme-icon").removeClass("fa-moon").addClass("fa-sun");
  }
};

// Toggle the theme manually
var toggleTheme = () => {
  const current_theme = $("html").attr("data-theme");
  const new_theme = current_theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", new_theme);
  setTheme(new_theme);
};

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  // SCSS SETTINGS - These should be the same as the settings in the relevant files 
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
  const copyLabels = isEnglish
    ? { idle: 'Copy', copied: 'Copied', failed: 'Copy failed', aria: 'Copy code' }
    : { idle: '复制', copied: '已复制', failed: '复制失败', aria: '复制代码' };

  // If the user hasn't chosen a theme, follow the OS preference
  setTheme();
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Enable the theme toggle
  $('#theme-toggle').on('click', toggleTheme);

  // Calculate mixed Chinese/Latin reading time from the rendered article text.
  const readingContent = document.querySelector('.page__content');
  const readingTime = document.querySelector('.reading-time[data-reading-time]');
  if (readingContent && readingTime) {
    const readableCopy = readingContent.cloneNode(true);
    readableCopy.querySelectorAll('pre, code, nav, script, style, mjx-container').forEach((element) => element.remove());
    const readableText = readableCopy.textContent.replace(/\s+/g, ' ').trim();
    const cjkPattern = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;
    const cjkCharacters = (readableText.match(cjkPattern) || []).length;
    const latinText = readableText.replace(cjkPattern, ' ');
    const latinWords = latinText.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g) || [];
    const readingMinutes = Math.max(1, Math.ceil(cjkCharacters / 450 + latinWords.length / 220));
    readingTime.textContent = isEnglish
      ? `About ${readingMinutes} min read`
      : `约 ${readingMinutes} 分钟阅读`;
  }

  // Add unobtrusive permalink controls to article section headings.
  document.querySelectorAll('.page__content h2[id], .page__content h3[id]').forEach((heading) => {
    if (heading.querySelector('.heading-permalink')) return;
    const permalink = document.createElement('a');
    permalink.className = 'heading-permalink';
    permalink.href = `#${heading.id}`;
    permalink.setAttribute(
      'aria-label',
      isEnglish ? `Link to “${heading.textContent.trim()}”` : `链接到“${heading.textContent.trim()}”`
    );
    permalink.title = isEnglish ? 'Link to this section' : '此节链接';
    permalink.textContent = '#';
    heading.append(permalink);
  });

  // Build a responsive article table of contents outside the reading column.
  const pageToc = document.querySelector('[data-page-toc]');
  const pageTocNav = pageToc && pageToc.querySelector('.page__toc-nav');
  const pageTocToggle = pageToc && pageToc.querySelector('.page__toc-toggle');
  const articleHeadings = Array.from(document.querySelectorAll('.page__content h2[id]'));

  if (pageToc && pageTocNav && pageTocToggle && articleHeadings.length > 1) {
    document.querySelectorAll('.page__content > .article-toc').forEach((inlineToc) => inlineToc.remove());

    const tocList = document.createElement('ol');
    tocList.className = 'page__toc-list';
    const tocLinks = new Map();

    articleHeadings.forEach((heading) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const headingCopy = heading.cloneNode(true);
      headingCopy.querySelectorAll('.heading-permalink').forEach((permalink) => permalink.remove());

      item.className = 'page__toc-item';
      link.href = `#${heading.id}`;
      link.textContent = headingCopy.textContent.trim();
      link.className = 'page__toc-link';
      item.append(link);
      tocList.append(item);
      tocLinks.set(heading.id, link);
    });

    pageTocNav.append(tocList);
    pageToc.hidden = false;
    pageToc.closest('.page__post-layout').classList.add('has-toc');
    pageToc.closest('.page--with-toc').classList.add('has-toc');

    const mobileToc = window.matchMedia('(max-width: 1250px)');
    const syncTocMode = () => {
      if (mobileToc.matches) {
        const isOpen = pageToc.classList.contains('is-open');
        pageTocToggle.setAttribute('aria-expanded', String(isOpen));
      } else {
        pageToc.classList.remove('is-open');
        pageTocToggle.setAttribute('aria-expanded', 'true');
      }
    };

    pageTocToggle.addEventListener('click', () => {
      if (!mobileToc.matches) return;
      const isOpen = pageToc.classList.toggle('is-open');
      pageTocToggle.setAttribute('aria-expanded', String(isOpen));
    });

    tocLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (!mobileToc.matches) return;
        pageToc.classList.remove('is-open');
        pageTocToggle.setAttribute('aria-expanded', 'false');
      });
    });

    if (typeof mobileToc.addEventListener === 'function') {
      mobileToc.addEventListener('change', syncTocMode);
    } else {
      mobileToc.addListener(syncTocMode);
    }
    syncTocMode();

    let activeHeadingId = '';
    let tocScrollQueued = false;
    const updateActiveTocLink = () => {
      tocScrollQueued = false;
      const activationLine = 112;
      let currentHeading = articleHeadings[0];

      articleHeadings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= activationLine) currentHeading = heading;
      });

      if (!currentHeading || currentHeading.id === activeHeadingId) return;
      activeHeadingId = currentHeading.id;
      tocLinks.forEach((link, headingId) => {
        const isActive = headingId === activeHeadingId;
        link.classList.toggle('is-active', isActive);
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      const activeLink = tocLinks.get(activeHeadingId);
      const scrollContainer = pageToc.querySelector('.page__toc-inner');
      if (!activeLink || !scrollContainer || mobileToc.matches) return;
      const linkBounds = activeLink.getBoundingClientRect();
      const containerBounds = scrollContainer.getBoundingClientRect();
      if (linkBounds.top < containerBounds.top + 44) {
        scrollContainer.scrollTop -= containerBounds.top + 44 - linkBounds.top;
      } else if (linkBounds.bottom > containerBounds.bottom - 12) {
        scrollContainer.scrollTop += linkBounds.bottom - containerBounds.bottom + 12;
      }
    };

    const queueActiveTocUpdate = () => {
      if (tocScrollQueued) return;
      tocScrollQueued = true;
      window.requestAnimationFrame(updateActiveTocLink);
    };

    window.addEventListener('scroll', queueActiveTocUpdate, { passive: true });
    window.addEventListener('resize', queueActiveTocUpdate);
    updateActiveTocLink();
  }

  // Add copy buttons only to source-code blocks, leaving rendered diagrams alone.
  document.querySelectorAll('.page__content pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code || code.matches('.language-mermaid, .language-plotly')) return;

    let container = pre.closest('div.highlighter-rouge, figure.highlight');
    if (!container) {
      container = document.createElement('div');
      container.className = 'code-block';
      pre.replaceWith(container);
      container.append(pre);
    }

    if (container.querySelector('.code-copy-button')) return;
    container.classList.add('has-copy-button');

    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button';
    copyButton.type = 'button';
    copyButton.textContent = copyLabels.idle;
    copyButton.setAttribute('aria-label', copyLabels.aria);

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        copyButton.textContent = copyLabels.copied;
        copyButton.classList.add('is-copied');
      } catch (error) {
        copyButton.textContent = copyLabels.failed;
      }

      window.setTimeout(() => {
        copyButton.textContent = copyLabels.idle;
        copyButton.classList.remove('is-copied');
      }, 1600);
    });

    container.append(copyButton);
  });

  // Reveal the back-to-top control only after the reader has moved into the article.
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 720);
    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop.addEventListener('click', () => {
      backToTop.classList.remove('is-visible');
      window.scrollTo(0, 0);
    });
  }

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});
