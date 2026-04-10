// JavaScript spécifique à la page Accueil

// Effet de scroll sur la timeline du parcours
const timeline = document.querySelector('.timeline');

if (timeline) {
  function checkTimelineScroll() {
    // Obtenir la position de la timeline dans le viewport
    const timelineRect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Activer la timeline quand elle atteint 30% de la hauteur du viewport
    const triggerPoint = windowHeight * 0.7;  // 70% de la hauteur (30% du bas)

    if (timelineRect.top <= triggerPoint) {
      timeline.classList.add('active');
    } else {
      timeline.classList.remove('active');
    }
  }

  // Écouter l'événement scroll
  window.addEventListener('scroll', checkTimelineScroll);

  // Vérifier au chargement de la page
  checkTimelineScroll();
}
