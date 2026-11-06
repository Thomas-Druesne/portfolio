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

  document.getElementById('lang-btn').addEventListener('click', function () {
    localStorage.setItem(LANG_KEY, lang() === 'fr' ? 'en' : 'fr');
    applyLang(document);
  });

  // ==========================================================
  // 2. BARRE LATÉRALE
  // ==========================================================
  function toggleSidebar(open) {
    if (mqMobile.matches) {
      app.classList.toggle('is-drawer-open', open);
    } else {
      app.classList.toggle('is-collapsed', !open);
    }
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
    ['parcours',    /(parcours|expérience|experience|carrière|carriere|career|stage|alternance|\bjobs?\b|emploi|background|formation|diplôme|diplome)/],
    ['outils',      /(outil|tool|logiciel|software|figma|adobe|photoshop|illustrator|indesign|premiere|wordpress|html|css|javascript|\bjs\b|chatgpt|claude|stitch)/],
    ['apropos',     /(qui es[- ]tu|who are you|\btoi\b|yourself|\babout\b|à propos|a propos|hobby|hobbies|passion|loisir)/],
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
  if (page === 'home') route();
  else resetChat();
}());
