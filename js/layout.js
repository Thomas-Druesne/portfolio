// ============================================================
// LAYOUT.JS — Barre latérale partagée (accueil + chat)
// Injectée au début de .app. La page courante est donnée par
// <body data-page="home|chat">.
// ============================================================

(function () {
  var app = document.getElementById('app');
  if (!app) return;
  var page = document.body.dataset.page || 'home';

  function topic(id, icon, fr, en) {
    return '<li><a href="index.html#' + id + '" class="side-item" data-topic="' + id + '">' +
      '<span class="ico" data-icon="' + icon + '"></span>' +
      '<span data-fr="' + fr + '" data-en="' + en + '">' + fr + '</span></a></li>';
  }

  var SIDEBAR = `
  <aside class="sidebar" id="sidebar" aria-label="Navigation">

    <div class="sidebar-top">
      <a href="index.html" class="sidebar-logo" aria-label="Accueil">
        <img src="img/logo-portfolio-white.png" alt="Logo TO" />
      </a>
      <button class="icon-btn" id="sidebar-close" type="button" aria-label="Fermer le menu" data-fr-aria="Fermer le menu" data-en-aria="Close menu">
        <span class="ico" data-icon="sidebar"></span>
      </button>
    </div>

    <a href="chat.html" class="side-new${page === 'chat' ? ' is-active' : ''}" data-action="new">
      <span class="ico" data-icon="newchat"></span>
      <span data-fr="Nouvelle conversation" data-en="New chat">Nouvelle conversation</span>
    </a>

    <nav class="side-scroll">
      <p class="side-label" data-fr="Épinglé" data-en="Pinned">Épinglé</p>
      <ul class="side-list">
        ${topic('projets', 'folder', 'Mes projets', 'My projects')}
        ${topic('competences', 'pen', 'Mes compétences', 'My skills')}
        ${topic('parcours', 'route', 'Mon parcours professionnel', 'My professional background')}
        ${topic('outils', 'wrench', 'Mes outils', 'My tools')}
      </ul>
      <p class="side-label" data-fr="Récents" data-en="Recent">Récents</p>
      <ul class="side-list">
        ${topic('book', 'book', 'Mon book graphique', 'My graphic portfolio')}
        ${topic('apropos', 'user', 'À propos de moi', 'About me')}
        ${topic('contact', 'mail', 'Me contacter', 'Contact me')}
      </ul>
    </nav>

    <div class="sidebar-bottom">
      <ul class="side-list side-list--compact">
        <li><a href="img/CV_DRUESNE_Thomas.pdf" class="side-item" target="_blank" rel="noopener"><span class="ico" data-icon="cv"></span><span data-fr="Mon CV" data-en="My resume">Mon CV</span></a></li>
        <li><a href="https://www.linkedin.com/in/thomas-druesne-webdesign-developpeur/" class="side-item" target="_blank" rel="noopener"><span class="ico" data-icon="linkedin"></span><span>LinkedIn</span></a></li>
        <li><button class="side-item" type="button" id="lang-btn"><span class="ico ico-flag flag-en" data-icon="flag-en"></span><span class="ico ico-flag flag-fr" data-icon="flag-fr"></span><span data-fr="English" data-en="Français">English</span></button></li>
      </ul>
      <div class="side-profile">
        <img class="avatar" src="${document.documentElement.dataset.theme === 'light' ? 'img/PP_chatbot_light.png' : 'img/PP_chatbot.png'}" alt="" aria-hidden="true" />
        <span class="side-profile-txt">
          <strong>Thomas Druesne</strong>
          <small data-fr="Webdesigner UX &amp; Intégrateur" data-en="UX Webdesigner &amp; Integrator">Webdesigner UX &amp; Intégrateur</small>
        </span>
      </div>
      <p class="side-copy" data-fr="© 2026 Thomas Druesne · Tous droits réservés" data-en="© 2026 Thomas Druesne · All rights reserved">© 2026 Thomas Druesne · Tous droits réservés</p>
    </div>
  </aside>

  <div class="sidebar-scrim" id="sidebar-scrim"></div>`;

  app.insertAdjacentHTML('afterbegin', SIDEBAR);
}());
