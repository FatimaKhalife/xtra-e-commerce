import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/auth.js";
import{Checkout} from "../controllers/checkout.controller.js";

const router = express.Router();

router.post("/",protect,asyncHandler(Checkout));

export default router;