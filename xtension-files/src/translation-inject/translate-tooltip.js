console.log("running popup...");
const translate_btn = document.querySelector(".translate");
const selectedTooltip = document.querySelector(".translation-tooltip");

async function callApi(translationText, textLang= "Hindi") {
  try {
    const response = await fetch("http://localhost:8000/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ translationText, textLang }),
    });
    const data = await response.json();
    console.log("response ", data);
  } catch (error) {
    console.error("error in translating ...");
  }
}

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
    translate_btn.addEventListener("mouseup", () => {
      const selection = window.getSelection();
      const selectedText = selection.toString();
      callApi(selectedText);
      // window.open(`https//:google.com/search?q=text${selectedText}`, '_blank','popup, width=600, height=600')
      // console.log("selected ", selectedText)
    });
  });
}

copyToClipboard();
