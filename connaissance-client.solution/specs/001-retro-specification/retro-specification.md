# Rétro-spécification — Connaissance Client

## Objectif et périmètre

Cette rétro-spécification décrit le backend Connaissance Client à partir des contrats REST et événementiel et des modèles déclaratifs, corroborés par les sources Java, les POM, la configuration et les tests. Elle porte sur les six modules de ce dépôt; elle ne modifie ni le système ni ses contrats.

Les contrats et modèles sont des **intentions déclarées**. Le code et les tests établissent des **comportements observés** lorsqu'ils sont explicites. Les descriptions non corroborées, les divergences et les éléments non établis restent signalés comme tels. Les sources générées sous `target/` ne sont pas des références canoniques.

## Synthèse exécutive

Le projet est un monorepo Maven Java 21 / Spring Boot 4 organisé autour d'un domaine et de ports d'intégration. L'API REST délègue au service métier; les adaptateurs implémentent la persistance MongoDB, la validation distante des codes postaux et la publication Kafka. La fiche de connaissance client regroupe identité, adresse et situation familiale.

Les parcours réellement décrits dans le service montrent que la création et le changement d'adresse valident le couple code postal/ville, enregistrent le client puis demandent la publication d'un événement; le changement de situation enregistre sans validation externe ni événement. Plusieurs descriptions contractuelles ou commentaires ne concordent pas avec les comportements/configurations visibles. Les détails et preuves figurent dans les inventaires [REST](./contracts/rest.md), [AsyncAPI](./contracts/asyncapi.md), [données](./data-model.md) et dans le tableau d'écarts ci-dessous.

## Sources et méthode de preuve

Ordre de lecture appliqué :

1. [Contrat OpenAPI source](../../connaissance-client-api/src/main/resources/connaissance-client-api.yaml), [contrat AsyncAPI source](../../connaissance-client-event-adapter/src/main/resources/adresse-asyncapi-3.yaml), [modèle de domaine](../../connaissance-client-domain/src/main/resource/domain-model.yml) et [modèle MongoDB](../../connaissance-client-db-adapter/src/main/resource/mongodb-model.yml).
2. Sources Java, POM de modules et configurations pertinentes pour déterminer ce qui est câblé et exécuté.
3. Tests unitaires et d'intégration comme corroboration de scénarios ciblés, sans extrapolation aux cas qu'ils ne couvrent pas.

Le POM racine et les POM des modules sont les références pour les dépendances. Les contrôleurs et modèles générés sous `target/generated-sources/` peuvent confirmer l'effet d'une génération, mais ne remplacent pas le contrat source. Les sources précises et les choix d'analyse sont recensés dans [research.md](./research.md).

## Modules et frontières

Le [POM racine](../../pom.xml) déclare six modules. Les responsabilités et dépendances observées sont :

