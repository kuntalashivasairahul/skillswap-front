import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("skillswap_token");

  const logout = () => {
    localStorage.removeItem("skillswap_token");
    localStorage.removeItem("skillswap_user_id");
    navigate("/login");
  };

  return (
    <nav className="nav-shell navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          SkillSwap
        </Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto gap-1">
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/matches/find">Find Matches</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/matches/requests">Match Requests</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/chat">Chat</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ai-chat">AI Assistant</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sessions">Sessions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ratings">Ratings</Link></li>
          </ul>
          {token && (
            <button className="btn btn-outline-light btn-sm" onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
