import React from 'react'
import { ArrowRight, Sparkles, Rocket, CheckCircle } from 'lucide-react'

const CallToAction = () => {
  const benefits = [
    'Free core features',
    'AI-powered assistance',
    'ATS-optimized templates',
    '24/7 support'
  ]

  return (
    <section
      id="cta"
      className="relative w-full max-w-6xl mx-auto mt-32 px-6 bg-gradient-to-br from-[#010018] via-[#0A0F2C] to-[#010018] overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#FF7700]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#8DB2D4]/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#1B2256]/30 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main CTA Container */}
      <div className="relative z-10 border-2 border-dashed border-[#1B2256] rounded-3xl overflow-hidden">
        <div className="border border-dashed border-[#1B2256] -m-2 rounded-3xl">
          <div className="relative bg-gradient-to-br from-[#0A0F2C]/90 via-[#1B2256]/20 to-[#0A0F2C]/90 backdrop-blur-sm rounded-3xl p-8 md:p-16">

            {/* Floating elements */}
            <div className="absolute top-8 right-8 w-6 h-6 bg-[#FF7700] rounded-full animate-bounce delay-500"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 bg-[#8DB2D4] rounded-full animate-bounce delay-1000"></div>
            <div className="absolute top-1/2 right-12 w-3 h-3 bg-[#A855F7] rounded-full animate-bounce delay-1500"></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">

              {/* Text Content */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0A0F2C] to-[#1B2256] border border-[#1B2256] text-sm text-[#8DB2D4] mb-6">
                  <Rocket className="w-4 h-4 text-[#FF7700]" />
                  <span>Ready to transform your career?</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-[#E6ECF2] leading-tight mb-6">
                  Start building your
                  <span className="block bg-gradient-to-r from-[#FF7700] via-[#FFA600] to-[#8DB2D4] bg-clip-text text-transparent">
                    dream resume today
                  </span>
                </h3>

                <p className="text-[#9AA4C7] text-lg leading-relaxed mb-8">
                  Join over 50,000 professionals who've already transformed their careers.
                  Create a resume that doesn't just list your experience — it tells your story.
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-[#9AA4C7]">
                      <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#FF7700] to-[#FFA600] px-8 py-4 text-black font-semibold shadow-lg hover:shadow-xl hover:shadow-[#FF7700]/30 transition-all duration-300 hover:scale-105">
                    <span>Start Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-[#1B2256] bg-[#0A0F2C]/50 backdrop-blur-sm text-[#E6ECF2] px-8 py-4 hover:bg-[#0E143A] hover:border-[#8DB2D4]/50 transition-all duration-300 hover:scale-105">
                    <Sparkles className="w-5 h-5" />
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>

              {/* Visual Element */}
              <div className="relative">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Central orb */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF7700]/20 via-[#8DB2D4]/20 to-[#A855F7]/20 rounded-full blur-2xl animate-pulse"></div>

                  {/* Resume mockup */}
                  <div className="relative z-10 w-full h-full bg-gradient-to-br from-[#0A0F2C] to-[#1B2256] rounded-2xl border border-[#1B2256] p-6 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">JD</span>
                      </div>
                      <div>
                        <h4 className="text-[#E6ECF2] font-bold">John Doe</h4>
                        <p className="text-[#8DB2D4] text-sm">Senior Developer</p>
                      </div>
                    </div>

                    <div className="space-y-3">
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

                    <div className="mt-6 grid grid-cols-3 gap-2">
                      <div className="text-center p-2 rounded-lg bg-[#0A0F2C] border border-[#1B2256]">
                        <div className="text-[#E6ECF2] font-bold text-sm">95%</div>
                        <div className="text-xs text-[#9AA4C7]">Complete</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#0A0F2C] border border-[#1B2256]">
                        <div className="text-[#E6ECF2] font-bold text-sm">AI</div>
                        <div className="text-xs text-[#9AA4C7]">Ready</div>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-[#0A0F2C] border border-[#1B2256]">
                        <div className="text-[#E6ECF2] font-bold text-sm">PDF</div>
                        <div className="text-xs text-[#9AA4C7]">Export</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce delay-700">
                    Success!
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce delay-1200">
                    Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="flex justify-center mt-8">
        <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#1B2256] to-transparent rounded-full"></div>
      </div>
    </section>
  )
}

export default CallToAction
