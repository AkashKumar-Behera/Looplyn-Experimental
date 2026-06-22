# LOOPLYN — Where Brands Get Seen

A cinematic, Awwwards-grade site for a creative growth + film studio. Dark editorial aesthetic in black / red / white, a boot-sequence splash, scroll storytelling, an interactive 3D Möbius loop, a Director's Cut mode, and a self-contained media system you can swap for real footage.

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** — cinematic design system
- **GSAP + ScrollTrigger** — reveals, pinned horizontal scroll, scrubbed timelines, word-by-word reading
- **Lenis** — smooth scrolling synced to the GSAP ticker
- **Framer Motion** — cursor, magnetic buttons, modals, hover reveals
- **React Three Fiber + Three.js + drei** — Möbius loop, particles, orbs

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

> Node 20 LTS recommended. If install complains about peers: `npm install --legacy-peer-deps`.

## Experience flow

`Splash (boot sequence)` → `Video Intro` → `Hero (3D loop)` → `Brand Story` → `Services hover-reveal` → `Image-stack timeline` → `Video Wall (+ modal)` → `Process timeline` → `Case studies (pinned horizontal)` → `Before/After slider` → `Results command center` → `Testimonial reel` → `Final CTA`.

**Director's Cut** — toggle top-right of the navbar. Adds heavier film grain, a REC HUD, running timecode, corner framing and scanlines across the whole page.

## Cinematic color system

| Token         | Value                |
| ------------- | -------------------- |
| Background    | `#050505`            |
| Background 2  | `#0B0B0B`            |
| Surface       | `#111111`            |
| Accent        | `#FF2A00`            |
| Accent 2      | `#FF4D2D`            |
| Highlight     | `#FF6A4A`            |
| Text          | `#FFFFFF`            |
| Muted         | `#8A8A8A`            |
| Borders       | `rgba(255,42,0,.15)` |

## Media — drop-in slots

Every video/image is rendered through `components/cinematic/Media.tsx`. If a file is missing it shows a **filmic generated placeholder** (drifting red light, grain, scanlines), so the layout is never broken. Drop real files into `/public` using the paths below and they replace the placeholders automatically — no code changes. See `public/MEDIA.md` for the full filename list.

## Structure

```
app/                layout, page (renders <Experience/>), globals.css
components/
  Experience.tsx    splash gate + section orchestration
  Navbar / Footer / Cursor / ScrollProgress / MagneticButton / Reveal / Counter
  cinematic/        DirectorsCut, FilmGrain, Scanlines, RecIndicator,
                    Timecode, Media, CinematicOverlays
  sections/         Splash, VideoIntro, Hero, BrandStory, ServicesReveal,
                    ImageStack, VideoWall, ProcessTimeline, CaseStudyScroll,
                    BeforeAfter, Results, TestimonialReel, FinalCTA
  three/            InfinityLoop (Möbius), ParticleField, FloatingOrbs,
                    AmbientLights, HeroScene, ContactScene
hooks/              useLenis, useMousePosition, useIsomorphicLayoutEffect
lib/                gsap (plugin reg), utils, data (all content)
```

## Notes

- 3D canvases are `dynamic(..., { ssr: false })`; the whole experience mounts after the splash, so nothing heavy blocks first paint.
- Respects `prefers-reduced-motion` (Lenis disabled, CSS animations reduced).
- Custom cursor mounts only on fine-pointer devices.
- All copy, case studies, services, stats and testimonials live in `lib/data.ts`.
