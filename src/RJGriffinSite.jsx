import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// ============================================================================
// RJ GRIFFIN CONSTRUCTION — brand palette derived from the shield/griffin logo
// bg:      #0a0a0a  (near-black)
// panel:   #141414
// silver:  #c9c9c9  (chrome mid)
// steel:   #8a8a8a  (chrome shadow)
// bone:    #f5f5f5  (body text)
// ============================================================================

const BUSINESS = {
  name: 'RJ Griffin Construction',
  tagline: 'Built to Outlast.',
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
    title: 'Basement Egress Solutions',
    subtitle: 'Specialized Division',
    desc: 'Basement egress windows and wells that pass code. We cut them, we install them, we waterproof them. A dedicated crew that does this every week.',
    icon: 'egress',
    featured: true,
    points: ['Code-compliant window wells', 'Egress window cutouts & installs', 'Waterproofing & drainage', 'Safety-rated for finished basements'],
  },
  {
    title: 'Home Remodeling & Additions',
    desc: 'Whole-house remodels, room additions, and structural work. Built to match what you already have so it looks like it was always there.',
    icon: 'add',
    points: ['Room & second-story additions', 'Whole-house remodels', 'Structural updates', 'Basement finishing'],
  },
  {
    title: 'Kitchen & Bathroom Design',
    desc: 'Full kitchen and bath remodels. Cabinets, countertops, custom tile, plumbing, lighting, and layout changes. We handle every piece.',
    icon: 'kitchen',
    points: ['Custom cabinetry & countertops', 'Layout redesign', 'Custom tile installation', 'Vanities, tubs & tile showers'],
  },
  {
    title: 'Exteriors',
    desc: 'Vinyl and specialty siding, replacement windows, trim work, and decks. Built for Rochester winters and priced fair.',
    icon: 'siding',
    points: ['Vinyl & specialty siding', 'Replacement windows', 'Trim, soffit & fascia', 'Decks & outdoor spaces'],
  },
  {
    title: 'General Construction & Building',
    desc: 'Custom builds, commercial suite build-outs, accent walls, cabinets, trim. If it takes a hammer and a level, we do it.',
    icon: 'reno',
    points: ['Custom builds', 'Commercial build-outs', 'Trim & cabinet installs', 'Property enhancements'],
  },
];

const REVIEWS = [
  {
    text: "We highly recommend RJ Griffin! We had our laundry closet upgraded and a hall closet turned into a mudroom space. Finished off with some updates to the connected powder room. Everything turned out even better than I envisioned. The team was professional and neat. Cost and timeline estimates were reasonable with excellent communication throughout the project. We will definitely be using them for our next project!",
    author: 'Valerie Lamoreaux',
    location: 'Rochester, NY',
    project: 'Laundry, Mudroom & Powder Room',
    stars: 5,
    source: 'Facebook',
  },
  {
    text: "RJ Griffin Construction just completed this accent wall, trim and cabinet install for our salon suite! They were quick, professional and their attention to detail is spot on! Contact them for any of your renovation needs whether it's a full bathroom renovation to a new kitchen, decks or egress wells! These are your guys!",
    author: 'CJ Cutaia',
    location: 'Salon Suite Build-Out',
    project: 'Accent Wall, Trim & Cabinets',
    stars: 5,
    source: 'Facebook',
  },
];

const GALLERY = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/gallery/project-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `RJ Griffin Construction project ${i + 1} — Rochester NY remodel`,
}));

const AREAS = ['Spencerport', 'Rochester', 'Brockport', 'Hilton', 'Greece', 'Chili', 'Gates', 'Pittsford', 'Fairport', 'Webster', 'Penfield', 'Henrietta', 'Irondequoit', 'Brighton', 'Monroe County'];

