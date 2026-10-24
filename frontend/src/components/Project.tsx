
import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import "./Project.css";
import ProjectCaseStudy from "./ProjectCaseStudy";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("https://backend-portfolio-i9c4.onrender.com/api/projects/getall")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects))
      .catch((error) => console.error("Unable to fetch projects:", error));
  }, []);

  return (
    <section id="work">
      <h2>Recent Projects</h2>

      {projects.map((project) => (
        <article key={project._id}>
          <img src={project.image} alt={project.title} loading="lazy" />

          <h3>{project.title}</h3>

          <p>{project.description}</p>

          <p>{project.technologies.join(" · ")}</p>

          <div className="project-actions">
            <button onClick={() => setSelectedProject(project)}>
              View Case Study
            </button>

            {project.liveDemoUrl && (
              <a
                className="project-live-link"
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </article>
      ))}

      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

export default Projects;