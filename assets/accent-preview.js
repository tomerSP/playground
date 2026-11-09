/* TEMPORARY: backdrop colour preview. Adds a floating swatch picker in the
   bottom-right corner that swaps the neutral tokens (--bg, --panel, --ink,
   --muted, --line) for both light and dark mode. The accent stays as set in
   style.css. The pick is saved in localStorage, so it follows you between
   pages on the same site. Every preset keeps text, muted text and the accent
   at WCAG AA on both the page and panel colours.

   To remove: delete this file and its <script> tag on each page. Once a
   backdrop is chosen, copy its values into the tokens in style.css. */
(function () {
  var KEY = 'backdrop-preview';

  // name: [light bg, panel, ink, muted, line], [dark bg, panel, ink, muted, line]
  var PRESETS = {
    Warm:  [['#fbf8f4', '#ffffff', '#1f1b18', '#6b635c', '#e8e1d9'], ['#16130f', '#211d19', '#ede7e0', '#a39a91', '#342e28']],
    Sand:  [['#fcf6ea', '#fffcf5', '#2a2118', '#6a5e50', '#e8dcc6'], ['#1c1712', '#272019', '#efe6da', '#ab9e8d', '#3a3128']],
    Stone: [['#f5f5f4', '#ffffff', '#1c1c1b', '#5f5f5c', '#e2e2df'], ['#141414', '#1e1e1d', '#ececea', '#a1a19d', '#2f2f2d']],
    Slate: [['#f3f5f8', '#ffffff', '#1a1f2b', '#566072', '#dfe3ea'], ['#0f131a', '#181d26', '#e6e9ef', '#9aa3b2', '#2a313d']],
    Sage:  [['#f7f9f4', '#fdfefb', '#1d2119', '#5a6354', '#dfe5d8'], ['#121510', '#1b2018', '#e6eae0', '#9ba393', '#2c3328']],
    Mono:  [['#ffffff', '#ffffff', '#111111', '#5c5c5c', '#e5e5e5'], ['#000000', '#0e0e0e', '#f0f0f0', '#a3a3a3', '#262626']]
  };
  var NAMES = ['Warm', 'Sand', 'Stone', 'Slate', 'Sage', 'Mono'];

  function vars(t) {
    return '--bg:' + t[0] + ';--panel:' + t[1] + ';--ink:' + t[2] + ';--muted:' + t[3] + ';--line:' + t[4] + ';';
  }

  // Same selectors as style.css, so the light/dark/system switch still works.
  function css(name) {
    var p = PRESETS[name];
    return ':root{' + vars(p[0]) + '}' +
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){' + vars(p[1]) + '}}' +
      ':root[data-theme="dark"]{' + vars(p[1]) + '}';
  }

  function saved() {
    try { return localStorage.getItem(KEY) || 'Warm'; } catch (e) { return 'Warm'; }
  }

  // Appended after style.css, so these win at equal specificity.
  var tokens = document.createElement('style');
  document.head.appendChild(tokens);
  function apply(name) { if (PRESETS[name]) tokens.textContent = css(name); }
  apply(saved());

  var UI_CSS =
    '.backdrop-preview{position:fixed;right:16px;bottom:16px;z-index:50;display:flex;align-items:center;gap:6px;' +
    'padding:6px 8px 6px 12px;border:1px solid var(--line);border-radius:999px;background:var(--panel);' +
    'box-shadow:0 6px 24px -12px rgba(0,0,0,.35);font:600 12px var(--sans);color:var(--muted)}' +
    '.backdrop-preview span{margin-right:4px}' +
    '.backdrop-preview button{position:relative;width:22px;height:22px;padding:0;border-radius:999px;' +
    'border:1px solid var(--muted);cursor:pointer}' +
    '.backdrop-preview button[aria-pressed="true"]{box-shadow:0 0 0 2px var(--panel),0 0 0 4px var(--accent)}' +
    '.backdrop-preview button::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 10px);left:50%;' +
    'transform:translateX(-50%);padding:4px 8px;border-radius:6px;background:var(--ink);color:var(--bg);' +
    'font:500 12px var(--sans);white-space:nowrap;opacity:0;visibility:hidden;pointer-events:none;' +
    'transition:opacity .12s ease,visibility .12s}' +
    '.backdrop-preview button:hover::after,.backdrop-preview button:focus-visible::after{opacity:1;visibility:visible}';

  function build() {
    var style = document.createElement('style');
    style.textContent = UI_CSS;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'backdrop-preview';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Backdrop colour preview');
    bar.innerHTML = '<span>Backdrop</span>';

    var buttons = [];
    function sync() {
      var current = saved();
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', String(buttons[i].value === current));
      }
    }

    for (var i = 0; i < NAMES.length; i++) {
      var p = PRESETS[NAMES[i]];
      var b = document.createElement('button');
      b.type = 'button';
      b.value = NAMES[i];
      b.setAttribute('data-tip', NAMES[i]);
      b.setAttribute('aria-label', NAMES[i]);
      // Swatch: light backdrop top-left, dark backdrop bottom-right.
      b.style.background = 'linear-gradient(135deg,' + p[0][0] + ' 50%,' + p[1][0] + ' 50%)';
      b.addEventListener('click', function () {
        try { localStorage.setItem(KEY, this.value); } catch (e) {}
        apply(this.value);
        sync();
      });
      buttons.push(b);
      bar.appendChild(b);
    }

    document.body.appendChild(bar);
    sync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
