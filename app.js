// ═══════════════════════════════════════════════════════
// GUITAR LEARNING APP - Main Application Logic
// ═══════════════════════════════════════════════════════

// ── State ────────────────────────────────────────────
let currentTuning = 'E Standard';
let currentKey = 'C';
let currentScale = 'Major (Ionian)';
let fretboardNotes = [];
let metronomeInterval = null;
let metronomeBpm = 120;
let metronomeRunning = false;
let metronomeBeat = 0;
let metronomeBeatsPerMeasure = 4;
let audioCtx = null;

// ── Init ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTuningSelector();
  initChordLibrary();
  initChordFamily();
  initScaleExplorer();
  initFretboard();
  initMetronome();
  initTuner();
  initProgressions();
  initCircleOfFifths();

  // Apply translations after all init
  applyTranslations();

  // ── Landing page navigation ──
  initLandingNav();
  initDarkMode();
});

function getCSSVar(name) {
  // Read from body (not html) so body.dark overrides work
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function svgColor(varName, lightFallback, darkFallback) {
  const v = getCSSVar(varName);
  if (v) return v;
  return document.body.classList.contains('dark') ? darkFallback : lightFallback;
}

function initDarkMode() {
  const saved = localStorage.getItem('guitarlab-dark');
  if (saved === 'true') document.body.classList.add('dark');
  updateDarkToggle();

  document.getElementById('dark-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('guitarlab-dark', document.body.classList.contains('dark'));
    updateDarkToggle();
    // Re-render all SVGs with new colors
    if (typeof renderChordGrid === 'function') renderChordGrid();
    if (typeof renderChordFamily === 'function') renderChordFamily();
    if (typeof renderScaleExplorer === 'function') renderScaleExplorer();
    if (typeof renderFullFretboard === 'function') renderFullFretboard();
    if (typeof renderProgressions === 'function') renderProgressions();
    if (typeof drawCircle === 'function') drawCircle();
  });
}

function updateDarkToggle() {
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// ═══════════════════════════════════════════════════════
// LANDING PAGE NAVIGATION
// ═══════════════════════════════════════════════════════
function initLandingNav() {
  // All feature cards + hero buttons navigate to tab
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', () => {
      navigateToTab(el.dataset.navigate);
    });
  });

  // Home button
  const homeBtn = document.getElementById('home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      navigateHome();
    });
  }

  // Check URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('tab-' + hash)) {
    navigateToTab('tab-' + hash);
  }
}

function navigateToTab(tabId) {
  // Hide landing, show nav + tabs
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('app-nav').style.display = 'flex';
  document.getElementById('home-btn').classList.remove('hidden');

  // Activate the correct tab
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');

  const targetBtn = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
  if (targetBtn) {
    targetBtn.classList.add('active');
    targetBtn.setAttribute('aria-selected', 'true');
  }

  // Update URL hash
  window.location.hash = tabId.replace('tab-', '');
}

function navigateHome() {
  document.getElementById('landing').classList.remove('hidden');
  document.getElementById('app-nav').style.display = 'none';
  document.getElementById('home-btn').classList.add('hidden');
  // Hide ALL tab content
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  window.location.hash = '';
}

