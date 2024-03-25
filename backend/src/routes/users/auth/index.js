const express = require("express");
const router = express.Router();

const google = require("./google");
const github = require("./github");

router.use("/google", google);
router.use("/github", github);

module.exports = router;