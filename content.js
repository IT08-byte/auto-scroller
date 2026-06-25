(() => {
  if (window.__autoScrollerLoaded) return;
  window.__autoScrollerLoaded = true;

  // ─── Defaults ────────────────────────────────────────────────────────────
  const DEFAULTS = {
    speed:     2,
    startKey:  'Delete',
    pauseKey:  'End',
    autoPopup: false,
    scale:     1.0,
  };

  // ─── State ───────────────────────────────────────────────────────────────
  let scrolling         = false;
  let speed             = DEFAULTS.speed;
  let startKey          = DEFAULTS.startKey;
  let pauseKey          = DEFAULTS.pauseKey;
  let autoPopup         = DEFAULTS.autoPopup;
  let scale             = DEFAULTS.scale;
  let capturingFor      = null;
  let rafId             = null;
  let scrollTarget      = null;
  let hoveredScrollable = null;

  // ─── Cross-site storage via bridge (chrome.storage.sync) ─────────────────
  function storageGet(keys) {
    return new Promise(resolve => {
      const handler = (e) => {
        clearTimeout(timer);
        window.removeEventListener('asc-storage-result', handler);
        resolve(e.detail);
      };
      // Fall back to defaults if bridge doesn't respond within 1s
      const timer = setTimeout(() => {
        window.removeEventListener('asc-storage-result', handler);
        resolve({});
      }, 1000);
      window.addEventListener('asc-storage-result', handler);
      window.dispatchEvent(new CustomEvent('asc-storage-get', { detail: keys }));
    });
  }

  function storageSet(obj) {
    window.dispatchEvent(new CustomEvent('asc-storage-set', { detail: obj }));
  }

  function storageClear() {
    window.dispatchEvent(new CustomEvent('asc-storage-clear'));
  }

  // ─── HTML escape (prevent XSS from stored key names) ─────────────────────
  function esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ─── Keydown — registered IMMEDIATELY before any page script ─────────────
  window.addEventListener('keydown', (e) => {
    if (capturingFor) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const key = e.key;
      const btn = capturingFor === 'start' ? startKeyBtn() : pauseKeyBtn();
      if (capturingFor === 'start') {
        startKey = key;
        storageSet({ startKey: key });
        if (btn) { btn.textContent = key; btn.classList.remove('capturing'); }
      } else {
        pauseKey = key;
        storageSet({ pauseKey: key });
        if (btn) { btn.textContent = key; btn.classList.remove('capturing'); }
      }
      capturingFor = null;
      if (btn) btn.blur();
      return;
    }

    if (startKey === pauseKey && e.key === startKey) {
      e.preventDefault();
      scrolling ? pauseScroll() : startScroll();
    } else if (e.key === startKey) {
      e.preventDefault();
      startScroll();
    } else if (e.key === pauseKey) {
      e.preventDefault();
      pauseScroll();
    }
  }, true);

  // ─── Icon click from bridge ───────────────────────────────────────────────
  window.addEventListener('asc-toggle-overlay', () => {
    const existing = document.getElementById('auto-scroller-overlay');
    if (existing) existing.__ascRemove();
    else buildOverlay();
  });

  // ─── Element refs ─────────────────────────────────────────────────────────
  const startKeyBtn = () => document.getElementById('asc-start-key');
  const pauseKeyBtn = () => document.getElementById('asc-pause-key');

  // ─── Scroll target helpers ────────────────────────────────────────────────
  function findScrollable(el) {
    while (el && el !== document.documentElement) {
      const oy = window.getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el;
      el = el.parentElement;
    }
    return null;
  }

  function findMainScrollable() {
    let best = null, bestArea = 0;
    document.querySelectorAll('*').forEach(el => {
      const oy = window.getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) {
        const area = el.clientWidth * el.clientHeight;
        if (area > bestArea) { bestArea = area; best = el; }
      }
    });
    return best;
  }

  function describeTarget(el) {
    if (!el) return 'window';
    return el.id ? `#${el.id}` : el.className ? `.${String(el.className).trim().split(' ')[0]}` : el.tagName.toLowerCase();
  }

  // ─── Scroll ──────────────────────────────────────────────────────────────
  function startScroll() {
    if (scrolling) return;
    scrollTarget = hoveredScrollable || findMainScrollable();
    scrolling = true;
    updateUI();
    loop();
  }

  function pauseScroll() {
    if (!scrolling) return;
    scrolling = false;
    cancelAnimationFrame(rafId);
    updateUI();
  }

  function loop() {
    if (!scrolling) return;
    if (scrollTarget) scrollTarget.scrollTop += speed;
    else window.scrollBy(0, speed);
    rafId = requestAnimationFrame(loop);
  }

  function updateUI() {
    const statusEl  = document.getElementById('asc-status');
    const toggleBtn = document.getElementById('asc-toggle-btn');
    const targetLbl = document.getElementById('asc-target-label');
    if (!statusEl) return;
    if (scrolling) {
      statusEl.textContent = 'Running';
      statusEl.classList.add('running');
      toggleBtn.textContent = '⏸ Pause';
      toggleBtn.classList.add('running');
      if (targetLbl) targetLbl.textContent = `Target: ${describeTarget(scrollTarget)}`;
    } else {
      statusEl.textContent = 'Stopped';
      statusEl.classList.remove('running');
      toggleBtn.textContent = '▶ Start';
      toggleBtn.classList.remove('running');
    }
  }

  // ─── Build overlay ───────────────────────────────────────────────────────
  function buildOverlay() {
    if (document.getElementById('auto-scroller-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'auto-scroller-overlay';
    overlay.innerHTML = `
      <div id="asc-header">⬇ Auto Scroller <span id="asc-close">✕</span></div>
      <div id="asc-status">Stopped</div>
      <div id="asc-target-label">Target: window</div>

      <div class="asc-section-label">CONTROLS</div>
      <div class="asc-row">
        <label>Speed (px/frame)</label>
        <input id="asc-speed" type="number" min="1" max="100" value="${esc(speed)}" />
      </div>
      <div class="asc-row">
        <label>Start key</label>
        <button class="asc-keybind" id="asc-start-key">${esc(startKey)}</button>
      </div>
      <div class="asc-row">
        <label>Pause key</label>
        <button class="asc-keybind" id="asc-pause-key">${esc(pauseKey)}</button>
      </div>
      <div class="asc-row">
        <button id="asc-toggle-btn">▶ Start</button>
      </div>

      <div class="asc-divider"></div>
      <div class="asc-section-label">PREFERENCES</div>
      <div class="asc-row">
        <label>Auto popup</label>
        <label class="asc-switch">
          <input type="checkbox" id="asc-auto-popup" ${autoPopup ? 'checked' : ''} />
          <span class="asc-slider"></span>
        </label>
      </div>
      <div class="asc-row">
        <label>Size</label>
        <div style="display:flex;align-items:center;gap:5px;">
          <input id="asc-scale" type="number" min="0.5" max="2.0" step="0.1" value="${esc(scale.toFixed(1))}" />
          <span style="font-size:11px;opacity:0.5;">×</span>
        </div>
      </div>
      <div class="asc-row">
        <button id="asc-reset" class="asc-reset-btn">↺ Reset to defaults</button>
      </div>

      <div class="asc-divider"></div>
      <div id="asc-footer">
        <a id="asc-privacy-link" href="#" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        &nbsp;·&nbsp; v1.1
      </div>
    `;

    const style = document.createElement('style');
    style.id = 'asc-style';
    style.textContent = `
      #auto-scroller-overlay {
        position: fixed; top: 20px; right: 20px; z-index: 2147483647;
        background: #1a1a2e; color: #e0e0e0; border-radius: 10px;
        padding: 12px 14px; width: 220px;
        font-family: system-ui, sans-serif; font-size: 13px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.5); user-select: none;
        transform-origin: top right;
      }
      #asc-header {
        display: flex; justify-content: space-between; align-items: center;
        font-weight: 700; font-size: 14px; margin-bottom: 6px;
        cursor: move; color: #a78bfa;
      }
      #asc-close { cursor: pointer; opacity: 0.6; font-size: 13px; }
      #asc-close:hover { opacity: 1; }
      #asc-status {
        text-align: center; font-size: 11px; letter-spacing: 0.05em;
        padding: 2px 0; color: #f87171; font-weight: 600;
      }
      #asc-status.running { color: #4ade80; }
      #asc-target-label {
        text-align: center; font-size: 10px; opacity: 0.45;
        margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .asc-divider { border-top: 1px solid #2d2d4e; margin: 8px 0 6px; }
      .asc-section-label {
        font-size: 9px; letter-spacing: 0.1em; opacity: 0.4;
        margin-bottom: 4px; font-weight: 700;
      }
      .asc-row { display: flex; justify-content: space-between; align-items: center; margin-top: 6px; }
      .asc-row label { opacity: 0.75; }
      #asc-speed, #asc-scale {
        width: 58px; background: #2d2d4e; color: #e0e0e0;
        border: 1px solid #4a4a7a; border-radius: 5px;
        padding: 3px 6px; font-size: 13px; text-align: center;
      }
      .asc-keybind {
        background: #2d2d4e; color: #e0e0e0; border: 1px solid #4a4a7a;
        border-radius: 5px; padding: 3px 8px; font-size: 12px;
        cursor: pointer; min-width: 70px; text-align: center;
      }
      .asc-keybind.capturing {
        border-color: #a78bfa; color: #a78bfa;
        animation: asc-pulse 0.8s infinite;
      }
      @keyframes asc-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      #asc-toggle-btn {
        width: 100%; background: #4f46e5; color: #fff; border: none;
        border-radius: 6px; padding: 6px 0; font-size: 13px;
        font-weight: 600; cursor: pointer; margin-top: 2px;
      }
      #asc-toggle-btn:hover { background: #6366f1; }
      #asc-toggle-btn.running { background: #dc2626; }
      #asc-toggle-btn.running:hover { background: #ef4444; }
      .asc-switch { position: relative; display: inline-block; width: 36px; height: 20px; }
      .asc-switch input { opacity: 0; width: 0; height: 0; }
      .asc-slider {
        position: absolute; cursor: pointer; inset: 0;
        background: #2d2d4e; border: 1px solid #4a4a7a; border-radius: 20px;
        transition: background 0.2s;
      }
      .asc-slider:before {
        content: ''; position: absolute; height: 12px; width: 12px;
        left: 3px; bottom: 3px; background: #e0e0e0; border-radius: 50%;
        transition: transform 0.2s;
      }
      .asc-switch input:checked + .asc-slider { background: #4f46e5; border-color: #4f46e5; }
      .asc-switch input:checked + .asc-slider:before { transform: translateX(16px); }
      .asc-reset-btn {
        width: 100%; background: transparent; color: #f87171;
        border: 1px solid #f87171; border-radius: 6px;
        padding: 5px 0; font-size: 12px; cursor: pointer; margin-top: 2px; opacity: 0.8;
      }
      .asc-reset-btn:hover { opacity: 1; background: rgba(248,113,113,0.1); }
      #asc-footer {
        text-align: center; font-size: 10px; opacity: 0.35; margin-top: 8px;
      }
      #asc-privacy-link {
        color: #a78bfa; text-decoration: none; opacity: 0.7;
      }
      #asc-privacy-link:hover { opacity: 1; text-decoration: underline; }
    `;

    document.head.appendChild(style);
    document.body.appendChild(overlay);
    applyScale(scale);

    // Set privacy policy link (replace with your hosted URL)
    document.getElementById('asc-privacy-link').href = 'https://IT08-byte.github.io/auto-scroller-privacy/';

    overlay.__ascRemove = () => {
      pauseScroll();
      document.removeEventListener('mousemove', onMouseMove, { capture: true });
      overlay.remove();
      style.remove();
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true, capture: true });

    // Controls
    document.getElementById('asc-toggle-btn').addEventListener('click', () =>
      scrolling ? pauseScroll() : startScroll()
    );

    document.getElementById('asc-speed').addEventListener('change', (e) => {
      speed = Math.max(1, Math.min(100, parseInt(e.target.value) || DEFAULTS.speed));
      e.target.value = speed;
      storageSet({ speed });
    });

    document.getElementById('asc-start-key').addEventListener('click', () => {
      capturingFor = 'start';
      const btn = startKeyBtn();
      btn.textContent = 'Press a key…';
      btn.classList.add('capturing');
    });

    document.getElementById('asc-pause-key').addEventListener('click', () => {
      capturingFor = 'pause';
      const btn = pauseKeyBtn();
      btn.textContent = 'Press a key…';
      btn.classList.add('capturing');
    });

    // Preferences
    document.getElementById('asc-auto-popup').addEventListener('change', (e) => {
      autoPopup = e.target.checked;
      storageSet({ autoPopup });
    });

    document.getElementById('asc-scale').addEventListener('change', (e) => {
      scale = Math.max(0.5, Math.min(2.0, parseFloat(e.target.value) || DEFAULTS.scale));
      e.target.value = scale.toFixed(1);
      storageSet({ scale });
      applyScale(scale);
    });

    document.getElementById('asc-reset').addEventListener('click', () => {
      speed     = DEFAULTS.speed;
      startKey  = DEFAULTS.startKey;
      pauseKey  = DEFAULTS.pauseKey;
      autoPopup = DEFAULTS.autoPopup;
      scale     = DEFAULTS.scale;
      storageClear();
      document.getElementById('asc-speed').value        = speed;
      startKeyBtn().textContent                          = startKey;
      pauseKeyBtn().textContent                          = pauseKey;
      document.getElementById('asc-auto-popup').checked = autoPopup;
      document.getElementById('asc-scale').value        = scale.toFixed(1);
      applyScale(scale);
    });

    // Drag
    let dragging = false, dragOffX = 0, dragOffY = 0;
    document.getElementById('asc-header').addEventListener('mousedown', (e) => {
      if (e.target.id === 'asc-close') return;
      dragging = true;
      const rect = overlay.getBoundingClientRect();
      dragOffX = e.clientX - rect.left;
      dragOffY = e.clientY - rect.top;
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      overlay.style.right = 'auto';
      overlay.style.left = (e.clientX - dragOffX) + 'px';
      overlay.style.top  = (e.clientY - dragOffY) + 'px';
    });
    document.addEventListener('mouseup', () => { dragging = false; });

    // Close
    document.getElementById('asc-close').addEventListener('click', () => overlay.__ascRemove());
  }

  function applyScale(s) {
    const overlay = document.getElementById('auto-scroller-overlay');
    if (overlay) overlay.style.transform = `scale(${s})`;
  }

  function onMouseMove(e) {
    const overlay = document.getElementById('auto-scroller-overlay');
    if (overlay && overlay.contains(e.target)) return;
    hoveredScrollable = findScrollable(e.target);
  }

  // ─── Init ────────────────────────────────────────────────────────────────
  async function init() {
    // Load settings from chrome.storage.sync (via bridge)
    const saved = await storageGet(['speed', 'startKey', 'pauseKey', 'autoPopup', 'scale']);
    if (saved.speed     !== undefined) speed     = saved.speed;
    if (saved.startKey  !== undefined) startKey  = saved.startKey;
    if (saved.pauseKey  !== undefined) pauseKey  = saved.pauseKey;
    if (saved.autoPopup !== undefined) autoPopup = saved.autoPopup;
    if (saved.scale     !== undefined) scale     = saved.scale;

    if (autoPopup) buildOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
