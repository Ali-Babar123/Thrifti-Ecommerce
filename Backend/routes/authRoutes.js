const express = require("express");
const {verifyToken} = require("../middleware/authmiddleware");
const {HandleGetCurrentUser, registerUser, loginUser,  getProfile , getAllUsers, deleteUser, getLocation } = require("../Controller/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser );
router.get('/location', getLocation);
router.get('/member', getProfile);


/** Secure routes */
router.route("/current-user").get(verifyToken,HandleGetCurrentUser)
module.exports = router;
