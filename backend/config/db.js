import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log("⚠️ MONGODB_URI is not set in backend/.env. Using local JSON store fallback until configured.");
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log("ℹ️ Running in fallback mode. When your MongoDB Atlas URI is added to .env, restart backend.");
    return false;
  }
};

export const getDbStatus = () => {
  return {
    connected: isConnected && mongoose.connection.readyState === 1,
    state: mongoose.connection.readyState, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    hasUri: Boolean(process.env.MONGODB_URI),
  };
};
