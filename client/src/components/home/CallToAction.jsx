import React from 'react'

const CallToAction = () => {
  return (
    <section
      id="cta"
      className="relative w-full max-w-6xl mx-auto mt-32 px-6 bg-[#010018]"
    >
      {/* Outer dashed frame */}
      <div className="border-y border-dashed border-[#1B2256]">
        <div className="border-x border-dashed border-[#1B2256] -mt-10 -mb-10 py-16 sm:py-20 px-6 sm:px-14">

          <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

            {/* Text */}
            <div className="max-w-lg">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#E6ECF2] leading-snug">
                Your resume should feel like <span className="text-[#8DB2D4]">you</span>.
              </h3>
              <p className="mt-4 text-[#9AA4C7] text-base">
                Build a clean, confident resume that tells your story — not just your skills.
              </p>
            </div>

            {/* Button */}
            <a
              href="#"
              className="group inline-flex items-center gap-3 rounded-full bg-[#FF7700] px-8 py-3 text-black font-medium shadow-md hover:opacity-90 transition"
            >
              <span>Start building</span>
              <span className="inline-flex items-center justify-center size-6 rounded-full bg-black/20 group-hover:bg-black/30 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </a>

          </div>
        </div>
      </div>

      {/* Subtle accent glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center">
        <div className="h-40 w-96 rounded-full bg-[#FFA600]/10 blur-3xl"></div>
      </div>
    </section>
  )
}

export default CallToAction
