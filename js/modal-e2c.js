// ============================================================
// MODALE E2C GRAND-LILLE — projets.html
// Ouvre la modale au clic sur le déclencheur #btn-open-e2c
// Ferme via : bouton ×, clic overlay, touche Échap
// ============================================================

(function () {
  const btnOpen  = document.getElementById('btn-open-e2c');
  const overlay  = document.getElementById('modal-e2c');
  const btnClose = document.getElementById('btn-close-e2c');

  if (!btnOpen || !overlay || !btnClose) return;

  function openModal() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    btnOpen.focus();
  }

  btnOpen.addEventListener('click', openModal);

  btnOpen.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal();
    }
  });

  btnClose.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
}());
