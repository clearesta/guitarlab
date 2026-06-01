// ═══════════════════════════════════════════════════════
// i18n - Translations & Language Detection
// ═══════════════════════════════════════════════════════

const TRANSLATIONS = {
  // ── ENGLISH ──────────────────────────────────────────
  en: {
    // Header
    tuning_label: 'Tuning',
    lang_label: 'Language',
    tab_chords: 'Chords',
    tab_family: 'Family',
    tab_scales: 'Scales',
    tab_fretboard: 'Fretboard',
    tab_progressions: 'Progressions',
    tab_metronome: 'Metronome',
    tab_tuner: 'Tuner',
    tab_quiz: 'Quiz',
    tab_ear: 'Ear Training',
    // Chords tab
    chords_title: 'Chord Library',
    chords_desc: 'Browse 60+ chords with fingering diagrams. Use filters to search.',
    chords_search: 'Search chords... (C, Am, G7)',
    chords_all_types: 'All Types',
    // Chord types
    type_major: 'Major',
    type_minor: 'Minor',
    type_7: '7th',
    type_maj7: 'Major 7',
    type_m7: 'Minor 7',
    type_sus: 'Sus',
    type_dim: 'Diminished',
    type_aug: 'Augmented',
    type_add9: 'Add9',
    type_power: 'Power',
    // Family tab
    family_title: 'Chord Family',
    family_desc: 'See all chords within a key.',
    family_key_label: 'KEY:',
    // Scales tab
    scales_title: 'Scale Explorer',
    scales_desc: 'Explore various scales on the fretboard. Colors show intervals from the root note.',
    scales_root_label: 'Root:',
    scales_scale_label: 'Scale:',
    scales_formula: 'Intervals:',
    scales_full: 'Full Fretboard',
    scales_full_scroll: 'Full Fretboard (scroll \u2192)',
    scales_per_section: 'Per Section',
    scales_fret_label: 'Fret',
    scales_open: 'Open',
    // Fretboard tab
    fretboard_title: 'Fretboard Trainer',
    fretboard_desc: 'Practice memorizing notes on the fretboard. Toggle note names, then try the quiz!',
    fretboard_toggle: 'Show/Hide Notes',
    fretboard_quiz_title: 'Fretboard Quiz',
    fretboard_new_q: 'New Question',
    fretboard_reveal: 'Reveal Answer',
    fretboard_answer: 'Answer:',
    // Progressions tab
    prog_title: 'Chord Progressions',
    prog_desc: 'Popular chord progressions with genre examples.',
    prog_key_label: 'KEY:',
    prog_play: 'Play',
    // Metronome tab
    metro_title: 'Metronome',
    metro_bpm_label: 'BPM',
    metro_beats_label: 'Beats:',
    metro_start: 'START',
    metro_stop: 'STOP',
    metro_tap: 'TAP TEMPO',
    // Tuner tab
    tuner_title: 'Guitar Tuner',
    tuner_desc: 'Play a string on your guitar — the tuner detects pitch in real-time using your microphone.',
    tuner_default: 'Click a string',
    // Quiz tab
    quiz_title: 'Chord Quiz',
    quiz_desc: 'Guess the chord from its diagram! How good are you?',
    quiz_start: 'Start Quiz',
    quiz_idle: 'Click "Start Quiz" to begin',
    quiz_score: 'Score:',
    // Ear training tab
    ear_title: 'Ear Training',
    ear_desc: 'Train your ear to recognize musical intervals!',
    ear_start: 'Start',
    ear_question: 'What interval did you hear?',
    ear_replay: 'Replay',
    ear_score: 'Score:',
    // Interval names
    int_root: 'Root',
    int_m2: 'Minor 2nd',
    int_M2: 'Major 2nd',
    int_m3: 'Minor 3rd',
    int_M3: 'Major 3rd',
    int_P4: 'Perfect 4th',
    int_tt: 'Tritone',
    int_P5: 'Perfect 5th',
    int_m6: 'Minor 6th',
    int_M6: 'Major 6th',
    int_m7: 'Minor 7th',
    int_M7: 'Major 7th',
    int_oct: 'Octave',
    // Progression genres
    genre_rock: 'Rock / Pop / Blues',
    genre_pop: 'Pop (Axis of Awesome)',
    genre_jazz: 'Jazz',
    genre_50s: '50s Progression',
    genre_modern_pop: 'Modern Pop',
    genre_pop_rock: 'Pop Rock',
    genre_classic_rock: 'Classic Rock',
    genre_epic: 'Epic / Anime (minor)',
    genre_minor_blues: 'Minor Blues',
    genre_country: 'Country / Folk',
    genre_classic_rock2: 'Classic Rock (Maiden)',
    genre_jazz_ext: 'Jazz Extended',
    // Legend
    legend_root: 'Root',
    legend_3rd: '3rd',
    legend_4th: '4th',
    legend_5th: '5th',
    legend_6th: '6th',
    legend_7th: '7th',
  },

  // ── BAHASA INDONESIA ─────────────────────────────────
  id: {
    tuning_label: 'Tuning',
    lang_label: 'Bahasa',
    tab_chords: 'Chord',
    tab_family: 'Family',
    tab_scales: 'Skala',
    tab_fretboard: 'Fretboard',
    tab_progressions: 'Progresi',
    tab_metronome: 'Metronom',
    tab_tuner: 'Tuner',
    tab_quiz: 'Kuis',
    tab_ear: 'Latihan Telinga',
    chords_title: 'Koleksi Chord',
    chords_desc: 'Jelajahi 60+ chord dengan diagram fingering. Gunakan filter untuk cari.',
    chords_search: 'Cari chord... (C, Am, G7)',
    chords_all_types: 'Semua Tipe',
    type_major: 'Mayor',
    type_minor: 'Minor',
    type_7: 'Dominan 7',
    type_maj7: 'Mayor 7',
    type_m7: 'Minor 7',
    type_sus: 'Sus',
    type_dim: 'Diminished',
    type_aug: 'Augmented',
    type_add9: 'Add9',
    type_power: 'Power',
    family_title: 'Family Chord',
    family_desc: 'Lihat semua chord dalam satu key.',
    family_key_label: 'KEY:',
    scales_title: 'Eksplorasi Skala',
    scales_desc: 'Pelajari berbagai skala di fretboard. Warna menunjukkan interval dari root note.',
    scales_root_label: 'Root:',
    scales_scale_label: 'Skala:',
    scales_formula: 'Interval:',
    scales_full: 'Fretboard Lengkap',
    scales_full_scroll: 'Fretboard Lengkap (scroll \u2192)',
    scales_per_section: 'Per Bagian',
    scales_fret_label: 'Fret',
    scales_open: 'Open',
    fretboard_title: 'Latihan Fretboard',
    fretboard_desc: 'Latihan menghafal note di fretboard. Toggle nama note, lalu coba kuis!',
    fretboard_toggle: 'Tampil/Sembunyi Note',
    fretboard_quiz_title: 'Kuis Fretboard',
    fretboard_new_q: 'Soal Baru',
    fretboard_reveal: 'Lihat Jawaban',
    fretboard_answer: 'Jawaban:',
    prog_title: 'Progresi Chord',
    prog_desc: 'Progresi chord populer beserta contoh genre.',
    prog_key_label: 'KEY:',
    prog_play: 'Putar',
    metro_title: 'Metronom',
    metro_bpm_label: 'BPM',
    metro_beats_label: 'Ketukan:',
    metro_start: 'MULAI',
    metro_stop: 'STOP',
    metro_tap: 'TEMPO TAP',
    tuner_title: 'Tuner Gitar',
    tuner_desc: 'Petik string gitar kamu — tuner mendeteksi pitch secara real-time menggunakan mikrofon.',
    tuner_default: 'Klik salah satu string',
    quiz_title: 'Kuis Chord',
    quiz_desc: 'Tebak chord dari diagramnya! Seberapa jago kamu?',
    quiz_start: 'Mulai Kuis',
    quiz_idle: 'Klik "Mulai Kuis" untuk memulai',
    quiz_score: 'Skor:',
    ear_title: 'Latihan Telinga',
    ear_desc: 'Latih telinga kamu mengenali interval musik!',
    ear_start: 'Mulai',
    ear_question: 'Interval apa yang kamu dengar?',
    ear_replay: 'Putar Ulang',
    ear_score: 'Skor:',
    int_root: 'Root',
    int_m2: 'Minor ke-2',
    int_M2: 'Mayor ke-2',
    int_m3: 'Minor ke-3',
    int_M3: 'Mayor ke-3',
    int_P4: 'Sempurna ke-4',
    int_tt: 'Triton',
    int_P5: 'Sempurna ke-5',
    int_m6: 'Minor ke-6',
    int_M6: 'Mayor ke-6',
    int_m7: 'Minor ke-7',
    int_M7: 'Mayor ke-7',
    int_oct: 'Oktaf',
    genre_rock: 'Rock / Pop / Blues',
    genre_pop: 'Pop (Axis of Awesome)',
    genre_jazz: 'Jazz',
    genre_50s: 'Progresi 50an',
    genre_modern_pop: 'Pop Modern',
    genre_pop_rock: 'Pop Rock',
    genre_classic_rock: 'Rock Klasik',
    genre_epic: 'Epic / Anime (minor)',
    genre_minor_blues: 'Blues Minor',
    genre_country: 'Country / Folk',
    genre_classic_rock2: 'Rock Klasik (Maiden)',
    genre_jazz_ext: 'Jazz Extended',
    legend_root: 'Root',
    legend_3rd: 'ke-3',
    legend_4th: 'ke-4',
    legend_5th: 'ke-5',
    legend_6th: 'ke-6',
    legend_7th: 'ke-7',
  },

  // ── JAPANESE ─────────────────────────────────────────
  ja: {
    tuning_label: '\u30c1\u30e5\u30fc\u30cb\u30f3\u30b0',
    lang_label: '\u8a00\u8a9e',
    tab_chords: '\u30b3\u30fc\u30c9',
    tab_family: '\u30d5\u30a1\u30df\u30ea\u30fc',
    tab_scales: '\u30b9\u30b1\u30fc\u30eb',
    tab_fretboard: '\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9',
    tab_progressions: '\u30d7\u30ed\u30b0\u30ec\u30c3\u30b7\u30e7\u30f3',
    tab_metronome: '\u30e1\u30c8\u30ed\u30ce\u30fc\u30e0',
    tab_tuner: '\u30c1\u30e5\u30fc\u30ca\u30fc',
    tab_quiz: '\u30af\u30a4\u30ba',
    tab_ear: '\u8033\u30c8\u30ec\u30fc\u30cb\u30f3\u30b0',
    chords_title: '\u30b3\u30fc\u30c9\u30e9\u30a4\u30d6\u30e9\u30ea\u30fc',
    chords_desc: '60\u4ee5\u4e0a\u306e\u30b3\u30fc\u30c9\u3068\u6307\u677f\u56f3\u3092\u958b\u89a7\u3067\u304d\u307e\u3059\u3002\u30d5\u30a3\u30eb\u30bf\u3067\u691c\u7d22\u3057\u307e\u3057\u3087\u3046\u3002',
    chords_search: '\u30b3\u30fc\u30c9\u3092\u691c\u7d22... (C, Am, G7)',
    chords_all_types: '\u3059\u3079\u3066\u306e\u30bf\u30a4\u30d7',
    type_major: '\u30e1\u30a4\u30b8\u30e3\u30fc',
    type_minor: '\u30de\u30a4\u30ca\u30fc',
    type_7: '7th',
    type_maj7: '\u30e1\u30a4\u30b8\u30e3\u30fc7',
    type_m7: '\u30de\u30a4\u30ca\u30fc7',
    type_sus: 'Sus',
    type_dim: '\u30c7\u30a3\u30df\u30cb\u30c3\u30b7\u30e5',
    type_aug: '\u30aa\u30fc\u30b0\u30e1\u30f3\u30c8',
    type_add9: 'Add9',
    type_power: '\u30d1\u30ef\u30fc',
    family_title: '\u30b3\u30fc\u30c9\u30d5\u30a1\u30df\u30ea\u30fc',
    family_desc: '\u30ad\u30fc\u5185\u306e\u3059\u3079\u3066\u306e\u30b3\u30fc\u30c9\u3092\u8868\u793a\u3057\u307e\u3059\u3002',
    family_key_label: '\u30ad\u30fc:',
    scales_title: '\u30b9\u30b1\u30fc\u30eb\u30a8\u30af\u30b9\u30d7\u30ed\u30fc\u30e9\u30fc',
    scales_desc: '\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9\u4e0a\u306e\u69d8\u3005\u306a\u30b9\u30b1\u30fc\u30eb\u3092\u5b66\u3073\u307e\u3057\u3087\u3046\u3002\u8272\u3067\u30a4\u30f3\u30bf\u30fc\u30d0\u30eb\u3092\u8868\u793a\u3002',
    scales_root_label: '\u30eb\u30fc\u30c8:',
    scales_scale_label: '\u30b9\u30b1\u30fc\u30eb:',
    scales_formula: '\u30a4\u30f3\u30bf\u30fc\u30d0\u30eb:',
    scales_full: '\u30d5\u30eb\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9',
    scales_full_scroll: '\u30d5\u30eb\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9 (\u30b9\u30af\u30ed\u30fc\u30eb \u2192)',
    scales_per_section: '\u30bb\u30af\u30b7\u30e7\u30f3\u5225',
    scales_fret_label: '\u30d5\u30ec\u30c3\u30c8',
    scales_open: '\u30aa\u30fc\u30d7\u30f3',
    fretboard_title: '\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9\u30c8\u30ec\u30fc\u30cb\u30f3\u30b0',
    fretboard_desc: '\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9\u4e0a\u306e\u30ce\u30fc\u30c8\u3092\u8a18\u61b6\u3059\u308b\u7df4\u7fd2\u3067\u3059\u3002',
    fretboard_toggle: '\u30ce\u30fc\u30c8\u8868\u793a/\u975e\u8868\u793a',
    fretboard_quiz_title: '\u30d5\u30ec\u30c3\u30c8\u30dc\u30fc\u30c9\u30af\u30a4\u30ba',
    fretboard_new_q: '\u6b21\u306e\u554f\u984c',
    fretboard_reveal: '\u7b54\u3048\u3092\u8868\u793a',
    fretboard_answer: '\u7b54\u3048:',
    prog_title: '\u30b3\u30fc\u30c9\u30d7\u30ed\u30b0\u30ec\u30c3\u30b7\u30e7\u30f3',
    prog_desc: '\u4eba\u6c17\u306e\u30b3\u30fc\u30c9\u30d7\u30ed\u30b0\u30ec\u30c3\u30b7\u30e7\u30f3\u3002\u518d\u751f\u3067\u304d\u307e\u3059\uff01',
    prog_key_label: '\u30ad\u30fc:',
    prog_play: '\u518d\u751f',
    metro_title: '\u30e1\u30c8\u30ed\u30ce\u30fc\u30e0',
    metro_bpm_label: 'BPM',
    metro_beats_label: '\u62cd:',
    metro_start: '\u958b\u59cb',
    metro_stop: '\u505c\u6b62',
    metro_tap: '\u30bf\u30c3\u30d7\u30c6\u30f3\u30dd',
    tuner_title: '\u30ae\u30bf\u30fc\u30c1\u30e5\u30fc\u30ca\u30fc',
    tuner_desc: '\u5409\u4ed6\u306e\u5f26\u3092\u5f48\u3044\u3066\u304f\u3060\u3055\u3044 \u2015 \u30de\u30a4\u30af\u3067\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u3067\u30d4\u30c3\u30c1\u3092\u691c\u51fa\u3057\u307e\u3059\u3002',
    tuner_default: '\u30b9\u30c8\u30ea\u30f3\u30b0\u3092\u30af\u30ea\u30c3\u30af',
    quiz_title: '\u30b3\u30fc\u30c9\u30af\u30a4\u30ba',
    quiz_desc: '\u56f3\u304b\u3089\u30b3\u30fc\u30c9\u3092\u5f53\u3066\u3087\u3046\uff01',
    quiz_start: '\u30af\u30a4\u30ba\u958b\u59cb',
    quiz_idle: '\u300c\u30af\u30a4\u30ba\u958b\u59cb\u300d3092\u30af\u30ea\u30c3\u30af',
    quiz_score: '\u30b9\u30b3\u30a2:',
    ear_title: '\u8033\u30c8\u30ec\u30fc\u30cb\u30f3\u30b0',
    ear_desc: '\u97f3\u7a0b\u3092\u8074\u304d\u5206\u3051\u308b\u7df4\u7fd2\u3067\u3059\uff01',
    ear_start: '\u958b\u59cb',
    ear_question: '\u3069\u306e\u97f3\u7a0b\u3092\u8074\u304d\u307e\u3057\u305f\u304b\uff1f',
    ear_replay: '\u518d\u751f',
    ear_score: '\u30b9\u30b3\u30a2:',
    int_root: '\u30eb\u30fc\u30c8',
    int_m2: '\u77ed2\u5ea6',
    int_M2: '\u95772\u5ea6',
    int_m3: '\u77ed3\u5ea6',
    int_M3: '\u95773\u5ea6',
    int_P4: '\u5b8c\u51684\u5ea6',
    int_tt: '\u4e09\u5168\u97f3',
    int_P5: '\u5b8c\u51685\u5ea6',
    int_m6: '\u77ed6\u5ea6',
    int_M6: '\u95776\u5ea6',
    int_m7: '\u77ed7\u5ea6',
    int_M7: '\u95777\u5ea6',
    int_oct: '\u30aa\u30af\u30bf\u30fc\u30d6',
    genre_rock: '\u30ed\u30c3\u30af / \u30dd\u30c3\u30d7 / \u30d6\u30eb\u30fc\u30ba',
    genre_pop: '\u30dd\u30c3\u30d7 (Axis of Awesome)',
    genre_jazz: '\u30b8\u30e3\u30ba',
    genre_50s: '50\u5e74\u4ee3\u30d7\u30ed\u30b0\u30ec\u30c3\u30b7\u30e7\u30f3',
    genre_modern_pop: '\u30e2\u30c0\u30f3\u30dd\u30c3\u30d7',
    genre_pop_rock: '\u30dd\u30c3\u30d7\u30ed\u30c3\u30af',
    genre_classic_rock: '\u30af\u30e9\u30b7\u30c3\u30af\u30ed\u30c3\u30af',
    genre_epic: '\u30a8\u30d4\u30c3\u30af / \u30a2\u30cb\u30e1 (m)',
    genre_minor_blues: '\u30de\u30a4\u30ca\u30fc\u30d6\u30eb\u30fc\u30ba',
    genre_country: '\u30ab\u30f3\u30c8\u30ea\u30fc / \u30d5\u30a9\u30fc\u30af',
    genre_classic_rock2: '\u30af\u30e9\u30b7\u30c3\u30af\u30ed\u30c3\u30af (Maiden)',
    genre_jazz_ext: '\u30b8\u30e3\u30ba\u30a8\u30af\u30b9\u30c6\u30f3\u30c7\u30c3\u30c9',
    legend_root: '\u30eb\u30fc\u30c8',
    legend_3rd: '3\u5ea6',
    legend_4th: '4\u5ea6',
    legend_5th: '5\u5ea6',
    legend_6th: '6\u5ea6',
    legend_7th: '7\u5ea6',
  },

  // ── KOREAN ──────────────────────────────────────────
  ko: {
    tuning_label: '\ud29c\ub2dd',
    lang_label: '\uc5b8\uc5b4',
    tab_chords: '\ucf54\ub4dc',
    tab_family: '\ud328\ubc00\ub9ac',
    tab_scales: '\uc2a4\ucf00\uc77c',
    tab_fretboard: '\ud504\ub810\ubcf4\ub4dc',
    tab_progressions: '\ud504\ub85c\uadf8\ub808\uc158',
    tab_metronome: '\uba54\ud2b8\ub85c\ub178\ub984',
    tab_tuner: '\ud29c\ub108',
    tab_quiz: '\ud034\uc988',
    tab_ear: '\uc725 \ud6c8\ub828',
    chords_title: '\ucf54\ub4dc \ub77c\uc774\ube0c\ub7ec\ub9ac',
    chords_desc: '60\uac1c \uc774\uc0c1\uc758 \ucf54\ub4dc\uc640 \uc9c0\ud3ed \ub2e4\uc774\uc5b4\uadf8\ub9bc\uc744 \ubcf4\uc5ec\ub4dc\ub9bd\ub2c8\ub2e4.',
    chords_search: '\ucf54\ub4dc \uac80\uc0c9... (C, Am, G7)',
    chords_all_types: '\ubaa8\ub4e0 \uc720\ud615',
    type_major: '\uba54\uc774\uc800',
    type_minor: '\ubc14\uc774\ub108',
    type_7: '7th',
    type_maj7: '\uba54\uc774\uc8007',
    type_m7: '\ubc14\uc774\ub1087',
    type_sus: 'Sus',
    type_dim: '\ub514\ubc00\ub9ac\uc2dc',
    type_aug: '\uc624\uadf8uba54\ud2b8',
    type_add9: 'Add9',
    type_power: '\ud30c\uc6cc',
    family_title: '\ucf54\ub4dc \ud328\ubc00\ub9ac',
    family_desc: '\ud0a4 \ub0b4 \ubaa8\ub4e0 \ucf54\ub4dc\ub97c \ud45c\uc2dc\ud569\ub2c8\ub2e4.',
    family_key_label: '\ud0a4:',
    scales_title: '\uc2a4\ucf00\uc77c \uc5d0\uc2a4\ud50c\ub85c\ub7ec',
    scales_desc: '\ud504\ub810\ud2b8\ubcf4\ub4dc\uc5d0\uc11c \ub2e4\uc591\ud55c \uc2a4\ucf00\uc77c\uc744 \ud559\uc2b5\ud558\uc138\uc694.',
    scales_root_label: '\ub8e8\ud2b8:',
    scales_scale_label: '\uc2a4\ucf00\uc77c:',
    scales_formula: '\uc778\ud130\ubc8c:',
    scales_full: '\ud480 \ud504\ub810\ud2b8\ubcf4\ub4dc',
    scales_full_scroll: '\ud480 \ud504\ub810\ud2b8\ubcf4\ub4dc (\uc2a4\ud06c\ub864 \u2192)',
    scales_per_section: '\uc139\uc158\ubcc4',
    scales_fret_label: '\ud504\ub810\ud2b8',
    scales_open: '\uc624\ud508',
    fretboard_title: '\ud504\ub810\ud2b8\ubcf4\ub4dc \ud6c8\ub828',
    fretboard_desc: '\ud504\ub810\ud2b8\ubcf4\ub4dc \ub178\ud2b8\ub97c \uc555\uad6c\ud558\ub294 \uc5f0\uc2b5\uc785\ub2c8\ub2e4.',
    fretboard_toggle: '\ub178\ud2b8 \ud45c\uc2dc/\uc228\uae30\uae30',
    fretboard_quiz_title: '\ud504\ub810\ud2b8\ubcf4\ub4dc \ud034\uc988',
    fretboard_new_q: '\ub2e4\uc74c \ubb38\uc81c',
    fretboard_reveal: '\ub2f5\ubcc0 \ubcf4\uae30',
    fretboard_answer: '\ub2f5:',
    prog_title: '\ucf54\ub4dc \ud504\ub85c\uadf8\ub808\uc158',
    prog_desc: '\uc778\uae30 \ucf54\ub4dc \ud504\ub85c\uadf8\ub808\uc158\uc785\ub2c8\ub2e4.',
    prog_key_label: '\ud0a4:',
    prog_play: '\uc7ac\uc0dd',
    metro_title: '\uba54\ud2b8\ub85c\ub178\ub984',
    metro_bpm_label: 'BPM',
    metro_beats_label: '\ubc18\uc8fc:',
    metro_start: '\uc2dc\uc791',
    metro_stop: '\uc911\uc9c0',
    metro_tap: '\ud0d1 \ud14c\ud3f4',
    tuner_title: '\uae30\ud0c0 \ud29c\ub108',
    tuner_desc: '\uae30\ud0c0\ub97c \uc5f0\uc8fc\uc138\uc694 \u2015 \ub9c8\ud06c\ub85c \ub9ac\uc5bc \ud0c0\uc784\uc73c\ub85c \ud53d\uc744 \uac10\uc9c0\ud569\ub2c8\ub2e4.',
    tuner_default: '\ubb38\uc790\ud604\uc744 \ud074\ub9ad',
    quiz_title: '\ucf54\ub4dc \ud034\uc988',
    quiz_desc: '\ub2e4\uc774\uc5b4\uadf8\ub7a8\uc5d0\uc11c \ucf54\ub4dc\ub97c \ub9de\ud788\uc138\uc694!',
    quiz_start: '\ud034\uc988 \uc2dc\uc791',
    quiz_idle: '\ud034\uc988 \uc2dc\uc791\uc744 \ub204\ub974\uc138\uc694',
    quiz_score: '\uc810\uc218:',
    ear_title: '\uc725 \ud6c8\ub828',
    ear_desc: '\uc74c\uac04 \uc778\ud130\ubc8c\uc744 \uc2dd\ubcc4\ud558\ub294 \uc5f0\uc2b5\uc785\ub2c8\ub2e4!',
    ear_start: '\uc2dc\uc791',
    ear_question: '\uc5b4\ub5a0\ud55c \uc778\ud130\ubc8c\uc774\ub098\uc694?',
    ear_replay: '\ub2e4\uc2dc \uc7ac\uc0dd',
    ear_score: '\uc810\uc218:',
    int_root: '\ub8e8\ud2b8',
    int_m2: '\uc790\ud130 2\ub3c4',
    int_M2: '\uc7a5 2\ub3c4',
    int_m3: '\uc790\ud130 3\ub3c4',
    int_M3: '\uc7a5 3\ub3c4',
    int_P4: '\uc644\uc804 4\ub3c4',
    int_tt: '\ud2b8\ub9ac\ud1a4',
    int_P5: '\uc644\uc804 5\ub3c4',
    int_m6: '\uc790\ud130 6\ub3c4',
    int_M6: '\uc7a5 6\ub3c4',
    int_m7: '\uc790\ud130 7\ub3c4',
    int_M7: '\uc7a5 7\ub3c4',
    int_oct: '\uc624\ud0c0\ube0c',
    genre_rock: '\ub85d / \ud3dd / \ube14\ub8e8\uc2a4',
    genre_pop: '\ud3dd (Axis of Awesome)',
    genre_jazz: '\uc790\uc988',
    genre_50s: '50\ub300 \ud504\ub85c\uadf8\ub808\uc158',
    genre_modern_pop: '\ubaa8\ub358 \ud3dd',
    genre_pop_rock: '\ud3dd \ub85d',
    genre_classic_rock: '\ud074\ub798\uc2dd \ub85d',
    genre_epic: '\uc5d0\ud53d / \uc544\ub2c8\uba54 (m)',
    genre_minor_blues: '\ubc14\uc774\ub108 \ube14\ub8e8\uc2a4',
    genre_country: '\uce74\ud2b8\ub9ac / \ud3ec\ud06c',
    genre_classic_rock2: '\ud074\ub798\uc2dd \ub85d (Maiden)',
    genre_jazz_ext: '\uc790\uc988 \uc5d1\uc2a4\ud14c\ub529\ub4dc',
    legend_root: '\ub8e8\ud2b8',
    legend_3rd: '3\ub3c4',
    legend_4th: '4\ub3c4',
    legend_5th: '5\ub3c4',
    legend_6th: '6\ub3c4',
    legend_7th: '7\ub3c4',
  },

  // ── CHINESE (Simplified) ─────────────────────────────
  zh: {
    tuning_label: '\u8c03\u5f26',
    lang_label: '\u8bed\u8a00',
    tab_chords: '\u548c\u5f26',
    tab_family: '\u548c\u5f26\u65cf',
    tab_scales: '\u97f3\u9636',
    tab_fretboard: '\u6307\u677f',
    tab_progressions: '\u8fdb\u884c',
    tab_metronome: '\u8282\u62cd\u5668',
    tab_tuner: '\u8c03\u97f3\u5668',
    tab_quiz: '\u6d4b\u9a8c',
    tab_ear: '\u542c\u97f3\u8bad\u7ec3',
    chords_title: '\u548c\u5f26\u5e93',
    chords_desc: '\u6d4f\u89c860\u591a\u4e2a\u548c\u5f26\u4e0e\u6307\u677f\u56fe\u3002\u4f7f\u7528\u7b5b\u9009\u641c\u7d22\u3002',
    chords_search: '\u641c\u7d22\u548c\u5f26... (C, Am, G7)',
    chords_all_types: '\u6240\u6709\u7c7b\u578b',
    type_major: '\u5927\u4e03',
    type_minor: '\u5c0f\u4e03',
    type_7: '\u4e03\u548c\u5f26',
    type_maj7: '\u5927\u4e03\u548c\u5f26',
    type_m7: '\u5c0f\u4e03\u548c\u5f26',
    type_sus: 'Sus',
    type_dim: '\u51cf\u4e03',
    type_aug: '\u589e\u4e03',
    type_add9: 'Add9',
    type_power: '\u5f3a\u529b\u548c\u5f26',
    family_title: '\u548c\u5f26\u65cf',
    family_desc: '\u67e5\u770b\u67d0\u8c03\u5185\u6240\u6709\u548c\u5f26\u3002',
    family_key_label: '\u8c03:',
    scales_title: '\u97f3\u9636\u63a2\u7d22',
    scales_desc: '\u5728\u6307\u677f\u4e0a\u5b66\u4e60\u5404\u79cd\u97f3\u9636\u3002\u989c\u8272\u8868\u793a\u97f3\u7a0b\u3002',
    scales_root_label: '\u6839\u97f3:',
    scales_scale_label: '\u97f3\u9636:',
    scales_formula: '\u97f3\u7a0b:',
    scales_full: '\u5b8c\u6574\u6307\u677f',
    scales_full_scroll: '\u5b8c\u6574\u6307\u677f (\u6eda\u52a8 \u2192)',
    scales_per_section: '\u5206\u6bb5\u663e\u793a',
    scales_fret_label: '\u54c1',
    scales_open: '\u7a7a\u5f26',
    fretboard_title: '\u6307\u677f\u8bad\u7ec3',
    fretboard_desc: '\u7ec3\u4e60\u8bb0\u5fc6\u6307\u677f\u4e0a\u7684\u97f3\u7b26\u3002',
    fretboard_toggle: '\u663e\u793a/\u9690\u85cf\u97f3\u540d',
    fretboard_quiz_title: '\u6307\u677f\u6d4b\u9a8c',
    fretboard_new_q: '\u4e0b\u4e00\u9898',
    fretboard_reveal: '\u663e\u793a\u7b54\u6848',
    fretboard_answer: '\u7b54\u6848:',
    prog_title: '\u548c\u5f26\u8fdb\u884c',
    prog_desc: '\u5e38\u89c1\u548c\u5f26\u8fdb\u884c\u53ca\u5176\u98ce\u683c\u3002',
    prog_key_label: '\u8c03:',
    prog_play: '\u64ad\u653e',
    metro_title: '\u8282\u62cd\u5668',
    metro_bpm_label: 'BPM',
    metro_beats_label: '\u62cd:',
    metro_start: '\u5f00\u59cb',
    metro_stop: '\u505c\u6b62',
    metro_tap: '\u70b9\u51fb\u8282\u62cd',
    tuner_title: '\u5409\u4ed6\u8c03\u97f3\u5668',
    tuner_desc: '\u5f39\u594f\u5409\u4ed6\u5f26 \u2014 \u9ea6\u514b\u98ce\u5b9e\u65f6\u68c0\u6d4b\u97f3\u9ad8\u3002',
    tuner_default: '\u70b9\u51fb\u5f26',
    quiz_title: '\u548c\u5f26\u6d4b\u9a8c',
    quiz_desc: '\u4ece\u56fe\u8868\u731c\u548c\u5f26\uff01',
    quiz_start: '\u5f00\u59cb\u6d4b\u9a8c',
    quiz_idle: '\u70b9\u51fb\u201c\u5f00\u59cb\u6d4b\u9a8c\u201d',
    quiz_score: '\u5f97\u5206:',
    ear_title: '\u542c\u97f3\u8bad\u7ec3',
    ear_desc: '\u8bad\u7ec3\u8fa8\u522b\u97f3\u7a0b\uff01',
    ear_start: '\u5f00\u59cb',
    ear_question: '\u4f60\u542c\u5230\u4e86\u4ec0\u4e48\u97f3\u7a0b\uff1f',
    ear_replay: '\u91cd\u64ad',
    ear_score: '\u5f97\u5206:',
    int_root: '\u6839\u97f3',
    int_m2: '\u5c0f\u4e8c\u5ea6',
    int_M2: '\u5927\u4e8c\u5ea6',
    int_m3: '\u5c0f\u4e09\u5ea6',
    int_M3: '\u5927\u4e09\u5ea6',
    int_P4: '\u7eaf\u56db\u5ea6',
    int_tt: '\u4e09\u5168\u97f3',
    int_P5: '\u7eaf\u4e94\u5ea6',
    int_m6: '\u5c0f\u516d\u5ea6',
    int_M6: '\u5927\u516d\u5ea6',
    int_m7: '\u5c0f\u4e03\u548c',
    int_M7: '\u5927\u4e03\u548c',
    int_oct: '\u516b\u5ea6',
    genre_rock: '\u6447\u6eda/\u6d41\u884c/\u5e03\u9c81\u65af',
    genre_pop: '\u6d41\u884c',
    genre_jazz: '\u7235\u58eb',
    genre_50s: '50\u5e74\u4ee3\u8fdb\u884c',
    genre_modern_pop: '\u73b0\u4ee3\u6d41\u884c',
    genre_pop_rock: '\u6d41\u884c\u6447\u6eda',
    genre_classic_rock: '\u7ecf\u5178\u6447\u6eda',
    genre_epic: '\u53f2\u8bd7/\u52a8\u6f2b (m)',
    genre_minor_blues: '\u5c0f\u8c03\u5e03\u9c81\u65af',
    genre_country: '\u4e61\u6751/\u6c11\u8c23',
    genre_classic_rock2: '\u7ecf\u5178\u6447\u6eda (Maiden)',
    genre_jazz_ext: '\u7235\u58eb\u6269\u5c55',
    legend_root: '\u6839\u97f3',
    legend_3rd: '\u4e09\u5ea6',
    legend_4th: '\u56db\u5ea6',
    legend_5th: '\u4e94\u5ea6',
    legend_6th: '\u516d\u5ea6',
    legend_7th: '\u4e03\u5ea6',
  },

  // ── SPANISH ─────────────────────────────────────────
  es: {
    tuning_label: 'Afinaci\u00f3n',
    lang_label: 'Idioma',
    tab_chords: 'Acordes',
    tab_family: 'Familia',
    tab_scales: 'Escalas',
    tab_fretboard: 'Mastil',
    tab_progressions: 'Progresiones',
    tab_metronome: 'Metr\u00f3nomo',
    tab_tuner: 'Afinador',
    tab_quiz: 'Quiz',
    tab_ear: 'O\u00eddo',
    chords_title: 'Biblioteca de Acordes',
    chords_desc: 'Haz clic en un acorde para escucharlo.',
    chords_search: 'Buscar acordes... (C, Am, G7)',
    chords_all_types: 'Todos',
    type_major: 'Mayor',
    type_minor: 'Menor',
    type_7: '7\u00aa Dominante',
    type_maj7: 'Mayor 7',
    type_m7: 'Menor 7',
    type_sus: 'Sus',
    type_dim: 'Disminuido',
    type_aug: 'Aumentado',
    type_add9: 'Add9',
    type_power: 'Power',
    family_title: 'Familia de Acordes',
    family_desc: 'Todos los acordes de una tonalidad.',
    family_key_label: 'Tonalidad:',
    scales_title: 'Explorador de Escalas',
    scales_desc: 'Aprende escalas en el m\u00e1stil.',
    scales_root_label: 'Ra\u00edz:',
    scales_scale_label: 'Escala:',
    scales_formula: 'Intervalos:',
    scales_full: 'M\u00e1stil Completo',
    scales_full_scroll: 'M\u00e1stil Completo (scroll \u2192)',
    scales_per_section: 'Por Secciones',
    scales_fret_label: 'Traste',
    scales_open: 'Al aire',
    fretboard_title: 'Entrenador de M\u00e1stil',
    fretboard_desc: 'Practica memorizando las notas.',
    fretboard_toggle: 'Mostrar/Ocultar Notas',
    fretboard_quiz_title: 'Quiz de M\u00e1stil',
    fretboard_new_q: 'Siguiente',
    fretboard_reveal: 'Ver Respuesta',
    fretboard_answer: 'Respuesta:',
    prog_title: 'Progresiones de Acordes',
    prog_desc: 'Progresiones populares con ejemplos.',
    prog_key_label: 'Tonalidad:',
    prog_play: 'Tocar',
    metro_title: 'Metr\u00f3nomo',
    metro_bpm_label: 'BPM',
    metro_beats_label: 'Tiempo:',
    metro_start: 'INICIAR',
    metro_stop: 'PARAR',
    metro_tap: 'TAP TEMPO',
    tuner_title: 'Afinador de Guitarra',
    tuner_desc: 'Toca una cuerda \u2014 el afinador detecta el tono en tiempo real con el micr\u00f3fono.',
    tuner_default: 'Haz clic en una cuerda',
    quiz_title: 'Quiz de Acordes',
    quiz_desc: '\u00a1Adivina el acorde!',
    quiz_start: 'Iniciar Quiz',
    quiz_idle: 'Haz clic en "Iniciar Quiz"',
    quiz_score: 'Puntos:',
    ear_title: 'Entrenamiento Auditivo',
    ear_desc: '\u00a1Entrena tu o\u00eddo!',
    ear_start: 'Iniciar',
    ear_question: '\u00bfQu\u00e9 intervalo escuchaste?',
    ear_replay: 'Repetir',
    ear_score: 'Puntos:',
    int_root: 'Ra\u00edz',
    int_m2: '2\u00aa menor',
    int_M2: '2\u00aa mayor',
    int_m3: '3\u00aa menor',
    int_M3: '3\u00aa mayor',
    int_P4: '4\u00aa justa',
    int_tt: 'Tritono',
    int_P5: '5\u00aa justa',
    int_m6: '6\u00aa menor',
    int_M6: '6\u00aa mayor',
    int_m7: '7\u00aa menor',
    int_M7: '7\u00aa mayor',
    int_oct: 'Octava',
    genre_rock: 'Rock / Pop / Blues',
    genre_pop: 'Pop (Axis of Awesome)',
    genre_jazz: 'Jazz',
    genre_50s: 'Progresi\u00f3n de los 50',
    genre_modern_pop: 'Pop Moderno',
    genre_pop_rock: 'Pop Rock',
    genre_classic_rock: 'Rock Cl\u00e1sico',
    genre_epic: '\u00c9pico / Anime (m)',
    genre_minor_blues: 'Blues Menor',
    genre_country: 'Country / Folk',
    genre_classic_rock2: 'Rock Cl\u00e1sico (Maiden)',
    genre_jazz_ext: 'Jazz Extendido',
    legend_root: 'Ra\u00edz',
    legend_3rd: '3\u00aa',
    legend_4th: '4\u00aa',
    legend_5th: '5\u00aa',
    legend_6th: '6\u00aa',
    legend_7th: '7\u00aa',
  },

  // ── PORTUGUESE (BR) ─────────────────────────────────
  pt: {
    tuning_label: 'Afina\u00e7\u00e3o',
    lang_label: 'Idioma',
    tab_chords: 'Acordes',
    tab_family: 'Fam\u00edlia',
    tab_scales: 'Escalas',
    tab_fretboard: 'Bra\u00e7o',
    tab_progressions: 'Progress\u00f5es',
    tab_metronome: 'Metr\u00f4nomo',
    tab_tuner: 'Afinador',
    tab_quiz: 'Quiz',
    tab_ear: 'Treino Auditivo',
    chords_title: 'Biblioteca de Acordes',
    chords_desc: 'Clique num acorde para ouvir.',
    chords_search: 'Buscar acordes... (C, Am, G7)',
    chords_all_types: 'Todos',
    type_major: 'Maior',
    type_minor: 'Menor',
    type_7: '7\u00aa Dominante',
    type_maj7: 'Maior 7',
    type_m7: 'Menor 7',
    type_sus: 'Sus',
    type_dim: 'Diminuto',
    type_aug: 'Aumentado',
    type_add9: 'Add9',
    type_power: 'Power',
    family_title: 'Fam\u00edlia de Acordes',
    family_desc: 'Todos os acordes de uma tonalidade.',
    family_key_label: 'Tom:',
    scales_title: 'Explorador de Escalas',
    scales_desc: 'Aprenda escalas no bra\u00e7o.',
    scales_root_label: 'Raiz:',
    scales_scale_label: 'Escala:',
    scales_formula: 'Intervalos:',
    scales_full: 'Bra\u00e7o Completo',
    scales_full_scroll: 'Bra\u00e7o Completo (rolar \u2192)',
    scales_per_section: 'Por Se\u00e7\u00f5es',
    scales_fret_label: 'Casa',
    scales_open: 'Solta',
    fretboard_title: 'Treino de Bra\u00e7o',
    fretboard_desc: 'Pratique memorizando as notas.',
    fretboard_toggle: 'Mostrar/Esconder Notas',
    fretboard_quiz_title: 'Quiz de Bra\u00e7o',
    fretboard_new_q: 'Pr\u00f3xima',
    fretboard_reveal: 'Ver Resposta',
    fretboard_answer: 'Resposta:',
    prog_title: 'Progress\u00f5es de Acordes',
    prog_desc: 'Progress\u00f5es populares.',
    prog_key_label: 'Tom:',
    prog_play: 'Tocar',
    metro_title: 'Metr\u00f4nomo',
    metro_bpm_label: 'BPM',
    metro_beats_label: 'Batidas:',
    metro_start: 'INICIAR',
    metro_stop: 'PARAR',
    metro_tap: 'TAP TEMPO',
    tuner_title: 'Afinador de Viol\u00e3o',
    tuner_desc: 'Toque uma corda \u2014 o afinador detecta o tom em tempo real com o microfone.',
    tuner_default: 'Clique numa corda',
    quiz_title: 'Quiz de Acordes',
    quiz_desc: 'Adivinhe o acorde!',
    quiz_start: 'Iniciar Quiz',
    quiz_idle: 'Clique em "Iniciar Quiz"',
    quiz_score: 'Pontos:',
    ear_title: 'Treino Auditivo',
    ear_desc: 'Treine seu ouvido!',
    ear_start: 'Iniciar',
    ear_question: 'Qual intervalo voc\u00ea ouviu?',
    ear_replay: 'Repetir',
    ear_score: 'Pontos:',
    int_root: 'Raiz',
    int_m2: '2\u00aa menor',
    int_M2: '2\u00aa maior',
    int_m3: '3\u00aa menor',
    int_M3: '3\u00aa maior',
    int_P4: '4\u00aa justa',
    int_tt: 'Tr\u00edtono',
    int_P5: '5\u00aa justa',
    int_m6: '6\u00aa menor',
    int_M6: '6\u00aa maior',
    int_m7: '7\u00aa menor',
    int_M7: '7\u00aa maior',
    int_oct: 'Oitava',
    genre_rock: 'Rock / Pop / Blues',
    genre_pop: 'Pop (Axis of Awesome)',
    genre_jazz: 'Jazz',
    genre_50s: 'Progress\u00e3o dos 50',
    genre_modern_pop: 'Pop Moderno',
    genre_pop_rock: 'Pop Rock',
    genre_classic_rock: 'Rock Cl\u00e1ssico',
    genre_epic: '\u00c9pico / Anime (m)',
    genre_minor_blues: 'Blues Menor',
    genre_country: 'Country / Folk',
    genre_classic_rock2: 'Rock Cl\u00e1ssico (Maiden)',
    genre_jazz_ext: 'Jazz Estendido',
    legend_root: 'Raiz',
    legend_3rd: '3\u00aa',
    legend_4th: '4\u00aa',
    legend_5th: '5\u00aa',
    legend_6th: '6\u00aa',
    legend_7th: '7\u00aa',
  },
};

