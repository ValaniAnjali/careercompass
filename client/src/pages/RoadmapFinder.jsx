import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';

// Example roadmaps for different fields
const roadmaps = {
  "Software Developer": [
    { title: "Learn HTML & CSS", description: "Basics of web structure and styling.", completed: true },
    { title: "JavaScript / Core Programming", description: "Understand DOM, ES6+, and logic.", completed: true },
    { title: "React.js / Frontend Framework", description: "Components, state, hooks.", completed: false },
    { title: "Backend & APIs", description: "Node.js, databases, REST APIs.", completed: false },
    { title: "Deploy & CI/CD", description: "Deploy apps with pipelines.", completed: false },
  ],
  "Data Science": [
    { title: "Python Basics", description: "Data structures, loops, functions.", completed: true },
    { title: "Statistics & Probability", description: "Core concepts for data analysis.", completed: true },
    { title: "Data Visualization", description: "Matplotlib, Seaborn, Plotly.", completed: false },
    { title: "Machine Learning", description: "Supervised, unsupervised models.", completed: false },
    { title: "Deep Learning", description: "Neural networks, TensorFlow, PyTorch.", completed: false },
  ],
  "Graphic Design": [
    { title: "Learn Design Principles", description: "Color theory, typography, layout.", completed: true },
    { title: "Adobe Photoshop / Illustrator", description: "Core design tools.", completed: true },
    { title: "Branding & UI/UX Basics", description: "Design for digital products.", completed: false },
    { title: "Portfolio Building", description: "Showcase your designs.", completed: false },
  ],
};

const RoadmapFinder = () => {
  const [category, setCategory] = useState("Software Developer");
  const steps = roadmaps[category];

  return (
    <div className="min-h-screen bg-[#0A0F2C] pt-24 p-6">
      <h1 className="text-3xl font-bold text-[#E6ECF2] mb-6">Your Personalized Roadmap</h1>

      {/* Select Category */}
      <div className="mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        >
          {Object.keys(roadmaps).map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Roadmap Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border ${step.completed ? 'border-[#FF7700]' : 'border-[#1B2256]'} bg-[#0E143A] shadow hover:shadow-lg transition transform hover:scale-105`}
          >
            <div className="flex items-center mb-3">
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-3 
                               ${step.completed ? 'bg-[#FF7700]' : 'bg-[#1B2256]'}`}>
                {step.completed ? (
                  <CheckCircle className="text-[#0A0F2C]" />
                ) : (
                  <Circle className="text-[#9AA4C7]" />
                )}
              </div>
              <h2 className={`text-lg font-semibold ${step.completed ? 'text-[#FF7700]' : 'text-[#E6ECF2]'}`}>
                {step.title}
              </h2>
            </div>
            <p className="text-[#9AA4C7]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapFinder;