// ═══════════════════════════════════════════════════════
// TAB NAVIGATION
// ═══════════════════════════════════════════════════════
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// ═══════════════════════════════════════════════════════
// TUNING SELECTOR
// ═══════════════════════════════════════════════════════
function initTuningSelector() {
  const sel = document.getElementById('tuning-select');
  Object.keys(TUNINGS).forEach(t => {
    const opt = document.createElement('option');
    opt.value = t; opt.textContent = t + ' (' + TUNINGS[t].join(' ') + ')';
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => {
    currentTuning = sel.value;
    // Sync fretboard tuning selector
    const fbSel = document.getElementById('fb-tuning-select');
    if (fbSel) fbSel.value = currentTuning;
    refreshAll();
  });
}

// ═══════════════════════════════════════════════════════
// CHORD LIBRARY
// ═══════════════════════════════════════════════════════
function initChordLibrary() {
  renderChordGrid();
  document.getElementById('chord-filter').addEventListener('input', renderChordGrid);
  document.getElementById('chord-type-filter').addEventListener('change', renderChordGrid);
}

function renderChordGrid() {
  const filter = document.getElementById('chord-filter').value.toLowerCase();
  const typeFilter = document.getElementById('chord-type-filter').value;
  const grid = document.getElementById('chord-grid');
  grid.innerHTML = '';

  Object.entries(CHORDS).forEach(([key, chord]) => {
    const name = chord.name.toLowerCase();
    if (filter && !key.toLowerCase().includes(filter) && !name.includes(filter)) return;
    if (typeFilter && !name.includes(typeFilter)) return;

    const card = document.createElement('div');
    card.className = 'chord-card';
    card.innerHTML = '<div class="chord-name">' + key + '</div>' +
                     '<svg class="chord-diagram" viewBox="0 0 100 120" width="100" height="120">' +
                     drawChordDiagram(chord) + '</svg>' +
                     '<div class="chord-full-name">' + chord.name + '</div>';
    grid.appendChild(card);
  });
}

function drawChordDiagram(chord, size = 100) {
  const frets = chord.frets;
  const fingers = chord.fingers;
  const barre = chord.barre;
  const isDark = document.body.classList.contains('dark');
  const fg = isDark ? '#d4cfc5' : '#2d2a26';
  const lineC = isDark ? '#888' : '#aaa';
  const strC = isDark ? '#777' : '#888';
  const muted = isDark ? '#9a9488' : '#666';
  const cardC = isDark ? '#252320' : '#fff';
  const accentC = isDark ? '#d46a58' : '#c0392b';
  let svg = '';
  const startX = 15, startY = 25;
  const strSpace = 14, fretSpace = 16;

  // Nut / fret offset
  let minFret = 99;
  frets.forEach(f => { if (f > 0 && f < minFret) minFret = f; });
  let fretOffset = 0;
  let showNut = true;
  if (minFret > 3) {
    fretOffset = minFret - 1;
    showNut = false;
  }

  // Draw nut
  if (showNut) {
    svg += '<rect x="' + (startX - 2) + '" y="' + (startY - 2) + '" width="' + (strSpace * 5 + 4) + '" height="5" fill="' + fg + '" rx="1"/>';
  } else {
    svg += '<text x="' + (startX - 10) + '" y="' + (startY + fretSpace) + '" font-size="10" fill="' + muted + '" text-anchor="middle">' + minFret + '</text>';
  }

  // Fret lines
  for (let i = 0; i <= 5; i++) {
    const y = startY + 3 + i * fretSpace;
    svg += '<line x1="' + startX + '" y1="' + y + '" x2="' + (startX + 5 * strSpace) + '" y2="' + y + '" stroke="' + lineC + '" stroke-width="1"/>';
  }
  // String lines
  for (let i = 0; i < 6; i++) {
    const x = startX + i * strSpace;
    svg += '<line x1="' + x + '" y1="' + startY + '" x2="' + x + '" y2="' + (startY + 3 + 5 * fretSpace) + '" stroke="' + strC + '" stroke-width="' + (i < 3 ? 1.5 - i * 0.2 : 0.8) + '"/>';
  }

  // Barre
  if (barre) {
    const bf = barre - fretOffset;
    if (bf >= 1 && bf <= 5) {
      const y = startY + 3 + (bf - 0.5) * fretSpace;
      svg += '<rect x="' + startX + '" y="' + (y - 3) + '" width="' + (strSpace * 5) + '" height="6" fill="' + fg + '" rx="3"/>';
    }
  }

  // Dots
  for (let i = 0; i < 6; i++) {
    const x = startX + i * strSpace;
    const f = frets[i];
    if (f === -1) {
      svg += '<text x="' + x + '" y="' + (startY - 5) + '" font-size="11" fill="' + accentC + '" text-anchor="middle" font-weight="bold">X</text>';
    } else if (f === 0) {
      svg += '<circle cx="' + x + '" cy="' + (startY - 6) + '" r="4" fill="none" stroke="' + fg + '" stroke-width="1.5"/>';
    } else {
      const ff = f - fretOffset;
      if (ff >= 1 && ff <= 5) {
        const y = startY + 3 + (ff - 0.5) * fretSpace;
        svg += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + fg + '"/>';
        if (fingers[i] > 0) {
          svg += '<text x="' + x + '" y="' + (y + 3.5) + '" font-size="8" fill="' + cardC + '" text-anchor="middle">' + fingers[i] + '</text>';
        }
      }
    }
  }
  return svg;
}


// ═══════════════════════════════════════════════════════
// CHORD FAMILY
// ═══════════════════════════════════════════════════════
function initChordFamily() {
  const sel = document.getElementById('family-key');
  Object.keys(CHORD_FAMILIES).forEach(k => {
    const opt = document.createElement('option');
    opt.value = k; opt.textContent = k;
    sel.appendChild(opt);
  });
  sel.addEventListener('change', renderChordFamily);
  renderChordFamily();
}

function renderChordFamily() {
  const key = document.getElementById('family-key').value;
  const family = CHORD_FAMILIES[key];
  const container = document.getElementById('family-result');
  container.innerHTML = '';

  const sections = [
    { title: 'Major Scale Chords (I ii iii IV V vi vii°)', chords: family.major },
    { title: 'Dominant 7th Chords', chords: family.dominant7 },
  ];

  sections.forEach(sec => {
    const row = document.createElement('div');
    row.className = 'family-section';
    row.innerHTML = '<h3 class="family-title">' + sec.title + '</h3><div class="family-chords"></div>';
    const chordRow = row.querySelector('.family-chords');

    const degrees = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
    sec.chords.forEach((c, i) => {
      const chordData = CHORDS[c] || findChordVariant(c);
      const card = document.createElement('div');
      card.className = 'chord-card family-card';
      if (chordData) {
        card.innerHTML = '<div class="chord-degree">' + (degrees[i] || '') + '</div>' +
                         '<div class="chord-name">' + c + '</div>' +
                         '<svg class="chord-diagram" viewBox="0 0 100 120" width="80" height="96">' +
                         drawChordDiagram(chordData) + '</svg>';
      } else {
        card.innerHTML = '<div class="chord-degree">' + (degrees[i] || '') + '</div>' +
                         '<div class="chord-name">' + c + '</div>' +
                         '<div class="no-diagram">No diagram</div>';
      }
      chordRow.appendChild(card);
    });
    container.appendChild(row);
  });
}

function findChordVariant(name) {
  // Try to find a close variant
  const base = name.replace(/7|m7b5|maj7|dim|aug|m/, '');
  return CHORDS[base] || null;
}

// ═══════════════════════════════════════════════════════
// SCALE EXPLORER
// ═══════════════════════════════════════════════════════
function initScaleExplorer() {
  const keySel = document.getElementById('scale-key');
  const scaleSel = document.getElementById('scale-type');
  
  NOTES.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n; opt.textContent = n;
    keySel.appendChild(opt);
  });

  Object.keys(SCALES).forEach(s => {
    const opt = document.createElement('option');
    opt.value = s; opt.textContent = s;
    scaleSel.appendChild(opt);
  });

  keySel.addEventListener('change', () => { currentKey = keySel.value; renderScaleExplorer(); });
  scaleSel.addEventListener('change', () => { currentScale = scaleSel.value; renderScaleExplorer(); });



  renderScaleExplorer();
}

