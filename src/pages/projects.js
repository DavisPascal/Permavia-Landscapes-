// The three project pages share one template, filled three times.
const { img, icon, ctaBand, pageHero, sectionHead, stageMeter } = require('../components');
const { projects } = require('../data');

const P = {
  'million-trees': {
    summary: 'A community tree nursery propagating millions of trees to restore land, feed families and grow livelihoods across Africa.',
    hero: img('04-million-trees__01-hero__background'),
    band: img('01-home__07-inspiration__tile-1-forest-gardens'), bandCap: 'Forest gardens: what millions of trees can become',
    stats: [['Millions', 'Of trees to plant'], ['8', 'Plant categories'], ['100%', 'Organic'], ['Africa', 'All climates']],
    stageLabel: 'Establishing',
    aboutTitle: 'Growing the Trees <em>Africa Needs</em>',
    about: [
      'Million Trees is our community nursery in Western Uganda. We propagate fruit, indigenous, timber, medicinal and nitrogen-fixing trees from locally adapted seed and cuttings, so every seedling is ready for the conditions it will grow in.',
      'Our seedlings supply Permavia design projects, farmers moving to agroforestry, schools, NGOs and restoration programmes. Every tree is grown organically, without synthetic fertilisers or pesticides.',
      'The goal is simple and ambitious: millions of trees in the ground across East Africa, each one chosen for the right place and the right purpose.',
    ],
    facts: [['Location', 'Hoima City, Uganda'], ['Climates', 'Tropical, highland and semi-arid'], ['Inputs', '100% organic, locally sourced seed'], ['Goal', 'Millions of trees planted']],
    cardsTitle: 'What We <em>Grow</em>',
    cardsText: 'Eight plant categories, each chosen for food, income, soil health or restoration.',
    cards: [
      ['apple', 'Fruit Trees', 'Mango, avocado, jackfruit, citrus and more for food and income.'],
      ['tree-pine', 'Indigenous Trees', 'Native species that restore habitat and suit local conditions.'],
      ['axe', 'Timber & Woodlot', 'Fast-growing and hardwood species for timber, poles and fuel.'],
      ['heart-pulse', 'Medicinal Plants', 'Trees and shrubs valued in traditional and modern medicine.'],
      ['leafy-green', 'Herbs & Spices', 'Culinary and aromatic plants for kitchens and markets.'],
      ['wheat', 'Grasses & Groundcover', 'Fodder grasses and living mulch that protect bare soil.'],
      ['flower-2', 'Ornamentals', 'Beautiful flowering plants for homes, hotels and campuses.'],
      ['bean', 'Nitrogen Fixers', 'Leguminous trees that feed the soil and the plants around them.'],
    ],
    highlights: [
      ['Locally Propagated Stock', 'Seed and cuttings collected from healthy local trees, so seedlings are adapted from day one.', img('04-million-trees__05-highlights__highlight-1-locally-propagated-stock')],
      ['Community & Restoration Focus', 'We partner with farmers, schools and community groups to plant trees where they matter most.', img('01-home__07-inspiration__tile-6-carbon-projects')],
      ['A Living Seed Bank', 'Diverse mother trees preserve valuable local varieties for future generations.', img('04-million-trees__05-highlights__highlight-3-living-seed-bank')],
    ],
    cta: ['Order seedlings / request a price list', '/contact/?service=seedlings#enquiry'],
    ctaTitle: 'Plant With <em>Million Trees</em>',
  },
  'permavia-farm': {
    summary: 'A 5-acre living demonstration of regenerative farming, with food forests, water systems, farm-to-table dining and stays.',
    hero: img('05-permavia-farm__05-highlights__highlight-2-food-forest'),
    band: img('01-home__02-projects__card-2-permavia-farm'), bandCap: 'Mapping the farm zones from above',
    stats: [['5', 'Acres'], ['5+', 'Farm zones'], ['0', 'Synthetic inputs'], ['365', 'Days of harvest planned']],
    stageLabel: 'Planning',
    aboutTitle: 'A Farm You Can <em>Walk Through</em>',
    about: [
      'Permavia Farm will be our 5-acre living classroom and showcase. Every system we design for clients, from swales and ponds to food forests and animal systems, will be working here for visitors to see, touch and taste.',
      'The farm is planned in zones: intensive kitchen gardens near the centre, a multi-storey food forest, water harvesting earthworks, animal systems and a farm-to-table restaurant with simple, comfortable stays.',
      'It will host tours, workshops and trainings, and prove that regenerative farming can be both beautiful and profitable in East Africa.',
    ],
    facts: [['Location', 'Western Uganda'], ['Size', '5 acres, 5+ zones'], ['Inputs', 'Zero synthetic inputs'], ['Goal', 'A profitable living showcase']],
    cardsTitle: 'What We Will <em>Offer</em>',
    cardsText: 'Eight experiences in one regenerative landscape.',
    cards: [
      ['map', 'Farm Tours', 'Guided walks through every system on the farm.'],
      ['utensils', 'Farm-to-Table Restaurant', 'Meals cooked from what grows a few steps away.'],
      ['shovel', 'Working Gardens', 'Productive kitchen gardens and nursery beds.'],
      ['bed-double', 'Accommodation', 'Simple, comfortable eco-stays among the trees.'],
      ['droplets', 'Water Systems', 'Swales, ponds and roof catchment in action.'],
      ['calendar-days', 'Workshops & Events', 'Hands-on courses, field days and gatherings.'],
      ['flask-conical', 'Compost & Soil Labs', 'Compost, biofertiliser and soil testing demos.'],
      ['egg', 'Animal Systems', 'Poultry, bees and integrated livestock.'],
    ],
    highlights: [
      ['Water Harvesting Systems', 'Earthworks that catch every drop and keep the farm green through the dry season.', img('05-permavia-farm__05-highlights__highlight-1-water-harvesting')],
      ['Multi-Storey Food Forest', 'Layers of fruit, nut, timber and herb plants growing as one productive ecosystem.', img('01-home__04-benefits__tab-3-business')],
      ['Farm-to-Table Restaurant & Stays', 'Taste the results and stay overnight in the middle of a working regenerative farm.', img('05-permavia-farm__05-highlights__highlight-3-restaurant-stays')],
    ],
    cta: ['Join the visitor waitlist', '#waitlist'],
    ctaTitle: 'Be Among the First <em>Visitors</em>',
    waitlist: { title: 'Join the Visitor Waitlist', text: 'Be first to hear when tours, dining and stays open.', button: 'Join the Waitlist', interest: { label: 'Interested in', options: ['Farm tours', 'Restaurant', 'Accommodation', 'Workshops & events', 'All of the above'] } },
  },
  'permavia-academy': {
    summary: 'Practical training in regenerative design and land management, online for reach and on-farm for depth.',
    hero: img('06-permavia-academy__01-hero__background'),
    band: img('06-permavia-academy__05-highlights__highlight-2-online-on-farm'), bandCap: 'Learning in the field',
    stats: [['Online', '+ On-Farm'], ['Africa', 'All climates'], ['8+', 'Skill areas'], ['100%', 'Practical']],
    stageLabel: 'Curriculum Development',
    aboutTitle: 'Skills for the Next Generation of <em>Land Stewards</em>',
    about: [
      'Permavia Academy (permavia.edu) is our learning platform for people who want to regenerate land professionally: farmers, designers, NGO staff, carbon project teams and curious beginners.',
      'Courses combine online modules you can take anywhere with practical on-farm sessions where you dig, plant, map and design with your own hands.',
      'Every lesson is grounded in African conditions and taught by practitioners who do this work every day.',
    ],
    facts: [['Format', 'Online + on-farm'], ['Climates', 'All African climates'], ['Learners', 'Individuals, teams, NGOs'], ['Goal', 'Skills you can use immediately']],
    cardsTitle: 'What We Will <em>Teach</em>',
    cardsText: 'Eight core skill areas, from first principles to professional practice.',
    cards: [
      ['pen-tool', 'Landscape Design', 'Read a site and create a buildable regenerative design.'],
      ['satellite', 'Geomatics & Mapping', 'GPS, drone and GIS mapping for land planning.'],
      ['cloud-sun', 'Carbon Markets', 'How carbon projects work and how to take part credibly.'],
      ['layout-grid', 'Programme Design', 'Plan, fund and evaluate regenerative programmes.'],
      ['users', 'Leadership & Facilitation', 'Lead teams and run effective community trainings.'],
      ['trees', 'Food Forest & Agroforestry', 'Design and manage layered, productive tree systems.'],
      ['droplets', 'Water Harvesting', 'Swales, ponds, keyline and roof catchment, hands-on.'],
      ['sprout', 'Permaculture Design', 'Ethics, principles and the full design process.'],
    ],
    highlights: [
      ['Grounded in African Reality', 'Examples, species, climates and markets from the places our learners actually work.', img('06-permavia-academy__05-highlights__highlight-1-african-reality')],
      ['Online for Reach, On-Farm for Depth', 'Learn the theory anywhere, then master it with your hands on a working farm.', img('04-million-trees__04-cards__card-4-medicinal-plants')],
      ['Skills You Can Immediately Use', 'Every module ends with a practical task you can apply on your own land or project.', img('06-permavia-academy__05-highlights__highlight-3-usable-skills')],
    ],
    cta: ['Join the course waitlist', '#waitlist'],
    ctaTitle: 'Start Learning With <em>Permavia Academy</em>',
    waitlist: { title: 'Join the Course Waitlist', text: 'Get early access and founding-learner pricing when the first courses open.', button: 'Join the Waitlist', interest: { label: 'Skill area', options: ['Landscape Design', 'Geomatics & Mapping', 'Carbon Markets', 'Programme Design', 'Leadership & Facilitation', 'Food Forest & Agroforestry', 'Water Harvesting', 'Permaculture Design'] } },
  },
};

