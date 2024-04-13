const express = require("express");
const router = express.Router();
const crypto = require("crypto");

router.get("/", (req, res) => {
    res.send("Google auth route");
});

module.exports = router;
