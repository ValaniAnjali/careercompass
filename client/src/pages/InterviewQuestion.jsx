import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import {
  Search, Filter, Tag, BookOpen, Target,
  ChevronDown, ChevronUp, PlusCircle, X, Loader2
} from 'lucide-react'

const InterviewQuestion = () => {
  const { token } = useSelector(s => s.auth)

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())
  const [showSubmit, setShowSubmit] = useState(false)

  // Filters
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')

  // Submit form
  const [title, setTitle] = useState('')
  const [sCompany, setSCompany] = useState('')
  const [sRole, setSRole] = useState('')
  const [sDifficulty, setSDifficulty] = useState('Medium')
  const [tags, setTags] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch questions
  const fetchQuestions = async (customSearch) => {
    try {
      setLoading(true)
      const params = { company, role, difficulty, tag, search: customSearch !== undefined ? customSearch : search }
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

  // Autocomplete state
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef()

  // Fetch suggestions for autocomplete
  const fetchSuggestions = async (val) => {
    if (!val) { setSuggestions([]); setShowSuggestions(false); return }
    try {
      const params = { search: val }
      const { data } = await api.get('/api/interview-questions', {
        params,
        headers: { Authorization: token }
      })
      setSuggestions(data.data.map(q => q.title).slice(0, 7))
      setShowSuggestions(true)
    } catch (err) {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim() || !question.trim()) return toast.error('Title and question are required')

    setIsSubmitting(true)
    try {
      await api.post('/api/interview-questions', {
        title,
        company: sCompany,
        role: sRole,
        difficulty: sDifficulty,
        tags,
        question,
        answer
      }, { headers: { Authorization: token } })

      toast.success('Question submitted successfully')
      setShowSubmit(false)
      fetchQuestions()

      // reset form
      setTitle('')
      setSCompany('')
      setSRole('')
      setSDifficulty('Medium')
      setTags('')
      setQuestion('')
      setAnswer('')
    } catch (err) {
      toast.error('Failed to submit question')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleQuestionExpansion = (id) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return newSet
    })
  }

  const clearFilters = () => {
    setCompany(''); setRole(''); setDifficulty(''); setTag(''); setSearch('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010018] via-[#0A0F2C] to-[#010018] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7700]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8DB2D4]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#9AA4C7] bg-clip-text text-transparent">
                Interview Questions
              </h1>
            </div>
            <p className="text-[#9AA4C7] text-lg max-w-2xl mx-auto">
              Master your next interview with our comprehensive collection of questions from top companies
            </p>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowSubmit(true)}
            className="ml-6 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black px-4 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300"
          >
            <PlusCircle size={18} />
            Submit Question
          </button>
        </div>

        {/* Search + Filter bar */}
        <div className="max-w-4xl mx-auto mb-6 relative flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9AA4C7] w-5 h-5" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for interview questions..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value)
                  fetchSuggestions(e.target.value)
                }}
                onFocus={() => search && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
                className="w-full pl-12 pr-4 py-4 bg-[#0A0F2C]/50 backdrop-blur-sm border border-[#1B2256]/50 rounded-xl text-white placeholder-[#9AA4C7] focus:border-[#8DB2D4]/50 focus:outline-none focus:ring-2 focus:ring-[#8DB2D4]/20 text-lg"
                autoComplete="off"
              />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-[#0A0F2C] border border-[#1B2256]/50 rounded-xl shadow-lg z-20 max-h-56 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      onMouseDown={() => {
                        setSearch(s)
                        setShowSuggestions(false)
                        fetchQuestions(s)
                        searchRef.current.blur()
                      }}
                      className="px-4 py-2 text-[#8DB2D4] hover:bg-[#1B2256] cursor-pointer text-base"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={fetchQuestions}
              className="bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300"
            >
              Search
            </button>
            <button
              onClick={() => setShowFilters(v => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#8DB2D4]/40 text-[#8DB2D4] hover:bg-[#1B2256]/40 transition-all duration-200 ml-2"
            >
              <Filter size={18} />
              Filter
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
          {showFilters && (
            <div className="flex flex-wrap gap-3 mt-2 bg-[#0A0F2C]/60 p-4 rounded-xl border border-[#1B2256]/40">
              <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#0E143A] text-white border border-[#1B2256]/40 focus:border-[#8DB2D4] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#0E143A] text-white border border-[#1B2256]/40 focus:border-[#8DB2D4] focus:outline-none"
              />
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#0E143A] text-white border border-[#1B2256]/40 focus:border-[#8DB2D4] focus:outline-none"
              >
                <option value="">Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={e => setTag(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#0E143A] text-white border border-[#1B2256]/40 focus:border-[#8DB2D4] focus:outline-none"
              />
              <button
                onClick={fetchQuestions}
                className="px-4 py-2 rounded-lg bg-[#FF7700] text-black font-semibold hover:bg-[#FFA600] transition-all duration-200"
              >Apply</button>
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg bg-[#1B2256] text-[#8DB2D4] font-semibold hover:bg-[#232B4A] transition-all duration-200"
              >Clear</button>
            </div>
          )}
        </div>

        {/* Questions */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-orange-400 w-12 h-12" />
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {questions.map(q => (
              <div key={q._id} className="bg-[#0A0F2C]/50 backdrop-blur-sm p-6 rounded-xl border border-[#1B2256]/50 hover:border-[#8DB2D4]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#8DB2D4]/10 overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-2 leading-tight">{q.title}</h2>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        <Target className="w-3 h-3 inline mr-1" />
                        {q.difficulty}
                      </span>
                      <span className="text-xs bg-[#1B2256]/50 text-[#9AA4C7] px-3 py-1 rounded-full">{q.company}</span>
                      <span className="text-xs bg-[#1B2256]/50 text-[#9AA4C7] px-3 py-1 rounded-full">{q.role}</span>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <div className={`text-[#9AA4C7] leading-relaxed break-words ${!expandedQuestions.has(q._id) && q.question.length > 200 ? 'max-h-20 overflow-hidden' : ''}`}>
                  {q.question}
                </div>
                {q.question.length > 200 && (
                  <button
                    onClick={() => toggleQuestionExpansion(q._id)}
                    className="text-[#8DB2D4] hover:text-[#FF7700] transition-colors text-sm font-medium mt-2 flex items-center gap-1"
                  >
                    {expandedQuestions.has(q._id) ? <>Show Less <ChevronUp className="w-3 h-3" /></> : <>Read More <ChevronDown className="w-3 h-3" /></>}
                  </button>
                )}

                {/* Answer */}
                {q.answer && (
                  <details className="group mt-4">
                    <summary className="cursor-pointer bg-gradient-to-r from-[#FF7700]/10 to-[#FFA600]/10 border border-[#FF7700]/30 rounded-lg px-4 py-3 text-[#FF7700] hover:from-[#FF7700]/20 hover:to-[#FFA600]/20 transition-all duration-300 flex items-center gap-3 font-medium">
                      <div className="w-6 h-6 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-full flex items-center justify-center">
                        <BookOpen className="w-3 h-3 text-white" />
                      </div>
                      <span>View Detailed Answer</span>
                      <ChevronDown className="w-4 h-4 ml-auto group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-3 p-5 bg-gradient-to-r from-[#010018] to-[#0A0F2C] rounded-lg border border-[#1B2256]/50 shadow-inner">
                      <p className="text-[#9AA4C7] leading-relaxed break-words overflow-wrap-anywhere">{q.answer}</p>
                    </div>
                  </details>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {q.tags && q.tags.map(t => (
                    <span key={t} className="bg-[#FF7700]/20 text-[#FF7700] px-3 py-1 rounded-full text-sm border border-[#FF7700]/30 flex items-center gap-1">
                      <Tag className="w-3 h-3 inline" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {questions.length === 0 && !loading && (
          <div className="text-center py-20 text-[#9AA4C7]">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
            <p>Try adjusting your search or filters to find more interview questions.</p>
          </div>
        )}
      </div>

      {/* Submit Modal */}
      {showSubmit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-[#0A0F2C] p-6 rounded-2xl w-full max-w-2xl relative">
            <button type="button" onClick={() => setShowSubmit(false)} className="absolute top-4 right-4 text-white"><X /></button>
            <h2 className="text-2xl text-white mb-4">Submit Interview Question</h2>

            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full mb-3 px-4 py-2 rounded-xl bg-[#0E143A] text-white" />
            <input placeholder="Company" value={sCompany} onChange={e => setSCompany(e.target.value)} className="w-full mb-3 px-4 py-2 rounded-xl bg-[#0E143A] text-white" />
            <input placeholder="Role" value={sRole} onChange={e => setSRole(e.target.value)} className="w-full mb-3 px-4 py-2 rounded-xl bg-[#0E143A] text-white" />
            <select value={sDifficulty} onChange={e => setSDifficulty(e.target.value)} className="w-full mb-3 px-4 py-2 rounded-xl bg-[#0E143A] text-white">
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} className="w-full mb-3 px-4 py-2 rounded-xl bg-[#0E143A] text-white" />
            <textarea placeholder="Question" value={question} onChange={e => setQuestion(e.target.value)} rows={4} className="w-full mb-3 px-4 py-2 rounded-xl bg-[#0E143A] text-white" />
            <textarea placeholder="Answer (optional)" value={answer} onChange={e => setAnswer(e.target.value)} rows={3} className="w-full mb-4 px-4 py-2 rounded-xl bg-[#0E143A] text-white" />

            <button disabled={isSubmitting} className="w-full bg-[#FF7700] text-black py-2 rounded-xl">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default InterviewQuestion
