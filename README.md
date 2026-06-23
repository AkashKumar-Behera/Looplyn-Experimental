# LOOPLYN — Where Brands Get Seen

A premium, Awwwards-level marketing agency website. Dark-luxury aesthetic, an interactive 3D Möbius infinity loop, GSAP scroll storytelling and Lenis smooth scrolling.

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — design system & utilities
- **GSAP + ScrollTrigger** — reveals, timelines, scrubbed animations
- **Lenis** — smooth scrolling, synced to the GSAP ticker
- **Framer Motion** — cursor, magnetic buttons, micro-interactions
- **React Three Fiber + Three.js + drei** — 3D hero scene
- Shadcn-style primitives (`cn`, glass/gradient utilities)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

> Requires Node 18.18+ (Node 20 LTS recommended).

## Project structure

```
app/
  layout.tsx          # fonts, metadata, root html
  page.tsx            # composes all sections
  globals.css         # design system + Tailwind layers
components/
  Navbar, Footer, Cursor, ScrollProgress,
  SmoothScroll, MagneticButton, Reveal, Counter
  sections/           # Hero, Process, FeaturedWork, Services,
                      # Results, Testimonials, Contact
  three/              # InfinityLoop (Möbius), ParticleField,
                      # FloatingOrbs, AmbientLights, HeroScene, ContactScene
hooks/
  useLenis, useMousePosition, useIsomorphicLayoutEffect
lib/
  gsap.ts (plugin registration), utils.ts, data.ts (content)
```

## Design system

| Token       | Value     |
| ----------- | --------- |
| Background  | `#09090B` |
| Surface     | `#111111` |
| Primary     | `#8B5CF6` |
| Secondary   | `#A855F7` |
| Text        | `#FFFFFF` |
| Muted       | `#A1A1AA` |

## Notes

- All 3D canvases are `dynamic(..., { ssr: false })` so they never block first paint.
- Animations respect `prefers-reduced-motion` (Lenis disabled, CSS animations reduced).
- The custom cursor only mounts on fine-pointer devices; touch devices fall back to the native cursor.
- Content lives in `lib/data.ts` — edit case studies, services, stats and testimonials there.
