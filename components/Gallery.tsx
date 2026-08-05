export default function Gallery() {
  return (
    <section className="bg-[var(--surface)] px-6 py-20 md:px-12 md:py-28">
      <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[3px] text-purple">
        How I work
      </div>
      <h2 className="s-title mb-8 font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[-2.5px]">
        Code. Document.
        <br />
        Ship.
      </h2>
      {/* Offset process cards form a responsive editorial gallery. */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
        <div className="relative mt-[70px] h-[300px] w-[230px] shrink-0 overflow-hidden rounded-3xl bg-[var(--purple-pale)]">
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-[var(--purple-pale)] p-8 text-center">
            <div className="mb-4 opacity-60">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="8" y="8" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.6" />
                <rect x="26" y="8" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.3" />
                <rect x="8" y="26" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.3" />
                <rect x="26" y="26" width="14" height="14" rx="3" fill="#5B4FCF" opacity="0.15" />
              </svg>
            </div>
            <div className="text-sm font-bold tracking-[-0.3px]">Schema Design</div>
            <div className="mt-1 text-xs text-[var(--muted)]">draw.io + Mermaid</div>
            <div className="absolute inset-x-4 bottom-5 rounded-[10px] bg-black/55 px-3 py-2 text-[0.72rem] tracking-[0.5px] text-white backdrop-blur-[10px]">
              Visual architecture first
            </div>
          </div>
        </div>
        <div className="relative h-[400px] w-[300px] shrink-0 overflow-hidden rounded-3xl bg-[var(--mint)]">
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-[var(--mint)] p-8 text-center">
            <div className="mb-4 opacity-60">
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
            <div className="text-[1.1rem] font-bold tracking-[-0.3px]">
              Clean Architecture
            </div>
            <div className="mt-2 text-center text-[0.78rem] leading-normal text-[#555]">
              SOLID principles · Modular design
              <br />
              Agentic coding workflows
            </div>
            <div className="absolute inset-x-4 bottom-5 rounded-[10px] bg-black/55 px-3 py-2 text-[0.72rem] tracking-[0.5px] text-white backdrop-blur-[10px]">
              SparkTech Agency · 2025–2026
            </div>
          </div>
        </div>
        <div className="relative mt-[45px] h-[300px] w-[230px] shrink-0 overflow-hidden rounded-3xl bg-[var(--peach)]">
          <div className="relative flex h-full w-full flex-col items-center justify-center bg-[var(--peach)] p-8 text-center">
            <div className="mb-4 opacity-60">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 40V20l16-12 16 12v20H8z" stroke="#F97316" strokeWidth="2" fill="none" />
                <rect x="19" y="28" width="10" height="12" rx="2" fill="#F97316" opacity="0.4" />
              </svg>
            </div>
            <div className="text-sm font-bold tracking-[-0.3px]">CI/CD Pipelines</div>
            <div className="mt-1 text-xs text-[var(--muted)]">Docker + GitHub Actions</div>
            <div className="absolute inset-x-4 bottom-5 rounded-[10px] bg-black/55 px-3 py-2 text-[0.72rem] tracking-[0.5px] text-white backdrop-blur-[10px]">
              Zero-downtime deploys
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
