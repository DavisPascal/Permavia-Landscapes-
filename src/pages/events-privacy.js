const { img, icon, pageHero, sectionHead, signupForm, ctaBand, site } = require('../components');
const { events: ALL } = require('../data');
const { eventCard, eventWhen, h } = require('../cards');

// Events are edited in Decap CMS (/admin → Events) and stored in content/events/*.md.
// Upcoming = not marked "completed" and not yet ended when the site was built. The page also hides
// events that end after the last build (see main.js), so the list never shows a past event.
const today = new Date().toISOString().slice(0, 10);
const upcoming = ALL.filter((e) => e.status !== 'completed' && e.endDate >= today);
const past = ALL.filter((e) => !upcoming.includes(e)).reverse();
const abs = (p) => (site.url && p && p.startsWith('/') ? site.url.replace(/\/$/, '') + p : p);

const emptyState = (hidden) => `
  <div class="event-empty" data-reveal data-events-empty${hidden ? ' hidden' : ''}>
    <div class="media"><img src="${img('05-permavia-farm__04-cards__card-1-farm-tours')}" alt="Smiling farmers in a green field during a farm visit" loading="lazy"></div>
    <div class="body">
      <p class="eyebrow">Upcoming Events</p>
      <h2>New Dates Are Being <em>Planned</em></h2>
      <p>There are no events scheduled right now. Join the events list and we'll tell you first when the next workshop, farm tour or training opens for registration.</p>
      <div class="cal-ghost" aria-hidden="true">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<span class="h">${d}</span>`).join('')}${Array.from({ length: 14 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
      ${signupForm({ id: 'wl-events', kind: 'waitlist', button: 'Notify Me', source: 'Events', compact: true })}
    </div>
  </div>`;

const eventList = `
    ${upcoming.length ? `<div class="grid grid-3 event-grid" data-stagger data-upcoming-list>${upcoming.map(eventCard).join('')}</div>` : ''}
    ${emptyState(upcoming.length > 0)}`;

const pastList = past.length ? `
<section class="section section--sage" aria-labelledby="past-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Past Events', title: 'Previous <em>Events</em>', id: 'past-title' })}
    <ul class="past-events">${past.map((e) => `<li><a href="/our-events/${e.slug}/"><strong>${h(e.title)}</strong><span>${eventWhen(e).date}${e.venue ? ` · ${h(e.venue)}` : ''}</span><span class="badge${e.status === 'cancelled' ? ' badge--gold' : ''}">${e.status === 'cancelled' ? 'Cancelled' : 'Completed'}</span></a></li>`).join('')}</ul>
  </div>
</section>` : '';

const eventSchema = (e) => ({
  '@context': 'https://schema.org', '@type': 'Event', name: e.title, description: e.excerpt,
  startDate: e.startDate + (e.startTime ? `T${e.startTime}:00+03:00` : ''),
  endDate: e.endDate + (e.endTime ? `T${e.endTime}:00+03:00` : ''),
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: e.status === 'cancelled' ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled',
  ...(e.venue ? { location: { '@type': 'Place', name: e.venue, address: e.venue } } : {}),
  ...(e.image ? { image: abs(e.image) } : {}),
  organizer: { '@type': 'Organization', name: site.name, url: site.url || undefined },
  ...(e.registration ? { offers: { '@type': 'Offer', url: e.registration, availability: 'https://schema.org/InStock', ...(e.price && /\d/.test(e.price) ? { price: String(e.price).replace(/[^0-9.]/g, ''), priceCurrency: 'UGX' } : {}) } } : {}),
  url: abs(`/our-events/${e.slug}/`),
});

const events = {
  path: '/our-events/', active: 'events', title: 'Events',
  schema: upcoming.map(eventSchema),
  description: 'Workshops, farm tours and trainings in regenerative design, water harvesting and food forests with Permavia Landscapes in Uganda.',
  body: `
${pageHero({
  eyebrow: 'Our Events',
  title: 'Workshops, Farm Tours &amp; <em>Trainings</em>',
  lead: 'Learn by doing. Join hands-on events where you dig swales, build compost and design food forests with our team and a community of growers.',
  image: img('01-home__07-inspiration__tile-5-community-development'),
  crumbs: [['Events']],
  size: 'is-short',
})}
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'What We Host', title: 'Ways to <em>Join Us</em>', text: 'Every event is practical, outdoors and grounded in real projects.' })}
    <div class="grid grid-3 event-types" data-stagger>
      <div class="feature-card"><span class="ic-soft">${icon('shovel')}</span><h3>Hands-On Workshops</h3><p>One- and two-day sessions on composting, water harvesting, food forests and soil.</p></div>
      <div class="feature-card"><span class="ic-soft">${icon('map')}</span><h3>Farm Tours</h3><p>Guided visits to regenerative sites to see systems working in the field.</p></div>
      <div class="feature-card"><span class="ic-soft">${icon('users')}</span><h3>Team Trainings</h3><p>Private trainings for NGOs, schools, companies and cooperatives.</p></div>
    </div>
    ${eventList}
    <div class="link-panel" data-reveal>
      <p><strong>Want a private training or tour for your group?</strong> We tailor events for teams of any size.</p>
      <a class="btn btn--secondary" href="/contact/?service=education#enquiry">Plan a Group Event ${icon('arrow-right')}</a>
    </div>
  </div>
