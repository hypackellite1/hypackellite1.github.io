console.log('Navbar script loaded!');

function initializeNavbar() {
    const navbar = document.getElementById('fixed-nav-bar');
    
    if (!navbar) {
        console.log('Navbar not found, waiting...');
        setTimeout(initializeNavbar, 100);
        return;
    }

    console.log('Navbar found, setting up scroll handling');
    const scrollThreshold = 100;
    
    // Get elements we need to animate
    const leftSection = navbar.querySelector('.fixed-nav-bar-left');
    const rightSection = navbar.querySelector('.fixed-nav-bar-right');
    const centerSection = navbar.querySelector('.fixed-nav-bar-center');

    // Function to check if we're on mobile
    const isMobile = () => window.innerWidth <= 768;

    window.addEventListener('scroll', () => {
        // Don't apply scroll effects on mobile
        if (isMobile()) {
            navbar.style.width = '';
            navbar.style.borderRadius = '';
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
            navbar.style.webkitBackdropFilter = '';
            navbar.style.boxShadow = '';
            leftSection.style.transform = '';
            rightSection.style.transform = '';
            navbar.classList.remove('scrolled');
            return;
        }

        const currentScroll = window.pageYOffset;
        
        // Calculate progress between 0 and 1
        const progress = Math.min(Math.max(currentScroll / scrollThreshold, 0), 1);
        
        // Update navbar width - using a minimum width that fits content
        const maxWidth = 98;
        const minWidth = 35;
        const currentWidth = maxWidth - (progress * (maxWidth - minWidth));
        navbar.style.width = `${currentWidth}%`;
        
        // Update border radius with smoother progression
        const minRadius = 5;
        const maxRadius = 50;
        const currentRadius = minRadius + (progress ** 1.5 * (maxRadius - minRadius));
        navbar.style.borderRadius = `${currentRadius}px`;
        
        // Update background and backdrop filter based on scroll
        if (progress > 0) {
            const opacity = Math.min(0.35 * progress, 0.35);
            navbar.style.backgroundColor = `rgba(28, 28, 28, ${opacity})`;
            const blurAmount = Math.min(12 * progress, 12);
            navbar.style.backdropFilter = `blur(${blurAmount}px) saturate(180%)`;
            navbar.style.webkitBackdropFilter = `blur(${blurAmount}px) saturate(180%)`;
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.webkitBackdropFilter = 'none';
        }
        
        // Update shadow based on progress
        const shadowProgress = progress ** 2;
        const shadowOpacity = shadowProgress * 0.5;
        const shadowBlur = 20 + (shadowProgress * 15);
        const shadowSpread = shadowProgress * 2;
        navbar.style.boxShadow = progress > 0.5 
            ? `0 10px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${shadowOpacity})`
            : 'none';
        
        // Slide animations for logo and discord with smoother progression
        const slideDistance = 50;
        const easeProgress = progress < 0.5
            ? 4 * progress ** 3
            : 1 - ((-2 * progress + 2) ** 3) / 2;
            
        const leftSlide = -slideDistance * easeProgress;
        const rightSlide = slideDistance * easeProgress;
        
        leftSection.style.transform = `translateX(${leftSlide}%)`;
        rightSection.style.transform = `translateX(${rightSlide}%)`;
        
        // Add scrolled class for other style changes when fully scrolled
        if (progress > 0.9 && !navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled');
        } else if (progress <= 0.9 && navbar.classList.contains('scrolled')) {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle initial page load state
    if (!isMobile()) {
        const initialProgress = Math.min(Math.max(window.pageYOffset / scrollThreshold, 0), 1);
        const initialWidth = 98 - (initialProgress * (98 - 35));
        navbar.style.width = `${initialWidth}%`;
        
        // Set initial background and backdrop filter
        if (initialProgress > 0) {
            const opacity = Math.min(0.35 * initialProgress, 0.35);
            navbar.style.backgroundColor = `rgba(28, 28, 28, ${opacity})`;
            const blurAmount = Math.min(12 * initialProgress, 12);
            navbar.style.backdropFilter = `blur(${blurAmount}px) saturate(180%)`;
            navbar.style.webkitBackdropFilter = `blur(${blurAmount}px) saturate(180%)`;
        }
        
        // Set initial shadow state
        if (initialProgress > 0.5) {
            const shadowOpacity = (initialProgress ** 2) * 0.5;
            const shadowBlur = 20 + ((initialProgress ** 2) * 15);
            const shadowSpread = initialProgress ** 2 * 2;
            navbar.style.boxShadow = `0 10px ${shadowBlur}px ${shadowSpread}px rgba(0, 0, 0, ${shadowOpacity})`;
        }
        
        if (initialProgress > 0.9) {
            navbar.classList.add('scrolled');
        }
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (isMobile()) {
            navbar.style.width = '';
            navbar.style.borderRadius = '';
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
            navbar.style.webkitBackdropFilter = '';
            navbar.style.boxShadow = '';
            leftSection.style.transform = '';
            rightSection.style.transform = '';
            navbar.classList.remove('scrolled');
        }
    });
}

// Start initialization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeNavbar, 100);
}); 

// Mobile menu functionality
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    
    menu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Initialize mobile menu
function initializeMobileMenu() {
    // Create mobile menu if it doesn't exist
    if (!document.getElementById('mobile-menu')) {
        const mobileMenu = document.createElement('div');
        mobileMenu.id = 'mobile-menu';
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
            <div class="mobile-menu-content">
                <button class="mobile-menu-close" onclick="toggleMobileMenu()">
                    <i class="fa-solid fa-xmark navbar-icon"></i>
                </button>
                <div class="mobile-menu-links">
                    <a class="navbar-link" href="/library.html">
                        <i class="fa-solid fa-gamepad navbar-icon"></i>Games
                    </a>
                    <a class="navbar-link" href="/settings.html">
                        <i class="fa-duotone fa-gear navbar-icon"></i>Settings
                    </a>
                    <a class="navbar-link" href="https://discord.gg/xjMnZn3R5f" target="_blank">
                        <i class="fa-brands fa-discord navbar-icon"></i>Discord
                    </a>
                </div>
            </div>
        `;
        document.body.appendChild(mobileMenu);
    }
}

// Initialize when navbar is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if navbar is already loaded
    if (document.getElementById('fixed-nav-bar')) {
        initializeMobileMenu();
    } else {
        // Wait for navbar to be loaded
        const observer = new MutationObserver((mutations) => {
            if (document.getElementById('fixed-nav-bar')) {
                initializeMobileMenu();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}); 
