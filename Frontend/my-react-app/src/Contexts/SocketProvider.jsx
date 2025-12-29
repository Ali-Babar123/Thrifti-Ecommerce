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
        // Initialize socket with credentials to send cookies
        socketRef.current = io(SOCKET_URL, {
            withCredentials: true,
            autoConnect: true,
            transports: ['websocket', 'polling'], // Allow both transports
        });
        const socket = socketRef.current;
        
        /** Connected user info */
        socket.on("connect",() => { 
            setIsConnected(true); 
            console.log(`✅ Socket: user connected at ${socket?.id}`)
        });

        socket.on("connect_error", (error) => {
            // Don't log authentication errors as errors - they're expected for unauthenticated users
            if (error.message && error.message.includes("Unauthorized")) {
                console.log("🔒 Socket: Unauthenticated connection (this is normal for public users)");
                setIsConnected(true); // Still consider it connected, just not authenticated
            } else {
                console.error("❌ Socket connection error:", error);
                setIsConnected(false);
            }
        });

        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected");
            setIsConnected(false);
        });

        // Cleanup on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
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