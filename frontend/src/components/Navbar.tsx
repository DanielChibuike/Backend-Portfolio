
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        Daniel<span>O.</span>
      </a>

      <div className="navbar-links">
        <a href="#work">
          Work
        </a>

        <a href="#about">
          About
        </a>

        <a href="#skills">
          Skills
        </a>

        <a href="#contact">
          Contact
        </a>
      </div>

      <div className="navbar-status">
        <span></span>
        Available
      </div>
    </nav>
  );
}

export default Navbar;
