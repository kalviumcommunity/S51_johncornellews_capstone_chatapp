import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller.js";

export const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/signup", signUp)