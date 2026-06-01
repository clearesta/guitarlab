// ═══════════════════════════════════════════════════════
// GUITAR DATA - Chords, Scales, Tunings, Progressions
// ═══════════════════════════════════════════════════════

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NOTES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// ── Tunings ──────────────────────────────────────────
const TUNINGS = {
  // Standard tunings
  'E Standard':       ['E', 'A', 'D', 'G', 'B', 'E'],
  'Eb Standard':      ['D#','G#','C#','F#','A#','D#'],
  'D Standard':       ['D', 'G', 'C', 'F', 'A', 'D'],
  'C# Standard':      ['C#','F#','B', 'E', 'G#','C#'],
  'C Standard':       ['C', 'F', 'Bb','Eb','G', 'C'],
  'B Standard':       ['B', 'E', 'A', 'D', 'F#','B'],
  // Drop tunings
  'Drop D':           ['D', 'A', 'D', 'G', 'B', 'E'],
  'Drop C#':          ['C#','G#','C#','F#','A#','D#'],
  'Drop C':           ['C', 'G', 'C', 'F', 'A', 'D'],
  'Drop B':           ['B', 'F#','B', 'E', 'G#','C#'],
  'Drop A':           ['A', 'E', 'A', 'D', 'F#','B'],
  'Drop A#':          ['A#','F', 'A#','D#','G', 'C'],
  'Drop G':           ['G', 'D', 'G', 'C', 'E', 'A'],
  // Half/Whole step
  'Half Step Down':   ['D#','G#','C#','F#','A#','D#'],
  'Whole Step Down':  ['D', 'G', 'C', 'F', 'A', 'D'],
  '1.5 Step Down':    ['C#','F#','B', 'E', 'G#','C#'],
  '2 Steps Down':     ['C', 'F', 'Bb','Eb','G', 'C'],
  // Open tunings
  'Open D':           ['D', 'A', 'D', 'F#','A', 'D'],
  'Open E':           ['E', 'B', 'E', 'G#','B', 'E'],
  'Open G':           ['D', 'G', 'D', 'G', 'B', 'D'],
  'Open A':           ['E', 'A', 'E', 'A', 'C#','E'],
  'Open C':           ['C', 'G', 'C', 'G', 'C', 'E'],
  'Open F':           ['F', 'A', 'C', 'F', 'C', 'F'],
  // Modal / Alternate
  'DADGAD':           ['D', 'A', 'D', 'G', 'A', 'D'],
  'Double Drop D':    ['D', 'A', 'D', 'G', 'B', 'D'],
  'New Standard (NST)': ['C', 'G', 'D', 'A', 'E', 'G'],
  'All Fourths':      ['E', 'A', 'D', 'G', 'C', 'F'],
  'All Fifths':       ['C', 'G', 'D', 'A', 'E', 'B'],
  // Bass-range / Baritone
  'Baritone B Standard': ['B', 'E', 'A', 'D', 'F#','B'],
  'Baritone A Standard': ['A', 'D', 'G', 'C', 'E', 'A'],
};

