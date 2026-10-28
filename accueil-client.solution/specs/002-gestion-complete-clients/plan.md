# Implementation Plan: Gestion complète des clients

**Branch**: `002-gestion-complete-clients` | **Date**: 2026-10-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-gestion-complete-clients/spec.md`

## Summary

Compléter l'application Angular existante avec les parcours de création, détail, modification d'adresse, modification de situation familiale et suppression, en conservant la liste du MVP. Un service de la fonctionnalité clients sera la source de vérité d'une collection mockée en mémoire, partagée entre les routes et réinitialisée au rechargement. Les composants autonomes utiliseront le routage existant, des formulaires Angular et les états locaux déjà établis; aucun appel backend, stockage durable ou nouvel outil n'est prévu. La modification du nom et du prénom reste exclue.

## Technical Context

**Language/Version**: Angular 22.2.x et TypeScript ~6.0.2, déjà présents dans le projet

**Primary Dependencies**: Angular standalone, Router, Forms, RxJS 7.8 et Vitest; aucune dépendance supplémentaire

**Storage**: Collection fictive détenue en mémoire par le service de la fonctionnalité; le jeu initial est restauré après rechargement

**Testing**: Tests Angular/Vitest via `npm test -- --watch=false`; compilation via `npm run build`

**Target Platform**: Navigateurs web modernes, écrans larges et étroits, navigation clavier

**Project Type**: Application web Angular monopage existante

**Performance Goals**: Aucun objectif de latence ou de charge distinct pour ce POC; les opérations locales doivent répondre dans le parcours utilisateur normal

**Constraints**: Aucun appel HTTP ni backend; aucune persistance après rechargement; pas d'authentification, sécurité de production ou CI/CD; modification du nom/prénom exclue; pas de nouvelle dépendance

**Scale/Scope**: Trois parcours de page (liste, création, détail) et deux dialogues de modification plus une confirmation; démonstration mono-navigateur, sans objectif de volumétrie de production

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Vérification | Avant Phase 0 | Après Phase 1 |
|---|---|---|---|
| Simplicité (KISS) | Étendre la fonctionnalité et son service existants; ne pas ajouter de store global, couche repository ni dépendance UI | PASS | PASS |
| Angular et TypeScript à jour | Conserver les versions stables déjà installées; aucun changement de version n'est requis | PASS | PASS |
| Outillage Angular et npm | Réutiliser Angular CLI, npm et le verrou existant; vérifier avec tests et build du projet | PASS | PASS |
| Séparation interface/traitement | Les pages présentent l'état et les intentions; le service et les validateurs portent les mutations et règles de données | PASS | PASS |
| Architecture orientée fonctionnalités | Garder pages, service, modèle et tests sous `src/app/features/clients/`; aucun dossier transversal vide | PASS | PASS |
| Périmètre POC et standalone | Utiliser le routeur et composants standalone existants; aucune API, authentification, sécurité de production ou CI/CD | PASS | PASS |

**Écarts**: Aucun. La validation de cohérence code postal/ville sera simulée dans les tests; aucune intégration au service externe de validation n'est ajoutée au front-end.

## Project Structure

### Documentation (this feature)

```text
specs/002-gestion-complete-clients/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── client-management-ui.md
└── tasks.md
```

### Source Code (repository root)

```text
src/app/
├── app.routes.ts
└── features/clients/
    ├── client-list-page.component.ts|html|css
    ├── client-create-page.component.ts|html|css
    ├── client-detail-page.component.ts|html|css
    ├── client.model.ts
    ├── client-list.mock.ts
    ├── client-list.service.ts
    └── *.spec.ts
```

**Structure Decision**: Compléter l'application et la fonctionnalité `clients` déjà présentes, sans créer un second projet. Garder le service root-provided existant comme source unique de données mockées, lui ajouter les opérations CRUD et des identifiants locaux uniques. Ajouter des routes standalone pour la création (`/clients/new`) et le détail (`/clients/:id`), en déclarant la route de création avant le paramètre d'identifiant; la liste reste la route racine. Les pages conservent des signaux locaux pour chargement, erreur et succès; les formulaires utilisent Angular Forms déjà installé. Les tests restent co-localisés avec les composants et le service.

## Complexity Tracking

Aucune dérogation à la constitution ni complexité additionnelle à justifier.
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
