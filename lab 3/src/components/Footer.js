import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <h2>Shishir</h2>

        <p>
          Full Stack Developer | React Developer | JavaScript Enthusiast
        </p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="socials">
          <a href="https://github.com">GitHub</a>
          <a href="https://linkedin.com">LinkedIn</a>
          <a href="mailto:yourmail@gmail.com">Email</a>
        </div>

        <hr />

        <p className="copy">
          © 2026 Shishir | Designed & Developed with ❤️ using React.js
        </p>

      </div>

    </footer>
  );
}

export default Footer;