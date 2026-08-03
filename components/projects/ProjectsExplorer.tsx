"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import AddProjectModal from "./AddProjectModal";
import ProjectCard from "./ProjectCard";
import { INITIAL_PROJECTS, type Project } from "./project-data";

type AdminState = "checking" | "admin" | "guest";

export default function ProjectsExplorer() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [adminState, setAdminState] = useState<AdminState>("checking");
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const closeModal = useCallback(() => setModalOpen(false), []);

  useEffect(() => {
    let active = true;

    const loadProjects = async () => {
      const projectsApiUrl = process.env.NEXT_PUBLIC_PROJECTS_API_URL;
      if (!projectsApiUrl) return;

      try {
        const response = await fetch(projectsApiUrl, { credentials: "include" });
        if (!response.ok) return;
        const result: unknown = await response.json();
        const remoteProjects = Array.isArray(result)
          ? result
          : result && typeof result === "object" && "data" in result
            ? (result as { data?: unknown }).data
            : null;

        if (active && Array.isArray(remoteProjects)) {
          setProjects(remoteProjects as Project[]);
        }
      } catch {
        if (active) setProjects(INITIAL_PROJECTS);
      }
    };

    loadProjects();
    return () => {
      active = false;
    };
  }, []);

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

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const searchableText = [
        project.title,
        project.description,
        project.category,
        ...project.stack,
        ...project.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, projects, query]);

  const handleAddRequest = () => {
    setNotice("");
    setModalOpen(true);
    if (adminState !== "admin") {
      setNotice(
        adminState === "checking"
          ? "Checking your admin session..."
          : "You can preview the form, but admin sign-in is required to post.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-PrimaryColorDark px-6 pb-24 pt-36 text-slate-200 md:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[3px] text-cyan-300">
              Project archive
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-4px] text-white">
              Projects that
              <br />
              became products.
            </h1>
          </div>
          <div className="max-w-md text-sm leading-7 text-slate-300 lg:text-right">
            Search backend platforms, real-time systems, marketplaces, and
            production experiments. New work is added here as it ships.
          </div>
        </header>

        <section className="mt-14 rounded-[28px] border border-white/15 bg-white/[0.04] p-5 md:p-7">
          <label className="relative block">
            <span className="sr-only">Search projects</span>
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              width="21"
              height="21"
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
              className="w-full rounded-xl border border-slate-500/60 bg-slate-700 py-4 pl-12 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
              type="search"
              value={query}
              placeholder="Search by title, stack, or technology"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[1px] transition-colors ${
                  category === item
                    ? "border-cyan-300 bg-cyan-300 text-slate-950"
                    : "border-white/15 text-slate-300 hover:border-white/40 hover:text-white"
                }`}
                type="button"
                key={item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[1px] ${
              adminState === "admin"
                ? "bg-emerald-400/10 text-emerald-300"
                : "bg-white/5 text-slate-400"
            }`}
          >
            {adminState === "checking"
              ? "Checking session"
              : adminState === "admin"
                ? "Admin access"
                : "Public view"}
          </span>
        </div>

        {notice && (
          <p className="mt-5 rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-200">
            {notice}
          </p>
        )}

        <section className="mt-8 grid gap-7 md:grid-cols-2">
          <button
            className="group flex min-h-[430px] flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-cyan-300/40 bg-cyan-300/[0.04] p-8 text-center transition-all hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-300/[0.08]"
            type="button"
            onClick={handleAddRequest}
          >
            <span className="flex h-28 w-28 items-center justify-center rounded-[28px] border border-cyan-300/50 text-cyan-300 transition-transform duration-300 group-hover:scale-105">
              <svg width="62" height="62" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <span className="mt-6 font-display text-2xl font-black text-white">
              Add a new project
            </span>
            <span className="mt-2 max-w-xs text-sm leading-6 text-slate-400">
              {adminState === "admin"
                ? "Open the project publishing workspace."
                : "Visible to everyone, available only to an authenticated admin."}
            </span>
          </button>

          {filteredProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </section>

        {filteredProjects.length === 0 && (
          <div className="mt-8 rounded-[28px] border border-white/10 py-20 text-center text-slate-400">
            No projects match this search yet.
          </div>
        )}
      </div>

      <AddProjectModal
        open={modalOpen}
        isAdmin={adminState === "admin"}
        onClose={closeModal}
        onCreated={(project) => setProjects((current) => [project, ...current])}
      />
    </main>
  );
}
