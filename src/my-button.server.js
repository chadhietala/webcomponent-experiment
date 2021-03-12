import { withShadow } from "./util.js";
import axios from "axios";

export const html = (attrs) => `${attrs.name}<button><slot></slot></button>`;

export const MyButton = (attrs, children) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(`<my-button>${withShadow(html(attrs))}${children()}</my-button>`);
    }, 2000);
  });

export const MyOtherButton = async (attrs, children) => {
  const response = await axios.get("http://localhost:1234/data");
  return `${response.data.randomNumber}<my-button>${withShadow(
    html(attrs)
  )}${children()}</my-button>`;
};

export const MyOtherOtherButton = (attrs, children) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Throwing an error to test boundaries"));
    }, 3000);
  });
};

export const ErrorBoundary = (children) => {
  async function errorBoundary(res) {
    try {
      await children()(res);
    } catch (e) {
      res.write(
        `<div style="background: red; border: #444444"><p>Something went wrong:</p>\n<pre style="background: #eeeeee">${e.stack}</pre></div>`
      );
    }
  }
  errorBoundary.isErrorBoundary = true;
  return errorBoundary;
};
