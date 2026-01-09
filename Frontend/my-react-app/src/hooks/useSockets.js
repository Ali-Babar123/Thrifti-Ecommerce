import React, { useContext, useState, useEffect, useCallback } from "react";

/** Socket Context */
import { SocketContext } from "../contexts/SocketProvider";


const useSockets = () => {

    const [NewMessage, SetNewMessage] = useState(null);
    const [onlineStatusUpdates, setOnlineStatusUpdates] = useState({}); // userId -> { isOnline: boolean, timestamp: Date }
    const [typingUsers, setTypingUsers] = useState({}); // chatId -> { userId: boolean } - tracks who is typing in which chat

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        if (!socket) return;

        socket.on("event:joined-chat", (details) => console.log(details));
        
        socket.on("event:new-message", (NewMessage) => {
            console.log(NewMessage);
            SetNewMessage(NewMessage);
            return null;
        });

        // Listen for user online status updates
        socket.on("user:online", ({ userId }) => {
            setOnlineStatusUpdates(prev => ({
                ...prev,
                [userId]: { isOnline: true, timestamp: new Date() }
            }));
        });

        socket.on("user:offline", ({ userId }) => {
            setOnlineStatusUpdates(prev => ({
                ...prev,
                [userId]: { isOnline: false, timestamp: new Date() }
            }));
        });

        // Listen for typing indicators
        socket.on("event:user-typing", ({ chatId, userId, isTyping }) => {
            setTypingUsers(prev => {
                const newState = { ...prev };
                if (!newState[chatId]) {
                    newState[chatId] = {};
                }
                if (isTyping) {
                    newState[chatId][userId] = true;
                } else {
                    delete newState[chatId][userId];
                    if (Object.keys(newState[chatId]).length === 0) {
                        delete newState[chatId];
                    }
                }
                return newState;
            });
        });

        /** Clean up functions */
        return () => {
            socket.off("event:joined-chat");
            socket.off("event:new-message");
            socket.off("user:online");
            socket.off("user:offline");
            socket.off("event:user-typing");
        };
    }, [socket]);

    const JoinChat = useCallback((chatId) => {
        if (socket) {
            socket.emit("event:join-chat", { chatId });
        }
    }, [socket]);

    const emitTypingStart = useCallback((chatId) => {
        if (socket && chatId) {
            socket.emit("event:typing-start", { chatId });
        }
    }, [socket]);

    const emitTypingStop = useCallback((chatId) => {
        if (socket && chatId) {
            socket.emit("event:typing-stop", { chatId });
        }
    }, [socket]);

    return {
        JoinChat,
        NewMessage,
        onlineStatusUpdates,
        typingUsers,
        emitTypingStart,
        emitTypingStop
    };
};

export default useSockets;