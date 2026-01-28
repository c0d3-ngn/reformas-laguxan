interface Project {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  images: number[];
}

let currentImageIndex = 0;
let currentProject: Project | null = null;
let allProjects: Project[] = [];
let modal: HTMLElement | null = null;
let modalContent: HTMLElement | null = null;
let closeModalBtn: HTMLElement | null = null;

function updateCarouselImage() {
  if (!currentProject) return;
  const img = document.getElementById('carousel-image') as HTMLImageElement;
  if (img) {
    // Remove and re-add animation class to trigger it
    img.classList.remove('animate-fade-in');
    void img.offsetWidth; // Force reflow
    img.src = `/projects/project-${currentProject.images[currentImageIndex]}.jpg`;
    img.classList.add('animate-fade-in');
  }
  // Update dots
  const dots = document.querySelectorAll('#modal-content .absolute.bottom-4 > div');
  dots.forEach((dot, idx) => {
    if (idx === currentImageIndex) {
      dot.classList.remove('bg-white/50');
      dot.classList.add('bg-white');
    } else {
      dot.classList.remove('bg-white');
      dot.classList.add('bg-white/50');
    }
  });
}

function nextImage() {
  if (!currentProject) return;
  currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
  updateCarouselImage();
}

function prevImage() {
  if (!currentProject) return;
  currentImageIndex =
    currentImageIndex === 0 ? currentProject.images.length - 1 : currentImageIndex - 1;
  updateCarouselImage();
}

function updateModalContent() {
  if (!currentProject || !modalContent) return;

  const images = currentProject.images.map((id) => `/projects/project-${id}.jpg`);

  modalContent.innerHTML = `
      <h2 class="text-2xl md:text-3xl font-bold text-neutral-dark mb-4 pr-10">${currentProject.title}</h2>
      <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-secondary text-sm md:text-base">
      <span class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        ${currentProject.date}
      </span>
      <span class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        </svg>
        ${currentProject.location}
      </span>
    </div>

    <!-- Image Carousel -->
    <div class="relative mb-6 group">
      <div class="relative h-64 md:h-96 bg-gray-100 rounded-xl overflow-hidden">
        <img 
          id="carousel-image" 
          src="${images[currentImageIndex]}" 
          alt="${currentProject.title}"
          class="w-full h-full object-cover"
        />
      </div>
      
      ${images.length > 1
      ? `
        <button id="prev-btn" class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 md:bg-white/70 hover:bg-white p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button id="next-btn" class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 md:bg-white/70 hover:bg-white p-2 rounded-full shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          ${images
        .map(
          (_, idx) => `
            <div class="w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}"></div>
          `
        )
        .join('')}
        </div>
      `
      : ''
    }
    </div>

    <!-- Description -->
    <p class="text-base md:text-lg text-secondary mb-6 leading-relaxed">${currentProject.description}</p>
  `;

  // Add carousel navigation listeners
  if (images.length > 1) {
    document.getElementById('prev-btn')?.addEventListener('click', prevImage);
    document.getElementById('next-btn')?.addEventListener('click', nextImage);
  }
}

function openModal(projectId: number) {
  currentProject = allProjects.find((p) => p.id === projectId) || null;
  if (!currentProject) return;

  currentImageIndex = 0;
  updateModalContent();
  modal?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;

  const container = modal.querySelector('.animate-scale-in');
  if (container) {
    container.classList.remove('animate-scale-in');
    container.classList.add('animate-scale-out');

    container.addEventListener('animationend', () => {
      modal?.classList.add('hidden');
      container.classList.remove('animate-scale-out');
      container.classList.add('animate-scale-in');
      document.body.style.overflow = '';
      currentProject = null;
    }, { once: true });
  } else {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    currentProject = null;
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal();
  }
  if (!currentProject) return;
  if (e.key === 'ArrowRight') {
    nextImage();
  }
  if (e.key === 'ArrowLeft') {
    prevImage();
  }
};

const handleModalClick = (e: MouseEvent) => {
  if (e.target === modal) {
    closeModal();
  }
};

export function initProjectModal(projects: Project[]) {
  allProjects = projects;
  const projectCards = document.querySelectorAll('[data-project-id]');
  modal = document.getElementById('project-modal');
  modalContent = document.getElementById('modal-content');
  closeModalBtn = document.getElementById('close-modal');

  if (!projectCards.length || !modal || !modalContent || !closeModalBtn) return;

  // Event listeners
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = parseInt(card.getAttribute('data-project-id') || '0');
      openModal(projectId);
    });
  });

  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', handleModalClick as EventListener);
  document.addEventListener('keydown', handleKeydown);
}
