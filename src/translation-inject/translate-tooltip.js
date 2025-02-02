console.log("running popup...");
const translate_btn = document.querySelector(".translate");
const selectedTooltip = document.querySelector(".translation-tooltip");

function copyToClipboard() {
  document.addEventListener("mouseup", () => {
    requestAnimationFrame(() => {
      let selection = document.getSelection();

      if (selection.isCollapsed) {
        selectedTooltip.style.display = "none";
        return;
      }
      const rectPosition = selection.getRangeAt(0).getBoundingClientRect();
      selectedTooltip.style.display = "block";
      selectedTooltip.style.left = `${
        rectPosition.left +
        rectPosition.width / 2 -
        selectedTooltip.clientWidth / 2
      }px`;
      selectedTooltip.style.top = `${
        rectPosition.top - selectedTooltip.clientHeight
      }px`;
    });
    translate_btn.addEventListener("click", () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      console.log("translation selection ", selectedText);
    });
  });
}

copyToClipboard();
