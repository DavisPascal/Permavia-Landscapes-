// Courses, Shop and Products: "Coming Soon" pages that collect waitlist sign-ups.
const { img, icon, pageHero, sectionHead, signupForm, businessRef } = require('../components');

// Planned courses as machine-readable Course data (AI assistants answer "permaculture courses in Uganda" from this).
const courseData = [
  ['Permaculture Design Certificate (72-hour PDC)', 'The internationally recognised 72-hour Permaculture Design Certificate, adapted for African climates, soils and markets.', ['onsite'], 'PT72H'],
  ['Weekend Workshops', 'Focused, practical weekend workshops on composting, water harvesting, food forests and soil.', ['onsite'], 'P2D'],
  ['Online Learning', 'Self-paced video lessons and guides on regenerative land management, available from anywhere.', ['online'], null],
  ['Site-Specific Training', 'Hands-on training on Permavia Farm (once it opens) or on your own farm, built around your land, project and goals.', ['onsite'], null],
].map(([name, description, mode, workload]) => ({
  '@context': 'https://schema.org', '@type': 'Course', name, description,
  provider: businessRef(), inLanguage: 'en',
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: mode, location: 'Uganda', ...(workload ? { courseWorkload: workload } : {}) },
}));

const soon = '<p class="soon-pill"><i></i>Coming Soon</p>';

const courses = {
  path: '/courses/', active: 'products', title: 'Courses',
  schema: courseData,
  description: 'Permaculture courses and workshops from Permavia Landscapes: 72-hour PDC, weekend workshops, online learning and site-specific training. Join the waitlist.',
  body: `
${pageHero({
  title: 'Permaculture Courses &amp; <em>Workshops</em>',
  lead: 'Hands-on learning for farmers, homeowners and professionals, taught by practitioners in real East African landscapes. Join the waitlist to hear first when enrolment opens.',
  image: img('06-permavia-academy__05-highlights__highlight-2-online-on-farm'),
  crumbs: [['Products', '/products/'], ['Courses']],
  top: soon,
  actions: `<a class="btn btn--primary btn--lg" href="#waitlist">Join the Waitlist ${icon('arrow-right')}</a>`,
})}
<section class="section" aria-labelledby="building-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'In Development', title: 'What We Are <em>Building</em>', id: 'building-title', text: 'Four ways to learn, from a single weekend to full certification.' })}
    <div class="grid grid-4" data-stagger>
      <div class="card offer-card"><span class="ic-soft">${icon('award')}</span><span class="badge badge--gold">72 hours</span><h3>Permaculture Design Certificate</h3><p>The internationally recognised 72-hour PDC, adapted for African climates, soils and markets.</p></div>
      <div class="card offer-card"><span class="ic-soft">${icon('calendar-days')}</span><span class="badge">2 days</span><h3>Weekend Workshops</h3><p>Focused, practical weekends on composting, water harvesting, food forests and more.</p></div>
      <div class="card offer-card"><span class="ic-soft">${icon('monitor-play')}</span><span class="badge badge--fern">Self-paced</span><h3>Online Learning</h3><p>Video lessons and guides you can follow from anywhere, at your own pace.</p></div>
      <div class="card offer-card"><span class="ic-soft">${icon('map-pin')}</span><span class="badge">Our farm or yours</span><h3>Site-Specific Training</h3><p>Hands-on training on Permavia Farm (once it opens) or on your own farm, built around your land, project and goals.</p></div>
    </div>
    <div class="link-panel" data-reveal>
      <p><strong>Looking for professional training?</strong> Our in-depth skills programmes live at Permavia Academy.</p>
      <a class="btn btn--secondary" href="/permavia-academy/">Visit Permavia Academy ${icon('arrow-right')}</a>
    </div>
  </div>
</section>
<section class="section section--sage" id="waitlist" aria-labelledby="wl-title">
  <div class="container signup-wrap">
    <div data-reveal>
      <p class="eyebrow">Course Waitlist</p>
      <h2 id="wl-title">Be First to <em>Enrol</em></h2>
      <p>Waitlist members hear about dates first and get early-bird pricing on our first intake.</p>
      <ul class="check-list" style="margin-top:20px">
        <li><span class="ic-wrap">${icon('check')}</span><span>Early access to dates and seats</span></li>
        <li><span class="ic-wrap">${icon('check')}</span><span>Founding-learner pricing</span></li>
        <li><span class="ic-wrap">${icon('check')}</span><span>No spam, only course news</span></li>
      </ul>
    </div>
    <div class="signup-box" data-reveal style="--d:.1s">
      ${signupForm({ id: 'wl-courses', kind: 'waitlist', button: 'Join the Waitlist', source: 'Courses', interest: { label: 'Course of interest', options: ['Permaculture Design Certificate (72-hour PDC)', 'Weekend Workshops', 'Online Learning', 'Site-Specific Training'] } })}
    </div>
  </div>
</section>`,
};

