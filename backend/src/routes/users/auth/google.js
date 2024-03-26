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
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    req.session.codeVerifier = codeVerifier;
    req.session.codeChallenge = codeChallenge;
    const URL = `${supabaseGoogleAuthCallback.replace('/callback', '/authorize')}?provider=${provider}&state=${encodedState}&redirect_uri=${callbackURL}&code_verifier=${codeVerifier}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    res.redirect(URL);
});


router.get("/callback", async (req, res) => {

    const { state, code } = req.query;
    const { authState } = req.session;

    const codeVerifier = req.session.codeVerifier;

    if (state !== authState) {
        return res.status(400).send("Invalid state value");
    }

    res.send("Google Auth Callback");

    console.log("Code: ", code);
    if (!code) {
        return res.status(400).send("Invalid code value");
    }

    const { data, error } = await supabaseClient.auth.exchangeCodeForSession(code, {
        codeVerifier
    });

    if (error) {
        return res.status(500).send("An error occurred during the authentication process");
    }

    console.log("Data: ", data);

    req.session.user = data?.user;
    req.session.authState = null;
});

function generateCodeVerifier() {
    return crypto.randomBytes(32).toString('base64url');
}

function generateCodeChallenge(codeVerifier) {
    return crypto.createHash('sha256').update(codeVerifier).digest('base64url');
}

module.exports = router;