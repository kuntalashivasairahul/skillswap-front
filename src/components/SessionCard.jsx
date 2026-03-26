import React from "react";

const SessionCard = ({ session }) => {
  return (
    <div className="ss-card mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-2 fw-bold">Session #{session.id}</h6>
          <p className="mb-1 text-secondary">Date: {session.sessionDate}</p>
          <small className="skill-chip mb-0">{session.status}</small>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
