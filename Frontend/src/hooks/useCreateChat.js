import React,{useState} from "react";

/** Api */
import API from "../api/api";

const useCreateChat = () => {
    const [Data,SetData] = useState({
        CreateChatError:null,
        CreateChatLoading:false,
        CreatedChat:null
    });

    const CreateChat = async (payload) => {
        try {
            const createChat = await API.post("/api/chats/create-chat",payload);
            if(createChat?.data?.statusCode === 200){
                SetData( (prevValues) => ({...prevValues,CreatedChat:createChat?.data?.data,CreateChatLoading:false}));
            }else {
                SetData( (prevValues) => ({...prevValues,CreatedChat:createChat?.data?.data,CreateChatLoading:false,CreateChatError:"Error: some thing wrong.."}));
            }
        } catch (e) {
            SetData( (prevValues) => ({...prevValues,CreateChatLoading:false,CreateChatError: e}));
        }
    };

    return {Data,CreateChat};
};

export default useCreateChat;