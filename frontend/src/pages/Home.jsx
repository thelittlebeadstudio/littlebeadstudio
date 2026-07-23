import { Link } from "react-router-dom";
import BeadDivider from "../components/BeadDivider.jsx";

// Swap these for real photos once uploaded to Cloudinary (same process as
// your item and headshot photos — upload, copy the URL, paste it here).
const HERO_IMAGE_URL = "https://res.cloudinary.com/glir5p8o/image/upload/v1784739332/whale_two_kobquk.jpg";
const HEADSHOT_URL = "https://res.cloudinary.com/glir5p8o/image/upload/v1784757010/DSCF0837_a3seag.jpg";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          minHeight: "calc(100vh - 77px)", // full viewport minus the navbar height
          display: "flex",
          alignItems: "center",
          position: "relative",
          background: HERO_IMAGE_URL
            ? `linear-gradient(rgba(20,43,38,0.55), rgba(20,43,38,0.75)), url(${HERO_IMAGE_URL}) center/cover`
            : "linear-gradient(160deg, #1B3A33, #142B26 60%)",
        }}
      >
        <div className="container">
          <div className="eyebrow">Handmade beadwork</div>
          <h1 style={{ maxWidth: "680px" }}>Every piece, strung by hand.</h1>
          <p style={{ maxWidth: "520px", fontSize: "1.05rem" }}>
            Necklaces, bracelets, and earrings — beaded one at a time, from a
            small studio, not a factory floor.
          </p>
          <div style={{ display: "flex", gap: "16px", marginTop: "28px", flexWrap: "wrap" }}>
            <Link className="btn btn-solid" to="/gallery">Browse the gallery</Link>
            <Link className="btn" to="/contact">Get in touch</Link>
          </div>
        </div>

        <a
          href="#about"
          aria-label="Scroll down to learn more"
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-ink-muted)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Learn more
          <span aria-hidden="true" style={{ fontSize: "1.1rem" }}>↓</span>
        </a>
      </section>

      {/* About */}
      <section id="about" className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "48px",
            maxWidth: "820px",
          }}
          className="about-grid"
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius)",
              background: HEADSHOT_URL
                ? `url(${HEADSHOT_URL}) center/cover`
                : "linear-gradient(135deg, #21463E, #142B26)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {!HEADSHOT_URL && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-ink-muted)", textAlign: "center", padding: "0 16px" }}>
                headshot coming soon
              </span>
            )}
          </div>

          <div>
            <div className="eyebrow">About</div>
            <h2 style={{ fontSize: "1.8rem" }}>Hi, I'm Julia.</h2>
            <p>
              I make beadwork by hand, one bead at a time. What started as a way to
              unwind turned into Little Bead Studio: a small, one-person operation
              where every necklace, bracelet, and pair of earrings is strung,
              knotted, or woven by me, start to finish.
            </p>
          </div>
        </div>

        <BeadDivider palette="warm" count={24} />

        <div style={{ maxWidth: "720px", display: "grid", gap: "28px" }}>
          <div>
            <h2 style={{ fontSize: "1.3rem" }}>How I work</h2>
            <p>
              Every piece starts with color. I pick beads the way some people
              mix paint, laying out combinations until something feels right.
              From there it's slow, hands-on work: hand-knotting between beads on
              strand pieces so they hold up over years of wear. Depending
              on the piece, that can mean anywhere from a couple of hours to a
              full week of evenings.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.3rem" }}>Custom pieces</h2>
            <p>
              If something in the gallery is sold out, or you're picturing
              colors or a style you don't see listed, I take custom
              commissions. Send a message on the{" "}
              <Link to="/contact" style={{ color: "var(--color-amber)" }}>contact page</Link>{" "}
              with what you have in mind and I'll let you know what's possible
              and roughly how long it'll take.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "1.3rem" }}>Find my art in person</h2>
            <p>
              I sell at a handful of local markets and craft fairs throughout
              the year, see the{" "}
              <Link to="/events" style={{ color: "var(--color-amber)" }}>events page</Link>{" "}
              for upcoming dates and where to find me.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:first-child { max-width: 220px; }
        }
      `}</style>
    </div>
  );
}
