# Data Model - MVP Client List

## Entity: ConnaissanceClient

Source contract: `input/connaissance-client-api.yaml` (`components.schemas.ConnaissanceClient`)

Fields:
- `id: string (UUID)`
- `nom: string` (2..50, pattern alpha)
- `prenom: string` (2..50, pattern alpha)
- `ligne1: string` (2..50)
- `ligne2?: string` (optional)
- `codePostal: string` (length 5)
- `ville: string` (2..50)
- `situationFamiliale: CELIBATAIRE | MARIE | DIVORCE | VEUF | PACSE`
- `nombreEnfants: number` (0..20)

Validation rules (frontend):
- Respect du schema OpenAPI sur typage et bornes elementaires.
- Pour le MVP liste: seules les contraintes d'affichage sont appliquees (presence minimale de `id`, `nom`, `prenom`, `ville`, `codePostal`).
- Donnees partielles: affichage placeholder `-` pour les champs optionnels/absents.

## View Model: ClientListItemVM

Purpose: simplifier la projection UI de la liste clients.

Fields:
- `id: string`
- `displayName: string` (format `prenom nom`)
- `cityPostal: string` (format `codePostal ville`)
- `statusLabel?: string` (derive de `situationFamiliale`, optionnel MVP)

Transformation rules:
- `displayName = [prenom, nom].filter(Boolean).join(' ')`
- `cityPostal = [codePostal, ville].filter(Boolean).join(' ')`

## State Model: ClientListState

Fields:
- `status: 'idle' | 'loading' | 'success' | 'empty' | 'error'`
- `items: ClientListItemVM[]`
- `errorMessage?: string`

State transitions:
- `idle -> loading` on initial load/retry
- `loading -> success` when API returns non-empty list
- `loading -> empty` when API returns empty list
- `loading -> error` when API returns error/network failure
- `error -> loading` on retry