</section>
${pastList}`,
};

// One page per event: /our-events/<slug>/
const eventPage = (e) => {
  const w = eventWhen(e);
  const isPast = !upcoming.includes(e);
  const statusLabel = e.status === 'cancelled' ? 'Cancelled' : isPast ? 'This event has ended' : 'Upcoming';
  const register = e.registration && !isPast && e.status !== 'cancelled'
    ? `<a class="btn btn--primary btn--lg" href="${h(e.registration)}" target="_blank" rel="noopener">Register ${icon('arrow-right')}</a>` : '';
  return {
    path: `/our-events/${e.slug}/`, active: 'events', title: e.title,
    // Google description: what, when, where, then the short description (trimmed to 160 characters).
    description: ((d) => (d.length > 160 ? d.slice(0, 157).replace(/\s+\S*$/, '') + '…' : d))(
      `${e.title}: ${e.status === 'cancelled' ? 'cancelled event' : 'an event by Permavia Landscapes'} on ${w.date}${e.venue ? ` at ${e.venue}` : ''}. ${e.excerpt || 'Hands-on learning in regenerative design and land management.'}`.replace(/\s+/g, ' ').trim()),
    ogImage: e.image || undefined, updated: e.startDate,
    schema: [eventSchema(e)],
    body: `
${pageHero({
  eyebrow: `Event · ${statusLabel}`,
  title: h(e.title),
  lead: `${w.date}${w.time ? ` · ${w.time}` : ''}${e.venue ? ` · ${h(e.venue)}` : ''}`,
  image: e.image || img('01-home__07-inspiration__tile-5-community-development'),
  crumbs: [['Events', '/our-events/'], [h(e.title)]],
  size: 'is-short',
  actions: register,
})}
<section class="section">
  <div class="container about-grid">
    <div class="copy" data-reveal>
      ${e.status === 'cancelled' ? `<p class="event-notice">${icon('circle-alert')} This event has been cancelled. <a href="/our-events/">See other events</a>.</p>` : isPast ? `<p class="event-notice">${icon('info')} This event has already taken place. <a href="/our-events/">See upcoming events</a>.</p>` : ''}
      <div class="prose prose--event">${e.body || `<p>${h(e.excerpt)}</p>`}</div>
    </div>
    <aside class="facts" data-reveal style="--d:.1s" aria-label="Event details">
      <h3>${icon('calendar-days')} Event Details</h3>
      <dl>
        <div><dt>Date</dt><dd>${w.date}</dd></div>
        ${w.time ? `<div><dt>Time</dt><dd>${w.time} (EAT)</dd></div>` : ''}
        ${e.venue ? `<div><dt>Venue</dt><dd>${h(e.venue)}</dd></div>` : ''}
        ${e.price ? `<div><dt>Price</dt><dd>${h(e.price)}</dd></div>` : ''}
        <div><dt>Status</dt><dd>${statusLabel}</dd></div>
      </dl>
      ${register ? `<div class="svc-actions" style="margin-top:20px">${register.replace('btn--lg', 'btn--block')}</div>` : ''}
    </aside>
  </div>
