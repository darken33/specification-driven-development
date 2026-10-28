# Quickstart — Liste des clients

## Prérequis

- Node.js et npm compatibles avec la version stable d'Angular générée par le CLI.
- Le socle Angular du projet créé dans `accueil-client/` avec Angular CLI; le dépôt ne contient pas encore `package.json` ni `src/`.
- Aucune API ni donnée externe: les scénarios utilisent le service mocké.

## Installation et lancement

Depuis `accueil-client/`, après le scaffold Angular:

```sh
npm install
npx ng serve
```

Ouvrir l'URL locale indiquée par Angular CLI. La page d'accueil doit afficher « Liste des clients » et au moins cinq cartes fictives.

## Vérifications automatisées

```sh
npx ng test --watch=false
npx ng build
```

Les tests de la page et du service doivent couvrir les transitions de chargement, résultat non vide, résultat vide, erreur puis nouvelle tentative réussie, ainsi que l'affichage de valeurs manquantes. La compilation doit terminer sans erreur.

## Scénarios d'acceptation manuels

1. Vérifier sur l'accueil que toutes les fiches du mock sont visibles, chacune une seule fois, avec nom, prénom, code postal et ville.
2. Remplacer la réponse mock par une fiche unique, puis par une liste vide: la fiche unique reste correctement présentée; la liste vide affiche son message dédié sans carte fictive.
3. Simuler une erreur, vérifier le message et déclencher le réessai; une réponse réussie doit remplacer l'erreur par la liste.
4. Simuler une valeur d'affichage absente: la fiche reste lisible et indique « Non renseigné ».
5. Redimensionner la fenêtre vers un écran étroit puis naviguer au clavier: aucune information ne disparaît et la page ne défile pas horizontalement.
6. Vérifier que les repères de création et de détail, s'ils sont présents, sont indisponibles et n'ouvrent aucune page.

Voir le [contrat UI](./contracts/client-list-ui.md) et le [modèle de données](./data-model.md) pour les résultats attendus.
