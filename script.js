document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Counter Animation for Trust Indicators
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when section is in view
    const trustSection = document.querySelector('.trust-indicators');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(trustSection);
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide change every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Reset interval when manually changing slides
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.value-card, .service-card, .pricing-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.value-card, .service-card, .pricing-card, .portfolio-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});




// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been sent. We'll contact you soon at ${email}.`);
        
        // Reset the form
        contactForm.reset();
    });
}

// Animate elements on page load for additional pages
document.querySelectorAll('.service-detail, .value-card, .team-member').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Check if elements are in view on page load and scroll for additional pages
function animatePageElements() {
    const elements = document.querySelectorAll('.service-detail, .value-card, .team-member, .info-item, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('load', animatePageElements);
window.addEventListener('scroll', animatePageElements);


/**
 * WebCraft Studios - Portfolio Page JavaScript
 * Enhanced with animations, filtering, and interactive elements
 */

class PortfolioPage {
  constructor() {
    this.initMobileMenu();
    this.initPortfolioFilter();
    this.initVideoControls();
    this.initLoadMore();
    this.initSmoothScrolling();
    this.initAnimations();
    this.initCounters();
  }

  // Mobile Menu Toggle
  initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Portfolio Filtering System
  initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.dataset.filter;

        // Filter items with animation
        portfolioItems.forEach(item => {
          const matchesFilter = filterValue === 'all' || 
                              item.dataset.category.includes(filterValue);

          if (matchesFilter) {
            this.showItem(item);
          } else {
            this.hideItem(item);
          }
        });
      });
    });
  }

  showItem(item) {
    item.style.display = 'block';
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 50);
  }

  hideItem(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.display = 'none';
    }, 300);
  }

  // Video Gallery Controls
  initVideoControls() {
    const videos = document.querySelectorAll('.gallery-item video');
    const playButtons = document.querySelectorAll('.play-btn');
    const overlays = document.querySelectorAll('.gallery-overlay');

    playButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleVideo(videos[index], button, overlays[index]);
      });
    });

    // Pause all videos when clicking outside
    document.addEventListener('click', () => {
      videos.forEach((video, i) => {
        if (!video.paused) {
          video.pause();
          playButtons[i].innerHTML = '<i class="fas fa-play"></i>';
          overlays[i].style.opacity = '1';
        }
      });
    });
  }

  toggleVideo(video, button, overlay) {
    if (video.paused) {
      // Pause all other videos first
      document.querySelectorAll('.gallery-item video').forEach(v => {
        if (v !== video && !v.paused) {
          v.pause();
          const vIndex = Array.from(v.parentElement.querySelectorAll('video')).indexOf(v);
          document.querySelectorAll('.play-btn')[vIndex].innerHTML = '<i class="fas fa-play"></i>';
          document.querySelectorAll('.gallery-overlay')[vIndex].style.opacity = '1';
        }
      });

      video.play()
        .then(() => {
          button.innerHTML = '<i class="fas fa-pause"></i>';
          overlay.style.opacity = '0';
        })
        .catch(error => console.error('Video play failed:', error));
    } else {
      video.pause();
      button.innerHTML = '<i class="fas fa-play"></i>';
      overlay.style.opacity = '1';
    }
  }

  // Load More Projects
  initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    const allProjects = Array.from(document.querySelectorAll('.gallery-item'));
    let visibleCount = 8;

    // Hide projects beyond initial count
    allProjects.slice(visibleCount).forEach(project => {
      project.style.display = 'none';
    });

    loadMoreBtn.addEventListener('click', () => {
      const nextProjects = allProjects.slice(visibleCount, visibleCount + 4);
      
      if (nextProjects.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
      }

      nextProjects.forEach(project => {
        this.showItem(project);
      });

      visibleCount += nextProjects.length;

      // Hide button if all projects are visible
      if (visibleCount >= allProjects.length) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Scroll Animations
  initAnimations() {
    const animateElements = () => {
      document.querySelectorAll('.stat-card, .process-step, .review-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        
        if (isVisible) {
          el.classList.add('animated');
        }
      });
    };

    // Initial check
    animateElements();
    
    // Check on scroll
    window.addEventListener('scroll', animateElements);
  }

  // Counter Animation
  initCounters() {
    const counters = document.querySelectorAll('.count');
    const speed = 200;
    let started = false;

    const startCounters = () => {
      if (started) return;
      
      const statsSection = document.querySelector('.industry-stats');
      if (!statsSection) return;

      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        started = true;
        
        counters.forEach(counter => {
          const target = +counter.dataset.target;
          const count = +counter.innerText;
          const increment = target / speed;

          if (count < target) {
            const updateCount = () => {
              const currentCount = +counter.innerText;
              if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 1);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          }
        });
      }
    };

    // Start when stats section is in view
    window.addEventListener('scroll', startCounters);
    startCounters(); // Check on load in case already in view
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioPage();
});







