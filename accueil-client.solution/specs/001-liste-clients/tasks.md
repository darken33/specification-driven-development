# Tasks: Liste des clients

**Input**: Design documents from `specs/001-liste-clients/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/client-list-ui.md`, `quickstart.md`

**Tests**: Included because the plan and quickstart require targeted Angular tests and validation of the mock-driven states.

**Organization**: Tasks are grouped by user story so each increment can be implemented and checked independently.

## Phase 1: Setup

**Purpose**: Create the Angular application foundation, which is not present in the project yet.

- [X] T001 Scaffold a standalone Angular application with Angular CLI and npm in the project root, creating `package.json`, `package-lock.json`, `angular.json`, and `src/`.

## Phase 2: Foundational

**Purpose**: No additional shared blocking work is needed; the standalone bootstrap, TypeScript configuration, and test runner are provided by the Angular CLI scaffold in T001.

**Checkpoint**: The Angular project scaffold is ready; feature work can begin.

## Phase 3: User Story 1 - Consulter la liste des clients (Priority: P1) 🎯 MVP

**Goal**: Render the deterministic mock client list on the home page, including each client's identity and location, without enabling journeys outside the MVP.

**Independent Test**: Load the home page with a mock of at least five clients and verify that every entry appears once, in received order, with name, first name, postal code, and city. Also verify the single-client case and that unavailable actions do not navigate.

### Tests for User Story 1

- [X] T002 [P] [US1] Add service tests for the stable mock dataset, preserving received order and representing every entry once, in `src/app/features/clients/client-list.service.spec.ts`.
- [X] T003 [P] [US1] Add home-page tests for the title, client-card fields, five-or-more entries, single-client rendering, and unavailable create/detail actions in `src/app/features/clients/client-list-page.component.spec.ts`.

### Implementation for User Story 1

- [X] T004 [P] [US1] Define the client type in `src/app/features/clients/client.model.ts` from `data-model.md`: `id` is facultative; `nom`, `prenom`, `ligne1`, `codePostal`, `ville`, `situationFamiliale`, and `nombreEnfants` are required by the OpenAPI; `ligne2` is facultative; keep `codePostal` a string and `nombreEnfants` an integer.
- [X] T005 [US1] Add at least five stable, fictional client records in `src/app/features/clients/client-list.mock.ts`, conforming to the client type and preserving their display order.
- [X] T006 [US1] Implement the in-memory list service in `src/app/features/clients/client-list.service.ts`, returning the mock without HTTP, persistence, or deduplication by optional `id`, and allowing tests to replace its response.
- [X] T007 [US1] Implement the page component logic in `src/app/features/clients/client-list-page.component.ts` to load and expose the client entries to the view.
- [X] T008 [US1] Build the home-page markup in `src/app/features/clients/client-list-page.component.html` with the « Liste des clients » title, client cards, readable identity/location hierarchy, and no active create/detail navigation.
- [X] T009 [US1] Style the home page in `src/app/features/clients/client-list-page.component.css` to reflect the essential mockup cues, adapt cards to narrow screens, and avoid horizontal page scrolling.
- [X] T010 [US1] Connect the home page to the root route and standalone app shell in `src/app/app.routes.ts` and `src/app/app.component.ts`.

**Checkpoint**: The P1 list is independently demonstrable using the in-memory mock; tests cover its nominal and single-entry cases.

## Phase 4: User Story 2 - Comprendre l'état de la liste (Priority: P2)

**Goal**: Clearly distinguish loading, successful empty results, and load errors; allow a retry and render missing display values honestly.

**Independent Test**: Provide controlled mock responses for loading, empty, error, and retry-success; verify the corresponding message/action, ensure an error is never presented as an empty success, and check a missing display value renders « Non renseigné ».

### Tests for User Story 2

- [X] T011 [US2] Add state tests in `src/app/features/clients/client-list-state.spec.ts` for loading, empty success, error, retry followed by success, and missing display values, using a replaceable service response and no backend.

### Implementation for User Story 2

- [X] T012 [US2] Implement explicit loading, success, empty, and error states plus retry behavior in `src/app/features/clients/client-list-page.component.ts`; keep an error distinct from an empty successful result.
- [X] T013 [US2] Render the loading, empty, and error messages and retry control in `src/app/features/clients/client-list-page.component.html`; use accessible state/error announcements and display « Non renseigné » for missing card values.

**Checkpoint**: All four service outcomes—loading, non-empty success, empty success, and error/retry—are distinguishable and testable independently of a backend.

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Verify the finished MVP against the feature quickstart and responsive/accessibility expectations.

- [X] T014 Run `npx ng test --watch=false` and `npx ng build` from the project root; resolve failures in `src/app/features/clients/` and confirm the quickstart scenarios in `specs/001-liste-clients/quickstart.md`, including narrow-screen and keyboard use.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; creates the Angular project.
- **Foundational (Phase 2)**: Angular CLI output from Phase 1 is the complete shared foundation; no extra task is needed.
- **User Story 1 (Phase 3)**: Depends on the scaffold; delivers the MVP list and mock.
- **User Story 2 (Phase 4)**: Depends on User Story 1 because it extends the page and service interaction already created there.
- **Polish (Phase 5)**: Depends on both user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Starts after the scaffold; no dependency on another user story.
- **US2 (P2)**: Starts after US1; it extends the existing list page with additional states and retry.

### Within Each User Story

- For US1, write the targeted tests before implementation; define the model before creating the mock and service; implement page logic before wiring its template, styles, and root route.
- For US2, write the state tests before implementing the state transitions and their accessible presentation.

### Parallel Opportunities

- After T001, T002 and T003 can be authored in parallel because they cover separate spec files.
- T004 can be developed alongside T002 and T003 because it is a separate model file; T005 must follow T004.
- In US2, no implementation task is parallelized because the state template depends on the state contract introduced in the page component.

## Parallel Example: User Story 1

```text
After T001, work on these independent test files in parallel:
Task: T002 — src/app/features/clients/client-list.service.spec.ts
Task: T003 — src/app/features/clients/client-list-page.component.spec.ts
The client type in T004 can be developed alongside them in:
src/app/features/clients/client.model.ts
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 to scaffold the standalone Angular application.
2. Complete Phase 3 to deliver and independently test the mock-backed client list.
3. Stop and validate the P1 home-page experience before adding further states.

### Incremental Delivery

1. Scaffold the project.
2. Deliver US1 as the MVP, with its nominal list and single-entry tests.
3. Add US2 loading, empty, error, retry, and missing-value handling.
4. Run the tests, build, and quickstart checks in T014.
