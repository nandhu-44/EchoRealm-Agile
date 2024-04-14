const express = require("express");
const chalk = require("chalk");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const rateLimitMiddleware = require("./middlewares/rateLimiter");
const dotenv = require("dotenv");
dotenv.config();
console.clear();

const { connectMongo } = require("./database/mongoose");
connectMongo(process.env.MONGO_URI);

const routes = require("./routes/routes");

const port = 8080;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(rateLimitMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.get("/", (_req, res) => {
  res.send("Server is running!");
});

app.post("/", (req, res) => {
  res.json({ message: "Testing : " + req.body?.content ?? "none" });
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${chalk.blue(port)}!`);
});

process.on("unhandledRejection", (error) => {
  console.error(error);
});

process.on("uncaughtException", (error) => {
  console.error(error);
});