import { app } from "./App.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;


connectDB();

if(process.env.NODE_ENV === "developments"){

    app.listen(PORT, () => {
        
        console.log(`Server is running on port ${PORT}`);
    
    });
}
