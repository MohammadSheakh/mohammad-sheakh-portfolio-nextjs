type UseIconName = "desktop" | "laptop" | "processor" | "board" | "monitor" | "phone" | "code" | "figma" | "notes" | "diagram";

interface UseItem {
  name: string;
  detail?: string;
  icon: UseIconName;
}

const HARDWARE: UseItem[] = [
  { name: "Processor", detail: "Ryzen 5 3600", icon: "processor" },
  { name: "Motherboard", detail: "B450 Tomahawk Max", icon: "board" },
  { name: "Main monitor", detail: "BenQ 24-inch", icon: "monitor" },
  { name: "Second monitor", detail: "ASUS 21-inch", icon: "monitor" },
  { name: "Desktop OS", detail: "Linux", icon: "desktop" },
  { name: "Phone", detail: "Motorola G96", icon: "phone" },
  { name: "Laptop", detail: "ASUS Zenbook 14", icon: "laptop" },
  { name: "Laptop OS", detail: "Windows 11", icon: "laptop" },
];

const SOFTWARE: UseItem[] = [
  { name: "VS Code", detail: "Development", icon: "code" },
];

const ARCHITECTURE: UseItem[] = [
  { name: "FigJam", detail: "Figma", icon: "figma" },
  { name: "Obsidian", detail: "Notes and documentation", icon: "notes" },
  { name: "draw.io", detail: "System diagrams", icon: "diagram" },
];

function UseIcon({ name }: { name: UseIconName }) {
  const sharedProps = {
    className: "size-5 shrink-0",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.7,
    "aria-hidden": true,
  };

  if (name === "desktop" || name === "monitor") {
    return (
      <svg {...sharedProps}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  }

  if (name === "laptop") {
    return (
      <svg {...sharedProps}>
        <rect x="5" y="3" width="14" height="13" rx="2" />
        <path d="M2.5 19h19M8.5 19l.8 1h5.4l.8-1" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg {...sharedProps}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M10 5h4M11 19h2" />
      </svg>
    );
  }

  if (name === "processor") {
    return (
      <svg {...sharedProps}>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3M10 10h4v4h-4z" />
      </svg>
    );
  }

  if (name === "board") {
    return (
      <svg {...sharedProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <rect x="7" y="7" width="7" height="7" rx="1" />
        <path d="M17 7h1M17 11h1M7 17v1M11 17v1M15 17h3v-3" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg {...sharedProps}>
        <path d="m8 6-6 6 6 6M16 6l6 6-6 6M14 3l-4 18" />
      </svg>
    );
  }

  if (name === "notes") {
    return (
      <svg {...sharedProps}>
        <path d="M6 3h9l3 3v15H6zM15 3v4h4M9 11h6M9 15h6" />
      </svg>
    );
  }

  if (name === "diagram") {
    return (
      <svg {...sharedProps}>
        <rect x="3" y="3" width="6" height="5" rx="1" />
        <rect x="15" y="16" width="6" height="5" rx="1" />
        <path d="M9 5.5h4a4 4 0 0 1 4 4V16M12 11l5 5 5-5" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="m12 2 3 5-3 5-3-5 3-5ZM9 7H4l3 5h5M12 12l3 5-3 5-3-5 3-5ZM15 17h5l-3-5h-5" />
    </svg>
  );
}

function UseList({ items, compact = false }: { items: UseItem[]; compact?: boolean }) {
  return (
    <div className={`grid gap-x-10 gap-y-2 ${compact ? "" : "sm:grid-cols-2"}`}>
      {items.map((item) => (
        <div
          className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[var(--purple-pale)]"
          key={`${item.name}-${item.detail}`}
        >
          <span className="text-slate-400 transition-colors group-hover:text-purple">
            <UseIcon name={item.icon} />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-[var(--text)]">{item.name}</div>
            {item.detail && (
              <div className="truncate text-xs text-[var(--muted)]">{item.detail}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WhatIUse() {
  return (
    <section className="bg-[var(--bg)] px-6 py-20 md:px-12 md:py-28" id="what-i-use">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-2 shadow-[0_14px_50px_rgba(15,23,42,0.06)]">
          <div className="min-h-[500px] rounded-[22px] border border-[var(--border)] p-6 sm:p-9 md:p-11">
            <div className="flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[2px] text-purple">
              <UseIcon name="processor" />
              What I use
            </div>
            <h2 className="s-title mt-5 max-w-xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-black leading-[0.95] tracking-[-2.5px]">
              Tools behind
              <br />
              the work.
            </h2>

            {/* Hardware and software remain data-driven for easy future updates. */}
            <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_0.7fr_1fr] lg:gap-12">
              <div>
                <div className="mb-5 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                  <span className="text-purple"><UseIcon name="desktop" /></span>
                  <h3 className="font-display text-xl font-black">Hardware</h3>
                </div>
                <UseList items={HARDWARE} />
              </div>
              <div>
                <div className="mb-5 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                  <span className="text-purple"><UseIcon name="code" /></span>
                  <h3 className="font-display text-xl font-black">Software</h3>
                </div>
                <UseList items={SOFTWARE} compact />
              </div>
              <div>
                <div className="mb-5 flex items-center gap-3 border-b border-[var(--border)] pb-4">
                  <span className="text-purple"><UseIcon name="diagram" /></span>
                  <h3 className="font-display text-xl font-black">Architecture</h3>
                </div>
                <UseList items={ARCHITECTURE} compact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
