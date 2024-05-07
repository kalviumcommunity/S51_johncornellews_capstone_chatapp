import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        console.log(token)
        const secretKey = process.env.JWT_SECRET
        if (!token)
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        const decoded = jwt.verify(token, secretKey)
        if (!decoded)
            return res.status(401).json({ error: "Unauthorized - invalid token" });
        console.log(decoded)
        const user = await User.findById(decoded.userID)
        console.log("about to move to get users controller");
        console.log(user, "user")
        if (!user)
            return res.status(401).json({ error: "User not found" })
        req.user = user
        next();
        console.log("about to move to get users controller 2")
    } catch (error) {
        console.log(error.message, "from protect route")
        res.status(500).json({ error: error.message })
    }
}   