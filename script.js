// ==================== PAGE NAVIGATION & MOBILE MENU ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link:not(.services-toggle)');
    const servicesLinks = document.querySelectorAll('[data-page="services"]');
    const pages = document.querySelectorAll('.page-section');
    const hamburger = document.querySelector('.hamburger');
    const closeButton = document.querySelector('.close-button');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const mobileDropdownHeader = document.querySelector('.mobile-dropdown-header');

    // Initialize with home page
    showPage('home');

    // ==================== HAMBURGER MENU TOGGLE ====================
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    // Close button
    closeButton.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileDropdown.classList.remove('active');
    });

    // ==================== MOBILE MENU LINK CLICKS ====================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const pageName = this.getAttribute('data-page');
            if (pageName && pages.length > 0) {
                e.preventDefault();
                showPage(pageName);
                closeMobileMenu();
            }
        });
    });

    // Services link in main nav (desktop)
    servicesLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
                showPage('services');
            }
        });
    });

    // ==================== MOBILE DROPDOWN TOGGLE ====================
    if (mobileDropdownHeader) {
        mobileDropdownHeader.addEventListener('click', function(e) {
            e.preventDefault();
            mobileDropdown.classList.toggle('active');
        });
    }

    // Submenu links
    /*const submenuLinks = document.querySelectorAll('.submenu-category ul li a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            closeMobileMenu();
            // Could navigate to a services detail page
            alert('Service: ' + this.textContent);
        });
    });*/

    const submenuLinks = document.querySelectorAll('.submenu-category ul li a');
    submenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });


    // ==================== CLOSE MENU WHEN CLICKING OUTSIDE ====================
    document.addEventListener('click', function(e) {
        const isClickOnMenu = e.target.closest('.mobile-menu-overlay');
        const isClickOnHamburger = e.target.closest('.hamburger');

        if (!isClickOnMenu && !isClickOnHamburger && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ==================== PAGE DISPLAY FUNCTION ====================
    function showPage(pageName) {
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const activePage = document.getElementById(pageName);
        if (activePage) {
            activePage.classList.add('active');
        }

        // Update active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        document.querySelectorAll(`[data-page="${pageName}"]`).forEach(link => {
            link.classList.add('active');
        });

        window.scrollTo(0, 0);
    }

    // ==================== CLOSE MOBILE MENU FUNCTION ====================
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileDropdown.classList.remove('active');
    }

    // ==================== WINDOW RESIZE HANDLER ====================
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

// ==================== FORM SUBMISSION ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (!name || !email || !service || !message) {
                alert('Please fill in all required fields');
                return;
            }

            // Create form data
            const formData = {
                name: name,
                email: email,
                company: company,
                service: service,
                message: message,
                timestamp: new Date().toISOString()
            };

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');

            // Log form data (in a real application, this would be sent to a server)
            console.log('Form submitted:', formData);

            // Reset form
            contactForm.reset();
        });
    }
});

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== CTA BUTTONS ==================== 
const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary, .service-link, .read-more');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== TAG CLICK INTERACTIONS ==================== 
const tags = document.querySelectorAll('.tag');

tags.forEach(tag => {
    tag.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);

        // Log tag interaction
        console.log('Tag clicked:', this.textContent);
    });
});

// ==================== MEGAMENU BEHAVIOR (DESKTOP) ==================== 
const dropdownItemsNav = document.querySelectorAll('.nav-item-dropdown');

dropdownItemsNav.forEach(item => {
    const megamenu = item.querySelector('.megamenu');
    
    if (window.innerWidth > 768) {
        // Desktop hover behavior
        item.addEventListener('mouseenter', function() {
            if (megamenu) {
                megamenu.style.opacity = '1';
                megamenu.style.visibility = 'visible';
                megamenu.style.pointerEvents = 'auto';
            }
        });

        item.addEventListener('mouseleave', function() {
            if (megamenu) {
                megamenu.style.opacity = '0';
                megamenu.style.visibility = 'hidden';
                megamenu.style.pointerEvents = 'none';
            }
        });
    }
});

// ==================== SERVICE CARD HOVER EFFECT ==================== 
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ==================== BLOG CARD HOVER EFFECT ==================== 
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    const image = card.querySelector('.blog-image');
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// ==================== BOX HOVER EFFECT ==================== 
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)';
    });

    box.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// ==================== DYNAMIC ANIMATION ON SCROLL ==================== 
