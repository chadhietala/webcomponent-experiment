import express from "express";
import client from "./src/app.js";

const app = express();

app.use(express.static("src"));

app.get("/", async (req, res) => {
  await client(res);
  res.end();
});

app.listen(1234, () => {
  console.log("app running on http://localhost:1234");
});
