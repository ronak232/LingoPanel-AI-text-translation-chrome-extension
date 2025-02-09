function setupContextMenu() {
  chrome.contextMenus.create({
    id: "translate-text",
    title: "Translate to...",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "Hindi",
    title: "Hindi",
    contexts: ["selection"],
    parentId: "translate-text",
  });
  chrome.contextMenus.create({
    id: "Spanish",
    title: "Spanish",
    contexts: ["selection"],
    parentId: "translate-text",
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  chrome.storage.session.set({ lastWord: data.selectionText });

  chrome.sidePanel.open({ tabId: tab.id });
});
