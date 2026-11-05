/* Light / dark / system theme switch. Shared shell: copied verbatim into each
   tool repo next to style.css. Load it in <head> without defer, so the saved
   choice applies before the page paints. With no choice saved, or with
   "system", the page follows prefers-color-scheme. */
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY) || 'system'; } catch (e) { return 'system'; }
  }

  function apply(choice) {
    if (choice === 'light' || choice === 'dark') root.setAttribute('data-theme', choice);
    else root.removeAttribute('data-theme');
  }

  apply(saved());

  var ICONS = {
    light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    dark: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    system: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'
  };
  var LABELS = { light: 'Light', dark: 'Dark', system: 'System' };
  var ORDER = ['light', 'dark', 'system'];

  function build() {
    var nav = document.querySelector('nav.site');
    if (!nav || nav.querySelector('.theme-switch')) return;

    var group = document.createElement('div');
    group.className = 'theme-switch';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Theme');

    var buttons = [];
    function sync() {
      var current = saved();
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].setAttribute('aria-pressed', String(buttons[i].value === current));
      }
    }

    for (var i = 0; i < ORDER.length; i++) {
      var name = ORDER[i];
      var b = document.createElement('button');
      b.type = 'button';
      b.value = name;
      b.setAttribute('aria-label', LABELS[name] + ' theme');
      b.setAttribute('data-tip', LABELS[name]);
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + '</svg>';
      b.addEventListener('click', function () {
        try { localStorage.setItem(KEY, this.value); } catch (e) {}
        apply(this.value);
        sync();
      });
      buttons.push(b);
      group.appendChild(b);
    }

    nav.appendChild(group);
    sync();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
