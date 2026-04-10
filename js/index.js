// JavaScript spécifique à la page Accueil

// Effet de scroll sur la timeline du parcours
const timeline = document.querySelector('.timeline');

if (timeline) {
  function checkTimelineScroll() {
    // Calculer le pourcentage du scroll
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const scrollPercent = (scrolled / documentHeight) * 100;

    // Activer la timeline à 30% du scroll
    if (scrollPercent >= 30) {
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
