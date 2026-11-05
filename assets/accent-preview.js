/* TEMPORARY: accent colour preview. Adds a floating swatch picker in the
   bottom-right corner that swaps --accent, --accent-soft and --accent-ink for
   both light and dark mode. The pick is saved in localStorage, so it follows
   you between pages on the same site. Every preset clears WCAG AA for links,
   button text and accent-on-tint text.

   To remove: delete this file and its <script> tag on each page. Once a
   colour is chosen, copy its values into the tokens in style.css. */
(function () {
  var KEY = 'accent-preview';

  // name: [light accent, light soft, light ink], [dark accent, dark soft, dark ink]
  var PRESETS = {
    Coral:  [['#c4471f', '#fef3ee', '#ffffff'], ['#ff8a65', '#3a2219', '#1a0d07']],
    Teal:   [['#0f766e', '#d7efeb', '#ffffff'], ['#2dd4bf', '#10302c', '#04201c']],
    Blue:   [['#2b59c3', '#e2e9fa', '#ffffff'], ['#7fa6ff', '#1b2440', '#0a1430']],
    Violet: [['#7a3ec2', '#ece3f9', '#ffffff'], ['#b897f7', '#2a1f3d', '#1b0f30']],
    Green:  [['#2e7a35', '#e6f3e3', '#ffffff'], ['#7fd18b', '#18291a', '#0a1f0d']],
    Amber:  [['#9a5800', '#f7ead2', '#ffffff'], ['#f2b445', '#33260f', '#241600']],
    Rose:   [['#bc2a5c', '#fae0e9', '#ffffff'], ['#ff7fa6', '#3a1a25', '#2a0714']]
  };
  var NAMES = ['Coral', 'Teal', 'Blue', 'Violet', 'Green', 'Amber', 'Rose'];

  function vars(t) {
    return '--accent:' + t[0] + ';--accent-soft:' + t[1] + ';--accent-ink:' + t[2] + ';';
  }

  // Same selectors as style.css, so the light/dark/system switch still works.
  function css(name) {
    var p = PRESETS[name];
    return ':root{' + vars(p[0]) + '}' +
      '@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){' + vars(p[1]) + '}}' +
      ':root[data-theme="dark"]{' + vars(p[1]) + '}';
  }

  function saved() {
    try { return localStorage.getItem(KEY) || 'Coral'; } catch (e) { return 'Coral'; }
  }

  // Appended after style.css, so these win at equal specificity.
  var tokens = document.createElement('style');
  document.head.appendChild(tokens);
  function apply(name) { if (PRESETS[name]) tokens.textContent = css(name); }
  apply(saved());

  var UI_CSS =
    '.accent-preview{position:fixed;right:16px;bottom:16px;z-index:50;display:flex;align-items:center;gap:6px;' +
    'padding:6px 8px 6px 12px;border:1px solid var(--line);border-radius:999px;background:var(--panel);' +
    'box-shadow:0 6px 24px -12px rgba(0,0,0,.35);font:600 12px var(--sans);color:var(--muted)}' +
    '.accent-preview span{margin-right:4px}' +
    '.accent-preview button{position:relative;width:22px;height:22px;padding:0;border-radius:999px;' +
    'border:2px solid var(--panel);box-shadow:0 0 0 1px var(--line);cursor:pointer}' +
    '.accent-preview button[aria-pressed="true"]{box-shadow:0 0 0 2px var(--ink)}' +
    '.accent-preview button::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 10px);left:50%;' +
    'transform:translateX(-50%);padding:4px 8px;border-radius:6px;background:var(--ink);color:var(--bg);' +
    'font:500 12px var(--sans);white-space:nowrap;opacity:0;visibility:hidden;pointer-events:none;' +
    'transition:opacity .12s ease,visibility .12s}' +
    '.accent-preview button:hover::after,.accent-preview button:focus-visible::after{opacity:1;visibility:visible}';

  function build() {
    var style = document.createElement('style');
    style.textContent = UI_CSS;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'accent-preview';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Accent colour preview');
    bar.innerHTML = '<span>Accent</span>';

    var buttons = [];
    function sync() {
      var current = saved();
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', String(buttons[i].value === current));
      }
    }

    for (var i = 0; i < NAMES.length; i++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.value = NAMES[i];
      b.setAttribute('data-tip', NAMES[i]);
      b.setAttribute('aria-label', NAMES[i]);
      // Swatch shows the light and dark shades side by side.
      b.style.background = 'linear-gradient(135deg,' + PRESETS[NAMES[i]][0][0] + ' 50%,' +
        PRESETS[NAMES[i]][1][0] + ' 50%)';
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
