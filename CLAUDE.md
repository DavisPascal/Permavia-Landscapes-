# Permavia Landscapes website

Static marketing site for **Permavia Landscapes** (regenerative landscape & farm design, Hoima City, Uganda; serves East Africa).
Live domain: **https://www.permavialandscapes.com** (to be hosted on **Netlify**, domain from **Namecheap**). Not deployed yet.
Original brief: `C:\Users\LENOVO\Desktop\Website_VScode\Permavia_Website_Developer_Page_Plan.pdf`; SEO strategy: `…\Permavia_Landscapes_SEO_Strategy.docx`.

## Run
- `start.cmd` (double-click) or `npm run dev` → preview at http://localhost:4321. Edits in `src/` rebuild automatically.
- `npm run build` → normal site into `public/`. `npm run build:maintenance` → maintenance mode (see MAINTENANCE.md).
- The dev server keeps whichever mode was last built. Always finish with `npm run build` (normal) unless asked otherwise.

## Structure
- `build.js`: static generator. Each module in `src/pages/*.js` exports `{ path, title, description, body, … }` (or an array); writes `public/<path>/index.html`, `404.html`, `_redirects`, `sitemap.xml`, `robots.txt`. Page flags: `noindex`, `bare` (no header/footer), `schema`, `bodyClass`.
- `src/site.js`: **all settings**: contact details, domain, maintenance, service areas, HubSpot IDs/field names/value translations, Cal.com booking link, call days/slots.
- `src/seo.js`: search title + meta description per page (title ≤ 60, description 110–160; build warns).
- `src/components.js`: header, footer, CTA band, page hero, signup form. `src/data.js`: projects, services, blog posts. `src/cards.js`.
- `public/assets/css/styles.css` (design tokens at top), `public/assets/js/main.js` (all interactions), `public/assets/img` (WebP), `public/assets/fonts` (self-hosted).
- Guides: README.md, HUBSPOT_SETUP.md, MAINTENANCE.md.

## Brand
Colours: Harvest Gold `#F9A602` (primary), Sun Gold `#FEBF3A`, Forest Green `#255119` (secondary), Leaf Green `#89AD44` (accent), Fern `#3A8C47`, Deep Forest `#1A2E1A`, Pale Sage `#EEF2EA`, Mist `#E0EDD4`, Off White `#F9FDF3`. Gold text only on dark backgrounds.
Fonts: Montserrat (headings/buttons), Poppins (body), Lora italic (highlighted words/quotes). Icons: Lucide only (no emoji). One H1 per page. Use CSS tokens, not new hex codes.
Header menu order: Home, About Us (What We Do, Services), Products (Courses, Shop), Blog, Events, Contact.
Copy: "millions of trees" (never "1 million"); location stays Hoima City but say "serving East Africa".

## Forms → HubSpot (live, working)
- Portal 149777969 (EU account). Forms: contact, booking, waitlist, newsletter (IDs in `site.js`). Submitted from the browser to `api.hsforms.com/submissions/v3/integration/submit/…`.
- Field internal names in `hubspot.properties`; **dropdown answers are translated** to HubSpot option values in `hubspot.values` (HubSpot spellings like "soltuions", "Accomodation" are intentional). If HubSpot options change, update `hubspot.values`, or values silently fail to reach the contact.
- Forms carry `data-hs-do-not-collect` (prevents HubSpot "collected forms" duplicates). HubSpot tracking script is loaded (hutk cookie).
- **Testing:** stub `window.fetch` for POSTs unless the user asks for real test records. Real tests create contacts/emails in their HubSpot. A deleted contact's email can't be reused for tests, so use a fresh address.

## Discovery-call booking (Contact page, 3-step wizard)
- Step 3 = own calendar fed by **Cal.com** live slots (`booking` link in site.js: `cal.com/info-permavialandscapes.com/30min`, Webex, connected via CalDAV to Namecheap Private Email info@). Only days/times in `callDays` / `callSlots` (currently Thu–Fri, 09:00–14:30 starts, 30 min) AND free in Cal.com are shown.
- Confirm → POST `api.cal.com/v2/bookings` → then HubSpot booking form → `/thank-you/?booked=1&confirmed=1`. If Cal.com fails → request-only flow. Calls are **Webex only**.
- Don't make real Cal.com bookings without asking (they land in the user's calendar).

## Still open (as of Nov 2026)
- Phone/WhatsApp still placeholder `+256 700 000 000` (`phone`, `phoneHref`, `whatsapp` in site.js); confirm info@ mailbox.
- Founder photo/name (About → team block TODO). Optional GA4 ID (`analytics`).
- Cal.com availability should be set to Thu–Fri 9–3 to match the site.
- Deploy to Netlify, connect the Namecheap domain, submit the sitemap in Search Console.

## Working with the owner
Non-developer; explain in plain language, step by step. Verify changes in the browser preview (desktop + 375px phone) before reporting.