function getScaleNotes(root, scaleName) {
  const intervals = SCALES[scaleName];
  const rootIdx = NOTES.indexOf(root);
  return intervals.map(i => NOTES[(rootIdx + i) % 12]);
}

function renderScaleExplorer() {
  const notes = getScaleNotes(currentKey, currentScale);
  const intervals = SCALES[currentScale];
  const notesDiv = document.getElementById('scale-notes');
  notesDiv.innerHTML = '';
  notes.forEach((n, i) => {
    const chip = document.createElement('span');
    chip.className = 'note-chip';
    chip.textContent = n;
    chip.style.borderColor = INTERVAL_COLORS[INTERVALS[intervals[i]]] || '#333';
    notesDiv.appendChild(chip);
  });
  document.getElementById('scale-formula').textContent = 'Intervals: ' + intervals.map(i => INTERVALS[i]).join(' - ');
  renderScaleFretboard(notes);
}

function renderScaleFretboard(notes) {
  const container = document.getElementById('scale-fretboard');
  createSectionedFretboard(24, (stringIdx, fret) => {
    const tuning = TUNINGS[currentTuning];
    const noteIdx = (NOTES.indexOf(tuning[5 - stringIdx]) + fret) % 12;
    const note = NOTES[noteIdx];
    if (notes.includes(note)) {
      const intervalIdx = notes.indexOf(note);
      const intervals = SCALES[currentScale];
      const interval = INTERVALS[intervals[intervalIdx]];
      return { note, interval, color: INTERVAL_COLORS[interval] || '#333' };
    }
    return null;
  }, container);
}

