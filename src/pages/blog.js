const { img, icon, pageHero, signupForm, inShort, faqSchema } = require('../components');
const { posts, fmtDate } = require('../data');
const { postCard } = require('../cards');

const CATS = ['Water', 'Soil', 'Food Forests', 'Agroforestry', 'Community', 'Carbon'];

const newsletter = `
<section class="section" aria-labelledby="nl-title">
  <div class="container">
    <div class="newsletter" data-reveal>
      <div>
        <p class="eyebrow eyebrow--light">Newsletter</p>
        <h2 id="nl-title">Get the Journal in Your <em>Inbox</em></h2>
        <p>One thoughtful email a month: practical guides, project updates and event dates. Unsubscribe any time.</p>
      </div>
      ${signupForm({ id: 'nl-form', kind: 'newsletter', button: 'Subscribe', compact: true, source: 'Blog newsletter' })}
    </div>
  </div>
</section>`;

const [first, ...rest] = posts;

const index = {
  path: '/blog/', active: 'blog', title: 'The Regenerative Journal',
  description: 'Practical guides on water harvesting, living soils, food forests, agroforestry and carbon projects from the Permavia Landscapes team in Uganda.',
  body: `
${pageHero({
  eyebrow: 'Permaculture | Design | Regeneration',
  title: 'The Regenerative <em>Journal</em>',
  lead: 'Welcome to our journal: practical ideas, field notes and guides from our work regenerating land across East Africa.',
  image: img('10-blog__01-header__background'),
  crumbs: [['Blog']],
  size: 'is-short',
})}
<section class="section">
  <div class="container">
    <a class="card featured-post" href="/blog/${first.slug}/" data-reveal>
      <div class="media"><img src="${first.image}" alt="" loading="lazy"></div>
      <div class="body">
        <span class="badge badge--fern" style="align-self:flex-start;margin-bottom:16px">Latest · ${first.category}</span>
        <h2>${first.title}</h2>
        <div class="post-meta"><span>${icon('calendar')} ${fmtDate(first.date)}</span><span>${icon('clock')} ${first.read} min read</span></div>
        <p>${first.excerpt}</p>
        <span class="link-arrow">Read article ${icon('arrow-right')}</span>
      </div>
    </a>

    <div class="filters" data-filter-group role="group" aria-label="Filter articles by category">
      <button class="filter-btn" data-filter="all" aria-pressed="true">All</button>
      ${CATS.map((c) => `<button class="filter-btn" data-filter="${c}" aria-pressed="false">${c}</button>`).join('')}
    </div>
    <div class="grid grid-3">${posts.map(postCard).join('')}</div>
    <div class="empty-note" data-empty hidden>${icon('sprout')}<p class="mb-0">New articles in this category are on the way. Subscribe below to get them first.</p></div>
  </div>
</section>
${newsletter}`,
};

const single = posts.map((p) => {
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return {
    path: `/blog/${p.slug}/`, active: 'blog', title: p.title, seoTitle: p.seoTitle, description: p.excerpt, ogImage: p.image,
    schema: [
      { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, datePublished: p.date, abstract: p.summary, author: { '@type': 'Organization', name: 'Permavia Landscapes' } },
      ...(p.faqs ? [faqSchema(p.faqs)] : []),
    ],
    body: `
<section class="page-hero article-hero is-short">
  <div class="page-hero-bg"><img src="${p.image}" alt="" fetchpriority="high"></div>
  <div class="container page-hero-inner" style="padding-bottom:120px">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog/">Journal</a><span>/</span><span aria-current="page">${p.category}</span></nav>
    <span class="badge badge--dark" style="margin-bottom:18px">${p.category}</span>
    <h1>${p.title}</h1>
    <div class="post-meta"><span>${icon('pen-line')} Permavia Team</span><span>${icon('calendar')} ${fmtDate(p.date)}</span><span>${icon('clock')} ${p.read} min read</span></div>
  </div>
</section>
<section class="section" style="padding-top:0">
  <div class="container">
    <article class="article">
      <div class="feature-img"><img src="${p.image}" alt="${p.title}"></div>
      ${p.summary ? inShort(p.summary) : ''}
      <div class="prose">${p.body}</div>
      ${p.faqs ? `<div class="post-faq"><h2>Frequently asked questions</h2>${p.faqs.map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${q}<span class="faq-ic">${icon('plus')}</span></summary><div class="faq-a"><p>${a}</p></div></details>`).join('')}</div>` : ''}
      <div class="author-box"><span class="av">${icon('leaf')}</span><div><strong>Written by the Permavia Team</strong><p>Regenerative designers and builders serving East Africa from Hoima City, Uganda.</p></div></div>
      <div class="post-cta">
        <div><h2>Want this on your land?</h2><p>Book a free consultation and we'll show you what's possible.</p></div>
        <a class="btn btn--primary" href="/contact/">Free Consultation ${icon('arrow-right')}</a>
      </div>
    </article>
  </div>
</section>
<section class="section section--sage" aria-labelledby="rel-title">
  <div class="container">
    <div class="split-head"><div class="section-head"><p class="eyebrow">Keep Reading</p><h2 id="rel-title">Related <em>Articles</em></h2></div><a class="btn btn--secondary" href="/blog/">All Articles ${icon('arrow-right')}</a></div>
    <div class="grid grid-3" data-stagger>${related.map(postCard).join('')}</div>
  </div>
</section>
${newsletter}`,
  };
});

module.exports = [index, ...single];
