import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ============================================================================
   R.J. GRIFFIN CONSTRUCTION
   Editorial magazine site — Fraunces + Inter on warm paper.
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
    title: 'Basement Egress Solutions',
    subtitle: 'Specialized division',
    lede: 'Code-compliant egress windows and wells. Our own crew does this every week — cut, install, waterproof.',
    points: ['Code-compliant window wells', 'Egress window cutouts & installs', 'Waterproofing & drainage', 'Safety-rated for finished basements'],
    image: '/images/gallery/project-05.jpg',
    featured: true,
  },
  {
    title: 'Kitchens & Baths',
    lede: 'Full remodels — cabinetry, countertops, custom tile, plumbing, lighting, layout. We handle every piece.',
    points: ['Custom cabinetry & counters', 'Layout redesign', 'Tile showers & backsplashes', 'Vanities, tubs, plumbing'],
  },
  {
    title: 'Additions & Remodels',
    lede: 'Whole-house remodels and room additions built to match what you have. Framing to finish.',
    points: ['Room & second-story additions', 'Whole-house remodels', 'Structural updates', 'Basement finishing'],
  },
  {
    title: 'Exteriors',
    lede: 'Siding, replacement windows, trim, decks. Built for Rochester winters and priced fair.',
    points: ['Vinyl & specialty siding', 'Replacement windows', 'Trim, soffit & fascia', 'Decks & outdoor spaces'],
  },
  {
    title: 'General Construction',
    lede: 'Custom builds, commercial suite build-outs, accent walls, cabinet installs. If it takes a hammer and a level, we do it.',
    points: ['Custom residential builds', 'Commercial build-outs', 'Trim & cabinet installs', 'Property enhancements'],
  },
];

const REVIEWS = [
  {
    quote: "We highly recommend RJ Griffin! We had our laundry closet upgraded and a hall closet turned into a mudroom space, finished off with updates to the connected powder room. Everything turned out even better than I envisioned. The team was professional and neat. Cost and timeline estimates were reasonable with excellent communication throughout. We'll definitely be using them for our next project.",
    author: 'Valerie Lamoreaux',
    context: 'Laundry, Mudroom & Powder Room · Rochester',
    source: 'Facebook',
  },
  {
    quote: "RJ Griffin Construction just completed this accent wall, trim and cabinet install for our salon suite. They were quick, professional and their attention to detail is spot on. Contact them for any of your renovation needs — full bathroom, kitchen, decks, or egress wells. These are your guys.",
    author: 'CJ Cutaia',
    context: 'Salon Suite Build-Out · Trim & Cabinets',
    source: 'Facebook',
  },
];

