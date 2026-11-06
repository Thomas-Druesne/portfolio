// ============================================================
// APP.JS — Interface "chat IA" (accueil + nouvelle conversation)
//  1. Langue FR / EN
//  2. Barre latérale (repli desktop, tiroir mobile)
//  3. Conversation : sujets, saisie libre, historique (#hash)
//  4. Modales projets
//
// <body data-page="home"> : index.html (photo + accueil, sujets via #hash)
// <body data-page="chat"> : chat.html  (chat classique, message d'accueil)
// ============================================================

(function () {
  var page      = document.body.dataset.page || 'home';
  var app       = document.getElementById('app');
  var chat      = document.getElementById('chat');
  var thread    = document.getElementById('thread');
  var scroller  = document.getElementById('chat-scroll');
  var answers   = document.getElementById('answers');
  var form      = document.getElementById('composer');
  var prompt    = document.getElementById('prompt');
  var sendBtn   = form.querySelector('.send-btn');
  var mqMobile  = window.matchMedia('(max-width: 900px)');

  // ==========================================================
  // 1. LANGUE
  // ==========================================================
  var LANG_KEY = 'portfolio-lang';
  function lang() { return localStorage.getItem(LANG_KEY) || 'fr'; }

  function applyLang(root) {
    var l = lang();
    root = root || document;
    if (root === document) document.documentElement.lang = l;

    root.querySelectorAll('[data-fr]').forEach(function (el) {
      el.textContent = el.dataset[l];
    });
    root.querySelectorAll('[data-fr-placeholder]').forEach(function (el) {
      el.placeholder = el.dataset[l + 'Placeholder'];
    });
    root.querySelectorAll('[data-fr-aria]').forEach(function (el) {
      el.setAttribute('aria-label', el.dataset[l + 'Aria']);
    });
    // Bulles "question" générées depuis un sujet
    root.querySelectorAll('.bubble[data-q-fr]').forEach(function (el) {
      el.textContent = el.dataset[l === 'fr' ? 'qFr' : 'qEn'];
    });
  }

  // Changement de langue au clic : les textes s'estompent, changent,
  // puis réapparaissent. Uniquement au clic (pas au chargement des pages).
  var LANG_FADE = 220;
  var langBusy = false;
  var html = document.documentElement;

  document.getElementById('lang-btn').addEventListener('click', function () {
    if (langBusy) return;
    langBusy = true;
    localStorage.setItem(LANG_KEY, lang() === 'fr' ? 'en' : 'fr');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyLang(document);
      updateThemeLabel();
      langBusy = false;
      return;
    }

    html.classList.add('lang-anim', 'lang-out');
    setTimeout(function () {
      applyLang(document);
      updateThemeLabel();
      requestAnimationFrame(function () {
        html.classList.remove('lang-out');
        setTimeout(function () {
          html.classList.remove('lang-anim');
          langBusy = false;
        }, LANG_FADE + 60);
      });
    }, LANG_FADE);
  });

  // ==========================================================
  // 1 bis. THÈME — dark par défaut, light au clic
  // (le thème enregistré est appliqué dès le <head> de chaque page)
  // ==========================================================
  var THEME_KEY = 'portfolio-theme';
  var themeBtn = document.getElementById('theme-btn');

  function isLight() { return document.documentElement.dataset.theme === 'light'; }

  function updateThemeLabel() {
    if (!themeBtn) return;
    var fr = lang() === 'fr';
    themeBtn.setAttribute('aria-label', isLight()
      ? (fr ? 'Passer en mode sombre' : 'Switch to dark mode')
      : (fr ? 'Passer en mode clair' : 'Switch to light mode'));
    themeBtn.title = themeBtn.getAttribute('aria-label');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var light = !isLight();
      if (light) document.documentElement.dataset.theme = 'light';
      else delete document.documentElement.dataset.theme;
      localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
      updateThemeLabel();
    });
  }

  // ==========================================================
  // 2. BARRE LATÉRALE
  // ==========================================================
  var sideBtns = [document.getElementById('sidebar-open'), document.getElementById('sidebar-close')];

  // Relance l'animation du bouton (rebond + flèche qui pivote)
  function animateToggle() {
    sideBtns.forEach(function (btn) {
      btn.classList.remove('is-flipping');
      void btn.offsetWidth; // force le redémarrage de l'animation CSS
      btn.classList.add('is-flipping');
    });
  }

  function toggleSidebar(open) {
    if (mqMobile.matches) {
      app.classList.toggle('is-drawer-open', open);
    } else {
      app.classList.toggle('is-collapsed', !open);
    }
    animateToggle();
  }
  document.getElementById('sidebar-open').addEventListener('click', function () { toggleSidebar(true); });
  document.getElementById('sidebar-close').addEventListener('click', function () { toggleSidebar(false); });
  document.getElementById('sidebar-scrim').addEventListener('click', function () { toggleSidebar(false); });

  function setActive(topic) {
    document.querySelectorAll('.side-item[data-topic]').forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.topic === topic);
    });
  }

  // ==========================================================
  // 3. CONVERSATION
  // ==========================================================

  // Mots-clés → sujet (pour les questions tapées librement)
  var KEYWORDS = [
    ['cv',          /\b(cv|resume|résumé|curriculum)\b/],
    ['contact',     /(contact|joindre|\bmail\b|e-?mail|écrire|ecrire|appeler|téléphone|telephone|recrut|embauch|\bhire\b|disponib|freelance|devis)/],
    ['book',        /(\bbook\b|graphi|\bprint|\blogo|affiche|branding|illustration)/],
    ['projets',     /(projet|project|réalisation|realisation|\bsites?\b|website|inzerty|e2c|dinamic|envie nord|travaux|\bworks?\b|portfolio)/],
    ['competences', /(compétence|competence|skill|sais[- ]tu faire|\bux\b|\bui\b|\bseo\b|référencement|referencement|design|intégration|integration|responsive)/],
    ['parcours',    /(parcours|expérience|experience|carrière|carriere|career|stage|alternance|\bjobs?\b|emploi|background|formation|diplôme|diplome|études|etudes|école|ecole|master)/],
    ['outils',      /(outil|tool|logiciel|software|figma|adobe|photoshop|illustrator|indesign|premiere|wordpress|html|css|javascript|\bjs\b|chatgpt|claude|stitch)/],
    ['apropos',     /(qui es[- ]tu|who are you|\btoi\b|yourself|\babout\b|à propos|a propos|hobby|hobbies|passion|loisir|magic|jeux? vidéo|jeux? video|video games?)/],
    ['hello',       /^(bonjour|salut|hello|hi|hey|coucou|yo)\b/]
  ];

  function detectTopic(text) {
    var t = text.toLowerCase().trim();
    for (var i = 0; i < KEYWORDS.length; i++) {
      if (KEYWORDS[i][1].test(t)) return KEYWORDS[i][0];
    }
    return 'fallback';
  }

  function scrollToBottom() {
    requestAnimationFrame(function () { scroller.scrollTop = scroller.scrollHeight; });
  }

  function addUserMessage(text, topicEl) {
    var row = document.createElement('div');
    row.className = 'msg msg-user';
    var bubble = document.createElement('div');
    bubble.className = 'bubble';
    if (topicEl && topicEl.dataset.qFr) {
      bubble.dataset.qFr = topicEl.dataset.qFr;
      bubble.dataset.qEn = topicEl.dataset.qEn;
      bubble.textContent = lang() === 'fr' ? topicEl.dataset.qFr : topicEl.dataset.qEn;
    } else {
      bubble.textContent = text;
    }
    row.appendChild(bubble);
    thread.appendChild(row);
  }

  // `instant` = sans l'animation "Thomas écrit…" (message d'accueil)
  function addBotMessage(topic, instant) {
    var source = answers.querySelector('article[data-topic="' + topic + '"]') ||
                 answers.querySelector('article[data-topic="fallback"]');

    var row = document.createElement('div');
    row.className = 'msg msg-bot';
    row.innerHTML = '<span class="avatar" aria-hidden="true">TD</span>' +
                    '<div class="msg-body"><span class="typing" aria-label="…"><i></i><i></i><i></i></span></div>';
    thread.appendChild(row);
    scrollToBottom();

    var body = row.querySelector('.msg-body');

    function fill() {
      if (!row.isConnected) return; // conversation effacée entre-temps
      body.innerHTML = source.innerHTML;

      // Hors sujet : on garde une seule blague, tirée au hasard
      var jokes = body.querySelectorAll('.joke');
      if (jokes.length > 1) {
        var keep = Math.floor(Math.random() * jokes.length);
        jokes.forEach(function (j, i) { if (i !== keep) j.remove(); });
      }

      window.Icons.render(body);
      applyLang(body);
      scrollToBottom();
    }

    if (instant) fill();
    else setTimeout(fill, 650);
  }

  function startConversation() {
    chat.classList.add('is-chatting', 'has-asked');
  }

  // Ouvre un sujet. `fresh` = repartir d'une conversation vide (clic dans l'historique)
  function openTopic(topic, fresh) {
    var source = answers.querySelector('article[data-topic="' + topic + '"]');
    if (!source) return;
    if (fresh) thread.innerHTML = '';
    startConversation();
    addUserMessage(null, source);
    addBotMessage(topic);
    setActive(fresh ? topic : null);
  }

  function ask(text) {
    if (!text.trim()) return;
    startConversation();
    addUserMessage(text);
    addBotMessage(detectTopic(text));
    setActive(null);
    if (location.hash) history.replaceState(null, '', location.pathname);
  }

  // Page chat : conversation vierge avec le message d'accueil
  function resetChat() {
    thread.innerHTML = '';
    chat.classList.remove('has-asked');
    addBotMessage('intro', true);
    prompt.value = '';
    autoGrow();
    if (!mqMobile.matches) prompt.focus();
  }

  // Page d'accueil : routage par hash (#projets, #book…) — liens partageables + bouton retour
  function route() {
    var topic = location.hash.slice(1);
    if (topic && answers.querySelector('article[data-topic="' + topic + '"]')) {
      openTopic(topic, true);
    } else if (!topic) {
      thread.innerHTML = '';
      chat.classList.remove('is-chatting', 'has-asked');
      setActive(null);
    }
  }
  if (page === 'home') window.addEventListener('hashchange', route);

  // Clics : historique, puces de suggestion, "nouvelle conversation"
  document.addEventListener('click', function (e) {
    // "Nouvelle conversation" : lien vers chat.html ; déjà sur chat.html → on repart à zéro
    var newBtn = e.target.closest('[data-action="new"]');
    if (newBtn) {
      if (page === 'chat') {
        e.preventDefault();
        resetChat();
        if (mqMobile.matches) toggleSidebar(false);
      }
      return;
    }

    // Historique : sur l'accueil on ouvre le sujet sur place, ailleurs le lien mène à l'accueil
    var item = e.target.closest('.side-item[data-topic]');
    if (item && page === 'home') {
      e.preventDefault();
      if (location.hash === '#' + item.dataset.topic) route();
      else location.hash = item.dataset.topic;
      if (mqMobile.matches) toggleSidebar(false);
      return;
    }

    var chip = e.target.closest('.chip[data-topic]');
    if (chip) {
      openTopic(chip.dataset.topic, false);
      return;
    }

    var card = e.target.closest('[data-modal]');
    if (card) openModal(card.dataset.modal, card);
  });

  // Saisie
  function autoGrow() {
    prompt.style.height = 'auto';
    prompt.style.height = Math.min(prompt.scrollHeight, 180) + 'px';
    sendBtn.disabled = !prompt.value.trim();
  }
  prompt.addEventListener('input', autoGrow);
  prompt.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit'));
    }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = prompt.value;
    prompt.value = '';
    autoGrow();
    ask(text);
  });

  // ==========================================================
  // 3 bis. FORMULAIRE DE CONTACT (réponse "contact")
  // Envoi via FormSubmit, comme l'ancienne page contact.
  // ==========================================================
  var FORM_ENDPOINT = 'https://formsubmit.co/7ec45ce06ef8a4f0a1b44f422af43ff4';
  var RATE_KEY = 'portfolio-contact-last';
  var MSG = {
    fr: { missing: 'Merci de remplir les trois champs.', email: 'Cette adresse e-mail ne semble pas valide.',
          wait: 'Un message vient déjà d’être envoyé, merci de patienter une minute.', sending: 'Envoi en cours…',
          ok: 'Merci ! Votre message a bien été envoyé, je vous recontacte très vite.',
          fail: 'Oups, l’envoi a échoué. Réessayez ou écrivez-moi directement par e-mail.' },
    en: { missing: 'Please fill in all three fields.', email: 'This e-mail address doesn’t look valid.',
          wait: 'A message was just sent, please wait a minute.', sending: 'Sending…',
          ok: 'Thank you! Your message has been sent, I’ll get back to you very soon.',
          fail: 'Oops, sending failed. Please try again or e-mail me directly.' }
  };

  document.addEventListener('submit', function (e) {
    var f = e.target.closest('.contact-form');
    if (!f) return;
    e.preventDefault();

    var t = MSG[lang()];
    var status = f.querySelector('.contact-status');
    var btn = f.querySelector('button[type="submit"]');
    function say(text, kind) { status.textContent = text; status.dataset.kind = kind || ''; }

    function val(n) { return f.querySelector('[name="' + n + '"]').value.trim(); }
    if (val('website')) return; // champ piège rempli = robot
    var name = val('name'), email = val('email'), message = val('message');
    if (!name || !email || !message) return say(t.missing, 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say(t.email, 'error');
    var last = +localStorage.getItem(RATE_KEY) || 0;
    if (Date.now() - last < 60000) return say(t.wait, 'error');

    var data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('message', message);
    data.append('_subject', 'Nouveau message de ' + name + ' (portfolio)');
    data.append('_captcha', 'false');
    data.append('_template', 'table');

    btn.disabled = true;
    say(t.sending);
    fetch(FORM_ENDPOINT, { method: 'POST', body: data })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        localStorage.setItem(RATE_KEY, String(Date.now()));
        f.reset();
        say(t.ok, 'success');
      })
      .catch(function () { say(t.fail, 'error'); })
      .then(function () { btn.disabled = false; });
  });

  // ==========================================================
  // 4. MODALES
  // ==========================================================
  var lastTrigger = null;

  function openModal(id, trigger) {
    var overlay = document.getElementById(id);
    if (!overlay) return;
    lastTrigger = trigger;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    overlay.querySelector('.modal-close').focus();
  }

  function closeModal(overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastTrigger && lastTrigger.isConnected) lastTrigger.focus();
  }

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.querySelector('.modal-close').addEventListener('click', function () { closeModal(overlay); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(overlay); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.modal-overlay.is-open');
    if (open) closeModal(open);
    else if (app.classList.contains('is-drawer-open')) toggleSidebar(false);
  });

  // ==========================================================
  // DÉMARRAGE
  // ==========================================================
  applyLang(document);
  updateThemeLabel();
  if (page === 'home') route();
  else resetChat();
}());
