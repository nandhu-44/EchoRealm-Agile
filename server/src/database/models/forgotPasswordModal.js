const { Schema, model } = require("mongoose");

const forgotPasswordSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    default: Date.now() + 30 * 60 * 1000,
    required: true,
  },
});

module.exports = model("ForgotPassword", forgotPasswordSchema);
