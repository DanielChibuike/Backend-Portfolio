import "./Navbar.css";
function Navbar() {
  return (
    <nav className="navbar"> 
    <div className="navbar-logo">
        Daniel.C
      </div>

      <div className="navbar-links">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;