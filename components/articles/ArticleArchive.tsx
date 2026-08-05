"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
  const adminState = useAdminState();

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
    <main className="min-h-screen bg-PrimaryColorDark px-5 pb-24 pt-36 text-slate-200 md:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Archive introduction and article discovery controls. */}
        <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[3px] text-cyan-300">
              Knowledge archive
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.88] tracking-[-4px] text-white">
              Articles and
              <br /> field notes.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300 lg:text-right">
            Long-form notes on backend engineering, system design, real-time
            infrastructure, and lessons learned while shipping products.
          </p>
        </header>

        <section className="mt-14 rounded-[28px] border border-white/15 bg-white/[0.04] p-5 md:p-7">
          <label className="relative block">
            <span className="sr-only">Search articles</span>
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
              placeholder="Search by title, category, page, or keyword"
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
                onClick={() => setCategory(item)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[1px] text-slate-400">
              {adminState === "checking"
                ? "Checking session"
                : adminState === "admin"
                  ? "Admin access"
                  : "Public view"}
            </span>
            {adminState === "admin" && (
              <Link
                className="rounded-full bg-cyan-300 px-5 py-2.5 text-xs font-bold uppercase tracking-[1px] text-slate-950 transition-transform hover:scale-105"
                href="/articles/new"
              >
                New article +
              </Link>
            )}
          </div>
        </div>

        {/* Filtered article cards link into the nested reader. */}
        <section className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <article
              className="group flex min-h-[390px] flex-col rounded-[28px] border border-white/10 bg-white/[0.05] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
              key={article.id}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[1px] text-cyan-200">
                  {article.category}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-8 font-display text-2xl font-black leading-tight text-white">
                {article.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                {article.excerpt}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span className="font-mono text-[0.68rem] text-slate-500" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                <div className="text-xs leading-5 text-slate-500">
                  {article.pages.length} pages
                  <br />
                  Updated {new Date(article.updatedAt).toLocaleDateString()}
                </div>
                <Link
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-cyan-300 group-hover:bg-cyan-300 group-hover:text-slate-950"
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
          <div className="mt-8 rounded-[28px] border border-white/10 py-20 text-center text-slate-400">
            No articles match your search and category.
          </div>
        )}
      </div>
    </main>
  );
}
