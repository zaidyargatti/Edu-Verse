import express from "express";
import { getMyLectures } from "../controllers/instructor.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/lectures", protect, getMyLectures);

export default router;