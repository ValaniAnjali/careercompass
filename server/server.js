import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import interviewQuestionRoutes from "./routes/interviewQuestionRoutes.js";
import chatbotRouter from "./routes/chatbot.js"; // 
const app=express();
const PORT=process.env.PORT||3000;

//Database Connection

await connectDB()

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>res.send("Server is live.."))
app.use('/api/users',userRouter)
app.use('/api/resumes',resumeRouter)
app.use('/api/ai',aiRouter)
app.use('/api/interview-questions', interviewQuestionRoutes);
app.use("/api/chatbot", chatbotRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})