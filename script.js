const menuToggle = document.getElementById('menuToggle');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const header = document.getElementById('header');
const pageLoader = document.getElementById('page-loader');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
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

const FORMSPREE_ENDPOINT = 'https://formspree.io/arushtripsandholidays@gmail.com';

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  formStatus.textContent = 'Sending message...';
  formStatus.style.color = '#fff';

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  };

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      formStatus.textContent = 'Thank you! Your message has been sent successfully.';
      formStatus.style.color = '#8aed9d';
      contactForm.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
    formStatus.style.color = '#f78a8a';
  }
});

window.addEventListener('load', () => {
  pageLoader.classList.add('hide');
  setTimeout(() => (pageLoader.style.display = 'none'), 600);
});
