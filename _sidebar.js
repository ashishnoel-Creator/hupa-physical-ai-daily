// _sidebar.js — unified site navigation rendered from manifest.json.
// Loaded by every page (daily brief, monthly review, papers DB).
// Renders into <div id="sitenav"></div> if present.
//
// Site root is auto-detected so the same file works from /, /days/, /monthly/.

(function() {
  const SITE_ROOT = (function() {
    const path = location.pathname;
    if (/\/(days|monthly)\//.test(path)) return '../';
    return './';
  })();

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function monthName(ym) {
    const [y, m] = ym.split('-');
    const d = new Date(parseInt(y), parseInt(m) - 1, 1);
    return d.toLocaleString('en-US', {month: 'long', year: 'numeric'});
  }

  function isCurrentDay(slug) {
    return location.pathname.includes('/days/' + slug + '.html');
  }
  function isCurrentMonthly(slug) {
    return location.pathname.includes('/monthly/' + slug + '.html');
  }
  function isPapers() {
    return location.pathname.endsWith('/papers.html');
  }
  function isHome() {
    const p = location.pathname;
    return p.endsWith('/index.html') || p === '/' || /\/hupa-physical-ai-daily\/?$/.test(p);
  }

  async function fetchManifest() {
    const candidates = [SITE_ROOT + 'manifest.json', './manifest.json', '../manifest.json', '/hupa-physical-ai-daily/manifest.json'];
    for (const url of candidates) {
      try {
        const r = await fetch(url, {cache: 'no-cache'});
        if (r.ok) return await r.json();
      } catch (e) { /* try next */ }
    }
    throw new Error('manifest.json not reachable');
  }

  function renderNav(manifest) {
    const root = document.getElementById('sitenav');
    if (!root) return;

    // Group days by YYYY-MM
    const byMonth = {};
    for (const d of (manifest.days || [])) {
      const ym = d.date.substring(0, 7);
      (byMonth[ym] = byMonth[ym] || []).push(d);
    }
    const months = Object.keys(byMonth).sort().reverse();

    const parts = [];
    parts.push('<div class="sitenav-block">');
    parts.push('<div class="sitenav-label">Site</div>');
    parts.push('<ul class="sitenav-list">');

    parts.push('<li><a href="' + SITE_ROOT + 'index.html"' + (isHome() ? ' class="active"' : '') + '>Latest brief</a></li>');

    // Papers DB
    const papersCount = manifest.papers_count || 0;
    parts.push('<li><a href="' + SITE_ROOT + 'papers.html"' + (isPapers() ? ' class="active"' : '') + '>Papers DB <span class="count">' + papersCount + '</span></a></li>');

    // Monthly reviews
    const monthlies = manifest.monthly_reviews || [];
    if (monthlies.length) {
      parts.push('<li><details open><summary>Monthly reviews <span class="count">' + monthlies.length + '</span></summary><ul class="sub">');
      for (const m of monthlies) {
        const active = isCurrentMonthly(m.slug);
        const lbl = m.title || m.date;
        parts.push('<li><a href="' + SITE_ROOT + 'monthly/' + escapeHtml(m.slug) + '.html"' + (active ? ' class="active"' : '') + '>' + escapeHtml(lbl) + '</a></li>');
      }
      parts.push('</ul></details></li>');
    } else {
      parts.push('<li class="muted"><span>Monthly reviews <span class="count">0</span><br><small>first one on Jun 1</small></span></li>');
    }

    parts.push('</ul>');
    parts.push('</div>');

    // All days, grouped by month
    parts.push('<div class="sitenav-block">');
    parts.push('<div class="sitenav-label">All days <span class="count">' + (manifest.days || []).length + '</span></div>');
    parts.push('<ul class="sitenav-list">');
    for (let i = 0; i < months.length; i++) {
      const ym = months[i];
      const days = byMonth[ym].sort((a, b) => b.date.localeCompare(a.date));
      const openAttr = i === 0 ? ' open' : '';
      parts.push('<li><details' + openAttr + '><summary>' + monthName(ym) + ' <span class="count">' + days.length + '</span></summary><ul class="sub">');
      for (const d of days) {
        const active = isCurrentDay(d.slug);
        const dayLabel = d.date.substring(8); // "21"
        const monthShort = new Date(d.date + 'T00:00:00').toLocaleString('en-US', {month: 'short'});
        const tldrFirst = (d.tldr && d.tldr[0]) ? d.tldr[0] : '';
        parts.push('<li class="day-item"><a href="' + SITE_ROOT + 'days/' + escapeHtml(d.slug) + '.html"' + (active ? ' class="active"' : '') + ' title="' + escapeHtml(tldrFirst) + '"><span class="day-date">' + monthShort + ' ' + dayLabel + '</span></a></li>');
      }
      parts.push('</ul></details></li>');
    }
    parts.push('</ul>');
    parts.push('</div>');

    // Search
    parts.push('<div class="sitenav-block">');
    parts.push('<div class="sitenav-label">Search</div>');
    parts.push('<input type="search" id="sitenavSearch" placeholder="Search briefs and TL;DRs...">');
    parts.push('<div id="sitenavSearchResults" class="search-results"></div>');
    parts.push('</div>');

    root.innerHTML = parts.join('');

    wireSearch(manifest);
  }

  function wireSearch(manifest) {
    const input = document.getElementById('sitenavSearch');
    const results = document.getElementById('sitenavSearchResults');
    if (!input || !results) return;

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length < 2) { results.innerHTML = ''; return; }

      const hits = [];
      for (const d of (manifest.days || [])) {
        const hay = (d.title + ' ' + (d.tldr || []).join(' ')).toLowerCase();
        if (hay.includes(q)) hits.push(d);
        if (hits.length >= 12) break;
      }
      if (!hits.length) {
        results.innerHTML = '<div class="search-empty">No matches.</div>';
        return;
      }
      results.innerHTML = hits.map(d => {
        const snippet = (d.tldr && d.tldr[0]) ? d.tldr[0] : '';
        return '<a class="search-hit" href="' + SITE_ROOT + 'days/' + escapeHtml(d.slug) + '.html">' +
          '<div class="hit-date">' + escapeHtml(d.date) + '</div>' +
          '<div class="hit-snippet">' + escapeHtml(snippet.substring(0, 110)) + (snippet.length > 110 ? '...' : '') + '</div>' +
          '</a>';
      }).join('');
    });
  }

  async function init() {
    try {
      const manifest = await fetchManifest();
      renderNav(manifest);
    } catch (e) {
      console.warn('[sitenav]', e);
      const root = document.getElementById('sitenav');
      if (root) root.innerHTML = '<div class="sitenav-error">Navigation unavailable. <a href="' + SITE_ROOT + '">Home</a></div>';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
