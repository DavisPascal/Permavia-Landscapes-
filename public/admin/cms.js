/* Permavia Landscapes: CMS preview settings.
   Uses the website's own stylesheet in the preview pane so articles and events look like the site. */
(function () {
  if (!window.CMS) return;
  window.CMS.registerPreviewStyle('/assets/css/styles.css');
  window.CMS.registerPreviewStyle(
    'body{background:#F9FDF3;padding:24px;font-family:Poppins,system-ui,sans-serif;color:#333;line-height:1.8}' +
    'h1,h2,h3{font-family:Montserrat,system-ui,sans-serif;color:#1A1A1A}img{max-width:100%;height:auto;border-radius:16px}',
    { raw: true }
  );
})();
