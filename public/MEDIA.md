# Drop your media here

Place files at these exact paths and they replace the cinematic placeholders
automatically. Missing files simply keep showing the generated placeholder, so
you can add footage gradually. MP4 (H.264) recommended; keep them compressed.

## Videos → /public/videos/
- intro.mp4            Fullscreen video intro ("We don't follow trends")
- story-1.mp4          Brand story — main on-set clip
- strategy.mp4         Services preview · 01 Strategy
- production.mp4       Services preview · 02 Production
- content.mp4          Services preview · 03 Content
- campaigns.mp4        Services preview · 04 Campaigns
- growth.mp4           Services preview · 05 Growth
- work-21.mp4 … work-29.mp4   Video wall tiles (9) + their modal players
- case-31.mp4 … case-34.mp4   Case study previews (4)
- before.mp4 / after.mp4      Before/After comparison
- client-41.mp4, client-43.mp4, client-45.mp4   Video testimonials
- cta.mp4              Final CTA background film

## Images → /public/images/
- story-2.jpg, story-3.jpg     Brand story grid
- step-01.jpg … step-06.jpg    Image-stack timeline (Research → Scale)

## Tips
- 16:9 for the wall, intro and CTA; 3:4 for the image-stack tiles; 4:5 for the
  brand-story hero clip.
- Add a `poster` by passing `poster="/images/x.jpg"` to the relevant <Media>.
- Mobile data: videos use `preload="none"` and only play on hover / in view.
