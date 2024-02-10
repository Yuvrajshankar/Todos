import express from "express";
import { create, deleted, get } from "../controllers/todo.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/todo", verifyToken, get);
router.delete("/:taskId", verifyToken, deleted);

export default router;