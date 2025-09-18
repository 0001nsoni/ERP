import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
   college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "College",  // Reference to college
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  department: {
    type: String,
    required: true,
    enum: ["CSE", "IT", "ECE", "EEE", "ME", "CE", "AI&DS", "Other"]
  },
  designation: {
    type: String,
    required: true,
    enum: ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"]
  },
  coursesHandled: [{
    type: String
    // Example: ["B.Tech in CSE", "M.Tech in AI"]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const facultyModel = mongoose.model("Faculty", facultySchema);
export default facultyModel;
