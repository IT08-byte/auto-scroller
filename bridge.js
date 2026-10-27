// Isolated-world bridge: relays chrome messages into the MAIN world via CustomEvents
// and provides cross-site storage backed by chrome.storage.sync

// Any page script can dispatch these window events, so only settings keys
// content.js actually writes are allowed through — no arbitrary storage writes.
const ALLOWED = ['speed', 'startKey', 'pauseKey', 'autoPopup', 'scale', 'theme'];

// Toggle overlay
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'asc-toggle-overlay') {
    window.dispatchEvent(new CustomEvent('asc-toggle-overlay'));
  }
});

// Storage bridge: MAIN world posts requests here via CustomEvent,
// bridge reads/writes chrome.storage.sync and replies via another CustomEvent
window.addEventListener('asc-storage-get', async (e) => {
  let result = {};
  try {
    result = await chrome.storage.sync.get(e.detail);
  } catch (_) {
    // Extension reloaded / context invalidated — reply empty so content.js uses defaults
  }
  window.dispatchEvent(new CustomEvent('asc-storage-result', { detail: result }));
});

window.addEventListener('asc-storage-set', (e) => {
  const d = e.detail;
  if (!d || typeof d !== 'object' || Array.isArray(d)) return;
  const safe = Object.fromEntries(Object.entries(d).filter(([k]) => ALLOWED.includes(k)));
  if (Object.keys(safe).length) chrome.storage.sync.set(safe).catch(() => {});
});

// ponytail: a page can still trigger a settings reset — annoyance, not a leak; gate it if abused
window.addEventListener('asc-storage-clear', () => {
  chrome.storage.sync.clear().catch(() => {});
});
