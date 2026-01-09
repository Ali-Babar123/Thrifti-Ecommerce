const mongoose = require("mongoose");
const messageModel = require("../Models/Message.js");
const chatModel = require("../Models/Chat.js");
const Notification = require('../Models/Notification.js');
const {onlineUsers} = require("../services/socket.services.js");
const User = require("../Models/User.js");

async function HandleSendMessage(req,res){
    try {
        // return console.log("requested")
        const {content,chatId} = req.body;
        const chat = await chatModel.findById(new mongoose.Types.ObjectId(chatId));
        if(!chat){
            return res.status(404).json({
                message:"Error: Chat room not found.",
                statusCode:404
            })
        }
        let createdMessage = await messageModel.create({
            content,
            sender: req.user._id,
            chatId
        });

        createdMessage = createdMessage.toObject();

        createdMessage.sender = {
        _id: req.user._id,
        fullname: req.user.fullname,
        email: req.user.email,
        profileImage: req.user.profileImage
        };

        const socketService = global.server;
        const [member] = chat.members?.filter( (member) => member.toString() !== req.user._id.toString());
        const socketId = onlineUsers.get(member?.toString());
        const ClientChatRoom = socketService?.sockets?.adapter?.rooms?.get(chat._id.toString());
        /** Checking is Online checking is online and join this chat checking is ofline */
        const messageStatus = (!socketId ? "SENT" : ClientChatRoom?.has(socketId) ? "SEEN" : socketId ? "DELIVERED":null );

        if(messageStatus === "SENT" || messageStatus === 'DELIVERED'){
            console.log("iswroking")
            const messageNotification = await Notification.create({
                recipient_id: new mongoose.Types.ObjectId(member),
                status:"UNREAD",
                type:"NEW_MESSAGE",
                metaData:{
                    actor_id: new mongoose.Types.ObjectId(req?.user?._id),
                    actor_name: req?.user?.fullname || req?.user?.username || req?.user?.email || "Unknow User",
                    item_title: createdMessage.content,
                },
                linkUrl:'/inbox'
            });
            await User.findByIdAndUpdate(
                new mongoose.Types.ObjectId(messageNotification.recipient_id),
                { $inc : {unread_notifications_count:1} }
            );

            // Real-time notification popup for online users
            if (socketService && socketId) {
                socketService.to(socketId.toString()).emit("event:new-notification", messageNotification);
            }
        }

        socketService.to(chatId.toString()).emit("event:new-message",createdMessage);
        
        /** Update chat last message */
        const updateChat = await chatModel.findByIdAndUpdate(new mongoose.Types.ObjectId(createdMessage.chatId),{lastMessage:new mongoose.Types.ObjectId(createdMessage?._id)});
        return res.status(200).json({message:createdMessage});
    } catch (e) {
        console.log(e);
        return res.status(e?.status || 500).json({
            error:e,
            message:e?.message
        })
    }
}

async function HandleDeleteMessage(req,res){
    try {
        const {messageId} = req.body;
        /** Check message is exist in mongodb --> */
        const message = await messageModel.findById(new mongoose.Types.ObjectId(messageId));
        if(!message){
            return res.status(404).json({
                message:"Error: message not found.",
                statusCode:404
            })
        };
        /** if message is exit */
        await message.deleteOne();
        return res.status(200).json({
            message:"Success: message successfully deleted.",
            statusCode:200
        })
    } catch (error) {
        return res.status(error?.status || 500).json({
            error:e,
            message:e?.message
        })   
    }
}

async function HandleUpdateMessageSeenStatus(req,res){
    try {
        
        const {messageId,seen} = req.body;
        /** Note: check message is exist */
        const message = await messageModel.findById(new mongoose.Types.ObjectId(messageId));
        if(!message){
            return res.status(404).json({
                message:"Error: message not found.",
                statusCode:404
            })
        }
        /** if exist message update the message seen status */
        if(!["SENT","DELIVIERD","SEEN"].includes(seen)){
            return res.status(400).json({
                message:"Error: Invalid seen value does not matched."
            });
        }

        /** if all is ok assign the seen value */
        message.seen = seen;
        await message.save();
        return res.status(200).json({
            message:"Success: message successfully updated.",
            statusCode:200
        })
    } catch (error) {
        return res.status(error?.status || 500).json({
            error:e,
            message:e?.message
        })
    }
};

