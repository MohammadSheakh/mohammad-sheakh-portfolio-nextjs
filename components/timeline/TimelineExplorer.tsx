"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AddTimelineModal from "./AddTimelineModal";
import { richTextToPlainText, sanitizeRichText } from "./rich-text";
import { INITIAL_TIMELINE, type TimelineEntry } from "./timeline-data";

type AdminState = "checking" | "admin" | "guest";

export default function TimelineExplorer() {
  const [entries, setEntries] = useState<TimelineEntry[]>(INITIAL_TIMELINE);
  const [query, setQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [adminState, setAdminState] = useState<AdminState>("checking"); //checking 
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = useCallback(() => setModalOpen(false), []);

  // Load API entries when available and retain typed seed entries offline.
  useEffect(() => {
    let active = true;

    const loadTimeline = async () => {
      const timelineApiUrl = process.env.NEXT_PUBLIC_TIMELINE_API_URL;
      if (!timelineApiUrl) return;

      try {
        const response = await fetch(timelineApiUrl, { credentials: "include" });
        if (!response.ok) return;
        const result: unknown = await response.json();
        const remoteEntries = Array.isArray(result)
          ? result
          : result && typeof result === "object" && "data" in result
            ? (result as { data?: unknown }).data
            : null;

        if (active && Array.isArray(remoteEntries)) {
          setEntries(remoteEntries as TimelineEntry[]);
        }
      } catch {
        if (active) setEntries(INITIAL_TIMELINE);
      }
    };

    loadTimeline();
    return () => {
      active = false;
    };
  }, []);

  // Check mutation permissions without blocking public timeline rendering.
  useEffect(() => {
    let active = true;

    const checkAdmin = async () => {
      if (process.env.NEXT_PUBLIC_ADMIN_PREVIEW === "true") {
        if (active) setAdminState("admin");
        return;
      }

      const authMeUrl = process.env.NEXT_PUBLIC_AUTH_ME_URL;
      if (!authMeUrl) {
        if (active) setAdminState("guest");
        return;
      }

      try {
        const response = await fetch(authMeUrl, { credentials: "include" });
        if (!response.ok) throw new Error("Not authenticated");
        const session = (await response.json()) as {
          role?: string;
          isAdmin?: boolean;
          user?: { role?: string };
        };
        const isAdmin =
          session.isAdmin === true ||
          session.role === "admin" ||
          session.user?.role === "admin";
        if (active) setAdminState(isAdmin ? "admin" : "guest");
      } catch {
        if (active) setAdminState("guest");
      }
    };

    checkAdmin();
    return () => {
      active = false;
    };
  }, []);

  const years = useMemo(
    () => Array.from(new Set(entries.map((entry) => entry.year))).sort((a, b) => b - a),
    [entries],
  );

  // Search rich and plain content while respecting all selected year filters.
  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...entries]
      .sort((a, b) => b.year - a.year)
      .filter((entry) => {
        const matchesYear =
          selectedYears.length === 0 || selectedYears.includes(entry.year);
        const searchableText = [
          entry.year,
          entry.dateLabel,
          entry.title,
          entry.summary,
          entry.details,
          entry.detailsHtml ? richTextToPlainText(entry.detailsHtml) : "",
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return matchesYear && searchableText.includes(normalizedQuery);
      });
  }, [entries, query, selectedYears]);

  const toggleYear = (year: number) => {
    setSelectedYears((current) =>
      current.includes(year)
        ? current.filter((item) => item !== year)
        : [...current, year],
    );
  };

  return (
    <main className="min-h-screen bg-PrimaryColorDark px-5 pb-24 pt-36 text-slate-200 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Timeline introduction and context. */}
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[3px] text-cyan-300">
              Personal timeline
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-4px] text-white">
              Progress,
              <br /> documented.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300 lg:text-right">
            A living record of the work, learning, and milestones shaping my
            journey as a backend developer.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start">
          {/* Search and year filters become a sticky sidebar on large screens. */}
          <div className="lg:order-2 lg:sticky lg:top-28">
            <div className="rounded-[24px] border border-white/15 bg-white/[0.05] p-5 backdrop-blur-sm">
              <label className="relative block">
                <span className="sr-only">Search timeline</span>
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  className="w-full rounded-xl border border-slate-500/60 bg-slate-700 py-3.5 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                  type="search"
                  value={query}
                  placeholder="Search timeline"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="mb-3 flex items-center justify-between text-[0.68rem] font-bold uppercase tracking-[1.5px] text-slate-400">
                  <span>Filter by year</span>
                  {selectedYears.length > 0 && (
                    <button
                      type="button"
                      className="text-cyan-300 hover:text-cyan-200"
                      onClick={() => setSelectedYears([])}
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {years.map((year) => {
                    const count = entries.filter((entry) => entry.year === year).length;
                    return (
                      <label
                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                        key={year}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-cyan-400"
                            type="checkbox"
                            checked={selectedYears.includes(year)}
                            onChange={() => toggleYear(year)}
                          />
                          <span className="font-semibold text-slate-200">{year}</span>
                        </span>
                        <span className="text-xs text-slate-500">{count}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Chronological entries and the admin update action. */}
          <section className="lg:order-1">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                className="rounded-xl border border-cyan-300/60 px-6 py-3 text-xs font-bold uppercase tracking-[1.5px] text-cyan-200 transition-colors hover:bg-cyan-300 hover:text-slate-950"
                onClick={() => setModalOpen(true)}
              >
                Update your timeline
              </button>
              <span className="text-xs uppercase tracking-[1.5px] text-slate-500">
                {adminState === "checking"
                  ? "Checking session"
                  : adminState === "admin"
                    ? "Admin access"
                    : "Public view"}
              </span>
            </div>

            <ol className="relative ml-3 border-l border-white/15 md:ml-5">
              {filteredEntries.map((entry) => (
                <li className="relative mb-9 ml-7 md:ml-10" key={entry.id}>
                  <span className="absolute -left-[2.65rem] top-5 flex h-7 w-7 items-center justify-center rounded-full border-4 border-PrimaryColorDark bg-cyan-400 font-mono text-[0.55rem] font-bold text-slate-950 md:-left-[3.3rem] md:h-8 md:w-8">
                    {String(entry.year).slice(-2)}
                  </span>
                  <article className="rounded-[20px] border border-white/10 bg-slate-700/90 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:-translate-y-1 md:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xs font-medium uppercase tracking-[1.5px] text-cyan-300">
                          {entry.year}
                        </div>
                        <h2 className="mt-2 font-display text-xl font-black text-white md:text-2xl">
                          {entry.title}
                        </h2>
                      </div>
                      <time className="shrink-0 text-xs text-slate-400">
                        {entry.dateLabel}
                      </time>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-300">
                      {entry.summary}
                    </p>
                    {entry.details && (
                      <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm italic leading-7 text-slate-300">
                        {entry.details}
                      </p>
                    )}
                    {entry.detailsHtml && (
                      <div
                        className="mt-4 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm leading-7 text-slate-300 [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-300/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_font]:font-mono [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h4]:text-lg [&_h5]:text-base [&_h6]:text-sm [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-slate-900/70 [&_pre]:p-4 [&_pre]:font-mono [&_ul]:list-disc [&_ul]:pl-6"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeRichText(entry.detailsHtml),
                        }}
                      />
                    )}
                    {entry.link && (
                      <a
                        className="mt-5 inline-flex text-sm font-bold text-cyan-300 hover:text-cyan-200 hover:underline"
                        href={entry.link}
                        target={entry.openInNewTab ? "_blank" : undefined}
                        rel={entry.openInNewTab ? "noreferrer" : undefined}
                      >
                        {entry.linkTitle || "Visit link"} →
                      </a>
                    )}
                  </article>
                </li>
              ))}
            </ol>

            {filteredEntries.length === 0 && (
              <div className="rounded-[24px] border border-white/10 py-20 text-center text-slate-400">
                No timeline entries match these filters.
              </div>
            )}
          </section>
        </div>
      </div>

      <AddTimelineModal
        open={modalOpen}
        isAdmin={adminState === "admin"}
        onClose={closeModal}
        onCreated={(entry) => setEntries((current) => [entry, ...current])}
      />
    </main>
  );
}