| Module | Responsabilité et frontières constatées |
|---|---|
| `connaissance-client-domain` | Modèle métier, types valeur, enum, exceptions, cas d'usage et ports `ClientRepository`, `CodePostauxService`, `AdresseEventService`. Le domaine ne dépend pas directement des adaptateurs. Voir [sources domaine](../../connaissance-client-domain/src/main/java/com/sqli/workshop/ddd/connaissance/client/domain/ConnaissanceClientServiceImpl.java) et son [POM](../../connaissance-client-domain/pom.xml). |
| `connaissance-client-api` | Contrat OpenAPI, génération des interfaces/DTO et delegate d'adaptation REST vers le service métier. Dépend du domaine et des bibliothèques Web/validation. Voir [delegate](../../connaissance-client-api/src/main/java/com/sqli/workshop/ddd/connaissance/client/api/ConnaissanceClientDelegate.java) et [POM](../../connaissance-client-api/pom.xml). |
| `connaissance-client-db-adapter` | Adaptation du port dépôt à MongoDB; le mapper convertit le modèle métier en document aplati et inversement. Dépend du domaine, Spring Data MongoDB et MapStruct. Voir [repository adapter](../../connaissance-client-db-adapter/src/main/java/com/sqli/workshop/ddd/connaissance/client/db/ClientRepositoryImpl.java), [mapper](../../connaissance-client-db-adapter/src/main/java/com/sqli/workshop/ddd/connaissance/client/db/ClientDbMapper.java) et [POM](../../connaissance-client-db-adapter/pom.xml). |
| `connaissance-client-cp-adapter` | Adaptation du port de validation en appel à l'API distante générée de communes/codes postaux. Le POM apporte client HTTP et Resilience4j. Voir [adaptateur](../../connaissance-client-cp-adapter/src/main/java/com/sqli/workshop/ddd/connaissance/client/cpostal/CodePostauxServiceImpl.java), [contrat client](../../connaissance-client-cp-adapter/src/main/resources/code-postaux-api.yaml) et [POM](../../connaissance-client-cp-adapter/pom.xml). |
| `connaissance-client-event-adapter` | Adaptation du port d'événement à un producteur généré AsyncAPI / Spring Cloud Stream Kafka. Aucun consommateur applicatif n'a été identifié dans les sources `src/main/java` recensées. Voir [adaptateur](../../connaissance-client-event-adapter/src/main/java/com/sqli/workshop/ddd/connaissance/client/event/AdresseEventServiceImpl.java) et [POM](../../connaissance-client-event-adapter/pom.xml). |
| `connaissance-client-app` | Point d'assemblage Spring Boot et configuration transversale : sécurité, base, OpenAPI, gestion d'erreur, santé, actuator et métriques. Dépend des autres modules. Voir [application](../../connaissance-client-app/src/main/java/com/sqli/workshop/ddd/connaissance/client/ConnaissanceClientApplication.java), ses [configurations](../../connaissance-client-app/src/main/java/com/sqli/workshop/ddd/connaissance/client/config) et [POM](../../connaissance-client-app/pom.xml). |

Les dépendances internes confirment l'orientation ports/adaptateurs : les adaptateurs DB, code postal et événement dépendent du domaine; l'application assemble ces modules.

## Composants auxiliaires hors réacteur Maven

Le dépôt contient des éléments utiles à l'accès, au test ou au déploiement du backend, mais qui ne figurent pas dans les six modules Maven :

| Élément | Rôle observé et limites |
|---|---|
| `connaissance-client-mcp` | Outil Python (`requires-python >=3.10`, FastMCP/httpx/Pydantic) qui traduit des appels MCP en requêtes HTTP vers l'API locale. `server.py` définit quatre tools : liste, création, modification d'adresse et modification de situation. Il démarre FastMCP en transport HTTP sur loopback port 8000. |
| Script de requêtes MCP | `interroge_api_connaissance_client.py` est un script manuel de requêtes HTTP et non une suite de tests; il énumère sept opérations, dont un `PUT` de fiche complète absent du contrat REST. |
| Configurations MCP | Les fichiers de configuration/documentation décrivent des modes de lancement différents. Le code `server.py` utilise le transport HTTP; certains commentaires décrivent STDIO, et une configuration lance directement le script. Les clients/configurations doivent être vérifiés ensemble avant de conclure à une intégration utilisable. |
| `env-tests/docker` | Compose et scripts de démarrage/arrêt fournissent MongoDB, ZooKeeper, Kafka, Schema Registry et Control Center locaux pour le développement/test. Ces composants ne sont pas tous consommés par la configuration applicative examinée. |
| `env-tests/k8s` | Manifests Deployment, Service et Ingress décrivent un déploiement Kubernetes de référence. Le Deployment utilise un conteneur privilégié et des probes de santé HTTP; cela décrit l'artefact, pas une configuration de production validée. |
| `env-tests/jmeter` et `Dockerfile` | Scénario/script JMeter et emballage du JAR avec certificat; le script JMeter contient un chemin local spécifique à l'environnement. Aucun résultat de performance n'a été exécuté pour cette rétro-documentation. |

## Cas d'usage et parcours de bout en bout

