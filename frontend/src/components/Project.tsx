import { useEffect, useState } from "react";
import type { Project } from "../types/project";
import "./Project.css";
import ProjectCaseStudy from "./ProjectCaseStudy";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("http://localhost:3700/api/projects/getall")
      .then((res) => res.json())
      .then((data) => setProjects(data.projects));
  }, []);

  return (
    <section id="work">
      <h2>Recent Projects</h2>

      {projects.map((project) => (
        <article key={project._id}>
  <img src={project.image} alt={project.title} />

  <h3>{project.title}</h3>
  <p>{project.description}</p>
  <p>{project.technologies.join(" · ")}</p>
  <button onClick={()=> setSelectedProject(project)}>View Case study</button>
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