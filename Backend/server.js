// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const googleLoginRoute = require('./routes/googleLogin');
// const productRoutes = require('./routes/productRoute');

// /** Routes */
// const chatRoutes = require("./routes/chat.routes.js");
// const messageRoutes = require("./routes/message.routes.js");

// dotenv.config();

// // Initialize express
// const app = express();
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.get("/", (req, res) => {
//   res.send("Thrifti Backend is live!");
// });


// app.set('trust proxy', true);



// // Middleware
// app.use(cors({
//   origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://accounts.google.com", "https://thrifti.temp2027.com"],
//   credentials: true
// }));
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Connect to database
// connectDB(); 


// // Routes
// app.use("/api/auth", authRoutes);
// app.use('/api/auth', googleLoginRoute);
// app.use("/api/products", productRoutes);
// app.use("/api/chats", chatRoutes);
// app.use("/api/messages", messageRoutes);

// // Server
// const PORT = process.env.PORT || 9000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const http = require("http");
const express = require("express");

/** Services */
const SocketService = require("./services/socket.services.js");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

/** Routes */
const chatRoutes = require("./routes/chat.routes.js");
const messageRoutes = require("./routes/message.routes.js");
const authRoutes = require("./routes/authRoutes");
const googleLoginRoute = require('./routes/googleLogin');
const productRoutes = require('./routes/productRoute');
<<<<<<< HEAD
=======
const likeProductRoute = require('./routes/likesRoute');
const followRoutes = require('./routes/followRoute');
dotenv.config();
>>>>>>> ec46aa9cf537dfdedb8247cd48e428eb11b93e8a

/** Mongoose requiring */
const MongooseConnection = require("./config/db.js");


MongooseConnection().then( async () => {
  
  const app = express();
  const httpServer = http.createServer(app);
  const socketService = new SocketService();
  const Port = process.env.PORT;

  /** Middlewares */
  app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://accounts.google.com", "https://thrifti.temp2027.com"],
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(cookieParser());
  app.use("/uploads", express.static("uploads"));

  /** Routes diclearing */
  app.use("/api/auth", authRoutes);
  app.use('/api/auth', googleLoginRoute);
  app.use("/api/products", productRoutes);
  app.use("/api/chats", chatRoutes);
  app.use("/api/messages", messageRoutes);

  app.get("/",(req,res) => {
    return res.send("welcome")
  })

  /** Server creating */
  socketService._io.attach(httpServer);

<<<<<<< HEAD
  /** Socket initialization */
  socketService.initListeners();
  
  httpServer.listen( Port,() => console.log(`\n Server at running this Port http://localhost:${Port}`));
})
=======
// Connect to database
connectDB(); 



// Routes
app.use("/api/auth", authRoutes);
app.use('/api/auth', googleLoginRoute);
app.use("/api/products", productRoutes);
app.use('/api/follow', followRoutes);
app.use("/api/likes", likeProductRoute);

// Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> ec46aa9cf537dfdedb8247cd48e428eb11b93e8a
