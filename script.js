const relationshipStart = new Date("2026-09-13T20:00:00-03:00");

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  song: document.getElementById("loveSong"),
  musicToggle: document.getElementById("musicToggle"),
  musicLabel: document.getElementById("musicLabel")
};

function updateCounter() {
  const now = new Date();
  let diff = now - relationshipStart;

  if (diff < 0) diff = 0;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(diff / day);
  const hours = Math.floor((diff % day) / hour);
  const minutes = Math.floor((diff % hour) / minute);
  const seconds = Math.floor((diff % minute) / second);

  els.days.textContent = days.toLocaleString("pt-BR");
  els.hours.textContent = String(hours).padStart(2, "0");
  els.minutes.textContent = String(minutes).padStart(2, "0");
  els.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1000);

// Música: navegadores normalmente bloqueiam autoplay.
// O usuário inicia pelo botão.
els.musicToggle.addEventListener("click", async () => {
  try {
    if (els.song.paused) {
      await els.song.play();
      els.musicLabel.textContent = "Pausar nossa música";
      els.musicToggle.classList.add("playing");
    } else {
      els.song.pause();
      els.musicLabel.textContent = "Tocar nossa música";
      els.musicToggle.classList.remove("playing");
    }
  } catch (error) {
    els.musicLabel.textContent = "Coloque a música em assets/";
    console.warn("Não foi possível iniciar o áudio:", error);
  }
});

// Rolagem suave dos botões.
document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll)?.scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Arrastar a galeria no desktop.
const gallery = document.getElementById("gallery");
let isDown = false;
let startX = 0;
let scrollLeft = 0;

gallery.addEventListener("mousedown", e => {
  isDown = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeft = gallery.scrollLeft;
});

gallery.addEventListener("mouseleave", () => isDown = false);
gallery.addEventListener("mouseup", () => isDown = false);

gallery.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 1.2;
  gallery.scrollLeft = scrollLeft - walk;
});

// Pequena entrada elegante quando os blocos aparecem.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  ".intro-copy, .counter-inner, .section-heading, .gallery-card, .timeline-item, .letter, .final-content"
).forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(18px)";
  el.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(el);
});

const revealStyle = document.createElement("style");
revealStyle.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(revealStyle);
