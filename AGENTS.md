# AGENTS.md - Facile. Studio Codebase Guide

This document helps agents understand the codebase structure, conventions, and workflows for working on the Facile. Studio project.

## Project Overview

**Facile. Studio** is a creative digital agency portfolio website built with modern web technologies. It's a multi-language (i18n) Next.js application deployed on Vercel with Docker support.

- **Type**: Next.js 16 portfolio/marketing site
- **Languages**: English (en), French (fr), Spanish (es), German (de)
- **Deployment**: Vercel (primary) with Docker support
- **Package Manager**: Bun (preferred), npm (fallback)
- **Node Version**: 20.x

---

## Essential Commands

All commands work with both `npm` and `bun` (Bun is preferred per vercel.json).

```bash
# Development
npm run dev        # Start dev server on http://localhost:3000

# Production
npm run build      # Build optimized production bundle
npm start          # Start production server

# Code Quality
npm run lint       # Run ESLint
```

---

## Technology Stack

### Core Framework
- **Next.js 16.1.6** - React framework with App Router (app/ directory)
- **React 19.2.0** - UI library
- **TypeScript 5** - Strict type checking enabled

### Styling & Design
- **Tailwind CSS 4** - Utility-first CSS with PostCSS plugin
- **GSAP 3.13.0** - Animation library for page transitions
- **Manrope Font** - Custom Google Font (weights: 300-800)

### Internationalization (i18n)
- **next-intl 4.5.5** - Multi-language support
- **Middleware** - Locale routing via middleware.ts
- **Locale files** - JSON files in `/locales/` (en.json, fr.json, es.json, de.json)

### Backend & External Services
- **Resend 6.5.2** - Email service API for contact form
- **Next.js API Routes** - Serverless functions in app/api/

### Development Tools
- **ESLint 9** - Code linting
- **@types packages** - TypeScript definitions

---

## Project Structure

```
app/
├── page.tsx                    # Root page - redirects to default locale (/en)
├── [locale]/
│   ├── layout.tsx             # Root layout with i18n setup, SEO, analytics
│   ├── page.tsx               # Home page for each locale
│   ├── portfolio/
│   │   └── page.tsx           # Portfolio page
│   └── us/                     # "About Us" route (about us, not a URL typo)
│       └── page.tsx
├── components/
│   ├── button.tsx             # Button components (Button, LogoButton, TransitionButton)
│   ├── rideaux.tsx            # GSAP-based page transition animations
│   ├── header.tsx             # Navigation header
│   ├── footer.tsx             # Footer component
│   ├── contactModal.tsx       # Contact form modal
│   └── fonts.ts               # Font configuration (currently minimal)
├── api/
│   └── contact/
│       └── route.ts           # POST endpoint for contact form emails
└── globals.css                # Global styles + Tailwind @import

locales/
├── en.json                    # English translations
├── fr.json                    # French translations
├── es.json                    # Spanish translations
└── de.json                    # German translations

public/
├── icons/                     # SVG icons (e.g., "F..svg", email, contact icons)
├── Backgrounds/               # Background images
├── og-image.png              # Open Graph image for social sharing
├── favicon.ico
└── icon.png

config files:
├── next.config.ts            # Next.js config with next-intl plugin
├── i18n.ts                   # i18n configuration (locale loader)
├── middleware.ts             # Locale routing middleware
├── tsconfig.json             # TypeScript strict mode
├── postcss.config.mjs         # PostCSS with Tailwind
├── vercel.json               # Vercel deployment config (uses bun)
├── Dockerfile                # Multi-stage Docker build
├── .dockerignore
├── .gitignore
└── package.json
```

---

## Code Conventions & Patterns

### Component Style
- **Client vs Server Components**: Files default to Server Components. Add `'use client'` directive when using client-only hooks (useState, useRouter, etc.)
- **Functional Components**: All components are function-based, not class-based
- **Props Typing**: Use TypeScript interfaces with `type ComponentNameProps = { ... }` pattern
- **Naming**: PascalCase for components and types, camelCase for functions/variables

### Example Component Pattern
```typescript
import { ComponentType } from "react";

type ButtonProps = {
    text: string;
    icon: string;
    href?: string;
};

export const Button = ({ text, icon, href }: ButtonProps) => {
    return <div>/* component JSX */</div>;
};
```

