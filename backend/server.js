import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routers/auth.routes.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

export const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app",
    ],
  })
);

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRouters);

console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

try {
  await connectDB();
  console.log("Database connected");
} catch (error) {
  console.error("Database connection failed:", error);
}

if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;