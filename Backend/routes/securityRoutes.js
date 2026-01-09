const express = require("express");
const {
  sendEmailChangeLink,
  verifyEmailChange,
  changePassword
} = require("../Controller/securityController");
const { verifyToken } = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/email/change", verifyToken, sendEmailChangeLink);
router.post("/email/verify", verifyEmailChange);

router.post(
  "/password/password-change",
  verifyToken,
  changePassword
);



module.exports = router;
