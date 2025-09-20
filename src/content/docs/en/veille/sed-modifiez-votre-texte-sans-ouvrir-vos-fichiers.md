---
title: "sed: modify your text without opening your files"
description: "Unix clones are rarely used to manage technical documentation."
---


Unix clones are rarely used to manage technical documentation. This is strange when you consider the plethora of tools available on these platforms for manipulating text in all directions.

Take, for example, the dialogue between M. Jourdain and his philosophy master in Molière's Bourgeois gentilhomme:

*MONSIEUR JOURDAIN :*

:   *[...] So I'd like to put in a bill to her: "Belle marquise, vos beaux yeux me font mourir d'amour"; but I'd like it to be put in a gallant way, to be turned around nicely.

[...]

*PHILOSOPHY TEACHER:*

:   *We can put them first as you said: Belle marquise, vos beaux yeux me font mourir d'amour. Or: D'amour mourir me font, belle marquise, vos beaux yeux. Or: Vos yeux beaux d'amour me font, belle marquise, mourir. Or: Mourir vos beaux yeux, belle marquise, d'amour me font. Or: Me font vos yeux beaux mourir, belle marquise, d'amour.*

Let's start by displaying the original sentence in a terminal:

```bash
echo "Belle marquise, vos beaux \
eyes make me die of love."
Beautiful marquise, your beautiful eyes make me die of love.
```

Now we need to swap the words in the sentence to create a new one. For a simple transposition, you might find it easier to use awk. awk doesn't deal with lines, but with the fields of a record (of a line), delimited by spaces by default. In other words, awk treats text like a database. It can easily display the whole line, or just one or more fields, in any desired order. Fields are indicated in the form $n, where n indicates the position of the field in the line, starting from the left. So $1 indicates the first field, $2 the last, etc. $0 corresponds to the whole line.

So we're going to give Mr. Jourdain's declaration of love as input to a one-line awk program, thanks to the pipeline redirection symbol (|).

```bash
echo "Belle marquise, your beautiful eyes
eyes make me die of love." |
awk '{print $9" "$8" "$6" "$7" "$1" "$2" "$3" "$4" "$5}'
d'amour. mourir me Belle marquise, vos beaux yeux
```

The output of the echo command is not displayed. What is displayed is the output of the awk program, of which the output of the echo command, Mr Jourdain's declaration of love, was the input.

However, the final output is not what was intended. The fields do not correspond exactly to words. The awk command therefore needs to be refined.

It's simpler to turn to sed. sed selects sets of characters in lines, either quoted literally or via metacharacters in regular expressions. A well-known regular expression metacharacter is the *, indicating zero or an indefinite number of characters on the command line, as in :

```bash
$ ls *.rst
```

sed also supports back references, which display the value corresponding to a previously found literal or rational expression at the desired location. Fortunately for us, Mr Jourdain's declaration of love contains exactly nine words, which is the maximum number of back references possible.

```bash
$ echo "Belle marquise, vos beaux \
eyes make me die of love." |
sed "s#\(.*\) \(.*\), \(.*\) \(.*\) \(.*\) \(.*\) \\\
\(.*\)\(d'.*\)#\9 \8 \6 \7, \1 \2, \3 \4 \5#"
d'amour. mourir me font, Belle marquise, vos beaux yeux
```

We've run into the same problem: the regular expression .* doesn't correspond to a word, but to a series of characters, including punctuation. We must then use the <.*> form, which corresponds to a word such as those used by Mr. Jourdain to make prose. We're going to use escape characters (backslash \) so that the < and > signs are not interpreted literally under certain consoles, but as metacharacters with a special function:

```bash
$ export \
p="\(\<.*\>\) \(\<.*\>\), \(\<.*\>\) \(\<.*\>\) \\
\(\<.*\>\) \(\<.*\>\) \(\<.*\>\) \(\<.*\>\) \(d'\<.*\>\)"
$ echo "Belle marquise, your beautiful
eyes make me die of love." |
sed "s#$p#\9 \8 \6 \7, \1 \2, \3 \4 \5#"
d'amour mourir me font, Belle marquise, vos beaux yeux.
```

We could also use the [[:alpha:]]* form, which is more legible but less concise:

```bash
$ export a="[[:alpha:]]"
$ export n="\($a*\) \($a*\), \($a*\) \($a*\) \($a*\) \($a*\) \".
\($a*\) \($a*\) \($a*\)"
$ echo "Belle marquise, your beautiful
eyes make me die of love." |
sed "s#$n#\9 \8 \6 \7, \1 \2, \3 \4 \5#"
d'amour mourir me font, Belle marquise, vos beaux yeux.
```

That's better, but we've got a capitalization problem. So we're going to use the judiciously placed /u and /l operators. First, we'll export some variables to make the script more concise and readable:

```bash
$ export w="\(\<.*\>)"
$ export m="$w $w, $w $w $w $w $w $w"
```

