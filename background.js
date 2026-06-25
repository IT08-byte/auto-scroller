// When the user clicks the extension icon, toggle the overlay on the active tab
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: 'asc-toggle-overlay' });
});
