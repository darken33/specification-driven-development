<!-- 
  Sync Impact Report for Accueil Client Constitution v1.0.0
  - Initial constitution creation for Angular/TypeScript frontend POC
  - Version: 1.0.0 (MINOR: Initial principles established)
  - Ratified: 2026-05-09
  - Last Amended: 2026-05-09
  - Principles defined: 3 core principles + scope exclusions
  - Templates to review: plan-template.md, spec-template.md, tasks-template.md
-->

# Accueil Client Constitution

## Core Principles

### I. Modern Frontend Stack (Angular + TypeScript Latest)
MUST use Angular (v18+) and TypeScript (v5.4+) with latest stable versions. All code
must follow TypeScript strict mode (`strict: true` in tsconfig). Component-based
architecture leveraging Angular's dependency injection, reactive forms, and RxJS
observables. Type safety is non-negotiable: all functions and variables must have
explicit type annotations.

**Rationale**: Latest versions provide best security, performance, and developer
experience. Strict TypeScript prevents runtime errors and ensures maintainability for
a POC that may evolve.

### II. Separation of Concerns (UI vs Business Logic)
MUST clearly separate presentation layer (components) from business logic (services).
Components are responsible ONLY for user interactions and view rendering. Services
handle data access, API communication, and business operations. Smart components
communicate with services via dependency injection; dumb components receive data via
`@Input` and emit events via `@Output`.

**Rationale**: Enables testing, reusability, and clarity. Business logic decoupled
from UI allows future backend integration or API changes without component
modifications.

### III. Simplicity First (KISS Principle)
MUST favor simple, readable solutions over clever abstractions. Do not implement
patterns or features that aren't currently needed (YAGNI - You Aren't Gonna Need It).
Code organization: intuitive folder structure (`src/app/components/`, `src/app/services/`,
etc.); minimal nesting; self-documenting naming conventions. If a feature requires
explanation, it's too complex.

**Rationale**: POC phase values speed and clarity. Premature abstraction creates
technical debt. When requirements stabilize, refactoring toward patterns is simpler
than unwinding over-engineered code.

## Scope Exclusions

The following aspects are **OUT OF SCOPE** for this POC and MUST NOT be implemented:

- **Authentication & Security**: No JWT validation, role-based access control, or
  encrypted data handling. Backend assumes trusted environment.
- **CI/CD Pipelines**: No automated testing, deployment, or release workflows. Manual
  builds and deployments only.

These exclusions reflect POC constraints and may be addressed in production evolution.

## Component Organization

Organize code according to this structure:

```
src/app/
  ├── components/          # Presentational components
  │   ├── home/           # Home page module
  │   ├── client-list/    # Client list component
  │   └── client-card/    # Reusable client card component
  ├── services/           # Business logic & API services
  │   └── client.service.ts
  ├── models/             # TypeScript interfaces/types
  ├── app.component.ts    # Root component
  └── app.module.ts       # App module (imports, declarations)
```

Each component folder contains: `.component.ts`, `.component.html`, `.component.css`,
`.component.spec.ts`. Services are singletons providing centralized API access.

## Development Workflow

1. **Feature Planning**: Every feature starts as a specification in `.specify/` artifacts
   (spec.md, plan.md, tasks.md).
2. **Implementation**: Follow tasks in priority order. Write component + service in
   parallel where possible.
3. **Testing**: Unit tests for services (business logic). Component tests verify UI
   rendering and event binding.
4. **Review Checklist**:
   - Code follows folder structure and naming conventions
   - Components contain no API calls or complex logic (delegated to services)
   - All functions/variables typed explicitly
   - No console.log left in production code
   - Feature integrates with existing modules without breaking changes

## Governance

This constitution is the single source of truth for architectural decisions. All code,
design, and technical choices MUST comply with these principles. Deviations require
explicit documentation and rationale in commit messages or ADR (Architecture Decision
Record) files if complexity warrants.

**Amendment Process**: Constitution changes require rationale and impact analysis on
dependent templates (plan-template.md, spec-template.md, tasks-template.md).

**Version**: 1.0.0 | **Ratified**: 2026-05-09 | **Last Amended**: 2026-05-09
