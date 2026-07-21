import { useEffect, useState } from "react";
import { getItems } from "../api/client.js";
import ItemCard from "../components/ItemCard.jsx";
import BeadDivider from "../components/BeadDivider.jsx";

export default function Home() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="container" style={{ paddingTop: "60px" }}>
      <section style={{ maxWidth: "620px" }}>
        <div className="eyebrow">Handmade beadwork</div>
        <h1>Every piece, strung by hand.</h1>
        <p>
          Browse the current collection below — necklaces, bracelets, and earrings,
          each one beaded one at a time. See something you like? Reach out and I'll
          let you know if it's still available or make you something similar.
        </p>
      </section>

      <div style={{ margin: "36px 0" }}>
        <BeadDivider />
      </div>

      {status === "loading" && <p>Loading the gallery…</p>}

      {status === "error" && (
        <p style={{ color: "var(--color-coral)" }}>
          Couldn't load the gallery right now. Make sure the backend API is running.
        </p>
      )}

      {status === "ready" && items.length === 0 && (
        <p>No pieces listed yet — check back soon.</p>
      )}

      {status === "ready" && items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
            paddingBottom: "40px",
          }}
        >
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
