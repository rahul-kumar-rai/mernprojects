import express from "express";
import cors from "cors";
import authRouters from "./routers/auth.routes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
// Create an instance of the Express application
export const app = express();



// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from the specified origin or frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRouters)




connectDB();

if(process.env.NODE_ENV === "developments"){

    app.listen(PORT, () => {
        
        console.log(`Server is running on port ${PORT}`);
    
    });
}

