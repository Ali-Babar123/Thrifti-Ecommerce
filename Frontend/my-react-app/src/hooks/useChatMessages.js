import React,{useState} from "react";
import API from "../api/api";


const useChatMessages = () => {

    const [Data,SetData] = useState({
        ChatMessagesError:null,
        ChatMessagesLoading:false,
        ChatMessages:null
    });

    const FetchChatMessages = async (payload) => {
        try {
            const chatMessagesResponse = await API.get(`/api/messages/chat-messages?chatId=${payload?.chatId}`);
            console.log(chatMessagesResponse)
            if(chatMessagesResponse?.data?.statusCode === 200){
                
                SetData( (prevValues) => ({...prevValues,ChatMessagesLoading:false,ChatMessages:chatMessagesResponse?.data?.data}));
                return chatMessagesResponse?.data?.data;
            }else {
                return SetData( (prevValues) => ({...prevValues,ChatMessagesLoading:false,ChatMessagesError:'Error: some thing wrong.',ChatMessages:chatMessagesResponse?.data?.data}));
            }
        } catch (e) {
            return SetData( (prevValues) => ({...prevValues,ChatMessagesLoading:false,ChatMessagesError:e}));
        }
    };

    return {Data,FetchChatMessages};
};

export default useChatMessages;