</section>
${ctaBand({ title: 'Want a Training for Your <em>Group?</em>', text: 'We run private workshops, field days and trainings for NGOs, schools, companies and community groups. Tell us what you need.' })}`,
  };
};

const updated = '12 November 2026';
const privacy = {
  path: '/privacy-policy/', active: '', title: 'Privacy Policy',
  description: 'How Permavia Landscapes collects, uses and protects your personal data under the Uganda Data Protection and Privacy Act, 2019.',
  body: `
${pageHero({ eyebrow: 'Legal', title: 'Privacy <em>Policy</em>', lead: 'How we collect, use and protect your personal information.', image: img('10-blog__01-header__background'), crumbs: [['Privacy Policy']], size: 'is-short' })}
<section class="section">
  <div class="container legal">
    <span class="updated">Last updated: ${updated}</span>
    <h2>Who we are</h2>
    <p>Permavia Landscapes ("we", "us") is a regenerative development company based in ${site.location}. We are responsible for the personal data collected through this website. We process personal data in line with the Uganda Data Protection and Privacy Act, 2019 and its Regulations.</p>
    <h2>What we collect</h2>
    <ul>
      <li><strong>Enquiry form:</strong> your name, phone number, email, location, land size, project type, service, budget range and message.</li>
      <li><strong>Waitlist and newsletter forms:</strong> your name, email, optional phone number and the course, product or event you are interested in.</li>
      <li><strong>WhatsApp, phone and email:</strong> the information you choose to share with us when you contact us directly.</li>
      <li><strong>Website usage:</strong> anonymous information such as pages visited, device type and approximate location, collected through Google Site Kit (Google Analytics).</li>
    </ul>
    <h2>How we use it</h2>
    <ul>
      <li>To reply to your enquiry and provide consultations, quotes and services you ask for.</li>
      <li>To tell you about courses, products and events you signed up to hear about.</li>
      <li>To improve our website and understand which content is useful.</li>
    </ul>
    <p>We never sell your personal data.</p>
    <h2>Services we use</h2>
    <ul>
      <li><strong>HubSpot</strong>: to manage enquiries and client relationships.</li>
      <li><strong>Mailchimp</strong>: to send newsletters and waitlist updates.</li>
      <li><strong>Google Site Kit / Google Analytics</strong>: to measure website traffic.</li>
      <li><strong>Google Maps</strong>: to show our location on the Contact page.</li>
    </ul>
    <p>These providers may store data outside Uganda. We only use providers that protect personal data to an adequate standard.</p>
    <h2>Cookies</h2>
    <p>Our website uses a small number of cookies for analytics, embedded maps and HubSpot. HubSpot's cookies (such as <em>hubspotutk</em>) recognise returning visitors so that a form you send is linked to your existing record with us. You can block or delete cookies in your browser settings at any time; the site will still work.</p>
    <h2>How long we keep data</h2>
    <p>We keep enquiry data for as long as needed to serve you and meet legal obligations, and newsletter data until you unsubscribe.</p>
    <h2>Your rights</h2>
    <p>You have the right to access the personal data we hold about you, to ask us to correct or delete it, to object to its use for marketing, and to withdraw consent at any time. Every email we send includes an unsubscribe link.</p>
    <h2>How to request access or deletion</h2>
    <p>Email <a href="mailto:${site.email}">${site.email}</a> or call <a href="tel:${site.phoneHref}">${site.phone}</a>. We will respond within the time required by law. If you are not satisfied, you may complain to the Personal Data Protection Office (PDPO) of Uganda.</p>
    <h2>Contact</h2>
    <p>Permavia Landscapes, ${site.location}<br>Email: <a href="mailto:${site.email}">${site.email}</a><br>Phone: ${site.phone}</p>
  </div>
</section>`,
};

module.exports = [events, ...ALL.map(eventPage), privacy];
