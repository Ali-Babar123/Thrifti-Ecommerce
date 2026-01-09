const Notification = require("../Models/Notification");
const { default: mongoose } = require('mongoose');
const User = require('../Models/User');

async function getNotifications (req,res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 8;
        const skip = (page - 1) * limit;

        const query = { recipient_id: new mongoose.Types.ObjectId(req?.user?._id) };

        const [notifications, total] = await Promise.all([
            Notification.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Notification.countDocuments(query)
        ]);

        const totalPages = Math.max(1, Math.ceil(total / limit) || 1);

        return res.status(200).json({
            data:notifications,
            statusCode:200,
            page,
            limit,
            total,
            totalPages
        });
    } catch (error) {
        return res.status(error?.status || 500).json({error:error,messsage:error?.messsage});
    }
};

async function updateNotificationStatus(req,res){
    try {
        const {notificationId,status} = req.body;
        const notification = await Notification.findById(new mongoose.Types.ObjectId(notificationId));
        if(!notification){
            return res.status(404).json({
                message: "Error: notification not found"
            })
        }
        
        const previousStatus = notification.status;
        notification.status = status;
        await notification.save();

        // Only adjust unread count when transitioning between UNREAD and READ
        if (previousStatus !== status) {
            let increment = 0;
            if (previousStatus === "UNREAD" && status === "READ") {
                increment = -1;
            } else if (previousStatus === "READ" && status === "UNREAD") {
                increment = 1;
            }

            if (increment !== 0) {
                const updateUserUnreadMessageCount = await User.findByIdAndUpdate(
                    new mongoose.Types.ObjectId(req?.user?._id),
                    { $inc : {unread_notifications_count:increment} },
                    {new:true}
                );
                req.user = updateUserUnreadMessageCount;
            }
        }

        return res.status(200).json({
            data:notification,
            statusCode:200
        });
    } catch (error) {
        return res.status(error?.status).json({
            error:error,
            message:error?.message
        })
    }
}

async function readAllNotification(req,res){
    try {
        const updateUserNotificationStatus = await Notification.updateMany({recipient_id:req?.user?._id},{
            $set : {status:"READ"}
        });
        console.log(updateUserNotificationStatus)
        const updateUserUnreadMessageCount = await User.findByIdAndUpdate(new mongoose.Types.ObjectId(req?.user?._id),{
            $set : {unread_notifications_count:0}
        },{new:true});
            
        req.user = updateUserUnreadMessageCount;
        
        return res.status(200).json({
            data:[],
            message:"Success: readed all notifications.",
            statusCode:200
        })
    } catch (error) {
        return res.status(error?.status).json({
            error:error,
            message:error?.message
        })       
    }
}


module.exports = {getNotifications,updateNotificationStatus,readAllNotification};