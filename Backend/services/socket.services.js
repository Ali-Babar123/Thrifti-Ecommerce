const {Server} = require("socket.io");
const {socketAuthMiddleware} = require("../middleware/authmiddleware");
const onlineUsers = new Map();

class SocketService {
    constructor(){
        this._io = new Server({
            cors : {
                origin : process.env.CLIENT_URL || "http://localhost:5173",
                credentials:true
            }
        });
    }

    initListeners(){
        const io = this._io;
        io.on("connection",(socket) => {

            /** Authenctication middleware */
            io.use(socketAuthMiddleware);
            global.socketServer = socket;
            global.server = this._io;
            console.log(` New Socket User connected. ${socket.id}`);
            onlineUsers.set(socket?.user?._id,socket.id);
            socket.on("event:join-chat", (data) => this.joinChat(data,socket));
        })
    }

    joinChat(data,socket){
        console.log(data)
        socket.join(data?.chatId?.toString());
        socket.emit("event:joined-chat",{message:`Joined Chat: ${data?.chatId}. This User: ${socket.id}`})
    }

    io(){
        return this._io;
    }
}

module.exports = SocketService;