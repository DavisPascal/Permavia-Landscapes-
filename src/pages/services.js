// Services: an overview page (/services/) plus one page per service (/services/<slug>/), all filled from data.js.
const { img, icon, ctaBand, pageHero, sectionHead, inShort, faqSection, faqSchema, businessRef, waLink, waIcon, site } = require('../components');
const { services } = require('../data');

const areas = site.serviceAreas.join(', ');
const pageUrl = (p) => (site.url ? site.url.replace(/\/$/, '') + p : p);
const enquire = (s) => `/contact/?service=${s.key}#enquiry`;
const shortName = { design: 'Design', installation: 'Installation', farm: 'Farm Solutions', maintenance: 'Maintenance', education: 'Education' };

const serviceSchema = (s) => ({
  '@context': 'https://schema.org', '@type': 'Service',
  name: s.title, serviceType: s.title, description: `${s.purpose} ${s.desc}`,
  provider: businessRef(),
  areaServed: [...site.serviceAreas.map((a) => `${a}, Uganda`), 'East Africa'],
  audience: { '@type': 'Audience', audienceType: s.for },
  url: pageUrl(s.path),
});

// Systems we combine (moved here from the homepage).
const possibilities = [
  ['trees', 'Food Forests', 'Layered, self-sustaining gardens that feed you for generations.'],
  ['droplets', 'Water Harvesting', 'Swales, ponds and roof catchment that store rain in the land.'],
  ['sprout', 'Soil Restoration', 'Compost, mulch and soil biology that bring tired land back to life.'],
  ['house', 'Regenerative Home Design', 'Productive compounds that cool, feed and protect your home.'],
  ['tree-deciduous', 'Agroforestry', 'Trees, crops and animals working together on one farm.'],
  ['users', 'Community Development', 'Training and shared projects that strengthen whole communities.'],
  ['cloud-sun', 'Carbon Projects Support', 'Design, planting and monitoring for credible carbon projects.'],
  ['recycle', 'Waste to Resource', 'Turning organic waste and by-products into compost, mulch and energy.'],
];

// ── Overview page ─────────────────────────────────────────────
const faqs = [
  ['What does a regenerative landscape designer do?',
    'A regenerative landscape designer plans land so that it improves over time: catching and storing rainwater, rebuilding living soil, and combining trees, food plants and animals so they support each other. At Permavia we assess your site, produce a buildable design, and can install, maintain and train your team on it.'],
  ['Which service should I start with?',
    'Most people start with <a href="/services/regenerative-design/">Regenerative Design</a>, because a good plan saves money on everything that follows. If you are unsure, book a free 30-minute <a href="/contact/#book">discovery call on Webex</a> and we will recommend the right first step.'],
  ['Do you only design, or do you also build and look after the landscape?',
    'We do all of it: design, installation (earthworks, planting, water systems), farm solutions, maintenance (seasonal care and yearly reviews) and education (hands-on training). You can use one service or all of them as one accountable team.'],
  ['Which areas of Uganda do you work in?',
    `We are based in Hoima City and work regularly in ${areas}. For larger projects we travel across Uganda and East Africa, and we can design remotely using maps, photos and video calls.`],
  ['Can you help a farm move to agroforestry or regenerative farming?',
    'Yes. Our <a href="/services/farm-solutions/">Farm Solutions</a> service plans a phased move away from costly inputs, protecting your income while agroforestry, syntropic agroforestry, food forests or silvopasture rebuild soil fertility, all in line with permaculture.'],
  ['Do you work with NGOs, government and development partners?',
    'Yes. Our <a href="/services/installation-community-projects/">Installation of Regenerative &amp; Community Development Projects</a> service is built for this: we plan and deliver environmental and livelihood projects with communities as active partners, and train local people to manage them.'],
  ['Do you use chemicals or synthetic fertilisers?',
    'No. All our services use organic, nature-based methods only: compost, mulch, cover crops, nitrogen-fixing trees and natural pest balance.'],
];

