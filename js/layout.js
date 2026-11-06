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
      <p class="side-label" data-fr="Récents" data-en="Recent">Récents</p>
      <ul class="side-list">
        ${topic('projets', 'folder', 'Mes projets', 'My projects')}
        ${topic('book', 'book', 'Mon book graphique', 'My graphic portfolio')}
        ${topic('competences', 'pen', 'Mes compétences', 'My skills')}
        ${topic('parcours', 'route', 'Mon parcours professionnel', 'My professional background')}
        ${topic('outils', 'wrench', 'Mes outils', 'My tools')}
      </ul>

      <p class="side-label" data-fr="Pages" data-en="Pages">Pages</p>
      <ul class="side-list">
        <li><a href="projets.html" class="side-item"><span class="ico" data-icon="layout"></span><span data-fr="Tous les projets" data-en="All projects">Tous les projets</span></a></li>
        <li><a href="a-propos.html" class="side-item"><span class="ico" data-icon="user"></span><span data-fr="À propos" data-en="About">À propos</span></a></li>
        <li><a href="contact.html" class="side-item"><span class="ico" data-icon="mail"></span><span data-fr="Me contacter" data-en="Contact me">Me contacter</span></a></li>
      </ul>
    </nav>

    <div class="sidebar-bottom">
      <div class="side-actions">
        <a href="img/CV_DRUESNE_Thomas.pdf" class="side-action" target="_blank" rel="noopener"><span class="ico" data-icon="cv"></span><span data-fr="Mon CV" data-en="Resume">Mon CV</span></a>
        <a href="https://www.linkedin.com/in/thomas-druesne-webdesign-developpeur/" class="side-action" target="_blank" rel="noopener"><span class="ico" data-icon="linkedin"></span><span>LinkedIn</span></a>
        <button class="side-action" type="button" id="lang-btn"><span class="ico" data-icon="globe"></span><span data-fr="English" data-en="Français">English</span></button>
      </div>
      <div class="side-profile">
        <span class="avatar" aria-hidden="true">TD</span>
        <span class="side-profile-txt">
          <strong>Thomas Druesne</strong>
          <small data-fr="Webdesigner UX &amp; Intégrateur" data-en="UX Webdesigner &amp; Integrator">Webdesigner UX &amp; Intégrateur</small>
        </span>
      </div>
    </div>
  </aside>

  <div class="sidebar-scrim" id="sidebar-scrim"></div>`;

  app.insertAdjacentHTML('afterbegin', SIDEBAR);
}());
