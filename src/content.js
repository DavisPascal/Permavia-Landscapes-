// Reads CMS content (Markdown files with YAML front matter) from content/blog and content/events.
// Decap CMS (/admin) writes these files; build.js turns them into pages. No packages needed:
// the small YAML and Markdown readers below cover everything Decap writes.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content');

// ── YAML (front matter) ──────────────────────────────────────
// Supports maps, lists (incl. lists of maps), plain/quoted/multi-line strings,
// block scalars (| and >), flow lists [a, b], booleans and null.
function parseYaml(src) {
  const lines = src.replace(/\t/g, '  ').split(/\r?\n/).map((raw) => ({ raw, indent: raw.match(/^ */)[0].length, text: raw.trim() }));
  let i = 0;
  const skip = () => { while (i < lines.length && (!lines[i].text || lines[i].text.startsWith('#'))) i++; };

  const unquote = (s) => {
    s = s.trim();
    if (s.startsWith('"') && s.endsWith('"') && s.length > 1) {
      return s.slice(1, -1).replace(/\\(u[0-9a-fA-F]{4}|.)/g, (_, c) => (c[0] === 'u' ? String.fromCharCode(parseInt(c.slice(1), 16)) : ({ n: '\n', t: '\t', r: '\r', '"': '"', '\\': '\\', '/': '/', ' ': ' ' }[c] ?? c)));
    }
    if (s.startsWith("'") && s.endsWith("'") && s.length > 1) return s.slice(1, -1).replace(/''/g, "'");
    return s;
  };
  const scalar = (s) => {
    const t = s.trim();
    if (t === '' || t === '~' || t === 'null') return null;
    if (t === 'true') return true;
    if (t === 'false') return false;
    if (t.startsWith('[') && t.endsWith(']')) {
      const inner = t.slice(1, -1).trim(); if (!inner) return [];
      const parts = []; let cur = '', q = '';
      for (let k = 0; k < inner.length; k++) {
        const ch = inner[k];
        if (q) { cur += ch; if (ch === '\\' && q === '"') { cur += inner[++k] || ''; } else if (ch === q) q = ''; continue; }
        if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
        if (ch === ',') { parts.push(cur); cur = ''; continue; }
        cur += ch;
      }
      parts.push(cur);
      return parts.map((x) => scalar(x));
    }
    return unquote(t);
  };
  // A scalar may continue on following, more-indented lines (long strings get wrapped).
  const continued = (first, minIndent) => {
    let out = first;
    while (i < lines.length && (lines[i].text === '' || lines[i].indent > minIndent)) {
      if (lines[i].text === '') {
        let j = i; while (j < lines.length && lines[j].text === '') j++;
        if (j >= lines.length || lines[j].indent <= minIndent) break;
        out += '\n'; i = j; continue;
      }
      out += (out.endsWith('\n') ? '' : ' ') + lines[i].text; i++;
    }
    return out;
  };
  const block = (indicator, minIndent) => {
    const fold = indicator[0] === '>'; const chomp = indicator[1];
    const body = [];
    while (i < lines.length && (lines[i].text === '' || lines[i].indent > minIndent)) { body.push(lines[i]); i++; }
    while (body.length && body[body.length - 1].text === '') body.pop();
    const ind = Math.min(...body.filter((l) => l.text).map((l) => l.indent), Infinity);
    const raw = body.map((l) => (l.text ? l.raw.slice(ind) : ''));
    let s = fold ? raw.join('\n').replace(/([^\n])\n(?=[^\n])/g, '$1 ') : raw.join('\n');
    if (chomp !== '-') s += '\n';
    return chomp === '+' ? s : s.replace(/\n+$/, chomp === '-' ? '' : '\n');
  };
  const value = (rest, indent) => {
    const r = rest.trim();
    if (/^[|>][-+]?$/.test(r)) return block(r, indent);
    if (r === '') {
      skip();
      if (i < lines.length && (lines[i].indent > indent || (lines[i].indent === indent && /^-( |$)/.test(lines[i].text)))) return parseNode(lines[i].indent);
      return null;
    }
    if (/^["']/.test(r) && !(r.length > 1 && r.endsWith(r[0]))) return scalar(continued(r, indent)); // quoted string wrapped over lines
    return scalar(continued(r, indent));
  };
  function parseNode(indent) {
    skip();
    if (i >= lines.length) return null;
    if (/^-( |$)/.test(lines[i].text)) {
      const arr = [];
      while (i < lines.length) {
        skip(); if (i >= lines.length) break;
        const l = lines[i];
        if (l.indent !== indent || !/^-( |$)/.test(l.text)) break;
        const rest = l.text.replace(/^-\s?/, '');
        const itemIndent = indent + (l.text.length - rest.length);
        if (/^[^"'\s][^:]*:(\s|$)/.test(rest) && !/^\w+:\/\//.test(rest)) {
          // "- key: value" starts a map; treat the rest of the line as its first key
          lines[i] = { raw: ' '.repeat(itemIndent) + rest, indent: itemIndent, text: rest };
          arr.push(parseNode(itemIndent));
        } else { i++; arr.push(value(rest, indent)); }
      }
      return arr;
    }
    const obj = {};
    while (i < lines.length) {
      skip(); if (i >= lines.length) break;
      const l = lines[i];
      if (l.indent !== indent) break;
      const m = l.text.match(/^("(?:[^"\\]|\\.)*"|'(?:[^']|'')*'|[^:]+?):(\s+|$)(.*)$/);
      if (!m) break;
      i++;
      obj[unquote(m[1])] = value(m[3], indent);
    }
    return obj;
  }
  return parseNode(0) || {};
}

function frontMatter(text) {
  const m = text.replace(/^﻿/, '').match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  return { data: parseYaml(m[1]), body: m[2] };
}

// ── Markdown → HTML ──────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const safeUrl = (u) => (/^(https?:|mailto:|tel:|\/|#)/i.test(u.trim()) ? u.trim() : '#');
function inline(text) {
  const stash = [];
  const keep = (html) => `\u0000${stash.push(html) - 1}\u0000`;
  let s = String(text)
    .replace(/\\([\\`*_{}[\]()#+\-.!>~|])/g, (_, c) => keep(esc(c)))
    .replace(/`([^`]+)`/g, (_, c) => keep(`<code>${esc(c)}</code>`))
    .replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, alt, src, title) => keep(`<img src="${esc(safeUrl(src))}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`))
    .replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (_, label, href, title) => {
      const ext = /^https?:/i.test(href);
      return keep(`<a href="${esc(safeUrl(href))}"${title ? ` title="${esc(title)}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>`) + label + keep('</a>');
    })
    .replace(/<(https?:\/\/[^>\s]+)>/g, (_, u) => keep(`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a>`))
    .replace(/<br\s*\/?>/gi, () => keep('<br>'));
  s = esc(s)
    .replace(/(\*\*|__)(?=\S)([\s\S]*?\S)\1/g, '<strong>$2</strong>')
    .replace(/(\*|_)(?=\S)([\s\S]*?\S)\1(?![\w*])/g, '<em>$2</em>')
    .replace(/~~(?=\S)([\s\S]*?\S)~~/g, '<del>$1</del>')
    .replace(/ {2,}\n|\\\n/g, '<br>\n');
  return s.replace(/\u0000(\d+)\u0000/g, (_, n) => stash[+n]);
}
function markdown(src) {
  const lines = String(src || '').replace(/\r\n?/g, '\n').split('\n');
  const out = []; let i = 0;
  const isBlockStart = (l) => /^(#{1,6}\s|>|```|~~~|\s*([-*+]|\d+[.)])\s+|(\*\s*){3,}$|(-\s*){3,}$|(_\s*){3,}$|<(div|figure|table|iframe|section|aside|details)\b)/.test(l);
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    let m;
    if ((m = l.match(/^(```|~~~)\s*([\w-]*)/))) {
      const fence = m[1]; const code = []; i++;
      while (i < lines.length && !lines[i].startsWith(fence)) code.push(lines[i++]);
      i++; out.push(`<pre><code>${esc(code.join('\n'))}</code></pre>`); continue;
    }
    if ((m = l.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/))) { const n = Math.max(2, m[1].length); out.push(`<h${n}>${inline(m[2])}</h${n}>`); i++; continue; }
    if (/^((\*\s*){3,}|(-\s*){3,}|(_\s*){3,})$/.test(l.trim())) { out.push('<hr>'); i++; continue; }
    if (/^>/.test(l)) {
      const q = []; while (i < lines.length && /^>/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${markdown(q.join('\n'))}</blockquote>`); continue;
    }
    if ((m = l.match(/^(\s*)([-*+]|\d+[.)])\s+/))) {
      const ordered = /\d/.test(m[2]); const items = [];
      while (i < lines.length) {
        const mm = lines[i].match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
        if (mm && (/\d/.test(mm[2]) === ordered)) { items.push(mm[3]); i++; continue; }
        if (lines[i].trim() && /^\s{2,}/.test(lines[i]) && items.length) { items[items.length - 1] += '\n' + lines[i].trim(); i++; continue; }
        if (!lines[i].trim() && i + 1 < lines.length && /^(\s*)([-*+]|\d+[.)])\s+/.test(lines[i + 1])) { i++; continue; }
        break;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((t) => `<li>${inline(t)}</li>`).join('')}</${tag}>`); continue;
    }
    if (/^<(div|figure|table|iframe|section|aside|details)\b/.test(l)) { // raw HTML block, passed through
      const h = []; while (i < lines.length && lines[i].trim()) h.push(lines[i++]); out.push(h.join('\n')); continue;
    }
    const p = []; while (i < lines.length && lines[i].trim() && !(p.length && isBlockStart(lines[i]))) p.push(lines[i++]);
    out.push(`<p>${inline(p.join('\n'))}</p>`);
  }
  return out.join('\n');
}
const plainText = (md) => String(md || '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#>*_`~]/g, '').replace(/\s+/g, ' ').trim();

// ── Loading ──────────────────────────────────────────────────
const read = (dir) => {
  const d = path.join(ROOT, dir);
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d).filter((f) => f.endsWith('.md')).map((f) => {
    const { data, body } = frontMatter(fs.readFileSync(path.join(d, f), 'utf8'));
    return { file: `content/${dir}/${f}`, data, body };
  });
};
const slugOf = (s) => String(s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dateStr = (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v || '').slice(0, 10));
const timeStr = (v) => { const m = String(v || '').match(/(\d{1,2}):(\d{2})/); return m ? `${m[1].padStart(2, '0')}:${m[2]}` : ''; };
const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s);

function loadPosts() {
  const seen = new Set();
  return read('blog').map(({ file, data: d, body }) => {
    const slug = slugOf(d.slug || path.basename(file, '.md'));
    if (seen.has(slug)) throw new Error(`Two blog posts use the slug "${slug}" (${file}). Each article needs its own URL slug.`);
    seen.add(slug);
    const text = plainText(body);
    return {
      slug, file,
      title: d.title || slug,
      published: d.published !== false && d.draft !== true,
      date: dateStr(d.date),
      author: d.author || 'Permavia Team',
      category: d.category || '',
      tags: Array.isArray(d.tags) ? d.tags.filter(Boolean) : [],
      image: d.image || '',
      imageAlt: d.image_alt || d.title || '',
      excerpt: d.excerpt || clip(text, 160),
      seoTitle: d.seo_title || '',
      seoDescription: d.seo_description || d.excerpt || clip(text, 155),
      summary: d.summary || '',
      faqs: Array.isArray(d.faqs) ? d.faqs.filter((f) => f && f.question && f.answer).map((f) => [f.question, inline(f.answer)]) : [],
      read: Math.max(1, Math.round(text.split(/\s+/).length / 200)),
      body: markdown(body),
    };
  }).filter((p) => p.published).sort((a, b) => b.date.localeCompare(a.date));
}

const EVENT_STATUS = ['upcoming', 'completed', 'cancelled'];
function loadEvents() {
  const seen = new Set();
  return read('events').map(({ file, data: d, body }) => {
    const slug = slugOf(d.slug || path.basename(file, '.md'));
    if (seen.has(slug)) throw new Error(`Two events use the slug "${slug}" (${file}). Each event needs its own URL slug.`);
    seen.add(slug);
    const startDate = dateStr(d.start_date); const endDate = dateStr(d.end_date) || startDate;
    const status = EVENT_STATUS.includes(String(d.status).toLowerCase()) ? String(d.status).toLowerCase() : 'upcoming';
    const text = plainText(body);
    return {
      slug, file, title: d.title || slug, status,
      published: d.published !== false,
      image: d.image || '', imageAlt: d.image_alt || d.title || '',
      startDate, startTime: timeStr(d.start_time), endDate, endTime: timeStr(d.end_time),
      venue: d.venue || '', registration: d.registration_url || '', price: d.price || '',
      excerpt: d.excerpt || clip(text, 160),
      body: markdown(body),
    };
  }).filter((e) => e.published && e.startDate).sort((a, b) => (a.startDate + a.startTime).localeCompare(b.startDate + b.startTime));
}

module.exports = { loadPosts, loadEvents, markdown, inline, parseYaml, frontMatter, slugOf };
