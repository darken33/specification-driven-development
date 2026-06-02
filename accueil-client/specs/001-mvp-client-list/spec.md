# Feature Specification: MVP Client List

**Feature Branch**: `001-mvp-client-list`

**Created**: 2026-06-02

**Status**: Draft

**Input**: User description: "Nous disposons actuellement d'une application backend exposant des API REST définies dans le contrat OpenAPI (fichier `input/connaissance-client-api.yaml`). En tant qu'architecte technique et fonctionnel possédant de solides compétences en UX/UI, spécifier une application frontend qui accède à tous les points de terminaison du contrat OpenAPI. Nous disposons de maquettes. MVP = page d'accueil qui liste les clients; backend non disponible, fournir un mock pour les tests."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Afficher la liste des clients (Priority: P1)

Un utilisateur (conseiller) ouvre l'application et doit voir la liste des fiches clients afin de sélectionner un client pour consultation.

**Why this priority**: Permet de démontrer l'intégration front-end avec le contrat API et la navigation primaire; valeur de démo maximale pour un POC.

**Independent Test**: L'application démarre en local avec un mock backend et affiche une liste de clients fournie par le mock.

**Acceptance Scenarios**:

1. **Given** l'utilisateur ouvre la page d'accueil, **When** le mock renvoie une liste non vide, **Then** la page affiche chaque client (nom, prénom, ville, codePostal) sous forme de ligne cliquable.
2. **Given** le mock renvoie une liste vide, **When** la page s'affiche, **Then** la page montre un état vide clair (message "Aucun client trouvé") et un bouton `Nouveau client`.
3. **Given** l'appel réseau échoue (mock configuré pour 500), **When** l'utilisateur charge la page, **Then** un message d'erreur convivial apparaît et l'utilisateur peut réessayer.
4. **Given** le réseau est lent, **When** la page charge, **Then** un indicateur de chargement est visible jusqu'à la réponse.

---

### Edge Cases

- Données partielles: certains champs optionnels absents → afficher un placeholder ("—").
- Grandes listes: pagination ou virtual scroll (MVP: pagination simple côté client via mock).
- Internationalisation non requise pour le POC; texte en Français.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: L'application MUST afficher la liste des clients à partir d'une source de données mockable.
- **FR-002**: L'application MUST permettre de simuler trois états du backend: succès (liste non vide), succès (liste vide), erreur serveur.
- **FR-003**: L'application MUST afficher un écran de chargement pendant la récupération des données.
- **FR-004**: Chaque ligne client MUST être cliquable et naviguer vers la page détail (hors scope MVP: page détail non implémentée maintenant, navigation stubbed).
- **FR-005**: Les composants d'affichage MUST être présentational (dumb) et recevoir les données via `@Input()`; la logique de récupération MUST être dans un service injectable.
- **FR-006**: Les types MUST être définis en TypeScript conformément au schéma OpenAPI `ConnaissanceClient`.
- **FR-007**: Les tests unitaires MUST couvrir le comportement du composant liste et du service de récupération (mocks injectés).

### Key Entities

- **ConnaissanceClient**: fiche client (voir `input/connaissance-client-api.yaml` -> `ConnaissanceClient` schema). Champs principaux: `id`, `nom`, `prenom`, `ligne1`, `codePostal`, `ville`, `situationFamiliale`, `nombreEnfants`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La page d'accueil montre la liste de clients (ou l'état vide) dans moins de 3 secondes en local avec mock standard.
- **SC-002**: Les scénarios d'acceptation (liste non vide, liste vide, erreur) sont démontrables sans accès au backend en configurant le mock.
- **SC-003**: Les composants clés ont des tests unitaires couvrant >= 70% des branches critiques (chargement, succès, erreur, affichage vide).

## Assumptions

- Le backend réel n'est pas disponible pour le POC; nous utiliserons un mock (Mock Service Worker ou fichier JSON servi depuis `assets/`).
- Utiliser les dernières versions stables d'Angular et TypeScript lors de l'initialisation.
- Authentification et sécurité: hors scope pour ce POC.
- CI/CD: hors scope pour ce POC.

## Implementation Notes

- Structure: utiliser `frontend/src/app/features/client-list/` avec `components/` et `services/`.
- Mock strategy (MVP): `Mock Service Worker (msw)` — simuler les endpoints et permettre les scénarios success/empty/error/latency; basculer vers `assets/mocks/clients.json` uniquement si MSW n'est pas utilisable.
- Typings: générer ou copier l'interface `ConnaissanceClient` depuis le fichier OpenAPI (manuel pour MVP) dans `models/connaissance-client.ts`.
- Tests: utiliser `Jest` ou `Karma+Jasmine` selon préférence du projet; fournir exemples de tests unitaires pour le composant liste et le service.

## Clarifications

### Session 2026-06-02

- Q: Quelle stratégie de mock utiliser pour le MVP? → A: MSW (Mock Service Worker)

## Demo Instructions (MVP)

1. `npm install`
2. `npm start` (ou `ng serve`)
3. Ouvrir `http://localhost:4200` → Page d'accueil affiche la liste via mock

## Next Steps After MVP

- Implémenter la page détail et les popups de modification d'adresse/situation/suppression en se basant sur les maquettes fournies.
- Ajouter un adaptateur HttpClient pour brancher le backend réel lorsque disponible.

---

**SPEC FILE END**
