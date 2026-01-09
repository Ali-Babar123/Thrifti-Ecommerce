import React,{useState} from "react";
import API from "../api/api";


const useSendMessage = () => {
    
    const [Data,SetData] = useState({
        SendMessageLoading:false,
        SendMessageError:null,
        SendedMessage:null
    });

    const SendMessage = async (payload) => {
        try {
            SetData( (prevValues) => ({...prevValues,SendMessageLoading:false}));
            const sendMessageResponse = await API.post("/api/messages/send-message",payload,{withCredentials:true});
            console.log(sendMessageResponse)
            if(sendMessageResponse?.data?.statusCode === 200){
                SetData( (prevValues) => ({...prevValues,SendMessageLoading:false,SendedMessage:sendMessageResponse?.data?.data}));
                return sendMessageResponse?.data?.data;    
            }else {
                return SetData( (prevValues) => ({...prevValues,SendMessageError:"Error: some thing wrong.",SendMessageLoading:false,SendedMessage:sendMessageResponse?.data?.data}));
            }
        } catch (e) {
            return SetData( (prevValues) => ({...prevValues,SendMessageError:e,SendMessageLoading:false}));
        }
    };

    return {Data,SendMessage};
};

export default useSendMessage;