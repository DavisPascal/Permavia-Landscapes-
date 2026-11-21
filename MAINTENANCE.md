# Going live and switching maintenance mode

How to put the Permavia site on **Netlify**, connect your **Namecheap** domain, and switch the
**"We'll be back soon"** page on and off.

---

## Part 1: First upload to Netlify (one time)

1. Open a terminal in the project folder and build the normal site:
   ```bash
   npm run build
   ```
2. Go to **app.netlify.com** → sign up or log in (free) → **Add new site → Deploy manually**.
3. Drag the whole **`public`** folder onto the upload box.
4. After about a minute the site is live at an address like `permavia-xyz.netlify.app`.
5. Rename it: **Site configuration → Change site name** → e.g. `permavia`.

> Every later update works the same way: build, then drag `public` onto **Deploys** in Netlify.

---

## Part 2: Connect your Namecheap domain (one time)

**In Netlify:** **Domain management → Add a domain** → type your domain (e.g. `permavialandscapes.com`) → **Verify → Add domain**.

Then choose **one** of these two options in Namecheap.

### Option A: let Netlify manage the domain (simplest, recommended)
1. Netlify shows you **4 nameservers** (they look like `dns1.p01.nsone.net`).
2. In **Namecheap → Domain List → Manage** (next to your domain) → **Nameservers** → choose **Custom DNS**.
3. Paste the 4 Netlify nameservers and click the ✓ to save.

⚠️ If you use email on this domain (e.g. Namecheap Private Email or Google Workspace), add its **MX records**
in **Netlify → Domains → DNS settings** too, or your email will stop working.

### Option B: keep Namecheap's DNS
In **Namecheap → Domain List → Manage → Advanced DNS**, delete any "parking page" records, then add:

| Type | Host | Value |
|---|---|---|
| A Record | `@` | `75.2.60.5` |
| CNAME Record | `www` | `your-site-name.netlify.app` |

### Then
- Wait. DNS changes take from a few minutes up to 48 hours.
- **HTTPS** (the padlock) turns on automatically: **Domain management → HTTPS**. Click **Verify DNS configuration** if it asks.
- Put the domain in `src/site.js` → `url: 'https://yourdomain.com'`, run `npm run build`, and upload again. This turns on the sitemap.
- In **Google Search Console**, add the domain and submit `https://yourdomain.com/sitemap.xml`.

---

## Part 3: Switching maintenance mode ON and OFF

While maintenance is **ON**, every page on the site (Home, Services, any old link) takes visitors
to the **"We're Tending the Garden"** page, which still shows your WhatsApp, phone and email.
It uses a *temporary* redirect, so Google keeps your pages in search.

### Before you switch it on (optional)
Change the wording in `src/site.js` → `maintenance`:
```js
maintenance: {
  on: false,
  headline: "We're Tending the Garden",
  message: "Our website is getting some care…",
  backBy: 'Monday 18 November, 9am EAT',   // shown as "Expected back: …", leave '' to hide
},
```

### ✅ Turn maintenance ON
```bash
npm run build:maintenance
```
The terminal says **"MAINTENANCE MODE IS ON"**. Then in Netlify → **Deploys** → drag the `public` folder in.
Within a minute every page shows the maintenance page.

### ⛔ Turn maintenance OFF
```bash
npm run build
```
The terminal says **"Maintenance mode: OFF"**. Drag `public` into **Deploys** again. The full site is back.

### ⚡ Fastest way: switch from your phone, no computer needed
Netlify keeps every upload in **Deploys**. Once you have uploaded both versions at least once:

- **To go into maintenance:** **Deploys** → click the deploy you made with `build:maintenance` → **Publish deploy**.
- **To come back:** **Deploys** → click your latest *normal* deploy → **Publish deploy**.

It switches instantly. Tip: when you upload, Netlify lets you add a note to a deploy; call them
"MAINTENANCE" and "NORMAL" so they're easy to spot.

⚠️ Make sure you publish the **newest** normal deploy, or you'll bring back an older copy of the site.

### Check it worked
Open your site in a private/incognito window. Any page should show the maintenance page while it's ON,
and your normal Home page when it's OFF.

---

## Testing on your computer first

- `npm run build:maintenance` then `npm run dev` → open http://localhost:4321: every page goes to the maintenance page.
- `npm run build` → refresh: the normal site is back.

The preview keeps whichever mode you last built, even while it rebuilds after your edits.

---

## Later: connecting GitHub (optional)

If you move the site to GitHub and connect it to Netlify, Netlify builds it for you on every change
(`netlify.toml` is already set up). Then switch maintenance by setting `maintenance.on: true` or `false`
in `src/site.js` and pushing the change, or use the **Publish deploy** trick above.
