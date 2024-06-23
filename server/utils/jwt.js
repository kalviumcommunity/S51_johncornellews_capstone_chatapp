import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, res) => {
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV !== "development", // Ensure secure cookie in production
    sameSite: "None", // Allow cross-site cookies
  });

  return token;
};

export default generateTokenAndSetCookie;
