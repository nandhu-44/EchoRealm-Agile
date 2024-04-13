const express = require("express");
const router = express.Router();
const userModel = require("../../database/models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ status: 401, message: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      res.json({ status: 401, message: "Invalid credentials" });
      return;
    }
    let userObject = user.toObject();
    delete userObject.password;
    res.json({ status: 200, message: "Login successful", user: userObject });
  } catch (error) {
    res.json({ status: 500, message: "Internal server error" });
  }
});

module.exports = router;
