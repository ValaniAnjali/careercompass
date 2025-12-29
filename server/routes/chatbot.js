import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * POST /api/chatbot
 * body: { message: string }
 */
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a career guidance AI assistant helping users with resumes, interviews, and career advice.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // optional
          "X-Title": "Career Compass", // optional
        },
      }
    );

    const reply =
      response.data?.choices?.[0]?.message?.content || "No response from AI";

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);
    res.status(500).json({ reply: "AI error occurred" });
  }
});

export default router;