function handleScroll() {
    const elements = document.querySelectorAll('.content-section, .blog-card, .service-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.animation = 'fadeIn 0.6s ease-in';
        }
    });
}

window.addEventListener('scroll', handleScroll);
handleScroll(); // Call on load

// ==================== FORM INPUT FOCUS EFFECTS ==================== 
const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// ==================== ANNOUNCEMENT LINK ANIMATION ==================== 
const announcementLink = document.querySelector('.announcement-link');

if (announcementLink) {
    announcementLink.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });

    announcementLink.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
}

// ==================== GET STARTED BUTTON ==================== 
const getStartedButton = document.querySelector('.cta-button');

if (getStartedButton) {
    getStartedButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Scroll to contact page
        const contactPage = document.getElementById('contact');
        if (contactPage) {
            // Show contact page
            document.querySelectorAll('.page-section').forEach(page => {
                page.classList.remove('active');
            });
            contactPage.classList.add('active');
            
            // Update nav
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('[data-page="contact"]').classList.add('active');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

// ==================== DEMO VIDEO BUTTON ==================== 
const demoButton = document.querySelector('.hero .btn-secondary');

if (demoButton) {
    demoButton.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Demo video feature coming soon! Check back later.');
    });
}

// ==================== RESPONSIVE NAVBAR ==================== 
function handleResponsiveNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarContainer = document.querySelector('.navbar-container');

    if (window.innerWidth <= 768) {
        navbar.style.position = 'sticky';
    } else {
        navbar.style.position = 'sticky';
    }
}

window.addEventListener('resize', handleResponsiveNavbar);
handleResponsiveNavbar();

