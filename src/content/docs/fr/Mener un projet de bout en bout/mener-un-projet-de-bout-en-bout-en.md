---
title: "Managing a project from start to finish".
description: "It's quite rare, in a professional context, to be able to manage a project from (almost) A to Z, from conception to realization and communication.
---

It's quite rare, in a professional context, to be able to manage a project from (almost) A to Z, from conception to communication, via realization. In other words, to manage the human and organizational aspects as well as the technical ones, and all the communication: graphic design, copywriting, and even video. This is more often possible in an associative context.

## Photo management for an association

An association of a few hundred people from different countries had several thousand photos, scattered over different personal computers.

Members of the association responsible for *print* and *web* communication complained that they didn't have access to them.

The association collected in bulk the photos taken by its members at its various events. So there was a wide variety of subjects and formats.

I was tasked with centralizing the photos and facilitating access for the graphic designers. It's true that I'd already taken photos, created posters and set up a discussion forum for the association. So I had a pretty good idea of the tasks involved. The budget allocated was strictly 0.00 euros.

![](/assets/pile-photos.jpg)

One of the goals I set myself was to give users as much autonomy as possible. In particular, I wanted photographers to upload photos themselves rather than sending them to me. As the old saying goes: the fewer the links in a chain, the stronger the chain...

So I :

- collected and sorted the photos;
- set up an online photo gallery;
- set up a backup system;
- defined a photo management workflow;
- created video tutorials;
- created a multilingual leaflet to explain the solution.

Here's the overall solution diagram:

![](/assets/schema-galerie.svg)

Everything was created under *Linux*.

## Retrieving and sorting photos

After collecting as many photos as possible, I ended up with over 10,000 photos and 30 GB of data. Phew.

Before any automatic operation, I started by making an identical backup copy of all the photos on an external hard drive.

My first task was to identify and eliminate duplicates using the fdupes command.

I also had to avoid missing any pearls and look for interesting needles in this haystack. Some photos, in particular, were hidden in zipped directories. Others had no extension, and the file command came in very handy.

As my main aim was to make photos available for printed media, I made an initial automated sort according to file size: files smaller than 1 MB could be put aside without a hitch.

As the files were spread over a multitude of sub-directories, I used the following command in Bash :

![](/assets/find-command.svg)

Next, I consulted the 3,000 or so photos over 1 MB in size using the *gThumb* viewer, and deleted any photos whose quality or subject matter were unsuitable for a communication medium. This took about 3 hours. I retained around 500 photos.

By comparing the original list of photos with the list of files larger than 1 MB retained, I then copied the eliminated files larger than 1 MB into another directory from the backup copy, to make them available for use on Instagram, for example.

## Centralized photo gallery in the *cloud*.

With the association's members geographically dispersed, it was essential to offer centralized hosting in the *cloud*.

I had an unused domain name and enough free disk space and databases on my own hosting.

So I installed an instance of Piwigo, software I already knew (I use it for family photos).

Photo Kevin Harber](/assets/galerie-photo.jpg)

I protected access to the gallery initially with a common `.htaccess` file for all users, then by creating personal accounts under the gallery.

Hosting on my personal space can last a few months without problems. However, it would be healthier if the association owned both the hosting and the domain name.

A quick study (in September 2018) led me to propose the following solutions:

  ------------------------------------------------------------------------------------------------------------------------------
                   piwigo.com Obambu Performance Obambu Evolution
  ---------------- --------------------------------------- ---------------------------------------------- ----------------------
  Annual price €39 €23 €15

  Unlimited storage 250 GB 100 GB

  Backup Managed by l\'hébergeur.                 Managed by the association.                      

  Advantage Less effort for the association.   All files are available to the association.   
  ------------------------------------------------------------------------------------------------------------------------------

## Photo indexing

Once the 500 photos selected for the print projects had been uploaded to the site, they had to be indexed.

I therefore created a hundred or so keywords to best describe each photo. As it's not possible to define multilingual keywords in *Piwigo*, I accompanied each keyword with a pictogram wherever possible.

For example, Vélo `fa-bicycle`, Intérieur `fa-lightbulb`, etc.