const { signupForm, inShort, faqSection, faqSchema, businessRef, site } = require('../components');

// ── Answer-engine content: a quotable summary + real questions per project (facts from this page only) ──
const pageUrl = (p) => (site.url ? site.url.replace(/\/$/, '') + p : p);
const AEO = {
  'million-trees': {
    short: 'Million Trees is Permavia Landscapes’ community tree nursery in Hoima City, Uganda. It grows organic, locally adapted seedlings in eight categories (fruit, indigenous, timber, medicinal, herbs and spices, grasses, ornamentals and nitrogen fixers) for farms, homes, schools, NGOs and restoration projects, with the goal of planting millions of trees across East Africa.',
    faqTitle: 'Questions About <em>Seedlings</em>',
    faqs: [
      ['Where can I buy tree seedlings in Hoima?',
        'From the Million Trees nursery run by Permavia Landscapes in Hoima City. <a href="/contact/?service=seedlings#enquiry">Request a price list</a> or message us on WhatsApp.'],
      ['What kinds of tree seedlings does Million Trees grow?',
        'Eight categories: fruit trees, indigenous trees, timber and woodlot trees, medicinal plants, herbs and spices, grasses and groundcover, ornamentals, and nitrogen-fixing trees.'],
      ['Are the seedlings organic?',
        'Yes. Every seedling is grown without synthetic fertilisers or pesticides, from seed and cuttings collected from healthy local trees, so it is adapted to local conditions from day one.'],
      ['Who can order seedlings?',
        'Farmers moving to agroforestry, homeowners, schools, NGOs, restoration and carbon projects, and Permavia’s own design clients.'],
      ['Can Permavia help plan where to plant the trees?',
        'Yes. Our <a href="/services/#farm">Farm Solutions</a> and <a href="/services/#design">Regenerative Design</a> services choose the right species for the right place on your land.'],
    ],
    schema: () => [{
      '@context': 'https://schema.org', '@type': 'Product',
      name: 'Tree seedlings: Million Trees nursery',
      description: 'Organic, locally propagated seedlings for farms, homes, schools, NGOs and restoration projects in Uganda and East Africa.',
      category: 'Tree seedlings',
      brand: { '@type': 'Brand', name: 'Permavia Landscapes' },
      additionalProperty: ['Fruit Trees', 'Indigenous Trees', 'Timber & Woodlot', 'Medicinal Plants', 'Herbs & Spices', 'Grasses & Groundcover', 'Ornamentals', 'Nitrogen Fixers']
        .map((v) => ({ '@type': 'PropertyValue', name: 'Seedling category', value: v })),
      url: pageUrl('/million-trees/'),
      manufacturer: businessRef(),
    }],
  },
  'permavia-farm': {
    short: 'Permavia Farm is a planned 5-acre regenerative demonstration farm in Western Uganda, run by Permavia Landscapes. It will show water harvesting, a multi-storey food forest, working gardens and animal systems with zero synthetic inputs, and will offer farm tours, workshops, a farm-to-table restaurant and simple eco-stays. It is currently in the planning stage (stage 2 of 5).',
    faqTitle: 'Questions About <em>Permavia Farm</em>',
    faqs: [
      ['Can I visit Permavia Farm?',
        'Not yet. The farm is in the planning stage (stage 2 of 5). <a href="#waitlist">Join the visitor waitlist</a> to hear first when tours, dining and stays open.'],
      ['What will visitors be able to do at the farm?',
        'Take guided farm tours, join workshops and field days, eat at a farm-to-table restaurant, stay overnight in simple eco-stays, and see water systems, compost and soil labs, working gardens and animal systems in action.'],
      ['How big is Permavia Farm?',
        'Five acres, planned in five or more zones: kitchen gardens, a food forest, water-harvesting earthworks, animal systems, and the restaurant and stays.'],
      ['Does the farm use chemical fertilisers or pesticides?',
        'No. Permavia Farm is designed to run on zero synthetic inputs.'],
    ],
    schema: () => [],
  },
  'permavia-academy': {
    short: 'Permavia Academy is Permavia Landscapes’ training programme in regenerative design and land management for Africa. It will combine online lessons with hands-on, on-farm sessions across eight skill areas, from landscape design and water harvesting to carbon markets and leadership. Courses are in development; learners can join the waitlist for early access.',
    faqTitle: 'Questions About <em>Permavia Academy</em>',
    faqs: [
      ['What will Permavia Academy teach?',
        'Eight skill areas: landscape design, geomatics and mapping, carbon markets, programme design, leadership and facilitation, food forests and agroforestry, water harvesting, and permaculture design.'],
      ['Are the courses online or in person?',
        'Both. Theory is taught online so you can learn from anywhere, and practical skills are taught in person on a working farm.'],
      ['Who are the courses for?',
        'Farmers, landscape designers, NGO and carbon project staff, government and corporate teams, and anyone starting out in regenerative land management in Africa.'],
      ['When do courses start?',
        'The curriculum is in development (stage 2 of 5). <a href="#waitlist">Join the course waitlist</a> for early access and founding-learner pricing. Shorter workshops are listed on our <a href="/courses/">Courses</a> page.'],
    ],
    schema: () => [{
      '@context': 'https://schema.org', '@type': 'ItemList',
      name: 'Permavia Academy skill areas',
      itemListElement: ['Landscape Design', 'Geomatics & Mapping', 'Carbon Markets', 'Programme Design', 'Leadership & Facilitation', 'Food Forest & Agroforestry', 'Water Harvesting', 'Permaculture Design']
        .map((n, i) => ({
          '@type': 'ListItem', position: i + 1,
          item: {
            '@type': 'Course', name: `${n} (Permavia Academy)`,
            description: `${n} training for regenerative land management in Africa, taught online and on-farm by Permavia Academy.`,
            provider: businessRef(),
            hasCourseInstance: { '@type': 'CourseInstance', courseMode: ['online', 'onsite'], courseWorkload: 'Flexible' },
          },
        })),
    }],
  },
};

