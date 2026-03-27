// Initialize Lucide icons
lucide.createIcons();

// Disable right click
document.addEventListener('contextmenu', event => event.preventDefault());

// Set current year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Mobile menu toggle logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileBackdrop = document.getElementById('mobile-backdrop');

function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileBackdrop.classList.remove('hidden');
        menuIcon.setAttribute('data-lucide', 'x');
    } else {
        mobileMenu.classList.add('hidden');
        mobileBackdrop.classList.add('hidden');
        menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons(); // Re-render icon
}

mobileMenuBtn.addEventListener('click', toggleMenu);
mobileBackdrop.addEventListener('click', toggleMenu);

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) toggleMenu();
    });
});

// Navbar scroll effect*
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});


// Custom Cursor Logic
const cursor = document.getElementById('cursor');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

const speed = 0.15; 
let lastAngle = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * speed;
    cursorY += distY * speed;

    let angle = lastAngle;
    
    if (Math.abs(distX) > 0.5 || Math.abs(distY) > 0.5) {
        angle = Math.atan2(distY, distX) * (180 / Math.PI) + 90;
        lastAngle = angle;
    }

    cursor.style.transform = `translate3d(${cursorX - 15}px, ${cursorY - 15}px, 0) rotate(${angle}deg)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();
