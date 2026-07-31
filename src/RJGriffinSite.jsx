import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/* ============================================================================
   R.J. GRIFFIN CONSTRUCTION
   Typography as architecture. Geist + Inter, weight-driven hierarchy,
   editorial restraint over marketing. LeChase / Shaefco reference.
   ========================================================================== */

const BUSINESS = {
  name: 'R.J. Griffin Construction',
  established: 1986,
  yearsInBusiness: 40,
  address: '1753 Manitou Road, Spencerport, NY 14559',
  facebook: 'https://www.facebook.com/p/RJ-Griffin-Construction-100086193003611/',
  email: 'rjgriffinconstruction@gmail.com',
  contacts: {
    ron: { name: 'Ron Griffin', role: 'Owner', phone: '(585) 737-7521', tel: '585-737-7521' },
    josh: { name: 'Josh Griffin', role: 'General Manager', phone: '(585) 474-8657', tel: '585-474-8657' },
  },
};

const SERVICES = [
  {
    title: 'Basement egress solutions',
    subtitle: 'Specialized division',
    desc: 'Code-compliant basement egress windows and wells, installed by a crew that does this every week. We cut them, install them, and waterproof them ourselves.',
    icon: 'egress',
    featured: true,
    points: ['Code-compliant window wells', 'Egress cutouts and installations', 'Waterproofing and drainage', 'Safety-rated for finished basements'],
  },
  {
    title: 'Home remodels and additions',
    desc: 'Whole-house remodels, room additions, and structural work. Built to match what you already have, so it looks like it was always there.',
    icon: 'add',
    points: ['Room and second-story additions', 'Whole-house remodels', 'Structural updates', 'Basement finishing'],
  },
  {
    title: 'Kitchens and bathrooms',
    desc: 'Full kitchen and bath remodels. Cabinetry, countertops, custom tile, plumbing, lighting, and layout changes. We handle every piece.',
    icon: 'kitchen',
    points: ['Custom cabinetry and countertops', 'Layout redesign', 'Tile showers and backsplashes', 'Vanities, tubs, and plumbing'],
  },
  {
    title: 'Exteriors',
    desc: 'Vinyl and specialty siding, replacement windows, trim, and decks. Built for Rochester winters and priced fair.',
    icon: 'siding',
    points: ['Vinyl and specialty siding', 'Replacement windows', 'Trim, soffit, and fascia', 'Decks and outdoor spaces'],
  },
  {
    title: 'General construction',
    desc: 'Custom builds, commercial suite build-outs, accent walls, cabinets, and trim. If it takes a hammer and a level, we do it.',
    icon: 'reno',
    points: ['Custom residential builds', 'Commercial build-outs', 'Trim and cabinet installs', 'Property enhancements'],
  },
];

const REVIEWS = [
  {
    text: "We highly recommend RJ Griffin. We had our laundry closet upgraded and a hall closet turned into a mudroom space, finished off with updates to the connected powder room. Everything turned out even better than I envisioned. The team was professional and neat. Cost and timeline estimates were reasonable with excellent communication throughout. We will definitely be using them for our next project.",
    author: 'Valerie Lamoreaux',
    location: 'Rochester, NY',
    project: 'Laundry, mudroom & powder room',
    stars: 5,
    source: 'Facebook',
  },
  {
    text: "RJ Griffin Construction just completed this accent wall, trim and cabinet install for our salon suite. They were quick, professional and their attention to detail is spot on. Contact them for any of your renovation needs — a full bathroom, a new kitchen, decks, or egress wells. These are your guys.",
    author: 'CJ Cutaia',
    location: 'Salon suite build-out',
    project: 'Accent wall, trim & cabinets',
    stars: 5,
    source: 'Facebook',
  },
];

const GALLERY = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/gallery/project-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `R.J. Griffin Construction project ${i + 1}, Rochester NY remodel`,
}));

const AREAS = ['Spencerport', 'Rochester', 'Brockport', 'Hilton', 'Greece', 'Chili', 'Gates', 'Pittsford', 'Fairport', 'Webster', 'Penfield', 'Henrietta', 'Irondequoit', 'Brighton', 'Monroe County'];

const CAPABILITIES = ['Kitchens', 'Baths', 'Additions', 'Basement egress', 'Siding', 'Windows', 'Tile', 'Trim', 'Decks', 'Full renovations'];

/* ============================================================================
   ICONS
   ========================================================================== */

