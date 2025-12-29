import React, { useState, useContext } from "react";

/** Api */
import API from "../api/api";
import { useEffect } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const useChats = () => {
    const { isLoggedIn } = useContext(AuthContext);
    
    const [Data, SetData] = useState({
        ChatsError: null,
        ChatsLoading: false,
        Chats: []
    });

    useEffect(() => {
        // Only fetch chats if user is authenticated
        if (!isLoggedIn) {
            SetData({
                ChatsError: null,
                ChatsLoading: false,
                Chats: []
            });
            return;
        }

        const fetchedLatestChats = async () => {
            try {
                SetData((prevValues) => ({ ...prevValues, ChatsLoading: true }));
                // Cookies are automatically sent with withCredentials: true
                const response = await API.get("/api/chats/chats-history");
                console.log(response);
                if (response?.data?.statusCode === 200) {
                    SetData((prevValues) => ({ ...prevValues, Chats: response?.data?.data, ChatsLoading: false }));
                } else {
                    SetData((prevValues) => ({ ...prevValues, Chats: response?.data?.data, ChatsLoading: false, ChatsError: "Error: something wrong.." }));
                }
            } catch (e) {
                // If unauthorized, just set empty chats (user might have logged out)
                if (e?.response?.status === 401) {
                    SetData((prevValues) => ({ ...prevValues, ChatsLoading: false, Chats: [], ChatsError: null }));
                } else {
                    SetData((prevValues) => ({ ...prevValues, ChatsLoading: false, ChatsError: e }));
                }
            }
        };

        const timer = setTimeout(fetchedLatestChats, 200);

        /** Clean up function */
        return () => clearTimeout(timer);
    }, [isLoggedIn]);

    /** return response **/
    return Data;
};

export default useChats;