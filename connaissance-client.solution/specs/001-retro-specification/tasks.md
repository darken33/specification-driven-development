---

description: "Tâches de production de la rétro-spécification Connaissance Client"
---

# Tasks: Rétro-spécification du système Connaissance Client

**Input**: Documents de conception dans `/specs/001-retro-specification/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Aucun test applicatif nouveau n'est demandé. Les tests existants sont consultés comme éléments de preuve; les validations documentaires sont dans la phase Polish.

**Organization**: Tâches groupées par parcours utilisateur pour permettre la validation incrémentale des livrables.

## Format

- `[P]` indique des tâches sur des fichiers distincts, sans dépendance inachevée.
- `[US1]`, `[US2]` et `[US3]` relient les tâches aux parcours de `spec.md`.
- Chaque tâche indique son chemin de fichier exact.

## Phase 1: Setup

**Purpose**: Préparer le livrable principal de rétro-spécification.

- [X] T001 Créer l'ossature de la rétro-spécification avec sections périmètre, architecture, parcours, données, contrats, sécurité/résilience, écarts et références dans `specs/001-retro-specification/retro-specification.md`

---

## Phase 2: Foundational

**Purpose**: Fixer l'inventaire des sources et la convention de traçabilité avant les analyses par parcours.

- [X] T002 Compléter l'inventaire des sources faisant autorité et leur rôle (contrats, modèles, code, configuration, tests) dans `specs/001-retro-specification/research.md`

**Checkpoint**: Les livrables distinguent les contrats et modèles sources des corroborations par code/tests; les parcours utilisateurs peuvent commencer.

---

## Phase 3: User Story 1 - Comprendre le périmètre fonctionnel et les flux (Priority: P1) 🎯 MVP

**Goal**: Décrire les modules, les parcours métier complets et les comportements observables avec des références vérifiables.

**Independent Test**: Un lecteur peut identifier les six modules puis suivre chacune des six opérations REST vers le domaine, la persistance et les intégrations concernées; les cas d'erreur ou comportements non établis sont explicitement distingués.

### Implementation for User Story 1

- [X] T003 [US1] Décrire les responsabilités et frontières des six modules Maven et des composants MCP, déploiement et test hors réacteur à partir des sources dans `specs/001-retro-specification/retro-specification.md`
- [X] T004 [US1] Tracer `GET` collection, `POST` création, `GET` fiche, `DELETE`, `PUT` adresse et `PUT` situation du delegate jusqu'aux cas d'usage et ports du domaine, en documentant validation, persistance, réponses et émission éventuelle d'événement dans `specs/001-retro-specification/retro-specification.md`
- [X] T005 [US1] Décrire les comportements d'erreur et d'indisponibilité, les configurations de sécurité, résilience, santé et observabilité, ainsi que les limites de preuve des tests/configurations dans `specs/001-retro-specification/retro-specification.md`

**Checkpoint**: Le périmètre et les parcours sont lisibles sans exécuter le service et chaque fait important renvoie à une source.

---

## Phase 4: User Story 2 - Vérifier les contrats et les données (Priority: P1)

**Goal**: Recenser les contrats et modèles déclaratifs puis rendre explicites leurs différences avec l'implémentation.

**Independent Test**: Chaque opération REST, opération/canal/message événementiel et champ métier ou de persistance peut être retrouvé dans son inventaire avec contraintes et écarts sourcés.

### Implementation for User Story 2

- [X] T006 [P] [US2] Vérifier les six opérations, paramètres, corps, schémas, réponses et erreurs OpenAPI contre le delegate, inventorier le contrat REST externe de codes postaux et comparer les routes consommées par le MCP dans `specs/001-retro-specification/contracts/rest.md`
- [X] T007 [P] [US2] Vérifier le canal, les opérations `send`/`receive`, le payload, le producteur, la configuration et l'existence éventuelle d'un consommateur contre les sources du dépôt dans `specs/001-retro-specification/contracts/asyncapi.md`
- [X] T008 [P] [US2] Comparer les modèles déclaratifs domaine/MongoDB aux types Java, DTO et mapper dans `specs/001-retro-specification/data-model.md`, en conservant textuellement les contraintes `minLength: 2`, `maxLength: 50`, le motif domaine de `LigneAdresse` `^[a-zA-Z ,.'-]+$`, le motif REST/AsyncAPI `^[a-zA-Z0-9 ,.'-]+$`, `CodePostal` `minLength: 5`, `maxLength: 5`, `^[A-Z0-9]+$`, `nombreEnfants` `minimum: 0`, `maximum: 20`, l'enum des cinq valeurs `SituationFamiliale` et l'optionalité de `ligne2`

**Checkpoint**: Les contrats et modèles sont inventoriés sans présenter leurs descriptions narratives comme des comportements prouvés.

---

## Phase 5: User Story 3 - Valider l'architecture observée (Priority: P2)

**Goal**: Fournir un diagramme vérifiable et un guide de validation des livrables.

**Independent Test**: Le diagramme se rend, distingue appels synchrones, publication Kafka et assemblage/configuration, et ses principaux nœuds/flux sont reliés à des sources; le guide permet de rejouer les contrôles de complétude.

### Implementation for User Story 3

- [X] T009 [P] [US3] Vérifier et mettre à jour le diagramme des frontières, modules, du serveur MCP et des flux attestés, sans ajouter de consommateur Kafka non identifié, dans `specs/001-retro-specification/architecture.mmd`
- [X] T010 [P] [US3] Compléter les commandes de contrôle, prérequis, résultats attendus et vérifications de confidentialité pour les livrables dans `specs/001-retro-specification/quickstart.md`

**Checkpoint**: Le schéma et le guide sont cohérents avec les sources et les écarts documentés.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Vérifier la complétude, la confidentialité et la remise avec arrêt pour validation humaine.

- [X] T011 Vérifier les liens et références, la couverture des critères FR/SC, le rendu de `specs/001-retro-specification/architecture.mmd` et l'absence de données personnelles/secrets dans `specs/001-retro-specification/retro-specification.md`, `specs/001-retro-specification/data-model.md`, `specs/001-retro-specification/contracts/` et `specs/001-retro-specification/quickstart.md`
- [X] T012 Soumettre `specs/001-retro-specification/retro-specification.md` et `specs/001-retro-specification/architecture.mmd` au demandeur avec les écarts non résolus, puis attendre sa validation sans lancer d'étape Spec Kit suivante

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Aucun prérequis.
- **Foundational (Phase 2)**: Après Setup; bloque les analyses par parcours.
- **User Stories (Phases 3 et 4)**: Après Foundational; US1 et US2 sont indépendantes et peuvent avancer en parallèle.
- **User Story 3 (Phase 5)**: Après US1 et US2, car le diagramme et le guide synthétisent les composants et contrats vérifiés.
- **Polish (Phase 6)**: Après tous les livrables; inclut la remise et l'arrêt pour validation.

### User Story Dependencies

- **US1 (P1)**: Après Foundational; indépendante de US2.
- **US2 (P1)**: Après Foundational; indépendante de US1.
- **US3 (P2)**: Après US1 et US2 pour utiliser leurs inventaires vérifiés.

### Graphe de dépendances

```text
T001 -> T002
         ├──> US1: T003 -> T004 -> T005 ──┐
         └──> US2: T006 || T007 || T008 ──┴──> US3: T009 || T010 -> Polish: T011 -> T012
