import "./Skills.css";

function Skills() {
  return (
    <section id="skills">
      <p>SKILLS & TOOLS</p>

      <h2>Technologies I work with.</h2>

      <div className="skills-group">
        <h3>Frontend</h3>
        <p>HTML · CSS · JavaScript · React · TypeScript</p>
      </div>

      <div className="skills-group">
        <h3>Backend</h3>
        <p>Node.js · Express · REST APIs · JWT · Authentication</p>
      </div>

      <div className="skills-group">
        <h3>Database & Tools</h3>
        <p>MongoDB · Mongoose · Git · GitHub · Postman</p>
      </div>
    </section>
  );
}

export default Skills;