/*
Name: Cole Jason Fetterman
Student ID: 9 9246 2023
Course: IST 256 – Programming for the Web
Assignment: LIVE Portfolio Page + Bootstrap Activities
Submission Date: February 17, 2026
Repository URL: (paste your GitHub repo URL here)
*/

(() => {
  "use strict";

  // 1) Smooth scroll nav + close Bootstrap nav on mobile
  const navLinks = document.querySelectorAll(".site-nav .nav-link[href^='#']");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      const target = hash ? document.querySelector(hash) : null;
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);

      // If the Bootstrap navbar is open on mobile, close it after selecting a link
      const collapseEl = document.getElementById("primaryNav");
      if (collapseEl && window.bootstrap) {
        const inst = bootstrap.Collapse.getInstance(collapseEl);
        if (inst) inst.hide();
      }
    });
  });

  // 2) Active nav highlight on scroll
  const linkMap = new Map();
  navLinks.forEach((l) => linkMap.set(l.getAttribute("href"), l));

  function setActive(hash) {
    navLinks.forEach((l) => l.classList.remove("is-active"));
    const active = linkMap.get(hash);
    if (active) active.classList.add("is-active");
  }

  const sections = Array.from(document.querySelectorAll("main .panel[id]"));
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActive(`#${top.target.id}`);
      },
      { threshold: [0.25, 0.4, 0.55] }
    );
    sections.forEach((sec) => obs.observe(sec));
  } else {
    setActive("#about");
  }

  // 3) Contact form feedback + Bootstrap Modal + Toast (Bootstrap activity)
  const form = document.querySelector("form.contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value?.trim() || "there";
      const topic = document.getElementById("topic")?.value || "your message";

      if (status) {
        status.textContent = `Thanks, ${name}! Your message was captured for this demo (no email is sent).`;
      }

      // Modal
      const modalEl = document.getElementById("contactModal");
      const modalBody = document.getElementById("contactModalBody");
      if (modalBody) {
        modalBody.textContent = `Thanks, ${name}! I received: ${topic}. (Demo only — no email is sent.)`;
      }
      if (modalEl && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }

      // Toast
      const toastEl = document.getElementById("contactToast");
      const toastBody = document.getElementById("contactToastBody");
      if (toastBody) toastBody.textContent = `Sent! Thanks, ${name}.`;
      if (toastEl && window.bootstrap) {
        bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 }).show();
      }

      form.reset();
    });
  }

  // 4) Back-to-top button (created automatically if missing)
  let backToTop = document.getElementById("back-to-top");
  if (!backToTop) {
    backToTop = document.createElement("button");
    backToTop.id = "back-to-top";
    backToTop.className = "back-to-top";
    backToTop.type = "button";
    backToTop.textContent = "Back to top";
    backToTop.setAttribute("aria-label", "Back to top");
    document.body.appendChild(backToTop);
  }

  const showAfterPx = 650;
  const onScroll = () => {
    backToTop.style.display = window.scrollY > showAfterPx ? "inline-flex" : "none";
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
