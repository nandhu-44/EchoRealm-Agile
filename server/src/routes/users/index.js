const login = require("./login");
const register = require("./register");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");
const auth = require("./auth/index");
const router = require("express").Router();

router.use("/login", login);
router.use("/register", register);
router.use("/forgot-password", forgotPassword);
router.use("/reset-password", resetPassword);
router.use("/auth", auth);

router.get("/", (_req, res) => {
  res.send("Users route");
});

module.exports = router;
