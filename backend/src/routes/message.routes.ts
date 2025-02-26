import { Router } from "express";
import { getMessages, sendMessage } from "../controllers/message.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/:id", protect, getMessages);
router.post("/send/:id", protect, sendMessage);

export default router;
