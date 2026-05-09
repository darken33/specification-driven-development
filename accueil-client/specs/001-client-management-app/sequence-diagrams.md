# Sequence Diagrams: Client Management Application

This document provides sequence diagrams showing interactions between the Frontend Application, Angular Services, and the Mock API Service for all major user workflows.

---

## Diagram 1: View Client List (Home Page Load)

```
Participant User
Participant Home Component
Participant Client Service
Participant Mock API Service
Participant Client List

User->>Home Component: Navigate to /clients
activate Home Component

Home Component->>Client Service: loadClients()
activate Client Service

Client Service->>Mock API Service: GET /v1/connaissance-clients
activate Mock API Service
Mock API Service-->>Client Service: Return array of ConnaissanceClient[]
deactivate Mock API Service

Client Service-->>Home Component: Emit clients$ observable
deactivate Client Service

Home Component->>Client List: Display clients in card grid
activate Client List
Client List-->>User: Render cards with Name, Address, Initials
deactivate Client List

deactivate Home Component
```

**Flow**:
1. User navigates to home page (`/clients`)
2. Home Component initializes and calls `ClientService.loadClients()`
3. ClientService makes HTTP GET request to mock API
4. Mock API returns array of all ConnaissanceClient objects
5. Home Component receives clients via RxJS observable subscription
6. Template iterates clients and renders card component for each
7. Cards display: initials badge, name, postal code, city, "Voir le détail →" link

---

## Diagram 2: View Client Detail Page

```
Participant User
Participant Detail Component
Participant Route Params
Participant Client Service
Participant Mock API Service
Participant Detail View

User->>Detail Component: Click "Voir le détail →" or navigate to /clients/:id
activate Detail Component

Detail Component->>Route Params: Extract :id from URL
Route Params-->>Detail Component: Return client ID (UUID)

Detail Component->>Client Service: getClient(id)
activate Client Service

Client Service->>Mock API Service: GET /v1/connaissance-clients/:id
activate Mock API Service
Mock API Service-->>Client Service: Return ConnaissanceClient
deactivate Mock API Service

Client Service-->>Detail Component: Emit client$ observable
deactivate Client Service

Detail Component->>Detail View: Display client information
activate Detail View
Detail View-->>User: Render name, address, family situation, action buttons
deactivate Detail View

deactivate Detail Component
```

**Flow**:
1. User clicks "Voir le détail →" from client card or navigates directly to `/clients/:id`
2. Detail Component extracts client ID from route parameters
3. Component calls `ClientService.getClient(id)`
4. ClientService makes HTTP GET request to mock API with ID
5. Mock API returns specific ConnaissanceClient object
6. Detail Component receives client data via observable
7. Template displays all client information with action buttons

---

## Diagram 3: Create New Client

```
Participant User
Participant New Client Form
Participant Client Service
Participant Mock API Service
Participant Detail Component

User->>New Client Form: Click "+ Nouveau client" button
activate New Client Form

New Client Form-->>User: Display empty form with all fields
User->>New Client Form: Fill form (Nom, Prénom, Address, Situation, etc.)

User->>New Client Form: Click "Créer" button
New Client Form->>New Client Form: Validate all fields

alt Validation Fails
New Client Form-->>User: Display validation error messages
else Validation Passes
New Client Form->>Client Service: createClient(clientData)
activate Client Service

Client Service->>Mock API Service: POST /v1/connaissance-clients with ConnaissanceClientIn
activate Mock API Service
Mock API Service->>Mock API Service: Generate UUID for new client
Mock API Service-->>Client Service: Return created ConnaissanceClient with ID
deactivate Mock API Service

Client Service->>Client Service: Update clients$ subject (add new client to array)
Client Service-->>New Client Form: Emit new client$ observable
deactivate Client Service

New Client Form->>Detail Component: Navigate to /clients/:id (new client)
activate Detail Component
Detail Component-->>User: Display new client detail page
deactivate Detail Component

deactivate New Client Form
end
```

