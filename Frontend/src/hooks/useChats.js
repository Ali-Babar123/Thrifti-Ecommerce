import React,{useState} from "react";

/** Api */
import API from "../api/api";
import { useEffect } from "react";

const useChats = () => {
    const [Data,SetData] = useState({
        ChatsError:null,
        ChatsLoading:false,
        Chats:[]
    });

    useEffect( () => {

        const fetchedLatestChats = async () => {
            try {
                SetData( (prevValues) => ({...prevValues,ChatsLoading:true}));
                const token = localStorage.getItem("token");
                const response = await API.get("/api/chats/chats-history",{withCredentials:true,headers:{Authorization:`Bearer ${token}`}});
                console.log(response)
                if(response?.data?.statusCode === 200){
                    SetData( (prevValues) => ({...prevValues,Chats:response?.data?.data,ChatsLoading:false}));
                }else {
                    SetData( (prevValues) => ({...prevValues,Chats:response?.data?.data,ChatsLoading:false,ChatsError:"Error: some thing wrong.."}));
                }
            } catch (e) {
                SetData( (prevValues) => ({...prevValues,ChatsLoading:false,ChatsError: e})); 
            }
        };

        const timer = setTimeout(fetchedLatestChats,200);

        /** Clean up function */
        return () => clearTimeout(timer);
    },[])

    /** return response **/
    return Data;
};

export default useChats;