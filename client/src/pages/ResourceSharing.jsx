import React, { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";

const ResourceSharing = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
  }, []);

 const fetchResources = async () => {
  try {
    const token = localStorage.getItem("token"); // or wherever you store it
    const res = await api.get("/api/resources", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setResources(res.data);
  } catch (err) {
    console.error("Failed to load resources", err);
  }
};

const viewPDF = async (id) => {
  try {
    const res = await api.get(`/api/resources/${id}`); // call backend with correct _id
    window.open(res.data.fileUrl, "_blank"); // open PDF directly
  } catch (err) {
    console.error("Failed to open PDF", err);
    alert("Failed to open PDF");
  }
};





  const filteredResources = resources.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 mt-16">
        <h1 className="text-3xl font-semibold">📚 Resource Sharing</h1>

        <button
          onClick={() => navigate("/app/upload-resource")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          <UploadCloud size={18} />
          Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          className="border px-3 py-2 rounded w-full"
          placeholder="Search resources..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Lecture Notes">Lecture Notes</option>
          <option value="Placement Prep">Placement Prep</option>
          <option value="Guidance">Guidance</option>
          <option value="Notes">Notes</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredResources.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-5 hover:shadow-md"
          >
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {item.category}
            </span>

            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>

            <p className="text-sm text-gray-500">
              Uploaded by {item.uploadedBy?.name || "Unknown"}
            </p>

            <button
  onClick={() => viewPDF(item._id)} // use _id here
  className="text-purple-600 font-medium mt-3 inline-block"
>
  View / Download →
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceSharing;
