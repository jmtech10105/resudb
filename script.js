// Theme toggle + Mobile nav + Active link + Reveal + Contact form demo

const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear();

// --------------------
// Theme (saved)
// --------------------
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeBtn.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "light" ? "" : "light";
  if (next) root.setAttribute("data-theme", next);
  else root.removeAttribute("data-theme");
  localStorage.setItem("theme", next || "");
});

// --------------------
// Mobile menu
// --------------------
burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// --------------------
// Active nav on scroll
// --------------------
const sections = ["about","skills","education","projects","contact"]
  .map(id => document.getElementById(id));

const navMap = new Map();
document.querySelectorAll(".nav-link").forEach(a => {
  const href = a.getAttribute("href");
  if (href && href.startsWith("#")) navMap.set(href.slice(1), a);
});

function setActive(id){
  document.querySelectorAll(".nav-link").forEach(a => a.classList.remove("active"));
  const el = navMap.get(id);
  if (el) el.classList.add("active");
}

const spy = () => {
  let current = "about";
  const fromTop = window.scrollY + 120;

  for (const s of sections){
    if (!s) continue;
    if (s.offsetTop <= fromTop) current = s.id;
  }
  setActive(current);
};

window.addEventListener("scroll", spy);
spy();

// --------------------
// Reveal on scroll
// --------------------
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

// --------------------
// Demo links
// --------------------
window.demoLink = (e) => {
  e.preventDefault();
  alert("Replace this link with your real project URL.");
  return false;
};

// --------------------
// Contact form (demo)
// --------------------
const form = document.getElementById("contactForm");
const hint = document.getElementById("formHint");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("fName").value.trim();
  const email = document.getElementById("fEmail").value.trim();
  const msg = document.getElementById("fMsg").value.trim();

  if (!name || !email || !msg) {
    hint.textContent = "Please fill in all fields.";
    return;
  }

  // Demo only (no backend). You can connect to PHP/Node later.
  hint.textContent = "Message prepared! (Demo) Connect this to a backend to actually send.";
  form.reset();
});
