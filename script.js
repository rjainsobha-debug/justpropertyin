const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

function attachLeadHandler(formId, subjectPrefix = "JustProperty Lead") {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const entries = Object.fromEntries(data.entries());

    const lines = Object.entries(entries)
      .filter(([_, value]) => String(value).trim() !== '')
      .map(([key, value]) => `${key}: ${value}`);

    const subject = encodeURIComponent(`${subjectPrefix} - ${entries.name || 'Website Enquiry'}`);
    const body = encodeURIComponent(
      `Hello JustProperty Team,\n\nPlease find a new website enquiry below:\n\n${lines.join('\n')}\n\nSource: JustProperty.in website\n\nRegards`
    );

    window.location.href = `mailto:info@justproperty.in?subject=${subject}&body=${body}`;

    const success = form.parentElement.querySelector('.success-banner') || form.querySelector('.success-banner');
    if (success) success.style.display = 'block';
    form.reset();
  });
}

attachLeadHandler('heroLeadForm', 'JustProperty Buyer Lead');
attachLeadHandler('contactLeadForm', 'JustProperty Contact Lead');
