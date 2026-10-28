# Feature Specification: Rétro-spécification du système Connaissance Client

**Feature Branch**: `main`

**Created**: 2026-10-28

**Status**: Draft

**Input**: User description: "En tant qu'architecte technique et fonctionnel spécialisé en Java et Spring-Boot, effectuer une analyse complète du code du projet pour en produire une rétro-spécification, en s'appuyant d'abord sur les contrats OpenAPI, AsyncAPI et les modèles de données, et fournir un schéma d'architecture présentant les interactions entre composants. Soumettre le résultat à validation avant toute étape suivante."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Comprendre le périmètre fonctionnel et les flux (Priority: P1)

En tant qu'architecte technique ou fonctionnel, je veux disposer d'une description fidèle des capacités du système et des parcours d'une fiche client, afin de comprendre ce que le système expose, valide, conserve et communique.

**Why this priority**: C'est le socle de la rétro-spécification et la première information nécessaire pour évaluer le système existant.

**Independent Test**: Un lecteur peut identifier les cas d'usage et suivre le devenir d'une fiche client depuis une requête jusqu'à ses effets sur les composants externes en consultant uniquement le document produit et ses références.

**Acceptance Scenarios**:

1. **Given** le dépôt du projet, **When** l'architecte consulte la rétro-spécification, **Then** il trouve l'inventaire des six modules et le rôle observé de chacun.
2. **Given** une création, une consultation, une suppression ou une modification d'adresse ou de situation familiale, **When** le lecteur suit le parcours décrit, **Then** il peut identifier les composants traversés, les validations, les effets de persistance et, le cas échéant, les événements émis.
3. **Given** une erreur fonctionnelle ou une dépendance indisponible, **When** le lecteur consulte le parcours concerné, **Then** le comportement observé et les conséquences sur l'opération sont décrits ou explicitement signalés comme non établis.

### User Story 2 - Vérifier les contrats et les données (Priority: P1)

En tant qu'architecte, je veux que les interfaces et les modèles soient décrits à partir des contrats déclaratifs avant d'être confrontés au code, afin de distinguer les règles annoncées des comportements réellement implémentés.

**Why this priority**: Les contrats d'interface et les modèles sont les sources prioritaires demandées et structurent la lecture fonctionnelle et technique.

**Independent Test**: Un lecteur peut retrouver chaque opération REST, échange événementiel et entité de données documentés, ainsi que les éventuelles différences avec les implémentations observées.

**Acceptance Scenarios**:

1. **Given** le contrat REST, le contrat événementiel et les modèles de données présents, **When** l'architecte consulte la rétro-spécification, **Then** les opérations, messages, champs, contraintes, cardinalités et états explicitement déclarés y sont inventoriés avec leurs sources.
2. **Given** une règle déclarée dans un contrat ou un modèle, **When** celle-ci est comparée au code et aux tests pertinents, **Then** la rétro-spécification indique si elle est appliquée, divergente ou non vérifiable.
3. **Given** des contradictions entre contrat, modèle, implémentation ou tests, **When** elles sont relevées, **Then** elles sont présentées comme écarts à arbitrer et non résolues par supposition.

### User Story 3 - Valider l'architecture observée (Priority: P2)

En tant qu'architecte, je veux un schéma lisible des composants et de leurs échanges, accompagné de références vérifiables, afin de valider rapidement la compréhension de l'architecture avant toute planification ultérieure.

**Why this priority**: Le schéma synthétise les interactions et facilite la validation, après l'établissement des contrats et comportements.

**Independent Test**: Un lecteur peut relier chaque composant et chaque flux du schéma à une responsabilité et à une preuve dans le dépôt.

**Acceptance Scenarios**:

1. **Given** les composants et flux établis par l'analyse, **When** le lecteur consulte le schéma, **Then** il distingue l'API entrante, le domaine, les adaptateurs, la persistance et les dépendances externes, avec le sens des échanges.
2. **Given** une assertion fonctionnelle, contractuelle ou architecturale de la rétro-spécification, **When** le lecteur la vérifie, **Then** une référence au fichier source pertinent permet de la retrouver.
3. **Given** la rétro-spécification et son schéma achevés, **When** ils sont soumis au demandeur, **Then** aucune étape de clarification, planification ou implémentation n'est lancée avant sa validation explicite.

### Edge Cases

