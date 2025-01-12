import express from "express";
import protectedRoute from "../lib/utils/protectedRoute.js";
import {
  getFriends,
  getUsers,
  removeFriend,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectedRoute, getUsers);
router.get("/friends", protectedRoute, getFriends);
router.post("/remove/:id", protectedRoute, removeFriend);

export default router;
