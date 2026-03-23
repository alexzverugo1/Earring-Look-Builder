# Banter-inspired Earring Look Builder

## Routes (shareable URLs)

| Path | Page |
|------|------|
| `/` | Landing |
| `/quiz/1` … `/quiz/4` | Quiz steps |
| `/quiz/loading` | Quiz loading |
| `/results` | Recommendations |
| `/canvas` | Ear canvas picker |
| `/builder` | Stack builder |
| `/review` | Review |

## Static images

Product and marketing images are served from [`public/`](public/) and registered in [`src/data/publicImages.ts`](src/data/publicImages.ts). Add new `.avif` (or other) files under `public/` and reference them with root-relative paths (e.g. `/V-20611403_0_260.avif`).

## Production hosting (SPA)

This app uses client-side routing. The server must return `index.html` for routes that are not static files.

- **Vercel:** [`vercel.json`](vercel.json) rewrites are included.
- **Netlify:** [`public/_redirects`](public/_redirects) is included.
- **Render:** Use a **Static Site** with:
  - **Build Command:** `npm install && npm run build`
  - **Publish Directory:** `dist`
  - **Redirects / Rewrites:** rewrite `/*` → `/index.html` (SPA fallback)  
  Or sync [`render.yaml`](render.yaml) as a Blueprint (includes the SPA rewrite).
- **nginx:** `try_files $uri $uri/ /index.html;`
- **Vite dev:** works out of the box.

**Note:** Do not commit the `dist/` folder — it is listed in [`.gitignore`](.gitignore). Render (and other hosts) should run `npm run build` on each deploy so assets stay in sync with `public/` and source.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
