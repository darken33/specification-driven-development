# Data Model: Liste des clients

## Fiche client

Représentation d'une fiche issue du schéma `ConnaissanceClient` de `input/connaissance-client-api.yaml`, adaptée à l'affichage de la liste.

| Champ | Type attendu | Règle |
|---|---|---|
| `id` | chaîne, facultative | L'OpenAPI ne le marque pas comme obligatoire; le rendu d'une occurrence ne doit pas dépendre de sa présence. |
| `nom` | chaîne | Champ requis par l'OpenAPI; affiché comme identité principale. |
| `prenom` | chaîne | Champ requis par l'OpenAPI; affiché sous le nom. |
| `codePostal` | chaîne | Champ requis; conservé comme chaîne afin de préserver les zéros initiaux. |
| `ville` | chaîne | Champ requis; affiché avec le code postal. |
| `ligne1`, `ligne2` | chaînes; `ligne2` facultative | Définies par l'OpenAPI, mais non requises par la carte du MVP. |
| `situationFamiliale`, `nombreEnfants` | chaîne énumérée et entier | Définis par l'OpenAPI; conservés dans le modèle complet, non présentés sur la liste du MVP. |

### Règles d'affichage et validation

- Le contrat OpenAPI impose `nom`, `prenom`, `ligne1`, `codePostal`, `ville`, `situationFamiliale` et `nombreEnfants` sur une fiche complète. Le mock nominal doit respecter ce schéma.
- Pour couvrir l'edge case de valeur absente, la frontière de présentation traite les champs affichés comme potentiellement absents et rend « Non renseigné » à la place d'une valeur vide ou trompeuse.
- Chaque entrée du tableau est affichée une seule fois et dans l'ordre reçu. Ne pas dédupliquer sur `id`, qui est facultatif.
- Le mock de démonstration contient au moins cinq fiches fictives stables inspirées des données visibles dans la maquette; aucune donnée réelle ni écriture persistante.

## Liste de clients

Collection ordonnée de zéro à plusieurs fiches clients, fournie par le service de liste. Son état de chargement est l'un des états suivants:

| État | Données | Comportement |
|---|---|---|
| `loading` | En attente | Afficher un indicateur et un libellé de chargement. |
| `success` | Liste non vide | Afficher chaque fiche une seule fois. |
| `empty` | Liste vide reçue avec succès | Afficher explicitement qu'aucun client n'est disponible. |
| `error` | Échec de chargement | Afficher un message compréhensible et une commande de nouvelle tentative. |

Le réessai relance le service et fait transiter l'interface par `loading`; une erreur ne doit jamais être convertie en succès vide.

## Jeu de données mocké

Jeu immuable de démonstration fourni localement par le service. Les tests peuvent remplacer le service ou ses réponses pour produire successivement chargement, résultat vide, erreur et réessai réussi. Le mock n'implémente ni CRUD, ni persistance, ni appel HTTP.
