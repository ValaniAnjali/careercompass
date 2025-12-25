import { Zap, FileText, Palette, Sparkles } from 'lucide-react'
import React from 'react'
import Title from './Title'

const features = [
  {
    icon: FileText,
    title: 'Smart Resume Builder',
    desc: 'Create structured, ATS-friendly resumes with guided sections and real-time feedback.',
  },
  {
    icon: Sparkles,
    title: 'AI Writing Assist',
    desc: 'Improve bullet points, summaries, and phrasing without sounding robotic.',
  },
  {
    icon: Palette,
    title: 'Easy Customization',
    desc: 'Switch templates, colors, and layouts instantly to match your personality.',
  },
]

const Feature = () => {
  return (
    <section
      id="features"
      className="relative py-20 bg-[#010018] scroll-mt-16"
    >
      {/* Top Badge */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-2 text-sm text-[#8DB2D4] bg-[#0A0F2C] border border-[#1B2256] rounded-full px-4 py-1">
          <Zap size={14} />
          <span>Simple process</span>
        </div>
      </div>

      <Title
        title="Build your resume with confidence"
        description="Everything you need to create a resume that feels personal, professional, and ready for real-world hiring."
      />

      {/* Content */}
      <div className="mt-16 max-w-7xl mx-auto px-6 lg:px-16 flex flex-col xl:flex-row items-center gap-16">
        {/* Image */}
        <div className="w-full xl:w-1/2">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt="Resume Builder Preview"
            className="w-full max-w-xl mx-auto rounded-lg border border-[#1B2256]"
          />
        </div>

        {/* Feature Cards */}
        <div className="w-full xl:w-1/2 space-y-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-6 rounded-xl border border-[#1B2256] bg-[#0A0F2C] hover:border-[#8DB2D4] hover:bg-[#0E143A] transition"
            >
              <div className="flex items-center justify-center size-11 rounded-lg bg-[#0E143A] text-[#8DB2D4]">
                <item.icon size={20} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[#E6ECF2]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-[#9AA4C7] max-w-md">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Feature
