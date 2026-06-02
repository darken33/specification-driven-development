# Sync Impact Report
<!--
Version change: UNKNOWN -> 0.1.0
Modified principles:
- [PRINCIPLE_1_NAME] -> Modern Stack (Angular & TypeScript)
- [PRINCIPLE_2_NAME] -> KISS (Keep It Simple, Stupid)
- [PRINCIPLE_3_NAME] -> Séparation UI / Traitement
Added sections:
- Architecture Overview
- Project Structure
- Development Workflow
Removed sections: none
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated
- .specify/templates/spec-template.md: ✅ updated
- .specify/templates/tasks-template.md: ✅ updated
Follow-up TODOs:
- RATIFICATION_DATE: TODO(RATIFICATION_DATE): date d'adoption initiale inconnue
-->

# Accueil Client Frontend Constitution

## Core Principles

### Modern Stack (Angular & TypeScript)
Tous les nouveaux travaux POC doivent utiliser les versions stables les plus récentes d'Angular et de TypeScript disponibles au moment de l'initialisation du projet. Le projet MUST déclarer explicitement les versions dans `package.json` et `tsconfig.json`, et SHOULD documenter la date de vérification des versions dans le plan de mise en route.

Rationale: profiter des dernières améliorations de productivité, sécurité et typage tout en restant explicite sur la version utilisée.

### KISS (Keep It Simple, Stupid)
Privilégier la simplicité : les solutions MUST rester simples, lisibles et faciles à modifier. Les implémentations MUST éviter l'optimisation prématurée, les abstractions génériques inutiles et la sur-ingénierie. Chaque ajout de complexité MUST être justifié dans un court commentaire de conception.

Rationale: POC = valider des idées rapidement; la simplicité accélère l'itération et la compréhension.

### Séparation UI / Traitement (Séparation des responsabilités)
L'interface utilisateur (composants Angular, templates, styles) MUST être strictement séparée de la logique métier et des appels réseau (services, use-cases, domain). Les composants MUST rester « dumb/presentational » autant que possible : ils reçoivent des données via `@Input()` et émettent des événements via `@Output()`; la logique MUST résider dans des services ou des classes de domaine testables.

Rationale: facilite le test unitaire, le remplacement des vues et la réutilisabilité du code métier.

### Testabilité et Retour Rapide
Les unités critiques MUST être couvertes par des tests unitaires simples (Jasmine/Karma ou Jest). Les tests d'intégration pour les services POC sont recommandés lorsque utiles. Les tests MUST être rapides et focalisés sur la valeur démontrée par le POC.

Rationale: même pour un POC, prouver que le comportement attendu est vérifiable réduit le risque d'interprétation erronée.

### Minimalisme Pragmatique
Favoriser des dépendances minimales et des API claires. Les modules et bibliothèques externes MUST être ajoutés uniquement s'ils réduisent significativement le coût d'implémentation et ne complexifient pas l'architecture.

Rationale: réduit la maintenance et les risques liés aux versions lors d'expérimentations rapides.

## Architecture Overview

Objectif: Définir une architecture front-end simple, modulaire et conforme aux principes ci-dessus pour un POC Angular.

- Pattern recommandé: Component-Driven + Feature Modules
- Présentation: `components/` (dumb components), `containers/` (smart components si nécessaire), `services/` (API & business logic), `models/` (types et interfaces), `state/` (si un store est utilisé, préférer une solution minimale)
- Communication: Services injectable pour accès aux API; Observables (`RxJS`) pour flux asynchrones; évitez les singletons globaux non testés.

Dependencies minimales:
- Angular CLI (dernier stable)
- TypeScript (dernier stable)
- RxJS (aligné avec Angular)
- Outils de qualité: ESLint, Prettier, Husky (optionnel pour commits local)

Notes POC: configuration et scripts de build peuvent rester basiques; pas d'effort de production (optimisation, sécurité) requis au-delà de la démonstration fonctionnelle.

## Project Structure

Structure recommandée (POC simple):

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── containers/
│   │   ├── features/
│   │   ├── services/
│   │   ├── models/
│   │   └── app.module.ts
│   ├── assets/
│   └── main.ts
├── angular.json
├── package.json
└── tsconfig.json
```

Conventions clés:
- `components/`: petits composants présentational, tests unitaires rapides
- `features/`: modules par fonctionnalité pour isolation
- `services/`: logique métier & intégration API
- Types et interfaces centralisées dans `models/`

Exclusions explicites (POC):
- Authentification et sécurité: NON gérées ici
- Pipelines CI/CD: NON définis pour ce POC

## Development Workflow

- Initialisation: `ng new` ou démarrage minimal via `angular.json`/`package.json` en spécifiant versions
- Lint & format: configurer ESLint + Prettier localement
- Tests: `ng test` ou `jest` pour tests unitaires rapides
- Démarrage local: `npm install` puis `npm start` (ou `ng serve`)

Contributions POC:
- Petites branches thématiques, commits atomiques
- Code review légère: vérifier conformité aux principes KISS et séparation UI/traitement

## Quality Gates (POC)

- La porte d'entrée pour la validation d'une itération POC est la démonstration fonctionnelle et des tests unitaires couvrant les règles métier critiques.
- Complexité additionnelle MUST être justifiée par un court paragraphe dans la PR/description.

## Governance

1. Portée: Cette constitution définit les règles minimales à suivre pour les itérations front-end de type POC dans ce dépôt. Elle prime sur les pratiques locales non documentées.
2. Amendements: Toute modification de cette constitution MUST être documentée dans une PR décrivant le changement, la raison et l'impact. Les amendements mineurs (typos, clarifications) incrémentent le patch; ajouts de principes incrémentent le minor; changements incompatibles incrémentent le major.
3. Conformité: Les PRs doivent référencer cette constitution et expliquer, si nécessaire, pourquoi une règle a été contournée.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): date d'adoption initiale inconnue | **Last Amended**: 2026-06-02
