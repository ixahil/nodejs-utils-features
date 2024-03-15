import express from "express";
import { getUser, login, register } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// authorized routes
router.get("/me", authenticate, getUser);

const UserRouter = router;

export default UserRouter;
