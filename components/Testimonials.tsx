const TESTIMONIALS = [
  {
    client: "Blaise Majewski",
    quote:
      "We plan to work with them again in the future. They were exceptional.",
    ratings: [
      { label: "Quality of delivery", score: 5 },
      { label: "Value of delivery", score: 5 },
      { label: "Communication level", score: 5 },
    ],
    highlights: ["Went above and beyond", "Professionalism of work"],
  },
];

function Stars({ score }: { score: number }) {
  return (
    <span
      className="whitespace-nowrap text-sm tracking-[2px] text-amber-400"
      aria-label={`${score} out of 5 stars`}
    >
      {"★".repeat(score)}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[var(--surface)] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[3px] text-purple">
          Client testimonials
        </div>
        <h2 className="s-title mb-12 font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[-2.5px]">
          Trusted by clients.
        </h2>

        <div className="grid gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <article
              className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg)] shadow-[0_18px_60px_rgba(0,0,0,0.05)]"
              key={testimonial.client}
            >
              <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
                <div className="relative border-b border-[var(--border)] p-8 md:p-12 lg:border-b-0 lg:border-r">
                  <div
                    className="mb-6 font-display text-6xl font-black leading-none text-purple/20"
                    aria-hidden="true"
                  >
                    “
                  </div>
                  <blockquote className="max-w-3xl font-display text-[clamp(1.65rem,3vw,2.7rem)] font-bold leading-[1.2] tracking-[-1.5px]">
                    {testimonial.quote}
                  </blockquote>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple text-sm font-bold uppercase text-white">
                      {testimonial.client
                        .split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-display text-base font-black tracking-[-0.4px]">
                        {testimonial.client}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[1.5px] text-[var(--muted)]">
                        Client
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-10 p-8 md:p-12">
                  <div>
                    <div className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[2px] text-[var(--muted)]">
                      Delivery ratings
                    </div>
                    <div className="space-y-4">
                      {testimonial.ratings.map((rating) => (
                        <div
                          className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0"
                          key={rating.label}
                        >
                          <span className="text-sm font-semibold">
                            {rating.label}
                          </span>
                          <Stars score={rating.score} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[2px] text-[var(--muted)]">
                      Things that went well
                    </div>
                    <ul className="space-y-3">
                      {testimonial.highlights.map((highlight) => (
                        <li
                          className="flex items-center gap-3 text-sm font-semibold"
                          key={highlight}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E8FFF4] text-xs text-[#0F766E] dark:bg-[#123328] dark:text-[#2dd4bf]">
                            ✓
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
