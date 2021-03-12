import {
  MyButton,
  MyOtherButton,
  MyOtherOtherButton,
  ErrorBoundary,
} from "./my-button.server.js";
import { html } from "./util.js";

export default (attrs) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>Hello World Streaming Web Components</h1>
      <p>
        This application uses declarative shadow DOM for SSR. They can then be
        incrementally rehydrated via the browser.
      </p>
      <main id="main">
        ${MyButton(attrs.btn1, () => "Streamed Button 1")}
        ${MyOtherButton(attrs.btn2, () => "Streamed Button 2")}
        ${ErrorBoundary(
          () =>
            html` ${MyOtherOtherButton(attrs.btn3, () => "Streamed Button 3")} `
        )}
      </main>
      <script src="my-button.js" type="module"></script>
    </body>
  </html>
`;
