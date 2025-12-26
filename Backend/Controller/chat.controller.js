const { default: mongoose } = require("mongoose");
const chatModel = require("../Models/Chat.js");


async function HandleCreateChat(req,res){
    const {userId} = req?.body;
    
    /** Check userId is Exist */
    if(!userId){
        return res.status(404).json({
            message:"Error: userId does not exist",
            statusCode:404
        })
    }

    /** Check if chat room is alrady not exist */
    const chat = await chatModel.findOne({
        members:{$in : new mongoose.Types.ObjectId(userId)}
    });

    if(chat){
        return res.status(401).json({
            message:"Error: User chat already exist.",
            statusCode:401
        })
    }

    /** Creating chat room */
    const newChatRoom = await chatModel.create({
        members:[req.user._id,new mongoose.Types.ObjectId(userId)],
    });

    return res.status(200).json({
        data:newChatRoom,
        message:"Success: Chat created.",
        statusCode:200
    });
}



async function HandleDeleteChat(req,res) {
    const {chatId} = req.params;
    if(!chatId){
        return res.status(404).json({
            messgae:"Error: chatId is missing",
            statusCode:404
        });
    }

    /** check chatroom is exist */
    const chatRoom = await chatModel.findById(new mongoose.Types.ObjectId(chatId));
    if(!chatRoom){
        return res.status(404).json({
            message:"Error: chat room is not defind.",
            statusCode:404
        })
    }

    await chatRoom.deleteOne();
    return res.status(200).json({
        message:"Success: Chat room is deleted.",
        statusCode:200
    });
}

async function HandleGetUserChats(req,res){
    
    const chats = await chatModel.aggregate([
        {
            $match : {
                $expr : {
                    $in : [new mongoose.Types.ObjectId(req.user._id),"$members"]
                }
            }
        },
        {
            $lookup : {
                from : "users",
                let:{members:"$members"},
                pipeline:[
                    {
                        $match : {
                            $expr : {
                                $in : ["$_id","$$members"]
                            }
                        }
                    }
                ],
                as:"members"
            }
        },
        {
            $lookup : {
                from : "messages",
                localField:"lastMessage",
                foreignField:"_id",
                as:"lastMessage"
            }
        },
        {
            $addFields : {
                member : {
                    $first : {
                        $filter : {
                            input:"$members",
                            as:"m",
                            cond : {
                                $ne : ["$$m._id", new mongoose.Types.ObjectId(req?.user?._id)]
                            }
                        }
                    }
                },
                lastMessage : {
                    $first : "$lastMessage"
                }
            }
        },
        {
            $project : {
                _id:1,
                "member._id":1,
                "member.email":1,
                "member.fullname":1,
                "member.username":1,
                "member.profileImage":1,
                "member.lastSeen":1,
                "member.createdAt":1,
                lastMessage:1,
            }
        }
    ]);

    return res.status(200).json({
        data:chats,
        message:"Success: Chats successfully fetched.",
        statusCode:200
    });
}

module.exports = {
    HandleCreateChat,
    HandleDeleteChat,
    HandleGetUserChats
}