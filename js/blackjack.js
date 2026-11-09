// ============================================================
// BLACKJACK.JS — 2e easter egg : 3 clics droits d'affilée sur la photo
// de profil (ou appui long sur téléphone) ouvrent une partie de
// blackjack contre Thomas IA.
// Règles : la banque tire jusqu'à 17 ; on peut tirer, rester, et
// séparer (une fois) deux cartes de même valeur. As séparés : une
// seule carte chacun. Un blackjack après séparation compte comme 21.
// ============================================================

(function () {
  var RIGHT_CLICKS = 3;
  var CLICK_GAP = 1500;   // ms max entre deux clics droits
  var LONG_PRESS = 600;   // ms d'appui long sur mobile

  function fr() { return (localStorage.getItem('portfolio-lang') || 'fr') === 'fr'; }
  function t(f, e) { return fr() ? f : e; }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function sfx(name, arg) { if (window.Sfx) window.Sfx.play(name, arg); }
  function avatarSrc() {
    return document.documentElement.dataset.theme === 'light' ? 'img/PP_chatbot_light.png' : 'img/PP_chatbot.png';
  }
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ---------- Déclencheurs ----------
  function poke(profile) {
    var img = profile.querySelector('.avatar');
    if (!img) return;
    img.classList.remove('dice-poke');
    void img.offsetWidth;
    img.classList.add('dice-poke');
  }

  var rc = 0, rlast = 0, lastTouch = 0, pressTimer = null;
  document.addEventListener('contextmenu', function (e) {
    var p = e.target.closest('.side-profile');
    if (!p) return;
    e.preventDefault();                         // pas de menu sur la photo
    if (Date.now() - lastTouch < 1500) return;  // appui long : géré plus bas
    var now = Date.now();
    rc = now - rlast < CLICK_GAP ? rc + 1 : 1;
    rlast = now;
    poke(p);
    if (rc >= RIGHT_CLICKS) { rc = 0; open(); }
  });
  document.addEventListener('touchstart', function (e) {
    var p = e.target.closest('.side-profile');
    if (!p) return;
    lastTouch = Date.now();
    clearTimeout(pressTimer);
    pressTimer = setTimeout(function () {
      poke(p);
      if (navigator.vibrate) navigator.vibrate(25);
      open();
    }, LONG_PRESS);
  }, { passive: true });
  ['touchend', 'touchmove', 'touchcancel'].forEach(function (ev) {
    document.addEventListener(ev, function () { clearTimeout(pressTimer); }, { passive: true });
  });

  // ---------- Textes (même humour que le duel de dés) ----------
  var LINES = {
    deal: [
      ['Je distribue. Promis, rien dans les manches.', 'Dealing. Nothing up my sleeves, promise.'],
      ['Cartes mélangées à la main, avec amour.', 'Cards shuffled by hand, with love.'],
      ['Que le meilleur gagne. Petit spoiler : c\'est souvent la banque.', 'May the best one win. Small spoiler: it\'s usually the house.']
    ],
    shuffle: [['Je remélange le sabot, deux secondes…', 'Reshuffling the shoe, two seconds…']],
    draw: [
      ['Hmm… allez, une petite carte.', 'Hmm… go on, one more card.'],
      ['Je tente le diable.', 'Tempting fate.'],
      ['Encore une, pour le suspense.', 'One more, for the suspense.']
    ],
    dealerStand: [
      ['Je m\'arrête là. Je suis raisonnable, parfois.', 'I\'ll stop there. I can be reasonable, sometimes.'],
      ['Ça me va très bien comme ça.', 'That suits me just fine.']
    ],
    split: [
      ['Deux mains ? Vous êtes ambitieux, j\'aime ça.', 'Two hands? Ambitious, I like it.'],
      ['Séparation validée. Double dose de suspense.', 'Split approved. Double the suspense.']
    ],
    bust: [
      ['Aïe ! Le 21, ce n\'était pas une suggestion.', 'Ouch! 21 wasn\'t a suggestion.'],
      ['Ça a sauté… mais avec panache.', 'Busted… but with style.']
    ],
    win: [
      ['Bien joué ! Thomas IA range ses cartes en boudant.', 'Well played! Thomas AI is putting the cards away, sulking.'],
      ['Victoire ! Je demande un recomptage.', 'Victory! I demand a recount.'],
      ['Vous avez battu la banque. La banque est vexée.', 'You beat the house. The house is offended.']
    ],
    dealerBust: [
      ['J\'ai sauté ! Je voulais juste vous faire plaisir.', 'I busted! I just wanted to make you happy.'],
      ['Trop gourmand… la banque a explosé.', 'Too greedy… the house blew up.']
    ],
    blackjack: [
      ['Blackjack ! Je m\'incline… pour cette fois.', 'Blackjack! I bow… this time.'],
      ['21 du premier coup ! Vous avez un don ou un aimant dans la manche ?', '21 straight away! Is it talent or a magnet up your sleeve?']
    ],
    lose: [
      ['La banque gagne. Comme toujours… ou presque.', 'The house wins. As always… or almost.'],
      ['Perdu ! Je ne dirai rien, mais je souris.', 'You lose! I won\'t say a thing, but I\'m smiling.']
    ],
    bustLose: [['Plus de 21… la banque n\'a même pas eu besoin de jouer.', 'Over 21… the house didn\'t even need to play.']],
    dealerBJ: [['Blackjack pour moi ! Désolé, c\'était écrit.', 'Blackjack for me! Sorry, it was written in the cards.']],
    tie: [
      ['Égalité ! On se quitte bons amis.', 'A push! We part as good friends.'],
      ['Match nul. La banque garde sa dignité, vous aussi.', 'A draw. The house keeps its dignity, and so do you.']
    ],
    mixed: [['Une main gagnée, une main perdue. L\'équilibre parfait.', 'One hand won, one hand lost. Perfect balance.']]
  };
  function line(key) { var l = pick(LINES[key]); return t(l[0], l[1]); }

  // ---------- Cartes ----------
  var SUITS = ['♠', '♥', '♦', '♣'];
  var RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var shoe = [];

  function newShoe() {
    shoe = [];
    for (var d = 0; d < 4; d++) {
      SUITS.forEach(function (s) { RANKS.forEach(function (r) { shoe.push({ r: r, s: s }); }); });
    }
    for (var i = shoe.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), x = shoe[i]; shoe[i] = shoe[j]; shoe[j] = x;
    }
  }
  function draw() { if (!shoe.length) newShoe(); return shoe.pop(); }

  function cardValue(c) { return c.r === 'A' ? 11 : (c.r === 'J' || c.r === 'Q' || c.r === 'K') ? 10 : +c.r; }
  function handValue(cards) {
    var v = 0, aces = 0;
    cards.forEach(function (c) { v += cardValue(c); if (c.r === 'A') aces++; });
    while (v > 21 && aces) { v -= 10; aces--; }
    return v;
  }
  function isBJ(cards) { return cards.length === 2 && handValue(cards) === 21; }

  function cardEl(c, down) {
    var el = document.createElement('div');
    var red = c.s === '♥' || c.s === '♦';
    var suit = c.s + '︎'; // symbole texte, pas emoji
    el.className = 'pcard' + (red ? ' is-red' : '') + (down ? ' is-down' : '') + (reduced.matches ? '' : ' is-dealt');
    el.innerHTML =
      '<div class="pcard-inner">' +
        '<div class="pcard-face"><span class="pc-corner">' + c.r + '<i>' + suit + '</i></span>' +
          '<span class="pc-suit">' + suit + '</span>' +
          '<span class="pc-corner pc-corner--br">' + c.r + '<i>' + suit + '</i></span></div>' +
        '<div class="pcard-back"></div>' +
      '</div>';
    el.setAttribute('aria-label', down ? t('Carte cachée', 'Hidden card') : c.r + ' ' + c.s);
    return el;
  }

  // ---------- État de la partie ----------
  var overlay, els, timers = [], lastFocus;
  var score = { me: 0, ai: 0 };
  var dealer, hands, active, phase, busy;

  function later(fn, ms) { timers.push(setTimeout(fn, reduced.matches ? Math.min(ms, 80) : ms)); }

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'dice-overlay bj';
    overlay.innerHTML =
      '<div class="dice-card bj-dialog" role="dialog" aria-modal="true" aria-labelledby="bj-title">' +
        '<button type="button" class="dice-close" aria-label="' + t('Fermer', 'Close') + '">' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12"/></svg></button>' +
        '<div class="dice-confetti" aria-hidden="true"></div>' +
        '<p class="dice-kicker">' + t('Deuxième partie secrète', 'Second secret game') + '</p>' +
        '<h2 class="dice-title" id="bj-title">Blackjack</h2>' +
        '<p class="dice-rules">' + t('Approchez-vous de 21 sans le dépasser. La banque tire jusqu\'à 17. Bonne chance, vous en aurez besoin.',
                                     'Get close to 21 without going over. The house draws to 17. Good luck, you\'ll need it.') + '</p>' +
        '<div class="dice-score" aria-label="Score">' +
          '<span><small>' + t('Vous', 'You') + '</small><b data-score="me">0</b></span>' +
          '<em>–</em>' +
          '<span><b data-score="ai">0</b><small>' + t('Thomas IA', 'Thomas AI') + '</small></span>' +
        '</div>' +
        '<div class="bj-lane bj-dealer">' +
          '<div class="bj-head"><div class="dice-who"><img class="dice-ai-avatar" src="' + avatarSrc() + '" alt="" />' +
            '<strong>' + t('Thomas IA', 'Thomas AI') + '</strong></div><span class="bj-total" data-total="ai"></span></div>' +
          '<div class="pcards" data-cards="ai"></div>' +
          '<p class="dice-bubble" aria-hidden="true"></p>' +
        '</div>' +
        '<div class="bj-hands"></div>' +
        '<p class="dice-result" aria-live="polite"></p>' +
        '<div class="bj-actions" data-phase="idle">' +
          '<button type="button" class="dice-roll bj-deal"><span class="bj-deal-label">' + t('Distribuer', 'Deal') + '</span></button>' +
          '<button type="button" class="bj-btn is-primary" data-act="hit">' + t('Je tire', 'Hit') + '</button>' +
          '<button type="button" class="bj-btn" data-act="stand">' + t('Je reste', 'Stand') + '</button>' +
          '<button type="button" class="bj-btn" data-act="split" hidden>' + t('Je sépare', 'Split') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var dialog = overlay.querySelector('.bj-dialog');
    if (window.Sfx) dialog.appendChild(window.Sfx.button(fr()));

    els = {
      dialog:   dialog,
      close:    overlay.querySelector('.dice-close'),
      confetti: overlay.querySelector('.dice-confetti'),
      dealerLane: overlay.querySelector('.bj-dealer'),
      dealerCards: overlay.querySelector('[data-cards="ai"]'),
      dealerTotal: overlay.querySelector('[data-total="ai"]'),
      bubble:   overlay.querySelector('.dice-bubble'),
      hands:    overlay.querySelector('.bj-hands'),
      result:   overlay.querySelector('.dice-result'),
      actions:  overlay.querySelector('.bj-actions'),
      deal:     overlay.querySelector('.bj-deal'),
      dealLabel: overlay.querySelector('.bj-deal-label'),
      hit:      overlay.querySelector('[data-act="hit"]'),
      stand:    overlay.querySelector('[data-act="stand"]'),
      split:    overlay.querySelector('[data-act="split"]'),
      scores:   { me: overlay.querySelector('[data-score="me"]'), ai: overlay.querySelector('[data-score="ai"]') }
    };
    els.scores.me.textContent = score.me;
    els.scores.ai.textContent = score.ai;

    els.close.addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    els.deal.addEventListener('click', deal);
    els.hit.addEventListener('click', hit);
    els.stand.addEventListener('click', stand);
    els.split.addEventListener('click', split);
    overlay.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.stopPropagation(); close(); }
      if (e.key === 'Tab') { // la tabulation reste dans la fenêtre
        var f = Array.prototype.filter.call(overlay.querySelectorAll('button'), function (b) {
          return !b.disabled && !b.hidden && b.offsetParent !== null;
        });
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1) + f.length) % f.length].focus();
      }
    });
  }

  function open() {
    if (overlay || document.querySelector('.dice-overlay')) return; // un jeu à la fois
    lastFocus = document.activeElement;
    build();
    phase = 'idle'; busy = false;
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    sfx('ding');
    setTimeout(function () { els.deal.focus(); }, 50);
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

  // ---------- Affichage ----------
  function say(text) {
    els.bubble.textContent = text;
    els.bubble.classList.remove('is-visible');
    void els.bubble.offsetWidth;
    els.bubble.classList.add('is-visible');
    sfx('pop');
  }

  function handLane(i) { return els.hands.querySelector('[data-hand="' + i + '"]'); }

  function renderHands() {
    els.hands.innerHTML = '';
    els.hands.classList.toggle('is-split', hands.length > 1);
    hands.forEach(function (h, i) {
      var lane = document.createElement('div');
      lane.className = 'bj-lane bj-hand';
      lane.dataset.hand = i;
      var label = hands.length > 1 ? t('Main ', 'Hand ') + (i + 1) : t('Vous', 'You');
      lane.innerHTML =
        '<div class="bj-head"><div class="dice-who"><span class="dice-me-badge" aria-hidden="true">' + t('V', 'Y') + '</span>' +
          '<strong>' + label + '</strong></div><span class="bj-total"></span></div>' +
        '<div class="pcards"></div>';
      els.hands.appendChild(lane);
      h.cards.forEach(function (c) { lane.querySelector('.pcards').appendChild(cardEl(c, false)); });
      updateHand(i);
    });
    markActive();
  }

  function updateHand(i) {
    var lane = handLane(i);
    if (lane) lane.querySelector('.bj-total').textContent = hands[i].cards.length ? handValue(hands[i].cards) : '';
  }

  function updateDealer() {
    var shown = dealer.filter(function (c, i) { return i !== 1 || !dealer.hidden; });
    els.dealerTotal.textContent = shown.length ? handValue(shown) : '';
  }

  function markActive() {
    Array.prototype.forEach.call(els.hands.children, function (lane, i) {
      lane.classList.toggle('is-active', phase === 'player' && hands.length > 1 && i === active);
    });
  }

  function canSplit() {
    var h = hands[active];
    return phase === 'player' && !busy && hands.length === 1 && h.cards.length === 2 &&
           cardValue(h.cards[0]) === cardValue(h.cards[1]);
  }

  function setPhase(p) {
    phase = p;
    els.actions.dataset.phase = p;
    els.split.hidden = !canSplit();
    [els.hit, els.stand, els.split].forEach(function (b) { b.disabled = busy; });
    markActive();
  }

  function giveCard(target, down) {
    var c = draw();
    if (target === 'ai') {
      dealer.push(c);
      if (down) dealer.hidden = true;
      els.dealerCards.appendChild(cardEl(c, down));
      updateDealer();
    } else {
      hands[target].cards.push(c);
      handLane(target).querySelector('.pcards').appendChild(cardEl(c, false));
      updateHand(target);
    }
    sfx('card');
    return c;
  }

  // ---------- Déroulé d'une main ----------
  function deal() {
    if (busy) return;
    busy = true;
    timers.forEach(clearTimeout); timers = [];
    els.dialog.classList.remove('is-win', 'is-lose', 'is-tie');
    els.dealerLane.classList.remove('is-winner', 'is-loser');
    els.result.textContent = '';
    els.result.className = 'dice-result';
    els.bubble.classList.remove('is-visible');
    els.dealerCards.innerHTML = '';
    dealer = []; dealer.hidden = false;
    hands = [{ cards: [], split: false, done: false, bust: false }];
    active = 0;
    renderHands();
    updateDealer();
    setPhase('dealing');

    var reshuffle = shoe.length < 20;
    if (reshuffle) { newShoe(); say(line('shuffle')); }
    else if (Math.random() < 0.5) say(line('deal'));

    var start = reshuffle ? 700 : 150;
    later(function () { giveCard(0); }, start);
    later(function () { giveCard('ai'); }, start + 300);
    later(function () { giveCard(0); }, start + 600);
    later(function () { giveCard('ai', true); }, start + 900);
    later(function () {
      // Blackjack d'entrée (vous ou la banque) : on regarde tout de suite
      if (isBJ(hands[0].cards) || isBJ(dealer)) {
        hands[0].done = true;
        revealHole();
        later(settle, 600);
        return;
      }
      busy = false;
      setPhase('player');
      els.hit.focus();
    }, start + 1250);
  }

  function hit() {
    if (phase !== 'player' || busy) return;
    var h = hands[active];
    giveCard(active);
    var v = handValue(h.cards);
    if (v > 21) {
      h.bust = true;
      busy = true; setPhase('player');
      later(function () { sfx('bust'); tag(active, t('Sauté !', 'Bust!'), 'lose'); say(line('bust')); }, 250);
      later(function () { busy = false; endHand(); }, 1000);
    } else if (v === 21) {
      busy = true; setPhase('player');
      later(function () { busy = false; endHand(); }, 450);
    } else {
      setPhase('player');
    }
  }

  function stand() {
    if (phase !== 'player' || busy) return;
    sfx('tick');
    endHand();
  }

  function split() {
    if (!canSplit()) return;
    var c = hands[0].cards;
    hands = [
      { cards: [c[0]], split: true, done: false, bust: false },
      { cards: [c[1]], split: true, done: false, bust: false }
    ];
    active = 0;
    renderHands();
    sfx('ding');
    say(line('split'));
    busy = true; setPhase('player');
    var aces = c[0].r === 'A';
    later(function () { giveCard(0); }, 350);
    if (aces) {
      // As séparés : une carte chacun, puis la banque joue
      later(function () { giveCard(1); }, 700);
      later(function () { hands[0].done = hands[1].done = true; busy = false; dealerTurn(); }, 1150);
    } else {
      later(function () {
        busy = false; setPhase('player');
        if (handValue(hands[0].cards) === 21) endHand(); else els.hit.focus();
      }, 750);
    }
  }

  function endHand() {
    hands[active].done = true;
    if (active < hands.length - 1) {
      active++;
      busy = true; setPhase('player');
      later(function () {
        giveCard(active);   // 2e carte de la main suivante (après séparation)
        busy = false; setPhase('player');
        if (handValue(hands[active].cards) === 21) endHand(); else els.hit.focus();
      }, 400);
    } else {
      dealerTurn();
    }
  }

  function revealHole() {
    var hole = els.dealerCards.children[1];
    if (hole) hole.classList.remove('is-down');
    dealer.hidden = false;
    updateDealer();
    sfx('flip');
  }

  function dealerTurn() {
    busy = true;
    setPhase('dealer');
    later(revealHole, 350);
    var allBust = hands.every(function (h) { return h.bust; });
    if (allBust) { later(settle, 900); return; }

    (function step(first) {
      later(function () {
        var v = handValue(dealer);
        if (v < 17) {
          if (Math.random() < 0.6) say(line('draw'));
          later(function () { giveCard('ai'); step(false); }, 450);
        } else {
          if (v <= 21) say(line('dealerStand'));
          later(settle, 600);
        }
      }, first ? 800 : 500);
    }(true));
  }

  function tag(i, text, kind) {
    var lane = i === 'ai' ? els.dealerLane : handLane(i);
    if (!lane) return;
    var old = lane.querySelector('.bj-tag');
    if (old) old.remove();
    var s = document.createElement('span');
    s.className = 'bj-tag is-' + kind;
    s.textContent = text;
    lane.appendChild(s);
  }

  function settle() {
    var dv = handValue(dealer), dBJ = isBJ(dealer);
    var wins = 0, losses = 0, bj = false;

    hands.forEach(function (h, i) {
      var pv = handValue(h.cards), pBJ = !h.split && isBJ(h.cards), res;
      if (h.bust) res = 'lose';
      else if (pBJ && !dBJ) res = 'bj';
      else if (dBJ && !pBJ) res = 'lose';
      else if (dv > 21) res = 'win';
      else res = pv > dv ? 'win' : pv < dv ? 'lose' : 'tie';

      if (res === 'win' || res === 'bj') wins++;
      if (res === 'lose') losses++;
      if (res === 'bj') bj = true;
      var lane = handLane(i);
      lane.classList.add(res === 'lose' ? 'is-loser' : res === 'tie' ? 'is-tie' : 'is-winner');
      if (!h.bust) {
        tag(i, res === 'bj' ? 'Blackjack !' : res === 'win' ? t('Gagné', 'Win') : res === 'lose' ? t('Perdu', 'Lose') : t('Égalité', 'Push'), res);
      }
    });
    if (dv > 21) tag('ai', t('Sauté !', 'Bust!'), 'lose');
    else if (dBJ) tag('ai', 'Blackjack !', 'bj');

    score.me += wins;
    score.ai += losses;
    els.scores.me.textContent = score.me;
    els.scores.ai.textContent = score.ai;

    var outcome = wins > losses ? 'win' : losses > wins ? 'lose' : 'tie';
    els.dealerLane.classList.add(outcome === 'win' ? 'is-loser' : outcome === 'lose' ? 'is-winner' : 'is-tie');

    var key;
    if (outcome === 'win') key = bj ? 'blackjack' : dv > 21 ? 'dealerBust' : 'win';
    else if (outcome === 'lose') key = dBJ ? 'dealerBJ' : hands.every(function (h) { return h.bust; }) ? 'bustLose' : 'lose';
    else key = wins && losses ? 'mixed' : 'tie';

    els.bubble.classList.remove('is-visible');
    els.dialog.classList.add('is-' + outcome);
    els.result.textContent = line(key);
    els.result.className = 'dice-result is-visible is-' + outcome;
    if (outcome === 'win') { confetti(); sfx(bj ? 'jackpot' : 'win'); }
    else sfx(outcome);

    busy = false;
    els.dealLabel.textContent = t('Nouvelle main', 'New hand');
    setPhase('over');
    els.deal.focus();
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
    later(function () { if (els && els.confetti) els.confetti.innerHTML = ''; }, 2400);
  }
}());
