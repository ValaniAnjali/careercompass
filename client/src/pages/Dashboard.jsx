import {
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import api from "../configs/api"
import toast from "react-hot-toast"
import pdfToText from "react-pdftotext"

const ACCENT = "#7C6AE6"

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth)

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      })
      setAllResumes(data.resumes)
    } catch (e) {
      toast.error(e.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      )
      navigate(`/app/builder/${data.resume._id}`)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post(
        "/api/resumes/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      )
      navigate(`/app/builder/${data.resumeId}`)
    } catch (e) {
      toast.error(e.message)
    }
    setIsLoading(false)
  }

  const deleteResume = async (id) => {
    if (!window.confirm("Delete this resume?")) return
    try {
      await api.delete(`/api/resumes/delete/${id}`, {
        headers: { Authorization: token },
      })
      setAllResumes(allResumes.filter((r) => r._id !== id))
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-8">
          Welcome back 👋
        </h1>

        {/* Primary Actions */}
        <div className="grid grid-cols-2 sm:flex gap-4 mb-10">
          <ActionCard
            icon={PlusIcon}
            label="Create Resume"
            onClick={() => setShowCreateResume(true)}
          />
          <ActionCard
            icon={UploadCloudIcon}
            label="Upload Resume"
            onClick={() => setShowUploadResume(true)}
          />
        </div>

        {/* Resume Grid */}
        <h2 className="text-lg mb-4 text-slate-300">Your Resumes</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {allResumes.map((resume) => (
            <button
              key={resume._id}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="relative bg-slate-800 border border-slate-700 rounded-xl p-4
              hover:border-violet-500 hover:shadow-xl transition-all text-left"
            >
              <FilePenLineIcon
                className="mb-3"
                size={20}
                style={{ color: ACCENT }}
              />
              <p className="text-sm font-medium">{resume.title}</p>
              <p className="text-xs text-slate-400 mt-1">
                {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 hidden group-hover:flex gap-1"
              >
                <TrashIcon
                  onClick={() => deleteResume(resume._id)}
                  className="size-5 text-slate-400 hover:text-red-400"
                />
                <PencilIcon
                  onClick={() => {
                    setEditResumeId(resume._id)
                    setTitle(resume.title)
                  }}
                  className="size-5 text-slate-400 hover:text-violet-400"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* MODALS */}
      {showCreateResume && (
        <Modal title="Create Resume" onClose={() => setShowCreateResume(false)}>
          <form onSubmit={createResume}>
            <Input value={title} setValue={setTitle} />
            <PrimaryButton label="Create" />
          </form>
        </Modal>
      )}

      {showUploadResume && (
        <Modal title="Upload Resume" onClose={() => setShowUploadResume(false)}>
          <form onSubmit={uploadResume}>
            <Input value={title} setValue={setTitle} />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="text-sm text-slate-400 mb-4"
            />
            <PrimaryButton
              label={isLoading ? "Uploading..." : "Upload"}
              loading={isLoading}
            />
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ---------- Components ---------- */

const ActionCard = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center
    bg-slate-800 border border-slate-700 rounded-xl
    h-40 w-full sm:w-40
    hover:border-violet-500 hover:shadow-lg transition-all"
  >
    <Icon size={28} style={{ color: ACCENT }} />
    <p className="mt-2 text-sm text-slate-300">{label}</p>
  </button>
)

const Modal = ({ title, children, onClose }) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-black/70 backdrop-blur
    flex items-center justify-center z-50"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-800 border border-slate-700
      rounded-xl p-6 w-full max-w-sm"
    >
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">{title}</h2>
        <XIcon className="cursor-pointer" onClick={onClose} />
      </div>
      {children}
    </div>
  </div>
)

const Input = ({ value, setValue }) => (
  <input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Resume title"
    className="w-full mb-4 px-4 py-2 rounded bg-slate-900
    border border-slate-700 focus:outline-none focus:border-violet-500"
    required
  />
)

const PrimaryButton = ({ label, loading }) => (
  <button
    disabled={loading}
    className="w-full py-2 rounded text-white font-medium"
    style={{ background: ACCENT }}
  >
    {loading && <LoaderCircleIcon className="inline mr-2 animate-spin" size={14} />}
    {label}
  </button>
)

export default Dashboard
