// main.js - JavaScript global (header / footer)

// ===== Injection header / footer =====
(function () {
  if (document.getElementById('main-nav')) return;

  const HEADER = `
  <button class="lang-btn" id="lang-btn" aria-label="Switch language">
    <img src="img/english_flag.png" alt="EN" id="lang-flag" />
  </button>
  <header>
    <div class="header-inner">
      <a href="index.html" class="logo">
        <img src="img/logo-portfolio-white.png" alt="Logo TO" />
      </a>
      <nav id="main-nav">
        <a href="projets.html" data-fr="Mes projets" data-en="My projects">Mes projets</a>
        <a href="a-propos.html" data-fr="À Propos" data-en="About">À Propos</a>
        <a href="contact.html" data-fr="Me contacter" data-en="Contact me">Me contacter</a>
      </nav>
      <a href="img/CV_DRUESNE_Thomas.pdf" class="btn-cv" target="_blank" rel="noopener" data-fr="Mon CV" data-en="My Resume">Mon CV</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>`;

  const FOOTER = `
  <footer>
    <div class="footer-inner">
      <p class="footer-copy" data-fr="©2026 - Tous droits réservés DRUESNE Thomas" data-en="©2026 - All rights reserved DRUESNE Thomas">©2026 - Tous droits réservés DRUESNE Thomas</p>
      <a href="https://www.linkedin.com/in/thomas-druesne-webdesign-developpeur/" class="footer-linkedin" target="_blank" rel="noopener">
        <img src="img/logo_lkd_footer.png" alt="LinkedIn" />
      </a>
    </div>
  </footer>`;

  document.body.insertAdjacentHTML('afterbegin', HEADER);
  const main = document.querySelector('main');
  if (main) main.insertAdjacentHTML('afterend', FOOTER);
}());

// ===== Page Active Indicator =====
(function () {
  const nav = document.getElementById('main-nav');
  if (nav) {
    const currentPage = window.location.pathname;
    const links = nav.querySelectorAll('a');

    links.forEach(link => {
      const href = link.getAttribute('href');
      // Vérifier si le lien correspond à la page actuelle
      if ((currentPage.includes('projets.html') && href === 'projets.html') ||
          (currentPage.includes('a-propos.html') && href === 'a-propos.html') ||
          (currentPage.includes('contact.html') && href === 'contact.html') ||
          ((currentPage === '/' || currentPage.endsWith('index.html')) && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
})();

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Ferme le menu au clic sur un lien
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// ===== Back to top =====
(function () {
  // Injection du bouton dans le DOM
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15V5M10 5L5 10M10 5L15 10"
            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  document.body.appendChild(btn);

  // Apparition à partir de 20% de scroll
  window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total > 0 && (scrolled / total) * 100 >= 20) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  // Scroll vers le haut
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