// ── Language detection ───────────────────────────────
const SUPPORTED_LANGS = Object.keys(TRANSLATIONS);
const LANG_NAMES = {
  en: 'English', id: 'Indonesia', ja: '\u65e5\u672c\u8a9e', ko: '\ud55c\uad6d\uc5b4',
  zh: '\u4e2d\u6587', es: 'Espa\u00f1ol', pt: 'Portugu\u00eas'
};

function detectLanguage() {
  // Check saved preference first
  const saved = localStorage.getItem('guitarlab-lang');
  if (saved && TRANSLATIONS[saved]) return saved;

  // Auto-detect from browser
  const browserLangs = navigator.languages || [navigator.language || 'en'];
  for (const bl of browserLangs) {
    const code = bl.toLowerCase().split('-')[0];
    if (TRANSLATIONS[code]) return code;
  }
  return 'en'; // fallback
}

let currentLang = detectLanguage();

function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key])
    || (TRANSLATIONS['en'] && TRANSLATIONS['en'][key])
    || key;
}

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('guitarlab-lang', lang);
  applyTranslations();
}

function applyTranslations() {
  // Header
  const tuningLabel = document.querySelector('.tuning-box label');
  if (tuningLabel) tuningLabel.textContent = t('tuning_label');

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const key = 'tab_' + btn.dataset.tab.replace('tab-', '');
    const translated = t(key);
    if (translated !== key) btn.textContent = translated;
  });

  // Chords tab
  setText('.section-title', t('chords_title'), '#tab-chords');
  setText('.section-desc', t('chords_desc'), '#tab-chords');
  setPlaceholder('#chord-filter', t('chords_search'));
  setOptionText('#chord-type-filter', '', t('chords_all_types'));
  setOptionText('#chord-type-filter', 'major', t('type_major'));
  setOptionText('#chord-type-filter', 'minor', t('type_minor'));
  setOptionText('#chord-type-filter', '7', t('type_7'));
  setOptionText('#chord-type-filter', 'maj7', t('type_maj7'));
  setOptionText('#chord-type-filter', 'm7', t('type_m7'));
  setOptionText('#chord-type-filter', 'sus', t('type_sus'));
  setOptionText('#chord-type-filter', 'dim', t('type_dim'));
  setOptionText('#chord-type-filter', 'aug', t('type_aug'));
  setOptionText('#chord-type-filter', 'add9', t('type_add9'));
  setOptionText('#chord-type-filter', 'power', t('type_power'));

  // Family tab
  setText('.section-title', t('family_title'), '#tab-family');
  setText('.section-desc', t('family_desc'), '#tab-family');
  setTextEl(document.querySelector('#tab-family .family-controls label'), t('family_key_label'));

  // Scales tab
  setText('.section-title', t('scales_title'), '#tab-scales');
  setText('.section-desc', t('scales_desc'), '#tab-scales');
  const scaleLabels = document.querySelectorAll('#tab-scales .scale-controls label');
  if (scaleLabels[0]) scaleLabels[0].textContent = t('tuning_label') + ':';
  if (scaleLabels[1]) scaleLabels[1].textContent = t('scales_root_label');
  if (scaleLabels[2]) scaleLabels[2].textContent = t('scales_scale_label');
  updateScaleFormula();

  // Fretboard tab
  setText('.section-title', t('fretboard_title'), '#tab-fretboard');
  setText('.section-desc', t('fretboard_desc'), '#tab-fretboard');
  const toggleBtn = document.getElementById('fretboard-toggle-notes');
  if (toggleBtn) toggleBtn.textContent = t('fretboard_toggle');
  const fbQuizTitle = document.querySelector('#tab-fretboard .fb-quiz-area h3');
  if (fbQuizTitle) fbQuizTitle.textContent = t('fretboard_quiz_title');
  const newQBtn = document.getElementById('fb-quiz-start');
  if (newQBtn) newQBtn.textContent = t('fretboard_new_q');
  const revealBtn = document.getElementById('fb-quiz-reveal');
  if (revealBtn) revealBtn.textContent = t('fretboard_reveal');

  // Progressions tab
  setText('.section-title', t('prog_title'), '#tab-progressions');
  setText('.section-desc', t('prog_desc'), '#tab-progressions');
  setTextEl(document.querySelector('#tab-progressions .prog-controls label'), t('prog_key_label'));

  // Metronome tab
  setText('.section-title', t('metro_title'), '#tab-metronome');
  const metroBpmLabel = document.querySelector('.metro-bpm-label');
  if (metroBpmLabel) metroBpmLabel.textContent = t('metro_bpm_label');
  const metroBeatsLabel = document.querySelector('#tab-metronome .metro-controls label');
  if (metroBeatsLabel) metroBeatsLabel.textContent = t('metro_beats_label');
  updateMetroButton();
  const tapBtn = document.getElementById('metro-tap');
  if (tapBtn) tapBtn.textContent = t('metro_tap');

  // Tuner tab
  setText('.section-title', t('tuner_title'), '#tab-tuner');
  setText('.section-desc', t('tuner_desc'), '#tab-tuner');
  const tunerDisplay = document.getElementById('tuner-display');
  if (tunerDisplay && tunerDisplay.textContent.includes('Klik') || tunerDisplay && tunerDisplay.textContent.includes('Click'))
    tunerDisplay.textContent = t('tuner_default');

  // Quiz tab
  setText('.section-title', t('quiz_title'), '#tab-quiz');
  setText('.section-desc', t('quiz_desc'), '#tab-quiz');
  const quizStartBtn = document.getElementById('quiz-start');
  if (quizStartBtn) quizStartBtn.textContent = t('quiz_start');
  const quizIdle = document.querySelector('#quiz-display span');
  if (quizIdle) quizIdle.textContent = t('quiz_idle');

  // Ear training tab
  setText('.section-title', t('ear_title'), '#tab-ear');
  setText('.section-desc', t('ear_desc'), '#tab-ear');
  const earStartBtn = document.getElementById('ear-start');
  if (earStartBtn) earStartBtn.textContent = t('ear_start');
  const earReplayBtn = document.getElementById('ear-replay');
  if (earReplayBtn) earReplayBtn.innerHTML = '\uD83D\uDD0A ' + t('ear_replay');

  // Legend
  const legendItems = document.querySelectorAll('.legend-item');
  const legendKeys = ['legend_root', 'legend_3rd', 'legend_4th', 'legend_5th', 'legend_6th', 'legend_7th'];
  legendItems.forEach((item, i) => {
    if (legendKeys[i]) {
      const textNode = item.childNodes[item.childNodes.length - 1];
      if (textNode) textNode.textContent = ' ' + t(legendKeys[i]);
    }
  });

  // Fretboard section labels (re-render fretboards to update labels)
  if (typeof renderScaleExplorer === 'function') renderScaleExplorer();
  if (typeof renderFullFretboard === 'function') renderFullFretboard();
  if (typeof renderProgressions === 'function') renderProgressions();
}

