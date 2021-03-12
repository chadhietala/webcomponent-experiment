export const withShadow = (str, state = "closed") =>
  `<template shadowroot="${state}">${str}</template>`;

export function html(strings, ...exprs) {
  return async (res) => {
    for await (let chunk of incrementalZip(strings, exprs)) {
      if (typeof chunk === "function") {
        await chunk(res);
      } else if (chunk instanceof Error) {
        throw chunk;
      } else {
        res.write(chunk);
      }
    }
  };
}

function incrementalZip(strings, exprs) {
  return {
    [Symbol.asyncIterator]() {
      return {
        i: 0,
        mode: "string",
        async next() {
          if (this.i < strings.length) {
            if (this.mode === "string") {
              this.mode = "expr";
              return Promise.resolve({ value: strings[this.i], done: false });
            } else if (this.mode === "expr" && exprs[this.i]) {
              let expr;
              let err;
              try {
                expr = await exprs[this.i];
              } catch (e) {
                err = e;
              }

              if (expr === "ERROR_BOUNDARY") {
                expr = "";
              } else if (err) {
                expr = err;
              }

              this.mode = "string";
              this.i++;
              return Promise.resolve({ value: expr, done: false });
            } else {
              this.i++;
              this.mode = "string";
              return Promise.resolve({ value: "", done: false });
            }
          }

          return Promise.resolve({ done: true });
        },
      };
    },
  };
}
