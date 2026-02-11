// script.js

// Typing effect
const textDisplay = document.getElementById("text");
const phrases = ["Welcome to our website!", "Explore our features!", "Contact us for more info!"];
let phraseIndex = 0;
let letterIndex = 0;

function type() {
  if (letterIndex < phrases[phraseIndex].length) {
    textDisplay.innerHTML += phrases[phraseIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(deleteText, 2000);
  }
}

function deleteText() {
  if (letterIndex > 0) {
    textDisplay.innerHTML = phrases[phraseIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(deleteText, 50);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
  }
}

type();

// Form handling
const form = document.getElementById("contact-form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission
  const formData = new FormData(form);
  alert(`Thank you, ${formData.get('name')}! Your message has been sent.`);
  form.reset(); // Reset form after submission
});

// Smooth scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animations
document.addEventListener('scroll', function() {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
});

