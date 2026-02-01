import express from "express";
import { getGallery } from "../controllers/galleryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getGallery);

export default router;
