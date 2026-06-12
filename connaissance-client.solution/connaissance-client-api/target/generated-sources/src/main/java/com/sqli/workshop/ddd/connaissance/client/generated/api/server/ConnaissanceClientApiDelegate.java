package com.sqli.workshop.ddd.connaissance.client.generated.api.server;

import com.sqli.workshop.ddd.connaissance.client.generated.api.model.AdresseDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.ApiErrorResponseDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.ConnaissanceClientDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.ConnaissanceClientInDto;
import com.sqli.workshop.ddd.connaissance.client.generated.api.model.SituationDto;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import jakarta.annotation.Generated;

/**
 * A delegate to be called by the {@link ConnaissanceClientApiController}}.
 * Implement this interface with a {@link org.springframework.stereotype.Service} annotated class.
 */
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", comments = "Generator version: 7.18.0")
public interface ConnaissanceClientApiDelegate {

    default Optional<NativeWebRequest> getRequest() {
        return Optional.empty();
    }

    /**
     * DELETE /v1/connaissance-clients/{id} : Suppression définitive d&#39;une fiche de connaissance client
     * Supprime définitivement une fiche de connaissance client du système.  **⚠️ ATTENTION : Opération irréversible**  **Cas d&#39;usage :** - Suppression demandée par le client (RGPD/droit à l&#39;oubli) - Nettoyage de données de test ou doublons - Archivage avec suppression des données sensibles  **Contrôles de sécurité :** - Vérification des droits de suppression - Audit trail obligatoire avec traçabilité - Confirmation requise pour les comptes actifs  **Impact :** - Suppression en cascade des données liées - Notification automatique aux systèmes dépendants - Archive des métadonnées pour audit (sans données personnelles)  **Réglementation :** - Conforme RGPD pour le droit à l&#39;oubli - Respect des délais de conservation légaux 
     *
     * @param id Identifiant unique de la fiche à supprimer au format UUID. La fiche doit exister et être accessible à l&#39;utilisateur.  (required)
     * @return Suppression de la fiche effectuée (status code 200)
     *         or Invalid Request (status code 400)
     *         or Not Found (status code 404)
     *         or Unexpected server error (status code 500)
     * @see ConnaissanceClientApi#deleteConnaissanceClient
     */
    default ResponseEntity<Void> deleteConnaissanceClient(UUID id) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * GET /v1/connaissance-clients/{id} : Consultation d&#39;une fiche de connaissance client spécifique
     * Récupère une fiche de connaissance client spécifique via son identifiant unique.  **Cas d&#39;usage :** - Affichage du détail d&#39;un client pour consultation - Pré-remplissage de formulaires de modification - Vérification des informations avant mise à jour - Export des données d&#39;un client spécifique  **Sécurité :** - Seuls les utilisateurs autorisés peuvent accéder aux données - Les données sensibles sont déchiffrées à la volée - Audit trail automatique de l&#39;accès aux données  **Performance :** - Cache activé pour 5 minutes sur les données peu modifiées - Temps de réponse typique : &lt; 100ms 
     *
     * @param id Identifiant unique de la fiche de connaissance client au format UUID. Cet identifiant est généré automatiquement lors de la création.  (required)
     * @return Réponse pour une requête valide (retour d&#39;une fiche de connaissance client) (status code 200)
     *         or Invalid Request (status code 400)
     *         or Not Found (status code 404)
     *         or Unexpected server error (status code 500)
     * @see ConnaissanceClientApi#getConnaissanceClient
     */
    default ResponseEntity<ConnaissanceClientDto> getConnaissanceClient(UUID id) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"ligne2\" : \"48 rue bauducheu\", \"ville\" : \"Philippe\", \"ligne1\" : \"48 rue bauducheu\", \"situationFamiliale\" : \"CELIBATAIRE\", \"id\" : \"8a9204f5-aa42-47bc-9f04-17caab5deeee\", \"codePostal\" : \"33800\", \"nom\" : \"Philippe\", \"prenom\" : \"Philippe\", \"nombreEnfants\" : 1 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * GET /v1/connaissance-clients : Consultation de toutes les fiches de connaissance client
     * Récupère la liste complète des fiches de connaissance client disponibles.  **Cas d&#39;usage :** - Affichage de la liste des clients pour sélection - Export des données clients - Recherche globale dans la base clients  **Réponse :** - Retourne un tableau de fiches clients avec toutes leurs informations - Liste vide si aucun client n&#39;est enregistré  **Performance :** - Limite recommandée : utiliser la pagination pour de gros volumes - Temps de réponse typique : &lt; 2 secondes 
     *
     * @return Réponse pour une requête valide (status code 200)
     *         or Invalid Request (status code 400)
     *         or Access forbidden (status code 401)
     *         or Access denied (status code 403)
     *         or Conflict (status code 409)
     * @see ConnaissanceClientApi#getConnaissanceClients
     */
    default ResponseEntity<List<ConnaissanceClientDto>> getConnaissanceClients() {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "[ { \"ligne2\" : \"48 rue bauducheu\", \"ville\" : \"Philippe\", \"ligne1\" : \"48 rue bauducheu\", \"situationFamiliale\" : \"CELIBATAIRE\", \"id\" : \"8a9204f5-aa42-47bc-9f04-17caab5deeee\", \"codePostal\" : \"33800\", \"nom\" : \"Philippe\", \"prenom\" : \"Philippe\", \"nombreEnfants\" : 1 }, { \"ligne2\" : \"48 rue bauducheu\", \"ville\" : \"Philippe\", \"ligne1\" : \"48 rue bauducheu\", \"situationFamiliale\" : \"CELIBATAIRE\", \"id\" : \"8a9204f5-aa42-47bc-9f04-17caab5deeee\", \"codePostal\" : \"33800\", \"nom\" : \"Philippe\", \"prenom\" : \"Philippe\", \"nombreEnfants\" : 1 } ]";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * PUT /v1/connaissance-clients/{id}/adresse : Modification complète de l&#39;adresse du client (recommandé)
     * Modifie uniquement l&#39;adresse d&#39;une fiche de connaissance client existante.  **✅ Bonnes pratiques REST** : PUT est le verbe recommandé pour les modifications complètes (ici la ressource adresse).  **Cas d&#39;usage :** - Déménagement du client - Correction d&#39;une adresse erronée - Mise à jour suite à un changement de domicile  **Validation :** - Le client doit exister (erreur 404 sinon) - L&#39;adresse est validée via l&#39;API IGN (code postal/ville cohérents) - En cas d&#39;échec de validation externe, erreur 422  **Comportement :** - Seule l&#39;adresse est modifiée (nom, prénom, situation inchangés) - Un événement Kafka est publié pour notifier le changement d&#39;adresse - Audit trail avec traçabilité complète - Validation externe avec circuit breaker (résilience)  **Performance :** - Temps de réponse typique : &lt; 2s (avec validation API IGN) - Circuit breaker actif pour l&#39;API IGN (3 échecs → skip 60s) 
     *
     * @param id Identifiant unique de la fiche client au format UUID. La fiche doit exister et être accessible à l&#39;utilisateur.  (required)
     * @param adresseDto La nouvelle adresse du client. Tous les champs obligatoires doivent être fournis (ligne1, codePostal, ville).  (required)
     * @return Adresse modifiée avec succès. Retourne la fiche client complète avec la nouvelle adresse. Un événement Kafka a été publié pour notifier le changement.  (status code 200)
     *         or Requête invalide. - Format JSON incorrect - Champ obligatoire manquant (ligne1, codePostal, ville) - Format de code postal invalide (doit être 5 chiffres)  (status code 400)
     *         or Client introuvable. Aucune fiche client n&#39;existe avec cet identifiant.  (status code 404)
     *         or Adresse invalide. Le code postal et la ville ne correspondent pas (validation API IGN échouée).  (status code 422)
     *         or Erreur serveur inattendue. Une erreur interne s&#39;est produite lors du traitement de la requête.  (status code 500)
     * @see ConnaissanceClientApi#modifierAdresse
     */
    default ResponseEntity<ConnaissanceClientDto> modifierAdresse(UUID id,
        AdresseDto adresseDto) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"ligne2\" : \"48 rue bauducheu\", \"ville\" : \"Philippe\", \"ligne1\" : \"48 rue bauducheu\", \"situationFamiliale\" : \"CELIBATAIRE\", \"id\" : \"8a9204f5-aa42-47bc-9f04-17caab5deeee\", \"codePostal\" : \"33800\", \"nom\" : \"Philippe\", \"prenom\" : \"Philippe\", \"nombreEnfants\" : 1 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * PUT /v1/connaissance-clients/{id}/situation : Modification complète de la situation familiale (recommandé)
     * Modifie uniquement la situation familiale et le nombre d&#39;enfants d&#39;un client existant.  **✅ Bonnes pratiques REST** : PUT est le verbe recommandé pour les modifications complètes (ici la ressource situation).  **Cas d&#39;usage :** - Changement d&#39;état civil (mariage, divorce, veuvage) - Naissance ou adoption d&#39;enfant(s) - Mise à jour suite à un événement de vie - Correction d&#39;informations familiales erronées  **Validation :** - Le client doit exister (erreur 404 sinon) - La situation familiale doit être valide (CELIBATAIRE, MARIE, DIVORCE, VEUF, PACSE) - Le nombre d&#39;enfants doit être entre 0 et 20 - Cohérence métier : un célibataire peut avoir des enfants  **Comportement :** - Seule la situation familiale est modifiée (nom, prénom, adresse inchangés) - Aucun événement Kafka n&#39;est publié (pas de changement d&#39;adresse) - Audit trail avec traçabilité complète - Opération transactionnelle  **Règles métier :** - Un client célibataire peut avoir des enfants (garde alternée, adoption, etc.) - Le nombre d&#39;enfants peut être 0 même si marié - La situation PACSE est acceptée (Pacte Civil de Solidarité)  **Performance :** - Temps de réponse typique : &lt; 100ms - Pas de validation externe requise 
     *
     * @param id Identifiant unique de la fiche client au format UUID. La fiche doit exister et être accessible à l&#39;utilisateur.  (required)
     * @param situationDto La nouvelle situation familiale du client. Tous les champs doivent être fournis (situationFamiliale, nombreEnfants).  (required)
     * @return Situation familiale modifiée avec succès. Retourne la fiche client complète avec la nouvelle situation.  (status code 200)
     *         or Requête invalide. - Format JSON incorrect - Champ obligatoire manquant - Situation familiale invalide (doit être CELIBATAIRE, MARIE, DIVORCE, VEUF, PACSE) - Nombre d&#39;enfants invalide (doit être entre 0 et 20)  (status code 400)
     *         or Client introuvable. Aucune fiche client n&#39;existe avec cet identifiant.  (status code 404)
     *         or Unexpected server error (status code 500)
     * @see ConnaissanceClientApi#modifierSituation
     */
    default ResponseEntity<ConnaissanceClientDto> modifierSituation(UUID id,
        SituationDto situationDto) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"ligne2\" : \"48 rue bauducheu\", \"ville\" : \"Philippe\", \"ligne1\" : \"48 rue bauducheu\", \"situationFamiliale\" : \"CELIBATAIRE\", \"id\" : \"8a9204f5-aa42-47bc-9f04-17caab5deeee\", \"codePostal\" : \"33800\", \"nom\" : \"Philippe\", \"prenom\" : \"Philippe\", \"nombreEnfants\" : 1 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

    /**
     * POST /v1/connaissance-clients : Création d&#39;une nouvelle fiche de connaissance client
     * Crée une nouvelle fiche de connaissance client dans le système.  **Cas d&#39;usage :** - Enregistrement d&#39;un nouveau client lors de l&#39;onboarding - Import de données clients depuis un système externe - Saisie manuelle par un conseiller  **Validation :** - Tous les champs obligatoires doivent être fournis - Le format des données est vérifié (email, code postal, etc.) - La cohérence des informations familiales est contrôlée  **Résultat :** - La fiche créée est retournée avec son ID généré - Un événement de création est émis pour notification  **Règles métier :** - Un client ne peut avoir qu&#39;une seule fiche active - Les informations personnelles sont chiffrées en base 
     *
     * @param connaissanceClientInDto La fiche de connaissance client à enregister (required)
     * @return Réponse pour une requête valide (création ou mise à jour d&#39;une fiche de connaissance client) (status code 201)
     *         or Invalid Request (status code 400)
     *         or Access forbidden (status code 401)
     *         or Access denied (status code 403)
     *         or Conflict (status code 409)
     * @see ConnaissanceClientApi#saveConnaissanceClient
     */
    default ResponseEntity<ConnaissanceClientDto> saveConnaissanceClient(ConnaissanceClientInDto connaissanceClientInDto) {
        getRequest().ifPresent(request -> {
            for (MediaType mediaType: MediaType.parseMediaTypes(request.getHeader("Accept"))) {
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"ligne2\" : \"48 rue bauducheu\", \"ville\" : \"Philippe\", \"ligne1\" : \"48 rue bauducheu\", \"situationFamiliale\" : \"CELIBATAIRE\", \"id\" : \"8a9204f5-aa42-47bc-9f04-17caab5deeee\", \"codePostal\" : \"33800\", \"nom\" : \"Philippe\", \"prenom\" : \"Philippe\", \"nombreEnfants\" : 1 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
                if (mediaType.isCompatibleWith(MediaType.valueOf("application/json"))) {
                    String exampleString = "{ \"path\" : \"/connaissance-clients\", \"error\" : \"Bad Request\", \"message\" : \"Validation failed for object='connaissanceClientInDto'. Error count: 1\", \"timestamp\" : \"2017-07-21T17:32:28.437Z\", \"status\" : 400 }";
                    ApiUtil.setExampleResponse(request, "application/json", exampleString);
                    break;
                }
            }
        });
        return new ResponseEntity<>(HttpStatus.NOT_IMPLEMENTED);

    }

}