const shop = {
  path: '/shop/', active: 'products', title: 'Shop',
  description: 'The Permavia Shop is coming soon: native seeds and seedlings, regenerative tools, books and design guides, and digital products. Get notified at launch.',
  body: `
${pageHero({
  title: 'The Permavia <em>Shop</em>',
  lead: 'Native seeds and seedlings, quality tools and practical guides for regenerating your land, all chosen and tested by our team. Get notified the day we open.',
  image: img('01-home__07-inspiration__tile-3-soil-life'),
  crumbs: [['Products', '/products/'], ['Shop']],
  top: soon,
  actions: `<a class="btn btn--primary btn--lg" href="#waitlist">Get Notified ${icon('bell')}</a>`,
})}
<section class="section" aria-labelledby="inshop-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Launching Soon', title: 'What Will Be in the <em>Shop</em>', id: 'inshop-title', text: 'Everything you need to start regenerating, sourced locally wherever possible.' })}
    <div class="grid grid-4" data-stagger>
      <div class="card offer-card"><span class="ic-soft">${icon('sprout')}</span><h3>Native Seeds &amp; Seedlings</h3><p>Fruit, indigenous and nitrogen-fixing trees from our Million Trees nursery.</p></div>
      <div class="card offer-card"><span class="ic-soft">${icon('shovel')}</span><h3>Regenerative Tools</h3><p>Durable tools for digging swales, composting and planting.</p></div>
      <div class="card offer-card"><span class="ic-soft">${icon('book-open')}</span><h3>Books &amp; Design Guides</h3><p>Practical guides to food forests, water harvesting and soil.</p></div>
      <div class="card offer-card"><span class="ic-soft">${icon('download')}</span><h3>Digital Products</h3><p>Design templates, planting calendars and downloadable plans.</p></div>
    </div>
  </div>
</section>
<section class="section section--sage" id="waitlist" aria-labelledby="wl-title">
  <div class="container signup-wrap">
    <div data-reveal>
      <p class="eyebrow">Shop Waitlist</p>
      <h2 id="wl-title">Join the <em>Waitlist</em></h2>
      <p>Be the first to know when the shop opens, with launch offers for waitlist members. Need seedlings now? <a href="/contact/?service=seedlings#enquiry">Request a price list</a>.</p>
    </div>
    <div class="signup-box" data-reveal style="--d:.1s">
      ${signupForm({ id: 'wl-shop', kind: 'waitlist', button: 'Get Notified', source: 'Shop', interest: { label: 'Most interested in', options: ['Native Seeds & Seedlings', 'Regenerative Tools', 'Books & Design Guides', 'Digital Products'] } })}
    </div>
  </div>
</section>`,
};

const products = {
  path: '/products/', active: 'products', title: 'Products',
  description: 'Permavia products: permaculture courses and workshops, and the Permavia Shop for seeds, seedlings, tools and guides.',
  body: `
${pageHero({
  eyebrow: 'Products',
  title: 'Learn, Grow and <em>Build</em> With Permavia',
  lead: 'Courses to build your skills and a shop to equip your land. Both are launching soon, so join a waitlist to hear first.',
  image: img('09-products__01-hero__background'),
  crumbs: [['Products']],
  size: 'is-short',
})}
<section class="section">
  <div class="container">
    <div class="grid grid-2" data-stagger>
      <a class="big-card" href="/courses/">
        <img src="${img('06-permavia-academy__05-highlights__highlight-3-usable-skills')}" alt="" loading="lazy">
        <div class="body"><span class="badge badge--dark">Coming Soon</span><h2>Courses &amp; Workshops</h2><p>PDC certification, weekend workshops, online learning and on-site training.</p><span class="link-arrow">Explore Courses ${icon('arrow-right')}</span></div>
      </a>
      <a class="big-card" href="/shop/">
        <img src="${img('04-million-trees__04-cards__card-1-fruit-trees')}" alt="" loading="lazy">
        <div class="body"><span class="badge badge--dark">Coming Soon</span><h2>The Permavia Shop</h2><p>Native seeds and seedlings, regenerative tools, books and digital guides.</p><span class="link-arrow">Visit the Shop ${icon('arrow-right')}</span></div>
      </a>
    </div>
    <div class="link-panel" data-reveal>
      <p><strong>Need seedlings now?</strong> Million Trees can supply fruit, indigenous and nitrogen-fixing trees today.</p>
      <a class="btn btn--secondary" href="/million-trees/">Million Trees ${icon('arrow-right')}</a>
    </div>
  </div>
</section>`,
};

module.exports = [courses, shop, products];
