import {
  FilePenLineIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
  BookOpenIcon,
  ClipboardListIcon,
  SparklesIcon,
  TrendingUpIcon,
  UsersIcon,
  AwardIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
// import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [interviewQuestionsCount, setInterviewQuestionsCount] = useState(0);

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const loadInterviewQuestionsCount = async () => {
    try {
      const { data } = await api.get("/api/interview-questions", {
        headers: { Authorization: token },
      });
      setInterviewQuestionsCount(data.data ? data.data.length : 0);
    } catch (error) {
      console.error("Failed to load interview questions count:", error);
    }
  };

  const createResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/resumes/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } }
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };
  {
    /* ---------------- CHATBOT ---------------- */
  }
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const { data } = await api.post(
        "/api/chatbot",
        { message: userMsg.content },
        { headers: { Authorization: token } }
      );
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: "bot", content: "AI error occurred" },
      ]);
    }

    setChatLoading(false);
  };
  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [chatMessages]);

  const editTitle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/api/resumes/update`,
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: token } }
      );
      setAllResumes(
        allResumes.map((r) => (r._id === editResumeId ? { ...r, title } : r))
      );
      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    if (!window.confirm("Delete this resume?")) return;
    try {
      const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
        headers: { Authorization: token },
      });
      setAllResumes(allResumes.filter((r) => r._id !== resumeId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
    loadInterviewQuestionsCount();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010018] via-[#0A0F2C] to-[#010018] relative overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF7700]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8DB2D4]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#FF7700]/10 to-transparent rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 space-y-16">
        {/* HERO SECTION */}
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#FF7700] border border-[#FF7700] rounded-full">
            <SparklesIcon className="size-5 text-black" />
            <span className="text-black font-semibold">
              Welcome back, {user?.name || "Anjali"}!
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#E6ECF2] via-[#8DB2D4] to-[#FF7700] bg-clip-text text-transparent">
              Your Resume Hub
            </h1>
            <p className="text-xl text-[#9AA4C7] max-w-2xl mx-auto">
              Build, manage, and perfect your resumes with AI-powered tools and
              expert guidance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setShowCreateResume(true)}
              className="group px-8 py-4 bg-gradient-to-r from-[#FF7700] to-[#FF5500] text-black font-bold rounded-xl hover:shadow-2xl hover:shadow-[#FF7700]/30 hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <PlusIcon className="size-6 group-hover:rotate-90 transition-transform duration-300" />
              Create New Resume
            </button>
            <button
              onClick={() => setShowUploadResume(true)}
              className="px-8 py-4 bg-[#0A0F2C]/80 border border-[#1B2256] text-[#E6ECF2] font-semibold rounded-xl hover:border-[#8DB2D4] hover:bg-[#0E143A] hover:shadow-lg hover:shadow-[#8DB2D4]/20 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
            >
              <UploadCloudIcon className="size-5" />
              Upload Existing
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <StatCard
              icon={FilePenLineIcon}
              label="Resumes Created"
              value={allResumes.length}
            />
            <StatCard
              icon={BookOpenIcon}
              label="Interview Questions"
              value={interviewQuestionsCount}
            />
            <StatCard
              icon={TrendingUpIcon}
              label="Career Progress"
              value="85%"
            />
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#E6ECF2] mb-4">
              Quick Actions
            </h2>
            <p className="text-[#9AA4C7]">
              Jump into your favorite tools and resources
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ActionCard
              icon={FilePenLineIcon}
              label="Interview Questions"
              description="Practice with AI-generated questions"
              onClick={() => navigate("/app/interview-questions")}
              gradient="from-[#FF7700] to-[#FF5500]"
            />
            <ActionCard
              icon={UploadCloud}
              label="Submit Question"
              description="Contribute to our question bank"
              onClick={() => navigate("/app/submit-question")}
              gradient="from-[#FF7700] to-[#FF5500]"
            />
            <ActionCard
              icon={AwardIcon}
              label="Career Roadmap"
              description="Find your perfect career path"
              onClick={() => navigate("/app/roadmap-finder")}
              gradient="from-[#FF7700] to-[#FF5500]"
            />
            <ActionCard
              icon={UsersIcon}
              label="Resources"
              description="Access shared resources"
              onClick={() => navigate("/app/resources")}
              gradient="from-[#FF7700] to-[#FF5500]"
            />
          </div>
        </div>

        {/* RESUMES GALLERY */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#E6ECF2] mb-4">
              Your Resumes
            </h2>
            <p className="text-[#9AA4C7]">
              Manage and edit your professional documents
            </p>
          </div>

          {allResumes.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FF7700]/30 border-2 border-[#FF7700] rounded-full mb-6">
                <FilePenLineIcon className="size-12 text-[#FF7700]" />
              </div>
              <h3 className="text-2xl font-semibold text-[#E6ECF2] mb-2">
                No resumes yet
              </h3>
              <p className="text-[#9AA4C7] mb-8">
                Start building your first professional resume!
              </p>
              <button
                onClick={() => setShowCreateResume(true)}
                className="px-6 py-3 bg-[#FF7700] text-black font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
              >
                Create Your First Resume
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allResumes.map((resume) => (
                <ResumeCard
                  key={resume._id}
                  resume={resume}
                  onEdit={(id, title) => {
                    setEditResumeId(id);
                    setTitle(title);
                  }}
                  onDelete={deleteResume}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="fixed bottom-4 right-4 w-80 bg-[#0A0F2C] border-2 border-[#1B2256] rounded-xl p-4 flex flex-col space-y-2 shadow-xl z-50">
          <div className="flex-1 overflow-y-auto max-h-64 space-y-2">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  msg.role === "user"
                    ? "bg-[#FF7700]/30 text-black self-end"
                    : "bg-[#1B2256] text-[#E6ECF2] self-start"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
              placeholder="Ask AI..."
              className="flex-1 px-2 py-1 rounded-md bg-[#0E143A] border border-[#1B2256] text-[#E6ECF2] focus:outline-none"
            />
            <button
              onClick={sendChatMessage}
              className="px-3 py-1 bg-[#FF7700] text-black rounded-md"
              disabled={chatLoading}
            >
              {chatLoading ? "..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showCreateResume && (
        <Modal
          title="Create New Resume"
          onClose={() => setShowCreateResume(false)}
          onSubmit={createResume}
          button="Create Resume"
        >
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Enter resume title"
          />
        </Modal>
      )}

      {showUploadResume && (
        <Modal
          title="Upload Resume"
          onClose={() => setShowUploadResume(false)}
          onSubmit={uploadResume}
          button={isLoading ? "Uploading..." : "Upload Resume"}
        >
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Enter resume title"
          />
        </Modal>
      )}

      {editResumeId && (
        <Modal
          title="Edit Resume Title"
          onClose={() => setEditResumeId("")}
          onSubmit={editTitle}
          button="Update Title"
        >
          <Input
            value={title}
            onChange={setTitle}
            placeholder="Enter new title"
          />
        </Modal>
      )}
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="relative bg-[#0A0F2C] border-2 border-[#1B2256] rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-xl bg-[#0E143A] border border-[#1B2256]">
        <Icon className="size-6 text-[#8DB2D4]" />
      </div>
      <div>
        <p className="text-sm text-[#9AA4C7] font-medium">{label}</p>
        <p className="text-2xl font-bold text-[#E6ECF2]">{value}</p>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

const ActionCard = ({ icon: Icon, label, description, onClick, gradient }) => (
  <button
    onClick={onClick}
    className="group relative rounded-2xl p-8 text-center bg-[#0A0F2C] border-2 border-[#1B2256] hover:border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm overflow-hidden"
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
    ></div>
    <div className="relative z-10">
      <div className="p-4 w-fit rounded-2xl bg-[#0E143A] border border-[#1B2256] mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <Icon className="size-8 text-[#E6ECF2] group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-lg font-bold text-[#E6ECF2] mb-2 group-hover:text-white transition-colors duration-300">
        {label}
      </h3>
      <p className="text-sm text-[#9AA4C7] group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7700] to-[#8DB2D4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </button>
);

const ResumeCard = ({ resume, onEdit, onDelete, onClick }) => (
  <div
    onClick={onClick}
    className="group relative rounded-2xl p-8 cursor-pointer bg-[#0A0F2C] border-2 border-[#1B2256] hover:border-[#FF7700]/50 hover:shadow-2xl hover:shadow-[#FF7700]/20 hover:-translate-y-3 transition-all duration-500 backdrop-blur-sm overflow-hidden min-h-[280px] flex flex-col justify-center items-center text-center"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#FF7700]/10 via-transparent to-[#8DB2D4]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Resume Icon */}
    <div className="relative p-6 rounded-2xl bg-[#0E143A] border-2 border-[#1B2256] mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
      <FilePenLineIcon className="size-12 text-[#8DB2D4] group-hover:text-[#FF7700] transition-colors duration-300" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF7700]/20 to-[#8DB2D4]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    {/* Title and Date */}
    <div className="relative z-10">
      <p className="font-bold text-xl text-[#E6ECF2] mb-3 group-hover:text-white transition-colors duration-300 line-clamp-2">
        {resume.title}
      </p>
      <p className="text-sm text-[#9AA4C7] group-hover:text-white/80 transition-colors duration-300">
        {new Date(resume.updatedAt).toLocaleDateString()}
      </p>
    </div>

    {/* Action Buttons */}
    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(resume._id, resume.title);
        }}
        className="p-3 rounded-xl bg-[#0E143A] hover:bg-[#1B2256] hover:scale-110 transition-all duration-200 backdrop-blur-sm border-2 border-[#1B2256]"
      >
        <PencilIcon className="size-4 text-[#8DB2D4] hover:text-[#FF7700] transition-colors duration-200" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(resume._id);
        }}
        className="p-3 rounded-xl bg-[#0E143A] hover:bg-[#B1467F] hover:scale-110 transition-all duration-200 backdrop-blur-sm border-2 border-[#1B2256]"
      >
        <TrashIcon className="size-4 text-[#FF7700] hover:text-white transition-colors duration-200" />
      </button>
    </div>

    {/* Hover Effect Line */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF7700] to-[#8DB2D4] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </div>
);

const Modal = ({ title, children, onClose, onSubmit, button }) => (
  <form
    onSubmit={onSubmit}
    onClick={onClose}
    className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-[#0A0F2C] border-2 border-[#1B2256] rounded-2xl p-8 w-full max-w-md backdrop-blur-xl shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF7700]/20 via-transparent to-[#8DB2D4]/20 rounded-2xl"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-[#E6ECF2] text-center">
          {title}
        </h2>
        {children}
        <button className="w-full mt-6 py-4 rounded-xl bg-[#FF7700] text-black font-bold hover:opacity-90 hover:scale-105 transition-all duration-300">
          {button}
        </button>
      </div>
      <XIcon
        onClick={onClose}
        className="absolute top-4 right-4 text-[#9AA4C7] hover:text-[#FF7700] cursor-pointer size-6 hover:scale-110 transition-all duration-200"
      />
    </div>
  </form>
);

const Input = ({ value, onChange, placeholder = "Enter title" }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-6 py-4 rounded-xl bg-[#0E143A] border-2 border-[#1B2256] text-[#E6ECF2] placeholder-[#9AA4C7] focus:outline-none focus:ring-2 focus:ring-[#FF7700]/50 focus:border-[#FF7700] transition-all duration-300 backdrop-blur-sm"
    required
  />
);

export default Dashboard;
