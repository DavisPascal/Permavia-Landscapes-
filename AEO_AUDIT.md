# Permavia Landscapes: AEO (Answer Engine Optimisation) audit

**Date:** 21 November 2026 · **Scope:** the 17 public pages, exactly as an AI crawler sees them (HTML only, no JavaScript)

**What AEO means:** whether AI assistants (ChatGPT, Google AI Overviews and Gemini, Perplexity, Copilot, voice assistants) can **find** your site, **understand** who you are, **trust** you, and **quote** you when someone asks things like *"Who designs food forests in Uganda?"*, *"How much does landscape design cost in Hoima?"* or *"Where can I buy fruit tree seedlings in Western Uganda?"*

## AEO score: **58 / 100** (readable, but not yet quotable or trusted)

| Area | Weight | Score | Summary |
|---|---|---|---|
| 🕷️ Crawler access & technical | 15% | **90%** | AI bots are allowed, all content is plain HTML, the site is fast, and a sitemap is ready |
| 🧩 Structured data & entity markup | 20% | **65%** | Strong business data, FAQ and article markup; missing Organization, WebSite, Person, Service and Course data, and links to other profiles |
| 💬 Answer-ready content | 25% | **55%** | The FAQ page is excellent; the rest has few question-style headings, no summaries, no FAQs on service or project pages, and few concrete facts |
| 🎓 Authority & trust (E-E-A-T) | 20% | **35%** | No named expert, credentials, testimonials, case studies, cited sources or outside mentions: **the biggest gap** |
| 📍 Entity consistency & local signals | 10% | **60%** | Name, Hoima location, service districts and map coordinates are consistent; **the phone number in AI-readable data is still the placeholder**; no Google Business Profile or social profiles linked |
| 🗞️ Freshness & topic coverage | 10% | **45%** | Only 3 blog posts (420–500 words each), and 4 thin pages under 220 words |

**Expected after the website fixes (part A): about 72/100. After the content and off-site work (parts B and C): 85+.**

---

## What's already working ✅
- **AI crawlers are welcome.** `robots.txt` allows everyone, including GPTBot, ClaudeBot, PerplexityBot and Google-Extended, and points to the sitemap.
- **Everything is readable without JavaScript.** It's a static site, so AI bots, which mostly don't run scripts, see the full text, including all three benefit tabs and FAQ answers.
- **Rich business data (LocalBusiness)** on Home, About, Contact and FAQ: name, description, Hoima address, map coordinates, opening hours, 6 districts plus East Africa, 8 areas of expertise and 5 services.
- **The FAQ page is the strongest AEO asset:** 12 real client questions with direct answers, marked up as `FAQPage`. This is exactly the format answer engines lift from.
- **Articles are marked up** (`BlogPosting`, with date and publisher), every inner page has breadcrumbs, and each page has a clear, place-specific title and description.

## Page-by-page snapshot (what AI sees)
| Page | Words | Structured data | Question headings | Concrete facts* |
|---|---|---|---|---|
| Home | 1,033 | LocalBusiness | 4 | 1 |
| About | 653 | LocalBusiness, Breadcrumb | 2 | 0 |
| Services | 509 | Breadcrumb | 1 | 0 |
| Million Trees | 453 | Breadcrumb | 2 | 1 |
| Permavia Farm | 477 | Breadcrumb | 2 | 3 |
| Permavia Academy | 485 | Breadcrumb | 2 | 0 |
| FAQ | 629 | LocalBusiness, FAQPage | 1 + 12 Q&As | 0 |
| Contact | 722 | LocalBusiness, Breadcrumb | 1 | many (times/slots) |
| Blog posts (×3) | 419–500 | BlogPosting | 1–2 | 0 |
| Courses / Shop / Events / Products | 81–211 | Breadcrumb | 0–1 | 0–2 |

\* Numbers an AI can quote: sizes, prices, timelines, counts.

---

## Issues and fixes

