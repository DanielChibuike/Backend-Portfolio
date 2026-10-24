import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Messages from "./Messages";
import CreateProject from "./CreateProject";
import ProjectManager from "./ProjectManager";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [page, setPage] = useState("messages");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="admin">
      <nav className="admin-nav">
        <a href="/admin" className="admin-brand">
          Daniel<span>O.</span>
          <small>Admin</small>
        </a>

        <div className="admin-nav-links">
          <button
            className={page === "messages" ? "active" : ""}
            onClick={() => setPage("messages")}
          >
            Messages
          </button>

          <button
            className={page === "projects" ? "active" : ""}
            onClick={() => setPage("projects")}
          >
            Create Project
          </button>

          <button
            className={page === "manage-projects" ? "active" : ""}
            onClick={() => setPage("manage-projects")}
          >
            Projects
          </button>
        </div>

        <div className="admin-nav-actions">
          <button className="view-portfolio" onClick={() => navigate("/")}>
            View Portfolio ↗
          </button>

          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="admin-content">
        {page === "messages" && <Messages />}
        {page === "projects" && <CreateProject />}
        {page === "manage-projects" && <ProjectManager />}
      </main>
    </section>
  );
}

export default AdminDashboard;