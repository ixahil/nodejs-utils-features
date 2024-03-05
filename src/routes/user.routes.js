import { Router } from "express";
import {
  register,
  login,
  getUserInfo,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/Authenticate.middleware.js";

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// Authenticated Routes
userRouter.get("/me", authenticate, getUserInfo);

export default userRouter;
