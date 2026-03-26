import React, { useEffect, useState } from "react";
import { getMatches } from "../services/matchService";
import { getMessages, sendMessage } from "../services/messageService";

const Chat = () => {
  const userId = Number(localStorage.getItem("skillswap_user_id"));
  const [matches, setMatches] = useState([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getMatches(userId).then(setMatches).catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectedMatchId) return;
    getMessages(Number(selectedMatchId)).then(setMessages).catch(console.error);
  }, [selectedMatchId]);

  const currentMatch = matches.find((m) => String(m.id) === String(selectedMatchId));

  const otherUserId = currentMatch
    ? currentMatch.userA?.id === userId
      ? currentMatch.userB?.id
      : currentMatch.userA?.id
    : null;

  const onSend = async () => {
    if (!text.trim() || !otherUserId) return;
    await sendMessage(userId, otherUserId, text.trim());
    setText("");
    const refreshed = await getMessages(Number(selectedMatchId));
    setMessages(refreshed);
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">Chat</h1>
        <p className="page-subtitle">Message your matched peers and coordinate learning sessions.</p>
      </div>

      <div className="ss-card mb-3">
        <div className="card-body">
          <label className="form-label">Select Match</label>
          <select className="form-select" value={selectedMatchId} onChange={(e) => setSelectedMatchId(e.target.value)}>
            <option value="">Choose a match</option>
            {matches.map((m) => (
              <option key={m.id} value={m.id}>#{m.id} - {m.userA?.name} ↔ {m.userB?.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ss-card mb-3" style={{ minHeight: 280 }}>
        <div className="card-body chat-scroll">
          {messages.length === 0 && <p className="text-muted">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m.id} className={`mb-2 ${m.sender?.id === userId ? "text-end" : "text-start"}`}>
              <span className={`chat-bubble ${m.sender?.id === userId ? "chat-bubble-self" : "chat-bubble-other"}`}>
                {m.sender?.name}: {m.message}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="input-group">
        <input className="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message" />
        <button className="btn btn-primary" onClick={onSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
