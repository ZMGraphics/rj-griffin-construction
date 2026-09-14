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
- [x] Cookie Policy live OR site confirmed cookieless – site is cookieless; a one-liner is folded into the Privacy Policy (no tracking/advertising cookies; Google Fonts IP note included)
- [x] Service/Deposit/Cancellation policy – covered by the "Estimates & services" section of Terms of Use (estimates are preliminary, non-binding; binding only via signed written agreement). N/A as a separate page (no online sales).
- [x] Form: minimal fields, consent line, no pre-checked marketing opt-in – consent line added under submit; no marketing checkbox
- [x] Analytics confirmed cookieless – no analytics or tracking cookies in use; no consent banner required
- [x] Every third-party embed audited – Google Fonts (loaded via `<link>`; disclosed in Privacy Policy). FormSubmit.co (form delivery; disclosed). No Google Maps embed, no Meta Pixel, no GA4, no social widgets. (Follow-up: fonts are NOT self-hosted; see TO SUBSTANTIATE.)
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
6. **Google Fonts** – currently loaded from Google (IP disclosed in Privacy).
   Optional hardening: self-host the fonts to avoid sending visitor IPs to Google.
