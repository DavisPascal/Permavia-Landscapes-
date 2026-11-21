const { img, icon, ctaBand, pageHero, sectionHead } = require('../components');

const why = [
  ['award', 'Years of Hands-On Experience', 'Our team has designed and built landscapes and farms across Uganda, from small compounds to large estates.'],
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

const body = `
${pageHero({
  eyebrow: 'About Permavia',
  title: 'An East African Team Growing <em>Living Landscapes</em>',
  lead: 'Permavia Landscapes is a regenerative design and build company serving East Africa from our base in Hoima City, Uganda. We help homes, farms, businesses and communities turn land into thriving, productive ecosystems.',
  image: img('01-home__07-inspiration__tile-4-agroforestry'),
  crumbs: [['About Us']],
  actions: `<a class="btn btn--primary btn--lg" href="/contact/">Book a Free Consultation ${icon('arrow-right')}</a><a class="btn btn--ghost-light btn--lg" href="#what-we-do">What We Do</a>`,
})}

<section class="section mission" aria-label="Our mission">
  <div class="container" data-reveal>
    <blockquote>${icon('quote')}“We help people <mark>grow abundance</mark>, build climate-resilient spaces, and live in harmony with nature through Design, Build, Maintain and Educate.”</blockquote>
    <cite>Our Mission</cite>
  </div>
</section>

<section class="section section--sage" aria-labelledby="why-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Why Choose Us', title: "We Don't Just Design Landscapes. We Create <em>Living Systems.</em>", id: 'why-title' })}
    <div class="grid grid-3" data-stagger>
      ${why.map(([ic, t, d]) => `<div class="feature-card"><span class="ic-soft">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section" id="what-we-do" aria-labelledby="wwd-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'What We Do', title: 'What Can We Do <em>For You?</em>', id: 'wwd-title', text: 'Five ways we transform land, each designed around your site, your goals and your budget.' })}
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

<section class="section section--sage" aria-labelledby="team-title">
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
</section>

${ctaBand({ title: 'Ready to <em>Transform</em> Your Land?' })}
`;

module.exports = {
  path: '/about-us/',
  active: 'about',
  title: 'About Us',
  description: 'Meet Permavia Landscapes, an East African team from Hoima City, Uganda, designing water-holding, soil-building, food-producing landscapes for homes, farms and businesses.',
  body,
};
