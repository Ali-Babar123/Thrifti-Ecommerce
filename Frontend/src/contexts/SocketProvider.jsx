import { useState,createContext,useEffect,useRef } from "react";
import {io} from "socket.io-client"

/** Socket context */
export const SocketContext = createContext();

/** Socket Provider */
export const SocketProvider = ({children}) => {

    const socketRef = useRef(null);
    const [isConnected,setIsConnected] = useState(false);

    /** For getting Envorment variables */
    const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect( () => {
        socketRef.current = io(SOCKET_URL,{withCredentials:true,autoConnect:true,});
        const socket = socketRef.current;
        
        /** Connected use info */
        socket.on("connect",() => { setIsConnected(true); console.log(`Socket: user connected at this ${socket?.id} id `)})
    },[SOCKET_URL])
    if(!socketRef.current){
        setTimeout( () => {
                return (
                <SocketContext.Provider value={{socket:(isConnected && socketRef.current)}}>
                    {children}
                </SocketContext.Provider>
            )
        },2000)
    }else {
            return (
            <SocketContext.Provider value={{socket:(isConnected && socketRef.current)}}>
                {children}
            </SocketContext.Provider>
        )
    }

};