# Feature Specification: Gestion complète des clients

**Feature Branch**: `[002-gestion-complete-clients]`

**Created**: 2026-10-28

**Status**: Draft

**Input**: User description: « bien nous avons construit le MVP d'accueil-client nous devons maintenant créer l'application complète (implémenter les autres maquettes) »

## Clarifications

### Session 2026-10-28

- Q: Pour cette version complète, faut-il garder un mock en mémoire pour toutes les opérations ou connecter l’application au backend ? → A: Mock en mémoire pour toutes les opérations; les changements sont réinitialisés au rechargement.
- Q: Cette version de démonstration doit-elle permettre de modifier le nom et le prénom depuis le détail, même si l’API ne prévoit pas cette opération ? → A: L’exclure et ne pas proposer cette action avant l’évolution de l’API.

## User Scenarios & Testing

### User Story 1 - Créer une fiche client (Priority: P1)

En tant que conseiller, je veux saisir une fiche client complète afin de l'ajouter à la liste et de pouvoir la consulter.

**Why this priority**: La création rend la liste réellement gérable et constitue le point de départ des autres parcours.

**Independent Test**: Depuis la liste, créer une fiche avec des données valides et vérifier qu'elle apparaît dans la liste et que son détail est consultable.

**Acceptance Scenarios**:

1. **Given** la liste est affichée, **When** le conseiller ouvre « Nouveau client », renseigne les champs obligatoires valides et enregistre, **Then** la fiche est créée et apparaît dans la liste.
2. **Given** le formulaire de création est ouvert, **When** un champ obligatoire est vide ou invalide, **Then** l'enregistrement est empêché et l'erreur est indiquée au champ concerné.
3. **Given** le formulaire contient des valeurs, **When** le conseiller l'annule, **Then** aucune fiche n'est créée et il revient à la liste.
4. **Given** la création échoue, **When** le résultat est présenté, **Then** la fiche n'est pas ajoutée et le conseiller peut corriger ou réessayer sans perdre les valeurs saisies.

### User Story 2 - Consulter une fiche client (Priority: P1)

En tant que conseiller, je veux ouvrir le détail d'une fiche depuis la liste afin de consulter l'identité, l'adresse et la situation familiale d'un client.

**Why this priority**: Le détail est le point d'entrée nécessaire aux modifications et à la suppression.

**Independent Test**: Ouvrir depuis la liste une fiche connue et vérifier tous ses champs, puis revenir à la liste.

**Acceptance Scenarios**:

1. **Given** une fiche figure dans la liste, **When** le conseiller la sélectionne, **Then** son détail affiche son nom, son prénom, son adresse, sa situation familiale et son nombre d'enfants.
2. **Given** le détail est affiché, **When** le conseiller choisit « Retour à la liste », **Then** il retrouve la liste des fiches.
3. **Given** l'identifiant demandé ne correspond à aucune fiche, **When** le détail est ouvert, **Then** un état « fiche introuvable » est présenté avec un moyen de revenir à la liste.

### User Story 3 - Modifier une adresse (Priority: P2)

En tant que conseiller, je veux corriger ou mettre à jour l'adresse d'un client depuis son détail afin de conserver ses coordonnées à jour.

**Why this priority**: L'adresse est une donnée susceptible de changer et dispose d'un parcours dédié dans la maquette et le contrat.

**Independent Test**: Modifier une adresse, vérifier les nouvelles valeurs dans le détail et vérifier que l'identité et la situation familiale sont inchangées.

**Acceptance Scenarios**:

1. **Given** le détail d'une fiche est affiché, **When** le conseiller ouvre la modification d'adresse, **Then** les champs sont préremplis avec l'adresse courante et la deuxième ligne reste facultative.
2. **Given** des valeurs d'adresse valides, **When** le conseiller enregistre, **Then** seule l'adresse de la fiche change et le détail présente les nouvelles valeurs.
3. **Given** le dialogue de modification est ouvert, **When** le conseiller annule, **Then** l'adresse existante reste inchangée.
4. **Given** une adresse est incomplète, mal formée ou refusée comme incohérente, **When** le conseiller l'enregistre, **Then** une erreur explicite est présentée et aucune modification n'est appliquée.

### User Story 4 - Modifier la situation familiale (Priority: P2)

En tant que conseiller, je veux modifier la situation familiale et le nombre d'enfants d'un client afin de refléter sa situation actuelle.

**Why this priority**: Cette information évolue indépendamment de l'adresse et dispose également d'un parcours dédié dans la maquette et le contrat.

