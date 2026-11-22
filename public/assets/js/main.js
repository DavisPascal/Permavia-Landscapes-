/* Permavia Landscapes: site interactions */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Site settings come from a JSON data block (not an inline script), so the strict security policy can block inline code.
  const CFG = (() => {
    try { return JSON.parse(document.getElementById('site-config').textContent); } catch (e) { return window.PERMAVIA || {}; }
  })();
  window.PERMAVIA = CFG;
  const params = new URLSearchParams(location.search);

  // Icons
  const drawIcons = () => window.lucide && window.lucide.createIcons();
  drawIcons();

  // Year
  $$('[data-year]').forEach((n) => (n.textContent = new Date().getFullYear()));

  // Header state
  const header = $('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 30 || document.body.classList.contains('is-plain'));
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav
  const toggle = $('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    });
    $$('.main-nav a').forEach((a) => a.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  $$('.sub-toggle').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault();
    const li = b.closest('.has-sub');
    const open = !li.classList.contains('is-open');
    $$('.has-sub.is-open').forEach((x) => { if (x !== li) { x.classList.remove('is-open'); $('.sub-toggle', x).setAttribute('aria-expanded', 'false'); } });
    li.classList.toggle('is-open', open);
    b.setAttribute('aria-expanded', String(open));
  }));
  // Touch screens (e.g. tablets in landscape): tapping anywhere outside an open dropdown closes it.
  document.addEventListener('click', (e) => {
    if (e.target.closest('.has-sub')) return;
    $$('.has-sub.is-open').forEach((x) => { x.classList.remove('is-open'); const t = $('.sub-toggle', x); if (t) t.setAttribute('aria-expanded', 'false'); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    $$('.has-sub.is-open').forEach((x) => x.classList.remove('is-open'));
    if (document.body.classList.contains('nav-open')) toggle.click();
  });

  // Rotating words
  $$('[data-rotator]').forEach((wrap) => {
    const words = $$('span', wrap);
    if (words.length < 2 || reduce) return;
    let i = 0;
    setInterval(() => {
      const cur = words[i];
      cur.classList.remove('is-active'); cur.classList.add('is-out');
      setTimeout(() => cur.classList.remove('is-out'), 500);
      i = (i + 1) % words.length;
      words[i].classList.add('is-active');
    }, 2200);
  });

  // Tabs
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const select = (t, focus) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on));
        x.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(x.getAttribute('aria-controls'));
        panel.hidden = !on;
        if (on) { panel.classList.remove('is-entering'); void panel.offsetWidth; panel.classList.add('is-entering'); }
      });
      if (focus) t.focus();
    };
    tabs.forEach((t, idx) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') select(tabs[(idx + 1) % tabs.length], true);
        if (e.key === 'ArrowLeft') select(tabs[(idx - 1 + tabs.length) % tabs.length], true);
      });
    });
  });

  // Reveal on scroll + counters
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const dur = 1600; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        if (e.target.dataset.count) countUp(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    $$('[data-reveal], [data-count]').forEach((el) => io.observe(el));
    $$('[data-stagger]').forEach((g) => Array.from(g.children).forEach((c, i) => { c.setAttribute('data-reveal', ''); c.style.setProperty('--d', `${(i % 4) * 0.09}s`); io.observe(c); }));
  } else {
    $$('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  }

  // Parallax image bands
  const bands = $$('.image-band img');
  if (bands.length && !reduce) {
    const par = () => bands.forEach((img) => {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      img.style.transform = `translateY(${p * -40}px)`;
    });
    par(); window.addEventListener('scroll', par, { passive: true });
  }

  // Events page: hide events that have ended since the site was last built, and show the
  // "no events" message if none are left.
  $$('[data-upcoming-list]').forEach((list) => {
    const now = new Date(); const pad = (n) => String(n).padStart(2, '0');
    const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    let shown = 0;
    $$('[data-ends]', list).forEach((card) => { const over = card.dataset.ends < today; card.hidden = over; if (!over) shown++; });
    if (!shown) { list.hidden = true; const empty = $('[data-events-empty]'); if (empty) empty.hidden = false; }
  });

  // Blog filter: one category (main navigation) and/or one tag. Mirrors ?category= & ?tag= in the address bar.
  $$('[data-blog-filter]').forEach((box) => {
    const catBtns = $$('[data-cat]', box);
    const tagBtns = $$('[data-tag]', box);
    const cards = $$('.post-card[data-category]', box.parentElement);
    const empty = $('[data-empty]', box.parentElement);
    const intro = $('[data-cat-intro]', box);
    const status = $('[data-filter-status]', box);
    const state = { cat: 'all', tag: '' };
    const label = (btn) => btn ? btn.childNodes[0].textContent.trim() : '';
    // Tags have no buttons on the page; they arrive from an article's tag links (?tag=…).
    let tagNames = {}; try { tagNames = JSON.parse(box.dataset.tagNames || '{}'); } catch (e) { /* ignore */ }
    const apply = (push) => {
      catBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)));
      tagBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tag === state.tag)));
      let shown = 0;
      cards.forEach((c) => {
        const ok = (state.cat === 'all' || c.dataset.category === state.cat) && (!state.tag || c.dataset.tags.split(' ').includes(state.tag));
        c.hidden = !ok; if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      if (intro) {
        intro.hidden = state.cat === 'all';
        $$('[data-for]', intro).forEach((p) => { p.hidden = p.dataset.for !== state.cat; });
      }
      if (status) {
        const parts = [];
        if (state.cat !== 'all') parts.push(label(catBtns.find((b) => b.dataset.cat === state.cat)));
        if (state.tag) parts.push(`#${tagNames[state.tag] || state.tag}`);
        status.textContent = parts.length ? `Showing ${shown} article${shown === 1 ? '' : 's'} in ${parts.join(' + ')}` : '';
        if (state.tag) {
          const clear = document.createElement('button');
          clear.type = 'button'; clear.className = 'filter-clear'; clear.textContent = 'Clear tag';
          clear.addEventListener('click', () => { state.tag = ''; apply(true); });
          status.append(' · ', clear);
        }
      }
      if (push && window.history && history.replaceState) {
        const q = new URLSearchParams();
        if (state.cat !== 'all') q.set('category', state.cat);
        if (state.tag) q.set('tag', state.tag);
        history.replaceState(null, '', `${location.pathname}${q.toString() ? `?${q}` : ''}#browse`);
      }
    };
    catBtns.forEach((b) => b.addEventListener('click', () => { state.cat = b.dataset.cat; apply(true); }));
    tagBtns.forEach((b) => b.addEventListener('click', () => { state.tag = state.tag === b.dataset.tag ? '' : b.dataset.tag; apply(true); }));
    if (catBtns.some((b) => b.dataset.cat === params.get('category'))) state.cat = params.get('category');
    if (tagNames[params.get('tag')] || tagBtns.some((b) => b.dataset.tag === params.get('tag'))) state.tag = params.get('tag');
    apply(false);
  });

  // Contact: prefill from ?service= & ?type=
  // (values from the address bar are compared as plain text, never used to build selectors, so odd links can't break the page)
  const svcSel = $('#enquiry-service');
  if (svcSel && params.get('service')) {
    const opt = Array.from(svcSel.options).find((o) => o.dataset.key === params.get('service'));
    if (opt) svcSel.value = opt.value;
  }
  if (params.get('type') === 'visit') { const v = $('#visit'); if (v) v.checked = true; }

  // Links like /contact/?service=seedlings#enquiry: land on that section once the page has finished
  // loading (images above it change the page height after the browser's own jump).
  if (location.hash.length > 1) {
    let id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch (e) { /* malformed link: use it as-is */ }
    const target = document.getElementById(id);
    if (target) {
      // Instant jump (not smooth), repeated briefly while images above it are still loading.
      let active = true;
      const go = () => {
        if (!active) return;
        const y = target.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop || 0);
        window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
      };
      [0, 150, 500, 1200].forEach((ms) => setTimeout(go, ms));
      window.addEventListener('load', () => setTimeout(go, 50), { once: true });
      // Stop correcting as soon as the visitor scrolls themselves.
      ['wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, () => { active = false; }, { once: true, passive: true }));
    }
  }

  // Thank-you page variant
  if (params.get('booked')) {
    const a = $('[data-thanks="enquiry"]');
    const b = $(params.get('confirmed') ? '[data-thanks="confirmed"]' : '[data-thanks="booked"]');
    if (a && b) {
      a.hidden = true; b.hidden = false;
      const when = $('[data-booked-when]', b);
      if (when && params.get('when')) when.textContent = params.get('when');
    }
  }

  // ── Forms ────────────────────────────────────────────────────
  // Validate every field inside `scope`; returns the first invalid control or null.
  function validate(scope) {
    let firstBad = null;
    $$('.field', scope).forEach((f) => {
      const input = $('input, select, textarea', f);
      if (!input || input.type === 'checkbox') return;
      f.classList.remove('is-invalid');
      const old = $(':scope > .err', f); if (old) old.remove();
      if (!input.checkValidity()) {
        f.classList.add('is-invalid');
        const m = document.createElement('span');
        m.className = 'err';
        m.textContent = input.validity.valueMissing ? 'Please fill this in.'
          : input.type === 'email' ? 'Please enter a valid email address.'
          : input.type === 'url' ? 'Please paste a full link starting with https://'
          : 'Please check this field.';
        f.appendChild(m);
        firstBad = firstBad || input;
      }
    });
    // Required radio groups (chips)
    $$('fieldset', scope).forEach((fs) => {
      const r = $(':scope > .chips input[type="radio"][required]', fs);
      if (!r) return;
      const old = $(':scope > .err', fs); if (old) old.remove();
      if (!r.checkValidity()) {
        const m = document.createElement('span');
        m.className = 'err'; m.style.display = 'block'; m.style.marginTop = '8px';
        m.textContent = 'Please choose one.';
        fs.appendChild(m);
        firstBad = firstBad || r;
      }
    });
    return firstBad;
  }

  function collect(form) {
    const fd = new FormData(form);
    const data = {};
    for (const [k, v] of fd.entries()) data[k] = data[k] ? `${data[k]}, ${v}` : v;
    delete data.company_website; // spam trap, never sent
    data.form = form.dataset.form; data.source = form.dataset.source || location.pathname;
    return data;
  }

  // ── Spam protection ──
  // A bot is assumed when the hidden trap field is filled, or the form is sent within 3 seconds of the page opening.
  // Bots get a normal-looking "thank you" but nothing is sent to HubSpot or Cal.com.
  const PAGE_OPENED = Date.now();
  function looksLikeBot(form) {
    const trap = form.querySelector('input[name="company_website"]');
    return (trap && trap.value.trim() !== '') || Date.now() - PAGE_OPENED < 3000;
  }

  // ── HubSpot: turn website fields into HubSpot contact properties ──
  const HS = CFG.hubspot || {};
  const hsFormId = (kind) => HS.portalId && HS.forms && HS.forms[kind];
  const WAITLIST_FIELD = { Courses: 'course_interest', Shop: 'shop_interest', 'Permavia Farm': 'farm_interest', 'Permavia Academy': 'academy_interest' };

  function toHubSpot(data) {
    const P = HS.properties || {};
    const V = HS.values || {};
    // Translate a website answer into the option's internal value in HubSpot (see hubspot.values in src/site.js).
    const opt = (key, v) => (v && V[key] && V[key][v] !== undefined ? V[key][v] : v);
    const out = [];
    const add = (name, value) => { if (name && value !== undefined && value !== null && String(value).trim() !== '') out.push({ objectTypeId: '0-1', name, value: String(value) }); };
    const addOpt = (key, value) => add(P[key], opt(key, value));
    const [first, ...rest] = String(data.name || '').trim().split(/\s+/);
    add('firstname', first); add('lastname', rest.join(' '));
    add('email', data.email); add('phone', data.phone); add('message', data.message);
    add(P.land_location, data.location);
    addOpt('project_type', data.project_type);
    addOpt('service_interest', data.service);
    addOpt('land_size', data.land_size);
    addOpt('budget_range', data.budget);
    if (data.site_visit) add(P.wants_site_visit, 'true');
    addOpt('call_method', data.call_method);
    if (data.goals) add(P.project_goals, data.goals.split(', ').map((g) => opt('project_goals', g)).join(';'));
    add(P.media_link, data.media_link);
    if (data.call_date) add(P.preferred_call_time, `${data.call_date}, ${data.call_time}`);
    if (data.form === 'waitlist') {
      if (data.source === 'Events') add(P.events_updates, 'true');
      else addOpt(WAITLIST_FIELD[data.source], data.interest);
    }
    return out;
  }

  async function sendHubSpot(kind, data) {
    const hutk = (document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/) || [])[1];
    const body = {
      fields: toHubSpot(data),
      context: Object.assign({ pageUri: location.href, pageName: document.title }, hutk ? { hutk } : {}),
    };
    const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HS.portalId}/${hsFormId(kind)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    if (!res.ok) {
      let detail = ''; try { detail = JSON.stringify((await res.json()).errors || ''); } catch (e) { /* ignore */ }
      console.error('HubSpot rejected the form:', res.status, detail);
      throw new Error(res.status);
    }
  }

  // Send to HubSpot, another configured endpoint, or fall back to the visitor's email app.
  async function send(kind, data, subject) {
    if (hsFormId(kind)) return sendHubSpot(kind, data);
    const forms = CFG.forms || {};
    const endpoint = forms[kind] || (kind === 'booking' ? forms.contact : '');
    if (endpoint) {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error(res.status);
      return;
    }
    const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`).join('\n');
    location.href = `mailto:${CFG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await new Promise((r) => setTimeout(r, 600));
  }

  $$('form[data-form]:not([data-wizard])').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form-status', form);
      const bad = validate(form);
      if (bad) { bad.focus(); return; }
      if (looksLikeBot(form)) {
        if (form.dataset.form === 'contact') { location.href = '/thank-you/'; return; }
        form.reset(); status.classList.remove('is-error');
        status.textContent = "Thank you! You're on the list. We'll be in touch as soon as there's news.";
        return;
      }
      const data = collect(form);
      const kind = form.dataset.form;
      const subject = kind === 'contact' ? `Project enquiry from ${data.name}` : `${kind === 'newsletter' ? 'Newsletter' : 'Waitlist'} sign-up: ${data.interest || data.source}`;
      const btn = $('button[type="submit"]', form);
      btn.disabled = true;
      try {
        await send(kind, data, subject);
        if (kind === 'contact') { location.href = '/thank-you/'; return; }
        form.reset();
        status.classList.remove('is-error');
        status.textContent = "Thank you! You're on the list. We'll be in touch as soon as there's news.";
      } catch (err) {
        status.classList.add('is-error');
        status.textContent = 'Sorry, something went wrong. Please try again, or message us on WhatsApp.';
      }
      btn.disabled = false;
    });
  });

  // ── Discovery-call booking wizard ────────────────────────────
  $$('form[data-wizard]').forEach((form) => {
    const steps = $$('.wz-step', form);
    const marks = $$('.wz-progress li', form);
    const status = $('.form-status', form);
    let current = 0;

    const show = (i) => {
      current = i;
      steps.forEach((s, n) => (s.hidden = n !== i));
      marks.forEach((m, n) => { m.classList.toggle('is-current', n === i); m.classList.toggle('is-done', n < i); });
      const top = form.getBoundingClientRect().top;
      if (top < 80 || top > innerHeight * 0.6) window.scrollTo({ top: scrollY + top - 110, behavior: reduce ? 'auto' : 'smooth' });
      const first = $('input:not([type=hidden]), select, textarea, button.cal-day:not([disabled])', steps[i]);
      if (first) first.focus({ preventScroll: true });
      if (i === 2) enterSchedule();
    };

    $$('[data-next]', form).forEach((b) => b.addEventListener('click', () => {
      const bad = validate(steps[current]);
      if (bad) { bad.focus(); return; }
      show(current + 1);
    }));
    $$('[data-back]', form).forEach((b) => b.addEventListener('click', () => show(current - 1)));

    // ── Where times come from ──
    //  • Cal.com link in src/site.js → our own calendar shows Cal.com's live free slots and books into Cal.com
    //  • HubSpot Meetings / Calendly link → their page is embedded in step 3
    //  • no link → built-in calendar from callDays/callSlots; bookings are requests confirmed by hand
    const embed = $('[data-embed]', form);
    const calWrap = $('[data-calendar]', form);
    let bookingUrl = null;
    try { bookingUrl = CFG.booking ? new URL(CFG.booking) : null; } catch (e) { bookingUrl = null; }
    const CAL = (() => {
      if (!bookingUrl || !/(^|\.)cal\.com$/.test(bookingUrl.host)) return null;
      const [user, slug] = bookingUrl.pathname.split('/').filter(Boolean);
      return user && slug ? { user, slug } : null;
    })();
    const useEmbed = !!bookingUrl && !CAL;
    let embedLoaded = false;
    let live = null;                          // { 'YYYY-MM-DD': ['10:00', '10:30', …] } from Cal.com
    let liveState = CAL ? 'idle' : 'off';     // idle | loading | ready | failed | off

    async function enterSchedule() {
      if (CAL) { if (liveState === 'idle' || liveState === 'failed') loadLive(); return; }
      if (!useEmbed || embedLoaded) return;
      const d = collect(form);
      const url = new URL(bookingUrl.href);
      const [first, ...rest] = (d.name || '').trim().split(/\s+/);
      if (/calendly\.com/.test(url.host)) {
        url.searchParams.set('name', d.name || ''); url.searchParams.set('email', d.email || '');
        url.searchParams.set('a1', `${d.project_type || ''} project in ${d.location || ''}. ${d.message || ''}`.slice(0, 900));
        url.searchParams.set('hide_gdpr_banner', '1');
      } else if (/hubspot/.test(url.host)) {
        url.searchParams.set('embed', 'true'); url.searchParams.set('firstName', first || '');
        url.searchParams.set('lastName', rest.join(' ')); url.searchParams.set('email', d.email || '');
      }
      embed.innerHTML = `<iframe title="Choose a time for your call" src="${url.href}" loading="lazy"></iframe>`;
      embed.hidden = false; calWrap.hidden = true;
      $('[data-submit]', form).hidden = true;
      embedLoaded = true;
      const forms = CFG.forms || {};
      if (hsFormId('booking') || forms.booking || forms.contact) send('booking', d, '').catch(() => {});
    }

    // Calendar (East Africa Time, UTC+3)
    const EAT = 3;
    const slots = CFG.callSlots || ['10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];
    const days = CFG.callDays || [1, 2, 3, 4, 5];
    const nowEAT = new Date(Date.now() + EAT * 3600e3);
    const today = Date.UTC(nowEAT.getUTCFullYear(), nowEAT.getUTCMonth(), nowEAT.getUTCDate());
    const minDay = today + 864e5; // built-in calendar: from tomorrow
    const maxDay = today + 60 * 864e5;
    const monthOf = (t) => { const d = new Date(t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1); };
    let view = monthOf(minDay);
    let chosenDay = null, chosenTime = null;

    const grid = $('.cal-grid', form), title = $('.cal-title', form), slotBox = $('.cal-slots', form);
    const dayLabel = $('.cal-day-label', form), summary = $('[data-summary]', form), slotErr = $('[data-slot-error]', form);
    const fmtDay = (t, opts) => new Date(t).toLocaleDateString('en-GB', Object.assign({ timeZone: 'UTC' }, opts));
    const fmtTime = (hm) => { const [h, m] = hm.split(':').map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`; };
    const isoDay = (t) => new Date(t).toISOString().slice(0, 10);
    const localDiffers = new Date().getTimezoneOffset() !== -EAT * 60;
    const DEFAULT_LABEL = dayLabel ? dayLabel.textContent : '';

    // Only callDays and callSlots (src/site.js) are ever offered. With Cal.com, a slot must ALSO be free there,
    // so the website never shows a day or time outside your call hours, even if Cal.com offers more.
    const callDay = (t) => days.includes(new Date(t).getUTCDay());
    const timesFor = (t) => {
      if (!callDay(t)) return [];
      return liveState === 'ready' ? (live[isoDay(t)] || []).filter((hm) => slots.includes(hm)) : slots;
    };
    const dayOpen = (t) => {
      if (liveState === 'loading' || liveState === 'idle') return false;
      if (liveState === 'ready') return t >= today && t <= maxDay && timesFor(t).length > 0;
      return t >= minDay && t <= maxDay && callDay(t);
    };

    async function loadLive() {
      liveState = 'loading';
      dayLabel.textContent = 'Loading available times…';
      slotBox.innerHTML = '<span class="cal-loading" aria-hidden="true"></span>';
      renderMonth();
      try {
        const u = `https://api.cal.com/v2/slots?username=${encodeURIComponent(CAL.user)}&eventTypeSlug=${encodeURIComponent(CAL.slug)}`
          + `&start=${isoDay(today)}&end=${isoDay(maxDay)}&timeZone=Africa/Kampala`;
        const res = await fetch(u, { headers: { 'cal-api-version': '2024-09-04' } });
        if (!res.ok) throw new Error(`slots ${res.status}`);
        const j = await res.json();
        live = {};
        Object.entries(j.data || {}).forEach(([date, arr]) => {
          live[date] = (arr || []).map((s) => String(s.start || s.time || '').slice(11, 16)).filter(Boolean);
        });
        liveState = 'ready';
        const firstDay = Object.keys(live).filter((k) => timesFor(Date.parse(`${k}T00:00:00Z`)).length).sort()[0];
        if (chosenDay && !timesFor(chosenDay).includes(chosenTime)) chosenTime = null;
        if (chosenDay && !timesFor(chosenDay).length) chosenDay = null;
        if (!chosenDay && firstDay) view = monthOf(Date.parse(`${firstDay}T00:00:00Z`));
        dayLabel.textContent = firstDay ? DEFAULT_LABEL : 'No free times in the next few weeks. Please message us on WhatsApp.';
      } catch (e) {
        console.error('Could not load live times from Cal.com:', e);
        liveState = 'failed';
        dayLabel.textContent = 'Pick a preferred time and we will confirm it with you.';
      }
      slotBox.innerHTML = '';
      renderMonth(); renderSlots(); updateSummary();
      return liveState;
    }

    function renderMonth() {
      if (!grid) return;
      const d = new Date(view);
      title.textContent = fmtDay(view, { month: 'long', year: 'numeric' });
      const lead = (d.getUTCDay() + 6) % 7;
      const count = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
      let html = '<span></span>'.repeat(lead);
      for (let n = 1; n <= count; n++) {
        const t = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), n);
        const ok = dayOpen(t);
        html += `<button type="button" class="cal-day${t === chosenDay ? ' is-selected' : ''}${t === today ? ' is-today' : ''}" data-day="${t}"${ok ? '' : ' disabled'} aria-label="${fmtDay(t, { weekday: 'long', day: 'numeric', month: 'long' })}${ok ? '' : ', unavailable'}" aria-pressed="${t === chosenDay}">${n}</button>`;
      }
      grid.innerHTML = html;
      $('[data-cal-prev]', form).disabled = view <= monthOf(today);
      $('[data-cal-next]', form).disabled = view >= monthOf(maxDay);
    }

    function renderSlots() {
      if (!chosenDay) { slotBox.innerHTML = slotBox.querySelector('.cal-loading') ? slotBox.innerHTML : ''; return; }
      dayLabel.textContent = fmtDay(chosenDay, { weekday: 'long', day: 'numeric', month: 'long' });
      slotBox.innerHTML = timesFor(chosenDay).map((hm) => {
        const [h, m] = hm.split(':').map(Number);
        const local = localDiffers ? new Date(chosenDay + (h - EAT) * 3600e3 + m * 6e4).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : '';
        return `<button type="button" class="cal-slot${hm === chosenTime ? ' is-selected' : ''}" data-time="${hm}" aria-pressed="${hm === chosenTime}">${fmtTime(hm)}${local ? `<small>your time ${local}</small>` : ''}</button>`;
      }).join('');
    }

    function updateSummary() {
      const ok = chosenDay && chosenTime;
      form.elements.call_date.value = ok ? fmtDay(chosenDay, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
      form.elements.call_time.value = ok ? `${fmtTime(chosenTime)} EAT` : '';
      summary.hidden = !ok;
      if (ok) {
        const method = (form.elements.call_method && form.elements.call_method.value) || 'Call';
        summary.innerHTML = `<span class="wz-sum-ic"><i data-lucide="calendar-check" class="ic"></i></span><div><strong>${form.elements.call_date.value}, ${form.elements.call_time.value}</strong><span>${method} · 30 minutes · Free</span></div>`;
        drawIcons();
        slotErr.hidden = true;
      }
    }

    if (grid) {
      renderMonth();
      $('[data-cal-prev]', form).addEventListener('click', () => { const d = new Date(view); view = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1); renderMonth(); });
      $('[data-cal-next]', form).addEventListener('click', () => { const d = new Date(view); view = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1); renderMonth(); });
      grid.addEventListener('click', (e) => {
        const b = e.target.closest('.cal-day'); if (!b || b.disabled) return;
        chosenDay = Number(b.dataset.day); chosenTime = null;
        renderMonth(); renderSlots(); updateSummary();
        const first = $('.cal-slot', slotBox); if (first && innerWidth < 900) first.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
      slotBox.addEventListener('click', (e) => {
        const b = e.target.closest('.cal-slot'); if (!b) return;
        chosenTime = b.dataset.time; renderSlots(); updateSummary();
      });
    }

    // Phone as typed by the visitor → international format for Cal.com.
    // "0772 123 456" → "+256772123456"; "256 772…" → "+256772…"; "+254 7…" stays as entered (spaces removed).
    function intlPhone(raw) {
      let p = String(raw || '').replace(/[^\d+]/g, '');
      if (!p) return '';
      if (p.startsWith('00')) p = `+${p.slice(2)}`;
      else if (p.startsWith('0')) p = `+256${p.slice(1)}`;
      else if (!p.startsWith('+')) p = p.startsWith('256') ? `+${p}` : `+256${p}`;
      return /^\+\d{8,15}$/.test(p) ? p : '';
    }

    // Book the chosen slot in Cal.com. Returns 'booked', 'taken' or 'failed'.
    async function bookInCal(data) {
      const [h, m] = chosenTime.split(':').map(Number);
      const start = new Date(chosenDay + (h - EAT) * 3600e3 + m * 6e4).toISOString();
      const notes = [
        `${data.project_type || 'Project'} in ${data.location || '?'}${data.land_size ? `, ${data.land_size}` : ''}.`,
        data.goals ? `Goals: ${data.goals}.` : '',
        data.message || '',
        `Phone/WhatsApp: ${data.phone || '-'}. Prefers: ${data.call_method || '-'}.`,
        data.budget ? `Budget: ${data.budget}.` : '',
        data.media_link ? `Photos/map: ${data.media_link}` : '',
      ].filter(Boolean).join(' ').slice(0, 1000);
      try {
        const res = await fetch('https://api.cal.com/v2/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'cal-api-version': '2024-08-13' },
          body: JSON.stringify({
            start,
            eventTypeSlug: CAL.slug,
            username: CAL.user,
            // Cal.com's Discovery Call event requires a phone number, in international format (+256…).
            attendee: { name: data.name, email: data.email, timeZone: 'Africa/Kampala', language: 'en', ...(intlPhone(data.phone) ? { phoneNumber: intlPhone(data.phone) } : {}) },
            bookingFieldsResponses: { notes },
            metadata: { source: 'permavialandscapes.com' },
          }),
        });
        if (res.ok) return 'booked';
        const errText = await res.text();
        console.error('Cal.com did not accept the booking:', res.status, errText);
        // Problems the visitor can fix themselves (e.g. an email that can't receive mail, a bad phone number).
        if (res.status === 400) {
          let msg = ''; try { msg = (JSON.parse(errText).error || {}).message || ''; } catch (e) { /* ignore */ }
          if (/email/i.test(msg)) return 'bad-email';
          if (/phone/i.test(msg)) return 'bad-phone';
        }
      } catch (e) {
        console.error('Could not reach Cal.com:', e);
      }
      // Was the slot just taken by someone else? Re-check live availability.
      const chosen = { day: chosenDay, time: chosenTime };
      if ((await loadLive()) === 'ready' && !timesFor(chosen.day).includes(chosen.time)) return 'taken';
      chosenDay = chosen.day; chosenTime = chosen.time; renderMonth(); renderSlots(); updateSummary();
      return 'failed';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!(chosenDay && chosenTime)) { slotErr.hidden = false; return; }
      if (looksLikeBot(form)) { location.href = '/thank-you/?booked=1'; return; } // no Cal.com booking, no HubSpot record
      const data = collect(form);
      const when = `${data.call_date}, ${data.call_time}`;
      const btn = $('[data-submit]', form);
      btn.disabled = true;
      status.textContent = ''; status.classList.remove('is-error');

      let booked = false;
      if (liveState === 'ready') {
        btn.dataset.label = btn.dataset.label || btn.innerHTML;
        btn.textContent = 'Booking…';
        const result = await bookInCal(data);
        btn.innerHTML = btn.dataset.label;
        if (result === 'taken') {
          status.classList.add('is-error');
          status.textContent = 'Sorry, that time was just taken. Please choose another time.';
          btn.disabled = false; drawIcons();
          return;
        }
        if (result === 'bad-email' || result === 'bad-phone') {
          // Send the visitor back to step 1 with a clear message; their answers and chosen time are kept.
          const field = form.elements[result === 'bad-email' ? 'email' : 'phone'];
          show(0);
          const wrap = field.closest('.field');
          const old = wrap.querySelector('.err'); if (old) old.remove();
          wrap.classList.add('is-invalid');
          const m = document.createElement('span'); m.className = 'err';
          m.textContent = result === 'bad-email'
            ? 'We couldn’t book with this email address. Please check it, so your Webex invite reaches you.'
            : 'Please enter a full phone number, e.g. +256 772 123 456.';
          wrap.appendChild(m); field.focus();
          btn.disabled = false; drawIcons();
          return;
        }
        booked = result === 'booked';
        data.booking_status = booked ? 'Booked in Cal.com' : 'Request: Cal.com booking failed, confirm by hand';
      }

      try {
        await send('booking', data, `Discovery call ${booked ? 'booked' : 'request'}: ${data.name} on ${when}`);
      } catch (err) {
        if (!booked) {
          status.classList.add('is-error');
          status.textContent = 'Sorry, something went wrong. Please try again, or message us on WhatsApp.';
          btn.disabled = false; drawIcons();
          return;
        }
        console.error('Booked in Cal.com, but HubSpot did not receive the details:', err);
      }
      location.href = `/thank-you/?booked=1${booked ? '&confirmed=1' : ''}&when=${encodeURIComponent(when)}`;
    });
  });

  // ── Conversion tracking (Google Analytics 4, when set in src/site.js) ──
  // Mark these as "key events" in GA4: generate_lead, book_call, click_whatsapp, click_call.
  const track = (name, params = {}) => {
    params.page_path = location.pathname;
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    else (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, params));
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.startsWith('tel:')) track('click_call', { link_text: a.textContent.trim().slice(0, 60) });
    else if (/wa\.me\//.test(href)) track('click_whatsapp', { link_text: a.textContent.trim().slice(0, 60) });
  });
  if (location.pathname === '/thank-you/') track(params.get('booked') ? 'book_call' : 'generate_lead');
})();
