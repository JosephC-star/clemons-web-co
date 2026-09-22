const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

const inquiryForm = document.querySelector('#project-inquiry');
const projectType = document.querySelector('#project-type');

document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    if (projectType) projectType.value = link.dataset.package;
  });
});

inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(inquiryForm);
  const subject = `Project inquiry — ${data.get('business')}`;
  const body = [
    'CLEMONS WEB CO. PROJECT INQUIRY',
    '',
    `Name: ${data.get('name')}`,
    `Business: ${data.get('business')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Project type: ${data.get('projectType')}`,
    `Approximate budget: ${data.get('budget') || 'Not provided'}`,
    `Preferred launch: ${data.get('timeline') || 'Not provided'}`,
    `Current website: ${data.get('existingSite') || 'None provided'}`,
    '',
    'MAIN GOALS',
    data.get('goals'),
    '',
    'FEATURES OR IDEAS',
    data.get('features') || 'None provided',
  ].join('\n');

  window.location.href = `mailto:hello@clemonswebco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
