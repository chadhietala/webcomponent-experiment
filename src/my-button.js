import { html } from "./my-button.server.js";

class MyButtonInternal extends HTMLElement {
  constructor() {
    super();
    const internals = this.attachInternals();
    let shadow = internals.shadowRoot;
    // Detect whether we have SSR content already:
    if (shadow === null) {
      // A Declarative Shadow Root doesn't exist.
      // Create a new shadow root and populate it:
      shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = html();
    }

    shadow.firstChild.addEventListener("click", () => {
      alert("a button");
    });
  }
}

customElements.define("my-button", MyButtonInternal);
