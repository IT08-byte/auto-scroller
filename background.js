// When the user clicks the extension icon, toggle the overlay on the active tab
chrome.action.onClicked.addListener(async (tab) => {
  try {
    await chrome.tabs.sendMessage(tab.id, { type: 'asc-toggle-overlay' });
  } catch (_) {
    // Content script unavailable on restricted pages (chrome://, about:, etc.)
  }
});
