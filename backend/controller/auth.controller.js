import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// Test MongoDB Connection
export const apiTesting = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      MONGODB_URI: !!process.env.MONGODB_URI,
      JWT_KEY: !!process.env.JWT_KEY,
      nodeEnv: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

