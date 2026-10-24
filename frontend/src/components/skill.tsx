

import { useEffect, useState } from "react";
import "./Skills.css";

const skillGroups = [
  {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    color: "frontend",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "JWT", "Authentication"],
    color: "backend",
  },
  {
    title: "Database & Tools",
    skills: ["MongoDB", "Mongoose", "Git", "GitHub", "Postman"],
    color: "tools",
  },
];

function Skills() {
  const [activeSkills, setActiveSkills] = useState([0, 0, 0]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSkills((current) =>
        current.map(
          (index, groupIndex) =>
            (index + 1) % skillGroups[groupIndex].skills.length,
        ),
      );
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="skills">
      <p className="skills-label">SKILLS & TOOLS</p>

      <h2>Technologies I work with.</h2>

      <div className="skills-container">
        {skillGroups.map((group, index) => (
          <article className={`skills-card ${group.color}`} key={group.title}>
            <span className="skills-number">0{index + 1}</span>

            <h3>{group.title}</h3>

            <div className="skill-rotator" aria-live="off">
              {group.skills.map((skill, skillIndex) => (
                <span
                  className={`rotating-skill ${
                    activeSkills[index] === skillIndex ? "active" : ""
                  }`}
                  key={skill}
                  aria-hidden={activeSkills[index] !== skillIndex}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="skill-indicators" aria-hidden="true">
              {group.skills.map((skill, skillIndex) => (
                <span
                  key={skill}
                  className={
                    activeSkills[index] === skillIndex ? "active" : ""
                  }
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Skills;