### A. Website fixes (I can do these)
| # | Priority | Fix | Why it matters for AI answers |
|---|---|---|---|
| A1 | 🔴 | **Real phone number** in `src/site.js` (needs your number) | AI assistants copy contact details from your business data; today they would show `+256 700 000 000` |
| A2 | 🔴 | **Add Organization + WebSite data** (logo, founding year, founder, `sameAs` links to your profiles) | Tells AI that "Permavia Landscapes", your Google profile, socials and directories are **one entity** |
| A3 | 🟠 | **Short answer-first summaries** ("In short: …", 2–3 sentences) at the top of Services, each project page and each blog post | AI engines quote the first clear, self-contained answer they find |
| A4 | 🟠 | **3–5 FAQs on each service and project page**, plus at the end of each blog post, with `FAQPage` markup | Each Q&A becomes a ready-made answer for a specific question, e.g. *"Where can I buy indigenous tree seedlings in Hoima?"* |
| A5 | 🟠 | **Service data** (`Service` / `OfferCatalog`) on Services, **Course** data on Courses and Academy, **Product/Offer** for seedlings | Lets AI answer "who offers…" and "where can I learn…" with your offers |
| A6 | 🟠 | **Question-style headings** where natural (e.g. "What does a regenerative landscape designer do?") | Matches how people phrase questions to AI |
| A7 | 🟡 | **`llms.txt`**: a plain-text summary of who you are, what you offer, where, and links to key pages | An emerging standard some AI tools read to understand a site quickly |
| A8 | 🟡 | **Named author** on articles (founder as `Person`, with role and credentials) once you share the details | AI weighs expertise and gives more credit to content by a named, qualified person |
| A9 | 🟡 | **"Last updated" dates** shown on articles and key pages | Freshness signal |

### B. Content (needs your input)
| # | Priority | What to provide | Why |
|---|---|---|---|
| B1 | 🔴 | **Founder/team:** name, photo, qualifications (e.g. PDC certified, years of experience), short bio | AI and Google strongly favour content backed by a named expert |
| B2 | 🔴 | **Concrete facts:** year founded, number of projects, trees planted so far, acres restored, districts worked in, typical timelines, "from UGX …" starting prices | AI answers are built from specific, quotable facts; vague claims are skipped |
| B3 | 🟠 | **2–3 case studies:** problem, what you built, results with numbers, client quote, photos | Proof that AI can cite: "Permavia restored 3 acres in Masindi…" |
| B4 | 🟠 | **Testimonials** with name, town and project type | Trust signals; also feeds review markup |
| B5 | 🟠 | **Longer, local how-to articles** (1,000–1,800 words), as in the SEO strategy: costs in UGX, best fruit trees for Western Uganda, swales vs ponds… | Answer engines cite in-depth, locally specific guides that global sites can't write |
| B6 | 🟡 | **Flesh out thin pages** (Products 81 words, Events 187, Shop 170, Courses 211) | Too little text for AI to understand or quote |

### C. Off-site signals (the biggest lever for AI trust)
| # | Priority | Action |
|---|---|---|
| C1 | 🔴 | **Google Business Profile** (Hoima, category "Landscape designer"), with the same name, phone and website. Gemini and AI Overviews draw heavily on it |
| C2 | 🔴 | **Reviews** on Google (aim for 25 in 6 months), mentioning service and town |
| C3 | 🟠 | **Social and directory profiles** with one handle (e.g. @permavialandscapes): Facebook, LinkedIn, YouTube, Instagram; Yellow Pages Uganda, Houzz, social enterprise directory. Then add them to `social` in `src/site.js` (feeds `sameAs`) |
| C4 | 🟠 | **Mentions in Ugandan media and partner sites** (Daily Monitor, New Vision, NGO partners). AI assistants rely on third-party sources to confirm who's credible |
| C5 | 🟡 | **Bing Places** (ChatGPT search and Copilot use Bing's data) and **Apple Business Connect** (Siri) |

---

## Recommended order
1. **This week:** A1 (phone), C1 (Google Business Profile), A7 + A2 + A3 + A4 + A5 (I can do these in one pass).
2. **This month:** B1 + B2 (founder details and real numbers, then A8), C3 (profiles), first case study (B3).
3. **Ongoing:** two in-depth local articles a month (B5), reviews (C2), media and partner mentions (C4).

**How to check progress:** ask ChatGPT, Gemini and Perplexity monthly: *"Who offers regenerative landscape design in Hoima, Uganda?"*, *"Where can I buy fruit tree seedlings in Western Uganda?"*, *"Permaculture courses in Uganda"*. Note whether Permavia appears and what it says.
