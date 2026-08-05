# Articles Feature

**Implementation date:** August 3, 2026  
**Primary archive route:** `/articles`

## What Was Implemented

The portfolio now includes a book-style article system. Visitors can browse and read articles, while authenticated administrators can create and edit articles composed of nested pages and subpages.

## Routes

- `/articles` — searchable article archive.
- `/articles/new` — admin-only article creation workspace.
- `/articles/[slug]` — individual article reader.
- `/articles/[slug]/edit` — admin-only article editing workspace.

## Article Archive

- Displays all articles as responsive cards.
- Searches article titles, excerpts, categories, tags, page titles, subpage titles, and page content.
- Generates category filters from available article data.
- Shows article page count and last update date.
- Shows the **New article** action only to administrators.
- Includes typed sample articles when no backend is available.

## Article Reader

The reader follows a book/documentation layout:

- Article information card in the sidebar.
- Nested table of contents for pages and subpages.
- Selected page rendered in the main reading area.
- Previous-page and next-page controls.
- Responsive sidebar that becomes a normal content block on mobile.
- Sanitized rich-text rendering for headings, lists, quotes, and code blocks.
- Admin-only link to edit the current article.

## Article Editor

Administrators can manage:

- Article title, URL slug, category, excerpt, and comma-separated tags.
- Rich-text content for every page.
- Any number of article pages.
- Any number of subpages under each page.
- Page and subpage titles and generated slugs.
- Addition, editing, and removal of pages and subpages.

An article must always retain at least one page. All page content is sanitized before it is stored or sent to an API.

## Authentication

- `NEXT_PUBLIC_ADMIN_PREVIEW=true` enables local admin-preview mode.
- `NEXT_PUBLIC_AUTH_ME_URL` resolves the logged-in administrator.
- Direct access to create or edit routes is blocked for guests.
- The UI does not rely only on hidden buttons; protected editor routes perform their own admin check.

## Persistence and API Readiness

Until the backend is implemented, article changes persist in browser `localStorage` under the key `portfolio-articles`.

When `NEXT_PUBLIC_ARTICLES_API_URL` is configured:

- `GET /articles-endpoint` loads all articles.
- `GET /articles-endpoint/:slug` loads one article.
- `POST /articles-endpoint` creates an article.
- `PUT /articles-endpoint/:slug` updates an article.
- Requests include credentials for cookie-based authentication.

## Data Model

An `Article` contains metadata and an ordered `pages` array. Each `ArticlePage` contains rich HTML and an ordered `subPages` array. Every article, page, and subpage has a stable ID and URL-safe slug.

The model is defined in `components/articles/article-data.ts`.

## Main Files

- `app/articles/page.tsx`
- `app/articles/new/page.tsx`
- `app/articles/[slug]/page.tsx`
- `app/articles/[slug]/edit/page.tsx`
- `components/articles/ArticleArchive.tsx`
- `components/articles/ArticleReader.tsx`
- `components/articles/ArticleEditor.tsx`
- `components/articles/article-data.ts`
- `components/articles/useAdminState.ts`

## Remaining Backend Work

- Create article, page, and subpage database entities or embedded schemas.
- Preserve page and subpage ordering.
- Add server-side slug uniqueness checks.
- Sanitize rich HTML on the server.
- Add admin guards for every mutation endpoint.
- Add delete and optional draft/publish workflows.
- Return stable DTOs matching the frontend interfaces.

## Validation

- TypeScript validation passes with `tsc --noEmit`.
- Archive, reader, creation, and editing routes are implemented.
- Nested page navigation and local persistence are functional.
