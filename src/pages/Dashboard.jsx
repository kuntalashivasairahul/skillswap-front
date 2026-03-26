import React from "react";

const Dashboard = () => {
  const userId = localStorage.getItem("skillswap_user_id");

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Manage your profile, matches, sessions, chats, and ratings in one place.</p>
      </div>

      <div className="card ss-banner mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-2">Welcome to SkillSwap</h4>
          <p className="mb-0">
            Your user ID is <strong>{userId || "(not logged in)"}</strong>. Start by adding skills in your profile,
            then discover compatible learning partners.
          </p>
        </div>
      </div>
    <div className="card mt-4">

    <div className="card-body">
      <h5 className="card-title">Recent Activity</h5>
      <ul className="list-unstyled mb-0">
        <li className="mb-2">✔ You matched with Emma Patel</li>
        <li className="mb-2">✔ Brian Lee accepted your request</li>
        <li className="mb-2">✔ Session booked with Carla Mendes</li>
        <li className="mb-2">✔ You rated Frank Moore</li>
      </ul>
      </div>
    </div>
    
      <div className="row g-3">
        <div className="col-md-4">
          <div className="ss-stat">
            <p className="ss-stat-label">Step 1</p>
            <p className="ss-stat-value">Complete Profile</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ss-stat">
            <p className="ss-stat-label">Step 2</p>
            <p className="ss-stat-value">Find Matches</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="ss-stat">
            <p className="ss-stat-label">Step 3</p>
            <p className="ss-stat-value">Book and Learn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
