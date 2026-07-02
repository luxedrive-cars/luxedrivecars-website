/* LuxeDrive Cars — main.js
   Loads shared header/footer partials, handles mobile nav, marks the
   active nav link, and handles the enquiry form submission.
   NOTE: This site uses fetch() to include header.html/footer.html, which
   requires the site to be served over http/https (e.g. real hosting,
   or a local dev server like `npx serve`). Opening files directly via
   file:// will NOT load the header/footer due to browser CORS rules.
*/

async function includePartials() {
  const includes = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(includes).map(async (el) => {
      const path = el.getAttribute("data-include");
      try {
        const res = await fetch(path);
        el.innerHTML = await res.text();
      } catch (err) {
        console.error("Could not load partial:", path, err);
      }
    })
  );
  setActiveNavLink();
  initNavToggle();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function setActiveNavLink() {
  const current = document.body.getAttribute("data-page");
  if (!current) return;
  document.querySelectorAll(".nav-links a[data-page]").forEach((link) => {
    if (link.getAttribute("data-page") === current) {
      link.setAttribute("aria-current", "page");
    }
  });
}

function initNavToggle() {
  const toggle = document.getElementById("nav-toggle");
  const header = document.getElementById("site-header");
  if (!toggle || !header) return;
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const success = document.getElementById("form-success");
    const submitBtn = form.querySelector("button[type='submit']");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        if (success) success.classList.add("visible");
        form.reset();
      } else {
        alert("Something went wrong sending your enquiry. Please try calling or emailing us directly.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Something went wrong sending your enquiry. Please try calling or emailing us directly.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Enquiry";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  includePartials();
  initEnquiryForm();
});
