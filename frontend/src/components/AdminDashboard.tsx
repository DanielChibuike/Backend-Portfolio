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
        <h2>Admin</h2>

        <div>
          <button onClick={() => setPage("messages")}>Messages</button>
          <button onClick={() => setPage("projects")}>Create Project</button>
          <button onClick={() => setPage("manage-projects")}>Projects</button>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>

      {page === "messages" && <Messages />}
      {page === "projects" && <CreateProject />}
      {page=== "manage-projects"&& <ProjectManager/>}
    </section>
  );
}

export default AdminDashboard;