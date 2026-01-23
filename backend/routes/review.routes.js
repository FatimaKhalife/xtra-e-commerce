import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getReviews, addReview } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/:productId", asyncHandler(getReviews));
router.post("/", asyncHandler(addReview));

export default router;
