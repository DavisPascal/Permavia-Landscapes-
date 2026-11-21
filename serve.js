// Local preview server for the built site in public/. Usage: npm run dev
// Edits in src/ rebuild the site automatically; refresh the browser to see them.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'public');
const PORT = process.env.PORT || 4321;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain',
};

// Rebuild automatically when anything in src/ (or build.js) is saved.
const { execFile } = require('child_process');
let timer = null;
// Keep whichever mode was last built (normal or maintenance) when rebuilding.
const inMaintenance = () => {
  const f = path.join(ROOT, '_redirects');
  return fs.existsSync(f) && fs.readFileSync(f, 'utf8').startsWith('# MAINTENANCE MODE ON');
};
const rebuild = (why) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const args = [path.join(__dirname, 'build.js')].concat(inMaintenance() ? ['--maintenance'] : []);
    execFile(process.execPath, args, (err, out, errOut) => {
      if (err) console.error(`\n✖ Build failed after editing ${why}:\n${errOut || err.message}`);
      else console.log(`✔ Rebuilt after editing ${why}${inMaintenance() ? ' (MAINTENANCE MODE ON)' : ''}. Refresh the browser.`);
    });
  }, 150);
};
rebuild('startup');
fs.watch(path.join(__dirname, 'src'), { recursive: true }, (_, f) => rebuild(`src/${f}`));
fs.watch(path.join(__dirname, 'build.js'), () => rebuild('build.js'));

// Apply the same security headers Netlify will use (the "/*" block of public/_headers),
// so problems show up here first. HSTS is skipped locally (no HTTPS on localhost).
const securityHeaders = () => {
  const f = path.join(ROOT, '_headers');
  if (!fs.existsSync(f)) return {};
  const out = {};
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  let inAll = false;
  for (const line of lines) {
    if (/^\S/.test(line)) { inAll = line.trim() === '/*'; continue; }
    const m = inAll && line.match(/^\s+([\w-]+):\s*(.+)$/);
    if (m && m[1] !== 'Strict-Transport-Security') out[m[1]] = m[2].replace(/;?\s*upgrade-insecure-requests/, '');
  }
  return out;
};

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch (e) { res.writeHead(400, { 'Content-Type': 'text/plain' }); return res.end('Bad request'); }
  const sec = securityHeaders();
  const writeHead = res.writeHead.bind(res);
  res.writeHead = (code, headers = {}) => writeHead(code, Object.assign({}, sec, headers));
  // Behave like Netlify in maintenance mode: send every page to /maintenance/.
  const redirects = path.join(ROOT, '_redirects');
  if (fs.existsSync(redirects) && fs.readFileSync(redirects, 'utf8').startsWith('# MAINTENANCE MODE ON')
      && !p.startsWith('/assets/') && !p.startsWith('/maintenance/')) {
    res.writeHead(302, { Location: '/maintenance/' }); return res.end();
  }
  let file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) {
    if (!p.endsWith('/') && fs.existsSync(path.join(ROOT, p, 'index.html'))) {
      res.writeHead(301, { Location: p + '/' }); return res.end();
    }
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    return fs.createReadStream(path.join(ROOT, '404', 'index.html')).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Permavia preview: http://localhost:${PORT}`));
