# Feature Specification: Liste des clients

**Feature Branch**: `[001-liste-clients]`

**Created**: 2026-10-28

**Status**: Draft

**Input**: User description: Spécifier une application frontend de gestion de clients couvrant les points de terminaison du contrat OpenAPI. Pour le premier MVP, livrer uniquement la page d'accueil et utiliser un mock pour les tests, le backend n'étant pas disponible.

## User Scenarios & Testing

### User Story 1 - Consulter la liste des clients (Priority: P1)

En tant que conseiller, je veux consulter sur la page d'accueil les fiches clients disponibles afin d'identifier rapidement une personne et sa commune.

**Why this priority**: La liste est le seul parcours de cette première version et constitue le point d'entrée de la future application de gestion.

**Independent Test**: Ouvrir la page avec un jeu de données mocké et vérifier que chaque fiche fournie apparaît avec l'identité et la localisation prévues.

**Acceptance Scenarios**:

1. **Given** un jeu mocké contenant au moins cinq clients, **When** le conseiller ouvre l'accueil, **Then** une fiche est affichée pour chaque client, avec son nom, son prénom, son code postal et sa ville, sous le titre « Liste des clients » et selon les repères visuels essentiels de la maquette.
2. **Given** un jeu mocké contenant un seul client, **When** le conseiller ouvre l'accueil, **Then** la fiche est affichée correctement sans espace vide ni erreur.
3. **Given** un jeu mocké contenant plusieurs fiches, **When** le conseiller consulte la page sur un écran étroit, **Then** les fiches restent lisibles et accessibles sans défilement horizontal de la page.
4. **Given** la liste est affichée, **When** le conseiller repère une fiche, **Then** les commandes de création et de consultation du détail ne l'envoient pas vers des pages absentes du MVP.

### User Story 2 - Comprendre l'état de la liste (Priority: P2)

En tant que conseiller, je veux savoir si aucun client n'est disponible ou si la liste n'a pas pu être chargée afin de ne pas confondre ces deux situations.

**Why this priority**: Une liste vide et un problème de chargement appellent des suites différentes; les distinguer rend le parcours fiable, même en mode mock.

**Independent Test**: Exécuter la page avec des réponses mockées « chargement », « liste vide » et « erreur », puis vérifier le message et l'action proposés dans chaque cas.

**Acceptance Scenarios**:

1. **Given** les données ne sont pas encore disponibles, **When** la page attend la liste, **Then** un état de chargement compréhensible est présenté.
2. **Given** la réponse contient une liste vide, **When** le chargement est terminé, **Then** un état vide indique qu'aucun client n'est disponible.
3. **Given** le chargement échoue, **When** l'erreur est présentée, **Then** le conseiller reçoit un message compréhensible et peut réessayer.

### Edge Cases

- La liste ne contient aucun client : afficher l'état vide, sans carte fictive ni erreur.
- Le chargement échoue : ne pas présenter une liste vide comme si le chargement avait réussi; permettre une nouvelle tentative.
- Une fiche ne contient pas une valeur nécessaire à son affichage : conserver une présentation lisible et signaler la valeur indisponible plutôt que d'afficher un contenu trompeur.
- Le nombre de fiches dépasse la hauteur visible : la page permet de parcourir toutes les fiches par défilement, sans en masquer.
- Le navigateur est utilisé sur un écran étroit ou au clavier : le contenu reste lisible et les commandes disponibles restent identifiables et utilisables.

## Requirements

### Functional Requirements

- **FR-001**: La page d'accueil MUST présenter clairement le titre « Liste des clients » et la collection des fiches clients disponibles.
- **FR-002**: Pour chaque fiche, la page MUST afficher le nom, le prénom, le code postal et la ville; chaque client retourné MUST être représenté une seule fois.
- **FR-003**: La présentation MUST reprendre les repères visuels essentiels de la maquette d'accueil : en-tête, cartes de clients, identité mise en évidence et localisation lisible.
- **FR-004**: Dans le MVP, les fonctions de création, de consultation du détail, de modification et de suppression MUST NOT être exécutables. La page MUST NOT proposer de commande qui mène à un parcours absent; toute commande conservée comme repère visuel MUST être explicitement indisponible.
- **FR-005**: En l'absence du backend, les tests et la démonstration du MVP MUST pouvoir utiliser un jeu de données mocké déterministe, contenant au moins cinq fiches fictives représentatives de la maquette.
- **FR-006**: Le mock MUST permettre de vérifier les états de chargement, de liste vide, d'erreur et de nouvelle tentative, sans dépendre d'un service backend.
- **FR-007**: La page MUST distinguer clairement le chargement, la liste vide et l'échec de chargement; en cas d'échec, elle MUST proposer une nouvelle tentative et ne MUST NOT afficher l'échec comme une liste vide réussie.
- **FR-008**: La mise en page MUST rester lisible sur écran étroit et permettre de parcourir une liste plus longue que la zone visible.
- **FR-009**: La cible fonctionnelle de l'application complète MUST couvrir les usages correspondant aux six opérations du contrat fourni : consulter la liste, créer une fiche, consulter une fiche, supprimer une fiche, modifier une adresse et modifier une situation familiale. Seule la consultation de la liste est incluse dans le présent MVP.

### Key Entities

- **Fiche client** : Informations d'identification du client (nom et prénom), adresse (dont code postal et ville) et situation familiale. Dans le MVP, les données servent uniquement à alimenter et tester la liste; aucune modification n'est conservée.
- **Liste de clients** : Ensemble des fiches clients présenté sur la page d'accueil, pouvant être vide ou contenir plusieurs fiches.
- **Jeu de données mocké** : Données fictives prévisibles utilisées pour tester et démontrer la liste lorsque le backend n'est pas disponible.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Dans le jeu de données de démonstration, 100 % des fiches fournies apparaissent une fois et présentent le nom, le prénom, le code postal et la ville.
- **SC-002**: Avec le mock, la page présente la liste ou l'état demandé en moins de 2 secondes dans au moins 95 % des ouvertures réalisées dans les conditions normales de démonstration.
- **SC-003**: Au moins 9 utilisateurs sur 10 retrouvent une fiche donnée et sa commune en moins de 10 secondes lors d'un test d'acceptation.
- **SC-004**: Les trois états — chargement, liste vide et erreur — sont distinguables sans ambiguïté lors de 100 % des tests d'acceptation correspondants.
- **SC-005**: La liste reste consultable au clavier et sur un écran étroit sans perte d'information ni défilement horizontal de la page.

## Assumptions

- Le périmètre à livrer maintenant est limité à la page d'accueil et à la consultation de la liste; les maquettes de création, détail, modification et suppression sont des références pour des versions ultérieures.
- Le mock utilise des données fictives stables et ne persiste aucune modification. Aucun backend n'est requis pour les tests ni pour la démonstration du MVP.
- La liste conserve l'ordre des fiches reçu; la recherche, le tri, les filtres et la pagination ne sont pas demandés dans ce MVP.
- Le POC n'inclut ni authentification ni exigences de sécurité de production, conformément à la constitution du projet.
- Le contrat OpenAPI fourni définit six opérations pour les parcours cibles. La maquette du détail propose également une modification du nom, mais aucune opération correspondante n'est définie dans le contrat; cette action reste hors périmètre jusqu'à clarification ou évolution du contrat.
- La maquette de référence de l'accueil est [maquette_accueil-client.png](../../../input/maquette_accueil-client.png) et le contrat de référence est [connaissance-client-api.yaml](../../../input/connaissance-client-api.yaml).
