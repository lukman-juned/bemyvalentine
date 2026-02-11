const pages = document.querySelectorAll(".page");

function showPage(pageKey) {
  pages.forEach(p => p.classList.remove("active"));

  const page = document.querySelector(`[data-page="${pageKey}"]`);
  if (page) {
    page.classList.add("active");
    localStorage.setItem("currentPage", pageKey);
  }
}

/* Restore page on refresh */
const savedPage = localStorage.getItem("currentPage") || "opening";
showPage(savedPage);

/* 🔑 REMOVE LOADING PAGE BLINK */
document.body.classList.remove("js-loading");

/* Buttons */
document.getElementById("startBtn")?.addEventListener("click", () => {
  showPage("intro");
});

document.getElementById("toQuestion")?.addEventListener("click", () => {
  showPage("question");
});

document.getElementById("yesBtn")?.addEventListener("click", () => {
  showPage("final1");
});

document.getElementById("tofp2")?.addEventListener("click", () => {
  showPage("final2");
});

/* NO button behavior */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

let yesScale = 1;
let noClicked = false;

function moveNoButton() {
  const max = window.innerWidth < 768 ? 100 : 200;
  const x = Math.random() * max * 2 - max;
  const y = Math.random() * max * 2 - max;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn?.addEventListener("mouseenter", moveNoButton);
noBtn?.addEventListener("touchstart", e => {
  e.preventDefault();
  moveNoButton();
});

noBtn?.addEventListener("click", () => {
  if (!noClicked) {
    noBtn.textContent = "Please think again 💔";
    noClicked = true;
  }
  yesScale += 0.15;
  yesBtn.style.transform = `scale(${yesScale})`;
  moveNoButton();
});
