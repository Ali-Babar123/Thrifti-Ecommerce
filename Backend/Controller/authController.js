const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const generateToken = (_id) =>
  jwt.sign({ _id }, process.env.JWT_SECRET);


// ================= REGISTER =================
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, country,city } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location:{
        city: city,
        country:country
      }
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    // 🔹 update last seen
    user.lastSeen = new Date();

    // 🔹 update location
   

    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

      await User.findByIdAndDelete(userId);

      res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getLocation = async (req, res) => { 
  try {
        let ip = req.ip || req.connection.remoteAddress;
        if (ip.includes('::ffff:')) ip = ip.split(':').pop(); // Remove IPv6 prefix
        if (ip === '127.0.0.1' || ip === '::1') {
            ip = '8.8.8.8'; // Example IP for local testing
        }

        // Call IP geolocation API
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        const data = response.data;
       if (data.status === 'fail') {
            return res.status(400).json({ error: 'Unable to fetch location' });
        }

        return res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}


