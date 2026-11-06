// ============================================================
// PARTICLES.JS — Photo interactive "granulés"
//
// Au repos : la vraie photo (<img>) est affichée, nette.
// Au survol : on bascule en fondu sur un canvas où la photo est
// découpée en milliers de petits carreaux, chacun gardant le détail
// net de la photo en pleine résolution. Seuls les carreaux poussés
// par le curseur bougent (le reste de la photo reste net), puis ils
// reviennent en place avec un effet ressort. Au clic : explosion.
// Une fois tous les grains revenus, on refond vers la photo nette.
//
// Source : img/photo_hero_section_homepage.png
// En local (file://), le navigateur interdit de lire les pixels
// d'un PNG : on charge alors à la demande js/photo-data.js
// (copie encodée de la même photo).
//
// Light mode : le halo cyan de la photo est recoloré pixel par
// pixel dans le bleu du thème clair (--secondary), la personne
// (en noir et blanc) n'est pas modifiée. Vaut pour la photo nette
// comme pour les grains.
// ============================================================

(function () {
  var wrap   = document.getElementById('photo-particles');
  var canvas = document.getElementById('photo-canvas');
  var photo  = document.getElementById('photo-static');
  if (!wrap || !canvas || !photo || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Réglages de l'effet ----------
  var GRAIN    = 2;      // taille d'un carreau (px écran) — plus petit = plus fin
  var SHIFT    = 0.5;    // déplacement (px) à partir duquel un carreau quitte sa place
  var RADIUS   = 0.15;   // rayon d'influence du curseur (proportion de la largeur)
  var PUSH     = 5;      // force de répulsion
  var SPRING   = 0.06;   // force de rappel vers la position d'origine
  var FRICTION = 0.84;   // amortissement

  var source = null;            // image dont on lit les pixels
  var count = 0;                // nombre de grains
  var hx, hy, px, py, vx, vy;
  var tx, ty, tw, th, moved;    // carreau d'origine de chaque grain (px du canvas)
  var W = 0, H = 0, dpr = 1;
  var buffer = null, pixels32 = null, base32 = null;
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

  // ---------- Light mode : halo cyan → bleu du thème ----------
  var ORIGINAL_SRC = photo.getAttribute('src');
  var lightURL = null, lightFrom = null, lightColor = '';

  function isLight() { return document.documentElement.dataset.theme === 'light'; }

  // Couleur d'accent du thème courant (#RRGGBB lu dans le CSS)
  function accentRGB() {
    var hex = getComputedStyle(document.documentElement).getPropertyValue('--secondary').trim().replace('#', '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&');
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  // Le halo est du cyan pur (0,255,255) : la part de cyan d'un pixel
  // vaut (min(V,B) − R). On la remplace par le bleu ; le gris est intact.
  function recolor(d) {
    var to = accentRGB();
    var dr = to[0], dg = to[1] - 255, db = to[2] - 255;
    for (var i = 0; i < d.length; i += 4) {
      var k = (Math.min(d[i + 1], d[i + 2]) - d[i]) / 255;
      if (k <= 0.02) continue;
      if (k > 1) k = 1;
      d[i]     = d[i]     + k * dr;
      d[i + 1] = d[i + 1] + k * dg;
      d[i + 2] = d[i + 2] + k * db;
    }
  }

  // Met la photo nette dans la bonne version (originale ou halo bleu)
  function refreshPhoto() {
    if (!isLight()) {
      if (photo.getAttribute('src') !== ORIGINAL_SRC) photo.src = ORIGINAL_SRC;
      photo.classList.remove('is-recolored');
      return;
    }
    if (!source) return;
    var color = accentRGB().join(',');
    if (lightFrom !== source || lightColor !== color) {
      try {
        var c = document.createElement('canvas');
        c.width = source.naturalWidth;
        c.height = source.naturalHeight;
        var cx = c.getContext('2d');
        cx.drawImage(source, 0, 0);
        var img = cx.getImageData(0, 0, c.width, c.height);
        recolor(img.data);
        cx.putImageData(img, 0, 0);
        lightURL = c.toDataURL('image/png');
        lightFrom = source;
        lightColor = color;
      } catch (err) {
        useFallback();
        return;
      }
    }
    photo.src = lightURL;
    photo.classList.add('is-recolored');
  }

  // Ouverture en local : on charge la copie encodée de la photo
  function useFallback() {
    if (triedFallback) return;
    triedFallback = true;
    var s = document.createElement('script');
    s.src = 'js/photo-data.js?v=25';
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
    if (isLight()) recolor(data);
    refreshPhoto();

    W = rect.width;
    H = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    buffer = ctx.createImageData(canvas.width, canvas.height);
    pixels32 = new Uint32Array(buffer.data.buffer);

    // Photo nette à la résolution du canvas : les carreaux y prennent leurs pixels
    var full;
    try {
      full = readPixels(source, canvas.width, canvas.height);
    } catch (err) {
      useFallback();
      return;
    }
    if (isLight()) recolor(full);
    base32 = new Uint32Array(full.buffer);

    var keep = [];
    for (var i = 0, n = cols * rows; i < n; i++) {
      if (data[i * 4 + 3] > 20) keep.push(i);
    }
    count = keep.length;
    hx = new Float32Array(count); hy = new Float32Array(count);
    px = new Float32Array(count); py = new Float32Array(count);
    vx = new Float32Array(count); vy = new Float32Array(count);
    tx = new Int32Array(count); ty = new Int32Array(count);
    tw = new Uint8Array(count); th = new Uint8Array(count);
    moved = new Int32Array(count);

    var sx = W / cols, sy = H / rows;
    var intro = withIntro && !reduceMotion;

    for (var k = 0; k < count; k++) {
      var idx = keep[k];
      var x = (idx % cols) * sx;
      var y = Math.floor(idx / cols) * sy;
      hx[k] = x; hy[k] = y;

      tx[k] = Math.floor(x * dpr);
      ty[k] = Math.floor(y * dpr);
      tw[k] = Math.max(1, Math.floor((x + sx) * dpr) - tx[k]);
      th[k] = Math.max(1, Math.floor((y + sy) * dpr) - ty[k]);

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

  // On part de la photo nette, on vide la place des carreaux déplacés,
  // puis on recopie chacun d'eux (avec ses pixels nets) à sa position.
  function draw() {
    pixels32.set(base32);
    var cw = canvas.width, ch = canvas.height, n = 0, i, j, xx, yy, w, h, row, src, c;

    for (i = 0; i < count; i++) {
      if (Math.abs(px[i] - hx[i]) + Math.abs(py[i] - hy[i]) <= SHIFT) continue;
      moved[n++] = i;
      w = tw[i]; h = th[i];
      for (yy = 0; yy < h; yy++) {
        row = (ty[i] + yy) * cw + tx[i];
        for (xx = 0; xx < w; xx++) pixels32[row + xx] = 0;
      }
    }

    for (j = 0; j < n; j++) {
      i = moved[j];
      w = tw[i]; h = th[i];
      var x0 = tx[i] + Math.round((px[i] - hx[i]) * dpr);
      var y0 = ty[i] + Math.round((py[i] - hy[i]) * dpr);
      if (x0 < 0 || y0 < 0 || x0 + w > cw || y0 + h > ch) continue;
      for (yy = 0; yy < h; yy++) {
        src = (ty[i] + yy) * cw + tx[i];
        row = (y0 + yy) * cw + x0;
        for (xx = 0; xx < w; xx++) {
          c = base32[src + xx];
          if (c) pixels32[row + xx] = c;
        }
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

  // Image source séparée de la photo affichée (dont le src change en light mode)
  var base = new Image();
  base.onload = function () { source = base; build(true); };
  base.src = ORIGINAL_SRC;

  // Changement de thème : nouvelle photo nette + grains recolorés
  new MutationObserver(function () {
    refreshPhoto();
    if (source && W) build(false);
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}());
