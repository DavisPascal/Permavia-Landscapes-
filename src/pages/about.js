const { img, icon, ctaBand, pageHero, sectionHead, site } = require('../components');

const why = [
  ['shovel', 'Hands-On, From Day One', 'Our designers work on the ground, from the first site walk to planting, not just at a desk.'],
  ['leaf', 'Eco-Friendly Methods Only', 'No synthetic fertilisers or pesticides. We work with natural processes, never against them.'],
  ['brain', 'Holistic Design Thinking', 'Water, soil, plants, animals and people are designed as one connected system.'],
  ['map', 'Rooted in East Africa', 'We know local climates, soils and species, and we design for the realities of African land.'],
  ['handshake', 'One Partner, Start to Finish', 'Design, build, maintenance and training from one accountable team.'],
  ['chart-line', 'Built to Lower Your Costs', 'Systems designed to reduce water, input and maintenance costs over time.'],
];

const blocks = [
  {
    title: 'Design Landscapes that <em>Hold Water</em>', image: img('02-about-us__04-content-1__hold-water'), alt: 'Ducks on a water harvesting pond fringed with grasses',
    text: 'Water is the foundation of every living landscape. We design systems that catch the rain where it falls, slow it down and store it in ponds, tanks and, above all, in the soil itself.',
    list: ['Swales on contour that sink rain into the ground', 'Ponds and earth dams for animals, irrigation and fish', 'Infiltration basins that recharge groundwater', 'Roof catchment that turns every storm into stored water'],
  },
  {
    title: 'Restore Living Soils from the <em>Ground Up</em>', image: img('02-about-us__05-content-2__living-soils'), alt: 'A spade lifting dark, crumbly living soil',
    text: 'Healthy soil is alive. We rebuild it with compost, mulch, cover crops and deep-rooted plants, so fertility grows each season instead of washing away.',
    list: ['Compost and biofertilisers made on site', 'Mulching and cover cropping to protect bare ground', 'Soil biology set-up to feed roots naturally', 'Simple monitoring so you can see the change'],
  },
  {
    title: 'Create <em>Healthy</em> Landscapes', image: img('02-about-us__06-content-3__healthy-landscapes'), alt: 'Silhouettes of trees and people at sunset over open land',
    text: 'A healthy landscape works with wind and sun, shelters people and wildlife, and stays green through the dry season. We design spaces that feel good to be in and keep improving with time.',
    list: ['Windbreaks and shade trees placed for comfort', 'Native species that support birds and pollinators', 'Beautiful, low-maintenance planting', 'Designs that deliver only what your site truly needs'],
  },
  {
    title: 'Food Forests that Feed You for <em>Generations</em>', image: img('02-about-us__07-content-4__food-forests'), alt: 'A lush, layered food forest with fruiting trees',
    text: 'Food forests self-regulate once established. Layers of trees, shrubs, herbs and vines grow together as a resilient ecosystem that produces nutrient-dense food for decades with very little work.',
    list: ['Fruit, nut, timber and medicinal trees together', 'Seven layers from canopy to roots', 'Year-round harvests and natural pest balance', 'Designed for your climate and your table'],
  },
  {
    title: 'Guide Your Transition to <em>Regenerative Farming</em>', image: img('02-about-us__08-content-5__regenerative-farming'), alt: 'Rows of healthy vegetables growing between young trees',
    text: 'Moving away from chemical farming is a journey. We walk it with you step by step, protecting your income while the soil, water and biodiversity on your farm recover.',
    list: ['A phased plan that protects your cash flow', 'Agroforestry and silvopasture layouts', 'Training for you and your farm team', 'Our aim: reduced input and running costs over time'],
  },
];

const values = [
  ['globe', 'Earth Care', 'Every design has to leave the land healthier: more soil, more water held, more life.'],
  ['heart-handshake', 'People Care', 'Landscapes that feed, shelter and support the people who live and work on them.'],
  ['scale', 'Fair Share', 'Value is shared with communities, farmers and partners, not taken from them.'],
  ['badge-check', 'Honesty', 'We only claim what we can show, and we report progress as it really is.'],
  ['wrench', 'Practicality', 'Plans that work on real budgets, real soils and real seasons.'],
  ['users', 'Partnership', 'Communities and farmers are active partners, not just beneficiaries.'],
];

const approach = [
  ['search', 'Assess', 'Map the land and listen to the people who use it.'],
  ['pen-tool', 'Design', 'A buildable plan that works with natural processes.'],
  ['shovel', 'Implement', 'Build it with you and the community.'],
  ['sprout', 'Manage', 'Care, monitoring and reviews after installation.'],
  ['book-open', 'Build Knowledge', 'Training so the system lasts.'],
];

