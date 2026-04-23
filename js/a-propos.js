// JavaScript spécifique à la page À propos

// ── ANIMATIONS ───────────────────────────────────────────────

// ── PHOTO INTRO ──────────────────────────────────────────────
// Slide depuis la droite au chargement
const introPhoto = document.querySelector('.apropos-intro-photo');
if (introPhoto) {
  // Reset sans transition pour éviter le saut
  introPhoto.style.transition = 'none';
  introPhoto.classList.remove('is-visible');
  introPhoto.classList.add('anim-from-right');
  void introPhoto.offsetHeight; // Forcer le reflow
  introPhoto.style.transition = '';
  setTimeout(() => introPhoto.classList.add('is-visible'), 100);
}

// ── CARDS ────────────────────────────────────────────────────
// Slide vers le haut au scroll, une par une (stagger 180ms)
const cards = document.querySelectorAll('.apropos-card');
cards.forEach((card, i) => {
  card.style.transition = 'none';
  card.classList.remove('is-visible');
  card.classList.add('anim-from-bottom');
  card.style.transitionDelay = '';
  void card.offsetHeight;
  card.style.transition = '';
});

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    const i = Array.from(cards).indexOf(card);
    setTimeout(() => card.classList.add('is-visible'), i * 180);
    cardObserver.unobserve(card);
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

setTimeout(() => cards.forEach(card => cardObserver.observe(card)), 100);

// ── PARCOURS SCOLAIRE ────────────────────────────────────────
// Slide depuis la gauche au scroll (stagger 120ms)
const scolaireItems = document.querySelectorAll('.scolaire-item');
scolaireItems.forEach((item, i) => {
  item.style.transition = 'none';
  item.classList.remove('is-visible');
  item.classList.add('anim-from-left');
  item.style.transitionDelay = `${i * 0.12}s`;
  void item.offsetHeight;
  item.style.transition = '';
});

const scolaireObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      scolaireObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

scolaireItems.forEach(item => scolaireObserver.observe(item));

// ── HOBBIES ──────────────────────────────────────────────────
// Card gauche depuis la gauche, card droite depuis la droite
const hobbiesCards = document.querySelectorAll('.hobbies-card');
hobbiesCards.forEach((card, i) => {
  card.style.transition = 'none';
  card.classList.remove('is-visible');
  card.classList.add(i === 0 ? 'anim-from-left' : 'anim-from-right');
  void card.offsetHeight;
  card.style.transition = '';
});

function checkHobbies() {
  let allVisible = true;
  hobbiesCards.forEach(card => {
    if (card.classList.contains('is-visible')) return;
    allVisible = false;
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      card.classList.add('is-visible');
    }
  });
  if (allVisible) window.removeEventListener('scroll', checkHobbies);
}

window.addEventListener('scroll', checkHobbies, { passive: true });
checkHobbies();
