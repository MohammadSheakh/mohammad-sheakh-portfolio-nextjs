"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import RichTextEditor from "../timeline/RichTextEditor";
import { sanitizeRichText } from "../timeline/rich-text";
import {
  loadStoredArticles,
  saveStoredArticles,
  slugify,
  type Article,
  type ArticlePage,
} from "./article-data";
import useAdminState from "./useAdminState";

interface ArticleReaderProps {
  slug: string;
  initialEdit?: boolean;
}

interface ReaderPage {
  id: string;
  title: string;
  contentHtml: string;
  pageIndex: number;
  subPageIndex?: number;
  parentTitle?: string;
  isIndex: boolean;
}

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100";

const cloneArticle = (article: Article) =>
  JSON.parse(JSON.stringify(article)) as Article;

export default function ArticleReader({
  slug,
  initialEdit = false,
}: ArticleReaderProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [savedArticle, setSavedArticle] = useState<Article | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const adminState = useAdminState();
  const router = useRouter();

  // Load local content first, then refresh from the optional article API.
  useEffect(() => {
    const localArticle = loadStoredArticles().find((item) => item.slug === slug) ?? null;
    let active = true;

    const applyArticle = (nextArticle: Article | null) => {
      if (!active) return;
      setArticle(nextArticle ? cloneArticle(nextArticle) : null);
      setSavedArticle(nextArticle ? cloneArticle(nextArticle) : null);
      setSelectedId(nextArticle?.pages[0]?.id ?? "");
      setLoaded(true);
    };

    applyArticle(localArticle);

    const loadRemoteArticle = async () => {
      const articlesApiUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL;
      if (!articlesApiUrl) return;

      try {
        const response = await fetch(`${articlesApiUrl}/${slug}`, {
          credentials: "include",
        });
        if (!response.ok) return;
        const result: unknown = await response.json();
        const remoteArticle =
          result && typeof result === "object" && "data" in result
            ? (result as { data?: Article }).data
            : (result as Article);
        if (remoteArticle) applyArticle(remoteArticle);
      } catch {
        applyArticle(localArticle);
      }
    };

    loadRemoteArticle();
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (initialEdit && adminState === "admin") setEditing(true);
  }, [adminState, initialEdit]);

  // Flatten the hierarchy for selected-page and previous/next navigation.
  const readerPages = useMemo<ReaderPage[]>(
    () =>
      article?.pages.flatMap((page, pageIndex) => [
        {
          id: page.id,
          title: page.title,
          contentHtml: page.contentHtml,
          pageIndex,
          isIndex: Boolean(page.isIndex),
        },
        ...page.subPages.map((subPage, subPageIndex) => ({
          id: subPage.id,
          title: subPage.title,
          contentHtml: subPage.contentHtml,
          pageIndex,
          subPageIndex,
          parentTitle: page.title,
          isIndex: false,
        })),
      ]) ?? [],
    [article],
  );

  const selectedIndex = Math.max(
    readerPages.findIndex((page) => page.id === selectedId),
    0,
  );
  const selectedPage = readerPages[selectedIndex];
  const selectedParent = selectedPage
    ? article?.pages[selectedPage.pageIndex]
    : undefined;

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-PrimaryColorDark text-slate-300">
        Loading article...
      </main>
    );
  }

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-PrimaryColorDark px-6 text-center text-slate-300">
        <div>
          <h1 className="font-display text-4xl font-black text-white">Article not found.</h1>
          <Link className="mt-6 inline-flex text-cyan-300 hover:underline" href="/articles">
            ← Return to articles
          </Link>
        </div>
      </main>
    );
  }

  const selectPage = (id: string) => {
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateArticle = <Key extends keyof Article>(
    field: Key,
    value: Article[Key],
  ) => setArticle((current) => (current ? { ...current, [field]: value } : current));

  // Update only the document currently selected in the table of contents.
  const updateSelectedPage = (field: "title" | "contentHtml" | "isIndex", value: string | boolean) => {
    if (!selectedPage) return;

    setArticle((current) => {
      if (!current) return current;
      return {
        ...current,
        pages: current.pages.map((page, pageIndex) => {
          if (pageIndex !== selectedPage.pageIndex) return page;
          if (selectedPage.subPageIndex === undefined) {
            return {
              ...page,
              [field]: value,
              ...(field === "title" ? { slug: slugify(String(value)) } : {}),
            };
          }
          if (field === "isIndex") return page;
          return {
            ...page,
            subPages: page.subPages.map((subPage, subPageIndex) =>
              subPageIndex === selectedPage.subPageIndex
                ? {
                    ...subPage,
                    [field]: value,
                    ...(field === "title" ? { slug: slugify(String(value)) } : {}),
                  }
                : subPage,
            ),
          };
        }),
      };
    });
  };

  const addPage = () => {
    const newPage: ArticlePage = {
      id: crypto.randomUUID(),
      title: `Page ${article.pages.length + 1}`,
      slug: `page-${article.pages.length + 1}`,
      contentHtml: "",
      isIndex: false,
      subPages: [],
    };
    updateArticle("pages", [...article.pages, newPage]);
    setSelectedId(newPage.id);
  };

  const addSubPage = (pageIndex: number) => {
    const parent = article.pages[pageIndex];
    const newSubPage = {
      id: crypto.randomUUID(),
      title: `Subpage ${parent.subPages.length + 1}`,
      slug: `subpage-${parent.subPages.length + 1}`,
      contentHtml: "",
    };
    setArticle((current) =>
      current
        ? {
            ...current,
            pages: current.pages.map((page, index) =>
              index === pageIndex
                ? { ...page, subPages: [...page.subPages, newSubPage] }
                : page,
            ),
          }
        : current,
    );
    setSelectedId(newSubPage.id);
  };

  const removePage = (pageIndex: number) => {
    if (article.pages.length === 1) {
      setError("An article must contain at least one page.");
      return;
    }
    const page = article.pages[pageIndex];
    const confirmed = window.confirm(
      `Delete "${page.title}" and all of its subpages? This cannot be undone after saving.`,
    );
    if (!confirmed) return;

    const nextPages = article.pages.filter((_, index) => index !== pageIndex);
    updateArticle("pages", nextPages);
    setSelectedId(nextPages[Math.min(pageIndex, nextPages.length - 1)].id);
  };

  const removeSubPage = (pageIndex: number, subPageIndex: number) => {
    const parent = article.pages[pageIndex];
    const subPage = parent.subPages[subPageIndex];
    const confirmed = window.confirm(
      `Delete the subpage "${subPage.title}"? This cannot be undone after saving.`,
    );
    if (!confirmed) return;

    const nextSubPages = parent.subPages.filter((_, index) => index !== subPageIndex);
    setArticle((current) =>
      current
        ? {
            ...current,
            pages: current.pages.map((page, index) =>
              index === pageIndex ? { ...page, subPages: nextSubPages } : page,
            ),
          }
        : current,
    );
    setSelectedId(parent.id);
  };

  const cancelEditing = () => {
    if (savedArticle) setArticle(cloneArticle(savedArticle));
    setEditing(false);
    setError("");
    router.replace(`/articles/${slug}`);
  };

  // Save the complete hierarchy while editing only one document at a time.
  const saveArticle = async () => {
    setError("");
    if (!article.title.trim() || !article.category.trim() || !article.excerpt.trim()) {
      setError("Title, category, and excerpt are required.");
      return;
    }

    const sanitizedArticle: Article = {
      ...article,
      slug: slugify(article.slug || article.title),
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

    setSaving(true);
    try {
      const storedArticles = loadStoredArticles();
      const articleExists = storedArticles.some(
        (item) => item.id === sanitizedArticle.id,
      );
      const nextArticles = articleExists
        ? storedArticles.map((item) =>
            item.id === sanitizedArticle.id ? sanitizedArticle : item,
          )
        : [sanitizedArticle, ...storedArticles];
      const articlesApiUrl = process.env.NEXT_PUBLIC_ARTICLES_API_URL;
      if (articlesApiUrl) {
        const response = await fetch(`${articlesApiUrl}/${slug}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedArticle),
        });
        if (!response.ok) throw new Error("Article save failed");
      }
      saveStoredArticles(nextArticles);
      setArticle(cloneArticle(sanitizedArticle));
      setSavedArticle(cloneArticle(sanitizedArticle));
      setEditing(false);
      router.replace(`/articles/${sanitizedArticle.slug}`);
    } catch {
      setError("The article could not be saved. Check the API and admin session.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef8fb] px-4 pb-12 pt-28 text-slate-900 md:px-8">
      <div className={`mx-auto grid max-w-7xl gap-5 ${editing ? "lg:grid-cols-[390px_minmax(0,1fr)]" : "lg:grid-cols-[330px_minmax(0,1fr)]"}`}>
        {/* Article navigation also becomes the admin page-management panel. */}
        <aside className="self-start rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          <Link className="text-xs font-bold uppercase tracking-[1.5px] text-cyan-700" href="/articles">
            ← All articles
          </Link>

          {editing ? (
            <details className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <summary className="cursor-pointer text-sm font-bold text-slate-900">
                Article details
              </summary>
              <div className="mt-4 space-y-3">
                <label className="block text-xs font-semibold text-slate-600">
                  Title
                  <input className={fieldClassName} value={article.title} onChange={(event) => updateArticle("title", event.target.value)} />
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  URL slug
                  <input className={fieldClassName} value={article.slug} onChange={(event) => updateArticle("slug", slugify(event.target.value))} />
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Category
                  <input className={fieldClassName} value={article.category} onChange={(event) => updateArticle("category", event.target.value)} />
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Tags (comma separated)
                  <input className={fieldClassName} value={article.tags.join(", ")} onChange={(event) => updateArticle("tags", event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} />
                </label>
                <label className="block text-xs font-semibold text-slate-600">
                  Excerpt
                  <textarea className={`${fieldClassName} min-h-24 resize-y`} value={article.excerpt} onChange={(event) => updateArticle("excerpt", event.target.value)} />
                </label>
              </div>
            </details>
          ) : (
            <div className="mt-5 rounded-2xl bg-PrimaryColorDark p-6 text-white">
              <div className="text-[0.65rem] font-bold uppercase tracking-[2px] text-cyan-300">{article.category}</div>
              <h1 className="mt-3 font-display text-2xl font-black leading-tight">{article.title}</h1>
              <p className="mt-3 text-xs leading-6 text-slate-400">{article.excerpt}</p>
            </div>
          )}

          <nav className="mt-6" aria-label="Article pages">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[0.68rem] font-bold uppercase tracking-[1.5px] text-slate-400">Pages</span>
              {editing && <button className="rounded-lg bg-cyan-100 px-3 py-1.5 text-xs font-bold text-cyan-900" type="button" onClick={addPage}>+ New page</button>}
            </div>
            <div className="space-y-2">
              {article.pages.map((page, pageIndex) => (
                <div className="rounded-xl border border-transparent bg-slate-50/70 p-1" key={page.id}>
                  <div className="flex items-center gap-1">
                    <button type="button" className={`min-w-0 flex-1 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${selectedId === page.id ? "bg-cyan-100 text-cyan-900" : "text-slate-700 hover:bg-slate-100"}`} onClick={() => selectPage(page.id)}>
                      <span className="block truncate">{page.title}</span>
                      {page.isIndex && <span className="text-[0.6rem] uppercase tracking-wider text-cyan-700">Section index</span>}
                    </button>
                    {editing && (
                      <>
                        <button className="rounded-md px-2 py-2 text-sm text-cyan-700 hover:bg-cyan-50" type="button" title="Add subpage" onClick={() => addSubPage(pageIndex)}>+</button>
                        <button className="rounded-md px-2 py-2 text-sm text-rose-500 hover:bg-rose-50" type="button" title="Remove page" onClick={() => removePage(pageIndex)}>×</button>
                      </>
                    )}
                  </div>
                  {page.subPages.length > 0 && (
                    <div className="ml-4 mt-1 border-l border-slate-200 pl-2">
                      {page.subPages.map((subPage, subPageIndex) => (
                        <div className="flex items-center gap-1" key={subPage.id}>
                          <button type="button" className={`min-w-0 flex-1 rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedId === subPage.id ? "bg-cyan-50 font-semibold text-cyan-800" : "text-slate-500 hover:bg-white hover:text-slate-900"}`} onClick={() => selectPage(subPage.id)}>
                            <span className="block truncate">{subPage.title}</span>
                          </button>
                          {editing && <button className="rounded-md px-2 py-2 text-sm text-rose-500 hover:bg-rose-50" type="button" title="Remove subpage" onClick={() => removeSubPage(pageIndex, subPageIndex)}>×</button>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {adminState === "admin" && (
            <div className="mt-6 grid grid-cols-2 gap-2">
              {editing ? (
                <>
                  <button className="rounded-xl border border-slate-300 px-4 py-3 text-xs font-bold uppercase tracking-[1px] text-slate-700" type="button" onClick={cancelEditing}>Cancel</button>
                  <button className="rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold uppercase tracking-[1px] text-white disabled:opacity-40" type="button" disabled={saving} onClick={saveArticle}>{saving ? "Saving..." : "Save all"}</button>
                </>
              ) : (
                <button className="col-span-2 rounded-xl bg-slate-950 px-4 py-3 text-xs font-bold uppercase tracking-[1px] text-white" type="button" onClick={() => setEditing(true)}>Edit article</button>
              )}
            </div>
          )}
          {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{error}</p>}
        </aside>

        {/* Only the selected page document is shown or edited. */}
        <article className="min-h-[720px] rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-14">
          {!editing && (
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-6">
              <div className="text-xs text-slate-400">
                {selectedPage?.parentTitle ? `${selectedPage.parentTitle} / ` : ""}
                <span className="font-semibold text-slate-700">{selectedPage?.title}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" className="rounded-full bg-rose-500 px-5 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-30" disabled={selectedIndex === 0} onClick={() => selectPage(readerPages[selectedIndex - 1].id)}>← Previous page</button>
                <button type="button" className="rounded-full bg-rose-500 px-5 py-2 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-30" disabled={selectedIndex === readerPages.length - 1} onClick={() => selectPage(readerPages[selectedIndex + 1].id)}>Next page →</button>
              </div>
            </div>
          )}

          {selectedPage && editing ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5">
                <div>
                  <div className="text-[0.68rem] font-bold uppercase tracking-[2px] text-cyan-700">Editing selected document</div>
                  <p className="mt-1 text-sm text-slate-500">Choose another page from the sidebar without losing this draft.</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{selectedPage.subPageIndex === undefined ? "Main page" : "Subpage"}</span>
              </div>
              <label className="mt-7 block text-sm font-semibold text-slate-700">
                Page title
                <input className={`${fieldClassName} text-base`} value={selectedPage.title} onChange={(event) => updateSelectedPage("title", event.target.value)} />
              </label>
              {selectedPage.subPageIndex === undefined && (
                <label className="mt-5 flex items-start gap-3 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm text-slate-700">
                  <input className="mt-0.5 size-4 accent-cyan-700" type="checkbox" checked={selectedPage.isIndex} onChange={(event) => updateSelectedPage("isIndex", event.target.checked)} />
                  <span><strong className="block text-slate-950">This page is a section index</strong>Use it only to organize subpages; no main-page content is required.</span>
                </label>
              )}
              {selectedPage.isIndex ? (
                <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                  <h3 className="font-display text-2xl font-black text-slate-900">Index page</h3>
                  <p className="mt-2 text-sm text-slate-500">Add and select subpages from the sidebar to write their documents.</p>
                  <button className="mt-5 rounded-xl bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-900" type="button" onClick={() => addSubPage(selectedPage.pageIndex)}>+ Add subpage</button>
                </div>
              ) : (
                <div className="mt-6">
                  <RichTextEditor ariaLabel={`Content for ${selectedPage.title}`} value={selectedPage.contentHtml} onChange={(value) => updateSelectedPage("contentHtml", value)} />
                </div>
              )}
            </div>
          ) : selectedPage ? (
            <div className="mt-10">
              <div className="mb-3 text-[0.68rem] font-bold uppercase tracking-[2px] text-cyan-700">Page {selectedIndex + 1} of {readerPages.length}</div>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-black leading-none tracking-[-2px] text-slate-950">{selectedPage.title}</h2>
              {selectedPage.isIndex ? (
                <div className="mt-10">
                  <p className="text-slate-600">Choose a page from this section:</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {selectedParent?.subPages.map((subPage, index) => (
                      <button className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-cyan-300 hover:bg-cyan-50" type="button" key={subPage.id} onClick={() => selectPage(subPage.id)}>
                        <span className="text-xs font-bold text-cyan-700">{String(index + 1).padStart(2, "0")}</span>
                        <span className="mt-2 block font-display text-xl font-black text-slate-900">{subPage.title}</span>
                      </button>
                    ))}
                  </div>
                  {selectedParent?.subPages.length === 0 && <p className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No subpages have been added yet.</p>}
                </div>
              ) : (
                <div className="mt-10 text-base leading-8 text-slate-700 [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-cyan-500 [&_blockquote]:bg-cyan-50 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:italic [&_font]:font-mono [&_h1]:mb-5 [&_h1]:font-display [&_h1]:text-4xl [&_h1]:font-black [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-black [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-2xl [&_h3]:font-bold [&_li]:mb-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:mb-5 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-950 [&_pre]:p-5 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:text-cyan-100 [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-7" dangerouslySetInnerHTML={{ __html: sanitizeRichText(selectedPage.contentHtml) }} />
              )}
            </div>
          ) : null}
        </article>
      </div>
    </main>
  );
}
