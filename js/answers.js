// ============================================================
// ANSWERS.JS — Réponses du chat (dont le détail de chaque projet)
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
        <button type="button" class="project-card" data-topic="projet-inzerty">
          <span class="project-logo"><img src="img/logo_inzerty_white.png" alt="Logo Inzerty" /></span>
          <span class="project-meta"><strong>Inzerty</strong><small data-fr="Wireframes/maquettage/intégration" data-en="Wireframes/mockup/integration">Wireframes/maquettage/intégration</small></span>
        </button>
        <button type="button" class="project-card" data-topic="projet-e2c">
          <span class="project-logo"><img src="img/logo_e2c_projet_blanc.png" alt="Logo E2C Grand-Lille" /></span>
          <span class="project-meta"><strong data-fr="École de la seconde chance" data-en="School of the second chance">École de la seconde chance</strong><small data-fr="Intégration WordPress" data-en="WordPress Integration">Intégration WordPress</small></span>
        </button>
        <button type="button" class="project-card" data-topic="projet-envie">
          <span class="project-logo"><img src="img/logo_envie_nord_white.png" alt="Logo Envie Nord" /></span>
          <span class="project-meta"><strong>Envie Nord</strong><small data-fr="Prototypage/UX Design" data-en="Prototyping/UX Design">Prototypage/UX Design</small></span>
        </button>
        <button type="button" class="project-card" data-topic="projet-amap">
          <span class="project-logo"><img src="img/logo_amap_moreuil_blanc.png" alt="Logo AMAP de Moreuil" /></span>
          <span class="project-meta"><strong data-fr="Site web de l'AMAP de Moreuil" data-en="AMAP de Moreuil website">Site web de l'AMAP de Moreuil</strong><small data-fr="Maquettage/Intégration" data-en="Mockup/Integration">Maquettage/Intégration</small></span>
        </button>
        <button type="button" class="project-card" data-topic="projet-lien">
          <span class="project-logo"><img src="img/logo_le_lien_service_blanc.png" alt="Logo Le Lien Services" /></span>
          <span class="project-meta"><strong data-fr="Refonte du site Le Lien Services" data-en="Le Lien Services website redesign">Refonte du site Le Lien Services</strong><small data-fr="Wireframes/Intégration" data-en="Wireframes/Integration">Wireframes/Intégration</small></span>
        </button>
      </div>
      <p data-fr="Envie d'en voir davantage ? Mon book graphique regroupe aussi mes créations print et identités visuelles." data-en="Want to see more? My graphic portfolio also gathers my print work and visual identities.">Envie d'en voir davantage ? Mon book graphique regroupe aussi mes créations print et identités visuelles.</p>
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
        <div class="skill-card">
          <span class="ico skill-ico" data-icon="sparkle"></span>
          <h3 data-fr="IA &amp; automatisation" data-en="AI &amp; automation">IA &amp; automatisation</h3>
          <p data-fr="Claude et ChatGPT au quotidien : création de skills, d'agents et automatisation des tâches" data-en="Claude and ChatGPT every day: building skills, agents and task automation">Claude et ChatGPT au quotidien : création de skills, d'agents et automatisation des tâches</p>
        </div>
      </div>
    </article>

    <!-- MON PARCOURS -->
    <article data-topic="parcours" data-q-fr="Raconte-moi ton parcours professionnel" data-q-en="Tell me about your professional background">
      <p data-fr="Cinq expériences ont forgé mon regard sur le design :" data-en="Five experiences shaped my vision of design:">Cinq expériences ont forgé mon regard sur le design :</p>
      <ol class="timeline">
        <li>
          <span class="timeline-date">2025/2026</span>
          <h3 data-fr="Webdesigner UX/Intégrateur" data-en="UX Webdesigner/Integrator">Webdesigner UX/Intégrateur</h3>
          <p data-fr="Premier contrat signé chez (inzerty), afin de réaliser des projets web vitrine &amp; e-commerce de A à Z." data-en="First contract signed at (inzerty), to carry out showcase &amp; e-commerce web projects from A to Z.">Premier contrat signé chez (inzerty), afin de réaliser des projets web vitrine &amp; e-commerce de A à Z.</p>
        </li>
        <li>
          <span class="timeline-date">2024</span>
          <h3 data-fr="Graphiste/Webdesigner" data-en="Graphic designer/Webdesigner">Graphiste/Webdesigner</h3>
          <p data-fr="Stage chez « About Ressources » : création du branding complet + le site web pour une juriste freelance." data-en="Internship at « About Ressources »: complete branding + website for a freelance jurist.">Stage chez « About Ressources » : création du branding complet + le site web pour une juriste freelance.</p>
        </li>
        <li>
          <span class="timeline-date">2022/2023</span>
          <h3 data-fr="Webdesigner UX/Intégrateur" data-en="UX Webdesigner/Integrator">Webdesigner UX/Intégrateur</h3>
          <p data-fr="Alternance réalisée chez « Jooxter » pour la maintenance/refonte de leur site web &amp; du montage vidéo." data-en="Work-study at « Jooxter » for website maintenance/redesign &amp; video editing.">Alternance réalisée chez « Jooxter » pour la maintenance/refonte de leur site web &amp; du montage vidéo.</p>
        </li>
        <li>
          <span class="timeline-date">2022</span>
          <h3>UI/UX Designer</h3>
          <p data-fr="Intégration de l'incubateur numérique « d'Eurotechnologie » sur Figma en projets réels." data-en="Integration of the digital incubator « Eurotechnologie » on Figma in real projects.">Intégration de l'incubateur numérique « d'Eurotechnologie » sur Figma en projets réels.</p>
        </li>
        <li>
          <span class="timeline-date">2021/2022</span>
          <h3 data-fr="Webdesigner/Intégrateur" data-en="Webdesigner/Integrator">Webdesigner/Intégrateur</h3>
          <p data-fr="Stage en agence de communication chez « Kamélécom » pour de l'intégration principalement en WordPress." data-en="Internship at communication agency « Kamélécom » for integration mainly in WordPress.">Stage en agence de communication chez « Kamélécom » pour de l'intégration principalement en WordPress.</p>
        </li>
      </ol>
      <p data-fr="Et côté formation :" data-en="And on the training side:">Et côté formation :</p>
      <ol class="timeline">
        <li>
          <span class="timeline-date">2024</span>
          <p data-fr="Formation complémentaire en développement Low-code No Code effectuée chez M2I à Villeneuve-d'Ascq." data-en="Additional training in Low-code No Code development at M2I in Villeneuve-d'Ascq.">Formation complémentaire en développement Low-code No Code effectuée chez M2I à Villeneuve-d'Ascq.</p>
        </li>
        <li>
          <span class="timeline-date">2022/2023</span>
          <p data-fr="Validation de mon diplôme d'alternance concepteur d'interface chez M2i Formation à Villeneuve-d'Ascq." data-en="Validation of my work-study diploma in interface design at M2i Formation in Villeneuve-d'Ascq.">Validation de mon diplôme d'alternance concepteur d'interface chez M2i Formation à Villeneuve-d'Ascq.</p>
        </li>
        <li>
          <span class="timeline-date">2021</span>
          <p data-fr="Formation intensive en Webdesign UX chez POPSchool Valenciennes." data-en="Intensive training in UX Webdesign at POPSchool Valenciennes.">Formation intensive en Webdesign UX chez POPSchool Valenciennes.</p>
        </li>
        <li>
          <span class="timeline-date">2018</span>
          <p data-fr="Obtention de mon Master en Culture, événementiel &amp; Numérique à l'UPJV d'Amiens." data-en="Master's degree in Culture, Events &amp; Digital at the UPJV in Amiens.">Obtention de mon Master en Culture, événementiel &amp; Numérique à l'UPJV d'Amiens.</p>
        </li>
      </ol>
    </article>

    <!-- MES OUTILS -->
    <article data-topic="outils" data-q-fr="Avec quels outils travailles-tu ?" data-q-en="Which tools do you work with?">
      <p data-fr="Je maîtrise un ensemble complet d'outils essentiels au webdesign, allant de la création graphique au développement web." data-en="I master a complete set of tools essential to webdesign, from graphic creation to web development.">Je maîtrise un ensemble complet d'outils essentiels au webdesign, allant de la création graphique au développement web.</p>
      <div class="tool-grid">
        <div class="tool-card"><img src="img/picto_adobe_illustrator_homepage.png" alt="" /><span>Illustrator</span></div>
        <div class="tool-card"><img src="img/picto_indesign_homepage.png" alt="" /><span>InDesign</span></div>
        <div class="tool-card"><img src="img/picto_premiere_homepage.png" alt="" /><span>Premiere</span></div>
        <div class="tool-card"><img src="img/picto_google_stitch_homepage.png" alt="" /><span>Google Stitch</span></div>
        <div class="tool-card"><img src="img/picto_figma_outils_homepage.png" alt="" /><span>Figma</span></div>
        <div class="tool-card"><img src="img/picto_adobe_photoshop_homepage.png" alt="" /><span>Photoshop</span></div>
        <div class="tool-card"><img src="img/picto_wordpress.png" alt="" /><span>WordPress</span></div>
        <div class="tool-card"><img src="img/picto_html.png" alt="" /><span>HTML</span></div>
        <div class="tool-card"><img src="img/picto_css.png" alt="" /><span>CSS</span></div>
        <div class="tool-card"><img src="img/picto_js.png" alt="" /><span>JavaScript</span></div>
        <div class="tool-card"><img src="img/picto_claude.png" alt="" /><span>Claude</span></div>
        <div class="tool-card"><img src="img/picto_chatgpt.png" alt="" /><span>ChatGPT</span></div>
      </div>
      <p data-fr="J'utilise notamment Adobe Illustrator et Photoshop pour la création visuelle, ainsi que Figma pour le design d'interfaces modernes et collaboratives. Je travaille également avec InDesign et Premiere pour des supports variés." data-en="I use Adobe Illustrator and Photoshop for visual creation, as well as Figma for modern and collaborative interface design. I also work with InDesign and Premiere for various media.">J'utilise notamment Adobe Illustrator et Photoshop pour la création visuelle, ainsi que Figma pour le design d'interfaces modernes et collaboratives. Je travaille également avec InDesign et Premiere pour des supports variés.</p>
      <p data-fr="Côté intégration je développe avec HTML, CSS et JavaScript, et j'utilise WordPress pour la création de sites dynamiques." data-en="On the integration side, I develop with HTML, CSS and JavaScript, and use WordPress for creating dynamic websites.">Côté intégration je développe avec HTML, CSS et JavaScript, et j'utilise WordPress pour la création de sites dynamiques.</p>
      <p data-fr="Enfin, j'intègre des outils d'intelligence artificielle comme ChatGPT et Claude pour optimiser mes processus créatifs et techniques." data-en="Finally, I integrate artificial intelligence tools such as ChatGPT and Claude to optimise my creative and technical processes.">Enfin, j'intègre des outils d'intelligence artificielle comme ChatGPT et Claude pour optimiser mes processus créatifs et techniques.</p>
    </article>

    <!-- CONTACT -->
    <article data-topic="contact" data-q-fr="Comment puis-je te contacter ?" data-q-en="How can I contact you?">
      <p data-fr="Avec grand plaisir ! Je suis actuellement disponible pour de nouvelles opportunités et collaborations créatives. Un avis, un recrutement ? Laissez-moi un petit message ci-dessous, réponse garantie sous 24h, promis !" data-en="With great pleasure! I'm currently available for new opportunities and creative collaborations. Feedback, a recruitment offer? Leave me a little message below, answer guaranteed within 24h, I promise!">Avec grand plaisir ! Je suis actuellement disponible pour de nouvelles opportunités et collaborations créatives. Un avis, un recrutement ? Laissez-moi un petit message ci-dessous, réponse garantie sous 24h, promis !</p>
      <ul class="info-list">
        <li><span class="ico" data-icon="mail"></span><a href="mailto:thomas.druesnepro@gmail.com">thomas.druesnepro@gmail.com</a></li>
        <li><span class="ico" data-icon="clock"></span><span data-fr="Du lundi au vendredi - 9h / 19h" data-en="Monday to Friday - 9am / 7pm">Du lundi au vendredi - 9h / 19h</span></li>
        <li><span class="ico" data-icon="mappin"></span><span data-fr="Disponible sur toute la métropole lilloise" data-en="Available throughout the Lille metropolitan area">Disponible sur toute la métropole lilloise</span></li>
      </ul>
      <form class="contact-form" novalidate>
        <div class="contact-row">
          <label><span data-fr="Nom" data-en="Name">Nom</span><input type="text" name="name" required autocomplete="name" /></label>
          <label><span data-fr="E-mail" data-en="E-mail">E-mail</span><input type="email" name="email" required autocomplete="email" /></label>
        </div>
        <label><span data-fr="Objet" data-en="Subject">Objet</span><input type="text" name="subject" required /></label>
        <label><span data-fr="Message" data-en="Message">Message</span><textarea name="message" rows="4" required></textarea></label>
        <input type="text" name="website" class="contact-trap" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div class="contact-foot">
          <button type="submit" class="btn btn-accent"><span class="ico" data-icon="send"></span><span data-fr="Envoyer" data-en="Send">Envoyer</span></button>
          <a href="https://www.linkedin.com/in/thomas-druesne-webdesign-developpeur/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="linkedin"></span><span>LinkedIn</span></a>
        </div>
        <p class="contact-status" role="status" aria-live="polite"></p>
      </form>
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
      <p><strong data-fr="Un p'tit mot sur moi : designer curieux &amp; intégrateur rigoureux." data-en="A few words about me: curious designer &amp; rigorous integrator.">Un p'tit mot sur moi : designer curieux &amp; intégrateur rigoureux.</strong></p>
      <figure class="answer-portrait"><img src="img/photo_profil_a_propos.png" alt="Thomas Druesne" /></figure>
      <p data-fr="Après une reconversion réussie dans le webdesign et l'intégration post-pandémie et ayant un attrait pour la création web et digitale, j'ai pu exprimer, au cours de ces dernières années, ma créativité et mon savoir-faire au travers de différentes expériences en start-up, en agence et en ESN." data-en="After a successful career change into webdesign and integration post-pandemic, and with a fondness for web and digital creation, I was able to express my creativity and expertise through various experiences in start-ups, agencies and IT service companies.">Après une reconversion réussie dans le webdesign et l'intégration post-pandémie et ayant un attrait pour la création web et digitale, j'ai pu exprimer, au cours de ces dernières années, ma créativité et mon savoir-faire au travers de différentes expériences en start-up, en agence et en ESN.</p>
      <p data-fr="Mes compétences étant aujourd'hui éprouvées et étant totalement épanoui dans ce que je fais, mon objectif actuel est de faire un 360° sur la création web, afin de pouvoir proposer la création d'un site web depuis sa conception graphique en passant par son intégration, ainsi que tout son branding visuel, pour des projets réalisés de A à Z." data-en="My skills being now well-established and fully fulfilled in what I do, my current objective is to achieve a 360° in web creation, in order to offer website creation from graphic design through integration, along with all its visual branding, for projects carried out from A to Z.">Mes compétences étant aujourd'hui éprouvées et étant totalement épanoui dans ce que je fais, mon objectif actuel est de faire un 360° sur la création web, afin de pouvoir proposer la création d'un site web depuis sa conception graphique en passant par son intégration, ainsi que tout son branding visuel, pour des projets réalisés de A à Z.</p>
      <p data-fr="Et tout ceci ne serait pas possible sans mes meilleurs amis : la suite Adobe, Figma ainsi que WordPress !" data-en="And all of this would not be possible without my best friends: the Adobe suite, Figma and WordPress!">Et tout ceci ne serait pas possible sans mes meilleurs amis : la suite Adobe, Figma ainsi que WordPress !</p>
      <p data-fr="Et quand je ne suis pas derrière Figma :" data-en="And when I'm not behind Figma:">Et quand je ne suis pas derrière Figma :</p>
      <div class="hobby-grid">
        <div class="hobby-card">
          <img src="img/img_hobby_mtg_a_propos.png" alt="Magic the Gathering" />
          <div class="hobby-body">
            <h3><span class="ico" data-icon="cards"></span>Magic the Gathering</h3>
            <p data-fr="Jeu de cartes réputé pour sa complexité, son sens stratégique et sa tonne de statistiques et de contenu en ligne. Son aspect social m'a permis de rencontrer des gens merveilleux." data-en="Card game renowned for its complexity, strategic thinking and wealth of statistics and online content. Its social aspect allowed me to meet wonderful people.">Jeu de cartes réputé pour sa complexité, son sens stratégique et sa tonne de statistiques et de contenu en ligne. Son aspect social m'a permis de rencontrer des gens merveilleux.</p>
          </div>
        </div>
        <div class="hobby-card">
          <img src="img/img_hobby_jv_a_propos.png" alt="Jeux vidéo" />
          <div class="hobby-body">
            <h3><span class="ico" data-icon="gamepad"></span><span data-fr="Jeux vidéo" data-en="Video games">Jeux vidéo</span></h3>
            <p data-fr="Collection et pratique de jeu vidéo depuis de nombreuses années (pour étancher ma soif de découverte et d'exploration !), c'est une passion qui ne m'a jamais quitté depuis tout petit." data-en="Collecting and playing video games for many years (to quench my thirst for discovery and exploration!), a passion that has never left me since childhood.">Collection et pratique de jeu vidéo depuis de nombreuses années (pour étancher ma soif de découverte et d'exploration !), c'est une passion qui ne m'a jamais quitté depuis tout petit.</p>
          </div>
        </div>
        <div class="hobby-card">
          <img src="img/img_hobby_riftbound.jpg" alt="Riftbound, le jeu de cartes League of Legends" />
          <div class="hobby-body">
            <h3><span class="ico" data-icon="cards"></span>Riftbound</h3>
            <p data-fr="Depuis quelque temps, je joue au nouveau TCG Riftbound, le jeu de cartes à collectionner de l'univers League of Legends. Il me permet de voir les jeux de stratégie et les jeux de cartes sous un nouvel angle." data-en="For a while now, I've been playing the new TCG Riftbound, the trading card game set in the League of Legends universe. It lets me see strategy games and card games from a new angle.">Depuis quelque temps, je joue au nouveau TCG Riftbound, le jeu de cartes à collectionner de l'univers League of Legends. Il me permet de voir les jeux de stratégie et les jeux de cartes sous un nouvel angle.</p>
          </div>
        </div>
      </div>
      <div class="answer-actions">
        <a href="img/CV_DRUESNE_Thomas.pdf" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="cv"></span><span data-fr="Mon CV" data-en="My resume">Mon CV</span></a>
        <a href="img/CV_DRUESNE_Thomas_ATS_Friendly.pdf" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="cv"></span><span data-fr="Mon CV ATS Friendly" data-en="My ATS Friendly resume">Mon CV ATS Friendly</span></a>
        <a href="https://www.linkedin.com/in/thomas-druesne-webdesign-developpeur/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="linkedin"></span><span>LinkedIn</span></a>
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
      <p class="joke" data-fr="Je viens de passer votre question au validateur W3C. Verdict : zéro erreur, mais cent pour cent hors de mes compétences." data-en="I just ran your question through the W3C validator. Verdict: zero errors, but one hundred percent outside my skills.">Je viens de passer votre question au validateur W3C. Verdict : zéro erreur, mais cent pour cent hors de mes compétences.</p>
      <p class="joke" data-fr="J'ai tenté un Ctrl + Z sur votre question pour la transformer en question de webdesign. Visiblement, l'historique ne remonte pas aussi loin." data-en="I tried a Ctrl + Z on your question to turn it into a webdesign question. Apparently the history doesn't go back that far.">J'ai tenté un Ctrl + Z sur votre question pour la transformer en question de webdesign. Visiblement, l'historique ne remonte pas aussi loin.</p>
      <p class="joke" data-fr="Ma réponse est encore à l'état de wireframe : trois rectangles gris et un gros « Lorem ipsum ». Pas très utile, j'en conviens." data-en="My answer is still at the wireframe stage: three grey rectangles and a big “Lorem ipsum”. Not very helpful, I admit.">Ma réponse est encore à l'état de wireframe : trois rectangles gris et un gros « Lorem ipsum ». Pas très utile, j'en conviens.</p>
      <p class="joke" data-fr="Même avec un z-index de 9999, cette question passe largement au-dessus de mes connaissances." data-en="Even with a z-index of 9999, this question sits way above my knowledge.">Même avec un z-index de 9999, cette question passe largement au-dessus de mes connaissances.</p>
      <p class="joke" data-fr="J'ai pioché une carte pour trouver la réponse. Résultat : un terrain. Ah, les joies des jeux de cartes…" data-en="I drew a card to find the answer. Result: a land. Ah, the joys of card games…">J'ai pioché une carte pour trouver la réponse. Résultat : un terrain. Ah, les joies des jeux de cartes…</p>
      <p class="joke" data-fr="Excellente question ! Je l'ajoute à mon backlog, juste entre « refaire mon logo pour la 12e fois » et « ranger mes calques »." data-en="Excellent question! I'm adding it to my backlog, right between “redo my logo for the 12th time” and “tidy up my layers”.">Excellente question ! Je l'ajoute à mon backlog, juste entre « refaire mon logo pour la 12e fois » et « ranger mes calques ».</p>
      <p class="joke" data-fr="Je n'ai pas la réponse… mais admirez au moins la belle typographie avec laquelle je vous dis que je n'ai pas la réponse." data-en="I don't have the answer… but at least admire the lovely typography I'm using to tell you I don't have the answer.">Je n'ai pas la réponse… mais admirez au moins la belle typographie avec laquelle je vous dis que je n'ai pas la réponse.</p>
      <p class="joke" data-fr="Mon site s'adapte à toutes les tailles d'écran, mais visiblement pas à toutes les questions. Le responsive a ses limites." data-en="My site adapts to every screen size, but apparently not to every question. Responsive design has its limits.">Mon site s'adapte à toutes les tailles d'écran, mais visiblement pas à toutes les questions. Le responsive a ses limites.</p>
      <p class="joke" data-fr="J'ai lancé le chargement de la réponse… elle tourne encore. Je crois qu'elle a été codée sans optimiser ses images." data-en="I started loading the answer… it's still spinning. I think it was built without optimising its images.">J'ai lancé le chargement de la réponse… elle tourne encore. Je crois qu'elle a été codée sans optimiser ses images.</p>
      <p data-fr="Par contre, je suis incollable sur ces sujets-là :" data-en="On the other hand, I know everything about these topics:">Par contre, je suis incollable sur ces sujets-là :</p>
      <div class="answer-actions">
        <button type="button" class="chip" data-topic="projets"><span class="ico" data-icon="folder"></span><span data-fr="Mes projets" data-en="My projects">Mes projets</span></button>
        <button type="button" class="chip" data-topic="competences"><span class="ico" data-icon="pen"></span><span data-fr="Mes compétences" data-en="My skills">Mes compétences</span></button>
        <button type="button" class="chip" data-topic="parcours"><span class="ico" data-icon="route"></span><span data-fr="Mon parcours" data-en="My background">Mon parcours</span></button>
        <button type="button" class="chip" data-topic="book"><span class="ico" data-icon="book"></span><span data-fr="Mon book" data-en="My portfolio">Mon book</span></button>
        <button type="button" class="chip" data-topic="contact"><span class="ico" data-icon="mail"></span><span data-fr="Me contacter" data-en="Contact me">Me contacter</span></button>
      </div>
    </article>

    <!-- PROJET — Inzerty -->
    <article data-topic="projet-inzerty" data-q-fr="Parle-moi du projet Inzerty" data-q-en="Tell me about the Inzerty project">
      <h2 class="project-title" data-fr="Refonte complète du site web d'Inzerty" data-en="Complete redesign of the Inzerty website">Refonte complète du site web d'Inzerty</h2>
      <figure class="project-shot project-shot--cover"><img src="img/img-projet-inzerty.png" alt="Aperçu du projet Inzerty" /></figure>
      <p class="project-desc" data-fr-html="La <strong>refonte du site web</strong> d'Inzerty répond à un besoin de <strong>modernisation</strong> mais aussi de <strong>clarification de son offre</strong>. L'ancienne version ne reflétait plus fidèlement le <strong>positionnement</strong> de l'entreprise, notamment par l'absence de mise en avant du <strong>centre de service</strong>, qui n'était pas réellement implémenté ni identifiable sur le site." data-en-html="The <strong>redesign of the Inzerty website</strong> meets a need for <strong>modernisation</strong> but also for <strong>clarification of its offering</strong>. The old version no longer faithfully reflected the company's <strong>positioning</strong>, notably through the absence of any highlight of the <strong>service centre</strong>, which was not really implemented or identifiable on the site.">La <strong>refonte du site web</strong> d'Inzerty répond à un besoin de <strong>modernisation</strong> mais aussi de <strong>clarification de son offre</strong>. L'ancienne version ne reflétait plus fidèlement le <strong>positionnement</strong> de l'entreprise, notamment par l'absence de mise en avant du <strong>centre de service</strong>, qui n'était pas réellement implémenté ni identifiable sur le site.</p>
      <p class="project-desc" data-fr-html="Au-delà d'un <strong>design</strong> à actualiser et d'une <strong>expérience utilisateur</strong> à améliorer, l'enjeu principal était de <strong>structurer clairement les deux piliers</strong> d'Inzerty : le <strong>service recrutement (la Régie)</strong> et le <strong>centre de service (le Studio)</strong>. Cette refonte vise donc à proposer une <strong>interface plus lisible, moderne et responsive</strong>, tout en distinguant nettement ces deux offres pour mieux valoriser leurs spécificités et faciliter la compréhension des utilisateurs." data-en-html="Beyond a <strong>design</strong> to update and a <strong>user experience</strong> to improve, the main challenge was to <strong>clearly structure the two pillars</strong> of Inzerty: the <strong>recruitment service (la Régie)</strong> and the <strong>service centre (le Studio)</strong>. This redesign therefore aims to offer a <strong>more readable, modern and responsive interface</strong>, while clearly distinguishing these two offerings to better showcase their specificities and facilitate user understanding.">Au-delà d'un <strong>design</strong> à actualiser et d'une <strong>expérience utilisateur</strong> à améliorer, l'enjeu principal était de <strong>structurer clairement les deux piliers</strong> d'Inzerty : le <strong>service recrutement (la Régie)</strong> et le <strong>centre de service (le Studio)</strong>. Cette refonte vise donc à proposer une <strong>interface plus lisible, moderne et responsive</strong>, tout en distinguant nettement ces deux offres pour mieux valoriser leurs spécificités et faciliter la compréhension des utilisateurs.</p>
      <p class="project-desc project-highlight" data-fr-html="J'ai également <strong>développé un simulateur d'éligibilité IAE</strong> (<strong>Insertion par l'Activité Économique</strong>), qui permet aux candidats de vérifier rapidement s'ils peuvent bénéficier d'un <strong>parcours d'insertion</strong>." data-en-html="I also <strong>coded an IAE eligibility simulator</strong> (<strong>Integration through Economic Activity</strong>), which lets candidates quickly check whether they can benefit from an <strong>integration pathway</strong>.">J'ai également <strong>développé un simulateur d'éligibilité IAE</strong> (<strong>Insertion par l'Activité Économique</strong>), qui permet aux candidats de vérifier rapidement s'ils peuvent bénéficier d'un <strong>parcours d'insertion</strong>.</p>
      <div class="project-details">
        <div>
          <h3><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
          <ul class="detail-list">
            <li data-fr="Maquettage" data-en="Mockup">Maquettage</li>
            <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
            <li data-fr="Intégration" data-en="Integration">Intégration</li>
            <li>Responsive</li>
            <li>UI/UX</li>
            <li data-fr="Simulateur d'éligibilité IAE" data-en="IAE eligibility simulator">Simulateur d'éligibilité IAE</li>
            <li data-fr="Référencement (SEO, GEO)" data-en="Search optimisation (SEO, GEO)">Référencement (SEO, GEO)</li>
          </ul>
        </div>
        <div>
          <h3><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
          <ul class="detail-list detail-list--tools">
            <li><img src="img/picto_figma_outils_homepage.png" alt="" />Figma</li>
            <li><img src="img/picto_wordpress.png" alt="" />WordPress</li>
            <li><img src="img/picto_google_stitch_homepage.png" alt="" />Google Stitch</li>
            <li><img src="img/picto_js.png" alt="" />JavaScript</li>
            <li><img src="img/picto_html.png" alt="" />HTML5</li>
            <li><img src="img/picto_css.png" alt="" />CSS3</li>
            <li><img src="img/picto_chatgpt.png" alt="" />ChatGPT</li>
            <li><img src="img/picto_claude.png" alt="" />Claude</li>
          </ul>
        </div>
      </div>
      <div class="answer-actions">
        <a href="https://www.figma.com/design/BOqRUurAwAMBnz0ixZ8Tz3/Site-Web-Inzerty---Inzerty---2026?node-id=1-5&amp;t=DBKbCyilrqZNFsIc-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="phone"></span><span data-fr="Voir la maquette mobile" data-en="View the mobile mockup">Voir la maquette mobile</span></a>
        <a href="https://www.figma.com/design/BOqRUurAwAMBnz0ixZ8Tz3/Site-Web-Inzerty---Inzerty---2026?node-id=1-4&amp;t=mxUGkuSDbsskrGGO-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="monitor"></span><span data-fr="Voir la maquette desktop" data-en="View the desktop mockup">Voir la maquette desktop</span></a>
        <a href="https://inzerty.com/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="external"></span><span data-fr="Voir le site web" data-en="View the website">Voir le site web</span></a>
      </div>
    </article>
    <!-- PROJET — E2C Grand-Lille -->
    <article data-topic="projet-e2c" data-q-fr="Parle-moi du projet de l'E2C" data-q-en="Tell me about the E2C project">
      <h2 class="project-title" data-fr="Refonte complète du site web de l'E2C Grand-Lille" data-en="Complete redesign of the E2C Grand-Lille website">Refonte complète du site web de l'E2C Grand-Lille</h2>
      <figure class="project-shot project-shot--beige"><img src="img/img_modale_e2C.png" alt="Aperçu du projet E2C Grand-Lille" /></figure>
      <p class="project-desc" data-fr-html="La <strong>refonte du site web</strong> de l'E2C Grand-Lille répond à un besoin de <strong>modernisation</strong> et de <strong>meilleure valorisation de ses missions</strong>. L'ancienne version manquait de <strong>clarté</strong> et ne mettait pas suffisamment en avant l'<strong>accompagnement proposé aux jeunes</strong> ni la <strong>diversité des parcours</strong>." data-en-html="The <strong>redesign of the E2C Grand-Lille website</strong> meets a need for <strong>modernisation</strong> and <strong>better promotion of its missions</strong>. The old version lacked <strong>clarity</strong> and did not sufficiently highlight the <strong>support offered to young people</strong> or the <strong>diversity of pathways</strong>.">La <strong>refonte du site web</strong> de l'E2C Grand-Lille répond à un besoin de <strong>modernisation</strong> et de <strong>meilleure valorisation de ses missions</strong>. L'ancienne version manquait de <strong>clarté</strong> et ne mettait pas suffisamment en avant l'<strong>accompagnement proposé aux jeunes</strong> ni la <strong>diversité des parcours</strong>.</p>
      <p class="project-desc" data-fr-html="Au-delà d'un <strong>design actualisé</strong> et d'une <strong>expérience utilisateur améliorée</strong>, l'objectif était de <strong>structurer les contenus</strong> pour mieux refléter les actions de l'école. Cette refonte propose ainsi une <strong>interface plus claire, moderne et accessible</strong>, facilitant la compréhension et renforçant l'<strong>attractivité</strong> auprès des jeunes, des entreprises et des partenaires." data-en-html="Beyond an <strong>updated design</strong> and <strong>improved user experience</strong>, the objective was to <strong>structure the content</strong> to better reflect the school's actions. This redesign thus offers a <strong>clearer, more modern and accessible interface</strong>, facilitating understanding and strengthening <strong>attractiveness</strong> among young people, businesses and partners.">Au-delà d'un <strong>design actualisé</strong> et d'une <strong>expérience utilisateur améliorée</strong>, l'objectif était de <strong>structurer les contenus</strong> pour mieux refléter les actions de l'école. Cette refonte propose ainsi une <strong>interface plus claire, moderne et accessible</strong>, facilitant la compréhension et renforçant l'<strong>attractivité</strong> auprès des jeunes, des entreprises et des partenaires.</p>
      <div class="project-details">
        <div>
          <h3><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
          <ul class="detail-list">
            <li data-fr="Intégration" data-en="Integration">Intégration</li>
            <li>Responsive</li>
            <li data-fr="Retouche d'image" data-en="Image editing">Retouche d'image</li>
            <li data-fr="Référencement (SEO, GEO)" data-en="Search optimisation (SEO, GEO)">Référencement (SEO, GEO)</li>
          </ul>
        </div>
        <div>
          <h3><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
          <ul class="detail-list detail-list--tools">
            <li><img src="img/picto_wordpress.png" alt="" />WordPress</li>
            <li><img src="img/picto_html.png" alt="" />HTML5</li>
            <li><img src="img/picto_css.png" alt="" />CSS3</li>
            <li><img src="img/picto_js.png" alt="" />JavaScript</li>
            <li><img src="img/picto_chatgpt.png" alt="" />ChatGPT</li>
          </ul>
        </div>
      </div>
      <div class="answer-actions">
        <a href="https://www.figma.com/design/yTkIbEnbkU8diclHIQ7Rxg/E2C---Inzerty---2025?node-id=1-2&amp;t=Ik2rDIu8nUYYJBaj-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="phone"></span><span data-fr="Voir la maquette mobile" data-en="View the mobile mockup">Voir la maquette mobile</span></a>
        <a href="https://www.figma.com/design/yTkIbEnbkU8diclHIQ7Rxg/E2C---Inzerty---2025?node-id=0-1&amp;t=qzfDhAHDpo4ybaJl-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="monitor"></span><span data-fr="Voir la maquette desktop" data-en="View the desktop mockup">Voir la maquette desktop</span></a>
        <a href="https://e2c-grandlille.fr/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="external"></span><span data-fr="Voir le site web" data-en="View the website">Voir le site web</span></a>
      </div>
    </article>
    <!-- PROJET — AMAP de Moreuil -->
    <article data-topic="projet-amap" data-q-fr="Parle-moi du projet de l'AMAP" data-q-en="Tell me about the AMAP project">
      <h2 class="project-title" data-fr="Création du site web de l'AMAP de Moreuil" data-en="Creation of the AMAP de Moreuil website">Création du site web de l'AMAP de Moreuil</h2>
      <figure class="project-shot project-shot--fit project-shot--amap"><img src="img/logo_amap_moreuil.png" alt="Logo de l'AMAP de Moreuil" /></figure>
      <p class="project-desc" data-fr-html="Création du site web de l'<strong>AMAP de Moreuil</strong> (Somme), une <strong>association</strong> pour le maintien d'une agriculture paysanne qui relie ses adhérents, les <strong>amapiens</strong>, à <strong>8 producteurs locaux</strong>, pour la plupart en <strong>agriculture biologique</strong>, dans un <strong>partenariat solidaire et en circuit court</strong>." data-en-html="Creation of the website of the <strong>AMAP de Moreuil</strong> (Somme, France), an <strong>association</strong> supporting small-scale farming that connects its members, the <strong>amapiens</strong>, with <strong>8 local producers</strong>, most of them <strong>certified organic</strong>, through a <strong>solidarity-based, short-supply-chain partnership</strong>.">Création du site web de l'<strong>AMAP de Moreuil</strong> (Somme), une <strong>association</strong> pour le maintien d'une agriculture paysanne qui relie ses adhérents, les <strong>amapiens</strong>, à <strong>8 producteurs locaux</strong>, pour la plupart en <strong>agriculture biologique</strong>, dans un <strong>partenariat solidaire et en circuit court</strong>.</p>
      <p class="project-desc" data-fr-html="L'association avait besoin de <strong>mettre en avant sur le web</strong> son <strong>système de panier hebdomadaire</strong> (légumes, pain, œufs, fromages, fruits, miel, viande… distribués <strong>chaque jeudi</strong>) ainsi que <strong>ses producteurs</strong>. Le site présente donc clairement le <strong>fonctionnement des contrats</strong> et les <strong>producteurs partenaires</strong>, et invite les visiteurs à <strong>devenir amapien</strong>." data-en-html="The association needed to <strong>showcase online</strong> its <strong>weekly basket system</strong> (vegetables, bread, eggs, cheese, fruit, honey, meat… distributed <strong>every Thursday</strong>) as well as <strong>its producers</strong>. The site therefore clearly presents <strong>how the contracts work</strong> and the <strong>partner producers</strong>, and invites visitors to <strong>become an amapien</strong>.">L'association avait besoin de <strong>mettre en avant sur le web</strong> son <strong>système de panier hebdomadaire</strong> (légumes, pain, œufs, fromages, fruits, miel, viande… distribués <strong>chaque jeudi</strong>) ainsi que <strong>ses producteurs</strong>. Le site présente donc clairement le <strong>fonctionnement des contrats</strong> et les <strong>producteurs partenaires</strong>, et invite les visiteurs à <strong>devenir amapien</strong>.</p>
      <div class="project-details">
        <div>
          <h3><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
          <ul class="detail-list">
            <li data-fr="Maquettage" data-en="Mockup">Maquettage</li>
            <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
            <li data-fr="Intégration" data-en="Integration">Intégration</li>
            <li>Responsive</li>
            <li>UI/UX</li>
            <li data-fr="Référencement (SEO, GEO)" data-en="Search optimisation (SEO, GEO)">Référencement (SEO, GEO)</li>
          </ul>
        </div>
        <div>
          <h3><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
          <ul class="detail-list detail-list--tools">
            <li><img src="img/picto_figma_outils_homepage.png" alt="" />Figma</li>
            <li><img src="img/picto_wordpress.png" alt="" />WordPress</li>
            <li><img src="img/picto_html.png" alt="" />HTML5</li>
            <li><img src="img/picto_css.png" alt="" />CSS3</li>
            <li><img src="img/picto_claude.png" alt="" />Claude</li>
          </ul>
        </div>
      </div>
      <div class="answer-actions">
        <a href="https://www.figma.com/design/x6HGObexfrG9YDcNPD3xg6/AMAP---Inzerty---2026?node-id=3-3&amp;t=qHfur1xlrrPv165I-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="phone"></span><span data-fr="Voir la maquette mobile" data-en="View the mobile mockup">Voir la maquette mobile</span></a>
        <a href="https://www.figma.com/design/x6HGObexfrG9YDcNPD3xg6/AMAP---Inzerty---2026?node-id=3-4&amp;t=qHfur1xlrrPv165I-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="monitor"></span><span data-fr="Voir la maquette desktop" data-en="View the desktop mockup">Voir la maquette desktop</span></a>
        <a href="https://amapdemoreuil.fr/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="external"></span><span data-fr="Voir le site web" data-en="View the website">Voir le site web</span></a>
      </div>
    </article>
    <!-- PROJET — Le Lien Services -->
    <article data-topic="projet-lien" data-q-fr="Parle-moi du projet Le Lien Services" data-q-en="Tell me about the Le Lien Services project">
      <h2 class="project-title" data-fr="Refonte du site web de Le Lien Services" data-en="Redesign of the Le Lien Services website">Refonte du site web de Le Lien Services</h2>
      <figure class="project-shot project-shot--fit"><img src="img/logo_le_lien_service.png" alt="Logo Le Lien Services" /></figure>
      <p class="project-desc" data-fr-html="<strong>Le Lien Services</strong> est une <strong>structure d'insertion</strong> ardennaise du <strong>Groupe Vitamine T</strong>, basée à Vireux-Molhain, qui <strong>vend et aménage des conteneurs</strong>, jusqu'à des <strong>piscines conteneurs</strong>, tout en accompagnant des personnes vers l'<strong>emploi</strong>." data-en-html="<strong>Le Lien Services</strong> is an <strong>integration company</strong> from the Ardennes, part of the <strong>Vitamine T Group</strong> and based in Vireux-Molhain, that <strong>sells and fits out containers</strong>, right up to <strong>container swimming pools</strong>, while helping people back into <strong>employment</strong>."><strong>Le Lien Services</strong> est une <strong>structure d'insertion</strong> ardennaise du <strong>Groupe Vitamine T</strong>, basée à Vireux-Molhain, qui <strong>vend et aménage des conteneurs</strong>, jusqu'à des <strong>piscines conteneurs</strong>, tout en accompagnant des personnes vers l'<strong>emploi</strong>.</p>
      <p class="project-desc" data-fr-html="Son site web était <strong>très ancien</strong> et n'était <strong>plus à jour</strong>, ni visuellement, ni dans ses contenus. J'en ai mené la <strong>refonte complète</strong>, des <strong>wireframes</strong> à l'<strong>intégration</strong>, pour <strong>moderniser son image</strong> et <strong>clarifier son offre de conteneurs aménagés</strong>, sur mobile comme sur ordinateur." data-en-html="Its website was <strong>very old</strong> and <strong>no longer up to date</strong>, neither visually nor in its content. I led its <strong>complete redesign</strong>, from <strong>wireframes</strong> to <strong>integration</strong>, to <strong>modernise its image</strong> and <strong>clarify its fitted-container offer</strong>, on mobile and desktop alike.">Son site web était <strong>très ancien</strong> et n'était <strong>plus à jour</strong>, ni visuellement, ni dans ses contenus. J'en ai mené la <strong>refonte complète</strong>, des <strong>wireframes</strong> à l'<strong>intégration</strong>, pour <strong>moderniser son image</strong> et <strong>clarifier son offre de conteneurs aménagés</strong>, sur mobile comme sur ordinateur.</p>
      <p class="project-desc project-highlight" data-fr-html="J'ai également <strong>codé moi-même un configurateur</strong> qui permet d'<strong>aménager son conteneur comme on le souhaite</strong>. L'utilisateur se fait ainsi une <strong>idée concrète de ce qu'il est possible de réaliser</strong> et de ce qu'il veut vraiment, puis il est invité à <strong>prendre contact avec la personne en charge</strong> pour concrétiser son projet." data-en-html="I also <strong>coded a configurator myself</strong> that lets users <strong>fit out their container however they like</strong>. They get a <strong>concrete idea of what is possible</strong> and of what they really want, and are then invited to <strong>get in touch with the person in charge</strong> to bring their project to life.">J'ai également <strong>codé moi-même un configurateur</strong> qui permet d'<strong>aménager son conteneur comme on le souhaite</strong>. L'utilisateur se fait ainsi une <strong>idée concrète de ce qu'il est possible de réaliser</strong> et de ce qu'il veut vraiment, puis il est invité à <strong>prendre contact avec la personne en charge</strong> pour concrétiser son projet.</p>
      <div class="project-details">
        <div>
          <h3><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
          <ul class="detail-list">
            <li>Wireframes</li>
            <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
            <li>Responsive</li>
            <li>UI/UX</li>
            <li data-fr="Intégration" data-en="Integration">Intégration</li>
            <li data-fr="Référencement (SEO, GEO)" data-en="Search optimisation (SEO, GEO)">Référencement (SEO, GEO)</li>
          </ul>
        </div>
        <div>
          <h3><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
          <ul class="detail-list detail-list--tools">
            <li><img src="img/picto_figma_outils_homepage.png" alt="" />Figma</li>
            <li><img src="img/picto_wordpress.png" alt="" />WordPress</li>
            <li><img src="img/picto_html.png" alt="" />HTML5</li>
            <li><img src="img/picto_css.png" alt="" />CSS3</li>
            <li><img src="img/picto_claude.png" alt="" />Claude</li>
          </ul>
        </div>
      </div>
      <div class="answer-actions">
        <a href="https://www.figma.com/design/JTWkitmKE3S8bMRYZ1uNMS/Le-lien-Services---Inzerty---2026?node-id=3-3&amp;t=DQzmuDPJRISbVsbD-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="phone"></span><span data-fr="Voir la maquette mobile" data-en="View the mobile mockup">Voir la maquette mobile</span></a>
        <a href="https://www.figma.com/design/JTWkitmKE3S8bMRYZ1uNMS/Le-lien-Services---Inzerty---2026?node-id=3-4&amp;t=DQzmuDPJRISbVsbD-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="monitor"></span><span data-fr="Voir la maquette desktop" data-en="View the desktop mockup">Voir la maquette desktop</span></a>
        <a href="https://lelien-containers.com/" class="btn btn-ghost" target="_blank" rel="noopener"><span class="ico" data-icon="external"></span><span data-fr="Voir le site web" data-en="View the website">Voir le site web</span></a>
      </div>
    </article>
    <!-- PROJET — Envie Nord -->
    <article data-topic="projet-envie" data-q-fr="Parle-moi du projet Envie Nord" data-q-en="Tell me about the Envie Nord project">
      <h2 class="project-title" data-fr="Refonte du tunnel de vente du site web d'Envie" data-en="Redesign of the Envie website sales funnel">Refonte du tunnel de vente du site web d'Envie</h2>
      <figure class="project-shot project-shot--cover"><img src="img/img-projet-envie.png" alt="Aperçu du projet Envie Nord" /></figure>
      <p class="project-desc" data-fr-html="La <strong>refonte du site web</strong> d'Envie, réseau associatif dédié au <strong>réemploi</strong> et à la <strong>réparation d'électroménager</strong> tout en favorisant l'<strong>insertion professionnelle</strong>, répond à un besoin de <strong>modernisation</strong> et d'alignement avec les <strong>standards digitaux actuels</strong>. L'ancienne version ne reflétait plus pleinement l'image engagée et professionnelle du projet, tant sur le plan visuel que sur l'<strong>expérience utilisateur</strong>." data-en-html="The <strong>redesign of the Envie website</strong>, an associative network dedicated to the <strong>reuse</strong> and <strong>repair of household appliances</strong> while promoting <strong>professional integration</strong>, meets a need for <strong>modernisation</strong> and alignment with <strong>current digital standards</strong>. The old version no longer fully reflected the committed and professional image of the project, both visually and in terms of <strong>user experience</strong>.">La <strong>refonte du site web</strong> d'Envie, réseau associatif dédié au <strong>réemploi</strong> et à la <strong>réparation d'électroménager</strong> tout en favorisant l'<strong>insertion professionnelle</strong>, répond à un besoin de <strong>modernisation</strong> et d'alignement avec les <strong>standards digitaux actuels</strong>. L'ancienne version ne reflétait plus pleinement l'image engagée et professionnelle du projet, tant sur le plan visuel que sur l'<strong>expérience utilisateur</strong>.</p>
      <p class="project-desc" data-fr-html="Dans ce contexte, j'ai mené une <strong>refonte UX</strong> centrée sur l'<strong>optimisation du parcours utilisateur</strong>, notamment du <strong>tunnel de vente</strong>, afin de <strong>fluidifier la navigation</strong> et d'<strong>améliorer la conversion</strong>. Le design et la structure existants ne permettaient pas de valoriser pleinement les expertises, l'<strong>impact social</strong> et les services proposés par Envie." data-en-html="In this context, I led a <strong>UX redesign</strong> centred on <strong>optimising the user journey</strong>, particularly the <strong>sales funnel</strong>, in order to <strong>streamline navigation</strong> and <strong>improve conversion</strong>. The existing design and structure did not fully showcase the expertise, <strong>social impact</strong> and services offered by Envie.">Dans ce contexte, j'ai mené une <strong>refonte UX</strong> centrée sur l'<strong>optimisation du parcours utilisateur</strong>, notamment du <strong>tunnel de vente</strong>, afin de <strong>fluidifier la navigation</strong> et d'<strong>améliorer la conversion</strong>. Le design et la structure existants ne permettaient pas de valoriser pleinement les expertises, l'<strong>impact social</strong> et les services proposés par Envie.</p>
      <div class="project-details">
        <div>
          <h3><span class="ico" data-icon="gear"></span><span data-fr="Technicité" data-en="Technical skills">Technicité</span></h3>
          <ul class="detail-list">
            <li data-fr="Maquettage" data-en="Mockup">Maquettage</li>
            <li data-fr="Prototypage" data-en="Prototyping">Prototypage</li>
            <li>UI/UX</li>
          </ul>
        </div>
        <div>
          <h3><span class="ico" data-icon="wrench"></span><span data-fr="Outils" data-en="Tools">Outils</span></h3>
          <ul class="detail-list detail-list--tools">
            <li><img src="img/picto_figma_outils_homepage.png" alt="" />Figma</li>
            <li><img src="img/picto_chatgpt.png" alt="" />ChatGPT</li>
          </ul>
        </div>
      </div>
      <div class="answer-actions">
        <a href="https://www.figma.com/design/3grlsWN1xAbJuugxTjShvC/Envie---Inzerty---2025?node-id=1-2969&amp;t=utBQAk3Pu9eYQleq-1" class="btn btn-accent" target="_blank" rel="noopener"><span class="ico" data-icon="figma"></span><span data-fr="Voir la maquette" data-en="View the mockup">Voir la maquette</span></a>
      </div>
    </article>
  </div>
`;

  document.body.insertAdjacentHTML('beforeend', HTML);
}());
