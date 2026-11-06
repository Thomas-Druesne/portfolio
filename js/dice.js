// ============================================================
// DICE.JS — Easter egg : 5 clics d'affilée sur la photo de profil
// (en bas de la barre latérale) ouvrent un duel de dés contre l'IA.
// Chacun lance 2 dés, le plus gros total gagne.
// ============================================================

(function () {
  var CLICKS_NEEDED = 5;
  var CLICK_GAP = 1200; // ms max entre deux clics

  function fr() { return (localStorage.getItem('portfolio-lang') || 'fr') === 'fr'; }
  function t(f, e) { return fr() ? f : e; }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function roll() { return 1 + Math.floor(Math.random() * 6); }
  function avatarSrc() {
    return document.documentElement.dataset.theme === 'light' ? 'img/PP_chatbot_light.png' : 'img/PP_chatbot.png';
  }
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Déclencheur : 5 clics sur la photo ----------
  var count = 0, last = 0;
  document.addEventListener('click', function (e) {
    var profile = e.target.closest('.side-profile');
    if (!profile) return;
    var now = Date.now();
    count = now - last < CLICK_GAP ? count + 1 : 1;
    last = now;
    var img = profile.querySelector('.avatar');
    if (img) { // petit rebond à chaque clic : un indice discret
      img.classList.remove('dice-poke');
      void img.offsetWidth;
      img.classList.add('dice-poke');
    }
    if (count >= CLICKS_NEEDED) { count = 0; open(); }
  });

  // ---------- Textes ----------
  var LINES = {
    aiTurn: [
      ['À moi ! Je souffle sur les dés pour la chance…', 'My turn! Blowing on the dice for luck…'],
      ['Calcul des probabilités en cours… ou pas.', 'Calculating probabilities… or not.'],
      ['Attention, lancer de professionnel.', 'Watch out, professional throw incoming.'],
      ['Je ne triche pas, promis. Enfin, presque.', 'I don\'t cheat, I promise. Well, almost.'],
      ['Hop, un petit élan et…', 'A little swing and…']
    ],
    win: [
      ['Bravo, vous avez battu l\'IA ! Elle va sûrement demander une revanche.', 'Well done, you beat the AI! It\'ll surely want a rematch.'],
      ['Victoire ! L\'IA part bouder dans un coin du serveur.', 'Victory! The AI is off sulking in a corner of the server.'],
      ['Gagné ! Même mon algorithme est impressionné.', 'You win! Even my algorithm is impressed.'],
      ['Chapeau ! Vous avez la main chaude aujourd\'hui.', 'Hats off! You\'re on a roll today.']
    ],
    lose: [
      ['L\'IA gagne… elle dit que c\'est grâce à son talent. Suspect.', 'The AI wins… it says it\'s all talent. Suspicious.'],
      ['Perdu ! L\'IA fait une petite danse de la victoire.', 'You lose! The AI does a little victory dance.'],
      ['Défaite… mais avec beaucoup de style, il faut le reconnaître.', 'Defeat… but with a lot of style, to be fair.'],
      ['L\'IA l\'emporte. Elle promet de rester humble. Elle ment.', 'The AI wins. It promises to stay humble. It\'s lying.']
    ],
    tie: [
      ['Égalité ! Même les dés n\'arrivent pas à se décider.', 'It\'s a tie! Even the dice can\'t make up their minds.'],
      ['Match nul. On dit que c\'est l\'amitié qui a gagné ?', 'A draw. Shall we say friendship won?'],
      ['Ex æquo ! L\'univers aime l\'équilibre.', 'Dead heat! The universe loves balance.']
    ]
  };
  function line(key) { var l = pick(LINES[key]); return t(l[0], l[1]); }

  // ---------- Construction de la modale ----------
  var overlay, els, state, score = { me: 0, ai: 0 }, lastFocus, timers = [];

  function later(fn, ms) { timers.push(setTimeout(fn, reduced.matches ? Math.min(ms, 60) : ms)); }

  function dieHTML() {
    var pips = '';
    for (var i = 1; i <= 9; i++) pips += '<i class="pip p' + i + '"></i>';
    return '<div class="die" data-v="' + roll() + '">' + pips + '</div>';
  }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'dice-overlay';
    overlay.innerHTML =
      '<div class="dice-card" role="dialog" aria-modal="true" aria-labelledby="dice-title">' +
        '<button type="button" class="dice-close" aria-label="' + t('Fermer', 'Close') + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
        '<div class="dice-confetti" aria-hidden="true"></div>' +
        '<p class="dice-kicker">' + t('Partie secrète débloquée', 'Secret game unlocked') + '</p>' +
        '<h2 class="dice-title" id="dice-title">' + t('Duel de dés', 'Dice duel') + '</h2>' +
        '<p class="dice-rules">' + t('Deux dés chacun, le plus gros total gagne. Simple, efficace, impitoyable.',
                                     'Two dice each, the highest total wins. Simple, effective, ruthless.') + '</p>' +
        '<div class="dice-score" aria-label="Score">' +
          '<span><small>' + t('Vous', 'You') + '</small><b data-score="me">0</b></span>' +
          '<em>–</em>' +
          '<span><b data-score="ai">0</b><small>' + t('Thomas IA', 'Thomas AI') + '</small></span>' +
        '</div>' +
        '<div class="dice-lane" data-lane="me">' +
          '<div class="dice-who"><span class="dice-me-badge" aria-hidden="true">' + t('V', 'Y') + '</span>' +
            '<strong>' + t('Vous', 'You') + '</strong></div>' +
          '<div class="dice-tray">' + dieHTML() + dieHTML() + '</div>' +
          '<span class="dice-total" data-total="me">?</span>' +
        '</div>' +
        '<div class="dice-lane" data-lane="ai">' +
          '<div class="dice-who"><img class="dice-ai-avatar" src="' + avatarSrc() + '" alt="" />' +
            '<strong>' + t('Thomas IA', 'Thomas AI') + '</strong></div>' +
          '<div class="dice-tray">' + dieHTML() + dieHTML() + '</div>' +
          '<span class="dice-total" data-total="ai">?</span>' +
          '<p class="dice-bubble" aria-hidden="true"></p>' +
        '</div>' +
        '<p class="dice-result" aria-live="polite"></p>' +
        '<button type="button" class="dice-roll">' +
          '<span class="dice-roll-ico" aria-hidden="true">' + dieHTML().replace(/data-v="\d"/, 'data-v="5"') + '</span>' +
          '<span class="dice-roll-label">' + t('Lancer les dés', 'Roll the dice') + '</span></button>' +
      '</div>';
    document.body.appendChild(overlay);

    els = {
      card:    overlay.querySelector('.dice-card'),
      close:   overlay.querySelector('.dice-close'),
      btn:     overlay.querySelector('.dice-roll'),
      label:   overlay.querySelector('.dice-roll-label'),
      result:  overlay.querySelector('.dice-result'),
      bubble:  overlay.querySelector('.dice-bubble'),
      confetti: overlay.querySelector('.dice-confetti'),
      lanes:   { me: overlay.querySelector('[data-lane="me"]'), ai: overlay.querySelector('[data-lane="ai"]') },
      totals:  { me: overlay.querySelector('[data-total="me"]'), ai: overlay.querySelector('[data-total="ai"]') },
      scores:  { me: overlay.querySelector('[data-score="me"]'), ai: overlay.querySelector('[data-score="ai"]') }
    };
    els.dice = {
      me: els.lanes.me.querySelectorAll('.die'),
      ai: els.lanes.ai.querySelectorAll('.die')
    };
    els.scores.me.textContent = score.me;
    els.scores.ai.textContent = score.ai;

    els.close.addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    els.btn.addEventListener('click', play);
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
      if (e.key === 'Tab') { // la tabulation reste dans la modale
        var f = [els.close, els.btn].filter(function (b) { return !b.disabled; });
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    });
  }

  function open() {
    if (overlay) return;
    lastFocus = document.activeElement;
    build();
    state = 'idle';
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    setTimeout(function () { els.btn.focus(); }, 50);
  }

  function close() {
    if (!overlay) return;
    timers.forEach(clearTimeout); timers = [];
    var o = overlay; overlay = null;
    o.classList.remove('is-open');
    o.classList.add('is-closing');
    setTimeout(function () { o.remove(); }, reduced.matches ? 0 : 260);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  // ---------- Lancer animé de deux dés ----------
  function rollDice(who, done) {
    var dice = els.dice[who], values = [roll(), roll()];
    var lane = els.lanes[who];
    lane.classList.remove('is-winner', 'is-loser');
    els.totals[who].textContent = '…';
    els.totals[who].classList.remove('is-pop');
    dice.forEach(function (d) { d.classList.remove('is-landed'); d.classList.add('is-rolling'); });

    var spin = setInterval(function () {
      dice.forEach(function (d) { d.dataset.v = roll(); });
    }, 85);
    timers.push(spin);

    later(function () {
      clearInterval(spin);
      dice.forEach(function (d, i) {
        d.dataset.v = values[i];
        d.classList.remove('is-rolling');
        void d.offsetWidth;
        d.classList.add('is-landed');
      });
      var total = values[0] + values[1];
      els.totals[who].textContent = total;
      void els.totals[who].offsetWidth;
      els.totals[who].classList.add('is-pop');
      if (values[0] === values[1]) {
        var tag = document.createElement('span');
        tag.className = 'dice-double';
        tag.textContent = values[0] === 6 ? t('Double six !', 'Double six!') : t('Double !', 'Doubles!');
        lane.appendChild(tag);
        later(function () { tag.remove(); }, 1600);
      }
      done(total);
    }, 950);
  }

  // ---------- Une manche ----------
  function play() {
    if (state === 'busy') return;
    state = 'busy';
    els.btn.disabled = true;
    els.result.textContent = '';
    els.result.className = 'dice-result';
    els.bubble.classList.remove('is-visible');
    els.card.classList.remove('is-win', 'is-lose', 'is-tie');
    els.totals.ai.textContent = '?';
    els.dice.ai.forEach(function (d) { d.classList.remove('is-landed'); });
    els.label.textContent = t('Ça roule…', 'Rolling…');

    rollDice('me', function (mine) {
      // Au tour de l'IA : une petite réplique, puis son lancer
      later(function () {
        els.bubble.textContent = line('aiTurn');
        els.bubble.classList.add('is-visible');
        els.label.textContent = t('L\'IA réfléchit…', 'The AI is thinking…');
        later(function () {
          rollDice('ai', function (theirs) {
            later(function () {
              els.bubble.classList.remove('is-visible');
              finish(mine, theirs);
            }, 350);
          });
        }, 900);
      }, 450);
    });
  }

  function finish(mine, theirs) {
    var outcome = mine > theirs ? 'win' : mine < theirs ? 'lose' : 'tie';
    if (outcome === 'win') score.me++;
    if (outcome === 'lose') score.ai++;
    els.scores.me.textContent = score.me;
    els.scores.ai.textContent = score.ai;

    if (outcome !== 'tie') {
      els.lanes.me.classList.add(outcome === 'win' ? 'is-winner' : 'is-loser');
      els.lanes.ai.classList.add(outcome === 'win' ? 'is-loser' : 'is-winner');
    }
    els.card.classList.add('is-' + outcome);
    els.result.textContent = line(outcome);
    els.result.className = 'dice-result is-visible is-' + outcome;
    if (outcome === 'win') confetti();

    els.label.textContent = t('Rejouer', 'Play again');
    els.btn.disabled = false;
    els.btn.focus();
    state = 'idle';
  }

  // ---------- Confettis (victoire) ----------
  function confetti() {
    if (reduced.matches) return;
    var colors = ['var(--secondary)', '#FFD166', '#FF7AA2', '#8BF0B5', '#B79CFF'];
    for (var i = 0; i < 46; i++) {
      var c = document.createElement('i');
      c.style.left = (Math.random() * 100) + '%';
      c.style.background = pick(colors);
      c.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      c.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
      c.style.animationDelay = (Math.random() * 0.25) + 's';
      c.style.animationDuration = (1.1 + Math.random() * 0.8) + 's';
      if (Math.random() < 0.4) c.style.borderRadius = '50%';
      els.confetti.appendChild(c);
    }
    later(function () { if (els.confetti) els.confetti.innerHTML = ''; }, 2400);
  }
}());
