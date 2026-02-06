import express from "express";
import {
  createAnnouncement,
  getAllAnnouncements,
  getMyAnnouncements,
  deleteAnnouncement
} from "../controllers/announcementController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createAnnouncement);
router.get("/all", protect, adminOnly, getAllAnnouncements);
router.get("/my", protect, getMyAnnouncements);
router.delete("/:id", protect, adminOnly, deleteAnnouncement);

export default router;
