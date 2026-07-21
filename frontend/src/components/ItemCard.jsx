import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
  const placeholder = item.images?.[0] || null;

  return (
    <Link
      to={`/item/${item._id}`}
      style={{
        display: "block",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        transition: "transform 0.15s ease, border-color 0.15s ease",
      }}
      className="item-card"
    >
      <div
        style={{
          aspectRatio: "1 / 1",
          background: placeholder
            ? `url(${placeholder}) center/cover`
            : "linear-gradient(135deg, #21463E, #142B26)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!placeholder && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-ink-muted)" }}>
            photo coming soon
          </span>
        )}
      </div>
      <div style={{ padding: "16px" }}>
        {!item.inStock && <div className="eyebrow" style={{ color: "var(--color-coral)" }}>Sold out</div>}
        <h3 style={{ fontSize: "1.05rem", margin: "4px 0" }}>{item.name}</h3>
        <div className="price-tag">${item.price}</div>
      </div>
    </Link>
  );
}
