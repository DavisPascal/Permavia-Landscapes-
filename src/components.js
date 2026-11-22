// Shared building blocks: header, footer, CTA band, heroes, cards.
const site = require('./site');

const img = (name) => `/assets/img/${name}.webp`;
const icon = (name, cls = '') => `<i data-lucide="${name}" class="ic ${cls}" aria-hidden="true"></i>`;
const waLink = (text = "Hi Permavia, I'm interested in a consultation for my land in ") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

const waIcon = (cls = '') =>
  `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.81-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.44 9.44 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.23-4.25 9.48-9.48 9.48zm8.06-17.54A11.33 11.33 0 0 0 12.04.62C5.76.62.65 5.73.65 12.01c0 2 .52 3.96 1.52 5.69L.55 23.6l6.04-1.58a11.36 11.36 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z"/></svg>`;

// ── Navigation ────────────────────────────────────────────────
// Services and projects come from data.js; required lazily because data.js itself requires this file.
const NAV = () => {
  const { services, projects } = require('./data');
  return [
  { label: 'Home', href: '/', key: 'home' },
  {
    label: 'About Us', href: '/about-us/', key: 'about',
    children: [
      { label: 'Our Story & Values', href: '/about-us/', desc: 'Mission, vision and values', icon: 'heart-handshake' },
      { label: 'What We Do', href: '/about-us/#what-we-do', desc: 'Water, soil, food forests and more', icon: 'sprout' },
      { label: 'Our Approach', href: '/about-us/#approach', desc: 'Assess, design, implement, manage, teach', icon: 'route' },
    ],
  },
  {
    label: 'Services', href: '/services/', key: 'services',
    children: services.map((s) => ({ label: s.navLabel, href: s.path, desc: {
      design: 'Site assessment and buildable designs', installation: 'Building regenerative and community projects',
      farm: 'Agroforestry, food forests and more', maintenance: 'Ongoing care, monitoring and reviews',
      education: 'Training linked to Permavia Academy',
    }[s.key], icon: s.icon })),
  },
  {
    label: 'Projects', href: '/projects/', key: 'projects',
    children: Object.values(projects).map((p) => ({ label: p.name, href: p.path, desc: `${p.type} · ${p.status.replace('Underway: ', '')}`, icon: { 'million-trees': 'trees', 'permavia-farm': 'tractor', 'permavia-academy': 'graduation-cap' }[p.path.replace(/\//g, '')] })),
  },
  {
    label: 'Products', href: '/products/', key: 'products',
    children: [
      { label: 'Courses', href: '/courses/', desc: 'Permaculture courses and workshops', icon: 'graduation-cap' },
      { label: 'Shop', href: '/shop/', desc: 'Seeds, seedlings, tools and guides', icon: 'shopping-bag' },
    ],
  },
  { label: 'Blog', href: '/blog/', key: 'blog' },
  { label: 'Events', href: '/our-events/', key: 'events' },
  { label: 'Contact', href: '/contact/', key: 'contact' },
  ];
};

const brandMark = () => `
      <img class="brand-mark" src="/assets/img/logo-mark.png" alt="" width="46" height="46">
      <span class="brand-text">
        <span class="brand-name">Permavia</span>
        <span class="brand-sub">Landscapes</span>
        <span class="brand-tag">Design | Build | Regenerate</span>
      </span>`;

function header(active) {
  const items = NAV().map((n) => {
    const cur = n.key === active ? ' aria-current="page"' : '';
    if (!n.children) return `<li><a class="nav-link" href="${n.href}"${cur}>${n.label}</a></li>`;
    const sub = n.children
      .map((c) => `<li><a href="${c.href}"><span class="sub-ic">${icon(c.icon)}</span><span><strong>${c.label}</strong><small>${c.desc}</small></span></a></li>`)
      .join('');
    return `<li class="has-sub">
      <a class="nav-link" href="${n.href}"${cur}>${n.label}</a>
      <button class="sub-toggle" aria-expanded="false" aria-label="Show ${n.label} menu">${icon('chevron-down')}</button>
      <ul class="sub-menu">${sub}</ul>
    </li>`;
  }).join('');

  return `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header" data-header>
  <div class="container header-inner">
    <a class="brand" href="/" aria-label="Permavia Landscapes, home">${brandMark()}</a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      <ul class="nav-list">${items}</ul>
      <div class="nav-mobile-extra">
        <a class="btn btn--primary btn--block" href="/contact/">Free Consultation</a>
        <a class="btn btn--wa btn--block" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>
        <p class="nav-mobile-contact">${icon('map-pin')} Serving ${site.serviceArea}<br>${icon('clock')} ${site.hours}</p>
      </div>
    </nav>
    <a class="btn btn--primary header-cta" href="/contact/">Free Consultation</a>
    <a class="header-call" href="tel:${site.phoneHref}" aria-label="Call Permavia on ${site.phone}">${icon('phone')}</a>
    <button class="nav-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>`;
}

// ── Footer ────────────────────────────────────────────────────
function footer() {
  const explore = [
    ['Home', '/'], ['About Us', '/about-us/'], ['Services', '/services/'], ['Projects', '/projects/'], ['Courses', '/courses/'], ['Shop', '/shop/'],
    ['Products', '/products/'], ['Blog', '/blog/'], ['Events', '/our-events/'], ['FAQ', '/faq/'], ['Contact', '/contact/'],
  ];
  const { services: svc, projects: proj } = require('./data');
  const services = svc.map((s) => [s.key === 'education' ? 'Education for Regenerative Design' : s.navLabel, s.path]);
  const projects = Object.values(proj).map((p) => [p.name, p.path]);
  const list = (arr) => arr.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('');
  return `
<footer class="site-footer">
  <div class="footer-contour" aria-hidden="true"></div>
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a class="brand brand--footer" href="/" aria-label="Permavia Landscapes, home">${brandMark()}</a>
        <p class="footer-line">${site.tagline}</p>
        <p>${site.mission}</p>
        <a class="btn btn--wa" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>
      </div>
      <div class="footer-col">
        <h2 class="footer-h">Explore</h2>
        <ul>${list(explore)}</ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-h">Services</h2>
        <ul>${list(services)}</ul>
        <h2 class="footer-h footer-h--spaced">Our Projects</h2>
        <ul>${list(projects)}</ul>
      </div>
      <div class="footer-col">
        <h2 class="footer-h">Get in Touch</h2>
        <ul class="footer-contact">
          <li>${icon('map-pin')}<span>Based in Uganda</span></li>
          <li>${icon('phone')}<a href="tel:${site.phoneHref}">${site.phone}</a></li>
          <li>${icon('mail')}<a class="footer-email" href="mailto:${site.email}">${site.email}</a></li>
          <li>${icon('clock')}<span>${site.hours}</span></li>
          <li>${icon('map')}<span>Serving East Africa</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span data-year>2026</span> Permavia Landscapes. All rights reserved.</p>
      <p><a href="/privacy-policy/">Privacy Policy</a><span aria-hidden="true">·</span>${site.brandLine}</p>
    </div>
  </div>
</footer>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat with Permavia on WhatsApp">${waIcon()}<span>Chat with us</span></a>`;
}

// ── Shared CTA band: "Let's Talk About Your Project" ──────────
function ctaBand({ title = "Let's Talk About Your <em>Project</em>", text, extra = '', ticks = [] } = {}) {
  const t = text || 'Tell us about your land and what you hope it can become. Your first consultation is free, and we reply within one working day.';
  const tickHtml = ticks.length
    ? `<ul class="ticks">${ticks.map((x) => `<li>${icon('check')}${x}</li>`).join('')}</ul>` : '';
  return `
<section class="cta-band" aria-labelledby="cta-title">
  <div class="container">
    <div class="cta-card" data-reveal>
      <div class="cta-copy">
        <p class="eyebrow eyebrow--light">Free Consultation</p>
        <h2 id="cta-title">${title}</h2>
        <p>${t}</p>
        ${tickHtml}
      </div>
      <div class="cta-actions">
        <a class="btn btn--primary btn--lg" href="/contact/">Book a Free Consultation ${icon('arrow-right')}</a>
        <a class="btn btn--wa btn--lg" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>
        ${extra}
        <p class="cta-note">We reply on WhatsApp within an hour, then book your free 30-minute call.<br>Or call <a href="tel:${site.phoneHref}">${site.phone}</a></p>
      </div>
    </div>
  </div>
</section>`;
}

// ── Inner-page hero ───────────────────────────────────────────
function pageHero({ eyebrow, title, lead, image, actions = '', crumbs = [], extra = '', size = '', top = '' }) {
  const bc = crumbs.length
    ? `<nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a>${crumbs.map(([l, h]) => h ? `<span>/</span><a href="${h}">${l}</a>` : `<span>/</span><span aria-current="page">${l}</span>`).join('')}</nav>` : '';
  return `
<section class="page-hero ${size}">
  <div class="page-hero-bg"><img src="${image}" alt="" fetchpriority="high"></div>
  <div class="page-hero-contour" aria-hidden="true"></div>
  <div class="container page-hero-inner">
    ${bc}
    ${top}
    ${eyebrow ? `<p class="eyebrow eyebrow--light">${eyebrow}</p>` : ''}
    <h1>${title}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
    ${actions ? `<div class="hero-actions">${actions}</div>` : ''}
    ${extra}
  </div>
</section>`;
}

const sectionHead = ({ eyebrow, title, text = '', center = true, id = '' }) => `
<div class="section-head${center ? ' is-center' : ''}" data-reveal>
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h2${id ? ` id="${id}"` : ''}>${title}</h2>
  ${text ? `<p class="section-sub">${text}</p>` : ''}
</div>`;

// Stage progress: "Stage 2 of 5"
const stageMeter = (stage, of = 5, label = '') => `
<div class="stage" aria-label="Stage ${stage} of ${of}${label ? ': ' + label : ''}">
  <div class="stage-bars">${Array.from({ length: of }, (_, i) => `<span class="${i < stage ? 'on' : ''}"></span>`).join('')}</div>
  <span class="stage-text">Stage ${stage} of ${of}${label ? ` · ${label}` : ''}</span>
</div>`;

// Waitlist / newsletter form
function signupForm({ id, kind = 'waitlist', button = 'Join the Waitlist', interest = null, compact = false, source = '' }) {
  const interestField = interest
    ? `<label class="field"><span>${interest.label}</span><select name="interest" required>
        <option value="">Choose one</option>${interest.options.map((o) => `<option>${o}</option>`).join('')}
      </select></label>` : '';
  return `
<form class="signup-form${compact ? ' is-compact' : ''}" data-form="${kind}" data-source="${source}" id="${id}" novalidate>
  <div class="form-grid">
    <label class="field"><span>Full name</span><input name="name" autocomplete="name" required placeholder="Your name"></label>
    <label class="field"><span>Email</span><input type="email" name="email" autocomplete="email" required placeholder="you@example.com"></label>
    ${compact ? '' : `<label class="field"><span>Phone <em>(optional)</em></span><input type="tel" name="phone" autocomplete="tel" placeholder="+256 ..."></label>`}
    ${interestField}
  </div>
  <button class="btn btn--primary" type="submit">${button} ${icon('arrow-right')}</button>
  <p class="form-note">${icon('lock')} We only use your details to contact you about this. Unsubscribe any time. <a href="/privacy-policy/">Privacy Policy</a></p>
  <div class="form-status" role="status" aria-live="polite"></div>
</form>`;
}

// ── Answer-engine (AEO) helpers ──────────────────────────────
// "In short" box: a self-contained 2–3 sentence answer that AI assistants and search snippets can quote.
const inShort = (text) => `<div class="in-short" data-reveal><strong>${icon('sparkles')} In short</strong><p>${text}</p></div>`;

// FAQ section: visible questions + answers. Pair it with faqSchema() so the same Q&As are machine-readable.
// items: [[question, answer], …]; answers may contain simple links.
const faqSection = ({ eyebrow = 'Questions', title, items, id = 'faq', sage = false }) => `
<section class="section${sage ? ' section--sage' : ''}" id="${id}" aria-labelledby="${id}-title">
  <div class="container faq-wrap">
    ${sectionHead({ eyebrow, title, id: `${id}-title` })}
    ${items.map(([q, a], i) => `
    <details class="faq-item"${i === 0 ? ' open' : ''} data-reveal>
      <summary>${q}<span class="faq-ic">${icon('plus')}</span></summary>
      <div class="faq-a"><p>${a}</p></div>
    </details>`).join('')}
  </div>
</section>`;

const stripTags = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const faqSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: stripTags(q), acceptedAnswer: { '@type': 'Answer', text: stripTags(a) } })),
});

// Reference to the business entity (defined in build.js) for "provider" fields.
const businessRef = () => (site.url ? { '@id': `${site.url.replace(/\/$/, '')}/#business` } : { '@type': 'LocalBusiness', name: site.name });

module.exports = { img, icon, waIcon, waLink, header, footer, ctaBand, pageHero, sectionHead, stageMeter, signupForm, inShort, faqSection, faqSchema, businessRef, site };
