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

// NEW IMPORTS FOR MODAL
import { Dialog } from '@headlessui/react'

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

  // NEW STATE FOR CUSTOMIZE MODAL
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false)

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

  const calculateCompletionPercentage = () => {
    let totalFields = 0
    let filledFields = 0

    // Personal Info (7 fields)
    const personalFields = ['full_name', 'email', 'phone', 'location', 'profession', 'linkedin', 'website']
    personalFields.forEach(field => {
      totalFields++
      if (resumeData.personal_info[field]) filledFields++
    })

    // Professional Summary (1 field)
    totalFields++
    if (resumeData.professional_summary) filledFields++

    // Experience (each experience has 4 required fields: company, position, start_date, description)
    resumeData.experience.forEach(exp => {
      totalFields += 4
      if (exp.company) filledFields++
      if (exp.position) filledFields++
      if (exp.start_date) filledFields++
      if (exp.description) filledFields++
    })

    // Education (each education has 4 fields: institution, degree, start_date, end_date)
    resumeData.education.forEach(edu => {
      totalFields += 4
      if (edu.institution) filledFields++
      if (edu.degree) filledFields++
      if (edu.start_date) filledFields++
      if (edu.end_date) filledFields++
    })

    // Projects (each project has 3 fields: name, description, technologies)
    resumeData.project.forEach(proj => {
      totalFields += 3
      if (proj.name) filledFields++
      if (proj.description) filledFields++
      if (proj.technologies && proj.technologies.length > 0) filledFields++
    })

    // Skills (count as filled if array has items)
    totalFields++
    if (resumeData.skills && resumeData.skills.length > 0) filledFields++

    return totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0
  }

  const completionPercentage = calculateCompletionPercentage()

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
    <div className="min-h-screen bg-linear-to-br from-[#010018] via-[#0A0F2C] to-[#010018] relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF7700]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#8DB2D4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#1B2256]/15 to-transparent rounded-full blur-3xl"></div>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-[#FF7700]/60 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-[#8DB2D4]/40 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-40 left-20 w-3 h-3 bg-[#FFA600]/50 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Creative Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-linear-to-r from-[#FF7700] to-[#FFA600] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#FF7700]/30">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#8DB2D4] rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-linear-to-r from-white via-[#E6ECF2] to-[#9AA4C7] bg-clip-text text-transparent mb-2">
                  Resume Builder
                </h1>
                <p className="text-[#9AA4C7] text-lg">Craft your perfect resume with AI-powered precision</p>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between">
            <Link
              to="/app"
              className="group inline-flex items-center gap-3 px-4 py-2 bg-[#0A0F2C]/60 backdrop-blur-sm border border-[#1B2256]/50 rounded-xl text-[#9AA4C7] hover:text-white hover:border-[#8DB2D4]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#8DB2D4]/10"
            >
              <ArrowLeftIcon className="size-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Button to Open Customize Modal */}
              <button
                onClick={() => setIsCustomizeModalOpen(true)}
                className="px-4 py-2 bg-[#FF7700]/20 hover:bg-[#FF7700]/30 text-white rounded-xl font-medium transition-all duration-300"
              >
                Customize Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Creative Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-[800px]">

          {/* LEFT – Creative Form Section */}
          {/* ... rest of your original 498-line code continues here exactly as-is ... */}


          {/* LEFT – Creative Form Section */}
          <div className="xl:col-span-4 space-y-6">
            {/* Progress Indicator */}
            <div className="bg-[#0A0F2C]/60 backdrop-blur-sm border border-[#1B2256]/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Build Progress</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#FF7700]">{activeSectionIndex + 1}/{sections.length}</div>
                  <div className="text-xs text-[#9AA4C7]">Steps</div>
                </div>
              </div>

              {/* Step Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-[#9AA4C7] mb-2">
                  <span>Section Progress</span>
                  <span>{activeSectionIndex + 1}/{sections.length}</span>
                </div>
                <div className="w-full bg-[#1B2256]/50 rounded-full h-3">
                  <div
                    className="h-3 bg-linear-to-r from-[#FF7700] to-[#FFA600] rounded-full transition-all duration-500 shadow-lg shadow-[#FF7700]/30"
                    style={{
                      width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Field Completion Progress */}
              <div>
                <div className="flex justify-between text-sm text-[#9AA4C7] mb-2">
                  <span>Resume Completion</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full bg-[#1B2256]/50 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      completionPercentage < 30 ? 'bg-red-500' :
                      completionPercentage < 70 ? 'bg-yellow-500' :
                      'bg-linear-to-r from-[#FF7700] to-[#FFA600]'
                    } shadow-lg`}
                    style={{
                      width: `${completionPercentage}%`,
                      boxShadow: completionPercentage >= 70 ? '0 0 10px rgba(255, 119, 0, 0.3)' : 'none'
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-[#6B7280] mt-2">
                  <span>Fields Filled</span>
                  <span className={completionPercentage >= 100 ? 'text-green-400' : 'text-[#9AA4C7]'}>
                    {completionPercentage >= 100 ? 'Complete!' : 'In Progress'}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-[#0A0F2C]/60 backdrop-blur-sm border border-[#1B2256]/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Form Header */}
              <div className="p-6 border-b border-[#1B2256]/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-r from-[#FF7700]/20 to-[#FFA600]/20 border border-[#FF7700]/30 rounded-xl flex items-center justify-center">
                    <activeSection.icon className="size-6 text-[#FF7700]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{activeSection.name}</h3>
                    <p className="text-[#9AA4C7] text-sm">Step {activeSectionIndex + 1} of {sections.length}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="px-6 py-4 border-b border-[#1B2256]/50">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      setActiveSectionIndex(i => Math.max(i - 1, 0))
                    }
                    disabled={activeSectionIndex === 0}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1B2256]/50 hover:bg-[#1B2256]/70 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-[#9AA4C7] hover:text-white transition-all duration-300"
                  >
                    <ChevronLeft className="size-4" />
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveSectionIndex(i =>
                        Math.min(i + 1, sections.length - 1)
                      )
                    }
                    disabled={activeSectionIndex === sections.length - 1}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1B2256]/50 hover:bg-[#1B2256]/70 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-[#9AA4C7] hover:text-white transition-all duration-300"
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
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

                {/* Save Button */}
                <div className="pt-4 border-t border-[#1B2256]/50">
                  <button
                    onClick={() => toast.promise(saveResume, { loading: 'Saving…' })}
                    className="w-full py-4 rounded-xl bg-linear-to-r from-[#FF7700] to-[#FFA600] text-black font-bold hover:shadow-2xl hover:shadow-[#FF7700]/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Save Progress
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – Enhanced Preview Section */}
          <div className="xl:col-span-8">
            <div className="bg-[#0A0F2C]/60 backdrop-blur-sm border border-[#1B2256]/50 rounded-2xl p-8 shadow-2xl h-full">
              {/* Preview Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-r from-[#8DB2D4] to-[#4A90E2] rounded-lg flex items-center justify-center">
                    <EyeIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Live Preview</h3>
                    <p className="text-[#9AA4C7] text-sm">See your resume come to life</p>
                  </div>
                </div>

                {/* Template and Color Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 px-4 py-2 bg-[#0A0F2C]/80 backdrop-blur-sm border border-[#1B2256]/50 rounded-xl shadow-lg">
                    <Templateselector
                      selectedTemplate={resumeData.template}
                      onChange={template =>
                        setResumeData(prev => ({ ...prev, template }))
                      }
                    />
                    <div className="w-px h-6 bg-[#1B2256]/50"></div>
                    <ColorPicker
                      selectedColor={resumeData.accent_color}
                      onChange={color =>
                        setResumeData(prev => ({ ...prev, accent_color: color }))
                      }
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                  {resumeData.public && (
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1B2256]/50 hover:bg-[#1B2256]/70 rounded-lg text-[#9AA4C7] hover:text-white transition-all duration-300"
                    >
                      <Share2Icon className="size-4" />
                      Share
                    </button>
                  )}
                  <button
                    onClick={changeResumeVisibility}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1B2256]/50 hover:bg-[#1B2256]/70 rounded-lg text-[#9AA4C7] hover:text-white transition-all duration-300"
                  >
                    {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                    {resumeData.public ? 'Public' : 'Private'}
                  </button>
                  <button
                    onClick={downloadResume}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#FF7700] to-[#FFA600] text-black rounded-lg hover:shadow-lg hover:shadow-[#FF7700]/30 transition-all duration-300"
                  >
                    <DownloadIcon className="size-4" />
                    Download
                  </button>
                </div>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="bg-white rounded-xl p-6 shadow-inner h-[600px] overflow-auto">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
