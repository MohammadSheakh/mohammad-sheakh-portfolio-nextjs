export type ProjectStatus = "On Going" | "Finished" | "Sold" | "Archived";

export interface ProjectMember {
  name: string;
  profileUrl?: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ProjectStatus;
  stack: string[];
  technologies: string[];
  images: string[];
  accent: string;
  githubFrontend?: string;
  githubBackend?: string;
  liveDemo?: string;
  backendServer?: string;
  belongsTo?: {
    type: "Course" | "Team" | "Project";
    name: string;
  };
  members?: ProjectMember[];
  instructor?: {
    name: string;
    profileUrl?: string;
  };
}

// Seed projects keep the archive useful before the projects API is connected.
export const INITIAL_PROJECTS: Project[] = [
  {
    id: "alora-rental",
    title: "Alora Rental",
    description:
      "A multi-role apartment management platform connecting owners, renters, crews, agents, and administrators through one production-ready API.",
    category: "Backend Platform",
    status: "On Going",
    stack: ["PERN"],
    technologies: ["NestJS", "Prisma", "PostgreSQL", "TypeScript"],
    images: [],
    accent: "linear-gradient(135deg, #6d5bd0 0%, #34277d 100%)",
    githubBackend: "https://github.com/mohammadSheakh",
  },
  {
    id: "task-management-system",
    title: "Task Management System",
    description:
      "Production-grade task workflows for individuals, families, and teams with real-time synchronization, subscriptions, and automated notifications.",
    category: "Real-time System",
    status: "Finished",
    stack: ["MERN"],
    technologies: ["Express.js", "MongoDB", "BullMQ", "Socket.IO"],
    images: [],
    accent: "linear-gradient(135deg, #0f766e 0%, #123328 100%)",
    githubBackend: "https://github.com/mohammadSheakh",
  },
  {
    id: "suplify-health-platform",
    title: "Suplify — Health Platform",
    description:
      "A health and wellness backend with real-time messaging, appointment scheduling, event streams, secure payments, and push notifications.",
    category: "Health Tech",
    status: "Finished",
    stack: ["MERN", "Serverless"],
    technologies: ["Node.js", "Kafka", "Firebase", "AWS S3", "Stripe"],
    images: [],
    accent: "linear-gradient(135deg, #f97316 0%, #7c2d12 100%)",
    githubBackend: "https://github.com/mohammadSheakh",
  },
  {
    id: "kaaj-bd",
    title: "Kaaj BD — Service Marketplace",
    description:
      "A multi-role marketplace for service providers and customers featuring real-time chat, audio calling, and a reusable inheritance architecture.",
    category: "Marketplace",
    status: "Finished",
    stack: ["MERN"],
    technologies: ["Express.js", "MongoDB", "Agora", "Socket.IO"],
    images: [],
    accent: "linear-gradient(135deg, #2563eb 0%, #172554 100%)",
    githubBackend: "https://github.com/mohammadSheakh",
  },
];
