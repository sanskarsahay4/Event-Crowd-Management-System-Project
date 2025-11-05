// Sample event data
const events = [
    {
        title: "Tech Conference 2025",
        date: "December 15, 2025",
        description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative solutions.",
        image: "https://source.unsplash.com/random/800x600/?technology"
    },
    {
        title: "Music Festival",
        date: "January 5, 2026",
        description: "Experience an unforgettable night of music with top artists from around the world.",
        image: "https://source.unsplash.com/random/800x600/?concert"
    },
    {
        title: "Food & Wine Expo",
        date: "February 20, 2026",
        description: "Discover culinary delights and fine wines from renowned chefs and sommeliers.",
        image: "https://source.unsplash.com/random/800x600/?food"
    },
    {
        title: "Sports Championship",
        date: "March 10, 2026",
        description: "Witness the ultimate showdown of athletic excellence in this prestigious championship.",
        image: "https://source.unsplash.com/random/800x600/?sports"
    }
];

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Generate event cards
function createEventCards() {
    const eventGrid = document.getElementById('eventGrid');
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        
        eventCard.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-details">
                <h3>${event.title}</h3>
                <p class="event-date">${event.date}</p>
                <p>${event.description}</p>
            </div>
        `;
        
        eventGrid.appendChild(eventCard);
    });
}

// Create scroll to top button
function createScrollTopButton() {
    const button = document.createElement('div');
    button.className = 'scroll-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        button.classList.toggle('visible', window.scrollY > 300);
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createEventCards();
    createScrollTopButton();
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .event-card').forEach(element => {
    observer.observe(element);
});