const crypto = require("crypto");
const User = require("../Models/User");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

/**
 * STEP 1: Send confirmation link to CURRENT email
 */
exports.sendEmailChangeLink = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.emailChangeToken = hashedToken;
    user.emailChangeExpires = Date.now() + 24 * 60 * 60 * 1000; // 24h

    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/settings/profile/email/new` +
    `?code=${token}&user_id=${user._id}`;

    const emailHTML = `
      <div style="max-width:600px;margin:auto;font-family:Arial">
        <h2>Hi ${user.username || "there"}</h2>
        <p>You’ve requested to change your email on <b>Thrifti</b>.</p>
        <p>To continue, click the button below. This link will expire in 24 hours.</p>
        <a href="${verifyUrl}"
          style="display:inline-block;padding:12px 24px;background:#007782;color:#fff;border-radius:6px;text-decoration:none">
          Change Email
        </a>
        <p style="margin-top:20px;font-size:13px;color:#666">
          If you didn’t request this, you can ignore this email.
        </p>
      </div>
    `;

    await sendEmail({
      to: user.email, // CURRENT email
      subject: "Confirm your email change",
      html: emailHTML,
    });

    res.status(200).json({ message: "Confirmation email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

/**
 * STEP 2: Verify token + update email
 */
exports.verifyEmailChange = async (req, res) => {
  try {
    const { code, user_id, newEmail } = req.body;

    if (!code || !user_id || !newEmail) {
      return res.status(400).json({ message: "missing required fields code userid newemail" });
    }

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    const user = await User.findOne({
      _id: user_id,
      emailChangeToken: hashedToken,
      emailChangeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    user.email = newEmail;
    user.emailChangeToken = undefined;
    user.emailChangeExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Email updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Verification failed" });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;


      if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });

    }



    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


