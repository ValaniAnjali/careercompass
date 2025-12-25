import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-40 bg-[#010018] text-[13px] text-[#9AA4C7] border-t border-[#1B2256]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 flex flex-wrap justify-between gap-14">

        {/* Left */}
        <div className="flex flex-wrap gap-12 md:gap-20">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />

          <div>
            <p className="text-[#E6ECF2] font-semibold mb-3">Product</p>
            <ul className="space-y-2">
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Home</a></li>
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Support</a></li>
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Pricing</a></li>
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Affiliate</a></li>
            </ul>
          </div>

          <div>
            <p className="text-[#E6ECF2] font-semibold mb-3">Resources</p>
            <ul className="space-y-2">
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Company</a></li>
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Blogs</a></li>
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Community</a></li>
              <li>
                <a className="hover:text-[#8DB2D4] transition" href="/">
                  Careers
                  <span className="ml-2 text-xs px-2 py-0.5 rounded bg-[#FF7700] text-black">
                    Hiring
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[#E6ECF2] font-semibold mb-3">Legal</p>
            <ul className="space-y-2">
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Privacy</a></li>
              <li><a className="hover:text-[#8DB2D4] transition" href="/">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 max-md:items-center max-md:text-center">
          <p className="max-w-xs text-[#9AA4C7]">
            Helping people build careers with clarity and confidence.
          </p>

          {/* KEEP YOUR SVG ICONS — SAFE */}
          <div className="flex gap-4 mt-3 text-[#9AA4C7]">
            {/* paste your existing SVG icons here unchanged */}
          </div>

          <p className="mt-4 text-xs text-[#9AA4C7]">
            © 2025 CareerCompass
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
