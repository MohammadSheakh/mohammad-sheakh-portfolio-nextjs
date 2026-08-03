"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Project, ProjectStatus } from "./project-data";

const PROJECT_STATUSES: ProjectStatus[] = [
  "On Going",
  "Finished",
  "Sold",
  "Archived",
];
const BELONG_TYPES = ["Course", "Team", "Project"] as const;
const STACKS = ["MERN", "PERN", "Serverless", "React Native"];
const TECHNOLOGIES = [
  "React.js",
  "Next.js",
  "NestJS",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Redis",
  "Docker",
  "AWS",
];

interface MemberForm {
  name: string;
  profileUrl: string;
  image: File | null;
}

interface ProjectForm {
  title: string;
  description: string;
  githubFrontend: string;
  githubBackend: string;
  liveDemo: string;
  backendServer: string;
  status: ProjectStatus;
  hasBelonging: boolean;
  belongType: (typeof BELONG_TYPES)[number];
  belongName: string;
  hasMembers: boolean;
  members: MemberForm[];
  hasInstructor: boolean;
  instructorName: string;
  instructorProfileUrl: string;
  stacks: string[];
  technologies: string[];
  images: File[];
}

const INITIAL_FORM: ProjectForm = {
  title: "",
  description: "",
  githubFrontend: "",
  githubBackend: "",
  liveDemo: "",
  backendServer: "",
  status: "On Going",
  hasBelonging: false,
  belongType: "Course",
  belongName: "",
  hasMembers: false,
  members: [{ name: "", profileUrl: "", image: null }],
  hasInstructor: false,
  instructorName: "",
  instructorProfileUrl: "",
  stacks: [],
  technologies: [],
  images: [],
};

const fieldClassName =
  "mt-2 w-full rounded-lg border border-slate-500/70 bg-slate-700 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20";
const checkClassName =
  "h-4 w-4 border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900";

interface AddProjectModalProps {
  open: boolean;
  isAdmin: boolean;
  onClose: () => void;
  onCreated: (project: Project) => void;
}