const Icon = ({ name, className = 'w-5 h-5' }) => {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    kitchen: <svg viewBox="0 0 24 24" className={className} {...common}><rect x="3" y="4" width="18" height="6" rx="0.5" /><rect x="3" y="14" width="18" height="6" rx="0.5" /><path d="M8 7h1M15 7h1M8 17h1M15 17h1" /></svg>,
    bath: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M4 12h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z" /><path d="M7 12V6a2 2 0 0 1 4 0" /></svg>,
    add: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M3 12l9-8 9 8" /><path d="M5 10v10h5v-6h4v6h5V10" /></svg>,
    egress: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M4 20h16" /><path d="M4 20V4h16v16" /><rect x="8" y="8" width="8" height="10" /><path d="M8 13h8" /></svg>,
    siding: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M3 4h18v16H3z" /><path d="M3 8h18M3 12h18M3 16h18" /></svg>,
    reno: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M14 2l8 8-4 4-8-8z" /><path d="M10 6L2 14l6 6 8-8" /></svg>,
    check: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M20 6L9 17l-5-5" /></svg>,
    phone: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
    mail: <svg viewBox="0 0 24 24" className={className} {...common}><rect x="2" y="4" width="20" height="16" rx="0.5" /><path d="M2 6l10 7L22 6" /></svg>,
    facebook: <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
    arrow: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
    shield: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
    clock: <svg viewBox="0 0 24 24" className={className} {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    pin: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
    star: <svg viewBox="0 0 24 24" className={className} fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  };
  return map[name] || null;
};

/* ============================================================================
   HELPERS
   ========================================================================== */

const Reveal = ({ children, delay = 0, y = 10, className = '' }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* Editorial section eyebrow: hairline + label. No section numbers. */
const Eyebrow = ({ label, align = 'left' }) => (
  <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
    <span className="w-6 h-px bg-[#C9A96A]" />
    <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/50">{label}</span>
  </div>
);

/* Section header. Sentence case, restrained scale, weight-driven. */
const SectionHeader = ({ kicker, title, lede, align = 'left', maxTitleWidth = '20ch' }) => {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <Eyebrow label={kicker} align={align} />
      <h2
        className={`font-display font-semibold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] leading-[1.22] tracking-[-0.02em] text-[#F5F3EE] mt-5 ${centered ? 'mx-auto' : ''}`}
        style={{ maxWidth: maxTitleWidth }}
      >
        {title}
      </h2>
      {lede && <p className={`prose-lede text-white/60 mt-5 ${centered ? 'mx-auto' : ''}`}>{lede}</p>}
    </div>
  );
};

const Counter = ({ end, suffix = '', duration = 1400, className = '' }) => {
  const [value, setValue] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!seen) return;
    if (reduce) { setValue(end); return; }
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, end, duration, reduce]);

  return <span ref={ref} className={`tabular ${className}`}>{value}{suffix}</span>;
};

