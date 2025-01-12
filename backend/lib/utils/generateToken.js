import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (error) {
    console.log("Error in generateToken", error.message);
  }
};

export default generateToken;
