// Builds every page in src/pages into public/<path>/index.html,
// plus sitemap.xml and robots.txt.  Usage: npm run build
const fs = require('fs');
const path = require('path');
const { header, footer, site } = require('./src/components');
const SEO = require('./src/seo');
const { services } = require('./src/data');

const OUT = path.join(__dirname, 'public');
const PAGES = path.join(__dirname, 'src', 'pages');
const abs = (p) => (site.url ? site.url.replace(/\/$/, '') + p : p);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const warnings = [];

// ── Security policy for site pages ───────────────────────────
// Allows only what the site uses: its own files, HubSpot (forms + tracking), Cal.com (booking times),
// Google Maps (Contact page) and Google Analytics if an ID is set. Everything else is blocked.
// It is placed in each page as a <meta> tag, so the CMS at /admin (which needs Decap's editor
// from unpkg.com, GitHub and Netlify login) can have its own policy in public/admin/index.html.
// Rules a <meta> tag can't carry (frame-ancestors, upgrade-insecure-requests) stay in public/_headers.
const PAGE_CSP = [
  "default-src 'self'",
  "script-src 'self' https://*.hs-scripts.com https://*.hs-analytics.net https://*.hs-banner.com https://*.hscollectedforms.net https://*.hsadspixel.net https://*.hs-ads.net https://*.usemessages.com https://*.hubspot.com https://*.hsforms.net https://www.googletagmanager.com",
  "connect-src 'self' https://api.hsforms.com https://*.hsforms.com https://*.hubspot.com https://*.hubapi.com https://*.hscollectedforms.net https://*.hs-banner.com https://*.hs-analytics.net https://api.cal.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "frame-src https://www.google.com https://maps.google.com https://cal.com https://app.cal.com https://*.hubspot.com",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

// ── Structured data (schema.org) ─────────────────────────────
const business = () => {
  const b = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: 'A regenerative development company designing, implementing and managing nature-positive landscapes and productive systems for homes, farms, businesses, institutions and communities across East Africa.',
    slogan: site.tagline,
    telephone: site.phone,
    email: site.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Hoima City', addressRegion: 'Hoima', addressCountry: 'UG' },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '18:00' }],
    areaServed: [{ '@type': 'Place', name: site.serviceArea }],
    knowsAbout: ['Permaculture design', 'Regenerative agriculture', 'Agroforestry', 'Water harvesting', 'Food forests', 'Soil restoration', 'Tree nursery', 'Carbon projects'],
    makesOffer: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, description: s.short, areaServed: 'East Africa' } })),
  };
  if (site.url) {
    Object.assign(b, { '@id': abs('/#business'), url: abs('/'), logo: abs('/assets/img/logo-mark.png'), image: abs('/assets/img/01-home__04-benefits__tab-1-home-living.webp') });
  }
  if (site.social.length) b.sameAs = site.social;
  return b;
};

const breadcrumbs = (p) => {
  if (p.path === '/' || p.noindex) return null;
  const items = [['Home', '/']];
  if (p.path.startsWith('/blog/') && p.path !== '/blog/') items.push(['Journal', '/blog/']);
  if (/^\/(courses|shop)\/$/.test(p.path)) items.push(['Products', '/products/']);
  if (p.path.startsWith('/services/') && p.path !== '/services/') items.push(['Services', '/services/']);
  if (/^\/(million-trees|permavia-farm|permavia-academy)\/$/.test(p.path)) items.push(['Projects', '/projects/']);
  items.push([p.title, p.path]);
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, u], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(u) })),
  };
};

