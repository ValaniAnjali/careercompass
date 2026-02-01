import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import "./Admin.css";

// Local moderation status map key
const MODERATION_KEY = "careerCompassModeration";

const Admin = () => {
  const [resources, setResources] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [section, setSection] = useState("overview");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Career Compass – Admin Control Panel";

    const getAuthHeaders = () => {
      let token = localStorage.getItem("token");
      try {
        // Handle cases where token may be stored as JSON string
        const maybeJson = JSON.parse(token);
        if (typeof maybeJson === "string") token = maybeJson;
      } catch {}
      token = typeof token === "string" ? token.trim() : "";
      if (!token) return null;
      return { Authorization: `Bearer ${token}` };
    };

    const fetchResources = async () => {
      try {
        const headers = getAuthHeaders();
        const res = await api.get("/api/resources", { headers: headers || {} });
        const list = Array.isArray(res.data) ? res.data : [];
        setResources(list);
      } catch (err) {
        console.error("Failed to load resources", err);
        setResources([]);
      }
    };

    const fetchUsers = async () => {
      setUsersLoading(true);
      setUsersError("");
      try {
        const res = await api.get("/api/users");
        const list = Array.isArray(res.data) ? res.data : [];
        setUsers(list);
      } catch (err) {
        console.error("Failed to load users", err);
        setUsersError("Failed to load users.");
        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchResources();
    fetchUsers();
  }, []);

  // Moderation map helpers
  const getModerationMap = () => {
    try {
      const raw = localStorage.getItem(MODERATION_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    } catch (e) {
      return {};
    }
  };

  const updateStatus = (id, nextStatus) => {
    const map = getModerationMap();
    const next = { ...map, [id]: nextStatus };
    localStorage.setItem(MODERATION_KEY, JSON.stringify(next));
    setResources((prev) => [...prev]);
  };

  const deleteUser = async (id) => {
    if (!id) return;
    try {
      await api.delete(`/api/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
      alert("Failed to delete user");
    }
  };

  const createUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill name, email and password");
      return;
    }
    try {
      await api.post("/api/users/register", newUser);
      setNewUser({ name: "", email: "", password: "" });
      // Refresh users
      const res = await api.get("/api/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to create user", err);
      alert("Failed to create user");
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "-";
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return "-";
    }
  };

  const openUser = (user) => {
    setSelectedUser(user || null);
    setShowUserModal(true);
  };
  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Career Compass</h2>
        <nav className="admin-nav">
          <button className={`nav-item ${section === "overview" ? "active" : ""}`} onClick={() => setSection("overview")}>Overview</button>
          <button className={`nav-item ${section === "users" ? "active" : ""}`} onClick={() => setSection("users")}>Users</button>
          <button className={`nav-item ${section === "addUser" ? "active" : ""}`} onClick={() => setSection("addUser")}>Add User</button>
          <button className={`nav-item ${section === "verifyResources" ? "active" : ""}`} onClick={() => setSection("verifyResources")}>Verify Resources</button>
          <button className={`nav-item ${section === "addResource" ? "active" : ""}`} onClick={() => setSection("addResource")}>Add Resource</button>
        </nav>
      </aside>

      <main className="admin-main">
        <h1>Career Compass – Admin Control Panel</h1>

        {section === "overview" && (
          <>
            <div className="admin-card">
              <h2 style={{ marginTop: 0 }}>Overview</h2>
              <p className="muted">Quick stats and shortcuts.</p>
              <div className="form-row">
                <div className="admin-card" style={{ flex: 1 }}>
                  <h4 style={{ marginTop: 0 }}>Users</h4>
                  <p>Total: {users.length}</p>
                </div>
                <div className="admin-card" style={{ flex: 1 }}>
                  <h4 style={{ marginTop: 0 }}>Resources</h4>
                  <p>Total: {resources.length}</p>
                </div>
                <div className="admin-card" style={{ flex: 1 }}>
                  <h4 style={{ marginTop: 0 }}>Pending</h4>
                  <p>
                    {resources.filter((r) => (getModerationMap()[r?._id] || "pending") === "pending").length}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {section === "users" && (
          <div className="admin-card">
            <h3 style={{ marginTop: 0 }}>All Users</h3>
            {usersLoading ? (
              <p className="muted">Loading users…</p>
            ) : usersError ? (
              <p className="muted">{usersError}</p>
            ) : users.length === 0 ? (
              <p className="muted">No users found.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const role = (u.role || "user").toLowerCase();
                      const status = (u.status || "active").toLowerCase();
                      const isAdmin = role === "admin";
                      return (
                        <tr key={u._id}>
                          <td>{u.name || "-"}</td>
                          <td>{u.email || "-"}</td>
                          <td style={{ textTransform: "capitalize" }}>{role}</td>
                          <td style={{ textTransform: "capitalize" }}>{status}</td>
                          <td>{formatDate(u.createdAt)}</td>
                          <td>
                            <button
                              className="action-btn secondary-btn"
                              style={{ marginRight: 8 }}
                              onClick={() => openUser(u)}
                            >
                              View
                            </button>
                            <button
                              className="action-btn delete-btn"
                              disabled={isAdmin}
                              title={isAdmin ? "Cannot remove admin users" : "Remove user"}
                              onClick={() => !isAdmin && deleteUser(u._id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {section === "addUser" && (
          <div className="admin-card">
            <h3 style={{ marginTop: 0 }}>Add User</h3>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser((s) => ({ ...s, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser((s) => ({ ...s, email: e.target.value }))}
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser((s) => ({ ...s, password: e.target.value }))}
              />
            </div>
            <div className="actions" style={{ marginTop: 12 }}>
              <button className="action-btn approve-btn" onClick={createUser}>Create User</button>
            </div>
          </div>
        )}

        {section === "verifyResources" && (
          <>
            <div className="admin-card">
              <p className="muted">All resources fetched from API (/api/resources)</p>
            </div>

            {resources.length === 0 ? (
              <div className="admin-card">
                <p>No resources found. Upload resources via the existing flow.</p>
                <p className="muted">This page moderates real project data.</p>
              </div>
            ) : (
              <div className="resource-grid">
                {resources.map((res) => {
                  const status = getModerationMap()[res?._id] || "pending";
                  return (
                    <div key={res?._id} className="resource-card admin-card">
                      <div className="resource-header">
                        <h3 className="resource-title">{res?.title || "Untitled"}</h3>
                        <span className={`status ${status}`}>{status}</span>
                      </div>
                      <a
                        href={res?.fileUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="resource-link"
                      >
                        {res?.fileUrl || "No file url provided"}
                      </a>

                      {status === "pending" && (
                        <div className="actions">
                          <button
                            className="action-btn approve-btn"
                            onClick={() => updateStatus(res?._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="action-btn reject-btn"
                            onClick={() => updateStatus(res?._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {section === "addResource" && (
          <div className="admin-card">
            <h3 style={{ marginTop: 0 }}>Add Resource</h3>
            <p className="muted">Use the existing upload flow to add resources.</p>
            <div className="actions" style={{ marginTop: 12 }}>
              <button
                className="action-btn approve-btn"
                onClick={() => navigate("/app/upload-resource")}
              >
                Go to Upload Resource
              </button>
            </div>
          </div>
        )}
      </main>

      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={closeUserModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>User Details</h3>
            <div style={{ marginTop: 8 }}>
              <p><strong>Name:</strong> {selectedUser.name || '-'}</p>
              <p><strong>Email:</strong> {selectedUser.email || '-'}</p>
              <p><strong>Role:</strong> {(selectedUser.role || 'user').toLowerCase()}</p>
              <p><strong>Status:</strong> {(selectedUser.status || 'active').toLowerCase()}</p>
              <p><strong>Created:</strong> {formatDate(selectedUser.createdAt)}</p>
              <p><strong>Job Role:</strong> {selectedUser.jobRole || '-'}</p>
              <p><strong>Higher Education:</strong> {selectedUser.higherEducation || '-'}</p>
              <p><strong>Skills:</strong> {Array.isArray(selectedUser.skills) && selectedUser.skills.length > 0 ? selectedUser.skills.join(', ') : '-'}</p>
            </div>
            <div className="modal-actions">
              <button className="action-btn secondary-btn" onClick={closeUserModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
