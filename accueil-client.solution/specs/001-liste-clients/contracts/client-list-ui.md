# Contrat d'interface — Liste des clients

## Surface

Route d'accueil de l'application Angular; elle présente une liste en lecture seule et ne suppose aucun backend disponible.

## Affichage nominal

- Le titre visible est « Liste des clients ».
- Chaque fiche du résultat est rendue une seule fois, dans l'ordre reçu, avec nom, prénom, code postal et ville.
- Une donnée nécessaire manquante est indiquée par « Non renseigné »; elle ne provoque ni disparition de la fiche ni valeur inventée.
- Les repères de la maquette (en-tête, titre, cartes et identité/localisation hiérarchisées) sont conservés sans obliger à reproduire exactement chaque détail décoratif.
- La mise en page s'adapte aux écrans étroits et ne provoque pas de défilement horizontal de la page.

## États

| Réponse du service | Présentation attendue |
|---|---|
| Chargement en cours | Indicateur et libellé compréhensible; aucune liste vide de succès affichée prématurément. |
| Liste vide reçue | Message indiquant qu'aucun client n'est disponible; aucune carte fictive. |
| Liste reçue | Une carte pour chaque entrée. |
| Erreur | Message compréhensible et commande permettant de réessayer; pas d'état vide trompeur. |

## Interactions et accessibilité

- Aucune interaction ne déclenche la création, le détail, la modification ou la suppression.
- Les éventuels repères « Nouveau client » et « Voir le détail » sont visiblement et sémantiquement indisponibles; aucun ne pointe vers une route absente.
- Le texte reste lisible sur écran étroit; les informations et commandes disponibles sont identifiables au clavier.
- Les états et erreurs sont annoncés avec une sémantique adaptée aux technologies d'assistance.

## Hors contrat MVP

Authentification, backend HTTP, navigation vers les cinq parcours futurs, recherche, tri, filtres, pagination, modification et persistance.
