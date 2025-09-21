---
title: "Shared network directories - unsuitable for group work"
description: "Files shared by a technical writing team are often stored in a shared directory on the network."
---

Files shared by a **technical writing** team are often stored in a shared directory on the network.

Technical writers work directly on shared files, which poses the following problems:

- risk of data loss in the event of network failure,
- limited possibilities for off-line working,
- locking of files by the team members who opened them.

Even when frequently backed up, directories are not a secure repository for data: the granulometry of the backup is the directory, and its frequency is often only daily. In the event of data loss, restoration is done directory by directory, not file by file, and involves versions whose age depends on the system administrator, not the **technical writer**. Digging through archives is a tedious operation which can itself be a source of errors: in the absence of a reliable and easy comparison between several versions of files, the **technical writer** can easily delete modifications he would have liked to keep when trying to restore others.

Copying a file from the network to modify it on a personal hard disk, then overwriting the network version with the local version, is a most perilous operation:

- team members are not informed whether or not another member is modifying the same file at the same time as they are; one of the technical writers will then have to give up all his modifications;
- when manually copying files, whether *via* a graphical file manager or from the command line, the **technical writer** can easily overwrite the most recent version with the oldest (this is best done with a file synchronization program such as rsync or Unison (the latter being better suited to bidirectional synchronization) from the command line under GNU/Linux or Windows, or a graphical equivalent such as SyncToy. However, this type of software is based on the last modification date of the files. When updating or publishing a **FrameMaker** book, in particular, this can create conflicts between files, as **FrameMaker** saves all the files in the book, even if their content has not been modified.)