```

### Parallel Opportunities

- **US1**: T003, T004 et T005 modifient le même rapport; les exécuter séquentiellement.
- **US2**: Après T002, T006 (`contracts/rest.md`), T007 (`contracts/asyncapi.md`) et T008 (`data-model.md`) touchent des fichiers distincts et peuvent être exécutées en parallèle.
- **US3**: Après US1 et US2, T009 (`architecture.mmd`) et T010 (`quickstart.md`) touchent des fichiers distincts et peuvent être exécutées en parallèle.

### Exemple d'exécution parallèle — User Story 2

```text
Task: Vérifier OpenAPI et actualiser specs/001-retro-specification/contracts/rest.md
Task: Vérifier AsyncAPI et actualiser specs/001-retro-specification/contracts/asyncapi.md
Task: Comparer modèles domaine/MongoDB/Java et actualiser specs/001-retro-specification/data-model.md
```

---

## Implementation Strategy

### MVP documentaire

Les deux parcours P1 sont requis pour un premier incrément utile : US1 décrit les flux observés et US2 établit la fidélité aux contrats et modèles, qui sont la priorité exprimée dans la demande. Cet incrément ne constitue pas la remise complète tant que le schéma de l'US3 n'est pas vérifié.

### Livraison incrémentale

1. Préparer l'ossature et l'inventaire de preuves (Setup + Foundational).
2. Produire US1 et US2 en parallèle, puis valider séparément le rapport de flux et les inventaires contractuels/de données.
3. Produire et contrôler US3; compléter le guide de validation.
4. Exécuter Polish et remettre les livrables pour validation explicite; ne pas enchaîner sur `/speckit-implement` sans accord.

## Notes

- Chaque tâche suit le format `- [ ] T### [P?] [US?] Description avec chemin de fichier`.
- `[P]` est réservé aux fichiers distincts sans dépendance inachevée; les tâches dans `retro-specification.md` restent séquentielles.
- Les tâches ne modifient ni les contrats sources, ni le code, ni les configurations.
- Les tests Maven existants sont des preuves facultatives dans le guide, pas des tâches de test nouvelles.