// ── Chords ───────────────────────────────────────────
// Format: [fret positions per string, low E to high E]
// -1 = muted, 0 = open, N = fret number
// finger positions for diagram: [finger per string] 0=none
const CHORDS = {
  // Major
  'C':    { frets: [-1,3,2,0,1,0], fingers: [0,3,2,0,1,0], name: 'C Major' },
  'D':    { frets: [-1,-1,0,2,3,2], fingers: [0,0,0,1,3,2], name: 'D Major' },
  'E':    { frets: [0,2,2,1,0,0], fingers: [0,2,3,1,0,0], name: 'E Major' },
  'F':    { frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], name: 'F Major', barre: 1 },
  'G':    { frets: [3,2,0,0,0,3], fingers: [2,1,0,0,0,3], name: 'G Major' },
  'A':    { frets: [-1,0,2,2,2,0], fingers: [0,0,1,2,3,0], name: 'A Major' },
  'B':    { frets: [-1,2,4,4,4,2], fingers: [0,1,2,3,4,1], name: 'B Major', barre: 2 },
  'Bb':   { frets: [-1,1,3,3,3,1], fingers: [0,1,2,3,4,1], name: 'Bb Major', barre: 1 },
  'F#':   { frets: [2,4,4,3,2,2], fingers: [1,3,4,2,1,1], name: 'F# Major', barre: 2 },
  'Ab':   { frets: [4,6,6,5,4,4], fingers: [1,3,4,2,1,1], name: 'Ab Major', barre: 4 },
  'Eb':   { frets: [-1,-1,1,3,4,3], fingers: [0,0,1,2,4,3], name: 'Eb Major' },
  'Db':   { frets: [-1,-1,1,1,1,4], fingers: [0,0,1,1,1,4], name: 'Db Major' },
  // Minor
  'Am':   { frets: [-1,0,2,2,1,0], fingers: [0,0,2,3,1,0], name: 'A Minor' },
  'Bm':   { frets: [-1,2,4,4,3,2], fingers: [0,1,3,4,2,1], name: 'B Minor', barre: 2 },
  'Cm':   { frets: [-1,3,5,5,4,3], fingers: [0,1,3,4,2,1], name: 'C Minor', barre: 3 },
  'Dm':   { frets: [-1,-1,0,2,3,1], fingers: [0,0,0,2,3,1], name: 'D Minor' },
  'Em':   { frets: [0,2,2,0,0,0], fingers: [0,2,3,0,0,0], name: 'E Minor' },
  'Fm':   { frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], name: 'F Minor', barre: 1 },
  'Gm':   { frets: [3,5,5,3,3,3], fingers: [1,3,4,1,1,1], name: 'G Minor', barre: 3 },
  'Bbm':  { frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], name: 'Bb Minor', barre: 1 },
  'F#m':  { frets: [2,4,4,2,2,2], fingers: [1,3,4,1,1,1], name: 'F# Minor', barre: 2 },
  'C#m':  { frets: [-1,4,6,6,5,4], fingers: [0,1,3,4,2,1], name: 'C# Minor', barre: 4 },
  'Ebm':  { frets: [-1,-1,1,3,4,2], fingers: [0,0,1,3,4,2], name: 'Eb Minor' },
  // 7th
  'A7':   { frets: [-1,0,2,0,2,0], fingers: [0,0,1,0,2,0], name: 'A7' },
  'B7':   { frets: [-1,2,1,2,0,2], fingers: [0,2,1,3,0,4], name: 'B7' },
  'C7':   { frets: [-1,3,2,3,1,0], fingers: [0,3,2,4,1,0], name: 'C7' },
  'D7':   { frets: [-1,-1,0,2,1,2], fingers: [0,0,0,2,1,3], name: 'D7' },
  'E7':   { frets: [0,2,0,1,0,0], fingers: [0,2,0,1,0,0], name: 'E7' },
  'F7':   { frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], name: 'F7', barre: 1 },
  'G7':   { frets: [3,2,0,0,0,1], fingers: [3,2,0,0,0,1], name: 'G7' },
  'Am7':  { frets: [-1,0,2,0,1,0], fingers: [0,0,2,0,1,0], name: 'Am7' },
  'Dm7':  { frets: [-1,-1,0,2,1,1], fingers: [0,0,0,2,1,1], name: 'Dm7' },
  'Em7':  { frets: [0,2,2,0,3,0], fingers: [0,2,3,0,4,0], name: 'Em7' },
  'Gm7':  { frets: [3,5,3,3,3,3], fingers: [1,3,1,1,1,1], name: 'Gm7', barre: 3 },
  // Major 7
  'Cmaj7': { frets: [-1,3,2,0,0,0], fingers: [0,3,2,0,0,0], name: 'Cmaj7' },
  'Dmaj7': { frets: [-1,-1,0,2,2,2], fingers: [0,0,0,1,1,1], name: 'Dmaj7' },
  'Fmaj7': { frets: [-1,-1,3,2,1,0], fingers: [0,0,3,2,1,0], name: 'Fmaj7' },
  'Gmaj7': { frets: [3,2,0,0,0,2], fingers: [3,2,0,0,0,1], name: 'Gmaj7' },
  'Amaj7': { frets: [-1,0,2,1,2,0], fingers: [0,0,2,1,3,0], name: 'Amaj7' },
  // Minor 7
  'Cm7':  { frets: [-1,3,5,3,4,3], fingers: [0,1,3,1,2,1], name: 'Cm7', barre: 3 },
  'F#m7': { frets: [2,4,2,2,2,2], fingers: [1,3,1,1,1,1], name: 'F#m7', barre: 2 },
  // Sus
  'Asus2': { frets: [-1,0,2,2,0,0], fingers: [0,0,1,2,0,0], name: 'Asus2' },
  'Asus4': { frets: [-1,0,2,2,3,0], fingers: [0,0,1,2,3,0], name: 'Asus4' },
  'Dsus2': { frets: [-1,-1,0,2,3,0], fingers: [0,0,0,1,2,0], name: 'Dsus2' },
  'Dsus4': { frets: [-1,-1,0,2,3,3], fingers: [0,0,0,1,2,3], name: 'Dsus4' },
  'Esus4': { frets: [0,2,2,2,0,0], fingers: [0,1,2,3,0,0], name: 'Esus4' },
  'Bsus4': { frets: [-1,2,4,4,5,2], fingers: [0,1,2,3,4,1], name: 'Bsus4', barre: 2 },
  // Diminished
  'Bdim':  { frets: [-1,2,0,1,0,1], fingers: [0,2,0,1,0,3], name: 'Bdim' },
  'Cdim':  { frets: [-1,3,4,2,4,2], fingers: [0,2,3,1,4,1], name: 'Cdim' },
  'Ddim':  { frets: [-1,-1,0,1,0,1], fingers: [0,0,0,1,0,2], name: 'Ddim' },
  'Edim':  { frets: [-1,2,0,1,0,0], fingers: [0,1,0,2,0,0], name: 'Edim' },
  // Augmented
  'Aaug':  { frets: [-1,0,3,2,2,1], fingers: [0,0,3,1,1,2], name: 'Aaug' },
  'Caug':  { frets: [-1,3,2,1,1,0], fingers: [0,3,2,1,1,0], name: 'Caug' },
  // Add9
  'Cadd9': { frets: [-1,3,2,0,3,0], fingers: [0,2,1,0,3,0], name: 'Cadd9' },
  'Dadd9': { frets: [-1,-1,0,2,3,0], fingers: [0,0,0,1,2,0], name: 'Dadd9' },
  'Gadd9': { frets: [3,2,0,2,0,3], fingers: [2,1,0,3,0,4], name: 'Gadd9' },
  // Power chords (5th)
  'E5':    { frets: [0,2,2,-1,-1,-1], fingers: [0,1,2,0,0,0], name: 'E5 (Power)' },
  'A5':    { frets: [-1,0,2,2,-1,-1], fingers: [0,0,1,2,0,0], name: 'A5 (Power)' },
  'D5':    { frets: [-1,-1,0,2,3,-1], fingers: [0,0,0,1,2,0], name: 'D5 (Power)' },
  'G5':    { frets: [3,5,5,-1,-1,-1], fingers: [1,3,4,0,0,0], name: 'G5 (Power)' },
  'C5':    { frets: [-1,3,5,5,-1,-1], fingers: [0,1,3,4,0,0], name: 'C5 (Power)' },
  'F5':    { frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], name: 'F5 (Power)' },
  'B5':    { frets: [-1,2,4,4,-1,-1], fingers: [0,1,3,4,0,0], name: 'B5 (Power)' },
};

