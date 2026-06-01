// ── Metronome ────────────────────────────────────────
function initMetronome() {
  const bpmSlider = document.getElementById('metro-bpm');
  const bpmDisp = document.getElementById('metro-bpm-display');
  const beatsSel = document.getElementById('metro-beats');

  bpmSlider.addEventListener('input', () => {
    metronomeBpm = parseInt(bpmSlider.value);
    bpmDisp.textContent = metronomeBpm;
    if (metronomeRunning) { stopMetro(); startMetro(); }
  });
  beatsSel.addEventListener('change', () => {
    metronomeBeatsPerMeasure = parseInt(beatsSel.value);
    metronomeBeat = 0;
    if (metronomeRunning) { stopMetro(); startMetro(); }
  });
  document.getElementById('metro-start').addEventListener('click', () => {
    metronomeRunning ? stopMetro() : startMetro();
  });

  let taps = [];
  document.getElementById('metro-tap').addEventListener('click', () => {
    const now = Date.now();
    taps.push(now);
    if (taps.length > 4) taps.shift();
    if (taps.length >= 2) {
      let avg = 0;
      for (let i = 1; i < taps.length; i++) avg += taps[i] - taps[i-1];
      avg /= (taps.length - 1);
      metronomeBpm = Math.max(30, Math.min(300, Math.round(60000 / avg)));
      bpmSlider.value = metronomeBpm;
      bpmDisp.textContent = metronomeBpm;
      if (metronomeRunning) { stopMetro(); startMetro(); }
    }
    setTimeout(() => { if (Date.now() - taps[taps.length-1] > 2000) taps = []; }, 3000);
  });
}

function startMetro() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  metronomeRunning = true;
  metronomeBeat = 0;
  document.getElementById('metro-start').textContent = 'STOP';
  document.getElementById('metro-start').classList.add('active-metro');
  tickMetro();
}

function stopMetro() {
  metronomeRunning = false;
  clearTimeout(metronomeInterval);
  document.getElementById('metro-start').textContent = 'START';
  document.getElementById('metro-start').classList.remove('active-metro');
  document.querySelectorAll('.metro-dot').forEach(d => d.classList.remove('active-beat'));
}

function tickMetro() {
  if (!metronomeRunning) return;
  playClick(metronomeBeat === 0);
  document.querySelectorAll('.metro-dot').forEach((d, i) =>
    d.classList.toggle('active-beat', i === metronomeBeat));
  metronomeBeat = (metronomeBeat + 1) % metronomeBeatsPerMeasure;
  metronomeInterval = setTimeout(tickMetro, 60000 / metronomeBpm);
}

function playClick(accent) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = accent ? 1000 : 800;
  gain.gain.setValueAtTime(accent ? 0.3 : 0.15, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// ── Live Tuner ───────────────────────────────────────
let tunerStream = null;
let tunerAnalyser = null;
let tunerAnimId = null;
let tunerRunning = false;
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

function initTuner() {
  document.getElementById('tuner-start-btn').addEventListener('click', toggleTuner);
}

async function toggleTuner() {
  tunerRunning ? stopTuner() : startTuner();
}

async function startTuner() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    tunerStream = stream;
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const src = audioCtx.createMediaStreamSource(stream);
    tunerAnalyser = audioCtx.createAnalyser();
    tunerAnalyser.fftSize = 4096;
    src.connect(tunerAnalyser);
    tunerRunning = true;
    document.getElementById('tuner-start-btn').textContent = '\u23F9 Stop';
    document.getElementById('tuner-start-btn').classList.add('active-metro');
    detectPitch();
  } catch (e) {
    document.getElementById('tuner-status').textContent = 'Mic access denied';
    document.getElementById('tuner-status').className = 'tuner-status sharp';
  }
}

function stopTuner() {
  tunerRunning = false;
  if (tunerAnimId) cancelAnimationFrame(tunerAnimId);
  if (tunerStream) { tunerStream.getTracks().forEach(t => t.stop()); tunerStream = null; }
  document.getElementById('tuner-start-btn').textContent = '\uD83C\uDFA4 Start Tuner';
  document.getElementById('tuner-start-btn').classList.remove('active-metro');
  document.getElementById('tuner-note-big').textContent = '--';
  document.getElementById('tuner-note-big').className = 'tuner-note-big';
  document.getElementById('tuner-hz').textContent = '0.00 Hz';
  document.getElementById('tuner-cents').textContent = '0 cents';
  const mf = document.getElementById('tuner-meter-fill');
  mf.style.width = '0%'; mf.style.left = '50%';
  mf.className = 'tuner-meter-fill';
  document.getElementById('tuner-status').textContent = '';
  document.getElementById('tuner-status').className = 'tuner-status';
}

