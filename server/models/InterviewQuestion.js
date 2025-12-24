import mongoose from 'mongoose'

const interviewQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String
    },
    fileUrl: {
      type: String
    },

    // 🔑 Logged-in user info
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('InterviewQuestion', interviewQuestionSchema)
