import React from "react";

function Footer() {
  return (
    <footer className="footer" id="about">

      <div className="footer-content">

        <div className="footer-section">

          <h3>
            StudentReg
          </h3>

          <p>
            A React-based student registration
            application demonstrating form elements,
            hooks, validation and event handling.
          </p>

        </div>

        <div className="footer-section">

          <h3>
            Quick Links
          </h3>

          <a href="#home">
            Home
          </a>

          <a href="#registration">
            Registration
          </a>

          <a href="#about">
            About
          </a>

        </div>

        <div className="footer-section">

          <h3>
            Technologies
          </h3>

          <p>React.js</p>
          <p>JavaScript</p>
          <p>CSS</p>
          <p>React Hot Toast</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 StudentReg. All Rights Reserved.
        </p>

        <p>
          Built with React ⚛️
        </p>

      </div>

    </footer>
  );
}

export default Footer;