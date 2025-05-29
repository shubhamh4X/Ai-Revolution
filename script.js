// Responsive menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll & active nav link highlight
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${section.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// Chatbot logic
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

// Simple AI knowledge base (keyword: response)
const aiKnowledge = {
  hello: "Hello! How can I assist you with AI today?",
  hi: "Hi there! Ask me anything about Artificial Intelligence.",
  ai: "Artificial Intelligence is a branch of computer science that aims to create intelligent machines.",
  machinelearning: "Machine Learning is a subset of AI focused on training models from data.",
  deep: "Deep Learning uses neural networks with many layers to solve complex tasks.",
  chatbot: "I am a chatbot created to demonstrate AI-powered interaction on this website.",
  services: "We offer AI consulting, custom AI solutions, and hands-on workshops.",
  contact: "Feel free to contact us through the form below!",
  thanks: "You're welcome! If you have more questions, just ask.",
  bye: "Goodbye! Have a great day exploring AI."
};

function synthesizeSpeech(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function botTypingEffect(text, container, callback) {
  container.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    container.textContent += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 30);
}

function createChatMessage(text, sender = 'bot') {
  const msg = document.createElement('div');
  msg.classList.add('chat-message', sender);
  return msg;
}

function getBotResponse(userText) {
  // Clean and normalize input
  const cleaned = userText.toLowerCase().replace(/[^\w\s]/gi, '');
  const words = cleaned.split(' ');

  for (const word of words) {
    if (aiKnowledge[word]) return aiKnowledge[word];
  }
  // Fallback response
  return "Sorry, I didn't quite catch that. Could you ask something else about AI?";
}

// Add chat message with animation
function addChatMessage(text, sender = 'bot') {
  const messageElem = createChatMessage(text, sender);
  chatWindow.appendChild(messageElem);

  if (sender === 'bot') {
    // Animate typing effect
    messageElem.textContent = '';
    let index = 0;
    const typingInterval = setInterval(() => {
      messageElem.textContent += text.charAt(index);
      index++;
      if (index >= text.length) {
        clearInterval(typingInterval);
        // Scroll chat to bottom after typing
        chatWindow.scrollTop = chatWindow.scrollHeight;
        // Speech synthesis
        synthesizeSpeech(text);
      }
    }, 30);
  } else {
    // User message: no typing effect, scroll immediately
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

chatForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputText = userInput.value.trim();
  if (!inputText) return;

  // Add user message immediately
  addChatMessage(inputText, 'user');
  userInput.value = '';
  userInput.disabled = true;

  // Bot response delay to simulate thinking
  setTimeout(() => {
    const response = getBotResponse(inputText);
    addChatMessage(response, 'bot');
    userInput.disabled = false;
    userInput.focus();
  }, 800);
});

// Contact form validation & submission simulation
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formStatus.textContent = '';
  
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formStatus.style.color = '#e91e63';
    formStatus.textContent = 'Please fill in all fields.';
    return;
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.style.color = '#e91e63';
    formStatus.textContent = 'Please enter a valid email address.';
    return;
  }

  formStatus.style.color = '#64ffda';
  formStatus.textContent = 'Sending message...';

  // Simulate server delay 
  setTimeout(() => {
    formStatus.textContent = 'Thank you for contacting us! We will get back to you soon.';
    contactForm.reset();
  }, 1500);
});


// Gradient background animation handled by CSS keyframes

// Interactive 3D card tilt
const card = document.getElementById('interactive-card');
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  const rotateX = (-y / rect.height) * 15; // Max 15 deg rotation X axis
  const rotateY = (x / rect.width) * 15;   // Max 15 deg rotation Y axis
  card.querySelector('img').style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});

card.addEventListener('mouseleave', () => {
  card.querySelector('img').style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
});

// Text scramble effect on headline
const scrambleText = (el) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const original = el.dataset.text;
  let iteration = 0;
  const interval = setInterval(() => {
    el.textContent = original.split('')
      .map((char, index) => {
        if (index < iteration) return original[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
    iteration += 1 / 3;
    if (iteration >= original.length) clearInterval(interval);
  }, 30);
};

const headline = document.querySelector('.scramble-text');
scrambleText(headline);
setInterval(() => scrambleText(headline), 8000);

// Scroll-triggered fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const onScrollFade = () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', onScrollFade);
window.addEventListener('load', onScrollFade);

// Scroll progress bar
const scrollProgress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = `${scrollPercent}%`;
});

// Custom trailing cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor-trail');
document.body.appendChild(cursor);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let currentX = mouseX;
let currentY = mouseY;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const animateCursor = () => {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;
  cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
};
animateCursor();


(() => {
  const canvas = document.getElementById('ai-dots-bg');
  const ctx = canvas.getContext('2d');

  let width, height;
  const dotsCount = 100;
  const maxDistance = 150;
  const dots = [];

  // Dot object constructor
  class Dot {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = 2 + Math.random() * 2;
      this.baseRadius = this.radius;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Pulse radius for subtle glow effect
      this.radius = this.baseRadius + Math.sin(Date.now() / 500 + this.x) * 0.5;
    }

    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
      gradient.addColorStop(0, 'rgba(0,188,212,0.9)');
      gradient.addColorStop(1, 'rgba(0,188,212,0)');

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Initialize canvas size and dots
  function init() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);

    dots.length = 0;
    for (let i = 0; i < dotsCount; i++) {
      dots.push(new Dot());
    }
  }

  // Draw lines between close dots
  function connectDots() {
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = 1 - dist / maxDistance;
          ctx.strokeStyle = `rgba(0,188,212,${opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });

    connectDots();

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    init();
  });

  // Initialize and start
  init();
  animate();
})();

