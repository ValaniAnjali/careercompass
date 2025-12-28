import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import { Search, Filter, Tag, BookOpen, Target, ChevronDown, ChevronUp, X } from 'lucide-react'

const ViewInterviewQue = () => {
  const { token } = useSelector(s => s.auth)

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [expandedQuestions, setExpandedQuestions] = useState(new Set())

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

  const clearFilters = () => {
    setCompany('')
    setRole('')
    setDifficulty('')
    setTag('')
    setSearch('')
  }

  const toggleQuestionExpansion = (questionId) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010018] via-[#0A0F2C] to-[#010018] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7700]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8DB2D4]/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-8">
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

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9AA4C7] w-5 h-5" />
            <input
              type="text"
              placeholder="Search for interview questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0A0F2C]/50 backdrop-blur-sm border border-[#1B2256]/50 rounded-xl text-white placeholder-[#9AA4C7] focus:border-[#8DB2D4]/50 focus:outline-none focus:ring-2 focus:ring-[#8DB2D4]/20 text-lg"
            />
            <button
              onClick={fetchQuestions}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="max-w-4xl mx-auto mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-[#0A0F2C]/50 backdrop-blur-sm border border-[#1B2256]/50 rounded-lg px-4 py-2 text-[#9AA4C7] hover:text-white hover:border-[#8DB2D4]/50 transition-all duration-300"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="max-w-4xl mx-auto mb-6 bg-[#0A0F2C]/50 backdrop-blur-sm p-6 rounded-xl border border-[#1B2256]/50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9AA4C7]">Company</label>
                <input
                  placeholder="e.g., Google, Amazon"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full border border-[#1B2256]/50 bg-[#010018]/50 px-3 py-2 rounded-lg text-white placeholder-[#9AA4C7] focus:border-[#8DB2D4]/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9AA4C7]">Role</label>
                <input
                  placeholder="e.g., Frontend, Backend"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full border border-[#1B2256]/50 bg-[#010018]/50 px-3 py-2 rounded-lg text-white placeholder-[#9AA4C7] focus:border-[#8DB2D4]/50 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9AA4C7]">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={e => setDifficulty(e.target.value)}
                  className="w-full border border-[#1B2256]/50 bg-[#010018]/50 px-3 py-2 rounded-lg text-white focus:border-[#8DB2D4]/50 focus:outline-none"
                >
                  <option value="" className="bg-[#010018] text-[#9AA4C7]">All Levels</option>
                  <option value="Easy" className="bg-[#010018] text-white">Easy</option>
                  <option value="Medium" className="bg-[#010018] text-white">Medium</option>
                  <option value="Hard" className="bg-[#010018] text-white">Hard</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#9AA4C7]">Tag</label>
                <input
                  placeholder="e.g., JavaScript, React"
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  className="w-full border border-[#1B2256]/50 bg-[#010018]/50 px-3 py-2 rounded-lg text-white placeholder-[#9AA4C7] focus:border-[#8DB2D4]/50 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchQuestions}
                className="bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="border border-[#1B2256]/50 bg-transparent text-[#9AA4C7] px-6 py-2 rounded-lg hover:border-[#8DB2D4]/50 hover:text-white transition-all duration-300"
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="max-w-4xl mx-auto mb-6">
          <p className="text-[#9AA4C7]">
            Found <span className="text-white font-semibold">{questions.length}</span> interview questions
          </p>
        </div>

        {/* Questions */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF7700]"></div>
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
                      <span className="text-xs bg-[#1B2256]/50 text-[#9AA4C7] px-3 py-1 rounded-full">
                        {q.company}
                      </span>
                      <span className="text-xs bg-[#1B2256]/50 text-[#9AA4C7] px-3 py-1 rounded-full">
                        {q.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Question Text with Truncation */}
                <div className="mb-4">
                  <div className={`text-[#9AA4C7] leading-relaxed break-words ${
                    !expandedQuestions.has(q._id) && q.question.length > 200
                      ? 'max-h-20 overflow-hidden'
                      : ''
                  }`}>
                    {q.question}
                  </div>
                  {q.question.length > 200 && (
                    <button
                      onClick={() => toggleQuestionExpansion(q._id)}
                      className="text-[#8DB2D4] hover:text-[#FF7700] transition-colors text-sm font-medium mt-2 flex items-center gap-1"
                    >
                      {expandedQuestions.has(q._id) ? (
                        <>Show Less <ChevronUp className="w-3 h-3" /></>
                      ) : (
                        <>Read More <ChevronDown className="w-3 h-3" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Enhanced Answer Section */}
                {q.answer && (
                  <div className="mb-4">
                    <details className="group">
                      <summary className="cursor-pointer bg-gradient-to-r from-[#FF7700]/10 to-[#FFA600]/10 border border-[#FF7700]/30 rounded-lg px-4 py-3 text-[#FF7700] hover:from-[#FF7700]/20 hover:to-[#FFA600]/20 transition-all duration-300 flex items-center gap-3 font-medium">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-full flex items-center justify-center">
                          <BookOpen className="w-3 h-3 text-white" />
                        </div>
                        <span>View Detailed Answer</span>
                        <ChevronDown className="w-4 h-4 ml-auto group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-3 p-5 bg-gradient-to-r from-[#010018] to-[#0A0F2C] rounded-lg border border-[#1B2256]/50 shadow-inner">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#8DB2D4] to-[#4A90E2] rounded-full flex items-center justify-center shrink-0 mt-1">
                            <Target className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white leading-relaxed font-medium mb-2 break-words">Solution:</p>
                            <p className="text-[#9AA4C7] leading-relaxed break-words overflow-wrap-anywhere">{q.answer}</p>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {q.tags.map(t => (
                    <span key={t} className="bg-[#FF7700]/20 text-[#FF7700] px-3 py-1 rounded-full text-sm border border-[#FF7700]/30">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <span>Posted by <span className="text-[#9AA4C7]">{q.userName}</span></span>
                  <span className="text-[#6B7280]">Interview Question</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {questions.length === 0 && !loading && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-[#9AA4C7] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
            <p className="text-[#9AA4C7]">Try adjusting your search or filters to find more interview questions.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewInterviewQue
