# Quickstart — Client Detail & Modals

## Prerequis

- Node.js et npm installes
- Dependencies frontend installees (`npm install` dans `frontend/`)

## Lancer l'application

```bash
cd frontend
npm start
```

## Scenarios MSW

Les handlers `client-management` supportent le scenario via query param `?scenario=` ou header `x-msw-scenario`:

- `success`
- `validation_error`
- `server_error`
- `slow`

Exemples d'URL utiles:

- Creation client nominale:
  - `POST /v1/connaissance-clients?scenario=success`
- Erreur validation creation:
  - `POST /v1/connaissance-clients?scenario=validation_error`
- Detail client introuvable (fixture absente):
  - `GET /v1/connaissance-clients/{id}` avec un `id` non present
- Mise a jour adresse lente:
  - `PUT /v1/connaissance-clients/{id}/adresse?scenario=slow`

## Parcours fonctionnels

1. Ouvrir la liste clients: `/clients`
2. Creer un client: `/clients/new`
3. Verifier redirection automatique vers `/clients/:id` apres creation
4. Depuis le detail:
   - Modifier l'adresse
   - Modifier la situation
   - Supprimer le client

## Regle importante de coherence

Apres chaque `PUT` reussi (`/adresse` ou `/situation`), la facade effectue un `GET /v1/connaissance-clients/{id}` pour recharger la fiche et synchroniser l'etat UI.

## Validation technique

```bash
cd frontend
npm test -- --run --include src/app/features/client-management/**/*.spec.ts
```