// ============================================================================
// Icon set — inline SVG, chrome-styled
// ============================================================================
const Icon = ({ name, className = 'w-8 h-8' }) => {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    kitchen: <svg viewBox="0 0 24 24" className={className} {...common}><rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M8 7h1M8 17h1M15 7h1M15 17h1"/></svg>,
    bath: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M4 12h16v4a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3z"/><path d="M7 12V6a2 2 0 0 1 4 0"/><path d="M9 6l1.5 1.5"/><path d="M6 20l-1 2M18 20l1 2"/></svg>,
    add: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M3 12l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/><path d="M17 3v4M15 5h4"/></svg>,
    egress: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M4 20h16"/><path d="M4 20V4h16v16"/><rect x="8" y="8" width="8" height="10"/><path d="M8 13h8"/><path d="M2 20l2-4M22 20l-2-4"/></svg>,
    siding: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M3 4h18v16H3z"/><path d="M3 8h18M3 12h18M3 16h18"/></svg>,
    reno: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M14 2l8 8-4 4-8-8z"/><path d="M10 6L2 14l6 6 8-8"/><path d="M6 18l-3 3"/></svg>,
    check: <svg viewBox="0 0 24 24" className={className} {...common}><path d="M20 6L9 17l-5-5"/></svg>,
  };
  return map[name] || null;
};

// Griffin shield SVG mark — simplified silhouette of the logo
const GriffinShield = ({ className = 'w-16 h-16' }) => (
  <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="chrome" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="30%" stopColor="#d8d8d8" />
        <stop offset="55%" stopColor="#7a7a7a" />
        <stop offset="80%" stopColor="#a8a8a8" />
        <stop offset="100%" stopColor="#e0e0e0" />
      </linearGradient>
    </defs>
    <path
      d="M50 5 L92 15 L92 65 Q92 95 50 115 Q8 95 8 65 L8 15 Z"
      fill="none"
      stroke="url(#chrome)"
      strokeWidth="3"
    />
    <path
      d="M50 15 L85 22 L85 62 Q85 88 50 105 Q15 88 15 62 L15 22 Z"
      fill="none"
      stroke="url(#chrome)"
      strokeWidth="1.5"
      opacity="0.6"
    />
    {/* Simplified rearing griffin */}
    <g fill="url(#chrome)" transform="translate(50 60)">
      <path d="M-15 20 Q-18 10 -10 5 Q-5 0 0 -5 Q3 -12 -2 -18 Q4 -22 8 -18 Q12 -14 10 -8 Q15 -4 18 4 Q20 12 15 20 Q10 24 5 22 L0 24 Q-8 26 -15 20 Z" />
      <circle cx="6" cy="-15" r="1.5" fill="#0a0a0a" />
    </g>
  </svg>
);

// ============================================================================
// SECTIONS
// ============================================================================

