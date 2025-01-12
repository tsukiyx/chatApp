import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: userId } });

    res.status(200).json({ success: true, filteredUsers });
  } catch (error) {
    console.log("Error in getUsers", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate(
      "friends",
      "fullName _id",
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userFriends = user.friends;

    return res.status(200).json(userFriends);
  } catch (error) {
    console.error("Error in getFriends:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: friendId } = req.params;

    if (friendId === userId.toString()) {
      return res.status(400).json({ messsage: "You can't remove yourself" });
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend)
      return res.status(400).json({ message: "User not found" });

    const areFriends = user.friends.includes(friendId);

    if (!areFriends)
      return res.status(400).json({ message: "You aren't friends" });

    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });
    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    console.log("Error in removeFriend", error.message);
    res.status(500).json({ messages: "Internal server error" });
  }
};
