import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Hero = () => {
  const { user } = useSelector(state => state.auth)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const logos = [
    'Instagram',
    'Framer',
    'Microsoft',
    'Huawei',
    'Walmart',
  ]

  return (
    <div className="min-h-screen bg-[#010018]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-40 py-5 bg-[#010018] border-b border-[#1B2256]">
        <h3 className="text-xl font-semibold text-[#8DB2D4]">
          Career Compass
        </h3>

        <div className="hidden md:flex gap-8 text-sm text-[#9AA4C7]">
          <a href="#" className="hover:text-[#8DB2D4] transition">Home</a>
          <a href="#features" className="hover:text-[#8DB2D4] transition">Features</a>
          <a href="#testimonials" className="hover:text-[#8DB2D4] transition">Testimonials</a>
          <a href="#cta" className="hover:text-[#8DB2D4] transition">Contact</a>
        </div>

        <div className="hidden md:flex gap-2">
          {!user && (
            <>
              <Link
                to="/app?state=login"
                className="px-5 py-2 text-sm rounded-full border border-[#1B2256] bg-[#0A0F2C] text-[#E6ECF2] hover:bg-[#0E143A] transition"
              >
                Login
              </Link>
              <Link
                to="/app?state=register"
                className="px-6 py-2 text-sm rounded-full bg-[#FF7700] text-black hover:opacity-90 transition"
              >
                Get started
              </Link>
            </>
          )}
          {user && (
            <Link
              to="/app"
              className="px-6 py-2 text-sm rounded-full bg-[#FF7700] text-black hover:opacity-90 transition"
            >
              Dashboard
            </Link>
          )}
        </div>

        <button onClick={() => setMenuOpen(true)} className="md:hidden text-[#E6ECF2]">
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-[#010018]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-6 text-[#E6ECF2]">
          <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition">Home</a>
          <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition">Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition">Testimonials</a>
          <a href="#cta" onClick={() => setMenuOpen(false)} className="hover:text-[#8DB2D4] transition">Contact</a>
          <button onClick={() => setMenuOpen(false)} className="mt-4 text-sm underline text-[#9AA4C7] hover:text-[#8DB2D4] transition">
            Close
          </button>
        </div>
      )}

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-6 md:px-16 lg:px-24 xl:px-40 pt-24">
        {/* Social Proof */}
        <p className="text-sm text-[#9AA4C7] mb-4">
          Trusted by <span className="font-medium text-[#E6ECF2]">10,000+</span> job seekers
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-semibold max-w-4xl leading-tight text-[#E6ECF2]">
          Build resumes that feel like <span className="text-[#8DB2D4]">you</span>,  
          not templates.
        </h1>

        {/* Subtext */}
        <p className="mt-5 max-w-xl text-[#9AA4C7]">
          Create, edit, and download professional resumes with clarity,
          confidence, and AI support when you need it.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 mt-8">
          <Link
            to="/app"
            className="px-8 py-3 rounded-full bg-[#FF7700] text-black hover:opacity-90 transition"
          >
            Get started
          </Link>
          <button className="px-8 py-3 rounded-full border border-[#1B2256] bg-[#0A0F2C] text-[#E6ECF2] hover:bg-[#0E143A] transition">
            Try demo
          </button>
        </div>

        {/* Logos */}
        <p className="mt-16 text-sm text-[#9AA4C7]">
          Used by teams at
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {logos.map((logo, i) => (
            <div key={i} className="px-4 py-2 bg-[#0A0F2C] border border-[#1B2256] rounded-lg text-[#E6ECF2] text-sm font-medium">
              {logo}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