- Un fichier de contrat ou de modèle est absent, incomplet, en brouillon ou contradictoire avec un autre artefact : l'analyse le signale et ne comble pas silencieusement les lacunes.
- Le code généré diffère du contrat source : le contrat source reste le point de départ de l'analyse, et l'écart avec le code généré est rapporté.
- Une règle existe uniquement dans du code ou dans des tests et pas dans un contrat : elle est identifiée comme comportement observé, non comme promesse contractuelle.
- Des fichiers `target/`, des sources générées ou des échantillons de données personnelles sont présents : ils ne sont pas traités comme sources canoniques ni recopiés dans la documentation.
- Un parcours dépend d'un service externe, d'un broker ou d'une base indisponible : la documentation distingue le comportement spécifié de celui que les sources permettent effectivement d'établir.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La rétro-spécification MUST inventorier les six modules Maven et les composants auxiliaires pertinents hors réacteur, dont l'outil MCP et les ressources de déploiement/test, en décrivant leurs responsabilités observables, dépendances et frontières.
- **FR-002**: L'analyse MUST commencer par le contrat OpenAPI source, le contrat AsyncAPI source et les modèles de données déclaratifs du domaine et de la persistance, avant de corroborer ou nuancer leur contenu par le code.
- **FR-003**: La rétro-spécification MUST recenser toutes les opérations REST déclarées, leurs paramètres, entrées, sorties, réponses et erreurs documentées.
- **FR-004**: La rétro-spécification MUST recenser les canaux, messages et opérations déclarés par le contrat AsyncAPI ainsi que leur rôle observé dans les parcours métier.
- **FR-005**: La rétro-spécification MUST décrire les entités, types de valeur, relations, contraintes et champs optionnels des modèles métier et de persistance, en signalant leurs différences lorsqu'elles existent.
- **FR-006**: La rétro-spécification MUST couvrir les cas d'usage exposés par l'API et les comportements métier, validations, erreurs, effets de persistance et émissions d'événements observés dans les sources et tests.
- **FR-007**: La rétro-spécification MUST expliquer les interactions entre l'application, le domaine, les adaptateurs, MongoDB, le service de validation des codes postaux et le broker Kafka, selon les éléments trouvés dans le dépôt.
- **FR-008**: La rétro-spécification MUST inclure un schéma d'architecture lisible montrant les composants, les frontières internes/externes et le sens des principaux échanges, y compris les échanges synchrones et événementiels lorsqu'ils sont attestés.
- **FR-009**: Toute affirmation factuelle de la rétro-spécification et tout composant ou flux important du schéma MUST être rattaché à une référence vérifiable vers les fichiers sources pertinents.
- **FR-010**: Les divergences entre contrats, modèles, code, configuration et tests MUST être listées avec leur impact fonctionnel ou architectural observable, sans inventer la règle attendue ni trancher les ambiguïtés métier.
- **FR-011**: L'analyse MUST prendre en compte les configurations d'exécution, de sécurité, de résilience et d'observabilité ainsi que les tests pertinents, et distinguer ces preuves secondaires des contrats et modèles prioritaires.
- **FR-012**: Les sources générées et sorties de build MUST NOT remplacer les contrats source comme référence canonique; elles ne peuvent être utilisées qu'à titre de corroboration ou de comparaison.
- **FR-013**: La documentation produite MUST éviter de reproduire des données personnelles présentes dans les exemples ou jeux de test, ainsi que des secrets éventuels.
- **FR-014**: La livraison MUST être soumise au demandeur pour validation et MUST s'arrêter là; aucune planification, modification fonctionnelle du code ni implémentation de suite ne commence avant validation explicite.

### Key Entities *(include if feature involves data)*

- **Fiche client**: Agrégat métier identifié par un UUID, avec identité, adresse et situation familiale, exposé par le contrat REST et conservé dans le modèle de persistance.
- **Adresse**: Donnée structurée et typée, associée à une fiche client; sa cohérence code postal/ville est vérifiée par une dépendance externe et son changement peut donner lieu à un événement.
- **Situation familiale**: État catégoriel associé au nombre d'enfants, documenté par le contrat et le modèle métier.
- **Contrat REST**: Description déclarative des opérations, données échangées et réponses de l'API du système.
- **Contrat événementiel**: Description déclarative des messages, canaux et opérations de diffusion ou de réception.
- **Modèle de données**: Description des entités et contraintes métier ou de persistance, à comparer à l'implémentation correspondante.
- **Composant et flux**: Élément architectural observé ou échange entre composants, référencé dans le schéma et dans les sources.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Les six modules du monorepo sont inventoriés et chacun possède une responsabilité documentée et au moins une référence de source.
- **SC-002**: Toutes les opérations déclarées dans l'OpenAPI et toutes les opérations, tous les canaux et messages déclarés dans l'AsyncAPI sont recensés dans la rétro-spécification.
- **SC-003**: Les deux modèles déclaratifs (domaine et persistance) sont décrits et leurs champs, contraintes et divergences identifiables sont comparés.
- **SC-004**: Les parcours métier exposés par l'API sont documentés de bout en bout, avec leurs validations, résultats, erreurs et effets secondaires observables.
- **SC-005**: Un schéma d'architecture représente tous les composants internes principaux et chaque système externe identifié, ainsi que le sens des flux attestés.
- **SC-006**: Chaque divergence identifiée entre contrat, modèle, code, configuration et tests est consignée comme telle avec ses preuves; aucune ambiguïté métier n'est présentée comme une décision validée.
- **SC-007**: La documentation est compréhensible par un architecte technique ou fonctionnel et peut être vérifiée sans exécuter l'application.
- **SC-008**: La livraison est soumise pour validation avant toute phase suivante et ne contient aucune modification fonctionnelle du système.

## Assumptions

- Le dépôt fourni est la source de vérité pour déterminer le périmètre du système; aucune documentation externe non référencée dans le dépôt n'est nécessaire pour établir les faits.
- Les fichiers contractuels et modèles déclaratifs sous `src/main` sont les références initiales; les sources Java et tests servent à décrire le comportement observé et à relever les écarts.
- L'analyse est en lecture seule et porte sur le code applicatif, les contrats, les modèles, les configurations et les tests pertinents; les artefacts compilés et répertoires `target/` ne constituent pas le périmètre source.
- Le livrable principal est une rétro-spécification documentaire accompagnée d'un schéma d'architecture intégrable et lisible. Le format Mermaid est retenu par défaut pour le schéma.
- La validation demandée est une revue humaine du contenu; elle précède l'utilisation des étapes Spec Kit suivantes.
