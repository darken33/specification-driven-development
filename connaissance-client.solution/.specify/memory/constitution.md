<!--
Sync Impact Report
Version: constitution absente (squelette uniquement) -> 1.0.0
Principes ajoutés: I. Architecture centrée sur le domaine; II. Contrats d'API et
	d'événements comme sources de vérité; III. Invariants métier et protection des données;
	IV. Tests des comportements et frontières; V. Résilience et observabilité des intégrations
Sections ajoutées: Contraintes techniques et de sécurité; Workflow de développement
Sections supprimées: Aucune; les emplacements et commentaires d'exemple du scaffold sont remplacés
TODO: confirmer la date de ratification après validation humaine
-->
# Connaissance Client Constitution

## Core Principles

### I. Architecture centrée sur le domaine
Les règles métier et les modèles du domaine MUST rester dans `connaissance-client-domain`.
Les ports y expriment les besoins du domaine; les adaptateurs implémentent ces ports pour
MongoDB, les services HTTP et la messagerie. `connaissance-client-app` assemble ces modules.
Le domaine MUST NOT dépendre directement d'un adaptateur concret. Toute dépendance de
framework ajoutée au domaine MUST être justifiée par un besoin métier ou technique explicite.
Cette direction de dépendance préserve la testabilité et permet de remplacer les systèmes
externes sans déplacer les règles métier.

### II. Contrats d'API et d'événements comme sources de vérité
Les contrats OpenAPI et AsyncAPI MUST être la source de vérité des interfaces REST et des
événements. Le code généré MUST NOT être modifié à la main; les changements se font dans le
contrat et par régénération. Tout changement de contrat MUST préciser son impact de
compatibilité et être couvert par des tests adaptés. Les consommateurs et producteurs
concernés MUST être pris en compte avant une évolution incompatible.

### III. Invariants métier et protection des données
Les entrées MUST être validées à la frontière de l'API et les invariants MUST être garantis
par le domaine, indépendamment du transport. Les données personnelles MUST être traitées
selon le moindre privilège: les accès, l'authentification et l'autorisation doivent être
explicites dans chaque environnement; les secrets MUST être fournis par configuration
sécurisée et non conservés dans le dépôt. Les journaux MUST exclure les données personnelles
et les secrets. Toute exposition d'endpoint de gestion ou configuration CORS permissive MUST
faire l'objet d'une justification et d'une revue de sécurité.

### IV. Tests des comportements et frontières
Les règles métier MUST être couvertes par des tests unitaires. Les conversions, contrats
externes et comportements d'intégration MUST être vérifiés au niveau de la frontière
concernée, avec des tests d'intégration lorsque le comportement réel du framework ou d'un
système externe est déterminant. Les tests MUST vérifier les résultats et les cas d'échec
pertinents. Avant livraison, `./mvnw verify` MUST réussir; les tests d'intégration suivent
la convention `*IT.java` et sont exécutés par Maven Failsafe.

### V. Résilience et observabilité des intégrations
Chaque intégration réseau ou asynchrone MUST définir et tester son comportement en cas de
délai dépassé, d'indisponibilité ou de réponse invalide. Les délais, reprises, coupe-circuits
et replis MUST être adaptés au contrat métier; un repli ne doit pas transformer un échec en
succès silencieux. Les changements de publication d'événements MUST tenir compte de leur
contrat et du comportement en cas d'échec. Les opérations MUST être diagnostiquables par des
journaux exploitables et corrélables; les métriques et endpoints de santé exposés MUST être
configurés et protégés selon l'environnement.

## Contraintes techniques et de sécurité

Le projet cible Java 21 et Spring Boot 4 dans un monorepo Maven multi-module. Le wrapper
`./mvnw` MUST être utilisé pour les builds reproductibles. Les versions et plugins communs
MUST être gérés dans le POM parent; toute nouvelle dépendance doit être nécessaire, maintenue
et compatible avec la stack. Les modules existants séparent domaine, adaptateurs de
persistance, d'intégration externe et d'événements, contrat API et application: toute
évolution MUST respecter cette séparation ou justifier explicitement une modification
d'architecture.

Les configurations propres à un environnement MUST rester externalisables. Les
configurations de production MUST appliquer l'authentification et l'autorisation attendues,
limiter les origines CORS et protéger les endpoints de gestion. Les changements touchant aux
données personnelles, aux contrôles d'accès, aux dépendances ou aux contrats MUST inclure une
revue de leurs risques de sécurité et de confidentialité.

## Workflow de développement

Chaque changement MUST préciser le comportement attendu et les critères d'acceptation. Les
modifications de contrat commencent par la mise à jour du fichier OpenAPI ou AsyncAPI source;
les modifications de code généré se font uniquement via les générateurs Maven configurés.
Les tests pertinents MUST être ajoutés ou adaptés dans le module propriétaire du comportement.
La revue de code MUST vérifier les principes de cette constitution, la compatibilité des
contrats, les tests et les configurations de sécurité applicables. Une livraison n'est prête
que si le build et les tests obligatoires passent et si les écarts connus sont documentés.

## Governance

Cette constitution guide les décisions d'architecture et de développement du projet. Toute
dérogation MUST être motivée dans le changement concerné et approuvée lors de sa revue. Toute
modification de la constitution MUST être proposée et validée par le mainteneur du projet
avant adoption; les changements impliquant une migration MUST documenter celle-ci.

La version suit SemVer: MAJOR pour une modification incompatible des principes, MINOR pour
l'ajout ou l'évolution substantielle d'un principe, PATCH pour une clarification sans
changement de gouvernance. Les revues de changements et de conception MUST vérifier la
conformité aux principes et faire remonter les violations ou dérogations. Cette constitution
est la référence gouvernante; les guides opérationnels peuvent préciser son application mais
ne peuvent pas la contredire.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): date à confirmer lors de la validation | **Last Amended**: 2026-10-28
