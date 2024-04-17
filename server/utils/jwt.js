import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({ id: userID }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    });
    res.cookie("jwt", token, {
        maxAg: 15 * 24 * 60 * 60 * 1000, // milleseconds
        httpOnly: true, // prevent client side scripting attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    })
}
export default generateTokenAndSetCookie