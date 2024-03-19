const express = require("express");
const router = express.Router();
const supabaseClient = require("../../database/supabase");

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: email,
            },
        },
    });
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    return res.json({ ...data?.session });
});

module.exports = router;