/* ============================================================================
   HEADER
   ========================================================================== */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['services', 'before-after', 'gallery', 'about', 'reviews', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Transformations', href: '#before-after' },
    { label: 'Work', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/72 backdrop-blur-2xl backdrop-saturate-125 border-b border-white/[0.05]'
          : 'bg-gradient-to-b from-black/55 via-black/10 to-transparent'
      }`}
    >
      <div className={`max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between transition-all duration-500 ${scrolled ? 'py-3 md:py-4' : 'py-4 md:py-5'}`}>
        <a href="#top" className="flex items-center gap-3 md:gap-4 group" aria-label="R.J. Griffin Construction, home">
          <div className={`relative transition-all duration-500 flex items-center justify-center shrink-0 ${scrolled ? 'h-10 w-10 md:h-12 md:w-12' : 'h-11 w-11 md:h-14 md:w-14'}`}>
            <img src="/logo/rjg-shield.png" alt="" className="w-full h-full object-contain" />
          </div>
          <img
            src="/logo/rjg-wordmark.png"
            alt="R.J. Griffin Construction"
            className={`hidden sm:block w-auto transition-all duration-500 ${scrolled ? 'h-6 md:h-7' : 'h-7 md:h-9'}`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map(l => {
            const isActive = active && l.href === `#${active}`;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-[13px] font-medium transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                {l.label}
                <span className={`absolute -bottom-2 left-0 h-px bg-[#C9A96A] transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`} />
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="text-[13px] font-medium text-white/75 hover:text-[#C9A96A] transition-colors tabular">
            {BUSINESS.contacts.ron.phone}
          </a>
          <a href="#contact" className="btn btn-secondary">
            Request estimate
            <span className="arrow-slide"><Icon name="arrow" className="w-3 h-3" /></span>
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2 -mr-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/[0.05]"
          >
            <nav className="flex flex-col p-6 gap-1 max-w-[1440px] mx-auto">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display font-semibold text-white text-[22px] py-3 border-b border-white/[0.05]"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.05] pt-6">
                <span className="kicker">Call Ron</span>
                <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="font-display font-semibold text-[#C9A96A] text-lg tabular">{BUSINESS.contacts.ron.phone}</a>
              </div>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-4 w-full">
                Request an estimate
                <span className="arrow-slide"><Icon name="arrow" className="w-3 h-3" /></span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================================
   HERO
   ========================================================================== */

function Hero() {
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const logoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const logoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 0.94]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6, 1], reduce ? [0.2, 0.2, 0.2] : [0.22, 0.18, 0.05]);

  return (
    <section id="top" ref={heroRef} className="relative min-h-[100svh] overflow-hidden bg-[#0A0A0A]">
      {/* Image layer: full-bleed on mobile with overlay, right-panel only on desktop */}
      <div className="absolute inset-0 lg:left-[41.666667%]">
        <img
          src="/images/site/hero.jpg"
          alt="R.J. Griffin Construction, recent kitchen remodel in Rochester NY"
          loading="eager"
          fetchpriority="high"
          className="w-full h-full object-cover object-[center_35%]"
        />
        {/* Mobile-only overlays — invisible above lg where image lives beside content */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0A0A]" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/15" />

        {/* Logo overlay: desktop only, sits centered on the right image */}
        <motion.img
          src="/logo/rjg-logo-full.png"
          alt=""
          aria-hidden="true"
          style={{ y: logoY, scale: logoScale, opacity: logoOpacity, transformOrigin: 'center' }}
          className="hidden lg:block absolute top-1/2 right-8 xl:right-16 -translate-y-1/2 h-[78%] max-h-[720px] w-auto pointer-events-none select-none mix-blend-screen will-change-transform"
        />
      </div>

      {/* Content grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 min-h-[100svh]">
        <div className="lg:col-span-5 relative flex flex-col justify-between px-6 sm:px-10 lg:px-14 xl:px-20 pt-32 lg:pt-40 pb-20 lg:pb-14">
          <div className="max-w-[560px]">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-[#C9A96A]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#C9A96A]/90">Since 1986 · Rochester, NY</span>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h1 className="font-display font-bold text-[34px] sm:text-[42px] lg:text-[46px] xl:text-[54px] leading-[1.08] tracking-[-0.025em] text-[#F5F3EE] mt-6 [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] lg:[text-shadow:none]">
                Building homes<br />that outlast us.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="prose-lede text-white/85 lg:text-white/68 mt-6">
                A family-run general contractor in Spencerport, NY. Kitchens,
                baths, additions, and basement egress across the Rochester area
                for forty years. Our own crews on every project.
              </p>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10">
                <a href="#contact" className="btn btn-secondary">
                  Request an estimate
                  <span className="arrow-slide"><Icon name="arrow" className="w-3 h-3" /></span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Bottom whisper: single hairline credentials row */}
          <Reveal delay={0.28}>
            <div className="mt-16 pt-6 border-t border-white/[0.12] lg:border-white/[0.05] flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-medium text-white/60 lg:text-white/45">
              <span className="text-[#C9A96A] tabular"><Counter end={40} suffix="+ years" /></span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span>A+ BBB accredited</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span>Family owned</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span>Own crews</span>
            </div>
          </Reveal>
        </div>
        <div className="hidden lg:block lg:col-span-7" />
      </div>
    </section>
  );
}

/* ============================================================================
   CAPABILITIES BAND: quiet static row
   ========================================================================== */

