const express = require("express");
const { registerUser, loginUser,  getProfile , getAllUsers, deleteUser, getLocation } = require("../Controller/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser );
router.get('/location', getLocation);

router.get('/member', getProfile);


module.exports = router;
