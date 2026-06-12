# Tasks: Client Detail & Modals

**Input**: Design documents from `specs/002-client-detail-modals/`
**Prerequisites**: `plan.md` (required), `spec.md` (required)

**Tests**: Tests are required by the specification (unit + integration with MSW).

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare folders and shared mock plumbing for the new screens.

- [X] T001 Create feature folder structure for client management in `frontend/src/app/features/client-management/`
- [X] T002 [P] Create feature route placeholders for `/clients/new` and `/clients/:id` in `frontend/src/app/app.routes.ts`
- [X] T003 [P] Add shared MSW scenario resolver utility in `frontend/src/mocks/handlers/scenario.util.ts`
- [X] T004 [P] Add client fixtures for detail/create flows in `frontend/src/mocks/fixtures/connaissance-client.fixtures.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement shared models/services/state needed by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Create shared domain models (`ConnaissanceClient`, `Adresse`, `Situation`) in `frontend/src/app/features/client-management/models/connaissance-client.model.ts`
- [X] T006 Create request/response DTO mappers in `frontend/src/app/features/client-management/services/connaissance-client.mapper.ts`
- [X] T007 Implement API service methods (`createClient`, `getClient`, `updateAdresse`, `updateSituation`, `deleteClient`) in `frontend/src/app/features/client-management/services/connaissance-client-api.service.ts`
- [X] T008 Create detail/create UI state interfaces in `frontend/src/app/features/client-management/models/client-management-state.model.ts`
- [X] T009 Register base MSW handlers for POST/GET/PUT/DELETE client endpoints in `frontend/src/mocks/handlers/connaissance-client-management.handlers.ts`

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Créer un nouveau client (Priority: P1) 🎯 MVP

**Goal**: Allow a conseiller to create a new client from `/clients/new`.

**Independent Test**: From `/clients/new`, submitting valid form data returns `201` and redirects to `/clients/:id` detail.

### Tests for User Story 1

- [X] T010 [P] [US1] Add unit tests for reactive form validation rules in `frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.spec.ts`
- [X] T011 [P] [US1] Add integration test for create-and-redirect flow in `frontend/src/app/features/client-management/containers/client-create-page/client-create-flow.spec.ts`

### Implementation for User Story 1

- [X] T012 [US1] Implement create-page container component logic in `frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.ts`
- [X] T013 [P] [US1] Implement create-page template sections (identite, adresse, situation) in `frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.html`
- [X] T014 [P] [US1] Implement create-page styles aligned with maquette in `frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.scss`
- [X] T015 [US1] Implement create facade flow and submit state management in `frontend/src/app/features/client-management/services/client-create.facade.ts`
- [X] T016 [US1] Wire route entry to create page component in `frontend/src/app/app.routes.ts`
- [X] T017 [US1] Complete POST success/validation/server/slow scenarios in `frontend/src/mocks/handlers/connaissance-client-management.handlers.ts`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Consulter le détail client (Priority: P2)

**Goal**: Display a client detail page from `/clients/:id` with loading and error states.

**Independent Test**: Opening `/clients/:id` loads client details on `200`; displays dedicated messages on `404` and `500`.

### Tests for User Story 2

- [X] T018 [P] [US2] Add unit tests for detail page state transitions (loading/success/error) in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.spec.ts`
- [X] T019 [P] [US2] Add integration test for GET detail scenarios (`200`, `404`, `500`) in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-flow.spec.ts`

### Implementation for User Story 2

- [X] T020 [US2] Implement detail-page container data loading logic in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.ts`
- [X] T021 [P] [US2] Implement detail-page layout/template in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.html`
- [X] T022 [P] [US2] Implement detail-page styles aligned with maquette in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.scss`
- [X] T023 [US2] Implement detail facade (`loadClient`, `retry`) in `frontend/src/app/features/client-management/services/client-detail.facade.ts`
- [X] T024 [US2] Complete GET detail success/not-found/server/slow scenarios in `frontend/src/mocks/handlers/connaissance-client-management.handlers.ts`

**Checkpoint**: User Stories 1 and 2 are independently functional.

---

## Phase 5: User Story 3 - Modifier l'adresse (Priority: P3)

