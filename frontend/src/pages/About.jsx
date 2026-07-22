import BeadDivider from "../components/BeadDivider.jsx";

const HEADSHOT_URL = "https://res.cloudinary.com/glir5p8o/image/upload/v1784757010/DSCF0837_a3seag.jpg";

export default function About() {
  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 60 }}>
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
          <h1>Hi, I'm Julia.</h1>
          <p>
            I make beadwork by hand, one bead at a time. What started as a way to
            unwind turned into Little Bead Studio: a small, one-person operation
            where every necklace, bracelet, and pair of earrings is strung,
            knotted, or woven by me, start to finish.
          </p>
        </div>
      </div>

      <BeadDivider palette="warm" count={32} />

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
            <a href="/contact" style={{ color: "var(--color-amber)" }}>contact page</a>{" "}
            with what you have in mind and I'll let you know what's possible
            and roughly how long it'll take.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:first-child { max-width: 220px; }
        }
      `}</style>
    </div>
  );
}