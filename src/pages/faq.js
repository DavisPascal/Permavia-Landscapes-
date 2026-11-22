const { img, icon, waLink, waIcon, pageHero, ctaBand, site } = require('../components');


// Questions clients ask on calls. Answers are plain text so they can also feed Google's FAQ data.
const groups = [
  {
    title: 'Costs & quotes', icon: 'wallet',
    items: [
      ['How much does landscape design cost in Uganda?',
        'It depends on the size of the land, how much earthwork and planting is needed, and whether you want design only or design and build. Your first 30-minute call is free. After a site visit we send a clear written quote in Ugandan shillings (UGX), split into phases so you can start small and grow the project over time.'],
      ['Do you charge for the first consultation?',
        'No. The first 30-minute discovery call is a free Webex video call with no obligation. We email you the link; just have the free Webex app or a web browser ready. We confirm any cost for an on-site visit, such as travel to your site, before we book it.'],
      ['Can I pay in phases?',
        'Yes. Most projects are planned in phases timed with the rainy seasons, so you can spread the cost and see results before the next phase begins.'],
    ],
  },
  {
    title: 'Areas & site visits', icon: 'map-pin',
    items: [
      ['Which areas do you cover?',
        `We work across ${site.serviceArea}. We travel to project sites, and we can also design remotely using maps, photos and video calls.`],
      ['How does a site visit work?',
        'We walk the land with you and look at slopes, soil, water flow, sun, wind and existing plants, and talk through your goals and budget. Afterwards you receive written recommendations and a quote for the next steps.'],
      ['Do you work with small plots and home compounds?',
        'Yes. We design everything from small home compounds and kitchen gardens to large farms, resorts and institutions. A small, well-designed compound can produce food, shade and water savings all year.'],
    ],
  },
  {
    title: 'Projects & methods', icon: 'sprout',
    items: [
      ['How long does a project take?',
        'Small home gardens can often be designed and planted within a few weeks. Farms and large sites are usually phased over one or more seasons, with planting timed for the rains so young trees establish well.'],
      ['Do you use chemicals or synthetic fertilisers?',
        'Nature-based methods come first: compost, mulch, cover crops, nitrogen-fixing trees and natural pest balance. Regeneration is a process, though. On large or badly degraded land we may use machinery, and limited, targeted inputs where needed (for example to control invasive weeds or help first plantings establish), because doing that work by hand would take years. Each one has an exit plan and is phased out as the land starts to regenerate itself. <a href="/about-us/#transition">How we transition land</a>.'],
      ['Can you supply tree seedlings?',
        'Yes. Our Million Trees nursery grows fruit, indigenous, timber, medicinal and nitrogen-fixing seedlings for farms, schools, NGOs and restoration projects. Ask us for a price list.'],
      ['Do you work with NGOs, schools and carbon projects?',
        'Yes. We design restoration and agroforestry sites, supply seedlings, train field teams and community members, and support planting and monitoring for carbon and restoration programmes.'],
    ],
  },
  {
    title: 'Training & contact', icon: 'graduation-cap',
    items: [
      ['Do you offer permaculture training or courses?',
        'Yes. We run hands-on workshops and team trainings, and we are building a 72-hour Permaculture Design Certificate and online courses through Permavia Academy. Join the course waitlist to hear about dates first.'],
      ['How quickly will you reply?',
        'We aim to reply on WhatsApp within an hour during working hours (Monday to Saturday, 8am to 6pm) and to answer form enquiries the same working day.'],
    ],
  },
];

const linkify = (t) => t
  .replace('Million Trees nursery', '<a href="/million-trees/">Million Trees nursery</a>')
  .replace('Permavia Academy', '<a href="/permavia-academy/">Permavia Academy</a>')
  .replace('free 30-minute discovery call', '<a href="/contact/#book">free 30-minute discovery call</a>');

const body = `
${pageHero({
  eyebrow: 'Frequently Asked Questions',
  title: 'Regenerative Design &amp; Permaculture <em>Questions</em>, Answered',
  lead: 'Costs, areas we cover, site visits, timelines and methods: straight answers to what clients ask us most.',
  image: img('01-home__07-inspiration__tile-3-soil-life'),
  crumbs: [['FAQ']],
  size: 'is-short',
})}
<section class="section">
  <div class="container faq-grid">
    <div class="faq-main">
      ${groups.map((g) => `
      <div class="faq-group" data-reveal>
        <h2>${icon(g.icon)} ${g.title}</h2>
        ${g.items.map(([q, a], i) => `
        <details class="faq-item"${i === 0 ? ' open' : ''}>
          <summary>${q}<span class="faq-ic">${icon('plus')}</span></summary>
          <div class="faq-a"><p>${linkify(a)}</p></div>
        </details>`).join('')}
      </div>`).join('')}
    </div>
    <aside class="faq-side" data-reveal style="--d:.1s">
      <div class="side-card">
        <h3>Still have a question?</h3>
        <p>Ask us directly. We usually reply on WhatsApp within an hour during working hours.</p>
        <div class="cta-actions" style="margin-top:18px">
          <a class="btn btn--wa" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Ask on WhatsApp</a>
          <a class="btn btn--primary" href="/contact/#book">${icon('calendar-days')} Book a Free Call</a>
        </div>
      </div>
      <div class="areas-card">
        <h3>${icon('map')} Areas we serve</h3>
        <ul class="area-chips"><li class="is-wide">Across ${site.serviceArea}</li></ul>
      </div>
    </aside>
  </div>
</section>
${ctaBand()}
`;

module.exports = {
  path: '/faq/',
  active: '',
  title: 'FAQ',
  description: 'Answers about regenerative design and permaculture costs, areas covered, site visits and methods.',
  schema: {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: groups.flatMap((g) => g.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))),
  },
  body,
};
