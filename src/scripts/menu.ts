let toggle: HTMLElement | null = null;
let menu: HTMLElement | null = null;

function openMenu() {
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
    menu.style.maxHeight = menu.scrollHeight + 'px';
    setTimeout(() => {
        menu?.classList.remove('opacity-0');
        menu?.classList.add('opacity-100');
    }, 10);
}

function closeMenu() {
    if (!toggle || !menu) return;

    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
    menu.style.maxHeight = '0';
    menu.classList.remove('opacity-100');
    menu.classList.add('opacity-0');
}

function handleToggle(e: MouseEvent) {
    e.stopPropagation();
    const isOpen = toggle?.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

function handleOutsideClick(e: MouseEvent) {
    const isOpen = toggle?.getAttribute('aria-expanded') === 'true';
    if (isOpen && !menu?.contains(e.target as Node) && !toggle?.contains(e.target as Node)) {
        closeMenu();
    }
}

function handleLinkClick() {
    closeMenu();
}

export function initMobileMenu() {
    toggle = document.getElementById('mobile-menu-toggle');
    menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    // Ensure menu starts closed
    closeMenu();

    // Add event listeners
    toggle.addEventListener('click', handleToggle as EventListener);
    document.addEventListener('click', handleOutsideClick as EventListener);

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', handleLinkClick);
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// Re-initialize after View Transitions
document.addEventListener('astro:after-swap', initMobileMenu);
