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

// Register User
export const loginUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, password",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
    });

    const token = JWT.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in loginUsers:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    });
  }
};