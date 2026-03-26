import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { sendChatMessage } from "../services/aiService";
import RecommendedSkills from "../components/RecommendedSkills";

const AIChatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I am your SkillSwap AI assistant. Ask me for learning paths, study plans, or skill suggestions.",
    },
  ]);
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setSending(true);

    try {
      const response = await sendChatMessage(text);
      const reply = response?.reply || "AI service is currently unavailable.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (_err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI service is currently unavailable." },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend().catch(console.error);
  };

  return (
    <div className="container page-shell">
      <div className="page-header">
        <h1 className="page-title">AI Assistant</h1>
        <p className="page-subtitle">
          Ask for personalized learning guidance and explore recommended skills.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <RecommendedSkills />
        </div>

        <div className="col-lg-8">
          <div className="ss-card mb-3">
            <div className="card-body chat-scroll" style={{ minHeight: 360 }}>
              <div className="chat-container">
                {messages.map((message, idx) => (
                  <div
                    key={`${message.role}-${idx}`}
                    className={`chat-message ${message.role === "user" ? "chat-user" : "chat-ai"}`}
                  >
                    {message.role === "ai" ? (
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => <p style={{ margin: 0 }} {...props} />,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    ) : (
                      message.text
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form className="ss-card" onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="input-group">
                <input
                  className="form-control"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the AI assistant..."
                  disabled={sending}
                />
                <button className="btn btn-primary" type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
