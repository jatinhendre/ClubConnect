import Event from "../models/Event.js";
import Resource from "../models/Resource.js";

export const getGallery = async (req, res) => {
  try {

    const events = await Event.find().select("title poster");
    const resources = await Resource.find().select("title file");

    res.json({
      events,
      resources
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
