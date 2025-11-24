import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2, PlusCircle, Tag, Briefcase, FileText } from 'lucide-react'

// SubmitInterviewQue page
// - place this file in src/pages/SubmitInterviewQue.jsx
// - it POSTs to POST /api/interview-questions with the form payload
// - expects Authorization token in redux state at state.auth.token

const SubmitInterviewQue = () => {
  const { token } = useSelector((s) => s.auth)
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [tags, setTags] = useState('') // comma separated
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const resetForm = () => {
    setTitle('')
    setCompany('')
    setRole('')
    setDifficulty('Medium')
    setTags('')
    setQuestion('')
    setAnswer('')
    setFile(null)
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
      // If you want to support file upload, use FormData
      const formData = new FormData()
      formData.append('title', title)
      formData.append('company', company)
      formData.append('role', role)
      formData.append('difficulty', difficulty)
      formData.append('tags', tags)
      formData.append('question', question)
      formData.append('answer', answer)
      if (file) formData.append('file', file)

      const config = {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await api.post('/api/interview-questions', formData, config)
      toast.success(data.message || 'Question submitted')
      resetForm()
      // optionally navigate to list or detail page
      navigate('/app/interview-questions')
    } catch (error) {
      console.error('submit error', error)
      toast.error(error?.response?.data?.message || error.message || 'Failed to submit')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <PlusCircle className="w-6 h-6 text-purple-600" />
        <h1 className="text-2xl font-semibold">Submit an Interview Question</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border rounded mt-1" placeholder="Short title for this question" />
          </div>

          <div>
            <label className="text-sm font-medium">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3 py-2 border rounded mt-1" placeholder="(optional) e.g. Google" />
          </div>

          <div>
            <label className="text-sm font-medium">Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-3 py-2 border rounded mt-1" placeholder="(optional) e.g. Frontend Engineer" />
          </div>

          <div>
            <label className="text-sm font-medium">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-3 py-2 border rounded mt-1">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Tags (comma separated)</label>
          <div className="mt-1 flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400" />
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="e.g. react, algorithms" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Question</label>
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={6} className="w-full px-3 py-2 border rounded mt-1 resize-none" placeholder="Write the interview question here..." />
        </div>

        <div>
          <label className="text-sm font-medium">Suggested Answer / Notes</label>
          <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} rows={4} className="w-full px-3 py-2 border rounded mt-1 resize-none" placeholder="Optional: short answer or hints" />
        </div>

        <div>
          <label className="text-sm font-medium">Attach file (optional)</label>
          <div className="mt-2 flex items-center gap-2">
            <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Choose file</span>
              <input type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
            <div className="text-sm text-gray-600">{file ? file.name : 'No file selected'}</div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate('/app/interview-questions')} className="px-4 py-2 border rounded">Cancel</button>
          <button disabled={isSubmitting} type="submit" className="px-4 py-2 bg-purple-600 text-white rounded flex items-center gap-2">
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? 'Submitting...' : 'Submit Question'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default SubmitInterviewQue
