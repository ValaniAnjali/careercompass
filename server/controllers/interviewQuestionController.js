import InterviewQuestion from '../models/InterviewQuestion.js'
import User from '../models/User.js'
export const getInterviewQuestions = async (req, res) => {
  try {
    const { company, role, difficulty, tag, search } = req.query

    const filter = {}

    if (company) filter.company = new RegExp(company, 'i')
    if (role) filter.role = new RegExp(role, 'i')
    if (difficulty) filter.difficulty = difficulty
    if (tag) filter.tags = { $in: [new RegExp(tag, 'i')] }

    if (search) {
      filter.$or = [
        { question: new RegExp(search, 'i') },
        { title: new RegExp(search, 'i') }
      ]
    }

    const questions = await InterviewQuestion
      .find(filter)
      .sort({ createdAt: -1 })

    res.status(200).json({ data: questions })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch questions' })
  }
}

export const submitInterviewQuestion = async (req, res) => {
  try {
    const {
      title,
      company,
      role,
      difficulty,
      tags,
      question,
      answer
    } = req.body

    // 👇 fetch logged-in user
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const newQuestion = new InterviewQuestion({
      title,
      company,
      role,
      difficulty,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      question,
      answer,
      user: user._id,
      userName: user.name
    })

    await newQuestion.save()

    res.status(201).json({
      message: 'Interview question submitted successfully',
      data: newQuestion
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to submit question' })
  }
}
