document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('.nav-overlay .nav-link');

    function toggleNav() {
        if (navOverlay) {
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : '';
        }
    }

    if (navToggle) navToggle.addEventListener('click', toggleNav);
    if (navClose) navClose.addEventListener('click', toggleNav);
    if (navLinks) {
        navLinks.forEach(link => link.addEventListener('click', toggleNav));
    }

    // Hero Scroll-Based Darkening Effect
    const heroSection = document.querySelector('.hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    if (heroSection && heroOverlay) {
        function updateHeroFade() {
            const scrollY = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            
            // Start fading immediately at 0px
            // Fully transparent when scrolled 50% down the hero height
            const fadeDistance = heroHeight * 0.5;
            
            // Calculate opacity: 1 at top, 0 at fadeDistance
            let opacity = 1 - (scrollY / fadeDistance);
            
            // Clamp between 0 and 1
            opacity = Math.max(0, Math.min(1, opacity));
            
            // Apply to CSS variable which controls both overlay and ::after
            heroOverlay.style.setProperty('--overlay-opacity', opacity);
        }
        
        // Listen to scroll
        window.addEventListener('scroll', () => {
            window.requestAnimationFrame(updateHeroFade);
        }, { passive: true });
        
        // Initial call
        updateHeroFade();
    }

    // Hero Parallax Effect (Desktop Only)
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage && window.matchMedia('(min-width: 1024px)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            // Only animate if the hero is in view (approx first 1000px)
            if (scrolled < 1200) {
                // Slower movement (0.15) for subtle effect
                heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
        }, { passive: true });
    }

    // Service Card Mobile Interaction
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Only apply tap-to-expand on screens smaller than 1024px (tablet/mobile)
    if (window.matchMedia('(max-width: 1023px)').matches) {
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                // Close others
                serviceCards.forEach(c => {
                    if (c !== card) c.classList.remove('expanded');
                });
                // Toggle current
                card.classList.toggle('expanded');
            });
        });
    }

    // Gallery Scroll Reveal
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        galleryItems.forEach(item => revealObserver.observe(item));
    }

    // Gallery Parallax (Large Image Only)
    const gallerySection = document.querySelector('.gallery');
    const galleryLargeWrapper = document.querySelector('.gallery-item.large .gallery-image-wrapper');
    
    if (gallerySection && galleryLargeWrapper && window.matchMedia('(min-width: 1024px)').matches) {
        window.addEventListener('scroll', () => {
            const rect = gallerySection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Only animate if reasonably visible
            if (rect.top < windowHeight && rect.bottom > 0) {
                // Calculate center-based offset
                const centerOffset = (windowHeight / 2) - (rect.top + rect.height / 2);
                
                // Subtle parallax speed
                const speed = 0.08; 
                
                galleryLargeWrapper.style.transform = `translateY(${centerOffset * speed}px)`;
            }
        }, { passive: true });
    }

    // Mobile Scroll Reveal for Related Services
    const relatedCards = document.querySelectorAll('.related-card');
    
    if (relatedCards.length > 0 && window.matchMedia('(max-width: 1023px)').matches) {
        const relatedObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60% 0px' // Trigger when element reaches top 40% of viewport
        });
        
        relatedCards.forEach(card => relatedObserver.observe(card));
    }

    // Chat Widget Logic
    const chatWidget = document.querySelector('.chat-widget-container');
    const chatLauncher = document.querySelector('.chat-launcher'); // Use launcher wrapper for click

    if (chatWidget && chatLauncher) {
        function toggleChat() {
            chatWidget.classList.toggle('active');
        }

        chatLauncher.addEventListener('click', toggleChat);
    }
});