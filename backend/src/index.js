const express = require("express");
const chalk = require("chalk");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
console.clear();

const { connectMongo } = require("./database/mongoose");
const supabaseClient = require("./database/supabase");
global.supabaseClient = supabaseClient;
connectMongo(process.env.MONGO_URI);


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("/", (_req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${chalk.blue(port)}!`);
});
