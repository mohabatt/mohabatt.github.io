---
title: My organizational workflow (org-roam x notion)
categories: [misc]
usemathjax: true
related: true
---

How does a grad student keep track of all the math they read, hear, or write? I ran into this question very early on in graduate school, and since then I was searching for an *ideal system* for the way I do math: writing and drawing things out. As an undergrad, I kept detailed paper notebooks for each of my classes and tabbed sections so that I could hop back and forth between notes. As a graduate student attending multiple courses and seminars over the years, this quickly became infeasible.

Even though I moved away from paper notebooks, I still wanted to keep all of my notes consolidated in one place. I used to record all of my notes digitally on my iPad as [Notability](https://notability.com)/[GoodNotes](https://www.goodnotes.com) pdf files but that became unmanageable when the number of notes topped 100. Although the handwritten digital notes are searchable, I needed something that showed me an overview of all the topics and ideas that showed up again and again. Instead of axing digital note-taking completely, I began transferring my notes to digital files that had the capability to be converted into TeX files. I began[^1] an expedition to find the perfect platform (for my purposes) by trying out [Obsidian](https://obsidian.md). This is an application that stores Markdown files in one place with the ability to reference other notes within a note. You can hop from note to note and even see all of the *note connections* via a graph (yay - graphs!).

[^1]: well, not quite, I *started* with trying Notion, but more on that shortly.


I enjoyed Obsidian for a while, but when it came time to TeX some of these notes, I had to manually transfer them over with no real solution of exporting directly to TeX. Then, in the summer of 2021, I took a course in [mathematical computation](http://jdc.math.uwo.ca/M9171a-2021-summer/index.html) and learned [Haskell](https://www.haskell.org) as part of my [end-of-term project](https://youtu.be/vRPyaeW-HNc). When researching uses of Haskell in the *real-world*, I found an incredible open-source application called [Pandoc](https://pandoc.org) (written in Haskell!). It lets you convert between a plethora of different document types, from TeX to Markdown to HTML and more. As part of this journey into learning Haskell, I discovered that it was well-integrated in [Emacs](https://www.gnu.org/software/emacs/), a text editor that does pretty much everything I needed to do (and more). I quickly transitioned my Obsidian workflow into [Org-Roam](https://www.orgroam.com), a much more intricate software that had all the functionality of Obsidian and then some. It is also very easily converted into TeX using the ever-handy Pandoc. This is all housed in [Spacemacs](https://develop.spacemacs.org) (an Emacs distribution). The great thing about this setup is that I can easily shift my org files into $\LaTeX$ and vice versa. I now use org-roam to conveniently organize all of my research, meeting, and seminar notes in one place. I can also export these to pdf files that are beautifully TeXed and ready to be presented to the *outside world*.

<figure>
  <center>
  <img src ="/images/org-roam-graph.png" alt ="Org Roam UI Graph" style="width:50%">
  <figcaption>
    <font size="-1.5"><span style="color:gray"> An example of an org-roam note graph.</span></font>
  </figcaption>
  </center>
</figure>
  
So where does [Notion](https://www.notion.so/login) come into play? Even before turning to Obsidian, I used Notion to house all of my math notes. Although the interface is wonderful, I needed more customization and the ability to edit and view my files offline. I also ran into the same *Obsidian-esque* issue of not being able to smoothly export files to TeX. I continue to use Notion on a daily basis, but as a task manager rather than a note-taking app. I find that it has an unmatched functionality for scheduling long-term projects and small daily tasks.

This workflow has been working wonders for my productivity and organization, being able to hop between notes and really think in a concise way has led to new insights. But, who knows, maybe some tweaks can be made - as with all things - to improve it even further. Stay tuned for future updates and happy 2022 in advance!
