import Registration from "../models/Registration.js";

const approvedOnly = async (req, res, next) => {
  try {
    const { eventId } = req.body;

    const reg = await Registration.findOne({
      studentId: req.user.id,
      eventId,
      status: "approved"
    });

    if (!reg) {
      return res.status(403).json({
        message: "You are not approved for this event"
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default approvedOnly;
