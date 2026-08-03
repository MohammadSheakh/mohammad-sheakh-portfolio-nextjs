"use client";

import { useState } from "react";
import type { Project } from "./project-data";

function ExternalLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null;

  return (
    <a
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-white"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </svg>
      {label}
    </a>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/15 bg-[#092f46] shadow-[0_22px_70px_rgba(0,0,0,0.22)] transition-transform duration-300 hover:-translate-y-1">
      <div
        className="relative flex h-52 items-end overflow-hidden p-6"
        style={{ background: project.accent }}
      >
        <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border border-white/20"></div>
        <div className="absolute -right-2 -top-8 h-32 w-32 rounded-full border border-white/25"></div>
        <div className="absolute right-8 top-8 font-mono text-6xl font-black text-white/10">
          {project.title.slice(0, 2).toUpperCase()}
        </div>
        <span className="relative rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[1.5px] text-white backdrop-blur-md">
          {project.category}
        </span>
      </div>

      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <h2 className="font-display text-2xl font-black tracking-[-0.8px] text-white">
              {project.title}
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[1px] text-emerald-300">
                {project.status}
              </span>
              {project.stack.map((stack) => (
                <span
                  className="rounded-full bg-white/5 px-2.5 py-1 text-[0.68rem] font-semibold text-slate-300"
                  key={stack}
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
          <button
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-white/40 hover:text-white"
            type="button"
            aria-label={expanded ? "Hide project details" : "Show project details"}
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            <svg
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        <p className={`mt-5 text-sm leading-7 text-slate-300 ${expanded ? "" : "line-clamp-3"}`}>
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              className="rounded-lg border border-white/10 bg-black/10 px-2.5 py-1.5 font-mono text-[0.68rem] text-cyan-100"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>

        {expanded && (
          <div className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm text-slate-300">
            {project.belongsTo && (
              <p>
                <span className="font-semibold text-white">{project.belongsTo.type}:</span>{" "}
                {project.belongsTo.name}
              </p>
            )}
            {project.members && project.members.length > 0 && (
              <div>
                <span className="font-semibold text-white">Team:</span>{" "}
                {project.members.map((member) => member.name).join(", ")}
              </div>
            )}
            {project.instructor && (
              <p>
                <span className="font-semibold text-white">Instructor:</span>{" "}
                {project.instructor.name}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
          <ExternalLink href={project.githubFrontend} label="Frontend" />
          <ExternalLink href={project.githubBackend} label="Backend" />
          <ExternalLink href={project.liveDemo} label="Live demo" />
          <ExternalLink href={project.backendServer} label="API" />
        </div>
      </div>
    </article>
  );
}
