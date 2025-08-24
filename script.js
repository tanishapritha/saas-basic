// ==========================
// Smooth Scroll
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// ==========================
// Mobile Navigation Toggle
// ==========================
const toggleBtn = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggleBtn.addEventListener('click', () => navLinks.classList.toggle('active'));

// ==========================
// AOS Animations Initialization
// ==========================
AOS.init({ duration: 1000, once: true });

// ==========================
// Dark Mode Toggle
// ==========================
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ==========================
// Modal Functionality
// ==========================
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.modal .close');

function openModal(title, text) {
  modalBody.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
  modal.style.display = 'flex';
}

closeModal.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; }

// ==========================
// Trigger Modals
// ==========================


// Hero "Try Free" button opens a real form
document.querySelectorAll('.hero .cta-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalBody.innerHTML = `
      <h3>Start Your Free Trial</h3>
      <form id="modalForm" class="modal-form">
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Email Address" required>
        <textarea placeholder="Message (Optional)"></textarea>
        <button type="submit" class="cta-btn">Submit</button>
      </form>
    `;
    modal.style.display = 'flex';

    // Handle form submission
    document.getElementById('modalForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you! Your trial request has been submitted.');
      modal.style.display = 'none';
    });
  });
});

// Pricing card buttons
document.querySelectorAll('.pricing-card .cta-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    openModal('Choose Your Plan', 'You selected a pricing plan. Our team will contact you soon!');
  });
});

// Feature card clicks
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.querySelector('h3').innerText;
    const text = card.querySelector('p').innerText + ' 🚀';
    openModal(title, text);
  });
});
