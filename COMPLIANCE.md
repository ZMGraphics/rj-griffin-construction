# Compliance Sign-off – R.J. Griffin Construction

Site: https://rjgriffinconstruction.com · Standard: ZMG Website Compliance
Standard (`~/zmg-compliance/README.md`) · Retrofit date: 2026-09-14

> Not legal advice. Strong standard-practice defaults to reduce liability for a
> small local NY contractor. A licensed NY attorney should review before relying
> on any contractor-licensing or insurance claim.

## §7 Sign-off checklist

- [x] Privacy Policy page live + footer-linked (`/privacy`)
- [x] Terms of Use page live + footer-linked (`/terms`)
- [x] Accessibility Statement live + footer-linked (`/accessibility`)
- [x] Cookie Policy live OR site confirmed cookieless – site is cookieless; a one-liner is folded into the Privacy Policy (no tracking/advertising cookies). Fonts are self-hosted as of 2026-09-16, so the former Google Fonts IP note was removed (see Performance section).
- [x] Service/Deposit/Cancellation policy – covered by the "Estimates & services" section of Terms of Use (estimates are preliminary, non-binding; binding only via signed written agreement). N/A as a separate page (no online sales).
- [x] Form: minimal fields, consent line, no pre-checked marketing opt-in – consent line added under submit; no marketing checkbox
- [x] Analytics confirmed cookieless – no analytics or tracking cookies in use; no consent banner required
- [x] Every third-party embed audited – Fonts are self-hosted as of 2026-09-16 (no Google Fonts request; CSP no longer allows Google font hosts). FormSubmit.co (form delivery; disclosed). No Google Maps embed, no Meta Pixel, no GA4, no social widgets.
- [x] Alt text on images – logo/hero/gallery images carry descriptive alt (verified in footer logo + gallery). Re-verify any decorative images use alt="".
- [x] All color pairs pass contrast (documented below)
- [x] Keyboard-only walkthrough / visible focus rings – global `:focus-visible` brass outline present in index.css; legal pages include skip link + focus styles
- [x] Buttons/links clearly labeled; icon buttons have aria-label – submit says "Send project details"; footer legal is a labeled `<nav aria-label="Legal">`
- [x] All form fields labeled – every field wrapped in `<label>`; errors linked via `aria-describedby` + live regions
- [x] Heading order + landmarks + lang + skip link – legal pages: single `<h1>`, `<main>`, `lang="en"`, skip link. Main app: `lang="en"`, `<main>`/`<footer>` landmarks present.
- [x] No fabricated reviews – two named testimonials retained; flagged TO CONFIRM (see below)
- [x] No unsupported claims; licensing claims verified – softened/removed unverifiable claims (see change log); "Licensed & insured" retained pending owner proof (TO SUBSTANTIATE)
- [x] Image rights confirmed – owner attestation recorded in `IMAGE-CREDITS.md`; town/type captions flagged for confirmation
- [x] Jurisdiction-specific risks flagged – Monroe County home-improvement license + COI (see below)

## Claim changes made this retrofit

- "A+ BBB accredited" / "A+ Rated" / "A+ BBB" → "Better Business Bureau
  Accredited" / "BBB Accredited" (no rating). Also fixed in `index.html` meta
  description. JSON-LD `hasCredential` already carried no rating (left as-is).
- "bonded" removed from footer (kept "Fully insured").
- "OSHA-compliant crews" → "We follow OSHA-aligned jobsite safety practices."
- "Own crews on every job / no rotating subs" → "Our own crews handle the core
  work; when we bring in specialized trade partners, we manage them directly."
  (chip variant: "Our own crews on core work").
- "Written scope & warranty" → "We stand behind our workmanship."
- Kept "Licensed & insured", "Fully insured", "Since 1986 / 40+ years".

## Contrast ratios (text on #0A0A0A background, WCAG AA needs ≥4.5:1 normal text)

| Element | Before | After | Ratio after |
|---|---|---|---|
| Footer copyright + legal links | white/40 (~3.6:1) | white/70 | ≈9.7:1 |
| Eyebrow label (`Eyebrow`) | white/50 (~4.9:1) | white/70 | ≈9.7:1 |
| `.kicker` (index.css) | rgba(245,243,238,0.5) | 0.7 | ≈8.7:1 |
| `.field-label` (index.css) | rgba(245,243,238,0.52) | 0.7 | ≈8.7:1 |
| Input placeholder (index.css) | rgba(245,243,238,0.3) (~2.6:1) | 0.6 | ≈6.6:1 |
| Brass #C9A96A (unchanged) | – | – | ≈8.8:1 (passes for small text too) |

All adjusted pairs now exceed 4.5:1.

**Second pass (resolved):** all remaining readable body labels/captions/helper
text that used `text-white/40`, `text-white/45`, or `text-white/50` were raised
to `text-white/70` (≈9.7:1). This covered: TrustBadges sub-labels, before/after
captions + "Drag to compare" helper, lightbox image counter, About figcaption,
review project/location + "Via <source>" meta, contact role labels + Email/Office
labels, contact form "respond within 24 hrs" helper, footer credential chips, and
the `lg:text-white/45` credential-row variant. No sub-4.5:1 readable text remains
in `RJGriffinSite.jsx`. Purely decorative elements (e.g. `bg-white/*` divider dots)
were left unchanged.

