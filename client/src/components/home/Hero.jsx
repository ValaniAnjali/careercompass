import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react'

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010018] via-[#0A0F2C] to-[#010018] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF7700]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8DB2D4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#1B2256]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-40 py-6 bg-black/20 backdrop-blur-sm border-b border-[#1B2256]/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Career Compass
          </h3>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-[#9AA4C7]">
          <a href="#" className="hover:text-[#8DB2D4] transition-all duration-300 hover:scale-105">Home</a>
          <a href="#features" className="hover:text-[#8DB2D4] transition-all duration-300 hover:scale-105">Features</a>
          <a href="#testimonials" className="hover:text-[#8DB2D4] transition-all duration-300 hover:scale-105">Stories</a>
          <a href="#cta" className="hover:text-[#8DB2D4] transition-all duration-300 hover:scale-105">Start</a>
        </div>

        <div className="hidden md:flex gap-3">
          {!user && (
            <>
              <Link
                to="/app?state=login"
                className="px-5 py-2 text-sm rounded-full border border-[#1B2256] bg-[#0A0F2C]/50 backdrop-blur-sm text-[#E6ECF2] hover:bg-[#0E143A] hover:border-[#8DB2D4]/50 transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Link>
              <Link
                to="/app?state=register"
                className="px-6 py-2 text-sm rounded-full bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black font-medium hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>
            </>
          )}
          {user && (
            <Link
              to="/app"
              className="px-6 py-2 text-sm rounded-full bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black font-medium hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300 hover:scale-105"
            >
              Dashboard
            </Link>
          )}
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden text-[#E6ECF2] hover:text-[#8DB2D4] transition-colors">
          <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
            <div className="w-5 h-0.5 bg-current rounded-full"></div>
            <div className="w-5 h-0.5 bg-current rounded-full"></div>
            <div className="w-5 h-0.5 bg-current rounded-full"></div>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#010018]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 text-[#E6ECF2]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF7700]/5 to-[#8DB2D4]/5"></div>
          <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition-all duration-300 text-lg font-medium">Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition-all duration-300 text-lg font-medium">Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition-all duration-300 text-lg font-medium">Stories</a>
          <a href="#cta" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition-all duration-300 text-lg font-medium">Start</a>
          <button onClick={() => setMenuOpen(false)} className="mt-8 px-6 py-2 rounded-full border border-[#1B2256] bg-[#0A0F2C] text-[#E6ECF2] hover:bg-[#0E143A] transition-all duration-300">
            Close
          </button>
        </div>
      )}

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 md:px-16 lg:px-24 xl:px-40 pt-20 pb-32">
        {/* Social Proof Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0A0F2C] to-[#1B2256]/50 border border-[#1B2256] text-sm text-[#8DB2D4] mb-8 backdrop-blur-sm">
          <Users className="w-4 h-4" />
          <span>Trusted by <strong className="text-[#E6ECF2]">10,000+</strong> professionals</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold max-w-5xl leading-tight text-white mb-6">
          Craft Your
          <span className="block bg-gradient-to-r from-[#FF7700] via-[#FFA600] to-[#8DB2D4] bg-clip-text text-transparent">
            Career Story
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl text-[#9AA4C7] text-lg leading-relaxed">
          Transform your professional journey into compelling narratives.
          Build resumes that showcase your unique value, powered by AI insights
          and human-centered design.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/app"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black font-semibold hover:shadow-2xl hover:shadow-[#FF7700]/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            Start Building
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 rounded-full border-2 border-[#1B2256] bg-[#0A0F2C]/50 backdrop-blur-sm text-[#E6ECF2] hover:bg-[#0E143A] hover:border-[#8DB2D4]/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Watch Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[#E6ECF2]">50K+</div>
            <div className="text-sm text-[#9AA4C7]">Resumes Created</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[#E6ECF2]">95%</div>
            <div className="text-sm text-[#9AA4C7]">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[#E6ECF2]">24/7</div>
            <div className="text-sm text-[#9AA4C7]">AI Support</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-[#E6ECF2]">Free</div>
            <div className="text-sm text-[#9AA4C7]">Core Features</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
