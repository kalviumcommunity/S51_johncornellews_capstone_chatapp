import express from "express"
import { protectRoute } from "../middlewares/protectRoute.js"
import { getUsers } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/getusers", protectRoute, getUsers)

export default userRouter