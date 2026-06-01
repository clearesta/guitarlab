let currentTuning = 'E Standard';
let currentKey = 'C';
let currentScale = 'Major (Ionian)';
let metronomeInterval = null;
let metronomeBpm = 120;
let metronomeRunning = false;
let metronomeBeat = 0;
let metronomeBeatsPerMeasure = 4;
let audioCtx = null;

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
  applyTranslations();
  initLandingNav();
  initDarkMode();
});

function getCSSVar(name) {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
}

function svgColor(varName, light, dark) {
  const v = getCSSVar(varName);
  if (v) return v;
  return document.body.classList.contains('dark') ? dark : light;
}

function initDarkMode() {
  if (localStorage.getItem('guitarlab-dark') === 'true')
    document.body.classList.add('dark');
  updateDarkToggle();

  document.getElementById('dark-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('guitarlab-dark', document.body.classList.contains('dark'));
    updateDarkToggle();
    renderChordGrid();
    renderChordFamily();
    renderScaleExplorer();
    renderFullFretboard();
    renderProgressions();
    drawCircle();
  });
}

function updateDarkToggle() {
  const btn = document.getElementById('dark-toggle');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '\u2600\uFE0F' : '\uD83C\uDF19';
}

function initLandingNav() {
  document.querySelectorAll('[data-navigate]').forEach(el => {
    el.addEventListener('click', () => navigateToTab(el.dataset.navigate));
  });
  document.getElementById('home-btn').addEventListener('click', navigateHome);
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('tab-' + hash))
    navigateToTab('tab-' + hash);
}

function navigateToTab(tabId) {
  const landing = document.getElementById('landing');
  const targetTab = document.getElementById(tabId);
  if (!targetTab) return;

  if (!landing.classList.contains('hidden')) {
    landing.classList.add('animating-out');
    setTimeout(() => {
      landing.classList.remove('animating-out');
      landing.classList.add('hidden');
      document.getElementById('app-nav').style.display = 'flex';
      document.getElementById('home-btn').classList.remove('hidden');
      activateTab(tabId);
      window.location.hash = tabId.replace('tab-', '');
    }, 200);
    return;
  }

  const current = document.querySelector('.tab-content.active');
  if (current && current.id !== tabId) {
    current.style.opacity = '0';
    current.style.transform = 'translateY(-8px)';
    setTimeout(() => {
      current.classList.remove('active');
      current.style.opacity = '';
      current.style.transform = '';
      activateTab(tabId);
      window.location.hash = tabId.replace('tab-', '');
    }, 200);
  } else if (!current) {
    activateTab(tabId);
    window.location.hash = tabId.replace('tab-', '');
  }
}

function activateTab(tabId) {
  const targetTab = document.getElementById(tabId);
  targetTab.classList.add('animating-in');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  const btn = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
  requestAnimationFrame(() => {
    targetTab.classList.remove('animating-in');
    targetTab.classList.add('active');
  });
}

function navigateHome() {
  const current = document.querySelector('.tab-content.active');
  const landing = document.getElementById('landing');
  if (current) {
    current.style.opacity = '0';
    current.style.transform = 'translateY(-8px)';
  }
  setTimeout(() => {
    document.querySelectorAll('.tab-content').forEach(c => {
      c.classList.remove('active');
      c.style.opacity = '';
      c.style.transform = '';
    });
    document.getElementById('app-nav').style.display = 'none';
    document.getElementById('home-btn').classList.add('hidden');
    landing.classList.remove('hidden');
    landing.classList.add('animating-in');
    requestAnimationFrame(() => landing.classList.remove('animating-in'));
    window.location.hash = '';
  }, 200);
}

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

function initTuningSelector() {
  const sel = document.getElementById('tuning-select');
  Object.keys(TUNINGS).forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t + ' (' + TUNINGS[t].join(' ') + ')';
    sel.appendChild(opt);
  });
  sel.addEventListener('change', () => {
    currentTuning = sel.value;
    const fbSel = document.getElementById('fb-tuning-select');
    if (fbSel) fbSel.value = currentTuning;
    refreshAll();
  });
}

function refreshAll() {
  renderChordGrid();
  renderChordFamily();
  renderScaleExplorer();
  renderFullFretboard();
  initTuner();
  renderProgressions();
}
