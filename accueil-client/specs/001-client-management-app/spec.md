# Feature Specification: Client Management Application

**Feature Branch**: `001-client-management-app`  
**Created**: 2026-05-09  
**Status**: Ready for Review  
**Input**: Complete frontend specification for Connaissance Client REST API with complete CRUD operations across 6 user-facing screens.

---

## Clarifications

### Session 2026-05-09

- Q: Empty client list state (no clients in system) → A: Display empty state message "Aucun client enregistré. Cliquez sur 'Nouveau client' pour commencer." with visual illustration/icon and clickable link to create first client
- Q: Initial mock dataset composition → A: 10 varied clients with diverse geographic coverage (postal codes: 75 Paris, 13 Marseille, 33 Bordeaux, 06 Nice, 31 Toulouse, etc.), varied family situations (CÉLIBATAIRE, MARIÉ, DIVORCÉ, VEUF, PACSÉ), and mixed children counts (0-3 per client) to support comprehensive feature testing
- Q: Loading states & visual feedback during async operations → A: Display loading spinner during page transitions, form submissions, and deletions with disabled buttons during operation to prevent duplicate submissions and provide clear UX feedback
- Q: Form input types & component behaviors → A: Name fields (Nom/Prénom): text input, maxlength 50; Address fields (Ligne1/Ligne2): text input, maxlength 50; Postal code: number input (5 digits only, enforced by input type); City: text input, maxlength 50
- Q: Card color assignment strategy → A: Use hash-based deterministic assignment from client ID (hash(clientID) mod colorPaletteLength). Same client always displays with same color across sessions and pages. Color palette: 8 colors (blue, red, green, orange, purple, teal, pink, yellow)

---

## User Scenarios & Testing

### User Story 1 - View Client List (Priority: P1)

End users need to see all registered clients in a modern card-based layout on the application home page. This is the primary entry point and most frequently accessed feature.

**Why this priority**: Essential MVP feature. Without a client list, the application has no utility. Users interact with this immediately upon login.

**Independent Test**: Can be fully tested by: Opening the home page and verifying the client list displays with mock data. Delivers immediately usable application.

**Acceptance Scenarios**:

1. **Given** the application loads with mock data, **When** user navigates to home page, **Then** client list displays as modern cards in a grid layout
2. **Given** at least one client exists in mock data, **When** card is displayed, **Then** card shows: First Name, Last Name, Postal Code, City in visual hierarchy
3. **Given** a client card is visible, **When** user reads the card, **Then** they can identify the client by initials badge (2 letters from first/last name)
4. **Given** multiple clients exist, **When** cards are displayed, **Then** each card has a colored header band (color varies per card for visual distinction)
5. **Given** a client card exists, **When** user sees it, **Then** "Voir le détail →" link is present and clickable
6. **Given** no clients exist in the system, **When** home page loads, **Then** empty state displays: message "Aucun client enregistré. Cliquez sur 'Nouveau client' pour commencer." + illustration/icon + clickable "+ Nouveau client" link

---

### User Story 2 - View Client Detail (Priority: P1)

Users need to access complete information about a specific client, including name, address, and family situation with action buttons to modify or delete.

**Why this priority**: Critical for application usability. Completes the read functionality and enables navigation to edit workflows.

**Independent Test**: Can be fully tested by: Clicking "Voir le détail" from client card and verifying detail page displays all client information with action buttons.

**Acceptance Scenarios**:

1. **Given** user clicks "Voir le détail →" from a client card, **When** navigation completes, **Then** detail page displays client full name (Last Name + First Name)
2. **Given** detail page is open, **When** user views ADDRESS section, **Then** address displays: ligne1, postal code, city in readable format
3. **Given** detail page is open, **When** user views FAMILY SITUATION section, **Then** situation displays: family status badge + number of children with child icon
4. **Given** user is on detail page, **When** page loads, **Then** action buttons are visible: "Modifier le nom", "Modifier l'adresse", "Modifier la situation", "Supprimer client"
5. **Given** client detail page is displayed, **When** user clicks back link, **Then** user returns to client list page

