interface Project {
  id: number
  title: string
  location: string
  year: number
  description: string
  images: string[]
}

function buildProjectCardHTML(project: Project): string {
  return `<figure class="h-80 w-full overflow-hidden"><img src="${project.images[0]}" alt="${project.title}" class="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" /></figure><div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white"><span class="badge bg-primary text-white border-none mb-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 shadow-lg">${project.location}</span><h3 class="text-xl font-bold">${project.title}</h3></div>`
}

function openProjectModal(project: Project): void {
  const modal = document.getElementById("project-modal") as HTMLDialogElement | null
  const carouselContainer = document.getElementById("carousel-container")

  if (!modal || !project) return

  const titleEl = document.getElementById("modal-title")
  const locationEl = document.getElementById("modal-location")
  const yearEl = document.getElementById("modal-year")
  const descriptionEl = document.getElementById("modal-description")

  if (titleEl) titleEl.textContent = project.title
  if (locationEl) locationEl.textContent = project.location
  if (yearEl) yearEl.textContent = project.year.toString()
  if (descriptionEl) descriptionEl.textContent = project.description

  if (carouselContainer && project.images.length > 0) {
    carouselContainer.innerHTML = project.images
      .map(
        (img, index) =>
          `<div class="carousel-item w-full h-full"><img src="${img}" alt="${project.title} ${index + 1}" class="w-full h-full object-cover" /></div>`,
      )
      .join("")
  }

  modal.showModal()
  document.body.classList.add("overflow-hidden")
}

function closeProjectModal(): void {
  const modal = document.getElementById("project-modal") as HTMLDialogElement | null
  if (modal) {
    modal.close()
    document.body.classList.remove("overflow-hidden")
  }
}

function attachProjectsListeners(): void {
  const grid = document.getElementById("projects-grid") as HTMLElement | null
  const loadMoreBtn = document.getElementById("load-more-btn") as HTMLButtonElement | null

  if (!grid || !loadMoreBtn) return

  let projects: Project[]
  try {
    projects = JSON.parse(grid.dataset.projects || "[]")
  } catch {
    projects = []
  }
  let currentPage = 1
  const perPage = parseInt(loadMoreBtn.dataset.perPage || "6", 10)

  document.querySelectorAll(".project-card").forEach(card => {
    const cardElement = card as HTMLElement
    cardElement.addEventListener("click", () => {
      try {
        const projectData: Project = JSON.parse(cardElement.dataset.project || "{}")
        openProjectModal(projectData)
      } catch {
        // Invalid project data, ignore click
      }
    })
  })

  loadMoreBtn.addEventListener("click", () => {
    currentPage++
    const start = (currentPage - 1) * perPage
    const end = start + perPage
    const newProjects = projects.slice(start, end)

    if (newProjects.length === 0) {
      loadMoreBtn.style.display = "none"
      return
    }

    newProjects.forEach((project, index) => {
      const article = document.createElement("article")
      article.className =
        "project-card group animate-in fade-in slide-in-from-bottom-8 fill-mode-both relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
      article.style.animationDelay = `${index * 100}ms`
      article.dataset.project = JSON.stringify(project)
      article.innerHTML = buildProjectCardHTML(project)
      article.addEventListener("click", () => openProjectModal(project))
      grid.appendChild(article)
    })

    if (end >= projects.length) {
      loadMoreBtn.style.display = "none"
    }
  })
}

function attachModalListeners(): void {
  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const closeBtn = target.closest("#modal-close, #modal-close-btn")
    const backdrop = target.closest(".modal-backdrop")
    if (closeBtn || backdrop) {
      closeProjectModal()
    }
  })

  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeProjectModal()
    }
  })

  const prevBtn = document.getElementById("carousel-prev")
  const nextBtn = document.getElementById("carousel-next")
  const carouselContainer = document.getElementById("carousel-container")

  if (prevBtn && carouselContainer) {
    prevBtn.addEventListener("click", () => {
      carouselContainer.scrollBy({ left: -carouselContainer.clientWidth, behavior: "smooth" })
    })
  }

  if (nextBtn && carouselContainer) {
    nextBtn.addEventListener("click", () => {
      carouselContainer.scrollBy({ left: carouselContainer.clientWidth, behavior: "smooth" })
    })
  }
}

function initProjectsPage(): void {
  if (typeof document === "undefined") return

  attachProjectsListeners()
  attachModalListeners()
}

initProjectsPage()

document.addEventListener("astro:after-swap", () => {
  attachProjectsListeners()
  attachModalListeners()
})