// ==================== ACTIVE NAV LINK ON SCROLL ==================== 
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            const activeLink = document.querySelector(`[data-page="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ==================== SERVICE LINK NAVIGATION ==================== 
const serviceLinks = document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // Navigate to contact page
        const contactPage = document.getElementById('contact');
        if (contactPage) {
            document.querySelectorAll('.page-section').forEach(page => {
                page.classList.remove('active');
            });
            contactPage.classList.add('active');
            
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            document.querySelector('[data-page="contact"]').classList.add('active');
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== BLOG READ MORE LINKS ==================== 
const readMoreLinks = document.querySelectorAll('.read-more');

// readMoreLinks.forEach(link => {
//     link.addEventListener('click', function(e) {
//         e.preventDefault();
//         alert('Full article would load here. This is a demo website.');
//     });
// });

// ==================== NEWSLETTER SIGNUP (if added later) ==================== 
function setupNewsletter() {
    // This would be added if a newsletter form is added
    console.log('Newsletter setup ready');
}

setupNewsletter();

// ==================== PERFORMANCE OPTIMIZATION ==================== 
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageElements = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    imageElements.forEach(img => imageObserver.observe(img));
}

// ==================== UTILITY FUNCTIONS ==================== 
console.log('✨ Shiventech website loaded successfully');
console.log('🎨 Modern design with smooth animations');
console.log('📱 Fully responsive across all devices');
console.log('⚡ Fast and optimized performance');

/* ============================================================
   HERO CAROUSEL — smooth right-to-left, 2 min auto-advance
   ============================================================ */
(function() {
    const track       = document.getElementById('heroCarouselTrack');
    const dots        = document.querySelectorAll('#heroCarouselDots .carousel-dot');
    const prevBtn     = document.getElementById('heroPrev');
    const nextBtn     = document.getElementById('heroNext');
    const progressFill = document.getElementById('heroProgressFill');

    if (!track) return;

    const slides     = track.querySelectorAll('.hero-slide');
    const total      = slides.length;
    let current      = 0;
    let autoTimer    = null;
    let progressTimer = null;
    const INTERVAL   = 120000; // 2 minutes in ms
    const TICK       = 100;    // progress bar update every 100ms

    let elapsed = 0;

    function goTo(index) {
        current = (index + total) % total;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        // Re-trigger content animation
        slides.forEach((s, i) => {
            const content = s.querySelector('.hero-slide-content');
            if (i === current && content) {
                content.style.animation = 'none';
                void content.offsetWidth;
                content.style.animation = 'slideContentIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both';
            }
        });
        resetProgress();
    }

    function resetProgress() {
        elapsed = 0;
        if (progressFill) progressFill.style.width = '0%';
    }

    function startAuto() {
        clearInterval(autoTimer);
        clearInterval(progressTimer);
        resetProgress();

        progressTimer = setInterval(function() {
            elapsed += TICK;
            const pct = Math.min((elapsed / INTERVAL) * 100, 100);
            if (progressFill) progressFill.style.width = pct + '%';
        }, TICK);

        autoTimer = setInterval(function() {
            goTo(current + 1);
        }, INTERVAL);
    }

    function stopAuto() {
        clearInterval(autoTimer);
        clearInterval(progressTimer);
    }

    // Arrow clicks
    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); stopAuto(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); stopAuto(); startAuto(); });

    // Dot clicks
    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            goTo(parseInt(this.getAttribute('data-index')));
            stopAuto();
            startAuto();
        });
    });

    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);
    }

    // Touch/swipe support
    let touchStartX = 0;
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
        carousel.addEventListener('touchend', function(e) {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                goTo(current + (diff > 0 ? 1 : -1));
                stopAuto();
                startAuto();
            }
        }, { passive: true });
    }

    // Init
    goTo(0);
    startAuto();
})();


/* ============================================================
   REVIEWS CAROUSEL — 2 cards visible, right-to-left sliding
   ============================================================ */
(function() {
    var track    = document.getElementById('reviewsTrack');
    var dotsWrap = document.getElementById('revDots');
    var prevBtn  = document.getElementById('revPrev');
    var nextBtn  = document.getElementById('revNext');

    if (!track) return;

    var GAP      = 28;       // must match CSS gap on .reviews-track
    var cards    = Array.prototype.slice.call(track.querySelectorAll('.review-card'));
    var total    = cards.length;
    var current  = 0;
    var perView  = 2;        // recalculated on resize
    var autoTimer = null;

    /* ---------- measure & size cards ---------- */
    function getPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function sizeCards() {
        var viewport = track.parentElement; // .reviews-carousel-viewport
        var vpW      = viewport.offsetWidth;
        perView      = getPerView();
        var cardW    = perView === 1
            ? vpW
            : Math.floor((vpW - GAP) / 2);
        cards.forEach(function(c) { c.style.width = cardW + 'px'; });
    }

    /* ---------- max step index ---------- */
    function maxIndex() {
        return Math.max(0, total - perView);
    }

    /* ---------- build / rebuild dots ---------- */
    function buildDots() {
        if (!dotsWrap) return;
        dotsWrap.innerHTML = '';
        var steps = maxIndex() + 1;
        for (var i = 0; i < steps; i++) {
            (function(idx) {
                var btn = document.createElement('button');
                btn.className = 'rev-dot' + (idx === 0 ? ' active' : '');
                btn.setAttribute('aria-label', 'Review group ' + (idx + 1));
                btn.addEventListener('click', function() { goTo(idx); stopAuto(); startAuto(); });
                dotsWrap.appendChild(btn);
            })(i);
        }
    }

    /* ---------- navigate ---------- */
    function goTo(index) {
        current = Math.max(0, Math.min(index, maxIndex()));

        var vpW    = track.parentElement.offsetWidth;
        var cardW  = perView === 1 ? vpW : Math.floor((vpW - GAP) / 2);
        var offset = current * (cardW + GAP);
        track.style.transform = 'translateX(-' + offset + 'px)';

        // update dots
        if (dotsWrap) {
            var dots = dotsWrap.querySelectorAll('.rev-dot');
            dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
        }

        // update arrow disabled state
        if (prevBtn) prevBtn.disabled = (current === 0);
        if (nextBtn) nextBtn.disabled = (current >= maxIndex());
    }

    /* ---------- auto-advance ---------- */
    function startAuto() {
        clearInterval(autoTimer);
        autoTimer = setInterval(function() {
            goTo(current >= maxIndex() ? 0 : current + 1);
        }, 5500);
    }
    function stopAuto() { clearInterval(autoTimer); }

    /* ---------- arrow clicks ---------- */
    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); stopAuto(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); stopAuto(); startAuto(); });

    /* ---------- touch / swipe ---------- */
    var touchStartX = 0;
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 45) {
            goTo(current + (diff > 0 ? 1 : -1));
            stopAuto(); startAuto();
        }
    }, { passive: true });

    /* ---------- resize ---------- */
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            var newPer = getPerView();
            if (newPer !== perView) {
                current = 0;
                perView = newPer;
                buildDots();
            }
            sizeCards();
            goTo(current);
        }, 120);
    });

    /* ---------- init ---------- */
    sizeCards();
    buildDots();
    goTo(0);
    startAuto();
})();
