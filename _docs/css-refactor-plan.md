I will refactor the portfolio to Tailwind CSS, starting section by section to keep the design and animations crisp and maintainable.

Your project already has Tailwind CSS v3 (^3.4.4) configured in package.json and tailwind.config.ts. I will proceed with Tailwind v3.

Step-by-Step Refactoring Plan:
Step 1: Base Configuration (tailwind.config.ts & app/globals.css)

Import @tailwind base; @tailwind components; @tailwind utilities; into globals.css.
Update tailwind.config.ts with font variables (Syne, Space Grotesk, Archivo) and custom theme color palettes for light and dark modes.
Step 2: Navigation Bar (components/Nav.tsx)

Convert .navbar, .nav-capsule, .nav-links-group, .nav-expand-btn, and .btn-open-to-work to Tailwind utility classes while preserving the scroll & expand animations.
Step 3: Hero Section (components/Hero.tsx)

Refactor the hero title, custom background gradient, badge, and hero CTA buttons to Tailwind utilities.
Step 4: About Me Section (components/About.tsx)

Refactor the grid layout, typography, stats counter row, and Bento cards (SparkTech, AIUB CSE, 4+ Projects) to Tailwind utility classes.
Step 5: Remaining Sections (Marquee, StackCards, Experience, Contact, Footer)

Refactor the remaining components section by section.
I will begin with Step 1 & Step 2 (Base Setup + Navigation refactor). Please let me know if you would like any specific Tailwind customizations before I start!