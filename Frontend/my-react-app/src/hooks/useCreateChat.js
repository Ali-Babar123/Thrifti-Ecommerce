import React, { useState } from "react";

/** Api */
import API from "../api/api";

const useCreateChat = () => {
    const [Data, SetData] = useState({
        CreateChatError: null,
        CreateChatLoading: false,
        CreatedChat: null
    });

    const CreateChat = async (payload) => {
        try {
            SetData((prevValues) => ({ ...prevValues, CreateChatLoading: true, CreateChatError: null }));
            const createChat = await API.post("/api/chats/create-chat", payload);
            if (createChat?.data?.statusCode === 200) {
                SetData((prevValues) => ({ 
                    ...prevValues, 
                    CreatedChat: createChat?.data?.data, 
                    CreateChatLoading: false 
                }));
                return { success: true, data: createChat?.data?.data, isExisting: createChat?.data?.isExisting };
            } else {
                SetData((prevValues) => ({ 
                    ...prevValues, 
                    CreatedChat: null, 
                    CreateChatLoading: false, 
                    CreateChatError: "Error: something went wrong.." 
                }));
                return { success: false, error: "Failed to create chat" };
            }
        } catch (e) {
            SetData((prevValues) => ({ 
                ...prevValues, 
                CreateChatLoading: false, 
                CreateChatError: e?.response?.data?.message || "Error creating chat" 
            }));
            return { success: false, error: e?.response?.data?.message || "Error creating chat" };
        }
    };

    return { Data, CreateChat };
};

export default useCreateChat;