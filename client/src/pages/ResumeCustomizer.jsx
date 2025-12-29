import React, { useState } from "react";

const ResumeCustomizer = ({
  bgColor,
  textColor,
  fontFamily,
  accentColor,
  onSave,
  onClose,
}) => {
  const [localBg, setLocalBg] = useState(bgColor);
  const [localText, setLocalText] = useState(textColor);
  const [localFont, setLocalFont] = useState(fontFamily);
  const [localAccent, setLocalAccent] = useState(accentColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[380px] rounded-xl p-6 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold">Customize Resume</h2>

        {/* Background */}
        <div>
          <label className="text-sm font-medium">Background Color</label>
          <input
            type="color"
            value={localBg}
            onChange={(e) => setLocalBg(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Text */}
        <div>
          <label className="text-sm font-medium">Text Color</label>
          <input
            type="color"
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Accent */}
        <div>
          <label className="text-sm font-medium">Accent Color</label>
          <input
            type="color"
            value={localAccent}
            onChange={(e) => setLocalAccent(e.target.value)}
            className="w-full h-10"
          />
        </div>

        {/* Font */}
        <div>
          <label className="text-sm font-medium">Font</label>
          <select
            value={localFont}
            onChange={(e) => setLocalFont(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="Inter">Inter</option>
            <option value="Poppins">Poppins</option>
            <option value="Roboto">Roboto</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                bgColor: localBg,
                textColor: localText,
                fontFamily: localFont,
                accentColor: localAccent,
              })
            }
            className="px-4 py-2 rounded-md bg-black text-white"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCustomizer;