function detectPitch() {
  if (!tunerRunning) return;
  tunerAnimId = requestAnimationFrame(detectPitch);

  const buf = new Float32Array(tunerAnalyser.fftSize);
  tunerAnalyser.getFloatTimeDomainData(buf);
  const freq = autoCorrelate(buf, audioCtx.sampleRate);

  const noteBig = document.getElementById('tuner-note-big');
  const hzEl = document.getElementById('tuner-hz');
  const centsEl = document.getElementById('tuner-cents');
  const mf = document.getElementById('tuner-meter-fill');
  const status = document.getElementById('tuner-status');

  if (freq === -1) {
    noteBig.textContent = '--';
    noteBig.className = 'tuner-note-big';
    hzEl.textContent = '0.00 Hz';
    centsEl.textContent = '0 cents';
    mf.style.width = '0%'; mf.style.left = '50%';
    mf.className = 'tuner-meter-fill';
    status.textContent = '';
    status.className = 'tuner-status';
    return;
  }

  const noteNum = 12 * (Math.log2(freq / 440)) + 69;
  const rounded = Math.round(noteNum);
  const cents = Math.round((noteNum - rounded) * 100);
  const name = NOTE_NAMES[rounded % 12];

  noteBig.textContent = name;
  hzEl.textContent = freq.toFixed(2) + ' Hz';
  centsEl.textContent = (cents >= 0 ? '+' : '') + cents + ' cents';

  const absC = Math.min(Math.abs(cents), 50);
  const barW = (absC / 50) * 50;

  if (Math.abs(cents) <= 3) {
    mf.style.left = '48%'; mf.style.width = '4%';
    noteBig.className = 'tuner-note-big intune';
    mf.className = 'tuner-meter-fill center';
    status.textContent = '\u2713 IN TUNE';
    status.className = 'tuner-status in-tune';
  } else if (cents > 0) {
    mf.style.left = '50%'; mf.style.width = barW + '%';
    noteBig.className = 'tuner-note-big sharp';
    mf.className = 'tuner-meter-fill sharp';
    status.textContent = '\u266f SHARP \u2014 tune down';
    status.className = 'tuner-status sharp';
  } else {
    mf.style.left = (50 - barW) + '%'; mf.style.width = barW + '%';
    noteBig.className = 'tuner-note-big flat';
    mf.className = 'tuner-meter-fill flat';
    status.textContent = '\u266d FLAT \u2014 tune up';
    status.className = 'tuner-status flat';
  }
}

function autoCorrelate(buf, sr) {
  let SIZE = buf.length;
  let rms = 0;
  for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
  rms = Math.sqrt(rms / SIZE);
  if (rms < 0.01) return -1;

  let r1 = 0, r2 = SIZE - 1;
  const thr = 0.2;
  for (let i = 0; i < SIZE/2; i++) { if (Math.abs(buf[i]) < thr) { r1 = i; break; } }
  for (let i = 1; i < SIZE/2; i++) { if (Math.abs(buf[SIZE-i]) < thr) { r2 = SIZE-i; break; } }
  buf = buf.slice(r1, r2);
  SIZE = buf.length;

  const c = new Float32Array(SIZE);
  for (let i = 0; i < SIZE; i++)
    for (let j = 0; j < SIZE-i; j++)
      c[i] += buf[j] * buf[j+i];

  let d = 0;
  while (c[d] > c[d+1]) { d++; if (d >= SIZE-1) return -1; }

  let maxVal = -1, maxPos = -1;
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxVal) { maxVal = c[i]; maxPos = i; }
  }

  let T0 = maxPos;
  if (T0 > 0 && T0 < SIZE-1) {
    const a = (c[T0-1] + c[T0+1] - 2*c[T0]) / 2;
    const b = (c[T0+1] - c[T0-1]) / 2;
    if (a) T0 = T0 - b / (2*a);
  }
  return sr / T0;
}

// ── Chord Progressions ───────────────────────────────
function initProgressions() {
  const keySel = document.getElementById('prog-key');
  NOTES.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n; opt.textContent = n;
    keySel.appendChild(opt);
  });
  keySel.addEventListener('change', renderProgressions);
  renderProgressions();
}