**Flow**:
1. User clicks "+ Nouveau client" button from home page
2. New Client Form displays with empty fields
3. User fills all required fields (validation on blur for UX)
4. User clicks "Créer" button
5. Form validates all fields locally (required, format, ranges)
6. If validation passes, form calls `ClientService.createClient(clientData)`
7. ClientService makes HTTP POST request to mock API with form data
8. Mock API generates UUID and creates ConnaissanceClient
9. Mock API returns created client with new ID
10. ClientService updates internal clients$ subject to include new client
11. Form navigates to detail page of newly created client

---

## Diagram 4: Modify Client Name

```
Participant User
Participant Detail Component
Participant Name Modal
Participant Client Service
Participant Mock API Service

User->>Detail Component: Click "Modifier le nom" button
activate Detail Component

Detail Component->>Name Modal: Open modal with current Nom/Prénom
activate Name Modal

Name Modal->>Client Service: getCurrentClientData()
activate Client Service
Client Service-->>Name Modal: Return current Nom and Prénom values
deactivate Client Service

Name Modal-->>User: Display form with pre-filled values

User->>Name Modal: Edit Nom and/or Prénom fields
User->>Name Modal: Click "Confirmer" button

Name Modal->>Name Modal: Validate name fields (required, format)

alt Validation Fails
Name Modal-->>User: Display validation error
else Validation Passes
Name Modal->>Client Service: updateClientName(id, nom, prenom)
activate Client Service

Client Service->>Mock API Service: PATCH /v1/connaissance-clients/:id with name update
activate Mock API Service
Mock API Service->>Mock API Service: Update client record with new name
Mock API Service-->>Client Service: Return updated ConnaissanceClient
deactivate Mock API Service

Client Service->>Client Service: Update clients$ subject with updated client
Client Service-->>Name Modal: Emit updated client$ observable
deactivate Client Service

Name Modal->>Detail Component: Close modal and refresh
deactivate Name Modal

Detail Component->>Detail Component: Refresh view with updated client data
Detail Component-->>User: Display updated Nom/Prénom
deactivate Detail Component
end
```

**Flow**:
1. User clicks "Modifier le nom" on detail page
2. Name Modal opens with current client name values pre-filled
3. User edits Nom and/or Prénom fields
4. User clicks "Confirmer"
5. Modal validates name fields locally
6. Modal calls `ClientService.updateClientName(id, nom, prenom)`
7. ClientService makes HTTP PATCH request to mock API
8. Mock API updates client record in memory
9. Mock API returns updated ConnaissanceClient
10. ClientService updates clients$ subject
11. Modal closes and Detail Component refreshes view with updated name

---

## Diagram 5: Modify Client Address

```
Participant User
Participant Detail Component
Participant Address Modal
Participant Client Service
Participant Mock API Service

User->>Detail Component: Click "Modifier l'adresse" button
activate Detail Component

Detail Component->>Address Modal: Open modal with current address fields
activate Address Modal

Address Modal-->>User: Display form with pre-filled: ligne1, ligne2, codePostal, ville

User->>Address Modal: Edit address fields
User->>Address Modal: Click "Confirmer" button

Address Modal->>Address Modal: Validate postal code (5 digits), required fields

alt Validation Fails
Address Modal-->>User: Display validation error (e.g., "Code postal doit être 5 chiffres")
else Validation Passes
Address Modal->>Client Service: updateClientAddress(id, adresse)
activate Client Service

Client Service->>Mock API Service: PUT /v1/connaissance-clients/:id/adresse with Adresse
activate Mock API Service
Mock API Service->>Mock API Service: Update client address record
Mock API Service-->>Client Service: Return updated ConnaissanceClient
deactivate Mock API Service

Client Service->>Client Service: Update clients$ subject with updated client
Client Service-->>Address Modal: Emit updated client$ observable
deactivate Client Service

Address Modal->>Detail Component: Close modal and refresh
deactivate Address Modal

Detail Component->>Detail Component: Refresh view with updated address
Detail Component-->>User: Display updated ADDRESS section
deactivate Detail Component
end
```

