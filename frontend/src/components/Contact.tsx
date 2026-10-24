

import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setFeedback("");

    try {
      const response = await fetch(
        "https://backend-portfolio-i9c4.onrender.com/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("Unable to send your message. Please try again.");
      }

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setFeedback("Message sent successfully. Thank you for reaching out!");
    } catch {
      setFeedback(
        "Your message could not be sent. Please try again or email me directly.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="contact-intro">
        <p className="contact-label">CONTACT</p>

        <h2>Let's work together.</h2>

        <p className="contact-description">
          Have a project in mind or an opportunity to discuss? I'd love to hear
          from you.
        </p>

        <div className="contact-email">
          <p>EMAIL</p>
          <a href="mailto:danielogbushike@gmail.com">
            danielogbushike@gmail.com
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          aria-label="Your name"
          autoComplete="name"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          aria-label="Your email"
          autoComplete="email"
          required
        />

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          aria-label="Subject"
          required
        />

        <textarea
          name="message"
          placeholder="Tell me about your project or opportunity..."
          value={form.message}
          onChange={handleChange}
          aria-label="Your message"
          required
        />

        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Message"}
        </button>

        {feedback && (
          <p className="contact-feedback" role="status" aria-live="polite">
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}

export default Contact;