document.addEventListener("DOMContentLoaded", () => {

    // Intersection Observer for animations
    const animateOnScroll = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("opacity-100", "translate-y-0", "translate-x-0");
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(animateOnScroll, options);

    // Hero Section Animations
    const heroElements = document.querySelectorAll(".hero-in-view, .hero-in-view-p, .hero-in-view-buttons, .hero-in-view-checks, .hero-image-in-view");
    heroElements.forEach((el) => {
        el.classList.add("opacity-0", "translate-y-10"); // Initial state for Y-axis animations
        if (el.classList.contains("hero-image-in-view")) {
            el.classList.remove("translate-y-10"); // Remove Y-axis initial state
            el.classList.add("translate-x-10"); // Initial state for X-axis animation
        }
        observer.observe(el);
    });

    // Features Section Animations
    const featuresHeader = document.querySelector(".features-in-view");
    if (featuresHeader) {
        featuresHeader.classList.add("opacity-0", "translate-y-10");
        observer.observe(featuresHeader);
    }

    const featureCards = document.querySelectorAll(".features-cards .card");
    featureCards.forEach((card) => {
        card.classList.add("opacity-0", "translate-y-10");
        const delay = parseInt(card.dataset.delay || "0");
        card.style.transitionDelay = `${delay}ms`;
        observer.observe(card);
    });

    // Testimonials Section Animations
    const testimonialsHeader = document.querySelector(".testimonials-in-view");
    if (testimonialsHeader) {
        testimonialsHeader.classList.add("opacity-0", "translate-y-10");
        observer.observe(testimonialsHeader);
    }

    const testimonialCards = document.querySelectorAll(".testimonials-cards .card");
    testimonialCards.forEach((card) => {
        card.classList.add("opacity-0", "translate-y-10");
        const delay = parseInt(card.dataset.delay || "0");
        card.style.transitionDelay = `${delay}ms`;
        observer.observe(card);
    });

    // Pricing Section Animations
    const pricingHeader = document.querySelector(".pricing-in-view");
    if (pricingHeader) {
        pricingHeader.classList.add("opacity-0", "translate-y-10");
        observer.observe(pricingHeader);
    }

    const pricingCards = document.querySelectorAll(".pricing-cards .card");
    pricingCards.forEach((card) => {
        card.classList.add("opacity-0", "translate-y-10");
        const delay = parseInt(card.dataset.delay || "0");
        card.style.transitionDelay = `${delay}ms`;
        observer.observe(card);
    });

    // CTA Section Animations
    const ctaSection = document.querySelector(".cta-in-view");
    if (ctaSection) {
        ctaSection.classList.add("opacity-0", "translate-y-10");
        observer.observe(ctaSection);
    }


    // Animated Counter
    const animatedCounters = document.querySelectorAll(".animated-counter");

    const animateCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                let current = 0;
                const duration = 2000; // milliseconds
                const stepTime = 10; // milliseconds per step
                const increment = target / (duration / stepTime);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, stepTime);

                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounter, { threshold: 0.5 });
    animatedCounters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Typing Animation
    const typingElement = document.getElementById("typing-animation-text");
    const originalText = typingElement.textContent;
    typingElement.textContent = ""; // Clear text initially
    let charIndex = 0;
    const typingDelay = 150; // milliseconds

    function typeText() {
        if (charIndex < originalText.length) {
            typingElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingDelay);
        } else {
            // Add blinking cursor
            const cursor = document.createElement("span");
            cursor.classList.add("animate-pulse");
            cursor.textContent = "|";
            typingElement.parentNode.appendChild(cursor);
        }
    }

    // Observe the hero section to start typing animation when in view
    const heroSection = document.getElementById("hero");
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    heroObserver.observe(heroSection);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Button functionalities
    document.getElementById("btn-get-started-header")?.addEventListener("click", () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("btn-request-demo-hero")?.addEventListener("click", () => {
        alert("Demo requested!");
    });

    document.getElementById("btn-learn-more-hero")?.addEventListener("click", () => {
        document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("btn-choose-starter")?.addEventListener("click", () => {
        alert("Starter plan selected!");
    });

    document.getElementById("btn-choose-professional")?.addEventListener("click", () => {
        alert("Professional plan selected!");
    });

    document.getElementById("btn-contact-sales-enterprise")?.addEventListener("click", () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("btn-start-free-trial")?.addEventListener("click", () => {
        alert("Free trial started!");
    });

    document.getElementById("btn-schedule-demo-cta")?.addEventListener("click", () => {
        alert("Demo scheduled!");
    });
});