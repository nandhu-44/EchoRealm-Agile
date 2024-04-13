const express = require("express");
const router = express.Router();
const userModel = require("../../database/models/userModel");
const bcrypt = require("bcrypt");
const { createRandomUserName, createAvatarURL, createRandomBio } = require("../../utils/faker");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ status: 401, message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({ email, password: hashedPassword, username: createRandomUserName(), profilePicture: createAvatarURL(), bio: createRandomBio()});
      await newUser.save();
      let userObject = newUser.toObject();
      delete userObject.password;
      res.json({ status: 200, message: "User created successfully", user: userObject });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Internal server error" });
  }
});

module.exports = router;
