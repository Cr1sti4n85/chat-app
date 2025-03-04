import {
  checkAuthenticated,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller";
import { Router } from "express";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.get("/check", protect, checkAuthenticated);

router.put("/update-profile", protect, updateProfile);

export default router;
