// main.js - JavaScript global (header / footer)

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
