<!-- Auto-generated spec: client-detail-modals -->
# Spécification fonctionnelle — Écrans Détails & Modals

Short name: `client-detail-modals`

Résumé
-------
Cette spécification couvre les écrans restants du POC « Accueil Client » :

- Page **Nouveau client** (maquette_nouveau-client.png) — création d'une fiche via `POST /v1/connaissance-clients`.
- Page **Détail client** (maquette_detail-client.png) — consultation via `GET /v1/connaissance-clients/{id}`.
- Pop‑up **Modifier l'adresse** (maquette_modifier-adresse.png) — modification via `PUT /v1/connaissance-clients/{id}/adresse`.
- Pop‑up **Modifier la situation** (maquette_modifier-situation.png) — modification via `PUT /v1/connaissance-clients/{id}/situation`.
- Pop‑up **Supprimer le client** (maquette_supprimer-client.png) — suppression via `DELETE /v1/connaissance-clients/{id}`.

Clarifications
--------------
### Session 2026-06-02
- Q: Après une modification (`PUT`) de l'adresse ou de la situation, doit-on appliquer une mise à jour optimiste en local ou recharger la ressource depuis l'API ? → A: Option A — Re-fetch la ressource avec `GET /v1/connaissance-clients/{id}` après tout `PUT` réussi pour garantir la consistance.

Contrainte importante
---------------------
Le backend réel n'étant pas garanti pour le POC, toutes les interactions doivent disposer de mocks MSW couvrant cas nominal, erreurs de validation (400), erreurs serveur (500) et latence configurables.

Acteurs
-------
- Conseiller (utilisateur métier) — crée, consulte, modifie et supprime des fiches client.

User Stories (testables)
------------------------
1. En tant que Conseiller, je veux pouvoir créer une nouvelle fiche client pour enregistrer un prospect, afin qu'il apparaisse dans la liste.
   - Critères d'acceptation: formulaire validé côté client; `POST /v1/connaissance-clients` retourne `201` avec l'ID; après création, redirection vers la page détail du client.

2. En tant que Conseiller, je veux consulter le détail d'une fiche client pour voir l'adresse et la situation familiale.
   - Critères d'acceptation: `GET /v1/connaissance-clients/{id}` retourne `200` avec la fiche complète; la page affiche nom, adresse (ligne1, code postal, ville) et situation.

3. En tant que Conseiller, je veux modifier l'adresse d'un client via un modal, afin de corriger une adresse erronée.
   - Critères d'acceptation: formulaire dans le modal valide les champs requis (`ligne1`, `codePostal`, `ville`) ; `PUT /v1/connaissance-clients/{id}/adresse` retourne `200` ; UI met à jour l'adresse affichée sans recharger la page.

4. En tant que Conseiller, je veux modify la situation familiale et nombre d'enfants via un modal.
   - Critères d'acceptation: `PUT /v1/connaissance-clients/{id}/situation` retourne `200`; la fiche affichée met à jour la situation et le compteur d'enfants.

5. En tant que Conseiller, je veux supprimer définitivement une fiche client (confirmation requise) ; l'action est irréversible.
   - Critères d'acceptation: modal de confirmation affiché; `DELETE /v1/connaissance-clients/{id}` retourne `200`; après suppression la navigation retourne à la liste et le client n'apparaît plus.

Parcours utilisateur & scénarios de test
---------------------------------------
- Nouveau client — Happy path: remplir tous les champs obligatoires -> bouton `Enregistrer` actif -> mock `201` -> rediriger vers `GET /v1/connaissance-clients/{newId}` -> afficher détail.
- Nouveau client — Validation: laisser `nom` vide -> le formulaire empêche l'envoi et affiche message d'erreur local.
- Détail client — Chargement: afficher skeleton / loader pendant la requête; gérer `404` (afficher message 'fiche introuvable') et `500` (alerte technique et option réessayer).
- Modifier adresse — Happy path: modal ouvre pré‑rempli -> modifier -> `PUT` retourne `200` -> toast succès -> modal ferme -> détail rafraîchi.
- Modifier situation — Happy path comparable.
- Supprimer client — Confirm: cliquer supprimer -> modal de confirmation -> `DELETE` retourne `200` -> redirect vers liste -> mock liste sans ce client.

