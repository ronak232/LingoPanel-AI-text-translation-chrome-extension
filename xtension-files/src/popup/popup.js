// popup.js
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggle_btn");
  
    function updateToggle() {
      chrome.storage.sync.get("enabled", (data) => {
        const enabled = data.enabled;
        toggleBtn.textContent = enabled ? "Disable" : "Enable";
        console.log("Button updated:", enabled);
      });
    }
  
    toggleBtn.addEventListener("click", function () {
      chrome.storage.sync.get("enabled", (data) => {
        const enabled = data.enabled;
        const newEnabled = !enabled;
  
        chrome.storage.sync.set({ enabled: newEnabled }, () => {
          console.log("Extension enabled state changed to:", newEnabled);
          updateToggle(); 
        });
      });
    });
  
    updateToggle();
  });
  