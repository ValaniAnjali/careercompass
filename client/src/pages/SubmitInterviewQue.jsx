import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2, PlusCircle, Tag } from 'lucide-react'

const SubmitInterviewQue = () => {
  const { token } = useSelector((s) => s.auth)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [tags, setTags] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setTitle('')
    setCompany('')
    setRole('')
    setDifficulty('Medium')
    setTags('')
    setQuestion('')
    setAnswer('')
  }

  const validate = () => {
    if (!title.trim()) return 'Please add a question title.'
    if (!question.trim()) return 'Please add the interview question.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) return toast.error(err)

    setIsSubmitting(true)
    try {
      const payload = {
        title,
        company,
        role,
        difficulty,
        tags,
        question,
        answer
      }

      const { data } = await api.post(
        '/api/interview-questions',
        payload,
        {
          headers: {
            Authorization: token
          }
        }
      )

      toast.success(data.message || 'Question submitted successfully')
      resetForm()
      navigate('/app/interview-questions')
    } catch (error) {
      console.error('submit error', error)
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        'Failed to submit'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0A0F2C] pt-24 p-6">
      
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <PlusCircle className="w-6 h-6 text-orange-400" />
        <h1 className="text-3xl font-semibold text-[#E6ECF2]">
          Submit an Interview Question
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#0A0F2C] p-6 rounded-2xl shadow-lg border border-[#1B2256]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#9AA4C7]">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Short title for this question"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#9AA4C7]">Company</label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="(optional) e.g. Google"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#9AA4C7]">Role</label>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="(optional) e.g. Frontend Engineer"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#9AA4C7]">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#9AA4C7]">
            Tags (comma separated)
          </label>
          <div className="mt-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#9AA4C7]" />
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g. react, javascript"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#9AA4C7]">Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={6}
            className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write the interview question here..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#9AA4C7]">
            Suggested Answer / Notes
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            className="w-full mt-2 px-3 py-2 rounded-xl bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Optional: short answer or hints"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/app/interview-questions')}
            className="px-5 py-2 rounded-xl border border-[#1B2256] text-[#9AA4C7] hover:bg-[#1B2256] transition-colors"
          >
            Cancel
          </button>

          <button
            disabled={isSubmitting}
            type="submit"
            className="px-5 py-2 bg-[#FF7700] text-black rounded-xl flex items-center gap-2 hover:bg-orange-700 transition-colors"
          >
            {isSubmitting && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Question'}
          </button>
        </div>
      </form>
      </div>
      </div>
  )
}

export default SubmitInterviewQue
