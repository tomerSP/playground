# AGENTS.md

Conventions for this repo. Read before editing anything.

## What this is

The hub of My Playground, published at
`https://tsp-playground.netlify.app/`. It holds only:

- the hub page (`index.html`) — one card per project
- the About page (`about/`)
- the master copy of the shared shell (`assets/style.css`)
- redirect pages for projects that used to live here

Projects do not live here. Each is its own repo, checked out next to this one
under `C:\D\projects\web\`, publishing its `site/` folder as its own
Netlify site:

| Project | Repo | Status |
| --- | --- | --- |
| QR | `tomerSP/qr` | live at `https://tsp-qr-maker.netlify.app/`; old `/qr/` here redirects |
| Image to ASCII | `tomerSP/image-to-ascii` | live at `https://image-2-ascii.netlify.app/` |
| Custom calculator | `tomerSP/custom-calculator` | planning, no page |

Work on a project happens in its repo, under its own AGENTS.md.

## Default behavior

This repo is itself published by Netlify from the root of `main`, so the
same constraints apply to everything here. An idea that conflicts with one is
out of scope for the site, not rejected: say so, note it for later, and don't
refuse or water down the idea.

- **No build step.** Open an `index.html` and it works.
- **Client-side only.** No backend, no secrets.
- **No CDN dependencies.** Vendor anything third-party with its license.
- **Vanilla everything.** Plain HTML, CSS and ES5-compatible JS in an IIFE.

## Layout

```
index.html          hub — one card per project
about/index.html    About page
assets/style.css    master copy of the shared shell
qr/index.html       redirect to https://tsp-qr-maker.netlify.app/
```

## Adding a project

1. Create a repo next to this one with the layout of `tomerSP/qr`: the public
   page in `site/`, everything else outside it, and
   a `netlify.toml` with `publish = "site"`; import the repo in Netlify.
2. Copy `assets/style.css`, `assets/theme.js` and `assets/fonts/` into
   `site/assets/`. Copy the `header.site` (brand linking to
   `https://tsp-playground.netlify.app/`, plus an "About" link) and
   `footer.site` blocks from an existing project page, and the font `preload`
   link and `theme.js` script tag from its `<head>`.
3. When it launches, add a card to the grid in `index.html` linking to
   its Netlify URL (and delete the matching `.soon`
   placeholder if there is one), and add a row to the table above.

## Moving a project out

If a project that is live here moves to its own repo, replace its folder with a
single `index.html` redirect (see `qr/index.html`: canonical link, `noindex`,
meta refresh plus a script that keeps the query and hash), so old URLs and
search rankings carry over.

## Styling

Design decisions (audience, mood, and the reasons behind palette and fonts)
are in `docs/design-brief.md`; it covers every project. Fonts are self-hosted
in `assets/fonts/` (SIL OFL, license alongside).

Use the CSS custom properties in `assets/style.css` (`--ink`, `--bg`, `--panel`,
`--line`, `--accent`, `--muted`). Never hard-code a color that has a token —
dark mode is driven entirely by those tokens, applied under
`@media (prefers-color-scheme: dark)` or by `data-theme` on `<html>`, which
`assets/theme.js` sets from the header's light/dark/system switch. Don't use
`prefers-color-scheme` in page CSS; it ignores the switch. Page-specific CSS goes in a `<style>`
block on that page — do not grow `assets/style.css` for one page's needs.

Projects carry copies of `assets/style.css`, `assets/theme.js` and `assets/fonts/`. When you change it here, say which
projects need the new copy; don't edit their repos from here.

## SEO

Each page needs a `<title>` and `<meta name="description">` written for the
search query a real person would type.

## Testing

No test framework. Before committing, serve the repo and check the page in a
browser. `file://` will not work; use a local server.

## Commits

Imperative subject line, body explaining why. Do not commit `node_modules`,
build output, or agent scratch files.
