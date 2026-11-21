# Permavia Landscapes website

A fast, static website built from the *Permavia Website Developer Page Plan*. You don't need WordPress, plugins or a database. The finished site is the `public/` folder, which you can upload to any web host.

## Run it on your computer

```bash
npm run dev
```

Then open http://localhost:4321. You only need Node.js; there is nothing else to install.

## Edit content

| What | Where |
|---|---|
| Phone, WhatsApp, email, hours, form endpoints | `src/site.js` |
| Projects, services, blog posts | `src/data.js` |
| Header, footer, CTA band | `src/components.js` |
| Each page | `src/pages/*.js` |
| Upcoming events | `EVENTS` list at the top of `src/pages/events-privacy.js` |
| Colours, fonts, layout | `public/assets/css/styles.css` (tokens at the top) |

After any change, run `npm run build`, which regenerates every page in `public/`.

## Before going live (priority 1)

1. **Real phone and WhatsApp number**: these are still the placeholder `+256 700 000 000`. Change them in `src/site.js`.
2. **Real email**: `info@permavialandscapes.com` is a placeholder.
3. **Forms**: paste a form endpoint (Formspree, HubSpot or Mailchimp) into `forms` in `src/site.js`. Until you do, forms open the visitor's email app with the details filled in.
4. **Call booking calendar** (Contact page): by default visitors request a date and time, and your team confirms it. To show your real availability and confirm bookings automatically, paste a free HubSpot Meetings or Calendly link into `booking` in `src/site.js`.
5. **Founder photo and name**: see the TODO in `src/pages/about.js` (Team section).
6. **Domain**: set `url` in `src/site.js`. This turns on `sitemap.xml`, canonical links and social preview images. Then submit `/sitemap.xml` in Google Search Console.
7. **Google Analytics**: paste your GA4 ID into `analytics` in `src/site.js`, then mark `generate_lead`, `book_call`, `click_whatsapp` and `click_call` as key events in GA4.

## SEO

- Search titles and descriptions for every page live in `src/seo.js` (one main phrase per page). `npm run build` warns if one is too long or short.
- Service areas (`serviceAreas` in `src/site.js`) appear on the site and in Google's business data. Keep them identical to the Google Business Profile.

## Deploy

**Step-by-step for Netlify + Namecheap, and switching the maintenance page on/off: see [MAINTENANCE.md](MAINTENANCE.md).**


Upload the contents of `public/` to any static host: Netlify, Vercel, Cloudflare Pages, or your cPanel `public_html` folder. Pages use clean URLs (`/about-us/`, `/services/`…), matching the old WordPress addresses. Point your host's 404 page at `/404/index.html`.

## Images

The originals from `permavia-image-pack` were converted to WebP (127 MB → 12 MB) in `public/assets/img/`. To add a photo, export it as `.webp` at about 1600px wide, put it in that folder and reference it with `img('file-name')` in a page.
