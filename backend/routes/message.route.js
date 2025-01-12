import express from "express";
import protectedRoute from "../lib/utils/protectedRoute.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;
