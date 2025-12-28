import React from 'react'
import { Github, Twitter, Linkedin, Mail, Heart, Target, Sparkles } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-40 bg-gradient-to-b from-[#010018] via-[#0A0F2C] to-[#010018] text-[#9AA4C7] border-t border-[#1B2256]/50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#FF7700]/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#8DB2D4]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF7700] to-[#FFA600] rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Career Compass</h3>
            </div>

            <p className="text-[#9AA4C7] leading-relaxed mb-6 max-w-md">
              Empowering professionals to craft compelling career narratives.
              Transform your resume from a document into your story.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-[#0A0F2C] border border-[#1B2256] rounded-lg flex items-center justify-center hover:bg-[#0E143A] hover:border-[#8DB2D4] transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5 text-[#8DB2D4]" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0A0F2C] border border-[#1B2256] rounded-lg flex items-center justify-center hover:bg-[#0E143A] hover:border-[#8DB2D4] transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-[#8DB2D4]" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0A0F2C] border border-[#1B2256] rounded-lg flex items-center justify-center hover:bg-[#0E143A] hover:border-[#8DB2D4] transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5 text-[#8DB2D4]" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#0A0F2C] border border-[#1B2256] rounded-lg flex items-center justify-center hover:bg-[#0E143A] hover:border-[#8DB2D4] transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5 text-[#8DB2D4]" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Features</a></li>
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Templates</a></li>
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Pricing</a></li>
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">API</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Blog</a></li>
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Help Center</a></li>
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Community</a></li>
              <li><a className="hover:text-[#8DB2D4] transition-colors duration-300" href="#">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#1B2256]/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span>© {currentYear} Career Compass.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#FF7700] fill-[#FF7700]" />
              <span>for career growth.</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-[#8DB2D4] transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-[#8DB2D4] transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-[#8DB2D4] transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 p-6 bg-gradient-to-r from-[#0A0F2C] to-[#1B2256]/50 border border-[#1B2256] rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#FF7700]/20 to-[#8DB2D4]/20 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#8DB2D4]" />
                </div>
                <div>
                  <h5 className="text-white font-semibold">Stay Updated</h5>
                  <p className="text-sm text-[#9AA4C7]">Get the latest career tips and product updates</p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 bg-[#010018] border border-[#1B2256] rounded-lg text-[#E6ECF2] placeholder-[#9AA4C7] focus:outline-none focus:border-[#8DB2D4] transition-colors"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black font-medium rounded-lg hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300 hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
