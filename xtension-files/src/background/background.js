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
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
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
    console.log("API response:", data); // See full response
    const translatedText = data; // Adjust as needed
    console.log("Setting translation in storage:", translatedText);
    chrome.storage.local.set({ translate: translatedText });
    return translatedText;
  } catch (error) {
    console.error("error in translating ...");
  }
}

chrome.contextMenus.onClicked.addListener(async (data, tab) => {

  chrome.sidePanel.open({ tabId: tab.id });
  await chrome.storage.local.set({ translate: data.selectionText });
  const selectedLanguage = data.menuItemId;

  try {
    const translation = await callApi(data.selectionText, selectedLanguage);
    chrome.runtime.sendMessage({ action: "updateTranslation", translation });
  } catch (error) {
    console.error("Error in callApi:", error);
  }
});
