/* Google Analytics 4 setup, loaded only when an ID is set in src/site.js (kept out of the page so no inline code is needed). */
(function () {
  var id;
  try { id = JSON.parse(document.getElementById('site-config').textContent).analytics; } catch (e) { return; }
  if (!id) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);
})();
