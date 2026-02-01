import {
  UploadCloudIcon,
  EyeIcon,
  DownloadIcon,
  FileTextIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../configs/api";

const RoadmapFinder = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [roadmaps, setRoadmaps] = useState([]);

  useEffect(() => {
    if (role) fetchRoadmaps();
  }, [role]);

  const fetchRoadmaps = async () => {
    try {
      const res = await api.get(`/api/roadmaps/by-role?role=${role}`);
      setRoadmaps(res.data);
    } catch (err) {
      console.error("Failed to fetch roadmaps", err);
    }
  };
  console.log(roadmaps);


  return (
    <div className="min-h-screen bg-[#0A0F2C] px-6 py-12">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Career Roadmaps</h1>

        <button
          onClick={() => navigate("/app/roadmap-upload")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#FF7700] to-[#FF5500] text-black px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition"
        >
          <UploadCloudIcon size={18} />
          Upload Roadmap
        </button>
      </div>

      {/* ROLE FILTER */}
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mb-10 px-4 py-3 rounded-xl bg-[#0E143A] text-white border border-[#1B2256]"
      >
        <option value="">Select Role</option>
        <option>Frontend Developer</option>
        <option>Backend Developer</option>
        <option>Android Developer</option>
        <option>Full Stack Developer</option>
        <option>Data Scientist</option>
        <option>Non technical</option>
        <option>Business</option>
        <option>Other</option>
      </select>

      {/* ROADMAP LIST */}
      {roadmaps.length === 0 ? (
        <p className="text-[#9AA4C7]">No roadmaps found for this role.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {roadmaps.map((r) => (
            <div
              key={r._id}
              className="bg-[#0E143A]/60 p-6 rounded-2xl border border-[#1B2256] space-y-4"
            >
              <h3 className="text-xl font-bold text-white">{r.title}</h3>

              <p className="text-[#9AA4C7] text-sm">{r.brief}</p>

              <p className="text-sm text-[#FF7700]">
                By {r.uploadedBy?.name || "Unknown"}
              </p>

              {/* PDF LIST */}
              <div className="space-y-3 pt-3">
                {r.pdfs?.map((pdf, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between bg-[#0A0F2C] px-4 py-3 rounded-xl border border-[#1B2256]"
                  >
                    <div className="flex items-center gap-2 text-[#E6ECF2] text-sm">
                      <FileTextIcon
                        size={18}
                        className="text-[#FF7700]"
                      />
                      <span>Roadmap PDF {idx + 1}</span>
                    </div>

                    <div className="flex gap-4">
                      {/* VIEW */}
                      <a
                        href={pdf.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[#8DB2D4] hover:text-white text-sm"
                      >
                        <EyeIcon size={16} />
                        View
                      </a>

                      {/* DOWNLOAD */}
                      <a
                        href={pdf.fileUrl}
                        download
                        className="flex items-center gap-1 text-[#FF7700] hover:text-white text-sm"
                      >
                        <DownloadIcon size={16} />
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapFinder;
