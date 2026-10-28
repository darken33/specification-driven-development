<!--
Sync Impact Report
Version change: unversioned -> 1.0.0 (initial constitution)
Modified principles: none; five principles established for the first time
Added sections: Architecture et périmètre; Workflow de développement et qualité
Removed sections: none
Follow-up TODO: confirm the original ratification date
-->
# Constitution de l'application front-end Angular

## Core Principles

### I. Simplicité (KISS)
Les solutions MUST rester proportionnées au besoin du POC. Les abstractions,
dépendances et couches MUST être ajoutées uniquement lorsqu'elles réduisent une
complexité réelle ou répondent à un besoin établi. Toute complexité non évidente
MUST être justifiée dans la conception ou la revue concernée.

### II. Angular et TypeScript à jour
Le projet MUST utiliser les dernières versions stables d'Angular et de TypeScript
compatibles entre elles au moment de la mise à jour. Les versions MUST respecter
la matrice de compatibilité officielle d'Angular. Les mises à niveau MUST être
réalisées avec `ng update` et vérifiées par les commandes du projet ; les versions
préliminaires MUST NOT être adoptées sans besoin explicite.

### III. Outillage Angular et npm en priorité
La génération et les opérations courantes MUST privilégier Angular CLI (`ng`)
et npm : `ng generate` pour les éléments Angular pris en charge, et npm pour
les dépendances et scripts du projet. Les modifications manuelles restent
permises lorsqu'elles sont plus simples ou que la génération ne convient pas.
Les dépendances MUST rester limitées au besoin et le fichier de verrouillage npm
MUST être maintenu pour rendre les installations reproductibles.

### IV. Séparation de l'interface et du traitement
Les composants d'interface MUST principalement afficher l'état et transmettre
les intentions de l'utilisateur. Les règles métier, transformations et accès
aux données MUST résider dans des services ou fonctions dédiés, testables sans
interaction directe avec l'interface. Les composants MUST NOT devenir le lieu
de règles métier ou d'appels réseau complexes.

### V. Architecture orientée fonctionnalités
Le code applicatif MUST être organisé par fonctionnalités afin de garder
ensemble les éléments qui évoluent ensemble. Les composants, directives et
services réutilisables sans logique métier MUST être placés dans un espace
partagé. Les éléments d'infrastructure réellement transverses MUST être
distincts des fonctionnalités. Une fonctionnalité MUST pouvoir être comprise
et modifiée sans dépendances circulaires avec les autres fonctionnalités.

## Architecture et périmètre

L'application MUST privilégier les composants Angular autonomes (standalone)
et le routage Angular. Les routes de fonctionnalités MUST être chargées à la
demande lorsque cela reste simple et pertinent.

La structure de référence sous `src/app` est organisée autour de :

- `features/<fonctionnalite>/` pour les pages, composants et traitements propres
	à une fonctionnalité ;
- `shared/` pour les éléments d'interface et utilitaires génériques, sans règles
	métier propres à une fonctionnalité ;
- `core/` pour les services et configurations réellement transverses à
	l'application.

Cette structure est un guide : MUST NOT créer un dossier ou une couche vide
uniquement pour respecter une convention. Les composants MUST utiliser les
signaux Angular pour l'état local synchrone lorsqu'ils simplifient le code, et
RxJS pour les flux asynchrones lorsque ses opérateurs apportent une valeur
claire. Un mécanisme global de gestion d'état MUST NOT être ajouté sans besoin
avéré.

Ce projet est un POC et n'a pas pour objectif une mise en production. La
conception et les tâches de ce périmètre MUST NOT inclure l'authentification,
les mesures de sécurité de production ni les pipelines CI/CD. Toute évolution
future vers la production devra réévaluer explicitement ces exclusions.

## Workflow de développement et qualité

Les changements MUST suivre le flux le plus direct : générer ou modifier le code
avec les outils du projet, puis vérifier le résultat avec les commandes Angular
et npm disponibles. Avant de considérer une modification terminée, les
vérifications pertinentes MUST inclure au minimum la compilation (`ng build`)
et, lorsque le changement comporte un comportement testable, les tests ciblés
(`ng test`). Les tests MUST se concentrer sur les règles métier et les
comportements d'interface modifiés ; leur niveau MUST rester proportionné au
risque et au périmètre du POC.

Les types TypeScript MUST être explicites lorsque l'inférence ne suffit pas à
clarifier le contrat. Les erreurs de compilation et les diagnostics introduits
par une modification MUST être corrigés avant validation. Les scripts npm
existants et les conventions Angular du dépôt MUST être réutilisés plutôt que
remplacés par des commandes ou outils redondants.

## Governance

Cette constitution prévaut en cas de conflit avec les choix d'implémentation
ou les documents de conception du projet. Toute dérogation MUST être motivée et
consignée dans le document de conception ou la revue du changement concerné.
Chaque changement de périmètre MUST être examiné au regard des principes,
notamment de la simplicité, de la séparation interface-traitement et des
exclusions du POC.

Toute modification de cette constitution MUST être relue et accompagnée d'une
mise à jour de sa version et de sa date d'amendement. La version suit SemVer :
MAJOR pour une modification incompatible des règles, MINOR pour l'ajout ou
l'élargissement substantiel d'un principe, PATCH pour une clarification sans
changement de portée. Les revues de conception et de code MUST vérifier les
principes applicables ; les écarts acceptés MUST être explicitement justifiés.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): date d'adoption initiale à confirmer | **Last Amended**: 2026-10-28
