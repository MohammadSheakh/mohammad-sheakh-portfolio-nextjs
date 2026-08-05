"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  INITIAL_ARTICLES,
  loadStoredArticles,
  saveStoredArticles,
  type Article,
} from "./article-data";
import useAdminState from "./useAdminState";
import { richTextToPlainText } from "../timeline/rich-text";

export default function ArticleArchive() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const adminState = useAdminState();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Hydrate local articles first, then replace them with API data when configured.
  useEffect(() => {
    setArticles(loadStoredArticles());

    let active = true;
    const loadRemoteArticles = async () => {
      const articlesApiUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL;
      if (!articlesApiUrl) return;

      try {
        const response = await fetch(articlesApiUrl, { credentials: "include" });
        if (!response.ok) return;
        const result: unknown = await response.json();
        const remoteArticles = Array.isArray(result)
          ? result
          : result && typeof result === "object" && "data" in result
            ? (result as { data?: unknown }).data
            : null;

        if (active && Array.isArray(remoteArticles)) {
          const nextArticles = remoteArticles as Article[];
          setArticles(nextArticles);
          saveStoredArticles(nextArticles);
        }
      } catch {
        if (active) setArticles(loadStoredArticles());
      }
    };

    loadRemoteArticles();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((article) => article.category)))],
    [articles],
  );

  // Search article metadata plus nested page and subpage content.
  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...articles]
      .sort(
        (first, second) =>
          new Date(second.updatedAt).getTime() - new Date(first.updatedAt).getTime(),
      )
      .filter((article) => {
        const matchesCategory = category === "All" || article.category === category;
        const pageText = article.pages
          .flatMap((page) => [
            page.title,
            richTextToPlainText(page.contentHtml),
            ...page.subPages.flatMap((subPage) => [
              subPage.title,
              richTextToPlainText(subPage.contentHtml),
            ]),
          ])
          .join(" ");
        const searchableText = [
          article.title,
          article.excerpt,
          article.category,
          ...article.tags,
          pageText,
        ]
          .join(" ")
          .toLowerCase();
        return matchesCategory && searchableText.includes(normalizedQuery);
      });
  }, [articles, category, query]);

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 pb-24 pt-36 text-[var(--text)] md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Archive introduction and article discovery controls. */}
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[3px] text-purple dark:text-purple-light">
              Knowledge archive
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-4px] text-[var(--text)]">
              Articles and
              <br /> field notes.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--muted)] lg:text-right">
            Long-form notes on backend engineering, system design, real-time
            infrastructure, and lessons learned while shipping products.
          </p>
        </header>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--muted)]">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-[1px] text-[var(--muted)]">
              {adminState === "checking"
                ? "Checking session"
                : adminState === "admin"
                  ? "Admin access"
                  : "Public view"}
            </span>
            <button
              className={`relative flex size-10 items-center justify-center rounded-full border transition-colors ${
                searchOpen
                  ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--text)]"
              }`}
              type="button"
              aria-controls="article-search-panel"
              aria-expanded={searchOpen}
              aria-label={searchOpen ? "Close article search" : "Search articles"}
              onClick={() => setSearchOpen((current) => !current)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {(query || category !== "All") && (
                <span className="absolute right-0 top-0 size-2.5 rounded-full border-2 border-[var(--bg)] bg-purple" />
              )}
            </button>
            {adminState === "admin" && (
              <Link
                className="rounded-full bg-[var(--text)] px-5 py-2.5 text-xs font-bold uppercase tracking-[1px] text-[var(--bg)] transition-opacity hover:opacity-80"
                href="/articles/new"
              >
                New article +
              </Link>
            )}
          </div>
        </div>

        {/* Search expands in document flow so the article grid moves naturally. */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
            searchOpen
              ? "mt-6 grid-rows-[1fr] opacity-100"
              : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
          id="article-search-panel"
          aria-hidden={!searchOpen}
        >
          <div className="overflow-hidden">
            <section className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 md:p-7">
              <label className="relative block">
                <span className="sr-only">Search articles</span>
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]"
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
                  ref={searchInputRef}
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-4 pl-12 pr-4 text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-purple focus:ring-2 focus:ring-purple/20"
                  type="search"
                  value={query}
                  tabIndex={searchOpen ? 0 : -1}
                  placeholder="Search by title, category, page, or keyword"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>

              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[1px] transition-colors ${
                      category === item
                        ? "border-[var(--text)] bg-[var(--text)] text-[var(--bg)]"
                        : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]"
                    }`}
                    type="button"
                    tabIndex={searchOpen ? 0 : -1}
                    onClick={() => setCategory(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Filtered article cards link into the nested reader. */}
        <section className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <article
              className="group flex min-h-[390px] flex-col rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-purple/50"
              key={article.id}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-[var(--purple-pale)] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[1px] text-purple dark:text-purple-light">
                  {article.category}
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-8 font-display text-2xl font-black leading-tight text-[var(--text)]">
                {article.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {article.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span className="font-mono text-[0.68rem] text-[var(--muted)]" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <div className="text-xs leading-5 text-[var(--muted)]">
                  {article.pages.length} pages
                  <br />
                  Updated {new Date(article.updatedAt).toLocaleDateString()}
                </div>
                <Link
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors group-hover:border-[var(--text)] group-hover:bg-[var(--text)] group-hover:text-[var(--bg)]"
                  href={`/articles/${article.slug}`}
                  aria-label={`Read ${article.title}`}
                >
                  →
                </Link>
              </div>
            </article>
          ))}
        </section>

        {filteredArticles.length === 0 && (
          <div className="mt-8 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] py-20 text-center text-[var(--muted)]">
            No articles match your search and category.
          </div>
        )}
      </div>
    </main>
  );
}
