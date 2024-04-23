import express from "express"
import { sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const msgRouter = express.Router()

msgRouter.post("/send/:id", protectRoute, sendMessage)

export default msgRouter