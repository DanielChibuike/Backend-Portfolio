

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setMessage("Logging in...");

    try {
      const response = await fetch(
        "https://backend-portfolio-i9c4.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed. Check your credentials.");
        return;
      }

      if (!data.token) {
        setMessage("Login failed. No authentication token was received.");
        return;
      }

      localStorage.setItem("token", data.token);

      navigate("/admin", { replace: true });
    } catch {
      setMessage("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login">
      <a href="/" className="login-logo">
        Daniel<span>O.</span>
      </a>

      <div className="login-card">
        <div className="login-icon">
          D<span>.</span>
        </div>

        <p className="login-label">PORTFOLIO ADMIN</p>

        <h1>Welcome back.</h1>

        <p className="login-description">
          Sign in to manage your portfolio and view messages.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label htmlFor="admin-email">Email address</label>

            <input
              id="admin-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="admin-password">Password</label>

            <input
              id="admin-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
            {!isSubmitting && <span aria-hidden="true">→</span>}
          </button>

          {message && (
            <p className="login-message" role="status" aria-live="polite">
              {message}
            </p>
          )}
        </form>

        <a href="/" className="login-back">
          <span aria-hidden="true">←</span> Back to portfolio
        </a>
      </div>

      <p className="login-note">Private workspace · Authorized access only</p>
    </section>
  );
}

export default Login;