import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(400).json({ message: "User not found" });
    const isFriend = receiver.friends.includes(receiverId);

    if (isFriend)
      return res.status(400).json({ message: "You are already friends" });

    const requestPending = await FriendRequest.findOne({
      receiverId,
      senderId,
      status: "pending",
    });

    if (requestPending)
      return res.status(400).json({ message: "You have a pending request" });

    const newRequest = await FriendRequest.create({
      receiverId,
      senderId,
    });

    await newRequest.save();

    return res.status(201).json(newRequest);
  } catch (error) {
    console.log("Error in sendFriendRequest", error.message);
    res.status(500).json({ message: "Internal server error" });
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

    let requestStatus = request.status;

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
