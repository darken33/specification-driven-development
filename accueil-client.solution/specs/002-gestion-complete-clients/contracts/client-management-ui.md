# Contrat d'interface — Gestion des clients

## Surface et navigation

L'application est une interface web Angular sans API distante pour cette version. La route racine présente la liste; `/clients/new` ouvre la création; `/clients/:id` ouvre le détail de la fiche identifiée. La route `/clients/new` est distinguée de la route paramétrée du détail.

Toutes les opérations lisent ou modifient la collection mockée partagée pendant la session. Le rechargement restaure le jeu de démonstration. Aucune action active ne permet de modifier le nom ou le prénom.

## Liste des clients

- Conserver le titre, les informations et les repères visuels essentiels du MVP.
- Chaque fiche présente le nom, le prénom, le code postal et la ville; chaque fiche a une action accessible vers son détail.
- Une action « Nouveau client » ouvre le formulaire de création.
- Le chargement, la liste vide et l'échec restent distincts; la liste vide donne accès à la création et l'erreur permet de réessayer.
- Après une création ou une suppression, la liste reflète la collection de la session; supprimer la dernière fiche affiche l'état vide.

## Création

- Champs : nom, prénom, ligne d'adresse 1, ligne 2 facultative, code postal, ville, situation familiale et nombre d'enfants.
- Les champs requis et formats suivent le [modèle de données](../data-model.md); les erreurs sont associées aux champs concernés et empêchent l'enregistrement.
- Enregistrement réussi : ajouter une fiche avec un identifiant unique, puis revenir à la liste où elle est visible.
- Annulation : ne rien ajouter et revenir à la liste.
- Erreur d'enregistrement : conserver la saisie, expliquer l'échec et permettre une nouvelle tentative.

## Détail

- Présenter l'identité, les lignes d'adresse renseignées, le code postal, la ville, la situation familiale et le nombre d'enfants.
- Fournir les actions de retour, de modification d'adresse, de modification de situation familiale et de suppression.
- Ne pas présenter d'action active de modification du nom ou du prénom.
- Un identifiant inconnu présente un état introuvable et un retour vers la liste.

## Modification d'adresse

- Ouvrir depuis le détail dans un dialogue accessible, prérempli avec les valeurs actuelles.
- Permettre l'absence de ligne 2; valider les autres champs selon le modèle.
- Enregistrer uniquement l'adresse; annuler ou rencontrer une erreur conserve les valeurs existantes.
- Une erreur simulée de cohérence code postal/ville est annoncée sans appliquer de changement partiel.

## Modification de situation familiale

- Ouvrir depuis le détail dans un dialogue accessible, prérempli avec la situation et le nombre d'enfants actuels.
- Permettre les cinq situations du modèle et un entier de 0 à 20 inclus.
- Enregistrer uniquement ces deux champs; annuler ou rencontrer une erreur conserve les valeurs existantes.

## Suppression

- Depuis le détail, demander une confirmation qui identifie la fiche et avertit du caractère irréversible.
- L'annulation ferme la confirmation sans modifier la collection.
- La confirmation retire la fiche et ramène à la liste; une erreur conserve la fiche et permet de réessayer.

## Accessibilité et présentation

- Les champs ont des libellés, les erreurs sont associées aux contrôles et les états sont annoncés aux technologies d'assistance.
- Dialogues et confirmations sont utilisables au clavier; le focus reste compréhensible à leur ouverture et à leur fermeture.
- La liste, les formulaires et le détail restent lisibles sur écran étroit sans défilement horizontal de la page.