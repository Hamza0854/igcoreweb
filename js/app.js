/* ==========================================================================
   iGCORE — interactions + home page render
   ========================================================================== */
'use strict';

function imgTag(local, remote, alt) {
  alt = alt || '';
  var primary = local || remote;
  var fallback = remote && local ? remote : '';
  var err = fallback ? ' onerror="if(this.dataset.fb){this.src=this.dataset.fb}"' : '';
  var fb = fallback ? ' data-fb="' + fallback + '"' : '';
  return { src: primary, err: err, fb: fb, alt: alt };
}

function renderWinners() {
  var el = document.getElementById('winners-ticker');
  var data = window.IGCORE_HOME;
  if (!el || !data) return;
  var items = data.winners;
  var html = '';
  for (var pass = 0; pass < 2; pass++) {
    for (var i = 0; i < items.length; i++) {
      var w = items[i];
      html += '<article class="winner-chip">'
        + '<img src="' + w.img + '" alt="" class="winner-chip__img" loading="lazy">'
        + '<div class="winner-chip__body">'
        + '<div class="winner-chip__user">\u2605 ' + w.user + '</div>'
        + '<div class="winner-chip__game">' + w.game + '</div>'
        + '<div class="winner-chip__amt">' + w.amount + '</div>'
        + '</div></article>';
    }
  }
  el.innerHTML = html;
}

function visualLinkTile(item) {
  var i = imgTag(item.img, item.fallback, item.title);
  return '<div class="visual-links__item">'
    + '<a href="#" class="visual-links__link cat-theme--' + item.theme + '">'
    + '<div class="visual-links__body">'
    + '<span class="visual-links__title font-display"><span class="visual-links__label">' + item.title + '</span></span>'
    + '<span class="visual-links__icon">'
    + '<img src="' + i.src + '" alt="" class="visual-links__image" loading="lazy"' + i.fb + i.err + '>'
    + '</span></div></a></div>';
}

function renderCategoryHub() {
  var el = document.getElementById('category-hub');
  var d = window.IGCORE_HOME;
  if (!el || !d) return;

  var tiles = d.categoryPrimary.concat(d.categorySecondary);
  var grid = '<div class="visual-links visual-links--hero-grid visual-links--count-6">'
    + tiles.map(visualLinkTile).join('')
    + '</div>';

  var fast = '<div class="fast-links__wrapper">'
    + '<div class="fast-links__list-wrapper">'
    + '<ul class="fast-links__list no-bar">'
    + d.fastGames.map(function (g) {
      return '<li class="fast-links__item">'
        + '<a href="#" class="fast-links__link">'
        + '<img src="' + g.img + '" alt="' + g.name + '" class="casino-game" loading="lazy">'
        + '<span class="fast-links__link-text">' + g.name + '</span>'
        + '</a></li>';
    }).join('')
    + '</ul></div></div>';

  el.innerHTML = grid + fast;
}

function renderMidBanners() {
  var el = document.getElementById('mid-banners');
  var banners = window.IGCORE_HOME.midBanners;
  if (!el) return;
  el.innerHTML = banners.map(function (b) {
    var i = imgTag(b.img, b.fallback);
    return '<div class="mid-banner tile">'
      + '<img src="' + i.src + '" alt="" class="mid-banner__img tile-img" loading="lazy"' + i.fb + i.err + '>'
      + '<div class="mid-banner__text font-display">'
      + '<span class="text-white">' + b.line1 + '</span><br>'
      + '<span class="text-accent">' + b.line2 + '</span></div></div>';
  }).join('');
}

function renderSportCards() {
  var el = document.getElementById('sports-row');
  var data = window.IGCORE_HOME;
  if (!el) return;
  el.innerHTML = data.sports.map(function (s) {
    var src = data.sportImg(s.slug);
    return '<a href="#" class="sport-card tile">'
      + '<img src="' + src + '" alt="' + s.name + '" class="sport-card__img tile-img" loading="lazy">'
      + '<span class="sport-card__title font-display">' + s.name + '</span></a>';
  }).join('');
}

function gameCard(g) {
  var prov = g.provider ? '<div class="game-card__prov">' + g.provider + '</div>' : '';
  return '<div class="tile game-card">'
    + '<img src="' + g.img + '" alt="' + g.name + '" class="tile-img w-full h-full object-cover" loading="lazy">'
    + '<div class="game-card__shade"></div>'
    + '<div class="game-card__meta"><div class="font-display text-white game-card__name">' + g.name + '</div>' + prov + '</div>'
    + '<div class="play-overlay"><div class="play-btn"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg></div>'
    + '<span class="text-xs font-semibold text-white">Demo Play</span></div></div>';
}

function renderGameRow(id, games) {
  var el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = games.map(gameCard).join('');
}