const overviewBody = `
${pageHero({
  eyebrow: 'What We Offer',
  title: 'Five Ways We Help You <em>Regenerate</em>',
  lead: 'From the first site walk to a thriving, well-managed landscape, choose the service that fits where you are today.',
  image: img('03-services__02-service-01__landscape-design'),
  crumbs: [['Services']],
  size: 'is-tall',
  extra: `<nav class="jump-links" aria-label="Jump to a service">${services.map((s) => `<a href="#${s.key}"><span>${s.num}</span>${shortName[s.key]}</a>`).join('')}</nav>`,
})}

<section class="section">
  <div class="container">
    ${inShort('Permavia Landscapes offers five regenerative services to clients across Uganda and East Africa: <strong>regenerative design</strong>, <strong>installation of regenerative and community development projects</strong>, <strong>farm solutions</strong> such as agroforestry, syntropic agroforestry and food forests, <strong>maintenance</strong> and <strong>education for regenerative design and management</strong>. Every project uses organic, nature-based methods, and every client can start with a free 30-minute discovery call.')}
    ${services.map((s, i) => `
    <article class="svc${i % 2 ? ' is-flip' : ''}" id="${s.key}" aria-labelledby="svc-${s.key}">
      <a class="svc-media" href="${s.path}" data-reveal tabindex="-1" aria-hidden="true"><img src="${s.image}" alt="" loading="lazy"></a>
      <div data-reveal style="--d:.1s">
        <span class="svc-num" aria-hidden="true">${s.num}</span>
        <h2 id="svc-${s.key}"><a class="svc-title-link" href="${s.path}">${s.title}</a></h2>
        <p>${s.purpose}</p>
        <div class="tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="svc-for">${icon('users')}<div><strong>Ideal for:</strong> ${s.for}</div></div>
        <div class="svc-actions">
          <a class="btn btn--primary" href="${s.path}">Explore ${shortName[s.key]} ${icon('arrow-right')}</a>
          <a class="btn btn--secondary" href="${enquire(s)}">Enquire</a>
        </div>
      </div>
    </article>`).join('')}
  </div>
</section>

<section class="section section--white" aria-labelledby="done-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Possibilities', title: 'Systems We Combine on <em>Your Land</em>', id: 'done-title', text: 'Every site is different. These are the building blocks our services draw on.' })}
    <div class="grid grid-4" data-stagger>
      ${possibilities.map(([ic, t, d]) => `<div class="poss"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

${faqSection({ eyebrow: 'Questions', title: 'Questions About Our <em>Services</em>', items: faqs, id: 'services-faq', sage: true })}

<section class="section" aria-labelledby="unsure-title">
  <div class="container">
    <div class="reassure" data-reveal>
      <div>
        <p class="eyebrow">Still Deciding?</p>
        <h2 id="unsure-title">Not Sure Where to <em>Start?</em></h2>
        <p>That is completely normal. Start with a free conversation. Tell us about your land and goals, and we will recommend the right first step, even if it is something you can do yourself.</p>
      </div>
      <div class="hero-actions">
        <a class="btn btn--primary" href="/contact/">Book a Free Consultation ${icon('arrow-right')}</a>
        <a class="btn btn--secondary" href="/about-us/">About Permavia</a>
      </div>
    </div>
  </div>
</section>