async function HandleGetChatMessages(req,res){
    try {
        const {chatId} = req.query;
        
        if(!chatId){
            return res.status(400).json({
                message:"Error: chatId field is missing.",
                statusCode:400
            })
        }
        const chat = await chatModel.findById(new mongoose.Types.ObjectId(chatId));
        if(!chat){
            return res.status(404).json({
                message:"Error: chat is not defind.",
                statusCode:404
            });
        }
        const [receiver] = chat.members.filter( (m) => m.toString() !== req.user._id.toString());
        
        const chatMessages = await messageModel.aggregate([
            {
                 
                $match: {
                    $expr: {
                        $or: [
                            // Normal messages (sender ↔ receiver)
                            {
                                $and: [
                                    { $eq: ["$sender", new mongoose.Types.ObjectId(req.user?._id)] },
                                    { $eq: ["$chatId", new mongoose.Types.ObjectId(chat?._id)] }
                                ]
                            },
                            {
                                $and: [
                                    { $eq: ["$sender", new mongoose.Types.ObjectId(receiver)] },
                                    { $eq: ["$chatId", new mongoose.Types.ObjectId(chat?._id)] }
                                ]
                            }
                        ]
                    }
                }
            },
            {
                $lookup : {
                    from:"users",
                    localField:"sender",
                    foreignField:"_id",
                    as:"sender"
                }
            },
            {
                $sort : {
                    createdAt:1
                }
            },
            {
                $unwind : "$sender"
            },
            {
                $project : {
                    _id:1,
                    chatId:1,
                    "sender._id":1,
                    "sender.fullname":1,
                    "sender.email":1,
                    "sender.profileImage":1,
                    content:1,
                    seen:1,
                    status:1,
                    createdAt:1,
                }
            }
        ]);
        
        return res.status(200).json({
            data:chatMessages,
            message:"Success: chat messages successfully fetched.",
            statusCode:200
        })
    } catch (e) {
        console.log(e)
        return res.status(e?.status || 500).json({
            error:e,
            message:e?.message
        })          
    }
}

async function HandleGetUnreadMessagesCount(req,res){
    try {
        const userId = new mongoose.Types.ObjectId(req.user?._id);

        const userChats = await chatModel.find({ members: userId }).select("_id");
        const chatIds = userChats.map((c) => c._id);

        if (chatIds.length === 0) {
            return res.status(200).json({
                data: { count: 0 },
                statusCode: 200
            });
        }

        const count = await messageModel.countDocuments({
            chatId: { $in: chatIds },
            sender: { $ne: userId },
            seen: { $ne: "SEEN" }
        });

        return res.status(200).json({
            data: { count },
            statusCode: 200
        });
    } catch (e) {
        console.log(e);
        return res.status(e?.status || 500).json({
            error:e,
            message:e?.message
        }) 
    }
}

async function HandleMarkAllMessagesAsRead(req,res){
    try {
        const userId = new mongoose.Types.ObjectId(req.user?._id);

        const userChats = await chatModel.find({ members: userId }).select("_id");
        const chatIds = userChats.map((c) => c._id);

        if (chatIds.length === 0) {
            return res.status(200).json({
                message:"Success: no chats to update.",
                statusCode:200
            });
        }

        await messageModel.updateMany(
            {
                chatId: { $in: chatIds },
                sender: { $ne: userId },
                seen: { $ne: "SEEN" }
            },
            {
                $set: { seen: "SEEN" }
            }
        );

        return res.status(200).json({
            message:"Success: messages marked as read.",
            statusCode:200
        });
    } catch (e) {
        console.log(e);
        return res.status(e?.status || 500).json({
            error:e,
            message:e?.message
        }) 
    }
}

module.exports = {
    HandleDeleteMessage,
    HandleSendMessage,
    HandleUpdateMessageSeenStatus,
    HandleGetChatMessages,
    HandleGetUnreadMessagesCount,
    HandleMarkAllMessagesAsRead
}

