// backend/routes/chatbot.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No reply";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "AI error occurred" });
  }
});

export default router;
