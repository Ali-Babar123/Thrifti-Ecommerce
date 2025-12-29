import React,{useState,useContext, useEffect} from "react";
import { createContext } from "react";

/** Hooks */
import useChats from "../hooks/useChats";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const [selectedChat,setSelectChat] = useState(null);
    const [chats,setChats] = useState([]);

    const {Chats,ChatsError,ChatsLoading} = useChats();

    useEffect( () => {
        if(Chats !== null){
            setChats(Chats);
        }
    },[Chats])

    if(ChatsError !== null){
        console.log(ChatsError);
    }

    /** Return childrens */
    return (
        <ChatContext.Provider value={{selectedChat,setSelectChat,chats,setChats,ChatsLoading}}>
            {children}
        </ChatContext.Provider>
    )

};