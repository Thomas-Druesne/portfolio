// ============================================================
// PARTICLES.JS — Photo interactive "granulés"
//
// Au repos : la vraie photo (<img>) est affichée, nette.
// Au survol : on bascule en fondu sur un canvas où la photo est
// découpée en milliers de grains (chacun garde sa couleur). Les
// grains s'écartent autour du curseur puis reviennent en place
// avec un effet ressort. Au clic : petite explosion.
// Une fois tous les grains revenus, on refond vers la photo nette.
//
// Source : img/photo_hero_section_homepage.png
// En local (file://), le navigateur interdit de lire les pixels
// d'un PNG : on charge alors à la demande js/photo-data.js
// (copie encodée de la même photo).
// ============================================================

(function () {
  var wrap   = document.getElementById('photo-particles');
  var canvas = document.getElementById('photo-canvas');
  var photo  = document.getElementById('photo-static');
  if (!wrap || !canvas || !photo || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Réglages de l'effet ----------
  var GRAIN    = 2;      // espacement entre les grains (px écran) — plus petit = plus fin
  var DOT      = 0.9;    // taille d'un grain (proportion de l'espacement)
  var RADIUS   = 0.15;   // rayon d'influence du curseur (proportion de la largeur)
  var PUSH     = 5;      // force de répulsion
  var SPRING   = 0.06;   // force de rappel vers la position d'origine
  var FRICTION = 0.84;   // amortissement

  var source = null;            // image dont on lit les pixels
  var count = 0;                // nombre de grains
  var hx, hy, px, py, vx, vy, col;
  var W = 0, H = 0, dpr = 1, dotPx = 1;
  var buffer = null, pixels32 = null;
  var mouse = { x: 0, y: 0, active: false };
  var running = false;
  var triedFallback = false;

  // ---------- Lecture des pixels ----------
  function readPixels(img, cols, rows) {
    var off = document.createElement('canvas');
    off.width = cols;
    off.height = rows;
    var octx = off.getContext('2d');
    octx.imageSmoothingQuality = 'high';
    octx.drawImage(img, 0, 0, cols, rows);
    return octx.getImageData(0, 0, cols, rows).data; // lève SecurityError en file://
  }

  // Ouverture en local : on charge la copie encodée de la photo
  function useFallback() {
    if (triedFallback) return;
    triedFallback = true;
    var s = document.createElement('script');
    s.src = 'js/photo-data.js?v=3';
    s.onload = function () {
      if (!window.PHOTO_FALLBACK) return;
      var img = new Image();
      img.onload = function () { source = img; build(true); };
      img.src = window.PHOTO_FALLBACK;
    };
    document.body.appendChild(s);
  }

  // ---------- Construction des grains ----------
  function build(withIntro) {
    var rect = wrap.getBoundingClientRect();
    if (!rect.width || !source) return;

    var data;
    var cols = Math.round(rect.width / GRAIN);
    var rows = Math.round(rect.height / GRAIN);
    try {
      data = readPixels(source, cols, rows);
    } catch (err) {
      useFallback();
      return;
    }

    W = rect.width;
    H = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    buffer = ctx.createImageData(canvas.width, canvas.height);
    pixels32 = new Uint32Array(buffer.data.buffer);
    dotPx = Math.max(1, Math.round(GRAIN * DOT * dpr));

    var keep = [];
    for (var i = 0, n = cols * rows; i < n; i++) {
      if (data[i * 4 + 3] > 20) keep.push(i);
    }
    count = keep.length;
    hx = new Float32Array(count); hy = new Float32Array(count);
    px = new Float32Array(count); py = new Float32Array(count);
    vx = new Float32Array(count); vy = new Float32Array(count);
    col = new Uint32Array(count);

    var little = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
    var sx = W / cols, sy = H / rows;
    var intro = withIntro && !reduceMotion;

    for (var k = 0; k < count; k++) {
      var idx = keep[k];
      var x = (idx % cols) * sx;
      var y = Math.floor(idx / cols) * sy;
      hx[k] = x; hy[k] = y;

      var o = idx * 4;
      var r = data[o], g = data[o + 1], b = data[o + 2], a = data[o + 3];
      col[k] = little ? ((a << 24) | (b << 16) | (g << 8) | r) >>> 0
                      : ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;

      if (intro) {
        // Les grains arrivent depuis un nuage dispersé
        var ang = Math.random() * Math.PI * 2;
        var dist = (0.35 + Math.random() * 0.65) * W * 0.7;
        px[k] = W / 2 + Math.cos(ang) * dist;
        py[k] = H / 2 + Math.sin(ang) * dist;
      } else {
        px[k] = x; py[k] = y;
      }
      vx[k] = 0; vy[k] = 0;
    }

    draw();
    if (intro) wake();
  }

  // ---------- Animation ----------
  function step() {
    var rad = W * RADIUS, rad2 = rad * rad;
    var moving = 0;

    for (var i = 0; i < count; i++) {
      var x = px[i], y = py[i];

      if (mouse.active) {
        var dx = x - mouse.x, dy = y - mouse.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < rad2 && d2 > 0.01) {
          var d = Math.sqrt(d2);
          var f = 1 - d / rad;
          f = f * f * PUSH;
          vx[i] += (dx / d) * f;
          vy[i] += (dy / d) * f;
        }
      }

      vx[i] = (vx[i] + (hx[i] - x) * SPRING) * FRICTION;
      vy[i] = (vy[i] + (hy[i] - y) * SPRING) * FRICTION;
      px[i] = x + vx[i];
      py[i] = y + vy[i];

      if (vx[i] * vx[i] + vy[i] * vy[i] > 0.0004 ||
          Math.abs(hx[i] - px[i]) + Math.abs(hy[i] - py[i]) > 0.08) moving++;
    }
    return moving;
  }

  function draw() {
    pixels32.fill(0);
    var cw = canvas.width, ch = canvas.height, s = dotPx;
    for (var i = 0; i < count; i++) {
      var x0 = (px[i] * dpr) | 0, y0 = (py[i] * dpr) | 0;
      if (x0 < 0 || y0 < 0 || x0 + s > cw || y0 + s > ch) continue;
      var c = col[i];
      for (var yy = 0; yy < s; yy++) {
        var row = (y0 + yy) * cw + x0;
        for (var xx = 0; xx < s; xx++) pixels32[row + xx] = c;
      }
    }
    ctx.putImageData(buffer, 0, 0);
  }

  function loop() {
    var moving = step();
    draw();
    if (moving || mouse.active) {
      requestAnimationFrame(loop);
    } else {
      // Tout est revenu en place : retour à la photo nette, pause du calcul
      running = false;
      wrap.classList.remove('is-moving');
    }
  }

  function wake() {
    if (!count) return;
    wrap.classList.add('is-moving');
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  }

  // ---------- Souris / tactile ----------
  function setPointer(e) {
    var r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }

  wrap.addEventListener('pointermove', function (e) {
    setPointer(e);
    mouse.active = true;
    wake();
  });
  wrap.addEventListener('pointerleave', function () { mouse.active = false; });
  wrap.addEventListener('pointerup', function (e) {
    if (e.pointerType !== 'mouse') mouse.active = false;
  });

  // Clic : explosion des grains autour du point cliqué
  wrap.addEventListener('pointerdown', function (e) {
    if (!count) return;
    setPointer(e);
    var rad = W * RADIUS * 2.4, rad2 = rad * rad;
    for (var i = 0; i < count; i++) {
      var dx = px[i] - mouse.x, dy = py[i] - mouse.y;
      var d2 = dx * dx + dy * dy;
      if (d2 < rad2 && d2 > 0.01) {
        var d = Math.sqrt(d2);
        var f = (1 - d / rad) * 22 * (0.6 + Math.random() * 0.8);
        vx[i] += (dx / d) * f;
        vy[i] += (dy / d) * f;
      }
    }
    mouse.active = e.pointerType === 'mouse';
    wake();
  });

  // ---------- Démarrage / redimensionnement ----------
  var resizeTimer;
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var w = wrap.getBoundingClientRect().width;
        if (!source || !w || Math.abs(w - W) < 1) return; // taille inchangée ou zone masquée
        build(false);
      }, 120);
    }).observe(wrap);
  }

  function init() { source = photo; build(true); }
  if (photo.complete && photo.naturalWidth) init();
  else photo.addEventListener('load', init);
}());
