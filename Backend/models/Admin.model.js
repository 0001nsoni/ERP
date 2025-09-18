import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
    enum: ["SuperAdmin", "ExamAdmin", "TransportAdmin", "AccountsAdmin"]
  },
  permissions: [{
    type: String
    // Example: ["Manage Students", "Manage Faculty", "View Reports"]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