function schemaFor(p) {
  const list = [];
  if (['/', '/contact/', '/about-us/', '/faq/'].includes(p.path)) list.push(business());
  const bc = breadcrumbs(p); if (bc) list.push(bc);
  [].concat(p.schema || []).forEach((s) => {
    if (s['@type'] === 'BlogPosting') {
      Object.assign(s, {
        publisher: { '@type': 'Organization', name: site.name, ...(site.url ? { logo: { '@type': 'ImageObject', url: abs('/assets/img/logo-mark.png') } } : {}) },
        ...(p.ogImage ? { image: abs(p.ogImage) } : {}),
        ...(site.url ? { mainEntityOfPage: abs(p.path) } : {}),
        dateModified: s.dateModified || s.datePublished,
      });
    }
    list.push(s);
  });
  return list.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
}

// ── Analytics (Google Analytics 4) ───────────────────────────
// No inline code: /assets/js/ga.js reads the ID from the page's settings block (keeps the security policy strict).
const analytics = () => site.analytics ? `
<script async src="https://www.googletagmanager.com/gtag/js?id=${site.analytics}"></script>
<script src="/assets/js/ga.js" defer></script>` : '';

// Settings the browser script needs, as a JSON data block (not executable, so allowed by the security policy).
const siteConfig = () => JSON.stringify({
  email: site.email, forms: site.forms, hubspot: site.hubspot, booking: site.booking,
  callSlots: site.callSlots, callDays: site.callDays, analytics: site.analytics,
}).replace(/</g, '\\u003c');

// Spam trap added to every form: a field people never see or fill in. Bots that fill it are ignored (see main.js).
const HONEYPOT = '<div class="hp-field" aria-hidden="true"><label>Leave this empty<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label></div>';

function layout(p) {
  const seo = SEO[p.path] || {};
  const title = seo.title || p.seoTitle || (p.path.startsWith('/blog/') && p.title.length > 48 ? p.title : `${p.title} | ${site.name}`);
  const description = seo.description || p.description;
  if (!p.noindex) {
    if (title.length > 60) warnings.push(`title ${title.length} chars  ${p.path}`);
    if (description.length < 110 || description.length > 160) warnings.push(`description ${description.length} chars  ${p.path}`);
  }
  const og = site.url ? `
<link rel="canonical" href="${abs(p.path)}">
<meta property="og:url" content="${abs(p.path)}">
${p.ogImage ? `<meta property="og:image" content="${abs(p.ogImage)}">\n<meta name="twitter:image" content="${abs(p.ogImage)}">` : ''}` : '';
  const heroSet = p.heroImage && imgSet(p.heroImage);
  const heroPreload = p.heroImage ? `<link rel="preload" as="image" href="${p.heroImage}"${heroSet ? ` imagesrcset="${heroSet}" imagesizes="100vw"` : ''} fetchpriority="high">` : '';
  return `<!doctype html>
<html lang="en-UG">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${PAGE_CSP}">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${p.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
${og}
<meta property="og:type" content="${[].concat(p.schema || []).some((s) => s['@type'] === 'BlogPosting') ? 'article' : 'website'}">
<meta property="og:locale" content="en_UG">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1A2E1A">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256x256.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
${heroPreload}
<link rel="preload" href="/assets/fonts/montserrat-latin-700-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/poppins-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/styles.css">
${schemaFor(p)}
${analytics()}
${site.hubspot && site.hubspot.tracking ? `<script id="hs-script-loader" async defer src="${site.hubspot.tracking}"></script>` : ''}
</head>
<body class="${p.bodyClass || ''}">
${p.bare ? '' : header(p.active)}
<main id="main">
${p.body.replace(/<form\b([^>]*)>/g, `<form data-hs-do-not-collect="true"$1>${HONEYPOT}`)}
</main>
${p.bare ? '' : footer()}
<script type="application/json" id="site-config">${siteConfig()}</script>
<script src="/assets/js/lucide.min.js" defer></script>
<script src="/assets/js/main.js" defer></script>
</body>
</html>
`;
}