// ── Chord Family ─────────────────────────────────────
const CHORD_FAMILIES = {
  'C':  { major: ['C','Dm','Em','F','G','Am','Bdim'],  dominant7: ['C7','Dm7','Em7','Fmaj7','G7','Am7','Bm7b5'] },
  'C#': { major: ['C#','D#m','E#m','F#','G#','A#m','B#dim'], dominant7: ['C#7','D#m7','E#m7','F#maj7','G#7','A#m7','B#m7b5'] },
  'D':  { major: ['D','Em','F#m','G','A','Bm','C#dim'], dominant7: ['D7','Em7','F#m7','Gmaj7','A7','Bm7','C#m7b5'] },
  'Eb': { major: ['Eb','Fm','Gm','Ab','Bb','Cm','Ddim'], dominant7: ['Eb7','Fm7','Gm7','Abmaj7','Bb7','Cm7','Dm7b5'] },
  'E':  { major: ['E','F#m','G#m','A','B','C#m','D#dim'], dominant7: ['E7','F#m7','G#m7','Amaj7','B7','C#m7','D#m7b5'] },
  'F':  { major: ['F','Gm','Am','Bb','C','Dm','Edim'], dominant7: ['F7','Gm7','Am7','Bbmaj7','C7','Dm7','Em7b5'] },
  'F#': { major: ['F#','G#m','A#m','B','C#','D#m','E#dim'], dominant7: ['F#7','G#m7','A#m7','Bmaj7','C#7','D#m7','E#m7b5'] },
  'G':  { major: ['G','Am','Bm','C','D','Em','F#dim'], dominant7: ['G7','Am7','Bm7','Cmaj7','D7','Em7','F#m7b5'] },
  'Ab': { major: ['Ab','Bbm','Cm','Db','Eb','Fm','Gdim'], dominant7: ['Ab7','Bbm7','Cm7','Dbmaj7','Eb7','Fm7','Gm7b5'] },
  'A':  { major: ['A','Bm','C#m','D','E','F#m','G#dim'], dominant7: ['A7','Bm7','C#m7','Dmaj7','E7','F#m7','G#m7b5'] },
  'Bb': { major: ['Bb','Cm','Dm','Eb','F','Gm','Adim'], dominant7: ['Bb7','Cm7','Dm7','Ebmaj7','F7','Gm7','Am7b5'] },
  'B':  { major: ['B','C#m','D#m','E','F#','G#m','A#dim'], dominant7: ['B7','C#m7','D#m7','Emaj7','F#7','G#m7','A#m7b5'] },
};

