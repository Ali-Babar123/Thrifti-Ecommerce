const express = require("express");
const multer = require("multer");
const {
  HandleGetCurrentUser,
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  getAllUsers,
  deleteUser,
  getLocation,
  updateProfile,
} = require("../Controller/authController");

const { verifyToken, optionalVerifyToken } = require("../middleware/authmiddleware");

const router = express.Router();

/* ================= MULTER CONFIG ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

/* ================= AUTH ROUTES ================= */
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/current-user", optionalVerifyToken, HandleGetCurrentUser);

/* ================= USER ROUTES ================= */
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);
router.get("/location", getLocation);

/* ✅ UPDATE PROFILE (IMAGE + DATA) */
router.put(
  "/update-profile",
  verifyToken,
  upload.single("profileImage"),
  updateProfile
);

/* ✅ GET PROFILE (NO MULTER HERE) */
router.get("/member", getProfile);

module.exports = router;
