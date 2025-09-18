import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,   // No two colleges can have the same name
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,   // Unique short code like "CLG001"
  },
  address: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const collegeModel = mongoose.model("College", collegeSchema);
export default collegeModel;