// ── Scales ───────────────────────────────────────────
const SCALES = {
  'Major (Ionian)':       [0,2,4,5,7,9,11],
  'Minor (Aeolian)':      [0,2,3,5,7,8,10],
  'Pentatonic Major':     [0,2,4,7,9],
  'Pentatonic Minor':     [0,3,5,7,10],
  'Blues':                [0,3,5,6,7,10],
  'Dorian':               [0,2,3,5,7,9,10],
  'Phrygian':             [0,1,3,5,7,8,10],
  'Lydian':               [0,2,4,6,7,9,11],
  'Mixolydian':           [0,2,4,5,7,9,10],
  'Locrian':              [0,1,3,5,6,8,10],
  'Harmonic Minor':       [0,2,3,5,7,8,11],
  'Melodic Minor (Up)':   [0,2,3,5,7,9,11],
  'Whole Tone':           [0,2,4,6,8,10],
  'Chromatic':            [0,1,2,3,4,5,6,7,8,9,10,11],
  'Phrygian Dominant':    [0,1,4,5,7,8,10],
  'Hungarian Minor':      [0,2,3,6,7,8,11],
  'Japanese (Hirajoshi)': [0,2,3,7,8],
  'Arabic (Hijaz)':       [0,1,4,5,7,8,11],
  'Minor Pentatonic + b5':[0,3,5,6,7,10],
  'Bebop Dominant':       [0,2,4,5,7,9,10,11],
  'Super Locrian':        [0,1,3,4,6,8,10],
};

// ── Chord Progressions ───────────────────────────────
const PROGRESSIONS = {
  'I - IV - V':         { degrees: [0,3,4], example_key_C: ['C','F','G'], genreKey: 'genre_rock' },
  'I - V - vi - IV':    { degrees: [0,4,5,3], example_key_C: ['C','G','Am','F'], genreKey: 'genre_pop' },
  'ii - V - I':         { degrees: [1,4,0], example_key_C: ['Dm','G','C'], genreKey: 'genre_jazz' },
  'I - vi - IV - V':    { degrees: [0,5,3,4], example_key_C: ['C','Am','F','G'], genreKey: 'genre_50s' },
  'vi - IV - I - V':    { degrees: [5,3,0,4], example_key_C: ['Am','F','C','G'], genreKey: 'genre_modern_pop' },
  'I - IV - vi - V':    { degrees: [0,3,5,4], example_key_C: ['C','F','Am','G'], genreKey: 'genre_pop_rock' },
  'I - V - IV':         { degrees: [0,4,3], example_key_C: ['C','G','F'], genreKey: 'genre_classic_rock' },
  'i - VI - III - VII': { degrees: [0,5,2,6], example_key_C: ['Cm','Ab','Eb','Bb'], genreKey: 'genre_epic' },
  'i - iv - v':         { degrees: [0,3,4], example_key_C: ['Cm','Fm','Gm'], genreKey: 'genre_minor_blues' },
  'I - iii - IV - V':   { degrees: [0,2,3,4], example_key_C: ['C','Em','F','G'], genreKey: 'genre_country' },
  'I - bVII - IV - I':  { degrees: [0,6,3,0], example_key_C: ['C','Bb','F','C'], genreKey: 'genre_classic_rock2' },
  'ii - V - I - vi':    { degrees: [1,4,0,5], example_key_C: ['Dm','G','C','Am'], genreKey: 'genre_jazz_ext' },
};

// ── Intervals ────────────────────────────────────────
const INTERVALS = {
  0: 'R', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4',
  6: 'b5', 7: '5', 8: '#5', 9: '6', 10: 'b7', 11: '7'
};

const INTERVAL_COLORS = {
  'R':  '#c45c4a',
  'b2': '#b8714a',
  '2':  '#c9a84c',
  'b3': '#6b9e6b',
  '3':  '#5a8a5a',
  '4':  '#4a7c9b',
  'b5': '#8b7ab8',
  '5':  '#c45c4a',
  '#5': '#b5654a',
  '6':  '#c9a84c',
  'b7': '#5a6e9b',
  '7':  '#6a8aad',
};

// ── Guitar String Frequencies (for Tuner) ────────────
const STRING_FREQUENCIES = {
  'Standard': [82.41, 110.00, 146.83, 196.00, 246.94, 329.63],
  'Drop D':   [73.42, 110.00, 146.83, 196.00, 246.94, 329.63],
};