---

### User Story 3 - Create New Client (Priority: P2)

Users need to register new clients by filling a form with all required information to complete the client onboarding workflow.

**Why this priority**: High value feature but comes after viewing existing clients. Enables business growth by allowing new client registration.

**Independent Test**: Can be fully tested by: Clicking "Nouveau client" button, filling form, and verifying mock data is updated and client appears in list.

**Acceptance Scenarios**:

1. **Given** user is on home page, **When** user clicks "+ Nouveau client" button, **Then** new client form page displays with empty form fields
2. **Given** new client form is displayed, **When** user sees required fields, **Then** form contains: Nom, Prénom, Ligne1 adresse, Ligne2 adresse (optional), Code Postal, Ville, Situation Familiale, Nombre d'enfants
3. **Given** user fills all required fields correctly, **When** user submits form, **Then** loading spinner displays and "Créer" button is disabled
4. **Given** form is being submitted, **When** mock API processes creation, **Then** spinner remains visible until response received
5. **Given** creation completes successfully, **When** response returns, **Then** loading spinner disappears and user is redirected to detail page
6. **Given** user fills form with invalid postal code, **When** user attempts to submit, **Then** validation error displays: "Code postal doit être 5 chiffres" (no API call made, no loading state)
7. **Given** user fills form with missing required field, **When** user attempts to submit, **Then** validation error highlights missing field and displays "Ce champ est obligatoire" (no API call made, no loading state)

---

### User Story 4 - Modify Client Name (Priority: P2)

Users need to update client first and last name to correct errors or reflect name changes.

**Why this priority**: Important for data accuracy but less critical than viewing. Enables correction of registration errors.

**Independent Test**: Can be fully tested by: Clicking "Modifier le nom" from detail page, editing name in modal, and verifying detail page reflects the change.

**Acceptance Scenarios**:

1. **Given** user is on client detail page, **When** user clicks "Modifier le nom", **Then** a modal dialog displays with current Nom and Prénom fields pre-filled
2. **Given** name modal is open, **When** user modifies the name fields, **Then** changes display in real-time in modal form
3. **Given** user enters new name values, **When** user clicks confirm button, **Then** loading spinner displays inside modal and "Confirmer" button is disabled
4. **Given** name update is in progress, **When** mock API processes the request, **Then** spinner remains visible until response received
5. **Given** update completes successfully, **When** response returns, **Then** spinner disappears, modal closes, and detail page refreshes with new name
6. **Given** modal is closed after save, **When** user views detail page, **Then** new name is displayed in client detail

---

### User Story 5 - Modify Client Address (Priority: P2)

Users need to update client address to reflect relocations or correct address errors.

**Why this priority**: Common operation supporting data maintenance but secondary to viewing. Enables address updates.

**Independent Test**: Can be fully tested by: Clicking "Modifier l'adresse" from detail page, editing address in modal, and verifying detail page reflects the change.

**Acceptance Scenarios**:

1. **Given** user is on client detail page, **When** user clicks "Modifier l'adresse", **Then** a modal dialog displays with current address fields (ligne1, ligne2, code postal, ville) pre-filled
2. **Given** address modal is open, **When** user modifies address fields, **Then** modal form updates and allows free editing
3. **Given** user enters valid address, **When** user clicks confirm button, **Then** loading spinner displays inside modal and "Confirmer" button is disabled
4. **Given** address update is in progress, **When** mock API processes the request, **Then** spinner remains visible until response received
5. **Given** update completes successfully, **When** response returns, **Then** spinner disappears, modal closes, and detail page refreshes with new address
6. **Given** modal is closed after save, **When** user views detail page, **Then** new address is displayed in ADDRESS section

---

### User Story 6 - Modify Client Family Situation (Priority: P2)

Users need to update client family status and number of children to maintain accurate client profiles.

**Why this priority**: Supports data accuracy for family-related business rules but less critical than core CRUD. Enables situation updates.

