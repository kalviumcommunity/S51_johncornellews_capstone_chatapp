import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/jwt.js";

export const signUp = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        console.log(username, password, confirmPassword, gender)
        const user_name = await User.findOne({ username });
        if (password !== confirmPassword)
            return res.status(400).json("Passwords don't match");
        if (user_name)
            return res.status(400).json('Username already exists');
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const profilePic = `https://avatar.iran.liara.run/public/${gender}/?username=${username}`;
        console.log(profilePic);
        const user = await User.create({
            username,
            fullName,
            password: hashedPassword,
            gender,
            profilePic
        });

        generateTokenAndSetCookie(user.id, res);

        return res.status(201).json({
            user,
            "message": "user created"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};

export const login = async (req, res) => {
    try {
        console.log("ok");
    } catch (error) {
        console.log(error);
    }
};

export const logout = async (req, res) => {
    try {
        console.log("ok from logout");
    } catch (error) {
        console.log(error);
    }
};
