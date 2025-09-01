// Sticky Header
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  header.classList.toggle('sticky', window.scrollY > 50);
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('active'))
);

// Skill bars animation
function animateSkills() {
  document.querySelectorAll('.skill-level').forEach(skill => {
    const level = skill.getAttribute('data-level');
    skill.style.width = level + '%';
  });
}

// Project cards fade-in
function animateProjects() {
  document.querySelectorAll('.project-card').forEach(project => {
    const position = project.getBoundingClientRect();
    if (position.top < window.innerHeight - 100) project.classList.add('visible');
  });
}
window.addEventListener('scroll', animateProjects);
window.addEventListener('load', () => { animateSkills(); animateProjects(); });

// Video hover small play/pause
document.querySelectorAll(".project-img video").forEach(video => {
  video.addEventListener("mouseenter", () => video.play());
  video.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0; });
});

// Overlay fullscreen video
const overlay = document.getElementById("videoOverlay");
const overlayVideo = document.getElementById("overlayVideo");
document.querySelectorAll(".project-img video").forEach(video => {
  video.addEventListener("click", () => {
    overlay.style.display = "flex";
    overlayVideo.src = video.querySelector("source").src;
    overlayVideo.play();
  });
});
overlay.addEventListener("click", () => {
  overlayVideo.pause();
  overlay.style.display = "none";
});

// Typing animation
/*const texts = ["Frontend Developer", "JavaScript Enthusiast", "React Learner"];
let i = 0, j = 0, isDeleting = false;
function type() {
  const currentText = texts[i];
  document.querySelector(".typing").textContent = isDeleting
    ? currentText.substring(0, j--)
    : currentText.substring(0, j++);
  if (!isDeleting && j === currentText.length + 1) { isDeleting = true; setTimeout(type, 1000); }
  else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % texts.length; }
  setTimeout(type, isDeleting ? 50: 250);
}
type();*/

// Typing animation (fixed speed)
const texts = ["Frontend Developer", "JavaScript Enthusiast", "React Learner"];
let i = 0, j = 0, isDeleting = false;
const speed = 150; // ek hi speed rakhi hai

function type() {
  const currentText = texts[i];
  document.querySelector(".typing").textContent = isDeleting
    ? currentText.substring(0, j--)
    : currentText.substring(0, j++);

  if (!isDeleting && j === currentText.length + 1) {
    isDeleting = true;
    setTimeout(type, 1000); // thoda rukne ke liye jab pura word aa jaye
  } 
  else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % texts.length;
    setTimeout(type, speed); // agle word ke liye normal speed
  } 
  else {
    setTimeout(type, speed); // har step same speed
  }
}

type();

// Dark mode toggle
const toggleBtn = document.getElementById("darkToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Fade-in on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("show"); });
});
document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

// Counter animation
function animateCounter(id, target) {
  let count = 0;
  const update = () => {
    count += target / 100;
    if (count < target) {
      document.getElementById(id).innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else document.getElementById(id).innerText = target;
  };
  update();
}
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounter("projectsCount", 15);
    animateCounter("clientsCount", 3);
    animateCounter("problemsCount", 500);
    statsObserver.disconnect();
  }
});
statsObserver.observe(document.querySelector(".stats"));

// Back to top
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
