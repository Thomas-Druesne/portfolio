// ============================================================
// MODALE ENVIE NORD — fichier partagé (index.html + projets.html)
// Ouvre la modale au clic sur le déclencheur #btn-open-envie
// Ferme via : bouton ×, clic overlay, touche Échap
// ============================================================

(function () {
  const btnOpen  = document.getElementById('btn-open-envie');
  const overlay  = document.getElementById('modal-envie');
  const btnClose = document.getElementById('btn-close-envie');

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

  // Accessibilité : Enter/Espace si le déclencheur est un div
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
