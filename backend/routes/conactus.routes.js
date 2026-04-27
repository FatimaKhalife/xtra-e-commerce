import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/isAdmin.js";
import{Contactus,Getcontactus} from "../controllers/contactus.controller.js";

const router = express.Router();

router.post("/",protect,asyncHandler(Contactus));

router.get("/contact",protect,adminOnly,asyncHandler(Getcontactus));

export default router;