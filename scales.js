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
  document.getElementById('scale-formula').textContent =
    'Intervals: ' + intervals.map(i => INTERVALS[i]).join(' - ');
  renderScaleFretboard(notes);
}

function renderScaleFretboard(notes) {
  const container = document.getElementById('scale-fretboard');
  createSectionedFretboard(24, (stringIdx, fret) => {
    const tuning = TUNINGS[currentTuning];
    const noteIdx = (NOTES.indexOf(tuning[5 - stringIdx]) + fret) % 12;
    const note = NOTES[noteIdx];
    if (notes.includes(note)) {
      const intervals = SCALES[currentScale];
      const interval = INTERVALS[intervals[notes.indexOf(note)]];
      return { note, interval, color: INTERVAL_COLORS[interval] || '#333' };
    }
    return null;
  }, container);
}

// ── Fretboard SVG rendering ───────────────────────
function createFretboardSVG(numFrets, noteCallback, fretStart, fretEnd) {
  const ns = 'http://www.w3.org/2000/svg';
  const start = fretStart || 0, end = fretEnd || numFrets, count = end - start;
  const fw = 56, sh = 40, pl = 48, pt = 38, pr = 16, pb = 16;
  const w = pl + count * fw + pr, h = pt + 5 * sh + pb;
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  svg.setAttribute('width', '100%');
  svg.style.maxWidth = w + 'px';
  const markers = [3,5,7,9,12,15,17,19,21,24];
  const isDark = document.body.classList.contains('dark');
  const fg = isDark ? '#d4cfc5' : '#2d2a26';

  const label = document.createElementNS(ns, 'text');
  label.setAttribute('x', pl + (count * fw) / 2);
  label.setAttribute('y', 18);
  label.setAttribute('font-size', '15');
  label.setAttribute('font-weight', '900');
  label.setAttribute('fill', fg);
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('letter-spacing', '1');
  label.textContent = 'Fret ' + (start === 0 ? 'Open' : (start + 1)) + ' - ' + end;
  svg.appendChild(label);

  for (let i = 0; i <= count; i++) {
    const f = start + i, x = pl + i * fw;
    if (f > 0 && markers.includes(f)) {
      const txt = document.createElementNS(ns, 'text');
      txt.setAttribute('x', x - fw/2);
      txt.setAttribute('y', pt - 6);
      txt.setAttribute('font-size', '12');
      txt.setAttribute('fill', fg);
      txt.setAttribute('text-anchor', 'middle');
      txt.textContent = f;
      svg.appendChild(txt);

      if (f === 12) {
        [-10, 10].forEach(offset => {
          const dc = document.createElementNS(ns, 'circle');
          dc.setAttribute('cx', x - fw/2);
          dc.setAttribute('cy', pt + 2.5 * sh + offset);
          dc.setAttribute('r', 4);
          dc.setAttribute('fill', fg);
          svg.appendChild(dc);
        });
      } else {
        const dc = document.createElementNS(ns, 'circle');
        dc.setAttribute('cx', x - fw/2);
        dc.setAttribute('cy', pt + 2.5 * sh);
        dc.setAttribute('r', 4);
        dc.setAttribute('fill', fg);
        svg.appendChild(dc);
      }
    }
  }

  for (let s = 0; s < 6; s++) {
    const y = pt + s * sh;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', pl); line.setAttribute('y1', y);
    line.setAttribute('x2', pl + count * fw); line.setAttribute('y2', y);
    line.setAttribute('stroke', fg);
    line.setAttribute('stroke-width', 1.2 + (5 - s) * 0.4);
    svg.appendChild(line);
  }

  for (let i = 0; i <= count; i++) {
    const x = pl + i * fw, f = start + i;
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', x); line.setAttribute('y1', pt);
    line.setAttribute('x2', x); line.setAttribute('y2', pt + 5 * sh);
    line.setAttribute('stroke', fg);
    line.setAttribute('stroke-width', f === 0 ? 4 : 1.5);
    svg.appendChild(line);
  }

  const tuning = TUNINGS[currentTuning];
  for (let s = 0; s < 6; s++) {
    for (let i = 1; i <= count; i++) {
      const fret = start + i, result = noteCallback(s, fret);
      if (result) {
        const cx = pl + (i - 0.5) * fw, cy = pt + s * sh;
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', cx); circle.setAttribute('cy', cy);
        circle.setAttribute('r', 14);
        circle.setAttribute('fill', result.color);
        circle.setAttribute('stroke', fg);
        circle.setAttribute('stroke-width', '2');
        svg.appendChild(circle);

        const txt = document.createElementNS(ns, 'text');
        txt.setAttribute('x', cx); txt.setAttribute('y', cy + 4);
        txt.setAttribute('font-size', '10');
        txt.setAttribute('fill', '#f0ece4');
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('font-weight', 'bold');
        txt.textContent = result.interval || result.note;
        txt.style.pointerEvents = 'none';
        svg.appendChild(txt);
      }
    }
  }

  for (let s = 0; s < 6; s++) {
    const txt = document.createElementNS(ns, 'text');
    txt.setAttribute('x', pl - 18);
    txt.setAttribute('y', pt + s * sh + 5);
    txt.setAttribute('font-size', '13');
    txt.setAttribute('fill', fg);
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('font-weight', '700');
    txt.textContent = tuning[5 - s];
    svg.appendChild(txt);
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
  for (let i = 5; i < totalFrets; i += 5)
    sections.push([i, Math.min(i + 5, totalFrets)]);
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
      opt.value = t;
      opt.textContent = t + ' (' + TUNINGS[t].join(' ') + ')';
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
