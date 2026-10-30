# Tomer's Playground

Hub for a set of small browser tools. Each tool is its own repo publishing to
`https://tomersp.github.io/<repo>/`; this repo is the hub page that links them,
published at `https://tomersp.github.io/playground/`. No build step, no
framework, no backend.

## Layout

```
index.html          hub page — one card per project
about/index.html    About page
assets/style.css    master copy of the shared shell (colors, cards, panels, dark mode)
qr/index.html       redirect to https://tomersp.github.io/qr/ (moved to its own repo)
.nojekyll           tells GitHub Pages to serve the files as-is
```

## Adding a project

Create it as its own repo, following `AGENTS.md`, then add a card to the grid in
`index.html` when it launches.

## Local preview

```
npx serve .
```

## Renaming the site

The name appears in `index.html` (`<title>`, `<h1>`), the About page, each
project's `.crumb` link text, and this file. It is a find-and-replace across
repos, not a refactor.
