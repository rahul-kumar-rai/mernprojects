import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing");
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
      });
    }

    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
};

export default connectDB;