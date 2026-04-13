// ============================================================
// MODALE DINAMIC — projets.html + index.html
// ============================================================

(function () {
  const btnOpen  = document.getElementById('btn-open-dinamic');
  const overlay  = document.getElementById('modal-dinamic');
  const btnClose = document.getElementById('btn-close-dinamic');

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
