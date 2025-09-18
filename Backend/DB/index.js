import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ERP", // works only if DB not in URI
    });

    console.log(
      `✅ MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ Mongoose connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
