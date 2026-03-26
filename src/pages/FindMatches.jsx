import React, { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { findMatches, requestMatch } from "../services/matchService";

const FindMatches = () => {
  const userId = Number(localStorage.getItem("skillswap_user_id"));
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMatches = async () => {
    setLoading(true);
    try {
      const data = await findMatches(userId);
      setMatches(data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) loadMatches().catch(console.error);
  }, []);

  const handleRequest = async (recipientId) => {
    await requestMatch(userId, recipientId);
    alert("Match request sent");
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Find Matches</h1>
        <p className="page-subtitle">Discover peers with complementary skills and send match requests.</p>
      </div>

      {loading && <div className="ss-card"><div className="card-body text-secondary">Loading matches...</div></div>}
      {!loading && matches.length === 0 && <div className="alert alert-secondary">No matches found yet. Add more offered and needed skills from your profile.</div>}
      {matches.map((m, idx) => (
        <MatchCard key={m.id || idx} match={m} onRequest={handleRequest} />
      ))}
    </div>
  );
};

export default FindMatches;
