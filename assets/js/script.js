'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// theme toggle — the head script has already set data-theme from storage / OS
const themeToggle = document.querySelector("[data-theme-toggle]");
if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

/**
 * Web3Forms delivers the message to khattabafas@gmail.com.
 *
 * A page on GitHub Pages is static — it can serve files and nothing else — so
 * the form has to hand the message to a service that can send mail. This key is
 * public by design: it only says "deliver to this inbox", it grants no access to
 * the mailbox and cannot be used to read anything.
 */
const WEB3FORMS_KEY = "417bd966-36eb-48ba-9d64-01982216a016";

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

/** Says what happened, where the person is already looking. */
const setStatus = function (state, text) {
  if (!formStatus) return;
  formStatus.textContent = text;
  formStatus.className = "form-status " + state;
};

if (form) {
  form.addEventListener("submit", async function (event) {
    /*
     * Always. Without this the browser navigates to the action, which for the
     * template default of "#" meant a reload with the visitor's message pasted
     * into the address bar and delivered precisely nowhere.
     */
    event.preventDefault();

    // Honeypot: a real person leaves this hidden field empty. Answer as though
    // it worked, so a bot learns nothing from the difference.
    if (form.botcheck && form.botcheck.checked) {
      setStatus("ok", "Thanks for getting in touch! I've received your message and I'll be reaching out with a reply soon.");
      form.reset();
      return;
    }

    formBtn.setAttribute("disabled", "");
    setStatus("busy", "Sending…");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New message from your portfolio",
          from_name: "Portfolio contact form",
          name: form.fullname.value,
          email: form.email.value,
          message: form.message.value,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("ok", "Thanks for getting in touch! I've received your message and I'll be reaching out to " + form.email.value + " with a reply soon.");
        form.reset();
      } else {
        throw new Error(result.message || "the service refused the message");
      }
    } catch (error) {
      /*
       * Never swallow this. A visitor who is told nothing assumes it worked and
       * never follows up, which is exactly how the old form lost enquiries.
       */
      setStatus(
        "bad",
        "That did not send (" + error.message + "). Please email khattabafas@gmail.com directly.",
      );
    } finally {
      if (form.checkValidity()) formBtn.removeAttribute("disabled");
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        navigationLinks[i].setAttribute("aria-current", "page");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
        navigationLinks[i].removeAttribute("aria-current");
      }
    }

  });
}



// ------------------------------------------------------------------
// portfolio screenshot gallery
// ------------------------------------------------------------------

