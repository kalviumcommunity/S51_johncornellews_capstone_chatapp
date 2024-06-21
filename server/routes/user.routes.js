import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js"
import { getUsers, updateUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.post("/getusers", protectRoute, getUsers)
userRouter.post("/updateuser", protectRoute, updateUser)

export default userRouter