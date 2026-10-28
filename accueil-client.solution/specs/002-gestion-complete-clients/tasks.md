# Tasks: Gestion complète des clients

**Input**: Documents de conception de `specs/002-gestion-complete-clients/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/client-management-ui.md`, `quickstart.md`

**Tests**: Les tests ciblés sont inclus conformément à la constitution du projet, qui impose des tests pour les comportements modifiés. Ils utilisent Angular TestBed et Vitest déjà présents.

**Organization**: Les tâches sont regroupées par User Story pour livrer et vérifier les parcours de façon incrémentale.

## Phase 1: Setup

**Purpose**: Le projet Angular standalone, ses dépendances et son outillage ont déjà été créés pour le MVP; aucune initialisation supplémentaire n'est requise.

## Phase 2: Foundational

**Purpose**: Fournir des identifiants de fiche et un état mock commun avant d'ajouter les parcours.

- [X] T001 Rendre `Client.id` obligatoire pour les fiches gérées et attribuer des identifiants stables uniques aux données de démonstration dans `src/app/features/clients/client.model.ts` et `src/app/features/clients/client-list.mock.ts`.
- [X] T002 Mettre à jour les fixtures et tests existants pour fournir des identifiants tout en conservant les vérifications d'ordre, de rendu des valeurs absentes et des états dans `src/app/features/clients/client-list-page.component.spec.ts`, `src/app/features/clients/client-list-state.spec.ts` et `src/app/features/clients/client-list.service.spec.ts`.
- [X] T003 Ajouter les tests du stockage de session dans `src/app/features/clients/client-list.service.spec.ts` : collection initialisée depuis une copie du mock, ordre conservé, mutations non répercutées sur le jeu initial et nouvelle instance réinitialisée.
- [X] T004 Implémenter dans `src/app/features/clients/client-list.service.ts` la collection mutable de session initialisée depuis une copie du mock; faire retourner la collection courante par `getClients()` sans stockage navigateur ni appel HTTP.

**Checkpoint**: Le modèle géré a des identifiants uniques et le service expose un état partagé entre routes qui se réinitialise à la création d'une nouvelle session.

## Phase 3: User Story 1 - Créer une fiche client (Priority: P1)

**Goal**: Créer une fiche valide depuis la liste, la retrouver dans la collection de session et empêcher tout ajout invalide ou annulé.

**Independent Test**: Depuis la liste, créer une fiche et vérifier qu'elle apparaît une seule fois; tester la validation, l'annulation et la conservation des valeurs en cas d'échec.

### Tests for User Story 1

- [X] T005 [P] [US1] Ajouter les tests de formulaire dans `src/app/features/clients/client-create-page.component.spec.ts` pour création valide, erreurs par champ, annulation, échec récupérable et prévention des doubles soumissions.
- [X] T006 [P] [US1] Ajouter les tests de création du service dans `src/app/features/clients/client-list.service.spec.ts` pour ajout à la liste courante, identifiant unique et acceptation d'homonymes.

### Implementation for User Story 1

- [X] T007 [US1] Implémenter dans `src/app/features/clients/client-list.service.ts` la création atomique d'une fiche avec identifiant unique, sans modifier la collection en cas d'échec.
- [X] T008 [US1] Implémenter le formulaire et les états de création dans `src/app/features/clients/client-create-page.component.ts` : `nom`, `prenom` et `ville` de 2 à 50 caractères correspondant à `^[a-zA-Z ,.'-]+$`; `ligne1` de 2 à 50 caractères correspondant à `^[a-zA-Z0-9 ,.'-]+$`; `ligne2` facultative, si renseignée de 2 à 50 caractères correspondant à `^[a-zA-Z0-9 ,.'-]+$`; `codePostal` exactement 5 caractères majuscules alphanumériques correspondant à `^[A-Z0-9]{5}$`; `situationFamiliale` parmi `CELIBATAIRE`, `MARIE`, `DIVORCE`, `VEUF`, `PACSE`; `nombreEnfants` entier de 0 à 20 inclus.
- [X] T009 [US1] Construire dans `src/app/features/clients/client-create-page.component.html` le formulaire avec libellés accessibles, erreurs associées aux champs, commandes enregistrer/annuler et retour explicite après succès.
- [X] T010 [US1] Adapter `src/app/features/clients/client-create-page.component.css` à la maquette de création et aux écrans étroits sans défilement horizontal.
- [X] T011 [US1] Ajouter la route `/clients/new` avant les routes paramétrées et relier la commande « Nouveau client » depuis la liste dans `src/app/app.routes.ts` et `src/app/features/clients/client-list-page.component.html`.