```bash
$ echo "Belle marquise, vos beaux \\
eyes make me die of love." |
sed "s#$m \(d'\<.*\>)#\u\9 \8 \6 \7, \l\1 \2, \3 \4 \5#"
D'amour mourir me font, belle marquise, vos beaux yeux.
```

We can now easily redistribute the back references to get all the variations of the philosophy master:

```bash
$ echo "Belle marquise, vos beaux \
eyes make me die of love." |
sed "s#$m \u\3 \5 \4 \6 \7, \l\1 \2, \8#"
Your beautiful eyes of love make me, beautiful marquise, die.
```

```bash
$ echo "Belle marquise, vos beaux \\\
eyes make me die of love." |
sed "s#$m \(d'\<.*\>)# \u\8 \3 \4 \5, \l\1 \2, \9 \6 \7#"
Mourir vos beaux yeux, belle marquise, d'amour me font.
```

```bash
$ echo "Belle marquise, vos beaux
eyes make me die of love." |
sed "s#$m \(d'\<.*\>)#\u\6 \7 \3 \5 \4 \8, \l\1 \2, \9#"
Me font vos yeux beaux mourir, belle marquise, d'amour.
```

## Molière and GNU/Linux

Let's rewrite the dialogue between M. Jourdain and his philosophy master in geek style:

MONSIEUR JOURDAIN:

I'd like to show him on the standard output:

```bash
$ Belle marquise, your beautiful eyes make me die of love.
```

But I wish it were put in a gallant way, that it were turned nicely.

PHILOSOPHY MASTER:

: They can be put first as you said:

```bash
$ echo "Belle marquise, your beautiful \\
eyes make me die of love."
```

Or :

```bash
$ export declaration="Beautiful marquise, your \
beautiful eyes make me die of love."
$ echo $declaration
```

Or :

```bash
$ export w="\(\<.*\>)"
$ export m="$w $w, $w $w $w $w $w $w"
$ echo $declaration |
sed "s#$m \(d'\<.*\>)#\u\9 \8 \6 \7, \l\1 \2, \3 \4 \5#"
```

Or else:

```bash
echo $declaration |
sed "s#$m \(d'\<.*\>)#\u\3 \5 \4 \9 \6 \7, \l\1 \2, \8#"
    ```

Or else:

```bash
echo $declaration |
sed "s#$m \(d'\<.*\>)#\u\8 \3 \4 \5, \l\1 \2, \9 \6 \7#"
```

Or else:

```bash
echo $declaration |
sed "s#$m \(d'\<.*\>)#\u\6 \7 \3 \5 \4 \8, \l\1 \2, \9#"
    ```

## A lot of effort...

Admittedly, a lot of effort for not very much, you might say. But imagine a file containing 1000 sentences of the same structure:

Dear doctor, these great misfortunes make you weep with bitterness. Little boy, this good ice cream makes you salivate with envy. Vast ocean, the strong swell makes you pitch with drunkenness.

This is unlikely to be the case here, but it is commonplace in technical documentation to find sentences with the same structure, for reasons of stylistic homogeneity.

To carry out our tests on a sample, let's place the three sentences above in a :

```bash
echo "Dear doctor, these great misfortunes
make you weep with bitterness." > variations.txt

$ echo "Petit garçon, cette bonne glace te \\
makes you salivate with envy." >> variations.txt

$ echo "Vaste océan, la forte houle te \\
makes you sway with intoxication." >> variations.txt
```

Let's place the various sed commands in a different script each:

```bash
$ echo "s#$p#\u\9 \8 \6 \7, \l\1 \2, \3 \4 \5#" > moliere1.sed
$ echo "s#$p#\u\3 \5 \4 \9 \6 \7, \l\1 \2, \8#" > moliere2.sed
$ echo "s#$p#\u\8 \3 \4 \5, \l\1 \2, \9 \6 \7#" > moliere3.sed
$ echo "s#$p#\u\6 \7 \3 \5 \4 \8, \l\1 \2, \9#" > moliere4.sed
```

Now let's loop through all the sed scripts on all the lines in the :

```bash
$ for (( i=1; i<5; i++ )); do
   while read s;
    do echo "$s" |
     sed -f moliere$i.sed ;
    done < variations.txt
   done
From bitterness weep you make, dear doctor, these great misfortunes.
D'envie saliver te fais, petit garçon, cette bonne glace.
D'ivresse tanguer te fait, vaste océan, la forte houle.
These great misfortunes of bitterness make you, dear doctor, weep.
This good ice cream of envy makes you, little boy, salivate.
The strong swell of drunkenness makes you, vast ocean, pitch.
Cry these great misfortunes, dear doctor, of bitterness make you.
Salivate this good ice cream, little boy, of envy make you.
Pitch the heavy swell, vast ocean, of drunkenness do you.
Make you these woes great weep, dear doctor, of bitterness.
Make you salivate, little boy, with envy.
Make you the strong swell pitch, vast ocean, of drunkenness.
```

And there it is. In just a few moments, without ever opening a single file, we apply a series of complex operations to an indefinite number of sentences of the same structure. This is not possible with a word processor or any other tool with a graphical interface, or with binary files.