const GALLERIES = {
  amisam: {
    title: "AMISAM — Savings & Microfinance Platform",
    source: "https://github.com/kh0tt0b/amisam",
    blurb:
      "A savings-group platform for a Rwandan cooperative: members pay in, the group lends and runs a monthly lottery, and every franc is accounted for. A web console for the administrators and a React Native app for members, both talking to one REST API. Money in and out goes through MTN Mobile Money with the group's admin fee taken automatically; KYC, disbursements, claims and a full audit trail are built in.",
    stack: ["Laravel", "REST API", "React Native", "MySQL", "MTN MoMo", "KYC"],
    shots: [
      ["amisam-web-dashboard.webp", "Web · Admin Dashboard — live KPIs from the running API"],
      ["amisam-web-members.webp", "Web · Member management — KYC status, balances, verification"],
      ["amisam-web-payments.webp", "Web · Payments — MTN MoMo flow with 10% admin fee"],
      ["amisam-web-disbursements.webp", "Web · Disbursements & lottery — winners and claims"],
      ["amisam-web-reports.webp", "Web · Reporting — balance sheet, cycle summary, audit trail"],
      ["amisam-mobile-login.webp", "Mobile · Member sign-in (React Native)"],
      ["amisam-mobile-home.webp", "Mobile · Home dashboard — RWF 185,000 balance, quick actions"],
      ["amisam-mobile-transactions.webp", "Mobile · Transactions — Payment In RWF 50,000 (PAY202608020030)"],
      ["amisam-mobile-disbursements.webp", "Mobile · Disbursements — lottery winnings & goods"],
      ["amisam-mobile-profile.webp", "Mobile · Profile — member #1, KYC verified, ACTIVE"],
    ],
  },
  "restaurant-pos": {
    title: "Restaurant POS — Service Geometry",
    source: "https://github.com/kh0tt0b/restaurant-pos",
    blurb:
      "A tablet-first point of sale for a full-service restaurant — dine-in, takeaway and delivery — that keeps working with the wi-fi off and syncs when it returns. Orders sent to the kitchen appear there live over SSE; every total is calculated on the server, never the client; staff sign in with a name and a 4-digit PIN and see only what their role allows. One codebase ships as a web app and as an offline desktop build.",
    stack: ["Node 24", "TypeScript", "node:sqlite", "React", "Vite", "SSE", "Offline-first"],
    shots: [
      ["pos-floor-plan.webp", "Floor plan — four table states at a glance: free, in service, bill asked, running late"],
      ["pos-order-ticket.webp", "Order — menu, live ticket and a kitchen-state chip; every total comes from the server"],
      ["pos-kitchen-pass.webp", "Kitchen pass — pushed over SSE, big type, no prices, and an undo strip for a wrong bump"],
      ["pos-payment-bills.webp", "Payment — open bills coloured by where the food is: blue in the kitchen, yellow up and waiting"],
      ["pos-dashboard.webp", "Reporting — sales by hour, top items, tender split, all from the live database"],
      ["pos-sign-in.webp", "Staff sign-in — pick a name, then a 4-digit PIN; role decides what the till will show"],
    ],
  },
  soko: {
    title: "SOKO — Multi-Vendor Marketplace",
    source: "https://github.com/kh0tt0b/soko-marketplace-20260707",
    blurb:
      "A multi-vendor marketplace as a monorepo: a NestJS API, a React storefront and a Flutter app that all share one set of Zod contracts, so the same validation runs on the server, the web and the phone. Auth, a vendor catalogue, an admin review queue and real-time updates over WebSockets, all wired together with Docker Compose behind an Nginx proxy.",
    stack: ["NestJS", "Prisma", "PostgreSQL", "Redis", "React 19", "Flutter", "WebSockets", "Docker"],
    shots: [
      ["soko-web-marketplace.webp", "Web · Storefront — 17 live listings from the catalog API"],
      ["soko-web-login.webp", "Web · Authentication — email + password"],
      ["soko-web-home.webp", "Web · Home (logged in) — session-backed navigation"],
      ["soko-web-admin.webp", "Web · Admin dashboard — 3 users, 17 active listings, 0 pending"],
      ["soko-web-account.webp", "Web · Account — profile data from the API"],
      ["soko-mobile-marketplace.webp", "Mobile · Marketplace (Flutter) — live catalog over LAN"],
      ["soko-mobile-detail.webp", "Mobile · Listing detail — Trek Domane SL 5, $2,800, Cairo"],
      ["soko-mobile-login.webp", "Mobile · Sign-in screen"],
    ],
  },
  sijil: {
    title: "Sijil — Offline POS & Billing",
    source: "https://github.com/kh0tt0b/sijil",
    blurb:
      "An offline-first POS and billing app for a small retail shop — barcode scanning, Bluetooth thermal receipts, and a stock ledger that can explain every count because totals are rebuilt from dated movements rather than stored. Money is integer maths at three decimal places, never floating point. Ships as two editions from one codebase: a single-till build with no network permission at all, and a multi-till build that syncs through a small Node server on the shop's own laptop. English and Arabic, right-to-left.",
    stack: ["Flutter", "Dart", "flutter_bloc", "Hive", "go_router", "mobile_scanner", "ESC/POS", "Node"],
    shots: [
      ["sijil-mobile-checkout.webp", "Checkout — camera barcode scan with live cart panel, real shop data"],
      ["sijil-mobile-products.webp", "Product Management — stock, prices and units, scan-to-find by barcode"],
      ["sijil-mobile-sales-history.webp", "Sales History — daily takings by payment method, per-receipt breakdown"],
      ["sijil-mobile-settings.webp", "Settings — products, shop details, sales history and scan behaviour"],
    ],
  },
  "rwanda-id-scanner": {
    title: "Rwanda ID Scanner",
    source: "https://github.com/kh0tt0b/rwanda-id-scanner",
    blurb:
      "Reads the Rwandan national ID with a phone camera and pushes the fields into whatever system is registering people. There is no public spec for the card, so the app was built around discovery: a raw-dump view that shows any barcode's bytes verbatim, a decoder for the PDF417 that a real card turned out to carry, an on-device OCR path for the machine-readable zone, and a plug-in slot for new formats. Nothing is uploaded — OCR runs on the device, in line with Rwanda's data-protection law.",
    stack: ["Flutter", "mobile_scanner", "ML Kit OCR", "PDF417", "ICAO MRZ", "On-device"],
    shots: [
      ["rwanda-id-mobile-scan.webp", "Scan tab — camera aimed at the card's barcode, live viewfinder"],
      ["rwanda-id-mobile-mrz.webp", "MRZ tab — on-device OCR fallback for cards with no barcode"],
      ["rwanda-id-mobile-raw.webp", "Raw dump — every payload byte verbatim, for writing new parsers"],
      ["rwanda-id-mobile-settings.webp", "Settings — clipboard auto-copy templates for the registration system"],
    ],
  },
};

