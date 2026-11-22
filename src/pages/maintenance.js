// "We'll be back soon" page. Shown to every visitor while maintenance mode is on
// (see `maintenance` in src/site.js and MAINTENANCE.md).
const { icon, waIcon, waLink, site } = require('../components');

const m = site.maintenance;

module.exports = {
  path: '/maintenance/',
  title: "We'll Be Back Soon",
  description: 'Permavia Landscapes is briefly offline for maintenance. Call, WhatsApp or email us in the meantime.',
  noindex: true,
  bare: true, // no menu or footer: every other page is unavailable while this is shown
  bodyClass: 'is-maintenance',
  body: `
<section class="mnt">
  <div class="mnt-bg" aria-hidden="true"></div>
  <div class="mnt-card">
    <div class="mnt-brand">
      <img src="/assets/img/logo-mark.png" alt="" width="64" height="64">
      <span><strong>Permavia</strong><small>Landscapes</small></span>
    </div>
    <div class="mnt-ic">${icon('sprout')}</div>
    <p class="eyebrow" style="justify-content:center">Back Shortly</p>
    <h1>${m.headline}</h1>
    <p class="mnt-msg">${m.message}</p>
    ${m.backBy ? `<p class="mnt-when">${icon('clock')} Expected back: <strong>${m.backBy}</strong></p>` : ''}
    <div class="mnt-actions">
      <a class="btn btn--wa btn--lg" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>
      <a class="btn btn--primary btn--lg" href="tel:${site.phoneHref}">${icon('phone')} Call ${site.phone}</a>
    </div>
    <p class="mnt-mail">${icon('mail')} <a href="mailto:${site.email}">${site.email}</a> · ${icon('clock')} ${site.hours}</p>
    <p class="mnt-foot">${site.brandLine} · Serving ${site.serviceArea}</p>
  </div>
</section>`,
};
