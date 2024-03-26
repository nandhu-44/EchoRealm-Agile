const express = require("express");
const router = express.Router();
const supabaseClient = require("../../database/supabase");

router.post("/", async (req, res) => {
    const { email } = req.body;
    console.log("Email: ", email);
    const { error, data } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `/update-password`
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    console.log("Data: ", data);
    return res.json(data);
});

module.exports = router;