export default function AddProjectModal({
  open,
  isAdmin,
  onClose,
  onCreated,
}: AddProjectModalProps) {
  const [form, setForm] = useState<ProjectForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const updateField = <Key extends keyof ProjectForm>(
    field: Key,
    value: ProjectForm[Key],
  ) => setForm((current) => ({ ...current, [field]: value }));

  const toggleListValue = (field: "stacks" | "technologies", value: string) => {
    setForm((current) => ({
      ...current,
      [field]: current[field].includes(value)
        ? current[field].filter((item) => item !== value)
        : [...current[field], value],
    }));
  };

  const updateMember = (
    index: number,
    field: keyof MemberForm,
    value: string | File | null,
  ) => {
    setForm((current) => ({
      ...current,
      members: current.members.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member,
      ),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAdmin) return;

    setSubmitting(true);
    setError("");

    const requestBody = new FormData();
    requestBody.append("projectTitle", form.title);
    requestBody.append("projectDescription", form.description);
    requestBody.append("projectStatus", form.status);
    requestBody.append("githubLinkForFrontEnd", form.githubFrontend);
    requestBody.append("githubLinkForBackEnd", form.githubBackend);
    requestBody.append("liveDemoLink", form.liveDemo);
    requestBody.append("backEndServerLink", form.backendServer);
    requestBody.append("hasProjectBelong", String(form.hasBelonging));
    requestBody.append("projectBelongType", form.belongType);
    requestBody.append("projectBelongName", form.belongName);
    requestBody.append("hasMembers", String(form.hasMembers));
    requestBody.append("hasInstructor", String(form.hasInstructor));
    requestBody.append("instructorName", form.instructorName);
    requestBody.append("instructorProfileLink", form.instructorProfileUrl);
    requestBody.append("stack", JSON.stringify(form.stacks));
    requestBody.append("technology", JSON.stringify(form.technologies));
    requestBody.append(
      "members",
      JSON.stringify(
        form.hasMembers
          ? form.members.map((member) => ({
              memberName: member.name,
              memberLink: member.profileUrl,
            }))
          : [],
      ),
    );
    form.images.forEach((image) => requestBody.append("images", image));
    form.members.forEach((member) => {
      if (member.image) requestBody.append("memberImages", member.image);
    });

    const localProject: Project = {
      id: crypto.randomUUID(),
      title: form.title,
      description: form.description,
      category: form.hasBelonging ? form.belongType : "Portfolio Project",
      status: form.status,
      stack: form.stacks,
      technologies: form.technologies,
      images: [],
      accent: "linear-gradient(135deg, #0891b2 0%, #164e63 100%)",
      githubFrontend: form.githubFrontend || undefined,
      githubBackend: form.githubBackend || undefined,
      liveDemo: form.liveDemo || undefined,
      backendServer: form.backendServer || undefined,
      belongsTo:
        form.hasBelonging && form.belongName
          ? { type: form.belongType, name: form.belongName }
          : undefined,
      members: form.hasMembers
        ? form.members
            .filter((member) => member.name)
            .map((member) => ({
              name: member.name,
              profileUrl: member.profileUrl || undefined,
            }))
        : undefined,
      instructor:
        form.hasInstructor && form.instructorName
          ? {
              name: form.instructorName,
              profileUrl: form.instructorProfileUrl || undefined,
            }
          : undefined,
    };

    const projectsApiUrl = process.env.NEXT_PUBLIC_PROJECTS_API_URL;

    try {
      if (projectsApiUrl) {
        const response = await fetch(projectsApiUrl, {
          method: "POST",
          credentials: "include",
          body: requestBody,
        });
        if (!response.ok) throw new Error("Project creation failed");
      }

      onCreated(localProject);
      setForm(INITIAL_FORM);
      onClose();
    } catch {
      setError("The project could not be created. Check your admin session and API.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-project-title"
    >
      <div className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-white/15 bg-slate-900 text-slate-200 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/95 px-5 py-4 backdrop-blur md:px-8">
          <div>
            <div className="text-[0.65rem] font-bold uppercase tracking-[2px] text-cyan-300">
              Admin workspace
            </div>
            <h2 id="new-project-title" className="mt-1 font-display text-2xl font-black text-white">
              New project
            </h2>
          </div>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:bg-white hover:text-slate-950"
            type="button"
            aria-label="Close project form"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-8 p-5 md:p-8" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Project title</span>
              <input className={fieldClassName} value={form.title} required onChange={(event) => updateField("title", event.target.value)} />
            </label>
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Project description</span>
              <textarea className={`${fieldClassName} min-h-28 resize-y`} value={form.description} required onChange={(event) => updateField("description", event.target.value)} />
            </label>
            <label className="md:col-span-2">
              <span className="text-sm font-medium">Carousel images</span>
              <input className={`${fieldClassName} file:mr-4 file:rounded-md file:border-0 file:bg-slate-600 file:px-4 file:py-2 file:text-white`} type="file" accept="image/*" multiple onChange={(event) => updateField("images", Array.from(event.target.files ?? []))} />
            </label>
            <label>
              <span className="text-sm font-medium">Frontend GitHub link</span>
              <input className={fieldClassName} type="url" value={form.githubFrontend} onChange={(event) => updateField("githubFrontend", event.target.value)} />
            </label>
            <label>
              <span className="text-sm font-medium">Backend GitHub link</span>
              <input className={fieldClassName} type="url" value={form.githubBackend} onChange={(event) => updateField("githubBackend", event.target.value)} />
            </label>
            <label>
              <span className="text-sm font-medium">Live demo link</span>
              <input className={fieldClassName} type="url" value={form.liveDemo} onChange={(event) => updateField("liveDemo", event.target.value)} />
            </label>
            <label>
              <span className="text-sm font-medium">Backend server link</span>
              <input className={fieldClassName} type="url" value={form.backendServer} onChange={(event) => updateField("backendServer", event.target.value)} />
            </label>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-white">Project status</legend>
            <div className="flex flex-wrap gap-4">
              {PROJECT_STATUSES.map((status) => (
                <label className="flex items-center gap-2 text-sm" key={status}>
                  <input className={checkClassName} type="radio" name="project-status" checked={form.status === status} onChange={() => updateField("status", status)} />
                  {status}
                </label>
              ))}
            </div>
          </fieldset>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="flex items-center justify-between gap-4 font-semibold text-white">
              Project belongs to a course, team, or project
              <input className={checkClassName} type="checkbox" checked={form.hasBelonging} onChange={(event) => updateField("hasBelonging", event.target.checked)} />
            </label>
            {form.hasBelonging && (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <fieldset>
                  <legend className="mb-3 text-sm">Belonging type</legend>
                  <div className="flex flex-wrap gap-4">
                    {BELONG_TYPES.map((type) => (
                      <label className="flex items-center gap-2 text-sm" key={type}>
                        <input className={checkClassName} type="radio" name="belong-type" checked={form.belongType === type} onChange={() => updateField("belongType", type)} />
                        {type}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label>
                  <span className="text-sm">Belonging name</span>
                  <input className={fieldClassName} value={form.belongName} onChange={(event) => updateField("belongName", event.target.value)} />
                </label>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="flex items-center justify-between gap-4 font-semibold text-white">
              Has project members
              <input className={checkClassName} type="checkbox" checked={form.hasMembers} onChange={(event) => updateField("hasMembers", event.target.checked)} />
            </label>
            {form.hasMembers && (
              <div className="mt-5 space-y-5">
                {form.members.map((member, index) => (
                  <div className="grid gap-4 rounded-xl border border-white/10 p-4 md:grid-cols-2" key={index}>
                    <label>
                      <span className="text-sm">Member {index + 1} name</span>
                      <input className={fieldClassName} value={member.name} onChange={(event) => updateMember(index, "name", event.target.value)} />
                    </label>
                    <label>
                      <span className="text-sm">Profile link</span>
                      <input className={fieldClassName} type="url" value={member.profileUrl} onChange={(event) => updateMember(index, "profileUrl", event.target.value)} />
                    </label>
                    <label className="md:col-span-2">
                      <span className="text-sm">Member image</span>
                      <input className={`${fieldClassName} file:mr-4 file:rounded-md file:border-0 file:bg-slate-600 file:px-4 file:py-2 file:text-white`} type="file" accept="image/*" onChange={(event) => updateMember(index, "image", event.target.files?.[0] ?? null)} />
                    </label>
                  </div>
                ))}
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10" type="button" onClick={() => updateField("members", [...form.members, { name: "", profileUrl: "", image: null }])}>
                    Add member
                  </button>
                  <button className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10 disabled:opacity-40" type="button" disabled={form.members.length === 1} onClick={() => updateField("members", form.members.slice(0, -1))}>
                    Remove member
                  </button>
                </div>
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <label className="flex items-center justify-between gap-4 font-semibold text-white">
              Has instructor
              <input className={checkClassName} type="checkbox" checked={form.hasInstructor} onChange={(event) => updateField("hasInstructor", event.target.checked)} />
            </label>
            {form.hasInstructor && (
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label>
                  <span className="text-sm">Instructor name</span>
                  <input className={fieldClassName} value={form.instructorName} onChange={(event) => updateField("instructorName", event.target.value)} />
                </label>
                <label>
                  <span className="text-sm">Instructor profile link</span>
                  <input className={fieldClassName} type="url" value={form.instructorProfileUrl} onChange={(event) => updateField("instructorProfileUrl", event.target.value)} />
                </label>
              </div>
            )}
          </section>

          <div className="grid gap-7 md:grid-cols-2">
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-white">Stack</legend>
              <div className="flex flex-wrap gap-3">
                {STACKS.map((stack) => (
                  <label className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm" key={stack}>
                    <input className={checkClassName} type="checkbox" checked={form.stacks.includes(stack)} onChange={() => toggleListValue("stacks", stack)} />
                    {stack}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-white">Technologies</legend>
              <div className="flex flex-wrap gap-3">
                {TECHNOLOGIES.map((technology) => (
                  <label className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm" key={technology}>
                    <input className={checkClassName} type="checkbox" checked={form.technologies.includes(technology)} onChange={() => toggleListValue("technologies", technology)} />
                    {technology}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

          <div className="sticky bottom-0 -mx-5 flex items-center justify-between gap-4 border-t border-white/10 bg-slate-900/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
            <p className={`text-xs ${isAdmin ? "text-slate-400" : "text-amber-300"}`}>
              {isAdmin
                ? "Admin authorization must also be enforced by NestJS."
                : "You need admin access to post this project."}
            </p>
            <button className="rounded-lg bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-300 disabled:opacity-60" type="submit" disabled={!isAdmin || submitting}>
              {submitting ? "Posting..." : "Post project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
