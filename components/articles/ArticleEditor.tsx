"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "../timeline/RichTextEditor";
import { sanitizeRichText } from "../timeline/rich-text";
import {
  createBlankArticle,
  loadStoredArticles,
  saveStoredArticles,
  slugify,
  type Article,
  type ArticlePage,
} from "./article-data";
import useAdminState from "./useAdminState";

interface ArticleEditorProps {
  articleSlug?: string;
}

const fieldClassName =
  "mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-purple focus:ring-2 focus:ring-purple/20";

export default function ArticleEditor({ articleSlug }: ArticleEditorProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const adminState = useAdminState();
  const router = useRouter();

  // Create a blank article or load an existing local/API article for editing.
  useEffect(() => {
    let active = true;

    const loadArticle = async () => {
      if (!articleSlug) {
        const blankArticle = createBlankArticle();
        setArticle(blankArticle);
        setTagsInput("");
        setLoaded(true);
        return;
      }

      let nextArticle =
        loadStoredArticles().find((item) => item.slug === articleSlug) ?? null;
      const articlesApiUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL;

      if (articlesApiUrl) {
        try {
          const response = await fetch(`${articlesApiUrl}/${articleSlug}`, {
            credentials: "include",
          });
          if (response.ok) {
            const result: unknown = await response.json();
            nextArticle =
              result && typeof result === "object" && "data" in result
                ? ((result as { data?: Article }).data ?? null)
                : (result as Article);
          }
        } catch {
          nextArticle =
            loadStoredArticles().find((item) => item.slug === articleSlug) ?? null;
        }
      }

      if (active) {
        setArticle(nextArticle);
        setTagsInput(nextArticle?.tags.join(", ") ?? "");
        setLoaded(true);
      }
    };

    loadArticle();
    return () => {
      active = false;
    };
  }, [articleSlug]);

  if (adminState === "checking" || !loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] text-[var(--muted)]">
        Loading article workspace...
      </main>
    );
  }

  if (adminState !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-center text-[var(--muted)]">
        <div>
          <h1 className="font-display text-4xl font-black text-[var(--text)]">Admin access required.</h1>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Sign in as an administrator to create or edit articles.
          </p>
          <Link className="mt-6 inline-flex text-purple hover:underline dark:text-purple-light" href="/articles">
            ← Return to articles
          </Link>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-6 text-center text-[var(--muted)]">
        <div>
          <h1 className="font-display text-4xl font-black text-[var(--text)]">Article not found.</h1>
          <Link className="mt-6 inline-flex text-purple hover:underline dark:text-purple-light" href="/articles">
            ← Return to articles
          </Link>
        </div>
      </main>
    );
  }

  const updateArticle = <Key extends keyof Article>(
    field: Key,
    value: Article[Key],
  ) => setArticle((current) => (current ? { ...current, [field]: value } : current));

  // Update one page without mutating the nested article state.
  const updatePage = <Key extends keyof ArticlePage>(
    pageIndex: number,
    field: Key,
    value: ArticlePage[Key],
  ) => {
    setArticle((current) =>
      current
        ? {
            ...current,
            pages: current.pages.map((page, index) =>
              index === pageIndex ? { ...page, [field]: value } : page,
            ),
          }
        : current,
    );
  };

  // Update one nested subpage and keep its slug synchronized with its title.
  const updateSubPage = (
    pageIndex: number,
    subPageIndex: number,
    field: "title" | "contentHtml",
    value: string,
  ) => {
    setArticle((current) =>
      current
        ? {
            ...current,
            pages: current.pages.map((page, index) =>
              index === pageIndex
                ? {
                    ...page,
                    subPages: page.subPages.map((subPage, nestedIndex) =>
                      nestedIndex === subPageIndex
                        ? {
                            ...subPage,
                            [field]: value,
                            ...(field === "title" ? { slug: slugify(value) } : {}),
                          }
                        : subPage,
                    ),
                  }
                : page,
            ),
          }
        : current,
    );
  };

  const addPage = () => {
    updateArticle("pages", [
      ...article.pages,
      {
        id: crypto.randomUUID(),
        title: `Page ${article.pages.length + 1}`,
        slug: `page-${article.pages.length + 1}`,
        contentHtml: "",
        isIndex: false,
        subPages: [],
      },
    ]);
  };

  const addSubPage = (pageIndex: number) => {
    const page = article.pages[pageIndex];
    updatePage(pageIndex, "subPages", [
      ...page.subPages,
      {
        id: crypto.randomUUID(),
        title: `Subpage ${page.subPages.length + 1}`,
        slug: `subpage-${page.subPages.length + 1}`,
        contentHtml: "",
      },
    ]);
  };

  const removePage = (pageIndex: number) => {
    if (article.pages.length === 1) {
      setError("An article must contain at least one page.");
      return;
    }
    updateArticle(
      "pages",
      article.pages.filter((_, index) => index !== pageIndex),
    );
  };

  const removeSubPage = (pageIndex: number, subPageIndex: number) => {
    const page = article.pages[pageIndex];
    updatePage(
      pageIndex,
      "subPages",
      page.subPages.filter((_, index) => index !== subPageIndex),
    );
  };

  // Sanitize nested content, persist locally, and sync through the optional API.
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const articleSlugValue = slugify(article.slug || article.title);
    const sanitizedArticle: Article = {
      ...article,
      slug: articleSlugValue,
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      updatedAt: new Date().toISOString(),
      pages: article.pages.map((page) => ({
        ...page,
        slug: slugify(page.slug || page.title),
        contentHtml: page.isIndex ? "" : sanitizeRichText(page.contentHtml),
        subPages: page.subPages.map((subPage) => ({
          ...subPage,
          slug: slugify(subPage.slug || subPage.title),
          contentHtml: sanitizeRichText(subPage.contentHtml),
        })),
      })),
    };

    if (!sanitizedArticle.title || !sanitizedArticle.category || !sanitizedArticle.excerpt) {
      setError("Title, category, and excerpt are required.");
      return;
    }

    setSaving(true);
    try {
      const currentArticles = loadStoredArticles();
      const existingIndex = currentArticles.findIndex(
        (item) => item.id === sanitizedArticle.id,
      );
      const nextArticles =
        existingIndex >= 0
          ? currentArticles.map((item, index) =>
              index === existingIndex ? sanitizedArticle : item,
            )
          : [sanitizedArticle, ...currentArticles];

      const articlesApiUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL;
      if (articlesApiUrl) {
        const endpoint = articleSlug
          ? `${articlesApiUrl}/${articleSlug}`
          : articlesApiUrl;
        const response = await fetch(endpoint, {
          method: articleSlug ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedArticle),
        });
        if (!response.ok) throw new Error("Article save failed");
      }

      saveStoredArticles(nextArticles);
      router.push(`/articles/${sanitizedArticle.slug}`);
    } catch {
      setError("The article could not be saved. Check the API and admin session.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-5 pb-24 pt-32 text-[var(--text)] md:px-12">
      <form className="mx-auto max-w-6xl" onSubmit={handleSubmit}>
        {/* Article-level metadata and primary save actions. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[0.68rem] font-bold uppercase tracking-[3px] text-purple dark:text-purple-light">
              {articleSlug ? "Edit article" : "Create article"}
            </div>
            <h1 className="mt-3 font-display text-[clamp(2.8rem,6vw,5rem)] font-black leading-none text-[var(--text)]">
              Article workspace.
            </h1>
          </div>
          <div className="flex gap-3">
            <Link
              className="rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--muted)] hover:text-[var(--text)]"
              href={articleSlug ? `/articles/${articleSlug}` : "/articles"}
            >
              Cancel
            </Link>
            <button
              className="rounded-xl bg-[var(--text)] px-6 py-3 text-sm font-bold text-[var(--bg)] disabled:cursor-not-allowed disabled:opacity-40"
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save article"}
            </button>
          </div>
        </div>

        <section className="mt-10 rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="text-sm text-[var(--muted)]">
              Article title
              <input
                className={fieldClassName}
                type="text"
                required
                value={article.title}
                onChange={(event) => {
                  updateArticle("title", event.target.value);
                  if (!articleSlug) updateArticle("slug", slugify(event.target.value));
                }}
              />
            </label>
            <label className="text-sm text-[var(--muted)]">
              URL slug
              <input
                className={fieldClassName}
                type="text"
                required
                value={article.slug}
                onChange={(event) => updateArticle("slug", slugify(event.target.value))}
              />
            </label>
            <label className="text-sm text-[var(--muted)]">
              Category
              <input
                className={fieldClassName}
                type="text"
                required
                placeholder="Backend Engineering"
                value={article.category}
                onChange={(event) => updateArticle("category", event.target.value)}
              />
            </label>
            <label className="text-sm text-[var(--muted)]">
              Tags <span className="opacity-70">(comma separated)</span>
              <input
                className={fieldClassName}
                type="text"
                placeholder="Node.js, Architecture, API"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
              />
            </label>
          </div>
          <label className="mt-6 block text-sm text-[var(--muted)]">
            Article excerpt
            <textarea
              className={`${fieldClassName} min-h-28 resize-y`}
              required
              value={article.excerpt}
              onChange={(event) => updateArticle("excerpt", event.target.value)}
            />
          </label>
        </section>

        <div className="mt-10 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black text-[var(--text)]">Pages and subpages</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Build the article like a small book with nested navigation.
            </p>
          </div>
          <button
            className="shrink-0 rounded-xl border border-purple/50 px-5 py-3 text-xs font-bold uppercase tracking-[1px] text-purple hover:bg-[var(--purple-pale)] dark:text-purple-light"
            type="button"
            onClick={addPage}
          >
            Add page +
          </button>
        </div>

        {/* Nested page editors contain their own editable subpage collections. */}
        <div className="mt-6 space-y-8">
          {article.pages.map((page, pageIndex) => (
            <section
              className="rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 md:p-7"
              key={page.id}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs font-bold text-purple dark:text-purple-light">
                  PAGE {String(pageIndex + 1).padStart(2, "0")}
                </span>
                <button
                  className="text-xs font-semibold text-rose-600 hover:text-rose-500 dark:text-rose-300 dark:hover:text-rose-200"
                  type="button"
                  onClick={() => removePage(pageIndex)}
                >
                  Remove page
                </button>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <label className="text-sm text-[var(--muted)]">
                  Page title
                  <input
                    className={fieldClassName}
                    type="text"
                    required
                    value={page.title}
                    onChange={(event) => {
                      updatePage(pageIndex, "title", event.target.value);
                      updatePage(pageIndex, "slug", slugify(event.target.value));
                    }}
                  />
                </label>
                <label className="text-sm text-[var(--muted)]">
                  Page slug
                  <input
                    className={fieldClassName}
                    type="text"
                    required
                    value={page.slug}
                    onChange={(event) =>
                      updatePage(pageIndex, "slug", slugify(event.target.value))
                    }
                  />
                </label>
              </div>
              <label className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-sm text-[var(--muted)]">
                <input
                  className="mt-0.5 size-4 accent-purple"
                  type="checkbox"
                  checked={Boolean(page.isIndex)}
                  onChange={(event) =>
                    updatePage(pageIndex, "isIndex", event.target.checked)
                  }
                />
                <span>
                  <strong className="block text-[var(--text)]">Use as a section index</strong>
                  This page organizes subpages and does not need its own document.
                </span>
              </label>
              {!page.isIndex && (
                <div className="mt-5">
                  <RichTextEditor
                    ariaLabel={`Content for ${page.title}`}
                    value={page.contentHtml}
                    onChange={(value) => updatePage(pageIndex, "contentHtml", value)}
                  />
                </div>
              )}

              <div className="mt-7 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
                <h3 className="font-display text-xl font-black text-[var(--text)]">Subpages</h3>
                <button
                  className="rounded-lg border border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--muted)] hover:border-purple hover:text-purple dark:hover:text-purple-light"
                  type="button"
                  onClick={() => addSubPage(pageIndex)}
                >
                  Add subpage +
                </button>
              </div>

              <div className="mt-5 space-y-5">
                {page.subPages.map((subPage, subPageIndex) => (
                  <div
                    className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5"
                    key={subPage.id}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-bold uppercase tracking-[1px] text-[var(--muted)]">
                        Subpage {subPageIndex + 1}
                      </span>
                      <button
                        className="text-xs text-rose-600 dark:text-rose-300"
                        type="button"
                        onClick={() => removeSubPage(pageIndex, subPageIndex)}
                      >
                        Remove
                      </button>
                    </div>
                    <label className="mt-4 block text-sm text-[var(--muted)]">
                      Subpage title
                      <input
                        className={fieldClassName}
                        type="text"
                        required
                        value={subPage.title}
                        onChange={(event) =>
                          updateSubPage(
                            pageIndex,
                            subPageIndex,
                            "title",
                            event.target.value,
                          )
                        }
                      />
                    </label>
                    <div className="mt-5">
                      <RichTextEditor
                        ariaLabel={`Content for ${subPage.title}`}
                        value={subPage.contentHtml}
                        onChange={(value) =>
                          updateSubPage(pageIndex, subPageIndex, "contentHtml", value)
                        }
                      />
                    </div>
                  </div>
                ))}
                {page.subPages.length === 0 && (
                  <p className="rounded-xl border border-dashed border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
                    No subpages yet.
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>

        {error && (
          <p className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
            {error}
          </p>
        )}

        <div className="mt-8 flex justify-end">
          <button
            className="rounded-xl bg-[var(--text)] px-7 py-3.5 text-sm font-bold text-[var(--bg)] disabled:opacity-40"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save article"}
          </button>
        </div>
      </form>
    </main>
  );
}
