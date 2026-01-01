import { useState, useRef } from "react";
import toast from "react-hot-toast";
import api from "../configs/api";

export default function ResourceUpload() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
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
      await api.post("/api/resources/upload", formData, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

      toast.success("Uploaded successfully");
      setTitle("");
      setCategory("");
      fileRef.current.value = "";
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Upload Resource</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Lecture Notes</option>
          <option>Placement Prep</option>
          <option>Guidance</option>
          <option>Notes</option>
        </select>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="bg-purple-600 text-white py-2 w-full rounded">
          Upload
        </button>
      </form>
    </div>
  );
}
