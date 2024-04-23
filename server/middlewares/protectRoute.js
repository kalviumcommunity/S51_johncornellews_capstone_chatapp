import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const secretKey = process.env.JWT_SECRET
        if (!token)
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        const decoded = jwt.verify(token, secretKey)
        if (!decoded)
            return res.status(401).json({ error: "Unauthorized - invalid token" });
        console.log(decoded)
        const user = await User.findById(decoded.id)
        if (!user)
            return res.status(401).json({ error: "User not found" })
        req.user = user
        next()
    } catch (error) {
        console.log(error.message, "from protect route")
        res.status(500).json({ error: error.message })
    }
}   