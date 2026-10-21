import React from "react";

function Header() {
  return (
    <header className="header" id="home">
      <div className="header-content">

        <div className="logo">
          <div className="logo-icon">
            SR
          </div>

          <div>
            <h2>StudentReg</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#registration">Registration</a>
          <a href="#about">About</a>
        </nav>

      </div>
    </header>
  );
}

export default Header;