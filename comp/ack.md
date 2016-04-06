---
vim: tw=70
title: ack
---

**Ack** is a command-line tool for programmers that is intended as a
smarter **grep** and **find**. (Mostly grep, but it can fill some uses
of find.) If you've been coding long in the UNIX environment, you
probably know why you would want this. Those standard UNIX tools are
always bringing junk that you don't want into your search; in
particular, they grab a bunch of garbage from your version control
directories (.git, .svn, etc.). You can work around this to some
extent with shell aliases, but you'd like a nicer solution that that:
ack is that solution.

The official ack website is hosted at: [http://beyondgrep.com/](http://beyondgrep.com/)

Here I note a few things that I've learned about ack that I didn't
find immediately obvious.

## Some useful one-liners

    ack -f

List all the files under the current directory. Useful when you have a
few subdirectories and you wanna see what's in them, or you want to
pipe output to another command.

For example:

    

## Excluding additional directories

It's nice that ack automatically excludes your .git directory, but
that's not really enough. From working with Git, you know that Git
allows you to "hide" things from its view with the .gitignore file.
The greatness of .gitignore is that 1) it's a plan file, and thus
you store it in version control and it get shared with everyone who's
working on the project; and 2) it operates on directory trees, so it's
modular.

It would be really nice to be able to do this with ack, but at first
blush it's not obvious how you would because ack's configuration
relies on command-line arguments.

Ack does offer a way to do it, though. You can add default
command-line arguments by editing your .ackrc file. You can set global
options by editing $HOME/.ackrc, but ack also searches local
directories for an additional .ackrc file, which the manual calls
the "project ackrc". It searches in the local directory and then
recursively through parent directories until it finds an .ackrc
file. (Or, presumably, until it reaches $HOME?)

Notice that, as compared to .gitignore, the solution of having a
project ackrc isn't really optimal. It's much better than not having
this option, but it lacks flexibility, because you can't set options
that are specific to a particular subtree of the project. It would
probably be better if ack also locally respected .ackrc files that
it found while recursing down into subdirectories.

Some examples of how to exclude things:

    --ignore-dir=_site

I use this one to hide my Jekyll deployment directory.

    --ignore-file:ext:lock

To ignore lock files. (Ruby creates Gemfile.lock when I run bundle,
and I don't want to see that.)