Note d'intégration: Conformément à la clarification ci‑dessus, tous les scénarios de `PUT` (adresse / situation) doivent déclencher, après réception d'un code `200`, une requête `GET /v1/connaissance-clients/{id}` pour récupérer la ressource mise à jour et remplacer l'état local (pas d'update uniquement optimiste).

Mapping API (contrat OpenAPI)
----------------------------
- `POST /v1/connaissance-clients` — corps: `ConnaissanceClientIn` (voir `input/connaissance-client-api.yaml` `ConnaissanceClientIn`).
- `GET /v1/connaissance-clients/{id}` — retourne `ConnaissanceClient`.
- `PUT /v1/connaissance-clients/{id}/adresse` — corps: `Adresse`.
- `PUT /v1/connaissance-clients/{id}/situation` — corps: `Situation`.
- `DELETE /v1/connaissance-clients/{id}` — suppression définitive.

Formulaires & validations (résumé testable)
-----------------------------------------
- Nouveau client:
  - `nom`: required, ChaineAlpha (min 2, max 50, pattern) — message: "Nom requis / format invalide"
  - `prenom`: optional but recommended (ChaineAlpha)
  - `adresse.ligne1`: required, LigneAdresse
  - `adresse.codePostal`: required, CodePostal (5 chars)
  - `adresse.ville`: required, ChaineAlpha
  - `situation.situationFamiliale`: required, enum `SituationFamiliale`
  - `situation.nombreEnfants`: required, integer >=0

- Modifier adresse: mêmes validations que `Adresse`.
- Modifier situation: `situationFamiliale` enum + `nombreEnfants` integer range 0–20.

Routes UI
---------
- `/clients/new` → page Nouveau client (formulaire)
- `/clients/:id` → page Détail client (actions: modifier adresse, modifier situation, supprimer)

MSW Mock Scénarios (à implémenter)
---------------------------------
Pour chaque endpoint, fournir handlers MSW réutilisables avec switches de scénario (query param `?scenario=` ou header `x-msw-scenario`):
- `success` — réponse nominale (`200` ou `201`).
- `validation_error` — réponse `400` avec payload `ApiErrorResponse` et messages de champ.
- `server_error` — réponse `500`.
- `slow` — latence élevée (ex: 2s).

Tests demandés
-------------
- Unitaires: composants de formulaire (validation), services d'API (mocks MSW), facade/state (chargement/erreur/succès).
- Intégration (E2E léger): scénario création -> redirection -> détail, modification adresse -> détail mis à jour, suppression -> liste mise à jour. Ces tests peuvent être run avec MSW en mode headless.

Success Criteria (mesurable)
---------------------------
- 100% des user stories ci‑dessus ont des critères d'acceptation testables.
- Formulaires refusent l'envoi si champs obligatoires invalides (contrôlé par tests unitaires).
- Les handlers MSW couvrent les 4 scénarios par endpoint.

- Après `PUT` réussi, l'UI effectue obligatoirement un `GET /v1/connaissance-clients/{id}` pour synchroniser l'état; les tests doivent vérifier cette requête de re-fetch.

Données / Entités clés
----------------------
- `ConnaissanceClient` (id, nom, prenom, adresse, situationFamiliale, nombreEnfants)
- `Adresse` (ligne1, ligne2, codePostal, ville)
- `Situation` (situationFamiliale, nombreEnfants)

Assomptions
-----------
- Authentification non traitée pour le POC (pas de header Authorization dans les mocks).
- Les maquettes fournies couvrent l'UX nécessaire; petites adaptations CSS autorisées pour responsive.

Livrables
---------
- `specs/002-client-detail-modals/spec.md` (ce fichier)
- `specs/002-client-detail-modals/checklists/requirements.md` (checklist qualité)
- `.specify/feature.json` mis à jour avec le chemin du dossier de spec

-- Fin de spécification (à valider) --
