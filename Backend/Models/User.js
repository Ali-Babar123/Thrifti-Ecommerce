const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false, unique: false }, // Google users may not have a username
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // make optional for Google login
    fullName: { type: String },
    profileImage: { type: String },
    userType: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
