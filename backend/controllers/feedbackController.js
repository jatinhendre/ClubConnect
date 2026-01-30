import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const { eventId, rating, comment } = req.body;

    const feedback = await Feedback.create({
      studentId: req.user.id,
      eventId,
      rating,
      comment
    });

    res.status(201).json(feedback);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeedbackByEvent = async (req, res) => {
  const feedbacks = await Feedback.find({
    eventId: req.params.eventId
  }).populate("studentId", "name");

  res.json(feedbacks);
};
