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
    var QR_Y = 190;
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
      body: "Every QR resolves through a Relinq address you control, so the printed code can keep working even when the destination changes.",
      icon: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    },
    {
      title: "Print-ready QR exports",
      body: "Download clean PNG and SVG files designed for real-world use across business cards, labels, packaging, posters, and menus.",
      icon: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    },
    {
      title: "Scan analytics",
      body: "See how often each QR is scanned and understand which physical placements are actually being used.",
      icon: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
    },
    {
      title: "Pause or repoint anytime",
      body: "Disable a QR, replace the destination, or redirect it to a new campaign without touching the printed asset.",
      icon: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
    },
    {
      title: "Simple landing pages",
      body: "Create lightweight destination pages for personal profiles, offers, menus, portfolios, invitations, and product information.",
      icon: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    },
    {
      title: "Built to scale later",
      body: "Start with one QR. Grow into multiple codes, projects, client folders, and advanced landing pages as your needs become more serious.",
      icon: '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m6.08 9.5-3.48 1.59a1 1 0 0 0 0 1.81l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.82L17.92 9.5"/><path d="m6.08 14.5-3.48 1.59a1 1 0 0 0 0 1.81l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.82l-3.42-1.59"/>',
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
    {
      label: "Business cards",
      note: "Change roles, portfolios, calendars, or contact pages without printing new cards.",
    },
    {
      label: "Product packaging",
      note: "Update product information, care instructions, manuals, warranty pages, or campaigns after packaging is already in circulation.",
    },
    {
      label: "Restaurant menus",
      note: "Point to seasonal menus, booking pages, delivery links, or special offers.",
    },
    {
      label: "Wedding invitations",
      note: "Start with RSVP details, then later redirect the same QR to photos, thank-you notes, or event memories.",
    },
    {
      label: "Event posters",
      note: "Use one printed poster before, during, and after an event by changing the destination at each stage.",
    },
    {
      label: "Workshop certificates",
      note: "Keep credentials, proof pages, and follow-up resources current long after the certificate is printed.",
    },
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
      body: "Scans resolve through a lightweight redirect route built for speed, not through a bloated interstitial page.",
    },
    {
      title: "Secure account management",
      body: "Only authenticated users can change destinations, manage QR codes, and view scan data.",
    },
    {
      title: "Destination validation",
      body: "Links are checked before they go live to reduce broken, malformed, or unsafe destinations.",
    },
    {
      title: "Privacy-conscious analytics",
      body: "Measure scan activity without building invasive profiles of the people scanning your codes.",
    },
    {
      title: "Print-safe output",
      body: "QR files are generated with clean contrast, proper spacing, and formats suitable for professional printing.",
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
     6. Pricing tiers. Plans are illustrative — every CTA opens
        the "coming soon" modal (see section 9).
     --------------------------------------------------------- */
  var PRICING = [
    {
      name: "Personal",
      price: "Free",
      period: "Forever",
      periodAccent: true,
      desc: "One dynamic QR for personal use and simple projects.",
      cta: "Get started",
      featured: false,
      features: [
        "1 active QR",
        "Basic analytics",
        "PNG download",
        "Relinq branding",
      ],
    },
    {
      name: "Professional",
      price: "€13",
      period: "/ month",
      desc: "Multiple QR codes, landing pages, and deeper analytics.",
      cta: "Choose Professional",
      featured: true,
      features: [
        "10 active QR codes",
        "SVG export",
        "Advanced analytics",
        "Landing pages",
        "Scheduled redirects",
        "Priority support",
      ],
    },
    {
      name: "Studio / Agency",
      price: "€88",
      period: "/ month",
      desc: "Projects, client management, and white-label work at scale.",
      cta: "Choose Studio",
      featured: false,
      features: [
        "50 active QR codes",
        "Projects & workspaces",
        "Client management",
        "White-label landing pages",
        "Team features",
        "Advanced analytics",
        "Additional QR capacity",
      ],
    },
  ];

  function buildPricing() {
    var host = document.getElementById("price-grid");
    if (!host) return;
    var tick =
      '<svg class="price-tick" viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M20 6 9 17l-5-5"/></svg>';
    PRICING.forEach(function (plan, i) {
      var card = document.createElement("article");
      card.className =
        "price-card reveal" + (plan.featured ? " price-card--featured" : "");
      card.style.setProperty("--d", i * 0.07 + "s");
      var feats = plan.features
        .map(function (f) {
          return "<li>" + tick + "<span>" + f + "</span></li>";
        })
        .join("");
      card.innerHTML =
        (plan.featured ? '<span class="price-tag">Most popular</span>' : "") +
        '<span class="price-name">' +
        plan.name +
        '</span><div class="price-amount"><span class="price-value">' +
        plan.price +
        "</span>" +
        (plan.period
          ? '<span class="price-period' +
            (plan.periodAccent ? " price-period--accent" : "") +
            '">' +
            plan.period +
            "</span>"
          : "") +
        '</div><p class="price-desc">' +
        plan.desc +
        '</p><a href="/signup" class="price-cta' +
        (plan.featured ? " price-cta--primary" : "") +
        '" aria-label="' +
        plan.cta +
        " — " +
        plan.name +
        ' plan">' +
        plan.cta +
        '</a><ul class="price-features">' +
        feats +
        "</ul>";
      host.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     7. Entrance reveals via IntersectionObserver.
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
     8. Header border state on scroll.
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
     9. "Coming soon" modal — every placeholder action link
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
    buildPricing();
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