const shotsModalContainer = document.querySelector("[data-shots-modal-container]");
const shotsOverlay = document.querySelector("[data-shots-overlay]");
const shotsCloseBtn = document.querySelector("[data-shots-close-btn]");
const shotsTitle = document.querySelector("[data-shots-title]");
const shotsSource = document.querySelector("[data-shots-source]");
const shotsImg = document.querySelector("[data-shots-img]");
const shotsCaption = document.querySelector("[data-shots-caption]");
const shotsThumbs = document.querySelector("[data-shots-thumbs]");
const shotsPrev = document.querySelector("[data-shots-prev]");
const shotsNext = document.querySelector("[data-shots-next]");
const shotsCount = document.querySelector("[data-shots-count]");
const shotsAbout = document.querySelector("[data-shots-about]");
const shotsBlurb = document.querySelector("[data-shots-blurb]");
const shotsStack = document.querySelector("[data-shots-stack]");

let currentShots = [];
let currentIndex = 0;

function shotsOpen(galleryKey) {
  const gallery = GALLERIES[galleryKey];
  if (!gallery) return;
  currentShots = gallery.shots;
  currentIndex = 0;
  shotsTitle.innerHTML = gallery.title;
  shotsSource.href = gallery.source;
  shotsThumbs.innerHTML = "";
  gallery.shots.forEach((shot, i) => {
    const btn = document.createElement("button");
    btn.className = "shots-thumb" + (i === 0 ? " active" : "");
    btn.innerHTML = '<img src="./assets/images/screenshots/' + shot[0] + '" alt="" loading="lazy">';
    btn.addEventListener("click", function () { shotsShow(i); });
    shotsThumbs.appendChild(btn);
  });

  if (shotsAbout) {
    if (gallery.blurb) {
      shotsBlurb.textContent = gallery.blurb;
      shotsStack.innerHTML = "";
      (gallery.stack || []).forEach((tech) => {
        const li = document.createElement("li");
        li.textContent = tech;
        shotsStack.appendChild(li);
      });
      shotsAbout.hidden = false;
    } else {
      shotsAbout.hidden = true;
    }
  }

  shotsModalContainer.scrollTop = 0;
  const modalBody = shotsModalContainer.querySelector(".shots-modal");
  if (modalBody) modalBody.scrollTop = 0;
  shotsShow(0);
  shotsModalContainer.classList.add("active");
  shotsOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function shotsClose() {
  shotsModalContainer.classList.remove("active");
  shotsOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

const shotsPath = "./assets/images/screenshots/";

function shotsShow(index) {
  currentIndex = (index + currentShots.length) % currentShots.length;
  const shot = currentShots[currentIndex];
  shotsImg.src = shotsPath + shot[0];
  shotsImg.alt = shot[1];
  shotsCaption.textContent = shot[1];
  if (shotsCount) shotsCount.textContent = (currentIndex + 1) + " / " + currentShots.length;
  Array.from(shotsThumbs.children).forEach((el, i) => {
    el.classList.toggle("active", i === currentIndex);
  });
  const activeThumb = shotsThumbs.children[currentIndex];
  if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  // preload the neighbours so left/right arrows feel instant
  [1, -1].forEach((step) => {
    const next = currentShots[(currentIndex + step + currentShots.length) % currentShots.length];
    if (next) { const im = new Image(); im.src = shotsPath + next[0]; }
  });
}

// open from project cards
document.querySelectorAll("[data-gallery]").forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    shotsOpen(this.dataset.gallery);
  });
});

