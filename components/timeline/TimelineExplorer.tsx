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
  const [adminState, setAdminState] = useState<AdminState>("checking");
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
    <main className="min-h-screen bg-white px-5 pb-24 pt-36 font-sans text-[#111114] md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Timeline introduction and context. */}
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#6e6e73]">
              Personal timeline
            </div>
            <h1 className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-[#111114]">
              Progress,
              <br /> documented.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#6e6e73] lg:text-right">
            A living record of the work, learning, and milestones shaping my
            journey as a backend developer.
          </p>
        </header>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-start">
          {/* Search and year filters become a sticky sidebar on large screens. */}
          <div className="lg:order-2 lg:sticky lg:top-28">
            <div className="rounded-[10px] border border-[#e8e8ea] bg-[#fafafa] p-5">
              <label className="relative block">
                <span className="sr-only">Search timeline</span>
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e6e73]"
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
                  className="w-full rounded-[10px] border border-[#e8e8ea] bg-white py-3.5 pl-12 pr-4 text-sm text-[#111114] outline-none placeholder:text-[#8a8a8f] focus:border-[#111114] focus:ring-1 focus:ring-[#111114]"
                  type="search"
                  value={query}
                  placeholder="Search timeline"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <div className="mt-5 border-t border-[#e8e8ea] pt-4">
                <div className="mb-3 flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#6e6e73]">
                  <span>Filter by year</span>
                  {selectedYears.length > 0 && (
                    <button
                      type="button"
                      className="text-[#111114] underline-offset-4 hover:underline"
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
                        className="flex cursor-pointer items-center justify-between rounded-[8px] px-3 py-2.5 transition-colors hover:bg-white"
                        key={year}
                      >
                        <span className="flex items-center gap-3">
                          <input
                            className="h-4 w-4 rounded border-[#b8b8bd] bg-white accent-[#111114] focus:ring-[#111114]"
                            type="checkbox"
                            checked={selectedYears.includes(year)}
                            onChange={() => toggleYear(year)}
                          />
                          <span className="font-semibold text-[#111114]">{year}</span>
                        </span>
                        <span className="text-xs text-[#6e6e73]">{count}</span>
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
                className="rounded-full bg-[#111114] px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#303034]"
                onClick={() => setModalOpen(true)}
              >
                Update your timeline
              </button>
              <span className="text-[0.68rem] uppercase tracking-[0.12em] text-[#6e6e73]">
                {adminState === "checking"
                  ? "Checking session"
                  : adminState === "admin"
                    ? "Admin access"
                    : "Public view"}
              </span>
            </div>

            <ol className="relative ml-3 border-l border-[#e8e8ea] md:ml-5">
              {filteredEntries.map((entry) => (
                <li className="relative mb-9 ml-7 md:ml-10" key={entry.id}>
                  <span className="absolute -left-[2.65rem] top-5 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-[#111114] font-mono text-[0.55rem] font-bold text-white md:-left-[3.3rem] md:h-8 md:w-8">
                    {String(entry.year).slice(-2)}
                  </span>
                  <article className="rounded-[10px] border border-[#e8e8ea] bg-white p-5 transition-colors hover:border-[#b8b8bd] md:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#6e6e73]">
                          {entry.year}
                        </div>
                        <h2 className="mt-2 font-sans text-xl font-semibold tracking-[-0.02em] text-[#111114] md:text-2xl">
                          {entry.title}
                        </h2>
                      </div>
                      <time className="shrink-0 text-xs text-[#6e6e73]">
                        {entry.dateLabel}
                      </time>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-[#6e6e73]">
                      {entry.summary}
                    </p>
                    {entry.details && (
                      <p className="mt-4 rounded-[10px] bg-[#fafafa] p-4 text-sm italic leading-7 text-[#6e6e73]">
                        {entry.details}
                      </p>
                    )}
                    {entry.detailsHtml && (
                      <div
                        className="mt-4 rounded-[10px] bg-[#fafafa] p-4 text-sm leading-7 text-[#6e6e73] [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[#111114] [&_blockquote]:pl-4 [&_blockquote]:italic [&_font]:font-mono [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:text-xl [&_h3]:font-semibold [&_h4]:text-lg [&_h4]:font-semibold [&_h5]:text-base [&_h5]:font-semibold [&_h6]:text-sm [&_h6]:font-semibold [&_ol]:list-decimal [&_ol]:pl-6 [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-[8px] [&_pre]:bg-[#111114] [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-white [&_ul]:list-disc [&_ul]:pl-6"
                        dangerouslySetInnerHTML={{
                          __html: sanitizeRichText(entry.detailsHtml),
                        }}
                      />
                    )}
                    {entry.link && (
                      <a
                        className="mt-5 inline-flex text-sm font-semibold text-[#111114] underline decoration-[#b8b8bd] underline-offset-4 hover:decoration-[#111114]"
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
              <div className="rounded-[10px] border border-[#e8e8ea] bg-[#fafafa] py-20 text-center text-sm text-[#6e6e73]">
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
