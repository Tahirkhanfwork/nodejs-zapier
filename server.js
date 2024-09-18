const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const db = require("./config/db");

db()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

dotenv.config();
const app = express();
app.use(express.json());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;
const logMessages = [];

app.post("/webhook", async (req, res) => {
  logMessages.push(req.body);
  res.sendStatus(200);
});

app.get("/webhook", (req, res) => {
    res.status(200).json({ logMessages });
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