function renderProgressions() {
  const key = document.getElementById('prog-key').value;
  const keyIdx = NOTES.indexOf(key);
  const container = document.getElementById('prog-list');
  container.innerHTML = '';

  Object.entries(PROGRESSIONS).forEach(([name, prog]) => {
    const isMinor = name.includes('i -') && !name.includes('I -');
    const scale = isMinor ? SCALES['Minor (Aeolian)'] : SCALES['Major (Ionian)'];
    const scaleNotes = scale.map(i => NOTES[(keyIdx + i) % 12]);
    const qual = isMinor ? ['m','','m','m','','m',''] : ['','m','m','','','m',''];
    const chords = prog.degrees.map((d, i) => scaleNotes[d] + (qual[d] || ''));

    const card = document.createElement('div');
    card.className = 'prog-card';
    let html = '<div class="prog-header"><div class="prog-name">' + name + '</div>';
    html += '<div class="prog-genre">' + t(prog.genreKey) + '</div></div>';
    html += '<div class="prog-chords">';
    chords.forEach(c => html += '<span class="prog-chord-chip">' + c + '</span>');
    html += '</div><div class="prog-diagrams">';
    chords.forEach(c => {
      const cd = CHORDS[c];
      if (cd)
        html += '<div class="prog-diagram-item"><svg class="chord-diagram" viewBox="0 0 100 120" width="60" height="72">' +
          drawChordDiagram(cd) + '</svg><span>' + c + '</span></div>';
    });
    html += '</div>';
    card.innerHTML = html;
    container.appendChild(card);
  });
}

// ── Circle of Fifths ─────────────────────────────────
const CIRCLE_DATA = [
  {major:'C',  minor:'Am',  sharps:0},
  {major:'G',  minor:'Em',  sharps:1},
  {major:'D',  minor:'Bm',  sharps:2},
  {major:'A',  minor:'F#m', sharps:3},
  {major:'E',  minor:'C#m', sharps:4},
  {major:'B',  minor:'G#m', sharps:5},
  {major:'F#', minor:'D#m', sharps:6},
  {major:'Db', minor:'Bbm', flats:5},
  {major:'Ab', minor:'Fm',  flats:4},
  {major:'Eb', minor:'Cm',  flats:3},
  {major:'Bb', minor:'Gm',  flats:2},
  {major:'F',  minor:'Dm',  flats:1}
];

let activeKey = null;

function initCircleOfFifths() { drawCircle(); }

function drawCircle() {
  const svg = document.getElementById('circle-svg');
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const cx = 210, cy = 210;
  const R1 = 170, R2 = 120, Rt = 155, Rm = 100;
  const dk = document.body.classList.contains('dark');
  const fg = dk ? '#d4cfc5' : '#2d2a26';
  const bg = dk ? '#252320' : '#f0ece4';
  const mt = dk ? '#9a9488' : '#6a645a';
  const ac = dk ? '#d46a58' : '#c45c4a';
  const hd = '#f0ece4';
  const sel = activeKey || 'C';
  svg.innerHTML = '';

  const addCircle = (r, fill, stroke, sw, dash) => {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
    c.setAttribute('fill', fill); c.setAttribute('stroke', stroke);
    c.setAttribute('stroke-width', sw);
    if (dash) c.setAttribute('stroke-dasharray', dash);
    svg.appendChild(c);
  };
  addCircle(R1+30, bg, 'none', 0);
  addCircle(R1, 'none', fg, 3);
  addCircle(R2, 'none', fg, 2, '6 4');

  const addText = (x, y, text, size, weight, fill, anchor) => {
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y);
    t.setAttribute('font-size', size); t.setAttribute('font-weight', weight);
    t.setAttribute('fill', fill); t.setAttribute('text-anchor', anchor || 'middle');
    t.setAttribute('font-family', "'Space Mono', monospace");
    t.textContent = text;
    svg.appendChild(t);
  };

  for (let i = 0; i < 12; i++) {
    const ang = (i * 30 - 90) * Math.PI / 180;
    const d = CIRCLE_DATA[i];
    const isSel = d.major === sel;

    // divider
    const ln = document.createElementNS(ns, 'line');
    ln.setAttribute('x1', cx + R2 * Math.cos(ang));
    ln.setAttribute('y1', cy + R2 * Math.sin(ang));
    ln.setAttribute('x2', cx + R1 * Math.cos(ang));
    ln.setAttribute('y2', cy + R1 * Math.sin(ang));
    ln.setAttribute('stroke', fg); ln.setAttribute('stroke-width', '1');
    svg.appendChild(ln);

    // major key
    const mx = cx + Rt * Math.cos(ang), my = cy + Rt * Math.sin(ang);
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('class', 'circle-key');
    const bg2 = document.createElementNS(ns, 'circle');
    bg2.setAttribute('cx', mx); bg2.setAttribute('cy', my); bg2.setAttribute('r', '22');
    bg2.setAttribute('fill', isSel ? ac : bg);
    bg2.setAttribute('stroke', fg); bg2.setAttribute('stroke-width', '2');
    g.appendChild(bg2);
    const tx = document.createElementNS(ns, 'text');
    tx.setAttribute('x', mx); tx.setAttribute('y', my + 5);
    tx.setAttribute('font-size', '14'); tx.setAttribute('font-weight', '700');
    tx.setAttribute('text-anchor', 'middle');
    tx.setAttribute('fill', isSel ? hd : fg);
    tx.setAttribute('font-family', "'Space Mono', monospace");
    tx.textContent = d.major;
    g.appendChild(tx);
    g.addEventListener('click', () => selectCircleKey(d.major, 'major'));
    svg.appendChild(g);

    // minor key
    const nx = cx + Rm * Math.cos(ang), ny = cy + Rm * Math.sin(ang);
    const mg = document.createElementNS(ns, 'g');
    mg.setAttribute('class', 'circle-key');
    const mt2 = document.createElementNS(ns, 'text');
    mt2.setAttribute('x', nx); mt2.setAttribute('y', ny + 4);
    mt2.setAttribute('font-size', '12'); mt2.setAttribute('font-weight', '700');
    mt2.setAttribute('text-anchor', 'middle'); mt2.setAttribute('fill', mt);
    mt2.setAttribute('font-family', "'Space Mono', monospace");
    mt2.textContent = d.minor;
    mg.appendChild(mt2);
    mg.addEventListener('click', () => selectCircleKey(d.minor, 'minor'));
    svg.appendChild(mg);
  }

  addText(cx, cy - 5, 'CIRCLE OF', 11, '700', mt);
  addText(cx, cy + 12, 'FIFTHS', 11, '700', mt);
}

