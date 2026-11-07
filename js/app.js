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
    // Textes avec mise en forme (mots-clés en gras) : data-fr-html / data-en-html
    root.querySelectorAll('[data-fr-html]').forEach(function (el) {
      el.innerHTML = el.dataset[l + 'Html'];
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
    // Infobulles de la barre latérale (utiles quand elle est repliée en icônes)
    if (root === document) {
      document.querySelectorAll('.sidebar .side-item, .sidebar .side-new').forEach(function (el) {
        el.title = el.textContent.trim();
      });
    }
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
      syncAvatars();
    });
  }

  // Photo du chatbot : cercle bleu ciel en sombre, bleu foncé en clair
  function avatarSrc() { return isLight() ? 'img/PP_chatbot_light.png' : 'img/PP_chatbot.png'; }
  function syncAvatars() {
    document.querySelectorAll('img.avatar').forEach(function (img) { img.src = avatarSrc(); });
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
  // Bouton de la barre : sur mobile il ferme le tiroir ; sur ordinateur il
  // replie la barre en colonne d'icônes, ou la redéploie si elle est repliée
  document.getElementById('sidebar-close').addEventListener('click', function () {
    toggleSidebar(!mqMobile.matches && app.classList.contains('is-collapsed'));
  });
  document.getElementById('sidebar-scrim').addEventListener('click', function () { toggleSidebar(false); });

  function setActive(topic) {
    document.querySelectorAll('.side-item[data-topic]').forEach(function (a) {
      a.classList.toggle('is-active', a.dataset.topic === topic);
    });
  }

  // Sujets déjà consultés : petite pastille dans la barre latérale et
  // coche sur les boutons « Voulez-vous savoir autre chose ? ».
  // Gardés dans le navigateur, comme des liens déjà visités.
  var SEEN_KEY = 'portfolio-seen';
  function seenList() {
    try { return JSON.parse(localStorage.getItem(SEEN_KEY)) || []; } catch (e) { return []; }
  }
  function paintSeen() {
    var seen = seenList();
    document.querySelectorAll('.side-item[data-topic], .follow-up .chip[data-topic]').forEach(function (el) {
      el.classList.toggle('is-seen', seen.indexOf(el.dataset.topic) !== -1);
    });
  }
  function markSeen(topic) {
    var seen = seenList();
    if (seen.indexOf(topic) === -1) {
      seen.push(topic);
      try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)); } catch (e) {}
    }
    paintSeen();
  }
  paintSeen();

  // ==========================================================
  // 3. CONVERSATION
  // ==========================================================

  // Mots-clés → sujet (pour les questions tapées librement)
  var KEYWORDS = [
    ['projet-inzerty', /(inzerty|simulateur|simulator|\biae\b|éligibilité|eligibilit)/],
    ['projet-e2c',     /(e2c|seconde chance|second chance)/],
    ['projet-amap',    /(amap|moreuil|panier|producteur|amapien)/],
    ['projet-lien',    /(lien services?|le lien|conteneur|container|configurat|vitamine)/],
    ['projet-envie',   /envie nord/],
    ['cv',          /\b(cv|resume|résumé|curriculum)\b/],
    ['contact',     /(contact|joindre|\bmail\b|e-?mail|écrire|ecrire|appeler|téléphone|telephone|recrut|embauch|\bhire\b|disponib|freelance|devis)/],
    ['book',        /(\bbook\b|graphi|\bprint|\blogo|affiche|branding|illustration)/],
    ['projets',     /(projet|project|réalisation|realisation|\bsites?\b|website|travaux|\bworks?\b|portfolio)/],
    ['competences', /(compétence|competence|skill|\bia\b|\bai\b|intelligence artificielle|\bagents?\b|automatisation|automation|sais[- ]tu faire|\bux\b|\bui\b|\bseo\b|référencement|referencement|design|intégration|integration|responsive)/],
    ['parcours',    /(parcours|expérience|experience|carrière|carriere|career|stage|alternance|\bjobs?\b|emploi|background|formation|diplôme|diplome|études|etudes|école|ecole|master)/],
    ['outils',      /(outil|tool|logiciel|software|figma|adobe|photoshop|illustrator|indesign|premiere|wordpress|html|css|javascript|\bjs\b|chatgpt|claude|stitch)/],
    ['apropos',     /(qui es[- ]tu|who are you|\btoi\b|yourself|\babout\b|à propos|a propos|hobby|hobbies|passion|loisir|magic|riftbound|tcg|jeux? vidéo|jeux? video|video games?)/],
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

  // Position (dans la zone de scroll) du haut d'un message, sous la barre du haut
  var CHAPTER_GAP = 72;
  function topOf(el) {
    return scroller.scrollTop + el.getBoundingClientRect().top -
           scroller.getBoundingClientRect().top - CHAPTER_GAP;
  }

  // Amène la question en haut de l'écran : on lit la réponse depuis son début
  function scrollToChapter(userRow) {
    requestAnimationFrame(function () {
      scroller.scrollTop = Math.max(0, topOf(userRow));
    });
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

  // Projets détaillés, dans l'ordre de présentation
  var PROJECTS = [
    { topic: 'projet-inzerty', name: 'Inzerty' },
    { topic: 'projet-e2c',     name: 'E2C Grand-Lille' },
    { topic: 'projet-envie',   name: 'Envie Nord' },
    { topic: 'projet-amap',    name: 'AMAP de Moreuil' },
    { topic: 'projet-lien',    name: 'Le Lien Services' }
  ];

  // Boutons vers les projets pas encore ouverts dans cette conversation,
  // en commençant par le suivant : ils disparaissent au fil de la lecture.
  function nextProjects(current) {
    var start = 0, chips = '', first = true;
    PROJECTS.forEach(function (p, i) { if (p.topic === current) start = i; });
    for (var k = 1; k < PROJECTS.length; k++) {
      var p = PROJECTS[(start + k) % PROJECTS.length];
      if (thread.querySelector('.msg-bot[data-topic="' + p.topic + '"]')) continue; // déjà lu
      chips += '<button type="button" class="chip' + (first ? ' chip--next' : '') + '" data-topic="' + p.topic + '">' +
               '<span class="ico" data-icon="folder"></span><span>' + p.name + '</span></button>';
      first = false;
    }
    if (!chips) return '';
    return '<div class="next-projects">' +
             '<p data-fr="Envie de découvrir un autre projet ?" data-en="Want to discover another project?">Envie de découvrir un autre projet ?</p>' +
             '<div class="answer-actions">' + chips + '</div>' +
           '</div>';
  }

  // Fin de chaque sujet : « Voulez-vous savoir autre chose ? » + les autres thèmes
  var THEMES = [
    { topic: 'projets',     icon: 'folder', fr: 'Mes projets',                en: 'My projects' },
    { topic: 'competences', icon: 'pen',    fr: 'Mes compétences',            en: 'My skills' },
    { topic: 'parcours',    icon: 'route',  fr: 'Mon parcours professionnel', en: 'My professional background' },
    { topic: 'outils',      icon: 'wrench', fr: 'Mes outils',                 en: 'My tools' },
    { topic: 'book',        icon: 'book',   fr: 'Mon book graphique',         en: 'My graphic portfolio' },
    { topic: 'apropos',     icon: 'user',   fr: 'À propos de moi',            en: 'About me' },
    { topic: 'cv',          icon: 'cv',     fr: 'Mon CV',                     en: 'My resume' },
    { topic: 'contact',     icon: 'mail',   fr: 'Me contacter',               en: 'Contact me' }
  ];
  var NO_FOLLOW_UP = ['intro', 'hello', 'fallback']; // ont déjà leurs propres suggestions

  function followUp(current) {
    if (NO_FOLLOW_UP.indexOf(current) !== -1) return '';
    var isProject = current.indexOf('projet-') === 0;
    var chips = THEMES.filter(function (t) {
      return t.topic !== current && !(isProject && t.topic === 'projets');
    }).map(function (t) {
      return '<button type="button" class="chip" data-topic="' + t.topic + '">' +
             '<span class="ico" data-icon="' + t.icon + '"></span>' +
             '<span data-fr="' + t.fr + '" data-en="' + t.en + '">' + t.fr + '</span></button>';
    }).join('');
    return '<div class="next-projects follow-up">' +
             '<p data-fr="Voulez-vous savoir autre chose ?" data-en="Would you like to know anything else?">Voulez-vous savoir autre chose ?</p>' +
             '<div class="answer-actions">' + chips + '</div>' +
           '</div>';
  }

  // Blagues "hors sujet" : on les mélange comme un paquet de cartes et on
  // les pioche une par une ; aucune ne revient avant que toutes soient sorties.
  // Le paquet est gardé le temps de la visite (même en changeant de page).
  var JOKE_KEY = 'portfolio-joke-bag';
  function nextJoke(total) {
    var bag = [], last = -1;
    try { bag = JSON.parse(sessionStorage.getItem(JOKE_KEY)) || []; } catch (e) { bag = []; }
    bag = bag.filter(function (n) { return n >= 0 && n < total; });
    if (!bag.length) {
      try { last = +sessionStorage.getItem(JOKE_KEY + '-last'); } catch (e) {}
      for (var i = 0; i < total; i++) bag.push(i);
      for (var k = bag.length - 1; k > 0; k--) {
        var r = Math.floor(Math.random() * (k + 1)), t = bag[k]; bag[k] = bag[r]; bag[r] = t;
      }
      if (bag[bag.length - 1] === last) bag.unshift(bag.pop()); // pas deux fois la même à la suite
    }
    var pick = bag.pop();
    try {
      sessionStorage.setItem(JOKE_KEY, JSON.stringify(bag));
      sessionStorage.setItem(JOKE_KEY + '-last', pick);
    } catch (e) {}
    return pick;
  }

  // Apparition en cascade : les éléments de la réponse arrivent un par un,
  // dans l'ordre de lecture. Les grilles et listes (cartes, étapes du
  // parcours, boutons…) sont « ouvertes » pour que chaque élément ait son tour.
  var CASCADE_STEP = 55;    // ms entre deux éléments
  var CASCADE_MAX  = 1400;  // délai maximum (longues réponses)
  var CASCADE_OPEN = '.project-grid, .skill-grid, .tool-grid, .hobby-grid, .timeline, ' +
                     '.info-list, .answer-actions, .project-details, .next-projects';

  function cascade(body) {
    var items = [];
    (function collect(parent) {
      Array.prototype.forEach.call(parent.children, function (el) {
        if (el.matches(CASCADE_OPEN)) collect(el);
        else items.push(el);
      });
    }(body));
    items.forEach(function (el, i) {
      el.classList.add('cascade');
      el.style.animationDelay = Math.min(i * CASCADE_STEP, CASCADE_MAX) + 'ms';
    });
  }

  // `instant` = sans l'animation "Thomas écrit…" (message d'accueil)
  function addBotMessage(topic, instant) {
    var source = answers.querySelector('article[data-topic="' + topic + '"]') ||
                 answers.querySelector('article[data-topic="fallback"]');

    var row = document.createElement('div');
    row.className = 'msg msg-bot';
    row.dataset.topic = topic;
    row.innerHTML = '<img class="avatar" src="' + avatarSrc() + '" alt="" aria-hidden="true" />' +
                    '<div class="msg-body"><span class="typing" aria-label="…"><i></i><i></i><i></i></span></div>';
    var userRow = thread.lastElementChild && thread.lastElementChild.classList.contains('msg-user')
                  ? thread.lastElementChild : null;
    thread.appendChild(row);
    scrollToBottom();

    var body = row.querySelector('.msg-body');

    function fill() {
      if (!row.isConnected) return; // conversation effacée entre-temps
      body.innerHTML = source.innerHTML;

      // Hors sujet : on garde une seule blague, tirée sans répétition
      var jokes = body.querySelectorAll('.joke');
      if (jokes.length > 1) {
        var keep = nextJoke(jokes.length);
        jokes.forEach(function (j, i) { if (i !== keep) j.remove(); });
      }

      // Détail d'un projet : on propose d'enchaîner sur les autres
      if (topic.indexOf('projet-') === 0) body.insertAdjacentHTML('beforeend', nextProjects(topic));
      // Puis les autres thèmes
      body.insertAdjacentHTML('beforeend', followUp(topic));

      window.Icons.render(body);
      applyLang(body);
      cascade(body);
      // Sujet consulté (hors projets en détail, accueil et blagues)
      if (THEMES.some(function (th) { return th.topic === topic; })) markSeen(topic);
      else paintSeen();
      // On reste en haut du sujet demandé (pas en bas de la réponse)
      if (userRow) scrollToChapter(userRow);
      else scrollToBottom();
    }

    if (instant) fill();
    else setTimeout(fill, 650);
  }

  // Bouton « Revenir en haut » : centré au-dessus de la barre de saisie,
  // il ramène au début du sujet en cours de lecture.
  var topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'back-top';
  topBtn.innerHTML = '<span class="ico" data-icon="send"></span>' +
                     '<span data-fr="Revenir en haut" data-en="Back to top">Revenir en haut</span>';
  form.closest('.composer-wrap').appendChild(topBtn);
  window.Icons.render(topBtn);
  applyLang(topBtn);

  function currentChapter() {
    var found = null;
    thread.querySelectorAll('.msg-user').forEach(function (row) {
      if (topOf(row) <= scroller.scrollTop + 4) found = row;
    });
    return found;
  }

  var topTick = false;
  function updateTopBtn() {
    topTick = false;
    var ch = currentChapter();
    var show = !!ch && scroller.scrollTop - topOf(ch) > Math.max(400, scroller.clientHeight * 0.6);
    topBtn.classList.toggle('is-visible', show);
    topBtn.tabIndex = show ? 0 : -1;
  }
  scroller.addEventListener('scroll', function () {
    if (!topTick) { topTick = true; requestAnimationFrame(updateTopBtn); }
  }, { passive: true });

  topBtn.addEventListener('click', function () {
    var ch = currentChapter();
    if (ch) scroller.scrollTop = Math.max(0, topOf(ch));
  });

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

    // Puces de suggestion et cartes projets : la réponse s'ajoute à la suite du chat
    var chip = e.target.closest('.chip[data-topic], .project-card[data-topic]');
    if (chip) openTopic(chip.dataset.topic, false);
  });

  // Saisie
  function autoGrow() {
    prompt.style.height = 'auto';
    prompt.style.height = Math.min(prompt.scrollHeight, 180) + 'px';
    // barre de défilement seulement si le texte dépasse la hauteur maximale
    prompt.style.overflowY = prompt.scrollHeight > 180 ? 'auto' : 'hidden';
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
  // Envoi via Web3Forms (https://web3forms.com). La clé d'accès n'est
  // pas un secret : elle sert seulement à désigner la boîte qui reçoit.
  // Plan de secours : si l'envoi échoue (panne, coupure, délai dépassé),
  // un bouton ouvre la messagerie du visiteur avec le message déjà
  // rempli → aucun message n'est perdu.
  // ==========================================================
  var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
  var FORM_KEY      = '38d55af8-b0fb-4783-b373-353dd296034e';
  var CONTACT_EMAIL = 'thomas.druesnepro@gmail.com';
  var FORM_TIMEOUT  = 12000; // ms avant de basculer sur le plan de secours
  var RATE_KEY = 'portfolio-contact-last';
  var MSG = {
    fr: { missing: 'Merci de remplir les quatre champs.', email: 'Cette adresse e-mail ne semble pas valide.',
          wait: 'Un message vient déjà d’être envoyé, merci de patienter une minute.', sending: 'Envoi en cours…',
          ok: 'Merci ! Votre message a bien été envoyé, je vous recontacte très vite.',
          fail: 'Oups, l’envoi n’a pas pu aboutir. Pas de panique : votre message est prêt, il ne reste qu’à l’envoyer depuis votre messagerie.',
          mail: 'Ouvrir ma messagerie' },
    en: { missing: 'Please fill in all four fields.', email: 'This e-mail address doesn’t look valid.',
          wait: 'A message was just sent, please wait a minute.', sending: 'Sending…',
          ok: 'Thank you! Your message has been sent, I’ll get back to you very soon.',
          fail: 'Oops, the message couldn’t be sent. No worries: it’s ready, you just need to send it from your e-mail app.',
          mail: 'Open my e-mail app' }
  };

  // Lien « mailto » vers Thomas, avec l'objet et le message déjà remplis
  function mailtoLink(name, email, subject, message) {
    var body = message + '\n\n— ' + name + ' (' + email + ')';
    return 'mailto:' + CONTACT_EMAIL +
           '?subject=' + encodeURIComponent('Portfolio — ' + subject) +
           '&body=' + encodeURIComponent(body);
  }

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
    var name = val('name'), email = val('email'), subject = val('subject'), message = val('message');
    if (!name || !email || !subject || !message) return say(t.missing, 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return say(t.email, 'error');
    var last = +localStorage.getItem(RATE_KEY) || 0;
    if (Date.now() - last < 60000) return say(t.wait, 'error');

    // Échec : on garde le formulaire rempli et on propose la messagerie
    function fallback() {
      say(t.fail, 'error');
      var a = document.createElement('a');
      a.className = 'btn btn-ghost contact-mailto';
      a.href = mailtoLink(name, email, subject, message);
      a.innerHTML = '<span class="ico" data-icon="mail"></span><span>' + t.mail + '</span>';
      window.Icons.render(a);
      status.appendChild(a);
    }

    var payload = {
      access_key: FORM_KEY,
      subject: 'Portfolio — ' + subject + ' (' + name + ')',
      from_name: 'Portfolio Thomas Druesne',
      name: name,
      email: email,
      message: message,
      'Objet': subject
    };

    btn.disabled = true;
    say(t.sending);
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, FORM_TIMEOUT);
    (FORM_KEY.indexOf('A_REMPLACER') === 0
      ? Promise.reject(new Error('Clé Web3Forms manquante'))
      : fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: ctrl ? ctrl.signal : undefined
        }).then(function (r) { return r.json(); }))
      .then(function (res) {
        if (!res || res.success !== true) throw new Error((res && res.message) || 'Web3Forms');
        localStorage.setItem(RATE_KEY, String(Date.now()));
        f.reset();
        say(t.ok, 'success');
      })
      .catch(fallback)
      .then(function () { clearTimeout(timer); btn.disabled = false; });
  });

  // Échap ferme le menu latéral sur mobile
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && app.classList.contains('is-drawer-open')) toggleSidebar(false);
  });

  // ==========================================================
  // DÉMARRAGE
  // ==========================================================
  applyLang(document);
  updateThemeLabel();
  if (page === 'home') route();
  else resetChat();
}());
