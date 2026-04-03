import express from "express";
import { getInstructors } from "../controllers/course.js";
import { protect, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/instructors", protect, isAdmin, getInstructors);

export default router;