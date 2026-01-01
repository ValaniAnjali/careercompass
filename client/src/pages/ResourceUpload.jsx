import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";

export default function ResourceUpload() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !category || !file) {
      toast.error("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("file", file);

    try {
      setLoading(true);
      await api.post("/api/resources/upload", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Uploaded successfully");
      setTitle("");
      setCategory("");
      setFile(null);
      fileRef.current.value = "";
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F2C] px-6 py-12">
      <div className="w-full max-w-lg p-8 bg-[#0E143A]/50 backdrop-blur-md rounded-2xl border border-[#1B2256]/50 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Upload Resource
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <input
            className="w-full p-3 rounded-xl bg-[#0A0F2C]/70 border border-[#1B2256] text-white placeholder-[#9AA4C7] focus:outline-none focus:ring-2 focus:ring-[#FF7700]/50 transition"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />

          <select
            className="w-full p-3 rounded-xl bg-[#0A0F2C]/70 border border-[#1B2256] text-white focus:outline-none focus:ring-2 focus:ring-[#FF7700]/50 transition"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="" className="text-[#9AA4C7]">Select Category</option>
            <option>Lecture Notes</option>
            <option>Placement Prep</option>
            <option>Guidance</option>
            <option>Notes</option>
          </select>

          <label className="w-full flex flex-col items-center px-4 py-6 bg-[#0E143A]/50 border-2 border-dashed border-[#1B2256] rounded-xl cursor-pointer hover:border-[#FF7700] transition-colors text-[#9AA4C7]">
            <span>{file ? file.name : "Choose a PDF file"}</span>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
              disabled={loading}
            />
          </label>

          <button
            type="submit"
            className={`w-full py-3 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black font-semibold rounded-xl shadow-md transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[#FF7700]/30"
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}
