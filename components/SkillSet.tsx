const SKILL_GROUPS = [
  {
    title: "Language",
    rows: [
      {
        label: "Front-end",
        skills: ["HTML", "Tailwind CSS", "JavaScript"],
      },
      {
        label: "Back-end",
        skills: ["Node.js", "PHP", "MongoDB"],
      },
    ],
  },
  {
    title: "Technologies",
    rows: [
      {
        label: "UI Related",
        skills: ["HTML", "Tailwind CSS", "JavaScript"],
      },
      {
        label: "FE Related",
        skills: ["Node.js", "PHP", "MongoDB"],
      },
    ],
  },
];

export default function SkillSet() {
  return (
    <section className="min-h-[500px] bg-footerColor px-6 py-20 text-gray-200 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center font-sans text-[clamp(1.75rem,3vw,2.25rem)] font-normal tracking-wide">
          Language and framework I have been working on
        </h2>

        <div className="space-y-9">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 font-sans text-2xl font-medium text-white">
                {group.title}
              </h3>

              <div className="space-y-3">
                {group.rows.map((row) => (
                  <div
                    className="grid gap-3 sm:grid-cols-[minmax(150px,220px)_1fr] sm:items-center"
                    key={row.label}
                  >
                    <div className="text-lg text-slate-300 sm:text-center">
                      {row.label}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {row.skills.map((skill) => (
                        <span
                          className="rounded-lg bg-slate-300/80 px-2 py-1 text-lg leading-tight text-slate-950 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
