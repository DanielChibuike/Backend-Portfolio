
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:3700/api/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to fetch messages.");
          return;
        }

        setMessages(data.messages);
      } catch {
        setError("Unable to connect to the server.");
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3700/api/messages/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setMessages((current) =>
        current.map((item) =>
          item._id === id ? { ...item, read: true } : item
        )
      );
    }
  };

  const deleteMessage = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3700/api/messages/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setMessages((current) =>
        current.filter((item) => item._id !== id)
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="messages">
      <div className="messages-header">
        <div>
          <p>MESSAGES</p>
          <h2>Recruiter & Client Messages</h2>
        </div>

        <button onClick={logout}>Logout</button>
      </div>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((item) => (
          <article key={item._id}>
            <p>{item.read ? "Read" : "Unread"}</p>

            <h3>{item.subject}</h3>

            <p>
              From: {item.name} — {item.email}
            </p>

            <p>{item.message}</p>

            <small>
              {new Date(item.createdAt).toLocaleString()}
            </small>

            <div>
              {!item.read && (
                <button onClick={() => markAsRead(item._id)}>
                  Mark as Read
                </button>
              )}

              <button onClick={() => deleteMessage(item._id)}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

export default Messages;
