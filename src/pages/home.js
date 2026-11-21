const { img, icon, ctaBand, sectionHead, site } = require('../components');
const { projects, posts } = require('../data');
const { projectCard, postCard } = require('../cards');

const benefits = [
  {
    id: 'home', label: 'Home & Living', icon: 'house', image: img('01-home__04-benefits__tab-1-home-living'),
    alt: 'Aerial view of a green, tree-filled residential landscape', title: 'A home landscape that gives back',
    items: [
      ['Fresh food at your door', 'fruit, vegetables and herbs from your own compound.'],
      ['Lower water bills', 'roof catchment and swales store rain for the dry season.'],
      ['Cooler living spaces', 'trees shade walls and roofs and break hot winds.'],
      ['Less maintenance', 'mulch and perennials replace constant weeding and watering.'],
      ['Healthier family', 'chemical-free food and a calm, green place to rest.'],
      ['Higher property value', 'mature, productive landscapes add lasting value.'],
    ],
  },
  {
    id: 'farm', label: 'Farm & Land', icon: 'tractor', image: img('01-home__04-benefits__tab-2-farm-land'),
    alt: 'A young seedling growing from rich dark soil', title: 'Farms that build fertility every season',
    items: [
      ['Improved, living soil', 'organic matter and soil life rise year after year.'],
      ['Restored land', 'eroded and degraded ground brought back into production.'],
      ['Increased income', 'fruit, timber, fodder, honey and seedlings from the same land, with lower input costs.'],
      ['Drought resilience', 'water is slowed, spread and sunk into the land.'],
      ['Coexistence with nature', 'farming that works with the ecosystem instead of against it.'],
      ['Wildlife protection', 'trees, hedgerows and water bring back birds, bees and wildlife that keep pests in balance.'],
      ['Carbon potential', 'trees and soils store carbon that can open new revenue.'],
    ],
  },
  {
    id: 'business', label: 'Business', icon: 'building-2', image: img('01-home__04-benefits__tab-3-business'),
    alt: 'A lush food forest path with fruiting trees', title: 'Green spaces with a real sustainability story',
    items: [
      ['Memorable guest experience', 'resorts and hotels stand out with living, edible landscapes.'],
      ['Lower running costs', 'less irrigation, chemicals and replanting over time.'],
      ['Credible ESG impact', 'measurable gains in trees, water and biodiversity.'],
      ['Farm-to-table supply', 'fresh produce for kitchens, canteens and events.'],
      ['Healthier workplaces', 'shaded, green campuses improve wellbeing and focus.'],
      ['Community goodwill', 'training and local sourcing build strong relationships.'],
    ],
  },
];

const possibilities = [
  ['trees', 'Food Forests', 'Layered, self-sustaining gardens that feed you for generations.'],
  ['droplets', 'Water Harvesting', 'Swales, ponds and roof catchment that store rain in the land.'],
  ['sprout', 'Soil Restoration', 'Compost, mulch and soil biology that bring tired land back to life.'],
  ['house', 'Regenerative Home Design', 'Productive compounds that cool, feed and protect your home.'],
  ['tree-deciduous', 'Agroforestry', 'Trees, crops and animals working together on one farm.'],
  ['users', 'Community Development', 'Training and shared projects that lift whole communities.'],
  ['cloud-sun', 'Carbon Projects Support', 'Design, planting and monitoring for credible carbon projects.'],
  ['recycle', 'Waste to Resource', 'Turning organic waste and by-products into compost, mulch and energy.'],
];

const themes = [
  ['01-home__07-inspiration__tile-1-forest-gardens', 'Forest Gardens', 'Read about food forests', '/blog/?category=Food%20Forests', 'is-wide is-tall'],
  ['01-home__07-inspiration__tile-2-water-systems', 'Water Systems', 'Read about water', '/blog/?category=Water', ''],
  ['01-home__07-inspiration__tile-3-soil-life', 'Soil Life', 'Read about soil', '/blog/?category=Soil', ''],
  ['01-home__07-inspiration__tile-4-agroforestry', 'Agroforestry', 'Read about agroforestry', '/blog/?category=Agroforestry', ''],
  ['01-home__07-inspiration__tile-5-community-development', 'Community Development', 'Read about community', '/blog/?category=Community', ''],
  ['01-home__07-inspiration__tile-6-carbon-projects', 'Carbon Projects', 'Read about carbon', '/blog/?category=Carbon', 'is-wide'],
];

