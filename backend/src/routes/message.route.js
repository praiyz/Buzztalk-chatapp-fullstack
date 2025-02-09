import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js"; // ✅ Make sure this is correct

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar); // ✅ Changed "user" to "users"
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
