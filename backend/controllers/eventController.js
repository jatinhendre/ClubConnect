import Event from "../models/Event.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, clubId, eventDate } = req.body;

    let posterUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: "clubconnect/posters",
      });
      posterUrl = result.secure_url;
    }

    const event = await Event.create({
      title,
      description,
      clubId,
      eventDate,
      poster: posterUrl,
      createdBy: req.user.id
    });

    res.status(201).json(event);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().populate("clubId", "clubName");
  res.json(events);
};