// ── Helper functions ─────────────────────────────────
function setText(selector, text, parentSel) {
  const parent = parentSel ? document.querySelector(parentSel) : document;
  if (!parent) return;
  const el = parent.querySelector(selector);
  if (el) el.textContent = text;
}

function setTextEl(el, text) {
  if (el) el.textContent = text;
}

function setPlaceholder(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.placeholder = text;
}

function setOptionText(selector, value, text) {
  const el = document.querySelector(selector);
  if (!el) return;
  const opt = el.querySelector('option[value="' + value + '"]');
  if (opt) opt.textContent = text;
}

function updateScaleFormula() {
  const formula = document.getElementById('scale-formula');
  if (formula && formula.textContent) {
    const parts = formula.textContent.split(':');
    if (parts.length > 1) {
      formula.textContent = t('scales_formula') + parts[1];
    }
  }
}

function updateMetroButton() {
  const btn = document.getElementById('metro-start');
  if (!btn) return;
  if (metronomeRunning) {
    btn.textContent = t('metro_stop');
  } else {
    btn.textContent = t('metro_start');
  }
}

// Create language selector
function createLangSelector() {
  const container = document.createElement('div');
  container.className = 'tuning-box lang-box';

  const label = document.createElement('label');
  label.textContent = t('lang_label');

  const sel = document.createElement('select');
  sel.className = 'neo-select';
  sel.id = 'lang-select';

  SUPPORTED_LANGS.forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.textContent = LANG_NAMES[lang] || lang;
    if (lang === currentLang) opt.selected = true;
    sel.appendChild(opt);
  });

  sel.addEventListener('change', () => setLanguage(sel.value));

  container.appendChild(label);
  container.appendChild(sel);
  return container;
}
