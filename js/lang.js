(function () {
  var KEY = 'portfolio-lang';
  var FADE_MS = 160;

  function get() {
    return localStorage.getItem(KEY) || 'fr';
  }

  function swapContent(lang) {
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-fr]').forEach(function (el) {
      el.textContent = lang === 'fr' ? el.dataset.fr : el.dataset.en;
    });

    var titles = {
      fr: { 'projets.html': 'Portfolio - Projets', 'a-propos.html': 'Portfolio - À propos', 'contact.html': 'Portfolio - Contact' },
      en: { 'projets.html': 'Portfolio - Projects', 'a-propos.html': 'Portfolio - About', 'contact.html': 'Portfolio - Contact' }
    };
    var page = location.pathname.split('/').pop() || 'index.html';
    if (titles[lang] && titles[lang][page]) document.title = titles[lang][page];

    var img = document.getElementById('lang-flag');
    if (img) {
      img.src = lang === 'fr' ? 'img/english_flag.png' : 'img/french_flag.png';
      img.alt = lang === 'fr' ? 'EN' : 'FR';
    }
  }

  function apply(lang, animate) {
    if (!animate) {
      swapContent(lang);
      return;
    }

    var transEls = Array.from(document.querySelectorAll('[data-fr]'));
    var flagImg = document.getElementById('lang-flag');

    transEls.forEach(function (el) { el.style.opacity = '0'; });
    if (flagImg) flagImg.style.opacity = '0';

    setTimeout(function () {
      swapContent(lang);
      requestAnimationFrame(function () {
        transEls.forEach(function (el) { el.style.opacity = ''; });
        if (flagImg) flagImg.style.opacity = '';
      });
    }, FADE_MS);
  }

  document.addEventListener('DOMContentLoaded', function () {
    apply(get(), false);
    var btn = document.getElementById('lang-btn');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = get() === 'fr' ? 'en' : 'fr';
        localStorage.setItem(KEY, next);
        apply(next, true);
      });
    }
  });
}());
