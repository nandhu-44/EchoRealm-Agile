const login = require("./login");
const register = require("./register");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const updateProfile = require("./updateProfile");
const getUserDetails = require("./getUserDetails");
const auth = require("./auth/index");
const router = require("express").Router();

router.use("/login", login);
router.use("/register", register);
router.use("/forgot-password", forgotPassword);
router.use("/reset-password", resetPassword);
router.use("/update-profile", updateProfile);
router.use("/get-user-details", getUserDetails);
router.use("/auth", auth);

router.get("/", (_req, res) => {
  res.send("Users route");
});

module.exports = router;
