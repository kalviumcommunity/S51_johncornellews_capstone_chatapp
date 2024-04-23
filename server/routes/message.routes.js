import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middlewares/protectRoute.js"

const msgRouter = express.Router()

msgRouter.post("/send/:id", protectRoute, sendMessage)
msgRouter.get("/get/:id", protectRoute, getMessages)

export default msgRouter