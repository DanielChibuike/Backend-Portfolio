
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css";

type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "https://backend-portfolio-i9c4.onrender.com/api/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to fetch messages.");
          return;
        }

        setMessages(data.messages);
      } catch {
        setError("Unable to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");
    setActionError("");

    try {
      const response = await fetch(
        `https://backend-portfolio-i9c4.onrender.com/api/messages/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        setActionError("Unable to mark this message as read.");
        return;
      }

      setMessages((current) =>
        current.map((item) =>
          item._id === id ? { ...item, read: true } : item,
        ),
      );
    } catch {
      setActionError("Unable to connect to the server. Please try again.");
    }
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");
    setActionError("");

    try {
      const response = await fetch(
        `https://backend-portfolio-i9c4.onrender.com/api/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        setActionError("Unable to delete this message.");
        return;
      }

      setMessages((current) =>
        current.filter((item) => item._id !== id),
      );
    } catch {
      setActionError("Unable to connect to the server. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="messages">
      <div className="messages-header">
        <div>
          <p className="messages-label">YOUR INBOX</p>
          <h2>Messages</h2>
          <p className="messages-description">
            Messages from recruiters, clients, and visitors to your portfolio.
          </p>
        </div>

        <button className="messages-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {!isLoading && !error && (
        <div className="messages-summary">
          <span>{messages.length} total</span>
          <span>
            {messages.filter((item) => !item.read).length} unread
          </span>
        </div>
      )}

      {actionError && (
        <p className="messages-error" role="alert">
          {actionError}
        </p>
      )}

      {isLoading ? (
        <div className="messages-empty">
          <p>Loading messages...</p>
        </div>
      ) : error ? (
        <div className="messages-empty messages-error">
          <p>{error}</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="messages-empty">
          <h3>Your inbox is empty</h3>
          <p>Messages submitted through your contact form will appear here.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((item) => (
            <article
              key={item._id}
              className={`message-card ${item.read ? "read" : "unread"}`}
            >
              <div className="message-top">
                <span
                  className={`message-status ${
                    item.read ? "status-read" : "status-unread"
                  }`}
                >
                  <span></span>
                  {item.read ? "Read" : "Unread"}
                </span>

                <small className="message-date">
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>

              <h3>{item.subject}</h3>

              <div className="message-sender">
                <span className="sender-avatar">
                  {item.name.trim().charAt(0).toUpperCase() || "?"}
                </span>

                <div>
                  <p className="sender-name">{item.name}</p>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </div>
              </div>

              <p className="message-body">{item.message}</p>

              <div className="message-actions">
                {!item.read && (
                  <button
                    className="mark-read"
                    onClick={() => markAsRead(item._id)}
                  >
                    Mark as read
                  </button>
                )}

                <button
                  className="delete-message"
                  onClick={() => deleteMessage(item._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Messages;