function Capabilities() {
  return (
    <section aria-label="Capabilities" className="relative bg-[#0A0A0A] border-y border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-10 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
          <div className="shrink-0">
            <span className="kicker text-[#C9A96A]/85">Capabilities</span>
          </div>
          <div className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-3 lg:justify-end">
            {CAPABILITIES.map((c, i) => (
              <React.Fragment key={c}>
                <span className="text-white/78 text-[13px] md:text-[14px] font-medium">{c}</span>
                {i < CAPABILITIES.length - 1 && <span className="text-white/12 select-none">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   TRUST: quiet 4-up
   ========================================================================== */

function TrustBadges() {
  const badges = [
    { title: 'A+ Rated', sub: 'BBB accredited', icon: 'shield' },
    { title: '40+ Years', sub: 'Serving Rochester', icon: 'clock' },
    { title: 'Locally owned', sub: 'Spencerport, NY', icon: 'pin' },
    { title: 'Fully insured', sub: 'Licensed contractor', icon: 'check' },
  ];
  return (
    <section aria-label="Credentials" className="relative bg-[#0A0A0A]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-20 md:py-24 border-b border-white/[0.05]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
          {badges.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.04}>
              <div className="bg-[#0A0A0A] flex items-start gap-4 p-8 md:p-10 h-full">
                <span className="text-[#C9A96A] shrink-0 mt-0.5"><Icon name={b.icon} className="w-4 h-4" /></span>
                <div>
                  <div className="font-display font-semibold text-white text-[15px] md:text-[16px] leading-tight tracking-[-0.01em]">{b.title}</div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-white/45 mt-2 font-medium">{b.sub}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   SERVICES
   ========================================================================== */

function Services() {
  const featured = SERVICES.find(s => s.featured);
  const rest = SERVICES.filter(s => !s.featured);
  return (
    <section id="services" className="relative bg-surface-1 py-28 sm:py-40 lg:py-52">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionHeader
            kicker="Services"
            title="What we build."
            lede="Own crews, no rotating subs. When we quote a project, that's who's showing up to build it."
            maxTitleWidth="18ch"
          />
        </Reveal>

        {featured && (
          <Reveal delay={0.1}>
            <article className="card mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-5 overflow-hidden">
              <div className="md:col-span-3 p-8 sm:p-12 lg:p-20 relative">
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] font-medium text-[#C9A96A]">
                  <span className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                  {featured.subtitle}
                </span>
                <div className="text-[#C9A96A] mt-8">
                  <Icon name={featured.icon} className="w-10 h-10" />
                </div>
                <h3 className="font-display font-semibold text-[22px] sm:text-[26px] lg:text-[32px] text-white mt-6 leading-[1.2] tracking-[-0.02em] max-w-md">
                  {featured.title}
                </h3>
                <p className="prose-lede text-white/68 mt-6">{featured.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-8">
                  {featured.points.map(p => (
                    <li key={p} className="flex items-start gap-3 text-white/68 text-[14px] font-normal">
                      <span className="text-[#C9A96A] mt-0.5 shrink-0"><Icon name="check" className="w-3.5 h-3.5" /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="btn btn-primary mt-10">
                  Request egress quote
                  <span className="arrow-slide"><Icon name="arrow" className="w-3 h-3" /></span>
                </a>
              </div>
              <div className="md:col-span-2 relative min-h-[320px] md:min-h-full hover-zoom overflow-hidden">
                <img src="/images/gallery/project-05.jpg" alt="Basement egress installation" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0F0F0F]/40" />
              </div>
            </article>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.05] mt-px">
          {rest.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="bg-[#0A0A0A] p-8 sm:p-12 lg:p-16 h-full">
                <span className="text-[#C9A96A] block"><Icon name={s.icon} className="w-5 h-5" /></span>
                <h3 className="font-display font-semibold text-[18px] md:text-[19px] lg:text-[21px] text-white leading-[1.25] tracking-[-0.015em] mt-6">{s.title}</h3>
                <p className="text-white/62 text-[14.5px] leading-[1.68] mt-4 max-w-md">{s.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6 text-[13px] text-white/55">
                  {s.points.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-[#C9A96A] mt-1 shrink-0">›</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   BEFORE / AFTER: draggable comparison
   ========================================================================== */

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const setFromEvent = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const pct = ((x - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) setFromEvent(e); };
    const onUp = () => { dragging.current = false; document.body.style.userSelect = ''; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [setFromEvent]);

  const startDrag = (e) => {
    dragging.current = true;
    document.body.style.userSelect = 'none';
    setFromEvent(e);
  };

  return (
    <section id="before-after" className="relative bg-surface-2 py-28 sm:py-40 lg:py-52 border-t border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionHeader
            kicker="Transformations"
            title="Before and after."
            lede="Drag the divider to see a recent Rochester sunroom refinished by our crew."
            maxTitleWidth="16ch"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mt-16 md:mt-24">
            <div
              ref={containerRef}
              onMouseDown={startDrag}
              className="relative w-full max-w-[1200px] mx-auto aspect-[4/5] sm:aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-white/10 touch-pan-y"
              role="slider"
              aria-label="Before and after comparison"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 5));
                if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 5));
              }}
            >
              <img src="/images/gallery/after.jpg" alt="After R.J. Griffin renovation" loading="lazy" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
              >
                <img src="/images/gallery/before.jpg" alt="Before R.J. Griffin renovation" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/70 backdrop-blur">
                <div className="font-display font-semibold text-white text-[11px] tracking-[0.1em] uppercase">Before</div>
              </div>
              <div className="absolute top-5 right-5 px-3 py-1.5 bg-[#C9A96A]">
                <div className="font-display font-semibold text-black text-[11px] tracking-[0.1em] uppercase">After</div>
              </div>

              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `calc(${pos}% - 1px)` }}>
                <div className="w-0.5 h-full bg-[#F5F3EE]" />
                <button
                  aria-label="Drag to reveal"
                  className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#F5F3EE] text-[#0A0A0A] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.9)] flex items-center justify-center hover:bg-[#C9A96A] transition-colors touch-none"
                  onMouseDown={(e) => { e.preventDefault(); startDrag(e); }}
                  onTouchStart={(e) => { e.preventDefault(); startDrag(e); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M8 5l-4 7 4 7M16 5l4 7-4 7" />
                  </svg>
                </button>
              </div>
            </div>

            <figcaption className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="text-[12px] text-white/50 font-medium">
                Rochester sunroom · Refinished by R.J. Griffin
              </div>
              <div className="text-[12px] text-white/45 font-medium">
                Drag to compare · <span className="text-[#C9A96A]">{Math.round(pos)}%</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================================
   GALLERY
   ========================================================================== */

function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="gallery" className="relative bg-surface-1 py-28 sm:py-40 lg:py-52 border-t border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-20">
          <Reveal>
            <SectionHeader
              kicker="Selected work"
              title="A cross-section of recent projects."
              lede="Kitchens, baths, additions, and basement work from across the greater Rochester area."
              maxTitleWidth="18ch"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-secondary self-start lg:self-auto">
              <Icon name="facebook" className="w-3.5 h-3.5" />
              See more on Facebook
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[280px] gap-4 md:gap-5">
          {GALLERY.map((img, i) => {
            const spans = [
              'row-span-2', '', '', 'col-span-2 row-span-2', '',
              'row-span-2', '', '', '', 'col-span-2',
              '', 'row-span-2', '', '', '', 'row-span-2'
            ];
            const span = spans[i] || '';
            return (
              <Reveal key={img.src} delay={(i % 4) * 0.05} className={span}>
                <button
                  onClick={() => setLightbox(i)}
                  className="hover-zoom relative w-full h-full overflow-hidden bg-[#141414] group focus:outline-none"
                  aria-label={`View project ${i + 1}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <div className="text-[10px] tracking-[0.14em] uppercase text-white/70 font-medium">Project {String(i + 1).padStart(2, '0')}</div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-[#C9A96A] p-2 transition-colors"
              aria-label="Close"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#C9A96A] p-3 transition-colors"
              aria-label="Previous"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#C9A96A] p-3 transition-colors"
              aria-label="Next"
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[86vh] object-contain"
            />
            <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.14em] text-white/50 tabular font-medium">
              {String(lightbox + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============================================================================
   ABOUT
   ========================================================================== */

function About() {
  return (
    <section id="about" className="relative bg-surface-2 py-28 sm:py-40 lg:py-52 border-t border-white/[0.05]">
      <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden hover-zoom">
                <img src="/images/gallery/project-11.jpg" alt="R.J. Griffin project in Rochester NY" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-[11px] tracking-[0.12em] uppercase text-white/45 font-medium">
                <span>Recent work</span>
                <span><Counter end={40} suffix="+" /> years in Rochester</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal>
            <Eyebrow label="About" />
            <h2 className="font-display font-semibold text-[26px] sm:text-[30px] lg:text-[36px] leading-[1.2] tracking-[-0.02em] text-[#F5F3EE] mt-6 max-w-[18ch]">
              Forty years, one family.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 max-w-xl">
            <Reveal delay={0.05}>
              <p className="prose-lede text-white/72">
                Ron Griffin started R.J. Griffin Construction in 1986. Forty
                years later, the company is still here, still family-run, and
                still doing the work itself. Ron's son Josh handles day-to-day
                operations.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="prose-lede text-white/58">
                We don't hand your project off to a rotating cast of subs. Our
                own crews handle framing, cabinets, tile, and trim. We keep the
                schedule you agree to, and we back the work when it's done.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 border-t border-white/[0.07] pt-10 max-w-xl">
              {Object.values(BUSINESS.contacts).map(c => (
                <div key={c.name}>
                  <div className="text-[11px] tracking-[0.14em] uppercase text-[#C9A96A]/85 font-medium">{c.role}</div>
                  <div className="font-display font-semibold text-white text-[18px] md:text-[20px] tracking-[-0.015em] mt-2.5">{c.name}</div>
                  <a href={`tel:${c.tel}`} className="mt-1.5 inline-flex items-center gap-2 text-[#C9A96A] hover:text-white transition-colors text-[14px] tabular font-medium">
                    <Icon name="phone" className="w-3.5 h-3.5" /> {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   REVIEWS
   ========================================================================== */

function Reviews() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const r = REVIEWS[idx];

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % REVIEWS.length);
    }, 7000);
    return () => clearInterval(id);
  }, [reduce, paused, idx]);

  return (
    <section
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Client reviews"
      className="relative bg-surface-1 py-28 sm:py-40 lg:py-52 border-t border-white/[0.05] overflow-hidden"
    >
      {/* Shield watermark */}
      <img
        src="/logo/rjg-logo-full.png"
        alt=""
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,700px)] max-w-none opacity-[0.035] pointer-events-none select-none"
      />
      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionHeader
            kicker="Client voices"
            title="In their words."
            align="center"
            maxTitleWidth="18ch"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-20 py-6 sm:py-10 lg:py-14 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <blockquote className="font-display font-medium text-[19px] sm:text-[22px] md:text-[26px] lg:text-[30px] leading-[1.42] tracking-[-0.015em] text-white/90 max-w-4xl">
                  {r.text}
                </blockquote>

                <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <div className="font-display font-semibold text-white text-[15px] tracking-[-0.01em]">{r.author}</div>
                    <div className="text-[11px] tracking-[0.12em] uppercase text-white/45 mt-2 font-medium">{r.project} · {r.location}</div>
                  </div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-white/40 font-medium">
                    Via <span className="text-[#C9A96A]">{r.source}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="flex items-center justify-center gap-3 mt-10">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-px transition-all duration-500 ${i === idx ? 'w-16 bg-[#C9A96A]' : 'w-8 bg-white/18 hover:bg-white/35'}`}
              aria-label={`Review ${i + 1}`}
              aria-current={i === idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   AREAS SERVED
   ========================================================================== */

function AreasServed() {
  return (
    <section aria-label="Service area" className="relative bg-surface-2 py-20 md:py-28 border-t border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow label="Service area" />
            <h3 className="font-display font-semibold text-[22px] md:text-[26px] leading-[1.25] tracking-[-0.015em] text-white mt-5 max-w-[16ch]">
              Based in Spencerport, serving Rochester.
            </h3>
            <p className="text-white/55 text-[14.5px] leading-[1.7] mt-5 max-w-sm">
              Working across Monroe County and the greater Rochester area, on projects of every scale.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-2 md:gap-2.5">
              {AREAS.map(a => (
                <li key={a}>
                  <span className="inline-flex items-center gap-2 border border-white/[0.1] text-white/70 text-[12px] font-medium px-4 py-2.5 hover:border-[#C9A96A]/45 hover:text-white transition-colors">
                    <span className="w-1 h-1 rounded-full bg-[#C9A96A]" />
                    {a}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   CONTACT
   ========================================================================== */

function Contact() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validate = (fd) => {
    const e = {};
    if (!fd.get('name')?.toString().trim()) e.name = 'Enter your name.';
    const email = fd.get('email')?.toString().trim() || '';
    if (!email) e.email = 'Email required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email.';
    if (!fd.get('phone')?.toString().trim()) e.phone = 'Phone helps us follow up faster.';
    if (!fd.get('message')?.toString().trim()) e.message = 'Tell us a bit about the project.';
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const eObj = validate(fd);
    setErrors(eObj);
    if (Object.keys(eObj).length) {
      const first = ev.currentTarget.querySelector(`[name="${Object.keys(eObj)[0]}"]`);
      first && first.focus();
      return;
    }
    if (fd.get('_honey')) { setStatus('success'); return; }

    setStatus('submitting');
    try {
      const res = await fetch('https://formsubmit.co/ajax/rjgriffinconstruction@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: fd.get('name'),
          Email: fd.get('email'),
          Phone: fd.get('phone'),
          'Project Type': fd.get('project_type') || 'Not specified',
          'Project Location': fd.get('location') || 'Not specified',
          Timeline: fd.get('timeline') || 'Not specified',
          'Project Details': fd.get('message'),
          _subject: `New estimate request from ${fd.get('name')} (${fd.get('project_type') || 'general'})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: fd.get('email'),
          _autoresponse: `Hi ${fd.get('name')?.toString().split(' ')[0] || 'there'},\n\nWe got your estimate request. Ron or Josh will call you within one business day to schedule a free on-site visit.\n\nIf you need us sooner:\nRon Griffin: (585) 737-7521\nJosh Griffin: (585) 474-8657\n\nThanks,\nR.J. Griffin Construction\n1753 Manitou Road, Spencerport, NY 14559`,
        }),
      });
      if (res.ok) { setStatus('success'); ev.target.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="contact" className="relative bg-surface-3 py-28 sm:py-40 lg:py-52 border-t border-white/[0.05]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow label="Start a project" />
            <h2 className="font-display font-semibold text-[26px] sm:text-[30px] lg:text-[36px] leading-[1.2] tracking-[-0.02em] text-[#F5F3EE] mt-6 max-w-[14ch]">
              Start a conversation.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="prose-lede text-white/62 mt-6">
              Send us the details or just call. We offer free on-site estimates anywhere in the Rochester area.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 divide-y divide-white/[0.05] border-t border-white/[0.05] max-w-md">
              {Object.values(BUSINESS.contacts).map(c => (
                <div key={c.name} className="py-6">
                  <div className="text-[11px] tracking-[0.12em] uppercase text-white/45 font-medium">{c.role}</div>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <div className="font-display font-semibold text-white text-[16px] tracking-[-0.015em]">{c.name}</div>
                    <a href={`tel:${c.tel}`} className="text-[#C9A96A] hover:text-white transition-colors text-[14px] tabular font-medium">{c.phone}</a>
                  </div>
                </div>
              ))}
              <div className="py-6">
                <div className="text-[11px] tracking-[0.12em] uppercase text-white/45 font-medium">Email</div>
                <div className="mt-2">
                  <a href={`mailto:${BUSINESS.email}`} className="text-[#C9A96A] hover:text-white transition-colors text-[14px] break-all">{BUSINESS.email}</a>
                </div>
              </div>
              <div className="py-6">
                <div className="text-[11px] tracking-[0.12em] uppercase text-white/45 font-medium">Office</div>
                <div className="mt-2 text-white/70 text-[14px]">1753 Manitou Road, Spencerport, NY 14559</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="card p-6 sm:p-10 lg:p-14 space-y-8 sm:space-y-10 relative"
            >
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="absolute -left-[9999px] opacity-0" aria-hidden="true" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <Field label="Full name" name="name" required error={errors.name} placeholder="Jane Doe" autoComplete="name" />
                <Field label="Phone" name="phone" type="tel" required error={errors.phone} placeholder="(585) 555-0123" autoComplete="tel" />
                <Field className="sm:col-span-2" label="Email" name="email" type="email" required error={errors.email} placeholder="jane@email.com" autoComplete="email" />
                <SelectField label="Project type" name="project_type" options={['Kitchen remodel', 'Bathroom remodel', 'Home addition', 'Basement finishing', 'Basement egress', 'Deck / outdoor', 'Siding / windows', 'Tile / trim', 'Full renovation', 'Other']} />
                <SelectField label="Timeline" name="timeline" options={['ASAP', 'Within 1–3 months', '3–6 months', 'Just exploring']} />
                <Field className="sm:col-span-2" label="Project location" name="location" placeholder="City or neighborhood" />
                <TextArea className="sm:col-span-2" label="Tell us about the project" name="message" required error={errors.message} placeholder="Rough scope, rooms involved, anything specific we should know…" />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-5 pt-4 border-t border-white/[0.07]">
                <p className="text-[12px] text-white/45 font-medium">
                  We respond within 24 hrs · Mon–Fri, 7a–6p
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send project details'}
                  {status !== 'submitting' && <span className="arrow-slide"><Icon name="arrow" className="w-3 h-3" /></span>}
                </button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="border-l-2 border-[#C9A96A] bg-[#C9A96A]/[0.05] p-5"
                  >
                    <div className="font-display font-semibold text-white text-[16px] tracking-[-0.01em]">Thank you. We received your request.</div>
                    <p className="text-white/65 text-[14px] leading-relaxed mt-2">
                      Ron or Josh will be in touch within one business day. If you need us today, Ron is at <a href="tel:585-737-7521" className="text-[#C9A96A] hover:text-white transition-colors tabular font-medium">(585) 737-7521</a>.
                    </p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="border-l-2 border-red-500 bg-red-500/[0.05] p-5 text-[14px] text-red-100/80"
                  >
                    Something went wrong sending the form. Please call Ron at{' '}
                    <a href="tel:585-737-7521" className="underline text-red-200">(585) 737-7521</a> or email{' '}
                    <a href={`mailto:${BUSINESS.email}`} className="underline text-red-200">{BUSINESS.email}</a>.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = 'text', required, error, placeholder, autoComplete, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}{required && <span className="text-[#C9A96A] ml-1">*</span>}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`field-input ${error ? 'border-red-500' : ''}`}
      />
      {error && <span className="mt-1.5 block text-[12px] text-red-300">{error}</span>}
    </label>
  );
}

function SelectField({ label, name, options, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      <select name={name} defaultValue="" className="field-select">
        <option value="" disabled>Select…</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TextArea({ label, name, required, error, placeholder, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}{required && <span className="text-[#C9A96A] ml-1">*</span>}</span>
      <textarea name={name} rows={5} placeholder={placeholder} aria-invalid={!!error} className={`field-textarea ${error ? 'border-red-500' : ''}`} />
      {error && <span className="mt-1.5 block text-[12px] text-red-300">{error}</span>}
    </label>
  );
}

/* ============================================================================
   FOOTER
   ========================================================================== */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#070707] border-t border-white/[0.05] pt-24 md:pt-32 pb-10">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 pb-16 md:pb-24 border-b border-white/[0.05]">
          <div className="lg:col-span-6">
            <img
              src="/logo/rjg-logo-full.png"
              alt="R.J. Griffin Construction"
              className="h-32 md:h-40 lg:h-44 w-auto -ml-2"
            />
            <div className="mt-2 text-[10px] tracking-[0.24em] uppercase text-[#C9A96A]/85 font-semibold">
              Est. 1986 · Spencerport, NY
            </div>
            <p className="prose-lede text-white/55 mt-7 max-w-lg">
              Family-owned general contractor based in Spencerport, NY.
              Kitchens, baths, additions, basement egress, and full home
              renovations across the Rochester area for forty years.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-[11px] text-white/40 font-medium">
              <span className="inline-flex items-center gap-2"><Icon name="shield" className="w-3.5 h-3.5 text-[#C9A96A]" /> A+ BBB</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Fully insured</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span>Locally owned</span>
            </div>
          </div>
          <div className="lg:col-span-6 lg:pl-10 lg:border-l border-white/[0.05]">
            <span className="kicker">Ready to build?</span>
            <div className="font-display font-semibold text-[20px] sm:text-[24px] md:text-[28px] text-white leading-[1.2] tracking-[-0.02em] mt-4 max-w-md">
              Request an on-site estimate. No obligation.
            </div>
            <div className="mt-7 flex flex-wrap gap-4">
              <a href="#contact" className="btn btn-primary">
                Start a project
                <span className="arrow-slide"><Icon name="arrow" className="w-3 h-3" /></span>
              </a>
              <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="btn btn-secondary">
                <Icon name="phone" className="w-3.5 h-3.5" />
                Call Ron
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 md:gap-10 py-16 md:py-20 border-b border-white/[0.05]">
          <FooterCol title="Office">
            <div className="text-white/62 text-[14px] leading-[1.7]">
              1753 Manitou Road<br />Spencerport, NY 14559
            </div>
            <div className="mt-4">
              <a href="https://maps.google.com/?q=1753+Manitou+Road+Spencerport+NY+14559" target="_blank" rel="noopener noreferrer" className="text-[#C9A96A] hover:text-white transition-colors text-[13px] inline-flex items-center gap-1.5 font-medium">
                Get directions <Icon name="arrow" className="w-3 h-3" />
              </a>
            </div>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink href={`tel:${BUSINESS.contacts.ron.tel}`}>Ron · {BUSINESS.contacts.ron.phone}</FooterLink>
            <FooterLink href={`tel:${BUSINESS.contacts.josh.tel}`}>Josh · {BUSINESS.contacts.josh.phone}</FooterLink>
            <FooterLink href={`mailto:${BUSINESS.email}`} className="break-all">{BUSINESS.email}</FooterLink>
            <div className="text-white/48 text-[12px] mt-3 font-medium">Mon–Fri · 7:00 AM – 6:00 PM</div>
          </FooterCol>

          <FooterCol title="Quick links">
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#before-after">Transformations</FooterLink>
            <FooterLink href="#gallery">Work</FooterLink>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#reviews">Reviews</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Careers">
            <p className="text-white/55 text-[13px] leading-[1.65]">Always looking for craftsmen who take pride in their work.</p>
            <FooterLink href={`mailto:${BUSINESS.email}?subject=Careers%20Inquiry`}>Send resume →</FooterLink>
          </FooterCol>

          <FooterCol title="Safety">
            <ul className="space-y-2.5 text-white/58 text-[13px] leading-[1.65]">
              <li className="flex gap-2"><span className="text-[#C9A96A]">›</span>OSHA-compliant crews</li>
              <li className="flex gap-2"><span className="text-[#C9A96A]">›</span>Fully insured &amp; bonded</li>
              <li className="flex gap-2"><span className="text-[#C9A96A]">›</span>Clean-site policy</li>
              <li className="flex gap-2"><span className="text-[#C9A96A]">›</span>Written scope &amp; warranty</li>
            </ul>
          </FooterCol>

          <FooterCol title="Follow">
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white/70 hover:text-[#C9A96A] transition-colors text-[13px] font-medium">
              <span className="w-9 h-9 rounded-full border border-white/[0.1] flex items-center justify-center">
                <Icon name="facebook" className="w-4 h-4" />
              </span>
              Facebook
            </a>
          </FooterCol>
        </div>

        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-[12px] font-medium">
            © {year} R.J. Griffin Construction. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[12px] text-white/40 font-medium">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/70 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.14em] uppercase font-semibold text-white mb-6 pb-4 border-b border-white/[0.05]">{title}</div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, className = '' }) {
  return (
    <a href={href} className={`block text-white/62 hover:text-[#C9A96A] transition-colors text-[14px] font-normal ${className}`}>
      {children}
    </a>
  );
}

/* ============================================================================
   MOBILE STICKY CTA
   ========================================================================== */

function MobileCTA() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/[0.05] grid grid-cols-2 pb-safe">
      <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="text-white/85 text-center py-4 text-[12px] font-medium border-r border-white/[0.05] flex items-center justify-center gap-2">
        <Icon name="phone" className="w-3.5 h-3.5" />
        Call Ron
      </a>
      <a href="#contact" className="bg-[#F5F3EE] text-black text-center py-4 text-[12px] font-medium flex items-center justify-center gap-2 hover:bg-[#C9A96A] transition-colors">
        Get quote <Icon name="arrow" className="w-3 h-3" />
      </a>
    </div>
  );
}

/* ============================================================================
   ROOT
   ========================================================================== */

export default function RJGriffinSite() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EE] antialiased pb-20 lg:pb-0 overflow-x-hidden">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:text-[12px] focus:font-medium">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <TrustBadges />
        <Services />
        <BeforeAfter />
        <Gallery />
        <About />
        <Reviews />
        <AreasServed />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
