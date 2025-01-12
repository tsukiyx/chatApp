import express from "express";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/friend.controller.js";
import protectedRoute from "../lib/utils/protectedRoute.js";

const router = express.Router();

router.post("/send/:id", protectedRoute, sendFriendRequest);
router.post("/accept/:id", protectedRoute, acceptFriendRequest);
router.post("/reject/:id", protectedRoute, rejectFriendRequest);

export default router;
