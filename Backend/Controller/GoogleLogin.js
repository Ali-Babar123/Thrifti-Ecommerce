const fs = require("fs");
const path = require("path");
const axios = require("axios");
const {admin} = require("../config/firebaseAdmin");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { token, picture } = req.body;
    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name, uid } = decoded;

    if (!email) {
      return res.status(400).json({ success: false, message: "Invalid Google account" });
    }

    // Ensure uploads/users folder exists
    const uploadDir = path.join(__dirname, "../uploads/users");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Check if user exists
    let user = await User.findOne({ email });
    let localImagePath = "";

    if (!user) {
      // New user, download image
      if (picture) {
        const fileName = `${Date.now()}-${uid}.jpg`;
        const savePath = path.join(uploadDir, fileName);
        try {
          const imgResponse = await axios.get(picture, { responseType: "arraybuffer" });
          fs.writeFileSync(savePath, imgResponse.data);
          localImagePath = `${process.env.BASE_URL || "http://localhost:9000"}/uploads/users/${fileName}`;
        } catch (err) {
          console.log("⚠️ Failed to save Google image locally:", err.message);
        }
      }

      user = await User.create({
        fullName: name || "Google User",
        email,
        profileImage: localImagePath,
        googleId: uid,
        isVerified: true,
      });

    } else {
      // Existing user
      // Check if image already exists locally
      if (!user.profileImage && picture) {
        // Download only if no image is stored
        const fileName = `${Date.now()}-${uid}.jpg`;
        const savePath = path.join(uploadDir, fileName);
        try {
          const imgResponse = await axios.get(picture, { responseType: "arraybuffer" });
          fs.writeFileSync(savePath, imgResponse.data);
          localImagePath = `${process.env.BASE_URL || "http://localhost:9000"}/uploads/users/${fileName}`;

          user.profileImage = localImagePath;
          await user.save();
        } catch (err) {
          console.log("⚠️ Failed to save Google image locally:", err.message);
        }
      }
    }

    const myToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      message: "Google login successful",
      token: myToken,
      user,
    });

  } catch (error) {
    console.error("❌ Google login error:", error);
    return res.status(400).json({ success: false, message: "Invalid Google login" });
  }
};

module.exports = { googleLogin };
