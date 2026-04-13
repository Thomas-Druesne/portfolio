// JavaScript spécifique à la page À propos

(function () {
  const track = document.getElementById('apropos-track');
  const prevBtn = document.getElementById('apropos-prev');
  const nextBtn = document.getElementById('apropos-next');

  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function getVisibleCount() {
    return window.innerWidth <= 400 ? 1 : 2;
  }

  function getCardCount() {
    return track.children.length;
  }

  function updateCarousel() {
    const visible = getVisibleCount();
    const total = getCardCount();
    const maxIndex = total - visible;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Calcul du pourcentage de translation par card
    const cardWidth = 100 / visible;
    track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
  }

  prevBtn.addEventListener('click', function () {
    currentIndex--;
    updateCarousel();
  });

  nextBtn.addEventListener('click', function () {
    const visible = getVisibleCount();
    const maxIndex = getCardCount() - visible;
    if (currentIndex < maxIndex) currentIndex++;
    updateCarousel();
  });

  window.addEventListener('resize', function () {
    currentIndex = 0;
    updateCarousel();
  });
})();
