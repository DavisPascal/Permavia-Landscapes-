# HubSpot setup for the Permavia website

Do these three things in HubSpot, then send the IDs at the bottom so the website forms can be connected.

1. Create the **custom properties** (Part 1).
2. Create the **4 forms** (Part 2).
3. Turn on **notifications and thank-you emails** (Part 3).

---

## Part 1: Custom contact properties

Go to **Settings → Data Management → Properties → Contact properties → Create property**.
Group: create one called **Permavia website**.

**Internal names:** HubSpot creates these automatically from the label, and they can't be changed later. The column below shows what HubSpot should create. If any came out differently, keep them and update the matching line under `hubspot.properties` in `src/site.js` (or send the names to your developer).

**Important for dropdowns and checkboxes:** type each option exactly as written below, and leave its *internal value* the same as the label (HubSpot's default). The website sends this exact text.

| Label | Internal name | Field type | Options |
|---|---|---|---|
| Land location | `land_location` | Single-line text | |
| Project type | `project_type` | Dropdown select | Home · Farm · Business · NGO / Community |
| Service interest | `service_interest` | Dropdown select | Regenerative Landscape Design · Installation & Regenerative Projects · Farm & Agroforestry Solutions · Landscape Maintenance · Education & Training · Seedlings / Million Trees price list · Not sure yet |
| Land size | `land_size` | Dropdown select | Under 1/4 acre (compound or garden) · 1/4 to 1 acre · 1 to 5 acres · 5 to 20 acres · Over 20 acres |
| Budget range | `budget_range` | Dropdown select | Under UGX 2 million · UGX 2 to 10 million · UGX 10 to 50 million · Over UGX 50 million · Not sure yet |
| Wants site visit | `wants_site_visit` | Single checkbox | (Yes / No) |
| Preferred call method | `preferred_call_method` | Dropdown select | Phone call · WhatsApp call · Video (Google Meet / Zoom) |
| Project goals | `project_goals` | Multiple checkboxes | Restore soil · Harvest water · Plant trees · Grow food · Increase income · Protect wildlife · Cut costs · Training |
| Photos or map link | `media_link` | Single-line text | |
| Preferred call time | `preferred_call_time` | Single-line text | (filled in as e.g. "Friday, 13 November 2026, 9:00 AM EAT") |
| Course interest | `course_interest` | Dropdown select | Permaculture Design Certificate (72-hour PDC) · Weekend Workshops · Online Learning · Site-Specific Training |
| Shop interest | `shop_interest` | Dropdown select | Native Seeds & Seedlings · Regenerative Tools · Books & Design Guides · Digital Products |
| Farm visit interest | `farm_visit_interest` | Dropdown select | Farm tours · Restaurant · Accommodation · Workshops & events · All of the above |
| Academy skill interest | `academy_skill_interest` | Dropdown select | Landscape Design · Geomatics & Mapping · Carbon Markets · Programme Design · Leadership & Facilitation · Food Forest & Agroforestry · Water Harvesting · Permaculture Design |
| Wants event updates | `wants_event_updates` | Single checkbox | (Yes / No) |

**Built-in properties also used (don't create these):** First name (`firstname`), Last name (`lastname`), Email (`email`), Phone number (`phone`), Message (`message`).

The website collects one "Full name" box; it is split into first and last name automatically when sent to HubSpot.

---

## Part 2: The 4 forms

Go to **Marketing → Forms → Create form → Embedded form → Blank template**.

In every form:
- Make **only Email required**. The website already checks the other fields, and extra "required" rules in HubSpot can make submissions fail.
- Add **every field listed**, even ones that look optional. A field that isn't on the HubSpot form can't be saved.
- Fields marked *hidden* can be set to hidden in HubSpot (the website fills them in).

### 1. Website – Project Enquiry (Contact page form)
First name · Last name · Email · Phone number · Land location · Project type · Service interest · Land size · Budget range · Message · Wants site visit

### 2. Website – Discovery Call (Contact page booking)
First name · Last name · Email · Phone number · Preferred call method · Project type · Land location · Land size · Project goals · Message · Photos or map link · Budget range · Preferred call time

### 3. Website – Waitlist (Courses, Shop, Permavia Farm, Permavia Academy, Events)
First name · Last name · Email · Phone number · Course interest · Shop interest · Farm visit interest · Academy skill interest · Wants event updates

One form serves all five waitlists. Each page fills in only its own interest field, so a person who joins several waitlists keeps every interest.

### 4. Website – Newsletter (Blog)
First name · Last name · Email

---

## Part 3: Notifications, emails and lists

- **Team alert:** in each form, **Options → Send submission notifications to** → your team email(s). This covers "send every enquiry to email and HubSpot".
- **Thank-you email to the visitor:** **Automation → Simple automation** on each form (or a workflow): a short email such as "Thanks, we'll reply on WhatsApp within an hour."
- **Waitlist segments** (HubSpot now calls lists *Segments*: **CRM → Segments → Create segment → Contacts → start from scratch**, keep it *Active* so it updates automatically):
  - Course waitlist: *Course interest is known*
  - Shop waitlist: *Shop interest is known*
  - Farm visitors: *Farm visit interest is known*
  - Academy waitlist: *Academy skill interest is known*
  - Events list: *Wants event updates is Yes*
  - Newsletter: *Form submission → has filled out Website – Newsletter*
- **Newsletter consent:** if you email these people from HubSpot, set up a marketing subscription type (e.g. "Regenerative Journal") under **Settings → Marketing → Email → Subscriptions**.

---

## What to send back

Paste them into `hubspot` in `src/site.js`, or send them to your developer:

- **HubSpot account ID (Hub ID):** shown when you click your account name, top right.
- **Form ID for each of the 4 forms:** open the form; it's the long code in the browser address bar after `/editor/`, e.g. `app.hubspot.com/forms/12345678/editor/`**`a1b2c3d4-…`**`/edit`.

With those, the website forms are connected and tested end to end.

---

## Keeping dropdowns in sync (important)

HubSpot only saves a dropdown or checkbox answer if it exactly matches one of the property's options (its *internal name*). Some of your HubSpot options are worded differently from the website, so the website translates them. The translations live in `hubspot.values` in `src/site.js`.

If you **rename, add or remove an option** in HubSpot, or change an option on the website, update `hubspot.values` to match. Otherwise those answers show a red "wasn't passed to the Contact record" warning and don't save to the contact (they still appear in the notification email and the form's Submissions tab).

Two HubSpot spellings are used on purpose: **"Farm and regenerative soltuions"** and **"Accomodation"**. If you correct them in HubSpot, correct them in `src/site.js` too.

To check a value: open the property in HubSpot → **Copy option labels and internal names**.
