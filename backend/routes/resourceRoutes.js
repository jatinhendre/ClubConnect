import express from "express";
import { uploadResource, getResourcesByEvent } from "../controllers/resourceController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("file"),
  uploadResource
);

router.get("/:eventId", protect, getResourcesByEvent);

export default router;
