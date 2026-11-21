const { img, icon, ctaBand, pageHero } = require('../components');
const { services } = require('../data');

const short = { design: 'Design', installation: 'Installation', farm: 'Farm & Agroforestry', maintenance: 'Maintenance', education: 'Education' };

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

<section class="section section--sage" aria-labelledby="unsure-title">
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

module.exports = {
  path: '/services/',
  active: 'about',
  title: 'Services',
  description: 'Regenerative landscape design, installation, farm and agroforestry solutions, landscape maintenance and training across East Africa.',
  body,
};
