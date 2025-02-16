import { Router } from "express";
import { getMessages } from "controllers/message.controller";
import { protect } from "middleware/auth.middleware";

const router = Router();

router.get("/:id", protect, getMessages);

export default router;