**Independent Test**: Modifier la situation familiale et le nombre d'enfants, vérifier les nouvelles valeurs et confirmer que l'adresse et l'identité n'ont pas changé.

**Acceptance Scenarios**:

1. **Given** le détail d'une fiche est affiché, **When** le conseiller ouvre la modification de situation, **Then** la situation et le nombre d'enfants courants sont préremplis.
2. **Given** une situation autorisée et un nombre d'enfants de 0 à 20 sont saisis, **When** le conseiller enregistre, **Then** seules ces deux valeurs sont mises à jour.
3. **Given** le conseiller saisit une situation non autorisée ou un nombre d'enfants hors limites, **When** il tente d'enregistrer, **Then** la validation signale l'erreur et la fiche demeure inchangée.
4. **Given** le dialogue est ouvert, **When** le conseiller l'annule, **Then** la situation enregistrée demeure inchangée.

### User Story 5 - Supprimer une fiche client (Priority: P2)

En tant que conseiller, je veux supprimer une fiche après confirmation afin de retirer une fiche qui ne doit plus figurer dans la liste.

**Why this priority**: La suppression répond au parcours de gestion prévu, mais doit protéger contre une action irréversible déclenchée par erreur.

**Independent Test**: Annuler une première demande de suppression et vérifier que la fiche existe toujours, puis confirmer une seconde demande et vérifier qu'elle a disparu de la liste.

**Acceptance Scenarios**:

1. **Given** le détail d'une fiche est affiché, **When** le conseiller demande sa suppression, **Then** une confirmation identifie clairement la fiche et avertit que l'action est irréversible.
2. **Given** la confirmation est affichée, **When** le conseiller annule, **Then** la fiche est conservée.
3. **Given** la confirmation est affichée, **When** le conseiller confirme, **Then** la fiche est supprimée et le conseiller revient à la liste, où elle n'apparaît plus.
4. **Given** la suppression échoue, **When** le résultat est présenté, **Then** la fiche est conservée et un message permet de réessayer.

### Edge Cases

- La liste est vide au chargement : afficher l'état vide et permettre d'ouvrir la création.
- La fiche supprimée est la dernière : revenir à la liste et afficher l'état vide.
- Une fiche devient introuvable entre l'affichage de la liste et l'ouverture de son détail : afficher l'état introuvable sans erreur non gérée.
- La ligne d'adresse 2 est absente ou vide : accepter l'adresse et ne pas afficher de valeur trompeuse.
- Un enregistrement est annulé ou refusé : ne modifier aucune donnée existante et ne pas ajouter de fiche.
- Une opération de lecture ou d'écriture échoue : distinguer l'échec d'un résultat vide ou réussi, afficher un message compréhensible et proposer une nouvelle tentative lorsque cela est possible.
- Le conseiller déclenche plusieurs fois rapidement un enregistrement : ne créer ou modifier la fiche qu'une seule fois.
- La fenêtre est étroite ou l'utilisateur navigue au clavier : formulaires, détails, confirmations et retours restent utilisables sans perte d'information.

## Requirements

### Functional Requirements