const body = `
${pageHero({
  eyebrow: 'About Permavia',
  title: 'A Regenerative Development Company Growing <em>Living Landscapes</em>',
  lead: 'Permavia Landscapes designs, implements and manages nature-positive landscapes and productive systems that restore ecosystems, strengthen livelihoods and create lasting value for communities. We are based in Hoima City, Uganda, serving East Africa.',
  image: img('01-home__07-inspiration__tile-4-agroforestry'),
  crumbs: [['About Us']],
  actions: `<a class="btn btn--primary btn--lg" href="/contact/">Book a Free Consultation ${icon('arrow-right')}</a><a class="btn btn--ghost-light btn--lg" href="#what-we-do">What We Do</a>`,
})}

<section class="section" aria-labelledby="story-title">
  <div class="container about-grid">
    <div class="copy" data-reveal>
      <p class="eyebrow">Our Story</p>
      <h2 id="story-title">More Than a <em>Landscaping</em> Company</h2>
      <p>Permavia Landscapes was started to show that land can be healthy, productive and beautiful at the same time. Too much land is losing soil, water and trees, while the people who depend on it pay more each year for less.</p>
      <p>We are not a lawn-care or purely ornamental garden business. We work where landscape design, regenerative agriculture, ecological restoration and community development meet: designing the system, building it, caring for it and teaching people to run it.</p>
      <p>We are a young company. Alongside client work we are building three long-term initiatives, <a href="/million-trees/">Million Trees</a>, <a href="/permavia-farm/">Permavia Farm</a> and <a href="/permavia-academy/">Permavia Academy</a>, and we share their progress openly on our <a href="/projects/">Projects</a> page.</p>
    </div>
    <aside class="facts" data-reveal style="--d:.1s" aria-label="Mission and vision">
      <h3>${icon('target')} Our Mission</h3>
      <p>${site.mission}</p>
      <h3 style="margin-top:22px">${icon('telescope')} Our Vision</h3>
      <p>${site.vision}</p>
      <p class="facts-tagline">${site.tagline}</p>
    </aside>
  </div>
</section>

<section class="section mission" aria-label="Our central promise">
  <div class="container" data-reveal>
    <blockquote>${icon('quote')}“We turn regenerative ideas into <mark>functioning landscapes</mark>, productive systems and lasting capabilities.”</blockquote>
    <cite>Our Promise</cite>
  </div>
</section>

<section class="section section--sage" aria-labelledby="values-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Values', title: 'What We <em>Stand For</em>', id: 'values-title', text: 'Rooted in the three ethics of permaculture, and in how we choose to run a business.' })}
    <div class="grid grid-3" data-stagger>
      ${values.map(([ic, t, d]) => `<div class="feature-card"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--deep how" id="approach" aria-labelledby="approach-title">
  <div class="how-bg"><img src="${img('01-home__03-how-we-work__background')}" alt="" loading="lazy"></div>
  <div class="container">
    ${sectionHead({ eyebrow: 'Our Approach', title: 'Assess, Design, Implement, Manage, <em>Teach</em>', id: 'approach-title', text: 'Every project follows the same five steps, so nothing is left half-done.' })}
    <ol class="steps steps--five" data-stagger>
      ${approach.map(([ic, t, d], i) => `<li class="step"><span class="step-num">0${i + 1}</span><span class="step-ic">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section" aria-labelledby="why-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why Choose Us', title: "We Don't Just Design Landscapes. We Create <em>Living Systems.</em>", id: 'why-title' })}
    <div class="grid grid-3" data-stagger>
      ${why.map(([ic, t, d]) => `<div class="feature-card"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section section--sage" id="what-we-do" aria-labelledby="wwd-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'What We Do', title: 'What Can We Do <em>For You?</em>', id: 'wwd-title', text: 'Five things we help land do, each designed around your site, your goals and your budget. See all <a href="/services/">five services</a>.' })}
    ${blocks.map((b, i) => `
    <div class="feature-row${i % 2 ? ' is-flip' : ''}">
      <div class="feature-media" data-reveal>
        <div class="frame"><img src="${b.image}" alt="${b.alt}" loading="lazy"></div>
        <span class="float-num">0${i + 1}</span>
      </div>
      <div class="feature-copy" data-reveal style="--d:.1s">
        <h2>${b.title}</h2>
        <p>${b.text}</p>
        <ul class="check-list">${b.list.map((x) => `<li><span class="ic-wrap">${icon('check')}</span><span>${x}</span></li>`).join('')}</ul>
      </div>
    </div>`).join('')}
  </div>
</section>

${site.showTeam ? `<section class="section" aria-labelledby="team-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'The People Behind Permavia', title: 'Meet the <em>Team</em>', id: 'team-title' })}
    <div class="team" data-reveal>
      <div class="team-photo">
        <!-- TODO: replace with founder photo, e.g. <img src="/assets/img/founder.webp" alt="Founder name, Founder of Permavia Landscapes"> -->
        <div class="placeholder">${icon('user-round')}Founder photo coming soon</div>
      </div>
      <div>
        <p class="eyebrow">Founder &amp; Lead Designer</p>
        <blockquote>“Every piece of land in Uganda can be more productive, more beautiful and more resilient than it is today. Our job is to show people how, and then build it with them.”</blockquote>
        <div class="who"><strong>Permavia Founder</strong><span>Founder &amp; Lead Regenerative Designer, Permavia Landscapes</span></div>
        <div class="hero-actions" style="margin-top:28px">
          <a class="btn btn--primary" href="/contact/">Talk to Our Team ${icon('arrow-right')}</a>
          <a class="btn btn--secondary" href="/services/">Our Services</a>
        </div>
      </div>
    </div>
  </div>
</section>` : ''}

${ctaBand({ title: 'Ready to <em>Transform</em> Your Land?' })}
`;

module.exports = {
  path: '/about-us/',
  active: 'about',
  title: 'About Us',
  description: 'Permavia Landscapes is a regenerative development company in Hoima City, Uganda: our story, mission, vision, values and approach.',
  body,
};
