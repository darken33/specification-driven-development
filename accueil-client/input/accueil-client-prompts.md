# Specification Driven Development : Prompts pour Accueil Client

## Constitution

/speckit.constitution En tant qu'architecte technique spécialisé en Angular et TypeScript, définis la structure, les principes architecturaux et de développement d'une application front-end moderne. Pour ce faire, suis les meilleures pratiques actuelles, en respectant au minimum les principes suivants :​

* Utiliser les dernières versions d'Angular et de TypeScript.​
* Principe KISS : Privilégier la simplicité.​
* Séparer explicitement l'interface utilisateur du traitement.​

S'agissant d'un POC, n'ayant pas pour but de partir en production, on ne traitera pas les éléments suivants : ​

* Authentification et Sécutrité​
* Pipelines de CI/CD​

Définis uniquement le fichier constitution.md, puis me le retourner afin que je puisse vérifier le respect de ces principes.​

## Spécifications​

/speckit.specify Nous disposons actuellement d'une application backend exposant des API REST définies dans le contrat OpenAPI (fichier `connaissance-client-api.yaml`). En tant qu'architecte technique et fonctionnel possédant de solides compétences en UX/UI, Tu dois spécifier une application frontend qui accède à tous les points de terminaison du contrat OpenAPI. ​

Nous disposons des maquettes suivantes :

* Page d'accueil / liste des clients `maquette_accueil-client.png`. 
* Page nouveau client `maquette_nouveau-client.png`. 
* Page détail client `maquette_detail-client.png`.
* Pop Up modification d'adresse `maquette_modifier-adresse.png`.
* Pop Up modification situation `maquette_modifier-situation.png`.
* Pop Up supprimer client `maquette_supprimer-client.png`.

Une première version MVP consiste à disposer de la page d'accueil, le backend API n'étant pas disponible il faudra disposer d'un mock pour les tests.  ​

​Une fois la tâche réalisée, rends moi la main afin que je valide ce que tu auras rédigé.​

## Clarification​

/speckit.clarify Clarifies la spécification ci-jointe si nécessaire.​

## Définir le plan​

/speckit.plan Crées un plan pour la spécification ci-jointe. Une fois le plan établi rends moi la main afin que je le valide.​

## Transformer le plan en tâches​

/speckit.tasks Transforme le plan ci-joint en tâches. Une fois les tâches établies rends moi la main afin que je les valide.​

## Implémentation

/speckit.implement Implémente la phase 1, puis rend moi la main afin que je puisse valider, l'idéal serait de pouvoir lancer l'application pour voir le rendu initial.​

/speckit.implement Lance l'implémentation par phase à partir de la liste des tasks, en suivant le plan et les spec.​

/speckit.implement Parfait cela fonctionne, par contre le design n'est pas excellent, peux-tu me proposer un bandeau design pour le titre, et plus de couleur sur les cartes clients ?.​

## Spécification du reste des écrans

/speckit.specify Nous devons ajouter de nouveaux écrans (nous avons déjà la liste des clients, et le détail d'un client) affin de compléter l'application nous devons à minima créer les pages :

* Création d'une fiche client
* Modification du client (adresse, situation familiale, nom et prénom)
* Suppression d'un client

Pour rappel la spécification OpenApi du backend est décrit dans le fichier connaissance-client-api.yaml.

Une fois la tâche réalisée, rends moi la main afin que je valide ce que tu auras rédigé.​
