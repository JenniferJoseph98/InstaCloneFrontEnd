import React from "react";
import { useNavigate } from "react-router-dom";
import "./post.css";
function Header() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/post">
        <img
          className="logo"
          alt="logo"
          style={{ maxHeight: "45px", maxWidth: "45px", marginTop: "10px" }}
          src="https://images.squarespace-cdn.com/content/v1/5494e83ae4b08be712d1dc65/1631037922788-VJVQJ189Z5VRI9Q8YUJG/instagram+icon.png"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/post">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add">
              Add Post
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/mypost">
              My Post <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
        <span
          onClick={() => {
            localStorage.clear();
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            navigate("/");
          }}
          class="navbar-text"
        >
          Logout
        </span>
      </div>
    </nav>
  );
}

export default Header;
