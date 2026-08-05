"use client";

import { FormEvent, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { sanitizeRichText } from "./rich-text";
import type { TimelineEntry } from "./timeline-data";

interface TimelineForm {
  year: string;
  dateLabel: string;
  title: string;
  summary: string;
  details: string;
  detailsHtml: string;
  linkTitle: string;
  link: string;
  openInNewTab: boolean;
  richEditor: boolean;
}

const INITIAL_FORM: TimelineForm = {
  year: String(new Date().getFullYear()),
  dateLabel: "",
  title: "",
  summary: "",
  details: "",
  detailsHtml: "",
  linkTitle: "",
  link: "",
  openInNewTab: false,
  richEditor: false,
};

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-500/70 bg-slate-700 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20";

interface AddTimelineModalProps {
  open: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onCreated: (entry: TimelineEntry) => void;
}

export default function AddTimelineModal({
  open,
  isAdmin,
  onClose,
  onCreated,
}: AddTimelineModalProps) {
  const [form, setForm] = useState<TimelineForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Keep focus on the modal workflow by locking page scroll and handling Escape.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const updateField = <Key extends keyof TimelineForm>(
    field: Key,
    value: TimelineForm[Key],
  ) => setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAdmin) return;

    setSubmitting(true);
    setError("");

    // Normalize plain or rich details into the shared timeline entry shape.
    const newEntry: TimelineEntry = {
      id: crypto.randomUUID(),
      year: Number(form.year),
      dateLabel: form.dateLabel,
      title: form.title,
      summary: form.summary,
      details: form.richEditor ? undefined : form.details || undefined,
      detailsHtml: form.richEditor
        ? sanitizeRichText(form.detailsHtml) || undefined
        : undefined,
      linkTitle: form.linkTitle || undefined,
      link: form.link || undefined,
      openInNewTab: form.openInNewTab,
    };

    try {
      const timelineApiUrl = process.env.NEXT_PUBLIC_TIMELINE_API_URL;
      if (timelineApiUrl) {
        const response = await fetch(timelineApiUrl, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        if (!response.ok) throw new Error("Timeline creation failed");
      }

      onCreated(newEntry);
      setForm(INITIAL_FORM);
      onClose();
    } catch {
      setError("The timeline entry could not be posted. Check the API and admin session.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm md:p-6">
      <button
        className="absolute inset-0 cursor-default"
        type="button"
        aria-label="Close timeline form"
        onClick={onClose}
      />
      <div
        className="relative z-[1] max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/15 bg-slate-900 p-6 text-slate-200 shadow-2xl md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="timeline-modal-title"
      >
        <button
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-700 text-xl text-white transition-colors hover:bg-slate-600"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="timeline-modal-title" className="pr-14 font-display text-2xl font-black text-white">
          Update your timeline
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Add a milestone, work update, or important moment.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm text-slate-300">
              Year
              <input
                className={fieldClassName}
                type="number"
                min="2000"
                max="2100"
                required
                value={form.year}
                onChange={(event) => updateField("year", event.target.value)}
              />
            </label>
            <label className="text-sm text-slate-300">
              Date label
              <input
                className={fieldClassName}
                type="text"
                required
                placeholder="May 2026 or just now"
                value={form.dateLabel}
                onChange={(event) => updateField("dateLabel", event.target.value)}
              />
            </label>
          </div>

          <label className="block text-sm text-slate-300">
            Timeline heading
            <input
              className={fieldClassName}
              type="text"
              required
              placeholder="Type a short informative heading"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </label>

          <label className="block text-sm text-slate-300">
            Summary
            <textarea
              className={`${fieldClassName} min-h-24 resize-y`}
              required
              placeholder="What happened?"
              value={form.summary}
              onChange={(event) => updateField("summary", event.target.value)}
            />
          </label>

          <div className="flex justify-end">
            <label className="inline-flex items-center gap-2 text-sm text-slate-300">
              <input
                className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-cyan-400"
                type="checkbox"
                checked={form.richEditor}
                onChange={(event) => updateField("richEditor", event.target.checked)}
              />
              Open rich text editor
            </label>
          </div>

          {form.richEditor ? (
            <RichTextEditor
              value={form.detailsHtml}
              onChange={(value) => updateField("detailsHtml", value)}
            />
          ) : (
            <label className="block text-sm text-slate-300">
              Timeline details <span className="text-slate-500">(optional)</span>
              <textarea
                className={`${fieldClassName} min-h-28 resize-y`}
                placeholder="Add more context"
                value={form.details}
                onChange={(event) => updateField("details", event.target.value)}
              />
            </label>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm text-slate-300">
              Link title <span className="text-slate-500">(optional)</span>
              <input
                className={fieldClassName}
                type="text"
                placeholder="Read more"
                value={form.linkTitle}
                onChange={(event) => updateField("linkTitle", event.target.value)}
              />
            </label>
            <label className="text-sm text-slate-300">
              Link URL <span className="text-slate-500">(optional)</span>
              <input
                className={fieldClassName}
                type="url"
                placeholder="https://..."
                value={form.link}
                onChange={(event) => updateField("link", event.target.value)}
              />
            </label>
          </div>

          <label className="flex items-center justify-end gap-2 text-sm text-slate-300">
            <input
              className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-cyan-400"
              type="checkbox"
              checked={form.openInNewTab}
              onChange={(event) => updateField("openInNewTab", event.target.checked)}
            />
            Open link in a new tab
          </label>

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {!isAdmin && (
            <p className="rounded-xl bg-amber-300/10 px-4 py-3 text-sm text-amber-200">
              Admin sign-in is required to post this timeline update.
            </p>
          )}

          <div className="flex justify-end">
            <button
              className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-35"
              type="submit"
              disabled={!isAdmin || submitting}
            >
              {submitting ? "Posting..." : "Post update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
