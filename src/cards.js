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

// Escapes text typed in the CMS before it goes into the page.
const h = (v) => String(v ?? '').replace(/&(?!(#\d+|#x[\da-f]+|\w+);)/gi, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const postCard = (p) => `
<a class="card post-card" href="/blog/${p.slug}/" data-category="${p.categorySlug}" data-tags="${(p.tagSlugs || []).join(' ')}">
  <div class="media"><img src="${h(p.image)}" alt="" loading="lazy"><span class="badge badge--dark">${h(p.category)}</span></div>
  <div class="body">
    <div class="post-meta"><span>${icon('calendar')} ${fmtDate(p.date)}</span><span>${icon('clock')} ${p.read} min read</span></div>
    <h3>${h(p.title)}</h3>
    <p>${h(p.excerpt)}</p>
    <span class="link-arrow">Read article ${icon('arrow-right')}</span>
  </div>
</a>`;

// Event card (Events page). data-ends lets the page hide events that finished after the last build.
const fmtEventDate = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const eventWhen = (e) => {
  const sameDay = e.endDate === e.startDate;
  const date = sameDay ? fmtEventDate(e.startDate) : `${fmtEventDate(e.startDate)} to ${fmtEventDate(e.endDate)}`;
  const time = e.startTime ? `${e.startTime}${e.endTime ? `–${e.endTime}` : ''}` : '';
  return { date, time };
};
const eventCard = (e) => {
  const w = eventWhen(e);
  const badge = { upcoming: ['badge--fern', 'Upcoming'], completed: ['', 'Completed'], cancelled: ['badge--gold', 'Cancelled'] }[e.status];
  return `
<a class="card post-card event-card" href="/our-events/${e.slug}/" data-ends="${e.endDate}">
  <div class="media">${e.image ? `<img src="${h(e.image)}" alt="${h(e.imageAlt)}" loading="lazy">` : `<img src="/assets/img/01-home__07-inspiration__tile-5-community-development.webp" alt="" loading="lazy">`}<span class="badge ${badge[0]}">${badge[1]}</span></div>
  <div class="body">
    <div class="post-meta"><span>${icon('calendar')} ${w.date}</span>${w.time ? `<span>${icon('clock')} ${w.time}</span>` : ''}</div>
    <h3>${h(e.title)}</h3>
    ${e.venue ? `<p class="event-venue">${icon('map-pin')} ${h(e.venue)}</p>` : ''}
    <p>${h(e.excerpt)}</p>
    <span class="link-arrow">Event details ${icon('arrow-right')}</span>
  </div>
</a>`;
};

module.exports = { projectCard, postCard, eventCard, eventWhen, h };
