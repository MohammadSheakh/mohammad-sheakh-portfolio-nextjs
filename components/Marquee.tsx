const TECHS = [
  "Node.js",
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "BullMQ",
  "Socket.io",
  "Docker",
  "AWS S3",
  "Stripe",
  "Prisma",
  "Firebase",
  "Kafka",
  "Agora",
];

export default function Marquee() {
  // Duplicate the list to create a seamless CSS marquee loop.
  const items = [...TECHS, ...TECHS];
  return (
    <div className="overflow-hidden border-y border-[var(--border)] bg-[var(--surface)] py-[0.85rem]">
      <div className="flex w-max animate-marquee gap-12">
        {items.map((t, i) => (
          <div
            className="flex items-center gap-2.5 whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[2px] text-[var(--muted)]"
            key={i}
          >
            <span className="text-[0.6rem] text-purple">◆</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
