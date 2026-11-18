# LVL 11 Salon: Website Concept

An independent redesign concept for **LVL 11 Salon** (Phoenix, AZ), designed and built by
[Hunter Made](https://huntermade.studio). **This is not the salon's official website.** It's a
working prototype to show the owners what their online presence could become. Their live
site (lvl11phx.com) has not been touched.

Single-page site · React 19 + TypeScript + Tailwind CSS v4 + Vite · no backend.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build
npm run lint       # oxlint (react, typescript, jsx-a11y)
```

Asset pipelines (only needed when imagery or the logo changes):

```bash
npm run images     # download + optimise photos listed in src/content/photos.ts → public/images (AVIF + WebP)
npm run brand      # regenerate logo SVGs, favicon, app icons, og-image, src/brand/logo-data.ts
```

## Where things live

| What | File |
| --- | --- |
| All business facts, copy, services, hours, portfolio, stylists | `src/content/site.ts` |
| Every photo (source, alt text, crop focus, credit) | `src/content/photos.ts` |
| Sections, in page order | `src/sections/*.tsx` |
| Logo component (inline SVG, inherits `currentColor`) | `src/components/Logo.tsx` |
| Stylist card | `src/components/StylistCard.tsx` |
| Design tokens (colors, fonts, motion) | `src/index.css` (`@theme`) |
| SEO meta + schema.org `HairSalon` JSON-LD | `index.html` |
| Brush-logo generator | `scripts/brush.mjs`, `scripts/logo-geometry.mjs` |

### Swapping in real content

- **Photos:** edit `src/content/photos.ts`, then `npm run images`. Or drop your own
  `<key>-<width>.avif/.webp` files into `public/images/`. `focus` / `focusLg` control the crop.
- **Stylists:** add entries to `stylists` in `src/content/site.ts`. While the array is empty, the
  section shows a "profiles dropping soon" state. Preview the card layout with placeholder
  profiles at `/?preview=team` (clearly labelled; never shown on the normal page).
- **Online booking:** change `booking.href` (and set `external: true`) in `src/content/site.ts`.
  Every "Book" CTA updates. Until then, all booking CTAs **call the salon**.

## The logo

The **LVL 11** brush wordmark is original custom artwork, not a font. A seeded procedural
dry-brush generator (`scripts/brush.mjs`) draws each stroke with pressure, ragged edges and
bristle break-up, then outputs static SVG paths. **SALON** is hand-built monoline geometry.
Outputs:

- `public/brand/lvl11-logo-{charcoal,ivory}.svg`: full lockup for light/dark backgrounds
- `public/brand/lvl11-wordmark-{charcoal,ivory}.svg`: brush mark only
- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512.png`: simplified "11" mark
- `public/og-image.jpg`: 1200×630 social card

No supplied logo artwork was available in the project. This mark follows the written brief
(large charcoal brush "LVL 11", spaced uppercase "SALON", no icons). If the owners have
final logo artwork, replace `BRUSH_D` / the SVGs with it.

## Verified vs. unverified information

**Verified** from lvl11phx.com (visible text and its schema.org data, checked 2026-11-17):

- Name, address (4626 N 16th St, Suite 104, Phoenix, AZ 85016), phone (602) 975-6541, email lvl11phx@gmail.com
- Instagram [@lvl11phx](https://www.instagram.com/lvl11phx) (linked from their site)
- "Walk-ins welcome, appointments preferred!"
- "We believe beauty lies within. We are here to bring it out!" (used as a quote)
- Geo coordinates 33.50539, −112.04782
- Hours: Mon 9–5 · Tue 9–7 · Wed–Thu 9–9 · Fri 9–6 · Sat 8–5. (The site's "open today" widget
  showed 9 am – 7 pm on a Tuesday, matching the structured data.)

**Needs owner confirmation before launch:**

- [ ] **Sunday hours.** Listed as `00:00–00:00` in their site data; shown here as *Closed*.
- [ ] **Hours accuracy overall.** The current site's data may be stale (its footer says © 2023). Also check holiday hours.
- [ ] **Services list.** Grouped from the brief (cuts & styling, color & blonding, extensions, treatments & consultations). Confirm what they actually offer, e.g. specific extension methods and treatments.
- [ ] **All marketing copy** (headlines, pillars, service blurbs) is concept copy written in the brand voice. Have the owners approve the tone and any implied claims ("independent salon on 16th Street", "Phoenix has been talking about LVL 11 for years").
- [ ] **Stylists:** names, photos, specialties, individual booking links and Instagram handles. None are shown; nothing was invented.
- [ ] **Reviews:** no review text is shown. Add only real, attributable quotes with permission, and a verified Google rating if desired.
- [ ] **Google reviews link** currently opens a Google Maps search for the salon. Replace it with the exact Place URL or a "write a review" link from their Google Business Profile.
- [ ] **Booking system:** confirm whether they use one (Vagaro, GlossGenius, Square, etc.).
- [ ] **Logo:** owner approval of the brush wordmark concept.
- [ ] **Established date:** deliberately not stated. "Since at least 2021" is unconfirmed.

**Missing owner-approved assets:**

- [ ] All photography. Every image is a **temporary placeholder** from Unsplash (free license, see
  credits below). None of it is LVL 11 client work; the UI labels it "sample imagery". Replace it
  with the salon's own portfolio, interior and team photos.
- [ ] Salon interior / exterior photos for "The Salon" and "Visit".

## Before going live (if adopted)

1. Remove `<meta name="robots" content="noindex, nofollow">` in `index.html`. It's there so this
   unofficial concept never competes with the salon's real site in search.
2. Remove the concept labelling: the hero "Design concept · sample photography" tag, the footer
   concept note, and the Our Work "Sample imagery" tag.
3. Make `og:image` / JSON-LD `image` absolute URLs on the final domain.
4. Work through the checklists above.

## Quality checks run

- `tsc -b` and `vite build`: pass. JS is ~101 KB gzipped; fonts are subset and self-hosted.
- `oxlint` with `jsx-a11y`: no warnings.
- axe-core (WCAG 2.1 A/AA + best practice) at 375 px and 1440 px: 0 violations.
- No horizontal overflow at 375 / 390 / 430 / 768 / 1024 / 1440 px.
- Keyboard: skip link; mobile menu has focus trap, Escape to close, focus return and scroll lock.
- `prefers-reduced-motion`: disables reveals, parallax, marquee and zoom.
- No dead links: every anchor target exists; call, email and directions links work.

## Photo credits (temporary, Unsplash License)

Photos by @armedshutter, @lucaakalu, @newyork_creator, @badun, @lindsayrc81, @alexandermassph,
@jennaoslin, @liza_rubinchik, @giorgiotrovato, @morganrovang, @thinkmagically, @by_syeoni,
@davidbvnjo, @almas_, @timromanov, @marionpictures, @stuchy and @_k8_ on
[Unsplash](https://unsplash.com/license). Per-image links are in `src/content/photos.ts` and
in the site footer. Images from another salon's Unsplash account were deliberately excluded.
