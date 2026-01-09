const express = require("express");
const { getNotifications,readAllNotification,updateNotificationStatus } = require("../Controller/notification.controller");
const { verifyToken } = require("../middleware/authmiddleware");

/** Notification Router */
const notificationRouter = express.Router();


/** Secure routes */
notificationRouter.get("/read-all-notifications",verifyToken,readAllNotification);
notificationRouter.get("/notifications",verifyToken,getNotifications);
notificationRouter.patch("/update-notification-status",verifyToken,updateNotificationStatus);

module.exports = notificationRouter;