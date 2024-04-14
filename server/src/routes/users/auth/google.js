const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // Find or create a user in your database here
        // For now, we'll just return the profile
        return cb(null, profile);
    }
));

router.get("/", (req, res) => {
    res.send("Google Auth Route");
});

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // 
        res.redirect(process.env.CLIENT_URL);
    });

module.exports = router;