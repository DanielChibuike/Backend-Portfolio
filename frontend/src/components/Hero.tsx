import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-label">FULLSTACK DEVELOPER</p>

        <h1>
          Building reliable
          <br />
          digital experiences.
        </h1>

        <p className="hero-description">
         I build reliable,scalable,secured websites and applications
        </p>

        <div className="hero-actions">
          <a href="#work">View my work</a>
          <a href="#contact">Get in touch</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;