## TO SUBSTANTIATE / CONFIRM (owner action required)

1. **Contractor license** – obtain and DISPLAY the applicable Monroe County
   home-improvement contractor license number on the site. Do NOT rely on
   "Licensed & insured" copy until the license is confirmed held; a license #
   should be shown where the jurisdiction requires it in advertising.
2. **Insurance (COI)** – provide a current Certificate of Insurance to back the
   "licensed & insured" / "fully insured" claims. Keep on file.
3. **BBB accreditation** – confirm the business is currently BBB accredited and
   keep proof. If it wants to restore a rating claim, only do so with BBB
   documentation of the current rating; otherwise leave as plain "Accredited".
4. **Testimonials** – the two named Facebook testimonials are retained; confirm
   they are real, that the star rating shown is accurate, and that the named
   reviewers consent to being quoted on the site (FTC 2024 review rule + NY GBL).
5. **Photo provenance + captions** – confirm all photos are R.J. Griffin's own
   completed-project work and that every town/project-type caption matches a real
   job (see `IMAGE-CREDITS.md`).
6. **Google Fonts** – RESOLVED (2026-09-16). Fonts are now self-hosted
   (`/public/fonts/*.woff2`); the Google Fonts `<link>`/preconnect were removed
   from `index.html` and all legal pages, the CSP no longer allows
   `fonts.googleapis.com`/`fonts.gstatic.com`, and the Privacy Policy sentence
   about disclosing visitor IPs to Google was deleted. No visitor IP now goes to
   Google. See the Performance section below.

## Performance

Performance optimization pass (2026-09-16). Per the ZMG Performance Standard
(`zmg-compliance/PERFORMANCE.md`), this is a static Vite/React SPA with a
third-party form (FormSubmit) and **no backend or database**, so Section A + B
apply and Section C is **N/A**.

**Applied (Section A):**

- **Images → WebP, right-sized.** All referenced photos (16 gallery
  `project-*.webp`, `before`/`after`, `site/hero`) converted from JPG to WebP at
  `cwebp -q 82`, downscaled to a 1600px long edge (no upscaling). The large
  full-logo raster (`rjg-logo-full.png`, 3449×2606, 267 KB) → WebP capped at
  1400px wide (68 KB). Referenced photo + logo weight dropped from **~4.7 MB to
  ~3.1 MB (≈34%)**. Original JP/PNG files are retained in git.
- **Lazy loading.** All below-the-fold `<img>` (gallery, before/after, services,
  about, review watermark, footer logo) use `loading="lazy"`; the hero/LCP image
  stays `loading="eager"` with `fetchpriority="high"`.
- **Self-hosted fonts.** Geist + Inter now served locally as variable WebFonts
  (`/public/fonts/geist-var-latin.woff2` 29 KB, `inter-var-latin.woff2` 48 KB;
  one file per family covers all weights), declared via `@font-face` with
  `font-display: swap` and preloaded in `index.html`. Removed the Google Fonts
  `<link>` + `preconnect` from `index.html` and all three legal pages, and
  tightened the CSP to drop the `fonts.googleapis.com`/`fonts.gstatic.com`
  allowances. Eliminates the visitor-IP-to-Google leak (see item 6 above).
- **Code-splitting.** `vite.config.js` `manualChunks` splits vendor code into
  cacheable chunks: `react` (~182 KB), `motion`/framer-motion (~133 KB), and the
  app chunk (~53 KB). Total first-load JS is ~369 KB (~115 KB gzip) — unchanged
  in bytes, but now split so the large React/motion vendor chunks are cached
  across deploys and downloaded in parallel; only the small app chunk changes on
  content edits.
- **Dependency prune.** `npx depcheck` reported no genuinely unused packages
  (`tailwindcss` flagged is a false positive — used via `@import "tailwindcss"`
  in CSS). Temporary `@fontsource-variable/*` packages used to obtain the woff2
  files were uninstalled; the woff2 are self-contained in `/public/fonts`.
- **Re-render hygiene.** Moved the gallery masonry `spans` array out of the
  `.map()` render loop to module scope (`GALLERY_SPANS`) so it is not recreated
  per item per render. No other hot-path waste found; data arrays and the hero
  slideshow already use module-level constants and stable handlers.

**Platform-handled (Section B) — verified, not hand-rolled:** CDN/edge caching,
load balancing, gzip/brotli compression, and TLS/HTTP2/3 are all provided by
Vercel. Assets use hashed filenames for long-term caching.

**N/A (Section C) — no server or database on this site:** API response caching,
expensive-query caching, list pagination, API-payload compression, database
indexing, N+1 query elimination, and DB connection pooling. The one form posts
directly to FormSubmit; there is no data layer to optimize.

**Build:** `npm run build` passes; production render verified in-browser (all
sections render, fonts + WebP load, zero console errors, no CSP violations).
