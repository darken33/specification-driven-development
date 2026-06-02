<!-- Implementation plan for client-detail-modals -->
# Plan d'implémentation — specs/002-client-detail-modals

But: Transformer la spécification `specs/002-client-detail-modals/spec.md` en un plan d'implémentation exécutable pour le POC Angular existant.

Contrainte principale
---------------------
- Garder la POC légère : code lisible, tests unitaires et mocks MSW; pas d'authentification.
- Respecter la règle d'intégration validée : après tout `PUT` réussi, re-fetcher la ressource via `GET /v1/connaissance-clients/{id}`.

Contexte technique
------------------
- Frontend: Angular (version utilisée par le projet existant) + TypeScript strict.
- Mocking: MSW déjà intégré pour la page Liste — réutiliser la même infrastructure.
- Tests: Unitaires (Vitest/Jasmine via Angular test runner déjà présent) ; E2E léger avec MSW.

Gates (pré-requis obligatoires avant implémentation)
--------------------------------------------------
1. `specs/002-client-detail-modals/spec.md` validée par le PO/architecte.
2. MSW handlers skeleton ajoutés pour les endpoints listés (success / validation_error / server_error / slow).
3. `feature.json` persiste le dossier de spec (déjà fait).

Phases
------

Phase 0 — Préparation (1 jour)
- Objectif: aligner l'environnement et fournir squelettes nécessaires.
- Tâches:
  - (P0.1) Vérifier que MSW worker et infra existent et sont re‑utilisables (répertoire `src/mocks`).
  - (P0.2) Créer handlers MSW placeholders pour:
    - `POST /v1/connaissance-clients`
    - `GET /v1/connaissance-clients/{id}`
    - `PUT /v1/connaissance-clients/{id}/adresse`
    - `PUT /v1/connaissance-clients/{id}/situation`
    - `DELETE /v1/connaissance-clients/{id}`
    Chaque handler doit accepter `?scenario=` ou header `x-msw-scenario` et renvoyer `success | validation_error | server_error | slow`.
  - (P0.3) Ajouter fixtures JSON minimales (ex: `mocks/fixtures/client-1.json`).
  - Livrable: `src/mocks/handlers/connaissance-client.*.ts` et fixtures.

Phase 1 — Pages & services (2–3 jours)
- Objectif: Créer routes, services et formulaires front pour Nouveau client et Détail client.
- Tâches:
  - (P1.1) Routes: `/clients/new` et `/clients/:id` (ajouter router config).
  - (P1.2) Service API: `ConnaissanceClientApiService` méthodes: `createClient`, `getClient`, `updateAdresse`, `updateSituation`, `deleteClient`.
  - (P1.3) Mapper/DTO: ré-utiliser modèles existants (`ConnaissanceClient`, `Adresse`, `Situation`) — ajouter interfaces si manquantes.
  - (P1.4) Page `clients/new`: implémenter formulaire réactif Angular `ReactiveFormsModule`, validations alignées sur OpenAPI.
  - (P1.5) Page `clients/:id`: container qui charge via facade/service, affiche skeleton / states (loading, empty, error, success).
  - Livrable: pages + service + models + basic CSS aligned with maquette.

Phase 2 — Modals & interactions (1–2 jours)
- Objectif: Implémenter modals pour modifier adresse / situation et supprimer client.
- Tâches:
  - (P2.1) Composants Modals (presentational): `EditAdresseModal`, `EditSituationModal`, `ConfirmDeleteModal`.
  - (P2.2) Container wiring: ouvrir modal depuis page Détail; pré-remplir valeurs; on submit -> call `PUT` -> enforce re-fetch `GET` on success -> close modal -> update UI.
  - (P2.3) Toasts et gestion d'erreur: afficher message sur success / validation error / server error.
  - Livrable: modals + integration tests for re-fetch behavior.

Phase 3 — Tests & qualité (1–2 jours)
- Objectif: Couvrir les composants critiques par tests unitaires et scénarios d'intégration.
- Tâches:
  - (P3.1) Tests unitaires: services (mocks MSW), facades, validation forms.
  - (P3.2) Tests d'intégration: scénario création -> redirect -> detail; modification adresse -> detail updated; suppression -> back to list.
  - (P3.3) Lint, build, et correction des warnings TS strict.
  - Livrable: tests green, coverage minimal définie (ex: composants critiques 80%).

Phase 4 — Polish & handover (0.5 jour)
- Objectif: Ajustements visuels, accessibilité et README.
- Tâches:
  - (P4.1) Vérifier contraste/labels accessibles et keyboard navigation for modals.
  - (P4.2) Mettre à jour `frontend/README.md` quickstart: comment lancer app + msw scenarios.
  - (P4.3) Rédiger une checklist de validation manuelle pour PO.

Implémentation détaillée — tâches atomiques (priorisées)
-------------------------------------------------
1. Create MSW handlers & fixtures (P0.2,P0.3)
2. Add routes & container skeleton for `/clients/new` and `/clients/:id` (P1.1,P1.5)
3. Implement `ConnaissanceClientApiService` with typed responses and error handling (P1.2)
4. Build `clients/new` form with ReactiveForms + validations (P1.4)
5. Build detail page UI + skeletons + state handling (P1.5)
6. Implement EditAdresseModal + flow (P2.1,P2.2)
7. Implement EditSituationModal + flow (P2.1,P2.2)
8. Implement ConfirmDeleteModal + delete flow (P2.1,P2.2)
9. Unit tests for services and form validators (P3.1)
10. Integration tests (P3.2)
11. Polish & accessibility checks (P4.1,P4.2)

MSW & Test Notes
----------------
- Utiliser les mêmes conventions que le dossier `src/mocks` existant pour scénarios et fixtures.
- Pendant tests unitaires, forcer `?scenario=success` ou header `x-msw-scenario: validation_error` selon le cas à tester.

Estimation globale
------------------
- Préparation: 1 jour
- Développement pages & services: 2–3 jours
- Modals & interactions: 1–2 jours
- Tests & polish: 1–2 jours

Risques & mitigations
---------------------
- Risque: différences entre le modèle OpenAPI et la structure des modèles déjà présents. Mitigation: ajouter mappers et tests de mapping.
- Risque: contraintes temporelles — découper tâches en sous-tâches et prioriser `GET`/`PUT` flows.

Livrables attendus
------------------
- Code: services, pages, modals, MSW handlers, fixtures
- Tests: unit + integration
- Documentation: README quickstart, checklist PO

Suivi & artefacts
------------------
- Fichiers ciblés:
  - `specs/002-client-detail-modals/plan.md` (ce document)
  - `specs/002-client-detail-modals/tasks.md` (généré ensuite)
  - `src/mocks/handlers/connaissance-client.*.ts`
  - `src/app/features/client-detail/` (pages, containers, components)

-- Fin du plan --
