# Research: Liste des clients

## Socle frontend

- **Decision**: Créer l'application avec Angular CLI en mode standalone et TypeScript stable compatible avec la version stable d'Angular retenue au moment de l'implémentation.
- **Rationale**: La constitution du projet impose Angular/TypeScript à jour, les composants standalone, l'usage de `ng` et npm, et préfère l'architecture par fonctionnalité.
- **Alternatives considered**: Ajouter une application dans un autre framework ou imposer des versions précises avant le scaffold. Ces choix contrediraient la constitution ou imposeraient des versions sans manifeste de départ.

## Source de données et états d'interface

- **Decision**: Fournir la liste par un service Angular simple utilisant un jeu en mémoire stable. Le composant représentera explicitement les états chargement, succès avec données, succès vide et erreur; le réessai relancera le chargement via le même service. Les tests injecteront des réponses déterministes pour chaque état, sans serveur.
- **Rationale**: Le backend est indisponible et le MVP doit pouvoir fonctionner en démonstration et vérifier tous les états sans réseau. Le service sépare l'accès aux données de l'affichage sans introduire une couche de repository ou un store global.
- **Alternatives considered**: Appels HTTP réels, persistance locale, ou données codées directement dans le composant. Les deux premiers dépendent d'infrastructure exclue; le dernier mêle les données et le traitement à l'interface et rend les scénarios d'erreur/réessai moins testables.

## Modèle de liste

- **Decision**: Projeter le modèle `ConnaissanceClient` de l'OpenAPI sur les champs nécessaires à la carte (nom, prénom, code postal, ville), en conservant les autres champs uniquement si utiles au type de fiche. Tolérer les valeurs absentes au rendu, bien que le contrat les définisse comme requises, et afficher une mention explicite « Non renseigné ». Préserver l'ordre des entrées.
- **Rationale**: La spécification exige l'identité et la localisation, ainsi qu'un rendu honnête des données manquantes. L'OpenAPI 2.1.0 définit les champs requis, mais pas `id`; le rendu doit donc ne pas dépendre exclusivement d'un identifiant pour chaque occurrence.
- **Alternatives considered**: Traiter les données partielles comme une liste vide ou filtrer les entrées incomplètes. Cela masquerait des fiches et confondrait données manquantes et absence de résultats.

## Repères visuels et actions hors périmètre

- **Decision**: Reprendre les repères essentiels de la maquette d'accueil (en-tête, titre, cartes, identité mise en évidence, adresse lisible et grille adaptative). Ne fournir aucune action de navigation active vers une route absente; si les commandes de création/détail sont conservées comme repères, elles seront explicitement indisponibles.
- **Rationale**: Cela respecte FR-003/FR-004 et permet une page responsive sans ajouter les parcours des versions futures.
- **Alternatives considered**: Créer des destinations fictives ou activer des boutons sans effet. Ces options induiraient une interaction trompeuse.

## Vérification

- **Decision**: Utiliser les vérifications fournies par Angular CLI (`ng test` pour les comportements ciblés et `ng build` pour la compilation), puis suivre les scénarios end-to-end décrits dans `quickstart.md`.
- **Rationale**: La constitution demande compilation et tests ciblés pour tout changement comportemental; aucun outillage de test additionnel n'est justifié par le périmètre.
- **Alternatives considered**: Ajouter une suite de navigateur ou une dépendance de test externe dès le MVP. Cela augmenterait le socle sans besoin établi.
