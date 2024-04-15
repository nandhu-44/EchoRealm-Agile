const router = require("express").Router();
const userModel = require("../../database/models/userModel");

router.post("/", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ status: 404, message: "User not found" });
        }

        let userObj = user.toObject();
        delete userObj.password;

        return res.json({ status: 200, message: "User details fetched successfully", user: userObj });
    } catch (error) {
        return res.json({ status: 500, message: "Internal server error" });
    }
});

module.exports = router;