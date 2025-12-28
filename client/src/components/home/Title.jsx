import React from 'react'

const Title = ({ title, description }) => {
  return (
    <div className="relative text-center px-4">
      {/* Background accent */}
      <div className="absolute inset-0 flex justify-center">
        <div className="w-96 h-32 bg-gradient-to-r from-[#FF7700]/5 via-[#8DB2D4]/5 to-[#A855F7]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          <span className="bg-gradient-to-r from-[#E6ECF2] via-[#F8FAFC] to-[#E6ECF2] bg-clip-text text-transparent">
            {title}
          </span>
        </h2>

        <p className="max-w-3xl mx-auto text-[#9AA4C7] text-lg md:text-xl leading-relaxed">
          {description}
        </p>

        {/* Decorative line */}
        <div className="flex justify-center mt-8">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#1B2256] to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Title
