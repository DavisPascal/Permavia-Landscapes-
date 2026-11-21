const { icon, stageMeter } = require('./components');
const { fmtDate } = require('./data');

const projectCard = (p) => `
<a class="card project-card" href="${p.path}">
  <div class="media"><img src="${p.card}" alt="${p.name}: ${p.type}" loading="lazy"><span class="badge ${p.badge}">${p.status}</span></div>
  <div class="body">
    <p class="kicker">${p.type}</p>
    <h3>${p.name}</h3>
    <p>${p.short}</p>
    <div class="foot">${stageMeter(p.stage)}<span class="link-arrow">Explore ${icon('arrow-right')}</span></div>
  </div>
</a>`;

const postCard = (p) => `
<a class="card post-card" href="/blog/${p.slug}/" data-category="${p.categorySlug}" data-tags="${(p.tagSlugs || []).join(' ')}">
  <div class="media"><img src="${p.image}" alt="" loading="lazy"><span class="badge badge--dark">${p.category}</span></div>
  <div class="body">
    <div class="post-meta"><span>${icon('calendar')} ${fmtDate(p.date)}</span><span>${icon('clock')} ${p.read} min read</span></div>
    <h3>${p.title}</h3>
    <p>${p.excerpt}</p>
    <span class="link-arrow">Read article ${icon('arrow-right')}</span>
  </div>
</a>`;

module.exports = { projectCard, postCard };
