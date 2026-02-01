import { useState } from "react";
import "./Admin.css";

const AdminPage = () => {
  const [students, setStudents] = useState([
    { name: "Rahul", grade: "Science" },
    { name: "Anjali", grade: "Commerce" },
  ]);

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const addStudent = () => {
    if (!name || !grade) return;
    setStudents([...students, { name, grade }]);
    setName("");
    setGrade("");
  };

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin</h2>
        <p>Dashboard</p>
        <p>Students</p>
      </aside>

      <main className="content">
        <h1>Admin Dashboard</h1>

        <section className="card">
          <h3>Add Student</h3>
          <input
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Suggested Stream"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <button onClick={addStudent}>Add</button>
        </section>

        <section className="card">
          <h3>Students List</h3>
          <ul>
            {students.map((s, i) => (
              <li key={i}>
                {s.name} – {s.grade}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
