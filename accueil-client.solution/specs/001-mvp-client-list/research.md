# Research - MVP Client List

## Decision 1: Use MSW for backend simulation

- Decision: Utiliser `Mock Service Worker (MSW)` comme strategie de mock principale pour le MVP.
- Rationale: Reproduit un comportement HTTP realiste (latence, codes d'erreur, payloads), facilite les tests et limite les changements au branchement du backend reel.
- Alternatives considered:
  - `assets/mocks/*.json`: plus simple mais faible fidelite pour erreurs/latence.
  - `angular-in-memory-web-api`: rapide a brancher mais moins souple pour scenarios fins et parity reseau.

## Decision 2: Keep UI and processing explicitly separated

- Decision: Structurer la feature en `components` (presentational) + `containers` (orchestration) + `services` (API/traitement).
- Rationale: Respect direct de la constitution (separation UI/traitement), meilleure testabilite et evolutivite.
- Alternatives considered:
  - Composants monolithiques: plus rapide au debut mais deteriore maintenance/tests.

## Decision 3: Start without state management library

- Decision: Pas de NgRx/Akita au MVP; utiliser services + RxJS pour l'etat local de l'ecran.
- Rationale: KISS, moindre complexite et temps de mise en oeuvre reduit.
- Alternatives considered:
  - NgRx: puissant mais surdimensionne pour un seul ecran MVP.

## Decision 4: Type contract alignment strategy

- Decision: Creer un modele TypeScript `ConnaissanceClient` aligne sur OpenAPI en manuel pour le MVP, preparer la generation automatique pour la suite.
- Rationale: Delivre vite tout en conservant un contrat type explicite.
- Alternatives considered:
  - Generation immediate complete via tooling OpenAPI: utile mais cout initial plus eleve pour un MVP mono-ecran.

## Decision 5: Testing strategy

- Decision: Cibler tests unitaires pour service de liste + composant de liste + gestion etats (loading/empty/error).
- Rationale: Retour rapide, confiance fonctionnelle minimale exigible pour demo.
- Alternatives considered:
  - E2E des le MVP: possible mais non prioritaire tant que le flux principal est stable.
