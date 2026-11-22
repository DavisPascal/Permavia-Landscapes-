# Permavia Landscapes website

Static marketing site for **Permavia Landscapes** (regenerative landscape & farm design, Hoima City, Uganda; serves East Africa).
Live domain: **https://www.permavialandscapes.com** (to be hosted on **Netlify**, domain from **Namecheap**). Not deployed yet.
Original brief: `C:\Users\LENOVO\Desktop\Website_VScode\Permavia_Website_Developer_Page_Plan.pdf`; SEO strategy: `…\Permavia_Landscapes_SEO_Strategy.docx`.

## Git & deployment workflow (owner's rules, Nov 2026)
- `main` = production branch, connected to the live Netlify site. **Never change, merge into, push to or publish `main` without the owner's explicit approval.**
- All work happens on the **`Development`** branch (GitHub name, capital D; the owner's rules say "development", same branch). Before every push, confirm `git branch --show-current` is `Development`.
- After a task: review changed files, build and test locally (desktop + 375px phone), commit to `Development`, push to GitHub.
- Don't trigger production deploys or change Netlify production/build settings, environment variables or domain setup without approval.
- Keep existing design, structure and functionality unless the owner asks for changes.
- Publishing: only when the owner explicitly says so, prepare approved changes for merging `Development` → `main`.

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
Header menu order: Home, About Us (Story & Values, What We Do, Our Approach), Services (5 service pages), Projects (Million Trees, Permavia Farm, Permavia Academy), Products (Courses, Shop), Blog, Events, Contact. Menu collapses to the phone menu below 1200px.
Copy: "millions of trees" (never "1 million"). **Area: "serving East Africa" only.** Never name Hoima, districts (Masindi, Kikuube, Kagadi, Buliisa, Kampala…) or "Western Uganda" in copy, SEO titles or descriptions. The base address "Hoima City, Uganda" (`site.location`) appears only as a contact address: footer "Get in Touch" (owner wants it there), Contact page details + map, Privacy Policy, schema address. `site.serviceArea` = 'East Africa'.
Positioning (Brand & Website Direction, Nov 2026): a **regenerative development company**. Never call Permavia a landscaping company, landscapers or landscape designers (page text, search titles or descriptions). Brand expression "We Design. We Build. We Regenerate." (`site.tagline`); existing tagline "Your Vision, Our Green Touch." (`site.brandLine`). Five outcomes: healthier ecosystems, productive farms/food systems, stronger livelihoods, resilient communities, lasting skills.
Methods: **nature-based first**, never "organic only / no chemicals" for services. "Careful Transition" (a section on About, NOT one of the values): regeneration is a process; machinery and limited, targeted inputs may be used to establish systems on large/degraded land, then phased out (About → #transition, permaculture principles). Nursery/farm copy (organic seedlings, zero synthetic inputs) is about Permavia's own projects.
**No completed projects yet.** Never imply finished work, past clients, testimonials or results. Projects show their real stage (`phase`/`now` in data.js); "Completed" stays empty until there is verified work.
Blog: 7 categories (`blogCategories`, the buttons on /blog/; Blog has NO menu dropdown) and 12 tags (`blogTags`) in data.js. Each post has one `category` and a few `tags` by name; the build stops if a name is unknown. Filters on /blog/ via `?category=<slug>&tag=<slug>` (main.js).
Services: `services` in data.js (slug → `/services/<slug>/`, plus activities, journey, challenges, care, formats…); `src/pages/services.js` builds the overview and the 5 detail pages. `/projects/` overview lives in projects.js.

## Forms → HubSpot (live, working)
- Portal 149777969 (EU account). Forms: contact, booking, waitlist, newsletter (IDs in `site.js`). Submitted from the browser to `api.hsforms.com/submissions/v3/integration/submit/…`.
- Field internal names in `hubspot.properties`; **dropdown answers are translated** to HubSpot option values in `hubspot.values` (HubSpot spellings like "soltuions", "Accomodation" are intentional). If HubSpot options change, update `hubspot.values`, or values silently fail to reach the contact.
- Forms carry `data-hs-do-not-collect` (prevents HubSpot "collected forms" duplicates). HubSpot tracking script is loaded (hutk cookie).
- **Testing:** stub `window.fetch` for POSTs unless the user asks for real test records. Real tests create contacts/emails in their HubSpot. A deleted contact's email can't be reused for tests, so use a fresh address.

## Discovery-call booking (Contact page, 3-step wizard)
- Step 3 = own calendar fed by **Cal.com** live slots (`booking` link in site.js: `cal.com/info-permavialandscapes.com/30min`, Webex, connected via CalDAV to Namecheap Private Email info@). Only days/times in `callDays` / `callSlots` (currently Thu–Fri, 09:00–14:30 starts, 30 min) AND free in Cal.com are shown.
- Confirm → POST `api.cal.com/v2/bookings` → then HubSpot booking form → `/thank-you/?booked=1&confirmed=1`. If Cal.com fails → request-only flow. Calls are **Webex only**.
- The Cal.com event **requires `attendee.phoneNumber`** (sent as +256… via `intlPhone()` in main.js) and **rejects emails that can't receive mail** (e.g. @example.com). A 400 about email/phone sends the visitor back to step 1 with a message. Real end-to-end test confirmed 21 Nov 2026: booking accepted, Webex link created, event written to the Private Email calendar via CalDAV.
- Don't make real Cal.com bookings without asking (they land in the user's calendar).

## Still open (as of Nov 2026)
- Phone/WhatsApp set to real `+256 394 777 418` (Nov 2026); owner to confirm WhatsApp works on it. Email info@ confirmed.
- Team section on About is hidden (`showTeam: false` in site.js) while the team is being built; turn on once founder photo/name are ready. Optional GA4 ID (`analytics`).
- Cal.com availability should be set to Thu–Fri 9–3 to match the site.
- Deploy to Netlify, connect the Namecheap domain, submit the sitemap in Search Console.

## Working with the owner
Non-developer; explain in plain language, step by step. Verify changes in the browser preview (desktop + 375px phone) before reporting.
