const { img, icon, waIcon, waLink, pageHero, signupForm, sectionHead, site } = require('../components');

const services = [
  ['design', 'Regenerative Design'],
  ['installation', 'Installation of Regenerative & Community Development Projects'],
  ['farm', 'Farm Solutions'],
  ['maintenance', 'Maintenance'],
  ['education', 'Education for Regenerative Design & Management'],
  ['seedlings', 'Seedlings / Million Trees price list'],
  ['other', 'Not sure yet'],
];

// "Thursday and Friday", "Monday to Saturday"… built from callDays in src/site.js.
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function callDaysText() {
  const d = [...(site.callDays || [])].sort((a, b) => a - b);
  if (!d.length) return 'By appointment';
  const consecutive = d.every((x, i) => i === 0 || x === d[i - 1] + 1);
  if (d.length > 2 && consecutive) return `${DAY_NAMES[d[0]]} to ${DAY_NAMES[d[d.length - 1]]}`;
  const names = d.map((x) => DAY_NAMES[x]);
  return names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
const fmtHour = (hm) => { const [h, m] = hm.split(':').map(Number); return `${((h + 11) % 12) + 1}${m ? ':' + String(m).padStart(2, '0') : ''}${h < 12 ? 'am' : 'pm'}`; };
const callTimesText = () => {
  const s = site.callSlots || [];
  return s.length ? `${fmtHour(s[0])} to ${fmtHour(s[s.length - 1])}` : '';
};

// True when the booking link is a Cal.com page: the calendar then shows Cal.com's live free times.
const liveCal = String(site.booking || '').includes('cal.com/');

const chip = (type, name, value, ic, required = false) =>
  `<label><input type="${type}" name="${name}" value="${value}"${required ? ' required' : ''}><span>${ic ? icon(ic) + ' ' : ''}${value}</span></label>`;

// Free discovery call: 3-step booking (details, project, calendar).
function booking() {
  const goals = [['sprout', 'Restore soil'], ['droplets', 'Harvest water'], ['trees', 'Plant trees'], ['apple', 'Grow food'],
    ['trending-up', 'Increase income'], ['bird', 'Protect wildlife'], ['piggy-bank', 'Cut costs'], ['graduation-cap', 'Training']];
  return `
<section class="section" id="book" aria-labelledby="book-title">
  <div class="container book-grid">
    <div class="book-info" data-reveal>
      <p class="eyebrow">Free 30-Minute Call</p>
      <h2 id="book-title">Schedule Your <em>Discovery Call</em></h2>
      <p>A relaxed, no-obligation conversation about your land and what you want it to become. Tell us a little about your project first, so we arrive prepared and you get real advice, not a sales pitch.</p>
      <ol class="book-steps">
        <li><span>1</span><div><strong>Tell us about you and your land</strong>Two short steps, about three minutes.</div></li>
        <li><span>2</span><div><strong>Pick a date and time</strong>${liveCal ? 'Only our genuinely free times are shown, in East Africa Time.' : `${callDaysText()}, ${callTimesText()} East Africa Time.`}</div></li>
        <li><span>3</span><div><strong>We meet on Webex</strong>A free video call. Have Webex ready and join a few minutes early.</div></li>
        <li><span>4</span><div><strong>Get clear next steps</strong>A short written summary of our recommendations after the call.</div></li>
      </ol>
    </div>

    <form class="wizard" data-wizard data-form="booking" novalidate data-reveal style="--d:.1s">
      <ol class="wz-progress" aria-label="Booking steps">
        <li class="is-current"><span>1</span>Your Details</li>
        <li><span>2</span>Your Project</li>
        <li><span>3</span>Pick a Time</li>
      </ol>

      <fieldset class="wz-step" data-step="1">
        <legend class="sr-only">Your details</legend>
        <h3>Who are we speaking with?</h3>
        <div class="form-grid">
          <label class="field"><span>Full name *</span><input name="name" autocomplete="name" required></label>
          <label class="field"><span>Phone / WhatsApp *</span><input type="tel" name="phone" autocomplete="tel" required placeholder="+256 ..."></label>
          <label class="field full"><span>Email *</span><input type="email" name="email" autocomplete="email" required></label>
        </div>
        <input type="hidden" name="call_method" value="Video call (Webex)">
        <div class="webex-note">
          <span class="webex-ic">${icon('video')}</span>
          <div>
            <strong>Your call will take place via Cisco Webex.</strong>
            <p>Your meeting link will be sent to your email. Please have Webex ready on your device or join through your browser. Ensure your camera and microphone are working before the call.</p>
          </div>
        </div>
        <div class="wz-nav"><span></span><button type="button" class="btn btn--primary" data-next>Next: Your Project ${icon('arrow-right')}</button></div>
      </fieldset>

      <fieldset class="wz-step" data-step="2" hidden>
        <legend class="sr-only">Your project</legend>
        <h3>Tell us about your land</h3>
        <fieldset class="group">
          <legend>Project type *</legend>
          <div class="chips">
            ${chip('radio', 'project_type', 'Home', 'house', true)}${chip('radio', 'project_type', 'Farm', 'tractor')}${chip('radio', 'project_type', 'Business', 'building-2')}${chip('radio', 'project_type', 'NGO / Community', 'heart-handshake')}
          </div>
        </fieldset>
        <div class="form-grid">
          <label class="field"><span>Location of the land *</span><input name="location" required placeholder="Town, district or country"></label>
          <label class="field"><span>Land size</span>
            <select name="land_size"><option value="">Choose a size</option><option>Under 1/4 acre (compound or garden)</option><option>1/4 to 1 acre</option><option>1 to 5 acres</option><option>5 to 20 acres</option><option>Over 20 acres</option></select>
          </label>
        </div>
        <fieldset class="group">
          <legend>What would you like to achieve? <em>(choose any)</em></legend>
          <div class="chips">${goals.map(([ic, g]) => chip('checkbox', 'goals', g, ic)).join('')}</div>
        </fieldset>
        <div class="form-grid">
          <label class="field full"><span>Describe your land and your vision *</span><textarea name="message" required placeholder="What is the land like today? Any problems with water, soil, erosion or time? What would you love it to become?"></textarea></label>
          <label class="field"><span>Link to photos, video or map <em>(optional)</em></span><input type="url" name="media_link" placeholder="Google Drive, Maps pin, YouTube..."></label>
          <label class="field"><span>Budget range</span>
            <select name="budget"><option value="">Not sure yet</option><option>Under UGX 2 million</option><option>UGX 2 to 10 million</option><option>UGX 10 to 50 million</option><option>Over UGX 50 million</option></select>
          </label>
        </div>
        <div class="wz-nav"><button type="button" class="btn btn--secondary" data-back>${icon('arrow-left')} Back</button><button type="button" class="btn btn--primary" data-next>Next: Pick a Time ${icon('arrow-right')}</button></div>
      </fieldset>

      <fieldset class="wz-step" data-step="3" hidden>
        <legend class="sr-only">Pick a time</legend>
        <h3>Choose a date and time</h3>
        <div class="wz-embed" data-embed hidden></div>
        <div class="cal-wrap" data-calendar>
          <div class="cal">
            <div class="cal-head">
              <button type="button" class="cal-nav" data-cal-prev aria-label="Previous month">${icon('chevron-left')}</button>
              <strong class="cal-title" aria-live="polite"></strong>
              <button type="button" class="cal-nav" data-cal-next aria-label="Next month">${icon('chevron-right')}</button>
            </div>
            <div class="cal-dow" aria-hidden="true"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
            <div class="cal-grid" role="grid" aria-label="Available dates"></div>
          </div>
          <div class="cal-side">
            <p class="cal-day-label">Select a date to see times</p>
            <div class="cal-slots" role="group" aria-label="Available times"></div>
            <p class="cal-tz">${icon('globe')} Times shown in East Africa Time (EAT, UTC+3)</p>
          </div>
        </div>
        <input type="hidden" name="call_date"><input type="hidden" name="call_time">
        <div class="wz-summary" data-summary hidden></div>
        <p class="cal-err err" data-slot-error hidden>Please choose a date and time for your call.</p>
        <div class="wz-nav"><button type="button" class="btn btn--secondary" data-back>${icon('arrow-left')} Back</button><button type="submit" class="btn btn--primary" data-submit>Confirm My Call ${icon('check')}</button></div>
        <p class="form-note">${icon('lock')} ${liveCal ? 'Free and no obligation. You&rsquo;ll get a calendar invite with your Webex link by email.' : 'Free and no obligation. We&rsquo;ll confirm your time by WhatsApp or email.'} <a href="/privacy-policy/">Privacy Policy</a></p>
      </fieldset>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>
    <div class="prep" data-reveal>
      <h3>${icon('clipboard-check')} Helpful to have ready</h3>
      <ul>
        <li>${icon('map-pin')} Location of the land, or a Google Maps pin</li>
        <li>${icon('ruler')} Rough size of the land</li>
        <li>${icon('camera')} A few photos or a short video</li>
        <li>${icon('target')} Your main goals and rough budget</li>
        <li>${icon('file-text')} Any maps, site plans or soil tests</li>
        <li>${icon('video')} Webex installed, camera and mic tested</li>
      </ul>
    </div>
  </div>
</section>`;
}

const contact = {
  path: '/contact/', active: 'contact', title: 'Contact',
  description: 'Book a free consultation with Permavia Landscapes in Hoima City, Uganda. Call, chat on WhatsApp or request an on-site visit for your home, farm or business.',
  body: `
${pageHero({
  eyebrow: 'Get in Touch',
  title: "Let's Design Your Future <em>Landscape</em>",
  lead: 'Tell us about your land and your goals. Your first consultation is free, and we usually reply within a few hours.',
  image: img('11-contact__01-hero__background'),
  crumbs: [['Contact']],
  actions: `<a class="btn btn--primary btn--lg" href="#book">${icon('calendar-days')} Schedule a Free Call</a><a class="btn btn--wa btn--lg" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>`,
})}

<section class="section" style="padding-top:0" aria-label="Ways to reach us">
  <div class="container">
    <div class="grid grid-3 option-cards" data-stagger>
      <div class="card option">
        <span class="ic-badge">${icon('phone-call')}</span>
        <h3>Schedule a Call</h3>
        <p>A free 30-minute Webex video call to talk through your project, your land and what's possible.</p>
        <p class="meta">${icon('video')} ${callDaysText()} · on Webex</p>
        <a class="btn btn--primary" href="#book">Book a Call ${icon('arrow-right')}</a>
      </div>
      <div class="card option is-wa">
        <span class="ic-badge">${waIcon()}</span>
        <h3>Chat on WhatsApp</h3>
        <p>Send us a message, photos or a location pin of your land. The quickest way to reach us.</p>
        <p class="meta">${icon('zap')} We reply within a few hours</p>
        <a class="btn btn--wa" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Start Chat</a>
      </div>
      <div class="card option">
        <span class="ic-badge">${icon('map-pinned')}</span>
        <h3>On-Site Consultation</h3>
        <p>We visit your site to observe slopes, soil and water, then share clear recommendations.</p>
        <p class="meta">${icon('map-pin')} Western Uganda &amp; beyond</p>
        <a class="btn btn--secondary" href="/contact/?type=visit#enquiry" data-visit>Request a Visit ${icon('arrow-right')}</a>
      </div>
    </div>
  </div>
</section>

${booking()}

<section class="section section--sage" id="enquiry" aria-labelledby="form-title">
  <div class="container contact-grid">
    <form class="enquiry" data-form="contact" novalidate data-reveal>
      <p class="eyebrow">Project Enquiry</p>
      <h2 id="form-title">We'd Love to Hear About Your <em>Project</em></h2>
      <p>The more you share, the more useful our first conversation will be. Fields marked * are required.</p>
      <div class="form-grid">
        <label class="field"><span>Full name *</span><input name="name" autocomplete="name" required></label>
        <label class="field"><span>Phone / WhatsApp *</span><input type="tel" name="phone" autocomplete="tel" required placeholder="+256 ..."></label>
        <label class="field"><span>Email *</span><input type="email" name="email" autocomplete="email" required></label>
        <label class="field"><span>Location of your land *</span><input name="location" required placeholder="e.g. Hoima, Masindi, Kampala"></label>
      </div>
      <fieldset>
        <legend>Project type *</legend>
        <div class="chips">
          ${['Home', 'Farm', 'Business', 'NGO / Community'].map((t, i) => `<label><input type="radio" name="project_type" value="${t}"${i === 0 ? ' required' : ''}><span>${icon(['house', 'tractor', 'building-2', 'heart-handshake'][i])} ${t}</span></label>`).join('')}
        </div>
      </fieldset>
      <div class="form-grid">
        <label class="field"><span>Service</span>
          <select name="service" id="enquiry-service">
            <option value="">Choose a service</option>
            ${services.map(([k, l]) => `<option data-key="${k}" value="${l}">${l}</option>`).join('')}
          </select>
        </label>
        <label class="field"><span>Land size</span>
          <select name="land_size">
            <option value="">Choose a size</option>
            <option>Under 1/4 acre (compound or garden)</option><option>1/4 to 1 acre</option><option>1 to 5 acres</option><option>5 to 20 acres</option><option>Over 20 acres</option>
          </select>
        </label>
        <label class="field full"><span>Budget range</span>
          <select name="budget">
            <option value="">Choose a range (optional)</option>
            <option>Under UGX 2 million</option><option>UGX 2 to 10 million</option><option>UGX 10 to 50 million</option><option>Over UGX 50 million</option><option>Not sure yet</option>
          </select>
        </label>
        <label class="field full"><span>Tell us about your project *</span><textarea name="message" required placeholder="What would you like your land to become? Any challenges with water, soil or time?"></textarea></label>
        <label class="field full" style="display:flex;gap:10px;align-items:center"><input type="checkbox" name="site_visit" value="Yes" id="visit" style="width:18px;height:18px;flex:none;appearance:auto"><span style="font-weight:500">I'd like an on-site consultation</span></label>
      </div>
      <button class="btn btn--primary btn--lg" type="submit">Send My Enquiry ${icon('send')}</button>
      <p class="form-note">${icon('lock')} Your details are only used to reply to your enquiry. <a href="/privacy-policy/">Privacy Policy</a></p>
      <div class="form-status" role="status" aria-live="polite"></div>
    </form>

    <aside data-reveal style="--d:.1s">
      <div class="side-card">
        <h3>Contact Details</h3>
        <ul>
          <li>${icon('map-pin')}<div><strong>Location</strong>${site.location}</div></li>
          <li>${icon('phone')}<div><strong>Phone</strong><a href="tel:${site.phoneHref}">${site.phone}</a></div></li>
          <li>${icon('mail')}<div><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></div></li>
          <li>${icon('clock')}<div><strong>Opening hours</strong>${site.hours}</div></li>
          <li>${icon('map')}<div><strong>Areas we serve</strong>${site.serviceAreas.join(' · ')} and across East Africa</div></li>
        </ul>
        <p class="side-faq">${icon('circle-help')} Questions about cost or site visits? <a href="/faq/">Read our FAQ</a></p>
        <a class="btn btn--wa btn--block" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>
      </div>
      <div class="map">
        <iframe title="Map showing Hoima City, Uganda" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Hoima%20City%2C%20Uganda&z=12&output=embed"></iframe>
      </div>
    </aside>
  </div>
</section>`,
};

const thanks = {
  path: '/thank-you/', active: '', title: 'Thank You', bodyClass: 'is-plain', noindex: true,
  description: 'Thank you for contacting Permavia Landscapes.',
  body: `
<section class="center-page">
  <div>
    <div class="ic-big">${icon('check')}</div>
    <div data-thanks="enquiry">
      <p class="eyebrow" style="justify-content:center">Enquiry Received</p>
      <h1>Thank You. We'll Be in <em>Touch</em> Soon.</h1>
      <p>Your project enquiry has reached our team. We usually reply within a few hours during opening hours (${site.hours}). For anything urgent, message us on WhatsApp.</p>
    </div>
    <div data-thanks="confirmed" hidden>
      <p class="eyebrow" style="justify-content:center">Call Booked</p>
      <h1>Your Discovery Call Is <em>Booked</em></h1>
      <p class="booked-when" data-booked-when></p>
      <p>A calendar invite with your Webex link is on its way to your email.</p>
      <div class="webex-ready">
        <h2>${icon('video')} Get ready for your Webex call</h2>
        <ol>
          <li>Install the free <strong>Webex</strong> app on your phone or computer, or plan to join from your web browser.</li>
          <li>Test your camera, microphone and internet a day before.</li>
          <li>Have a few photos of your land and a location pin ready to share.</li>
          <li>Join from the link in your email a few minutes early.</li>
        </ol>
      </div>
      <p>Need to change the time? Use the link in your confirmation email, or message us on WhatsApp.</p>
    </div>
    <div data-thanks="booked" hidden>
      <p class="eyebrow" style="justify-content:center">Call Requested</p>
      <h1>Your Discovery Call Is <em>Requested</em></h1>
      <p class="booked-when" data-booked-when></p>
      <p>We'll confirm your time and send your Webex link by email within a few working hours. Please have Webex ready before the call (the free app, or join from your browser), and gather a few photos of your land and a location pin.</p>
    </div>
    <div class="hero-actions">
      <a class="btn btn--wa" href="${waLink()}" target="_blank" rel="noopener">${waIcon()} Chat on WhatsApp</a>
      <a class="btn btn--secondary" href="/blog/">Read the Journal</a>
    </div>
  </div>
</section>`,
};

const notFound = {
  path: '/404/', active: '', title: 'Page Not Found', bodyClass: 'is-plain', noindex: true,
  description: 'This page could not be found.',
  body: `
<section class="center-page">
  <div>
    <div class="ic-big">${icon('sprout')}</div>
    <p class="eyebrow" style="justify-content:center">Error 404</p>
    <h1>This Path Hasn't Been <em>Planted</em> Yet</h1>
    <p>The page you're looking for has moved or doesn't exist. Let's get you back on track.</p>
    <div class="hero-actions">
      <a class="btn btn--primary" href="/">Back to Home ${icon('arrow-right')}</a>
      <a class="btn btn--secondary" href="/contact/">Contact Us</a>
    </div>
  </div>
</section>`,
};

module.exports = [contact, thanks, notFound];
