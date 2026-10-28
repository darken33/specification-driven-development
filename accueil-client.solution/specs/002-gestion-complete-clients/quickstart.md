# Quickstart: Gestion complète des clients

## Prérequis

- Node.js compatible avec Angular 22 et npm.
- Dépendances du dépôt installées avec `npm install` si nécessaire.
- Aucun backend, compte ou service externe requis.

## Démarrer l'application

À la racine du dépôt :

```sh
npm start
```

Ouvrir `http://localhost:4200/`. La page affiche le jeu initial de clients; les modifications de démonstration restent en mémoire et sont réinitialisées au rechargement.

## Parcours de validation manuelle

1. Depuis la liste, ouvrir le détail d'une fiche puis revenir à la liste; vérifier l'identité, l'adresse et la situation familiale.
2. Créer une fiche avec tous les champs requis; vérifier qu'elle apparaît dans la liste. Tester également une valeur requise vide, une valeur hors format, puis l'annulation.
3. Depuis le détail, modifier l'adresse en laissant la ligne 2 vide; enregistrer et vérifier que seuls les champs d'adresse changent. Annuler une autre modification et vérifier que les anciennes valeurs restent présentes.
4. Tester la situation familiale avec 0 puis 20 enfants; vérifier que 21 est refusé et qu'un célibataire peut avoir des enfants.
5. Modifier l'adresse avec une réponse de validation simulée en erreur; vérifier le message et l'absence de mutation partielle.
6. Demander la suppression, annuler et vérifier que la fiche existe toujours; recommencer et confirmer, puis vérifier son absence de la liste.
7. Naviguer au clavier et réduire la fenêtre à un écran étroit; vérifier les champs, dialogues, messages et retours sans défilement horizontal.
8. Recharger la page; vérifier que le jeu initial est restauré et que les changements de la session ont disparu.

## Vérifications automatisées

Tous les tests Angular/Vitest :

```sh
npm test -- --watch=false
```

Tests ciblés de la fonctionnalité clients :

```sh
npx ng test --watch=false --include='src/app/features/clients/**/*.spec.ts'
```

Compilation de production :

```sh
npm run build
```

Les vérifications couvrent les règles du service mock, le rendu des routes et états, les validations de formulaire, les annulations, les mutations atomiques et la restauration des données au rechargement.