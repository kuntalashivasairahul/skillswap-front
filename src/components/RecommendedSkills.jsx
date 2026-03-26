import React, { useEffect, useState } from "react";
import { getRecommendedSkills } from "../services/aiService";

const RecommendedSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecommendations = async () => {
      const userId = localStorage.getItem("skillswap_user_id");
      if (!userId) {
        setSkills([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await getRecommendedSkills(userId);
        setSkills(response?.recommendedSkills || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Could not load recommendations.");
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations().catch(console.error);
  }, []);

  return (
    <div className="ss-card">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Recommended Skills</h5>

        {loading && <p className="text-secondary mb-0">Loading recommendations...</p>}

        {!loading && error && <div className="alert alert-danger mb-0">{error}</div>}

        {!loading && !error && skills.length === 0 && (
          <p className="text-secondary mb-0">No recommendations yet.</p>
        )}

        {!loading && !error && skills.length > 0 && (
          <div className="d-flex flex-wrap">
            {skills.map((skill) => (
              <span key={skill} className="skill-chip">
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedSkills;
