// Homepage, following the Brand & Website Direction sequence:
// Hero → What We Do → Our Approach → Our Projects → Who We Work With → Our Work in Practice → Insights & Learning → Final CTA.
const { img, icon, ctaBand, sectionHead } = require('../components');
const { projects, posts, services } = require('../data');
const { projectCard, postCard } = require('../cards');

// The five outcomes every part of the site should point back to.
const outcomes = [
  ['trees', 'Healthier ecosystems', 'and restored landscapes'],
  ['wheat', 'Productive farms', 'gardens and food systems'],
  ['trending-up', 'Stronger livelihoods', 'and real economic value'],
  ['users', 'Resilient communities', 'and inclusive development'],
  ['graduation-cap', 'Lasting skills', 'for long-term management'],
];

const approach = [
  ['search', 'Assess', 'We map slopes, soils, water, sun and how you use the land, and listen to your goals, before anything is designed.'],
  ['pen-tool', 'Design', 'A clear, buildable plan that works with natural processes and turns each problem on the site into a resource.'],
  ['shovel', 'Implement', 'Our field team builds it with you, from earthworks and soil to planting, with communities involved from the start.'],
  ['sprout', 'Manage', 'Scheduled care, monitoring and yearly reviews so the system keeps improving after installation.'],
  ['book-open', 'Build Knowledge', 'Training and handover so you, your team or the community can run it with confidence.'],
];

// Who We Work With: one tab per audience, each with its own message.
const audiences = [
  {
    id: 'home', label: 'Homeowners', icon: 'house', image: img('01-home__04-benefits__tab-1-home-living'),
    alt: 'Aerial view of a green, tree-filled residential landscape', title: 'Outdoor spaces designed for nature, comfort and long-term care',
    items: [
      ['Fresh food at your door', 'fruit, vegetables and herbs from your own compound.'],
      ['Lower water bills', 'roof catchment and swales store rain for the dry season.'],
      ['Cooler living spaces', 'trees shade walls and roofs and break hot winds.'],
      ['Less upkeep over time', 'mulch and perennials replace constant weeding and watering.'],
      ['Higher property value', 'mature, productive landscapes add lasting value.'],
    ],
    cta: ['Plan Your Compound', '/services/regenerative-design/'],
  },
  {
    id: 'farm', label: 'Farmers', icon: 'tractor', image: img('01-home__04-benefits__tab-2-farm-land'),
    alt: 'A young seedling growing from rich dark soil', title: 'Farm solutions for productivity, resilience and healthy soil',
    items: [
      ['Living soil', 'organic matter and soil life rise year after year.'],
      ['Trees that pay', 'fruit, timber, fodder, honey and seedlings from the same land.'],
      ['Lower input costs', 'a phased move away from bought fertiliser and chemicals.'],
      ['Drought resilience', 'water is slowed, spread and sunk into the land.'],
      ['Restored land', 'eroded and degraded ground brought back into production.'],
    ],
    cta: ['Explore Farm Solutions', '/services/farm-solutions/'],
  },
  {
    id: 'business', label: 'Businesses & Institutions', icon: 'building-2', image: img('01-home__04-benefits__tab-3-business'),
    alt: 'A lush food forest path with fruiting trees', title: 'Well-designed, well-managed landscapes with long-term value',
    items: [
      ['Memorable spaces', 'hotels, resorts, schools and campuses that stand out.'],
      ['Lower running costs', 'less irrigation, chemicals and replanting over time.'],
      ['A credible sustainability story', 'trees, water and biodiversity you can see and measure.'],
      ['Farm-to-table supply', 'fresh produce for kitchens, canteens and events.'],
      ['One accountable partner', 'design, installation and maintenance from one team.'],
    ],
    cta: ['See Our Services', '/services/'],
  },
  {
    id: 'partners', label: 'NGOs & Partners', icon: 'handshake', image: img('01-home__07-inspiration__tile-5-community-development'),
    alt: 'Community members working together on a planting project', title: 'A practical implementation partner for regenerative and community initiatives',
    items: [
      ['From plan to handover', 'assessment, planning, mobilisation, installation, establishment and handover.'],
      ['Communities as partners', 'local people shape the plan, do the work and learn to run it.'],
      ['Environment and livelihoods together', 'restoration that also creates food and income.'],
      ['Training built in', 'skills stay in the community after the project.'],
      ['Clear reporting', 'milestones, progress updates and honest results.'],
    ],
    cta: ['Discuss a Project', '/services/installation-community-projects/'],
  },
  {
    id: 'learners', label: 'Learners', icon: 'graduation-cap', image: img('01-home__05-services__card-3-education'),
    alt: 'A shaded food forest path used for training', title: 'Practical education in regenerative design and management',
    items: [
      ['Hands-on', 'workshops and field days where you dig, plant, map and design.'],
      ['Online and in the field', 'learn the theory anywhere, then practise it on the ground.'],
      ['Grounded in East Africa', 'local climates, species, soils and markets.'],
      ['For individuals and teams', 'farmers, students, practitioners, NGOs and companies.'],
      ['Skills you can use', 'every session ends with something you can apply.'],
    ],
    cta: ['Explore Education', '/services/education/'],
  },
];

