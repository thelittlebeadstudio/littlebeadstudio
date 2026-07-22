import { useState } from "react";
import { useLocation } from "react-router-dom";
import { sendContactMessage } from "../api/client.js";
import BeadDivider from "../components/BeadDivider.jsx";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius)",
  color: "var(--color-ink)",
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
};

export default function Contact() {
  const location = useLocation();
  const prefillItem = location.state?.itemInterest || "";

  const [form, setForm] = useState({ name: "", email: "", message: "", itemInterest: prefillItem });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "", itemInterest: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: "560px" }}>
      <div className="eyebrow">Get in touch</div>
      <h1>Ask about a piece, or request something custom.</h1>
      <p>Fill this out and it'll come straight to my inbox, I usually reply within a couple of days.</p>

      <BeadDivider palette="cool" count={16} />

      {status === "sent" ? (
        <p style={{ color: "var(--color-amber)", marginTop: "24px" }}>
          Thanks — your message is on its way! I'll get back to you soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
          <div>
            <label htmlFor="name" className="eyebrow" style={{ display: "block", marginBottom: 6 }}>Name</label>
            <input id="name" name="name" required value={form.name} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="email" className="eyebrow" style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input id="email" type="email" name="email" required value={form.email} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="itemInterest" className="eyebrow" style={{ display: "block", marginBottom: 6 }}>
              Item you're asking about (optional)
            </label>
            <input id="itemInterest" name="itemInterest" value={form.itemInterest} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="message" className="eyebrow" style={{ display: "block", marginBottom: 6 }}>Message</label>
            <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} style={inputStyle} />
          </div>

          {status === "error" && (
            <p style={{ color: "var(--color-coral)" }}>Something went wrong sending that — please try again.</p>
          )}

          <button type="submit" className="btn btn-solid" disabled={status === "sending"} style={{ justifySelf: "start" }}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
