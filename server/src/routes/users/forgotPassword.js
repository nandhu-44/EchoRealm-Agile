const router = require("express").Router();
const userSchema = require("../../database/models/userModel");
const forgotPasswordModal = require("../../database/models/forgotPasswordModal");
const nodeMailer = require("nodemailer");
const crypto = require("crypto");

router.post("/", async (req, res) => {
  const { email } = req.body;
  let redirectUrl = req.headers?.referer ?? process.env.CLIENT_URL;
  redirectUrl = redirectUrl.replace(/\/$/, "");
  const user = await userSchema.findOne({
    email: email,
  });

  if (user) {
    res.json({ message: "Email sent successfully", status: 200 });
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_APP_PASSWORD,
      },
    });

    const resetToken = crypto.randomBytes(32).toString("hex");

    await forgotPasswordModal.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        resetToken: resetToken,
        expiry: Date.now() + 3600000,
      },
      { upsert: true },
    );
    const href = `${redirectUrl}/reset-password/${user._id}/${resetToken}`;
    const mailOptions = {
      from: `EchoRealm <${process.env.NODEMAILER_EMAIL}>`,
      to: email,
      subject: "EchoRealm Password Reset",
      html: `Click here to reset password : ${href}`,
    };

    transporter.sendMail(mailOptions, (err, _info) => {
      if (err) {
        console.log(`Error sending email: ${err?.message}`);
      }
    });
  } else {
    res.json({ message: "Email not found", status: 404 });
  }
});

module.exports = router;
