import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js"; // ✅ Import BOTH app & server

dotenv.config();

const PORT = process.env.PORT || 5001; // ✅ Default to 5001 if not set
const __dirname = path.resolve()

// ✅ Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*" , (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend" , "dist" , "index.html"));
  })

}

// ✅ Start server
server.listen(PORT, () => {
  console.log(`Backend is running on PORT: ${PORT}`);
  connectDB();
});
