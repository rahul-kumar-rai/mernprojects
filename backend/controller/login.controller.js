import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// Login Users
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields:email, password",
            });
        }

        
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
          return res.status(400).json(
            { success: false, message: "Please register first" });
        }



        const isMatchpassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchpassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = await JWT.sign(
            { id: existingUser._id }, 
            process.env.JWT_KEY, 
            { expiresIn: "1d" }
        );
        return res.status(200).json({
            success: true,
            message: "Login succesful!",
            token,
            user:{
                ID:existingUser.id,
                Name:existingUser.name
            }
        })

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
        console.error("Error in login:", error);

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