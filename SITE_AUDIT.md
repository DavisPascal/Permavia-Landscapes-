# Permavia Landscapes website audit

**Date:** 21 November 2026 · **Scope:** all 21 built pages, site code, forms (HubSpot), booking (Cal.com), hosting setup (Netlify)
**Method:** automated scan of every page (links, images, headings, page weight), code review of the site script and build, and checks of the third-party connections. Security is weighted most heavily.

## Overall score: **77 / 100** (good; fix the security headers and placeholders before launch)

| Area | Weight | Score | In one line |
|---|---|---|---|
| 🔒 **Security & privacy** | 30% | **72%** | Strong foundation (static site, no secrets, no login to hack), but missing browser security headers, spam protection and a cookie notice |
| ⚡ Performance | 15% | 74% | Images already WebP, but a heavy icon library and large hero images slow phones |
| 🔎 SEO | 15% | 85% | Titles, descriptions, sitemap and Google business data all done; needs more content |
| ♿ Accessibility | 10% | 85% | Keyboard and screen-reader friendly; one colour is slightly too light |
| 📱 Mobile & usability | 10% | 90% | Tested at phone size; booking flow is clear |
| ✍️ Content & conversion | 10% | 70% | Placeholder phone number on every page; no testimonials or project stories yet |
| 🧰 Code quality & launch readiness | 10% | 66% | Clean, documented code, but no version control/backup and not deployed yet |

**After the fixes marked 🔧 below, the expected score is about 92/100.**

> ### ✅ Update, 21 Nov 2026: security fixes applied
> **Security 72% → 90%. Overall 77 → 83/100.**
> | Fix | Status | Verified |
> |---|---|---|
> | S1 Security headers (`public/_headers`: CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS, COOP) | ✅ Done | All pages send 6/6 headers in the preview; HubSpot tracking, Google Maps, Cal.com times, HubSpot and Cal.com submissions all work under the policy |
> | S2 Crafted links can't break the page | ✅ Done | `/contact/?service="]<b>#%E0%A4%A` loads and the booking form works |
> | S3 Spam traps on all forms + bookings | ✅ Done | Trap filled → nothing sent; sent within 3 s → nothing sent; real person → sent to HubSpot |
> | S6 Version history (Git) | ✅ Done | 2 commits on branch `main`; nothing uncommitted |
> | S7 No inline scripts | ✅ Done | 0 inline scripts on 21 pages |
> | S8 Preview server hardened | ✅ Done | Malformed address returns "400 Bad request" instead of crashing |
> | Found during testing: HubSpot tracking loaded over `//` (protocol-relative) | ✅ Fixed | Now explicitly `https://` |
> | S4 Cookie banner · S5 Email required on 3 HubSpot forms | ⏳ **Yours** (in HubSpot) | |
> | Placeholder phone number | ⏳ **Yours** (`src/site.js`) | |
>
> **Still to do:** a private GitHub copy for off-site backup (needs your GitHub account), the performance items, and the content items below.

---

## 1. Security & privacy: 72%

### What's already strong ✅
- **No server, database or admin login.** A static site can't be "hacked into" the way WordPress sites are (no plugins, no login page, no PHP). This removes the most common attack routes.
- **No secrets in the site.** I scanned all code for keys, tokens and passwords and found none. The HubSpot portal and form IDs and the Cal.com username are *meant* to be public.
- **HTTPS everywhere.** No insecure `http://` links; Netlify adds the padlock certificate automatically.
- **Safe external links.** All links that open a new tab use `noopener`, so other sites can't control your page.
- **Fonts and icons are self-hosted.** Visitors aren't tracked by Google Fonts or icon CDNs.
- **Visitor text is handled safely.** Text from forms and web addresses is shown as plain text, never as code, so there's no cross-site scripting (XSS) risk.
- **Tiny attack surface.** No third-party libraries run on the page except HubSpot's own tracking script.

