---
title: "Which repository for group work?"
description: "To work on a file, the technical writer uses a program that reads the file from his hard disk and loads a copy into RAM."
---


The most frequently used repository for storing computer files is the folder, or directory. While this repository is perfectly suited to the management of files by a single user on his local hard disk, it quickly shows its limitations for group work.

To work on a file, the **technical editor** uses a program that reads the file from his hard disk and loads a copy into RAM. Modifications are made on this copy. When the **technical editor** saves his modifications, the program overwrites the previous version of the file on the hard disk. The previous version is therefore permanently deleted, unless the program has created a backup copy or the **technical editor** has used the *Save As* function, not *Save*, to create a new version of the file. In the first case, there are only two versions of the file at any given time: version n and version n-1. In the second case, the **technical editor** can create as many versions as he likes, for example by adding the suffix -1, -2, etc. to the file name.

However, the programs do not support concurrent modification of the same file by several technical editors. In the case of a file available on a network drive, let's imagine that Arsène and Louise open the same version of this file in a text editor. They each make different modifications to the copy loaded in RAM, then save their work. Arsène saves his changes first, then Louise. The next time the file is opened, only Louise's changes will appear in the file.

To avoid this, many programs lock open files. This means they are only available for reading as long as the user modifying them has a copy in RAM (i.e., as long as he/she hasn't closed it). It is therefore not possible with this system to work with several users on the same file, and make cross-file modifications in batches, such as changing the path of all images.

If the program used does not lock open files, constant coordination is required between team members.
