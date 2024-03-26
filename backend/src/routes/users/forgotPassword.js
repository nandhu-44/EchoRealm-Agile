const express = require("express");
const router = express.Router();
const supabaseClient = require("../../database/supabase");

router.post("/", async (req, res) => {
    const { email } = req.body;
    const { error, data } = await supabaseClient.auth.api.resetPasswordForEmail(email);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.json(data);
});

module.exports = router;
