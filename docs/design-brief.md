# Design brief

Shared by the hub and every tool site (qr, image-to-ascii, and later ones). Each tool repo carries a copy of `assets/style.css` and `assets/fonts/`; this brief lives here only.

## Audience

Anyone who lands here wanting a quick tool: friends, people sent a link. Not developers, no wish to sign up, often on a phone.

Provisional: audience and message may change as new tool ideas come in.

## Mood and message

Small, friendly, trustworthy tools that just work. Playful but tidy.

Trust line for now: free, no sign-up, runs in your browser. "Nothing uploaded" is provisional; a future tool may need a server, so keep that claim in page copy only, never baked into the shared shell.

## Reasons behind choices

- **Warm coral accent:** energy and play on a calm warm-neutral base. The light-mode shade is darkened so links and button text clear WCAG AA (4.5:1).
- **Atkinson Hyperlegible Next + Mono:** humanist sans for readability; its mono sibling pairs by similarity and suits the tool and ASCII feel. Self-hosted, so pages make no third-party requests.
- **Reading pattern:** Z on the hub (sparse, scanned fast); F on tool pages (controls down the left).
- **Same header and footer everywhere:** brand left (links to the hub), "All tools" and "About" right, and the same footer line, so no page has to be re-learned. Tool pages may add credits under the footer line.

## Deliberate rule breaks

- The ASCII art output in image-to-ascii uses its own bundled `ASCII` font. It is the tool's output, not UI type, so it does not count against the two-font limit.