document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const options = {
        duration: 2000, // Animation duration in ms
        once: true      // Only animate once
    };

    // Get all counter elements
    const counters = document.querySelectorAll('.count');
    
    // Only proceed if we have counters
    if (counters.length === 0) return;

    // Reset all counters to 0 initially
    counters.forEach(counter => {
        counter.textContent = '0';
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate counter function
    function animateCounter(element, target) {
        let start = null;
        const duration = options.duration;
        const increment = target / (duration / 16); // 60fps
        
        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const value = Math.min(Math.floor(increment * (progress / 16)), target);
            
            element.textContent = value;
            
            if (progress < duration) {
                requestAnimationFrame(step);
            } else {
                element.textContent = target;
            }
        }
        
        requestAnimationFrame(step);
    }

    // Check counters on scroll
    let animationStarted = false;
    
    function checkCountersOnScroll() {
        if (animationStarted && options.once) return;
        
        const anyCounterVisible = Array.from(counters).some(counter => isInViewport(counter));
        
        if (anyCounterVisible) {
            animationStarted = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            });
            
            if (options.once) {
                window.removeEventListener('scroll', checkCountersOnScroll);
            }
        }
    }

    // Initial check when page loads
    checkCountersOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkCountersOnScroll);
});



document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const config = {
        duration: 800,  // 0.8s animation (fast but smooth)
        bezier: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // CSS ease
        threshold: 0.15 // Very sensitive trigger
    };

    // Get all stat elements
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    // Prepare elements and store values
    statNumbers.forEach(stat => {
        const value = stat.textContent.replace('+', '');
        stat.dataset.target = value;
        stat.style.setProperty('--count-current', '0');
        stat.textContent = '0+';
    });

    // Create Keyframes with Web Animations API
    function animateCounter(element, target) {
        const suffix = '+';
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / config.duration, 1);
            
            // Apply bezier timing function
            const easedProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            const value = Math.floor(easedProgress * target);
            element.textContent = value + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }

    // Intersection Observer with polyfill if needed
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.target);
                animateCounter(stat, target);
                observer.unobserve(stat); // Animate just once
            }
        });
    }, {
        threshold: config.threshold,
        rootMargin: '0px 0px -100px 0px' // Trigger slightly early
    });

    // Start observing
    statNumbers.forEach(stat => observer.observe(stat));
});


// Initialize EmailJS with your public key
(function() {
    emailjs.init("RNXuBBHj2-QRQ_tiK"); // Replace with your actual EmailJS public key
})();

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const responseMessage = document.getElementById('responseMessage');
    
    // Change button state to loading
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send form data via EmailJS
    emailjs.sendForm('service_fws67ek', 'template_3p11wsp', form)
        .then(function(response) {
            // Success message
            responseMessage.innerHTML = '<div class="alert alert-success">Message sent successfully! We will contact you soon.</div>';
            form.reset();
        }, function(error) {
            // Error message
            responseMessage.innerHTML = '<div class="alert alert-error">Failed to send message. Please try again later.</div>';
            console.error('EmailJS Error:', error);
        })
        .finally(function() {
            // Reset button state
            btnText.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Remove message after 5 seconds
            setTimeout(() => {
                responseMessage.innerHTML = '';
            }, 5000);
        });
});



// WhatsApp Integration
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp button click handler
    const whatsappBtn = document.querySelector('.whatsapp-float a');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            // You can add tracking here if needed
            console.log('WhatsApp button clicked');
            // If you have Google Analytics or similar:
            // gtag('event', 'click', {'event_category': 'WhatsApp', 'event_label': 'Float Button'});
        });
    }

    // Optional: Add WhatsApp clickable phone numbers
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    phoneNumbers.forEach(number => {
        number.addEventListener('click', function() {
            // Track phone clicks if needed
            console.log('Phone number clicked: ' + this.href);
        });
    });

    // WhatsApp link in contact info (if you want to add it)
    const whatsappLink = document.createElement('div');
    whatsappLink.className = 'info-item';
    whatsappLink.innerHTML = `
        <div class="info-icon"><i class="fab fa-whatsapp"></i></div>  
        <div class="info-content">
            <h3>WhatsApp</h3>  
            <p><a href="https://wa.me/919399856553" target="_blank">Chat with us on WhatsApp</a></p>
        </div>
    `;
    
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.insertBefore(whatsappLink, contactInfo.children[contactInfo.children.length - 1]);
    }
});