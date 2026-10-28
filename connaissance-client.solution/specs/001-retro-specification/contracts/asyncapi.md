# Inventaire du contrat événementiel

**Source** : [adresse-asyncapi-3.yaml](../../../connaissance-client-event-adapter/src/main/resources/adresse-asyncapi-3.yaml) — AsyncAPI 3.0, version déclarée `1.0.0`.

## Canal et opérations

- Canal : `event.adresse.v1`, décrit comme le topic où les messages d'adresse peuvent être publiés et consommés.
- Serveur déclaré : `localhost:9092`, protocole `kafka`, contexte local de test.
- Message : `adresseMessage`, contenu JSON, payload `AdresseMessagePayload`.
- Opérations déclarées : `sendAdresseMessage` (`send`) et `receiveAdresseMessage` (`receive`).
- Trait Kafka : groupe déclaré `my-group-id`.

## Payload déclaré

`AdresseMessagePayload` porte `clientId` au format UUID et un objet `adresse` composé de `destinataire`, `ligne1`, `ligne2`, `codePostal` et `ville`. Le contrat définit les contraintes des chaînes; il ne déclare pas de liste `required` sur ces schémas.

## Confrontation initiale avec le code et la configuration

- Le port métier `AdresseEventService` est appelé après l'enregistrement d'une fiche créée ou dont l'adresse a changé; le changement de situation familiale n'appelle pas ce port.
- L'adaptateur événementiel construit le payload et le transmet au producteur généré. La configuration applicative lie la sortie `send-adresse-message-out-0` au topic `event.adresse.v1`.
- Le code applicatif parcouru identifie la publication; aucun consommateur applicatif implémentant l'opération `receive` n'a été identifié dans l'inventaire initial. L'opération de réception est donc une capacité déclarée par contrat, pas un consommateur dont l'existence est établie.
- La persistance intervient avant l'appel de publication dans les cas de création et de changement d'adresse. La cohérence transactionnelle entre MongoDB et Kafka, le comportement d'échec et le résultat effectif du producteur sont à vérifier dans le code généré pertinent, les configurations et les tests.
- Le nom et la description du message parlent d'un changement d'adresse alors qu'un message est aussi déclenché lors de la création d'une fiche. Signaler cet écart sans décider si le contrat ou l'implémentation doit évoluer.

## Sources de corroboration

- Port et cas d'usage : `connaissance-client-domain/src/main/java/.../ports/AdresseEventService.java` et `ConnaissanceClientServiceImpl.java`.
- Adaptateur producteur : `connaissance-client-event-adapter/src/main/java/.../AdresseEventServiceImpl.java`.
- Liaison Kafka : `connaissance-client-app/src/main/resources/application.yml`.
- Génération : le POM du module utilise AsyncAPI pour générer les modèles et le producteur `sendAdresseMessage`; les sources générées ne sont pas normatives.
- Sources générées sous `target/generated-sources/` : comparaison uniquement, jamais référence canonique.
