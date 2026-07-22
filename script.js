document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeaderScroll();
    initContactForm();
    initThemeToggle();
});

/**
 * Accessible Navigation Drawer Logic (Hamburger Menu)
 */
function initNavigation() {
    const hamburger = document.querySelector('#header .hamburger');
    const navList = document.querySelector('#header .nav-list ul');
    const navLinks = document.querySelectorAll('#header .nav-list ul a');

    if (!hamburger || !navList) return;

    // Toggle menu visibility
    function toggleMenu() {
        const isOpen = hamburger.classList.toggle('active');
        navList.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navList.setAttribute('aria-hidden', isOpen ? 'false' : 'true');

        if (isOpen) {
            // Focus on the first navigation link after drawer opens
            setTimeout(() => {
                if (navLinks.length > 0) navLinks[0].focus();
            }, 100);
            document.addEventListener('keydown', trapFocus);
        } else {
            document.removeEventListener('keydown', trapFocus);
            hamburger.focus();
        }
    }

    // Close menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navList.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', trapFocus);
    }

    // Trap focus inside the menu when open (mobile)
    function trapFocus(e) {
        if (window.innerWidth >= 1200) return; // Only trap focus on mobile drawer view

        const focusables = [hamburger, ...Array.from(navLinks)];
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        } else if (e.key === 'Escape') {
            closeMenu();
            hamburger.focus();
        }
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1200) {
                closeMenu();
            }
        });
    });

    // Close drawer when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            closeMenu();
            navList.removeAttribute('aria-hidden');
        } else {
            if (!hamburger.classList.contains('active')) {
                navList.setAttribute('aria-hidden', 'true');
            }
        }
    });

    // Handle initial state based on viewport width
    if (window.innerWidth < 1200) {
        navList.setAttribute('aria-hidden', 'true');
    } else {
        navList.removeAttribute('aria-hidden');
    }
}

/**
 * Opaque background on scroll for header contrast
 */
function initHeaderScroll() {
    const header = document.querySelector('#header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Accessible Contact Form Logic
 */
function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const summaryContainer = document.getElementById('error-summary');
    const successContainer = document.getElementById('success-summary');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset states
        let hasErrors = false;
        const errors = [];
        summaryContainer.style.display = 'none';
        summaryContainer.innerHTML = '';
        successContainer.style.display = 'none';

        // Clear individual error markings
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('has-error');
            const input = group.querySelector('input, textarea');
            if (input) {
                input.removeAttribute('aria-invalid');
            }
        });

        // 1. Validate Name
        if (!nameInput.value.trim()) {
            markError(nameInput, 'Name is required.');
            errors.push({ id: 'name', message: 'Name is required.' });
            hasErrors = true;
        }

        // 2. Validate Email
        const emailValue = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            markError(emailInput, 'Email address is required.');
            errors.push({ id: 'email', message: 'Email address is required.' });
            hasErrors = true;
        } else if (!emailRegex.test(emailValue)) {
            markError(emailInput, 'Please enter a valid email address (e.g. name@domain.com).');
            errors.push({ id: 'email', message: 'Please enter a valid email address.' });
            hasErrors = true;
        }

        // 3. Validate Subject
        if (!subjectInput.value.trim()) {
            markError(subjectInput, 'Subject is required.');
            errors.push({ id: 'subject', message: 'Subject is required.' });
            hasErrors = true;
        }

        // 4. Validate Message
        if (!messageInput.value.trim()) {
            markError(messageInput, 'Message is required.');
            errors.push({ id: 'message', message: 'Message is required.' });
            hasErrors = true;
        }

        if (hasErrors) {
            // Build Error Summary
            buildErrorSummary(errors);
        } else {
            // Show Success Notification
            successContainer.textContent = 'Thank you, your message has been sent successfully!';
            successContainer.style.display = 'block';
            successContainer.setAttribute('tabindex', '-1');
            successContainer.focus();
            form.reset();
        }
    });

    function markError(inputElement, errorMessage) {
        const formGroup = inputElement.closest('.form-group');
        if (!formGroup) return;

        formGroup.classList.add('has-error');
        inputElement.setAttribute('aria-invalid', 'true');
        
        const errorElement = formGroup.querySelector('.error-msg');
        if (errorElement) {
            errorElement.textContent = errorMessage;
        }
    }

    function buildErrorSummary(errors) {
        summaryContainer.style.display = 'block';
        
        const heading = document.createElement('h2');
        heading.setAttribute('id', 'error-summary-title');
        heading.textContent = `There are ${errors.length} validation errors on this form:`;
        summaryContainer.appendChild(heading);

        const list = document.createElement('ul');
        errors.forEach(err => {
            const item = document.createElement('li');
            const link = document.createElement('a');
            link.setAttribute('href', `#${err.id}`);
            link.textContent = err.message;
            
            // Focus input when error link is clicked
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetInput = document.getElementById(err.id);
                if (targetInput) targetInput.focus();
            });

            item.appendChild(link);
            list.appendChild(item);
        });

        summaryContainer.appendChild(list);
        summaryContainer.setAttribute('tabindex', '-1');
        summaryContainer.focus();
    }
}

/**
 * Dynamic Light/Dark Theme Switching
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
        document.body.classList.add('light-theme');
        themeToggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.setAttribute('aria-label', 'Switch to light theme');
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme-preference', isLight ? 'light' : 'dark');
        themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    });
}
