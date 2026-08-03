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
    <div className="pb-12">
      <section className="mx-8 rounded-[28px] bg-[var(--steps-bg)] px-6 py-20 md:px-12">
        <div className="mb-2 text-center text-[0.68rem] font-semibold uppercase tracking-[3px] text-coral">
          My process
        </div>
        <h2 className="mb-12 text-center font-display text-[clamp(2rem,4vw,3rem)] font-black tracking-[-1.5px]">
          How I build things.
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className="mb-3 font-display text-[3.5rem] font-black leading-none text-coral">
                {s.n}
              </div>
              <div className="mb-4 h-0.5 w-10 bg-[var(--border)]"></div>
              <div className="mb-1.5 text-sm font-bold tracking-[-0.3px]">
                {s.t}
              </div>
              <div className="text-[0.78rem] leading-[1.65] text-[var(--muted)]">
                {s.d}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