// close controls
shotsCloseBtn.addEventListener("click", shotsClose);
shotsOverlay.addEventListener("click", shotsClose);

// navigation
shotsPrev.addEventListener("click", function () { shotsShow(currentIndex - 1); });
shotsNext.addEventListener("click", function () { shotsShow(currentIndex + 1); });

// keyboard support
document.addEventListener("keydown", function (e) {
  if (!shotsModalContainer.classList.contains("active")) return;
  if (e.key === "Escape") { shotsClose(); }
  else if (e.key === "ArrowLeft") { shotsShow(currentIndex - 1); }
  else if (e.key === "ArrowRight") { shotsShow(currentIndex + 1); }
});

// swipe support
let swipeStartX = null;
shotsModalContainer.addEventListener("touchstart", function (e) { swipeStartX = e.touches[0].clientX; }, { passive: true });
shotsModalContainer.addEventListener("touchend", function (e) {
  if (swipeStartX === null) return;
  const dx = e.changedTouches[0].clientX - swipeStartX;
  if (Math.abs(dx) > 50) shotsShow(currentIndex + (dx < 0 ? 1 : -1));
  swipeStartX = null;
}, { passive: true });



// ------------------------------------------------------------------
// scroll reveal
// ------------------------------------------------------------------

(function () {
  const groups = [
    ".service-item",
    ".timeline-item",
    ".skills-item",
    ".project-item",
  ];

  const targets = [];
  groups.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      // stagger items within a group, capped so nothing waits too long
      el.style.setProperty("--reveal-delay", Math.min(i, 6) * 0.06 + "s");
      targets.push(el);
    });
  });

  const revealAll = (root) =>
    (root || document).querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
      el.style.setProperty("--reveal-delay", "0s");
      el.classList.add("in-view");
    });

  if (!("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => io.observe(el));

  // Switching to another page shows a fresh article the observer never saw
  // scroll for — just reveal that whole page so nothing is ever left invisible.
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", function () {
      const page = this.textContent.trim().toLowerCase();
      setTimeout(() => {
        const article = document.querySelector('[data-page="' + page + '"]');
        if (article) revealAll(article);
      }, 60);
    });
  });

  // Safety net: never leave content on the visible page hidden.
  setTimeout(() => revealAll(document.querySelector("article.active")), 1600);
})();


// ------------------------------------------------------------------
// interactive terminal — a little coding-themed Easter egg for the navbar
// ------------------------------------------------------------------

