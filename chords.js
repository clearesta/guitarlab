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
    card.innerHTML =
      '<div class="chord-name">' + key + '</div>' +
      '<svg class="chord-diagram" viewBox="0 0 100 120" width="100" height="120">' +
      drawChordDiagram(chord) + '</svg>' +
      '<div class="chord-full-name">' + chord.name + '</div>';
    grid.appendChild(card);
  });
}

function drawChordDiagram(chord) {
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
  const sx = 15, sy = 25, ss = 14, fs = 16;

  let minFret = 99;
  frets.forEach(f => { if (f > 0 && f < minFret) minFret = f; });
  let offset = 0, showNut = true;
  if (minFret > 3) { offset = minFret - 1; showNut = false; }

  if (showNut) {
    svg += '<rect x="' + (sx-2) + '" y="' + (sy-2) + '" width="' + (ss*5+4) + '" height="5" fill="' + fg + '" rx="1"/>';
  } else {
    svg += '<text x="' + (sx-10) + '" y="' + (sy+fs) + '" font-size="10" fill="' + muted + '" text-anchor="middle">' + minFret + '</text>';
  }

  for (let i = 0; i <= 5; i++) {
    const y = sy + 3 + i * fs;
    svg += '<line x1="' + sx + '" y1="' + y + '" x2="' + (sx + 5*ss) + '" y2="' + y + '" stroke="' + lineC + '" stroke-width="1"/>';
  }
  for (let i = 0; i < 6; i++) {
    const x = sx + i * ss;
    svg += '<line x1="' + x + '" y1="' + sy + '" x2="' + x + '" y2="' + (sy + 3 + 5*fs) + '" stroke="' + strC + '" stroke-width="' + (i < 3 ? 1.5 - i*0.2 : 0.8) + '"/>';
  }

  if (barre) {
    const bf = barre - offset;
    if (bf >= 1 && bf <= 5) {
      const y = sy + 3 + (bf - 0.5) * fs;
      svg += '<rect x="' + sx + '" y="' + (y-3) + '" width="' + (ss*5) + '" height="6" fill="' + fg + '" rx="3"/>';
    }
  }

  for (let i = 0; i < 6; i++) {
    const x = sx + i * ss;
    const f = frets[i];
    if (f === -1) {
      svg += '<text x="' + x + '" y="' + (sy-5) + '" font-size="11" fill="' + accentC + '" text-anchor="middle" font-weight="bold">X</text>';
    } else if (f === 0) {
      svg += '<circle cx="' + x + '" cy="' + (sy-6) + '" r="4" fill="none" stroke="' + fg + '" stroke-width="1.5"/>';
    } else {
      const ff = f - offset;
      if (ff >= 1 && ff <= 5) {
        const y = sy + 3 + (ff - 0.5) * fs;
        svg += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + fg + '"/>';
        if (fingers[i] > 0)
          svg += '<text x="' + x + '" y="' + (y+3.5) + '" font-size="8" fill="' + cardC + '" text-anchor="middle">' + fingers[i] + '</text>';
      }
    }
  }
  return svg;
}

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
  const degrees = ['I','ii','iii','IV','V','vi','vii\u00b0'];

  [
    { title: 'Major Scale Chords', chords: family.major },
    { title: '7th Chords', chords: family.dominant7 }
  ].forEach(sec => {
    const row = document.createElement('div');
    row.className = 'family-section';
    row.innerHTML = '<h3 class="family-title">' + sec.title + '</h3><div class="family-chords"></div>';
    const chordRow = row.querySelector('.family-chords');

    sec.chords.forEach((c, i) => {
      const cd = CHORDS[c] || findChordVariant(c);
      const card = document.createElement('div');
      card.className = 'chord-card family-card';
      if (cd) {
        card.innerHTML = '<div class="chord-degree">' + (degrees[i]||'') + '</div>' +
          '<div class="chord-name">' + c + '</div>' +
          '<svg class="chord-diagram" viewBox="0 0 100 120" width="80" height="96">' +
          drawChordDiagram(cd) + '</svg>';
      } else {
        card.innerHTML = '<div class="chord-degree">' + (degrees[i]||'') + '</div>' +
          '<div class="chord-name">' + c + '</div><div class="no-diagram">-</div>';
      }
      chordRow.appendChild(card);
    });
    container.appendChild(row);
  });
}

function findChordVariant(name) {
  const base = name.replace(/7|m7b5|maj7|dim|aug|m/, '');
  return CHORDS[base] || null;
}
