// JavaScript spécifique à la page Accueil

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
