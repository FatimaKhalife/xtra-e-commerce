import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  Allprojects,
  project,projectNav
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", asyncHandler(Allprojects));
router.get("/:id", asyncHandler(project));
router.get("/:id/nav", projectNav);
export default router;