const all = Object.values(projects);

const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-bg"><img src="${img('01-home__04-benefits__tab-1-home-living')}" alt="" fetchpriority="high"></div>
  <div class="hero-contour" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div>
      <p class="rotator"><span class="rotator-dot"></span>We <span class="rotator-words" data-rotator><span class="is-active">Design.</span><span>Build.</span><span>Regenerate.</span></span></p>
      <h1 id="hero-title">Regenerative Landscapes for <em>Homes, Farms</em> &amp; Businesses</h1>
      <p class="lead">Designing, building and managing landscapes that restore nature, improve productivity and create lasting value for people and communities across East Africa.</p>
      <div class="hero-actions">
        <a class="btn btn--primary btn--lg" href="/contact/">Book a Free Consultation ${icon('arrow-right')}</a>
        <a class="btn btn--ghost-light btn--lg" href="/projects/">Explore Our Projects</a>
      </div>
      <div class="hero-trust">
        <span>${icon('globe')} Serving East Africa</span>
        <span>${icon('leaf')} Organic, nature-based methods</span>
        <span>${icon('badge-check')} Free first consultation</span>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="ring"></div>
      <img src="/assets/img/hero-farmer.webp" alt="" width="760" height="894">
      <div class="float-badge b1"><span class="fb-ic">${icon('trees')}</span><span><strong>Millions</strong><small>of trees, our ambition</small></span></div>
      <div class="float-badge b2"><span class="fb-ic">${icon('trending-up')}</span><span><strong>Livelihoods</strong><small>food, timber &amp; income</small></span></div>
      <div class="float-badge b3"><span class="fb-ic">${icon('sprout')}</span><span><strong>Living soil</strong><small>rebuilt season by season</small></span></div>
      <div class="float-badge b4"><span class="fb-ic">${icon('bird')}</span><span><strong>Wildlife</strong><small>room for birds &amp; bees</small></span></div>
    </div>
  </div>
  <a class="scroll-cue" href="#what-we-do">Scroll</a>
</section>

<div class="stat-strip">
  <div class="container">
    <ul class="outcome-strip" data-reveal aria-label="What regeneration delivers">
      ${outcomes.map(([ic, a, b]) => `<li><span class="ic-soft">${icon(ic)}</span><span><strong>${a}</strong> ${b}</span></li>`).join('')}
    </ul>
  </div>
</div>

<section class="section" id="what-we-do" aria-labelledby="best-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'What We Do', title: 'From Your Vision to a <em>Living Landscape</em>', id: 'best-title', text: 'Permavia Landscapes applies regenerative principles to turn land into healthy, productive and resilient spaces. Five services help people and organisations put regeneration into practice.' })}
    <div class="svc-cards" data-stagger>
      ${services.map((s) => `
      <article class="card service-card">
        <a class="media" href="${s.path}" tabindex="-1" aria-hidden="true"><img src="${s.image}" alt="" loading="lazy"><span class="num">${s.num}</span></a>
        <div class="body">
          <span class="ic-badge">${icon(s.icon)}</span>
          <h3><a class="card-title-link" href="${s.path}">${s.title}</a></h3>
          <p>${s.purpose}</p>
          <a class="link-arrow" href="${s.path}">Learn more ${icon('arrow-right')}</a>
        </div>
      </article>`).join('')}
    </div>
    <div class="center-cta" data-reveal><a class="btn btn--secondary" href="/services/">View All Services ${icon('arrow-right')}</a></div>
  </div>
</section>

