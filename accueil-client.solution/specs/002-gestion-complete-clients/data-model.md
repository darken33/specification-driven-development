# Data Model: Gestion complète des clients

Les champs et règles de saisie suivent `input/connaissance-client-api.yaml`. Le mock conserve les changements uniquement dans la session courante.

## Fiche client

| Champ | Type applicatif | Obligatoire | Validation / rôle |
|---|---|---:|---|
| `id` | chaîne | Oui après création ou chargement du mock | Identifiant stable et unique utilisé pour ouvrir et modifier une fiche; généré pour les créations mockées. Le schéma OpenAPI le rend facultatif mais indique qu'il est généré lors de la création. |
| `nom` | chaîne | Oui | 2 à 50 caractères correspondant à `^[a-zA-Z ,.'-]+$`; affiché dans la liste et le détail, non modifiable dans cette fonctionnalité. |
| `prenom` | chaîne | Oui | 2 à 50 caractères correspondant à `^[a-zA-Z ,.'-]+$`; affiché dans la liste et le détail, non modifiable dans cette fonctionnalité. |
| `ligne1` | chaîne | Oui | 2 à 50 caractères correspondant à `^[a-zA-Z0-9 ,.'-]+$`. |
| `ligne2` | chaîne | Non | Si renseignée, 2 à 50 caractères correspondant à `^[a-zA-Z0-9 ,.'-]+$`. |
| `codePostal` | chaîne | Oui | Exactement 5 caractères majuscules alphanumériques correspondant à `^[A-Z0-9]{5}$`; reste une chaîne. |
| `ville` | chaîne | Oui | 2 à 50 caractères correspondant à `^[a-zA-Z ,.'-]+$`. |
| `situationFamiliale` | enum | Oui | Une valeur parmi `CELIBATAIRE`, `MARIE`, `DIVORCE`, `VEUF`, `PACSE`. |
| `nombreEnfants` | entier | Oui | De 0 à 20 inclus; un client célibataire peut avoir des enfants. |

L'identifiant, et non le nom ou le prénom, distingue les fiches. Le contrat ne définit pas de clé naturelle ou de règle d'unicité sur l'identité; les homonymes ne sont donc pas dédupliqués par le mock.

## Entrées de commande

- **Création** : tous les champs métier de la fiche sans `id`; le service attribue un identifiant avant d'ajouter la fiche.
- **Modification d'adresse** : `ligne1`, `ligne2` facultative, `codePostal` et `ville`; aucune autre propriété n'est modifiée.
- **Modification de situation** : `situationFamiliale` et `nombreEnfants`; aucune autre propriété n'est modifiée.
- **Suppression** : identifiant de la fiche; suppression de cette occurrence de la collection après confirmation dans l'interface.

## Collection et états

La collection est initialisée à partir d'une copie du jeu de démonstration. Les opérations réussies modifient cette collection partagée; l'annulation ou l'échec laisse la fiche précédente intacte. Un rechargement réinitialise la collection au jeu initial.

| Contexte | États observables | Transition principale |
|---|---|---|
| Liste | Chargement, liste, vide, erreur | Chargement vers liste/vide ou erreur; nouvelle tentative relance le chargement. |
| Détail | Chargement, détail, introuvable, erreur | Chargement vers détail ou état correspondant; retour vers la liste. |
| Formulaire | Saisie, invalide, enregistrement, erreur | Enregistrement valide vers succès; invalide/erreur conserve les valeurs et ne modifie pas la collection. |
| Dialogue de suppression | Confirmation, annulation, suppression, erreur | Annulation conserve la fiche; succès la retire; erreur conserve la fiche. |

La cohérence géographique code postal/ville n'est pas calculée localement. Un refus est simulé pour tester l'affichage d'erreur et l'absence de mutation partielle.