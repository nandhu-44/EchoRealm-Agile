const mongoose = require("mongoose");
const chalk = require("chalk");

async function connectMongo(mongoURI){
  try {
    await mongoose.connect(mongoURI);
    console.log(chalk.magenta("Connected to MongoDB🌿"));
  } catch (error) {
    console.error(chalk.red("Error connecting to MongoDB:"), error?.message);
  }
}

module.exports = { connectMongo };