## Incremental and decentralized backup

How do you back up the association's photo assets, i.e. photos and the Piwigo database, in an incremental and decentralized way? I turned to Git with the LFS extension, which elegantly handles binary files.

I first made a copy of the Piwigo server directory on a local disk, then initialized an LFS Git repository. I then cloned this repository on Gitlab.

This way, any member of the association can create a Gitlab account and, after receiving the password, clone the backup copy.

:::note[Cloning the Gitlab repository]
*The following procedure was included in an early version of the LaTeX brochure. It is therefore minimalist, if only for reasons of available space on the printed version. I subsequently removed it from the leaflet, as it was likely to frighten off its predominantly technophobic readership.
:::

Under Windows, you can install Git for windows and GitHub Desktop.

To clone the Gitlab repository under a Linux Debian or derivative distribution (including Ubuntu) :

1.  Request a Gitlab invitation.

2.  Install the following software:

    console
    $ sudo apt install git git-lfs
    ```

3.  Clone the :

    console
    $ git clone https://gitlab.com/depot/communication.git
    ```

    The initial cloning process downloads more than 20 GB and can take several hours.

To update your Gitlab repository :

1.  Go to the :

    console
    $ cd communication
    ```

2.  Update the repository and delete obsolete local files:

    console
    $ git pull --rebase
    $ git lfs prune
    ```

    This operation should be considerably faster than the initial cloning.

For synchronization between the server and my local copy, I turned to LFTP :

console
$ lftp ftp://user:password@ftpaccount -e \
  "set ftp:ssl-allow no; mirror -e remote-directory \
  repertoire-local; quit"
```

:::note
To ignore the differences in file permissions, I first ran the following command on my local repository:

console
$ git config core.filemode false
```
:::

Photo hosting is centralized, backup decentralized.

## Definition of a photo management workflow

A technical solution is never sufficient on its own. I therefore defined a workflow into which the solution would fit.

## Definition of roles for members of the photo workflow

The graphic production chain is based on 3 roles:

- photographer ;
- iconographer ;
- graphic designer.

Obviously, the same person can take it in turns to take on the different roles, but it's important for teamwork that these roles are not mixed.

While the first two are familiar to association members, the iconographer's role is new to many. I began by asking myself whether I should use this little-used word. I concluded that I should: in fact, I had to insist on it, as it's the key to the long-term success of the project.

![](/assets/workflow-photo-piwigo.svg)

Indeed, the association has lived for years without a photo gallery and will be able to continue to do so, even if not optimally. Members will continue to take photos and create posters. On the other hand, the purpose of the gallery is to centralize as many photos as possible and to provide rapid access to them. It will only be used if its indexing is of high quality.

## Internal communication

With the tools and processes in place, all that remained was to get the stakeholders on board!

I opted for the following communication tools:

- explanatory online videos;
- a leaflet to be distributed at the association's various events.

## Video tutorials

I've posted a number of tutorials on *YouTube*, in French, English and Spanish, on how to use the gallery with different types of users.

I used SimpleScreenRecorder for this. A first attempt with my laptop's built-in microphone proved unconvincing, so I recorded my voice with a good-quality microphone, namely a *Bird UM1*. Pressed for time, and because these tutorials are aimed at a restricted (and indulgent) audience, I didn't edit them, as I might have done with *Kdenlive*.

## Paper support

I created a leaflet explaining :

- how to connect to the gallery;
- the different types of users of the tool (with emphasis on the little-known but crucial role of iconographers);
- how each type of user uses the gallery;
- the workflow into which users fit.

:::note[LaTeX flyer template]
The LaTeX template for the flyer, the tip of the iceberg, is published on *Overleaf*.

Oddly enough, the PDF generated on *Overleaf* has flaws that I don't notice when I publish it locally.

![](/assets/leaflet-pliage.png)

For the curious, there are 6 ways to fold this brochure. I've saved myself some tedious experimentation by using the LaTeX leaflet document class.
:::

## LaTeX

