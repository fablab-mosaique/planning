# Prototype planning

## Pré-requis

Il faut avoir ``Node JS`` d'installer sur la machine, afin d'utiliser la commande ``npm``.
De plus, il faudra également avoir Python (ou autre outil de Live Server) afin de gérer les modules.

## Installation

Afin de lancer le projet, vous pouvez maintenant lancer les commandes suivantes dans cet ordre :

- ``npm install`` afin de compiler les librairies dont nous aurons besoin (Tailwind principalement)
- ``.\init\tailwindify.ps1`` afin d'empiler les fichiers ``*-tailwind.css`` et de les transpiler avec tailwind, pour créer le fichier de destination ``generated.css`` qui sera utilisé.
- ``.\init\run.ps1`` pour lancer le projet.

À ce stade, vous devriez pouvoir ouvrir dans votre navigateur l'url suivante :
[http://localhost:12000](http://localhost:12000)

Maintenant vous pouvez ajouter des événements, clôtures, etc ...

## Prise en main

### Comment ajouter/modifier des données

Vous trouverez dans ce projet un fichier scripts/data/events.js.
Celui-ci permet de configurer le planning utilisé.
Si vous ouvrez le projet avec un IDE (comme Visual Studio Code), vous pourrez alors compléter selon vos envies grâce à l'autocomplétion des méthodes.

### Fonctionnalités

Les fonctionnalités développées sont les suivantes :

- ajout d'événement à une date donnée.
- ajout de répétition d'événements d'une date de départ à une date de fin.
- ajout d'une clôture à une date donnée.
- ajout de répétition de clôture d'une date de départ à une date de fin.
- affichage visuel complet du planning s'étalant du mois de Septembre de l'année demandée, à Août de l'année suivante, avec un calendrier des différents jours, cliquables selon qu'il y ait ou non un événement ou une clôture, afin d'afficher un résumé complet de la journée dans le mois en question.
- Lorsqu'on ajoute un événement sur une journée de fermeture, cela enlève la clôture.
- Si on clôture une journée qui possédait des événements, ceux-ci ne sont pas affichés.
- Lorsqu'une journée est clôturée, elle apparaît sous fond noir.
- Lorsqu'une journée a des événements/activités, elle apparaît sous fond jaune.
