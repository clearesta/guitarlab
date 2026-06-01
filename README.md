# GuitarLab

A free guitar learning website because apparently paying $10/month for an app that does the same thing is too much to ask.

## What's in it

**Chord Library** — 60+ chords with actual fingering diagrams. Click them, stare at them, pretend you know what you're doing. Has filters because scrolling through 60 chords is apparently too hard.

**Chord Family** — Shows you every chord in a key. I ii iii IV V vi vii°. If you don't know what that means, that's what this tool is for.

**Scale Explorer** — 21 scales drawn on a fretboard with pretty colors. Major, minor, pentatonic, blues, modes you've never heard of, the whole thing. Works with 30+ tunings because some of you insist on playing in Drop A on a 7-string.

**Fretboard Trainer** — Toggle note names on the fretboard. Study them. Or don't. I'm not your guitar teacher.

**Chord Progressions** — 12 popular progressions across genres. Rock, pop, jazz, blues, that one anime opening progression. Click play, hear the chords, feel something.

**Metronome** — Goes from 30 to 300 BPM. Has tap tempo because apparently tapping a button is easier than typing a number. Adjustable time signatures for the prog rock people.

**Live Tuner** — Uses your microphone to detect pitch in real time. Sharp, flat, in tune — it tells you. No excuses anymore.

**Circle of Fifths** — The thing everyone pretends to understand. Now it's interactive so you can actually learn it instead of just nodding along.

## Features nobody asked for but got anyway

- Dark mode for those late night practice sessions where you don't want to burn your retinas
- 7 languages auto-detected from your browser because music is universal or whatever
- 30+ tunings including DADGAD, baritone, and that one tuning your favorite djent guitarist uses
- Works on your phone so you can use it while your guitar is actually in your hands, crazy concept

## How to run it locally

It's just files on a server. No build step. No npm install. No node_modules folder eating 500MB of your disk.

```
cd guitar-learning
python3 -m http.server 8000
```

Open http://localhost:8000 and be amazed that a website can work without a JavaScript framework.

## Stack

HTML. CSS. JavaScript. That's it. No React, no Vue, no Svelte, no "let me spend 3 hours configuring webpack before I write a single line of code." Just files that load instantly.

## Deploy

Drop the files on any static host. GitHub Pages, Netlify, Vercel, your friend's Raspberry Pi, whatever. If it can serve files over HTTP, it works.
