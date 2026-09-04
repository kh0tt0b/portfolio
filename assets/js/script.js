'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



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
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
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
    shots: [
      ["amisam-web-dashboard.png", "Web · Admin Dashboard — live KPIs from the running API"],
      ["amisam-web-members.png", "Web · Member management — KYC status, balances, verification"],
      ["amisam-web-payments.png", "Web · Payments — MTN MoMo flow with 10% admin fee"],
      ["amisam-web-disbursements.png", "Web · Disbursements & lottery — winners and claims"],
      ["amisam-web-reports.png", "Web · Reporting — balance sheet, cycle summary, audit trail"],
      ["amisam-mobile-login.png", "Mobile · Member sign-in (React Native)"],
      ["amisam-mobile-home.png", "Mobile · Home dashboard — RWF 185,000 balance, quick actions"],
      ["amisam-mobile-transactions.png", "Mobile · Transactions — Payment In RWF 50,000 (PAY202608020030)"],
      ["amisam-mobile-disbursements.png", "Mobile · Disbursements — lottery winnings & goods"],
      ["amisam-mobile-profile.png", "Mobile · Profile — member #1, KYC verified, ACTIVE"],
    ],
  },
  "restaurant-pos": {
    title: "Restaurant POS — Service Geometry",
    source: "https://github.com/kh0tt0b/restaurant-pos",
    shots: [
      ["pos-floor-plan.png", "Floor plan — four table states at a glance: free, in service, bill asked, running late"],
      ["pos-order-ticket.png", "Order — menu, live ticket and a kitchen-state chip; every total comes from the server"],
      ["pos-kitchen-pass.png", "Kitchen pass — pushed over SSE, big type, no prices, and an undo strip for a wrong bump"],
      ["pos-payment-bills.png", "Payment — open bills coloured by where the food is: blue in the kitchen, yellow up and waiting"],
      ["pos-dashboard.png", "Reporting — sales by hour, top items, tender split, all from the live database"],
      ["pos-sign-in.png", "Staff sign-in — pick a name, then a 4-digit PIN; role decides what the till will show"],
    ],
  },
  soko: {
    title: "SOKO — Multi-Vendor Marketplace",
    source: "https://github.com/kh0tt0b/soko-marketplace-20260707",
    shots: [
      ["soko-web-marketplace.png", "Web · Storefront — 17 live listings from the catalog API"],
      ["soko-web-login.png", "Web · Authentication — email + password"],
      ["soko-web-home.png", "Web · Home (logged in) — session-backed navigation"],
      ["soko-web-admin.png", "Web · Admin dashboard — 3 users, 17 active listings, 0 pending"],
      ["soko-web-account.png", "Web · Account — profile data from the API"],
      ["soko-mobile-marketplace.png", "Mobile · Marketplace (Flutter) — live catalog over LAN"],
      ["soko-mobile-detail.png", "Mobile · Listing detail — Trek Domane SL 5, $2,800, Cairo"],
      ["soko-mobile-login.png", "Mobile · Sign-in screen"],
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

function shotsShow(index) {
  currentIndex = (index + currentShots.length) % currentShots.length;
  const shot = currentShots[currentIndex];
  shotsImg.src = "./assets/images/screenshots/" + shot[0];
  shotsImg.alt = shot[1];
  shotsCaption.textContent = shot[1];
  Array.from(shotsThumbs.children).forEach((el, i) => {
    el.classList.toggle("active", i === currentIndex);
  });
  const activeThumb = shotsThumbs.children[currentIndex];
  if (activeThumb) activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
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