function createFretboardSVG(numFrets, noteCallback, fretStart, fretEnd) {
  const ns = 'http://www.w3.org/2000/svg';
  const start = fretStart || 0, end = fretEnd || numFrets, count = end - start;
  const fretW = 56, strH = 40, padL = 48, padT = 38, padR = 16, padB = 16;
  const width = padL + count * fretW + padR, height = padT + 5 * strH + padB;
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
  svg.setAttribute('width', '100%'); svg.style.maxWidth = width + 'px';
  const markers = [3,5,7,9,12,15,17,19,21,24];
  const isDark = document.body.classList.contains('dark');
  const fg = isDark ? '#d4cfc5' : '#2d2a26';

  // Section label
  const label = document.createElementNS(ns, 'text');
  label.setAttribute('x', padL + (count * fretW) / 2); label.setAttribute('y', 18);
  label.setAttribute('font-size', '15'); label.setAttribute('font-weight', '900');
  label.setAttribute('fill', fg); label.setAttribute('text-anchor', 'middle');
  label.setAttribute('letter-spacing', '1');
  label.textContent = 'Fret ' + (start === 0 ? 'Open' : (start + 1)) + ' - ' + end;
  svg.appendChild(label);

  for (let i = 0; i <= count; i++) {
    const f = start + i, x = padL + i * fretW;
    if (f > 0 && markers.includes(f)) {
      const txt = document.createElementNS(ns, 'text');
      txt.setAttribute('x', x - fretW/2); txt.setAttribute('y', padT - 6);
      txt.setAttribute('font-size', '12'); txt.setAttribute('fill', fg);
      txt.setAttribute('text-anchor', 'middle'); txt.textContent = f;
      svg.appendChild(txt);
      const dc = document.createElementNS(ns, 'circle');
      dc.setAttribute('cx', x - fretW/2);
      dc.setAttribute('cy', padT + 2.5 * strH);
      dc.setAttribute('r', 4); dc.setAttribute('fill', fg);
      svg.appendChild(dc);
    }
  }
  for (let s = 0; s < 6; s++) {
    const y = padT + s * strH;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', padL); line.setAttribute('y1', y);
    line.setAttribute('x2', padL + count * fretW); line.setAttribute('y2', y);
    line.setAttribute('stroke', fg); line.setAttribute('stroke-width', 1.2 + (5-s)*0.4);
    svg.appendChild(line);
  }
  for (let i = 0; i <= count; i++) {
    const x = padL + i * fretW, f = start + i;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', x); line.setAttribute('y1', padT);
    line.setAttribute('x2', x); line.setAttribute('y2', padT + 5*strH);
    line.setAttribute('stroke', fg); line.setAttribute('stroke-width', f === 0 ? 4 : 1.5);
    svg.appendChild(line);
  }
  const tuning = TUNINGS[currentTuning];
  for (let s = 0; s < 6; s++) {
    for (let i = 1; i <= count; i++) {
      const fret = start + i, result = noteCallback(s, fret);
      if (result) {
        const cx = padL + (i-0.5)*fretW, cy = padT + s*strH;
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', cx); circle.setAttribute('cy', cy);
        circle.setAttribute('r', 14); circle.setAttribute('fill', result.color);
        circle.setAttribute('stroke', fg); circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);
        const txt = document.createElementNS(ns, 'text');
        txt.setAttribute('x', cx); txt.setAttribute('y', cy + 4);
        txt.setAttribute('font-size', '10'); txt.setAttribute('fill', '#f0ece4');
        txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-weight', 'bold');
        txt.textContent = result.interval || result.note;
        txt.style.pointerEvents = 'none'; svg.appendChild(txt);
      }
    }
  }
  for (let s = 0; s < 6; s++) {
    const txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', padL - 18); txt.setAttribute('y', padT + s*strH + 5);
    txt.setAttribute('font-size', '13'); txt.setAttribute('fill', fg);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-weight', '700');
    txt.textContent = tuning[5 - s]; svg.appendChild(txt);
  }
  return svg;
}

function createSectionedFretboard(totalFrets, noteCallback, container) {
  container.innerHTML = '';
  const fullLabel = document.createElement('div');
  fullLabel.className = 'fretboard-full-label';
  fullLabel.textContent = 'Full Fretboard (scroll \u2192)';
  container.appendChild(fullLabel);
  const fullWrapper = document.createElement('div');
  fullWrapper.className = 'fretboard-section fretboard-full';
  fullWrapper.appendChild(createFretboardSVG(totalFrets, noteCallback, 0, totalFrets));
  container.appendChild(fullWrapper);
  const secLabel = document.createElement('div');
  secLabel.className = 'fretboard-full-label';
  secLabel.textContent = 'Per Section';
  container.appendChild(secLabel);
  const sections = [[0, 5]];
  for (let i = 5; i < totalFrets; i += 5) sections.push([i, Math.min(i + 5, totalFrets)]);
  sections.forEach(([s, e]) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'fretboard-section';
    wrapper.appendChild(createFretboardSVG(totalFrets, noteCallback, s, e));
    container.appendChild(wrapper);
  });
}

function initFretboard() {
  const fbSel = document.getElementById('fb-tuning-select');
  if (fbSel) {
    Object.keys(TUNINGS).forEach(t => {
      const opt = document.createElement('option');
      opt.value = t; opt.textContent = t + ' (' + TUNINGS[t].join(' ') + ')';
      if (t === currentTuning) opt.selected = true;
      fbSel.appendChild(opt);
    });
    fbSel.addEventListener('change', () => {
      currentTuning = fbSel.value;
      const scaleSel = document.getElementById('tuning-select');
      if (scaleSel) scaleSel.value = currentTuning;
      refreshAll();
    });
  }
  const container = document.getElementById('full-fretboard');
  renderFullFretboard();
  document.getElementById('fretboard-toggle-notes').addEventListener('click', () => {
    container.classList.toggle('show-notes');
    renderFullFretboard(container.classList.contains('show-notes'));
  });
}

function renderFullFretboard(showNotes = false) {
  const container = document.getElementById('full-fretboard');
  const tuning = TUNINGS[currentTuning];
  const isDark = document.body.classList.contains('dark');
  createSectionedFretboard(15, (stringIdx, fret) => {
    const noteIdx = (NOTES.indexOf(tuning[5 - stringIdx]) + fret) % 12;
    const note = NOTES[noteIdx];
    if (showNotes) return { note, interval: note, color: isDark ? '#5a9abd' : '#4a7c9b' };
    return null;
  }, container);
}

