import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  BookOpenIcon,
  ClipboardListIcon,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import api from "../configs/api"
import toast from "react-hot-toast"
import pdfToText from "react-pdftotext"

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState("")
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  /* ---------------- API Calls ---------------- */

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      )
      setAllResumes([...allResumes, data.resume])
      setTitle("")
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
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
      setTitle("")
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      )
      setAllResumes(
        allResumes.map((r) =>
          r._id === editResumeId ? { ...r, title } : r
        )
      )
      setTitle("")
      setEditResumeId("")
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      })
      setAllResumes(allResumes.filter((r) => r._id !== resumeId))
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="min-h-screen bg-[#F1FBFA] text-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Welcome back, {user?.name || "Anjali"}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Your personal career workspace
            </p>
          </div>

          <div className="flex gap-4">
            <Stat icon={FilePenLineIcon} label="Resumes" value={allResumes.length} />
            <Stat icon={BookOpenIcon} label="Questions" value="42" />
            <Stat icon={ClipboardListIcon} label="Resources" value="12" />
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          <ActionCard icon={PlusIcon} label="Create Resume" onClick={() => setShowCreateResume(true)} />
          <ActionCard icon={UploadCloudIcon} label="Upload Resume" onClick={() => setShowUploadResume(true)} />
          <ActionCard icon={FilePenLineIcon} label="Questions" onClick={() => navigate("/app/interview-questions")} />
          <ActionCard icon={UploadCloud} label="Submit Question" onClick={() => navigate("/app/submit-question")} />
          <ActionCard icon={FilePenLineIcon} label="Roadmap" onClick={() => navigate("/app/roadmap-finder")} />
          <ActionCard icon={BookOpenIcon} label="Resources" onClick={() => navigate("/app/resources")} />
        </div>

        {/* RESUMES */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-slate-900">
            My Resumes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {allResumes.map((resume) => (
              <div
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="group relative rounded-xl p-5 cursor-pointer
                bg-white border border-slate-200
                hover:border-teal-600 hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-teal-50">
                    <FilePenLineIcon className="size-6 text-teal-700" />
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <TrashIcon
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteResume(resume._id)
                      }}
                      className="size-5 text-slate-400 hover:text-red-500"
                    />
                    <PencilIcon
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditResumeId(resume._id)
                        setTitle(resume.title)
                      }}
                      className="size-5 text-slate-400 hover:text-teal-600"
                    />
                  </div>
                </div>

                <p className="mt-4 font-medium text-slate-900 truncate">
                  {resume.title}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showCreateResume && (
        <Modal title="Create Resume" onClose={() => setShowCreateResume(false)} onSubmit={createResume} button="Create">
          <Input value={title} onChange={setTitle} />
        </Modal>
      )}

      {showUploadResume && (
        <Modal title="Upload Resume" onClose={() => setShowUploadResume(false)} onSubmit={uploadResume} button={isLoading ? "Uploading..." : "Upload"}>
          <Input value={title} onChange={setTitle} />
        </Modal>
      )}

      {editResumeId && (
        <Modal title="Edit Resume" onClose={() => setEditResumeId("")} onSubmit={editTitle} button="Update">
          <Input value={title} onChange={setTitle} />
        </Modal>
      )}
    </div>
  )
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Stat = ({ icon: Icon, label, value }) => (
  <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex gap-3 items-center">
    <Icon className="size-5 text-teal-700" />
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  </div>
)

const ActionCard = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="rounded-xl p-4 bg-white border border-slate-200
    hover:border-teal-600 hover:shadow-md transition-all text-left"
  >
    <div className="p-2 w-fit rounded-lg bg-teal-50 mb-3">
      <Icon className="size-5 text-teal-700" />
    </div>
    <p className="text-sm font-medium text-slate-900">{label}</p>
  </button>
)

const Modal = ({ title, children, onClose, onSubmit, button }) => (
  <form
    onSubmit={onSubmit}
    onClick={onClose}
    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white border border-slate-200 rounded-xl p-6 w-full max-w-sm"
    >
      <h2 className="text-lg font-semibold mb-4 text-slate-900">{title}</h2>
      {children}
      <button className="w-full mt-4 py-2 rounded bg-teal-700 text-white hover:bg-teal-800">
        {button}
      </button>
      <XIcon
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
      />
    </div>
  </form>
)

const Input = ({ value, onChange }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="Enter title"
    className="w-full px-4 py-2 rounded border border-slate-300
    focus:outline-none focus:ring-2 focus:ring-teal-600"
    required
  />
)

export default Dashboard
