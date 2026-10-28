# Inventaire du contrat REST

**Source** : [connaissance-client-api.yaml](../../../connaissance-client-api/src/main/resources/connaissance-client-api.yaml) — OpenAPI 3.0.1, version déclarée `2.1.0`, serveur de développement `http://localhost:8080`.

Ce fichier résume le contrat source sans en devenir une copie normative. Les descriptions narratives, réponses déclarées et comportements du delegate doivent être comparés au fil de l'analyse.

## Opérations déclarées

| Méthode et chemin | Operation ID | Résultat et réponses déclarées |
|---|---|---|
| `GET /v1/connaissance-clients` | `getConnaissanceClients` | `200` liste; `400`, `401`, `403`, `409` erreurs. |
| `POST /v1/connaissance-clients` | `saveConnaissanceClient` | Corps `ConnaissanceClientIn`; `201` fiche créée; `400`, `401`, `403`, `409` erreurs. |
| `GET /v1/connaissance-clients/{id}` | `getConnaissanceClient` | `id` au format UUID; `200` fiche; `400`, `404`, `500` erreurs. |
| `DELETE /v1/connaissance-clients/{id}` | `deleteConnaissanceClient` | `id` au format UUID; `200` sans corps; `400`, `404`, `500` erreurs. |
| `PUT /v1/connaissance-clients/{id}/adresse` | `modifierAdresse` | Corps `Adresse`; `200` fiche modifiée; `400`, `404`, `422`, `500` erreurs. |
| `PUT /v1/connaissance-clients/{id}/situation` | `modifierSituation` | Corps `Situation`; `200` fiche modifiée; `400`, `404`, `500` erreurs. |

## Schémas principaux

- `ConnaissanceClient` et `ConnaissanceClientIn` : nom, prénom, ligne 1, code postal, ville, situation familiale et nombre d'enfants requis; ligne 2 optionnelle; identifiant uniquement dans la fiche de sortie.
- `Adresse` : ligne 1, code postal et ville requis; ligne 2 optionnelle.
- `Situation` : situation familiale et nombre d'enfants requis.
- `SituationFamiliale` : `CELIBATAIRE`, `MARIE`, `DIVORCE`, `VEUF`, `PACSE`.
- `NombreEnfants` : entier entre 0 et 20.
- Les schémas de chaînes déclarent des longueurs de 2 à 50 caractères et des motifs; le motif d'adresse permet les chiffres.
- Le schéma commun d'erreur expose timestamp, statut, erreur, message et chemin.

## Confrontation initiale avec le code

- Le delegate appelle les cas d'usage du domaine et réalise les conversions DTO/domaine. La création retourne `201`; la lecture d'un identifiant absent et la suppression sont traitées dans le delegate.
- Le contrat utilise `PUT` pour les sous-ressources adresse et situation, tandis que leurs commentaires Java les qualifient de `PATCH`. La méthode générée et la route réellement exposée doivent être vérifiées avec le contrat et le code généré, sans prendre les commentaires pour la route.
- La description du contrat évoque JWT, mais son champ global `security` est vide. L'application déclare un schéma Bearer tandis que la configuration de sécurité visible autorise toute requête. Cette contradiction doit être qualifiée comme écart documentaire/configuration, pas transformée en assertion de protection.
- La description de création mentionne chiffrement, audit et émission d'événement; ces affirmations ne sont pas déduites du seul contrat. Le code métier observé publie un événement d'adresse après création et changement d'adresse; la preuve d'un chiffrement ou d'un audit doit être recherchée et explicitée.
- Les contrats des modifications déclarent des erreurs et des validations; la rétro-spécification devra séparer réponse contractuelle et réponse effective sur chaque chemin d'exécution.
- La description de création parle de création **ou mise à jour**, mais l'opération `POST` et l'implémentation observée créent une fiche. Elle mentionne également une validation email alors qu'aucun champ email n'existe dans le schéma.
- Plusieurs descriptions mentionnent pagination, cache, chiffrement, audit, notifications, archivage ou règles d'unicité sans paramètres/schémas associés dans le contrat. Leur réalisation doit être cherchée dans le code avant de les présenter comme des capacités; la liste des opérations ne définit pas de pagination.

## Contrat HTTP externe de codes postaux

**Source** : [code-postaux-api.yaml](../../../connaissance-client-cp-adapter/src/main/resources/code-postaux-api.yaml) — Swagger 2.0, version `1.0.0`, hôte `apicarto.ign.fr`, base `/api`.

| Méthode et chemin | Paramètre | Réponse déclarée |
|---|---|---|
| `GET /api/codes-postaux/communes/{codePostal}` | `codePostal` requis | `200`, tableau de `Commune` (`codePostal`, `codeCommune`, `nomCommune`, `libelleAcheminement`). |

L'adaptateur généré est appelé par `CodePostauxServiceImpl`; le service fournit le code postal et vérifie localement si le nom de commune retourné correspond à la ville demandée. Les réponses d'erreur, timeouts et comportements de repli ne sont pas définis par ce petit contrat source; voir la [confrontation runtime](../retro-specification.md#intégrations-configuration-et-exploitation).

## Client MCP et alignement des routes

Le serveur auxiliaire `connaissance-client-mcp/server.py` implémente quatre tools : liste (`GET` collection), création (`POST` collection), changement d'adresse (`PUT` sous-ressource adresse) et changement de situation (`PUT` sous-ressource situation). Il n'implémente pas le détail par identifiant, la suppression ni le remplacement complet de la fiche annoncés par son README. Le script `interroge_api_connaissance_client.py` énumère en plus un `PUT /v1/connaissance-clients/{id}` qui n'est pas défini dans le contrat OpenAPI.

Le MCP adresse l'API sur une URL locale fixe, n'ajoute pas de jeton d'authentification et ne contient pas de test automatisé identifié. Cette observation décrit le code fourni, pas un protocole de sécurité souhaité.

## Sources de corroboration

- Implémentation de la délégation : `connaissance-client-api/src/main/java/.../ConnaissanceClientDelegate.java`.
- Modèle DTO généré : `connaissance-client-api/target/generated-sources/` (comparaison seulement).
- Configuration de sécurité et assemblage : `connaissance-client-app/src/main/java/.../SecurityConfig.java` et `ConnaissanceClientApplication.java`.
- Tests : tests API et tests d'intégration sous les modules API et application.
