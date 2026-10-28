# Modèle de données observé

Cette vue distingue les définitions déclaratives, le modèle métier Java, la représentation MongoDB et les formes exposées dans l'API ou l'événement. Les contraintes déclarées ne sont pas automatiquement réputées appliquées à l'exécution.

## Entités et valeurs métier

### Client

Fiche métier identifiée par un UUID. Le modèle de domaine référence les éléments suivants :

| Champ | Type métier | Déclaré / observé |
|---|---|---|
| `id` | UUID | Identifiant unique, clé primaire, requis dans le modèle déclaratif; généré à la création par le constructeur métier sans identifiant. |
| `nom` | `Nom` | Requis; valeur textuelle déclarée entre 2 et 50 caractères. |
| `prenom` | `Prenom` | Requis; valeur textuelle déclarée entre 2 et 50 caractères. |
| `adresse` | `Adresse` | Requise; valeur structurée détaillée ci-dessous. |
| `situationFamiliale` | `SituationFamiliale` | Requise; `CELIBATAIRE`, `MARIE`, `PACSE`, `DIVORCE` ou `VEUF`. |
| `nombreEnfants` | entier | Requis; le modèle déclaratif domaine et les contrats déclarent une plage de 0 à 20. |

Source prioritaire : [modèle de domaine](../../connaissance-client-domain/src/main/resource/domain-model.yml). Modèle Java : `Client`, `SituationFamiliale` et les types dans `connaissance-client-domain/src/main/java/...`.

### Contraintes déclarées par champ

| Champs | Contraintes déclaratives principales |
|---|---|
| `Nom`, `Prenom`, `Ville` | `minLength: 2`, `maxLength: 50`, `pattern: "^[a-zA-Z ,.'-]+$"`. |
| `LigneAdresse` dans le modèle domaine/type Java | `minLength: 2`, `maxLength: 50`, `pattern: "^[a-zA-Z ,.'-]+$"`; le contrat REST/AsyncAPI et le modèle MongoDB autorisent les chiffres avec `^[a-zA-Z0-9 ,.'-]+$`. |
| `CodePostal` | `minLength: 5`, `maxLength: 5`, `pattern: "^[A-Z0-9]+$"`. |
| `situationFamiliale` | Enum `CELIBATAIRE`, `MARIE`, `PACSE`, `DIVORCE`, `VEUF`. |
| `nombreEnfants` | `minimum: 0`, `maximum: 20`. |
| `ligne2` | Optionnelle dans l'adresse domaine, les DTO et le document MongoDB. |

### Adresse

Objet valeur contenu dans la fiche client :

| Champ | Type | Cardinalité déclarée |
|---|---|---|
| `ligne1` | `LigneAdresse` | Requis |
| `ligne2` | `LigneAdresse` | Optionnel |
| `codePostal` | `CodePostal` | Requis; cinq caractères alphanumériques majuscules dans les contrats et modèles. |
| `ville` | `Ville` | Requise |

Le service métier demande une validation de la cohérence code postal/ville lors de la création et d'un changement d'adresse. Le mode de validation de l'indisponibilité du service externe doit être décrit d'après le code réel et les tests, pas d'après la seule documentation.

### Types valeur

`Nom`, `Prenom`, `LigneAdresse`, `CodePostal` et `Ville` sont des types métier distincts. Les modèles déclaratifs fournissent des longueurs et motifs; des annotations Java déclarent également certaines contraintes. L'application effective de ces contraintes par validation automatique reste à établir pour chaque frontière.

## Représentation MongoDB

Le modèle déclaratif [MongoDB](../../connaissance-client-db-adapter/src/main/resource/mongodb-model.yml) nomme la collection `connaissanceclient`. Le document persistant contient `id`, `nom`, `prenom`, `ligne1`, `ligne2`, `codePostal`, `ville`, `situationFamiliale` et `nombreEnfants`. L'adresse métier est donc aplatie en champs de premier niveau dans la représentation déclarée et dans `ClientDb`.

`ligne2` est optionnelle; les autres champs sont déclarés requis. Les contraintes textuelles, l'enum de situation familiale et la plage de `nombreEnfants` sont décrites dans le modèle déclaratif. L'identifiant Java de persistance est une chaîne convertie depuis/vers l'UUID métier.

## Représentation REST

Le contrat REST expose une fiche aplatie avec `id`, les champs de nom, prénom et adresse, la situation familiale et le nombre d'enfants. La forme de création omet l'identifiant; les sous-ressources d'adresse et de situation ont leurs propres corps de requête. Voir [inventaire OpenAPI](./contracts/rest.md) et le [contrat source](../../connaissance-client-api/src/main/resources/connaissance-client-api.yaml).

## Message événementiel

Le payload `AdresseMessagePayload` contient un `clientId` et un objet `adresse` avec `destinataire`, `ligne1`, `ligne2`, `codePostal` et `ville`. Voir [inventaire AsyncAPI](./contracts/asyncapi.md) et le [contrat source](../../connaissance-client-event-adapter/src/main/resources/adresse-asyncapi-3.yaml).

## Écarts déclaratifs à analyser

- Les motifs de `LigneAdresse` divergent : domaine déclaratif et type Java acceptent les lettres et ponctuations listées, mais pas les chiffres; REST, AsyncAPI et modèle MongoDB autorisent les chiffres.
- Les exemples contractuels incluent des caractères accentués alors que plusieurs motifs déclarés sont limités à `a-zA-Z`; l'acceptation réelle doit être vérifiée et documentée.
- Le modèle du domaine encapsule l'adresse et ses types valeur; MongoDB et le DTO REST l'aplatissent. La rétro-spécification devra suivre explicitement ces conversions.
- Les modèles de domaine et MongoDB sont au statut `draft`; leur statut ne doit pas être présenté comme validation métier formelle.
- Les annotations Bean Validation visibles sur les types Java sont des métadonnées; leur exécution effective dans tous les parcours doit être vérifiée aux frontières et dans les tests. `Client` ne porte pas de validation directe de plage pour `nombreEnfants`.
