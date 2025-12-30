import React, { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
<<<<<<< HEAD

const categoryColors = {
  "Lecture Notes": "bg-blue-600 text-white",
  "Placement Prep": "bg-green-600 text-white",
  "Guidance": "bg-purple-600 text-white",
  "Notes": "bg-orange-500 text-white",
  "All": "bg-gray-400 text-white",
};
=======
>>>>>>> 1e220abfcf269c3fe07fa477737cf807494c22f8

const ResourceSharing = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
  }, []);

<<<<<<< HEAD
  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/resources", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(res.data);
    } catch (err) {
      console.error("Failed to load resources", err);
    }
  };

  const viewPDF = async (publicId) => {
    try {
      const res = await api.get(`/api/resource/${publicId}`);
      const pdfRes = await fetch(res.data.url);
      const pdfBlob = await pdfRes.blob();
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    } catch (err) {
      console.error("Failed to load PDF", err);
      alert("Failed to open PDF.");
    }
  };

  const filteredResources = resources.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category)
  );

  return (
    <div className="min-h-screen bg-[#0A0F2C] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-[#E6ECF2]">📚 Resource Sharing</h1>

          <button
            onClick={() => navigate("/app/upload-resource")}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            <UploadCloud size={18} />
            Upload Resource
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            className="px-4 py-2 rounded-lg w-full md:w-1/2 bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] placeholder-[#9AA4C7] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Search resources..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-lg bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Lecture Notes">Lecture Notes</option>
            <option value="Placement Prep">Placement Prep</option>
            <option value="Guidance">Guidance</option>
            <option value="Notes">Notes</option>
          </select>
        </div>

        {/* Resource Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item._id}
              className="p-5 bg-[#0E143A] border border-[#1B2256] rounded-xl shadow hover:shadow-lg transform hover:scale-105 transition cursor-pointer"
            >
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  categoryColors[item.category] || "bg-gray-400 text-white"
                }`}
              >
                {item.category}
              </span>

              <h3 className="text-lg font-semibold mt-3 text-[#E6ECF2]">
                {item.title}
              </h3>

              <p className="text-sm text-[#9AA4C7] mt-1">
                Uploaded by {item.uploadedBy?.name || "Unknown"}
              </p>

              <button
                onClick={() => viewPDF(item.publicId)}
                className="mt-4 inline-block text-[#FF7700] font-medium hover:text-orange-400 transition"
              >
                View / Download →
              </button>
            </div>
          ))}

          {filteredResources.length === 0 && (
            <p className="text-[#9AA4C7] col-span-full text-center mt-8">
              No resources found.
            </p>
          )}
        </div>
=======
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

const viewPDF = async (publicId) => {
  try {
    const res = await api.get(`/api/resource/${publicId}`); // call your backend
    const pdfRes = await fetch(res.data.url);              // fetch signed Cloudinary URL
    const pdfBlob = await pdfRes.blob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl); // opens PDF in a new tab
  } catch (err) {
    console.error("Failed to load PDF", err);
    alert("Failed to open PDF.");
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
              onClick={() => viewPDF(item.publicId)} // make sure item.publicId exists
              className="text-purple-600 font-medium mt-3 inline-block"
            >
              View / Download →
            </button>

          </div>
        ))}
>>>>>>> 1e220abfcf269c3fe07fa477737cf807494c22f8
      </div>
    </div>
  );
};

export default ResourceSharing;
