// quartz/components/GhibaliaCalendar.tsx
// Place this file at: quartz/components/GhibaliaCalendar.tsx

import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function GhibaliaCalendar(_props: QuartzComponentProps) {
  return <div id="ghibalia-calendar-root"></div>
}

GhibaliaCalendar.displayName = "GhibaliaCalendar"

// Load Google Fonts via additionalHead (correct way — not via .css @import)
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
`

GhibaliaCalendar.afterDOMLoaded = `
(function() {
  if (!document.getElementById('ghibalia-calendar-root')) return;

  var YEAR_NUM = 1305;
  var DAY_NUM = 10;
  var MONTH_NUM = 0;
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
    { name: "Yue",     cycle: 35, shift: 14, color: "#c9a84c" },
    { name: "Cyosyue", cycle: 49, shift: 23, color: "#7aaec9" },
  ];

  var EVENTS = [
    { month:0,  day:1,  type:"holiday", name:"Night of Light",          desc:"The new year begins with lights across the land.", slug:"Night-of-Light" },
    { month:0,  day:5,  type:"holiday", name:"The Seeding Festival",    desc:"", slug:"Seeding-Festival" },
    { month:0,  day:8,  type:"event",   name:"The Spawning",            desc:"", slug:"The-Spawning" },
    { month:1,  day:12, type:"holiday", name:"Quarrels Night",          desc:"", slug:"Quarrels-Night" },
    { month:1,  day:20, type:"holiday", name:"Week Of Morning",         desc:"", slug:"The-Week-Of-Mourning" },
    { month:1,  day:25, type:"holiday", name:"Sisters Rebirth",         desc:"", slug:"Sisters-Rebirth" },
    { month:2,  day:1,  type:"holiday", name:"Spring Equinox",          desc:"An intercalendary day marking the height of spring." },
    { month:3,  day:7,  type:"holiday", name:"Yue's Day",               desc:"" },
    { month:3,  day:12, type:"holiday", name:"Week of Repentance",      desc:"" },
    { month:4,  day:1,  type:"holiday", name:"The Emergence",           desc:"" },
    { month:4,  day:12, type:"holiday", name:"Alabaster's Day",         desc:"" },
    { month:4,  day:21, type:"holiday", name:"Day of Alignment",        desc:"" },
    { month:5,  day:1,  type:"holiday", name:"Sleep of the Sisters",    desc:"An intercalary day of quiet and stillness." },
    { month:6,  day:7,  type:"event",   name:"The Awakening",           desc:"" },
    { month:6,  day:20, type:"holiday", name:"Last Leaf Festival",      desc:"" },
    { month:7,  day:17, type:"event",   name:"Bratin's Meteor Shower",  desc:"" },
    { month:7,  day:30, type:"holiday", name:"The Final Feast",         desc:"" },
    { month:8,  day:1,  type:"holiday", name:"Winter Equinox",          desc:"An intercalary day marking the heart of winter." },
    { month:9,  day:1,  type:"holiday", name:"Snows Bringing",          desc:"" },
    { month:9,  day:25, type:"holiday", name:"The Sweet Bush Festival", desc:"" },
    { month:10, day:14, type:"holiday", name:"Festival of the Dawn",    desc:"" },
    { month:10, day:30, type:"holiday", name:"The Melting Festival",    desc:"" },
    { month:11, day:1,  type:"holiday", name:"Krovi",                   desc:"An intercalary day of blood and remembrance." },
    { month:12, day:1,  type:"holiday", name:"The Red Moons Festival",  desc:"The year ends as both moons glow red." },
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

  var currentMonth = 0;

  function getEventsForDay(month, day) {
    return EVENTS.filter(function(e) { return e.month === month && e.day === day; });
  }

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  function buildCalendar() {
    var root = document.getElementById("ghibalia-calendar-root");
    root.innerHTML = "";
    var month = MONTHS[currentMonth];

    var header = el("div", "gc-header");
    var titleWrap = el("div");
    titleWrap.innerHTML = "<div class='gc-header-title'>\uD83D\uDCDC The Calendar of Ghibalia</div>"
      + "<div class='gc-header-sub'>Year " + YEAR_NUM + " \u2014 " + totalDays + " days in the year</div>";
    var nav = el("div", "gc-nav");
    var prevBtn = el("button"); prevBtn.innerHTML = "\u2039";
    var yearDisp = el("div", "gc-year-display"); yearDisp.textContent = YEAR_NUM;
    var nextBtn = el("button"); nextBtn.innerHTML = "\u203A";
    prevBtn.onclick = function() { currentMonth = (currentMonth - 1 + MONTHS.length) % MONTHS.length; buildCalendar(); };
    nextBtn.onclick = function() { currentMonth = (currentMonth + 1) % MONTHS.length; buildCalendar(); };
    nav.append(prevBtn, yearDisp, nextBtn);
    header.append(titleWrap, nav);
    root.append(header);

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

    var tabs = el("div", "gc-month-tabs");
    MONTHS.forEach(function(m, i) {
      var tab = el("button", "gc-month-tab" + (m.special ? " special" : ""));
      tab.textContent = m.name;
      if (i === currentMonth) tab.classList.add("active");
      tab.onclick = function() { currentMonth = i; buildCalendar(); };
      tabs.append(tab);
    });
    root.append(tabs);

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

      var dayEl = el("div", "gc-day");
      if (holidays.length) dayEl.classList.add("is-holiday");
      else if (events.length) dayEl.classList.add("has-event");

      var numEl = el("div", "gc-day-num"); numEl.textContent = d;

      if (d === DAY_NUM && currentMonth === MONTH_NUM) {
           dayEl.style.outline = '2px solid #c9a84c';
           dayEl.style.outlineOffset = '-2px';
           dayEl.title = 'Today';
      }
      dayEl.append(numEl);

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
        labelEl.textContent = events[0].name;
        dayEl.append(labelEl);

        dayEl.onclick = () => }{
		window..location.href = '/Ghibalia/Events/' + events[0].slug
	} else {
		showPopup(e, currentMonth, d, events);
	}

      grid.append(dayEl);
    }
    body.append(grid);
    root.append(body);

    var legend = el("div", "gc-legend");
    legend.innerHTML = "<div class='gc-legend-item'><div class='gc-legend-dot' style='background:#7aab8a'></div>Lore Event</div>"
      + "<div class='gc-legend-item'><div class='gc-legend-dot' style='background:#d4826a'></div>Festival / Holiday</div>"
      + "<div class='gc-legend-item'><span style='font-size:0.85rem'>\uD83C\uDF11\uD83C\uDF15</span>&nbsp;Moon phases per day (hover for name)</div>";
    root.append(legend);

    if (!document.getElementById("gc-popup")) {
      var popup = document.createElement("div");
      popup.id = "gc-popup";
      popup.className = "gc-popup";
      popup.innerHTML = "<button class='gc-popup-close' id='gc-popup-close'>\u2715</button><div id='gc-popup-inner'></div>";
      document.body.append(popup);
      document.getElementById("gc-popup-close").onclick = function() { popup.classList.remove("visible"); };
      document.addEventListener("click", function(e) {
        if (!e.target.closest("#gc-popup") && !e.target.closest(".gc-day.has-event,.gc-day.is-holiday")) {
          popup.classList.remove("visible");
        }
      });
    }

    var activeTab = tabs.querySelector(".active");
    if (activeTab) activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function showPopup(e, monthIdx, day, events) {
    var popup = document.getElementById("gc-popup");
    var inner = document.getElementById("gc-popup-inner");
    var monthName = MONTHS[monthIdx].name;

    inner.innerHTML = "<div class='gc-popup-date'>" + monthName + ", Day " + day + " \u2014 Year " + YEAR_NUM + "</div>";

    var moonDiv = el("div", "gc-popup-moons");
    MOONS.forEach(function(moon) {
      var phase = moonPhase(moon, monthIdx, day);
      var item = el("div", "gc-popup-moon");
      item.innerHTML = "<span style='font-size:1rem'>" + phase.glyph + "</span>"
        + "<span style='color:" + moon.color + ";font-weight:700'>" + moon.name + "</span>"
        + "<span>" + phase.name + "</span>";
      moonDiv.append(item);
    });
    inner.append(moonDiv);

    events.forEach(function(ev) {
      var item = document.createElement("div"); item.className = "gc-popup-item";
      item.innerHTML = "<div class='gc-popup-type " + (ev.type === "holiday" ? "holiday" : "event") + "'>"
        + (ev.type === "holiday" ? "\u2726 Festival / Holiday" : "\u25C6 Lore Event") + "</div>"
        + "<div class='gc-popup-name'>" + ev.name + "</div>"
        + (ev.desc ? "<div class='gc-popup-desc'>" + ev.desc + "</div>" : "");
      inner.append(item);
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
