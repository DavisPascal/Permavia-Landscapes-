// ─────────────────────────────────────────────────────────────
//  Permavia Landscapes: site-wide settings.
//  Change a value here and run `npm run build`; every page updates.
// ─────────────────────────────────────────────────────────────
module.exports = {
  name: 'Permavia Landscapes',
  // Brand expression (Brand & Website Direction, Nov 2026) and the existing tagline.
  tagline: 'We Design. We Build. We Regenerate.',
  brandLine: 'Your Vision, Our Green Touch.',
  mission:
    'To design, implement and manage nature-positive landscapes and productive systems that restore ecosystems, strengthen livelihoods and create lasting value for communities.',
  vision:
    'An East Africa where land is healthy, productive and resilient, and where people have the skills to keep it that way.',

  // ── Maintenance mode ───────────────────────────────────────
  // on: true sends every visitor to the "We'll be back soon" page (temporary redirect, so
  // Google keeps your pages). You can also switch it on without editing this file:
  //   npm run build:maintenance   (maintenance ON)    npm run build   (normal site)
  // See MAINTENANCE.md for the full on/off steps on Netlify.
  maintenance: {
    on: false,
    headline: "We're Tending the Garden",
    message: "Our website is getting some care and will be back shortly. We're still working, so call, WhatsApp or email us and we'll reply as usual.",
    backBy: '', // optional, e.g. 'Monday 18 November, 9am EAT'
  },

  // Live domain, used for canonical links and social previews. Leave '' until known.
  url: 'https://www.permavialandscapes.com',

  // TODO (priority 1): replace these PLACEHOLDERS with the real details.
  phone: '+256 700 000 000',
  phoneHref: '+256700000000',
  whatsapp: '256700000000', // digits only, country code first, no "+"
  email: 'info@permavialandscapes.com',

  location: 'Hoima City, Uganda',
  hours: 'Mon to Sat, 8am to 6pm',

  // Districts we actually serve (shown on Contact, FAQ, footer and in Google's business data).
  // Keep this identical to the service area on the Google Business Profile.
  serviceAreas: ['Hoima', 'Masindi', 'Kikuube', 'Kagadi', 'Buliisa', 'Kampala'],
  geo: { lat: 1.4331, lng: 31.3527 }, // Hoima City

  // Google Analytics 4 measurement ID, e.g. 'G-XXXXXXXXXX'. Turns on visit and conversion
  // tracking (form sent, call booked, WhatsApp click, phone click). Leave '' until you have one.
  analytics: '',

  // Social profiles, all with one handle (e.g. @permavialandscapes). Full URLs.
  social: [],

  // ── HubSpot (recommended) ──────────────────────────────────
  // Fill in your Hub ID and the ID of each form (see HUBSPOT_SETUP.md).
  // Any form with an ID here is sent straight to HubSpot.
  hubspot: {
    portalId: '149777969', // Hub ID
    // HubSpot tracking code: links each form submission to the visitor's page views and
    // removes the "cookie needed to link form submissions" warning. Copy the src from
    // HubSpot → Settings → Tracking & Analytics → Tracking code if yours is different (e.g. js-eu1).
    tracking: 'https://js-eu1.hs-scripts.com/149777969.js',
    forms: {
      contact: '5d1ee29e-4e1d-4d93-8211-f14a245698ac',    // Website – Project Enquiry
      booking: '1c95a9cd-1743-40c3-91d1-020eee0aba9d',    // Website – Discovery Call
      waitlist: 'bbf17fba-0dca-4a88-a219-734311fd2c55',   // Website – Waitlist
      newsletter: '059b8817-c638-4972-8671-1ebfa5c46723', // Website – Newsletter
    },
    // Internal names HubSpot gave your custom properties (Settings → Properties).
    // If HubSpot named one differently, change only the right-hand side.
    properties: {
      land_location: 'land_location',
      project_type: 'project_type',
      service_interest: 'service_interest',
      land_size: 'land_size',
      budget_range: 'budget_range',
      wants_site_visit: 'wants_site_visit',
      call_method: 'preferred_call_method',
      project_goals: 'project_goals',
      media_link: 'media_link',
      preferred_call_time: 'preferred_call_time',
      course_interest: 'course_interest',
      shop_interest: 'shop_interest',
      farm_interest: 'farm_visit_interest',
      academy_interest: 'academy_skill_interest',
      events_updates: 'wants_event_updates',
    },
    // Dropdown / checkbox answers whose HubSpot "internal value" differs from the text on the website.
    // Format:  property: { 'Text on the website': 'internal value in HubSpot' }
    // Only list options that differ; anything not listed is sent as-is.
    // Find internal values in HubSpot → Settings → Properties → (property) → Field type → options.
    values: {
      service_interest: {
        // Website wording changed Nov 2026; HubSpot options kept as they were.
        'Regenerative Design': 'Regenerative landscape design',
        'Installation of Regenerative & Community Development Projects': 'Installation of regenerative projects',
        'Farm Solutions': 'Farm and regenerative soltuions', // HubSpot spelling, keep as-is
        'Maintenance': 'Landscape maintenance',
        'Education for Regenerative Design & Management': 'Education and training',
        'Seedlings / Million Trees price list': 'Seedlings',
        'Not sure yet': 'Not sure yet',
      },
      land_size: {
        // HubSpot has one "1 to 20 Acres" option. Add "1 to 5 acres" and "5 to 20 acres" in HubSpot
        // and delete these two lines to keep the finer split.
        '1 to 5 acres': '1 to 20 Acres',
        '5 to 20 acres': '1 to 20 Acres',
      },
      call_method: {
        'Video call (Webex)': 'Video (google meet/zoom)', // rename the HubSpot option to Webex later if you like
      },
      project_type: {
        'NGO / Community': 'NGO/Community',
      },
      budget_range: {
        'Over UGX 50 million': 'UGX 50 Million',
      },
      shop_interest: {
        'Native Seeds & Seedlings': 'Native seeds and seedlings',
        'Regenerative Tools': 'Regenerative tools',
        'Books & Design Guides': 'Books and Design Guides',
      },
      farm_interest: {
        'Accommodation': 'Accomodation', // HubSpot spelling, keep as-is
        'Workshops & events': 'Workshops and events',
        'All of the above': 'All the above',
      },
      academy_interest: {
        'Landscape Design': 'Landscape design',
        'Geomatics & Mapping': 'Geomatics and Mapping',
        'Leadership & Facilitation': 'Leadership and Facilitation',
        'Food Forest & Agroforestry': 'Food Forest and Agroforestry',
        'Permaculture Design': 'Permaculture design',
      },
    },
  },

  // Other form services (Formspree etc.), used only for forms without a HubSpot ID.
  // While both are empty, forms open the visitor's email app with the details filled in.
  forms: {
    contact: '',
    booking: '', // call bookings; falls back to the contact endpoint when empty
    waitlist: '',
    newsletter: '',
  },

  // Call booking calendar on the Contact page.
  // Leave '' to use the built-in calendar: visitors pick a preferred date and time
  // (East Africa Time) and your team confirms it by WhatsApp or email.
  // Or paste a live scheduling link to show your real availability, for example
  //   'https://meetings.hubspot.com/your-name'   (HubSpot Meetings, free)
  //   'https://calendly.com/your-name/30min'     (Calendly, free plan)
  //   'https://cal.com/permavia/discovery-call'  (Cal.com, free; connects to Namecheap Private Email via CalDAV)
  booking: 'https://cal.com/info-permavialandscapes.com/30min',
  // Your real call hours are set in Cal.com (Availability). The website shows exactly what Cal.com offers.
  // These two lines are only the BACKUP, used if Cal.com can't be reached; keep them matching Cal.com.
  // Start times of 30-minute calls, East Africa Time: Thursday and Friday, 9am to 3pm (last call starts 2:30pm).
  callSlots: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
              '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
  callDays: [4, 5], // Thursday and Friday (0 = Sunday)
};
