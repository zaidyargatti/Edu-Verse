import express from "express";
import { createLecture } from "../controllers/lecture.js";
import { protect, isAdmin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createLecture);

export default router;