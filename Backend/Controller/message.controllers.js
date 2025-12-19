const mongoose = require("mongoose");
const messageModel = require("../Models/Message.js");
const chatModel = require("../Models/Chat.js");

async function HandleSendMessage(req,res){
    try {
        const {content} = req.body;
        const messagePayload = {
            content:content,
        };
        const createdMessage = await messageModel.create(messagePayload);
        return res.status(200).json({message:createdMessage});
    } catch (e) {
        return res.status(error?.status || 500).json({
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
        const [member] = chat.members.filter( (m) => m.toString() !== req.user._id.toString());
        const chatMessages = await messageModel.aggregate([
            {
                $match : {
                    $expr : {
                        $or : [
                            {
                                $eq : ["$sender",new mongoose.Types.ObjectId(req.user._id)]
                            },
                            {
                                $eq : ["$sender",new mongoose.Types.ObjectId(member)]
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
                    createdAt:-1
                }
            },
            {
                $unwind : "$sender"
            },
            {
                $project : {
                    _id:1,
                    chatId:1,
                    "member._id":1,
                    "member.fullname":1,
                    "member.email":1,
                    "member.profileImage":1,
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
    } catch (error) {
        return res.status(error?.status || 500).json({
            error:e,
            message:e?.message
        })          
    }
}

module.exports = {
    HandleDeleteMessage,
    HandleSendMessage,
    HandleUpdateMessageSeenStatus,
    HandleGetChatMessages
}

