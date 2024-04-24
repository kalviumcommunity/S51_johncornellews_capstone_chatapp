import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    const userId = req.user._id
    try {
        const users = await User.find({
            _id: { $ne: userId }
        }).select("-password")
        res.send(users)
    } catch (error) {
        console.log('Error: ', error.message, "from user controller");
        return res.status(500).json("Server Error")
    }
}