  // Navbar Responsive Script
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navClose = document.getElementById('navClose');
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById("newsletterModal");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.getElementById("closeModal");

// Debug logging
console.log('Script loaded');
console.log('navToggle:', navToggle);
console.log('navMenu:', navMenu);
console.log('navClose:', navClose);
console.log('overlay:', overlay);

// Check if elements exist
if (!navToggle) console.error('navToggle not found');
if (!navMenu) console.error('navMenu not found');
if (!navClose) console.error('navClose not found');
if (!overlay) console.error('overlay not found');

// Only add event listeners if elements exist
if (navToggle && navMenu && navClose && overlay) {
  function closeMenu() {
    console.log('Closing menu');
    navMenu.classList.remove('show');
    overlay.classList.remove('show');
    navToggle.classList.remove('active');
  }

  // Open Menu
  navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Hamburger clicked!');
    console.log('Current navMenu classes:', navMenu.classList.toString());
    console.log('Current overlay classes:', overlay.classList.toString());
    
    navMenu.classList.toggle('show');
    overlay.classList.toggle('show');
    navToggle.classList.toggle('active');
    
    console.log('After toggle - navMenu classes:', navMenu.classList.toString());
    console.log('After toggle - overlay classes:', overlay.classList.toString());
  });

  // Close Menu (close button inside menu)
  navClose.addEventListener('click', closeMenu);

  // Close when clicking overlay
  overlay.addEventListener('click', closeMenu);

  // Close menu on nav link click (mobile only)
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) closeMenu();
    });
  });

  // Accessibility: keyboard toggle
  navToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navMenu.classList.toggle('show');
      overlay.classList.toggle('show');
      navToggle.classList.toggle('active');
    }
  });

  // On resize, ensure menu is correct for desktop/mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navMenu.classList.remove('show');
      overlay.classList.remove('show');
      navToggle.classList.remove('active');
    }
  });
} else {
  console.error('Some navigation elements are missing, mobile navigation will not work');
}

document.querySelectorAll('.newsletter-form, .footer-newsletter').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : "";

    if (email === "") {
      // highlight field if empty
      emailInput.classList.add("error");
      return; // stop here (don't show modal)
    } else {
      emailInput.classList.remove("error");
    }

    // Show modal if email is not empty
    modal.style.display = "flex"; 
    setTimeout(() => modal.classList.add("show"), 10);
    form.reset();
  });
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 300);
});

// Close on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 300);
  }
});
