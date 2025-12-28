import { Plus, Sparkles, X } from "lucide-react"
import React, { useState } from "react"

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("")
  const [showCustomizer, setShowCustomizer] = useState(false)

  const [resumeTheme, setResumeTheme] = useState({
    bgColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#2563eb",
    fontFamily: "Inter",
  })

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (indexToRemove) => {
    onChange(data.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <>
      {/* ================= SKILLS FORM ================= */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Skills</h3>
          <p className="text-sm text-[#9AA4C7]">
            Add your technical and soft skills
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a skill (e.g., JavaScript, Leadership)"
            className="flex-1 px-3 py-2 text-sm border border-[#1B2256] bg-[#010018] text-white placeholder-[#9AA4C7] rounded-lg focus:ring-2 focus:ring-[#FFA600]/50 outline-none"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
          />

          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="px-4 py-2 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black rounded-lg disabled:opacity-50"
          >
            <Plus size={16} />
          </button>
        </div>

        {data.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: resumeTheme.accentColor,
                  color: resumeTheme.bgColor,
                  fontFamily: resumeTheme.fontFamily,
                }}
              >
                {skill}
                <button onClick={() => removeSkill(index)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-400" />
            <p>No skills added yet</p>
          </div>
        )}
      </div>

      {/* ================= CUSTOMIZER MODAL ================= */}
      {showCustomizer && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#010018] w-[380px] p-6 rounded-xl border border-[#1B2256] space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Customize Resume</h3>
              <button onClick={() => setShowCustomizer(false)}>
                <X className="text-white" size={16} />
              </button>
            </div>

            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: resumeTheme.bgColor,
                color: resumeTheme.textColor,
                fontFamily: resumeTheme.fontFamily,
                borderColor: resumeTheme.accentColor,
              }}
            >
              <p className="font-semibold">Preview Text</p>
              <p style={{ color: resumeTheme.accentColor }}>
                Accent Color Example
              </p>
            </div>

            <div>
              <label className="text-sm text-[#9AA4C7] block mb-1">
                Background Color
              </label>
              <input
                type="color"
                value={resumeTheme.bgColor}
                onChange={(e) =>
                  setResumeTheme({ ...resumeTheme, bgColor: e.target.value })
                }
                className="w-full h-10 rounded-lg border border-[#1B2256]"
              />
            </div>

            <div>
              <label className="text-sm text-[#9AA4C7] block mb-1">
                Text Color
              </label>
              <input
                type="color"
                value={resumeTheme.textColor}
                onChange={(e) =>
                  setResumeTheme({ ...resumeTheme, textColor: e.target.value })
                }
                className="w-full h-10 rounded-lg border border-[#1B2256]"
              />
            </div>

            <div>
              <label className="text-sm text-[#9AA4C7] block mb-1">
                Accent Color
              </label>
              <input
                type="color"
                value={resumeTheme.accentColor}
                onChange={(e) =>
                  setResumeTheme({ ...resumeTheme, accentColor: e.target.value })
                }
                className="w-full h-10 rounded-lg border border-[#1B2256]"
              />
            </div>

            <div>
              <label className="text-sm text-[#9AA4C7] block mb-1">
                Font Family
              </label>
              <select
                value={resumeTheme.fontFamily}
                onChange={(e) =>
                  setResumeTheme({ ...resumeTheme, fontFamily: e.target.value })
                }
                className="w-full px-3 py-2 bg-[#020024] border border-[#1B2256] text-white rounded-lg"
              >
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
                <option value="Roboto">Roboto</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SkillsForm
