import Event from "../models/Event.js";
import Resource from "../models/Resource.js";
import Gallery from "../models/Gallery.js";

// Upload gallery photo (Admin)
export const uploadGalleryPhoto = async (req, res) => {
  try {
    const { title, description, clubId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const photo = await Gallery.create({
      title,
      description,
      image: req.file.filename,
      clubId: clubId || null,
      uploadedBy: req.user.id
    });

    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all gallery photos
export const getGallery = async (req, res) => {
  try {
    const photos = await Gallery.find()
      .populate("clubId", "clubName")
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });

    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete gallery photo (Admin)
export const deleteGalleryPhoto = async (req, res) => {
  try {
    const photo = await Gallery.findByIdAndDelete(req.params.id);
    
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.json({ message: "Photo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
