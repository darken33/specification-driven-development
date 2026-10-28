# Recherche et décisions de conception

## Contexte vérifié

- Le POM racine déclare six modules : domaine, adaptateur MongoDB, adaptateur de codes postaux, adaptateur événementiel, API et application.
- Les sources contractuelles et modèles prioritaires se trouvent sous `src/main` dans leurs modules propriétaires. Les répertoires `target/generated-sources` existent et ne sont pas des sources canoniques.
- Le contrat REST déclare six opérations (`GET` et `POST` sur la collection, `GET` et `DELETE` sur une fiche, `PUT` sur l'adresse et la situation).
- Le contrat AsyncAPI 3.0 déclare le canal Kafka `event.adresse.v1`, un message `adresseMessage` et des opérations `send` et `receive`.
- Les modèles déclaratifs du domaine et de la persistance décrivent la fiche client et ses contraintes. Le modèle MongoDB aplatit l'adresse dans la collection `connaissanceclient`.
- Le code métier utilise des ports de dépôt, validation de code postal/ville et publication d'événement. Les comportements doivent être vérifiés au-delà des descriptions contractuelles.
- Le dépôt contient aussi un serveur MCP Python hors du réacteur Maven, un script de requêtes manuelles et des ressources Docker/Kubernetes/JMeter hors des six modules.

## Inventaire des sources et leur rôle

### Contrats et modèles prioritaires

| Source | Rôle dans l'analyse |
|---|---|
| `connaissance-client-api/src/main/resources/connaissance-client-api.yaml` | Contrat REST, opérations, schémas, erreurs et descriptions. |
| `connaissance-client-event-adapter/src/main/resources/adresse-asyncapi-3.yaml` | Contrat Kafka, canal, payload et opérations d'envoi/réception déclarées. |
| `connaissance-client-domain/src/main/resource/domain-model.yml` | Modèle déclaratif du domaine, types, champs et contraintes. |
| `connaissance-client-db-adapter/src/main/resource/mongodb-model.yml` | Modèle déclaratif de la collection de persistance et contraintes. |
| `connaissance-client-cp-adapter/src/main/resources/code-postaux-api.yaml` | Contrat de l'API distante consommée par l'adaptateur de codes postaux. |

### Code de corroboration

- `pom.xml` et les POM des six modules établissent la structure, les dépendances et la génération de code.
- `connaissance-client-domain/src/main/java/...` : service et implémentation métier, `Client`, types valeur, enum, exceptions et ports.
- `connaissance-client-api/src/main/java/.../ConnaissanceClientDelegate.java` : délégation REST et conversions domaine/DTO.
- `connaissance-client-db-adapter/src/main/java/...` : `ClientDb`, `ClientDbRepository`, `ClientDbMapper` et `ClientRepositoryImpl`.
- `connaissance-client-cp-adapter/src/main/java/.../CodePostauxServiceImpl.java` : appel distant et comportement observé de validation.
- `connaissance-client-event-adapter/src/main/java/.../AdresseEventServiceImpl.java` : construction du payload et appel du producteur.
- `connaissance-client-app/src/main/java/...` : assemblage Spring Boot, configuration de base, OpenAPI, sécurité, gestion d'erreur et indicateur de santé.
- `connaissance-client-app/src/main/resources/application.yml` : MongoDB, Kafka, API docs, métriques, santé et résilience; les autres profils/configurations sont à examiner lors du rapport.

### Tests disponibles comme preuves secondaires

- Domaine : `ConnaissanceClientServiceImplTest`, `AdresseTest`, `ClientTest`.
- API : `ConnaissanceClientDelegateTest`, `ConnaissanceClientApiIT`.
- MongoDB : `ClientRepositoryImplTest`, `ClientDbMapperTest`.
- Codes postaux : `CodePostauxServiceImplTest`, `CodePostauxServiceImplIT`.
- Application : `PutAdresseIntegrationTest`, `PutSituationIntegrationTest`.
- Aucun test spécifique du module événementiel n'a été identifié dans l'inventaire `src/test/java`.

### Composants et ressources hors du réacteur Maven

- `connaissance-client-mcp/server.py` expose quatre tools implémentés par le code parcouru (`get_clients`, création, changement d'adresse et changement de situation) et appelle l'API locale. Le serveur lance FastMCP en transport HTTP sur loopback; il effectue aussi une requête vers `/v3/api-docs` pendant l'import du module.
- `connaissance-client-mcp/interroge_api_connaissance_client.py` est un script de requêtes manuelles qui décrit sept opérations, dont un `PUT /v1/connaissance-clients/{id}` absent du contrat REST source.
- `connaissance-client-mcp/README.md`, `VSCODE_CONFIG.md`, les fichiers de configuration MCP et `.vscode/settings.json` documentent/configurent les clients, mais certaines affirmations et configurations ne correspondent pas au code/configuration actif.
- `env-tests/docker/docker-compose.yml` décrit MongoDB, ZooKeeper, Kafka, Schema Registry et Control Center locaux; les scripts `start.sh`/`stop.sh` pilotent cette pile.
- `env-tests/k8s/` contient un Deployment, Service et Ingress; `env-tests/jmeter/` contient un scénario JMeter et des scripts de lancement. Le `Dockerfile` racine construit l'image à partir du JAR et d'un certificat.
- Aucun répertoire de tests automatisés MCP n'a été trouvé; les fichiers sous `__pycache__` et `*.egg-info` sont des artefacts, pas des sources de référence.

Les éléments sous `target/`, les classes DTO/contrôleurs/producteurs générées et les documents dérivés sont réservés aux comparaisons de génération. Le dépôt ne contient pas de test par module pour chaque affirmation; l'absence de test ne vaut ni validation ni preuve de comportement.

## Décisions

### Sources de preuve et ordre d'analyse

**Decision**: Commencer par les fichiers OpenAPI, AsyncAPI, modèle de domaine et modèle MongoDB sous `src/main/resource(s)`, puis confronter chaque fait au code applicatif, aux configurations et aux tests pertinents.

**Rationale**: Cet ordre satisfait la priorité demandée et la constitution du projet, tout en séparant intention déclarée et comportement effectivement implémenté.

**Alternatives considered**: Partir des contrôleurs générés ou des sources `target/`; écarté car ces éléments peuvent être régénérés et ne doivent pas supplanter les contrats sources.

### Format des livrables

**Decision**: Utiliser Markdown pour le rapport, les inventaires et le guide de validation; fournir le schéma sous forme d'un diagramme Mermaid `flowchart LR`.

**Rationale**: Ces formats restent lisibles en revue de code, peuvent contenir des liens relatifs aux sources et rendent le diagramme modifiable et prévisualisable sans dépendance d'exécution.

**Alternatives considered**: Un dessin image ou un outil de modélisation externe; écartés pour éviter un artefact opaque et des dépendances supplémentaires.

### Notation du diagramme

**Decision**: Garder les systèmes externes hors de la frontière du service; utiliser des flèches pleines pour les appels synchrones attestés, des flèches pointillées pour la publication Kafka et des flèches tiret-point pour l'assemblage/configuration. Ajouter une légende et ne pas dessiner de consommateur non identifié.

**Rationale**: Les formes de flux restent distinguables et l'absence de preuve d'une implémentation consommatrice n'est pas masquée par un lien implicite.

**Alternatives considered**: Un diagramme par module ou une vue détaillée de classes; écartés pour garder un schéma principal focalisé sur les interactions de bout en bout.

### Validation et confidentialité

**Decision**: Valider les inventaires par comparaison aux sources et tests; vérifier les liens et prévisualiser le diagramme. Ne pas recopier les valeurs personnelles des exemples. Les contradictions sont des constats à qualifier, pas des décisions à corriger durant cette analyse.

**Rationale**: La fonctionnalité documente un système existant en lecture seule et doit conserver la traçabilité sans réexposer les données personnelles ou transformer une hypothèse en fait.

**Alternatives considered**: Modifier les contrats ou le code pour les rendre cohérents pendant la documentation; écarté car hors périmètre et contraire à la demande de rétro-spécification.

## Points à confirmer pendant l'analyse complète

Ces constats préliminaires sont à corroborer dans les tâches d'analyse; ils ne constituent pas une résolution d'ambiguïté métier.

- Le contrat OpenAPI indique `security: []` alors que sa description évoque un JWT; l'application déclare un schéma Bearer et la configuration de sécurité visible autorise les requêtes. Documenter séparément contrat et comportement configuré, sans conclure que les routes sont effectivement protégées.
- Le contrat et les chemins déclarés utilisent `PUT` pour les modifications adresse/situation, alors que les commentaires du delegate les décrivent comme `PATCH`.
- Le contrat AsyncAPI décrit un événement de changement d'adresse et déclare une opération de réception; le code parcouru montre une publication sur création et changement d'adresse, mais aucun consommateur événementiel applicatif n'a été identifié dans l'inventaire initial.
- La contrainte `LigneAdresse` du modèle de domaine et du type Java n'accepte pas les chiffres dans son motif, contrairement au contrat REST, au contrat AsyncAPI et au modèle de persistance.
- Les descriptions OpenAPI évoquent entre autres chiffrement, audit et garanties de sécurité; ces affirmations doivent être vérifiées dans les configurations, le code et les tests avant d'être présentées comme des capacités effectives.

## Décisions non requises

Aucune nouvelle bibliothèque, migration, dépendance à un système externe ni décision de conception de code n'est nécessaire pour produire les documents.
