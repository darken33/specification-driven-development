# Tasks: MVP Client List

**Input**: Design documents from `/specs/001-mvp-client-list/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`

**Tests**: Tests are required by the specification (`FR-007`).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize frontend workspace and baseline tooling for Angular + TypeScript MVP.

- [X] T001 Create frontend Angular workspace and base config in `frontend/package.json`
- [X] T002 Configure TypeScript strict settings in `frontend/tsconfig.json`
- [X] T003 [P] Configure ESLint and Prettier in `frontend/.eslintrc.json` and `frontend/.prettierrc`
- [X] T004 [P] Add application shell and routing bootstrap in `frontend/src/main.ts` and `frontend/src/app/app.routes.ts`
- [X] T005 [P] Create feature folder skeleton for client list in `frontend/src/app/features/client-list/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build shared foundations required before implementing user story screens.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 Define API/domain models (`ConnaissanceClient`, `ClientListItemVM`, `ClientListState`) in `frontend/src/app/features/client-list/models/connaissance-client.model.ts`
- [X] T007 [P] Implement API adapter service contract in `frontend/src/app/features/client-list/services/client-list-api.service.ts`
- [X] T008 [P] Setup MSW handlers for list scenarios in `frontend/src/mocks/handlers/connaissance-client.handlers.ts`
- [X] T009 [P] Wire MSW startup for development mode in `frontend/src/mocks/browser.ts` and `frontend/src/main.ts`
- [X] T010 Implement mapper from `ConnaissanceClient` to `ClientListItemVM` in `frontend/src/app/features/client-list/services/client-list.mapper.ts`
- [X] T011 Implement stateful facade/orchestrator for loading-empty-error flows in `frontend/src/app/features/client-list/services/client-list.facade.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Afficher la liste des clients (Priority: P1) 🎯 MVP

**Goal**: Display clients on home page from mock backend with loading, empty, and error states.

**Independent Test**: Run app locally with MSW and validate non-empty, empty, and error scenarios without backend.

### Tests for User Story 1 (required)

- [X] T012 [P] [US1] Unit test API service success/error behavior in `frontend/src/app/features/client-list/services/client-list-api.service.spec.ts`
- [X] T013 [P] [US1] Unit test facade state transitions (`loading/success/empty/error`) in `frontend/src/app/features/client-list/services/client-list.facade.spec.ts`
- [X] T014 [P] [US1] Unit test presentational list component rendering in `frontend/src/app/features/client-list/components/client-list/client-list.component.spec.ts`
- [X] T015 [P] [US1] Integration test container with mocked API scenarios in `frontend/src/app/features/client-list/containers/client-list-page/client-list-page.component.spec.ts`

### Implementation for User Story 1

- [X] T016 [P] [US1] Implement presentational list component in `frontend/src/app/features/client-list/components/client-list/client-list.component.ts`
- [X] T017 [P] [US1] Implement loading/empty/error UI states component in `frontend/src/app/features/client-list/components/client-list-state/client-list-state.component.ts`
- [X] T018 [US1] Implement container page orchestration in `frontend/src/app/features/client-list/containers/client-list-page/client-list-page.component.ts`
- [X] T019 [US1] Add home route for client list page in `frontend/src/app/app.routes.ts`
- [X] T020 [US1] Add navigation stub to client detail route in `frontend/src/app/features/client-list/containers/client-list-page/client-list-page.component.ts`
- [X] T021 [US1] Add retry action handling for error state in `frontend/src/app/features/client-list/containers/client-list-page/client-list-page.component.ts`
- [X] T022 [US1] Add mock scenario toggles (success-non-empty/success-empty/error-500) in `frontend/src/mocks/handlers/connaissance-client.handlers.ts`

**Checkpoint**: User Story 1 is independently functional and demonstrable

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, quality, and documentation for MVP handoff.

- [X] T023 [P] Update frontend README run/test instructions in `frontend/README.md`
- [X] T024 [P] Add UX copy consistency and accessibility labels in `frontend/src/app/features/client-list/components/client-list-state/client-list-state.component.html`
- [X] T025 Validate quickstart flow and align notes in `specs/001-mvp-client-list/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks User Story 1
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **Polish (Phase 4)**: Depends on User Story 1 completion

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2 and has no dependency on other stories

### Within User Story 1

- Tests first (T012-T015), then components/services integration (T016-T022)
- Presentational components (T016-T017) before final page orchestration polish (T018-T021)

### Parallel Opportunities

- Setup parallel: T003, T004, T005
- Foundational parallel: T007, T008, T009
- US1 tests parallel: T012, T013, T014, T015
- US1 UI components parallel: T016, T017
- Polish parallel: T023, T024

---

## Parallel Example: User Story 1

```bash
# Run US1 tests in parallel workstreams
Task: T012 in frontend/src/app/features/client-list/services/client-list-api.service.spec.ts
Task: T013 in frontend/src/app/features/client-list/services/client-list.facade.spec.ts
Task: T014 in frontend/src/app/features/client-list/components/client-list/client-list.component.spec.ts
Task: T015 in frontend/src/app/features/client-list/containers/client-list-page/client-list-page.component.spec.ts

# Build UI components in parallel
Task: T016 in frontend/src/app/features/client-list/components/client-list/client-list.component.ts
Task: T017 in frontend/src/app/features/client-list/components/client-list-state/client-list-state.component.ts
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup)
2. Complete Phase 2 (Foundational)
3. Implement and validate Phase 3 (US1)
4. Stop and demo MVP before extending to post-MVP endpoints

### Incremental Delivery

1. Deliver list page with mocked backend scenarios
2. Stabilize tests and UX states
3. Proceed to future stories (create/detail/update/delete) in next spec increment
