import { useState, useRef } from "react"
import toast from "react-hot-toast"
import api from "../configs/api"

export default function ResourceUpload() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef(null) // ⭐ important

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!category) {
      toast.error("Please select a category")
      return
    }

    if (!file) {
      toast.error("Please select a file")
      return
    }

    if (loading) return

    setLoading(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("category", category)
    formData.append("file", file)

    try {
      await api.post("/api/resources", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      toast.success("Resource uploaded successfully")

      // ✅ Reset form
      setTitle("")
      setCategory("")
      setFile(null)
      fileInputRef.current.value = ""   // 🔥 clears file name

    } catch (err) {
      toast.error("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Resource</h2>

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
          <option value="Lecture Notes">Lecture Notes</option>
          <option value="Placement Prep">Placement Prep</option>
          <option value="Guidance">Guidance</option>
          <option value="Notes">Notes</option>
          <option value="Resources">Resources</option>
        </select>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  )
}