const homeServices = [
  { icon: 'pen-tool', num: '01', title: 'Design', image: img('01-home__05-services__card-1-design'), alt: 'Aerial view of a regenerative landscape design in progress',
    text: 'Regenerative landscape and farm design: site assessment, water plans and planting layouts tailored to your land.',
    tags: ['Site Assessment', 'Water Design', 'Food Forests'], href: '/services/#design' },
  { icon: 'shovel', num: '02', title: 'Implementation', image: img('01-home__05-services__card-2-implementation'), alt: 'A spade turning rich, dark soil',
    text: 'Implementation and site development by our own crews, from earthworks and soil preparation to planting.',
    tags: ['Earthworks', 'Planting', 'Irrigation'], href: '/services/#installation' },
  { icon: 'graduation-cap', num: '03', title: 'Education', image: img('01-home__05-services__card-3-education'), alt: 'A shaded food forest path used for training',
    text: 'Educating stewards of regeneration through hands-on workshops, courses and team training.',
    tags: ['Workshops', 'Courses', 'Team Training'], href: '/services/#education' },
];

const body = `
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-bg"><img src="${img('01-home__04-benefits__tab-1-home-living')}" alt="" fetchpriority="high"></div>
  <div class="hero-contour" aria-hidden="true"></div>
  <div class="container hero-grid">
    <div>
      <p class="rotator"><span class="rotator-dot"></span>We <span class="rotator-words" data-rotator><span class="is-active">Design</span><span>Build</span><span>Maintain</span><span>Educate</span></span></p>
      <h1 id="hero-title">Regenerative Landscapes for <em>Homes, Farms</em> &amp; Businesses</h1>
      <p class="lead">Harnessing cutting-edge permaculture principles to design, build and care for landscapes that restore degraded land, rebuild living soils, raise incomes and let people and wildlife thrive together across East Africa.</p>
      <div class="hero-actions">
        <a class="btn btn--primary btn--lg" href="/contact/">Get a Free Consultation ${icon('arrow-right')}</a>
        <a class="btn btn--ghost-light btn--lg" href="#projects">Explore Our Projects</a>
      </div>
      <div class="hero-trust">
        <span>${icon('globe')} Serving East Africa</span>
        <span>${icon('leaf')} Eco-friendly methods only</span>
        <span>${icon('badge-check')} Free first consultation</span>
      </div>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="ring"></div>
      <img src="/assets/img/hero-farmer.webp" alt="" width="760" height="894">
      <div class="float-badge b1"><span class="fb-ic">${icon('trees')}</span><span><strong>Millions</strong><small>of trees to plant</small></span></div>
      <div class="float-badge b2"><span class="fb-ic">${icon('trending-up')}</span><span><strong>More income</strong><small>fruit, timber &amp; seedlings</small></span></div>
      <div class="float-badge b3"><span class="fb-ic">${icon('sprout')}</span><span><strong>Living soil</strong><small>restored, fertile land</small></span></div>
      <div class="float-badge b4"><span class="fb-ic">${icon('bird')}</span><span><strong>Wildlife</strong><small>protected &amp; returning</small></span></div>
    </div>
  </div>
  <a class="scroll-cue" href="#projects">Scroll</a>
</section>

<div class="stat-strip">
  <div class="container">
    <div class="stat-strip-inner" data-reveal>
      <div class="stat"><div class="stat-num">Millions</div><div class="stat-label">Of trees to plant through Million Trees</div></div>
      <div class="stat"><div class="stat-num"><span data-count="5">5</span></div><div class="stat-label">Acre regenerative demo farm</div></div>
      <div class="stat"><div class="stat-num"><span data-count="5">5</span></div><div class="stat-label">Core services, one partner</div></div>
      <div class="stat"><div class="stat-num"><span data-count="100">100</span><sup>%</sup></div><div class="stat-label">Organic, nature-based methods</div></div>
    </div>
  </div>
</div>

<section class="section" id="projects" aria-labelledby="projects-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Projects', title: 'Explore Our <em>Projects</em>', id: 'projects-title', text: 'Beyond client work, we are building three projects on the ground: a tree nursery, a living demonstration farm and an academy for the next generation of land stewards.' })}
    <div class="grid grid-3" data-stagger>
      ${Object.values(projects).map(projectCard).join('')}
    </div>
  </div>
</section>

<section class="section section--deep how" aria-labelledby="how-title">
  <div class="how-bg"><img src="${img('01-home__03-how-we-work__background')}" alt="" loading="lazy"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'How We Work', title: 'Three Principles Behind <em>Every Project</em>', id: 'how-title', text: 'Our process is the same whether we are designing a home garden or a 500-acre farm.' })}
    <div class="steps" data-stagger>
      <article class="step">
        <span class="step-num">01</span>
        <div class="step-img"><img src="${img('01-home__03-how-we-work__step-01-data-driven-abundance')}" alt="A permaculture site plan showing swales, zones and planting" loading="lazy"></div>
        <h3>Data Driven Abundance</h3>
        <p>We map slopes, soils, rainfall and sun before we design anything, so every swale, tree and bed is placed for maximum yield.</p>
      </article>
      <article class="step">
        <span class="step-num">02</span>
        <div class="step-img is-line"><img src="${img('01-home__03-how-we-work__step-02-nature-ethics-science')}" alt="Line drawing of natural patterns used in permaculture design" loading="lazy"></div>
        <h3>Guided by Nature, Ethics &amp; Science</h3>
        <p>We copy the patterns of healthy ecosystems and back them with sound science: care for the earth, care for people, fair share.</p>
      </article>
      <article class="step">
        <span class="step-num">03</span>
        <div class="step-img is-line"><img src="${img('01-home__03-how-we-work__step-03-sticking-to-principles')}" alt="The three permaculture ethics: earth care, people care and fair share" loading="lazy"></div>
        <h3>Sticking to the Principles</h3>
        <p>No shortcuts and no synthetic inputs. We hold to proven permaculture principles so results keep improving long after we leave.</p>
      </article>
    </div>
    <div class="steps-cta" data-reveal><a class="btn btn--primary btn--lg" href="/contact/">Start Your Journey ${icon('arrow-right')}</a></div>
  </div>
</section>

<section class="section section--sage" aria-labelledby="benefits-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why It Matters', title: 'Benefits of <em>Regenerative</em> Design', id: 'benefits-title', text: 'Choose your situation to see what a regenerative landscape can do for you.' })}
    <div class="tabs-wrap" data-tabs data-reveal>
      <div class="tabs-list" role="tablist" aria-label="Benefits by audience">
        ${benefits.map((b, i) => `<button class="tab-btn" role="tab" id="tab-${b.id}" aria-controls="panel-${b.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${icon(b.icon)} ${b.label}</button>`).join('')}
      </div>
      ${benefits.map((b, i) => `
      <div class="tab-panel" role="tabpanel" id="panel-${b.id}" aria-labelledby="tab-${b.id}"${i === 0 ? '' : ' hidden'}>
        <div class="tab-media"><img src="${b.image}" alt="${b.alt}" loading="lazy"><span class="badge badge--dark">${b.label}</span></div>
        <div>
          <h3>${b.title}</h3>
          <ul class="check-list">${b.items.map(([s, t]) => `<li><span class="ic-wrap">${icon('check')}</span><span><strong>${s}:</strong> ${t}</span></li>`).join('')}</ul>
          <a class="btn btn--secondary" href="/contact/">Let's Start a Conversation ${icon('arrow-right')}</a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="best-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Services', title: 'What We Do <em>Best</em>', id: 'best-title', text: 'One partner from the first site walk to a thriving, self-sustaining landscape.' })}
    <div class="grid grid-3" data-stagger>
      ${homeServices.map((s) => `
      <article class="card service-card">
        <div class="media"><img src="${s.image}" alt="${s.alt}" loading="lazy"><span class="num">${s.num}</span></div>
        <div class="body">
          <span class="ic-badge">${icon(s.icon)}</span>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
          <div class="tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
          <a class="link-arrow" href="${s.href}">Learn more ${icon('arrow-right')}</a>
        </div>
      </article>`).join('')}
    </div>
    <div class="center-cta" data-reveal><a class="btn btn--secondary" href="/services/">View All Services ${icon('arrow-right')}</a></div>
  </div>
</section>

<section class="section section--white" aria-labelledby="done-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Possibilities', title: 'What Can Be Done on <em>Your Land</em>', id: 'done-title', text: 'Every site is different. These are the systems we combine to suit yours.' })}
    <div class="grid grid-4" data-stagger>
      ${possibilities.map(([ic, t, d]) => `<div class="poss"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section" aria-labelledby="themes-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'What Inspires You', title: 'Explore Ideas by <em>Theme</em>', id: 'themes-title', text: 'Pick a theme to read practical guides from our Regenerative Journal.' })}
    <div class="tiles" data-stagger>
      ${themes.map(([im, t, d, h, cls]) => `
      <a class="tile ${cls}" href="${h}">
        <img src="${img(im)}" alt="" loading="lazy">
        <span class="tile-go">${icon('arrow-up-right')}</span>
        <div class="tile-body"><h3>${t}</h3><p>${d}</p></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section section--sage" aria-labelledby="journal-title">
  <div class="container">
    <div class="split-head">
      ${sectionHead({ eyebrow: 'The Regenerative Journal', title: 'Fresh From the <em>Journal</em>', id: 'journal-title', center: false })}
      <a class="btn btn--secondary" href="/blog/" data-reveal>View All Articles ${icon('arrow-right')}</a>
    </div>
    <div class="grid grid-3" data-stagger>${posts.slice(0, 3).map(postCard).join('')}</div>
  </div>
</section>

${ctaBand({
  title: 'Ready to Work With <em>Nature?</em>',
  text: 'Tell us about your land and your goals. We will walk you through what is possible, with no pressure and no jargon.',
  ticks: ['Tailored to your land', 'No commitment required', 'Eco-friendly methods only'],
})}
`;

module.exports = {
  path: '/',
  active: 'home',
  title: 'Home',
  description: 'Permavia Landscapes designs, builds, maintains and teaches regenerative landscapes for homes, farms and businesses across East Africa. Book a free consultation.',
  ogImage: '/assets/img/01-home__04-benefits__tab-1-home-living.webp',
  body,
};
