import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import { Search, Filter, Tag } from 'lucide-react'

const ViewInterviewQue = () => {
  const { token } = useSelector(s => s.auth)

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  // filters
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const params = { company, role, difficulty, tag, search }

      const { data } = await api.get('/api/interview-questions', {
        params,
        headers: { Authorization: token }
      })

      setQuestions(data.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Interview Questions</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          placeholder="Search question"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Role"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <input
          placeholder="Tag"
          value={tag}
          onChange={e => setTag(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={fetchQuestions}
          className="md:col-span-5 bg-purple-600 text-white py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Questions */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {questions.map(q => (
            <div key={q._id} className="bg-white p-5 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{q.title}</h2>
                <span className="text-sm px-2 py-1 bg-purple-100 text-purple-700 rounded">
                  {q.difficulty}
                </span>
              </div>

              <p className="text-gray-700 mb-3">{q.question}</p>

              {q.answer && (
                <details className="mb-3">
                  <summary className="cursor-pointer text-purple-600">
                    View Answer
                  </summary>
                  <p className="mt-2 text-gray-600">{q.answer}</p>
                </details>
              )}

              <div className="flex flex-wrap gap-2 text-sm">
                <span className="bg-gray-100 px-2 py-1 rounded">{q.company}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{q.role}</span>
                {q.tags.map(t => (
                  <span key={t} className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                    #{t}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Posted by {q.userName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ViewInterviewQue