**Independent Test**: Can be fully tested by: Clicking "Modifier la situation" from detail page, updating situation in modal, and verifying detail page reflects the change.

**Acceptance Scenarios**:

1. **Given** user is on client detail page, **When** user clicks "Modifier la situation", **Then** a modal dialog displays with current Situation Familiale and Nombre d'enfants pre-populated
2. **Given** situation modal is open, **When** user selects different family status, **Then** dropdown shows: CÉLIBATAIRE, MARIÉ(E), DIVORCÉ(E), VEUF(VE), PACSÉ(E)
3. **Given** user updates family situation, **When** user clicks confirm, **Then** loading spinner displays inside modal and "Confirmer" button is disabled
4. **Given** situation update is in progress, **When** mock API processes the request, **Then** spinner remains visible until response received
5. **Given** update completes successfully, **When** response returns, **Then** spinner disappears, modal closes, and detail page refreshes with new situation
6. **Given** modal is closed after save, **When** user views detail page, **Then** new family situation badge and children count are displayed

---

### User Story 7 - Delete Client (Priority: P3)

Users need to remove clients from the system with confirmation to prevent accidental deletion.

**Why this priority**: Important feature but lowest priority. Comes after all other operations. Provides data management capability.

**Independent Test**: Can be fully tested by: Clicking delete button from detail page, confirming deletion in modal, and verifying client is removed from list.

**Acceptance Scenarios**:

1. **Given** user is on client detail page, **When** user clicks delete button, **Then** a confirmation modal appears asking "Êtes-vous sûr de vouloir supprimer ce client ?"
2. **Given** deletion confirmation modal is open, **When** user reviews the warning message, **Then** message clearly indicates deletion is permanent
3. **Given** confirmation modal is displayed, **When** user clicks "Supprimer" button, **Then** loading spinner displays inside modal and "Supprimer" button is disabled
4. **Given** deletion is in progress, **When** mock API processes the delete request, **Then** spinner remains visible until response received
5. **Given** deletion completes successfully, **When** response returns, **Then** spinner disappears, modal closes, and user is redirected to home page
6. **Given** client has been deleted, **When** user views home page, **Then** deleted client no longer appears in client list

---

## Functional Requirements

### R1: Client List Display (Core)
- **Requirement**: Home page MUST display all clients in a modern card-based grid layout
- **Details**: 
  - Cards display: Client initials (2-letter badge), Full Name, Postal Code, City, "Voir le détail →" link
  - Each card has a colored header band (color assigned per card for visual distinction)
  - No pagination for MVP (mock data will have ~5-10 clients)
  - Cards are responsive and adapt to screen size
- **Acceptance**: When home page loads with mock data, all clients display in cards without errors

### R2: Client Detail Page (Core)
- **Requirement**: Clicking client card navigates to detail page displaying all client information with modification/deletion options
- **Details**:
  - Back link "← Retour à la liste" navigates to home page
  - Full name display prominently with initials badge
  - Address section shows: ligne1, postal code, city (formatted as "XXXXX – City")
  - Family situation section shows: Status badge (CÉLIBATAIRE/MARIÉ(E)/etc.) + child count with icon
  - Four action buttons: "Modifier le nom", "Modifier l'adresse", "Modifier la situation", "Supprimer client"
  - All sections clearly labeled with icons
- **Acceptance**: All client information displays accurately on detail page and all action buttons are clickable

### R3: Create New Client (Core)
- **Requirement**: "Nouveau client" button opens form for creating new client with all required fields and validation
- **Details**:
  - Form fields: Nom, Prénom, Ligne1, Ligne2 (optional), Code Postal, Ville, Situation Familiale (dropdown), Nombre d'enfants (number input)
  - Form validation: All required fields enforced, postal code format (5 digits), number of children 0-20
  - Submit button creates client in mock data and redirects to detail page
  - Cancel button returns to home page
- **Acceptance**: New client form opens, validates input, and successfully creates clients

