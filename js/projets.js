// JavaScript spécifique à la page Projets

// ── ANIMATIONS ─────────────────────────────────────────────

function setupProjetAnimations() {
  const leftItems  = Array.from(document.querySelectorAll('.realisation--left'));
  const rightItems = Array.from(document.querySelectorAll('.realisation--right'));
  const allItems   = [...leftItems, ...rightItems];
  const firstLeft  = leftItems[0];

  // 1. Désactiver les transitions pour que le reset soit instantané (sans saut)
  allItems.forEach(el => el.style.transition = 'none');

  // 2. Appliquer l'état initial (invisible + décalé) immédiatement
  leftItems.forEach(el  => { el.classList.remove('is-visible'); el.classList.add('anim-from-left'); });
  rightItems.forEach(el => { el.classList.remove('is-visible'); el.classList.add('anim-from-right'); });

  // 3. Forcer le reflow pour que le navigateur peigne l'état initial
  allItems.forEach(el => void el.offsetHeight);

  // 4. Réactiver les transitions
  allItems.forEach(el => el.style.transition = '');

  // 5. Inzerty — déclencher l'animation au chargement
  if (firstLeft) {
    setTimeout(() => firstLeft.classList.add('is-visible'), 100);
  }

  // 6. Le reste — déclenché au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  allItems.forEach(el => {
    if (el !== firstLeft) observer.observe(el);
  });
}

setupProjetAnimations();
