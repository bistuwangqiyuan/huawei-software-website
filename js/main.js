document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const header = document.querySelector('header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            header.classList.toggle('mobile-menu-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (header.classList.contains('mobile-menu-open') && 
            !event.target.closest('header')) {
            header.classList.remove('mobile-menu-open');
        }
    });

    // Scroll Animation for Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        function checkScroll() {
            timelineItems.forEach(item => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < window.innerHeight * 0.8) {
                    item.classList.add('show');
                }
            });
        }

        // Add initial class
        timelineItems.forEach(item => {
            item.classList.add('timeline-hidden');
        });

        // Add style for animation
        const style = document.createElement('style');
        style.textContent = `
            .timeline-hidden {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.5s ease;
            }
            .timeline-hidden.show {
                opacity: 1;
                transform: translateX(0);
            }
        `;
        document.head.appendChild(style);

        // Check on load and scroll
        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);
    }

    // Dropdown touch device support
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (dropdowns.length > 0 && 'ontouchstart' in window) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const content = this.nextElementSibling;
                
                // Close all other open dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        const otherContent = other.querySelector('.dropdown-content');
                        if (otherContent) {
                            otherContent.style.display = 'none';
                        }
                    }
                });
                
                // Toggle current dropdown
                if (content) {
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    const content = dropdown.querySelector('.dropdown-content');
                    if (content) {
                        content.style.display = 'none';
                    }
                });
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
