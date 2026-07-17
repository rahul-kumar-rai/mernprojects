import express from "express";
import cors from "cors";
import authRouters from "./routers/auth.routes.js";



// Create an instance of the Express application
export const app = express();

// Middleware
app.use(cors({
    origin: "*", // Allow requests from the specified origin or frontend URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/auth", authRouters)