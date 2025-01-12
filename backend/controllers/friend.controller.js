import mongoose from "mongoose";
import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (senderId.toString() === receiver._id.toString()) {
      return res.status(400).json({ message: "You can't add yourself" });
    }

    const isFriend = receiver.friends.includes(senderId.toString());
    if (isFriend) {
      return res.status(400).json({ message: "You are already friends" });
    }

    const requestExists = await FriendRequest.findOne({
      receiverId,
      senderId,
      status: { $in: ["pending"] },
    });

    if (requestExists) {
      return res
        .status(400)
        .json({ message: "You already have a pending friend request" });
    }

    const newRequest = await FriendRequest.create({
      receiverId,
      senderId,
    });

    return res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;
    const senderId = req.user._id;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    let requestStatus = request.status;
    const receiverId = request.receiverId;

    if (requestStatus !== "pending") {
      return res.status(400).json({ message: "It is not a pending request" });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);

    await sender.save();
    await receiver.save();

    request.status = "accepted";
    await request.save();

    return res.status(200).json(request);
  } catch (error) {
    console.log("Error in acceptFriendRequest", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const { id: requestId } = req.params;

    const request = await FriendRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    const requestStatus = request.status;

    if (requestStatus !== "pending") {
      return res.status(400).json({ message: "It is not a pending request" });
    }

    request.status = "rejected";
    await request.save();

    return res.status(200).json(request);
  } catch (error) {
    console.log("Error in rejectFriendRequest", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