**Goal**: Edit client address via modal and refresh detail from API after successful PUT.

**Independent Test**: From detail page, updating address triggers `PUT /adresse` then mandatory `GET /{id}` re-fetch and updates displayed address.

### Tests for User Story 3

- [X] T025 [P] [US3] Add unit tests for address modal validation in `frontend/src/app/features/client-management/components/edit-address-modal/edit-address-modal.component.spec.ts`
- [X] T026 [P] [US3] Add integration test asserting PUT-then-GET re-fetch sequence in `frontend/src/app/features/client-management/containers/client-detail-page/edit-address-flow.spec.ts`

### Implementation for User Story 3

- [X] T027 [US3] Implement address modal component logic in `frontend/src/app/features/client-management/components/edit-address-modal/edit-address-modal.component.ts`
- [X] T028 [P] [US3] Implement address modal template in `frontend/src/app/features/client-management/components/edit-address-modal/edit-address-modal.component.html`
- [X] T029 [P] [US3] Implement address modal styles in `frontend/src/app/features/client-management/components/edit-address-modal/edit-address-modal.component.scss`
- [X] T030 [US3] Wire address modal open/submit flow from detail page in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.ts`
- [X] T031 [US3] Enforce PUT success -> GET re-fetch behavior in `frontend/src/app/features/client-management/services/client-detail.facade.ts`
- [X] T032 [US3] Complete PUT adresse success/validation/server/slow scenarios in `frontend/src/mocks/handlers/connaissance-client-management.handlers.ts`

**Checkpoint**: Address edition is independently functional and testable.

---

## Phase 6: User Story 4 - Modifier la situation familiale (Priority: P4)

**Goal**: Edit client family situation via modal and refresh detail from API after successful PUT.

**Independent Test**: From detail page, updating situation triggers `PUT /situation` then mandatory `GET /{id}` re-fetch and updates chips/count.

### Tests for User Story 4

- [X] T033 [P] [US4] Add unit tests for situation modal validation in `frontend/src/app/features/client-management/components/edit-situation-modal/edit-situation-modal.component.spec.ts`
- [X] T034 [P] [US4] Add integration test asserting PUT-then-GET re-fetch sequence in `frontend/src/app/features/client-management/containers/client-detail-page/edit-situation-flow.spec.ts`

### Implementation for User Story 4

- [X] T035 [US4] Implement situation modal component logic in `frontend/src/app/features/client-management/components/edit-situation-modal/edit-situation-modal.component.ts`
- [X] T036 [P] [US4] Implement situation modal template in `frontend/src/app/features/client-management/components/edit-situation-modal/edit-situation-modal.component.html`
- [X] T037 [P] [US4] Implement situation modal styles in `frontend/src/app/features/client-management/components/edit-situation-modal/edit-situation-modal.component.scss`
- [X] T038 [US4] Wire situation modal open/submit flow from detail page in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.ts`
- [X] T039 [US4] Enforce PUT situation success -> GET re-fetch behavior in `frontend/src/app/features/client-management/services/client-detail.facade.ts`
- [X] T040 [US4] Complete PUT situation success/validation/server/slow scenarios in `frontend/src/mocks/handlers/connaissance-client-management.handlers.ts`

**Checkpoint**: Situation edition is independently functional and testable.

---

## Phase 7: User Story 5 - Supprimer un client (Priority: P5)

**Goal**: Delete a client through confirmation modal and return to list.

**Independent Test**: Confirm delete from detail page calls `DELETE /{id}`, redirects to list, and removed client no longer appears.

### Tests for User Story 5

- [X] T041 [P] [US5] Add unit tests for confirmation modal behaviors in `frontend/src/app/features/client-management/components/confirm-delete-modal/confirm-delete-modal.component.spec.ts`
- [X] T042 [P] [US5] Add integration test for delete-and-redirect flow in `frontend/src/app/features/client-management/containers/client-detail-page/delete-client-flow.spec.ts`

### Implementation for User Story 5

