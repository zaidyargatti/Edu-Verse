import express from "express";
import { createCourse, getCourses } from "../controllers/course.js";
import { protect, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createCourse);
router.get("/", protect, isAdmin, getCourses);

export default router;