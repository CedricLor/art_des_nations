

Seb,

1. embedded javascript and css
2. index.php
3. include galleries-photos in country
4. What is this config.json?
5. What is the difference between liste.php and portraits.php ?
6. Is there one action per country or several actions per country ?


1. embedded javascript and css

Est-ce que tu peux me dire lesquelles de ces lignes sont réellement requises ?

  <!-- Bootstrap core CSS -->
  <link href="css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="css/flexslider.css" type="text/css">
  <link rel="stylesheet" href="css/font-awesome.min.css">
  <link rel="stylesheet" href="css/styles.css">

  <!-- Custom styles for this template -->
  <script src="js/jquery.min.js"></script>
  <script src="js/responsive-calendar.js"></script>
  <script src="js/lib/moment.min.js"></script>
  <script src="js/fullcalendar.min.js"></script>
  <script src='js/lang/fr.js'></script>

J'imagine que flexslider.css, c'est le carousel.


Mais pour ceux-là, où sont-ils utilisés ?
responsive-calendar.js ?
moment.min.js ?
fullcalendar ?
lang/fr.js ?


2. index.php

Semble utilisé dans top-nav. Mais la page ne semble pas servir à quoi que ce soit...

Je l'intègre ? Oui, non ?

3. Pourquoi avais-tu un include gallery-photos dans action-pays ?

<?php //include('inc/galerie-photos.inc.php'); ?>

4. What is this config.json?

Don't tell me this is a LESS definition...

5. What is the difference between liste.php and portraits.php ?

The one that is currently displayed when clicking on portraits in the side-nav is liste.php

6. Is there one action per country or several actions per country ?

It seemed to me that there were several actions per country (home page). But when looking at your layouts (and the links on the country page), it seems to me that you only have one single action per country and then articles. This is a bit confusing...

------------------


Done:

- head.inc
- foot
- side-nav
- top-nav
- accueil.php
- diaporama-actions
- actions-pays
- article
- recommandations
- gallerie-photos
- portrait

Missing:
- liste
- pagination

- portraits --

Are these files in use anywhere?
- accroche-agenda --
- actus --
- addthis --
- calendar --
- diaporama --
- gallerie-photos-thumb-nav --
- week-calendar --