- [X] T043 [US5] Implement confirm delete modal component in `frontend/src/app/features/client-management/components/confirm-delete-modal/confirm-delete-modal.component.ts`
- [X] T044 [P] [US5] Implement confirm delete modal template and styles in `frontend/src/app/features/client-management/components/confirm-delete-modal/confirm-delete-modal.component.html`
- [X] T045 [US5] Wire delete modal open/confirm flow and navigation to list in `frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.ts`
- [X] T046 [US5] Implement delete action and redirect state handling in `frontend/src/app/features/client-management/services/client-detail.facade.ts`
- [X] T047 [US5] Complete DELETE success/server/slow scenarios and list fixture mutation in `frontend/src/mocks/handlers/connaissance-client-management.handlers.ts`

**Checkpoint**: Delete flow is independently functional and testable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Quality, accessibility, and documentation across all stories.

- [X] T048 [P] Add accessibility improvements (focus trap, aria labels, keyboard nav) in `frontend/src/app/features/client-management/components/`
- [X] T049 Update quickstart and usage docs for new pages/modals and MSW scenarios in `specs/002-client-detail-modals/quickstart.md`
- [X] T050 Run and fix all frontend tests/lint for new feature in `frontend/src/app/features/client-management/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3-7)**: Depend on Foundational completion; execute by priority (`US1` -> `US5`) or in parallel if staffed
- **Polish (Phase 8)**: Depends on desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependency on other stories
- **US2 (P2)**: Starts after Foundational; uses shared service/models only
- **US3 (P3)**: Depends on US2 detail page availability
- **US4 (P4)**: Depends on US2 detail page availability
- **US5 (P5)**: Depends on US2 detail page availability

### Within Each User Story

- Tests first (create failing tests before implementation)
- Component/state implementation before wiring and MSW completion
- Story is complete only when independent test criterion passes

---

## Parallel Opportunities

- Setup: `T002`, `T003`, `T004` can run in parallel after `T001`
- Foundational: `T006` and `T008` can proceed in parallel after `T005`
- US1: `T010` and `T011` in parallel; `T013` and `T014` in parallel
- US2: `T018` and `T019` in parallel; `T021` and `T022` in parallel
- US3: `T025` and `T026` in parallel; `T028` and `T029` in parallel
- US4: `T033` and `T034` in parallel; `T036` and `T037` in parallel
- US5: `T041` and `T042` in parallel

---

## Parallel Example: User Story 1

```bash
# Tests in parallel
T010 frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.spec.ts
T011 frontend/src/app/features/client-management/containers/client-create-page/client-create-flow.spec.ts

# UI files in parallel
T013 frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.html
T014 frontend/src/app/features/client-management/containers/client-create-page/client-create-page.component.scss
```

## Parallel Example: User Story 2

```bash
# Tests in parallel
T018 frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.spec.ts
T019 frontend/src/app/features/client-management/containers/client-detail-page/client-detail-flow.spec.ts

# View and style in parallel
T021 frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.html
T022 frontend/src/app/features/client-management/containers/client-detail-page/client-detail-page.component.scss
```

## Parallel Example: User Story 3

```bash
# Modal markup and style in parallel
T028 frontend/src/app/features/client-management/components/edit-address-modal/edit-address-modal.component.html
T029 frontend/src/app/features/client-management/components/edit-address-modal/edit-address-modal.component.scss
```

## Parallel Example: User Story 4

```bash
# Modal markup and style in parallel
T036 frontend/src/app/features/client-management/components/edit-situation-modal/edit-situation-modal.component.html
T037 frontend/src/app/features/client-management/components/edit-situation-modal/edit-situation-modal.component.scss
```

## Parallel Example: User Story 5

```bash
# Modal tests in parallel
T041 frontend/src/app/features/client-management/components/confirm-delete-modal/confirm-delete-modal.component.spec.ts
T042 frontend/src/app/features/client-management/containers/client-detail-page/delete-client-flow.spec.ts
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Complete Phase 3 (US1)
4. Validate independent test criterion for US1

### Incremental Delivery

1. Deliver US1 (create flow)
2. Deliver US2 (detail consultation)
3. Deliver US3 (edit address with mandatory re-fetch)
4. Deliver US4 (edit situation with mandatory re-fetch)
5. Deliver US5 (delete flow)
6. Finalize polish and docs

### Suggested MVP Scope

- MVP demo scope: **US1 only** (create and redirect to detail)
- Functional MVP+ scope: **US1 + US2** (create + consultation)
