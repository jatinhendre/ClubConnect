import Resource from "../models/Resource.js";

export const uploadResource = async (req, res) => {
  try {
    const { title, eventId } = req.body;

    const resource = await Resource.create({
      title,
      eventId,
      file: req.file.filename,
      uploadedBy: req.user.id
    });

    res.status(201).json(resource);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResourcesByEvent = async (req, res) => {
  const reg = await Registration.findOne({
    studentId: req.user.id,
    eventId: req.params.eventId,
    status: "approved"
  });

  if (!reg) {
    return res.status(403).json({
      message: "Not approved"
    });
  }

  const resources = await Resource.find({
    eventId: req.params.eventId
  });

  res.json(resources);
};
