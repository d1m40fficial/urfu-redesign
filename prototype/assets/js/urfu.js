/* UrFU «Меридиан» — progressive enhancement only. Content works without JS. */
(function () {
  'use strict';
  var on = function (el, ev, fn) { if (el) el.addEventListener(ev, fn); };
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Mobile navigation ---- */
  var navToggle = $('[data-nav-toggle]');
  var nav = $('#primary-nav');
  on(navToggle, 'click', function () {
    var open = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('.nav__item[data-mega] > .nav__link').forEach(function (link) {
    on(link, 'click', function (e) {
      if (window.matchMedia('(max-width: 1040px)').matches) {
        e.preventDefault();
        var item = link.closest('.nav__item');
        var open = item.getAttribute('data-open') === 'true';
        $$('.nav__item[data-mega]').forEach(function (i) { i.setAttribute('data-open', 'false'); });
        item.setAttribute('data-open', open ? 'false' : 'true');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav) { nav.classList.remove('is-open'); if (navToggle) navToggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---- Language switch (visual demo; RU/EN) ---- */
  $$('.lang').forEach(function (group) {
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('button'); if (!btn) return;
      $$('button', group).forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      document.documentElement.lang = btn.dataset.lang || 'ru';
      var note = $('[data-lang-note]');
      if (note) note.textContent = btn.dataset.lang === 'en'
        ? 'English is a demonstrative preview; the prototype content is primarily Russian.'
        : '';
    });
  });

  /* ---- Tabs ---- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
    function select(i) {
      tabs.forEach(function (t, j) {
        var active = i === j;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.tabIndex = active ? 0 : -1;
        if (panels[j]) panels[j].hidden = !active;
      });
      tabs[i].focus();
    }
    tabs.forEach(function (t, i) {
      on(t, 'click', function () { select(i); });
      on(t, 'keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); select((i + 1) % tabs.length); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); select((i - 1 + tabs.length) % tabs.length); }
      });
    });
  });

  /* ---- Program catalogue filter ---- */
  var catalogue = $('[data-catalogue]');
  if (catalogue) {
    var items = $$('[data-program]', catalogue);
    var q = $('[data-filter-q]');
    var level = $('[data-filter-level]');
    var inst = $('[data-filter-institute]');
    var form = $('[data-filter-form]');
    var count = $('[data-count]');
    var empty = $('[data-empty]');
    var sort = $('[data-sort]');

    function apply() {
      var term = (q && q.value || '').trim().toLowerCase();
      var lv = level && level.value || '';
      var it = inst && inst.value || '';
      var fm = form && form.value || '';
      var visible = 0;
      items.forEach(function (el) {
        var ok = (!term || el.dataset.title.toLowerCase().indexOf(term) > -1) &&
          (!lv || el.dataset.level === lv) &&
          (!it || el.dataset.institute === it) &&
          (!fm || el.dataset.form === fm);
        el.hidden = !ok;
        if (ok) visible++;
      });
      if (count) count.textContent = visible;
      if (empty) empty.hidden = visible !== 0;
    }
    [q, level, inst, form].forEach(function (el) { on(el, 'input', apply); on(el, 'change', apply); });
    on(sort, 'change', function () {
      var list = $('[data-program-list]', catalogue);
      var arr = $$('[data-program]', catalogue);
      arr.sort(function (a, b) {
        if (sort.value === 'title') return a.dataset.title.localeCompare(b.dataset.title, 'ru');
        if (sort.value === 'budget') return (+a.dataset.budget) - (+b.dataset.budget);
        return (+b.dataset.popularity) - (+a.dataset.popularity);
      });
      arr.forEach(function (el) { list.appendChild(el); });
    });
    apply();
  }

  /* ---- Simple list filter (news / events) ---- */
  $$('[data-filter-list]').forEach(function (scope) {
    var chips = $$('[data-filter]', scope);
    var rows = $$('[data-topic]', scope);
    chips.forEach(function (chip) {
      on(chip, 'click', function () {
        var val = chip.dataset.filter;
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        var n = 0;
        rows.forEach(function (r) {
          var ok = val === 'all' || r.dataset.topic === val;
          r.hidden = !ok; if (ok) n++;
        });
        var live = $('[data-filter-status]', scope);
        if (live) live.textContent = n + ' результатов по фильтру «' + chip.textContent.trim() + '»';
      });
    });
  });

  /* ---- Load more ---- */
  $$('[data-loadmore]').forEach(function (btn) {
    on(btn, 'click', function () {
      var target = document.querySelector(btn.dataset.loadmore);
      var hidden = $$('[data-more]', target).filter(function (el) { return el.hidden; });
      hidden.slice(0, 3).forEach(function (el) { el.hidden = false; });
      if ($$('[data-more]', target).every(function (el) { return !el.hidden; })) {
        btn.disabled = true; btn.textContent = 'Показаны все материалы';
      }
    });
  });

  /* ---- Contact form validation ---- */
  var cform = $('[data-contact-form]');
  if (cform) {
    var status = $('[data-form-status]');
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      $$('[data-required]', cform).forEach(function (input) {
        var field = input.closest('.field');
        var bad = !input.value.trim() || (input.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value));
        field.setAttribute('data-invalid', bad ? 'true' : 'false');
        input.setAttribute('aria-invalid', bad ? 'true' : 'false');
        var err = $('.error', field);
        if (err) { if (bad) { err.id = err.id || (input.id + '-error'); input.setAttribute('aria-describedby', err.id); } }
        if (bad && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); if (status) status.textContent = 'Проверьте выделенные поля.'; return; }
      if (status) status.textContent = 'Заявка отправлена (демонстрация). Мы свяжемся с вами.';
      cform.reset();
    });
  }

  /* ---- Reveal on scroll ---- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---- Footer year ---- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Search page ---- */
  var searchPage = $('[data-search-form]');
  if (searchPage) {
    var param = new URLSearchParams(location.search).get('q');
    var input = $('[data-search-input]', searchPage);
    var echo = $('[data-search-echo]');
    if (param && input) input.value = param;
    if (echo && param) echo.textContent = param;
  }
})();
