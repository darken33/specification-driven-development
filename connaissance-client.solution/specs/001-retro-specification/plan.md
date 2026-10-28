# Implementation Plan: Rétro-spécification du système Connaissance Client

**Branch**: `main` | **Date**: 2026-10-28 | **Spec**: [spec.md](./spec.md)

**Input**: Spécification de fonctionnalité `specs/001-retro-specification/spec.md`

## Summary

Produire une documentation de référence du système existant, en partant des contrats OpenAPI et AsyncAPI et des modèles déclaratifs du domaine et de MongoDB, puis en confrontant ces sources au code, à la configuration et aux tests. Les livrables couvriront les six modules Maven, l'outil MCP Python et les ressources de déploiement/test, ainsi que les flux et écarts constatés; un diagramme Mermaid représentera les interactions attestées. Le travail est documentaire et en lecture seule : aucune modification applicative ni décision métier nouvelle.

## Technical Context

**Language/Version**: Backend Java 21; l'outil auxiliaire MCP déclare Python `>=3.10`; les livrables sont de la documentation Markdown et Mermaid.

**Primary Dependencies**: Aucune nouvelle dépendance. Le backend est un monorepo Maven multi-module avec Spring Boot 4; les intégrations observées incluent MongoDB, une API distante de validation des communes/codes postaux et Kafka. L'outil MCP séparé déclare FastMCP, httpx et Pydantic dans son `pyproject.toml`.

**Storage**: Aucun stockage ajouté ou modifié. MongoDB et sa représentation existante sont décrits comme partie du système observé.

**Testing**: Revue des tests unitaires et d'intégration existants comme éléments de preuve; contrôle des références et rendu Mermaid pour les livrables. Pas de nouveau test applicatif.

**Target Platform**: Sans objet pour des livrables documentaires.

**Project Type**: Rétro-documentation d'un backend REST et événementiel, de son outil client MCP et de ses ressources auxiliaires de déploiement/test.

**Performance Goals**: Sans objet; la documentation doit permettre de retrouver les sources des comportements décrits.

**Constraints**: Commencer par les contrats et modèles sources; distinguer déclarations, descriptions narratives et comportements observés; ne pas prendre `target/` ni les sources générées comme sources canoniques; signaler les contradictions; ne pas reproduire de données personnelles ou de secrets; ne modifier aucun code, contrat ou configuration.

**Scale/Scope**: Six modules Maven, six opérations REST Connaissance Client, un contrat HTTP externe de codes postaux, un canal AsyncAPI avec deux opérations déclarées, deux modèles de données principaux, un serveur MCP auxiliaire et les artefacts de test/déploiement présents.

## Constitution Check

*GATE: Pass avant recherche et conception.*

| Principe / contrainte | Évaluation pour cette fonctionnalité |
|---|---|
| I. Architecture centrée sur le domaine | **Conforme** — décrire les frontières et ports observés sans modifier les dépendances ni déplacer de règles métier. |
| II. Contrats comme sources de vérité | **Conforme** — partir des contrats sources et relever séparément les écarts avec le code et les sources générées. |
| III. Invariants et protection des données | **Conforme** — ne pas recopier les exemples nominatifs ou les secrets; décrire les contrôles d'accès comme des faits à vérifier, pas comme une garantie supposée. |
| IV. Tests des comportements et frontières | **Conforme** — utiliser les tests existants comme corroboration; aucun changement fonctionnel ou ajout de tests n'est prévu. |
| V. Résilience et observabilité | **Conforme** — documenter les dépendances, les erreurs, les timeouts, replis et signaux d'observabilité effectivement observés, et signaler les comportements non établis. |
| Java 21, Spring Boot 4, wrapper Maven, séparation des modules | **Conforme** — périmètre documentaire uniquement; aucun changement de dépendance, de build ou de module. |

Pas de dérogation à la constitution identifiée.

## Project Structure

### Documentation de cette fonctionnalité

```text
specs/001-retro-specification/
├── spec.md
├── plan.md
├── research.md
├── retro-specification.md
├── data-model.md
├── architecture.mmd
├── quickstart.md
├── contracts/
│   ├── rest.md
│   └── asyncapi.md
└── tasks.md                 # étape /speckit-tasks, non créée ici
```

Le rapport narratif final de rétro-spécification sera assemblé lors de l'exécution des tâches à partir de ces inventaires, des références source et des vérifications restantes.

### Sources du projet analysées

```text
pom.xml
connaissance-client-api/
  src/main/resources/connaissance-client-api.yaml
  src/main/java/...
connaissance-client-event-adapter/
  src/main/resources/adresse-asyncapi-3.yaml
  src/main/java/...
connaissance-client-domain/
  src/main/resource/domain-model.yml
  src/main/java/...
connaissance-client-db-adapter/
  src/main/resource/mongodb-model.yml
  src/main/java/...
connaissance-client-cp-adapter/
  src/main/resources/code-postaux-api.yaml
  src/main/java/...
connaissance-client-app/
  src/main/resources/application.yml
  src/main/java/...
  src/test/java/...
connaissance-client-mcp/
  server.py
  interroge_api_connaissance_client.py
  pyproject.toml
env-tests/
  docker/
  k8s/
  jmeter/
  jmeter/
Dockerfile
```

**Structure Decision**: Conserver les sources applicatives en place et créer les livrables exclusivement dans le dossier de fonctionnalité. Les documents de contrats sont des inventaires et analyses avec liens vers les contrats originaux; ils ne les remplacent ni ne les recopient intégralement. L'outil MCP et `env-tests` sont documentés comme composants/ressources hors réacteur Maven, sans les confondre avec des modules Java.
