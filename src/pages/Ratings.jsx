import React, { useEffect, useState } from "react";
import { getMatches } from "../services/matchService";
import { getRatings, submitRating } from "../services/ratingService";

const Ratings = () => {
  const userId = Number(localStorage.getItem("skillswap_user_id"));
  const [matches, setMatches] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [ratedUserId, setRatedUserId] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  const loadData = async () => {
    const [m, r] = await Promise.all([getMatches(userId), getRatings(userId)]);
    setMatches((m || []).filter((x) => x.status === "ACCEPTED"));
    setRatings(r || []);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const candidates = matches.map((m) =>
    m.userA?.id === userId ? m.userB : m.userA
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    await submitRating({
      userId,
      ratedUserId: Number(ratedUserId),
      rating: Number(rating),
      feedback,
    });
    setFeedback("");
    await loadData();
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Ratings</h1>
        <p className="page-subtitle">Rate completed exchanges and review feedback you have received.</p>
      </div>

      <form className="ss-card mb-4" onSubmit={onSubmit}>
        <div className="card-body row g-3">
          <h5 className="fw-bold mb-1">Submit a Rating</h5>
          <div className="col-md-4">
            <label className="form-label">Rate User</label>
            <select className="form-select" value={ratedUserId} onChange={(e) => setRatedUserId(e.target.value)} required>
              <option value="">Select user</option>
              {candidates.map((u) => (
                <option key={u?.id} value={u?.id}>{u?.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Score</label>
            <input type="number" min="1" max="5" className="form-control" value={rating} onChange={(e) => setRating(e.target.value)} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Feedback</label>
            <input className="form-control" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </div>
          <div className="col-md-2 d-grid align-items-end">
            <button className="btn btn-primary mt-4" type="submit">Submit</button>
          </div>
        </div>
      </form>

      <h5 className="mb-3">Ratings Received</h5>
      {ratings.length === 0 && <p className="text-muted">No ratings yet.</p>}
      {ratings.map((r) => (
        <div key={r.id} className="ss-card mb-2">
          <div className="card-body">
            <strong>{r.user?.name}</strong> rated <strong>{r.ratedUser?.name}</strong>: {r.rating}/5
            {r.feedback && <div className="text-muted">"{r.feedback}"</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ratings;
