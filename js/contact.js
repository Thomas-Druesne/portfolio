// ============================================================
// PAGE CONTACT - FORMULAIRE SÉCURISÉ & FONCTIONNEL
// ============================================================

// Configuration FormSubmit (ID sécurisé - protège l'email contre les bots)
const FORM_ENDPOINT = 'https://formsubmit.co/7ec45ce06ef8a4f0a1b44f422af43ff4';
const RATE_LIMIT_KEY = 'contact-form-last-submit';
const RATE_LIMIT_DURATION = 3000; // 3 secondes entre deux envois

// ===== Validation ===== //
const validators = {
  name: (value) => {
    if (!value.trim()) return 'Le nom est requis';
    if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
    if (value.trim().length > 100) return 'Le nom ne peut pas dépasser 100 caractères';
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return 'Le nom contient des caractères invalides';
    return '';
  },

  firstname: (value) => {
    if (!value.trim()) return 'Le prénom est requis';
    if (value.trim().length < 2) return 'Le prénom doit contenir au moins 2 caractères';
    if (value.trim().length > 100) return 'Le prénom ne peut pas dépasser 100 caractères';
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) return 'Le prénom contient des caractères invalides';
    return '';
  },

  email: (value) => {
    if (!value.trim()) return 'L\'email est requis';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.trim())) return 'Veuillez entrer une adresse email valide';
    if (value.trim().length > 100) return 'L\'email est trop long';
    return '';
  },

  phone: (value) => {
    if (!value.trim()) return ''; // Téléphone optionnel
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value.trim())) return 'Le numéro de téléphone contient des caractères invalides';
    if (value.trim().length < 8) return 'Le numéro de téléphone doit être valide';
    return '';
  },

  subject: (value) => {
    if (!value.trim()) return 'L\'objet est requis';
    if (value.trim().length < 5) return 'L\'objet doit contenir au moins 5 caractères';
    if (value.trim().length > 200) return 'L\'objet ne peut pas dépasser 200 caractères';
    if (!/^[a-zA-Z0-9À-ÿ\s\-_.!?(),'&]+$/.test(value)) return 'L\'objet contient des caractères invalides';
    return '';
  },

  message: (value) => {
    if (!value.trim()) return 'Le message est requis';
    if (value.trim().length < 10) return 'Le message doit contenir au moins 10 caractères';
    if (value.trim().length > 5000) return 'Le message ne peut pas dépasser 5000 caractères';
    return '';
  },
};

// ===== Nettoyage des données ===== //
function sanitizeInput(input) {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// ===== Gestion du formulaire ===== //
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const honeypot = form.querySelector('input[name="website"]');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // 🛡️ Vérification honeypot (protection bot)
    if (honeypot.value !== '') {
      console.warn('Honeypot détecté - envoi bloqué');
      return;
    }

    // ⏱️ Rate limiting
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSubmit && Date.now() - parseInt(lastSubmit) < RATE_LIMIT_DURATION) {
      showError('Veuillez attendre quelques secondes avant de renvoyer le formulaire');
      return;
    }

    // ✓ Validation des champs
    const isValid = validateForm();
    if (!isValid) return;

    // 📤 Envoi du formulaire
    await submitForm();
  });

  // Validation en temps réel
  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', function () {
      validateField(this);
    });

    field.addEventListener('focus', function () {
      clearError(this);
    });
  });
});

// ===== Validation du formulaire ===== //
function validateForm() {
  const form = document.getElementById('contact-form');
  let isValid = true;

  ['name', 'firstname', 'email', 'phone', 'subject', 'message'].forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

// ===== Validation d'un champ spécifique ===== //
function validateField(field) {
  const fieldName = field.id;
  const value = field.value;
  const validator = validators[fieldName];

  if (!validator) return true;

  const error = validator(value);

  if (error) {
    showFieldError(field, error);
    return false;
  } else {
    clearError(field);
    return true;
  }
}

// ===== Affichage erreur d'un champ ===== //
function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);
  field.classList.add('error');
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }
}

// ===== Effacer erreur d'un champ ===== //
function clearError(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  field.classList.remove('error');
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove('show');
  }
}

// ===== Envoi du formulaire ===== //
async function submitForm() {
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('.btn-submit');
  const originalButtonText = submitButton.textContent;

  try {
    // Désactiver le bouton
    submitButton.disabled = true;
    submitButton.textContent = 'Envoi en cours...';

    // Préparer les données sanitisées
    const formData = new FormData();
    const fields = ['name', 'firstname', 'email', 'phone', 'subject', 'message'];

    fields.forEach((fieldName) => {
      const value = document.getElementById(fieldName).value;
      formData.append(fieldName, sanitizeInput(value));
    });

    // Ajouter des champs spéciaux pour FormSubmit
    formData.append('_subject', `Nouveau message de ${sanitizeInput(document.getElementById('name').value)} ${sanitizeInput(document.getElementById('firstname').value)}`);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table'); // Format du email

    // Envoyer via FormSubmit
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // ✓ Succès
      showSuccess();
      form.reset();
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        document.getElementById('form-success').classList.add('hidden');
      }, 5000);
    } else {
      // ✗ Erreur serveur
      showError('Une erreur s\'est produite lors de l\'envoi. Veuillez réessayer.');
      console.error('Erreur FormSubmit:', response.status, response.statusText);
    }
  } catch (error) {
    // ✗ Erreur réseau
    showError('Erreur de connexion. Vérifiez votre connexion internet et réessayez.');
    console.error('Erreur d\'envoi:', error);
  } finally {
    // Réactiver le bouton
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  }
}

// ===== Affichage succès ===== //
function showSuccess() {
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');

  errorMessage.classList.add('hidden');
  successMessage.classList.remove('hidden');
}

// ===== Affichage erreur générale ===== //
function showError(message) {
  const errorMessage = document.getElementById('form-error');
  const successMessage = document.getElementById('form-success');

  if (message) {
    errorMessage.textContent = '✗ ' + message;
  }
  successMessage.classList.add('hidden');
  errorMessage.classList.remove('hidden');
}

// ============================================================
// PAGE CONTACT - ANIMATIONS
// ============================================================

// Helper : reset instantané sans saut visuel
function initAnim(el, animClass) {
  if (!el) return;
  el.style.transition = 'none';
  el.classList.remove('is-visible');
  el.classList.add(animClass);
  void el.offsetHeight; // Forcer le reflow
  el.style.transition = '';
}

const contactInfo       = document.querySelector('.contact-info');
const contactTitleBlock = document.querySelector('.contact-info .contact-title-block');
const contactDetails    = document.querySelector('.contact-details');
const contactFormWrapper = document.querySelector('.contact-form-wrapper');

// Appliquer l'état initial immédiatement (invisible + décalé)
initAnim(contactInfo,        'anim-from-left');
initAnim(contactTitleBlock,  'anim-from-left');
initAnim(contactDetails,     'anim-from-bottom');
initAnim(contactFormWrapper, 'anim-from-right');

if (contactDetails) contactDetails.style.transitionDelay = '0.15s';

// Déclencher les animations d'arrivée
setTimeout(() => {
  if (contactInfo)        contactInfo.classList.add('is-visible');
  if (contactFormWrapper) contactFormWrapper.classList.add('is-visible');
}, 100);

// Title block et details : observer (ils sont dans le viewport)
setTimeout(() => {
  const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        contactObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -60px 0px' });

  if (contactTitleBlock) contactObserver.observe(contactTitleBlock);
  if (contactDetails)    contactObserver.observe(contactDetails);
}, 100);
