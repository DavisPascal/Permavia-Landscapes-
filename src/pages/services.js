const { img, icon, ctaBand, pageHero, inShort, faqSection, faqSchema, businessRef, site } = require('../components');
const { services } = require('../data');

const short = { design: 'Design', installation: 'Installation', farm: 'Farm Solutions', maintenance: 'Maintenance', education: 'Education' };
const areas = site.serviceAreas.join(', ');

// Questions people ask before choosing a service (also published as FAQPage data for AI assistants).
const faqs = [
  ['What does a regenerative landscape designer do?',
    'A regenerative landscape designer plans land so that it improves over time: catching and storing rainwater, rebuilding living soil, and combining trees, food plants and animals so they support each other. At Permavia we assess your site, produce a buildable design, and can install, maintain and train your team on it.'],
  ['Which service should I start with?',
    'Most clients start with <a href="/services/#design">Regenerative Design</a>, because a good plan saves money on everything that follows. If you are unsure, book a free 30-minute <a href="/contact/#book">discovery call on Webex</a> and we will recommend the right first step.'],
  ['Do you only design, or do you also build and look after the landscape?',
    'We do all four: design, build (earthworks, planting, irrigation), maintain (seasonal care and annual health checks) and educate (hands-on training). You can use one service or all of them as one accountable team.'],
  ['Which areas of Uganda do you work in?',
    `We are based in Hoima City and work regularly in ${areas}. For larger projects we travel across Uganda and East Africa, and we can design remotely using maps, photos and video calls.`],
  ['Can you help a farm move to agroforestry or regenerative farming?',
    'Yes. Our <a href="/services/#farm">Farm Solutions</a> service plans a phased move away from costly inputs, protecting your income while agroforestry, syntropic agroforestry, food forests or silvopasture rebuild soil fertility, all in line with permaculture.'],
  ['Do you use chemicals or synthetic fertilisers?',
    'No. All our services use organic, nature-based methods only: compost, mulch, cover crops, nitrogen-fixing trees and natural pest balance.'],
];

const body = `
${pageHero({
  eyebrow: 'What We Offer',
  title: 'Five Ways We Help You <em>Regenerate</em>',
  lead: 'From the first site walk to a thriving, self-sustaining landscape, choose the service that fits where you are today.',
  image: img('03-services__02-service-01__landscape-design'),
  crumbs: [['About Us', '/about-us/'], ['Services']],
  size: 'is-tall',
  extra: `<nav class="jump-links" aria-label="Jump to a service">${services.map((s) => `<a href="#${s.key}"><span>${s.num}</span>${short[s.key]}</a>`).join('')}</nav>`,
})}

<section class="section">
  <div class="container">
    ${inShort(`Permavia Landscapes offers five regenerative services to clients across Uganda and East Africa: <strong>regenerative design</strong>, <strong>installation of regenerative and community development projects</strong>, <strong>farm solutions</strong> such as agroforestry, syntropic agroforestry and food forests, <strong>maintenance</strong> and <strong>education for regenerative design and management</strong>. Every project uses organic, nature-based methods, and every client can start with a free 30-minute discovery call.`)}
    ${services.map((s, i) => `
    <article class="svc${i % 2 ? ' is-flip' : ''}" id="${s.key}" aria-labelledby="svc-${s.key}">
      <div class="svc-media" data-reveal><img src="${s.image}" alt="${s.title}" loading="lazy"></div>
      <div data-reveal style="--d:.1s">
        <span class="svc-num" aria-hidden="true">${s.num}</span>
        <h2 id="svc-${s.key}">${s.title}</h2>
        <p>${s.desc}</p>
        <div class="tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="svc-for">${icon('users')}<div><strong>Ideal for:</strong> ${s.for}</div></div>
        <div class="svc-actions">
          <a class="btn btn--primary" href="${s.ctaHref || `/contact/?service=${s.key}#enquiry`}">${s.cta} ${icon('arrow-right')}</a>
          ${s.ctaHref ? `<a class="btn btn--secondary" href="/contact/?service=${s.key}#enquiry">Ask about training</a>` : ''}
        </div>
      </div>
    </article>`).join('')}
  </div>
</section>

${faqSection({ eyebrow: 'Questions', title: 'Questions About Our <em>Services</em>', items: faqs, id: 'services-faq', sage: true })}

<section class="section" aria-labelledby="unsure-title">
  <div class="container">
    <div class="reassure" data-reveal>
      <div>
        <p class="eyebrow">Still Deciding?</p>
        <h2 id="unsure-title">Not Sure Where to <em>Start?</em></h2>
        <p>That is completely normal. Most of our clients start with a free conversation. Tell us about your land and goals, and we will recommend the right first step, even if it is something you can do yourself.</p>
      </div>
      <div class="hero-actions">
        <a class="btn btn--primary" href="/contact/">Get a Free Consultation ${icon('arrow-right')}</a>
        <a class="btn btn--secondary" href="/about-us/">About Permavia</a>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`;

const pageUrl = (hash) => (site.url ? `${site.url.replace(/\/$/, '')}/services/${hash}` : `/services/${hash}`);

module.exports = {
  path: '/services/',
  active: 'about',
  title: 'Services',
  description: 'Regenerative design, installation of regenerative and community projects, farm solutions, maintenance and education across East Africa.',
  schema: [
    // Each service as machine-readable data, so AI assistants can answer "who offers … in Uganda?"
    ...services.map((s) => ({
      '@context': 'https://schema.org', '@type': 'Service',
      name: s.title, serviceType: s.title, description: s.desc,
      provider: businessRef(),
      areaServed: [...site.serviceAreas.map((a) => `${a}, Uganda`), 'East Africa'],
      audience: { '@type': 'Audience', audienceType: s.for },
      url: pageUrl(`#${s.key}`),
    })),
    faqSchema(faqs),
  ],
  body,
};
