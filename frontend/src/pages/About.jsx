import BeadDivider from "../components/BeadDivider.jsx";

export default function About() {
  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 60, maxWidth: "720px" }}>
      <div className="eyebrow">About</div>
      <h1>Hi, I'm [Your Name].</h1>
      <p>
        Welcome to Little Bead Studio! This is where you can introduce yourself —
        how you got into beadwork, what draws you to it, and what makes your pieces
        different. A photo of you or your workspace goes a long way here too; add
        one to <code>src/pages/About.jsx</code> once you have it.
      </p>
      <p>
        You can talk about your process: how long a typical piece takes, the
        materials you favor, and whether you take custom commissions. People
        love knowing the story behind something handmade.
      </p>

      <BeadDivider palette="warm" count={20} />

      <p>
        Replace this placeholder copy any time — it lives in{" "}
        <code>frontend/src/pages/About.jsx</code>.
      </p>
    </div>
  );
}
