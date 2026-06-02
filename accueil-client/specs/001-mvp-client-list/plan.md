# Implementation Plan: MVP Client List

**Branch**: `001-mvp-client-list` | **Date**: 2026-06-02 | **Spec**: `specs/001-mvp-client-list/spec.md`

**Input**: Feature specification from `/specs/001-mvp-client-list/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Construire le MVP frontend Angular qui affiche la liste des clients depuis un backend mocke, avec gestion des etats chargement/succes-vide/succes-non-vide/erreur. L'approche retient une architecture simple feature-first avec separation stricte UI/traitement, `Mock Service Worker (MSW)` pour simuler les endpoints REST, et typage TypeScript base sur le contrat OpenAPI `ConnaissanceClient`.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (latest stable at kickoff, cible TS 5.x) + Angular (latest stable at kickoff)

**Primary Dependencies**: Angular, RxJS, Angular Router, MSW (mock API), ESLint, Prettier

**Storage**: N/A (frontend POC sans persistence locale obligatoire)

**Testing**: Angular TestBed + Jasmine/Karma (ou Jest selon scaffold), tests unitaires composants et services

**Target Platform**: Web moderne (desktop/laptop), navigateur Chromium/Firefox recents

**Project Type**: Web application frontend (SPA Angular)

**Performance Goals**: Affichage initial de la liste en < 3s en local avec mock standard; interactions fluides a 60fps cible UX

**Constraints**: KISS strict, separation UI/traitement obligatoire, backend reel indisponible (mock requis), auth/securite et CI/CD hors scope

**Scale/Scope**: MVP = 1 ecran (accueil/liste clients) + navigation stub detail; architecture preparee pour couvrir ensuite tous les endpoints OpenAPI

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Modern Stack: PASS. Le plan impose Angular/TypeScript latest stable au demarrage.
- Gate 2 - KISS: PASS. MVP limite a la liste clients, pas de couche inutile.
- Gate 3 - Separation UI/Traitement: PASS. Containers/presentation + services dedies.
- Gate 4 - Testabilite et retour rapide: PASS. Tests unitaires obligatoires sur service et vue liste.
- Gate 5 - Minimalisme pragmatique: PASS. Dependances minimales; MSW retenu pour simuler REST.

Resultat pre-Phase-0: PASS (aucune violation necessitant justification).

## Project Structure

### Documentation (this feature)

```text
specs/001-mvp-client-list/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── frontend-api-consumer.md
└── tasks.md
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
frontend/
├── src/
│   ├── app/
│   │   ├── features/
│   │   │   └── client-list/
│   │   │       ├── components/
│   │   │       ├── containers/
│   │   │       ├── services/
│   │   │       └── models/
│   │   ├── shared/
│   │   └── app.routes.ts
│   ├── assets/
│   │   └── mocks/
│   └── main.ts
└── tests/
  ├── unit/
  └── integration/
```

**Structure Decision**: architecture web frontend dediee (`frontend/`) avec structuration par feature. Ce choix respecte la separation UI/traitement et permet d'etendre ensuite le scope aux ecrans detail/nouveau/popups sans casser le MVP.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Post-Design Constitution Check

- Gate 1 - Modern Stack: PASS. Tech stack ciblee Angular/TypeScript latest stable.
- Gate 2 - KISS: PASS. MVP borne a la liste et etats principaux.
- Gate 3 - Separation UI/Traitement: PASS. Contrat de composants presentational + services.
- Gate 4 - Testabilite et retour rapide: PASS. Tests unitaires au coeur de la definition.
- Gate 5 - Minimalisme pragmatique: PASS. MSW retenu, pas d'ajout de framework de state management lourd au MVP.

Resultat post-Phase-1: PASS.
