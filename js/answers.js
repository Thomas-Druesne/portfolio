// ============================================================
// ANSWERS.JS — Réponses du chat + modales projets
// Partagé par index.html (accueil) et chat.html (nouvelle conversation).
// Le HTML ci-dessous est injecté à la fin de <body> au chargement.
//
// Pour ajouter une réponse : un <article data-topic="..."> dans #answers.
// data-q-fr / data-q-en = la question affichée côté visiteur.
// ============================================================

(function () {
  var HTML = `
  <!-- =========================================================
       RÉPONSES — contenus affichés dans la conversation.
       Chaque <article> = une réponse. data-q-fr / data-q-en =
       la question affichée côté visiteur.
  ========================================================== -->
  <div id="answers" hidden>

    <!-- MES PROJETS -->
    <article data-topic="projets" data-q-fr="Montre-moi tes projets" data-q-en="Show me your projects">
      <p data-fr="Avec plaisir ! Voici quelques réalisations dont je suis particulièrement fier. Cliquez sur un projet pour en voir le détail." data-en="With pleasure! Here are some achievements I am particularly proud of. Click on a project to see the details.">Avec plaisir ! Voici quelques réalisations dont je suis particulièrement fier. Cliquez sur un projet pour en voir le détail.</p>
      <div class="project-grid">
        <button type="button" class="project-card" data-modal="modal-inzerty">
          <img src="img/img-projet-inzerty.png" alt="Inzerty" />
          <span class="project-meta"><strong>Inzerty</strong><small data-fr="Wireframes/maquettage/intégration" data-en="Wireframes/mockup/integration">Wireframes/maquettage/intégration</small></span>
        </button>
        <button type="button" class="project-card" data-modal="modal-e2c">
          <img src="img/img-projet-E2C.png" alt="École de la seconde chance" />
          <span class="project-meta"><strong data-fr="École de la seconde chance" data-en="School of the second chance">École de la seconde chance</strong><small data-fr="Intégration WordPress" data-en="WordPress Integration">Intégration WordPress</small></span>
        </button>
        <button type="button" class="project-card" data-modal="modal-envie">
          <img src="img/img-projet-envie.png" alt="Envie Nord" />
          <span class="project-meta"><strong>Envie Nord</strong><small data-fr="Prototypage/UX Design" data-en="Prototyping/UX Design">Prototypage/UX Design</small></span>
        </button>
        <button type="button" class="project-card" data-modal="modal-dinamic">
          <img src="img/img-projet-dinamic.png" alt="Site web Dinamic" />
          <span class="project-meta"><strong data-fr="Site web Dinamic" data-en="Dinamic website">Site web Dinamic</strong><small data-fr="Maquettage/Intégration" data-en="Mockup/Integration">Maquettage/Intégration</small></span>
        </button>
      </div>
      <div class="answer-actions">
        <a href="projets.html" class="btn btn-accent"><span class="ico" data-icon="layout"></span><span data-fr="Voir tous les projets" data-en="See all projects">Voir tous les projets</span></a>
      </div>
    </article>

    <!-- MON BOOK GRAPHIQUE -->
    <article data-topic="book" data-q-fr="Tu as un book graphique ?" data-q-en="Do you have a graphic portfolio?">
      <p data-fr="Oui ! C'est une sélection de créations visuelles, logos et supports print." data-en="Yes! It's a selection of visual creations, logos and print media.">Oui ! C'est une sélection de créations visuelles, logos et supports print.</p>
      <figure class="answer-figure"><img src="img/img_book.png" alt="Mon Book" /></figure>
      <p data-fr="Plus qu'une simple sélection de projets, ce book reflète ma façon d'aborder le design — avec rigueur, intention et attention au détail. Chaque projet présenté ici est l'occasion d'un dialogue entre esthétique et fonctionnalité ; les choix typographiques, la mise en page et l'équilibre visuel sont travaillés avec soin." data-en="More than a simple selection of projects, this portfolio reflects my approach to design — with rigour, intention and attention to detail. Each project presented here is an opportunity for a dialogue between aesthetics and functionality; typographic choices, layout and visual balance are carefully crafted.">Plus qu'une simple sélection de projets, ce book reflète ma façon d'aborder le design — avec rigueur, intention et attention au détail. Chaque projet présenté ici est l'occasion d'un dialogue entre esthétique et fonctionnalité ; les choix typographiques, la mise en page et l'équilibre visuel sont travaillés avec soin.</p>
      <p data-fr="Je conçois le design comme un dialogue entre esthétique et fonctionnalité. Mes projets naviguent entre le print et le digital, avec une sensibilité graphique constante et le souci de créer des expériences cohérentes et mémorables." data-en="I see design as a dialogue between aesthetics and functionality. My projects navigate between print and digital, with a consistent graphic sensibility and the concern to create coherent and memorable experiences.">Je conçois le design comme un dialogue entre esthétique et fonctionnalité. Mes projets naviguent entre le print et le digital, avec une sensibilité graphique constante et le souci de créer des expériences cohérentes et mémorables.</p>
      <p><strong data-fr="Parcourez mes travaux et découvrez une approche du design où chaque détail a son importance." data-en="Browse my work and discover a design approach where every detail matters.">Parcourez mes travaux et découvrez une approche du design où chaque détail a son importance.</strong></p>
      <div class="answer-actions">
        <a href="img/book_graphique_druesne_thomas.pdf" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="book"></span><span data-fr="Consulter mon book" data-en="View my portfolio">Consulter mon book</span></a>
      </div>
    </article>

    <!-- MES COMPÉTENCES -->
    <article data-topic="competences" data-q-fr="Quelles sont tes compétences ?" data-q-en="What are your skills?">
      <p data-fr="Du concept à l'intégration, voici ce que je sais faire :" data-en="From concept to integration, here's what I can do:">Du concept à l'intégration, voici ce que je sais faire :</p>
      <div class="skill-grid">
        <div class="skill-card">
          <span class="ico skill-ico" data-icon="pen"></span>
          <h3 data-fr="Graphisme" data-en="Graphic Design">Graphisme</h3>
          <p data-fr="Création de logos, prints, et visuels sur la suite Adobe (Photoshop, Illustrator &amp; InDesign)" data-en="Logo, print and visual creation using the Adobe suite (Photoshop, Illustrator &amp; InDesign)">Création de logos, prints, et visuels sur la suite Adobe (Photoshop, Illustrator &amp; InDesign)</p>
        </div>
        <div class="skill-card">
          <span class="ico skill-ico" data-icon="figma"></span>
          <h3>UI/UX Design</h3>
          <p data-fr="Conception de wireframes et de maquettes en fonction des besoins et/ou décideurs sur Figma" data-en="Design of wireframes and mockups based on needs and/or decision-makers using Figma">Conception de wireframes et de maquettes en fonction des besoins et/ou décideurs sur Figma</p>
        </div>
        <div class="skill-card">
          <span class="ico skill-ico" data-icon="code"></span>
          <h3 data-fr="Intégration &amp; responsive" data-en="Integration &amp; responsive">Intégration &amp; responsive</h3>
          <p data-fr="Pratique de HTML/CSS/JS et du responsive, optimisation du code source des fichiers sur WordPress" data-en="Practice of HTML/CSS/JS and responsive design, source code optimisation on WordPress">Pratique de HTML/CSS/JS et du responsive, optimisation du code source des fichiers sur WordPress</p>
        </div>
        <div class="skill-card">
          <span class="ico skill-ico" data-icon="seo"></span>
          <h3 data-fr="Référencement" data-en="SEO">Référencement</h3>
          <p data-fr="Mise en place du référencement page par page SEO/GEO sur WordPress (Yoast SEO)" data-en="Implementation of page-by-page SEO/GEO on WordPress (Yoast SEO)">Mise en place du référencement page par page SEO/GEO sur WordPress (Yoast SEO)</p>
        </div>
      </div>
    </article>

    <!-- MON PARCOURS -->
    <article data-topic="parcours" data-q-fr="Raconte-moi ton parcours professionnel" data-q-en="Tell me about your professional background">
      <p data-fr="Cinq expériences ont forgé mon regard sur le design :" data-en="Five experiences shaped my vision of design:">Cinq expériences ont forgé mon regard sur le design :</p>
      <ol class="timeline">
        <li>
          <span class="timeline-date">2021/2022</span>
          <h3 data-fr="Webdesigner/Intégrateur" data-en="Webdesigner/Integrator">Webdesigner/Intégrateur</h3>
          <p data-fr="Stage en agence de communication chez « Kamélécom » pour de l'intégration principalement en WordPress." data-en="Internship at communication agency « Kamélécom » for integration mainly in WordPress.">Stage en agence de communication chez « Kamélécom » pour de l'intégration principalement en WordPress.</p>
        </li>
        <li>
          <span class="timeline-date">2022</span>
          <h3>UI/UX Designer</h3>
          <p data-fr="Intégration de l'incubateur numérique « d'Eurotechnologie » sur Figma en projets réels." data-en="Integration of the digital incubator « Eurotechnologie » on Figma in real projects.">Intégration de l'incubateur numérique « d'Eurotechnologie » sur Figma en projets réels.</p>
        </li>
        <li>
          <span class="timeline-date">2022/2023</span>
          <h3 data-fr="Webdesigner UX/Intégrateur" data-en="UX Webdesigner/Integrator">Webdesigner UX/Intégrateur</h3>
          <p data-fr="Alternance réalisée chez « Jooxter » pour la maintenance/refonte de leur site web &amp; du montage vidéo." data-en="Work-study at « Jooxter » for website maintenance/redesign &amp; video editing.">Alternance réalisée chez « Jooxter » pour la maintenance/refonte de leur site web &amp; du montage vidéo.</p>
        </li>
        <li>
          <span class="timeline-date">2024</span>
          <h3 data-fr="Graphiste/Webdesigner" data-en="Graphic designer/Webdesigner">Graphiste/Webdesigner</h3>
          <p data-fr="Stage chez « About Ressources » : création du branding complet + le site web pour une juriste freelance." data-en="Internship at « About Ressources »: complete branding + website for a freelance jurist.">Stage chez « About Ressources » : création du branding complet + le site web pour une juriste freelance.</p>
        </li>
        <li>
          <span class="timeline-date">2025/2026</span>
          <h3 data-fr="Webdesigner UX/Intégrateur" data-en="UX Webdesigner/Integrator">Webdesigner UX/Intégrateur</h3>
          <p data-fr="Premier contrat signé chez (inzerty), afin de réaliser des projets web vitrine &amp; e-commerce de A à Z." data-en="First contract signed at (inzerty), to carry out showcase &amp; e-commerce web projects from A to Z.">Premier contrat signé chez (inzerty), afin de réaliser des projets web vitrine &amp; e-commerce de A à Z.</p>
        </li>
      </ol>
      <div class="answer-actions">
        <a href="a-propos.html" class="btn btn-accent"><span class="ico" data-icon="user"></span><span data-fr="En savoir plus" data-en="Learn more">En savoir plus</span></a>
      </div>
    </article>

    <!-- MES OUTILS -->
    <article data-topic="outils" data-q-fr="Avec quels outils travailles-tu ?" data-q-en="Which tools do you work with?">
      <p data-fr="Je maîtrise un ensemble complet d'outils essentiels au webdesign, allant de la création graphique au développement web." data-en="I master a complete set of tools essential to webdesign, from graphic creation to web development.">Je maîtrise un ensemble complet d'outils essentiels au webdesign, allant de la création graphique au développement web.</p>
      <div class="tool-grid">
        <span class="tool"><span class="ico" data-icon="illustrator"></span>Illustrator</span>
        <span class="tool"><span class="ico" data-icon="photoshop"></span>Photoshop</span>
        <span class="tool"><span class="ico" data-icon="indesign"></span>InDesign</span>
        <span class="tool"><span class="ico" data-icon="premiere"></span>Premiere</span>
        <span class="tool"><span class="ico" data-icon="figma"></span>Figma</span>
        <span class="tool"><span class="ico" data-icon="stitch"></span>Stitch</span>
        <span class="tool"><span class="ico" data-icon="wordpress"></span>WordPress</span>
        <span class="tool"><span class="ico" data-icon="html"></span>HTML</span>
        <span class="tool"><span class="ico" data-icon="css"></span>CSS</span>
        <span class="tool"><span class="ico" data-icon="js"></span>JavaScript</span>
        <span class="tool"><span class="ico" data-icon="claude"></span>Claude</span>
        <span class="tool"><span class="ico" data-icon="chatgpt"></span>ChatGPT</span>
      </div>
      <p data-fr="J'utilise notamment Adobe Illustrator et Photoshop pour la création visuelle, ainsi que Figma pour le design d'interfaces modernes et collaboratives. Je travaille également avec InDesign et Premiere pour des supports variés." data-en="I use Adobe Illustrator and Photoshop for visual creation, as well as Figma for modern and collaborative interface design. I also work with InDesign and Premiere for various media.">J'utilise notamment Adobe Illustrator et Photoshop pour la création visuelle, ainsi que Figma pour le design d'interfaces modernes et collaboratives. Je travaille également avec InDesign et Premiere pour des supports variés.</p>
      <p data-fr="Côté intégration je développe avec HTML, CSS et JavaScript, et j'utilise WordPress pour la création de sites dynamiques." data-en="On the integration side, I develop with HTML, CSS and JavaScript, and use WordPress for creating dynamic websites.">Côté intégration je développe avec HTML, CSS et JavaScript, et j'utilise WordPress pour la création de sites dynamiques.</p>
      <p data-fr="Enfin, j'intègre des outils d'intelligence artificielle comme ChatGPT et Claude pour optimiser mes processus créatifs et techniques." data-en="Finally, I integrate artificial intelligence tools such as ChatGPT and Claude to optimise my creative and technical processes.">Enfin, j'intègre des outils d'intelligence artificielle comme ChatGPT et Claude pour optimiser mes processus créatifs et techniques.</p>
    </article>

    <!-- CONTACT -->
    <article data-topic="contact" data-q-fr="Comment puis-je te contacter ?" data-q-en="How can I contact you?">
      <p data-fr="Avec grand plaisir ! Je suis disponible sur toute la métropole lilloise. Le plus simple est de m'écrire :" data-en="With great pleasure! I'm available throughout the Lille metropolitan area. The easiest way is to write to me:">Avec grand plaisir ! Je suis disponible sur toute la métropole lilloise. Le plus simple est de m'écrire :</p>
      <ul class="info-list">
        <li><span class="ico" data-icon="mail"></span><a href="mailto:thomas.druesnepro@gmail.com">thomas.druesnepro@gmail.com</a></li>
        <li><span class="ico" data-icon="mappin"></span><span data-fr="Métropole lilloise" data-en="Lille metropolitan area">Métropole lilloise</span></li>
      </ul>
      <div class="answer-actions">
        <a href="contact.html" class="btn btn-accent"><span class="ico" data-icon="mail"></span><span data-fr="Ouvrir le formulaire de contact" data-en="Open the contact form">Ouvrir le formulaire de contact</span></a>
        <a href="https://www.linkedin.com/in/thomas-druesne-webdesign-developpeur/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="linkedin"></span><span>LinkedIn</span></a>
      </div>
    </article>

    <!-- CV -->
    <article data-topic="cv" data-q-fr="Je peux voir ton CV ?" data-q-en="Can I see your resume?">
      <p data-fr="Bien sûr, le voici, en version classique ou optimisée pour les logiciels de recrutement (ATS) :" data-en="Of course, here it is, in classic version or optimised for recruitment software (ATS):">Bien sûr, le voici, en version classique ou optimisée pour les logiciels de recrutement (ATS) :</p>
      <div class="answer-actions">
        <a href="img/CV_DRUESNE_Thomas.pdf" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="cv"></span><span data-fr="Mon CV" data-en="My resume">Mon CV</span></a>
        <a href="img/CV_DRUESNE_Thomas_ATS_Friendly.pdf" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="cv"></span><span data-fr="Mon CV ATS Friendly" data-en="My ATS Friendly resume">Mon CV ATS Friendly</span></a>
      </div>
    </article>

    <!-- À PROPOS -->
    <article data-topic="apropos" data-q-fr="Qui es-tu ?" data-q-en="Who are you?">
      <p data-fr="Je suis Thomas, Webdesigner UX &amp; Intégrateur WordPress, designer curieux et intégrateur rigoureux. Après une reconversion réussie dans le webdesign, j'ai exprimé ma créativité en start-up, en agence et en ESN." data-en="I'm Thomas, UX Webdesigner &amp; WordPress Integrator, a curious designer and rigorous integrator. After a successful career change into webdesign, I expressed my creativity in start-ups, agencies and IT service companies.">Je suis Thomas, Webdesigner UX &amp; Intégrateur WordPress, designer curieux et intégrateur rigoureux. Après une reconversion réussie dans le webdesign, j'ai exprimé ma créativité en start-up, en agence et en ESN.</p>
      <div class="answer-actions">
        <a href="a-propos.html" class="btn btn-accent"><span class="ico" data-icon="user"></span><span data-fr="En savoir plus sur moi" data-en="More about me">En savoir plus sur moi</span></a>
      </div>
    </article>

    <!-- SALUTATION -->
    <article data-topic="hello">
      <p data-fr="Bonjour ! Ravi de vous voir ici. Je peux vous parler de mes projets, de mes compétences, de mon parcours ou de mes outils. Par quoi voulez-vous commencer ?" data-en="Hello! Glad to see you here. I can tell you about my projects, my skills, my background or my tools. Where would you like to start?">Bonjour ! Ravi de vous voir ici. Je peux vous parler de mes projets, de mes compétences, de mon parcours ou de mes outils. Par quoi voulez-vous commencer ?</p>
    </article>

    <!-- MESSAGE D'ACCUEIL — page "Nouvelle conversation" (chat.html) -->
    <article data-topic="intro">
      <p data-fr="Bonjour ! Je suis la version chat de Thomas. Posez-moi vos questions sur mes projets, mes compétences, mon parcours, mon book graphique ou sur la façon de me contacter." data-en="Hello! I'm the chat version of Thomas. Ask me about my projects, my skills, my background, my graphic portfolio or how to contact me.">Bonjour ! Je suis la version chat de Thomas. Posez-moi vos questions sur mes projets, mes compétences, mon parcours, mon book graphique ou sur la façon de me contacter.</p>
      <p data-fr="Pour le reste… je ne promets rien." data-en="For anything else… no promises.">Pour le reste… je ne promets rien.</p>
    </article>

    <!-- HORS SUJET — une des blagues ci-dessous est tirée au hasard (class="joke") -->
    <article data-topic="fallback">
      <p class="joke" data-fr="Alors là, vous me posez une colle ! Mon cerveau est rempli de Figma, de CSS et de WordPress… il ne reste plus une seule place pour ça." data-en="Well, you've got me there! My brain is full of Figma, CSS and WordPress… there's no room left for that.">Alors là, vous me posez une colle ! Mon cerveau est rempli de Figma, de CSS et de WordPress… il ne reste plus une seule place pour ça.</p>
      <p class="joke" data-fr="Erreur 404 : réponse introuvable. J'ai pourtant cherché partout, même dans mes calques Photoshop masqués." data-en="Error 404: answer not found. And yet I looked everywhere, even in my hidden Photoshop layers.">Erreur 404 : réponse introuvable. J'ai pourtant cherché partout, même dans mes calques Photoshop masqués.</p>
      <p class="joke" data-fr="Je vais être honnête : je n'en ai aucune idée. Si c'était une question de marge ou de padding, j'aurais été imbattable." data-en="I'll be honest: I have no idea. If it were a question about margins or padding, I'd have been unbeatable.">Je vais être honnête : je n'en ai aucune idée. Si c'était une question de marge ou de padding, j'aurais été imbattable.</p>
      <p class="joke" data-fr="J'ai demandé à mes collègues ChatGPT et Claude. Ils m'ont gentiment conseillé de rester dans mon couloir : le webdesign." data-en="I asked my colleagues ChatGPT and Claude. They kindly advised me to stay in my lane: webdesign.">J'ai demandé à mes collègues ChatGPT et Claude. Ils m'ont gentiment conseillé de rester dans mon couloir : le webdesign.</p>
      <p class="joke" data-fr="Hmm… je viens de chercher la réponse dans ma palette de couleurs. Il n'y a que du noir et du bleu. Désolé." data-en="Hmm… I just looked for the answer in my colour palette. There's only black and blue. Sorry.">Hmm… je viens de chercher la réponse dans ma palette de couleurs. Il n'y a que du noir et du bleu. Désolé.</p>
      <p data-fr="Par contre, je suis incollable sur ces sujets-là :" data-en="On the other hand, I know everything about these topics:">Par contre, je suis incollable sur ces sujets-là :</p>
      <div class="answer-actions">
        <button type="button" class="chip" data-topic="projets"><span class="ico" data-icon="folder"></span><span data-fr="Mes projets" data-en="My projects">Mes projets</span></button>
        <button type="button" class="chip" data-topic="competences"><span class="ico" data-icon="pen"></span><span data-fr="Mes compétences" data-en="My skills">Mes compétences</span></button>
        <button type="button" class="chip" data-topic="parcours"><span class="ico" data-icon="route"></span><span data-fr="Mon parcours" data-en="My background">Mon parcours</span></button>
        <button type="button" class="chip" data-topic="book"><span class="ico" data-icon="book"></span><span data-fr="Mon book" data-en="My portfolio">Mon book</span></button>
        <button type="button" class="chip" data-topic="contact"><span class="ico" data-icon="mail"></span><span data-fr="Me contacter" data-en="Contact me">Me contacter</span></button>
      </div>
    </article>

  </div>


  <!-- =========================================================
       MODALES PROJETS
  ========================================================== -->

  <!-- MODALE — Inzerty -->
  <div class="modal-overlay" id="modal-inzerty" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-inzerty-title">
    <div class="modal">
      <button class="modal-close" type="button" aria-label="Fermer la modale"></button>
      <div class="modal-inner">
        <div class="modal-col-main">
          <h2 class="modal-title" id="modal-inzerty-title" data-fr="Refonte complète du site web d'Inzerty" data-en="Complete redesign of the Inzerty website">Refonte complète du site web d'Inzerty</h2>
          <p class="modal-desc" data-fr="Refonte de la présence digitale d'Inzerty pour clarifier son offre entre le service recrutement (Régie) et le centre de service (Studio). L'enjeu était de moderniser le design et structurer clairement les deux piliers de l'entreprise pour une meilleure compréhension des utilisateurs." data-en="Redesign of Inzerty's digital presence to clarify its offering between the recruitment service (Régie) and the service centre (Studio). The challenge was to modernise the design and clearly structure the two pillars of the company for better user understanding.">Refonte de la présence digitale d'Inzerty pour clarifier son offre entre le service recrutement (Régie) et le centre de service (Studio). L'enjeu était de moderniser le design et structurer clairement les deux piliers de l'entreprise pour une meilleure compréhension des utilisateurs.</p>
          <div class="modal-details-grid">
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
              <ul class="modal-list">
                <li data-fr="Maquettage" data-en="Mockup">Maquettage</li>
                <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
                <li data-fr="Intégration" data-en="Integration">Intégration</li>
                <li>Responsive</li>
                <li>UI/UX</li>
              </ul>
            </div>
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
              <div class="modal-tools-row">
                <span class="ico" data-icon="figma" title="Figma"></span>
                <span class="ico" data-icon="wordpress" title="WordPress"></span>
                <span class="ico" data-icon="stitch" title="Stitch"></span>
                <span class="ico" data-icon="js" title="JavaScript"></span>
                <span class="ico" data-icon="html" title="HTML5"></span>
                <span class="ico" data-icon="css" title="CSS3"></span>
                <span class="ico" data-icon="chatgpt" title="ChatGPT"></span>
              </div>
            </div>
          </div>
          <div class="modal-btns">
            <a href="https://www.figma.com/design/BOqRUurAwAMBnz0ixZ8Tz3/Site-Web-Inzerty---Inzerty---2026?node-id=1-4&amp;t=mxUGkuSDbsskrGGO-1" class="btn btn-accent" target="_blank" rel="noopener" data-fr="Voir la maquette" data-en="View the mockup">Voir la maquette</a>
            <a href="https://inzerty.com/" class="btn btn-ghost" target="_blank" rel="noopener" data-fr="Voir le site web" data-en="View the website">Voir le site web</a>
          </div>
        </div>
        <div class="modal-col-side">
          <div class="modal-img-wrapper"><img src="img/img-projet-inzerty.png" alt="Aperçu du site Inzerty" /></div>
        </div>
      </div>
    </div>
  </div>

  <!-- MODALE — Envie Nord -->
  <div class="modal-overlay" id="modal-envie" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-envie-title">
    <div class="modal">
      <button class="modal-close" type="button" aria-label="Fermer la modale"></button>
      <div class="modal-inner">
        <div class="modal-col-main">
          <h2 class="modal-title" id="modal-envie-title" data-fr="Refonte du tunnel de vente du site web d'Envie" data-en="Redesign of the Envie website sales funnel">Refonte du tunnel de vente du site web d'Envie</h2>
          <p class="modal-desc" data-fr="La refonte du site web d'Envie, réseau associatif dédié au réemploi et à la réparation d'électroménager tout en favorisant l'insertion professionnelle, répond à un besoin de modernisation et d'alignement avec les standards digitaux actuels. L'ancienne version ne reflétait plus pleinement l'image engagée et professionnelle du projet, tant sur le plan visuel que sur l'expérience utilisateur. Dans ce contexte, j'ai mené une refonte UX centrée sur l'optimisation du parcours utilisateur, notamment du tunnel de vente, afin de fluidifier la navigation et d'améliorer la conversion. Le design et la structure existants ne permettaient pas de valoriser pleinement les expertises, l'impact social et les services proposés par Envie." data-en="The redesign of the Envie website, an associative network dedicated to the reuse and repair of household appliances while promoting professional integration, meets a need for modernisation and alignment with current digital standards. The old version no longer fully reflected the committed and professional image of the project, both visually and in terms of user experience. In this context, I led a UX redesign centred on optimising the user journey, particularly the sales funnel, in order to streamline navigation and improve conversion. The existing design and structure did not fully showcase the expertise, social impact and services offered by Envie.">La refonte du site web d'Envie, réseau associatif dédié au réemploi et à la réparation d'électroménager tout en favorisant l'insertion professionnelle, répond à un besoin de modernisation et d'alignement avec les standards digitaux actuels. L'ancienne version ne reflétait plus pleinement l'image engagée et professionnelle du projet, tant sur le plan visuel que sur l'expérience utilisateur. Dans ce contexte, j'ai mené une refonte UX centrée sur l'optimisation du parcours utilisateur, notamment du tunnel de vente, afin de fluidifier la navigation et d'améliorer la conversion. Le design et la structure existants ne permettaient pas de valoriser pleinement les expertises, l'impact social et les services proposés par Envie.</p>
          <div class="modal-details-grid">
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
              <ul class="modal-list">
                <li data-fr="Maquettage" data-en="Mockup">Maquettage</li>
                <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
                <li>UI/UX</li>
              </ul>
            </div>
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
              <div class="modal-tools-row">
                <span class="ico" data-icon="figma" title="Figma"></span>
                <span class="ico" data-icon="chatgpt" title="ChatGPT"></span>
              </div>
            </div>
          </div>
          <div class="modal-btns">
            <a href="https://www.figma.com/design/3grlsWN1xAbJuugxTjShvC/Envie---Inzerty---2025?node-id=1-2969&amp;t=utBQAk3Pu9eYQleq-1" class="btn btn-accent" target="_blank" rel="noopener" data-fr="Voir la maquette" data-en="View the mockup">Voir la maquette</a>
          </div>
        </div>
        <div class="modal-col-side">
          <div class="modal-img-wrapper"><img src="img/img-projet-envie.png" alt="Aperçu du site Envie Nord" /></div>
        </div>
      </div>
    </div>
  </div>

  <!-- MODALE — E2C Grand-Lille -->
  <div class="modal-overlay" id="modal-e2c" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-e2c-title">
    <div class="modal">
      <button class="modal-close" type="button" aria-label="Fermer la modale"></button>
      <div class="modal-inner">
        <div class="modal-col-main">
          <h2 class="modal-title" id="modal-e2c-title" data-fr="Refonte complète du site web de l'E2C Grand-Lille" data-en="Complete redesign of the E2C Grand-Lille website">Refonte complète du site web de l'E2C Grand-Lille</h2>
          <p class="modal-desc" data-fr="Modernisation et meilleure valorisation des missions de l'E2C. L'ancienne version manquait de clarté sur l'accompagnement des jeunes et la diversité des parcours. La refonte structure les contenus pour refléter les actions de l'école et renforcer son attractivité." data-en="Modernisation and better promotion of the E2C's missions. The old version lacked clarity on support for young people and the diversity of pathways. The redesign structures the content to reflect the school's actions and strengthen its attractiveness.">Modernisation et meilleure valorisation des missions de l'E2C. L'ancienne version manquait de clarté sur l'accompagnement des jeunes et la diversité des parcours. La refonte structure les contenus pour refléter les actions de l'école et renforcer son attractivité.</p>
          <div class="modal-details-grid">
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
              <ul class="modal-list">
                <li data-fr="Intégration" data-en="Integration">Intégration</li>
                <li>Responsive</li>
                <li data-fr="Retouche d'image" data-en="Image editing">Retouche d'image</li>
              </ul>
            </div>
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
              <div class="modal-tools-row">
                <span class="ico" data-icon="wordpress" title="WordPress"></span>
                <span class="ico" data-icon="html" title="HTML5"></span>
                <span class="ico" data-icon="css" title="CSS3"></span>
                <span class="ico" data-icon="js" title="JavaScript"></span>
                <span class="ico" data-icon="chatgpt" title="ChatGPT"></span>
              </div>
            </div>
          </div>
          <div class="modal-btns">
            <a href="https://www.figma.com/design/yTkIbEnbkU8diclHIQ7Rxg/E2C---Inzerty---2025?node-id=1-2&amp;t=zUaQqvaAB9L7t0k9-1" class="btn btn-accent" target="_blank" rel="noopener" data-fr="Voir la maquette" data-en="View the mockup">Voir la maquette</a>
            <a href="https://e2c-grandlille.fr/" class="btn btn-ghost" target="_blank" rel="noopener" data-fr="Voir le site web" data-en="View the website">Voir le site web</a>
          </div>
        </div>
        <div class="modal-col-side">
          <div class="modal-img-wrapper modal-img-wrapper--beige"><img src="img/img_modale_e2C.png" alt="Aperçu du site E2C Grand-Lille" /></div>
        </div>
      </div>
    </div>
  </div>

  <!-- MODALE — Dinamic -->
  <div class="modal-overlay" id="modal-dinamic" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="modal-dinamic-title">
    <div class="modal">
      <button class="modal-close" type="button" aria-label="Fermer la modale"></button>
      <div class="modal-inner">
        <div class="modal-col-main">
          <h2 class="modal-title" id="modal-dinamic-title" data-fr="Refonte du site web de Dinamic" data-en="Redesign of the Dinamic website">Refonte du site web de Dinamic</h2>
          <p class="modal-desc" data-fr="Refonte du site Dinamic pour moderniser la présentation de ses services. L'objectif était de structurer les offres, valoriser le savoir-faire de l'entreprise et offrir une interface plus claire et responsive facilitant la compréhension des services." data-en="Redesign of the Dinamic website to modernise the presentation of its services. The objective was to structure the offers, highlight the company's expertise and offer a clearer and more responsive interface facilitating the understanding of services.">Refonte du site Dinamic pour moderniser la présentation de ses services. L'objectif était de structurer les offres, valoriser le savoir-faire de l'entreprise et offrir une interface plus claire et responsive facilitant la compréhension des services.</p>
          <div class="modal-details-grid">
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
              <ul class="modal-list">
                <li data-fr="Maquettage" data-en="Mockup">Maquettage</li>
                <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
                <li data-fr="Intégration" data-en="Integration">Intégration</li>
                <li>Responsive</li>
                <li>UI/UX</li>
              </ul>
            </div>
            <div class="modal-detail-block">
              <h3 class="modal-detail-title"><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
              <div class="modal-tools-row">
                <span class="ico" data-icon="figma" title="Figma"></span>
                <span class="ico" data-icon="wordpress" title="WordPress"></span>
                <span class="ico" data-icon="html" title="HTML5"></span>
                <span class="ico" data-icon="css" title="CSS3"></span>
                <span class="ico" data-icon="chatgpt" title="ChatGPT"></span>
              </div>
            </div>
          </div>
          <div class="modal-btns">
            <a href="https://www.figma.com/design/5CVgi5uChSBvwV6PsREVFN/Dinamic---Inzerty---2025?node-id=0-1&amp;t=stdYP5JJlu2JZKkR-1" class="btn btn-accent" target="_blank" rel="noopener" data-fr="Voir la maquette" data-en="View the mockup">Voir la maquette</a>
            <a href="https://dinamic-services.com/" class="btn btn-ghost" target="_blank" rel="noopener" data-fr="Voir le site web" data-en="View the website">Voir le site web</a>
          </div>
        </div>
        <div class="modal-col-side">
          <div class="modal-img-wrapper"><img src="img/img_modale_dinamic.png" alt="Aperçu du site Dinamic" /></div>
        </div>
      </div>
    </div>
  </div>
`;

  document.body.insertAdjacentHTML('beforeend', HTML);
}());
