// JavaScript spécifique à la page Accueil

// ── ANIMATIONS AU SCROLL ────────────────────────────────────

function setupScrollAnimations() {
  // Assigner une classe d'animation à chaque élément sélectionné
  // delay : délai de transition en secondes, incrémenté par index pour le stagger
  function addAnim(selector, animClass, delay = 0) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(animClass);
      if (delay > 0) el.style.transitionDelay = `${(delay * i).toFixed(2)}s`;
    });
  }

  // Hero — slide-in au chargement via @keyframes (pas de dépendance à un état initial)
  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) setTimeout(() => heroPhoto.classList.add('hero-photo--animate'), 80);

  // Sections suivantes — observées au scroll
  addAnim('.projets .section-header',   'anim-from-bottom');
  addAnim('.projet-card',               'anim-from-bottom', 0.12);
  addAnim('.book-img',                  'anim-from-left');
  addAnim('.book-content',              'anim-from-right');
  addAnim('.competences .section-header', 'anim-from-bottom');
  addAnim('.competence-card',           'anim-from-bottom', 0.1);
addAnim('.outils-text',               'anim-from-left');
  addAnim('.outils-grid .outil-item',   'anim-from-bottom', 0.05);

  // Observer : déclenche is-visible quand l'élément entre dans le viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observer tous les éléments animés hors du hero
  document.querySelectorAll('.anim-from-left, .anim-from-right, .anim-from-bottom')
    .forEach(el => {
      if (!el.closest('.hero')) observer.observe(el);
    });
}

setupScrollAnimations();

// ── TIMELINE JAUGE ──────────────────────────────────────────

// Effet de jauge sur la timeline du parcours
const timeline = document.querySelector('.timeline');

if (timeline) {
  const dots = timeline.querySelectorAll('.timeline-dot');

  function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const midpoint = windowHeight * 0.5;
    const timelineHeight = rect.bottom - rect.top;

    // Progression du remplissage :
    // 0% quand le haut de la timeline est au milieu de l'écran
    // 100% quand le bas de la timeline est au milieu de l'écran
    const fillProgress = Math.min(1, Math.max(0, (midpoint - rect.top) / timelineHeight));

    timeline.style.setProperty('--fill-percent', `${fillProgress * 100}%`);

    // Chaque point devient cyan quand le niveau de remplissage l'atteint
    dots.forEach(dot => {
      const dotRect = dot.getBoundingClientRect();
      const dotCenter = dotRect.top + dotRect.height / 2;
      const dotRelativePos = (dotCenter - rect.top) / timelineHeight;

      dot.style.background = fillProgress >= dotRelativePos ? 'var(--secondary)' : '#ffffff';
    });
  }

  window.addEventListener('scroll', updateTimeline);
  updateTimeline();
}
