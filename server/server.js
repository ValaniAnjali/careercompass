import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import interviewQuestionRoutes from "./routes/interviewQuestionRoutes.js";
import chatbotRoutes from "./routes/chatbot.js";
// import { getResourceById } from "./controllers/resourceController.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dotenv.config();
const app = express();


connectDB();


app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.send("Server is live.."))
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/resources", resourceRoutes);
app.use("/api/interview-questions", interviewQuestionRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/roadmaps", roadmapRoutes);
app.use('/api/ai',aiRouter)


app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    