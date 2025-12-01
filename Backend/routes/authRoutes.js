const express = require("express");
const { registerUser, loginUser, getAllUsers, deleteUser } = require("../Controller/authController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:id', deleteUser )


module.exports = router;
