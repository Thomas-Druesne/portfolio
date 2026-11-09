// ============================================================
// SFX.JS — Petits bruitages des mini-jeux (dés, blackjack)
// Tout est synthétisé avec la Web Audio API : aucun fichier son.
// Un bouton (haut-parleur) coupe / remet le son ; le choix est mémorisé.
//
// Utilisation : Sfx.play('rattle', 950), Sfx.play('win'), Sfx.button()
// ============================================================

(function () {
  var KEY = 'portfolio-sound';
  var ctx = null, master = null, noiseBuf = null;

  function muted() { try { return localStorage.getItem(KEY) === 'off'; } catch (e) { return false; } }

  function ac() {
    if (!ctx) {
      var C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
      master = ctx.createGain();
      master.gain.value = 0.55;
      master.connect(ctx.destination);
      // 1 s de bruit blanc, réutilisé pour les dés, les cartes…
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      var d = noiseBuf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Note simple avec enveloppe (attaque courte, chute exponentielle)
  function tone(freq, at, dur, type, vol, glideTo) {
    var c = ctx, t = c.currentTime + at;
    var o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine';
    o.frequency.setValueAtTime(freq, t);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  // Souffle filtré : clic de dé, glissement de carte…
  function noise(at, dur, vol, freq, filter, q) {
    var c = ctx, t = c.currentTime + at;
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = noiseBuf;
    f.type = filter || 'bandpass';
    f.frequency.value = freq || 2000;
    f.Q.value = q || 1;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.3, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
  }

  function notes(list, step, type, vol, len) {
    list.forEach(function (f, i) { tone(f, i * step, len || 0.22, type || 'triangle', vol || 0.16); });
  }

  var SOUNDS = {
    // Dés qui roulent dans la main / sur la table (durée en ms)
    rattle: function (ms) {
      var n = Math.max(4, Math.round((ms || 900) / 55));
      for (var i = 0; i < n; i++) {
        noise(i * 0.055 + Math.random() * 0.02, 0.035, 0.18 + Math.random() * 0.12, 1800 + Math.random() * 2600, 'bandpass', 3);
      }
    },
    // Dé qui se pose
    clack: function () {
      noise(0, 0.06, 0.4, 1300, 'bandpass', 2);
      tone(190, 0, 0.08, 'triangle', 0.18, 120);
    },
    // Petite bulle (l'IA parle)
    pop: function () { tone(620, 0, 0.09, 'sine', 0.12, 980); },
    // Clic de bouton
    tick: function () { tone(1200, 0, 0.04, 'square', 0.04); },
    // Carte distribuée (glissement)
    card: function () {
      noise(0, 0.11, 0.22, 3800, 'highpass', 0.7);
      noise(0.05, 0.05, 0.12, 1500, 'bandpass', 1.5);
    },
    // Carte retournée
    flip: function () {
      noise(0, 0.05, 0.25, 2600, 'bandpass', 2);
      tone(520, 0.01, 0.06, 'triangle', 0.08, 760);
    },
    // Victoire : petit arpège qui monte
    win: function () { notes([523, 659, 784, 1047], 0.09, 'triangle', 0.16, 0.26); tone(1568, 0.4, 0.35, 'sine', 0.07); },
    // Blackjack / double six : arpège + scintillement
    jackpot: function () {
      notes([523, 659, 784, 1047, 1319], 0.08, 'triangle', 0.16, 0.25);
      for (var i = 0; i < 6; i++) tone(1800 + Math.random() * 1400, 0.45 + i * 0.05, 0.12, 'sine', 0.05);
    },
    // Défaite : « wah wah » qui descend
    lose: function () {
      tone(392, 0, 0.22, 'triangle', 0.15);
      tone(370, 0.22, 0.22, 'triangle', 0.15);
      tone(349, 0.44, 0.5, 'triangle', 0.15, 262);
    },
    // Égalité : deux notes identiques
    tie: function () { tone(587, 0, 0.16, 'triangle', 0.14); tone(587, 0.2, 0.22, 'triangle', 0.14); },
    // Main qui saute (plus de 21)
    bust: function () { tone(220, 0, 0.45, 'sawtooth', 0.09, 70); noise(0, 0.25, 0.15, 400, 'lowpass', 1); },
    // Petit « ding » (double aux dés, séparation au blackjack)
    ding: function () { tone(1319, 0, 0.3, 'sine', 0.1); tone(1976, 0.06, 0.3, 'sine', 0.06); }
  };

  function play(name, arg) {
    if (muted() || !SOUNDS[name]) return;
    try { if (ac()) SOUNDS[name](arg); } catch (e) {}
  }

  // Bouton haut-parleur à placer dans la fenêtre d'un jeu
  var ICON_ON  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  var ICON_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M16 9l6 6M22 9l-6 6"/></svg>';

  function button(fr) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'game-mute';
    function paint() {
      var off = muted();
      b.innerHTML = off ? ICON_OFF : ICON_ON;
      b.setAttribute('aria-pressed', off ? 'true' : 'false');
      b.setAttribute('aria-label', off ? (fr ? 'Activer le son' : 'Turn sound on') : (fr ? 'Couper le son' : 'Mute sound'));
      b.title = b.getAttribute('aria-label');
    }
    b.addEventListener('click', function () {
      try { localStorage.setItem(KEY, muted() ? 'on' : 'off'); } catch (e) {}
      paint();
      play('tick');
    });
    paint();
    return b;
  }

  window.Sfx = { play: play, button: button };
}());
