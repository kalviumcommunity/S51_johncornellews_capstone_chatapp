import express from "express";
import {
    deleteMessage,
  getLatestMessages,
  getMessages,
  sendMessage,
  updateMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const msgRouter = express.Router();

msgRouter.post("/send/:id", protectRoute, sendMessage);
msgRouter.post("/get/:id", protectRoute, getMessages);
msgRouter.post("/getlatestmsg/:id", protectRoute, getLatestMessages);
msgRouter.patch("/updatemsg/:id", protectRoute, updateMessage);
msgRouter.patch("/deletemsg/:id", protectRoute, deleteMessage)


export default msgRouter;
