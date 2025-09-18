import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
  rollNo: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  branch: {
    type: String,
    required: true,
    enum: ["CSE", "IT", "ECE", "EEE", "ME", "CE", "AI&DS", "Other"]
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8
  },
  studentType: {
    type: String,
    required: true,
    enum: ["Hostler", "Bus", "DayScholar"]
  },
  programLevel: {
    type: String,
    required: true,
    enum: ["Bachelors", "Masters"]
  },
  programName: {
    type: String,
    required: true,
    
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;
