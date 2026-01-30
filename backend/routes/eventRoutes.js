import express from "express";
import { createEvent, getEvents } from "../controllers/eventController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("poster"),
  createEvent
);

router.get("/", protect, getEvents);

export default router;
