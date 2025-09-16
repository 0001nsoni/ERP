import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  issuedBy: {
    type: String,
    required: true
    // Example: "Admin", "Faculty", "Warden"
  },
  targetAudience: [{
    type: String,
    enum: ["All", "Students", "Faculty", "Hostlers", "DayScholars", "BusStudents"]
  }],
  attachments: [{
    type: String
    // Can store file URLs or image links (like PDF, JPG)
  }],
  validTill: {
    type: Date
    // Notice expiry date (optional)
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
