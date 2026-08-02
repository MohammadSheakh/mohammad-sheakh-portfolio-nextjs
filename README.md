# Mohammad Sheakh — Portfolio (Next.js + Tailwind)

Next.js 14 (App Router) + TypeScript + Tailwind CSS port of the original single-page
portfolio HTML, keeping the same GSAP scroll animations, custom cursor, sticky-stacked
project cards, carousel, card deck, and circle CTA.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Project structure

- `app/layout.tsx` — root layout, Google Fonts (Space Grotesk, Archivo, JetBrains Mono)
- `app/page.tsx` — assembles all sections
- `app/globals.css` — design system (CSS variables, components, keyframes), loaded after Tailwind's base/components/utilities layers
- `components/` — one component per section (Nav, Hero, Marquee, About, StackCards, Carousel, Gallery, Deck, Icons, Experience, Steps, CircleCTA, Circuit, Footer, Cursor, WaveCanvas, SectionTitleReveal)

## Notes

- Tailwind is configured (`tailwind.config.ts`) with the original color palette and font
  families available as utilities (e.g. `bg-purple`, `text-coral`, `font-display`), but
  most of the original hand-tuned CSS (gradients, clamp() typography, custom keyframes,
  the sticky-stack pinning, the card-deck fan-out, etc.) is kept as plain CSS in
  `globals.css` for pixel-fidelity with the original design — this is standard practice
  for design-heavy sites built with Tailwind.
- GSAP + ScrollTrigger power the scroll-linked animations (hero text reveal, section
  title reveals, sticky pinned project cards, staggered lists). Everything GSAP-related
  lives in small `"use client"` components.
- The animated canvas backgrounds inside the project cards are reproduced in
  `components/WaveCanvas.tsx`.
