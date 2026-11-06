// ============================================================
// ICONS.JS — jeu de pictos SVG du portfolio
// Grille 24×24, trait de 1.75, extrémités et angles arrondis.
// Tous les pictos utilisent `currentColor` : ils prennent la couleur
// du texte qui les entoure (prêts pour le light / dark mode).
//
// Utilisation dans le HTML :  <span class="ico" data-icon="folder"></span>
// ============================================================

(function () {

  // ---------- Pictos d'interface ----------
  var UI = {
    menu:     '<path d="M4 6h16M4 12h16M4 18h16"/>',
    sidebar:  '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 3v18"/><path class="ico-chev" d="M14 9.5l2.5 2.5-2.5 2.5"/>',
    newchat:  '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>' +
              '<path d="M18.4 2.6a2.1 2.1 0 0 1 3 3l-9 9a2 2 0 0 1-.85.5l-2.9.85a.5.5 0 0 1-.62-.62l.85-2.9a2 2 0 0 1 .5-.85z"/>',
    send:     '<path d="M12 19V5M5 12l7-7 7 7"/>',
    close:    '<path d="M18 6L6 18M6 6l12 12"/>',
    chevron:  '<path d="M9 18l6-6-6-6"/>',
    external: '<path d="M15 3h6v6M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',

    // Navigation / sujets
    folder:   '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',
    book:     '<path d="M12 7v14"/>' +
              '<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
    pen:      '<path d="M13 7L8.7 2.7a2.4 2.4 0 0 0-3.4 0L2.7 5.3a2.4 2.4 0 0 0 0 3.4L7 13M8 6l2-2M18 16l2-2"/>' +
              '<path d="M17 11l4.3 4.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L11 17"/>' +
              '<path d="M21.2 6.8a2.8 2.8 0 0 0-4-4L3.8 16.2a2 2 0 0 0-.5.8L2 21.4a.5.5 0 0 0 .6.6l4.4-1.3a2 2 0 0 0 .8-.5z"/><path d="M15 5l4 4"/>',
    route:    '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>',
    wrench:   '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    mail:     '<rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    cv:       '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12" rx="1"/><circle cx="4" cy="4" r="2"/>',
    globe:    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    layout:   '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    mappin:   '<path d="M20 10c0 5-5.54 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.2 4 15 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2.5"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    phone:    '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
    monitor:  '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
phone:    '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',    monitor:  '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    clock:    '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    languages:'<path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    sun:      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon:     '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    cards:    '<rect x="3" y="7" width="11" height="15" rx="2"/><path d="M8.5 7V5a2 2 0 0 1 2.4-2l7 1.5a2 2 0 0 1 1.5 2.4L17 18"/>',
    gamepad:  '<path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.41-1.41A2 2 0 0 1 9.83 16h4.34a2 2 0 0 1 1.41.59L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.55-.6-6.58-.69-7.26A4 4 0 0 0 17.32 5z"/>',

    // Compétences / modales
    gear:     '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    code:     '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    seo:      '<circle cx="11" cy="11" r="8"/><path d="M3 11h16M11 3a11.5 11.5 0 0 1 0 16 11.5 11.5 0 0 1 0-16"/><path d="M21 21l-4.3-4.3"/>',
    sparkle:  '<path d="M9.94 15.5a2 2 0 0 0-1.44-1.44l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0l1.58 6.13a2 2 0 0 0 1.44 1.44l6.13 1.58a.5.5 0 0 1 0 .96l-6.13 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"/>'
  };

  // ---------- Pictos logiciels (monochromes, simplifiés) ----------
  // Pavé arrondi des logiciels Adobe + lettres dessinées au trait
  function adobe(letters) {
    return '<rect x="2.5" y="3" width="19" height="18" rx="4.5"/>' + letters;
  }
  var P = 'M7 16.5v-9h2.75a2.5 2.5 0 0 1 0 5H7';   // lettre "P"

  function claudeBurst() {
    var d = '';
    for (var i = 0; i < 12; i++) {
      var a = (i * 30 - 90) * Math.PI / 180;
      var r1 = 2.4, r2 = i % 2 ? 7.2 : 9.6;
      d += 'M' + (12 + Math.cos(a) * r1).toFixed(2) + ' ' + (12 + Math.sin(a) * r1).toFixed(2) +
           'L' + (12 + Math.cos(a) * r2).toFixed(2) + ' ' + (12 + Math.sin(a) * r2).toFixed(2);
    }
    return '<path d="' + d + '"/>';
  }

  var TOOLS = {
    illustrator: adobe('<path d="M6.5 16.5L9.25 7.5 12 16.5M7.4 13.6h3.7M15.5 11v5.5"/><path d="M15.5 8.1v.01" stroke-width="2.2"/>'),
    photoshop:   adobe('<path d="' + P + '"/><path d="M17.3 11.2a2 2 0 0 0-1.8-.9c-1 0-1.8.55-1.8 1.4 0 2 3.7 1.1 3.7 3.1 0 .95-.85 1.6-2 1.6a2.3 2.3 0 0 1-2-1"/>'),
    indesign:    adobe('<path d="M7.5 7.5v9M17 7.5v9"/><ellipse cx="14.3" cy="13.6" rx="2.6" ry="2.9"/>'),
    premiere:    adobe('<path d="' + P + '"/><path d="M14 16.5v-6M14 12.6c.5-1.4 1.5-2.2 3-2.2"/>'),
    js:          '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M11 9.5v5.3a2 2 0 0 1-3.6 1.2"/><path d="M18 10.3a1.9 1.9 0 0 0-1.7-.8c-1 0-1.7.55-1.7 1.4 0 2 3.5 1.1 3.5 3.1 0 .95-.8 1.6-1.9 1.6a2.2 2.2 0 0 1-1.9-1"/>',
    html:        '<path d="M4 2.5h16l-1.5 16.7L12 21.5l-6.5-2.3z"/><path d="M15.5 7H8.6l.35 4.2h6.2l-.45 4.4-2.7.9-2.7-.9-.15-1.7"/>',
    css:         '<path d="M4 2.5h16l-1.5 16.7L12 21.5l-6.5-2.3z"/><path d="M8.5 7h7l-.4 4.2H9.3M15.1 11.2l-.45 4.4-2.65.9-2.65-.9-.15-1.7"/>',
    figma:       '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12z"/>' +
                 '<circle cx="15.5" cy="12.5" r="3.5"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>',
    wordpress:   '<circle cx="12" cy="12" r="10"/><path d="M5.5 8.5h2.6M14 8.5h2.2M6.8 8.5l3.2 9 2-6M12.6 8.5l3.2 9 2.7-7.6"/>',
    chatgpt:     '<g transform="rotate(0 12 12)"><path d="M12 3.2c2.1 0 3.6 1.5 3.6 3.6v6.4l-3.6 2.1-3.6-2.1V6.8C8.4 4.7 9.9 3.2 12 3.2z"/></g>' +
                 '<g transform="rotate(120 12 12)"><path d="M12 3.2c2.1 0 3.6 1.5 3.6 3.6v6.4l-3.6 2.1-3.6-2.1V6.8C8.4 4.7 9.9 3.2 12 3.2z"/></g>' +
                 '<g transform="rotate(240 12 12)"><path d="M12 3.2c2.1 0 3.6 1.5 3.6 3.6v6.4l-3.6 2.1-3.6-2.1V6.8C8.4 4.7 9.9 3.2 12 3.2z"/></g>',
    claude:      claudeBurst(),
    stitch:      '<path d="M14 2v6a2 2 0 0 0 .25.96l5.5 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.75-2.96l5.5-10.08A2 2 0 0 0 10 8V2"/><path d="M6.5 15h11M8.5 2h7"/>'
  };

  // ---------- Drapeaux (bouton de langue) — en couleur, exception aux pictos au trait ----------
  var FLAG_BOX = 'x="2" y="5" width="20" height="14" rx="2.5"';
  function flag(id, inner) {
    return '<defs><clipPath id="' + id + '"><rect ' + FLAG_BOX + '/></clipPath></defs>' +
      '<g clip-path="url(#' + id + ')" stroke="none">' + inner + '</g>' +
      '<rect ' + FLAG_BOX + ' fill="none" stroke="currentColor" stroke-width="1" opacity=".3"/>';
  }
  var FLAGS = {
    'flag-fr': flag('clip-flag-fr',
      '<rect x="2" y="5" width="6.7" height="14" fill="#002395"/>' +
      '<rect x="8.6" y="5" width="6.8" height="14" fill="#FFFFFF"/>' +
      '<rect x="15.3" y="5" width="6.7" height="14" fill="#ED2939"/>'),
    'flag-en': flag('clip-flag-en',
      '<rect x="2" y="5" width="20" height="14" fill="#012169"/>' +
      '<path d="M2 5l20 14M22 5L2 19" stroke="#FFFFFF" stroke-width="2.8"/>' +
      '<path d="M2 5l20 14M22 5L2 19" stroke="#C8102E" stroke-width="1"/>' +
      '<path d="M12 5v14M2 12h20" stroke="#FFFFFF" stroke-width="4"/>' +
      '<path d="M12 5v14M2 12h20" stroke="#C8102E" stroke-width="2.2"/>')
  };

  function svg(name) {
    var body = UI[name] || TOOLS[name] || FLAGS[name];
    if (!body) return '';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      body + '</svg>';
  }

  // Remplit tous les <span class="ico" data-icon="..."> présents dans `root`
  function render(root) {
    (root || document).querySelectorAll('.ico[data-icon]:not([data-ready])').forEach(function (el) {
      el.innerHTML = svg(el.dataset.icon);
      el.setAttribute('data-ready', '');
    });
  }

  window.Icons = { svg: svg, render: render };
  render(document);
}());