// ── Responsive photos ────────────────────────────────────────
// Large photos have a phone-sized copy (<name>-sm.webp, 1200px wide). src/img-sizes.json lists them
// (regenerate it when photos change). Each <img> of such a photo gets srcset/sizes, so phones download the small copy.
let IMG_SIZES = {};
try { IMG_SIZES = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'img-sizes.json'), 'utf8')); } catch { /* no list: plain images */ }
const SM_W = 1200;
const FULL_BLEED = /(hero-bg|page-hero-bg|how-bg|image-band|mnt-bg)"[^<]*$/; // background photos that fill the screen width
const imgSet = (src) => {
  const m = src.match(/^\/assets\/img\/(.+)\.webp$/); const s = m && IMG_SIZES[m[1]];
  return s && s.sm ? `/assets/img/${m[1]}-sm.webp ${SM_W}w, ${src} ${s.w}w` : null;
};
function responsiveImages(html) {
  return html.replace(/<img src="([^"]+)"([^>]*)>/g, (tag, src, rest, offset) => {
    const set = imgSet(src); if (!set || /srcset=/.test(rest)) return tag;
    const before = html.slice(Math.max(0, offset - 160), offset);
    const sizes = FULL_BLEED.test(before) ? '100vw' : '(max-width: 767px) 100vw, 50vw';
    return `<img src="${src}" srcset="${set}" sizes="${sizes}"${rest}>`;
  });
}

// Hero image of the page (first fetchpriority image), so it can be preloaded.
const heroOf = (body) => (body.match(/<img src="([^"]+)" alt="[^"]*" fetchpriority="high"/) || [])[1];

let count = 0;
const indexable = [];
const built = new Set();
for (const file of fs.readdirSync(PAGES).filter((f) => f.endsWith('.js'))) {
  delete require.cache[require.resolve(path.join(PAGES, file))];
  const mod = require(path.join(PAGES, file));
  const pages = Array.isArray(mod) ? mod : [mod];
  for (const p of pages) {
    p.heroImage = p.heroImage || heroOf(p.body);
    const dir = path.join(OUT, p.path);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), responsiveImages(layout(p)));
    if (!p.noindex) indexable.push(p);
    built.add(p.path);
    count++;
    console.log('  built', p.path);
  }
}

// CMS pages: remove article/event pages that no longer exist (deleted, unpublished or renamed in the CMS),
// so old addresses don't linger. Only touches folders inside /blog/ and /our-events/.
for (const section of ['blog', 'our-events']) {
  const base = path.join(OUT, section);
  if (!fs.existsSync(base)) continue;
  for (const d of fs.readdirSync(base, { withFileTypes: true })) {
    const p = `/${section}/${d.name}/`;
    if (d.isDirectory() && !built.has(p) && fs.existsSync(path.join(base, d.name, 'index.html'))) {
      fs.rmSync(path.join(base, d.name), { recursive: true, force: true });
      console.log('  removed old page', p);
    }
  }
}

