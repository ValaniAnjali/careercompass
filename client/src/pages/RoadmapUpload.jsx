// RoadmapUpload.jsx
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";

export default function RoadmapUpload() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [brief, setBrief] = useState("");
  const [whyFollow, setWhyFollow] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#0A0F2C] border border-[#1B2256] text-[#E6ECF2] placeholder-[#9AA4C7] focus:outline-none focus:ring-2 focus:ring-[#FF7700]/40 focus:border-[#FF7700]";


  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title || !role || !brief || !whyFollow || files.length === 0) {
      toast.error("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("role", role);
    formData.append("brief", brief);
    formData.append("whyFollow", whyFollow);

    files.forEach((f) => formData.append("pdfs", f));

    try {
      setLoading(true);
      await api.post("/api/roadmaps/upload", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      toast.success("Roadmap uploaded 🚀");
      setTitle("");
      setRole("");
      setBrief("");
      setWhyFollow("");
      setFiles([]);
      fileRef.current.value = "";
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F2C] flex items-center justify-center px-6">
      <form
        onSubmit={submitHandler}
        className="bg-[#0E143A] border border-[#1B2256] p-8 rounded-2xl w-full max-w-2xl space-y-5 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-[#E6ECF2] text-center">
          Submit Roadmap
        </h2>

        <input
          className={inputClass}
          placeholder="Roadmap Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className={`${inputClass} cursor-pointer`}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" className="text-gray-400">
            Select Role
          </option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Android Developer</option>
          <option>Full Stack Developer</option>
          <option>Data Scientist</option>
        </select>

        <textarea
          className={`${inputClass} min-h-[100px]`}
          placeholder="Brief about roadmap"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
        />

        <textarea
          className={`${inputClass} min-h-[100px]`}
          placeholder="Why should someone follow this roadmap?"
          value={whyFollow}
          onChange={(e) => setWhyFollow(e.target.value)}
        />

        <div className="border border-dashed border-[#8DB2D4] rounded-xl p-4 text-center">
          <p className="text-sm text-[#9AA4C7] mb-2">
            Upload one or more PDFs
          </p>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => setFiles([...e.target.files])}
            className="text-[#E6ECF2]"
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF7700] to-[#FF5500] text-black font-bold hover:scale-105 transition-all"
        >
          {loading ? "Uploading..." : "Upload Roadmap"}
        </button>
      </form>
    </div>
  );
}