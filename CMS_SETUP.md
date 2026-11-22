# Content Manager (Decap CMS): setup and testing

The website has a content manager at **`/admin/`** for two things only:

- **Blog & Insights**: articles on `/blog/` (each at `/blog/<slug>/`)
- **Events**: workshops, field days, tours and trainings on `/our-events/` (each at `/our-events/<slug>/`)

Everything else (homepage, services, about, projects…) is unchanged and still edited in the code.

## How it works

1. You write or edit an article or event at `/admin/` and click **Publish** (in the CMS this means "save").
2. Decap saves it as a Markdown file in `content/blog/` or `content/events/` and commits it to the **`Development`** branch on GitHub. Photos go to `public/uploads/` and are shown at `/uploads/…`.
3. Netlify sees the new commit and rebuilds the Development preview (if branch deploys are on). `build.js` turns the files into normal web pages, the blog/events lists, the sitemap and Google's structured data.
4. **The live site (`main`) does not change** until you approve and merge Development into main.

Notes:
- **Drafts:** untick **Published** on an article to keep it as a draft. It's saved but never shown.
- **Upcoming events** show automatically. After the end date, an event hides itself from the list (even before the next rebuild) and moves to "Previous Events" at the next build. Set the status to **Completed** or **Cancelled** to change its label.
- **URL slug:** this is the page address. Don't change it after publishing, or links to the old address will break.
- **Photos:** upload landscape photos of **at most 1.5 MB**, about 1600 px wide (JPG or WebP), and always fill in the image description (alt text). Larger photos are refused with a "file too large" message: they time out on slow connections and load slowly for visitors. To shrink a phone photo, use an app or a site like squoosh.app (resize to 1600 px wide, quality about 75%).

## One-time setup on GitHub and Netlify (about 10 minutes)

The CMS signs people in with their **GitHub account**, through **Netlify**. Only people with write access to the GitHub repository can edit.

1. **Create a GitHub OAuth app**
   GitHub → your profile picture → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
   - Application name: `Permavia CMS`
   - Homepage URL: `https://www.permavialandscapes.com` (or your `…netlify.app` address until the domain is connected)
   - Authorization callback URL: **`https://api.netlify.com/auth/done`**
   Click **Register application**, then **Generate a new client secret**. Keep the page open.
2. **Connect it in Netlify**
   Netlify → your site → **Site configuration** → **Access & security** → **OAuth** → **Install provider** → **GitHub** → paste the **Client ID** and **Client secret** → **Install**.
3. **(Recommended) Turn on the Development preview**
   Netlify → **Site configuration** → **Build & deploy** → **Branches and deploy contexts** → **Branch deploys** → add **`Development`**.
   The Development branch then gets its own preview address, e.g. `https://development--YOUR-SITE.netlify.app`, which rebuilds after every CMS save. The live site is not affected.
4. **Give editors access**: GitHub repository → **Settings** → **Collaborators** → add each editor's GitHub account (write access).

Steps 2 and 3 change Netlify settings, so they're done by you (or with you, on your approval).

## Testing locally (on this computer)

**Preview the website only:** double-click `start.cmd` and open http://localhost:4321. Articles and events from `content/` are included, and the preview rebuilds when a file in `content/` changes.

**Use the CMS locally (no sign-in, saves straight to your computer):**
1. Start the preview (`start.cmd`).
2. Open a second terminal in the project folder and run:
   ```
   npx decap-server
   ```
   The first time, this downloads Decap's small local helper from npm (internet needed). Keep the window open.
3. Open **http://localhost:4321/admin/**. You'll go straight into the editor, without logging in.
4. Create or edit an article or event and click **Publish**. The file appears in `content/…`, the preview rebuilds, and you can check http://localhost:4321/blog/ or /our-events/.
5. Local saves are **not** sent to GitHub. Ask for them to be committed and pushed to Development.

Without `npx decap-server` running, `/admin/` on localhost shows the normal "Login with GitHub" screen, which only works once the Netlify setup above is done.

## Testing on Netlify

1. Do the one-time setup above (OAuth app + Netlify provider + Development branch deploys).
2. Open **`https://development--YOUR-SITE.netlify.app/admin/`** and click **Login with GitHub**.
3. Create a test article with **Published** switched off (a draft), then publish it, then switch Published on. Each save makes a commit on the Development branch.
4. Wait about a minute for the Development preview to rebuild, then check `/blog/` on the preview address.
5. Delete the test article in the CMS afterwards. Its page is removed at the next build.
6. When you're happy, ask for Development to be prepared for merging into `main` to go live.

**If login fails on the preview address:** Netlify may need the site's main address for sign-in. Add `site_domain: YOUR-SITE.netlify.app` under `backend:` in `public/admin/config.yml`.

## Where things are

| What | Where |
|---|---|
| CMS page and settings | `public/admin/index.html`, `public/admin/config.yml` (fields, categories, tags) |
| Articles | `content/blog/<slug>.md` |
| Events | `content/events/<slug>.md` |
| Uploaded photos | `public/uploads/` (shown at `/uploads/…`) |
| Reading the files | `src/content.js` (front matter + Markdown, no extra packages) |
| Pages | `src/pages/blog.js`, `src/pages/events-privacy.js` |

Blog **categories and tags** must match the lists in `src/data.js` (`blogCategories`, `blogTags`) **and** the options in `public/admin/config.yml`. Change both together.
