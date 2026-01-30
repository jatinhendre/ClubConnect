import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, clubId, eventDate } = req.body;

    const event = await Event.create({
      title,
      description,
      clubId,
      eventDate,
      poster: req.file?.filename,
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
