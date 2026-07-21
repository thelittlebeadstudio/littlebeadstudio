// The site's signature element: a hand-strung row of beads used as a
// section divider throughout the site, echoing the wrap bracelets and
// strand necklaces the studio actually makes.
const PALETTES = {
  default: ["#E8A33D", "#D9705B", "#6E93A8", "#E8A33D", "#D9705B"],
  warm: ["#E8A33D", "#D9705B", "#E8A33D", "#F2B458", "#D9705B"],
  cool: ["#6E93A8", "#3E6B79", "#6E93A8", "#8FB2BF", "#3E6B79"],
};

export default function BeadDivider({ palette = "default", count = 24 }) {
  const colors = PALETTES[palette] || PALETTES.default;
  const beads = Array.from({ length: count }, (_, i) => colors[i % colors.length]);

  return (
    <div
      role="presentation"
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 0",
        overflow: "hidden",
      }}
    >
      {beads.map((color, i) => (
        <span
          key={i}
          style={{
            flex: "0 0 auto",
            width: i % 5 === 0 ? "14px" : "9px",
            height: i % 5 === 0 ? "14px" : "9px",
            borderRadius: "50%",
            background: color,
            boxShadow: "inset -2px -2px 3px rgba(0,0,0,0.25), 0 0 6px rgba(0,0,0,0.15)",
          }}
        />
      ))}
    </div>
  );
}
