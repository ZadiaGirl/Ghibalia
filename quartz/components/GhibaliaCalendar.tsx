// quartz/components/GhibaliaCalendar.tsx

import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function GhibaliaCalendar(_props: QuartzComponentProps) {
  return <div id="ghibalia-calendar-root"></div>
}

GhibaliaCalendar.displayName = "GhibaliaCalendar"

GhibaliaCalendar.additionalHead = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </>
)

GhibaliaCalendar.css = `
  #ghibalia-calendar-root {
    --gc-bg: #fdf6ec;
    --gc-surface: #fffdf8;
    --gc-border: #d6c9a8;
    --gc-accent-green: #7aab8a;
    --gc-accent-gold: #c9a84c;
    --gc-accent-rose: #d4826a;
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
  .gc-day.is-today { outline: 2px solid #c9a84c; outline-offset: -2px; }

  .gc-day-num { font-size: 0.8rem; font-weight: 600; color: var(--gc-text-muted); line-height: 1; }
  .gc-day.has-event .gc-day-num { color: var(--gc-event); }
  .gc-day.is-holiday .gc-day-num { color: var(--gc-holiday); }
  .gc-day.is-today .gc-day-num { color: var(--gc-accent-gold); }

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

  .gc-day-link-hint {
    font-size: 0.55rem; color: var(--gc-text-muted); margin-top: 2px;
    opacity: 0; transition: opacity 0.15s;
  }
  .gc-day.has-event:hover .gc-day-link-hint,
  .gc-day.is-holiday:hover .gc-day-link-hint { opacity: 1; }

  .gc-multi-popup {
    display: none; position: fixed; z-index: 9999;
    background: var(--gc-surface); border: 1.5px solid var(--gc-border);
    border-radius: var(--gc-radius); box-shadow: 0 8px 36px rgba(80,60,30,0.18);
    padding: 1.1rem 1.3rem 1rem; max-width: 300px; min-width: 220px;
  }
  .gc-multi-popup.visible { display: block; animation: gc-fadein 0.16s ease; }
  @keyframes gc-fadein { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
  .gc-multi-popup-date {
    font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 600;
    color: var(--gc-text); margin-bottom: 0.6rem; padding-bottom: 0.45rem;
    border-bottom: 1px solid var(--gc-border);
  }
  .gc-multi-popup-close {
    position: absolute; top: 0.6rem; right: 0.75rem;
    background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--gc-text-muted);
  }
  .gc-multi-popup-moons { display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 0.7rem; font-size: 0.74rem; color: var(--gc-text-muted); }
  .gc-multi-popup-moon { display: flex; align-items: center; gap: 0.35rem; }
  .gc-event-link {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.45rem 0.6rem; border-radius: 8px; margin-bottom: 0.35rem;
    text-decoration: none; font-size: 0.84rem; font-weight: 600;
    border: 1.5px solid transparent; transition: all 0.15s;
  }
  .gc-event-link.holiday { color: var(--gc-holiday); background: #fdf0e8; border-color: #e8c9a8; }
  .gc-event-link.holiday:hover { background: #fce3cc; border-color: var(--gc-accent-rose); }
  .gc-event-link.event { color: var(--gc-event); background: #eef6f0; border-color: #c0dcc8; }
  .gc-event-link.event:hover { background: #ddf0e4; border-color: var(--gc-accent-green); }
  .gc-event-link-arrow { font-size: 0.8rem; opacity: 0.6; }

  .gc-legend {
    display: flex; gap: 1rem; flex-wrap: wrap;
    padding: 0.7rem 1.5rem; border-top: 1.5px solid var(--gc-border);
    background: var(--gc-bg); font-size: 0.72rem; color: var(--gc-text-muted);
  }
  .gc-legend-item { display: flex; align-items: center; gap: 0.35rem; }
  .gc-legend-dot { width: 8px; height: 8px; border-radius: 50%; }
`