function initMetronome() {
  const bpmSlider = document.getElementById('metro-bpm');
  const bpmDisplay = document.getElementById('metro-bpm-display');
  const beatsSel = document.getElementById('metro-beats');
  bpmSlider.addEventListener('input', () => {
    metronomeBpm = parseInt(bpmSlider.value);
    bpmDisplay.textContent = metronomeBpm;
    if (metronomeRunning) { stopMetronome(); startMetronome(); }
  });
  beatsSel.addEventListener('change', () => {
    metronomeBeatsPerMeasure = parseInt(beatsSel.value);
    metronomeBeat = 0;
    if (metronomeRunning) { stopMetronome(); startMetronome(); }
  });
  document.getElementById('metro-start').addEventListener('click', () => {
    if (metronomeRunning) stopMetronome(); else startMetronome();
  });
  let tapTimes = [];
  document.getElementById('metro-tap').addEventListener('click', () => {
    const now = Date.now();
    tapTimes.push(now);
    if (tapTimes.length > 4) tapTimes.shift();
    if (tapTimes.length >= 2) {
      let avg = 0;
      for (let i = 1; i < tapTimes.length; i++) avg += tapTimes[i] - tapTimes[i-1];
      avg /= (tapTimes.length - 1);
      metronomeBpm = Math.max(30, Math.min(300, Math.round(60000 / avg)));
      bpmSlider.value = metronomeBpm; bpmDisplay.textContent = metronomeBpm;
      if (metronomeRunning) { stopMetronome(); startMetronome(); }
    }
    setTimeout(() => { if (Date.now() - tapTimes[tapTimes.length - 1] > 2000) tapTimes = []; }, 3000);
  });
}
function startMetronome() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  metronomeRunning = true; metronomeBeat = 0;
  document.getElementById('metro-start').textContent = 'STOP';
  document.getElementById('metro-start').classList.add('active-metro');
  tickMetronome();
}
function stopMetronome() {
  metronomeRunning = false; clearTimeout(metronomeInterval);
  document.getElementById('metro-start').textContent = 'START';
  document.getElementById('metro-start').classList.remove('active-metro');
  document.querySelectorAll('.metro-dot').forEach(d => d.classList.remove('active-beat'));
}
function tickMetronome() {
  if (!metronomeRunning) return;
  playClick(metronomeBeat === 0);
  document.querySelectorAll('.metro-dot').forEach((d, i) => d.classList.toggle('active-beat', i === metronomeBeat));
  metronomeBeat = (metronomeBeat + 1) % metronomeBeatsPerMeasure;
  metronomeInterval = setTimeout(tickMetronome, 60000 / metronomeBpm);
}
function playClick(accent) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
  osc.type = 'sine'; osc.frequency.value = accent ? 1000 : 800;
  gain.gain.setValueAtTime(accent ? 0.3 : 0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + 0.05);
}

function initTuner() {
  document.getElementById('tuner-start-btn').addEventListener('click', startLiveTuner);
}

// ── Live Pitch Detection Tuner ───────────────────────
let tunerStream = null;
let tunerAnalyser = null;
let tunerAnimId = null;
let tunerRunning = false;

async function startLiveTuner() {
  if (tunerRunning) {
    stopLiveTuner();
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    tunerStream = stream;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    tunerAnalyser = audioCtx.createAnalyser();
    tunerAnalyser.fftSize = 4096;
    source.connect(tunerAnalyser);

    tunerRunning = true;
    document.getElementById('tuner-start-btn').textContent = '⏹ Stop';
    document.getElementById('tuner-start-btn').classList.add('active-metro');
    detectPitch();
  } catch (e) {
    document.getElementById('tuner-status').textContent = 'Mic access denied';
    document.getElementById('tuner-status').className = 'tuner-status sharp';
  }
}

