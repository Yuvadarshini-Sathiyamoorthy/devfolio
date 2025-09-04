document.addEventListener("DOMContentLoaded", () => {

  /* === 🎯 Custom Cursor === */
  const cursor = document.getElementById('cursor');
  const hoverElements = document.querySelectorAll('a, button, .cert-card, .skill-box, .flip-card');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  /* === 📜 Scroll Functions === */
  window.scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  window.scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  /* === 🌌 Starfield Background === */
  const canvas = document.getElementById("starfield");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const numStars = 400;
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      resize();
      stars = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random()
      }));
    };

    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(animateStars);
    };

    initStars();
    animateStars();
    window.addEventListener("resize", initStars);
  }

  /* === ✨ Fade-in on Scroll === */
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const cards = entry.target.querySelectorAll(".cert-card, .project-card, .internship-card, .article-card, .skill-box");
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("show"), 120 * i);
          });
        } else {
          entry.target.classList.remove("visible");
          cards.forEach(card => card.classList.remove("show"));
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".fade-in-section").forEach(sec => observer.observe(sec));

  /* === 📧 Contact Form Email === */
  // Initialize EmailJS
  emailjs.init('5ZoOFMa7n1ssL8vhm');
  
  const contactForm = document.getElementById('contactForm');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');

  console.log('Form found:', contactForm);
  console.log('Notification found:', notification);

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted!');
      
      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_name: 'Yuvadarshini',
        reply_to: formData.get('email')
      };

      console.log('Template params:', templateParams);

      // 1. Send email to YOU (with sender's details)
      emailjs.send('service_fcn7qfl', 'template_jvvjm5f', templateParams)
        .then(function(response) {
          console.log('Email sent to owner:', response);
          
          // 2. Send auto-reply to the SENDER
          return emailjs.send('service_fcn7qfl', 'template_flzr0yf', templateParams);
        })
        .then(function(response) {
          console.log('Auto-reply sent to sender:', response);
          notificationText.textContent = `Message sent successfully!`;
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
          notification.classList.remove('hidden');
          contactForm.reset();
        })
        .catch(function(error) {
          console.error('Email failed:', error);
          notificationText.textContent = `Failed to send message. Please try again.`;
          notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
          notification.classList.remove('hidden');
        });

      setTimeout(() => {
        notification.classList.add('hidden');
      }, 5000);
    });
  } else {
    console.error('Contact form not found!');
  }
});


