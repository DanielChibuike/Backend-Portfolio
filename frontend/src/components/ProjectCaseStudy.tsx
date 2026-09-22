import type { Project } from "../types/project";
import "./ProjectCaseStudy.css";

type Props = {
  project: Project;
  onClose:() =>void;
};

function ProjectCaseStudy({ project ,onClose}: Props) {
  return (
    <section className="case-study">
      <p>CASE STUDY</p>

      <h2>{project.title}</h2>

      <h3>The Problem</h3>
      <p>{project.problemSolved}</p>

      <h3>Features</h3>
      <ul>
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <h3>Challenges</h3>
      <ul>
        {project.challenges.map((challenge) => (
          <li key={challenge}>{challenge}</li>
        ))}
      </ul>

      <h3>What I Learned</h3>
      <ul>
        {project.whatILearned.map((lesson) => (
          <li key={lesson}>{lesson}</li>
        ))}
      </ul>
      <button onClick={onClose}>Back to Projects</button>
    </section>
  );
}

export default ProjectCaseStudy;