import React from "react";

const MatchCard = ({ match, onRequest, showActions = true }) => {
  const candidate = match.userB || {};

  return (
    <div className="match-card mb-3">
      <div className="card-body d-flex flex-column flex-md-row justify-content-between gap-3 align-items-start align-items-md-center">
        <div>
          <div className="d-flex align-items-center gap-2 mb-2">
            <h5 className="mb-0 fw-bold">{candidate.name || "Potential Match"}</h5>
            <span className="skill-chip">Rating {candidate.rating ?? 0}</span>
          </div>
          <p className="mb-0 text-secondary">{candidate.bio || "No bio available"}</p>
        </div>
        <div className="text-md-end">
          <span className="score-chip mb-2">
            Score: {match.matchScore?.toFixed ? match.matchScore.toFixed(2) : match.matchScore}
          </span>
          {showActions && onRequest && (
            <div>
              <button className="btn btn-success" onClick={() => onRequest(candidate.id)}>
                Request Match
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
