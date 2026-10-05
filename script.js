/**
 * Chetty & Chetty Incorporated - Personal Injury Attorneys
 * Client-side Router and Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. DYNAMIC CLIENT-SIDE ROUTING (15 PAGES)
  const navLinks = document.querySelectorAll('.nav-link');
  const pageViews = document.querySelectorAll('.page-view');
  const navMenu = document.getElementById('navMenu');
  const mobileToggle = document.getElementById('mobileToggle');

  function navigateToPage(targetId) {
    const cleanId = targetId.replace('#', '');
    const targetPage = document.getElementById(cleanId);

    if (targetPage) {
      // Hide all pages
      pageViews.forEach(page => page.classList.remove('active'));
      
      // Show targeted page
      targetPage.classList.add('active');

      // Update Active Navigation Highlight
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${cleanId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      // Close Mobile Menu if open
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }

      // Scroll smoothly to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // Handle Link Clicks for Navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-link');
    if (link) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        navigateToPage(href);
        history.pushState(null, null, href);
      }
    }
  });

  // Handle Initial Load & Browser Back/Forward Buttons
  window.addEventListener('popstate', () => {
    const hash = window.location.hash || '#home';
    navigateToPage(hash);
  });

  // Load initial route
  const initialHash = window.location.hash || '#home';
  navigateToPage(initialHash);


  // 2. MOBILE NAVIGATION TOGGLE
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }


  // 3. INTERACTIVE FAQ ACCORDION
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all accordions
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });


  // 4. CONTACT FORM HANDLING & WHATSAPP REDIRECT
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const claimType = document.getElementById('claimType').value;
      const message = document.getElementById('message').value;

      // Construct WhatsApp message
      const text = `*New Consultation Inquiry*\n\n` +
                   `*Name:* ${name}\n` +
                   `*Phone:* ${phone}\n` +
                   `*Email:* ${email}\n` +
                   `*Claim Type:* ${claimType}\n` +
                   `*Details:* ${message}`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/27849897104?text=${encodedText}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      // Reset form
      contactForm.reset();
      alert('Thank you! Your request has been formatted and redirected to our WhatsApp Business line for immediate assistance.');
    });
  }
});