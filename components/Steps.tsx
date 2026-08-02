const STEPS = [
  {
    n: "1",
    t: "Understand",
    d: "Deep-dive into requirements. Schema design, flow mapping, API contracts first.",
  },
  {
    n: "2",
    t: "Architect",
    d: "draw.io diagrams, Mermaid sequences, module boundaries before a line of code.",
  },
  {
    n: "3",
    t: "Build & test",
    d: "Clean, typed code. Unit tests, integration tests, code review, error handling.",
  },
  {
    n: "4",
    t: "Ship",
    d: "Docker, CI/CD, monitoring, zero-downtime. Production-grade from day one.",
  },
];

export default function Steps() {
  return (
    <div style={{ padding: "0 0 3rem" }}>
      <div className="steps-section">
        <div
          style={{
            fontSize: "0.68rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#F97316",
            fontWeight: 600,
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          My process
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 900,
            letterSpacing: "-1.5px",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          How I build things.
        </h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="step-n">{s.n}</div>
              <div className="step-div"></div>
              <div className="step-t">{s.t}</div>
              <div className="step-d">{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