### Styling
- **Inline Tailwind**: Prefer className with Tailwind utilities (see button.tsx for extensive examples)
- **Dynamic Classes**: Use template literals for conditional styling
- **Custom Colors**: Use hex codes in brackets (e.g., `bg-[#CAE6D8]`, `text-[#1E1E1E]`)
- **Key Color Palette**:
  - Light: `#CAE6D8` (mint green - hover/active state)
  - Dark: `#1E1E1E` (near black - text/foreground)
  - Transparency: `/33` suffix for 33% opacity (e.g., `border-[#1E1E1E]/33`)

### Animations
- **Page Transitions**: Use GSAP via `rideaux.tsx` utilities
  - `RideauxOut({href, router})` - Animate out before navigation
  - `RideauxIn(delayValue)` - Animate in after navigation
- **Hover Effects**: Use Tailwind transitions (duration-150, transition-colors)
- **Icon Masking**: SVGs rendered via CSS mask/WebkitMask (see button.tsx for pattern)

### Routing & Navigation
- **Dynamic Routes**: Use `[locale]` folder for i18n routes
- **Link Components**: Use Next.js router + GSAP for transitions, not `<Link>`
- **Pathname/Params**: Extract via `usePathname()`, `useParams()` in Client Components
- **Navigation Pattern**:
  ```typescript
  const router = useRouter();
  const pathName = usePathname();
  if (pathName !== href) RideauxOut({href, router});
  ```

### API Routes
- **Structure**: Functions exported from `app/api/[path]/route.ts`
- **HTTP Methods**: Named exports (export async function POST, GET, etc.)
- **Response Format**: Use `NextResponse.json()` with status codes
- **Error Handling**: Try/catch with 400/500 error responses (see contact/route.ts)

### Internationalization (i18n)
- **Translation System**: next-intl with server-side getMessages
- **Locale Detection**: Automatic via middleware routing based on URL (`/en`, `/fr`, `/es`, `/de`)
- **Setup**: 
  - Middleware matches `['/', '/(en|fr|es|de)/:path*']`
  - Layout uses `NextIntlClientProvider` to provide messages to client
  - Locale stored in URL params: `params.locale as string`
- **Default Locale**: English (en) - fallback if none specified

### TypeScript
- **Strict Mode**: Enabled (`"strict": true` in tsconfig.json)
- **Import Aliases**: Use `@/*` for root imports (configured in tsconfig.json)
  - Example: `import { Button } from "@/app/components/button"`
- **Type Imports**: Use `type` keyword for type-only imports

### Database / Backend
- **Email Service**: Resend API for contact form
- **API Key**: `RESEND_API_KEY` environment variable (set in Dockerfile, Vercel env vars)
- **Email Configuration**: From "Facile. Studio <onboarding@resend.dev>" to contact@facile.studio

---

## Important Gotchas & Non-Obvious Patterns

### 1. **Async Params in Layouts**
Next.js 16 requires `params` to be awaited:
```typescript
const { locale } = await params;  // Don't forget await!
```

### 2. **Page Transitions with Rideaux**
- CSS selector `.rideaux` must exist in DOM for GSAP animations to work
- Always check `pathName !== href` before triggering transition (avoid unnecessary animations on current page)
- Animations delay navigation via `onComplete` callback in RideauxOut

### 3. **SVG Icon Masking**
Icons are rendered as colored divs with SVG mask backgrounds:
```typescript
style={{
    WebkitMaskImage: `url(/icons/${icon}.svg)`,
    maskImage: `url(/icons/${icon}.svg)`,
    // ... other mask properties
}}
```
Both `WebkitMaskImage` and `maskImage` needed for browser compatibility.

### 4. **Locale-Specific Routes**
All user-facing routes MUST be under `app/[locale]/`. The root `app/page.tsx` only redirects to default locale. Never create routes outside the locale folder (except API routes).

### 5. **Client Component Hook Usage**
Components using:
- `useRouter()`, `usePathname()`, `useParams()`
- `useState`, `useEffect`, etc.

...MUST have `'use client'` directive at the top.

### 6. **Environment Variables in Docker**
- `RESEND_API_KEY` is passed as build arg in Dockerfile (line 15-16)
- Must be set during docker build: `docker build --build-arg RESEND_API_KEY=xxx`
- Not automatically inherited from .env files

### 7. **Metadata in Locale Layouts**
SEO metadata (title, description, openGraph, etc.) is defined in `app/[locale]/layout.tsx`. This applies to all routes under that locale. Individual pages can override with their own metadata export.

