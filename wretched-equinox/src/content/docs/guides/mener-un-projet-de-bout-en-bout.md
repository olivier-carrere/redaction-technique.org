---
title: Projet associatif - centralisation et gestion de photos
---

Il est rare, en milieu professionnel, de gérer un projet de bout en bout : conception, technique, communication… En association, c’est plus fréquent. C’est ainsi que j’ai mené un projet complet de gestion des photos pour une association internationale de plusieurs centaines de membres.

## Problème

Des milliers de photos étaient éparpillées sur des ordinateurs personnels, sans accès centralisé pour les personnes chargées de la communication.

## Objectifs

* Centraliser les photos
* Faciliter l’accès aux graphistes
* Rendre les contributeurs autonomes
* Travailler sans budget

## Étapes du projet

Bien sûr ! Voici ton contenu transformé en **liste à puces avec imbrication hiérarchique**, en respectant les niveaux d'information :

- Récupération et tri
  - 10 000 photos (~30 Go) collectées
  - Sauvegarde initiale
  - Détection des doublons avec `fdupes`
  - Extraction des fichiers cachés ou sans extension (`file`)
  - Tri automatique selon la taille (seuil : 1 Mo)
  - Sélection manuelle de ~500 photos pour l’impression

- Mise en ligne
  - Installation de la galerie *Piwigo* sur un hébergement personnel
  - Accès sécurisé
    - D’abord via `.htaccess`
    - Puis comptes utilisateurs
  - Propositions d’hébergements adaptés à l'association

- Indexation
  - Ajout manuel de mots-clés
    - Avec pictogrammes pour faciliter le multilingue
  - Objectif : recherche rapide et indexation qualitative

- Sauvegarde
  - Utilisation de *Git LFS* pour gérer les fichiers lourds
  - Hébergement du dépôt sur *GitLab*
  - Synchronisation avec le serveur via *LFTP*
  - Sauvegarde décentralisée
    - Consultation possible pour les membres

- Workflow
  - Trois rôles définis pour structurer la contribution :
    - **Photographe**
    - **Iconographe** (responsable du tri et de l’indexation)
    - **Graphiste**
  - Une bonne indexation conditionne l’utilité de la galerie

- Communication interne
  - Supports créés pour expliquer la démarche :
    - Vidéos tutoriels (FR/EN/ES) avec *SimpleScreenRecorder*
    - Dépliant papier multilingue réalisé en *LaTeX*
      - Structure réutilisable
      - Versions faciles à maintenir

- Suivi des modifications
  - Versionnage avec *Git*
  - Suivi des modifications visuelles dans les PDF
  - Travail collaboratif facilité

- Style et iconographie
  - Ton clair, accessible et multilingue
  - Iconographie décalée mais parlante
    - Photos anciennes, homogénéisées sous *Gimp*
  - Métaphores visuelles
    - Jardinage
    - Travail collectif

