const User = require("../Models/User");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const facebookLoginCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=facebook_auth_failed`);
    }

    const user = req.user;
    
    // Update last seen
    user.lastSeen = new Date();
    await user.save();

    // Generate JWT token
    const accessToken = await user.GenerateAccessToken();
    if (!accessToken) {
      throw new Error("Error: Server error.");
    }

    // Production-ready cookie configuration
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    };

    // Download and save profile image locally if URL is provided
    if (user.profileImage && user.profileImage.startsWith('http')) {
      try {
        const uploadDir = path.join(__dirname, "../uploads/users");
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${user.facebookId || user._id}.jpg`;
        const savePath = path.join(uploadDir, fileName);
        
        const imgResponse = await axios.get(user.profileImage, { responseType: "arraybuffer" });
        fs.writeFileSync(savePath, imgResponse.data);
        
        user.profileImage = `${process.env.BASE_URL || "http://localhost:9000"}/uploads/users/${fileName}`;
        await user.save();
      } catch (err) {
        console.log("⚠️ Failed to save Facebook image locally:", err.message);
      }
    }

    // Redirect to frontend with token in cookie
    res.cookie("accessToken", accessToken, cookieOptions);
    
    // Redirect user to home page so that AuthProvider can pick up the session
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/`);
  } catch (error) {
    console.error("❌ Facebook login callback error:", error);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=facebook_auth_error`);
  }
};

module.exports = { facebookLoginCallback };


