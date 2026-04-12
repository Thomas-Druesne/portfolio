// ============================================================
// MODALE — Inzerty
// Ouvre la modale au clic sur "En savoir plus"
// Ferme via : bouton ×, clic overlay, touche Échap
// ============================================================

(function () {
  const btnOpen  = document.getElementById('btn-open-inzerty');
  const overlay  = document.getElementById('modal-inzerty');
  const btnClose = document.getElementById('btn-close-inzerty');

  if (!btnOpen || !overlay || !btnClose) return;

  /* ── Ouverture ── */
  function openModal() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // bloque le scroll page
    btnClose.focus();
  }

  /* ── Fermeture ── */
  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    btnOpen.focus(); // restitue le focus au bouton déclencheur
  }

  /* ── Événements ── */
  btnOpen.addEventListener('click', openModal);

  btnClose.addEventListener('click', closeModal);

  // Clic dans le vide (sur l'overlay, pas sur la modale)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // Touche Échap
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
}());
