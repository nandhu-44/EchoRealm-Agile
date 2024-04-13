const router = require("express").Router();
const userModel = require("../../database/models/userModel");
const forgotPasswordModal = require("../../database/models/forgotPasswordModal");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { userId, resetToken, password } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
        return res.json({
            status: 404,
            message: "User not found",
        });
    }

    const reset = await forgotPasswordModal.findOne({ userId, resetToken });
    if (!reset) {
        return res.json({
            status: 404,
            message: "Invalid or expired token",
        });
    }

    const now = new Date();
    const tokenExpires = new Date(reset.expiry);
    if (now > tokenExpires) {
        return res.json({
            status: 404,
            message: "Invalid or expired token",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    await reset.deleteOne({ userId, resetToken });
    return res.json({
        status: 200,
        message: "Password reset successfully",
    });
});

module.exports = router;