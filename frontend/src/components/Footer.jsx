import BeadDivider from "./BeadDivider.jsx";

export default function Footer() {
  return (
    <footer style={{ marginTop: "80px", paddingBottom: "40px" }}>
      <div className="container">
        <BeadDivider palette="cool" count={40} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            paddingTop: "16px",
            color: "var(--color-ink-muted)",
            fontSize: "0.85rem",
          }}
        >
          <span>Little Bead Studio</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
