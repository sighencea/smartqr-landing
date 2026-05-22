/* ============================================================
   Relinq — landing page behaviour
   Vanilla JS. No build step, no dependencies.
   ============================================================ */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. QR pattern — three finder squares + deterministic field.
        Stylised only; no real payload is encoded.
     --------------------------------------------------------- */
  function buildQR() {
    var host = document.getElementById("qr-modules");
    if (!host) return;

    var N = 21;
    var QR_X = 46;
    var QR_Y = 172;
    var M = 140 / N;
    var corners = [
      [0, 0],
      [0, N - 7],
      [N - 7, 0],
    ];

    function moduleOn(r, c) {
      for (var i = 0; i < corners.length; i++) {
        var r0 = corners[i][0];
        var c0 = corners[i][1];
        if (r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7) {
          var rr = r - r0;
          var cc = c - c0;
          return (
            rr === 0 ||
            rr === 6 ||
            cc === 0 ||
            cc === 6 ||
            (rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4)
          );
        }
      }
      var near =
        (r < 8 && c < 8) ||
        (r < 8 && c >= N - 8) ||
        (r >= N - 8 && c < 8);
      if (near) return false;
      return ((r * 3 + 1) * (c * 7 + 5) + r * r + c) % 7 < 3;
    }

    var ns = "http://www.w3.org/2000/svg";
    var frag = document.createDocumentFragment();
    for (var r = 0; r < N; r++) {
      for (var c = 0; c < N; c++) {
        if (!moduleOn(r, c)) continue;
        var rect = document.createElementNS(ns, "rect");
        rect.setAttribute("x", String(QR_X + c * M));
        rect.setAttribute("y", String(QR_Y + r * M));
        rect.setAttribute("width", String(M + 0.4));
        rect.setAttribute("height", String(M + 0.4));
        frag.appendChild(rect);
      }
    }
    host.appendChild(frag);
  }

  /* ---------------------------------------------------------
     2. Cycle the live destination in the hero diagram.
     --------------------------------------------------------- */
  function cycleDestinations() {
    var chips = document.querySelectorAll(".chip");
    var conns = document.querySelectorAll(".conn");
    if (!chips.length || reduceMotion) return;

    var active = 0;
    window.setInterval(function () {
      chips[active].classList.remove("active");
      conns[active].classList.remove("active");
      active = (active + 1) % chips.length;
      chips[active].classList.add("active");
      conns[active].classList.add("active");
    }, 2600);
  }

  /* ---------------------------------------------------------
     3. Feature cards.
     --------------------------------------------------------- */
  var FEATURES = [
    {
      title: "Dynamic redirect links",
      body: "Each QR resolves through a Relinq address you control. Repoint it without touching the printed code.",
      icon: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    },
    {
      title: "QR download as PNG/SVG",
      body: "Export print-ready files at any resolution. Vector SVG stays crisp from business card to billboard.",
      icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    },
    {
      title: "Scan analytics",
      body: "See scan volume and trends over time, so you know how physical placements actually perform.",
      icon: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    },
    {
      title: "Disable or update anytime",
      body: "Pause a destination, swap it, or retire it entirely — changes take effect on the next scan.",
      icon: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
    },
    {
      title: "Built for cards and packaging",
      body: "Designed for surfaces that are expensive to reprint: business cards, labels, menus, and products.",
      icon: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    },
    {
      title: "Future-ready for teams",
      body: "Shared workspaces and custom domains are on the roadmap, so the system scales with your output.",
      icon: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    },
  ];

  function buildFeatures() {
    var host = document.getElementById("feature-grid");
    if (!host) return;
    FEATURES.forEach(function (f, i) {
      var card = document.createElement("article");
      card.className = "feature-card reveal";
      card.style.setProperty("--d", i * 0.05 + "s");
      card.innerHTML =
        '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' +
        f.icon +
        "</svg><h3>" +
        f.title +
        "</h3><p>" +
        f.body +
        "</p>";
      host.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     4. Use cases.
     --------------------------------------------------------- */
  var CASES = [
    { label: "Business cards", note: "Repoint as roles change" },
    { label: "Product packaging", note: "Update without a reprint run" },
    { label: "Restaurant menus", note: "Swap seasonal links" },
    { label: "Event posters", note: "Route before and after the date" },
    { label: "Workshop certificates", note: "Keep credentials current" },
    { label: "Artist portfolios", note: "Always point to latest work" },
  ];

  function buildCases() {
    var host = document.getElementById("case-grid");
    if (!host) return;
    CASES.forEach(function (item, i) {
      var li = document.createElement("li");
      li.className = "case-card reveal";
      li.style.setProperty("--d", i * 0.04 + "s");
      var n = String(i + 1);
      if (n.length < 2) n = "0" + n;
      li.innerHTML =
        "<div><h3>" +
        item.label +
        "</h3><p>" +
        item.note +
        '</p></div><span class="case-index">' +
        n +
        "</span>";
      host.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     5. Technical trust points.
     --------------------------------------------------------- */
  var TRUST = [
    {
      title: "Fast server-side redirects",
      body: "Destinations resolve through a redirect layer tuned for speed — not a heavy interstitial page.",
    },
    {
      title: "Secure account management",
      body: "Destinations sit behind authenticated access, so only you can change where a code points.",
    },
    {
      title: "Destination validation",
      body: "Links are checked before they go live, reducing the risk of broken or malformed targets.",
    },
    {
      title: "Analytics without invasive tracking",
      body: "Scan counts and trends, measured without building profiles of the people scanning.",
    },
    {
      title: "Designed for print-safe QR use",
      body: "Error-correction-friendly output keeps codes scannable across real-world print conditions.",
    },
  ];

  function buildTrust() {
    var host = document.getElementById("trust-list");
    if (!host) return;
    TRUST.forEach(function (t) {
      var li = document.createElement("li");
      li.className = "trust-item";
      li.innerHTML =
        '<span class="trust-mark" aria-hidden="true"></span><div><h3>' +
        t.title +
        "</h3><p>" +
        t.body +
        "</p></div>";
      host.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     6. Entrance reveals via IntersectionObserver.
     --------------------------------------------------------- */
  function observeReveals() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------------------------------------------------------
     7. Header border state on scroll.
     --------------------------------------------------------- */
  function headerScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    function update() {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------------------------------------------------------
     8. "Coming soon" modal — every placeholder action link
        (href="/signup") opens it instead of navigating.
        In-page anchor links keep their normal scroll behaviour.
     --------------------------------------------------------- */
  function wireComingSoon() {
    var modal = document.getElementById("coming-soon");
    if (!modal) return;
    var card = modal.querySelector(".modal-card");
    var lastFocus = null;

    function focusables() {
      return modal.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
    }

    function onKey(e) {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab") return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function open(e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      var action = card.querySelector(".modal-action");
      if (action) action.focus();
      document.addEventListener("keydown", onKey);
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    modal.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", close);
    });
    document.querySelectorAll('a[href="/signup"]').forEach(function (el) {
      el.addEventListener("click", open);
    });
  }

  /* --------------------------------------------------------- */
  function init() {
    buildQR();
    buildFeatures();
    buildCases();
    buildTrust();
    cycleDestinations();
    observeReveals();
    headerScroll();
    wireComingSoon();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