### Issues found
| # | Severity | Issue | Risk | Fix |
|---|---|---|---|---|
| S1 | 🔴 **High** | **No browser security headers** (no `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`) | Your pages could be framed by another site (click-jacking); browsers get no instructions to block injected scripts; security scanners will rate the site poorly | 🔧 Add a Netlify `_headers` file with a tested policy that still allows HubSpot, Cal.com and Google Maps |
| S2 | 🟠 **Medium** | **A crafted link can break the page's scripts.** A link like `/contact/?service="]` or a malformed `#…` makes the browser stop the site script on that page (booking, forms and tracking stop working for that visitor) | Someone could share a "broken" link to your contact page; no data is exposed | 🔧 Read link values safely (2-line fix) |
| S3 | 🟠 **Medium** | **No spam protection on forms or bookings.** Bots can submit the enquiry, waitlist and newsletter forms, and the booking calendar can be filled with fake calls | Junk contacts in HubSpot; fake bookings blocking your Thursday/Friday slots | 🔧 Add a hidden "honeypot" field and a minimum time-to-submit check; turn on HubSpot's spam filtering; in Cal.com, require email confirmation for bookings |
| S4 | 🟠 **Medium** | **HubSpot tracking cookies are set without a cookie notice** | Uganda's Data Protection and Privacy Act (and EU visitors' GDPR) expect people to be told about, or agree to, tracking cookies | Turn on HubSpot's free cookie consent banner (HubSpot → Settings → Privacy & Consent) |
| S5 | 🟡 Low | **Email isn't required on 3 HubSpot forms** (found during testing) | Empty or anonymous submissions get through | Make Email required again on Project inquiry, Discovery call and Waitlist |
| S6 | 🟡 Low | **No version history or backup** (the folder isn't in Git) | One mistake or disk failure could lose the site; no record of what changed | 🔧 Put the project in Git and a private GitHub repository (also enables automatic Netlify deploys) |
| S7 | ⚪ Info | The site's settings are written into each page as a small inline script | Forces a slightly looser security policy | 🔧 Move it into a data block so the strictest script policy can be used |
| S8 | ⚪ Info | The local preview server can crash on a malformed web address | Only affects your own computer, not visitors | 🔧 Ignore bad addresses safely |

---

## 2. Performance: 74%

| Finding | Impact | Fix |
|---|---|---|
| ✅ All 127 MB of original photos converted to WebP (now 11.4 MB in total), lazy loading below the fold, hero image preloaded, fonts self-hosted and preloaded | Good base | |
| ⚠️ **Icon library is 348 KB** and loads on every page, and icons only appear once it has loaded | Slower first view on mobile data; icons "pop in" | 🔧 Build icons into the pages at build time (saves about 340 KB per page) |
| ⚠️ **Phones download desktop-size images.** Hero images are up to 1920 px wide, e.g. Courses and Shop heroes are 647 KB each, Contact hero 413 KB | Slower on mobile data, which most Ugandan visitors use | 🔧 Create phone-size copies (about 800 px) and let the browser pick (`srcset`) |
| ⚠️ Largest first-view load: a blog article (about 700 KB of images) | | Same as above |
| ✅ CSS 72 KB, main script 29 KB, fonts 127 KB | Fine | |

## 3. SEO: 85%
- ✅ Search title and description on every page (one main phrase each, place names included), canonical links, `sitemap.xml` (17 pages), `robots.txt`, Open Graph previews.
- ✅ Google business data: LocalBusiness (address, hours, districts served, services), Breadcrumbs, Article, FAQ, and Event once events exist.
- ✅ Utility pages (thank-you, 404, maintenance) hidden from Google.
- ⚠️ **Only 3 blog posts.** The strategy calls for two a month, plus case studies.
- ⚠️ **No Hoima location page or individual service pages yet** (planned for days 61 to 90 of the strategy).
- ⚠️ **New favicon files are in the site root but not linked** (`favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`). Pages still point to the old `/assets/img/favicon.png`. 🔧 Link them so phones and Google use them.

## 4. Accessibility: 85%
- ✅ Skip-to-content link, visible keyboard focus, labelled form fields, error messages, ARIA on menus/tabs/calendar, honours "reduce motion", `lang="en-UG"`.
- ⚠️ **Small green labels ("eyebrows") are slightly too light.** Fern green on the off-white background is a 4.1 : 1 contrast ratio; 4.5 : 1 is the accessibility standard for small text. 🔧 Darken that one colour slightly.
- ⚪ The thank-you page holds three headings for its three variants, only one of which is ever visible (harmless, and the page is hidden from Google).

## 5. Mobile & usability: 90%
- ✅ Tested at 375 px: no sideways scrolling, mobile menu, one-tap call button, floating WhatsApp, 3-step booking works.
- ✅ Booking shows only real free Thursday/Friday slots; links pre-select the right service and jump to the form.
- ⚠️ Check that Cal.com's own hours also say Thursday/Friday 9 to 3, so Cal.com's reschedule emails and links offer the same times.

## 6. Content & conversion: 70%
- 🔴 **The placeholder phone number `+256 700 000 000` appears on all 21 pages** and in Google's business data. Calls and WhatsApp clicks currently go nowhere. **Must fix before launch.**
- ⚠️ Founder photo and name missing (About page). People buy from people.
- ⚠️ No testimonials, reviews or before/after project stories yet. These are strong trust builders.
- ✅ Clear calls to action on every page, free consultation offer, WhatsApp everywhere, HubSpot capturing every lead.

## 7. Code quality & launch readiness: 66%
- ✅ Simple build, one settings file, documented (README, HUBSPOT_SETUP, MAINTENANCE, CLAUDE.md), maintenance mode, 404 page, Netlify config.
- ⚠️ No version control/backup (see S6).
- ⚠️ Not deployed yet; domain not connected; Search Console not set up.
- ⚠️ Google Analytics ID not added (conversion tracking is built but inactive).

---

## Priority action list

**Before launch (must do)**
1. Real phone/WhatsApp number in `src/site.js` *(you)*
2. 🔧 Security headers (S1) and safe link handling (S2) *(Claude)*
3. 🔧 Form spam protection (S3) *(Claude)* + Email required on 3 HubSpot forms (S5) *(you)*
4. HubSpot cookie banner (S4) *(you, about 5 minutes)*
5. 🔧 Git backup (S6) *(Claude sets it up; you create a free GitHub account)*

**First month after launch**
6. 🔧 Lighter icons and phone-size images (performance)
7. 🔧 Link the new favicon set; darken the small green labels
8. Founder photo, first testimonials, Google Business Profile, Search Console + sitemap

**Ongoing**
9. Two blog posts a month, a case study per finished project, then the Hoima location page.
