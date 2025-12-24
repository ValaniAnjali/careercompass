import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/ResumePreview'
import Templateselector from '../components/Templateselector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import api from '../configs/api'
import toast from 'react-hot-toast'

const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#0F766E',
    public: false,
  })

  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false)

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ]

  const activeSection = sections[activeSectionIndex]

  useEffect(() => {
    loadExistingResume()
  }, [])

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, {
        headers: { Authorization: token },
      })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append(
        'resumeData',
        JSON.stringify({ public: !resumeData.public })
      )

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token },
      })

      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0]
    const resumeUrl = frontendUrl + '/view/' + resumeId
    navigator.share
      ? navigator.share({ url: resumeUrl, text: 'My Resume' })
      : alert('Share not supported')
  }

  const downloadResume = () => window.print()

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData)
      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append('resumeId', resumeId)
      formData.append('resumeData', JSON.stringify(updatedResumeData))
      removeBackground && formData.append('removeBackground', 'yes')
      typeof resumeData.personal_info.image === 'object' &&
        formData.append('image', resumeData.personal_info.image)

      const { data } = await api.put('/api/resumes/update', formData, {
        headers: { Authorization: token },
      })

      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-[#F1FBFA]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <Link
          to="/app"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <Templateselector
            selectedTemplate={resumeData.template}
            onChange={template =>
              setResumeData(prev => ({ ...prev, template }))
            }
          />
          <ColorPicker
            selectedColor={resumeData.accent_color}
            onChange={color =>
              setResumeData(prev => ({ ...prev, accent_color: color }))
            }
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-10 grid lg:grid-cols-12 gap-8">
        {/* LEFT – FORM */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Progress */}
            <div className="h-1 bg-slate-200">
              <div
                className="h-1 bg-teal-600 transition-all"
                style={{
                  width: `${(activeSectionIndex * 100) /
                    (sections.length - 1)}%`,
                }}
              />
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                  <activeSection.icon className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Step</p>
                  <h3 className="font-semibold text-slate-900">
                    {activeSection.name}
                  </h3>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setActiveSectionIndex(i => Math.max(i - 1, 0))
                  }
                  disabled={activeSectionIndex === 0}
                  className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveSectionIndex(i =>
                      Math.min(i + 1, sections.length - 1)
                    )
                  }
                  disabled={activeSectionIndex === sections.length - 1}
                  className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {activeSection.id === 'personal' && (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={data =>
                    setResumeData(prev => ({
                      ...prev,
                      personal_info: data,
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              )}
              {activeSection.id === 'summary' && (
                <ProfessionalSummaryForm
                  data={resumeData.professional_summary}
                  onChange={data =>
                    setResumeData(prev => ({
                      ...prev,
                      professional_summary: data,
                    }))
                  }
                  setResumeData={setResumeData}
                />
              )}
              {activeSection.id === 'experience' && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={data =>
                    setResumeData(prev => ({ ...prev, experience: data }))
                  }
                />
              )}
              {activeSection.id === 'education' && (
                <EducationForm
                  data={resumeData.education}
                  onChange={data =>
                    setResumeData(prev => ({ ...prev, education: data }))
                  }
                />
              )}
              {activeSection.id === 'projects' && (
                <ProjectForm
                  data={resumeData.project}
                  onChange={data =>
                    setResumeData(prev => ({ ...prev, project: data }))
                  }
                />
              )}
              {activeSection.id === 'skills' && (
                <SkillsForm
                  data={resumeData.skills}
                  onChange={data =>
                    setResumeData(prev => ({ ...prev, skills: data }))
                  }
                />
              )}

              <button
                onClick={() => toast.promise(saveResume, { loading: 'Saving…' })}
                className="w-full py-2 rounded-lg bg-teal-700 text-white hover:bg-teal-800 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT – PREVIEW */}
        <div className="lg:col-span-7">
          <div className="relative bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            {/* Floating Actions */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {resumeData.public && (
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-white border hover:bg-slate-50"
                >
                  <Share2Icon className="size-4" />
                </button>
              )}
              <button
                onClick={changeResumeVisibility}
                className="p-2 rounded-lg bg-white border hover:bg-slate-50"
              >
                {resumeData.public ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
              </button>
              <button
                onClick={downloadResume}
                className="p-2 rounded-lg bg-white border hover:bg-slate-50"
              >
                <DownloadIcon className="size-4" />
              </button>
            </div>

            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