function stopLiveTuner() {
  tunerRunning = false;
  if (tunerAnimId) cancelAnimationFrame(tunerAnimId);
  if (tunerStream) { tunerStream.getTracks().forEach(t => t.stop()); tunerStream = null; }
  document.getElementById('tuner-start-btn').textContent = '🎤 Start Tuner';
  document.getElementById('tuner-start-btn').classList.remove('active-metro');
  document.getElementById('tuner-note-big').textContent = '--';
  document.getElementById('tuner-note-big').className = 'tuner-note-big';
  document.getElementById('tuner-hz').textContent = '0.00 Hz';
  document.getElementById('tuner-cents').textContent = '0 cents';
  document.getElementById('tuner-meter-fill').style.width = '0%';
  document.getElementById('tuner-meter-fill').style.left = '50%';
  document.getElementById('tuner-meter-fill').className = 'tuner-meter-fill';
  document.getElementById('tuner-status').textContent = '';
  document.getElementById('tuner-status').className = 'tuner-status';
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function detectPitch() {
  if (!tunerRunning) return;
  tunerAnimId = requestAnimationFrame(detectPitch);

  const bufLen = tunerAnalyser.fftSize;
  const buf = new Float32Array(bufLen);
  tunerAnalyser.getFloatTimeDomainData(buf);

  const freq = autoCorrelate(buf, audioCtx.sampleRate);

  const noteBig = document.getElementById('tuner-note-big');
  const hzEl = document.getElementById('tuner-hz');
  const centsEl = document.getElementById('tuner-cents');
  const meterFill = document.getElementById('tuner-meter-fill');
  const statusEl = document.getElementById('tuner-status');

  if (freq === -1) {
    noteBig.textContent = '--';
    noteBig.className = 'tuner-note-big';
    hzEl.textContent = '0.00 Hz';
    centsEl.textContent = '0 cents';
    meterFill.style.width = '0%';
    meterFill.style.left = '50%';
    meterFill.className = 'tuner-meter-fill';
    statusEl.textContent = '';
    statusEl.className = 'tuner-status';
    return;
  }

  const noteNum = 12 * (Math.log2(freq / 440)) + 69;
  const roundedNote = Math.round(noteNum);
  const cents = Math.round((noteNum - roundedNote) * 100);
  const noteName = NOTE_NAMES[roundedNote % 12];
  const octave = Math.floor(roundedNote / 12) - 1;

  noteBig.textContent = noteName;
  hzEl.textContent = freq.toFixed(2) + ' Hz';
  centsEl.textContent = (cents >= 0 ? '+' : '') + cents + ' cents';

  // Meter: -50 to +50 cents
  // Flat (cents < 0): bar goes LEFT from center
  // Sharp (cents > 0): bar goes RIGHT from center
  // In tune (cents ~ 0): small bar at center
  const absCents = Math.min(Math.abs(cents), 50);
  const barWidth = (absCents / 50) * 50; // max 50% of meter

  if (Math.abs(cents) <= 3) {
    // In tune: small center bar
    meterFill.style.left = '48%';
    meterFill.style.width = '4%';
    noteBig.className = 'tuner-note-big intune';
    meterFill.className = 'tuner-meter-fill center';
    statusEl.textContent = '\u2713 IN TUNE';
    statusEl.className = 'tuner-status in-tune';
  } else if (cents > 0) {
    // Sharp: bar goes RIGHT from center
    meterFill.style.left = '50%';
    meterFill.style.width = barWidth + '%';
    noteBig.className = 'tuner-note-big sharp';
    meterFill.className = 'tuner-meter-fill sharp';
    statusEl.textContent = '\u266f SHARP \u2014 tune down';
    statusEl.className = 'tuner-status sharp';
  } else {
    // Flat: bar goes LEFT from center
    meterFill.style.left = (50 - barWidth) + '%';
    meterFill.style.width = barWidth + '%';
    noteBig.className = 'tuner-note-big flat';
    meterFill.className = 'tuner-meter-fill flat';
    statusEl.textContent = '\u266d FLAT \u2014 tune up';
    statusEl.className = 'tuner-status flat';
  }
}

// ── Autocorrelation pitch detection algorithm ────────
function autoCorrelate(buf, sampleRate) {
  let SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1; // too quiet

  // Normalize
  let r1 = 0, r2 = SIZE - 1;
  const threshold = 0.2;
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buf[i]) < threshold) { r1 = i; break; }
  }
  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buf[SIZE - i]) < threshold) { r2 = SIZE - i; break; }
  }

  buf = buf.slice(r1, r2);
  SIZE = buf.length;

  // Autocorrelation
  const c = new Float32Array(SIZE);
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] += buf[j] * buf[j + i];
    }
  }

  // Find first dip
  let d = 0;
  while (c[d] > c[d + 1]) {
    d++;
    if (d >= SIZE - 1) return -1;
  }

  // Find peak after dip
  let maxVal = -1;
  let maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxVal) {
      maxVal = c[i];
      maxPos = i;
    }
  }

  // Parabolic interpolation for better accuracy
  let T0 = maxPos;
  if (T0 > 0 && T0 < SIZE - 1) {
    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);
  }

  return sampleRate / T0;
}

function initProgressions() {
  const keySel = document.getElementById('prog-key');
  NOTES.forEach(n => { const opt = document.createElement('option'); opt.value = n; opt.textContent = n; keySel.appendChild(opt); });
  keySel.addEventListener('change', renderProgressions);
  renderProgressions();
}
function renderProgressions() {
  const key = document.getElementById('prog-key').value, keyIdx = NOTES.indexOf(key);
  const container = document.getElementById('prog-list'); container.innerHTML = '';
  Object.entries(PROGRESSIONS).forEach(([name, prog]) => {
    const isMinor = name.includes('i -') && !name.includes('I -');
    const scaleIntervals = isMinor ? SCALES['Minor (Aeolian)'] : SCALES['Major (Ionian)'];
    const scaleNotes = scaleIntervals.map(i => NOTES[(keyIdx + i) % 12]);
    const chords = prog.degrees.map(d => {
      const note = scaleNotes[d];
      const qual = isMinor ? ['m','','m','m','','m',''] : ['','m','m','','','m',''];
      return note + (qual[d] || '');
    });
    const card = document.createElement('div'); card.className = 'prog-card';
    let html = '<div class="prog-header"><div class="prog-name">' + name + '</div>';
    html += '<div class="prog-genre">' + t(prog.genreKey) + '</div></div>';
    html += '<div class="prog-chords">';
    chords.forEach(c => { html += '<span class="prog-chord-chip">' + c + '</span>'; });
    html += '</div><div class="prog-diagrams">';
    chords.forEach(c => {
      const cd = CHORDS[c];
      if (cd) html += '<div class="prog-diagram-item"><svg class="chord-diagram" viewBox="0 0 100 120" width="60" height="72">' + drawChordDiagram(cd) + '</svg><span>' + c + '</span></div>';
    });
    html += '</div>';
    card.innerHTML = html; container.appendChild(card);
  });
}

