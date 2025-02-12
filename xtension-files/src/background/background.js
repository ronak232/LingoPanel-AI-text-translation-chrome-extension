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
  chrome.contextMenus.create({
    id: "French",
    title: "French",
    contexts: ["selection"],
    parentId: "translate-text",
  });
  chrome.contextMenus.create({
    id: "German",
    title: "German",
    contexts: ["selection"],
    parentId: "translate-text",
  });
  chrome.contextMenus.create({
    id: "English",
    title: "English",
    contexts: ["selection"],
    parentId: "translate-text",
  });
  chrome.contextMenus.create({
    id: "Japanese",
    title: "Japanese",
    contexts: ["selection"],
    parentId: "translate-text",
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

let activeSidePanelTab = null;

chrome.contextMenus.onClicked.addListener(async (data, tab) => {
  try {
    chrome.sidePanel.open({ tabId: tab.id });
    const selectedLanguage = data.menuItemId;
    

    chrome.runtime.sendMessage({ action: "showLoading" }); // to show sidepanel about loading
    activeSidePanelTab = tab.id;

    const translation = await callApi(data.selectionText, selectedLanguage);

    chrome.runtime.sendMessage({ action: "updateTranslation", translation });
  } catch (error) {
    console.error("Error in callApi:", error);
  }
});

async function callApi(translationText, textLang = "English") {
  try {
    const response = await fetch("http://localhost:8000/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ translationText, textLang }),
    });
    const data = await response.json();
    const translatedText = data;
    return translatedText;
  } catch (error) {
    console.error("error in translating ...");
  }
}

// chrome.tabs.onActivated.addListener((activeInfo) => {
//   console.log("active tab", activeInfo);
//   if (!activeSidePanelTab && activeInfo.tabId !== activeSidePanelTab) {
//     chrome.sidePanel.setOptions({
//       enabled: false,
//     });
//     activeSidePanelTab = null;
//   }
// });
