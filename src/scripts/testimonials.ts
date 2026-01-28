export function initTestimonialsCarousel() {
    const track = document.getElementById('testimonial-track') as HTMLElement;
    const prevBtn = document.getElementById('testimonial-prev') as HTMLButtonElement;
    const nextBtn = document.getElementById('testimonial-next') as HTMLButtonElement;
    const dotsContainer = document.getElementById('testimonial-dots') as HTMLElement;

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    function getCarouselData() {
        const items = Array.from(track.children);
        const totalItems = items.length;
        const gap = 24; // gap-6 matches 'gap-6' tailwind class
        const trackWidth = track.clientWidth;
        const itemWidth = items.length > 0 ? (items[0] as HTMLElement).offsetWidth : 0;

        if (totalItems === 0 || itemWidth === 0) {
            return { totalItems: 0, itemsPerPage: 1, totalPages: 0, itemWidth: 0, gap };
        }

        // Items visible = track width divided by (item + gap)
        const itemsPerPage = Math.max(1, Math.round(trackWidth / (itemWidth + gap)));
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return { totalItems, itemsPerPage, totalPages, itemWidth, gap };
    }

    function createDots() {
        const { totalPages } = getCarouselData();
        dotsContainer.innerHTML = '';

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300 bg-gray-300 hover:bg-primary/50';
            dot.setAttribute('aria-label', `Ir a la página ${i + 1}`);
            dot.addEventListener('click', () => scrollToPage(i));
            dotsContainer.appendChild(dot);
        }
        updateDots();
    }

    function updateDots() {
        const { itemsPerPage, itemWidth, gap, totalPages } = getCarouselData();
        const dots = dotsContainer.querySelectorAll('button');
        if (dots.length === 0 || itemWidth === 0) return;

        const scrollLeft = track.scrollLeft;
        const pageWidth = (itemWidth + gap) * itemsPerPage;

        // Improved calculation: Use half-page offset to flip the dot earlier/more naturally
        let pageIndex = Math.round(scrollLeft / pageWidth);

        // Ensure we don't exceed boundaries
        pageIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));

        dots.forEach((dot, i) => {
            if (i === pageIndex) {
                dot.classList.remove('bg-gray-300', 'w-2.5');
                dot.classList.add('bg-primary', 'w-6');
            } else {
                dot.classList.add('bg-gray-300', 'w-2.5');
                dot.classList.remove('bg-primary', 'w-6');
            }
        });

        // Handle arrow button visibility (optional refinement)
        prevBtn.disabled = scrollLeft <= 5;
        nextBtn.disabled = scrollLeft >= (track.scrollWidth - track.clientWidth - 5);

        prevBtn.style.opacity = prevBtn.disabled ? '0.3' : '';
        nextBtn.style.opacity = nextBtn.disabled ? '0.3' : '';
    }

    function scrollToPage(index: number) {
        const { itemsPerPage, itemWidth, gap, totalPages } = getCarouselData();
        if (itemWidth === 0) return;

        const targetIndex = Math.max(0, Math.min(index, totalPages - 1));
        const targetScroll = targetIndex * (itemWidth + gap) * itemsPerPage;

        track.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });

        // Force immediate update check, though scroll listener will trigger too
        setTimeout(updateDots, 100);
    }

    function scrollStep(direction: 'prev' | 'next') {
        const { itemsPerPage, itemWidth, gap } = getCarouselData();
        if (itemWidth === 0) return;

        const scrollLeft = track.scrollLeft;
        const pageWidth = (itemWidth + gap) * itemsPerPage;
        const currentPageIndex = Math.round(scrollLeft / pageWidth);

        const targetPageIndex = direction === 'next' ? currentPageIndex + 1 : currentPageIndex - 1;
        scrollToPage(targetPageIndex);
    }

    // Event Listeners
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollStep('prev');
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        scrollStep('next');
    });

    // Track scrolling with high frequency for smooth visuals
    track.addEventListener('scroll', updateDots, { passive: true });

    // Re-calculate and settle on resize
    const setup = () => {
        createDots();
        updateDots();
    };

    setup();

    let resizeTimer: number;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(setup, 150);
    });
}
