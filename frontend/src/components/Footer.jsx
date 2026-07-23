import BeadDivider from "./BeadDivider.jsx";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{ marginTop: "80px", paddingBottom: "40px" }}>
      <div className="container">
        <BeadDivider palette="cool" count={40} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "16px",
            color: "var(--color-ink-muted)",
            fontSize: "0.85rem",
          }}
        >
          <span>Little Bead Studio</span>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a
              href="https://www.instagram.com/little.bead.studio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Little Bead Studio on Instagram"
              style={{
                color: "var(--color-ink-muted)",
                display: "inline-flex",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-amber)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-muted)")}
            >
              <InstagramIcon />
            </a>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}