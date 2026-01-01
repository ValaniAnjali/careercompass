import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";

export default function ResourceUpload() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // New state
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
      setLoading(true); // Start loading
      await api.post("/api/resources/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">Upload Resource</h2>

      <form onSubmit={submitHandler} className="space-y-5">
        <input
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading} // Disable input while uploading
        />

        <select
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={loading} // Disable select while uploading
        >
          <option value="" className="text-gray-400">Select Category</option>
          <option>Lecture Notes</option>
          <option>Placement Prep</option>
          <option>Guidance</option>
          <option>Notes</option>
        </select>

        <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-purple-500 transition-colors text-gray-400">
          <span>{file ? file.name : "Choose a PDF file"}</span>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
            disabled={loading} // Disable file input while uploading
          />
        </label>

        <button
          type="submit"
          className={`w-full py-3 bg-purple-600 text-white font-semibold rounded-xl transition-colors shadow-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
          }`}
          disabled={loading} // Disable button while uploading
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
