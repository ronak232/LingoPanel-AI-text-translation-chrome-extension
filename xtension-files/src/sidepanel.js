chrome.storage.session.get("lastword", ({ lastword }) => {
    updateDefinitation(lastword);
  });
  
  chrome.storage.session.onChanged.addListener((change) => {
    const lastTranslationChange = change["lastword"];
  
    if (!lastTranslationChange) {
      return;
    }
  
    updateDefinitation(lastTranslationChange.newValue);
  });
  
  function updateDefinitation(text) {
    if (!text) return;
    document.body.querySelector("#selected-text").style.display = "none";
    document.body.querySelector("#translation-text").innerText = text;
    document.body.querySelector("#translated-text").innerText =
      text[text.toLowerCase()] ??
      `Unknown word! Supported words: ${Object.keys(words).join(", ")}`;
  }
  