import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const apiTesting = async (req, res) => {
    try {
        const datadb = await UserModel.findOne({name})

        res.json({ message: "api working fine" , name});

    } catch (error) {
        console.log("ERROR API:", error);
        return res.status(500).json({ error: "API error" });
    }
}

export const loginUsers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check if all fields exist
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: name, email, password"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 6 characters'
            });
        }

        // ✅ FIX: Use findOne() not findById()
        // findById() is for _id field, findOne() is for any field
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
                // Remove 'user: existingUser' from here for security
            });
        }
        
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
      
        // ✅ Create user in database
        const newUser = new UserModel({
            name,
            email,
            password: passwordHash
        });

        await newUser.save();

        // ✅ Check if JWT_KEY exists
        if (!process.env.JWT_KEY) {
            console.error('JWT_KEY is not defined in environment variables');
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            });
        }

        // Generate JWT token
        const token = JWT.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        // ✅ Send success response
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        });

    } catch (error) {
        console.log("Error in loginUsers:", error);
        
        // ✅ Handle specific errors
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        });
    }
}