- **FR-001**: L'application MUST conserver la liste des clients du MVP, afficher chaque fiche disponible et donner accès à la création et au détail d'une fiche.
- **FR-002**: L'application MUST proposer un formulaire de création comprenant le nom, le prénom, l'adresse (ligne 1 et ligne 2 facultative), le code postal, la ville, la situation familiale et le nombre d'enfants.
- **FR-003**: La création MUST exiger les champs obligatoires et appliquer les contraintes de saisie du contrat : nom, prénom et ville de 2 à 50 caractères alphabétiques autorisés; ligne 1 de 2 à 50 caractères d'adresse autorisés; code postal de 5 caractères alphanumériques majuscules; situation parmi CELIBATAIRE, MARIE, DIVORCE, VEUF et PACSE; nombre d'enfants entier de 0 à 20.
- **FR-004**: Après création réussie, MUST ajouter la fiche à la collection et permettre d'ouvrir son détail; une annulation, une erreur ou une saisie invalide MUST NOT créer de fiche.
- **FR-005**: Le détail MUST présenter le nom, le prénom, les lignes d'adresse renseignées, le code postal, la ville, la situation familiale et le nombre d'enfants, ainsi que des actions de retour, de modification d'adresse, de modification de situation et de suppression.
- **FR-006**: Si la fiche demandée n'existe pas, l'application MUST présenter un état introuvable et permettre de retourner à la liste.
- **FR-007**: La modification d'adresse MUST préremplir les champs connus, permettre une ligne 2 facultative, valider les champs requis et ne modifier que les données d'adresse après succès.
- **FR-008**: La modification d'adresse MUST présenter tout refus de validation, notamment une incohérence entre code postal et ville, sans appliquer de changement partiel.
- **FR-009**: La modification de situation MUST permettre de choisir une des cinq situations prévues et de saisir un nombre entier d'enfants de 0 à 20, sans imposer que le nombre d'enfants soit nul pour une personne célibataire.
- **FR-010**: La modification de situation MUST mettre à jour uniquement la situation familiale et le nombre d'enfants; en cas d'annulation ou d'erreur, les valeurs précédentes MUST rester intactes.
- **FR-011**: La suppression MUST demander une confirmation explicite identifiant la fiche et préciser son caractère irréversible; l'annulation MUST préserver la fiche et la confirmation MUST la retirer de la collection.
- **FR-012**: L'application MUST distinguer le chargement, l'absence de résultats, l'absence d'une fiche demandée et l'échec d'une opération; elle MUST présenter des messages compréhensibles et proposer une nouvelle tentative lorsque celle-ci est pertinente.
- **FR-013**: L'application MUST utiliser un mock en mémoire pour la consultation de la liste et du détail, la création, la modification de l'adresse et de la situation familiale, ainsi que la suppression; ces opérations MUST NOT appeler le backend et les changements MUST être réinitialisés au rechargement.
- **FR-014**: Les dialogues, formulaires, erreurs de validation et confirmations MUST être utilisables au clavier, avec des libellés compréhensibles et une présentation adaptée aux écrans étroits.
- **FR-015**: L'application MUST NOT proposer d'action active de modification du nom ou du prénom avant que le contrat OpenAPI définisse l'opération correspondante.
- **FR-016**: Le périmètre MUST rester celui du POC défini par la constitution : pas d'authentification, de sécurité de production ni de pipeline CI/CD.

### Key Entities

- **Fiche client** : Identité, adresse et situation familiale d'une personne; l'identifiant distingue une fiche, tandis que les champs métier suivent les contraintes du contrat.
- **Adresse** : Ligne 1 obligatoire, ligne 2 facultative, code postal et ville; ces données sont modifiées comme un ensemble sans affecter l'identité ni la situation familiale.
- **Situation familiale** : Valeur parmi les situations prévues et nombre d'enfants compris entre 0 et 20; ces données sont modifiées ensemble sans affecter l'adresse ni l'identité.
- **Collection de clients** : Ensemble des fiches présentées dans la liste et modifiable pendant la session de démonstration; le jeu initial est restauré au rechargement.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Dans la démonstration, 100 % des parcours prévus — consulter la liste, créer, consulter le détail, modifier l'adresse, modifier la situation et supprimer — peuvent être terminés avec les données fictives sans backend.
- **SC-002**: Au moins 9 conseillers sur 10 terminent la création d'une fiche valide en moins de 2 minutes et identifient les champs invalides après une tentative de saisie incorrecte.
- **SC-003**: Dans 100 % des scénarios de modification et d'annulation testés, les seuls champs concernés sont mis à jour et les autres restent inchangés.
- **SC-004**: Dans 100 % des scénarios testés, une suppression annulée conserve la fiche et une suppression confirmée la retire de la liste.
- **SC-005**: Au moins 9 utilisateurs sur 10 accomplissent les parcours principaux au clavier et sur un écran étroit sans perte d'information ni défilement horizontal de la page.
- **SC-006**: Pour 100 % des saisies invalides et échecs simulés testés, le conseiller peut distinguer un refus ou un échec d'une opération réussie et sait quelle action entreprendre.

## Assumptions

- Le conseiller est l'utilisateur de l'application; la liste et le shell réalisés pour le MVP sont conservés et complétés par les parcours des autres maquettes.
- Le backend n'étant pas disponible, la démonstration et les tests utilisent des données fictives et des réponses simulées; toutes les modifications ne vivent que pendant la session en cours.
- Les champs, valeurs autorisées et limites proviennent de `input/connaissance-client-api.yaml`; la cohérence géographique du code postal et de la ville est représentée par une réponse simulée, sans prétendre remplacer la validation externe du backend.
- L'annulation d'un formulaire ou d'une confirmation ne modifie jamais la fiche. Une suppression confirmée est irréversible dans la session, mais le jeu de démonstration est restauré au rechargement.
- La maquette du détail montre une action « Modifier le nom », mais le contrat ne définit aucune opération correspondante; elle est donc exclue de cette évolution jusqu'à l'ajout d'une opération au contrat.
- Conformément à la constitution du projet, l'authentification, la sécurité de production et le déploiement ne font pas partie de ce POC.