${ctaBand({ title: "Let's Discuss Your <em>Project</em>" })}
`;

const overview = {
  path: '/services/',
  active: 'services',
  title: 'Services',
  description: 'Regenerative design, installation of regenerative and community projects, farm solutions, maintenance and education across East Africa.',
  schema: [...services.map(serviceSchema), faqSchema(faqs)],
  body: overviewBody,
};

// ── One page per service ──────────────────────────────────────
const miniGrid = (items, cols = 3) => `<div class="grid grid-${cols}" data-stagger>${items.map(([ic, t, d]) => `<div class="mini-card"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;
const checks = (list) => `<ul class="check-list">${list.map((x) => `<li><span class="ic-wrap">${icon('check')}</span><span>${x}</span></li>`).join('')}</ul>`;

// The part of each page that is specific to that service (what the brand brief asks each one to show).
const special = {
  design: (s) => `
<section class="section section--sage" aria-labelledby="problems-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why Design First', title: s.problemsTitle, id: 'problems-title', text: 'A design starts from the problems on your land and turns each one into a resource.' })}
    ${miniGrid(s.problems)}
  </div>
</section>`,

  installation: (s) => `
<section class="section section--deep how" aria-labelledby="journey-title">
  <div class="how-bg"><img src="${img('01-home__03-how-we-work__background')}" alt="" loading="lazy"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'How a Project Runs', title: 'The Implementation <em>Journey</em>', id: 'journey-title', text: 'Six stages from first visit to a landscape or project that you, or the community, can run.' })}
    <ol class="steps steps--journey" data-stagger>
      ${s.journey.map(([ic, t, d], i) => `<li class="step"><span class="step-num">0${i + 1}</span><span class="step-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>
<section class="section" aria-labelledby="partners-title">
  <div class="container">
    <div class="reassure" data-reveal>
      <div>
        <p class="eyebrow">Partners &amp; Communities</p>
        <h2 id="partners-title">Communities as <em>Partners</em></h2>
        <p>${s.partners}</p>
      </div>
      <div class="hero-actions">
        <a class="btn btn--primary" href="${enquire(s)}">Discuss a Project ${icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>`,

  farm: (s) => `
<section class="section section--sage" aria-labelledby="systems-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Regenerative Systems', title: 'Systems We Build on <em>Farms</em>', id: 'systems-title', text: 'All in line with permaculture. We choose and combine them to suit your land, climate and markets.' })}
    ${miniGrid(s.systems)}
  </div>
</section>
<section class="section" aria-labelledby="challenges-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Challenges & Solutions', title: s.challengesTitle, id: 'challenges-title' })}
    <div class="challenge-list" data-reveal>
      ${s.challenges.map(([c, r]) => `<div class="challenge"><p class="challenge-q">${icon('circle-alert')}<span>${c}</span></p><p class="challenge-a">${icon('arrow-right')}<span>${r}</span></p></div>`).join('')}
    </div>
  </div>
</section>
<section class="section section--sage" aria-labelledby="expect-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Working With Us', title: 'What to <em>Expect</em>', id: 'expect-title', text: 'Start with an assessment, then decide how far you want to go. Each step stands on its own.' })}
    <div class="grid grid-3" data-stagger>
      ${s.expect.map(([ic, t, d], i) => `<div class="feature-card"><span class="ic-soft">${icon(ic)}</span><h3>${i + 1}. ${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>`,

  maintenance: (s) => `
<section class="section section--sage" aria-labelledby="care-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Ongoing Care', title: 'Regeneration Does Not End at <em>Installation</em>', id: 'care-title', text: s.careNote })}
    ${miniGrid(s.care)}
  </div>
</section>`,

  education: (s) => `
<section class="section section--sage" aria-labelledby="formats-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Ways to Learn', title: 'Courses, Field Days &amp; <em>More</em>', id: 'formats-title', text: 'For individuals, farm teams and institutions.' })}
    ${miniGrid(s.formats)}
  </div>
</section>
<section class="section" aria-labelledby="outcomes-title">
  <div class="container about-grid">
    <div class="copy" data-reveal>
      <p class="eyebrow">Learning Outcomes</p>
      <h2 id="outcomes-title">What You Will Be <em>Able to Do</em></h2>
      ${checks(s.outcomes)}
    </div>
    <aside class="facts" data-reveal style="--d:.1s" aria-label="Permavia Academy">
      <h3>${icon('graduation-cap')} Permavia Academy</h3>
      <p>Our education work is organised through Permavia Academy, our learning platform for regenerative design and management. Trainers are Permavia's own designers and field staff. Courses are being developed now.</p>
      <div class="svc-actions">
        <a class="btn btn--primary" href="/permavia-academy/">Explore the Academy ${icon('arrow-right')}</a>
        <a class="btn btn--secondary" href="/courses/">See Courses</a>
        <a class="btn btn--secondary" href="/our-events/">Events</a>
      </div>
    </aside>
  </div>
</section>`,
};

// Keep section backgrounds alternating: pages whose special part ends on a white section get a sage FAQ.
const altBg = (s) => ['installation', 'education'].includes(s.key);

function detail(s) {
  const others = services.filter((o) => o.key !== s.key);
  const primary = s.ctaHref
    ? `<a class="btn btn--primary btn--lg" href="${s.ctaHref}">${s.cta} ${icon('arrow-right')}</a>`
    : `<a class="btn btn--primary btn--lg" href="${enquire(s)}">${s.cta} ${icon('arrow-right')}</a>`;
  const faq = [
    [`What does ${s.title} include?`, `${s.purpose} Typical work includes: ${s.activities ? s.activities.map((a) => a.charAt(0).toLowerCase() + a.slice(1)).join('; ') : s.tags.join(', ').toLowerCase()}.`],
    ['Who is it for?', `${s.for}. We work in ${areas} and across East Africa.`],
    ['How do I start?', `Book a free 30-minute <a href="/contact/#book">discovery call</a> or <a href="${enquire(s)}">send an enquiry</a>. We reply within one working day.`],
  ];
  const body = `
${pageHero({
  eyebrow: `Service ${s.num}`,
  title: s.title,
  lead: s.purpose,
  image: s.image,
  crumbs: [['Services', '/services/'], [shortName[s.key]]],
  actions: `${primary}<a class="btn btn--ghost-light btn--lg" href="/contact/#book">Book a Free Consultation</a>`,
})}

<section class="section" aria-labelledby="about-title">
  <div class="container about-grid">
    <div class="copy" data-reveal>
      <p class="eyebrow">About This Service</p>
      <h2 id="about-title">What It <em>Involves</em></h2>
      ${inShort(`<strong>${s.title}</strong> from Permavia Landscapes. ${s.purpose} Available in ${areas} and across East Africa, using organic, nature-based methods only.`)}
      <p>${s.desc}</p>
      ${s.activities ? `<h3 class="copy-h3">Typical Activities</h3>${checks(s.activities)}` : ''}
    </div>
    <aside class="facts" data-reveal style="--d:.1s" aria-label="At a glance">
      <h3>${icon('clipboard-list')} At a Glance</h3>
      <dl>
        <div><dt>Ideal for</dt><dd>${s.for}</dd></div>
        <div><dt>Where</dt><dd>${areas} and across East Africa</dd></div>
        <div><dt>Methods</dt><dd>Organic and nature-based only</dd></div>
        ${s.receive ? `<div><dt>You receive</dt><dd>${s.receive.join('<br>')}</dd></div>` : ''}
        <div><dt>First step</dt><dd>A free 30-minute discovery call</dd></div>
      </dl>
      <div class="svc-actions" style="margin-top:20px">
        <a class="btn btn--primary btn--block" href="${enquire(s)}">${s.ctaHref ? 'Ask About Training' : s.cta} ${icon('arrow-right')}</a>
        <a class="btn btn--wa btn--block" href="${waLink(`Hi Permavia, I'd like to ask about ${shortName[s.key]}. `)}" target="_blank" rel="noopener">${waIcon()} Ask on WhatsApp</a>
      </div>
    </aside>
  </div>
</section>

${special[s.key](s)}

${faqSection({ eyebrow: 'Questions', title: `Questions About <em>${shortName[s.key]}</em>`, items: faq, id: 'service-faq', sage: altBg(s) })}

<section class="section${altBg(s) ? '' : ' section--sage'}" aria-labelledby="other-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Keep Exploring', title: 'Our Other <em>Services</em>', id: 'other-title' })}
    <div class="grid grid-4" data-stagger>
      ${others.map((o) => `<a class="mini-card mini-card--link" href="${o.path}"><span class="ic-soft">${icon(o.icon)}</span><h3>${o.title}</h3><p>${o.short}</p><span class="link-arrow">Explore ${icon('arrow-right')}</span></a>`).join('')}
    </div>
  </div>
</section>

${ctaBand({ title: `Let's Discuss Your <em>Project</em>`, text: `Tell us about your land or project and what you hope it can become. Your first consultation is free, and we reply within one working day.` })}
`;
  return {
    path: s.path,
    active: 'services',
    title: s.title,
    description: s.purpose,
    ogImage: s.image,
    schema: [serviceSchema(s), faqSchema(faq)],
    body,
  };
}

module.exports = [overview, ...services.map(detail)];
