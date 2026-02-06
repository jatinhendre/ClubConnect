import mongoose from "mongoose";

const clubRegistrationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },

    studentName: {
      type: String,
      required: true
    },

    class: {
      type: String,
      required: true
    },

    contactDetails: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const ClubRegistration = mongoose.model("ClubRegistration", clubRegistrationSchema);

export default ClubRegistration;