const CIRCLE_DISPLAY = [
  {major:'C',minor:'Am',sharps:0},{major:'G',minor:'Em',sharps:1},{major:'D',minor:'Bm',sharps:2},
  {major:'A',minor:'F#m',sharps:3},{major:'E',minor:'C#m',sharps:4},{major:'B',minor:'G#m',sharps:5},
  {major:'F#',minor:'D#m',sharps:6},{major:'Db',minor:'Bbm',flats:5},{major:'Ab',minor:'Fm',flats:4},
  {major:'Eb',minor:'Cm',flats:3},{major:'Bb',minor:'Gm',flats:2},{major:'F',minor:'Dm',flats:1}
];

function initCircleOfFifths() { drawCircle(); }

function drawCircle() {
  const svg = document.getElementById('circle-svg');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const cx = 210, cy = 210, R_outer = 170, R_inner = 120, R_text = 155, R_minor = 100;
  const isDark = document.body.classList.contains('dark');
  const fg = isDark ? '#d4cfc5' : '#2d2a26';
  const cardBg = isDark ? '#252320' : '#f0ece4';
  const muted = isDark ? '#9a9488' : '#6a645a';
  const accent = isDark ? '#d46a58' : '#c45c4a';
  const hdr = '#f0ece4';
  svg.innerHTML = '';

  const bg = document.createElementNS(ns, 'circle');
  bg.setAttribute('cx', cx); bg.setAttribute('cy', cy); bg.setAttribute('r', R_outer+30); bg.setAttribute('fill', cardBg);
  svg.appendChild(bg);

  const outer = document.createElementNS(ns, 'circle');
  outer.setAttribute('cx', cx); outer.setAttribute('cy', cy); outer.setAttribute('r', R_outer);
  outer.setAttribute('fill', 'none'); outer.setAttribute('stroke', fg); outer.setAttribute('stroke-width', '3');
  svg.appendChild(outer);

  const inner = document.createElementNS(ns, 'circle');
  inner.setAttribute('cx', cx); inner.setAttribute('cy', cy); inner.setAttribute('r', R_inner);
  inner.setAttribute('fill', 'none'); inner.setAttribute('stroke', fg); inner.setAttribute('stroke-width', '2');
  inner.setAttribute('stroke-dasharray', '6 4');
  svg.appendChild(inner);

  for (let i = 0; i < 12; i++) {
    const angle = (i*30 - 90) * Math.PI / 180;
    const d = CIRCLE_DISPLAY[i];
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', cx+R_inner*Math.cos(angle)); line.setAttribute('y1', cy+R_inner*Math.sin(angle));
    line.setAttribute('x2', cx+R_outer*Math.cos(angle)); line.setAttribute('y2', cy+R_outer*Math.sin(angle));
    line.setAttribute('stroke', fg); line.setAttribute('stroke-width', '1');
    svg.appendChild(line);

    const mx = cx+R_text*Math.cos(angle), my = cy+R_text*Math.sin(angle);
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'circle-key'); g.dataset.key = d.major;
    const bg = document.createElementNS(ns, 'circle');
    bg.setAttribute('cx', mx); bg.setAttribute('cy', my); bg.setAttribute('r', '22');
    bg.setAttribute('fill', i===0 ? accent : cardBg); bg.setAttribute('stroke', fg);
    bg.setAttribute('stroke-width', '2'); bg.setAttribute('class', 'circle-key-bg');
    g.appendChild(bg);
    const txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', mx); txt.setAttribute('y', my+5); txt.setAttribute('font-size', '14');
    txt.setAttribute('font-weight', '700'); txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('fill', i===0 ? hdr : fg);
    txt.setAttribute('font-family', "'Space Mono', monospace"); txt.textContent = d.major;
    g.appendChild(txt);
    g.addEventListener('click', () => selectCircleKey(d.major, 'major'));
    svg.appendChild(g);

    const nx = cx+R_minor*Math.cos(angle), ny = cy+R_minor*Math.sin(angle);
    const mg = document.createElementNS(ns, 'g');
    mg.setAttribute('class', 'circle-key'); mg.dataset.key = d.minor;
    const mt = document.createElementNS(ns, 'text');
    mt.setAttribute('x', nx); mt.setAttribute('y', ny+4); mt.setAttribute('font-size', '12');
    mt.setAttribute('font-weight', '700'); mt.setAttribute('text-anchor', 'middle');
    mt.setAttribute('fill', muted); mt.setAttribute('font-family', "'Space Mono', monospace");
    mt.textContent = d.minor; mg.appendChild(mt);
    mg.addEventListener('click', () => selectCircleKey(d.minor, 'minor'));
    svg.appendChild(mg);
  }
  const ct = document.createElementNS(ns, 'text');
  ct.setAttribute('x', cx); ct.setAttribute('y', cy-5); ct.setAttribute('font-size', '11');
  ct.setAttribute('font-weight', '700'); ct.setAttribute('text-anchor', 'middle');
  ct.setAttribute('fill', muted); ct.setAttribute('font-family', "'Space Mono', monospace");
  ct.textContent = 'CIRCLE OF'; svg.appendChild(ct);
  const ct2 = document.createElementNS(ns, 'text');
  ct2.setAttribute('x', cx); ct2.setAttribute('y', cy+12); ct2.setAttribute('font-size', '11');
  ct2.setAttribute('font-weight', '700'); ct2.setAttribute('text-anchor', 'middle');
  ct2.setAttribute('fill', muted); ct2.setAttribute('font-family', "'Space Mono', monospace");
  ct2.textContent = 'FIFTHS'; svg.appendChild(ct2);
}

