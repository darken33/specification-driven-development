# Quickstart - MVP Client List

## Prerequisites

- Node.js LTS installed
- npm installed
- Angular CLI available (global or via `npx`)

## Run locally

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

## Expected MVP behavior

- Home page displays client list from MSW mock (`GET /v1/connaissance-clients`)
- Loading indicator shown while request is in progress
- Empty state shown when mock returns empty list
- Error message + retry shown when mock returns `500`

## Test commands

```bash
cd frontend
npm test
```

Minimum validation for MVP:
- service test covers success/empty/error mapping
- component/container tests cover loading/empty/error/list rendering

## Switch mock scenarios

Use browser localStorage key `client-list-scenario` then reload:
- `success-non-empty`
- `success-empty`
- `error-500`

Example in browser console:

```js
localStorage.setItem('client-list-scenario', 'error-500');
```
