import React, { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";

const MODERATION_KEY = "careerCompassModeration";

const ResourceSharing = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [moderation, setModeration] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchResources();
    // Load moderation map and subscribe to localStorage changes (other tabs)
    const loadModeration = () => {
      try {
        const raw = localStorage.getItem(MODERATION_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        setModeration(typeof parsed === "object" && parsed !== null ? parsed : {});
      } catch (e) {
        setModeration({});
      }
    };
    loadModeration();

    const onStorage = (e) => {
      if (e.key === MODERATION_KEY) {
        loadModeration();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Debounce search input for smoother UX
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  // Helper: read moderation map fresh to reflect same-tab updates
  const getModerationMap = () => {
    try {
      const raw = localStorage.getItem(MODERATION_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    } catch (e) {
      return {};
    }
  };

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

  const viewPDF = async (id) => {
    try {
      const res = await api.get(`/api/resources/${id}`);
      window.open(res.data.fileUrl, "_blank");
    } catch (err) {
      console.error("Failed to open PDF", err);
      alert("Failed to open PDF");
    }
  };

  const moderationMap = getModerationMap();

  const filteredResources = resources
    .filter((item) => {
      const status = moderationMap[item?._id] || "pending";
      // Only show approved resources in sharing page
      return status === "approved";
    })
    .filter(
      (item) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (category === "All" || item.category === category)
    )
    // Optional: sort by most recent first if timestamps exist
    .sort((a, b) => {
      const ta = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return tb - ta;
    });

  return (
    <div className="min-h-screen bg-[#0A0F2C] px-6 py-12 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3 mb-4 md:mb-0">
          Resource Sharing
        </h1>

        <button
          onClick={() => navigate("/app/upload-resource")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black px-5 py-2 rounded-xl hover:shadow-lg transition-shadow"
        >
          <UploadCloud size={20} />
          Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl">
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-[#0E143A] text-white placeholder-[#9AA4C7] focus:outline-none focus:ring-2 focus:ring-[#FF7700]/50"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl bg-[#0E143A] text-white border border-[#1B2256] focus:outline-none focus:ring-2 focus:ring-[#FF7700]/50"
        >
          <option value="All">All Categories</option>
          <option value="Lecture Notes">Lecture Notes</option>
          <option value="Placement Prep">Placement Prep</option>
          <option value="Guidance">Guidance</option>
          <option value="Notes">Notes</option>
        </select>
      </div>

      {/* Resource Cards */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#9AA4C7]">No approved resources available yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <div
              key={item._id}
              className="bg-[#0E143A]/50 backdrop-blur-sm p-5 rounded-2xl border border-[#1B2256]/50 hover:shadow-lg hover:shadow-[#FF7700]/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category */}
              <span className="text-xs px-3 py-1 rounded-full bg-[#FF7700]/20 text-[#FF7700] border border-[#FF7700]/30 w-max">
                {item.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mt-3">{item.title}</h3>

              {/* Approved Label */}
              <span className="mt-1 text-xs px-2 py-1 rounded-full bg-green-600/20 text-green-300 border border-green-600/30 w-max">
                Approved
              </span>

              {/* Uploaded By */}
              <p className="text-[#9AA4C7] mt-2 text-sm">
                Uploaded by {item.uploadedBy?.name || "Unknown"}
              </p>

              {/* Direct Link */}
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-[#FF7700] to-[#FFA600] text-black rounded-xl font-medium hover:shadow-lg hover:shadow-[#FF7700]/25 transition-all duration-300"
              >
                Open Resource →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceSharing;
