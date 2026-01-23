import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  signup,
  verifyEmail,
  login,
  me,
  logout,
  googleLogin,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.get("/verify", asyncHandler(verifyEmail));
router.post("/login", asyncHandler(login));
router.post("/google", asyncHandler(googleLogin));
router.get("/me", protect, asyncHandler(me));
router.post("/logout", asyncHandler(logout));

export default router;