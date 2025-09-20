---
title: "Git: from file to content"
description: "With Git, think content rather than files: it's simpler and avoids many difficulties."
---

:::note

Are you used to handling files? Git invites you to think differently. The advantage: you have much greater control over your content.
:::

What is a file? For you, a piece of content - image, text, spreadsheet or other - identified by a name. For your operating system, a sequence of bits on the hard disk with an associated file name and directory path. If you want to manage your project in terms of files in Git, you're in for a lot of trouble. If you think in terms of content, everything becomes much simpler.

If you give Git a file, it splits it directly into two things:

- a content (sequence of bits, or *blob*),
- a tree (link between filename and content).

It then stores it in one of two zones:

- the index (temporary area),
- the object database (persistent zone).

When you add a file (*git add \<fichier\>*) :

- the tree is placed in the index,
- the contents are placed in the object database.

When you *commit* a file:

- the tree is placed in the object base.

Git never compares two files with each other. It compares their summary, which is a single number calculated from their contents. If the summary of two files is identical, their contents are identical (to the nearest bit).

The history of your project is not necessarily linear: you can have it follow several parallel routes, or branches.

You can only create branches from a *commit*. Think of *commits* as traffic circles (the road being your project's history) from which you can, if you wish, take your project in a different direction.

If you create a branch, let's say *test*, while changes in your workspace are not *committed* in your *master* branch, the changes you make will apply to the non *committed* files in your workspace. If you make a mistake, you won't be able to restore the *status quo ante* of your files by returning to the *master* branch.

If you want to save your work as you go, so that you can return to a previous state at any time, you need to *commit* regularly and save your workspace, including the *.git* directory, for example *via* rsync. When you decide to share your work, you can move, merge or delete your *commits* before sending them as patches or depositing them on a central repository.


Git* branches make it easy to perform several unrelated tasks in parallel:

Let's imagine the following work scenario:

- You are asked to migrate a section from one document to another.
- You send your proposal for validation.
- Validation is slow in coming, and you have to move on to other parts of the documents.

How do you overcome this bottleneck? It's (relatively) simple:

1.  By default, you work on the *master* branch. Your workspace contains modifications that you don't want to *commit* before validation.
2.  Create a new branch: *git checkout -b ma-branch*.
3.  *Commit* your changes to the new branch: *git add my-files*, *git commit -m "my commit message "*.
4.  Return to the master branch *git checkout master* and move on to your second task. 5a. If your first task is not validated, you return to the provisional branch: *git checkout ma-branch* and make a new commit (which you can merge with the previous one(s) after validation).
5.  When you receive validation of the first task, you put your work in progress aside: *git stash*.
6.  Merge the provisional branch with the master branch: *git merge ma-branch*.
7.  Retrieve your work in progress: *git stash pop*.

If you don't need to run two batches of tasks in parallel, you can easily work in your local space. If you need to go back over your changes, call the *git reset --hard HEAD* command to overwrite your non *committed* files in the local directory with those from the last *commit*.

## Overcoming bottlenecks with branches

Git* branches make it easy to perform several unrelated tasks in parallel:

Let's imagine the following work scenario:

- You are asked to migrate a section from one document to another.
- You send your proposal for validation.
- Validation is slow in coming, and you have to move on to other parts of the documents.

How do you overcome this bottleneck? It's (relatively) simple:

1.  By default, you work on the *master* branch. Your workspace contains modifications that you don't want to *commit* before validation.
2.  Create a new branch: *git checkout -b ma-branch*.
3.  *Commit* your changes to the new branch: *git add my-files*, *git commit -m "my commit message "*.
4.  Return to the master branch *git checkout master* and move on to your second task. 5a. If your first task is not validated, you return to the provisional branch: *git checkout ma-branch* and make a new commit (which you can merge with the previous one(s) after validation).
5.  When you receive validation of the first task, you put your work in progress aside: *git stash*.
6.  Merge the provisional branch with the master branch: *git merge ma-branch*.
7.  Retrieve your work in progress: *git stash pop*.

If you don't need to run two batches of tasks in parallel, you can easily work in your local space. If you need to go back over your changes, call the *git reset --hard HEAD* command to overwrite your non *committed* files in the local directory with those from the last *commit*.

## Organizing your history with Git rebase

Git is confusing to get to grips with. Its *workflows* apply to content rather than files. As a result, group work and the management of different concurrent versions of the same content become much simpler.

Git performs atomic *commits*: it applies batches of modifications to content often spread over several files, instead of managing *files* themselves. It invites us to think in terms of batches of tasks on content, rather than per file.

This may not seem very intuitive if you're used to working file by file rather than task by task. But once you've adapted your work habits to this *workflow*, you'll see :

- you have a history that is much more easily exploited,
- it's much easier to manage concurrent versions of the same content in parallel development branches.

Let's say you've identified two major types of changes to be made to your content:

- command-line program synopses,
- grammatical corrections to text.

If your content is divided into a set of modular files, you could decide to make both types of changes in each file one by one, at the same time. To distribute the work among a group of technical editors, simply allocate a batch of files to each of them.

This *workflow* is not best suited to Git. If you're using this version control system, it's best to divide the work into two batches of tasks, called *synopsis* and *text*, applied concurrently to all files.

Production constraints will often force you to split these two batches into sub-batches, which you'll have to alternate between.

You *commit* each sub-batch each time it is completed. Your *commit* history will then resemble the following diagram:

![Git history](/assets/git-rebase-commits.svg)
**Git history**

When you place your *commits* on the central repository, some *commits* will represent an intermediate step in one of the tasks. Your history and branches will therefore be more difficult to exploit. Especially as unfinished tasks alternate. To retrieve a single one, you'll need to carefully select the *commits* using the *git cherry-pick* command.

Fortunately, Git makes it easy to reorganize your *commits* before sharing them. Issue the *git rebase -i HEAD\~5* command to reorganize your *commits*, from the current version to the previous five, for example.

:::caution[Warning]
The *rebase* command is potentially destructive; be sure to back up your workspace, including the *.git* directory, before running it, or risk losing data; you can also create a temporary backup branch.
:::

You can then rewrite history to offer your collaborators a *commit* for each completed task in its entirety, as shown in the following diagram:

![Git history](/assets/git-rebase-commits-2.svg)
**Git history**

The *commits* were first grouped by type on Git's *time arrow*, then merged.

:::note[Note]
If you've performed both tasks simultaneously on one or more files, don't panic: thanks to the *git add -p* command, you can distribute your nested modifications over the appropriate *commits*. When you run *git status*, you'll see that your files are both ready and not ready to be *committed*: there are two states of the files, each state representing a partial stage of your work and the sum of the two representing the totality of the modifications you've made.
:::

Obviously, you no longer have access to intermediate *commits*, but that's what you wanted: each unique *commit* represents a consistent state of your content.

This *workflow* also facilitates teamwork: you can assign these tasks to two different members of your team, each working in their own local space. The former's changes are then merged with those of the latter in his local space *via* *patches*. Finally, the *commits* are refactored before being placed in the central repository.

:::important[Important]
The less you reorganize your *commits* (especially chronologically), the lower the risk of having to manually correct conflicts. In other words, *git rebase* shouldn't be an excuse for not planning your work rationally.
:::
