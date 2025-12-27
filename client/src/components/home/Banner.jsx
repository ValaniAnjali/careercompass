import React from 'react'
import { Sparkles, TrendingUp, Users } from 'lucide-react'

const Banner = () => {
  return (
    <div className="w-full py-4 bg-gradient-to-r from-[#010018] via-[#0A0F2C] to-[#010018] border-b border-[#1B2256]/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#FF7700]/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-[#8DB2D4]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-8 text-center">
          {/* Main announcement */}
          <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-[#0A0F2C] to-[#1B2256]/80 border border-[#1B2256] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF7700] animate-pulse" />
              <span className="text-sm font-medium text-[#E6ECF2]">New:</span>
            </div>
            <span className="text-sm font-medium text-[#8DB2D4]">AI Resume Analyzer</span>
            <div className="flex items-center gap-1 text-xs text-[#9AA4C7]">
              <TrendingUp className="w-3 h-3" />
              <span>Boost scores by 40%</span>
            </div>
          </div>

          {/* Social proof */}
          <div className="hidden md:flex items-center gap-2 text-sm text-[#9AA4C7]">
            <Users className="w-4 h-4 text-[#8DB2D4]" />
            <span>50,000+ professionals joined this month</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
