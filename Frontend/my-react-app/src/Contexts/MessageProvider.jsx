import React,{Children, createContext,useContext, useEffect, useState} from "react";
import useChatMessages from "../hooks/useChatMessages";
import { ChatContext } from "./ChatProvider";

/* Message context **/
export const MessageContext = createContext();

/** Message Provider */
export const MessageProvider = ({children}) => {
    const [error,setError] = useState(null);
    const [chatMessages,setChatMessages] = useState([]);

    /** Contexts */
    const {selectedChat,setSelectChat} = useContext(ChatContext);
    
    /** Hooks */
    const {Data,FetchChatMessages} = useChatMessages();

    /** if chat selected to fetch the current selected chat messages */
    useEffect( () => {
        // console.log(selectedChat,setSelectChat)
        if(selectedChat !== null){
            ( async () => {
                try {
                    const fetchChatMessagesPayload = {
                        chatId:selectedChat?._id,
                    };
                    const fetchedResponse = await FetchChatMessages(fetchChatMessagesPayload);
                } catch (e) {
                    return setError(e);
                }
            })()
        }
    },[selectedChat]);

    useEffect( () => {
        setChatMessages(Data.ChatMessages);
    },[Data.ChatMessages])

    if(!Data.ChatMessagesError){
        console.log(Data.ChatMessagesError);
    }

    return (
        <MessageContext.Provider value={{chatMessages,setChatMessages,Data}}>
            {children}
        </MessageContext.Provider>
    )
};
