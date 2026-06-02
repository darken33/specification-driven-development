# Frontend API Consumer Contract

This document defines how the Angular frontend consumes the backend OpenAPI contract from `input/connaissance-client-api.yaml`.

## Base

- Base URL (dev): `http://localhost:8080`
- Media type: `application/json`
- Auth: out of MVP scope (headers can be stubbed in adapter)

## Endpoint Coverage Plan

### MVP (implemented now)

1. `GET /v1/connaissance-clients`
   - Purpose: list clients on home page
   - Expected responses handled in UI:
     - `200` with non-empty array -> list view
     - `200` with empty array -> empty state
     - `4xx/5xx` -> error state + retry CTA

### Post-MVP (planned in this feature backlog)

2. `POST /v1/connaissance-clients` -> creation from "Nouveau client" page
3. `GET /v1/connaissance-clients/{id}` -> detail page
4. `DELETE /v1/connaissance-clients/{id}` -> delete popup action
5. `PUT /v1/connaissance-clients/{id}/adresse` -> update address popup action
6. `PUT /v1/connaissance-clients/{id}/situation` -> update family status popup action

## Frontend Service Contract (MVP)

Service: `ClientListService`

- `getClients(): Observable<ConnaissanceClient[]>`
  - maps transport errors to domain-friendly error message
  - does not mutate response payload

## Mock Contract (MSW)

Handlers required:
- `GET /v1/connaissance-clients` success-non-empty
- `GET /v1/connaissance-clients` success-empty
- `GET /v1/connaissance-clients` error-500
- optional latency simulation for loading UI

Mock data must stay aligned with `ConnaissanceClient` schema.
