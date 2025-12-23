import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  BookOpenIcon,
  ClipboardListIcon
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {
  const { user, token } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const colors = ['#a78bfa', '#fbbf24', '#f87171', '#38bdf8', '#4ade80']
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // ---------------- API Calls ----------------
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: token }
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async e => {
    try {
      e.preventDefault()
      const { data } = await api.post(
        '/api/resumes/create',
        { title },
        { headers: { Authorization: token } }
      )
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post(
        '/api/resumes/upload-resume',
        { title, resumeText },
        { headers: { Authorization: token } }
      )
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async e => {
    try {
      e.preventDefault()
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      )
      setAllResumes(
        allResumes.map(res =>
          res._id === editResumeId ? { ...res, title } : res
        )
      )
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async resumeId => {
    try {
      if (window.confirm('Are you sure you want to delete this resume?')) {
        const { data } = await api.delete(
          `/api/resumes/delete/${resumeId}`,
          { headers: { Authorization: token } }
        )
        setAllResumes(allResumes.filter(r => r._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold">
            Welcome, {user?.name || 'Anjali V'}
          </h1>

          <div className="flex gap-3">
            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-3 rounded-md">
              <FilePenLineIcon className="text-purple-400" />
              <div>
                <p className="text-xs text-slate-400">Resumes</p>
                <p className="font-medium">{allResumes.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-3 rounded-md">
              <BookOpenIcon className="text-blue-400" />
              <div>
                <p className="text-xs text-slate-400">Questions</p>
                <p className="font-medium">42</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-3 rounded-md">
              <ClipboardListIcon className="text-green-400" />
              <div>
                <p className="text-xs text-slate-400">Resources</p>
                <p className="font-medium">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Create', icon: PlusIcon, onClick: () => setShowCreateResume(true) },
            { label: 'Upload', icon: UploadCloudIcon, onClick: () => setShowUploadResume(true) },
            { label: 'Questions', icon: FilePenLineIcon, onClick: () => navigate('/app/interview-questions') },
            { label: 'Submit', icon: UploadCloudIcon, onClick: () => navigate('/app/submit-question') },
            { label: 'Roadmap', icon: FilePenLineIcon, onClick: () => navigate('/app/roadmap-finder') },
            { label: 'Resources', icon: UploadCloud, onClick: () => navigate('/app/resources') }
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="bg-slate-800 border border-slate-700 rounded-md p-4 flex flex-col items-center gap-2 hover:bg-slate-700 transition"
            >
              <item.icon className="size-6 text-slate-300" />
              <span className="text-xs text-slate-400">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Resumes */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Resumes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allResumes.map((resume, index) => {
              const color = colors[index % colors.length]
              return (
                <div
                  key={resume._id}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="group bg-slate-800 border border-slate-700 rounded-md p-4 cursor-pointer hover:bg-slate-700 transition"
                >
                  <div className="flex justify-between">
                    <FilePenLineIcon style={{ color }} />
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                      <TrashIcon
                        onClick={e => {
                          e.stopPropagation()
                          deleteResume(resume._id)
                        }}
                        className="size-5 p-1 hover:bg-slate-600 rounded"
                      />
                      <PencilIcon
                        onClick={e => {
                          e.stopPropagation()
                          setEditResumeId(resume._id)
                          setTitle(resume.title)
                        }}
                        className="size-5 p-1 hover:bg-slate-600 rounded"
                      />
                    </div>
                  </div>

                  <p className="mt-4 font-medium truncate">{resume.title}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ---------------- Modals (LOGIC UNTOUCHED) ---------------- */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-10"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700 rounded-md p-6 w-full max-w-sm"
            >
              <h2 className="font-semibold mb-4">Create Resume</h2>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded mb-4"
                placeholder="Resume title"
                required
              />
              <button className="w-full bg-purple-600 py-2 rounded">Create</button>
              <XIcon
                onClick={() => setShowCreateResume(false)}
                className="absolute top-4 right-4 cursor-pointer"
              />
            </div>
          </form>
        )}

        {showUploadResume && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-10"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700 rounded-md p-6 w-full max-w-sm"
            >
              <h2 className="font-semibold mb-4">Upload Resume</h2>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded mb-4"
                placeholder="Resume title"
                required
              />
              <input type="file" accept=".pdf" onChange={e => setResume(e.target.files[0])} />
              <button className="w-full bg-purple-600 py-2 rounded mt-4">
                {isLoading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </form>
        )}

        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-10"
          >
            <div
              onClick={e => e.stopPropagation()}
              className="bg-slate-800 border border-slate-700 rounded-md p-6 w-full max-w-sm"
            >
              <h2 className="font-semibold mb-4">Edit Title</h2>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-3 py-2 rounded mb-4"
                required
              />
              <button className="w-full bg-purple-600 py-2 rounded">Update</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Dashboard