Le [delegate REST](../../connaissance-client-api/src/main/java/com/sqli/workshop/ddd/connaissance/client/api/ConnaissanceClientDelegate.java) transforme les DTO et appelle [ConnaissanceClientServiceImpl](../../connaissance-client-domain/src/main/java/com/sqli/workshop/ddd/connaissance/client/domain/ConnaissanceClientServiceImpl.java). Les résultats de statut ci-dessous décrivent le code observé; les réponses déclarées figurent dans [contracts/rest.md](./contracts/rest.md).

| Opération | Parcours observé |
|---|---|
| Lister les fiches | Le delegate appelle `listerClients`, qui délègue à `repository.lister`; les clients sont convertis en DTO. Réponse `200`, liste vide si le dépôt ne retourne aucune fiche. |
| Lire une fiche | `informationsClient` délègue à `repository.lire`; le delegate retourne `200` avec la fiche ou `404` si l'`Optional` est vide. |
| Créer une fiche | Le delegate convertit la requête en types domaine; le service valide code postal/ville, enregistre, puis appelle le port événementiel avec l'adresse du client enregistré. Le delegate retourne `201`; une `AdresseInvalideException` y devient `400`. |
| Supprimer une fiche | Le delegate appelle `supprimerClient`, qui transmet l'identifiant au dépôt; le delegate retourne `200`. Le service ne lit pas d'abord la fiche et ne traduit pas l'absence en `404`; le comportement concret de suppression d'un identifiant absent dépend du dépôt. |
| Modifier une adresse | Le service lit la fiche (`404` si absente), valide le nouveau couple code postal/ville, change l'adresse, enregistre puis demande la publication d'un événement. Le delegate retourne `200`, `404`, `422` pour adresse rejetée ou `500` sur exception inattendue; il ajoute/récupère un `X-Correlation-ID`. |
| Modifier une situation | Le service lit la fiche (`404` si absente), change enum et nombre d'enfants puis enregistre. Il n'appelle ni le service externe de codes postaux ni le port événementiel. Le delegate retourne `200`, `404`, `400` pour une valeur d'enum refusée ou `500` sur exception inattendue. |

Dans les parcours d'adresse, la sauvegarde précède l'appel de publication. Les sources consultées ne démontrent pas de transaction distribuée MongoDB/Kafka ni de compensation si l'envoi échoue. Le booléen retourné par le port d'événement est ignoré par le service métier; les garanties de livraison relèvent donc d'une vérification complémentaire de la configuration et du producteur généré.

## Modèle fonctionnel et cycle de vie des données

La fiche métier `Client` est identifiée par un UUID et associe `Nom`, `Prenom`, `Adresse`, `SituationFamiliale` et `nombreEnfants`. L'adresse métier est un objet structuré avec ligne 1, ligne 2 optionnelle, code postal et ville. Le document MongoDB aplatit ces champs dans la collection `connaissanceclient`; le DTO REST est également aplati. Le payload événementiel transporte un identifiant et une adresse imbriquée.

Les contraintes et différences champ par champ sont développées dans [data-model.md](./data-model.md). Les règles de validation déclarées ne sont pas toutes explicitement garanties par le service métier : en particulier la plage du nombre d'enfants est déclarée par les contrats et couverte par les tests HTTP, tandis que le service affecte directement l'entier reçu.

## Interfaces synchrones — REST

Le contrat OpenAPI déclare six opérations sous `/v1/connaissance-clients`. Le delegate implémente la conversion et la délégation; les contrôleurs/DTO générés restent des artefacts de génération. Les opérations, corps, statuts contractuels et écarts observés sont détaillés dans [contracts/rest.md](./contracts/rest.md).

Les opérations de changement d'adresse et de situation sont `PUT` dans le contrat. Les commentaires du delegate les décrivent pourtant comme `PATCH`; cette différence de documentation ne change pas la méthode déclarée dans le contrat source. Le contrat global n'attache aucune exigence de sécurité (`security: []`) malgré une description évoquant un JWT.

## Interfaces asynchrones — événements

Le contrat AsyncAPI 3.0 déclare le canal Kafka `event.adresse.v1`, un message `adresseMessage` et des opérations `send` et `receive`. La liaison applicative configure la sortie `send-adresse-message-out-0` vers ce canal; le code observé construit et publie le payload après création et changement d'adresse. Aucun consommateur correspondant à `receiveAdresseMessage` n'a été localisé dans l'inventaire des sources applicatives. Le payload, ses contraintes et les réserves sont détaillés dans [contracts/asyncapi.md](./contracts/asyncapi.md).

## Intégrations, configuration et exploitation

- **MongoDB** : l'application configure un client Mongo et un `MongoTemplate`; l'adaptateur utilise un repository Spring Data et un mapper MapStruct. La collection et les propriétés sont décrites dans [data-model.md](./data-model.md) et `application.yml`.
- **Codes postaux / communes** : l'adaptateur appelle l'API distante par code postal et compare le nom de commune sans tenir compte de la casse. Une réponse 2xx sans commune correspondante et les réponses non 2xx conduisent à `false`; les `HttpClientErrorException` sont capturées. Les autres exceptions ne sont pas capturées par cette méthode. Les tests unitaires couvrent succès, résultat vide, incohérence et réponses/erreurs HTTP ciblées.
- **Kafka** : l'adaptateur forme le payload à partir de l'identifiant, du destinataire et de l'adresse, puis appelle le producteur généré. La configuration lie l'outbinding au topic. Aucun test propre au module événementiel n'a été identifié.
- **MCP** : le serveur Python appelle directement l'API REST; il ne constitue pas un nouvel accès au domaine ou à MongoDB. Il définit quatre tools, sans tool de suppression ni consultation d'une fiche par ID. Son README annonce davantage de tools, resources et prompts que ceux présents dans `server.py`. Le module fait une requête synchrone vers `/v3/api-docs` pendant son import, bien que l'initialisation automatique depuis OpenAPI soit commentée.
- **Résilience** : `application.yml` configure l'instance `apiIgn` (fenêtre 10 appels, minimum 5, taux d'échec 30 %, appels lents 50 % au-delà de 3 s, attente 60 s; timeout déclaré de 3 s). Un `ApiIgnHealthIndicator` expose l'état et des métriques du circuit. Toutefois, la méthode `validateCodePostal` ne porte pas l'annotation `@CircuitBreaker` et aucun fallback n'y est implémenté, alors que les commentaires et un test d'intégration décrivent un fallback quand le circuit est ouvert. L'activation réelle de l'aspect et le résultat effectif nécessitent une vérification d'exécution; la configuration seule ne prouve pas l'application du coupe-circuit.
- **Observabilité** : le delegate d'adresse et de situation pose des champs MDC, génère ou reprend un `X-Correlation-ID` et le retourne dans la réponse. Le code de publication ne transporte pas ce correlation ID dans le payload AsyncAPI. La configuration expose les endpoints Prometheus, health, info et metrics; l'accès effectif à ces endpoints et le détail retourné doivent être vérifiés selon l'environnement.

## Sécurité et confidentialité observées

Les éléments suivants décrivent l'état des sources, pas une revue de sécurité exhaustive :

- `SecurityConfig` désactive CSRF et autorise `anyRequest().permitAll()`; les origines CORS sont configurées à `"*"`. L'application déclare un schéma Bearer et le contrat mentionne JWT mais laisse la sécurité globale vide. Ces déclarations/configurations ne concordent pas et ne permettent pas d'affirmer que l'API exige une authentification.
- Les journaux du delegate incluent des valeurs de la nouvelle adresse et des coordonnées code postal/ville. Cela contredit le principe III de la [constitution](../../.specify/memory/constitution.md), qui demande d'exclure les données personnelles des logs. Aucun exemple nominatif ou détail réel n'est reproduit ici.
- La configuration Actuator expose plusieurs endpoints et demande `show-details: always`; l'accès et les détails visibles doivent être rapprochés des profils/environnements. Aucun profil source spécifique n'a été trouvé dans `src/main/resources` pendant l'inventaire.
- Les descriptions contractuelles d'audit, de chiffrement, de droits d'accès ou de conformité réglementaire ne constituent pas une preuve d'implémentation. Elles sont conservées comme affirmations à vérifier, non comme capacités confirmées.
- Le code MCP n'ajoute pas d'authentification aux appels HTTP et transporte des fiches de client; son README indique également que l'authentification MCP reste à ajouter. Les fichiers de configuration de clients contiennent des chemins absolus spécifiques à un poste; ils ne sont pas reproduits.

