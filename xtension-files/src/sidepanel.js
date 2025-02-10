console.log("side panel loaded...")
chrome.runtime.sendMessage({action:"updateTranslation"}, (response) => {
  console.log("received request ", response)
  if(response && response.translation) {
    updateTranslation(response.translation)
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateTranslation") {
    updateTranslation(message.translation);
  }
});

function updateTranslation(text) {
  console.log("Translation text:", text);
  if (!text) return;
  
  // Update your side panel elements.
  document.getElementById("translation-text").innerText = "Your Translated text into your preferred language 🤖";
  document.getElementById("translated-text").innerText = text;
}
