import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ============================================================================
   R.J. GRIFFIN CONSTRUCTION
   Light foundation, tactile local contractor site.
   White / slate / charcoal + amber safety accent.
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
    title: 'Basement Egress Windows',
    subtitle: 'Specialized Division',
    desc: 'Code-compliant basement egress windows and wells, installed by a crew that does this every week. We cut them, install them, and waterproof them ourselves.',
    icon: 'egress',
    featured: true,
    points: ['Code-compliant window wells', 'Egress cutouts and installations', 'Waterproofing and drainage', 'Safety-rated for finished basements'],
  },
  {
    title: 'Home Additions & Remodels',
    desc: 'Whole-house remodels, room additions, and structural work. Built to match what you already have, so it looks like it was always there.',
    icon: 'add',
    points: ['Room and second-story additions', 'Whole-house remodels', 'Structural updates', 'Basement finishing'],
  },
  {
    title: 'Kitchens & Bathrooms',
    desc: 'Full kitchen and bath remodels. Cabinetry, countertops, custom tile, plumbing, lighting, and layout changes. We handle every piece.',
    icon: 'kitchen',
    points: ['Custom cabinetry and countertops', 'Layout redesign', 'Tile showers and backsplashes', 'Vanities, tubs, and plumbing'],
  },
  {
    title: 'Siding, Windows & Exteriors',
    desc: 'Vinyl and specialty siding, replacement windows, trim, and decks. Built for Rochester winters and priced fair.',
    icon: 'siding',
    points: ['Vinyl and specialty siding', 'Replacement windows', 'Trim, soffit, and fascia', 'Decks and outdoor spaces'],
  },
  {
    title: 'Custom Construction',
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
    source: 'Facebook',
  },
  {
    text: "RJ Griffin Construction just completed this accent wall, trim and cabinet install for our salon suite. They were quick, professional and their attention to detail is spot on. Contact them for any of your renovation needs, from a full bathroom to a new kitchen, decks, or egress wells. These are your guys.",
    author: 'CJ Cutaia',
    location: 'Salon suite build-out',
    project: 'Accent wall, trim & cabinets',
    source: 'Facebook',
  },
];

const GALLERY = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/gallery/project-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `R.J. Griffin Construction project ${i + 1}, Rochester NY remodel`,
}));

const AREAS = ['Spencerport', 'Rochester', 'Brockport', 'Hilton', 'Greece', 'Chili', 'Gates', 'Pittsford', 'Fairport', 'Webster', 'Penfield', 'Henrietta', 'Irondequoit', 'Brighton', 'Monroe County'];

const PROJECT_TYPES = ['Kitchen Remodel', 'Bathroom Remodel', 'Home Addition', 'Basement Finishing', 'Basement Egress', 'Siding / Windows', 'Deck / Outdoor', 'Custom Build', 'Other'];

/* ============================================================================
   ICONS: inline SVG, unified stroke
   ========================================================================== */

