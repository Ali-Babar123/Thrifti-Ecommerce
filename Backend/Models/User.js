const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false, unique: false }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, 
    fullName: { type: String },
    profileImage: { type: String },
    userType: { type: String, default: "user" },
    isVerified: { type: Boolean, default: false },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    location: {
      country: String,
      city: String,
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