## Écarts entre contrats, modèles, code et tests

| Sujet | Sources en présence | Constat et impact documentaire |
|---|---|---|
| Verbe HTTP des modifications | OpenAPI et chemins générés depuis le contrat : `PUT`; commentaires du delegate : `PATCH`. | Documenter `PUT` comme méthode contractuelle et signaler les commentaires obsolètes/contradictoires. |
| Authentification | Description OpenAPI mentionne JWT; `security: []`; application déclare un schéma Bearer; `SecurityConfig` autorise toutes les requêtes. | L'exigence et l'exécution ne sont pas concordantes; ne pas affirmer que les routes sont protégées. |
| `LigneAdresse` | Modèle domaine et annotation Java excluent les chiffres; OpenAPI, AsyncAPI et Mongo les autorisent. | Les adresses numériques peuvent être acceptées à certaines frontières et rejetées par une autre; la règle métier attendue reste à arbitrer. |
| Validité de l'adresse | Cas d'usage appelle une API distante sur création et changement; configuration Resilience4j et commentaires parlent d'un fallback; l'adaptateur ne montre pas l'annotation ni le fallback. | Le comportement en panne n'est pas établi par la configuration seule; le test d'intégration ne remplace pas une preuve d'exécution réussie. |
| Publication d'événement | AsyncAPI décrit un changement d'adresse; le service publie après création et changement d'adresse. L'AsyncAPI déclare aussi un `receive` sans consommateur trouvé. | Le déclencheur réel est plus large que le libellé et l'opération de réception n'a pas d'implémentation identifiée. |
| Plage du nombre d'enfants | Contrats/modèles déclarent `0..20`; service domaine affecte la valeur sans contrôle explicite; tests d'intégration attendent un rejet des valeurs hors limites. | La validation semble être à la frontière HTTP; elle doit être distinguée de l'invariant domaine et retracée jusqu'aux sources générées/configurées. |
| Suppression d'une fiche absente | OpenAPI documente `404`; delegate appelle le service de suppression sans lecture préalable puis retourne `200`. | L'absence n'est pas traduite explicitement en `404` par le delegate/service. |
| Erreurs d'adresse invalide | Le handler global mappe `AdresseInvalideException` à `400`; la méthode `modifierAdresse` intercepte l'exception et retourne `422`. | Le code effectif dépend du chemin (création ou modification); le contrat le décrit différemment pour ces opérations. |
| Résilience et observabilité | Commentaires du delegate prétendent notamment corrélation propagée aux événements; payload AsyncAPI ne porte pas cette information. | La corrélation est visible dans les logs/headers HTTP, pas dans le payload de l'événement décrit. |
| Version OpenAPI | Contrat source déclare `2.1.0`; annotation/configuration applicative exposent respectivement `v1` et `1.0.0`. | Les métadonnées publiées peuvent différer du contrat source; vérifier le document effectivement servi avant de les traiter comme une seule version. |
| Échec simulé du dépôt | `ClientRepositoryImpl.enregistrer` lève une exception si le nom vaut `"Error"`. | Le cas ressemble à un mécanisme de simulation de panne dans le code de production; le rapport le documente comme comportement codé, pas comme règle métier. |
| Inventaire des tools MCP | README annonce sept tools, des resources et des prompts; `server.py` ne déclare que quatre tools et aucun décorateur resource/prompt. | La documentation MCP ne décrit pas l'interface actuellement implémentée. |
| Mode de transport MCP | README mentionne STDIO; le code lance HTTP sur loopback et `vscode-mcp.json` pointe vers un endpoint HTTP. Une configuration de client démarre directement le script. | Les modes de lancement et de connexion ne sont pas cohérents dans toutes les configurations. |
| Outil manuel MCP/API | Le script liste un `PUT /v1/connaissance-clients/{id}`; OpenAPI ne déclare pas cette route et le delegate n'expose pas de remplacement complet de fiche. | Ce scénario du script n'est pas pris en charge par le contrat observé. |
| Descriptions REST trop larges | La description `POST` cite un email absent des schémas; d'autres opérations parlent de pagination, cache, chiffrement, audit, archives et notifications non établis par les sources de code parcourues. | Ces affirmations doivent être classées comme documentaires tant qu'une implémentation ou un test ne les confirme pas. |
| Ressources de déploiement/test | Compose local, manifests Kubernetes et Dockerfile décrivent des environnements distincts; la configuration Kubernetes inclut un conteneur privilégié. | Les ressources ne prouvent pas un déploiement effectif ni une configuration de production approuvée. |

