import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";



// register users
export const registerUsers = async (req, res)=>{
const { name, email, password} = req.body;
try {
    if(!email || !password || !name){
        res.status(400).json({success: false, message: "Missing required fields: name , email, password",})
    }
    const exitingUsers = await UserModel.findOne({email});
    if(exitingUsers){
        res.status(400).json({ success: false, message: "User already exists with this email",})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password:passwordHash,
    });
    console.log(newUser)

    const JWT_Token = await JWT.sign({id:UserModel._id}, process.env.JWT_KEY,{expiresIn:"1d"});
    
    res.status(200).json({success:true, message:"succesful register!",newUser})
    
} catch (error) {
    console.log("User register error:",error);
}
}