### R4: Modify Client Name (Modal Dialog)
- **Requirement**: Modal dialog opens for editing client name with pre-filled current values
- **Details**:
  - Modal title: "Modifier le nom"
  - Pre-filled fields: Nom, Prénom (with current values)
  - Confirm and Cancel buttons
  - Updates mock data on confirm
  - Modal closes and client detail page refreshes
- **Acceptance**: Name modifications save correctly and display on detail page

### R5: Modify Client Address (Modal Dialog)
- **Requirement**: Modal dialog opens for editing client address with pre-filled current values
- **Details**:
  - Modal title: "Modifier l'adresse"
  - Pre-filled fields: Ligne1, Ligne2 (optional), Code Postal, Ville
  - Validate postal code format (5 digits)
  - Confirm and Cancel buttons
  - Updates mock data on confirm
  - Modal closes and client detail page refreshes
- **Acceptance**: Address modifications save correctly and display on detail page

### R6: Modify Client Family Situation (Modal Dialog)
- **Requirement**: Modal dialog opens for editing family status and children count with pre-filled current values
- **Details**:
  - Modal title: "Modifier la situation"
  - Pre-filled fields: Situation Familiale dropdown (CÉLIBATAIRE, MARIÉ(E), DIVORCÉ(E), VEUF(VE), PACSÉ(E)), Nombre d'enfants number input
  - Validate number of children between 0 and 20
  - Confirm and Cancel buttons
  - Updates mock data on confirm
  - Modal closes and client detail page refreshes
- **Acceptance**: Family situation modifications save correctly and display on detail page

### R7: Delete Client with Confirmation (Modal Dialog)
- **Requirement**: Delete action displays confirmation modal before removing client from system
- **Details**:
  - Modal title: "Supprimer le client"
  - Message: "Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible."
  - Confirm button: "Supprimer" (danger style), Cancel button: "Annuler"
  - Removes client from mock data and redirects to home page
  - Client no longer appears in client list
- **Acceptance**: Deletion confirmation works correctly and client is removed after confirmation

### R8: Mock Data Service (Technical)
- **Requirement**: Application MUST use mock data service for MVP (backend API not yet available)
- **Details**:
  - Mock service simulates Connaissance Client API responses
  - Implements all operations: GET list, GET detail, POST create, PUT update name/address/situation, DELETE
  - Mock data stored in memory (session scoped)
  - Initial dataset: 10 sample clients with diverse attributes (varied postal codes: 75, 13, 33, 06, 31, 69, 59, 34, 84, 67; varied family situations: CÉLIBATAIRE, MARIÉ, DIVORCÉ, VEUF, PACSÉ; children counts: 0-3)
  - Realistic French names and address data for authentic testing experience
- **Acceptance**: All CRUD operations work through mock service without API dependency; initial dataset provides representative test scenarios

### R9: Navigation & Routing (Technical)
- **Requirement**: Application MUST support SPA routing between home page and detail page without full page reload
- **Details**:
  - Home page route: `/clients`
  - Detail page route: `/clients/:id`
  - Back navigation preserves list state where possible
  - Browser back button works correctly
- **Acceptance**: Navigation between pages works smoothly with correct routing

### R10: Error Handling & Validation (Technical)
- **Requirement**: Application MUST provide user-friendly validation messages and error handling, with clear loading state feedback during async operations
- **Details**:
  - Form validation displays on blur or submit (validation is synchronous, no loading state)
  - Error messages specific (not generic "Error occurred")
  - Failed operations display user-friendly messages
  - Loading spinner displays during all async operations (API calls): page transitions, form submission, modifications, deletions
  - Buttons are disabled while operations are in progress to prevent duplicate submissions
  - Spinner disappears when response received (success or error)
  - No console errors visible to users
- **Acceptance**: All validation and errors display appropriately with helpful messages; loading states provide clear feedback during async operations; buttons disabled during operations prevent duplicate submissions

---

## Success Criteria

