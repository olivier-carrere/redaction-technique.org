---
title: Migration du site de Python Sphinx  vers Astro
---

Astro est un générateur de site statique moderne, et Starlight est son thème conçu pour la documentation technique.

Voici un aperçu du processus de migration de ce site de **Python Sphinx** (avec fichiers `.rst`) vers **Astro** (avec le thème **Starlight** et des fichiers Markdown) :

Installation du projet Astro avec le thème Starlight

```bash
npm create astro@latest -- --template starlight
```

> Cette commande initialise un projet Astro avec le thème Starlight préconfiguré (structure de navigation, pages de doc, recherche, etc.).

## Ma nouvelle section

Mon nouveau paragraphe
sur deux lignes dans le code source *markdown*.

![echiquier](https://github.com/user-attachments/assets/feeb14d8-0ec5-42c3-b76e-abe4182f93d2)


Mon nouvel autre **paragraphe**.

## Conversion des fichiers `.rst` vers `.md`

Les fichiers Sphinx sont écrits en **reStructuredText** (`.rst`). Astro/Starlight utilise **Markdown** (`.md`). J'ai utilisé **Pandoc** pour convertir automatiquement les fichiers :

```bash
for i in ../*.rst; do pandoc "$i" -o "$(basename "$i" .rst).md"; done
```

> Cette commande parcourt tous les fichiers `.rst` du dossier parent et les convertit en `.md` dans le répertoire courant.

## Nettoyage post-conversion

La conversion automatique n’est pas parfaite, mais la commande `sed` a permis d'effectuer des modifications sur tous les fichiers en une seule opération, par exemple :

```bash
# Suppression de directives Sphinx inutiles
sed -i '/.. note::/d' *.md
sed -i 's/:ref:`\([^`]*\)`/[\1](#)/g' *.md   # Remplace les références Sphinx par des liens Markdown

# Suppression des titres soulignés (format reST)
sed -i '/^[-=~^#*]\+$/d' *.md
```

## Nettoyage manuel

Comme le volume à migrer est relativement faible, j'ai également fait les modifications manuelles suivantes :

* Vérifier les titres, sections, listes et tableaux.
* Réécrire les blocs de code avec des balises Markdown (\`\`\`).
* Corriger les liens, images, encadrés (`note`, `warning`, etc.).
* Recréer les tableaux par IA

## Intégration dans Astro/Starlight

Une fois les fichiers `.md` prêts, la dernière étape a consisté à :

1. Placer les fichiers dans `src/content/docs/`.
2. Modifier `src/content/config.ts` pour configurer la navigation.
3. Lancer le serveur de développement :

	```bash
	npm install
	npm run dev
	```

## Tout effacer

Je me suis alors rendu compte que je n'étais plus satisfait du contenu, qui ne reflétait pas l'état de l'art en matière de rédaction technique, et j'ai décidé de faire un `git rm` de tout le site et de recommencer une toute nouvelle version à partir de zéro.

Autre raison pour cette refonte majeure : tirer parti de l'excellent support multilingue offert par le thème [Starlight](https://starlight.astro.build/guides/i18n/). Il fallait donc proposer une version en deux langues minimum de chaque page. L'idée de traduire un contenu obsolète n'était pas particulièrement séduisante. Utiliser l'environnement de développement LangChain pour une traduction basée sur l'IA représentait un défi intéressant, mais aurait conduit à une qualité en en deçà de ce que je souhaitais publier.
