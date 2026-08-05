# Projects Feature

**Implementation date:** August 3, 2026  
**Primary route:** `/projects`

## What Was Implemented

The portfolio now has a dedicated projects archive built with Next.js App Router, TypeScript, and Tailwind CSS. Visitors can browse and search projects, while authenticated administrators can open a complete project creation workspace.

## User Experience

- Displays all projects in a responsive card grid.
- Searches by title, description, category, stack, and technology.
- Filters projects with generated category buttons.
- Shows project status, technologies, links, ownership details, team members, and instructor information.
- Includes a prominent **Add a new project** card.
- Shows whether the visitor has admin access or is using the public view.
- Keeps the project route connected to the shared navigation and scroll controls.

## Admin Behavior

Admin status is resolved using the existing session configuration:

- `NEXT_PUBLIC_ADMIN_PREVIEW=true` enables local admin-preview mode.
- `NEXT_PUBLIC_AUTH_ME_URL` checks the authenticated user and accepts `isAdmin`, `role`, or `user.role` admin responses.
- Guests can preview the project form but cannot submit it.

The project form supports:

- Project title and description.
- Multiple carousel images.
- Frontend and backend GitHub links.
- Live demo and backend server links.
- Project status.
- Course, team, or project ownership information.
- Dynamic team members with profile links and images.
- Optional instructor details.
- Stack and technology selections.

## Data and API Readiness

Projects use typed seed data from `components/projects/project-data.ts` when no backend is configured.

- `GET NEXT_PUBLIC_PROJECTS_API_URL` loads remote projects.
- `POST NEXT_PUBLIC_PROJECTS_API_URL` submits a new project as `FormData`.
- Requests include credentials so a future NestJS backend can use cookie-based sessions.
- Newly created projects appear immediately in local component state after a successful submission.

## Main Files

- `app/projects/page.tsx`
- `components/projects/ProjectsExplorer.tsx`
- `components/projects/ProjectCard.tsx`
- `components/projects/AddProjectModal.tsx`
- `components/projects/project-data.ts`

## Remaining Backend Work

- Implement persistent project storage.
- Add upload handling for project and member images.
- Validate all submitted fields on the server.
- Protect create, update, and delete endpoints with an admin guard.
- Return normalized project DTOs that match the frontend `Project` interface.

## Validation

- TypeScript validation passes with `tsc --noEmit`.
- Internal navigation uses Next.js `<Link>` components.
- The form and project archive are responsive across mobile and desktop layouts.