function page(key) {
  const meta = projects[key];
  const d = P[key];
  const others = Object.entries(projects).filter(([k]) => k !== key).map(([, v]) => v);
  const ctaExtra = `<a class="btn btn--ghost-light btn--lg" href="${d.cta[1]}">${d.cta[0]}</a>`;

  const body = `
${pageHero({
  eyebrow: `A Permavia Project: ${meta.type}`,
  title: meta.name,
  lead: d.summary,
  image: d.hero,
  crumbs: [['Projects', '/#projects'], [meta.name]],
  size: 'is-tall',
  extra: `<div class="stage-wrap">${stageMeter(meta.stage, 5, d.stageLabel)}</div>
  <div class="p-stats">${d.stats.map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>`,
})}

<figure class="image-band" style="margin:0">
  <img src="${d.band}" alt="${d.bandCap}" loading="lazy">
  <figcaption>${d.bandCap}</figcaption>
</figure>

<section class="section" aria-labelledby="about-title">
  <div class="container about-grid">
    <div class="copy" data-reveal>
      <p class="eyebrow">About the Project</p>
      <h2 id="about-title">${d.aboutTitle}</h2>
      ${inShort(AEO[key].short)}
      ${d.about.map((p) => `<p>${p}</p>`).join('')}
      <a class="btn btn--primary" href="${d.cta[1]}" style="margin-top:12px">${d.cta[0]} ${icon('arrow-right')}</a>
    </div>
    <aside class="facts" data-reveal style="--d:.1s" aria-label="Fact sheet">
      <h3>${icon('clipboard-list')} Fact Sheet</h3>
      <dl>
        ${d.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
        <div><dt>Stage</dt><dd>${d.stageLabel}${stageMeter(meta.stage)}</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="section section--sage" aria-labelledby="cards-title">
  <div class="container">
    ${sectionHead({ eyebrow: meta.name, title: d.cardsTitle, id: 'cards-title', text: d.cardsText })}
    <div class="grid grid-4" data-stagger>
      ${d.cards.map(([ic, t, s]) => `<div class="mini-card"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${s}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--deep" aria-labelledby="hl-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Highlights', title: 'What Makes It <em>Different</em>', id: 'hl-title' })}
    <div class="highlights" data-stagger>
      ${d.highlights.map(([t, s, im], i) => `
      <article class="highlight">
        <div class="media"><img src="${im}" alt="${t}" loading="lazy"></div>
        <div class="body"><span class="h-num">0${i + 1}</span><h3>${t}</h3><p>${s}</p></div>
      </article>`).join('')}
    </div>
  </div>
</section>

${d.waitlist ? `
<section class="section" id="waitlist" aria-labelledby="wl-title">
  <div class="container">
    <div class="signup-wrap">
      <div data-reveal>
        <p class="eyebrow">Coming Soon</p>
        <h2 id="wl-title">${d.waitlist.title}</h2>
        <p>${d.waitlist.text}</p>
      </div>
      <div class="signup-box" data-reveal style="--d:.1s">
        ${signupForm({ id: `wl-${key}`, kind: 'waitlist', button: d.waitlist.button, interest: d.waitlist.interest, source: meta.name })}
      </div>
    </div>
  </div>
</section>` : ''}

${faqSection({ eyebrow: 'Questions', title: AEO[key].faqTitle, items: AEO[key].faqs, id: 'project-faq', sage: true })}

<section class="section" aria-labelledby="other-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Keep Exploring', title: 'Explore Our Other <em>Projects</em>', id: 'other-title' })}
    <div class="grid grid-2" data-stagger>
      ${others.map((o) => `
      <a class="card other-card" href="${o.path}">
        <div class="media"><img src="${o.card}" alt="${o.name}" loading="lazy"></div>
        <div class="body">
          <span class="badge ${o.badge}" style="align-self:flex-start;margin-bottom:14px">${o.status}</span>
          <h3>${o.name}</h3>
          <p>${o.short}</p>
          <span class="link-arrow">Explore ${icon('arrow-right')}</span>
        </div>
      </a>`).join('')}
    </div>
  </div>
</section>

${ctaBand({ title: d.ctaTitle, text: 'Questions about this project, partnerships or your own land? We would love to hear from you.', extra: ctaExtra })}
`;
  return {
    path: meta.path,
    active: '',
    title: meta.name,
    description: `${meta.name}: ${d.summary}`,
    ogImage: d.hero,
    schema: [...AEO[key].schema(), faqSchema(AEO[key].faqs)],
    body,
  };
}

module.exports = Object.keys(projects).map(page);
