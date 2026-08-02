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
  const items = [...TECHS, ...TECHS];
  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {items.map((t, i) => (
          <div className="marquee-item" key={i}>
            <span className="marquee-dot">◆</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
