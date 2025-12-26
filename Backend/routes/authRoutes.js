const express = require("express");
<<<<<<< HEAD
const { HandleGetCurrentUser,registerUser, loginUser,  getProfile , getAllUsers, deleteUser, getLocation } = require("../Controller/authController");
const {verifyToken} = require("../middleware/authmiddleware.js");
=======
const {verifyToken} = require("../middleware/authmiddleware");
const {HandleGetCurrentUser, registerUser, loginUser,  getProfile , getAllUsers, deleteUser, getLocation } = require("../Controller/authController");
>>>>>>> ec46aa9cf537dfdedb8247cd48e428eb11b93e8a

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser );
router.get('/location', getLocation);
<<<<<<< HEAD
router.get('/current-user', verifyToken,HandleGetCurrentUser);

=======
>>>>>>> ec46aa9cf537dfdedb8247cd48e428eb11b93e8a
router.get('/member', getProfile);


/** Secure routes */
router.route("/current-user").get(verifyToken,HandleGetCurrentUser)
module.exports = router;
