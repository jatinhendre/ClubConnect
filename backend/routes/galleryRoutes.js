import express from "express";
import { getGallery, uploadGalleryPhoto, deleteGalleryPhoto, downloadGalleryPhoto } from "../controllers/galleryController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("image"), uploadGalleryPhoto);
router.get("/", protect, getGallery);
router.delete("/:id", protect, adminOnly, deleteGalleryPhoto);
router.get("/download/:id", downloadGalleryPhoto);
export default router;