<section class="section section--deep how" aria-labelledby="how-title">
  <div class="how-bg"><img src="${img('01-home__03-how-we-work__background')}" alt="" loading="lazy"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Approach', title: 'Five Steps, One <em>Accountable Team</em>', id: 'how-title', text: 'The same approach whether it is a home garden, a farm or a community project. Guided by nature, ethics and science: care for the earth, care for people, fair share.' })}
    <ol class="steps steps--five" data-stagger>
      ${approach.map(([ic, t, d], i) => `<li class="step"><span class="step-num">0${i + 1}</span><span class="step-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
    <div class="steps-cta" data-reveal><a class="btn btn--primary btn--lg" href="/contact/">Book a Free Consultation ${icon('arrow-right')}</a></div>
  </div>
</section>

<section class="section" id="projects" aria-labelledby="projects-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Projects', title: 'What We Are <em>Building</em>', id: 'projects-title', text: 'Beyond client work, we are building three long-term initiatives: a tree nursery, a demonstration farm and a learning platform.' })}
    <div class="grid grid-3" data-stagger>
      ${all.map(projectCard).join('')}
    </div>
    <div class="center-cta" data-reveal><a class="btn btn--secondary" href="/projects/">Explore Our Projects ${icon('arrow-right')}</a></div>
  </div>
</section>

<section class="section section--sage" aria-labelledby="who-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Who We Work With', title: 'Regeneration for <em>Everyone</em> on the Land', id: 'who-title', text: 'Homeowners, farms, businesses, institutions, communities and development partners. Choose yours to see what we can do together.' })}
    <div class="tabs-wrap" data-tabs data-reveal>
      <div class="tabs-list" role="tablist" aria-label="Who we work with">
        ${audiences.map((b, i) => `<button class="tab-btn" role="tab" id="tab-${b.id}" aria-controls="panel-${b.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${icon(b.icon)} ${b.label}</button>`).join('')}
      </div>
      ${audiences.map((b, i) => `
      <div class="tab-panel" role="tabpanel" id="panel-${b.id}" aria-labelledby="tab-${b.id}"${i === 0 ? '' : ' hidden'}>
        <div class="tab-media"><img src="${b.image}" alt="${b.alt}" loading="lazy"><span class="badge badge--dark">${b.label}</span></div>
        <div>
          <h3>${b.title}</h3>
          <ul class="check-list">${b.items.map(([s, t]) => `<li><span class="ic-wrap">${icon('check')}</span><span><strong>${s}:</strong> ${t}</span></li>`).join('')}</ul>
          <a class="btn btn--secondary" href="${b.cta[1]}">${b.cta[0]} ${icon('arrow-right')}</a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="practice-title">
  <div class="container">
    <div class="practice" data-reveal>
      <div class="practice-copy">
        <p class="eyebrow">Our Work in Practice</p>
        <h2 id="practice-title">Just Getting Started, and <em>Honest About It</em></h2>
        <p>Permavia is a young company. We will not show you other people's projects or results we cannot back up. Here is exactly where our own work stands today.</p>
        <p>As our first client and community projects are completed, we will publish them here as case studies: the starting challenge, what we did, and verified results with dates and places.</p>
        <a class="btn btn--secondary" href="/projects/">Follow Our Progress ${icon('arrow-right')}</a>
      </div>
      <ul class="practice-list">
        ${all.map((p) => `<li><span class="badge ${p.badge}">${p.status.replace('Underway: ', 'Underway · ')}</span><a href="${p.path}"><strong>${p.name}</strong></a><span>${p.now}</span></li>`).join('')}
        <li class="is-empty"><span class="badge">Completed</span><strong>Client case studies</strong><span>Coming as our first projects are finished.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="section section--sage" aria-labelledby="journal-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: 'Insights & Learning', title: 'Learn, Visit, <em>Grow</em>', id: 'journal-title', center: false, text: 'Practical articles from our Regenerative Journal, plus events and training as they are announced.' })}
      <a class="btn btn--secondary" href="/blog/" data-reveal>View All Articles ${icon('arrow-right')}</a>
    </div>
    <div class="grid grid-3" data-stagger>${posts.slice(0, 3).map(postCard).join('')}</div>
    <div class="learn-links" data-reveal>
      <a href="/our-events/">${icon('calendar-days')}<span><strong>Events</strong> Workshops, field days and farm tours</span>${icon('arrow-right')}</a>
      <a href="/courses/">${icon('book-open')}<span><strong>Courses</strong> Permaculture courses and training</span>${icon('arrow-right')}</a>
      <a href="/permavia-academy/">${icon('graduation-cap')}<span><strong>Permavia Academy</strong> Our learning platform</span>${icon('arrow-right')}</a>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Have a Landscape, Farm or <em>Project</em> in Mind?',
  text: 'Tell us about your land or your regenerative development idea. We will walk you through what is possible, with no pressure and no jargon.',
  ticks: ['Tailored to your land', 'No commitment required', 'Organic, nature-based methods'],
  extra: `<a class="btn btn--ghost-light btn--lg" href="/contact/?service=installation#enquiry">Discuss a Project</a>`,
})}
`;

module.exports = {
  path: '/',
  active: 'home',
  title: 'Home',
  description: 'Permavia Landscapes designs, builds and manages regenerative landscapes for homes, farms, businesses and communities across East Africa. Book a free consultation.',
  ogImage: '/assets/img/01-home__04-benefits__tab-1-home-living.webp',
  body,
};
