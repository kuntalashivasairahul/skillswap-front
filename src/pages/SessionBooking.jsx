import React, { useEffect, useState } from "react";
import { getMatches } from "../services/matchService";
import { bookSession, getSessions } from "../services/sessionService";
import SessionCard from "../components/SessionCard";

const SessionBooking = () => {
  const userId = Number(localStorage.getItem("skillswap_user_id"));
  const [matches, setMatches] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [matchId, setMatchId] = useState("");
  const [sessionDate, setSessionDate] = useState("");

  const loadData = async () => {
    const [m, s] = await Promise.all([getMatches(userId), getSessions(userId)]);
    setMatches((m || []).filter((x) => x.status === "ACCEPTED"));
    setSessions(s || []);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const handleBook = async () => {
    if (!matchId || !sessionDate) return;
    await bookSession(Number(matchId), sessionDate);
    setSessionDate("");
    await loadData();
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Session Booking</h1>
        <p className="page-subtitle">Book sessions with accepted matches and track upcoming exchanges.</p>
      </div>

      <div className="ss-card mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Book New Session</h5>
          <div className="row g-3">
            <div className="col-md-5">
              <select className="form-select" value={matchId} onChange={(e) => setMatchId(e.target.value)}>
                <option value="">Select accepted match</option>
                {matches.map((m) => (
                  <option key={m.id} value={m.id}>Match #{m.id}</option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <input type="datetime-local" className="form-control" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-primary" onClick={handleBook}>Book</button>
            </div>
          </div>
        </div>
      </div>

      {sessions.map((s) => <SessionCard key={s.id} session={s} />)}
    </div>
  );
};

export default SessionBooking;
