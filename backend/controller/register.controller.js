import UserModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// Login Users
// export const loginUsers = async (req, res) => {
//     const {email, password } = req.body;
//   try {

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields:email, password",
//       });
//     }

//     const existingUser = await UserModel.findOne({ email});

//     if(!existingUser){
//         res.status(400).json({success:false, message:"Please register users"})
//     }

//     if (existingUser) {
        
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, UserModel.passwordHash);
//     if(!isMatch){
//       return res.status(400).json({success:false, message:"Wrong password"});
//     }
//     const token = await JWT.sign({id:UserModel._id}, process.env.JWT_KEY,{expiresIn:"1d"});
//     return res.status(200).json({
//         success:true,
//         message:"Login succesful!",
//         token,
//         UserModel
//     })


//     // const newUser = await UserModel.create({
//     //   name,
//     //   email,
//     //   password: passwordHash,
//     // });

//     // const token = JWT.sign(
//     //   {
//     //     id: newUser._id,
//     //     email: newUser.email,
//     //   },
//     //   process.env.JWT_KEY,
//     //   {
//     //     expiresIn: "1d",
//     //   }
//     // );

//     return res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       token,
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error in loginUsers:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error.message
//           : "Something went wrong",
//     });
//   }
// };

// register users
export const registerUsers = async (req, res)=>{
const { name, email, password} = req.body;
try {
    if(!email || !password || !name){
        res.status(400).json({success: false, message: "Missing required fields: name , email, password",})
    }
    const oldUsers = await UserModel.findOne({email});
    if(oldUsers){
        res.status(400).json({ success: false, message: "User already exists with this email",})
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHash,
    });

    const JWT_Token = await JWT.sign({id:UserModel._id}, process.env.JWT_KEY,{expiresIn:"1d"});
    
    res.status(200).json({success:true, message:"succesful register!",newUser})
    
} catch (error) {
    console.log("User register error:",error);
}
}