**Checkpoint**: La création est démontrable depuis la liste; une fiche valide reçoit un identifiant et les erreurs ou annulations ne mutent pas la collection.

## Phase 4: User Story 2 - Consulter une fiche client (Priority: P1)

**Goal**: Ouvrir le détail d'une fiche par son identifiant et revenir à la liste, en distinguant chargement, erreur et fiche introuvable.

**Independent Test**: Depuis la liste, ouvrir une fiche connue, vérifier tous ses champs, revenir à la liste, puis ouvrir un identifiant inconnu et vérifier l'état introuvable.

### Tests for User Story 2

- [X] T012 [P] [US2] Ajouter les tests de détail dans `src/app/features/clients/client-detail-page.component.spec.ts` pour les champs affichés, le retour liste, le chargement, l'erreur récupérable et l'identifiant inconnu.
- [X] T013 [P] [US2] Ajouter les tests de recherche par identifiant dans `src/app/features/clients/client-list.service.spec.ts` pour fiche présente, identifiant absent et conservation de l'ordre de la liste.

### Implementation for User Story 2

- [X] T014 [US2] Ajouter dans `src/app/features/clients/client-list.service.ts` la lecture d'une fiche par identifiant, sans modifier la collection.
- [X] T015 [US2] Implémenter dans `src/app/features/clients/client-detail-page.component.ts` le chargement de la fiche depuis la route et les états chargement, succès, introuvable et erreur avec nouvelle tentative.
- [X] T016 [US2] Construire dans `src/app/features/clients/client-detail-page.component.html` le détail de l'identité, de l'adresse renseignée et de la situation familiale, les commandes de retour et de gestion, sans action active de modification du nom/prénom.
- [X] T017 [US2] Adapter `src/app/features/clients/client-detail-page.component.css` aux repères de la maquette et aux écrans étroits.
- [X] T018 [US2] Enregistrer la route `/clients/:id` vers la page détail dans `src/app/app.routes.ts` et vérifier que `/clients/new` reste prioritaire.

**Checkpoint**: Les fiches de la liste sont consultables par identifiant et une fiche absente est signalée sans erreur non gérée.

## Phase 5: User Story 3 - Modifier une adresse (Priority: P2)

**Goal**: Mettre à jour uniquement l'adresse depuis le détail, avec annulation et refus sans mutation partielle.

**Independent Test**: Modifier une adresse, vérifier les nouvelles valeurs et l'identité/situation inchangées; annuler puis simuler un refus et vérifier que l'adresse initiale persiste.

### Tests for User Story 3

- [X] T019 [P] [US3] Ajouter les tests du dialogue d'adresse dans `src/app/features/clients/client-detail-page.component.spec.ts` pour préremplissage, validation, enregistrement, annulation, erreur et absence de mutation partielle.
- [X] T020 [P] [US3] Ajouter les tests de mise à jour d'adresse dans `src/app/features/clients/client-list.service.spec.ts` pour modification des seuls champs d'adresse et conservation de la fiche après échec.

### Implementation for User Story 3

