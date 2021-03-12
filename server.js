import express from "express";
import client from "./src/app.js";

const app = express();

app.use(express.static("src"));

app.get("/", async (req, res) => {
  const html = client({
    btn1: { name: "button 1" },
    btn2: { name: "button 2" },
    btn3: { name: "button 3" },
  });
  await html(res);
  res.end();
});

app.get("/data", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify({ randomNumber: Math.random() }));
});

app.listen(1234, () => {
  console.log("app running on http://localhost:1234");
});
