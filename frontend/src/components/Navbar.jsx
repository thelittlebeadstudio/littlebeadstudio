import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  fontFamily: "var(--font-mono)",
  fontSize: "0.8rem",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: isActive ? "var(--color-amber)" : "var(--color-ink)",
  paddingBottom: "4px",
  borderBottom: isActive ? "1px solid var(--color-amber)" : "1px solid transparent",
});

export default function Navbar() {
  return (
    <header style={{ borderBottom: "1px solid var(--color-border)" }}>
      <nav
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <NavLink to="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}>
          Little Bead Studio
        </NavLink>
        <div style={{ display: "flex", gap: "28px" }}>
          <NavLink to="/" end style={linkStyle}>Gallery</NavLink>
          <NavLink to="/about" style={linkStyle}>About</NavLink>
          <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
        </div>
      </nav>
    </header>
  );
}
