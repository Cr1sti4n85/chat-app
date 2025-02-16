import { getUsers } from "../controllers/users.controller";
import { Router } from "express";
import { protect } from "middleware/auth.middleware";

const router = Router();

router.get("/", protect, getUsers);

export default router;
