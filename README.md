# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Hidden / upcoming sections

Three homepage sections are **hidden from the UI** via feature flags (components and data are kept intact).

### Flag file

`src/config/features.js`

```js
export const features = {
  showSelectedWorks: false,  // Projects — "Selected Works"
  showTestimonials: false,   // "What Clients Say"
  showCaseStudies: false,    // Case Studies
};
```

### What each flag controls

| Flag | Section heading | Component (kept) | Data | Section `id` |
|------|-----------------|------------------|------|--------------|
| `showSelectedWorks` | Selected Works | `src/components/Projects.jsx` | `projects` in `src/data/portfolio.js` | `#projects` |
| `showTestimonials` | What Clients Say | `src/components/Testimonials.jsx` | `testimonials` in `src/data/portfolio.js` | `#testimonials` |
| `showCaseStudies` | Case Studies | `src/components/CaseStudies.jsx` | `caseStudies` in `src/data/portfolio.js` | `#case-studies` |

### How hiding works (conditional renders, not deleted code)

Flags are imported and used to gate:

1. **Homepage composition** — `src/pages/Home.jsx` only mounts `<Projects />`, `<CaseStudies />`, `<Testimonials />` when the matching flag is `true`.
2. **Navbar** — `src/components/Navbar.jsx` omits Projects / Case Studies links when those flags are off.
3. **Hero CTA** — `src/components/Hero.jsx` hides the “View My Work” button (`#projects`) when `showSelectedWorks` is false.
4. **Footer links** — `src/components/Contact.jsx` omits Projects / Case Studies footer anchors when off.
5. **404 quick links** — `src/pages/NotFound.jsx` omits the same anchors when off.

### How to re-enable

1. Open `src/config/features.js`.
2. Set the desired flag(s) to `true`, e.g. `showSelectedWorks: true`.
3. Save and refresh (or rebuild). No other file edits are required for basic re-enable.
4. Optional polish before going live:
   - Replace placeholder testimonials in `src/data/portfolio.js`.
   - Review project / case-study copy and links in the same data file.

Let’s Cook (`/lets-cook`) and other portfolio sections are unrelated and stay enabled.