function Header({ onNavClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { label: 'Work', href: '#gallery' },
    { label: 'Services', href: '#services' },
    { label: 'Transformations', href: '#before-after' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'About', href: '#about' },
  ];
  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-2' : 'bg-gradient-to-b from-black/60 to-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <img src="/logo/logo.jpg" alt="RJ Griffin Construction shield logo" className={`transition-all ${scrolled ? 'h-10' : 'h-12'} w-auto rounded-sm`} />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-white text-sm tracking-widest">R.J GRIFFIN</div>
            <div className="text-[10px] tracking-[0.3em] text-white/50">CONSTRUCTION</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-sm font-medium">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-white/70 hover:text-white transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-white/80 to-white/20 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#contact" className="relative overflow-hidden bg-gradient-to-b from-white to-white/80 text-black px-4 lg:px-5 py-2 font-display text-xs tracking-widest hover:from-white hover:to-white transition-all">
            GET QUOTE
          </a>
        </nav>
        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <nav className="flex flex-col p-6 gap-4">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white text-lg font-display tracking-wider">
                  {l.label.toUpperCase()}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 bg-white text-black px-5 py-3 font-display text-center tracking-widest">
                GET QUOTE
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-black grain">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src="/images/site/hero.jpg" alt="RJ Griffin Construction custom kitchen remodel in Rochester, NY" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 min-h-[100svh] flex flex-col justify-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/60" />
          <span className="text-white/60 text-xs tracking-[0.4em] font-medium">BASED IN SPENCERPORT · SERVING ROCHESTER, NY</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[2.75rem] sm:text-7xl lg:text-8xl leading-[0.9] mb-6 max-w-4xl"
        >
          <span className="text-shine block">BUILT TO</span>
          <span className="text-white block">OUTLAST.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/70 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed"
        >
          40 years building in Rochester. Kitchens, baths, additions, basement egress, siding. Our own crews. Start to finish.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <a href="#contact" className="group relative overflow-hidden bg-white text-black font-display tracking-widest px-8 py-4 text-sm hover:pl-10 transition-all">
            <span className="relative z-10">START YOUR PROJECT →</span>
          </a>
          <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="border border-white/30 text-white font-display tracking-widest px-6 sm:px-8 py-4 text-xs sm:text-sm hover:bg-white/10 transition-all whitespace-nowrap">
            <span className="sm:hidden">CALL {BUSINESS.contacts.ron.phone}</span>
            <span className="hidden sm:inline">CALL RON · {BUSINESS.contacts.ron.phone}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 sm:gap-10 mt-auto"
        >
          {[
            { n: '40+', l: 'YEARS BUILDING' },
            { n: '1000s', l: 'PROJECTS COMPLETED' },
            { n: '★★★★★', l: 'CLIENT REVIEWS' },
            { n: 'A+', l: 'BBB ACCREDITED' },
          ].map((s) => (
            <div key={s.l} className="border-l-2 border-white/20 pl-3 sm:pl-4">
              <div className="font-display text-xl sm:text-2xl text-chrome">{s.n}</div>
              <div className="text-[9px] sm:text-[10px] text-white/50 tracking-[0.2em] sm:tracking-[0.25em] mt-1 leading-tight">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}

function MarqueeStrip() {
  const items = ['KITCHENS', 'BATHS', 'ADDITIONS', 'BASEMENTS', 'DECKS', 'SIDING', 'WINDOWS', 'TILE', 'TRIM', 'RENOVATIONS'];
  const full = [...items, ...items, ...items];
  return (
    <div className="bg-black border-y border-white/10 py-6 overflow-hidden relative">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {full.map((t, i) => (
          <div key={i} className="flex items-center gap-16 font-display text-2xl sm:text-4xl text-chrome shrink-0">
            {t}
            <span className="text-white/20">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const featured = SERVICES.find(s => s.featured);
  const rest = SERVICES.filter(s => !s.featured);
  return (
    <section id="services" className="relative bg-[#0a0a0a] py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0f0f0f] to-black" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-white/50 text-xs tracking-[0.4em]">01 · WHAT WE BUILD</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mb-4">
            <span className="text-white">WHAT </span>
            <span className="text-chrome">WE DO.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            We do our own work with our own crews. No rotating subs, no runaround. When we quote a project, that's who's showing up to build it.
          </p>
        </div>

        {/* Featured: Basement Egress Solutions */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-black border border-white/10 mb-8 grid grid-cols-1 md:grid-cols-5"
          >
            <div className="md:col-span-3 p-8 sm:p-12 relative">
              <div className="absolute top-0 right-0 bg-white text-black font-display text-[10px] tracking-[0.3em] px-4 py-2">
                SPECIALIZED DIVISION
              </div>
              <div className="text-chrome mb-6">
                <Icon name={featured.icon} className="w-14 h-14" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-white mb-4 tracking-wide">
                {featured.title.toUpperCase()}
              </h3>
              <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                {featured.desc}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {featured.points.map(p => (
                  <li key={p} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-chrome"><Icon name="check" className="w-4 h-4" /></span>
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-flex items-center gap-2 bg-white text-black font-display text-xs tracking-widest px-6 py-3 hover:tracking-[0.3em] transition-all">
                REQUEST EGRESS QUOTE →
              </a>
            </div>
            <div className="md:col-span-2 relative min-h-[240px] md:min-h-full">
              <img src="/images/gallery/project-05.jpg" alt="Basement egress installation" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#141414]" />
            </div>
          </motion.div>
        )}

        {/* Other services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {rest.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-[#0a0a0a] p-8 sm:p-10 hover:bg-[#131313] transition-colors duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-px bg-gradient-to-r from-white via-white/60 to-transparent group-hover:w-full transition-all duration-700" />
              <div className="flex items-start gap-6">
                <div className="text-chrome shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={s.icon} className="w-12 h-12" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl sm:text-2xl text-white mb-3 tracking-wide">{s.title.toUpperCase()}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/50">
                    {s.points.map(p => (
                      <li key={p} className="flex items-center gap-1.5">
                        <span className="text-chrome">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  const badges = [
    { title: 'A+ RATED', sub: 'BBB ACCREDITED', icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    )},
    { title: '40+ YEARS', sub: 'EXPERIENCE', icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
    )},
    { title: 'LOCALLY OWNED', sub: '& OPERATED · SPENCERPORT NY', icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
    )},
    { title: 'FULLY INSURED', sub: '& LICENSED CONTRACTOR', icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"/></svg>
    )},
  ];
  return (
    <section className="relative bg-black py-14 border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="text-chrome group-hover:scale-110 transition-transform duration-300">
                {b.icon}
              </div>
              <div>
                <div className="font-display text-white text-lg tracking-wider">{b.title}</div>
                <div className="text-white/50 text-[10px] tracking-[0.3em] mt-1">{b.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [showAfter, setShowAfter] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setShowAfter(v => !v), 3500);
    return () => clearInterval(id);
  }, [autoplay]);

  return (
    <section id="before-after" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-white/50 text-xs tracking-[0.4em]">02 · TRANSFORMATIONS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mb-4">
            <span className="text-white">BEFORE </span>
            <span className="text-chrome">& AFTER.</span>
          </h2>
          <p className="text-white/60 text-lg">Same room. Tap the button below to see it finished.</p>
        </div>

        <div className="relative">
          <div className="relative w-full max-w-4xl mx-auto aspect-[4/5] sm:aspect-[16/10] overflow-hidden border border-white/10 rounded-sm">
            <img src="/images/gallery/before.jpg" alt="Before RJ Griffin renovation" className="absolute inset-0 w-full h-full object-cover" />
            <AnimatePresence>
              {showAfter && (
                <motion.div
                  key="after"
                  initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
                  animate={{ clipPath: 'polygon(0 0, 110% 0, 90% 100%, 0 100%)' }}
                  exit={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
                  transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0"
                >
                  <img src="/images/gallery/after.jpg" alt="After RJ Griffin renovation" className="w-full h-full object-cover" />
                  {/* Diagonal edge highlight */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '110%' }}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute inset-y-0 w-24 skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-10">
              <motion.div
                animate={{ opacity: showAfter ? 0 : 1 }}
                className="bg-black/80 backdrop-blur px-4 py-2 border border-white/20"
              >
                <div className="text-white/50 text-[10px] tracking-[0.4em]">STATE 01</div>
                <div className="font-display text-white text-sm tracking-widest">BEFORE</div>
              </motion.div>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <motion.div
                animate={{ opacity: showAfter ? 1 : 0 }}
                className="bg-white text-black px-4 py-2"
              >
                <div className="text-black/50 text-[10px] tracking-[0.4em]">STATE 02</div>
                <div className="font-display text-black text-sm tracking-widest">AFTER</div>
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => { setShowAfter(false); setAutoplay(false); }}
              className={`font-display text-sm tracking-widest px-6 py-3 transition-all ${!showAfter ? 'bg-white text-black' : 'border border-white/30 text-white/70 hover:text-white'}`}
            >
              BEFORE
            </button>
            <button
              onClick={() => { setShowAfter(v => !v); setAutoplay(false); }}
              className="w-14 h-14 rounded-full border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all"
              aria-label="Toggle"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4M21 17H3" />
              </svg>
            </button>
            <button
              onClick={() => { setShowAfter(true); setAutoplay(false); }}
              className={`font-display text-sm tracking-widest px-6 py-3 transition-all ${showAfter ? 'bg-white text-black' : 'border border-white/30 text-white/70 hover:text-white'}`}
            >
              AFTER
            </button>
          </div>
          <div className="text-center mt-4 text-white/40 text-xs tracking-[0.3em]">
            {autoplay ? 'AUTO-PLAYING · TAP TO PAUSE' : 'MANUAL MODE'}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState('all');

  return (
    <section id="gallery" className="relative bg-[#0a0a0a] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-white/40" />
              <span className="text-white/50 text-xs tracking-[0.4em]">03 · SELECT WORK</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl mb-4">
              <span className="text-white">OUR </span>
              <span className="text-chrome">WORK.</span>
            </h2>
            <p className="text-white/60 text-lg">Real projects from our crews. Tap any photo to see it full size.</p>
          </div>
        </div>

        {/* Broken grid for visual interest */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] gap-2 sm:gap-3">
          {GALLERY.map((img, i) => {
            // Vary spans for a "masonry" broken look
            const spans = [
              'row-span-2', '', '', 'col-span-2 row-span-2', '',
              'row-span-2', '', '', '', 'col-span-2',
              '', 'row-span-2', '', '', '', 'row-span-2'
            ];
            const span = spans[i] || '';
            return (
              <motion.button
                key={i}
                onClick={() => setLightbox(i)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
                className={`relative group overflow-hidden bg-[#141414] ${span}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="text-white/60 text-[9px] tracking-[0.3em]">PROJECT {String(i + 1).padStart(2, '0')}</div>
                  <div className="text-white font-display text-xs sm:text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">VIEW LARGE →</div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border border-white/30 text-white font-display tracking-widest px-8 py-4 text-sm hover:bg-white hover:text-black transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            SEE MORE ON FACEBOOK
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              aria-label="Close"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + GALLERY.length) % GALLERY.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
              aria-label="Previous"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % GALLERY.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
              aria-label="Next"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em]">
              {String(lightbox + 1).padStart(2, '0')} / {String(GALLERY.length).padStart(2, '0')}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-white/10 to-transparent blur-xl" />
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <img src="/images/gallery/project-11.jpg" alt="RJ Griffin exterior project" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white text-black p-6 max-w-[240px]">
              <div className="font-display text-5xl">40<span className="text-2xl align-top">+</span></div>
              <div className="text-[10px] tracking-[0.3em] mt-1">YEARS BUILDING IN THE<br/>ROCHESTER, NY AREA</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-white/50 text-xs tracking-[0.4em]">04 · WHO WE ARE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl leading-[0.95] mb-6">
            <span className="text-white">40 YEARS. </span>
            <span className="text-chrome">ONE NAME.</span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Ron Griffin started RJ Griffin Construction in 1986. 40 years later, we're still here. Locally owned, A+ BBB accredited, with Ron's son Josh now running the day-to-day.
          </p>
          <p className="text-white/60 leading-relaxed mb-10">
            We don't hand your project off to a rotating cast of subs. Our own crews handle the framing, cabinets, tile, and trim. We show up. We finish on time. And when we're done we stand behind the work.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {Object.values(BUSINESS.contacts).map(c => (
              <div key={c.name} className="border-l-2 border-white/20 pl-4">
                <div className="text-white/40 text-[10px] tracking-[0.3em]">{c.role.toUpperCase()}</div>
                <div className="font-display text-white text-xl mt-1">{c.name.toUpperCase()}</div>
                <a href={`tel:${c.tel}`} className="text-chrome hover:text-white transition-colors text-sm mt-1 block">{c.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [idx, setIdx] = useState(0);
  return (
    <section id="reviews" className="relative bg-[#0a0a0a] py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 font-display text-[400px] leading-none text-white select-none">"</div>
        <div className="absolute bottom-10 right-10 font-display text-[400px] leading-none text-white rotate-180 select-none">"</div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-white/50 text-xs tracking-[0.4em]">05 · CLIENT VOICES</span>
            <div className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="font-display text-4xl sm:text-6xl mb-4">
            <span className="text-white">REAL </span>
            <span className="text-chrome">REVIEWS.</span>
          </h2>
          <p className="text-white/60 text-lg">Pulled straight from our Facebook page.</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#131313] border border-white/10 p-8 sm:p-14 relative"
          >
            <div className="absolute -top-6 left-8 bg-black px-4 py-2 border border-white/10">
              <div className="flex gap-1">
                {Array.from({ length: REVIEWS[idx].stars }).map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-chrome"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
            </div>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed italic mb-8">
              "{REVIEWS[idx].text}"
            </p>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div>
                <div className="font-display text-white text-lg tracking-wide">{REVIEWS[idx].author.toUpperCase()}</div>
                <div className="text-white/50 text-xs tracking-[0.2em] mt-1">{REVIEWS[idx].project.toUpperCase()} · {REVIEWS[idx].location.toUpperCase()}</div>
              </div>
              <div className="text-white/40 text-xs tracking-[0.3em] flex items-center gap-2">
                VIA <span className="text-chrome">{REVIEWS[idx].source.toUpperCase()}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-3 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`transition-all ${i === idx ? 'w-12 bg-white' : 'w-6 bg-white/20 hover:bg-white/40'} h-1`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AreasServed() {
  return (
    <section className="relative bg-black py-16 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="lg:w-1/3">
            <span className="text-white/50 text-xs tracking-[0.4em]">SERVICE AREA</span>
            <h3 className="font-display text-2xl sm:text-3xl text-white mt-2">
              BASED IN SPENCERPORT<br/><span className="text-chrome">SERVING THE ROCHESTER AREA</span>
            </h3>
          </div>
          <div className="lg:w-2/3 flex flex-wrap gap-2">
            {AREAS.map(a => (
              <span key={a} className="border border-white/15 text-white/70 text-xs tracking-widest px-3 py-2 hover:border-white/50 hover:text-white transition-colors">
                {a.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="relative bg-[#0a0a0a] py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#0a0a0a]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-white/40" />
            <span className="text-white/50 text-xs tracking-[0.4em]">06 · START THE PROJECT</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl leading-[0.95] mb-6">
            <span className="text-white">GET IN </span>
            <span className="text-chrome">TOUCH.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Send us the details or just call. Free on-site estimates anywhere in the Rochester area.
          </p>

          <div className="space-y-6">
            {Object.values(BUSINESS.contacts).map(c => (
              <a key={c.name} href={`tel:${c.tel}`} className="group flex items-center gap-4 p-4 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                </div>
                <div>
                  <div className="text-white/50 text-[10px] tracking-[0.3em]">{c.role.toUpperCase()}</div>
                  <div className="font-display text-white text-lg tracking-wide">{c.name.toUpperCase()}</div>
                  <div className="text-chrome text-sm">{c.phone}</div>
                </div>
              </a>
            ))}
            <a href={`mailto:${BUSINESS.email}`} className="group flex items-center gap-4 p-4 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-all">
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>
              </div>
              <div>
                <div className="text-white/50 text-[10px] tracking-[0.3em]">EMAIL</div>
                <div className="text-chrome text-sm break-all">{BUSINESS.email}</div>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            action={`https://formsubmit.co/${BUSINESS.email}`}
            method="POST"
            onSubmit={() => setSubmitted(true)}
            className="bg-[#131313] border border-white/10 p-6 sm:p-10 space-y-6"
          >
            <input type="hidden" name="_subject" value="New RJ Griffin website inquiry" />
            <input type="hidden" name="_captcha" value="true" />
            <input type="hidden" name="_template" value="table" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-white/50 text-[10px] tracking-[0.3em] block mb-2">FULL NAME</label>
                <input required name="name" className="w-full bg-black border border-white/10 focus:border-white/50 outline-none text-white p-3 transition-colors" />
              </div>
              <div>
                <label className="text-white/50 text-[10px] tracking-[0.3em] block mb-2">PHONE</label>
                <input required name="phone" type="tel" className="w-full bg-black border border-white/10 focus:border-white/50 outline-none text-white p-3 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-white/50 text-[10px] tracking-[0.3em] block mb-2">EMAIL</label>
              <input required name="email" type="email" className="w-full bg-black border border-white/10 focus:border-white/50 outline-none text-white p-3 transition-colors" />
            </div>
            <div>
              <label className="text-white/50 text-[10px] tracking-[0.3em] block mb-2">PROJECT TYPE</label>
              <select name="project_type" className="w-full bg-black border border-white/10 focus:border-white/50 outline-none text-white p-3 transition-colors">
                {['Kitchen Remodel', 'Bathroom Remodel', 'Home Addition', 'Basement Finishing', 'Deck / Outdoor', 'Siding / Windows', 'Tile / Trim', 'Full Renovation', 'Other'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white/50 text-[10px] tracking-[0.3em] block mb-2">PROJECT LOCATION</label>
              <input name="location" placeholder="City / neighborhood" className="w-full bg-black border border-white/10 focus:border-white/50 outline-none text-white p-3 transition-colors" />
            </div>
            <div>
              <label className="text-white/50 text-[10px] tracking-[0.3em] block mb-2">TELL US ABOUT THE PROJECT</label>
              <textarea required name="message" rows={5} className="w-full bg-black border border-white/10 focus:border-white/50 outline-none text-white p-3 resize-none transition-colors" />
            </div>

            {submitted ? (
              <div className="bg-white/5 border border-white/20 p-4 text-white/80 text-sm">
                Thanks — we'll be in touch within 24 hours.
              </div>
            ) : (
              <button type="submit" className="group relative w-full overflow-hidden bg-white text-black font-display tracking-widest py-4 text-sm hover:tracking-[0.3em] transition-all">
                SEND PROJECT DETAILS →
              </button>
            )}
            <div className="text-white/40 text-[10px] tracking-widest text-center">
              WE'LL RESPOND WITHIN 24 HOURS · MON–FRI 7A–6P
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo/logo.jpg" alt="RJ Griffin" className="h-14 w-14 rounded-sm" />
              <div>
                <div className="font-display text-white text-lg tracking-widest">R.J GRIFFIN</div>
                <div className="text-[10px] tracking-[0.3em] text-white/50">CONSTRUCTION · EST. 1986</div>
              </div>
            </div>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              Family-owned general contractor based in Spencerport, NY. Kitchens, baths, additions, basement egress, and full home renovations across the Rochester area for 40 years.
            </p>
          </div>
          <div>
            <div className="font-display text-white text-sm tracking-widest mb-4">CONTACT</div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.3em]">RON</div>
                <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="text-white/80 hover:text-white">{BUSINESS.contacts.ron.phone}</a>
              </div>
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.3em]">JOSH</div>
                <a href={`tel:${BUSINESS.contacts.josh.tel}`} className="text-white/80 hover:text-white">{BUSINESS.contacts.josh.phone}</a>
              </div>
              <div>
                <div className="text-white/40 text-[10px] tracking-[0.3em]">EMAIL</div>
                <a href={`mailto:${BUSINESS.email}`} className="text-white/80 hover:text-white break-all">{BUSINESS.email}</a>
              </div>
            </div>
          </div>
          <div>
            <div className="font-display text-white text-sm tracking-widest mb-4">LOCATION</div>
            <div className="text-white/60 text-sm leading-relaxed mb-4">
              1753 Manitou Road<br/>
              Spencerport, NY 14559
            </div>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Follow on Facebook
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-xs tracking-widest">
            © {new Date().getFullYear()} RJ GRIFFIN CONSTRUCTION · ALL RIGHTS RESERVED
          </div>
          <div className="text-white/30 text-[10px] tracking-[0.3em]">
            BUILT TO OUTLAST · BBB ACCREDITED · FULLY INSURED
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sticky mobile CTA bar
function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10 grid grid-cols-2 pb-safe">
      <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="text-white text-center py-3 font-display text-xs tracking-widest border-r border-white/10 flex flex-col items-center justify-center gap-1">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        CALL RON
      </a>
      <a href="#contact" className="bg-white text-black text-center py-3 font-display text-xs tracking-widest flex items-center justify-center gap-2">
        GET QUOTE →
      </a>
    </div>
  );
}

// ============================================================================
// ROOT
// ============================================================================
export default function RJGriffinSite() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased selection:bg-white selection:text-black pb-16 md:pb-0 overflow-x-hidden">
      <Header />
      <Hero />
      <MarqueeStrip />
      <TrustBadges />
      <Services />
      <BeforeAfter />
      <Gallery />
      <About />
      <Reviews />
      <AreasServed />
      <Contact />
      <Footer />
      <MobileCTA />
    </div>
  );
}
