document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    const navLinksItems = document.querySelectorAll('.nav-links a');

    navLinksItems.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Update active class
            navLinksItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Scroll Event Listener
    const backToTopBtn = document.getElementById("backToTopBtn");
    const progressBar = document.getElementById("progressBar");
    const navbar = document.getElementById("navbar");

    window.addEventListener('scroll', function () {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";

        if (window.scrollY > 50) {
            navbar.classList.add("sticky");
        } else {
            navbar.classList.remove("sticky");
        }

        if (winScroll > 500) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    // Dark Mode Toggle with Local Storage
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        let theme = 'light';
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️';
            theme = 'dark';
        } else {
            darkModeToggle.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    });

    // Back to Top Button
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Project Modal Functionality
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-body');
    const closeBtn = document.querySelector('.close-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', function () {
            const projectTitle = this.querySelector('h3').textContent;
            const projectDescription = this.querySelector('p').textContent;
            const projectLink = this.querySelector('.project-btn').getAttribute('href');

            modalContent.innerHTML = `
                <h2>${projectTitle}</h2>
                <p>${projectDescription}</p>
                <a href="${projectLink}" target="_blank" class="btn">View on GitHub</a>
            `;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Typewriter Effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = ["Rza", "a Back-End Developer", "an Enthusiastic Learner"];
    const typingDelay = 100;
    const erasingDelay = 100;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Skill Icon Animation
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('i'), { rotation: 360, duration: 1 });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('i'), { rotation: 0, duration: 1 });
        });
    });

    // Flying Bird Animation
    const flyingBird = document.getElementById('flying-bird');
    const birdAnimationDuration = 5; // Duration in seconds

    function moveBird() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Generate random positions within the viewport
        const randomX = Math.random() * viewportWidth;
        const randomY = Math.random() * viewportHeight;

        // Flip the bird based on direction
        const scaleX = randomX < flyingBird.offsetLeft ? -1 : 1;

        // Animate the bird to the new position
        gsap.to(flyingBird, {
            duration: birdAnimationDuration,
            x: randomX - (viewportWidth / 2),
            y: randomY - (viewportHeight / 2),
            scaleX: scaleX,
            ease: "power1.inOut",
            onComplete: moveBird
        });
    }

    moveBird(); // Start the animation
});
