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

app.use(express.json({ limit: '10mb' }));

// Or with Express built-in
app.use(express.json({ limit: '10mb' }));


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post('/api/data', (req, res) => {
  // req.body should already be parsed as an object
  console.log(req.body); // This is an object, not a string
  res.json({ received: req.body });
});


app.use("/api/auth", authRouters);




if(process.env.NODE_ENV === "developments"){

    app.listen(PORT, async() => {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    
    });
}
export default app;

