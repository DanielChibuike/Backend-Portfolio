import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import EditProject from "./EditProject";
import "./ProjectManager.css";

function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://backend-portfolio-i9c4.onrender.com/api/projects/getall",
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Unable to fetch projects.");
          return;
        }

        setProjects(data.projects);
      } catch {
        setMessage("Unable to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const deleteProject = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project? This action cannot be undone.",
    );

    if (!confirmed) return;

    setDeletingId(id);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://backend-portfolio-i9c4.onrender.com/api/projects/deleteproject/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "Failed to delete project.");
        return;
      }

      setProjects((current) =>
        current.filter((project) => project._id !== id),
      );

      setMessage("Project deleted successfully.");
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="project-manager">
      <div className="project-manager-header">
        <p className="project-manager-label">PORTFOLIO ADMIN</p>
        <h2>Manage projects</h2>
        <p className="project-manager-description">
          Review, update, and remove projects displayed on your portfolio.
        </p>
      </div>

      {message && (
        <p className="project-manager-message" role="status" aria-live="polite">
          {message}
        </p>
      )}

      {isLoading ? (
        <div className="project-manager-empty">
          <p>Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="project-manager-empty">
          <h3>No projects yet</h3>
          <p>Projects you create will appear here.</p>
        </div>
      ) : (
        <div className="project-manager-grid">
          {projects.map((project) => (
            <article className="managed-project-card" key={project._id}>
              <div className="managed-project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>

              <div className="managed-project-content">
                <h3>{project.title}</h3>

                <p className="managed-project-description">
                  {project.description}
                </p>

                <div className="managed-project-actions">
                  <button
                    className="edit-project-button"
                    onClick={() => setEditingProject(project)}
                    disabled={deletingId === project._id}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-project-button"
                    onClick={() => deleteProject(project._id)}
                    disabled={deletingId === project._id}
                  >
                    {deletingId === project._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editingProject && (
        <EditProject
          project={editingProject}
          onUpdated={(updatedProject) => {
            setProjects((current) =>
              current.map((project) =>
                project._id === updatedProject._id
                  ? updatedProject
                  : project,
              ),
            );

            setEditingProject(null);
            setMessage("Project updated successfully.");
          }}
          onCancel={() => setEditingProject(null)}
        />
      )}
    </section>
  );
}

export default ProjectManager;