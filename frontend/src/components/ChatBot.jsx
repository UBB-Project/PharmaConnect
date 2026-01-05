import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "primeicons/primeicons.css";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/chat",
        { prompt: input },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = { text: res.data, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error while fetching response", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ Unable to retrieve a response at the moment.",
          sender: "bot",
        },
      ]);
    }
  };

  const closeDisclaimer = () => {
    setShowDisclaimer(false);
    setMessages([
      {
        text:
          "⚠️ Medical Disclaimer: This chatbot provides general medical information and recommendations only. It does not provide diagnoses or replace professional medical advice. Always consult a qualified healthcare provider.",
        sender: "bot",
      },
    ]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container mt-5">
      {showDisclaimer && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title d-flex align-items-center gap-2">
                  <i className="bi bi-heart-pulse-fill text-danger fs-4"></i>
                  Medical Disclaimer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeDisclaimer}
                />
              </div>

              <div className="modal-body pt-2">
                <p className="text-muted">
                  This chatbot is intended to provide
                  <strong> general medical information </strong>
                  and health-related recommendations only.
                </p>

                <ul className="list-unstyled">
                  <li className="d-flex mb-3">
                    <i className="bi bi-x-circle-fill text-danger me-3 fs-5"></i>
                    <span>
                      The information provided is <strong>not a medical diagnosis</strong> and should not be treated as professional medical advice.
                    </span>
                  </li>

                  <li className="d-flex mb-3">
                    <i className="bi bi-exclamation-triangle-fill text-warning me-3 fs-5"></i>
                    <span>
                      This chatbot <strong>cannot replace a licensed healthcare professional</strong>,
                      physical examination, or diagnostic testing.
                    </span>
                  </li>

                  <li className="d-flex mb-3">
                    <i className="bi bi-shield-check text-primary me-3 fs-5"></i>
                    <span>
                      Always consult a <strong>qualified physician or healthcare provider</strong> before making medical decisions.
                    </span>
                  </li>

                  <li className="d-flex">
                    <i className="bi bi-info-circle-fill text-secondary me-3 fs-5"></i>
                    <span>
                      Use this chatbot as a <strong>supportive informational tool only</strong>,
                      not as a source of definitive medical guidance.
                    </span>
                  </li>
                </ul>

                <div className="alert alert-danger small mt-4 mb-0 rounded-3">
                  <i className="bi bi-exclamation-octagon-fill me-2"></i>
                  If you are experiencing a medical emergency, seek immediate medical attention.
                </div>
              </div>

              <div className="modal-footer border-0 pt-0">
                <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={closeDisclaimer}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={closeDisclaimer}
                >
                  <i className="bi bi-check-circle-fill me-2"></i>
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h4>Medical Recommendation Chatbot</h4>
        </div>

        {!showDisclaimer && (
          <div className="alert alert-danger d-flex align-items-center gap-2 m-2 py-2 small rounded-3">
            <i className="bi bi-heart-pulse-fill fs-5"></i>
            <span>
              Medical information only. Not a diagnosis or professional medical advice.
            </span>
          </div>
        )}

        <div
          className="card-body"
          style={{ height: "400px", overflowY: "auto", background: "#f8f9fa" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex align-items-end mb-3 ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              {msg.sender === "bot" && (
                <i
                  className="bi bi-robot fs-3 me-2 text-teal animate-bounce"
                  title="Bot"
                ></i>
              )}

              <div
                className={`p-2 rounded-3 ${
                  msg.sender === "user"
                    ? "bg-gradient-user text-gradient-user"
                    : "bg-gradient-bot text-white"
                }`}
                style={{ maxWidth: "70%" }}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <i
                  className="pi pi-user fs-3 ms-2 text-teal animate-bounce"
                  title="You"
                ></i>
              )}
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>

        <div className="card-footer">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Describe your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="btn btn-gradient-send" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          .animate-bounce {
            animation: bounce 1s infinite;
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          .bg-gradient-user {
            background: linear-gradient(135deg, #00c6a7 0%, #2575fc 100%);
          }
          .text-gradient-user {
            background: linear-gradient(135deg, #00c6a7 0%, #2575fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .bg-gradient-bot {
            background: linear-gradient(135deg, #00c6a7 0%, #007b8a 100%);
          }
          .text-teal {
            color: #00c6a7 !important;
          }
          .text-yellow {
            color: #ffd166 !important;
          }
          .btn-gradient-send {
            background: linear-gradient(135deg, #00c6a7 0%, #2575fc 100%);
            color: white;
            border: none;
          }
          .btn-gradient-send:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </div>
  );
};

export default ChatBot;