### 8. **Vercel Deployment Specifics**
- Prefers Bun over npm (vercel.json: `"installCommand": "bun install"`)
- Standalone output mode enabled (next.config.ts: `output: 'standalone'`)
- Analytics script injected in layout head (Umami: `data-website-id="34bb792f-b7ac-444a-b1e3-0a521383629d"`)

---

## Common Tasks

### Adding a New Page
1. Create `app/[locale]/new-page/page.tsx`
2. Export metadata for SEO (title, description, etc.)
3. Make sure it's a Server Component by default
4. Use `useRouter()` + `RideauxOut()` for navigation from other pages

### Adding a New Translation
1. Update JSON files in `locales/` (en.json, fr.json, es.json, de.json) with same keys
2. Access in components via next-intl (typically with useTranslations hook in Client Components)
3. Server Components can import from locale JSON directly via dynamic import

### Styling a Component
1. Use Tailwind utilities in className (preferred)
2. For dynamic styles, use template literals or style objects
3. Keep color hex values consistent with design system (#CAE6D8, #1E1E1E)
4. Test hover/transition states with `hover:`, `group-hover:`, `transition-colors`

### Sending Email via API
1. POST to `/api/contact` with JSON: `{ name, email, phone?, message }`
2. Validate required fields (name, email, message) server-side
3. Resend sends email to contact@facile.studio with HTML template
4. Return `{ success: true }` or error response

---

## Build & Deployment

### Local Development
```bash
npm run dev
# Opens on http://localhost:3000
# Hot reload enabled by default
```

### Production Build
```bash
npm run build
npm start
```
Generates `.next/standalone` for Docker deployment.

### Vercel Deployment
- Connected via GitHub (FacileStudio/vitrine)
- Automatically deploys on push to main
- Uses Bun for install/build (faster than npm)
- Environment variables set in Vercel dashboard

### Docker Deployment
```bash
docker build --build-arg RESEND_API_KEY=$RESEND_API_KEY -t facile-studio .
docker run -p 3000:3000 facile-studio
```
Multi-stage build optimizes image size (builder stage discarded).

---

## Linting & Code Quality

```bash
npm run lint      # Run ESLint
```

ESLint is configured via `eslint-config-next` (Next.js recommended rules).

---

## File Location Quick Reference

| What | Where |
|------|-------|
| Home page (any locale) | `app/[locale]/page.tsx` |
| Portfolio | `app/[locale]/portfolio/page.tsx` |
| About Us | `app/[locale]/us/page.tsx` |
| Buttons, Icons, Animations | `app/components/button.tsx` |
| Page Transitions (GSAP) | `app/components/rideaux.tsx` |
| Contact Form | `app/components/contactModal.tsx` |
| Email API | `app/api/contact/route.ts` |
| Translations | `locales/{en,fr,es,de}.json` |
| Global Styles | `app/globals.css` |
| Root Layout (SEO, i18n setup) | `app/[locale]/layout.tsx` |
| i18n Config | `i18n.ts` |
| Locale Routing | `middleware.ts` |
| Icons/Images | `public/icons/`, `public/Backgrounds/` |

---

## Notes for Future Work

- `main.todo` file exists but is empty - use for tracking TODOs
- `app/components/fonts.ts` is minimal (just a comment) - expand if needed
- `app/components/contactModal.tsx` exists but implementation not shown - check before modifying contact flow
- Debug logs exist in i18n.ts and contact API - consider removing in production or adding environment-based logging

---

## Quick Debugging Tips

1. **i18n Issues**: Check `middleware.ts` for locale matching and `i18n.ts` for message loading
2. **Animation Issues**: Check `.rideaux` CSS class exists; verify GSAP duration/delay values
3. **API Errors**: Check `RESEND_API_KEY` env var is set; look at contact/route.ts error logs
4. **TypeScript Errors**: Verify `params` is awaited in layouts; check type definitions match imports
5. **Build Issues**: Clear `.next` folder and rebuild; check Node version is 20.x

---

## Summary

This is a modern, well-structured Next.js portfolio site with:
- Multi-language support (i18n)
- Smooth GSAP page transitions
- Server-side rendering with strategic Client Components
- Email service integration via Resend
- Tailwind CSS for styling
- Vercel/Docker deployment ready

Follow the patterns established in existing components and you'll fit right in!
