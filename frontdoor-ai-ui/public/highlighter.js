const highlightColor = "rgb(248,214,8)";

const template = `
  <template id="highlightTemplate">
    <span class="highlight" style="background-color: ${highlightColor}; display: inline"></span>
  </template>
  <button id="frontdoorHighlighter">
    Summarize
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #frontdoorHighlighter {
    align-items: center;
    background-color: black;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 80px;
    z-index: 9999;
    color: white;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${highlightColor};
  }
`;

class Highlighter extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  get markerPosition() {
    return JSON.parse(this.getAttribute("markerPosition") || "{}");
  }

  get styleElement() {
    return this.shadowRoot.querySelector("style");
  }

  get highlightTemplate() {
    return this.shadowRoot.getElementById("highlightTemplate");
  }

  static get observedAttributes() {
    return ["markerPosition"];
  }

  render() {
    this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = styled({});
    this.shadowRoot.appendChild(style);
    this.shadowRoot.innerHTML += template;
    this.shadowRoot
        .getElementById("frontdoorHighlighter")
        .addEventListener("click", () => {
          this.highlightSelection()
        });
  }

  highlightSelection() {
    const userSelection = window.getSelection();
   this.highlight()
    const selectedText = userSelection.toString();
    if(selectedText.length > 50) {
      this.getSummary("http://localhost:8080/summary/getSummary", { selectedText: selectedText }).then(async (data) => {
        await chrome.runtime.sendMessage({
          type: 'summarise',
          summary: {text: selectedText, summary: data.summary, name: `Summary created at ${new Date().toLocaleString()}`}
        })
      });
    }
    window.getSelection().empty();
  }
  highlight() {
    let range, selection;
    selection = window.getSelection();
      if (selection.rangeCount && selection.getRangeAt) {
        range = selection.getRangeAt(0);
      }
      document.designMode = "on";
      if (range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      document.execCommand("backColor", false, highlightColor);
      document.designMode = "off";
  }
  async getSummary(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
window.customElements.define("frontdoor-highlighter", Highlighter);