GhibaliaCalendar.afterDOMLoaded = `
(function() {
  if (!document.getElementById("ghibalia-calendar-root")) return;

  var root = document.getElementById("ghibalia-calendar-root");
  var dateParts = (root.dataset.currentDate || "").split("/");
  var TODAY_MONTH = dateParts[1] ? parseInt(dateParts[1]) - 1 : 0;
  var TODAY_DAY = dateParts[2] ? parseInt(dateParts[2]) : 1;
  var YEAR_NUM = dateParts[0] ? parseInt(dateParts[0]) : 1305;

  var MONTHS = [
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

  var WEEKDAYS = ["Ahdin", "Dvas", "Triti", "Chiter", "Pyat"];

  var MOONS = [
    { name: "Yue",     cycle: 35, shift: 14, color: "#e8e8e8" },
    { name: "Cyosyue", cycle: 49, shift: 23, color: "#c9a84c" },
  ];

  // slug: the URL path after /Ghibalia/Events/
  // Days with multiple events will show a mini popup to choose which page to visit
  var BASE = "/Ghibalia/Events/";
  var EVENTS = [
    { month:0,  day:1,  type:"holiday", name:"Night of Light",          slug:"1. Sedin/Night-of-Light" },
    { month:0,  day:5,  type:"holiday", name:"The Seeding Festival",    slug:"1. Sedin/Seeding-Festival" },
    { month:0,  day:8,  type:"event",   name:"The Spawning",            slug:"1. Sedin/Spawning" },
    { month:1,  day:12, type:"holiday", name:"Quarrels Night",          slug:"2. Sprig/Quarrels-Night" },
    { month:1,  day:20, type:"holiday", name:"Week Of Morning",         slug:"2. Sprig/Week-Of-Morning" },
    { month:1,  day:25, type:"holiday", name:"Sisters Rebirth",         slug:"2. Sprig/Sisters-Rebirth" },
    { month:2,  day:1,  type:"holiday", name:"Spring Equinox",          slug:"3. Spring-Equinox/Spring-Equinox" },
    { month:3,  day:7,  type:"holiday", name:"Yue's Day",               slug:"4. Yuein/Yue's-Day" },
    { month:3,  day:12, type:"holiday", name:"Week of Repentance",      slug:"4. Yuein/Week-of-Repentance" },
    { month:4,  day:1,  type:"holiday", name:"The Emergence",           slug:"5. Tresvin/Emergence" },
    { month:4,  day:12, type:"holiday", name:"Alabaster's Day",         slug:"5. Tresvin/Alabaster's-Day" },
    { month:4,  day:21, type:"holiday", name:"Day of Alignment",        slug:"5. Tresvin/Day-of-Alignment" },
    { month:5,  day:1,  type:"holiday", name:"Sleep of the Sisters",    slug:"6. The-Day-of-Rest/Sleep-of-the-Sisters" },
    { month:6,  day:7,  type:"event",   name:"The Awakening",           slug:"7. Osin/Awakening" },
    { month:6,  day:20, type:"holiday", name:"Last Leaf Festival",      slug:"7. Osin/Last-Leaf-Festival" },
    { month:7,  day:17, type:"event",   name:"Bratin's Meteor Shower",  slug:"8. Bratin/Bratin's-Meteor-Shower" },
    { month:7,  day:30, type:"holiday", name:"The Final Feast",         slug:"8. Bratin/Final-Feast" },
    { month:8,  day:1,  type:"holiday", name:"Winter Equinox",          slug:"9. Winter-Equinox/Winter-Equinox" },
    { month:9,  day:1,  type:"holiday", name:"Snows Bringing",          slug:"10. Zima/Snows-Bringing" },
    { month:9,  day:25, type:"holiday", name:"The Sweet Bush Festival", slug:"10. Zima/Sweet-Bush-Festival" },
    { month:10, day:14, type:"holiday", name:"Festival of the Dawn",    slug:"11. Temnin/Festival-of-the-Dawn" },
    { month:10, day:30, type:"holiday", name:"The Melting Festival",    slug:"11. Temnin/Melting-Festival" },
    { month:11, day:1,  type:"holiday", name:"Krovi",                   slug:"12. Krovi/Krovi" },
    { month:12, day:1,  type:"holiday", name:"The Red Moons Festival",  slug:".Day-Of-Turning/Red-Moons-Festival" },
  ];

  var monthStarts = [];
  var totalDays = 0;
  MONTHS.forEach(function(m) { monthStarts.push(totalDays); totalDays += m.days; });

  var MOON_PHASES = [
    { name: "New Moon",        glyph: "\uD83C\uDF11" },
    { name: "Waxing Crescent", glyph: "\uD83C\uDF12" },
    { name: "First Quarter",   glyph: "\uD83C\uDF13" },
    { name: "Waxing Gibbous",  glyph: "\uD83C\uDF14" },
    { name: "Full Moon",       glyph: "\uD83C\uDF15" },
    { name: "Waning Gibbous",  glyph: "\uD83C\uDF16" },
    { name: "Last Quarter",    glyph: "\uD83C\uDF17" },
    { name: "Waning Crescent", glyph: "\uD83C\uDF18" },
  ];

  function moonPhase(moon, monthIdx, day) {
    var absDay = monthStarts[monthIdx] + day;
    var adjusted = (absDay + moon.shift) % moon.cycle;
    var phaseIdx = Math.floor((adjusted / moon.cycle) * 8) % 8;
    return MOON_PHASES[phaseIdx];
  }

  var currentMonth = TODAY_MONTH;

  function getEventsForDay(month, day) {
    return EVENTS.filter(function(e) { return e.month === month && e.day === day; });
  }

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function navigateTo(slug) {
    window.location.href = BASE + slug;
  }

  function buildCalendar() {
    var root = document.getElementById("ghibalia-calendar-root");
    root.innerHTML = "";
    var month = MONTHS[currentMonth];

    // Header
    var header = el("div", "gc-header");
    var titleWrap = el("div");
    titleWrap.innerHTML = "<div class='gc-header-title'>\uD83D\uDCDC The Calendar of Ghibalia</div>"
      + "<div class='gc-header-sub'>Year " + YEAR_NUM + " \u2014 " + totalDays + " days in the year</div>";
    var nav = el("div", "gc-nav");
    var prevBtn = el("button"); prevBtn.innerHTML = "\u2039";
    var yearDisp = el("div", "gc-year-display"); yearDisp.textContent = YEAR_NUM;
    var nextBtn = el("button"); nextBtn.innerHTML = "\u203A";
    prevBtn.onclick = function() { currentMonth = (currentMonth - 1 + MONTHS.length) % MONTHS.length;  };
    nextBtn.onclick = function() { currentMonth = (currentMonth + 1) % MONTHS.length;  };
    nav.append(prevBtn, yearDisp, nextBtn);
    header.append(titleWrap, nav);
    root.append(header);

    // Moon bar
    var moonBar = el("div", "gc-moon-bar");
    MOONS.forEach(function(moon) {
      var phase = moonPhase(moon, currentMonth, 1);
      var item = el("div", "gc-moon-item");
      item.innerHTML = "<span class='gc-moon-glyph'>" + phase.glyph + "</span>"
        + "<span class='gc-moon-name' style='color:" + moon.color + "'>" + moon.name + "</span>"
        + "<span class='gc-moon-phase'>\u2014 " + phase.name + " on 1st</span>";
      moonBar.append(item);
    });
    root.append(moonBar);

    // Month tabs
    var tabs = el("div", "gc-month-tabs");
    MONTHS.forEach(function(m, i) {
      var tab = el("button", "gc-month-tab" + (m.special ? " special" : ""));
      tab.textContent = m.name;
      if (i === currentMonth) tab.classList.add("active");
      tab.onclick = function() { currentMonth = i; buildCalendar(); };
      tabs.append(tab);
    });
    root.append(tabs);

    // Body
    var body = el("div", "gc-body");
    var mheader = el("div", "gc-month-header");
    var mlabel = el("div", "gc-month-label"); mlabel.textContent = month.name;
    mheader.append(mlabel);
    if (month.special) {
      var badge = el("div", "gc-month-badge"); badge.textContent = "Special Day";
      mheader.append(badge);
    }
    body.append(mheader);

    var mdesc = el("div", "gc-month-desc");
    mdesc.textContent = month.special
      ? "An intercalary day standing outside the regular weeks."
      : month.days + "-day month \u00B7 " + WEEKDAYS.length + "-day weeks";
    body.append(mdesc);

    if (!month.special) {
      var wdRow = el("div", "gc-weekdays");
      WEEKDAYS.forEach(function(d) {
        var wd = el("div", "gc-weekday"); wd.textContent = d; wdRow.append(wd);
      });
      body.append(wdRow);
    }

    var grid = el("div", month.special ? "gc-days single-day" : "gc-days");

    for (var d = 1; d <= month.days; d++) {
      var events = getEventsForDay(currentMonth, d);
      var holidays = events.filter(function(e) { return e.type === "holiday"; });
      var isToday = (currentMonth === TODAY_MONTH && d === TODAY_DAY);

      var dayEl = el("div", "gc-day");
      if (isToday) dayEl.classList.add("is-today");
      if (holidays.length) dayEl.classList.add("is-holiday");
      else if (events.length) dayEl.classList.add("has-event");

      var numEl = el("div", "gc-day-num"); numEl.textContent = d;
      //if (d === TODAY_DAY && currentMonth === TODAY_MONTH) {
      //    dayEL.style.outline = '2px solid #c9a84c';
      //    dayEL.style.outlineOffset = '-2px';
      //    dayEL.title = 'Today';
      //}
      dayEl.append(numEl);

      // Moon phases
      var moonRow = el("div", "gc-day-moons");
      MOONS.forEach(function(moon) {
        var phase = moonPhase(moon, currentMonth, d);
        var span = document.createElement("span");
        span.title = moon.name + ": " + phase.name;
        span.textContent = phase.glyph;
        moonRow.append(span);
      });
      dayEl.append(moonRow);

      if (events.length) {
        var dots = el("div", "gc-day-dots");
        events.forEach(function(ev) {
          var dot = el("div", "gc-dot " + (ev.type === "holiday" ? "holiday" : "event"));
          dots.append(dot);
        });
        dayEl.append(dots);

        var labelEl = el("div", "gc-day-label");
        labelEl.textContent = events.length === 1 ? events[0].name : events.length + " events";
        dayEl.append(labelEl);

        var hint = el("div", "gc-day-link-hint");
        hint.textContent = events.length === 1 ? "click to open \u2192" : "click to choose \u2192";
        dayEl.append(hint);

        // Click handler: single event = navigate directly, multiple = show chooser popup
        dayEl.onclick = (function(evs, mi, di) {
          return function(e) {
            if (evs.length === 1) {
              navigateTo(evs[0].slug);
            } else {
              showChooser(e, mi, di, evs);
            }
          };
        })(events, currentMonth, d);
      }

      grid.append(dayEl);
    }
    body.append(grid);
    root.append(body);

    // Legend
    var legend = el("div", "gc-legend");
    legend.innerHTML = "<div class='gc-legend-item'><div class='gc-legend-dot' style='background:#7aab8a'></div>Lore Event (click to open)</div>"
      + "<div class='gc-legend-item'><div class='gc-legend-dot' style='background:#d4826a'></div>Festival / Holiday (click to open)</div>"
      + "<div class='gc-legend-item'><span style='outline:2px solid #c9a84c;outline-offset:1px;border-radius:3px;padding:0 3px;font-size:0.75rem;color:#c9a84c'>" + TODAY_DAY + "</span>&nbsp;Today</div>"
      + "<div class='gc-legend-item'><span style='font-size:0.85rem'>\uD83C\uDF11\uD83C\uDF15</span>&nbsp;Moon phases (hover for name)</div>";
    root.append(legend);

    // Multi-event chooser popup (singleton)
    if (!document.getElementById("gc-multi-popup")) {
      var popup = document.createElement("div");
      popup.id = "gc-multi-popup";
      popup.className = "gc-multi-popup";
      popup.innerHTML = "<button class='gc-multi-popup-close' id='gc-multi-close'>\u2715</button><div id='gc-multi-inner'></div>";
      document.body.append(popup);
      document.getElementById("gc-multi-close").onclick = function() { popup.classList.remove("visible"); };
      document.addEventListener("click", function(e) {
        if (!e.target.closest("#gc-multi-popup") && !e.target.closest(".gc-day")) {
          popup.classList.remove("visible");
        }
      });
    }

    var activeTab = tabs.querySelector(".active");
    if (activeTab) activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function showChooser(e, monthIdx, day, events) {
    var popup = document.getElementById("gc-multi-popup");
    var inner = document.getElementById("gc-multi-inner");
    var monthName = MONTHS[monthIdx].name;

    inner.innerHTML = "<div class='gc-multi-popup-date'>" + monthName + ", Day " + day + "</div>";

    // Moon phases
    var moonDiv = el("div", "gc-multi-popup-moons");
    MOONS.forEach(function(moon) {
      var phase = moonPhase(moon, monthIdx, day);
      var item = el("div", "gc-multi-popup-moon");
      item.innerHTML = "<span>" + phase.glyph + "</span>"
        + "<span style='color:" + moon.color + ";font-weight:700'>" + moon.name + "</span>"
        + "<span>" + phase.name + "</span>";
      moonDiv.append(item);
    });
    inner.append(moonDiv);

    // One link button per event
    events.forEach(function(ev) {
      var link = document.createElement("a");
      link.href = BASE + ev.slug;
      link.className = "gc-event-link " + (ev.type === "holiday" ? "holiday" : "event");
      link.innerHTML = "<span>" + ev.name + "</span><span class='gc-event-link-arrow'>\u2192</span>";
      inner.append(link);
    });

    var rect = e.currentTarget.getBoundingClientRect();
    var scrollY = window.scrollY || window.pageYOffset;
    var top = rect.bottom + scrollY + 8;
    var left = rect.left + window.scrollX;
    if (left + 300 > window.innerWidth - 16) left = window.innerWidth - 316;
    popup.style.top = top + "px";
    popup.style.left = left + "px";
    popup.classList.add("visible");
    e.stopPropagation();
  }

  buildCalendar();
})();
`

export default (() => GhibaliaCalendar) satisfies QuartzComponentConstructor