1. **User Completeness**: All 7 user stories (view list, view detail, create, modify name/address/situation, delete) are fully implemented and testable independently
2. **Data Accuracy**: All displayed client information matches mock data without errors or missing fields
3. **Response Time**: Application responds to user interactions (navigation, button clicks, form submission) in under 200ms
4. **Data Persistence (Mock)**: Client changes (create/update/delete) persist within the session and appear correctly on list and detail pages
5. **Form Validation**: All form inputs validate correctly with helpful error messages before submission
6. **Visual Consistency**: Application follows mockup designs for layout, colors, and component styling with consistent branding
7. **Accessibility**: Application is keyboard navigable and accessible without mouse (critical for screen readers)
8. **Browser Compatibility**: Application works on modern browsers (Chrome, Firefox, Safari, Edge) without console errors

---

## Architecture & Integration

### Frontend Technology Stack (Per Constitution)
- **Language**: TypeScript v5.4+ with strict mode
- **Framework**: Angular v18+
- **State Management**: RxJS observables (services + components)
- **Styling**: CSS3 (component-scoped via Angular ViewEncapsulation)
- **Testing**: Jasmine for unit tests (component logic, service methods)

### Key Entities & Data Model

| Entity | Source | Fields |
|--------|--------|--------|
| ConnaissanceClient | API Mock | id (UUID), nom, prenom, ligne1, ligne2, codePostal, ville, situationFamiliale, nombreEnfants |
| Client Card | Derived | initials (2 chars), fullName, postalCode, city, colorBand (assigned) |

### API Integration (Mock Service)
| Endpoint | Method | Purpose | Mock Status |
|----------|--------|---------|-------------|
| `/v1/connaissance-clients` | GET | Fetch all clients | ✓ Implemented |
| `/v1/connaissance-clients` | POST | Create new client | ✓ Implemented |
| `/v1/connaissance-clients/:id` | GET | Fetch client detail | ✓ Implemented |
| `/v1/connaissance-clients/:id` | DELETE | Delete client | ✓ Implemented |
| `/v1/connaissance-clients/:id/adresse` | PUT | Update address | ✓ Implemented |
| `/v1/connaissance-clients/:id/situation` | PUT | Update family situation | ✓ Implemented |

---

## Page Layouts & Components

### Page 1: Home Page (`/clients`)
- **Header**: "Accueil Client" branding + navigation
- **Content**: 
  - Title: "Liste des clients"
  - Action button: "+ Nouveau client" (top-right, blue)
  - Grid layout: 4 cards per row (responsive, fewer on mobile)
  - Each card: 
    - Colored header band (color determined by hash-based assignment from client ID for deterministic visual consistency across sessions)
    - Initials badge (2 letters from first/last name)
    - Full name display
    - Address (postal code – city)
    - "Voir le détail →" link
  - Empty state (when no clients): Message "Aucun client enregistré. Cliquez sur 'Nouveau client' pour commencer." with illustration/icon and clickable "+ Nouveau client" link
- **Color Palette for Headers**: 8 colors (blue, red, green, orange, purple, teal, pink, yellow) assigned deterministically via hash(clientID) mod 8

### Page 2: Client Detail Page (`/clients/:id`)
- **Header**: "Accueil Client" branding
- **Back Link**: "← Retour à la liste" (top-left)
- **Content**:
  - Initials badge (large)
  - Full name display
  - **ADDRESS Section**: Icon + "ADRESSE" label + address display + "Modifier l'adresse" button
  - **FAMILY SITUATION Section**: Icon + "SITUATION FAMILIALE" label + status badge + children count + "Modifier la situation" button
  - **Action Buttons**: "Modifier le nom", "Modifier l'adresse", "Modifier la situation", "Supprimer client"
  - Delete button styled as danger (red/warning color)

