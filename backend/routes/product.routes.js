import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAllProducts,
  getProduct
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", asyncHandler(getAllProducts));
router.get("/:id", asyncHandler(getProduct));



export default router;
