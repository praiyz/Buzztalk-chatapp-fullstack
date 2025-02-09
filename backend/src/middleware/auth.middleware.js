import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" }); // ✅ Added return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized invalid token" }); // ✅ Added return
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // ✅ Added return
        }

        req.user = user;
        next(); // ✅ Move to the next middleware only if everything is fine

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        
        if (!res.headersSent) {  // ✅ Prevent multiple responses
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};
