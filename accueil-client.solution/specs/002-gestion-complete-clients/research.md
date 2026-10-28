# Research: Gestion complète des clients

## Socle Angular existant

- **Decision**: Étendre l'application standalone existante, son routeur et la fonctionnalité `src/app/features/clients/`; conserver Angular 22.2.x et TypeScript ~6.0.2.
- **Rationale**: Le projet est déjà scaffoldé et ses versions satisfont la constitution. Les routes actuelles et la page liste sont autonomes; recréer un socle ou changer de versions n'apporterait aucune valeur au périmètre.
- **Alternatives considered**: Nouveau projet frontend, migration de framework ou mise à niveau de dépendances. Ces options augmenteraient le risque et le coût sans besoin exprimé.

## État et opérations du mock

- **Decision**: Étendre le service clients root-provided existant pour posséder une copie modifiable du jeu initial et fournir lecture de liste/détail, création, mise à jour d'adresse/situation et suppression. Chaque fiche gérée par l'application possède un identifiant unique; l'identifiant des fiches de démonstration est stable. Le service reste la seule source d'état partagé entre les routes.
- **Rationale**: Les créations et modifications doivent rester visibles après navigation, mais disparaître au rechargement. Un service de fonctionnalité est suffisant pour un POC mono-navigateur et évite un store global. La création d'identifiants est nécessaire pour les routes de détail et les opérations ciblées, même si `id` n'est pas marqué requis dans le schéma OpenAPI.
- **Alternatives considered**: Données codées dans chaque page, stockage navigateur ou service HTTP. La première option dupliquerait l'état; le stockage navigateur violerait la réinitialisation demandée; HTTP dépendrait d'un backend exclu.

## Formulaires et validation

- **Decision**: Utiliser Angular Forms, déjà présent comme dépendance, avec validation au champ selon les règles de `input/connaissance-client-api.yaml`. Réutiliser les mécanismes de signaux et les états de page existants; n'ajouter aucune bibliothèque UI.
- **Rationale**: Les champs obligatoires, formats et limites sont précis et testables. Les formulaires intégrés couvrent le besoin sans introduire de dépendance ni de couche supplémentaire.
- **Alternatives considered**: Validation uniquement visuelle ou bibliothèque de formulaires tierce. La première ne garantit pas les règles métier; la seconde n'est pas justifiée pour ces formulaires.

## Validation d'adresse et erreurs

- **Decision**: Ne pas appeler le service externe de validation géographique depuis le navigateur. Les erreurs de cohérence code postal/ville et les échecs d'opération sont représentés par des réponses contrôlées du mock ou des doubles de test; aucune validation exhaustive de toutes les communes n'est simulée.
- **Rationale**: La clarification impose un mock pour tous les parcours et la constitution exclut l'intégration de production. Le test doit démontrer que l'interface conserve les anciennes valeurs et présente l'erreur sans prétendre valider une base géographique réelle.
- **Alternatives considered**: Ajouter une API IGN, embarquer une base géographique ou inventer une règle locale. Ces choix dépasseraient le périmètre et pourraient rejeter des adresses valides.

## Navigation, dialogues et tests

- **Decision**: Ajouter des routes pour la création et le détail; maintenir les modifications d'adresse/situation et la confirmation de suppression dans des dialogues accessibles sur la page détail. S'appuyer sur Angular TestBed, Vitest, RxJS `of`/`Subject`, les patterns d'annonces accessibles existants, et `npm run build`.
- **Rationale**: Les maquettes montrent les deux modifications comme des dialogues depuis le détail. Les outils de test et les conventions de page sont déjà installés et utilisés dans le MVP.
- **Alternatives considered**: Ajouter une bibliothèque de composants ou un outil end-to-end. Le périmètre n'exige pas de dépendance supplémentaire; des tests ciblés Angular couvrent les transitions spécifiées.