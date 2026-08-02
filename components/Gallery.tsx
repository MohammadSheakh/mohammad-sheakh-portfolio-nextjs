export default function Gallery() {
  return (
    <section className="gallery">
      <div className="s-label">How I work</div>
      <h2 className="s-title">
        Code. Document.
        <br />
        Ship.
      </h2>
      <div className="gallery-flex">
        <div className="g-card g-left">
          <div className="g-inner" style={{ background: "var(--purple-pale)" }}>
            <div className="g-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="8" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.6" />
                <rect x="26" y="8" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.3" />
                <rect x="8" y="26" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.3" />
                <rect x="26" y="26" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.15" />
              </svg>
            </div>
            <div className="g-title">Schema Design</div>
            <div className="g-sub">draw.io + Mermaid</div>
            <div className="g-badge">Visual architecture first</div>
          </div>
        </div>
        <div className="g-card g-center">
          <div className="g-inner" style={{ background: "var(--mint)" }}>
            <div className="g-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="24" stroke="#0F766E" strokeWidth="2" />
                <path
                  d="M22 32l8 8 12-14"
                  stroke="#0F766E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="g-title" style={{ fontSize: "1.1rem" }}>
              Clean Architecture
            </div>
            <div
              className="g-sub"
              style={{
                marginTop: "0.5rem",
                fontSize: "0.78rem",
                textAlign: "center",
                color: "#555",
                lineHeight: 1.5,
              }}
            >
              SOLID principles · Modular design
              <br />
              Agentic coding workflows
            </div>
            <div className="g-badge">SparkTech Agency · 2025–2026</div>
          </div>
        </div>
        <div className="g-card g-right">
          <div className="g-inner" style={{ background: "var(--peach)" }}>
            <div className="g-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 40V20l16-12 16 12v20H8z" stroke="#F97316" strokeWidth="2" fill="none" />
                <rect x="19" y="28" width="10" height="12" rx="2" fill="#F97316" opacity="0.4" />
              </svg>
            </div>
            <div className="g-title">CI/CD Pipelines</div>
            <div className="g-sub">Docker + GitHub Actions</div>
            <div className="g-badge">Zero-downtime deploys</div>
          </div>
        </div>
      </div>
    </section>
  );
}