**Flow**:
1. User clicks "Modifier l'adresse" on detail page
2. Address Modal opens with current address values pre-filled
3. User edits address fields (ligne1, ligne2, codePostal, ville)
4. User clicks "Confirmer"
5. Modal validates postal code format (exactly 5 digits) and required fields
6. Modal calls `ClientService.updateClientAddress(id, adresse)`
7. ClientService makes HTTP PUT request to mock API endpoint `/v1/connaissance-clients/:id/adresse`
8. Mock API updates only the address portion of client record
9. Mock API returns updated ConnaissanceClient
10. ClientService updates clients$ subject
11. Modal closes and Detail Component refreshes view with updated address

---

## Diagram 6: Modify Client Family Situation

```
Participant User
Participant Detail Component
Participant Situation Modal
Participant Client Service
Participant Mock API Service

User->>Detail Component: Click "Modifier la situation" button
activate Detail Component

Detail Component->>Situation Modal: Open modal with current situation
activate Situation Modal

Situation Modal-->>User: Display form with pre-filled: situationFamiliale, nombreEnfants

User->>Situation Modal: Select new family status from dropdown
User->>Situation Modal: Modify nombre d'enfants (0-20)
User->>Situation Modal: Click "Confirmer" button

Situation Modal->>Situation Modal: Validate nombreEnfants (0-20), situationFamiliale (enum)

alt Validation Fails
Situation Modal-->>User: Display validation error (e.g., "Nombre d'enfants doit être 0-20")
else Validation Passes
Situation Modal->>Client Service: updateClientSituation(id, situation)
activate Client Service

Client Service->>Mock API Service: PUT /v1/connaissance-clients/:id/situation with Situation
activate Mock API Service
Mock API Service->>Mock API Service: Update client family situation record
Mock API Service-->>Client Service: Return updated ConnaissanceClient
deactivate Mock API Service

Client Service->>Client Service: Update clients$ subject with updated client
Client Service-->>Situation Modal: Emit updated client$ observable
deactivate Client Service

Situation Modal->>Detail Component: Close modal and refresh
deactivate Situation Modal

Detail Component->>Detail Component: Refresh view with updated situation
Detail Component-->>User: Display updated SITUATION FAMILIALE section (badge + children)
deactivate Detail Component
end
```

**Flow**:
1. User clicks "Modifier la situation" on detail page
2. Situation Modal opens with current family situation values pre-filled
3. User selects new family status from dropdown (CÉLIBATAIRE, MARIÉ(E), DIVORCÉ(E), VEUF(VE), PACSÉ(E))
4. User modifies nombre d'enfants using number input
5. User clicks "Confirmer"
6. Modal validates nombreEnfants is between 0-20 and situationFamiliale is valid enum
7. Modal calls `ClientService.updateClientSituation(id, situation)`
8. ClientService makes HTTP PUT request to mock API endpoint `/v1/connaissance-clients/:id/situation`
9. Mock API updates family situation portion of client record
10. Mock API returns updated ConnaissanceClient
11. ClientService updates clients$ subject
12. Modal closes and Detail Component refreshes view with updated situation

---

## Diagram 7: Delete Client with Confirmation

```
Participant User
Participant Detail Component
Participant Delete Modal
Participant Client Service
Participant Mock API Service
Participant Home Component

User->>Detail Component: Click "Supprimer client" button
activate Detail Component

Detail Component->>Delete Modal: Open confirmation modal
activate Delete Modal

Delete Modal-->>User: Display message: "Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible."
Delete Modal-->>User: Display "Supprimer" and "Annuler" buttons

alt User Clicks "Annuler"
Delete Modal->>Detail Component: Close modal without action
deactivate Delete Modal
else User Clicks "Supprimer"
Delete Modal->>Client Service: deleteClient(id)
activate Client Service

Client Service->>Mock API Service: DELETE /v1/connaissance-clients/:id
activate Mock API Service
Mock API Service->>Mock API Service: Remove client from mock data store
Mock API Service-->>Client Service: Return 200 OK (deletion successful)
deactivate Mock API Service

Client Service->>Client Service: Update clients$ subject (remove deleted client from array)
Client Service-->>Delete Modal: Emit confirmation
deactivate Client Service

Delete Modal->>Home Component: Navigate to /clients (home page)
deactivate Delete Modal

Home Component->>Home Component: Re-load clients list (deleted client no longer present)
Home Component-->>User: Display home page without deleted client
deactivate Home Component

deactivate Detail Component
end
```

