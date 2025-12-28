import { Brain, FileText, Palette, Sparkles, Zap, Target } from 'lucide-react'
import React from 'react'
import Title from './Title'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Writing',
    desc: 'Our intelligent assistant helps craft compelling narratives that highlight your unique strengths and achievements.',
    gradient: 'from-[#FF7700] to-[#FFA600]',
    bgColor: 'bg-[#FF7700]/10'
  },
  {
    icon: Target,
    title: 'ATS-Optimized',
    desc: 'Built-in optimization ensures your resume passes through applicant tracking systems with flying colors.',
    gradient: 'from-[#8DB2D4] to-[#4A90E2]',
    bgColor: 'bg-[#8DB2D4]/10'
  },
  {
    icon: Palette,
    title: 'Beautiful Templates',
    desc: 'Choose from professionally designed templates that adapt to your personal brand and industry.',
    gradient: 'from-[#A855F7] to-[#EC4899]',
    bgColor: 'bg-[#A855F7]/10'
  },
]

const Feature = () => {
  return (
    <section
      id="features"
      className="relative py-32 bg-gradient-to-b from-[#010018] via-[#0A0F2C] to-[#010018] scroll-mt-16 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#FF7700]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#8DB2D4]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Top Badge */}
      <div className="relative z-10 flex justify-center mb-12">
        <div className="flex items-center gap-3 text-sm text-[#8DB2D4] bg-gradient-to-r from-[#0A0F2C] to-[#1B2256] border border-[#1B2256] rounded-full px-6 py-3 backdrop-blur-sm">
          <Zap size={16} className="text-[#FF7700]" />
          <span className="font-medium">Powerful Features</span>
        </div>
      </div>

      <Title
        title="Everything you need to stand out"
        description="Advanced tools and intelligent features designed to help you create resumes that get noticed and land interviews."
      />

      {/* Content */}
      <div className="relative z-10 mt-20 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Feature Cards */}
          <div className="space-y-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-gradient-to-r from-[#0A0F2C] to-[#1B2256]/50 border border-[#1B2256] hover:border-[#8DB2D4]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#8DB2D4]/10 hover:-translate-y-2"
              >
                {/* Gradient accent */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                <div className="relative z-10 flex gap-6">
                  <div className={`flex items-center justify-center size-14 rounded-xl ${item.bgColor} border border-[#1B2256] group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={24} className={`text-white`} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#E6ECF2] mb-3 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#9AA4C7] leading-relaxed group-hover:text-[#B8C5D6] transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${item.gradient} rounded-b-2xl transition-all duration-500 ${index === 0 ? 'w-0 group-hover:w-full' : index === 1 ? 'w-0 group-hover:w-3/4 delay-100' : 'w-0 group-hover:w-1/2 delay-200'}`}></div>
              </div>
            ))}
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative z-10 p-8 rounded-3xl bg-gradient-to-br from-[#0A0F2C] via-[#1B2256]/30 to-[#0A0F2C] border border-[#1B2256] backdrop-blur-sm">
              {/* Mock Resume Preview */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">JD</span>
                  </div>
                  <div>
                    <h4 className="text-[#E6ECF2] font-bold text-lg">John Doe</h4>
                    <p className="text-[#8DB2D4] text-sm">Senior Software Engineer</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-2 bg-[#1B2256] rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-full animate-pulse"></div>
                  </div>
                  <div className="h-2 bg-[#1B2256] rounded-full overflow-hidden">
                    <div className="h-full w-3/5 bg-gradient-to-r from-[#8DB2D4] to-[#4A90E2] rounded-full animate-pulse delay-300"></div>
                  </div>
                  <div className="h-2 bg-[#1B2256] rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-full animate-pulse delay-500"></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-[#0A0F2C] border border-[#1B2256]">
                    <div className="text-[#E6ECF2] font-bold">95%</div>
                    <div className="text-xs text-[#9AA4C7]">Complete</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0A0F2C] border border-[#1B2256]">
                    <div className="text-[#E6ECF2] font-bold">AI</div>
                    <div className="text-xs text-[#9AA4C7]">Enhanced</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0A0F2C] border border-[#1B2256]">
                    <div className="text-[#E6ECF2] font-bold">PDF</div>
                    <div className="text-xs text-[#9AA4C7]">Ready</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FF7700] rounded-full animate-bounce delay-1000"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#8DB2D4] rounded-full animate-bounce delay-500"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-[#A855F7] rounded-full animate-bounce delay-1500"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Feature