- [X] T021 [US3] Implémenter dans `src/app/features/clients/client-list.service.ts` une mise à jour atomique de l'adresse d'une fiche identifiée, en préservant les champs d'identité et de situation.
- [X] T022 [US3] Ajouter dans `src/app/features/clients/client-detail-page.component.ts` le formulaire de modification d'adresse : `ligne1` de 2 à 50 caractères correspondant à `^[a-zA-Z0-9 ,.'-]+$`; `ligne2` facultative, si renseignée de 2 à 50 caractères correspondant à `^[a-zA-Z0-9 ,.'-]+$`; `codePostal` exactement 5 caractères majuscules alphanumériques correspondant à `^[A-Z0-9]{5}$`; `ville` de 2 à 50 caractères correspondant à `^[a-zA-Z ,.'-]+$`. En cas d'erreur simulée de cohérence code postal/ville, conserver les valeurs et ne pas muter la fiche.
- [X] T023 [US3] Ajouter dans `src/app/features/clients/client-detail-page.component.html` le dialogue accessible d'adresse prérempli, les erreurs associées aux champs, et les commandes enregistrer/annuler.
- [X] T024 [US3] Adapter `src/app/features/clients/client-detail-page.component.css` à l'affichage du dialogue d'adresse et à son utilisation sur petit écran.

**Checkpoint**: Une adresse valide est remplacée seule; annulation, données invalides ou erreur gardent l'adresse existante.

## Phase 6: User Story 4 - Modifier la situation familiale (Priority: P2)

**Goal**: Mettre à jour ensemble la situation familiale et le nombre d'enfants sans altérer les autres données.

**Independent Test**: Enregistrer une situation autorisée et un nombre valide, vérifier seuls ces champs; tester les limites, l'annulation et le cas célibataire avec enfants.

### Tests for User Story 4

- [X] T025 [P] [US4] Ajouter les tests du dialogue de situation dans `src/app/features/clients/client-detail-page.component.spec.ts` pour préremplissage, cinq choix, limites 0/20, refus de 21, annulation et conservation des autres champs.
- [X] T026 [P] [US4] Ajouter les tests de mise à jour de situation dans `src/app/features/clients/client-list.service.spec.ts` pour mutation des seuls champs familiaux et conservation après échec.

### Implementation for User Story 4

- [X] T027 [US4] Implémenter dans `src/app/features/clients/client-list.service.ts` la mise à jour atomique de `situationFamiliale` et `nombreEnfants`, sans altérer l'identité ni l'adresse.
- [X] T028 [US4] Ajouter dans `src/app/features/clients/client-detail-page.component.ts` la validation de `situationFamiliale` parmi `CELIBATAIRE`, `MARIE`, `DIVORCE`, `VEUF`, `PACSE` et de `nombreEnfants` entier de 0 à 20 inclus; autoriser un client célibataire à avoir des enfants.
- [X] T029 [US4] Ajouter dans `src/app/features/clients/client-detail-page.component.html` le dialogue de situation prérempli avec libellés, erreurs liées aux champs et commandes enregistrer/annuler.
- [X] T030 [US4] Adapter `src/app/features/clients/client-detail-page.component.css` à l'affichage du dialogue de situation sur écrans larges et étroits.

**Checkpoint**: Les deux champs familiaux sont validés et modifiés ensemble; les autres valeurs restent inchangées en cas de succès, d'erreur ou d'annulation.

## Phase 7: User Story 5 - Supprimer une fiche client (Priority: P2)

**Goal**: Demander une confirmation explicite, annuler sans effet ou supprimer la fiche et revenir à la liste.

**Independent Test**: Annuler une suppression et vérifier que la fiche est conservée; confirmer une seconde suppression et vérifier son absence de la liste, y compris le cas de la dernière fiche.

### Tests for User Story 5

- [X] T031 [P] [US5] Ajouter les tests de confirmation dans `src/app/features/clients/client-detail-page.component.spec.ts` pour identité affichée, annulation, confirmation, retour liste, état vide après suppression de la dernière fiche et erreur récupérable.
- [X] T032 [P] [US5] Ajouter les tests de suppression dans `src/app/features/clients/client-list.service.spec.ts` pour retrait de la seule fiche ciblée, absence d'effet sur les autres fiches et identifiant inconnu.

### Implementation for User Story 5

- [X] T033 [US5] Implémenter dans `src/app/features/clients/client-list.service.ts` la suppression d'une fiche par identifiant sans toucher aux autres fiches de la collection.
- [X] T034 [US5] Ajouter dans `src/app/features/clients/client-detail-page.component.ts` l'état de confirmation et le traitement de suppression; en cas de succès, revenir à la liste, et en cas d'erreur conserver la fiche et permettre un nouvel essai.
- [X] T035 [US5] Ajouter dans `src/app/features/clients/client-detail-page.component.html` une confirmation accessible qui identifie la fiche, avertit que la suppression est irréversible et expose des commandes distinctes d'annulation et de confirmation.
- [X] T036 [US5] Adapter `src/app/features/clients/client-detail-page.component.css` à la confirmation de suppression, y compris sur écran étroit.

**Checkpoint**: L'annulation préserve la fiche et une confirmation la retire; l'erreur reste distincte d'un succès.

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Vérifier l'accessibilité, le responsive, les parcours complets et la compilation.

- [X] T037 Compléter les tests clavier, annonces d'état, libellés, focus des dialogues et absence de défilement horizontal dans `src/app/features/clients/client-create-page.component.spec.ts` et `src/app/features/clients/client-detail-page.component.spec.ts`.
- [X] T038 Exécuter les scénarios manuels et automatisés décrits dans `specs/002-gestion-complete-clients/quickstart.md`, lancer `npm test -- --watch=false` et `npm run build`, puis corriger tout écart dans les fichiers concernés.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Aucun travail; le projet Angular et les dépendances existent déjà.
- **Foundational (Phase 2)**: Obligatoire avant les User Stories; fixe l'identité des fiches et le stockage partagé de session.
- **User Stories**: Toutes dépendent de la fondation; l'ordre d'implémentation recommandé est US1 → US2 → US3 → US4 → US5, car les routes, le service et la page détail sont partagés.
- **Polish (Phase 8)**: Après les parcours retenus; T038 constitue le gate final.

### User Story Dependencies

- **US1 (P1)**: Après Foundation; la création utilise le service mock et la liste existante.
- **US2 (P1)**: Après Foundation; la page détail dépend des identifiants et de la recherche dans le service. Sa livraison suit US1 pour séquencer les modifications du service et du routeur.
- **US3 (P2)**: Après US2, car la modification d'adresse est lancée depuis la page détail.
- **US4 (P2)**: Après US2, car la modification de situation est lancée depuis la page détail; exécution après US3 pour éviter les conflits sur les fichiers partagés.
- **US5 (P2)**: Après US2, car la confirmation de suppression est lancée depuis le détail; exécution après US3/US4 pour éviter les conflits sur les fichiers partagés.

### Parallel Opportunities

- Dans chaque User Story, le test de page et le test de service peuvent être écrits en parallèle, car ils ciblent des fichiers distincts (`*.component.spec.ts` et `client-list.service.spec.ts`).
- Les tâches d'implémentation du service et des composants ne sont pas marquées parallèles lorsqu'elles partagent un contrat encore en cours de définition ou lorsqu'elles touchent aux mêmes fichiers.
- Les stories US3, US4 et US5 partagent `client-detail-page.component.*` et `client-list.service.ts`; elles sont donc sérialisées dans ce plan.

## Parallel Example: User Story 1

```text
Après la fondation, écrire en parallèle :
T005 — tests du formulaire dans src/app/features/clients/client-create-page.component.spec.ts
T006 — tests de création du service dans src/app/features/clients/client-list.service.spec.ts
```

Le même découpage page/service s'applique aux tests T012/T013, T019/T020, T025/T026 et T031/T032 dans leurs stories respectives.

## Implementation Strategy

### MVP First

1. Terminer la fondation commune (Phase 2).
2. Implémenter US1 pour créer une fiche et la retrouver dans la liste.
3. Implémenter US2 pour vérifier le parcours de bout en bout création → détail → retour liste, conforme au test indépendant de US1.
4. Valider ces deux stories comme MVP avant d'ajouter les deux modifications et la suppression.

### Incremental Delivery

1. Foundation → US1/US2 : liste, création et consultation de détail.
2. US3 : modification d'adresse uniquement.
3. US4 : modification de situation familiale uniquement.
4. US5 : suppression avec confirmation.
5. Phase 8 : tests complets, parcours quickstart et build.

## Notes

- Les lignes de tâches utilisent toutes une case à cocher, un identifiant séquentiel, un label de story pour les phases US, et des chemins de fichiers.
- `[P]` est réservé aux tests écrits dans des fichiers distincts et sans dépendance d'implémentation inachevée.
- Les tests doivent d'abord échouer sur le comportement absent, puis passer après l'implémentation.
- Les modifications n'utilisent ni backend, ni stockage navigateur, ni authentification, ni nouvelle dépendance.