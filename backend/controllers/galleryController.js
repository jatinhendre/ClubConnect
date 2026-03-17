import Gallery from "../models/Gallery.js";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary.js";

// Upload gallery photo (Admin)
export const uploadGalleryPhoto = async (req, res) => {
  try {
    const { title, description, clubId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "clubconnect/gallery",
    });

    const photo = await Gallery.create({
      title,
      description,
      image: result.secure_url,
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

// Download gallery photo — redirect to Cloudinary URL
export const downloadGalleryPhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const photo = await Gallery.findById(id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Redirect to the Cloudinary URL
    res.redirect(photo.image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete gallery photo (Admin)
export const deleteGalleryPhoto = async (req, res) => {
  try {
    const photo = await Gallery.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Extract public_id from Cloudinary URL and delete from Cloudinary
    try {
      const urlParts = photo.image.split("/");
      const folderAndFile = urlParts.slice(urlParts.indexOf("clubconnect")).join("/");
      const publicId = folderAndFile.replace(/\.[^/.]+$/, ""); // remove extension
      await cloudinary.uploader.destroy(publicId);
    } catch (cloudErr) {
      console.error("Cloudinary delete failed (continuing):", cloudErr.message);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Photo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