Why did you choose LaTeX to create the *print* and not a conventional DTP program? I wanted to be able to rework the text without having to redo the layout each time. Similarly, I wanted to be able to translate the brochure without doing any manual DTP work.

Here's an example of LaTeX code:

tex
\section{faTag Iconographs}

\vspace*{\fill}

\begin{enumerate}[itemsep=0mm,leftmargin=*]

   \item Contact us to join our team of iconographers.
   \item Display a photo from the album \emph{Community}.
   \item Click on \faPencil \textbf{Keywords}.
   \Add keywords to photos:

     \begin{itemize}
       \item Indicate \emph{Print} if the photo is suitable for printing, \emph{Web}
         if not.
       \item To delete the photo, enter \emph{Delete}.  It will be
         deleted laterfootnote}.
     \end{itemize}

\end{enumerate}

\begin{center}
  \setlength{\fboxsep}{0pt}%
  \setlength{\fboxrule}{0pt}%
  \fbox{includegraphics[angle=5,width=linewidth]{iconographes}}%
\end{center}
```

The PDF rendering is shown below. Note the automatic hyphenation calculation (the subject of a doctoral thesis). It's one of the many advantages of LaTeX...

![](/assets/latex-rendu.png)

:::note
If you're a *WYSIWYG* enthusiast, you'll want to check out Gummi. It's *What you see is what you get* in the strictest sense (and more like *such a screen, such a print* than *such a screen, such a write*). You can't change the text in the viewer window, only in the LaTeX code window. So you know exactly what's going on "under the hood" and have greater control than by delegating the creation of layout code to a graphical interface. If you often work with numbered lists and have had to deal with, shall we say... random numbering, you'll understand the advantage straight away.

![](/assets/latex-wysiwyg-gummi.png)
:::

On the other hand, once the flyer structure has been created, it's easy to use it to quickly produce other documents. What's more, the document can be reworked by others without any licensing or software platform problems.

## Track changes with Git

Tracking changes, whether in Overleaf or Git, is an effective way of preventing errors: it's easy to visualize changes in content or form between two versions, to go back to a previous version at any time, to maintain several versions in parallel, etc.

Visualization of background changes under GitHub](/assets/latex-historique-fond-github.png)
**Viewing background changes in GitHub** [/assets/latex-historique-fond-github.png

View form modifications in GitHub](/assets/latex-history-form-github.png)
**View form modifications in GitHub**!

Here's the evolution of an extract from the compiled PDF:

![](/assets/latex-diff-pdf.png)

You can even work together on the same project, either synchronously or asynchronously.

## Editorial style

Since this was an internal communications project, I was able to adopt a relaxed editorial style. However, I was careful not to push the humorous aspect too far. The aim was above all to be understood, in all 3 languages (French, English and Spanish).

## Iconography

The choice of iconography proved to be a very interesting stylistic exercise.

First of all, it was a question of putting into practice the principles I had put forward in the text of the brochure.

I wanted to convey the following messages through my choice of iconography:

| Message | Description |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| I discovered that I hadn't invented anything, and that the concept of "weeding" was familiar to iconographers.
| A group effort | Participation in graphic production is a group effort, not one of isolated individuals. |

    After an initial selection of images, each representing a single person, I moved on to group photos.

After several trials, I decided to use old photos, either royalty-free or licensed under Creative Commons. Using *Gimp*, I lightly processed the colors to give them a more homogenous look.

And because the idea is to have fun with these tasks, I played with the quirky side, even if it meant occasionally going back on certain choices whose humor was too obscure... The following photo, for example, seemed to make only me laugh, and did little to enhance understanding of the *Tutorials* section:

![](/assets/Frances_Densmore_recording_Mountain_Chief2.jpg)

## Patience...

Of course, since every structure is more or less resistant to change, things won't go as I imagine. In particular, the team of iconographers I'm hoping and praying for is unlikely to materialize, and I may be the only one indexing the photos under the gallery.

But I don't think I'm aiming too high. If half of all photographers and graphic designers already use the gallery to download their photos, I'll consider the project a success.

But to tell the truth, it's already a success for me, judging by the satisfaction I feel at having brought it to fruition...
