import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const apiTesting = async (req, res) => {
    try {
        res.json({ message: "api working fine" });
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
            return res.status(400).json({  // ← Added return
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

        // ✅ Check if user already exists in database
        const existingUser = await UserModel.findById({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
                user:existingUser
            });
        }
        
        const passwordHash = await bcrypt.hash(password, 10);
      
        // ✅ Create user in database (not just in-memory)
        const newUser = new UserModel({
            name,
            email,
            password:passwordHash // Make sure to hash this before saving
        });

        await newUser.save();

        const token = await JWT.sign({id:newUser._id}, process.env.JWT_KEY,{
            expiresIn:"1d",
        });
        // ✅ Send success response and RETURN
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            // user: {
            //     id: newUser._id,
            //     name: newUser.name,
            //     email: newUser.email,
            //     createdAt: newUser.createdAt
            // }

        });

    } catch (error) {
        console.log("Error in loginUsers:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
}