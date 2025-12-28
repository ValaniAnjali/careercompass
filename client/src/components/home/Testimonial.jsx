import React from 'react'
import Title from './Title'
import { Star, Quote, Heart, TrendingUp, Award } from 'lucide-react'

const Testimonial = () => {
  const testimonials = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Sarah Chen',
      role: 'Senior Product Manager',
      company: 'TechFlow Inc.',
      quote: 'Career Compass transformed how I present my career story. The AI suggestions felt natural and helped me land my dream role.',
      rating: 5,
      highlight: 'Dream job secured',
      gradient: 'from-[#FF7700] to-[#FFA600]'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Marcus Rodriguez',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      quote: 'Finally, a resume builder that understands developers. The ATS optimization worked perfectly - I got callbacks from FAANG companies.',
      rating: 5,
      highlight: 'FAANG interviews',
      gradient: 'from-[#8DB2D4] to-[#4A90E2]'
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Emily Watson',
      role: 'Marketing Director',
      company: 'BrandCraft Agency',
      quote: 'The templates are beautiful and the AI writing assistant helped me articulate my achievements in ways I never could before.',
      rating: 5,
      highlight: 'Promotion achieved',
      gradient: 'from-[#A855F7] to-[#EC4899]'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'David Kim',
      role: 'Data Scientist',
      company: 'DataDriven Corp',
      quote: 'Clean interface, powerful features. My resume went from good to exceptional. Highly recommend for any professional.',
      rating: 5,
      highlight: 'Salary increased 40%',
      gradient: 'from-[#10B981] to-[#059669]'
    },
  ]

  const TestimonialCard = ({ testimonial, index }) => (
    <div className="group w-80 shrink-0 mx-4">
      <div className="relative h-full rounded-2xl bg-gradient-to-br from-[#0A0F2C] via-[#1B2256]/30 to-[#0A0F2C] border border-[#1B2256] p-6 shadow-xl hover:shadow-2xl hover:shadow-[#8DB2D4]/10 transition-all duration-500 hover:-translate-y-3 hover:scale-105">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#FF7700] text-[#FF7700]" />
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="size-12 rounded-full object-cover border-2 border-[#1B2256] group-hover:border-[#8DB2D4] transition-colors"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r ${testimonial.gradient} rounded-full border-2 border-[#010018] flex items-center justify-center`}>
              <Heart className="w-2 h-2 text-white fill-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-[#E6ECF2] group-hover:text-white transition-colors">{testimonial.name}</p>
              <Award className="w-4 h-4 text-[#FF7700]" />
            </div>
            <p className="text-sm text-[#8DB2D4]">{testimonial.role}</p>
            <p className="text-xs text-[#9AA4C7]">{testimonial.company}</p>
          </div>
        </div>

        {/* Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0F2C] border border-[#1B2256] text-xs text-[#E6ECF2] mb-4">
          <TrendingUp className="w-3 h-3 text-[#10B981]" />
          {testimonial.highlight}
        </div>

        {/* Quote */}
        <div className="relative">
          <Quote className="absolute -top-2 -left-1 w-5 h-5 text-[#8DB2D4] opacity-50" />
          <p className="text-sm text-[#9AA4C7] leading-relaxed pl-4 group-hover:text-[#B8C5D6] transition-colors">
            {testimonial.quote}
          </p>
        </div>

        {/* Decorative element */}
        <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}></div>
      </div>
    </div>
  )

  return (
    <>
      <section
        id="testimonials"
        className="flex flex-col items-center py-32 bg-gradient-to-b from-[#010018] via-[#0A0F2C] to-[#010018] scroll-mt-16 relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-40 left-20 w-96 h-96 bg-[#FF7700]/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-[#8DB2D4]/3 rounded-full blur-3xl"></div>
        </div>

        {/* Badge */}
        <div className="relative z-10 flex items-center gap-3 text-sm text-[#8DB2D4] bg-gradient-to-r from-[#0A0F2C] to-[#1B2256] border border-[#1B2256] rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
          <Heart size={16} className="text-[#FF7700]" />
          <span className="font-medium">Success Stories</span>
        </div>

        <Title
          title="Real careers, real transformations"
          description="Join thousands of professionals who've transformed their career narratives and achieved their goals with Career Compass."
        />

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#E6ECF2] mb-1">4.9/5</div>
            <div className="text-sm text-[#9AA4C7]">Average Rating</div>
            <div className="flex justify-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#FF7700] text-[#FF7700]" />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#E6ECF2] mb-1">98%</div>
            <div className="text-sm text-[#9AA4C7]">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#E6ECF2] mb-1">24hrs</div>
            <div className="text-sm text-[#9AA4C7]">Avg. Response</div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <div className="w-full mx-auto max-w-6xl overflow-hidden relative bg-gradient-to-b from-[#010018] to-[#0A0F2C]">
        <div className="absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-[#010018] via-[#010018]/80 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-[#010018] via-[#010018]/80 to-transparent" />

        {/* First Row */}
        <div className="relative overflow-hidden py-12">
          <div className="flex animate-marquee">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>

        {/* Second Row (Reverse) */}
        <div className="relative overflow-hidden py-12">
          <div className="flex animate-marquee-reverse">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
      `}</style>
    </>
  )
}

export default Testimonial
