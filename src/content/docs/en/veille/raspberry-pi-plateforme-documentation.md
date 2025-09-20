---
title: "The Raspberry Pi 3 as a documentation platform"
description: "With its modest resources, a Raspberry Pi 3 is all you need to create, manage and generate documentation in PDF, HTML or EPUB format."
---

Do you need an outpouring of power to generate professional documentation? With its single gigabyte of RAM and smartphone-like processor, the Raspberry Pi 3 seems to be positioned as a good office workstation from the 2000s... In practice, however, it turns out that a CPU costing around 40 euros is more than enough to create, manage and generate documentation in PDF, HTML or other formats.

:::note
The aims of this post are to :

- Present a <abbr title="Proof of Concept, demonstration of feasibility">POC</abbr> and use minimal resources to create, manage and publish professional documentation. Most operations therefore take place in text mode, under Linux. While the solutions presented here also work in graphical mode under Windows, they may not be available under Windows 10 IoT, intended for the Raspberry Pi 3.
- Presenting a user scenario that's as simple as possible, sometimes to the detriment of technical elegance.
:::

## Configure the Raspberry Pi 3

**Prerequisites

- 16 GB class 10 micro-SD card (preferred).
- Wired or Wi-Fi Internet connection.

1. Install the Raspbian Linux distribution on your Raspberry Pi 3 via NOOBS.
2. Select `Menu` ‣ `Preferences` ‣ `Raspberry Pi Configuration`.

   The `Raspberry Pi Configuration` dialog box appears.

3. Select the `Location` tab.
4. Click on `Set Locale`, select the following options, then click `OK` :

    | Option | Value |
    |---------------|-------------|
    | Language | fr (French) |
    | Country | <abbr title="France">FR</abbr> |
    | Character Set | UTF-8 |
    
    This table shows the default configuration settings for a French-speaking environment:
    - Language:** French
    - Country:** France
    - Encoding:** UTF-8, for optimum compatibility with special and accented characters.

5. Click on `Set Keyboard`, select the values corresponding to your keyboard, then click `OK`.
6. Click `OK` in the `Raspberry Pi Configuration` dialog box.
7. Select `Menu` ‣ `Accessories` ‣ `Terminal`.
8. Update the system:

   ``console
   $ sudo aptitude update && sudo aptitude safe-upgrade -y
   ```

   Time to read an episode of The Silver Surfer, and the system is updated.

9. Select `Menu` ‣ `Shutdown` ‣ `Reboot`.

   The Raspberry Pi 3 restarts.

## Install the software needed to manage this blog

1. Select `Menu` > `Accessories` > `LXTerminal`.
2. Install the following software packages:

   console
   $ sudo aptitude install -y calibre emacs gitk inkscape python3-sphinx texlive-full
   ```

   By the time I've read five or six episodes of The Amazing Spider-Man, the following software has been installed:

    | Software | Description |
    |----------------|---------------------------------------------------------------------------------------|
    | Calibre | Digital Book Manager.
    | Emacs Integrated Development Environment.
    | Gitk | Decentralized version control software history browser.
    | Inkscape Vector drawing software.
    | Python Sphinx | Documentation generator based on reStructuredText format.
    | Texlive | Complete LaTeX environment for PDF blog generation.

3. Free up disk space:

   console
   $ sudo aptitude clean
   ```

## Get the sources for this blog

1. Clone the Git repository of this blog's sources :

   console
   $ git clone https://github.com/olivier-carrere/redaction-technique.org.git
   ```

2. Go to the source directory of this blog:

   ``console
   cd redaction-technique.org
   ```

## Create and modify text

1. Modify a modular source file of this blog :
   - using a text editor :

     console
     $ leafpad *coin-du-geek.rst &
     ```

   - or using a :

     console
     $ emacs *coin-du-geek.rst &
     ```

   - or using an online editor, such as :

     console
     $ sed -i "s/directory/folder/g;" *.rst
     ```

## Create and modify schemas

1. Modify a source file of the images in this blog :
   - using vector graphics software :

     console
     $ inkscape graphics/modular-text-monolithic-binary.svg &
     ```

   - or with an online editor :

     console
     $ sed -i "s/docbook/XML/g;" graphics/*.svg
     ```

## Manage your documentation versions

1. Start your batch of modifications in Git :

   console
   $ git config --global user.email "your email" $ git config --global user.name "your name
   $ git config --global user.name "your name".
   $ git add *.rst
   $ git commit -m "My batch of text modifications
   $ git add graphics/*.svg
   $ git commit -m "My batch of image modifications" $ git add graphics/*.svg
   ```

2. View the modification history of this blog's sources:

   ``console
   $ gitk &
   ```

   O surprise, you're looking at a <abbr title="Graphical User Interface">GUI</abbr>! It's so beautiful, we're going to take a photo:

   ![](/assets/historique-git-redaction-technique.png)

   An atomic commit spanning a good fifteen files

:::note
- Your changes are purely local and are not applied to the remote GitHub repository.
- If your modifications bring real added value to this blog (typo correction, addition of information or other), don't hesitate to submit them to me in the form of a Git patch or via your GitHub account.
- GitHub is probably not hosted on a Raspberry Pi 3 cluster. However, there's nothing to stop you hosting a remote Git repository on a network-connected Raspberry Pi 3 and accessing it via a secure <abbr title="Secure Shell">SSH</abbr> connection.
:::

## Generate your documentation

1. Return to the terminal, then retrieve the latest tagged version of this blog:

   console
   $ git checkout $(git describe --tags $(git rev-list --tags --max-count=1))
   ```

   :::note
   Yes, I know, this command doesn't exactly correspond to the Larousse definition of simple...
   :::

2. Generate the latest tagged version of this blog in PDF, HTML and EPUB formats:

   console
   $ make all
   ```

3. Display the blog in PDF format:

   ```console
   $ xpdf _build/latex/redaction-techniqueorg.pdf &
   ```

4. Display the blog in HTML format:

   console
   $ epiphany _build/html/index.html &
   ```

5. Display the blog in EPUB format:

   ``console
   $ ebook-viewer _build/epub/redaction-techniqueorg.epub &
   ```

And there you have it. In just a few minutes, you have :

- Applied conditional text rules to common sources according to publication format. This content is called an e-book in the EPUB version, a document in the PDF version and something else in the HTML version.
- Generated, in three different formats, a 60-page documentation including some 40 diagrams.

:::note
- The `Makefile` is quite rough and the compilation time can easily be optimized.
- We could implement a complete conditional text solution with Boolean operators and all, thanks to the Jinja templating engine.
- Observers will notice that the HTML version of blog version 1.5 does not include a table of contents in the right-hand column. This is because this version does not include patch 1032292. I'll leave you to search in the Git history... or even create a branch and the cherry-picker!
:::

The Raspberry Pi 3 is therefore an entirely credible documentation platform... provided you do without, or almost without, a graphical interface!

The next test will be to generate the DITA XML version of this blog.

The next test will be to generate this blog on a smartphone by installing a Linux distribution on Android.