// ── sitemap.xml + robots.txt ─────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
if (site.url) {
  const prio = (u) => (u === '/' ? '1.0' : /^\/(services|services\/[a-z-]+|contact|million-trees|projects)\/$/.test(u) ? '0.9' : u.startsWith('/blog/') && u !== '/blog/' ? '0.6' : '0.7');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.sort((a, b) => a.path.localeCompare(b.path)).map((p) => `  <url><loc>${abs(p.path)}</loc><lastmod>${p.updated || today}</lastmod><priority>${prio(p.path)}</priority></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), xml);
} else {
  warnings.push('site.url is empty: sitemap.xml, canonical links and social images are skipped until the domain is set in src/site.js');
}
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin/
${site.url ? `\nSitemap: ${abs('/sitemap.xml')}\n` : ''}`);

// ── llms.txt: a plain-language summary for AI assistants (https://llmstxt.org) ──
// Built from site.js and data.js, so it stays in sync. Contact details come straight from site.js.
{
  const { projects, posts } = require('./src/data');
  const link = (title, p, note) => `- [${title}](${abs(p)})${note ? `: ${note}` : ''}`;
  const llms = `# ${site.name}

> ${site.name} is a regenerative development company serving clients across ${site.serviceArea}. We design, build and manage nature-positive landscapes and productive systems that restore ecosystems, strengthen livelihoods and create lasting value for communities, putting nature-based methods first. The first 30-minute discovery call (on Webex) is free.

## Key facts
- Area served: ${site.serviceArea} (contact address: ${site.location})
- Services: ${services.map((s) => s.title).join('; ')}
- Projects: ${Object.values(projects).map((p) => `${p.name} (${p.type}, ${p.status})`).join('; ')}
- Methods: nature-based first. Regeneration is treated as a process: machinery and limited, targeted inputs may be used to establish systems on large or degraded land, then phased out as the land regenerates itself
- Opening hours: ${site.hours} (EAT)
- Contact: phone/WhatsApp ${site.phone}; email ${site.email}; website ${abs('/')}
- Free discovery call: book at ${abs('/contact/#book')}

## Services
${services.map((s) => link(s.title, s.path, s.short)).join('\n')}

## Projects (initiatives Permavia is building; none is complete yet)
${link('All projects and their current stage', '/projects/')}
${Object.values(projects).map((p) => link(p.name, p.path, p.short)).join('\n')}

## Answers to common questions
${link('FAQ: costs, areas covered, site visits, methods, timelines', '/faq/')}

## Guides (Regenerative Journal)
${posts.map((p) => link(p.title, `/blog/${p.slug}/`, p.summary || p.excerpt)).join('\n')}

## Other pages
${link('About Permavia Landscapes: story, mission, vision, values and approach', '/about-us/')}
${link('Courses and workshops', '/courses/')}
${link('Shop (seedlings, tools, guides)', '/shop/')}
${link('Events: workshops and farm tours', '/our-events/')}
${link('Contact and booking', '/contact/')}
`;
  fs.writeFileSync(path.join(OUT, 'llms.txt'), llms);
}

// ── Netlify files ────────────────────────────────────────────
// Netlify shows /404.html for any address that doesn't exist.
fs.copyFileSync(path.join(OUT, '404', 'index.html'), path.join(OUT, '404.html'));

// Security headers (Netlify reads public/_headers; the local preview applies them too).
// The detailed page policy is in each page's <meta> tag (PAGE_CSP above).
fs.writeFileSync(path.join(OUT, '_headers'), `# Security headers, applied by Netlify to every page (generated by build.js; edit there, not here)
/*
  Content-Security-Policy: frame-ancestors 'none'; object-src 'none'; base-uri 'self'; upgrade-insecure-requests
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Strict-Transport-Security: max-age=31536000
  Cross-Origin-Opener-Policy: same-origin-allow-popups

# CMS: never cache the editor's settings, so changes to config.yml show up straight away
/admin/*
  Cache-Control: no-cache
`);

// Maintenance mode: `npm run build:maintenance`, or `maintenance.on: true` in src/site.js.
// Netlify reads _redirects: every page goes to /maintenance/ with a 302 (temporary) redirect,
// so Google keeps your pages. Images, styles and scripts still load so the page looks right.
const MAINTENANCE = process.argv.includes('--maintenance') || !!(site.maintenance && site.maintenance.on);
fs.writeFileSync(path.join(OUT, '_redirects'), MAINTENANCE
  ? `# MAINTENANCE MODE ON (built ${new Date().toISOString()})
/assets/*        /assets/:splat              200
/admin/*         /admin/:splat               200
/uploads/*       /uploads/:splat             200
/maintenance/    /maintenance/index.html     200
/*               /maintenance/               302!
`
  : `# Normal mode: maintenance is OFF, no redirects.
`);

console.log(`\n${count} pages built into public/`);
console.log(MAINTENANCE
  ? '\n  >>> MAINTENANCE MODE IS ON: once deployed, every visitor sees /maintenance/ <<<'
  : '\n  Maintenance mode: OFF (normal site)');
if (warnings.length) console.log(`\nSEO notes:\n  - ${warnings.join('\n  - ')}`);
