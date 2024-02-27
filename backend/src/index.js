const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { connectMongo } = require("./database/mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });
console.clear();

connectMongo(process.env.MONGO_URI);

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/", (_req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${chalk.blue(port)}!`);
});
