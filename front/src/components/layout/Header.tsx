import React from "react";
const Header = () => {
    return (
    <div>

    <header>
        <div className="header">
          <button className="menu-btn" aria-label="Open Menu">
            <svg
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Open Menu"
              role="img"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </button>
          <div className="logo">Logo</div>
          <nav className="menu">
            <div className="drawer">
              <button className="close-btn" aria-label="Close Menu">
                <svg
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Close Menu"
                  role="img"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  ></path>
                </svg>
              </button>
              <a href="#">Home</a>
              <a href="#services">Services</a>
              <a href="#gallery">Gallery</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="blank"></div>
          </nav>
        </div>
      </header>
  <img className="img" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="Image"/>)
  </div>
    )
}

export default Header;