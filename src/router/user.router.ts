import { Router } from "express";
import { registerUser } from "../controller/register.controller";
import { loginUser } from "../controller/login.controller";
import { logout } from "../controller/logout.controller";
import { autheticateUser } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", autheticateUser, logout);

export default router;
