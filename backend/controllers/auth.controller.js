import generateToken from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const generateProfilePic = (username, gender) => {
  const baseUrl = "https://avatar.iran.liara.run/public/";
  return `${baseUrl}${gender === "male" ? "boy" : "girl"}?username=${username}`;
};

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password.length < 8)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Password don't match" });

    const userExists = await User.findOne({ username });
    if (userExists)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const profilePic = generateProfilePic(username, gender);

    const newUser = await User.create({
      fullName,
      username,
      password: hashPassword,
      gender,
      profilePic,
    });

    const token = generateToken(newUser._id, res);

    const userInfo = {
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      userInfo,
    });
  } catch (error) {
    console.log("Error in SignUp", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, res);

    const userInfo = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    };

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userInfo,
    });
  } catch (error) {
    console.log("Error in LogIn", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in LogOut", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
