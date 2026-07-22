import { useEffect, useState } from "react";
import { getItems } from "../api/client.js";
import ItemCard from "../components/ItemCard.jsx";
import BeadDivider from "../components/BeadDivider.jsx";

const CACHE_KEY = "lbs_items_cache";
const CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { items, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_MAX_AGE_MS) return null;
    return items;
  } catch {
    return null; // corrupted or unavailable cache — just skip it
  }
}

function writeCache(items) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ items, savedAt: Date.now() }));
  } catch {
    // localStorage can fail (private browsing, storage full) — caching is a
    // nice-to-have, so silently skip rather than breaking the page
  }
}

export default function Home() {
  const cached = readCache();
  const [items, setItems] = useState(cached || []);
  // If we have cached items, show them immediately ("ready") while a fresh
  // fetch happens quietly in the background — this is what makes repeat
  // visits feel instant even while Render's free tier is waking up.
  const [status, setStatus] = useState(cached ? "ready" : "loading");
  const [isRevalidating, setIsRevalidating] = useState(!!cached);

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data);
        setStatus("ready");
        setIsRevalidating(false);
        writeCache(data);
      })
      .catch(() => {
        setIsRevalidating(false);
        // If we have cached items already on screen, a failed background
        // refresh shouldn't wipe them out — only show the error state if we
        // had nothing to show in the first place.
        if (!cached) setStatus("error");
      });
  }, []);

  return (
    <div className="container" style={{ paddingTop: "60px" }}>
      <section style={{ maxWidth: "620px" }}>
        <div className="eyebrow">Handmade beadwork</div>
        <h1>Every piece, strung by hand.</h1>
        <p>
          Browse the current collection below, necklaces, bracelets, and earrings,
          each one beaded one at a time. See something you like? Reach out and I'll
          let you know if it's still available or make you something similar.
        </p>
      </section>

      <div style={{ margin: "36px 0" }}>
        <BeadDivider count={32} />
      </div>

      {status === "loading" && <p>Loading the gallery… (this can take up to a minute on first load)</p>}

      {status === "error" && (
        <p style={{ color: "var(--color-coral)" }}>
          Couldn't load the gallery right now. Make sure the backend API is running.
        </p>
      )}

      {status === "ready" && items.length === 0 && (
        <p>No pieces listed yet — check back soon.</p>
      )}

      {status === "ready" && items.length > 0 && (
        <>
          {isRevalidating && (
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-ink-muted)" }}>
              Refreshing…
            </p>
          )}
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
        </>
      )}
    </div>
  );
}