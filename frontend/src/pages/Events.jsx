import { useEffect, useState } from "react";
import { getEvents } from "../api/client.js";
import BeadDivider from "../components/BeadDivider.jsx";

function formatDateRange(dateStr, endDateStr) {
  const start = new Date(dateStr);
  const opts = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
  const startText = start.toLocaleDateString(undefined, opts);
  if (!endDateStr) return startText;
  const end = new Date(endDateStr);
  return `${startText} – ${end.toLocaleDateString(undefined, opts)}`;
}

function EventCard({ event, isPast }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        gap: "20px",
        padding: "18px",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
        opacity: isPast ? 0.7 : 1,
      }}
      className="event-card"
    >
      <div
        style={{
          aspectRatio: "1 / 1",
          borderRadius: "4px",
          background: event.image
            ? `url(${event.image}) center/cover`
            : "linear-gradient(135deg, #21463E, #142B26)",
        }}
      />
      <div>
        <div className="eyebrow">{formatDateRange(event.date, event.endDate)}</div>
        <h3 style={{ margin: "4px 0" }}>{event.name}</h3>
        {event.location && (
          <p style={{ margin: "0 0 8px", fontSize: "0.9rem" }}>{event.location}</p>
        )}
        {event.description && <p style={{ margin: 0 }}>{event.description}</p>}
        {event.link && !isPast && (
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-amber)", fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}
          >
            Event details →
          </a>
        )}
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.endDate || e.date) >= now);
  const past = events
    .filter((e) => new Date(e.endDate || e.date) < now)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // most recent past event first

  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <section style={{ maxWidth: "620px" }}>
        <div className="eyebrow">Find my art in person</div>
        <h1>Markets & events</h1>
        <p>
          I sell in person at a handful of markets and gallery's throughout
          the year. Come say hello!
        </p>
      </section>

      <div style={{ margin: "36px 0" }}>
        <BeadDivider />
      </div>

      {status === "loading" && <p>Loading events…</p>}
      {status === "error" && (
        <p style={{ color: "var(--color-coral)" }}>Couldn't load events right now.</p>
      )}

      {status === "ready" && (
        <>
          <h2 style={{ fontSize: "1.3rem" }}>Upcoming</h2>
          {upcoming.length === 0 ? (
            <p>No upcoming events booked right now — check back soon.</p>
          ) : (
            <div style={{ display: "grid", gap: "16px", marginBottom: "48px" }}>
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} isPast={false} />
              ))}
            </div>
          )}

          {past.length > 0 && (
            <>
              <h2 style={{ fontSize: "1.3rem" }}>Previous events</h2>
              <div style={{ display: "grid", gap: "16px" }}>
                {past.map((event) => (
                  <EventCard key={event._id} event={event} isPast={true} />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <style>{`
        @media (max-width: 560px) {
          .event-card { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
