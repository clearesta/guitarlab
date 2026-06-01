# GuitarLab

Belajar gitar online, gratis. Tinggal buka di browser.

Apa yang ada di dalamnya:

- Chord Library — 60+ chord dengan diagram fingering, bisa filter berdasarkan tipe
- Chord Family — semua chord dalam satu key, dari I sampai vii dim
- Scale Explorer — 21 scale divisualisasikan di fretboard dengan warna per interval
- Fretboard Trainer — toggle nama note di fretboard, ada tuning selector
- Chord Progressions — progresi pop, rock, jazz, blues dengan contoh chord per key
- Metronome — 30-300 BPM, tap tempo, adjustable beats per measure
- Live Tuner — deteksi pitch real-time dari mikrofon
- Circle of Fifths — interaktif, klik key untuk liat chord family dan relasi
- 30+ tuning — Standard, Drop D/C/B, Open G/D/E/A, DADGAD, Baritone, dll
- Dark mode
- 7 bahasa (auto-detect dari browser)
- Responsive di mobile

Stack-nya cuma HTML, CSS, dan JavaScript vanilla. Tidak ada framework, tidak ada build step. File statis, tinggal serve.

Cara jalankan lokal:

    cd guitar-learning
    python3 -m http.server 8000

Buka http://localhost:8000 di browser.

Struktur file:

    index.html        markup dan CSS
    app.js            init, navigasi, dark mode, state management
    chords.js         chord library, SVG diagram, chord family
    scales.js         scale explorer, fretboard SVG
    tools.js          metronome, tuner, progresi, circle of fifths
    data.js           data chord, scale, tuning, progresi
    translations.js   terjemahan 7 bahasa
    robots.txt
    sitemap.xml

Deploy tinggal upload ke hosting static manapun — GitHub Pages, Netlify, Vercel, atau server sendiri.

License: MIT
