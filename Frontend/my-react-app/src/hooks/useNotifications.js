import React,{useState,useEffect} from "react";
import API from "../api/api";

const useNotifications = (page = 1, limit = 8) => {
    const [Data,SetData] = useState({
        Notifications:null,
        NotificationsError:null,
        NotificationsLoading:false,
        totalPages:1,
        total:0
    });

    /** Fetching Notifications */
    useEffect( () => {

        /** Fetch Notification Handler */
        const FetchNotifications = async () => {
            try {
                SetData( (prevValues) => ({...prevValues,NotificationsLoading:true}));
                
                const notificationResponse = await API.get(`/api/notifications/notifications?page=${page}&limit=${limit}`,{withCredentials:true});
                if(notificationResponse?.data?.statusCode === 200){
                    SetData( (prevValues) => ({
                        ...prevValues,
                        Notifications:notificationResponse?.data?.data,
                        NotificationsLoading:false,
                        totalPages: notificationResponse?.data?.totalPages || 1,
                        total: notificationResponse?.data?.total || 0
                    }));
                    return;
                }else {
                    SetData( (prevValues) => ({...prevValues,NotificationsError:"Error: some thing wrong.."}));
                    return;
                }
            } catch (error) {
                SetData( (prevValues) => ({...prevValues,NotificationsError:error,NotificationsLoading:false}));
            }
        };

        const cleanUpFunctionTimer = setTimeout(FetchNotifications,200);
        return () => clearTimeout(cleanUpFunctionTimer);
    },[page,limit]);

    return Data;
};


export default useNotifications;