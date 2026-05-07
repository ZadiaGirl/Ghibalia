---
title: The Calendar of Ghibalia
---

# 📅 The Calendar of Ghibalia

*Track the turning of seasons, the phases of Yue and Cyosyue, and the festivals of the year.*

<div id="ghibalia-calendar-root"></div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

  #ghibalia-calendar-root {
    --gc-bg: #fdf6ec;
    --gc-surface: #fffdf8;
    --gc-border: #d6c9a8;
    --gc-accent-green: #7aab8a;
    --gc-accent-gold: #c9a84c;
    --gc-accent-rose: #d4826a;
    --gc-moon-yue: #c9b87a;
    --gc-moon-cyo: #8aaac0;
    --gc-text: #3d3222;
    --gc-text-muted: #8c7a5e;
    --gc-holiday: #b5603a;
    --gc-event: #4a7a63;
    --gc-radius: 14px;
    --gc-shadow: 0 4px 24px rgba(90,70,40,0.10);
    font-family: 'Lato', sans-serif;
    color: var(--gc-text);
    max-width: 820px;
    margin: 2rem auto;
    background: var(--gc-bg);
    border-radius: var(--gc-radius);
    box-shadow: var(--gc-shadow);
    border: 1.5px solid var(--gc-border);
    overflow: hidden;
  }

  .gc-header {
    background: linear-gradient(135deg, #a8c9a0 0%, #c9e0b8 40%, #e8d5a3 100%);
    padding: 1.4rem 1.8rem 1.1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1.5px solid var(--gc-border);
    gap: 1rem;
  }
  .gc-header-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #2a3d28;
    line-height: 1.2;
  }
  .gc-header-sub { font-size: 0.76rem; color: #4a6644; font-style: italic; margin-top: 2px; }
  .gc-nav { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
  .gc-nav button {
    background: rgba(255,255,255,0.55);
    border: 1.5px solid #b5c9a8;
    border-radius: 50%;
    width: 32px; height: 32px;
    cursor: pointer; font-size: 1.1rem; color: #2a3d28;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.18s, transform 0.12s;
  }
  .gc-nav button:hover { background: rgba(255,255,255,0.85); transform: scale(1.08); }
  .gc-year-display {
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem; color: #2a3d28; font-weight: 600;
    min-width: 52px; text-align: center;
  }

  .gc-moon-bar {
    display: flex; gap: 1.4rem; align-items: center;
    padding: 0.5rem 1.8rem;
    background: #f5f0e4;
    border-bottom: 1.5px solid var(--gc-border);
    font-size: 0.75rem; color: var(--gc-text-muted);
    flex-wrap: wrap;
  }
  .gc-moon-item { display: flex; align-items: center; gap: 0.4rem; }
  .gc-moon-glyph { font-size: 1.05rem; line-height: 1; }
  .gc-moon-name { font-weight: 700; }
  .gc-moon-phase { font-style: italic; }

  .gc-month-tabs {
    display: flex; overflow-x: auto; scrollbar-width: none;
    padding: 0.6rem 1.2rem 0; gap: 0.3rem;
    background: var(--gc-surface);
    border-bottom: 1.5px solid var(--gc-border);
  }
  .gc-month-tabs::-webkit-scrollbar { display: none; }
  .gc-month-tab {
    flex-shrink: 0; padding: 0.28rem 0.8rem; border-radius: 20px;
    border: 1.5px solid transparent; background: transparent;
    font-size: 0.78rem; font-family: 'Lato', sans-serif;
    color: var(--gc-text-muted); cursor: pointer; transition: all 0.18s; white-space: nowrap;
  }
  .gc-month-tab:hover { border-color: var(--gc-border); color: var(--gc-text); background: #f0ebe0; }
  .gc-month-tab.active { background: var(--gc-accent-green); color: #fff; border-color: var(--gc-accent-green); font-weight: 700; }
  .gc-month-tab.special { font-style: italic; }
  .gc-month-tab.special.active { background: var(--gc-accent-gold); border-color: var(--gc-accent-gold); }

  .gc-body { padding: 1.2rem 1.5rem 1rem; background: var(--gc-surface); }
  .gc-month-header { display: flex; align-items: baseline; gap: 0.8rem; margin-bottom: 0.2rem; }
  .gc-month-label { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 600; color: var(--gc-text); }
  .gc-month-badge {
    font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
    background: var(--gc-accent-gold); color: #fff; padding: 0.1rem 0.5rem; border-radius: 10px;
  }
  .gc-month-desc { font-size: 0.78rem; color: var(--gc-text-muted); font-style: italic; margin-bottom: 1rem; }

  .gc-weekdays { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-bottom: 4px; }
  .gc-weekday {
    text-align: center; font-size: 0.68rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--gc-text-muted); padding: 0.2rem 0;
  }
  .gc-days { display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; }
  .gc-days.single-day { grid-template-columns: 1fr; max-width: 160px; margin: 0 auto; }

  .gc-day {
    min-height: 62px; border-radius: 9px; padding: 0.3rem 0.35rem;
    background: transparent; border: 1.5px solid transparent;
    cursor: default; position: relative; transition: background 0.15s, border-color 0.15s;
  }
  .gc-day.has-event { background: #eef6f0; border-color: #c0dcc8; cursor: pointer; }
  .gc-day.has-event:hover { background: #ddf0e4; border-color: var(--gc-accent-green); }
  .gc-day.is-holiday { background: #fdf0e8; border-color: #e8c9a8; cursor: pointer; }
  .gc-day.is-holiday:hover { background: #fce3cc; border-color: var(--gc-accent-rose); }
  .gc-day.empty { background: transparent; border-color: transparent; min-height: 0; }

  .gc-day-num { font-size: 0.8rem; font-weight: 600; color: var(--gc-text-muted); line-height: 1; }
  .gc-day.has-event .gc-day-num { color: var(--gc-event); }
  .gc-day.is-holiday .gc-day-num { color: var(--gc-holiday); }

  .gc-day-moons { display: flex; gap: 2px; margin-top: 3px; font-size: 0.72rem; line-height: 1; }

  .gc-day-dots { display: flex; gap: 3px; margin-top: 3px; flex-wrap: wrap; }
  .gc-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .gc-dot.event { background: var(--gc-accent-green); }
  .gc-dot.holiday { background: var(--gc-accent-rose); }

  .gc-day-label {
    font-size: 0.58rem; color: var(--gc-text-muted); margin-top: 2px; line-height: 1.2;
    overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  }
  .gc-day.has-event .gc-day-label { color: var(--gc-event); }
  .gc-day.is-holiday .gc-day-label { color: var(--gc-holiday); }

  .gc-popup {
    display: none; position: fixed; z-index: 9999;
    background: var(--gc-surface); border: 1.5px solid var(--gc-border);
    border-radius: var(--gc-radius); box-shadow: 0 8px 36px rgba(80,60,30,0.18);
    padding: 1.1rem 1.3rem 1rem; max-width: 300px; min-width: 220px; pointer-events: none;
  }
  .gc-popup.visible { display: block; pointer-events: auto; animation: gc-fadein 0.16s ease; }
  @keyframes gc-fadein { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  .gc-popup-date {
    font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 600;
    color: var(--gc-text); margin-bottom: 0.5rem; padding-bottom: 0.45rem;
    border-bottom: 1px solid var(--gc-border);
  }
  .gc-popup-moons { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.6rem; font-size: 0.74rem; color: var(--gc-text-muted); }
  .gc-popup-moon { display: flex; align-items: center; gap: 0.35rem; }
  .gc-popup-item { margin-bottom: 0.65rem; }
  .gc-popup-item:last-child { margin-bottom: 0; }
  .gc-popup-type { font-size: 0.63rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 2px; }
  .gc-popup-type.event { color: var(--gc-event); }
  .gc-popup-type.holiday { color: var(--gc-holiday); }
  .gc-popup-name { font-size: 0.88rem; font-weight: 600; color: var(--gc-text); margin-bottom: 2px; }
  .gc-popup-desc { font-size: 0.76rem; color: var(--gc-text-muted); line-height: 1.45; }
  .gc-popup-close { position: absolute; top: 0.6rem; right: 0.75rem; background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--gc-text-muted); }

  .gc-legend {
    display: flex; gap: 1rem; flex-wrap: wrap;
    padding: 0.7rem 1.5rem; border-top: 1.5px solid var(--gc-border);
    background: var(--gc-bg); font-size: 0.72rem; color: var(--gc-text-muted);
  }
  .gc-legend-item { display: flex; align-items: center; gap: 0.35rem; }
  .gc-legend-dot { width: 8px; height: 8px; border-radius: 50%; }
</style>

<script>
(function() {

  // ============================================================
  // CALENDAR DATA
  // ============================================================

  const YEAR_NUM = 675;

  const MONTHS = [
    { name: "Sedin",           days: 30, special: false },
    { name: "Sprig",           days: 30, special: false },
    { name: "Summer Equinox",  days: 1,  special: true  },
    { name: "Yuein",           days: 30, special: false },
    { name: "Tresvin",         days: 30, special: false },
    { name: "The Day of Rest", days: 1,  special: true  },
    { name: "Osin",            days: 30, special: false },
    { name: "Bratin",          days: 30, special: false },
    { name: "Winter Equinox",  days: 1,  special: true  },
    { name: "Zima",            days: 30, special: false },
    { name: "Temnin",          days: 30, special: false },
    { name: "Krovi",           days: 1,  special: true  },
    { name: "Day Of Turning",  days: 1,  special: true  },
  ];

  const WEEKDAYS = ["Ahdin", "Dvas", "Triti", "Chiter", "Pyat"];

  // Moon configs: cycle = full cycle in days, shift = phase offset at day 1 of year
  const MOONS = [
    { name: "Yue",     cycle: 35, shift: 14, color: "#c9a84c" },
    { name: "Cyosyue", cycle: 49, shift: 23, color: "#7aaec9" },
  ];

  // All named events from the calendar JSON
  // month = 0-indexed, type: 'holiday' | 'event'
  const EVENTS = [
    { month:0,  day:1,  type:'holiday', name:"Night of Light",         desc:"The new year begins with lights across the land." },
    { month:0,  day:5,  type:'holiday', name:"The Seeding Festival",   desc:"" },
    { month:0,  day:8,  type:'event',   name:"The Spawning",           desc:"" },
    { month:1,  day:12, type:'holiday', name:"Quarrels Night",         desc:"" },
    { month:1,  day:20, type:'holiday', name:"Week Of Morning",        desc:"" },
    { month:1,  day:25, type:'holiday', name:"Sisters Rebirth",        desc:"" },
    { month:2,  day:1,  type:'holiday', name:"Spring Equinox",         desc:"An intercalary day marking the height of spring." },
    { month:3,  day:7,  type:'holiday', name:"Yue's Day",              desc:"" },
    { month:3,  day:12, type:'holiday', name:"Week of Repentance",     desc:"" },
    { month:4,  day:1,  type:'holiday', name:"The Emergence",          desc:"" },
    { month:4,  day:12, type:'holiday', name:"Alabaster's Day",        desc:"" },
    { month:4,  day:21, type:'holiday', name:"Day of Alignment",       desc:"" },
    { month:5,  day:1,  type:'holiday', name:"Sleep of the Sisters",   desc:"An intercalary day of quiet and stillness." },
    { month:6,  day:7,  type:'event',   name:"The Awakening",          desc:"" },
    { month:6,  day:20, type:'holiday', name:"Last Leaf Festival",     desc:"" },
    { month:7,  day:17, type:'event',   name:"Bratin's Meteor Shower", desc:"" },
    { month:7,  day:30, type:'holiday', name:"The Final Feast",        desc:"" },
    { month:8,  day:1,  type:'holiday', name:"Winter Equinox",         desc:"An intercalary day marking the heart of winter." },
    { month:9,  day:1,  type:'holiday', name:"Snows Bringing",         desc:"" },
    { month:9,  day:25, type:'holiday', name:"The Sweet Bush Festival",desc:"" },
    { month:10, day:14, type:'holiday', name:"Festival of the Dawn",   desc:"" },
    { month:10, day:30, type:'holiday', name:"The Melting Festival",   desc:"" },
    { month:11, day:1,  type:'holiday', name:"Krovi",                  desc:"An intercalary day of blood and remembrance." },
    { month:12, day:1,  type:'holiday', name:"The Red Moons Festival", desc:"The year ends as both moons glow red." },
  ];

  // ============================================================
  // MOON PHASE ENGINE
  // ============================================================

  // Build cumulative start-day for each month (absolute day of year, 1-indexed)
  const monthStarts = [];
  let totalDays = 0;
  MONTHS.forEach(m => { monthStarts.push(totalDays); totalDays += m.days; });

  const MOON_PHASES = [
    { name: "New Moon",        glyph: "🌑" },
    { name: "Waxing Crescent", glyph: "🌒" },
    { name: "First Quarter",   glyph: "🌓" },
    { name: "Waxing Gibbous",  glyph: "🌔" },
    { name: "Full Moon",       glyph: "🌕" },
    { name: "Waning Gibbous",  glyph: "🌖" },
    { name: "Last Quarter",    glyph: "🌗" },
    { name: "Waning Crescent", glyph: "🌘" },
  ];

  function moonPhase(moon, monthIdx, day) {
    const absDay = monthStarts[monthIdx] + day;
    const adjusted = (absDay + moon.shift) % moon.cycle;
    const phaseIdx = Math.floor((adjusted / moon.cycle) * 8) % 8;
    return MOON_PHASES[phaseIdx];
  }

  // ============================================================
  // RENDER ENGINE
  // ============================================================

  let currentMonth = 0;

  function getEventsForDay(month, day) {
    return EVENTS.filter(e => e.month === month && e.day === day);
  }

  function buildCalendar() {
    const root = document.getElementById('ghibalia-calendar-root');
    root.innerHTML = '';
    const month = MONTHS[currentMonth];

    // Header
    const header = document.createElement('div'); header.className = 'gc-header';
    const titleWrap = document.createElement('div');
    titleWrap.innerHTML = '<div class="gc-header-title">\uD83D\uDCDC The Calendar of Ghibalia</div>'
      + '<div class="gc-header-sub">Year ' + YEAR_NUM + ' \u2014 ' + totalDays + ' days in the year</div>';
    const nav = document.createElement('div'); nav.className = 'gc-nav';
    const prevBtn = document.createElement('button'); prevBtn.innerHTML = '\u2039';
    const yearDisp = document.createElement('div'); yearDisp.className = 'gc-year-display'; yearDisp.textContent = YEAR_NUM;
    const nextBtn = document.createElement('button'); nextBtn.innerHTML = '\u203A';
    prevBtn.onclick = function() { currentMonth = (currentMonth - 1 + MONTHS.length) % MONTHS.length; buildCalendar(); };
    nextBtn.onclick = function() { currentMonth = (currentMonth + 1) % MONTHS.length; buildCalendar(); };
    nav.append(prevBtn, yearDisp, nextBtn);
    header.append(titleWrap, nav);
    root.append(header);

    // Moon bar — shows phase on day 1 of current month
    const moonBar = document.createElement('div'); moonBar.className = 'gc-moon-bar';
    MOONS.forEach(function(moon) {
      const phase = moonPhase(moon, currentMonth, 1);
      const item = document.createElement('div'); item.className = 'gc-moon-item';
      item.innerHTML = '<span class="gc-moon-glyph">' + phase.glyph + '</span>'
        + '<span class="gc-moon-name" style="color:' + moon.color + '">' + moon.name + '</span>'
        + '<span class="gc-moon-phase">\u2014 ' + phase.name + ' on 1st</span>';
      moonBar.append(item);
    });
    root.append(moonBar);

    // Month tabs
    const tabs = document.createElement('div'); tabs.className = 'gc-month-tabs';
    MONTHS.forEach(function(m, i) {
      const tab = document.createElement('button');
      tab.className = 'gc-month-tab' + (m.special ? ' special' : '');
      tab.textContent = m.name;
      if (i === currentMonth) tab.classList.add('active');
      tab.onclick = function() { currentMonth = i; buildCalendar(); };
      tabs.append(tab);
    });
    root.append(tabs);

    // Body
    const body = document.createElement('div'); body.className = 'gc-body';

    const mheader = document.createElement('div'); mheader.className = 'gc-month-header';
    const mlabel = document.createElement('div'); mlabel.className = 'gc-month-label'; mlabel.textContent = month.name;
    mheader.append(mlabel);
    if (month.special) {
      const badge = document.createElement('div'); badge.className = 'gc-month-badge'; badge.textContent = 'Special Day';
      mheader.append(badge);
    }
    body.append(mheader);

    const mdesc = document.createElement('div'); mdesc.className = 'gc-month-desc';
    mdesc.textContent = month.special
      ? 'An intercalary day standing outside the regular weeks.'
      : month.days + '-day month \u00B7 ' + WEEKDAYS.length + '-day weeks';
    body.append(mdesc);

    // Weekday headers (skip for single-day months)
    if (!month.special) {
      const wdRow = document.createElement('div'); wdRow.className = 'gc-weekdays';
      WEEKDAYS.forEach(function(d) {
        const wd = document.createElement('div'); wd.className = 'gc-weekday'; wd.textContent = d; wdRow.append(wd);
      });
      body.append(wdRow);
    }

    // Days grid
    const grid = document.createElement('div');
    grid.className = month.special ? 'gc-days single-day' : 'gc-days';

    for (let d = 1; d <= month.days; d++) {
      const events = getEventsForDay(currentMonth, d);
      const holidays = events.filter(function(e) { return e.type === 'holiday'; });

      const dayEl = document.createElement('div'); dayEl.className = 'gc-day';
      if (holidays.length) dayEl.classList.add('is-holiday');
      else if (events.length) dayEl.classList.add('has-event');

      const numEl = document.createElement('div'); numEl.className = 'gc-day-num'; numEl.textContent = d;
      dayEl.append(numEl);

      // Moon phase glyphs for this day
      const moonRow = document.createElement('div'); moonRow.className = 'gc-day-moons';
      MOONS.forEach(function(moon) {
        const phase = moonPhase(moon, currentMonth, d);
        const span = document.createElement('span');
        span.title = moon.name + ': ' + phase.name;
        span.textContent = phase.glyph;
        moonRow.append(span);
      });
      dayEl.append(moonRow);

      if (events.length) {
        const dots = document.createElement('div'); dots.className = 'gc-day-dots';
        events.forEach(function(ev) {
          const dot = document.createElement('div');
          dot.className = 'gc-dot ' + (ev.type === 'holiday' ? 'holiday' : 'event');
          dots.append(dot);
        });
        dayEl.append(dots);

        const labelEl = document.createElement('div'); labelEl.className = 'gc-day-label';
        labelEl.textContent = events[0].name;
        dayEl.append(labelEl);

        dayEl.onclick = (function(mi, di, evs) {
          return function(e) { showPopup(e, mi, di, evs); };
        })(currentMonth, d, events);
      }

      grid.append(dayEl);
    }

    body.append(grid);
    root.append(body);

    // Legend
    const legend = document.createElement('div'); legend.className = 'gc-legend';
    legend.innerHTML = '<div class="gc-legend-item"><div class="gc-legend-dot" style="background:#7aab8a"></div>Lore Event</div>'
      + '<div class="gc-legend-item"><div class="gc-legend-dot" style="background:#d4826a"></div>Festival / Holiday</div>'
      + '<div class="gc-legend-item"><span style="font-size:0.85rem">\uD83C\uDF11\uD83C\uDF15</span>&nbsp;Moon phases shown per day (hover for name)</div>';
    root.append(legend);

    // Popup singleton
    if (!document.getElementById('gc-popup')) {
      const popup = document.createElement('div');
      popup.id = 'gc-popup';
      popup.className = 'gc-popup';
      popup.innerHTML = '<button class="gc-popup-close" id="gc-popup-close">\u2715</button><div id="gc-popup-inner"></div>';
      document.body.append(popup);
      document.getElementById('gc-popup-close').onclick = function() { popup.classList.remove('visible'); };
      document.addEventListener('click', function(e) {
        if (!e.target.closest('#gc-popup') && !e.target.closest('.gc-day.has-event,.gc-day.is-holiday')) {
          popup.classList.remove('visible');
        }
      });
    }

    // Scroll active tab into view
    const activeTab = tabs.querySelector('.active');
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function showPopup(e, monthIdx, day, events) {
    const popup = document.getElementById('gc-popup');
    const inner = document.getElementById('gc-popup-inner');
    const monthName = MONTHS[monthIdx].name;

    inner.innerHTML = '<div class="gc-popup-date">' + monthName + ', Day ' + day + ' \u2014 Year ' + YEAR_NUM + '</div>';

    // Moon phases
    const moonDiv = document.createElement('div'); moonDiv.className = 'gc-popup-moons';
    MOONS.forEach(function(moon) {
      const phase = moonPhase(moon, monthIdx, day);
      const item = document.createElement('div'); item.className = 'gc-popup-moon';
      item.innerHTML = '<span style="font-size:1rem">' + phase.glyph + '</span>'
        + '<span style="color:' + moon.color + ';font-weight:700">' + moon.name + '</span>'
        + '<span>' + phase.name + '</span>';
      moonDiv.append(item);
    });
    inner.append(moonDiv);

    // Events
    events.forEach(function(ev) {
      const item = document.createElement('div'); item.className = 'gc-popup-item';
      item.innerHTML = '<div class="gc-popup-type ' + (ev.type === 'holiday' ? 'holiday' : 'event') + '">'
        + (ev.type === 'holiday' ? '\u2726 Festival / Holiday' : '\u25C6 Lore Event') + '</div>'
        + '<div class="gc-popup-name">' + ev.name + '</div>'
        + (ev.desc ? '<div class="gc-popup-desc">' + ev.desc + '</div>' : '');
      inner.append(item);
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    let top = rect.bottom + scrollY + 8;
    let left = rect.left + window.scrollX;
    if (left + 300 > window.innerWidth - 16) left = window.innerWidth - 316;
    popup.style.top = top + 'px';
    popup.style.left = left + 'px';
    popup.classList.add('visible');
    e.stopPropagation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildCalendar);
  } else {
    buildCalendar();
  }

})();
</script>
