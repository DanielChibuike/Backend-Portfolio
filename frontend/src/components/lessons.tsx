import "./Lesson.css";

function Lessons() {
  return (
    <section id="learning">
      <p>WHAT I'VE LEARNED</p>

      <h2>Building has taught me more than just writing code.</h2>

      <div className="learning-list">
        <p>Designing and building REST APIs</p>
        <p>Working with MongoDB and Mongoose</p>
        <p>Authentication and authorization with JWT</p>
        <p>Debugging and solving real application problems</p>
        <p>Connecting frontend applications to backend services</p>
      </div>
    </section>
  );
}

export default Lessons;