### Page 3: New Client Form (`/clients/new`)
- **Header**: "Accueil Client" branding
- **Form Fields**:
  - Nom (text input, required, maxlength 50)
  - Prénom (text input, required, maxlength 50)
  - Ligne1 (text input, required, maxlength 50)
  - Ligne2 (text input, optional, maxlength 50)
  - Code Postal (number input, required, 5 digits max, enforced by input type)
  - Ville (text input, required, maxlength 50)
  - Situation Familiale (select dropdown, required, options: CÉLIBATAIRE, MARIÉ(E), DIVORCÉ(E), VEUF(VE), PACSÉ(E))
  - Nombre d'enfants (number input, required, min 0, max 20)
- **Buttons**: Submit "Créer" + Cancel "Annuler"
- **Validation**: Fields validate on blur (display errors inline); form submit triggers validation before API call
- **Loading**: Submit button displays loading spinner and is disabled during form submission

### Page 4-7: Modal Dialogs
| Modal | Title | Fields | Input Types | Buttons |
|-------|-------|--------|-------------|---------|
| Modify Name | Modifier le nom | Nom, Prénom (pre-filled) | text input, maxlength 50 each | Confirmer, Annuler |
| Modify Address | Modifier l'adresse | Ligne1, Ligne2, Code Postal, Ville (pre-filled) | text (maxlength 50), text (maxlength 50), number (5 digits), text (maxlength 50) | Confirmer, Annuler |
| Modify Situation | Modifier la situation | Situation Familiale, Nombre d'enfants (pre-filled) | select dropdown, number input (0-20) | Confirmer, Annuler |
| Delete Confirmation | Supprimer le client | Message: "Êtes-vous sûr...?" | N/A (text only) | Supprimer, Annuler |

**Modal Behaviors**:
- All modal input fields pre-filled with current values
- Input types enforce HTML5 constraints (maxlength, number range)
- Confirmer button displays loading spinner and is disabled during API call
- Modal closes on successful confirmation; errors display inline

---

## Assumptions

1. **Mock Data**: Backend API not available for MVP; application uses in-memory mock service
2. **Authentication**: Out of scope per constitution (no JWT validation required)
3. **No Pagination**: MVP supports small dataset (~10 clients); pagination added in future phase
4. **Session Scope**: Client changes persist within browser session only (no backend persistence)
5. **Deterministic Card Colors**: Card header colors assigned via hash-based algorithm from client ID; same client always displays with same color across sessions and page reloads
6. **Postal Code Format**: Assumed to be 5-digit format (French postal code convention)
7. **Family Status**: Assumed enum: CÉLIBATAIRE, MARIÉ(E), DIVORCÉ(E), VEUF(VE), PACSÉ(E) as per API schema
8. **Responsive Design**: Application designed for modern browsers; mobile optimization in future phase
9. **Loading States**: Simulated API delays (100ms GET list, 50ms GET detail, 100ms POST create, 50ms PUT operations, 50ms DELETE) provide realistic UX for loading spinner display

---

## Constraints

1. **No Authentication**: Per constitution, no login or permission checks
2. **No CI/CD**: Per constitution, manual builds only
3. **Frontend-Only MVP**: Backend API mocked; real API integration in Phase 2
4. **No Advanced Features**: No search, filtering, sorting, or export in MVP
5. **Browser Target**: Modern browsers only (Chrome 120+, Firefox 120+, Safari 17+, Edge 120+)
6. **No Third-Party UI Framework**: Use Angular components + CSS (no Material Design, Bootstrap, etc. for simplicity per constitution)

---

## Deliverables

1. ✅ **Specification** (this document)
2. ✅ **Visual Mockups** (provided: 6 screens)
3. ✅ **Sequence Diagrams** (front-end / mock API interactions)
4. ⏳ **Implementation** (Phase 1: Home page + mock service)
5. ⏳ **Test Suite** (Unit tests for components/services)

---

## Next Steps

1. **Clarification** (if needed): Run `/speckit.clarify` to address any ambiguities
2. **Planning**: Run `/speckit.plan` to create detailed implementation plan
3. **Task Generation**: Run `/speckit.tasks` to create actionable development tasks
4. **Implementation**: Run `/speckit.implement` to begin Phase 1 (home page + mock service)

---

**Status**: Ready for validation. Please review the specification and provide feedback.