function selectCircleKey(keyName, mode) {
  const infoDiv = document.getElementById('circle-info');
  infoDiv.style.display = 'block';
  let majorKey = keyName;
  if (mode === 'minor') {
    const idx = CIRCLE_DISPLAY.findIndex(d => d.minor === keyName || d.minor.startsWith(keyName));
    if (idx >= 0) majorKey = CIRCLE_DISPLAY[idx].major;
    else majorKey = keyName.replace('m','');
  }
  const idx = CIRCLE_DISPLAY.findIndex(d => d.major === majorKey);
  if (idx < 0) { infoDiv.innerHTML = '<p>Key not found</p>'; return; }
  const pos5 = CIRCLE_DISPLAY[(idx+1)%12], pos4 = CIRCLE_DISPLAY[(idx+11)%12];
  const relMinor = CIRCLE_DISPLAY[idx].minor;
  const relMajor = CIRCLE_DISPLAY[idx].major;
  let parallelKey = mode === 'major' ? relMinor : relMajor;
  const familyData = CHORD_FAMILIES[majorKey] || CHORD_FAMILIES[majorKey.replace('#','')];

  let html = '<div class="circle-info-card">';
  html += '<div class="circle-info-header"><div class="circle-info-title">' + keyName + (mode === 'minor' ? ' Minor' : ' Major') + '</div>';
  html += '<div class="circle-info-badges">';
  html += '<span class="circle-badge circle-badge-rel">Relative ' + (mode === 'major' ? relMinor : relMajor) + '</span>';
  html += '<span class="circle-badge circle-badge-para">Parallel ' + parallelKey + '</span>';
  if (CIRCLE_DISPLAY[idx].sharps !== undefined) html += '<span class="circle-badge" style="background:var(--accent3);color:var(--header-text);">' + CIRCLE_DISPLAY[idx].sharps + ' Sharps</span>';
  if (CIRCLE_DISPLAY[idx].flats !== undefined) html += '<span class="circle-badge" style="background:var(--accent);color:var(--header-text);">' + CIRCLE_DISPLAY[idx].flats + ' Flats</span>';
  html += '</div></div>';
  html += '<div class="circle-chords-section"><div class="circle-chords-label">Key Relationships</div><div class="circle-chords-row">';
  html += '<span class="circle-chord-chip" style="background:var(--accent5);color:var(--header-text);">IV ' + pos4.major + '</span>';
  html += '<span class="circle-chord-chip degree-1">I ' + majorKey + '</span>';
  html += '<span class="circle-chord-chip">V ' + pos5.major + '</span></div></div>';
  if (familyData) {
    html += '<div class="circle-chords-section"><div class="circle-chords-label">Chord Family</div><div class="circle-chords-row">';
    ['I','ii','iii','IV','V','vi','vii\u00b0'].forEach((deg, i) => {
      html += '<span class="circle-chord-chip' + (i===0 ? ' degree-1' : '') + '">' + deg + ' ' + familyData.major[i] + '</span>';
    });
    html += '</div></div><div class="circle-chords-section"><div class="circle-chords-label">7th Chords</div><div class="circle-chords-row">';
    familyData.dominant7.forEach(c => { html += '<span class="circle-chord-chip">' + c + '</span>'; });
    html += '</div></div>';
  }
  html += '<div class="circle-scales-section"><div class="circle-chords-label">Related Scales</div>';
  const rn = majorKey.replace(/m.*/,'');
  ['Major (Ionian)','Minor (Aeolian)','Pentatonic Major','Pentatonic Minor','Blues'].forEach(s => {
    html += '<span class="circle-scale-chip">' + rn + ' ' + s + '</span>';
  });
  html += '</div></div>';
  infoDiv.innerHTML = html;
  document.querySelectorAll('.circle-key').forEach(g => g.classList.remove('active'));
  document.querySelectorAll('.circle-key[data-key="' + keyName + '"]').forEach(g => g.classList.add('active'));
}

function refreshAll() {
  renderChordGrid();
  renderChordFamily();
  renderScaleExplorer();
  renderFullFretboard();
  initTuner();
  renderProgressions();
}