const GALLERY = Array.from({ length: 16 }, (_, i) => ({
  src: `/images/gallery/project-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `R.J. Griffin Construction project ${i + 1} — Rochester NY remodel`,
}));

const AREAS = ['Spencerport', 'Rochester', 'Brockport', 'Hilton', 'Greece', 'Chili', 'Gates', 'Pittsford', 'Fairport', 'Webster', 'Penfield', 'Henrietta', 'Irondequoit', 'Brighton', 'Monroe County'];

/* ---------- Small helpers ---------- */

const Reveal = ({ children, delay = 0, y = 20, className = '' }) => {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Kicker = ({ children, tone = 'ink', className = '' }) => {
  const color = tone === 'paper' ? 'text-[#EFEAE0]/70' : 'text-[#6B6459]';
  const line = tone === 'paper' ? 'bg-[#B45309]' : 'bg-[#B45309]';
  return (
    <span className={`inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] uppercase ${color} ${className}`}>
      <span className={`h-px w-6 ${line}`} />
      {children}
    </span>
  );
};

const Arrow = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Dot = () => <span className="inline-block w-1 h-1 rounded-full bg-[#B45309]" />;

/* ---------- Header ---------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#work', label: 'Work' },
    { href: '#services', label: 'Services' },
    { href: '#transformations', label: 'Transformations' },
    { href: '#about', label: 'About' },
    { href: '#reviews', label: 'Reviews' },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-b border-[#E2DBCB]' : 'bg-[#F7F4EE]/70 backdrop-blur-sm'}`}>
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 flex items-center justify-between h-[68px] md:h-[84px]">
        <a href="#top" className="flex items-center gap-3 md:gap-4 group">
          <div className={`relative overflow-hidden bg-[#0E0C09] transition-all duration-300 ${scrolled ? 'h-10 w-10 md:h-11 md:w-11' : 'h-11 w-11 md:h-14 md:w-14'}`}>
            <img src="/logo/logo.jpg" alt="R.J. Griffin Construction shield logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[19px] md:text-[22px] text-[#171512] tracking-[-0.01em]">R.J. Griffin</span>
            <span className="mt-1 text-[9px] md:text-[10px] tracking-[0.28em] text-[#6B6459] uppercase">Construction · Est. 1986</span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-[13px] text-[#2A2620] hover:text-[#B45309] transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:585-737-7521" className="text-[13px] font-medium text-[#171512] link-underline pb-0.5 tabular">
            (585) 737-7521
          </a>
          <a href="#contact" className="inline-flex items-center gap-2 bg-[#171512] text-[#FBF9F4] px-4 py-2.5 text-[12px] tracking-[0.14em] uppercase hover:bg-[#B45309] transition-colors">
            Free Estimate <Arrow className="w-3.5 h-3.5" />
          </a>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 -mr-2 flex items-center justify-center text-[#171512]"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 8h16" /><path d="M4 16h16" /></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#F7F4EE] border-t border-[#E2DBCB]"
          >
            <nav className="px-5 sm:px-8 py-6 flex flex-col gap-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-2xl text-[#171512] py-2.5 border-b border-[#E2DBCB]/60"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="tel:585-737-7521"
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center justify-between text-[15px] text-[#2A2620]"
              >
                <span className="kicker">Call Ron</span>
                <span className="font-serif text-xl text-[#B45309]">(585) 737-7521</span>
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-[#171512] text-[#FBF9F4] px-5 py-4 text-[12px] tracking-[0.16em] uppercase"
              >
                Request a Free Estimate <Arrow className="w-3.5 h-3.5" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative">
      {/* Cinematic dark stage — anchors the brand */}
      <div className="relative bg-[#0E0C09] text-[#F7F4EE] overflow-hidden">
        {/* Background image with dark treatment */}
        <div className="absolute inset-0">
          <img
            src="/images/site/hero.jpg"
            alt=""
            aria-hidden="true"
            loading="eager"
            fetchpriority="high"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C09] via-[#0E0C09]/85 to-[#0E0C09]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E0C09]/60 via-transparent to-[#0E0C09]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 pt-16 md:pt-24 lg:pt-28 pb-24 md:pb-32 lg:pb-40">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#0E0C09] border border-[#C9A96A]/40 shadow-[0_10px_40px_-10px_rgba(201,169,106,0.35)] flex items-center justify-center overflow-hidden">
                  <img src="/logo/logo.jpg" alt="R.J. Griffin Construction shield" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-[#C9A96A]">Est. 1986 · Family-Owned</span>
                  <span className="mt-1.5 font-serif text-lg md:text-xl text-[#F7F4EE]/90 tracking-[-0.01em]">R.J. Griffin Construction</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-10 md:mt-12 font-serif text-[44px] sm:text-[60px] md:text-[76px] lg:text-[92px] xl:text-[104px] leading-[0.98] tracking-[-0.025em] text-[#F7F4EE]">
                Rooms your <span className="serif-italic text-[#C9A96A]">family</span> will actually use.
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-7 md:mt-9 text-[17px] md:text-[19px] text-[#EFEAE0]/80 leading-relaxed max-w-xl">
                A family-run general contractor in Spencerport, NY.
                Forty years of kitchens, baths, additions, and basement egress
                across the Rochester area — with our own crews, start to finish.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 md:mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-[#C9A96A] text-[#0E0C09] px-7 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-[#F7F4EE] transition-colors"
                >
                  Request a Free Estimate <Arrow />
                </a>
                <a href="#work" className="text-[13px] text-[#F7F4EE]/90 link-underline pb-0.5 flex items-center gap-2 hover:text-[#C9A96A] transition-colors">
                  See recent work
                </a>
              </div>
            </Reveal>
          </div>

          {/* Corner caption — magazine touch */}
          <div className="hidden lg:flex absolute right-12 bottom-16 items-end gap-6 text-right">
            <div className="text-[10px] tracking-[0.28em] uppercase text-[#F7F4EE]/50 max-w-[180px]">
              Selected Work<br />Kitchen Remodel · Rochester
            </div>
            <div className="w-px h-16 bg-[#C9A96A]/50" />
          </div>
        </div>
      </div>

      <TrustBar />
    </section>
  );
}

function TrustBar() {
  const items = [
    { number: '40', label: 'Years serving Rochester' },
    { number: 'A+', label: 'BBB accredited' },
    { number: '5.0', label: 'Rated on Facebook reviews' },
    { number: '2', label: 'Generations, one family' },
  ];
  return (
    <div className="border-y border-[#E2DBCB] bg-[#FBF9F4]/40">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {items.map((it, i) => (
          <div key={it.label} className={`flex items-baseline gap-4 ${i > 0 ? 'md:border-l md:border-[#E2DBCB] md:pl-8' : ''}`}>
            <div className="font-serif text-4xl md:text-5xl text-[#171512] tabular">{it.number}</div>
            <div className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-[#6B6459] leading-snug">{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Section title ---------- */

function SectionTitle({ kicker, title, lede, tone = 'ink', align = 'left' }) {
  const inkTitle = tone === 'paper' ? 'text-[#F7F4EE]' : 'text-[#171512]';
  const inkLede = tone === 'paper' ? 'text-[#EFEAE0]/80' : 'text-[#2A2620]';
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <h2 className={`mt-5 font-serif text-[34px] sm:text-[42px] md:text-[52px] lg:text-[60px] leading-[1.05] tracking-[-0.015em] ${inkTitle}`}>
        {title}
      </h2>
      {lede && <p className={`mt-5 text-[16px] md:text-[17px] leading-relaxed max-w-2xl ${inkLede}`}>{lede}</p>}
    </div>
  );
}

/* ---------- Work / Gallery ---------- */

function Work() {
  const [lightbox, setLightbox] = useState(null);

  // Editorial layout: mix of large + smaller tiles
  const spans = [
    'col-span-12 md:col-span-8 aspect-[4/3]',
    'col-span-6 md:col-span-4 aspect-[3/4]',
    'col-span-6 md:col-span-4 aspect-square',
    'col-span-6 md:col-span-4 aspect-square',
    'col-span-12 md:col-span-4 aspect-[4/5]',
    'col-span-6 md:col-span-4 aspect-[4/3]',
    'col-span-6 md:col-span-4 aspect-[4/3]',
    'col-span-12 md:col-span-6 aspect-[16/10]',
    'col-span-12 md:col-span-6 aspect-[16/10]',
    'col-span-6 md:col-span-3 aspect-square',
    'col-span-6 md:col-span-3 aspect-square',
    'col-span-6 md:col-span-3 aspect-square',
    'col-span-6 md:col-span-3 aspect-square',
    'col-span-12 md:col-span-8 aspect-[16/9]',
    'col-span-6 md:col-span-4 aspect-[3/4]',
    'col-span-12 md:col-span-12 aspect-[16/7]',
  ];

  return (
    <section id="work" className="py-20 md:py-32 border-t border-[#E2DBCB]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <Reveal>
            <SectionTitle
              kicker="Selected Work"
              title={<>A quiet portfolio built <span className="serif-italic">one job</span> at a time.</>}
              lede="A cross-section of recent kitchens, baths, additions, and basement projects across the greater Rochester area."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#171512] link-underline pb-0.5 whitespace-nowrap"
            >
              More on Facebook →
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {GALLERY.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 0.05} className={spans[i % spans.length]}>
              <button
                onClick={() => setLightbox(i)}
                className="group relative w-full h-full overflow-hidden bg-[#EFEAE0] focus:outline-none"
                aria-label={`View project ${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span>Project {String(i + 1).padStart(2, '0')}</span>
                  <span className="flex items-center gap-1">View <Arrow className="w-3 h-3" /></span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={GALLERY}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onIndex={setLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ images, index, onClose, onIndex }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, images.length, onClose, onIndex]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#0A0906]/95 backdrop-blur flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center"
        aria-label="Close"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + images.length) % images.length); }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-11 h-11 flex items-center justify-center"
        aria-label="Previous"
      >
        <Arrow className="w-6 h-6 rotate-180" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % images.length); }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white w-11 h-11 flex items-center justify-center"
        aria-label="Next"
      >
        <Arrow className="w-6 h-6" />
      </button>
      <motion.img
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        src={images[index].src}
        alt={images[index].alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-[85vh] object-contain"
      />
      <div className="absolute bottom-5 md:bottom-8 left-0 right-0 text-center text-[11px] tracking-[0.22em] uppercase text-white/60">
        Project {String(index + 1).padStart(2, '0')} of {images.length}
      </div>
    </motion.div>
  );
}

/* ---------- Services ---------- */

function Services() {
  return (
    <section id="services" className="bg-[#171512] text-[#F7F4EE] py-20 md:py-32 grain-warm">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 relative">
        <Reveal>
          <SectionTitle
            tone="paper"
            kicker="What We Do"
            title={<>Five disciplines. <span className="serif-italic text-[#EFC48A]">One crew.</span></>}
            lede="We don't sub the important stuff. Our own guys frame, tile, hang cabinets, and finish the punch list — which is why the details actually get done right."
          />
        </Reveal>

        {/* Featured: Basement Egress */}
        <Reveal delay={0.1}>
          <FeaturedService service={SERVICES[0]} />
        </Reveal>

        {/* Other services */}
        <ul className="mt-6 md:mt-8 divide-y divide-white/10 border-t border-white/10">
          {SERVICES.slice(1).map((s, i) => (
            <Reveal key={s.title} delay={0.05 * i}>
              <ServiceRow index={i + 1} service={s} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeaturedService({ service }) {
  return (
    <div className="mt-14 md:mt-20 grid grid-cols-12 gap-6 md:gap-10 items-stretch bg-[#1F1B15] p-5 sm:p-8 md:p-10 border border-white/10">
      <div className="col-span-12 lg:col-span-5">
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full overflow-hidden bg-black/40">
          <img src={service.image} alt={`R.J. Griffin ${service.title}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 flex flex-col justify-between gap-8">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-[#EFC48A]">
            <Dot /> {service.subtitle}
          </span>
          <h3 className="mt-4 font-serif text-[32px] md:text-[44px] lg:text-[52px] leading-[1.04] tracking-[-0.015em] text-[#F7F4EE]">
            {service.title}
          </h3>
          <p className="mt-5 text-[16px] md:text-lg text-[#EFEAE0]/75 leading-relaxed max-w-xl">{service.lede}</p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {service.points.map(p => (
              <li key={p} className="flex items-start gap-3 text-[14px] text-[#EFEAE0]/75">
                <span className="mt-2 h-1 w-1 rounded-full bg-[#EFC48A] flex-none" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#EFC48A] link-underline w-max pb-1">
          Ask about basement egress <Arrow className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

function ServiceRow({ index, service }) {
  return (
    <li className="py-10 md:py-14 grid grid-cols-12 gap-4 md:gap-10 items-start">
      <div className="col-span-2 md:col-span-1 font-serif text-2xl md:text-3xl text-white/35 tabular">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="col-span-10 md:col-span-4">
        <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight text-[#F7F4EE]">{service.title}</h3>
      </div>
      <div className="col-span-12 md:col-span-7">
        <p className="text-[15px] md:text-[17px] text-[#EFEAE0]/70 leading-relaxed max-w-2xl">{service.lede}</p>
        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[13px] md:text-[14px] text-[#EFEAE0]/60">
          {service.points.map(p => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-2 h-1 w-1 rounded-full bg-[#B45309] flex-none" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/* ---------- Before / After (magazine spread) ---------- */

function Transformations() {
  const [view, setView] = useState('after'); // 'before' | 'after' | 'split'
  return (
    <section id="transformations" className="py-20 md:py-32 border-t border-[#E2DBCB] bg-[#FBF9F4]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle
            kicker="Transformations"
            title={<>A sunroom that was <span className="serif-italic">already there.</span></>}
            lede="Same footprint, same bones. New life. This Rochester sunroom went from tired and utilitarian to a room the family actually spends time in."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEAE0]">
                <img src="/images/gallery/before.jpg" alt="Sunroom before renovation by R.J. Griffin Construction" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-[#171512] text-[#F7F4EE] px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase">Before</span>
              </div>
              <figcaption className="mt-3 text-[12px] tracking-[0.16em] uppercase text-[#6B6459]">Original — dated interior, closed layout</figcaption>
            </figure>
            <figure className="relative">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEAE0]">
                <img src="/images/gallery/after.jpg" alt="Sunroom after renovation by R.J. Griffin Construction" loading="lazy" className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-[#B45309] text-[#FBF9F4] px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase">After</span>
              </div>
              <figcaption className="mt-3 text-[12px] tracking-[0.16em] uppercase text-[#6B6459]">Griffin — refinished, refined, kept the character</figcaption>
            </figure>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-[#E2DBCB] pt-8">
            <div className="max-w-2xl">
              <p className="text-[15px] md:text-[17px] text-[#2A2620] leading-relaxed">
                Most of our best work looks like it was always this way. That's the point.
                We match trim, flooring, and finish decisions to your house — not to a catalog.
              </p>
            </div>
            <a href="#contact" className="inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#171512] link-underline pb-1 w-max">
              Talk about your project <Arrow className="w-3.5 h-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  return (
    <section id="about" className="py-20 md:py-32 border-t border-[#E2DBCB]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 grid grid-cols-12 gap-6 md:gap-12 lg:gap-20 items-start">
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEAE0]">
                <img src="/images/gallery/project-11.jpg" alt="R.J. Griffin Construction crew at work" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <figcaption className="mt-3 text-[11px] tracking-[0.2em] uppercase text-[#6B6459]">
                A recent Griffin project · Rochester
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <Reveal>
            <Kicker>About Griffin</Kicker>
            <h2 className="mt-5 font-serif text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] tracking-[-0.015em] text-[#171512]">
              Family-run. Rochester rooted. <span className="serif-italic text-[#B45309]">Forty years in.</span>
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5 text-[16px] md:text-[17px] text-[#2A2620] leading-relaxed max-w-xl">
            <Reveal delay={0.05}>
              <p>
                Ron Griffin started this company in 1986. Four decades later
                his son Josh runs the day-to-day. The name on the truck is
                the name on the checks — and the same guys who quote the job
                are on the job.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                We're based in Spencerport and we work the greater Rochester
                area. A+ with the BBB. Own crews for framing, tile, cabinetry,
                and finish. We keep the schedule you agreed to, we clean up
                every night, and we return calls.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                That's the whole pitch.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 grid grid-cols-2 gap-6 md:gap-10 border-t border-[#E2DBCB] pt-8 max-w-xl">
              <PersonCard person={BUSINESS.contacts.ron} />
              <PersonCard person={BUSINESS.contacts.josh} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PersonCard({ person }) {
  return (
    <div>
      <div className="kicker">{person.role}</div>
      <div className="mt-2 font-serif text-[22px] md:text-[24px] text-[#171512]">{person.name}</div>
      <a href={`tel:${person.tel}`} className="mt-1 inline-block text-[14px] text-[#B45309] link-underline pb-0.5 tabular">
        {person.phone}
      </a>
    </div>
  );
}

/* ---------- Reviews (magazine pull quotes) ---------- */

function Reviews() {
  const [i, setI] = useState(0);
  const r = REVIEWS[i];
  return (
    <section id="reviews" className="py-20 md:py-32 bg-[#171512] text-[#F7F4EE] border-t border-[#E2DBCB]/20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionTitle
            tone="paper"
            kicker="Words from clients"
            title={<>What they say <span className="serif-italic text-[#EFC48A]">after we leave.</span></>}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 md:mt-20 grid grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-12 lg:col-span-1 hidden lg:block">
              <div className="font-serif text-[120px] leading-none text-[#B45309]/70">"</div>
            </div>
            <div className="col-span-12 lg:col-span-10">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="font-serif text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] leading-[1.25] tracking-[-0.01em] text-[#F7F4EE]/95"
                >
                  {r.quote}
                </motion.blockquote>
              </AnimatePresence>
              <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-white/10 pt-6">
                <div>
                  <div className="font-serif text-xl text-[#F7F4EE]">— {r.author}</div>
                  <div className="mt-1 text-[12px] tracking-[0.18em] uppercase text-[#EFEAE0]/60">{r.context}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] tracking-[0.22em] uppercase text-[#EFEAE0]/50 tabular">{i + 1} / {REVIEWS.length}</span>
                  <div className="flex gap-2">
                    {REVIEWS.map((_, j) => (
                      <button
                        key={j}
                        onClick={() => setI(j)}
                        aria-label={`Review ${j + 1}`}
                        className={`w-8 h-8 flex items-center justify-center transition-colors ${j === i ? 'text-[#EFC48A]' : 'text-[#EFEAE0]/40 hover:text-[#EFEAE0]/70'}`}
                      >
                        <span className={`block h-px w-full ${j === i ? 'bg-[#EFC48A]' : 'bg-current'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 md:mt-20 flex items-center justify-between text-[12px] tracking-[0.18em] uppercase text-[#EFEAE0]/60 border-t border-white/10 pt-6">
            <span>Read more on Facebook</span>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="text-[#EFC48A] link-underline pb-0.5">Griffin on Facebook →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Areas served ---------- */

function Areas() {
  return (
    <section className="py-16 md:py-24 border-t border-[#E2DBCB]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 grid grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="col-span-12 md:col-span-4">
          <Reveal>
            <Kicker>Coverage</Kicker>
            <h3 className="mt-4 font-serif text-[30px] md:text-[36px] leading-tight tracking-[-0.01em] text-[#171512]">
              Where we <span className="serif-italic">work.</span>
            </h3>
            <p className="mt-4 text-[15px] text-[#2A2620] leading-relaxed max-w-sm">
              Based in Spencerport. Working across Monroe County and the greater Rochester area.
            </p>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-8">
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-3">
              {AREAS.map((a) => (
                <li key={a} className="flex items-center gap-3 text-[15px] text-[#2A2620] border-b border-[#E2DBCB] pb-3">
                  <Dot />
                  <span>{a}, NY</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact / Form ---------- */

function Contact() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const validate = (formData) => {
    const e = {};
    if (!formData.get('name')?.toString().trim()) e.name = 'Please enter your name.';
    const email = formData.get('email')?.toString().trim() || '';
    if (!email) e.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email.';
    if (!formData.get('phone')?.toString().trim()) e.phone = 'Phone helps us follow up faster.';
    if (!formData.get('message')?.toString().trim()) e.message = 'Tell us a bit about the project.';
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
    // Honeypot
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
          'Project Type': fd.get('project') || 'Not specified',
          Timeline: fd.get('timeline') || 'Not specified',
          'Project Details': fd.get('message'),
          _subject: `New estimate request — ${fd.get('name')} (${fd.get('project') || 'general'})`,
          _template: 'table',
          _captcha: 'false',
          _replyto: fd.get('email'),
          _autoresponse: `Hi ${fd.get('name')?.toString().split(' ')[0] || 'there'},\n\nThanks for reaching out to R.J. Griffin Construction. We received your request and Ron or Josh will be in touch within one business day to talk through the details and schedule a free estimate.\n\nIf you need us sooner, please call:\nRon Griffin — (585) 737-7521\nJosh Griffin — (585) 474-8657\n\nThanks again,\nThe Griffin Family\nR.J. Griffin Construction\n1753 Manitou Road, Spencerport, NY 14559\nrjgriffinconstruction@gmail.com`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        ev.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-t border-[#E2DBCB] bg-[#F7F4EE]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 grid grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <Kicker>Free Estimate</Kicker>
            <h2 className="mt-5 font-serif text-[34px] md:text-[46px] lg:text-[54px] leading-[1.05] tracking-[-0.015em] text-[#171512]">
              Tell us about <span className="serif-italic text-[#B45309]">your project.</span>
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-[#2A2620] leading-relaxed max-w-md">
              A few details and we'll get back within one business day to schedule
              a walk-through. No hard sell — just a real conversation about what
              you're trying to do and what it'll take.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 space-y-6 max-w-md">
              <ContactRow label="Call directly">
                <a href={`tel:${BUSINESS.contacts.ron.tel}`} className="block font-serif text-2xl text-[#171512] hover:text-[#B45309] transition-colors tabular">
                  {BUSINESS.contacts.ron.phone}
                </a>
                <div className="mt-1 text-[12px] tracking-[0.18em] uppercase text-[#6B6459]">Ron Griffin · Owner</div>
                <a href={`tel:${BUSINESS.contacts.josh.tel}`} className="mt-4 block font-serif text-2xl text-[#171512] hover:text-[#B45309] transition-colors tabular">
                  {BUSINESS.contacts.josh.phone}
                </a>
                <div className="mt-1 text-[12px] tracking-[0.18em] uppercase text-[#6B6459]">Josh Griffin · General Manager</div>
              </ContactRow>
              <ContactRow label="Email">
                <a href={`mailto:${BUSINESS.email}`} className="text-[15px] text-[#171512] link-underline pb-0.5">
                  {BUSINESS.email}
                </a>
              </ContactRow>
              <ContactRow label="Shop">
                <div className="text-[15px] text-[#2A2620]">1753 Manitou Road<br />Spencerport, NY 14559</div>
              </ContactRow>
              <ContactRow label="Hours">
                <div className="text-[15px] text-[#2A2620]">Mon – Fri · 7:00 – 6:00</div>
              </ContactRow>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal delay={0.05}>
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="bg-[#FFFFFF] border border-[#E2DBCB] p-6 sm:p-8 md:p-10 shadow-[0_1px_0_rgba(23,21,18,0.04),0_20px_60px_-30px_rgba(23,21,18,0.15)]"
              noValidate
            >
              <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="absolute -left-[9999px] opacity-0" aria-hidden="true" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <Field label="Full name" name="name" required error={errors.name} placeholder="Jane Doe" />
                <Field label="Email" name="email" type="email" required error={errors.email} placeholder="jane@email.com" autoComplete="email" />
                <Field label="Phone" name="phone" type="tel" required error={errors.phone} placeholder="(585) 555-0123" autoComplete="tel" />
                <Select label="Project type" name="project" options={['Kitchen remodel', 'Bathroom remodel', 'Home addition', 'Basement finishing', 'Basement egress', 'Siding / windows', 'Custom build', 'Other']} />
                <Select label="Timeline" name="timeline" options={['ASAP', 'Within 1–3 months', '3–6 months', 'Just exploring']} className="md:col-span-2" />
                <div className="md:col-span-2">
                  <TextArea label="Project details" name="message" required error={errors.message} placeholder="Rough scope, rooms involved, anything specific we should know…" />
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-5">
                <p className="text-[12px] text-[#6B6459] leading-relaxed max-w-sm">
                  Your info goes straight to Ron and Josh. We won't share it, and we won't put you on any list.
                </p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center justify-center gap-3 bg-[#171512] text-[#FBF9F4] px-7 py-4 text-[12px] tracking-[0.18em] uppercase hover:bg-[#B45309] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Request'}
                  {status !== 'submitting' && <Arrow />}
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
                    className="mt-6 border-l-2 border-[#B45309] bg-[#FBF9F4] p-5"
                  >
                    <div className="font-serif text-xl text-[#171512]">Thank you — we got it.</div>
                    <p className="mt-2 text-[14px] text-[#2A2620] leading-relaxed">
                      Ron or Josh will be in touch within one business day. If you need us today,
                      Ron is at <a href="tel:585-737-7521" className="text-[#B45309] link-underline pb-0.5">(585) 737-7521</a>.
                    </p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="mt-6 border-l-2 border-red-600 bg-red-50 p-5 text-[14px] text-red-900"
                  >
                    Something went wrong sending the form. Please call Ron at{' '}
                    <a href="tel:585-737-7521" className="underline">(585) 737-7521</a> or email{' '}
                    <a href={`mailto:${BUSINESS.email}`} className="underline">{BUSINESS.email}</a>.
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

function ContactRow({ label, children }) {
  return (
    <div className="grid grid-cols-3 gap-6 border-b border-[#E2DBCB] pb-5">
      <div className="col-span-1 kicker pt-1">{label}</div>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

function Field({ label, name, type = 'text', required, error, placeholder, autoComplete, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="kicker">{label}{required && <span className="text-[#B45309] ml-0.5">*</span>}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`mt-2 w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-[#C8BFAB]'} focus:border-[#171512] outline-none text-[16px] text-[#171512] placeholder:text-[#948B7D] py-2.5 transition-colors`}
      />
      {error && <span className="mt-1.5 block text-[12px] text-red-700">{error}</span>}
    </label>
  );
}

function Select({ label, name, options, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="kicker">{label}</span>
      <div className="relative mt-2">
        <select
          name={name}
          defaultValue=""
          className="w-full appearance-none bg-transparent border-b border-[#C8BFAB] focus:border-[#171512] outline-none text-[16px] text-[#171512] py-2.5 pr-8 cursor-pointer transition-colors"
        >
          <option value="" disabled>Choose one</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg viewBox="0 0 24 24" width="14" height="14" className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6459]" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}

function TextArea({ label, name, required, error, placeholder }) {
  return (
    <label className="block">
      <span className="kicker">{label}{required && <span className="text-[#B45309] ml-0.5">*</span>}</span>
      <textarea
        name={name}
        rows={5}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`mt-2 w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-[#C8BFAB]'} focus:border-[#171512] outline-none text-[16px] text-[#171512] placeholder:text-[#948B7D] py-2.5 resize-none transition-colors`}
      />
      {error && <span className="mt-1.5 block text-[12px] text-red-700">{error}</span>}
    </label>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-[#0F0D0A] text-[#EFEAE0] pt-16 md:pt-24 pb-10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-black border border-[#C9A96A]/40 overflow-hidden flex-none">
                <img src="/logo/logo.jpg" alt="R.J. Griffin Construction shield" className="w-full h-full object-cover" />
              </div>
              <div className="font-serif text-[24px] md:text-[32px] text-[#F7F4EE] leading-[1.05]">R.J. Griffin<br />Construction</div>
            </div>
            <p className="mt-6 text-[14px] text-[#EFEAE0]/70 leading-relaxed max-w-sm">
              Family-run general contractor. Based in Spencerport, NY.
              Serving the greater Rochester area since 1986.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] tracking-[0.22em] uppercase text-[#EFEAE0]/50">
              <span>Est. 1986</span>
              <span className="w-1 h-1 bg-[#C9A96A] rounded-full" />
              <span>A+ BBB</span>
              <span className="w-1 h-1 bg-[#C9A96A] rounded-full" />
              <span>Locally owned</span>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="kicker text-[#EFEAE0]/50">Reach</div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#EFEAE0]/80">
              <li><a href="tel:585-737-7521" className="hover:text-[#EFC48A] transition-colors">Ron · (585) 737-7521</a></li>
              <li><a href="tel:585-474-8657" className="hover:text-[#EFC48A] transition-colors">Josh · (585) 474-8657</a></li>
              <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-[#EFC48A] transition-colors break-all">{BUSINESS.email}</a></li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="kicker text-[#EFEAE0]/50">Explore</div>
            <ul className="mt-4 space-y-2.5 text-[14px] text-[#EFEAE0]/80">
              <li><a href="#work" className="hover:text-[#EFC48A] transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-[#EFC48A] transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-[#EFC48A] transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-[#EFC48A] transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-2">
            <div className="kicker text-[#EFEAE0]/50">Shop</div>
            <div className="mt-4 text-[14px] text-[#EFEAE0]/80 leading-relaxed">
              1753 Manitou Rd<br />Spencerport, NY 14559
            </div>
            <a href={BUSINESS.facebook} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-[#EFC48A] link-underline pb-0.5">
              Facebook →
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] tracking-[0.18em] uppercase text-[#EFEAE0]/40">
          <div>© {new Date().getFullYear()} R.J. Griffin Construction. All rights reserved.</div>
          <div>Family-owned. Locally rooted. Built to outlast.</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Mobile sticky CTA ---------- */

function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#171512]/95 backdrop-blur border-t border-white/10 pb-safe">
      <div className="grid grid-cols-2">
        <a href="tel:585-737-7521" className="flex items-center justify-center gap-2 py-3.5 text-[12px] tracking-[0.16em] uppercase text-[#F7F4EE] border-r border-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Call Ron
        </a>
        <a href="#contact" className="flex items-center justify-center gap-2 py-3.5 text-[12px] tracking-[0.16em] uppercase bg-[#B45309] text-[#FBF9F4]">
          Free Estimate <Arrow className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

/* ---------- Root ---------- */

export default function RJGriffinSite() {
  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#171512] pb-16 md:pb-0">
      <a href="#top" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[#171512] focus:text-[#FBF9F4] focus:px-4 focus:py-2 focus:text-[12px]">Skip to content</a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Transformations />
        <About />
        <Reviews />
        <Areas />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
}
