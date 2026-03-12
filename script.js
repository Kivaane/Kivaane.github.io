document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll & Mobile Toggle
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')){
                navLinks.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if(anchor.getAttribute('href') === '#') return;
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer (Fade in Animations)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const intersectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        intersectionObserver.observe(el);
    });

    // Floating Background Icons
    const iconCls = ['fas fa-chess-knight', 'fas fa-book', 'fas fa-code', 'fas fa-laptop-code', 'fas fa-microchip', 'fas fa-server', 'fas fa-satellite'];
    const layer = document.getElementById('icon-layer');
    
    function spawnIcon() {
        if (!layer || document.hidden) return;
        const i = document.createElement('i');
        const rCls = iconCls[Math.floor(Math.random() * iconCls.length)];
        i.className = `float-icon ${rCls}`;
        
        i.style.left = `${Math.random() * 100}vw`;
        i.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
        i.style.animationDuration = `${Math.random() * 15 + 15}s`;
        
        layer.appendChild(i);
        setTimeout(() => { if (layer.contains(i)) i.remove(); }, 30000);
    }
    
    for(let i=0; i<3; i++) spawnIcon();
    setInterval(spawnIcon, 4000);

    // Occasional Racing Car
    const carContainer = document.getElementById('racing-car-container');
    function triggerCar() {
        if (!carContainer || document.hidden) return;
        const startY = Math.random() * 50 + 20; // 20% to 70% height
        carContainer.style.top = `${startY}%`;
        
        carContainer.style.transition = 'none';
        carContainer.style.transform = `translateX(-200px)`;
        
        setTimeout(() => {
            carContainer.style.transition = 'transform 3s cubic-bezier(0.1, 0, 0.9, 1)';
            carContainer.style.transform = `translateX(${window.innerWidth + 200}px)`;
        }, 50);
    }
    
    setTimeout(triggerCar, 5000);
    setInterval(triggerCar, 45000);

});
