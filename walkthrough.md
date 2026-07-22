# Walkthrough - Semantic Structure, Advanced CSS3, and Responsive Accessibility

We have successfully refactored the portfolio website in your workspace directory [ProFolio](file:///E:/Intership/ProFolio) into a modern, responsive, semantic, and fully accessible multi-page personal portfolio.

---

## 1. Advanced CSS3 & Layout Architecture

### CSS Grid (2D Layouts)
- **Services Grid (Home)**: Uses a responsive grid that fluidly shifts columns:
  - Mobile: `1fr` (single column)
  - Tablet: `repeat(2, 1fr)`
  - Desktop: `repeat(4, 1fr)`
- **Skills Dashboard**: Uses CSS Grid to organize your frontend capabilities, accessibility standards, and workflows into three columns on desktop.
- **Projects Showcase**: Employs CSS Grid to arrange project cards. On tablet/desktop, it displays in a 2-column format with alternating layouts (even-numbered projects reverse image and text placement).
- **Contact Layout**: On desktop, CSS Grid splits the page into a side-by-side view (contact info details column on the left, feedback message form on the right).

### Flexbox (Localized Component Alignment)
- **Header**: Flexbox aligns your brand signature with the navigation links.
- **Footer**: Flexbox structures the social brand links and centers content.
- **Form Controls**: Flexbox aligns inputs, labels, and validation feedback.

### Mobile-First Responsive Breakpoints
- Base styles are defined for mobile displays first (reducing load times and CSS complexity).
- Media query breakpoints progressively expand column structures at `@media (min-width: 768px)` (tablets) and `@media (min-width: 1200px)` (desktops).

---

## 2. Dynamic Light & Dark Theme Custom System

- **CSS Variables**: Core styles (backgrounds, text colors, inputs, borders, shadow depths, glassmorphic filters) are declared as CSS custom variables in `:root` (Dark Slate defaults) and `body.light-theme` (Light Slate overrides).
- **Smooth Toggling**: Theme toggles animate color shifts using CSS transitions.
- **Interactive Button**: We added a custom circular theme switcher button with Sun and Moon SVG icons in the navigation bar on every page.
- **Preference Persistence**: The button stores theme selections in `localStorage` and automatically defaults to your system preference (`prefers-color-scheme`).

---

## 3. WCAG 2.2 AA Accessibility & SEO Optimization

- **Landmark Elements**: Restructured layouts using semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Keyboard Tab-Navigation**: Added an invisible "Skip to main content" link as the first focusable item on all pages, and restored clear crimson outline rings (`:focus-visible`) on all interactive objects.
- **Interactive Mobile Drawer Drawer**: On mobile, the hamburger menu is keyboard-friendly. Focus is trapped inside the drawer when open, and pressing the `Escape` key closes the menu.
- **Accessible Validation Form**: When submitting invalid inputs, the form stops submission, creates an error summary box, shifts keyboard focus to it, and provides anchor links pointing directly to the invalid form field.
- **SEO & Social Graph**: Added canonical links, unique meta descriptions/keywords, and Open Graph / Twitter cards on all pages, along with `robots.txt` and `sitemap.xml` files.

---

## Verification & Deployment

- All modifications have been committed and successfully pushed to your GitHub repository at:
  `https://github.com/Sarthak-Pandey/Portofolio.git` (main branch)
- You can test pages and theme transitions by browsing:
  `file:///E:/Intership/ProFolio/index.html`
