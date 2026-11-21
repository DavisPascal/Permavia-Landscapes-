const { img, icon, pageHero, sectionHead, signupForm, site } = require('../components');

// Upcoming events. Add one object per event and rebuild; the empty state shows while this is empty.
// { date: '2027-01-18', title: 'Food Forest Weekend', location: 'Hoima', price: 'UGX 150,000', register: 'https://...' }
const EVENTS = [];

const eventList = EVENTS.length
  ? `<div class="grid grid-3" data-stagger>${EVENTS.map((e) => `
    <article class="card post-card"><div class="body">
      <div class="post-meta"><span>${icon('calendar')} ${new Date(e.date + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</span><span>${icon('map-pin')} ${e.location}</span></div>
      <h3>${e.title}</h3><p><strong>${e.price}</strong></p>
      <a class="btn btn--primary btn--sm" href="${e.register}">Register ${icon('arrow-right')}</a>
    </div></article>`).join('')}</div>`
  : `
  <div class="event-empty" data-reveal>
    <div class="media"><img src="${img('05-permavia-farm__04-cards__card-1-farm-tours')}" alt="Smiling farmers in a green field during a farm visit" loading="lazy"></div>
    <div class="body">
      <p class="eyebrow">Upcoming Events</p>
      <h2>New Dates Are Being <em>Planned</em></h2>
      <p>There are no events scheduled right now. Join the events list and we'll tell you first when the next workshop, farm tour or training opens for registration.</p>
      <div class="cal-ghost" aria-hidden="true">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d) => `<span class="h">${d}</span>`).join('')}${Array.from({ length: 14 }, (_, i) => `<span>${i + 1}</span>`).join('')}</div>
      ${signupForm({ id: 'wl-events', kind: 'waitlist', button: 'Notify Me', source: 'Events', compact: true })}
    </div>
  </div>`;

const events = {
  path: '/our-events/', active: 'events', title: 'Events',
  schema: EVENTS.map((e) => ({
    '@context': 'https://schema.org', '@type': 'Event', name: e.title, startDate: e.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode', eventStatus: 'https://schema.org/EventScheduled',
    location: { '@type': 'Place', name: e.location, address: { '@type': 'PostalAddress', addressLocality: e.location, addressCountry: 'UG' } },
    organizer: { '@type': 'Organization', name: 'Permavia Landscapes' },
    offers: { '@type': 'Offer', price: String(e.price).replace(/[^0-9.]/g, '') || '0', priceCurrency: 'UGX', url: e.register, availability: 'https://schema.org/InStock' },
  })),
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
</section>`,
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

module.exports = [events, privacy];