function renderProviders() {
  var el = document.getElementById('providers-row');
  var list = window.IGCORE_HOME.providers;
  if (!el) return;
  el.innerHTML = list.map(function (name) {
    return '<div class="provider-chip card"><span class="font-display text-sm text-mid tracking-wide whitespace-nowrap">' + name + '</span></div>';
  }).join('');
}

function renderPromotions() {
  var el = document.getElementById('promotions-grid');
  var promos = window.IGCORE_HOME.promotions;
  if (!el) return;
  el.innerHTML = promos.map(function (p) {
    var i = imgTag(p.img, p.fallback, p.title);
    return '<div class="promo-card tile">'
      + '<img src="' + i.src + '" alt="" class="promo-card__bg tile-img" loading="lazy"' + i.fb + i.err + '>'
      + '<div class="promo-card__content">'
      + '<div class="font-display text-2xl md:text-[22px] text-white drop-shadow-lg">' + p.title + '</div>'
      + '<p class="text-[12px] text-white/85 mt-2 max-w-[250px]">' + p.desc + '</p>'
      + '</div></div>';
  }).join('');
}

function renderHome() {
  renderWinners();
  renderCategoryHub();
  renderSportCards();
  renderMidBanners();
  renderGameRow('casino-row', window.IGCORE_HOME.casino);
  renderGameRow('crash-row', window.IGCORE_HOME.crash);
  renderGameRow('livecasino-row', window.IGCORE_HOME.liveCasino);
  renderGameRow('virtual-row', window.IGCORE_HOME.virtualSports);
  renderProviders();
  renderPromotions();
}

function igcoreInit() {
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  window.setTheme = function (m) {
    document.documentElement.classList.toggle('light', m === 'light');
    var dk = document.getElementById('themeDark'), lt = document.getElementById('themeLight');
    if (dk) dk.classList.toggle('active', m === 'dark');
    if (lt) lt.classList.toggle('active', m === 'light');
  };

  window.setMode = function (btn) {
    [].slice.call(btn.parentElement.querySelectorAll('.mode-pill')).forEach(function (x) { x.classList.remove('active'); });
    btn.classList.add('active');
  };

  window.setAuthState = function (loggedIn) {
    document.body.classList.toggle('is-logged-in', !!loggedIn);
  };

  document.addEventListener('click', function (e) {
    var t = e.target.closest('.tab');
    if (!t) return;
    $$('.tab', t.parentElement).forEach(function (x) { x.classList.remove('active'); });
    t.classList.add('active');
  });

  document.addEventListener('click', function (e) {
    var h = e.target.closest('.league-head');
    if (!h) return;
    h.closest('.league').classList.toggle('collapsed');
  });

  document.addEventListener('click', function (e) {
    var a = e.target.closest('.nav-arrow');
    if (!a) return;
    var sec = a.closest('section');
    var row = $('.row-scroll', sec);
    if (!row) return;
    var dir = a.dataset.dir === 'prev' ? -1 : 1;
    row.scrollBy({ left: dir * Math.round(row.clientWidth * 0.8), behavior: 'smooth' });
  });

  (function () {
    var target = new Date('2026-06-11T00:00:00');
    var pad = function (n) { return String(n).padStart(2, '0'); };
    function tick() {
      var d = Math.max(0, target - new Date());
      var el;
      if ((el = $('#cdD'))) el.textContent = pad(Math.floor(d / 864e5));
      if ((el = $('#cdH'))) el.textContent = pad(Math.floor(d % 864e5 / 36e5));
      if ((el = $('#cdM'))) el.textContent = pad(Math.floor(d % 36e5 / 6e4));
      if ((el = $('#cdS'))) el.textContent = pad(Math.floor(d % 6e4 / 1e3));
      setTimeout(tick, 1000);
    }
    tick();
  })();

  if (window.IGCORE_HOME) renderHome();

  var balanceToggle = document.getElementById('balanceToggle');
  if (balanceToggle) {
    balanceToggle.addEventListener('click', function () {
      var show = balanceToggle.getAttribute('aria-pressed') !== 'true';
      balanceToggle.setAttribute('aria-pressed', show ? 'true' : 'false');
      balanceToggle.setAttribute('aria-label', show ? 'Hide balance' : 'Show balance');
      var open = balanceToggle.querySelector('.eye-open');
      var closed = balanceToggle.querySelector('.eye-closed');
      if (open) open.classList.toggle('hidden', !show);
      if (closed) closed.classList.toggle('hidden', show);
      var sb = document.getElementById('sidebarBalance');
      var hb = document.getElementById('headerBalance');
      if (sb) sb.classList.toggle('is-hidden', !show);
      if (hb) hb.classList.toggle('is-hidden', !show);
    });
  }

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.06 });
  $$('.reveal').forEach(function (r) { io.observe(r); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', igcoreInit);
} else {
  igcoreInit();
}
