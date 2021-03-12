export default class FWK extends HTMLElement {
  constructor() {
    super();
    const internals = this.attachInternals();
    let shadow = internals.shadowRoot;
    // Detect whether we have SSR content already:
    if (shadow === null) {
      shadow = this.attachShadow({ mode: "closed" });
      shadow.innerHTML = html();
    }
  }
}
