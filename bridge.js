// Isolated-world bridge: relays chrome messages into the MAIN world via CustomEvents
// and provides cross-site storage backed by chrome.storage.sync

// Toggle overlay
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'asc-toggle-overlay') {
    window.dispatchEvent(new CustomEvent('asc-toggle-overlay'));
  }
});

// Storage bridge: MAIN world posts requests here via CustomEvent,
// bridge reads/writes chrome.storage.sync and replies via another CustomEvent
window.addEventListener('asc-storage-get', async (e) => {
  const keys = e.detail;
  const result = await chrome.storage.sync.get(keys);
  window.dispatchEvent(new CustomEvent('asc-storage-result', { detail: result }));
});

window.addEventListener('asc-storage-set', (e) => {
  chrome.storage.sync.set(e.detail);
});

window.addEventListener('asc-storage-clear', () => {
  chrome.storage.sync.clear();
});
