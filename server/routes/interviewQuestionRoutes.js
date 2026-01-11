import express from 'express'
import { submitInterviewQuestion,getInterviewQuestions } from '../controllers/interviewQuestionController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, submitInterviewQuestion)
router.get('/', authMiddleware, getInterviewQuestions)



export default router
