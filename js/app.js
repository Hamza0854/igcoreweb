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
    + '<span class="visual-links__title"><span class="visual-links__label">' + item.title + '</span></span>'
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

function renderPromoBanners() {
  var el = document.getElementById('promo-banners');
  var banners = window.IGCORE_HOME.promoBanners;
  if (!el || !banners) return;
  el.innerHTML = '<ul class="promo-banners__list">'
    + banners.map(function (b) {
      var i = imgTag(b.img, b.fallback);
      return '<li class="promo-banners__item">'
        + '<a href="#" class="promo-banners__link">'
        + '<img src="' + i.src + '" alt="" class="promo-banners__img" loading="lazy"' + i.fb + i.err + '>'
        + '</a></li>';
    }).join('')
    + '</ul>';
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
  renderPromoBanners();
  renderSportCards();
  renderMidBanners();
  renderGameRow('casino-row', window.IGCORE_HOME.casino);
  renderGameRow('crash-row', window.IGCORE_HOME.crash);
  renderGameRow('livecasino-row', window.IGCORE_HOME.liveCasino);
  renderGameRow('virtual-row', window.IGCORE_HOME.virtualSports);
  renderProviders();
  renderPromotions();
}

function initBetSlip() {
  var panel = document.getElementById('betSlipPanel');
  var scrim = document.getElementById('betSlipScrim');
  var ticketsEl = document.getElementById('betSlipTickets');
  if (!panel || !ticketsEl) return;

  var MOBILE_BP = 900;
  var isMobile = function () { return window.innerWidth < MOBILE_BP; };

  function parseNum(v) {
    var n = parseFloat(String(v).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? 0 : n;
  }

  function formatMoney(n) {
    return '$' + (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '');
  }

  function ticketOdd(ticket) {
    var oddEl = ticket.querySelector('.ticket-v3__odd');
    if (!oddEl) return 0;
    return parseNum(oddEl.textContent);
  }

  function countTickets() {
    return ticketsEl.querySelectorAll('.ticket-v3').length;
  }

  function updateCounts() {
    var n = countTickets();
    var slipCount = document.getElementById('betSlipCount');
    var navCount = document.getElementById('bottomNavBetCount');
    if (slipCount) slipCount.textContent = String(n);
    if (navCount) {
      navCount.textContent = String(n);
      navCount.style.display = n > 0 ? '' : 'none';
    }
    var warning = ticketsEl.querySelector('.bet-slip-alert--warning');
    if (warning) warning.style.display = n < 2 ? 'none' : '';
    if (n === 0) {
      var placeBtn = document.getElementById('placeBetBtn');
      if (placeBtn) placeBtn.disabled = true;
    }
    recalc();
  }

  function totalOddsProduct() {
    var product = 1;
    var has = false;
    ticketsEl.querySelectorAll('.ticket-v3').forEach(function (t) {
      var o = ticketOdd(t);
      if (o > 0) { product *= o; has = true; }
    });
    return has ? Math.round(product * 100) / 100 : 0;
  }

  function recalc() {
    var mode = document.body.classList.contains('betslip-mode-multiple') ? 'multiple'
      : document.body.classList.contains('betslip-mode-system') ? 'system' : 'single';

    ticketsEl.querySelectorAll('.ticket-v3').forEach(function (ticket) {
      var stakeIn = ticket.querySelector('.ticket-v3__stake');
      var winEl = ticket.querySelector('.ticket-v3__win-amt');
      if (!stakeIn || !winEl) return;
      var stake = parseNum(stakeIn.value);
      var win = stake * ticketOdd(ticket);
      winEl.textContent = stake > 0 ? formatMoney(win) : '$0';
    });

    var totalOddsEl = document.getElementById('totalOdds');
    var product = totalOddsProduct();
    if (totalOddsEl) totalOddsEl.textContent = product ? String(product) : '0';

    var multStake = document.getElementById('multipleStake');
    var potEl = document.getElementById('potentialWinnings');
    if (multStake && potEl && mode === 'multiple') {
      var ms = parseNum(multStake.value);
      potEl.textContent = (ms * product).toFixed(2) + ' USD';
    }
    if (mode === 'system') {
      var sysStake = document.getElementById('systemStake');
      var totalStake = document.getElementById('totalStake');
      if (sysStake && totalStake) {
        var per = parseNum(sysStake.value);
        totalStake.value = String(per * 3);
      }
      if (potEl && sysStake) {
        potEl.textContent = (parseNum(sysStake.value) * product / 3).toFixed(2) + ' USD';
      }
    }

    validatePlaceBtn();
  }

  function setFooterError(err, type, message) {
    if (!err) return;
    if (!message) {
      err.style.display = 'none';
      return;
    }
    err.style.display = 'flex';
    err.className = 'bet-slip-alert bet-slip-alert--' + type;
    err.innerHTML = '<span class="bet-slip-alert__icon" aria-hidden="true">\u26A0</span> ' + message;
  }

  function validatePlaceBtn() {
    var btn = document.getElementById('placeBetBtn');
    var err = document.getElementById('betSlipError');
    if (!btn) return;
    var mode = document.body.classList.contains('betslip-mode-multiple') ? 'multiple'
      : document.body.classList.contains('betslip-mode-system') ? 'system' : 'single';
    var hasConflict = countTickets() >= 2
      && ticketsEl.querySelector('.bet-slip-alert--warning')
      && (mode === 'multiple' || mode === 'system');
    var minOk = false;
    var footerMsg = '';
    var footerType = 'error';

    if (mode === 'single') {
      ticketsEl.querySelectorAll('.ticket-v3').forEach(function (t) {
        var s = parseNum((t.querySelector('.ticket-v3__stake') || {}).value);
        if (s >= 1) minOk = true;
      });
      if (countTickets() > 0 && !minOk) footerMsg = 'Min. bet amount is 1 USD';
    } else if (mode === 'multiple') {
      var ms = parseNum((document.getElementById('multipleStake') || {}).value);
      minOk = ms >= 1 && !hasConflict;
      if (hasConflict) {
        footerMsg = 'Selection cannot be combined';
        footerType = 'warning';
      } else if (countTickets() > 0 && !minOk) footerMsg = 'Min. bet amount is 1 USD';
    } else {
      var ts = parseNum((document.getElementById('totalStake') || {}).value);
      minOk = ts >= 1 && !hasConflict;
      if (hasConflict) {
        footerMsg = 'Selection cannot be combined';
        footerType = 'warning';
      } else if (countTickets() > 0 && !minOk) footerMsg = 'Min. bet amount is 1 USD';
    }

    setFooterError(err, footerType, footerMsg);
    btn.disabled = countTickets() === 0 || hasConflict || !minOk;
  }

  function openPanel() {
    if (!isMobile()) return;
    panel.classList.add('is-open');
    panel.classList.remove('is-collapsed');
    document.body.classList.add('bet-slip-open');
    if (scrim) {
      scrim.classList.add('is-visible');
      scrim.setAttribute('aria-hidden', 'false');
    }
  }

  function closePanel() {
    if (!isMobile()) return;
    panel.classList.remove('is-open');
    document.body.classList.remove('bet-slip-open');
    if (scrim) {
      scrim.classList.remove('is-visible');
      scrim.setAttribute('aria-hidden', 'true');
    }
  }

  function toggleDesktopCollapse() {
    if (isMobile()) return;
    var collapsed = panel.classList.toggle('is-collapsed');
    document.body.classList.toggle('bet-slip-collapsed', collapsed);
    var btn = document.getElementById('betSlipCollapse');
    if (btn) {
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btn.setAttribute('aria-label', collapsed ? 'Expand bet slip' : 'Collapse bet slip');
    }
  }

  function initDesktopFloat() {
    if (isMobile()) return;
    panel.classList.add('is-collapsed');
    document.body.classList.add('bet-slip-collapsed');
    var btn = document.getElementById('betSlipCollapse');
    if (btn) {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Expand bet slip');
    }
  }

  function setView(view) {
    var slipView = panel.querySelector('[data-betslip-panel="slip"]');
    var myView = panel.querySelector('[data-betslip-panel="mybets"]');
    panel.querySelectorAll('[data-betslip-view]').forEach(function (tab) {
      var on = tab.getAttribute('data-betslip-view') === view;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    if (slipView) {
      slipView.classList.toggle('is-hidden', view !== 'slip');
      slipView.hidden = view !== 'slip';
    }
    if (myView) {
      myView.classList.toggle('is-hidden', view !== 'mybets');
      myView.hidden = view !== 'mybets';
    }
  }

  function setMode(mode) {
    document.body.classList.remove('betslip-mode-single', 'betslip-mode-multiple', 'betslip-mode-system');
    document.body.classList.add('betslip-mode-' + mode);
    panel.querySelectorAll('[data-betslip-mode]').forEach(function (btn) {
      var on = btn.getAttribute('data-betslip-mode') === mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    recalc();
  }

  function bindStakeRow(container, input) {
    if (!container || !input) return;
    container.querySelectorAll('[data-stake-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var add = parseInt(btn.getAttribute('data-stake-add'), 10) || 0;
        input.value = String(parseNum(input.value) + add);
        recalc();
      });
    });
    var maxBtn = container.querySelector('[data-stake-max]');
    if (maxBtn) {
      maxBtn.addEventListener('click', function () {
        input.value = '0';
        recalc();
      });
    }
    input.addEventListener('input', recalc);
  }

  ticketsEl.querySelectorAll('.ticket-v3').forEach(function (ticket) {
    var stakeIn = ticket.querySelector('.ticket-v3__stake');
    var fastBtns = ticket.querySelector('.ticket-v3__fast-btns');
    if (stakeIn) stakeIn.addEventListener('input', recalc);
    if (fastBtns) {
      fastBtns.querySelectorAll('button:not(.ticket-v3__edit)').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!stakeIn) return;
          var label = btn.textContent.trim();
          if (label === 'Max') stakeIn.value = '0';
          else stakeIn.value = String(parseNum(stakeIn.value) + parseInt(label.replace('+', ''), 10));
          recalc();
        });
      });
    }
    var removeBtn = ticket.querySelector('.ticket-v3__remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', function () {
        ticket.remove();
        updateCounts();
      });
    }
  });

  bindStakeRow(document.querySelector('.bet-slip-combo'), document.getElementById('multipleStake'));
  bindStakeRow(document.querySelector('.bet-slip-system'), document.getElementById('systemStake'));
  var totalStakeIn = document.getElementById('totalStake');
  if (totalStakeIn) totalStakeIn.addEventListener('input', recalc);

  var openMobile = document.getElementById('openBetSlipMobile');
  if (openMobile) {
    openMobile.addEventListener('click', function () {
      setView('slip');
      openPanel();
    });
  }

  if (scrim) scrim.addEventListener('click', closePanel);

  var collapseBtn = document.getElementById('betSlipCollapse');
  if (collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      if (isMobile()) {
        if (panel.classList.contains('is-open')) closePanel();
        else openPanel();
      } else {
        toggleDesktopCollapse();
      }
    });
  }

  panel.querySelectorAll('[data-betslip-view]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      setView(tab.getAttribute('data-betslip-view'));
    });
  });

  panel.querySelectorAll('[data-betslip-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMode(btn.getAttribute('data-betslip-mode'));
    });
  });

  var oneStake = document.getElementById('oneStakeToggle');
  if (oneStake) {
    oneStake.addEventListener('click', function () {
      var on = oneStake.getAttribute('aria-pressed') !== 'true';
      oneStake.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) {
        var first = ticketsEl.querySelector('.ticket-v3__stake');
        var val = first ? first.value : '';
        ticketsEl.querySelectorAll('.ticket-v3__stake').forEach(function (inp) {
          inp.value = val;
        });
        recalc();
      }
    });
  }

  var oddsSelect = document.getElementById('oddsSelect');
  var oddsMenu = document.getElementById('oddsMenu');
  var oddsLabel = document.getElementById('oddsSelectLabel');
  if (oddsSelect && oddsMenu) {
    oddsSelect.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = oddsMenu.hasAttribute('hidden');
      if (open) oddsMenu.removeAttribute('hidden');
      else oddsMenu.setAttribute('hidden', '');
    });
    oddsMenu.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        oddsMenu.querySelectorAll('button').forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        if (oddsLabel) oddsLabel.textContent = btn.textContent.trim();
        oddsMenu.setAttribute('hidden', '');
      });
    });
    document.addEventListener('click', function () {
      oddsMenu.setAttribute('hidden', '');
    });
  }

  var freeBet = document.getElementById('freeBetCheck');
  if (freeBet) {
    freeBet.addEventListener('change', function () {
      var mark = freeBet.closest('.bet-slip-freebet').querySelector('.checkmark');
      if (mark) mark.classList.toggle('checkmark--checked', freeBet.checked);
    });
  }

  var clearBtn = document.getElementById('clearBetsBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      ticketsEl.querySelectorAll('.ticket-v3').forEach(function (t) { t.remove(); });
      var warn = ticketsEl.querySelector('.bet-slip-alert--warning');
      if (warn) warn.remove();
      updateCounts();
    });
  }

  window.addEventListener('resize', function () {
    if (!isMobile()) {
      closePanel();
      initDesktopFloat();
      document.body.classList.remove('bet-slip-open');
    } else {
      document.body.classList.remove('bet-slip-collapsed');
    }
  });

  initDesktopFloat();
  updateCounts();
  setView('slip');
  setMode('single');
}

