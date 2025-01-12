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
