# Guide de validation des livrables

Ce guide contrôle que les sources prioritaires ont été recensées et que les documents restent traçables. Il ne modifie pas l'application.

## Prérequis

- Dépôt du projet disponible à sa racine.
- Pour exécuter les tests du projet : JDK 21 et wrapper `./mvnw`; les tests d'intégration peuvent aussi requérir les services de l'environnement `env-tests`.
- Pour valider le schéma visuellement : un visualiseur Markdown/Mermaid compatible.

## Scénarios de validation

### 1. Inventaire des modules

```bash
rg -n '<module>' pom.xml
```

**Attendu** : six modules, correspondant à ceux de la section Project Structure du [plan](./plan.md).

### 2. Exhaustivité de l'inventaire REST

```bash
rg -n 'operationId:' connaissance-client-api/src/main/resources/connaissance-client-api.yaml
```

**Attendu** : six opérations; chacune apparaît dans le tableau de [l'inventaire REST](./contracts/rest.md) avec son chemin, sa méthode et ses réponses déclarées.

### 3. Exhaustivité de l'inventaire AsyncAPI

```bash
rg -n 'event.adresse.v1|action:|adresseMessage|AdresseMessagePayload' connaissance-client-event-adapter/src/main/resources/adresse-asyncapi-3.yaml
```

**Attendu** : canal, message, payload et opérations `send`/`receive` sont tous mentionnés dans [l'inventaire AsyncAPI](./contracts/asyncapi.md); l'absence de consommateur identifié n'est pas transformée en fait positif.

### 4. Concordance des modèles et des conversions

```bash
rg -n 'name: "(Client|Adresse|connaissanceclient)"|ligne1|ligne2|codePostal|situationFamiliale|nombreEnfants' \
  connaissance-client-domain/src/main/resource/domain-model.yml \
  connaissance-client-db-adapter/src/main/resource/mongodb-model.yml \
  connaissance-client-domain/src/main/java \
  connaissance-client-db-adapter/src/main/java
```

**Attendu** : les champs et contraintes déclarés sont couverts par [data-model.md](./data-model.md), avec les différences entre domaine, MongoDB et code explicitement signalées.

### 5. Rendu et traçabilité de l'architecture

Ouvrir [architecture.mmd](./architecture.mmd) dans un visualiseur Mermaid et suivre les liens source cités dans les inventaires.

**Attendu** : frontières internes/externes lisibles; flèches pleines pour les échanges synchrones, pointillées pour Kafka, tiret-point pour l'assemblage; aucun consommateur Kafka non prouvé n'est représenté. Les références dans [research.md](./research.md) donnent les choix et les points restant à vérifier.

### 6. Vérifier l'outil MCP et les ressources auxiliaires

```bash
rg -n '@mcp\.(tool|resource|prompt)|mcp\.run|/v1/connaissance' \
  connaissance-client-mcp/server.py \
  connaissance-client-mcp/interroge_api_connaissance_client.py
```

**Attendu** : les tools réellement déclarés, les routes appelées, le mode de transport, ainsi que l'écart de route du script sont expliqués dans [retro-specification.md](./retro-specification.md) et [contracts/rest.md](./contracts/rest.md). Vérifier que Docker/Kubernetes/JMeter sont décrits comme environnements/artefacts et non comme preuves d'exécution.

### 7. Vérification facultative par les tests existants

```bash
./mvnw -pl connaissance-client-app -am test
```

Pour le contrôle complet prescrit par la constitution :

```bash
./mvnw verify
```

**Attendu** : les tests corroborent uniquement les comportements qu'ils exécutent; leur réussite ne prouve pas les descriptions contractuelles non couvertes. Consigner tout échec lié aux prérequis/environnements plutôt que de présenter les tests comme passés.

## Contrôle de confidentialité

Avant validation, vérifier que les nouveaux documents ne contiennent ni données personnelles tirées des exemples/fixtures ni secrets copiés depuis les configurations.
