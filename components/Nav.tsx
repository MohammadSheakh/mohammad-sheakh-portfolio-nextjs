import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav>
      <div className="logo">MS</div>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
        <ThemeToggle />
        <a href="#" className="btn btn-sm" style={{ marginLeft: "0.5rem" }}>
          <span>
            <span className="nav-dot"></span>Open to work
          </span>
        </a>
      </div>
    </nav>
  );
}
