# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and recruiters evaluating a senior frontend / full stack engineer for roles in Coimbatore, Bengaluru, or remote. Secondary: freelance and contract clients deciding whether to hire Patric Phinehas Raj for project work (there is a dedicated Freelance page). Both are judging credibility and craft quickly, then looking for a way to make contact.

## Product Purpose

Personal portfolio for Patric Phinehas Raj, Senior Software Engineer (Digital Twin) at Bosch Global Software Technologies, 6+ years of experience. It presents experience, skills, projects, and contact routes so the right visitor can decide to get in touch. Success is a recruiter or client reaching out by email, LinkedIn, or the contact form.

## Positioning

Day-job credibility first: leads a team of 8 frontend and 2 iOS developers on a Digital Twin IoT platform (180 assets), and also writes the Python backend and auth (FastAPI, Flask, OAuth 2.0, JWT on Azure AD). Side projects (Pokedex, Let's Cook recipes, self-hosted Home System) are supporting evidence of range and craft, not the headline.

## Operating Context

Static site built with Vite and React, prerendered with `scripts/prerender.mjs`, deployed to GitHub Pages (`gh-pages` branch). Routes include Home, Freelance, Links, Pokedex, Let's Cook, Home System, Privacy Policy, Thank You. Content lives in `src/data/portfolio.js` and `src/data/links.json`; section visibility is controlled by `src/config/features.js`.

## Capabilities and Constraints

- Static hosting only; no server runtime.
- Sections for Selected Works, Testimonials, and Case Studies are feature-flagged; Testimonials and Case Studies are currently hidden.
- Signature interactions to keep: the Pokedex, StackCard, and the Hero technology orbit.
- Stack: React 19, Vite, Tailwind 4, framer-motion, react-router, react-helmet-async (SEO and JSON-LD).

## Brand Commitments

Name: Patric Phinehas Raj. Role line: "Senior Frontend / Full Stack Engineer (React, Angular, TypeScript, Python)". Copy is plain and factual, written in the first person style of the existing data files.

## Evidence on Hand

Real employment history at Bosch (2019 to present), education (M.E. IT, PSG College of Technology; B.E. CSE), skills list, and public GitHub and LinkedIn profiles. Home System has no measured results, no live demo, and no usage figure. No real testimonials or case studies exist yet; do not fabricate them.

## Product Principles

1. Lead with verifiable day-job credibility; side projects support it.
2. Never invent proof: no fake testimonials, metrics, clients, or demos.
3. Make contact (email, LinkedIn, form) easy to reach from anywhere.
4. Keep the existing signature interactions intact.
5. Stay fast and fully static.

## Accessibility & Inclusion

Accessibility is actively checked with axe-core (`@axe-core/puppeteer`); target WCAG AA. Respect reduced-motion preferences (the Hero already uses `useReducedMotion`).
