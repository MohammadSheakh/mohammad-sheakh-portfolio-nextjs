# Timeline Feature

**Implementation date:** August 3, 2026  
**Primary route:** `/timeline`

## What Was Implemented

The portfolio now includes a personal timeline for career milestones, education, project progress, and development updates. The design adapts the previous React timeline concept to Next.js, TypeScript, and Tailwind CSS.

## User Experience

- Displays timeline updates along a responsive vertical timeline.
- Shows the year, date label, title, summary, optional details, and optional external link.
- Searches all timeline text from a single search field.
- Filters by one or multiple years.
- Shows the number of entries available for each year.
- Uses a sticky search and year-filter panel on desktop.
- Moves filters above the timeline on smaller screens.
- Displays admin-session or public-view status.

## Timeline Update Form

The **Update your timeline** action opens an accessible modal with:

- Year and human-readable date label.
- Timeline heading and summary.
- Optional plain-text details.
- Optional functional rich-text editor.
- Optional link title and URL.
- Option to open links in a new browser tab.
- Escape-key and backdrop closing behavior.
- Page scroll locking while the modal is open.

## Rich-Text Editor

The editor is functional rather than decorative. It supports:

- H1 through H6 headings.
- Blockquotes.
- Ordered and unordered lists.
- Code blocks.
- Bold, italic, underline, and monospace formatting.
- Active formatting-state indicators.

Rich HTML is sanitized before storage and before rendering. Search also converts rich content to plain text so formatted details remain searchable.

## Admin Behavior

- `NEXT_PUBLIC_ADMIN_PREVIEW=true` enables local admin-preview mode.
- `NEXT_PUBLIC_AUTH_ME_URL` checks the current session.
- Guests can inspect the update form but cannot post.
- Only an administrator can submit a timeline entry.

## Data and API Readiness

Typed sample entries are stored in `components/timeline/timeline-data.ts`.

- `GET NEXT_PUBLIC_TIMELINE_API_URL` loads remote entries.
- `POST NEXT_PUBLIC_TIMELINE_API_URL` submits a JSON timeline entry.
- Requests include credentials for future cookie-based NestJS authentication.
- Successful entries are inserted into local state immediately.

## Main Files

- `app/timeline/page.tsx`
- `components/timeline/TimelineExplorer.tsx`
- `components/timeline/AddTimelineModal.tsx`
- `components/timeline/RichTextEditor.tsx`
- `components/timeline/rich-text.ts`
- `components/timeline/timeline-data.ts`

## Remaining Backend Work

- Persist timeline entries in a database.
- Add update and delete endpoints.
- Validate and sanitize rich HTML again on the server.
- Protect mutation endpoints with an admin guard.
- Return entries in descending chronological order.

## Validation

- TypeScript validation passes with `tsc --noEmit`.
- Rich-text output is sanitized before rendering.
- Search, multi-year filtering, modal state, and responsive layouts are implemented.
