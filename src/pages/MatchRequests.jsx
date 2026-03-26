import React, { useEffect, useState } from "react";
import { acceptMatch, getMatches } from "../services/matchService";

const MatchRequests = () => {
  const userId = Number(localStorage.getItem("skillswap_user_id"));
  const [matches, setMatches] = useState([]);

  const loadMatches = async () => {
    const data = await getMatches(userId);
    setMatches(data || []);
  };

  useEffect(() => {
    if (userId) loadMatches().catch(console.error);
  }, []);

  const onAccept = async (matchId) => {
    await acceptMatch(matchId);
    await loadMatches();
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Match Requests</h1>
        <p className="page-subtitle">Review pending requests and accept compatible exchanges.</p>
      </div>

      {matches.length === 0 && <div className="alert alert-secondary">No match records yet.</div>}
      {matches.map((m) => (
        <div key={m.id} className="ss-card mb-3">
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1 fw-bold">Match #{m.id}</h5>
              <p className="mb-1 text-secondary">{m.userA?.name} ↔ {m.userB?.name}</p>
              <small className="skill-chip">{m.status}</small>
            </div>
            {m.status === "PENDING" && (
              <button className="btn btn-success" onClick={() => onAccept(m.id)}>
                Accept
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchRequests;
