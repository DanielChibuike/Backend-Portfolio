
import "./Hero.css";

function Hero() {
return ( <section className="hero"> <div className="hero-content"> <p className="hero-label">FULL STACK DEVELOPER</p>

    <h1>
      Building reliable
      <br />
      digital <span>experiences.</span>
    </h1>

    <p className="hero-description">
      I build reliable, scalable, and secure websites and applications
      that solve real-world problems.
    </p>

    <div className="hero-actions">
      <a href="#work" className="hero-primary-btn">
        View my work <span>↗</span>
      </a>

      <a href="#contact" className="hero-secondary-btn">
        Get in touch
      </a>
    </div>

    <div className="hero-note">
      <span className="hero-status-dot"></span>
      Available for opportunities
    </div>
  </div>

  <div className="hero-visual" aria-hidden="true">
    <div className="hero-orbit hero-orbit-one"></div>
    <div className="hero-orbit hero-orbit-two"></div>

    <div className="hero-gradient-shape"></div>

    <div className="hero-floating-card hero-card-top">
      <span className="hero-card-icon">{"</>"}</span>
      <div>
        <strong>Clean code</strong>
        <p>Built with purpose</p>
      </div>
    </div>

    <div className="hero-floating-card hero-card-bottom">
      <span className="hero-card-icon hero-card-icon-purple">✳</span>
      <div>
        <strong>Backend focused</strong>
        <p>Reliable by design</p>
      </div>
    </div>

    <div className="hero-center-badge">
      <span>DEV</span>
      <div className="hero-badge-line"></div>
      <strong>Building<br />what matters.</strong>
    </div>
  </div>
</section>


);
}

export default Hero;