function igcoreInit() {
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  window.setTheme = function (m) {
    var root = document.documentElement;
    var isLight = m === 'light';
    root.classList.toggle('light', isLight);
    root.classList.toggle('dark', !isLight);
    var dk = document.getElementById('themeDark'), lt = document.getElementById('themeLight');
    if (dk) dk.classList.toggle('active', !isLight);
    if (lt) lt.classList.toggle('active', isLight);
  };

  window.setMode = function (btn) {
    var parent = btn.parentElement;
    var items = parent.querySelectorAll('.sidebar__mode, .mode-pill');
    [].slice.call(items).forEach(function (x) { x.classList.remove('active'); });
    btn.classList.add('active');
  };

  var sidebar = document.querySelector('.sidebar');
  var sbToggle = document.getElementById('sbToggle');
  var collapseBtn = document.getElementById('sidebarCollapse');

  function syncSidebarOpen() {
    if (!sbToggle) return;
    document.body.classList.toggle('sidebar-open', sbToggle.checked);
  }

  function closeMobileSidebar() {
    if (!sbToggle || window.innerWidth > 1023) return;
    sbToggle.checked = false;
    syncSidebarOpen();
  }

  if (sbToggle) {
    sbToggle.addEventListener('change', syncSidebarOpen);
    syncSidebarOpen();
  }

  if (sidebar && collapseBtn) {
    collapseBtn.addEventListener('click', function () {
      if (window.innerWidth <= 1023) {
        closeMobileSidebar();
        return;
      }
      sidebar.classList.toggle('sidebar--collapsed');
      var expanded = !sidebar.classList.contains('sidebar--collapsed');
      collapseBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.sidebar__toggle--mobile').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (window.innerWidth <= 1023) closeMobileSidebar();
    });
  });

  document.querySelectorAll('.sidebar__nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileSidebar();
    });
  });

  document.querySelectorAll('.sidebar__nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var panel = link.closest('.sidebar__nav');
      if (!panel) return;
      panel.querySelectorAll('.sidebar__nav-link').forEach(function (l) { l.classList.remove('active'); });
      link.classList.add('active');
    });
  });

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

  (function initMobileEvents() {
    var league = document.getElementById('events-mobile-league');
    if (!league) return;

    var collapseBtn = league.querySelector('.events-mobile__collapse');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', function () {
        var collapsed = league.classList.toggle('is-collapsed');
        collapseBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
    }

    var dropdown = league.querySelector('.events-mobile__col-dropdown');
    var trigger = league.querySelector('.events-mobile__col-trigger');
    if (dropdown && trigger) {
      trigger.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var open = dropdown.classList.toggle('is-open');
        trigger.classList.toggle('is-open', open);
        trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      dropdown.querySelectorAll('.events-mobile__market-menu button').forEach(function (btn) {
        btn.addEventListener('click', function (ev) {
          ev.stopPropagation();
          dropdown.querySelectorAll('.events-mobile__market-menu button').forEach(function (b) {
            b.classList.remove('is-active');
            b.setAttribute('aria-selected', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-selected', 'true');
          dropdown.classList.remove('is-open');
          trigger.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    document.addEventListener('click', function (ev) {
      if (!dropdown || dropdown.contains(ev.target)) return;
      dropdown.classList.remove('is-open');
      if (trigger) {
        trigger.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    league.querySelectorAll('.star-button').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.classList.toggle('star-button--filled', on);
        btn.setAttribute('aria-label', on ? 'Remove from favorites' : 'Add to favorites');
      });
    });

    league.querySelectorAll('.pin-button').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var on = btn.getAttribute('aria-pressed') !== 'true';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        btn.classList.toggle('pin-button--active', on);
        btn.setAttribute('aria-label', on ? 'Unpin event' : 'Pin event');
      });
    });

    league.querySelectorAll('.checkmark-wrapper').forEach(function (wrap) {
      var input = wrap.querySelector('.checkmark-input');
      var mark = wrap.querySelector('.checkmark');
      if (!input || !mark) return;
      wrap.addEventListener('click', function (ev) {
        ev.stopPropagation();
        input.checked = !input.checked;
        wrap.classList.toggle('checkmark-wrapper--checked', input.checked);
        mark.classList.toggle('checkmark--checked', input.checked);
      });
    });

    league.querySelectorAll('.main-menu-event__odd').forEach(function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var market = btn.closest('.main-menu-event__market');
        if (!market) return;
        market.querySelectorAll('.main-menu-event__odd').forEach(function (b) {
          b.classList.remove('odd--active');
        });
        btn.classList.add('odd--active');
      });
    });
  })();

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

  initBetSlip();

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
      var bal = document.getElementById('sidebarBalance');
      var hb = document.getElementById('headerBalance');
      var hbWrap = hb && hb.closest('.header-balance__amount-value');
      if (bal) bal.classList.toggle('is-hidden', !show);
      if (hb) hb.classList.toggle('is-hidden', !show);
      if (hbWrap) hbWrap.classList.toggle('is-hidden', !show);
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