function selectCircleKey(keyName, mode) {
  const info = document.getElementById('circle-info');
  info.style.display = 'block';
  let majorKey = keyName;
  if (mode === 'minor') {
    const idx = CIRCLE_DATA.findIndex(d => d.minor === keyName || d.minor.startsWith(keyName));
    majorKey = idx >= 0 ? CIRCLE_DATA[idx].major : keyName.replace('m', '');
  }
  activeKey = majorKey;
  drawCircle();

  const idx = CIRCLE_DATA.findIndex(d => d.major === majorKey);
  if (idx < 0) { info.innerHTML = '<p>Key not found</p>'; return; }

  const pos5 = CIRCLE_DATA[(idx+1)%12];
  const pos4 = CIRCLE_DATA[(idx+11)%12];
  const rel = CIRCLE_DATA[idx];
  const par = mode === 'major' ? rel.minor : rel.major;
  const fam = CHORD_FAMILIES[majorKey] || CHORD_FAMILIES[majorKey.replace('#','')];

  let h = '<div class="circle-info-card">';
  h += '<div class="circle-info-header">';
  h += '<div class="circle-info-title">' + keyName + (mode === 'minor' ? ' Minor' : ' Major') + '</div>';
  h += '<div class="circle-info-badges">';
  h += '<span class="circle-badge circle-badge-rel">Relative ' + (mode === 'major' ? rel.minor : rel.major) + '</span>';
  h += '<span class="circle-badge circle-badge-para">Parallel ' + par + '</span>';
  if (rel.sharps !== undefined) h += '<span class="circle-badge" style="background:var(--accent3);color:var(--header-text);">' + rel.sharps + ' Sharp' + (rel.sharps > 1 ? 's' : '') + '</span>';
  if (rel.flats !== undefined) h += '<span class="circle-badge" style="background:var(--accent);color:var(--header-text);">' + rel.flats + ' Flat' + (rel.flats > 1 ? 's' : '') + '</span>';
  h += '</div></div>';

  h += '<div class="circle-chords-section"><div class="circle-chords-label">Key Relationships</div><div class="circle-chords-row">';
  h += '<span class="circle-chord-chip" style="background:var(--accent5);color:var(--header-text);">IV ' + pos4.major + '</span>';
  h += '<span class="circle-chord-chip degree-1">I ' + majorKey + '</span>';
  h += '<span class="circle-chord-chip">V ' + pos5.major + '</span>';
  h += '</div></div>';

  if (fam) {
    const deg = ['I','ii','iii','IV','V','vi','vii\u00b0'];
    h += '<div class="circle-chords-section"><div class="circle-chords-label">Chord Family</div><div class="circle-chords-row">';
    fam.major.forEach((c, i) => h += '<span class="circle-chord-chip' + (i===0 ? ' degree-1' : '') + '">' + deg[i] + ' ' + c + '</span>');
    h += '</div></div>';
    h += '<div class="circle-chords-section"><div class="circle-chords-label">7th Chords</div><div class="circle-chords-row">';
    fam.dominant7.forEach(c => h += '<span class="circle-chord-chip">' + c + '</span>');
    h += '</div></div>';
  }

  h += '<div class="circle-scales-section"><div class="circle-chords-label">Related Scales</div>';
  const rn = majorKey.replace(/m.*/, '');
  ['Major (Ionian)', 'Minor (Aeolian)', 'Pentatonic Major', 'Pentatonic Minor', 'Blues'].forEach(s =>
    h += '<span class="circle-scale-chip">' + rn + ' ' + s + '</span>');
  h += '</div></div>';
  info.innerHTML = h;
}
