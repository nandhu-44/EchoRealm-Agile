const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const supabaseClient = require("../../../database/supabase");
const { log } = require("console");

router.get("/", (req, res) => {
    const { SUPABASE_GOOGLE_CALLBACK_URI: supabaseGoogleAuthCallback } = process.env;
    const provider = "google";
    const state = crypto.randomBytes(16).toString('hex');
    req.session.authState = state;
    const encodedState = encodeURIComponent(state);
    const callbackEndpoint = "/api/users/auth/google/callback";
    const callbackURL = encodeURIComponent(`${req.protocol}://${req.get('host')}${callbackEndpoint}`);
    const URL = `${supabaseGoogleAuthCallback.replace('/callback', '/authorize')}?provider=${provider}&state=${encodedState}&redirect_uri=${callbackURL}`;
    res.redirect(URL);
});


router.get("/callback", async (req, res) => {

    const { state, code } = req.query;
    const { authState } = req.session;

    // Verify the state value
    if (state !== authState) {
        return res.status(400).send("Invalid state value");
    }
    log(req.query)

    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google", options: {
            queryParams: {
                code,
                authState,
            },
            redirectTo: "/",
        }
    })

    if (error) {
        return res.status(500).send("An error occurred during the authentication process");
    }

    console.log("Data: ", JSON.stringify(data));

    res.send("Google Auth Callback");
    console.log("Code: ", code);

    req.session.authState = null;
});

module.exports = router;