const express = require("express");
const router = express.Router();

router.get("/", (_req, res) => {
    const { SUPABASE_GITHUB_CALLBACK_URI: supabaseGithubAuthCallback } = process.env;
    res.redirect(supabaseGithubAuthCallback);
});

module.exports = router;