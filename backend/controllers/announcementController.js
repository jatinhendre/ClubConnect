import Announcement from "../models/Announcement.js";
import Club from "../models/Club.js";
import User from "../models/User.js";
import sendEmail from "../utils/emailUtility.js";

// Admin creates announcement
export const createAnnouncement = async (req, res) => {
  try {
    const { title, message, clubId } = req.body;

    // Create announcement
    const announcement = await Announcement.create({
      title,
      message,
      clubId,
      createdBy: req.user.id
    });

    // Get club with members
    const club = await Club.findById(clubId).populate("members", "name email");

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }

    // Send email to all club members
    const emailPromises = club.members.map(member => {
      return sendEmail(
        member.email,
        `Announcement: ${title}`,
        `
        <h2>New Announcement from ${club.clubName}</h2>
        <h3>${title}</h3>
        <p>${message}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">This announcement was sent to all members of ${club.clubName}</p>
        `
      );
    });

    await Promise.all(emailPromises);

    res.status(201).json({
      message: "Announcement created and sent to members",
      announcement,
      memberCount: club.members.length
    });

  } catch (error) {
    console.error("Announcement Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all announcements (Admin)
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("clubId", "clubName")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get announcements for student's clubs
export const getMyAnnouncements = async (req, res) => {
  try {
    // Find clubs where student is a member
    const clubs = await Club.find({ members: req.user.id });
    const clubIds = clubs.map(c => c._id);

    // Get announcements for those clubs
    const announcements = await Announcement.find({ clubId: { $in: clubIds } })
      .populate("clubId", "clubName")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete announcement (Admin)
export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json({ message: "Announcement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
