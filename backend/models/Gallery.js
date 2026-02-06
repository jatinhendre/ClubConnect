import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club"
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Gallery", gallerySchema);
