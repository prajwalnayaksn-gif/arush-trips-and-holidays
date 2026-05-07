const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const header = document.getElementById('header');
const pageLoader = document.getElementById('page-loader');
const contactForm = document.getElementById('contactForm');
const whatsappButton = document.getElementById('whatsappButton');
const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navbar.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const targetLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (targetLink) {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          targetLink.classList.add('active');
        }
      }
    });
  },
  { threshold: 0.45 }
);

document.querySelectorAll('section[id]').forEach((section) => {
  sectionObserver.observe(section);
});

const counters = document.querySelectorAll('.counter');
counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.dataset.target;
    const current = +counter.innerText;
    const increment = Math.ceil(target / 120);
    if (current < target) {
      counter.innerText = current + increment;
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target;
    }
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counterObserver.observe(counter);
});

let testimonialIndex = 0;
const showTestimonial = (index) => {
  testimonialCards.forEach((card, idx) => {
    card.classList.toggle('active', idx === index);
  });
};

const nextTestimonial = () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  showTestimonial(testimonialIndex);
};

showTestimonial(testimonialIndex);
setInterval(nextTestimonial, 5500);

const WA_NUMBER = '917799003599';

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
});

whatsappButton.addEventListener('click', () => {
  const nameValue = document.getElementById('name').value.trim();
  const messageValue = document.getElementById('message').value.trim();
  const nameText = nameValue || 'there';
  const messageText = messageValue || 'I would like more information about your travel packages.';
  const text = `Hello, my name is ${nameText}. I would like to know more about your travel packages. Message: ${messageText}`;
  const whatsappUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
  window.location.href = whatsappUrl;
});

window.addEventListener('load', () => {
  pageLoader.classList.add('hide');
  setTimeout(() => (pageLoader.style.display = 'none'), 600);
});
