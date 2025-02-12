const loading = document.querySelector(".loading-container");
const translationText = document.getElementById("translation-text");
const translatedText = document.getElementById("translated-text");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "isSidePanel") {
    sendResponse("ready");
    return true;
  }
  if (message.action === "showLoading") {
    loading.style.display = "flex";
    translatedText.innerText = "";
  }
  if (message.action === "updateTranslation") {
    updateTranslation(message.translation);
    return true;
  }
});

chrome.runtime.sendMessage({ action: "updateTranslation" }, (response) => {
  if (response && response.translation) {
    updateTranslation(response.translation);
  }
});

function updateTranslation(text) {
  loading.style.display = "none";
  translationText.innerText =
    "Your Translated text into your preferred language 🤖";
  if (!text) {
    return;
  } else {
    translatedText.innerText = text;
  }
}
