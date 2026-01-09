import React,{useEffect,useState,useContext} from "react";
import API from "../api/api";

/** Api Service */

const useDeleteMessage = () => {

    const [Data,SetData] = useState({
        DeleteChatError:null,
        DeleteChatLoading:false,
        DeletedChat:null,
    });

    const DeleteChat = async (payload) => {
        try {
            
            const deleteChatResponse = await API.delete(`/messages/delete-message/${payload?.messageId}`,{withCredentials:true});
            if(deleteChatResponse?.data?.statusCode === 200 ){
                return deleteChatResponse?.data;
            }else {
                return SetData( (prevValues) => ({...prevValues,DeleteChatError:"Error: something wrong.",DeleteChatLoading:false,DeletedChat:deleteChatResponse?.data?.data}));
            }

        } catch (e) {
            return SetData( (prevValues) => ({...prevValues,DeleteChatError:e,DeleteChatLoading:false}));
        }
    };

    return {Data,DeleteChat};

};

export default useDeleteMessage;