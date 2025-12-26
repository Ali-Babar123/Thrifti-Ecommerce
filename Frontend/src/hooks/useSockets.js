import React,{useContext,useState,useEffect} from "react";

/** Socket Context */
import {SocketContext} from "../contexts/SocketProvider";


const useSockets = () => {

    const [NewMessage,SetNewMessage] = useState(null);

    const {socket} = useContext(SocketContext);

    useEffect( () => {

        if (!socket) console.log(socket);
        
        socket.on("event:joined-chat",(details) => console.log(details));
        socket.on("event:new-message", (NewMessage) => {
            console.log(NewMessage)
            // setSelectChat( (prevChats) => {
            //   console.log(prevChats)
            // });
            SetNewMessage(NewMessage);
            return null;
        });
        /** Clean up functions */
        return () => {
            socket.off("event:joined-chat");
        }
    },[socket])

    const JoinChat = (chatId) => socket.emit("event:join-chat",{chatId});

    return {
        JoinChat,
        NewMessage,
    }
};

export default useSockets;