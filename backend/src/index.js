const express = require("express");
const chalk = require("chalk");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
console.clear();

const { connectMongo } = require("./database/mongoose");
const supabaseClient = require("./database/supabase");
global.supabaseClient = supabaseClient;
connectMongo(process.env.MONGO_URI);

const routes = require("./routes/routes");

const port = 8080;
const app = express();

app.use(cors({
  origin: `http://localhost:${process.env.FRONTEND_PORT}`,
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, "../../frontend/build")));


app.get("/", (_req, res) => {
  res.sendFile("index.html");
});

app.use("/api", routes);

const expressRoutes = ["/api"]

// app.use("/:path", (req, res) => {
//   expressRoutes.map((route) => {
//     if (route === req.params?.path) {
//       res.redirect(`/?redirect-to=${req.params.path}`);
//     } else {
//       res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${chalk.blue(port)}!`);
});
