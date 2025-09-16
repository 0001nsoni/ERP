import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  driverId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  busNumber: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
    // Example: "Route 1 - City Center to Campus"
  },
  contactNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