(function () {
  const toggleBtn = document.querySelector("[data-terminal-toggle]");
  const modal = document.querySelector("[data-terminal-modal]");
  if (!toggleBtn || !modal) return;

  const overlay = document.querySelector("[data-terminal-overlay]");
  const closeBtn = document.querySelector("[data-terminal-close]");
  const body = document.querySelector("[data-terminal-body]");
  const input = document.querySelector("[data-terminal-input]");

  const history = [];
  let historyIndex = -1;
  let booted = false;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function print(text, cls, delay) {
    const line = document.createElement("div");
    line.className = "term-line " + (cls || "term-line-out");
    line.innerHTML = escapeHtml(text);
    line.style.animationDelay = (delay || 0) + "ms";
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
    return line;
  }

  function printEcho(cmd) {
    print(cmd, "term-line-cmd");
  }

  function printLines(lines, cls, stagger) {
    lines.forEach((l, i) => print(l, cls, stagger ? i * 60 : 0));
    body.scrollTop = body.scrollHeight;
  }

  function goToPage(pageName) {
    const link = [...document.querySelectorAll("[data-nav-link]")].find(
      (b) => b.textContent.trim().toLowerCase() === pageName
    );
    if (link) link.click();
    return !!link;
  }

  function collectSkills() {
    return [...document.querySelectorAll(".skills-item h5")].map((el) => el.textContent.trim());
  }

  function collectProjects() {
    return Object.keys(GALLERIES || {}).map((key) => ({
      key,
      title: (GALLERIES[key] && GALLERIES[key].title) || key,
    }));
  }

  const HELP = [
    "Available commands:",
    "  about              short bio",
    "  skills             what I actually work with",
    "  projects           list of things I've shipped",
    "  open <page>        about | resume | portfolio | contact",
    "  contact            how to reach me",
    "  whoami             guess",
    "  theme <dark|light> switch the site theme",
    "  date               current date and time",
    "  echo <text>        repeats text back",
    "  clear              clear the screen",
    "  exit               close this terminal",
  ];

  function runCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    printEcho(trimmed);
    history.push(trimmed);
    historyIndex = history.length;

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    const lc = cmd.toLowerCase();

    switch (lc) {
      case "help":
        printLines(HELP, "term-line-out");
        break;

      case "about":
        printLines(
          [
            "Khattab Afifi — founder of Meroe Systems, a small software studio in Kigali, Rwanda.",
            "Full-stack: fintech, e-commerce and point-of-sale systems, web and mobile.",
            "Type 'open about' to read the full page.",
          ],
          "term-line-out"
        );
        break;

      case "skills": {
        const skills = collectSkills();
        printLines(skills.length ? skills.map((s) => "  * " + s) : ["No skills listed yet."], "term-line-out");
        break;
      }

      case "projects":
      case "ls":
        collectProjects().forEach((p) =>
          print("  " + p.key.padEnd(20, " ") + p.title, "term-line-accent")
        );
        print("Type 'open portfolio' to see them with screenshots.", "term-line-dim");
        break;

      case "open": {
        const target = (arg || "").toLowerCase();
        const pages = ["about", "resume", "portfolio", "contact"];
        if (pages.includes(target)) {
          print("Opening " + target + "…", "term-line-out");
          setTimeout(() => {
            goToPage(target);
            closeTerminal();
          }, 350);
        } else {
          print("Usage: open <about|resume|portfolio|contact>", "term-line-err");
        }
        break;
      }

      case "contact":
        printLines(
          [
            "Email:    khattabafas@gmail.com",
            "Phone:    +250 795-461-456",
            "GitHub:   github.com/kh0tt0b",
            "LinkedIn: linkedin.com/in/khattab-mohamed-8b2550388",
            "Type 'open contact' to use the contact form.",
          ],
          "term-line-out"
        );
        break;

      case "whoami":
        print("A visitor with good taste, checking a founder's terminal for fun. Respect.", "term-line-accent");
        break;

      case "sudo":
        print("Permission denied: you are not root here.", "term-line-err");
        print("But I'll happily grant you my email instead: khattabafas@gmail.com", "term-line-out");
        break;

      case "theme": {
        const t = (arg || "").toLowerCase();
        if (t === "dark" || t === "light") {
          document.documentElement.setAttribute("data-theme", t);
          try { localStorage.setItem("theme", t); } catch (e) {}
          print("Theme set to " + t + ".", "term-line-out");
        } else {
          print("Usage: theme <dark|light>", "term-line-err");
        }
        break;
      }

      case "date":
        print(new Date().toString(), "term-line-out");
        break;

      case "echo":
        print(arg, "term-line-out");
        break;

      case "hire":
        print("Let's talk. Type 'open contact' or email khattabafas@gmail.com directly.", "term-line-accent");
        break;

      case "clear":
      case "cls":
        body.innerHTML = "";
        break;

      case "exit":
        closeTerminal();
        break;

      default:
        print("command not found: " + cmd + " — type 'help'", "term-line-err");
    }
  }

  function bootSequence() {
    body.innerHTML = "";
    printLines(
      [
        "Meroe Systems terminal v1.0",
        "Type 'help' to see what this does.",
        "",
      ],
      "term-line-dim",
      true
    );
    booted = true;
  }

  function openTerminal() {
    modal.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    if (!booted) bootSequence();
    setTimeout(() => input.focus(), 150);
  }

  function closeTerminal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openTerminal);
  closeBtn.addEventListener("click", closeTerminal);
  overlay.addEventListener("click", closeTerminal);

  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeTerminal();
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      runCommand(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length) {
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || "";
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length) {
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || "";
      }
    }
  });

  // clicking anywhere in the body focuses the input, like a real terminal
  body.addEventListener("click", () => input.focus());
})();
