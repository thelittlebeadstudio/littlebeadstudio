import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getItem } from "../api/client.js";
import BeadDivider from "../components/BeadDivider.jsx";

export default function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getItem(id)
      .then((data) => {
        setItem(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "loading") return <div className="container" style={{ paddingTop: 60 }}>Loading…</div>;
  if (status === "error" || !item)
    return (
      <div className="container" style={{ paddingTop: 60 }}>
        <p>Couldn't find that piece.</p>
        <Link className="btn" to="/">Back to gallery</Link>
      </div>
    );

  const placeholder = item.images?.[0] || null;

  return (
    <div className="container" style={{ paddingTop: 50, paddingBottom: 60 }}>
      <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-ink-muted)" }}>
        ← Back to gallery
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          marginTop: "24px",
        }}
        className="item-detail-grid"
      >
        <div
          style={{
            aspectRatio: "1 / 1",
            borderRadius: "var(--radius)",
            background: placeholder
              ? `url(${placeholder}) center/cover`
              : "linear-gradient(135deg, #21463E, #142B26)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!placeholder && (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-ink-muted)" }}>
              photo coming soon
            </span>
          )}
        </div>

        <div>
          <div className="eyebrow">{item.category}</div>
          <h1 style={{ fontSize: "2rem" }}>{item.name}</h1>
          <div className="price-tag" style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            ${item.price}
          </div>
          <p>{item.description}</p>

          {item.materials?.length > 0 && (
            <div style={{ margin: "20px 0" }}>
              <div className="eyebrow">Materials</div>
              <p>{item.materials.join(", ")}</p>
            </div>
          )}

          <BeadDivider palette="warm" count={16} />

          <div style={{ marginTop: "24px" }}>
            {item.inStock ? (
              <Link className="btn btn-solid" to="/contact" state={{ itemInterest: item.name }}>
                Ask about this piece
              </Link>
            ) : (
              <span style={{ color: "var(--color-coral)", fontFamily: "var(--font-mono)" }}>
                Currently sold out — ask about a custom version
              </span>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .item-detail-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