**Flow**:
1. User clicks "Supprimer client" button on detail page
2. Delete Confirmation Modal opens with warning message
3. Modal displays "Supprimer" and "Annuler" buttons
4. If user clicks "Annuler": Modal closes, no action taken, stays on detail page
5. If user clicks "Supprimer":
   - Modal calls `ClientService.deleteClient(id)`
   - ClientService makes HTTP DELETE request to mock API
   - Mock API removes client from in-memory data store
   - Mock API returns 200 OK
   - ClientService updates clients$ subject to remove deleted client
   - Modal closes and navigates to home page (`/clients`)
   - Home Component re-loads client list without the deleted client

---

## Data Flow Summary

### Observable/Reactive Pattern (RxJS)

```
ClientService
├── clients$ (BehaviorSubject)
│   ├── Emits: Client[]
│   ├── Source: Mock API GET /v1/connaissance-clients
│   └── Updated on: Create, Update, Delete operations
│
├── currentClient$ (Observable)
│   ├── Emits: ConnaissanceClient
│   ├── Source: Mock API GET /v1/connaissance-clients/:id
│   └── Updated on: Detail page navigation
│
└── Methods (return Observables):
    ├── loadClients(): Observable<Client[]>
    ├── getClient(id): Observable<ConnaissanceClient>
    ├── createClient(data): Observable<ConnaissanceClient>
    ├── updateClientName(id, nom, prenom): Observable<ConnaissanceClient>
    ├── updateClientAddress(id, adresse): Observable<ConnaissanceClient>
    ├── updateClientSituation(id, situation): Observable<ConnaissanceClient>
    └── deleteClient(id): Observable<void>
```

### Mock API Service

```
MockApiService
├── Data Store: Map<UUID, ConnaissanceClient>
│   └── Pre-populated with 5-10 sample clients
│
└── Endpoints:
    ├── GET /v1/connaissance-clients
    │   ├── Simulates: List all clients
    │   ├── Delay: ~100ms (realistic)
    │   └── Response: ConnaissanceClient[]
    │
    ├── GET /v1/connaissance-clients/:id
    │   ├── Simulates: Fetch specific client
    │   ├── Delay: ~50ms
    │   └── Response: ConnaissanceClient | 404
    │
    ├── POST /v1/connaissance-clients
    │   ├── Simulates: Create client
    │   ├── Generates: UUID
    │   ├── Delay: ~100ms
    │   └── Response: ConnaissanceClient
    │
    ├── PUT /v1/connaissance-clients/:id/adresse
    │   ├── Simulates: Update address
    │   ├── Delay: ~50ms
    │   └── Response: ConnaissanceClient
    │
    ├── PUT /v1/connaissance-clients/:id/situation
    │   ├── Simulates: Update family situation
    │   ├── Delay: ~50ms
    │   └── Response: ConnaissanceClient
    │
    └── DELETE /v1/connaissance-clients/:id
        ├── Simulates: Delete client
        ├── Delay: ~50ms
        └── Response: 200 OK | 404
```

---

## Error Scenarios (Mock API)

### 404 Not Found
- **Trigger**: GET, PUT, DELETE on non-existent client ID
- **Mock API Response**: `{ status: 404, error: "Not Found", message: "Client with ID ... not found" }`
- **Frontend Behavior**: Display user-friendly error message

### 400 Bad Request
- **Trigger**: Invalid postal code format, missing required fields, invalid family status
- **Mock API Response**: `{ status: 400, error: "Bad Request", message: "Validation failed: ..." }`
- **Frontend Behavior**: Display validation error messages in form

### 422 Unprocessable Entity
- **Trigger**: Address validation fails (postal code/city mismatch)
- **Mock API Response**: `{ status: 422, error: "Unprocessable Entity", message: "Invalid address: ..." }`
- **Frontend Behavior**: Display address validation error in modal

---

## Notes

- All HTTP delays are simulated in the mock API service to provide realistic UX
- RxJS observables and subscriptions ensure reactive UI updates
- Error handling is consistent across all operations with user-friendly messages
- Separation of concerns: Components handle UI, ClientService handles business logic, MockApiService handles data persistence
