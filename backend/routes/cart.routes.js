import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/auth.js";
import { GetCartItems, AddToCart, IncreaseQty, DecreaseQty, DeleteItem }
 from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/",protect, asyncHandler(GetCartItems));
router.post("/add",protect, asyncHandler(AddToCart));
router.put("/increase",protect, asyncHandler(IncreaseQty));
router.put("/decrease",protect, asyncHandler(DecreaseQty));
router.delete("/delete",protect, asyncHandler(DeleteItem))

export default router;
