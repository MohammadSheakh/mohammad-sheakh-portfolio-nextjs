export interface TimelineEntry {
  id: string;
  year: number;
  dateLabel: string;
  title: string;
  summary: string;
  details?: string;
  detailsHtml?: string;
  linkTitle?: string;
  link?: string;
  openInNewTab?: boolean;
}

// Seed milestones keep the timeline populated until the backend is connected.
export const INITIAL_TIMELINE: TimelineEntry[] = [
  {
    id: "alora-rental-2026",
    year: 2026,
    dateLabel: "Now",
    title: "Building Alora Rental",
    summary:
      "Designing a multi-role apartment platform for owners, renters, crews, agents, and administrators.",
    details:
      "The system brings billing, maintenance workflows, document management, and role-aware access into one production-ready backend.",
  },
  {
    id: "sparktech-2025",
    year: 2025,
    dateLabel: "May 2025",
    title: "Joined SparkTech Agency",
    summary:
      "Started working as a Junior Backend Developer in Dhaka.",
    details:
      "Shipping APIs, real-time systems, background jobs, payment flows, and production integrations with Node.js, NestJS, and TypeScript.",
  },
  {
    id: "aiub-graduation-2024",
    year: 2024,
    dateLabel: "August 2024",
    title: "Completed BSc in Computer Science",
    summary: "Graduated from AIUB with a 3.73 CGPA.",
    details:
      "Focused on software engineering fundamentals, system design, databases, and collaborative application development.",
  },
  {
    id: "edistys-2024",
    year: 2024,
    dateLabel: "September 2024",
    title: "Joined Edistys",
    summary: "Began professional work as a remote Junior Web Developer.",
  },
  {
    id: "cse-start-2020",
    year: 2020,
    dateLabel: "2020",
    title: "Started the engineering journey",
    summary:
      "Entered the Computer Science and Engineering program at AIUB.",
  },
];
