export interface ArticleSubPage {
  id: string;
  title: string;
  slug: string;
  contentHtml: string;
}

export interface ArticlePage {
  id: string;
  title: string;
  slug: string;
  contentHtml: string;
  isIndex?: boolean;
  subPages: ArticleSubPage[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  pages: ArticlePage[];
}

// Seed articles demonstrate the nested reader before persistent storage is available.
export const INITIAL_ARTICLES: Article[] = [
  {
    id: "production-backend-handbook",
    slug: "production-backend-handbook",
    title: "A practical production backend handbook",
    excerpt:
      "A structured guide to API boundaries, reliability, queues, observability, and production-minded backend engineering.",
    category: "Backend Engineering",
    tags: ["Node.js", "Architecture", "Production"],
    createdAt: "2026-05-18T10:00:00.000Z",
    updatedAt: "2026-05-29T10:00:00.000Z",
    pages: [
      {
        id: "backend-introduction",
        title: "Introduction",
        slug: "introduction",
        contentHtml:
          "<h2>Build for the real environment</h2><p>A backend is more than a collection of endpoints. It is a system of boundaries, failure modes, data guarantees, and operational decisions.</p><blockquote>Production quality begins when reliability becomes part of the design—not a final checklist.</blockquote>",
        subPages: [
          {
            id: "backend-principles",
            title: "Core principles",
            slug: "core-principles",
            contentHtml:
              "<h2>Core principles</h2><ul><li>Keep modules cohesive.</li><li>Validate data at every boundary.</li><li>Design retries to be idempotent.</li><li>Make failures observable.</li></ul>",
          },
        ],
      },
      {
        id: "backend-reliability",
        title: "Reliability",
        slug: "reliability",
        contentHtml:
          "<h2>Reliability is a feature</h2><p>Timeouts, structured logs, health checks, graceful shutdown, and useful metrics should be designed alongside business logic.</p>",
        subPages: [
          {
            id: "backend-job-queues",
            title: "Job queues",
            slug: "job-queues",
            contentHtml:
              "<h2>Background work</h2><p>Use queues for slow or retryable work. Store enough context to diagnose failures and make every processor safe to run more than once.</p><pre>await queue.add('send-email', payload, { attempts: 5 });</pre>",
          },
          {
            id: "backend-observability",
            title: "Observability",
            slug: "observability",
            contentHtml:
              "<h2>See what the system is doing</h2><p>Correlate logs, metrics, and traces with stable request identifiers so production incidents can be understood quickly.</p>",
          },
        ],
      },
    ],
  },
  {
    id: "realtime-systems-notes",
    slug: "realtime-systems-notes",
    title: "Notes on scalable real-time systems",
    excerpt:
      "Design notes for Socket.IO scaling, Redis adapters, delivery guarantees, reconnects, and presence.",
    category: "System Design",
    tags: ["Socket.IO", "Redis", "Real-time"],
    createdAt: "2025-11-08T10:00:00.000Z",
    updatedAt: "2026-02-14T10:00:00.000Z",
    pages: [
      {
        id: "realtime-foundations",
        title: "Foundations",
        slug: "foundations",
        contentHtml:
          "<h2>Start with delivery semantics</h2><p>Define what connected, delivered, acknowledged, and missed mean before choosing infrastructure.</p>",
        subPages: [],
      },
      {
        id: "realtime-scaling",
        title: "Horizontal scaling",
        slug: "horizontal-scaling",
        contentHtml:
          "<h2>Share events, not memory</h2><p>A Redis adapter lets multiple application instances coordinate rooms and broadcasts while load balancers distribute connections.</p>",
        subPages: [],
      },
    ],
  },
];

export const ARTICLE_STORAGE_KEY = "portfolio-articles";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "untitled";
}

export function loadStoredArticles() {
  if (typeof window === "undefined") return INITIAL_ARTICLES;

  try {
    const stored = window.localStorage.getItem(ARTICLE_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Article[]) : INITIAL_ARTICLES;
  } catch {
    return INITIAL_ARTICLES;
  }
}

export function saveStoredArticles(articles: Article[]) {
  window.localStorage.setItem(ARTICLE_STORAGE_KEY, JSON.stringify(articles));
}

// New articles start with one required introduction page.
export function createBlankArticle(): Article {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    slug: "",
    title: "",
    excerpt: "",
    category: "",
    tags: [],
    createdAt: now,
    updatedAt: now,
    pages: [
      {
        id: crypto.randomUUID(),
        title: "Introduction",
        slug: "introduction",
        contentHtml: "",
        isIndex: false,
        subPages: [],
      },
    ],
  };
}