## Tests et niveau de preuve

Les sources comprennent onze classes de test :

- **Domaine** : tests service (lecture, création, modification, suppression) et modèles `Client`/`Adresse`.
- **API** : tests du delegate (mappings et statuts) et test d'intégration API couvrant liste/création et une requête invalide.
- **MongoDB** : tests du mapper avec/sans `ligne2` et tests du repository pour lecture, liste, sauvegarde et suppression.
- **Codes postaux** : tests unitaires des correspondances et réponses/erreurs HTTP, plus test d'intégration de l'API distante.
- **Application** : tests d'intégration de `PUT /adresse` (incluant événements et scénario de circuit ouvert annoncé) et de `PUT /situation` (404, valeurs aux bornes et valeurs hors plage).
- **MCP et ressources auxiliaires** : aucun test automatisé MCP n'a été trouvé; le script `interroge_api_connaissance_client.py` enchaîne des appels HTTP mais n'est pas une suite de tests. Compose, JMeter et Kubernetes sont des supports d'exécution/test, non des résultats de validation.

Les références complètes sont dans [l'inventaire de recherche](./research.md). Les tests n'ont pas été exécutés pour cette rétro-documentation; ce résumé décrit leur contenu lu, pas leur résultat. Aucun test spécifique de l'adaptateur événementiel n'a été localisé.

## Limites de l'analyse et points à arbitrer

- Les règles métier attendues lorsque contrats, modèles et implémentation se contredisent ne sont pas arbitrées ici.
- Le comportement réel du coupe-circuit, des exceptions réseau et de l'envoi Kafka en cas d'échec dépend de l'exécution et/ou des sources générées; l'analyse statique et les paramètres de configuration ne suffisent pas à le garantir.
- La présence d'un endpoint ou d'une annotation de sécurité dans les métadonnées n'établit pas à elle seule une politique effective d'autorisation par environnement.
- Les tests existants sont ciblés et peuvent inclure des doubles ou des services simulés; ils ne démontrent pas les comportements de tous les systèmes externes.
- Aucune donnée personnelle de jeu d'exemple n'est reproduite.

## Schéma d'architecture

Voir le [schéma Mermaid](./architecture.mmd). Il représente les appels synchrones aux ports/adaptateurs, l'appel HTTP externe, la publication Kafka et l'assemblage applicatif. Il ne dessine pas de consommateur Kafka car aucun n'a été identifié dans les sources applicatives recensées.

## Références sources

Les liens intégrés aux sections renvoient aux contrats, modèles, POM, code, configuration et constitution. Les tests précis sont listés dans [research.md](./research.md); les inventaires de contrats et de données restent consultables indépendamment dans [contracts/rest.md](./contracts/rest.md), [contracts/asyncapi.md](./contracts/asyncapi.md) et [data-model.md](./data-model.md).