const Icon = ({ name, className = 'w-5 h-5' }) => {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    kitchen: <svg viewBox="0 0 24 24" className={className} {...common}><rect x="3" y="4" width="18" height="6" rx="0.5" /><rect x="3" y="14" width="18" height="6" rx="0.5" /><path d="M8 7h1M15 7h1M8 17h1M15 17h1" /></svg>,
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
    hammer: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M15 7l3-3 3 3-3 3M15 7L9 13M9 13l-6 6 2 2 6-6M9 13l4 4" /></svg>,
    doc: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>,
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
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Eyebrow = ({ label, align = 'left', tone = 'default' }) => {
  const color = tone === 'light' ? 'text-white/60' : 'text-[#64748B]';
  return (
    <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
      <span className="w-6 h-px bg-[#D97706]" />
      <span className={`text-[11px] font-semibold tracking-[0.12em] uppercase ${color}`}>{label}</span>
    </div>
  );
};

const SectionHeader = ({ kicker, title, lede, align = 'left', maxTitleWidth = '22ch', tone = 'default' }) => {
  const centered = align === 'center';
  const titleColor = tone === 'light' ? 'text-white' : 'text-[#0F172A]';
  const ledeColor = tone === 'light' ? 'text-white/70' : 'text-[#475569]';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl`}>
      <Eyebrow label={kicker} align={align} tone={tone === 'light' ? 'light' : 'default'} />
      <h2
        className={`font-display font-semibold text-[26px] sm:text-[30px] md:text-[34px] lg:text-[38px] leading-[1.18] tracking-[-0.02em] mt-5 ${titleColor} ${centered ? 'mx-auto' : ''}`}
        style={{ maxWidth: maxTitleWidth }}
      >
        {title}
      </h2>
      {lede && <p className={`prose-lede mt-5 ${ledeColor} ${centered ? 'mx-auto' : ''}`}>{lede}</p>}
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

/* Shared: FormSubmit AJAX helper */
async function postToFormSubmit(payload) {
  const res = await fetch('https://formsubmit.co/ajax/rjgriffinconstruction@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.ok;
}

/* ============================================================================
   HEADER — light, sticky, prominent phone
   ========================================================================== */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    { label: 'Work', href: '#gallery' },
    { label: 'Transformations', href: '#before-after' },
    { label: 'About', href: '#about' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-[0_1px_0_rgba(15,23,42,0.03)]'
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className={`max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3 md:py-3.5' : 'py-4 md:py-5'}`}>
        <a href="#top" className="flex items-center gap-3 md:gap-3.5 group" aria-label="R.J. Griffin Construction, home">
          <div className={`relative overflow-hidden transition-all duration-300 ${scrolled ? 'h-10 w-10 md:h-11 md:w-11' : 'h-11 w-11 md:h-12 md:w-12'}`}>
            <img src="/logo/logo.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-semibold text-[#0F172A] text-[15px] md:text-[16px] tracking-[-0.01em]">R.J. Griffin</div>
            <div className="text-[10px] tracking-[0.14em] text-[#64748B] mt-0.5 font-medium uppercase">Construction · Since 1986</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {links.map(l => {
            const isActive = active && l.href === `#${active}`;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative text-[13.5px] font-medium transition-colors ${isActive ? 'text-[#0F172A]' : 'text-[#475569] hover:text-[#0F172A]'}`}
              >
                {l.label}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#D97706] transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          <a
            href={`tel:${BUSINESS.contacts.ron.tel}`}
            className="inline-flex items-center gap-2 text-[#0F172A] hover:text-[#D97706] transition-colors group"
          >
            <span className="w-9 h-9 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <Icon name="phone" className="w-4 h-4" />
            </span>
            <span className="hidden lg:flex flex-col leading-tight">
              <span className="text-[10px] tracking-[0.14em] text-[#64748B] uppercase font-medium">Call today</span>
              <span className="text-[14.5px] font-semibold tabular">{BUSINESS.contacts.ron.phone}</span>
            </span>
          </a>
          <a href="#quote" className="btn btn-primary">
            Get Free Estimate
            <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>
          </a>
        </div>

        <button
          className="lg:hidden text-[#0F172A] p-2 -mr-2"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
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
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-[#E2E8F0]"
          >
            <nav className="flex flex-col p-6 gap-1 max-w-[1440px] mx-auto">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display font-semibold text-[#0F172A] text-[20px] py-3 border-b border-[#E2E8F0]"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={`tel:${BUSINESS.contacts.ron.tel}`}
                onClick={() => setMenuOpen(false)}
                className="mt-6 flex items-center gap-3 py-3"
              >
                <span className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
                  <Icon name="phone" className="w-4 h-4" />
                </span>
                <div className="flex flex-col">
                  <span className="kicker">Call Ron</span>
                  <span className="font-display font-semibold text-[#0F172A] text-[18px] tabular mt-1">{BUSINESS.contacts.ron.phone}</span>
                </div>
              </a>
              <a href="#quote" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-4 w-full">
                Get Free Estimate
                <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================================
   HERO — light, split composition, image right
   ========================================================================== */

function Hero() {
  return (
    <section id="top" className="relative bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-5rem)]">
        {/* Left: content */}
        <div className="lg:col-span-6 xl:col-span-5 relative flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 pt-12 lg:pt-20 pb-16 lg:pb-20 order-2 lg:order-1">
          <div className="max-w-[560px]">
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-[#FEF3C7] text-[#B45309] px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                Family-owned since 1986
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-display font-bold text-[32px] sm:text-[38px] md:text-[42px] lg:text-[44px] xl:text-[52px] leading-[1.08] tracking-[-0.025em] text-[#0F172A] mt-6">
                Kitchen Remodeling, Additions &amp; Custom Construction in Greater Rochester
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="prose-lede text-[#475569] mt-6">
                Family-owned quality craftsmanship for over 40 years. Fully licensed, insured, and built to last. Our own crews handle every project from framing to finish.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#quote" className="btn btn-primary">
                  Get Free Estimate
                  <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>
                </a>
                <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="btn btn-secondary">
                  <Icon name="phone" className="w-3.5 h-3.5" />
                  {BUSINESS.contacts.ron.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: image */}
        <div className="lg:col-span-6 xl:col-span-7 relative overflow-hidden bg-[#F1F5F9] min-h-[46vh] lg:min-h-full order-1 lg:order-2">
          <img
            src="/images/site/hero.jpg"
            alt="R.J. Griffin Construction, recent kitchen remodel in Rochester NY"
            loading="eager"
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
          />
          {/* Corner project caption */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur px-4 py-2.5 text-[11px] tracking-[0.1em] uppercase font-semibold text-[#0F172A]">
            Recent Work · Rochester Kitchen
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <TrustBar />
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: 'clock', label: '40+ Years Experience' },
    { icon: 'shield', label: 'BBB Accredited' },
    { icon: 'check', label: 'Fully Licensed & Insured' },
    { icon: 'pin', label: 'Greater Rochester Area' },
  ];
  return (
    <div className="bg-[#0F172A] text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {items.map((it, i) => (
            <div
              key={it.label}
              className={`flex items-center gap-3 py-4 md:py-5 ${i % 2 === 1 ? 'lg:border-l lg:border-white/[0.08]' : ''} ${i < 2 ? 'border-b lg:border-b-0 border-white/[0.08]' : ''} ${i === 1 || i === 3 ? 'border-l lg:border-l-0 border-white/[0.08] pl-4 lg:pl-6' : 'lg:pl-6'} lg:pr-6`}
            >
              <span className="text-[#D97706] shrink-0"><Icon name={it.icon} className="w-4 h-4" /></span>
              <span className="text-[11.5px] md:text-[13px] font-medium tracking-[0.02em] text-white/90 whitespace-nowrap overflow-hidden text-ellipsis">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   QUICK QUOTE — 4-field high-conversion widget
   ========================================================================== */

function QuickQuote() {
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = (fd) => {
    const e = {};
    if (!fd.get('name')?.toString().trim()) e.name = 'Enter your name';
    const phone = fd.get('phone')?.toString().trim();
    if (!phone) e.phone = 'Phone required';
    if (!fd.get('zip')?.toString().trim()) e.zip = 'Town or ZIP required';
    if (!fd.get('project_type')?.toString().trim()) e.project_type = 'Choose a project type';
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
    const ok = await postToFormSubmit({
      Name: fd.get('name'),
      Phone: fd.get('phone'),
      'Town / ZIP': fd.get('zip'),
      'Project Type': fd.get('project_type'),
      _subject: `Quick Quote request from ${fd.get('name')} (${fd.get('project_type')})`,
      _template: 'table',
      _captcha: 'false',
      _autoresponse: `Hi ${fd.get('name')?.toString().split(' ')[0] || 'there'},\n\nWe got your quick quote request. Ron or Josh will call you within one business day at ${fd.get('phone')} to set up a free on-site estimate.\n\nIf you need us sooner:\nRon Griffin: (585) 737-7521\nJosh Griffin: (585) 474-8657\n\nThanks,\nR.J. Griffin Construction\n1753 Manitou Road, Spencerport, NY 14559`,
    });
    if (ok) { setStatus('success'); ev.target.reset(); }
    else setStatus('error');
  };

  return (
    <section id="quote" aria-label="Quick estimate request" className="relative bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 py-12 md:py-16 lg:py-20">
        <div className="bg-white border border-[#E2E8F0] rounded-sm p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start shadow-[0_1px_0_rgba(15,23,42,0.03),0_20px_60px_-30px_rgba(15,23,42,0.15)]">
          <div className="lg:col-span-4">
            <Eyebrow label="Get a fast quote" />
            <h2 className="font-display font-semibold text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.02em] text-[#0F172A] mt-4">
              Free on-site estimates, anywhere in the Rochester area.
            </h2>
            <p className="text-[#475569] text-[14.5px] leading-[1.65] mt-4 max-w-sm">
              Fill out four fields and we'll call you within one business day to schedule a walk-through with Ron or Josh.
            </p>
          </div>

          <form onSubmit={onSubmit} noValidate className="lg:col-span-8 relative">
            <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="absolute -left-[9999px] opacity-0" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="field-label" htmlFor="qq-name">Full Name</label>
                <input id="qq-name" name="name" type="text" autoComplete="name" placeholder="Jane Doe" className={`field-input field-compact ${errors.name ? 'border-red-500' : ''}`} aria-invalid={!!errors.name} />
                {errors.name && <span className="text-[11.5px] text-red-600 mt-1 block">{errors.name}</span>}
              </div>
              <div>
                <label className="field-label" htmlFor="qq-phone">Phone</label>
                <input id="qq-phone" name="phone" type="tel" autoComplete="tel" placeholder="(585) 555-0123" className={`field-input field-compact ${errors.phone ? 'border-red-500' : ''}`} aria-invalid={!!errors.phone} />
                {errors.phone && <span className="text-[11.5px] text-red-600 mt-1 block">{errors.phone}</span>}
              </div>
              <div>
                <label className="field-label" htmlFor="qq-zip">Town or ZIP</label>
                <input id="qq-zip" name="zip" type="text" placeholder="Spencerport / 14559" className={`field-input field-compact ${errors.zip ? 'border-red-500' : ''}`} aria-invalid={!!errors.zip} />
                {errors.zip && <span className="text-[11.5px] text-red-600 mt-1 block">{errors.zip}</span>}
              </div>
              <div>
                <label className="field-label" htmlFor="qq-project">Project Type</label>
                <select id="qq-project" name="project_type" defaultValue="" className={`field-select field-compact ${errors.project_type ? 'border-red-500' : ''}`} aria-invalid={!!errors.project_type}>
                  <option value="" disabled>Choose one</option>
                  {PROJECT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.project_type && <span className="text-[11.5px] text-red-600 mt-1 block">{errors.project_type}</span>}
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <p className="text-[11.5px] text-[#64748B]">
                By submitting you agree to be contacted by phone. No spam, ever.
              </p>
              <button type="submit" disabled={status === 'submitting'} className="btn btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'submitting' ? 'Sending…' : 'Request My Estimate'}
                {status !== 'submitting' && <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>}
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
                  className="mt-4 bg-[#FEF3C7] border-l-2 border-[#D97706] text-[#0F172A] px-4 py-3 text-[14px]"
                >
                  <strong className="font-semibold">Thanks — we got your request.</strong> Ron or Josh will call you within one business day.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="mt-4 bg-red-50 border-l-2 border-red-600 text-red-900 px-4 py-3 text-[14px]">
                  Submission failed. Call Ron directly at <a href="tel:585-737-7521" className="underline font-semibold">(585) 737-7521</a>.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
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
    <section id="services" className="relative bg-white py-24 sm:py-32 lg:py-40 border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionHeader
            kicker="Services"
            title="What we build."
            lede="Our own crews on every project. No rotating subs. When we quote a job, that's who's showing up to build it."
            maxTitleWidth="18ch"
          />
        </Reveal>

        {featured && (
          <Reveal delay={0.1}>
            <article className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-5 border border-[#E2E8F0] overflow-hidden">
              <div className="md:col-span-3 p-8 sm:p-12 lg:p-16 relative bg-white">
                <div className="inline-flex items-center gap-2 bg-[#FEF3C7] text-[#B45309] px-3 py-1.5 rounded-full text-[10.5px] font-semibold tracking-[0.08em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  {featured.subtitle}
                </div>
                <div className="text-[#D97706] mt-8">
                  <Icon name={featured.icon} className="w-9 h-9" />
                </div>
                <h3 className="font-display font-semibold text-[22px] sm:text-[26px] lg:text-[32px] text-[#0F172A] mt-5 leading-[1.18] tracking-[-0.02em] max-w-md">
                  {featured.title}
                </h3>
                <p className="prose-lede text-[#475569] mt-5">{featured.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-7">
                  {featured.points.map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-[#334155] text-[14px]">
                      <span className="text-[#D97706] mt-0.5 shrink-0"><Icon name="check" className="w-4 h-4" /></span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#quote" className="btn btn-primary mt-9">
                  Request an Egress Quote
                  <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>
                </a>
              </div>
              <div className="md:col-span-2 relative min-h-[300px] md:min-h-full hover-zoom overflow-hidden">
                <img src="/images/gallery/project-05.jpg" alt="Basement egress installation by R.J. Griffin" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </article>
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E2E8F0] mt-px border-x border-b border-[#E2E8F0]">
          {rest.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="bg-white group p-8 sm:p-10 lg:p-14 h-full transition-colors duration-300 hover:bg-[#F8FAFC]">
                <span className="text-[#D97706] block"><Icon name={s.icon} className="w-6 h-6" /></span>
                <h3 className="font-display font-semibold text-[19px] md:text-[20px] lg:text-[22px] text-[#0F172A] leading-[1.25] tracking-[-0.015em] mt-6">{s.title}</h3>
                <p className="text-[#475569] text-[14.5px] leading-[1.68] mt-4 max-w-md">{s.desc}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6 text-[13.5px] text-[#64748B]">
                  {s.points.map(p => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="text-[#D97706] mt-0.5 shrink-0">›</span>
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
   BEFORE / AFTER — draggable comparison
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
    <section id="before-after" className="relative bg-[#F8FAFC] py-24 sm:py-32 lg:py-40 border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionHeader
            kicker="Transformations"
            title="Before and after."
            lede="Drag the divider to see a recent Rochester sunroom refinished by our crew."
            maxTitleWidth="16ch"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mt-14 md:mt-20">
            <div
              ref={containerRef}
              onMouseDown={startDrag}
              className="relative w-full max-w-[1200px] mx-auto aspect-[4/5] sm:aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-[#E2E8F0] bg-[#F1F5F9] touch-pan-y"
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
              <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                <img src="/images/gallery/before.jpg" alt="Before R.J. Griffin renovation" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white text-[#0F172A]">
                <div className="font-display font-semibold text-[11.5px] tracking-[0.08em] uppercase">Before</div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#D97706] text-white">
                <div className="font-display font-semibold text-[11.5px] tracking-[0.08em] uppercase">After</div>
              </div>

              <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `calc(${pos}% - 1px)` }}>
                <div className="w-0.5 h-full bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.1)]" />
                <button
                  aria-label="Drag to reveal"
                  className="pointer-events-auto absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-[#0F172A] shadow-[0_8px_24px_-6px_rgba(15,23,42,0.35)] flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors touch-none border border-[#E2E8F0]"
                  onMouseDown={(e) => { e.preventDefault(); startDrag(e); }}
                  onTouchStart={(e) => { e.preventDefault(); startDrag(e); }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M8 5l-4 7 4 7M16 5l4 7-4 7" />
                  </svg>
                </button>
              </div>
            </div>

            <figcaption className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] font-medium text-[#64748B]">
              <span>Rochester sunroom · Refinished by R.J. Griffin</span>
              <span>Drag to compare · <span className="text-[#D97706] tabular">{Math.round(pos)}%</span></span>
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
    <section id="gallery" className="relative bg-white py-24 sm:py-32 lg:py-40 border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-16">
          <Reveal>
            <SectionHeader
              kicker="Selected Work"
              title="A cross-section of recent projects."
              lede="Kitchens, baths, additions, and basement work from across the greater Rochester area."
              maxTitleWidth="20ch"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-secondary self-start lg:self-auto">
              <Icon name="facebook" className="w-3.5 h-3.5" />
              See more on Facebook
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[220px] md:auto-rows-[280px] gap-3 md:gap-4">
          {GALLERY.map((img, i) => {
            const spans = [
              'row-span-2', '', '', 'col-span-2 row-span-2', '',
              'row-span-2', '', '', '', 'col-span-2',
              '', 'row-span-2', '', '', '', 'row-span-2'
            ];
            const span = spans[i] || '';
            return (
              <Reveal key={img.src} delay={(i % 4) * 0.04} className={span}>
                <button
                  onClick={() => setLightbox(i)}
                  className="hover-zoom relative w-full h-full overflow-hidden bg-[#F1F5F9] group focus:outline-none"
                  aria-label={`View project ${i + 1}`}
                >
                  <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-[10.5px] tracking-[0.12em] uppercase text-white/85 font-semibold">Project {String(i + 1).padStart(2, '0')}</div>
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
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-[#0F172A]/96 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }} className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-[#D97706] p-2 transition-colors" aria-label="Close">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#D97706] p-3 transition-colors" aria-label="Previous">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#D97706] p-3 transition-colors" aria-label="Next">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[92vw] max-h-[86vh] object-contain"
            />
            <div className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.12em] uppercase text-white/60 tabular font-medium">
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
    <section id="about" className="relative bg-[#F8FAFC] py-24 sm:py-32 lg:py-40 border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden hover-zoom bg-[#F1F5F9]">
                <img src="/images/gallery/project-11.jpg" alt="R.J. Griffin project in Rochester NY" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-4 flex items-center justify-between text-[11px] tracking-[0.12em] uppercase text-[#64748B] font-medium">
                <span>Recent work</span>
                <span><Counter end={40} suffix="+" /> years in Rochester</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal>
            <Eyebrow label="About" />
            <h2 className="font-display font-semibold text-[26px] sm:text-[30px] lg:text-[38px] leading-[1.18] tracking-[-0.02em] text-[#0F172A] mt-5 max-w-[20ch]">
              Two generations of Griffin craftsmen.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 max-w-xl">
            <Reveal delay={0.05}>
              <p className="prose-lede text-[#475569]">
                Ron Griffin started R.J. Griffin Construction in 1986. Forty years later, the company is still here, still family-run, and still doing the work itself. Ron's son Josh handles day-to-day operations.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="prose-lede text-[#64748B]">
                We don't hand your project off to a rotating cast of subs. Our own crews handle framing, cabinets, tile, and trim. We keep the schedule you agree to, and we back the work when it's done.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 border-t border-[#E2E8F0] pt-10 max-w-xl">
              {Object.values(BUSINESS.contacts).map(c => (
                <div key={c.name}>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-[#D97706] font-semibold">{c.role}</div>
                  <div className="font-display font-semibold text-[#0F172A] text-[19px] tracking-[-0.015em] mt-2.5">{c.name}</div>
                  <a href={`tel:${c.tel}`} className="mt-1.5 inline-flex items-center gap-2 text-[#D97706] hover:text-[#B45309] transition-colors text-[14px] tabular font-semibold">
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
   REVIEWS — dark panel for editorial rhythm
   ========================================================================== */

function Reviews() {
  const [idx, setIdx] = useState(0);
  const r = REVIEWS[idx];
  return (
    <section id="reviews" className="relative bg-[#0F172A] text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-lines-dark opacity-100 pointer-events-none" />
      <div className="relative max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-14">
        <Reveal>
          <SectionHeader
            tone="light"
            kicker="In their words"
            title="What clients say after we leave."
            align="center"
            maxTitleWidth="22ch"
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-14 md:mt-20 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <blockquote className="font-display font-medium text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] leading-[1.42] tracking-[-0.015em] text-white/95 max-w-4xl mx-auto text-center">
                  &ldquo;{r.text}&rdquo;
                </blockquote>

                <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
                  <div className="text-center sm:text-left">
                    <div className="font-display font-semibold text-white text-[15.5px] tracking-[-0.01em]">{r.author}</div>
                    <div className="text-[11px] tracking-[0.12em] uppercase text-white/55 mt-1.5 font-medium">{r.project} · {r.location}</div>
                  </div>
                  <div className="text-[11px] tracking-[0.12em] uppercase text-white/50 font-medium">
                    Via <span className="text-[#F59E0B]">{r.source}</span>
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
              className={`h-[2px] transition-all duration-300 ${i === idx ? 'w-16 bg-[#D97706]' : 'w-8 bg-white/20 hover:bg-white/40'}`}
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
    <section aria-label="Service area" className="relative bg-white py-20 md:py-28 border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-4">
          <Reveal>
            <Eyebrow label="Service Area" />
            <h3 className="font-display font-semibold text-[22px] md:text-[26px] leading-[1.22] tracking-[-0.015em] text-[#0F172A] mt-5 max-w-[18ch]">
              Serving the greater Rochester area from Spencerport.
            </h3>
            <p className="text-[#475569] text-[14.5px] leading-[1.7] mt-5 max-w-sm">
              Working across Monroe County on projects of every scale, from single bathrooms to whole-house builds.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <Reveal delay={0.08}>
            <ul className="flex flex-wrap gap-2 md:gap-2.5">
              {AREAS.map(a => (
                <li key={a}>
                  <span className="inline-flex items-center gap-2 border border-[#E2E8F0] bg-white text-[#0F172A] text-[12.5px] font-medium px-4 py-2.5 hover:border-[#D97706] hover:text-[#B45309] transition-colors">
                    <span className="w-1 h-1 rounded-full bg-[#D97706]" />
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
   CONTACT — full form
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
    const ok = await postToFormSubmit({
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
      _autoresponse: `Hi ${fd.get('name')?.toString().split(' ')[0] || 'there'},\n\nWe got your estimate request. Ron or Josh will be in touch within one business day to schedule a free on-site visit.\n\nIf you need us sooner:\nRon Griffin: (585) 737-7521\nJosh Griffin: (585) 474-8657\n\nThanks,\nR.J. Griffin Construction\n1753 Manitou Road, Spencerport, NY 14559`,
    });
    if (ok) { setStatus('success'); ev.target.reset(); }
    else setStatus('error');
  };

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32 lg:py-40 border-t border-[#E2E8F0]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow label="Contact" />
            <h2 className="font-display font-semibold text-[26px] sm:text-[30px] lg:text-[38px] leading-[1.18] tracking-[-0.02em] text-[#0F172A] mt-5 max-w-[16ch]">
              Start your project.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="prose-lede text-[#475569] mt-6">
              Send us the details or just call. Free on-site estimates anywhere in the Rochester area.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 divide-y divide-[#E2E8F0] border-t border-[#E2E8F0] max-w-md">
              {Object.values(BUSINESS.contacts).map(c => (
                <div key={c.name} className="py-5">
                  <div className="text-[11px] tracking-[0.12em] uppercase text-[#64748B] font-semibold">{c.role}</div>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <div className="font-display font-semibold text-[#0F172A] text-[16px] tracking-[-0.015em]">{c.name}</div>
                    <a href={`tel:${c.tel}`} className="text-[#D97706] hover:text-[#B45309] transition-colors text-[14.5px] tabular font-semibold">{c.phone}</a>
                  </div>
                </div>
              ))}
              <div className="py-5">
                <div className="text-[11px] tracking-[0.12em] uppercase text-[#64748B] font-semibold">Email</div>
                <div className="mt-2">
                  <a href={`mailto:${BUSINESS.email}`} className="text-[#D97706] hover:text-[#B45309] transition-colors text-[14px] break-all font-medium">{BUSINESS.email}</a>
                </div>
              </div>
              <div className="py-5">
                <div className="text-[11px] tracking-[0.12em] uppercase text-[#64748B] font-semibold">Office</div>
                <div className="mt-2 text-[#334155] text-[14.5px]">1753 Manitou Road, Spencerport, NY 14559</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.05}>
            <form ref={formRef} onSubmit={onSubmit} noValidate className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-10 relative">
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="absolute -left-[9999px] opacity-0" aria-hidden="true" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                <Field label="Full Name" name="name" required error={errors.name} placeholder="Jane Doe" autoComplete="name" />
                <Field label="Phone" name="phone" type="tel" required error={errors.phone} placeholder="(585) 555-0123" autoComplete="tel" />
                <Field className="sm:col-span-2" label="Email" name="email" type="email" required error={errors.email} placeholder="jane@email.com" autoComplete="email" />
                <SelectField label="Project Type" name="project_type" options={PROJECT_TYPES} />
                <SelectField label="Timeline" name="timeline" options={['ASAP', 'Within 1–3 months', '3–6 months', 'Just exploring']} />
                <Field className="sm:col-span-2" label="Project Location" name="location" placeholder="City or neighborhood" />
                <TextArea className="sm:col-span-2" label="Tell us about the project" name="message" required error={errors.message} placeholder="Rough scope, rooms involved, anything specific we should know…" />
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E8F0]">
                <p className="text-[12px] text-[#64748B]">We respond within 24 hrs · Mon–Fri, 7a–6p</p>
                <button type="submit" disabled={status === 'submitting'} className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === 'submitting' ? 'Sending…' : 'Send Project Details'}
                  {status !== 'submitting' && <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>}
                </button>
              </div>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" aria-live="polite" className="border-l-2 border-[#D97706] bg-[#FEF3C7] px-5 py-4">
                    <div className="font-display font-semibold text-[#0F172A] text-[15.5px]">Thank you. We received your request.</div>
                    <p className="text-[#334155] text-[14px] leading-relaxed mt-1.5">
                      Ron or Josh will be in touch within one business day. If you need us today, Ron is at <a href="tel:585-737-7521" className="text-[#B45309] hover:text-[#0F172A] transition-colors tabular font-semibold">(585) 737-7521</a>.
                    </p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="alert" className="border-l-2 border-red-600 bg-red-50 px-5 py-4 text-[14px] text-red-900">
                    Something went wrong sending the form. Please call Ron at <a href="tel:585-737-7521" className="underline font-semibold">(585) 737-7521</a> or email <a href={`mailto:${BUSINESS.email}`} className="underline font-semibold">{BUSINESS.email}</a>.
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
      <span className="field-label">{label}{required && <span className="text-[#D97706] ml-1">*</span>}</span>
      <input name={name} type={type} placeholder={placeholder} autoComplete={autoComplete} aria-invalid={!!error} className={`field-input ${error ? 'border-red-500' : ''}`} />
      {error && <span className="mt-1.5 block text-[12px] text-red-600">{error}</span>}
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
      <span className="field-label">{label}{required && <span className="text-[#D97706] ml-1">*</span>}</span>
      <textarea name={name} rows={5} placeholder={placeholder} aria-invalid={!!error} className={`field-textarea ${error ? 'border-red-500' : ''}`} />
      {error && <span className="mt-1.5 block text-[12px] text-red-600">{error}</span>}
    </label>
  );
}

/* ============================================================================
   FOOTER — dark, enterprise
   ========================================================================== */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-[#0F172A] text-white pt-20 md:pt-24 pb-8">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-14 md:pb-20 border-b border-white/[0.08]">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 md:h-16 md:w-16 overflow-hidden shrink-0">
                <img src="/logo/logo.jpg" alt="R.J. Griffin Construction" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display font-semibold text-white text-[16px] md:text-[17px] tracking-[-0.01em]">R.J. Griffin</div>
                <div className="text-[10px] md:text-[11px] tracking-[0.14em] text-white/50 mt-1.5 font-medium uppercase">Construction · Since 1986</div>
              </div>
            </div>
            <p className="text-white/70 mt-7 max-w-lg text-[15.5px] leading-[1.7]">
              Family-owned general contractor based in Spencerport, NY. Kitchens, baths, additions, basement egress, and full home renovations across the Rochester area for over 40 years.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 text-[11.5px] text-white/60 font-medium">
              <span className="inline-flex items-center gap-2"><Icon name="shield" className="w-3.5 h-3.5 text-[#D97706]" /> A+ BBB Accredited</span>
              <span className="w-1 h-1 bg-white/25 rounded-full" />
              <span>Licensed &amp; Insured</span>
              <span className="w-1 h-1 bg-white/25 rounded-full" />
              <span>Locally Owned</span>
            </div>
          </div>
          <div className="lg:col-span-6 lg:pl-10 lg:border-l border-white/[0.08]">
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#D97706] font-semibold">Ready to Start?</span>
            <div className="font-display font-semibold text-[22px] sm:text-[26px] md:text-[30px] text-white leading-[1.2] tracking-[-0.02em] mt-4 max-w-md">
              Free on-site estimate. No obligation.
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#quote" className="btn btn-primary">
                Get Free Estimate
                <span className="arrow-slide"><Icon name="arrow" className="w-3.5 h-3.5" /></span>
              </a>
              <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="btn btn-secondary" style={{ background: 'transparent', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.25)' }}>
                <Icon name="phone" className="w-3.5 h-3.5" />
                {BUSINESS.contacts.ron.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-8 py-14 md:py-16 border-b border-white/[0.08]">
          <FooterCol title="Office">
            <div className="text-white/68 text-[14px] leading-[1.7]">
              1753 Manitou Road<br />Spencerport, NY 14559
            </div>
            <div className="mt-4">
              <a href="https://maps.google.com/?q=1753+Manitou+Road+Spencerport+NY+14559" target="_blank" rel="noopener noreferrer" className="text-[#D97706] hover:text-white transition-colors text-[13px] inline-flex items-center gap-1.5 font-semibold">
                Get directions <Icon name="arrow" className="w-3 h-3" />
              </a>
            </div>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink href={`tel:${BUSINESS.contacts.ron.tel}`}>Ron · {BUSINESS.contacts.ron.phone}</FooterLink>
            <FooterLink href={`tel:${BUSINESS.contacts.josh.tel}`}>Josh · {BUSINESS.contacts.josh.phone}</FooterLink>
            <FooterLink href={`mailto:${BUSINESS.email}`} className="break-all">{BUSINESS.email}</FooterLink>
            <div className="text-white/50 text-[12px] mt-3 font-medium">Mon–Fri · 7:00 AM – 6:00 PM</div>
          </FooterCol>

          <FooterCol title="Quick Links">
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#gallery">Work</FooterLink>
            <FooterLink href="#before-after">Transformations</FooterLink>
            <FooterLink href="#about">About</FooterLink>
            <FooterLink href="#reviews">Reviews</FooterLink>
            <FooterLink href="#contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Careers">
            <p className="text-white/60 text-[13px] leading-[1.65]">Always looking for craftsmen who take pride in their work.</p>
            <FooterLink href={`mailto:${BUSINESS.email}?subject=Careers%20Inquiry`}>Send resume →</FooterLink>
          </FooterCol>

          <FooterCol title="Safety">
            <ul className="space-y-2.5 text-white/62 text-[13px] leading-[1.65]">
              <li className="flex gap-2"><span className="text-[#D97706]">›</span>OSHA-compliant crews</li>
              <li className="flex gap-2"><span className="text-[#D97706]">›</span>Fully insured &amp; bonded</li>
              <li className="flex gap-2"><span className="text-[#D97706]">›</span>Clean-site policy</li>
              <li className="flex gap-2"><span className="text-[#D97706]">›</span>Written scope &amp; warranty</li>
            </ul>
          </FooterCol>

          <FooterCol title="Follow">
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white/70 hover:text-[#D97706] transition-colors text-[13px] font-medium">
              <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center">
                <Icon name="facebook" className="w-4 h-4" />
              </span>
              Facebook
            </a>
          </FooterCol>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-white/45 text-[12px] font-medium">
            © {year} R.J. Griffin Construction. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[12px] text-white/45 font-medium">
            <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/80 transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.14em] uppercase font-semibold text-white mb-5 pb-3 border-b border-white/[0.08]">{title}</div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, className = '' }) {
  return (
    <a href={href} className={`block text-white/68 hover:text-[#D97706] transition-colors text-[14px] font-normal ${className}`}>
      {children}
    </a>
  );
}

/* ============================================================================
   MOBILE STICKY CTA — visible <640px only per spec
   ========================================================================== */

function MobileCTA() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] grid grid-cols-2 pb-safe shadow-[0_-4px_16px_-8px_rgba(15,23,42,0.15)]">
      <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="text-[#0F172A] text-center py-4 text-[13px] font-semibold border-r border-[#E2E8F0] flex items-center justify-center gap-2">
        <Icon name="phone" className="w-4 h-4 text-[#D97706]" />
        Call Now
      </a>
      <a href="#quote" className="bg-[#D97706] text-white text-center py-4 text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#B45309] transition-colors">
        <Icon name="doc" className="w-4 h-4" />
        Quick Estimate
      </a>
    </div>
  );
}

/* ============================================================================
   ROOT
   ========================================================================== */

export default function RJGriffinSite() {
  return (
    <div className="min-h-screen bg-white text-[#0F172A] antialiased pb-16 sm:pb-0 overflow-x-hidden">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#0F172A] focus:text-white focus:px-4 focus:py-2 focus:text-[12px] focus:font-medium">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <QuickQuote />
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
