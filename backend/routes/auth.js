import express from "express";
import { checkAuth, login, logout, register } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/logout", verifyToken, logout);
router.get("/check", verifyToken, checkAuth);

export default router;