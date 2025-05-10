---
title: Migrate content from Python Sphinx to Astro
---

Astro is a modern static site generator, and Starlight is its theme for technical documentation.

Here's an overview of the process of migrating this site from **Python Sphinx** (with `.rst` files) to **Astro** (with the **Starlight** theme and Markdown files):

Install Astro with the Starlight theme:

```bash
npm create astro@latest -- --template starlight
```

> This command initializes an Astro project with the preconfigured Starlight theme (navigation structure, doc pages, search, etc.).

## Convert `.rst` files to `.md` files

Sphinx files are in **reStructuredText** (`.rst`) markup. Astro/Starlight uses **Markdown** (`.md`). I used **Pandoc** to convert it to Markdown automatically:

```bash
for i in ../*.rst; do pandoc “$i” -o “$(basename ‘$i’ .rst).md”; done
```

> This command browses all `.rst` files in the parent folder and converts them to `.md` in the current directory.

## Post-conversion cleanup

Automatic conversion isn't perfect, but the `sed` command made it possible to make changes to all files in a single operation, e.g.:

```bash
# Removal of unnecessary Sphinx directives
sed -i '/.. note::/d' *.md
sed -i 's/:ref:`\([^`]*\)`/[\1](#)/g' *.md # Replaces Sphinx references with Markdown links

# Deleting underlined titles (reST format)
sed -i '/^[-=~^#*]\+$/d' *.md
```

## Manual cleanup

As the volume to be migrated is relatively small, I also made the following manual modifications:

* Check titles, sections, lists, and tables.
* Rewrite code blocks with Markdown tags.
* Fix links, images, and admonitions (`note`, `warning`, etc.).
* Recreate tables using AI

## Integration with Astro/Starlight

Once the `.md` files were ready, the final step was to:

1. Place the files in `src/content/docs/`.
2. Modify `src/content/config.ts` to configure navigation.
3. Launch the development server:

	```bash
	npm install
	npm run dev
	```

## Get rid of everything

I then realized I was no longer happy with the content, that didn't reflect state-the-art technical writing practices, and just decided to `git rm` everything and start a brand new version from scratch.
