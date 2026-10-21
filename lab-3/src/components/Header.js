import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h2>Shishir<span>.</span></h2>
      </div>

      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <button className="hire-btn">Hire Me</button>
    </header>
  );
}

export default Header;