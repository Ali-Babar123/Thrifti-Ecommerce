const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../Models/User");
const { Socket } = require("socket.io");

const verifyToken = async (req, res, next) => {
  /** const authHeader = req.headers.authorization;

    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // ✅ update last seen
      user.lastSeen = new Date();
      await user.save();

      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  **/
  try {
    
      const accessToken = req.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")[0];
      if(!accessToken){
        throw new Error("Error: Unauthrized request.");
      }
      const decodJwtToken = await jwt.verify(accessToken,process.env.JWT_SECRET);
      if(!decodJwtToken){
        throw new Error("Error: Invalid accessToken.");
      }
      const user = await User.findById(new mongoose.Types.ObjectId(decodJwtToken?._id)).select("-password");
      if(!user){
        throw new Error("Error: User not found.");
      }
      req.user = user;
      next();
  } catch (e) {
    throw new Error(e)
  }
};

async function socketAuthMiddleware(socket,next) {
    try {
        const token = socket.handshake.headers.cookie?.split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
        if(!token){
          return next(new Error("Unauthorized: Token missing"));
        }
    
        const verifyJwt = jwt.verify(token,process.env.JWT_SECRET);

        if(!verifyJwt) {
            throw new Error("Jwt Is Not Verifed")
        }
        const checkTheUserInDb = await User.findById(verifyJwt._id).select("-password");
        if(!checkTheUserInDb){
            throw new Error("User Not Found Error From verifyJsonWebToekns")
        }

        socket.user = checkTheUserInDb;

        next();
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = { verifyToken,socketAuthMiddleware };
