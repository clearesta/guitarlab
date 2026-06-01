# GuitarLab - https://clearesta.github.io/guitarlab/

A free guitar learning website because apparently paying $10/month for an app that does the same thing is too much to ask.

## Features nobody asked for but got anyway

- Chord Library — 60+ chords with actual fingering diagrams, filters, and chord family per key
- Scale Explorer — 21 scales on a fretboard with pretty colors, works with 30+ tunings
- Fretboard Trainer — toggle note names, study them, or don't
- Chord Progressions — 12 popular progressions across genres with playable chord diagrams
- Metronome — 30 to 300 BPM, tap tempo, adjustable time signatures
- Live Tuner — real-time pitch detection from your microphone
- Circle of Fifths — the thing everyone pretends to understand, now interactive
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
