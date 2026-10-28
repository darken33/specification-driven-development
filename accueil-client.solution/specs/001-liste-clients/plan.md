# Implementation Plan: Liste des clients

**Branch**: `001-liste-clients` | **Date**: 2026-10-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-liste-clients/spec.md`

## Summary

Créer le socle minimal d'une application Angular standalone et sa page d'accueil « Liste des clients ». La page affichera chaque fiche d'un jeu mocké déterministe, avec des états explicites de chargement, liste vide et erreur (réessayable), une présentation responsive et des actions futures visuellement indisponibles. Aucun appel au backend ni parcours de création/détail/modification/suppression ne sera implémenté dans ce MVP.

## Technical Context

**Language/Version**: TypeScript, version stable compatible avec la version stable d'Angular retenue par Angular CLI au moment du scaffold

**Primary Dependencies**: Angular standalone et Angular CLI; aucune dépendance UI ou de gestion d'état supplémentaire prévue

**Storage**: Aucun; données fictives en mémoire, sans persistance

**Testing**: Tests Angular ciblés via `ng test`; validation de compilation via `ng build`

**Target Platform**: Application web navigateur, écrans larges et étroits, navigation clavier

**Project Type**: Application frontend web Angular (socle applicatif absent du dépôt à ce stade)

**Performance Goals**: Présenter l'état demandé en moins de 2 secondes dans au moins 95 % des ouvertures normales avec le mock (SC-002)

**Constraints**: Pas de backend; une seule page d'accueil; mock stable d'au moins cinq fiches; états chargement/vide/erreur/réessai testables sans service distant; aucune commande active ne mène à une route absente

**Scale/Scope**: Une route/page et une fonctionnalité clients; liste de toute taille raisonnable avec défilement; pas de recherche, tri, filtre, pagination, authentification ou persistance

## Constitution Check

*GATE: Must pass before Phase 0 research and after Phase 1 design.*

| Principe | Vérification | Résultat |
|---|---|---|
| Simplicité (KISS) | Socle Angular CLI minimal; aucun store global, dépendance UI ou couche de repository sans besoin établi | PASS |
| Angular et TypeScript à jour | Utiliser une version stable prise en charge par la matrice officielle Angular/TypeScript lors du scaffold; pas de version préliminaire | PASS |
| Outillage Angular et npm en priorité | Scaffold Angular CLI; dépendances et commandes via npm, verrou npm maintenu | PASS |
| Séparation interface/traitement | Le composant présente l'état; le service de liste et le mock fournissent les données de façon testable | PASS |
| Architecture orientée fonctionnalités | Page et service regroupés dans `features/clients`; aucun dossier transversal vide | PASS |
| Périmètre POC | Pas d'authentification, sécurité de production ni CI/CD; mock uniquement pour ce MVP | PASS |

**Écarts**: Aucun. Les cinq opérations futures du contrat restent documentées comme cible de l'application, mais seul le parcours de consultation de la liste est inclus.

## Project Structure

### Documentation (this feature)

```text
specs/001-liste-clients/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── client-list-ui.md
```

### Source Code (project root)

```text
src/
├── app/
│   ├── app.routes.ts
│   ├── app.component.ts
│   └── features/
│       └── clients/
│           ├── client-list-page.component.ts
│           ├── client-list-page.component.html
│           ├── client-list-page.component.css
│           ├── client-list.service.ts
│           ├── client.model.ts
│           └── client-list.mock.ts
└── ...
```

Les tests ciblés seront co-localisés avec les éléments concernés (`*.spec.ts`). Le composant d'accueil exposera les états et intentions de l'interface; le service fournira la liste mockée et restera remplaçable par un double de test. L'interface n'ajoutera pas de route ni de comportement pour les fonctions hors MVP.

**Structure Decision**: Application web standalone Angular, structurée par fonctionnalité sous `src/app/features/clients/`, conformément à la constitution. Comme le dépôt ne contient pas encore de manifeste npm ni de code applicatif, le scaffold Angular minimal fait partie du périmètre d'implémentation.

## Complexity Tracking

Aucune dérogation à la constitution ni complexité additionnelle à justifier.
