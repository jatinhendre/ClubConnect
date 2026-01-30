import Registration from "../models/Registration.js";

// Student registers
export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const already = await Registration.findOne({
      studentId: req.user.id,
      eventId
    });

    if (already) {
      return res.status(400).json({ message: "Already registered" });
    }

    const registration = await Registration.create({
      studentId: req.user.id,
      eventId
    });

    res.status(201).json(registration);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin gets all registrations
export const getRegistrations = async (req, res) => {
  const regs = await Registration.find()
    .populate("studentId", "name email")
    .populate("eventId", "title");

  res.json(regs);
};

// Admin approve/reject
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const reg = await Registration.findById(req.params.id);
    if (!reg) {
      return res.status(404).json({ message: "Not found" });
    }

    reg.status = status;
    await reg.save();

    res.json({ message: "Status updated" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
