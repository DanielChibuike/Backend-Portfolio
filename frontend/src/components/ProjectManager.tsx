import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import EditProject from "./EditProject";
import "./ProjectManager.css";

function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://backend-portfolio-i9c4.onrender.com/api/projects/getall"
        );

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Unable to fetch projects.");
          return;
        }

        setProjects(data.projects);
      } catch {
        setMessage("Unable to connect to the server.");
      }
    };

    fetchProjects();
  }, []);

  const deleteProject = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://backend-portfolio-i9c4.onrender.com/api/projects/deleteproject/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setProjects((current) =>
        current.filter((project) => project._id !== id)
      );
      setMessage("Project deleted successfully.");
    } else {
      const data = await response.json();
      setMessage(data.message || "Failed to delete project.");
    }
  };

  return (
    <section className="project-manager">
      <p>PROJECTS</p>
      <h2>Manage Projects</h2>

      {message && <p>{message}</p>}

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <article key={project._id}>
            <img src={project.image} alt={project.title} />

            <div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button onClick={() => setEditingProject(project)}>
          Edit
        </button>

              <button onClick={() => deleteProject(project._id)}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
       {editingProject && (
    <EditProject
      project={editingProject}
      onUpdated={(updatedProject) => {
        setProjects((current) =>
          current.map((project) =>
            project._id === updatedProject._id
              ? updatedProject
              : project
          )
        );

        setEditingProject(null);
      }}
      onCancel={() => setEditingProject(null)}
    />
  )}
    </section>
  );
}

export default ProjectManager;