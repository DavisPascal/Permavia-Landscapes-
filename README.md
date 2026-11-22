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
| Blog articles and events | **Content manager at `/admin/`** (Decap CMS). Files in `content/blog/` and `content/events/`. See [CMS_SETUP.md](CMS_SETUP.md) |
| Projects, services, blog categories and tags | `src/data.js` |
| Header, footer, CTA band | `src/components.js` |
| Each page | `src/pages/*.js` |
| Colours, fonts, layout | `public/assets/css/styles.css` (tokens at the top) |

After any change, run `npm run build`, which regenerates every page in `public/`.

## Before going live: checklist (status Nov 2026)

1. ✅ **Phone and WhatsApp**: `+256 394 777 418` (`phone`, `phoneHref`, `whatsapp` in `src/site.js`). Make sure WhatsApp (or WhatsApp Business) is set up on this number.
2. ✅ **Email**: `info@permavialandscapes.com` (Namecheap Private Email).
3. ✅ **Forms**: all four forms (contact, discovery call, waitlist, newsletter) send to **HubSpot** (IDs under `hubspot` in `src/site.js`; see HUBSPOT_SETUP.md). The `forms` setting is only a fallback and can stay empty.
4. ✅ **Call booking calendar**: live **Cal.com** availability on the Contact page (`booking` in `src/site.js`), Thu–Fri 9:00–15:00, Webex. Keep the same hours set in Cal.com.
5. ⏸ **Founder photo and name**: the Team section is hidden for now (`showTeam: false` in `src/site.js`).
6. ✅ **Domain in the site**: `url` is set to `https://www.permavialandscapes.com`, so `sitemap.xml`, canonical links and social previews are already on. **Still to do after going live:** connect the Namecheap domain in Netlify, then submit `https://www.permavialandscapes.com/sitemap.xml` in Google Search Console.
7. ⬜ **Google Analytics**: the tracking is built in but switched off. Create a GA4 property, paste its Measurement ID (`G-XXXXXXXXXX`) into `analytics` in `src/site.js`, then mark `generate_lead`, `book_call`, `click_whatsapp` and `click_call` as key events in GA4.

## SEO

- Search titles and descriptions for every page live in `src/seo.js` (one main phrase per page). `npm run build` warns if one is too long or short.
- Service areas (`serviceAreas` in `src/site.js`) appear on the site and in Google's business data. Keep them identical to the Google Business Profile.

## Deploy

**Step-by-step for Netlify + Namecheap, and switching the maintenance page on/off: see [MAINTENANCE.md](MAINTENANCE.md).**


Upload the contents of `public/` to any static host: Netlify, Vercel, Cloudflare Pages, or your cPanel `public_html` folder. Pages use clean URLs (`/about-us/`, `/services/`…), matching the old WordPress addresses. Point your host's 404 page at `/404/index.html`.

## Images

The originals from `permavia-image-pack` were converted to WebP (127 MB → 12 MB) in `public/assets/img/`. To add a photo, export it as `.webp` at about 1600px wide, put it in that folder and reference it with `img('file-name')` in a page.

Photos wider than 1200px also have a phone copy (`<name>-sm.webp`), listed in `src/img-sizes.json`; the build adds `srcset` so phones download the small copy. When you add or replace a large photo, ask for the phone copies to be regenerated.
