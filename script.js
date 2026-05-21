document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[data-section-id]');

    // Function to switch visibility and URL
    function switchSection(targetId) {
        // 1. Update visibility by manipulating inline styles
        sections.forEach(section => {
            const isTarget = section.getAttribute('data-section-id') === targetId;
            section.style.display = isTarget ? 'block' : 'none';
        });

        // 2. Update URL hash without triggering a scroll jump
        history.pushState(null, '', `#${targetId}`);
    }

    // Event listener for navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                switchSection(targetId);
            }
        });
    });

    // Handle initial load state based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        const target = document.querySelector(`[data-section-id="${initialHash}"]`);
        if (target) {
            switchSection(initialHash);
        } else {
            // Fallback to 'about' if hash points nowhere
            switchSection('about');
        }
    } else {
        // Default to 'about' section
        switchSection('about');
    }
});