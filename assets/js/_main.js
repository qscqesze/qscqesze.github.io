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
    readingTime.textContent = `约 ${readingMinutes} 分钟阅读`;
  }

  // Add unobtrusive permalink controls to article section headings.
  document.querySelectorAll('.page__content h2[id], .page__content h3[id]').forEach((heading) => {
    if (heading.querySelector('.heading-permalink')) return;
    const permalink = document.createElement('a');
    permalink.className = 'heading-permalink';
    permalink.href = `#${heading.id}`;
    permalink.setAttribute('aria-label', `链接到“${heading.textContent.trim()}”`);
    permalink.title = '此节链接';
    permalink.textContent = '#';
    heading.append(permalink);
  });

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
    copyButton.textContent = '复制';
    copyButton.setAttribute('aria-label', '复制代码');

    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        copyButton.textContent = '已复制';
        copyButton.classList.add('is-copied');
      } catch (error) {
        copyButton.textContent = '复制失败';
      }

      window.setTimeout(() => {
        copyButton.textContent = '复制';
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
