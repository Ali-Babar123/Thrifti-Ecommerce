const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const googleLoginRoute = require('./routes/googleLogin');
const productRoutes = require('./routes/productRoute');

/** Routes */
const chatRoutes = require("./routes/chat.routes.js");
const messageRoutes = require("./routes/message.routes.js");

dotenv.config();

// Initialize express
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.get("/", (req, res) => {
  res.send("Thrifti Backend is live!");
});



app.set('trust proxy', true);



// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://accounts.google.com", "https://thrifti.temp2027.com"],
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to database
connectDB(); 


// Routes
app.use("/api/auth", authRoutes);
app.use('/api/auth', googleLoginRoute);
app.use("/api/products", productRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

// Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
