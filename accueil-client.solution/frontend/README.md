# Frontend MVP - Liste Clients

Application Angular POC pour afficher la liste des fiches client en s'appuyant sur un backend mocke via MSW.

## Stack

- Angular `21.2.x`
- TypeScript `5.9.x`
- RxJS `7.8.x`
- MSW `2.x`

## Installation

```bash
cd frontend
npm install
```

## Lancer en local

```bash
npm start
```

Puis ouvrir `http://localhost:4200`.

## Scenarios mock disponibles

La route `GET /v1/connaissance-clients` est simulee par MSW.

Par defaut: `success-non-empty`.

Pour changer le scenario dans la console navigateur:

```js
localStorage.setItem('client-list-scenario', 'success-empty');
localStorage.setItem('client-list-scenario', 'error-500');
localStorage.setItem('client-list-scenario', 'success-non-empty');
```

Puis recharger la page.

## Tests

```bash
npm test
```

## Lint / format

```bash
npm run lint
npm run format
```
