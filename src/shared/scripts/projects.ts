interface Project {
	id: number
	title: string
	location: string
	year: number
	description: string
	images: string[]
}

declare global {
	interface Window {
		currentImageIndex: number
	}
}

let currentImageIndex = 0

function openProjectModal(project: Project): void {
	const modal = document.getElementById("project-modal")
	const carouselImages = document.getElementById("carousel-images")

	if (!modal || !project) return

	const titleEl = document.getElementById("modal-title")
	const locationEl = document.getElementById("modal-location")
	const yearEl = document.getElementById("modal-year")
	const descriptionEl = document.getElementById("modal-description")

	if (titleEl) titleEl.textContent = project.title
	if (locationEl) locationEl.textContent = project.location
	if (yearEl) yearEl.textContent = project.year.toString()
	if (descriptionEl) descriptionEl.textContent = project.description

	if (carouselImages) {
		carouselImages.innerHTML = project.images
			.map(
				(img, index) =>
					`<img src="${img}" alt="${project.title} ${index + 1}" class="carousel-image absolute inset-0 h-full w-full object-cover ${index === 0 ? "opacity-100" : "opacity-0"}" data-index="${index}" />`,
			)
			.join("")
	}

	currentImageIndex = 0
	updateCarouselControls(project.images.length)

	modal.classList.remove("hidden")
	document.body.classList.add("overflow-hidden")
}

function closeProjectModal(): void {
	const modal = document.getElementById("project-modal")
	if (modal) {
		modal.classList.add("hidden")
		document.body.classList.remove("overflow-hidden")
	}
}

function updateCarouselControls(length: number): void {
	const prevBtn = document.getElementById("carousel-prev") as HTMLElement | null
	const nextBtn = document.getElementById("carousel-next") as HTMLElement | null
	if (prevBtn) prevBtn.style.display = length > 1 ? "block" : "none"
	if (nextBtn) nextBtn.style.display = length > 1 ? "block" : "none"
}

function attachProjectsListeners(): void {
	const grid = document.getElementById("projects-grid") as HTMLElement | null
	const loadMoreBtn = document.getElementById("load-more-btn") as HTMLButtonElement | null

	if (!grid || !loadMoreBtn) return

	const projects: Project[] = JSON.parse(grid.dataset.projects || "[]")
	let currentPage = 1
	const perPage = parseInt(loadMoreBtn.dataset.perPage || "6", 10)

	document.querySelectorAll(".project-card").forEach(card => {
		const cardElement = card as HTMLElement
		cardElement.addEventListener("click", () => {
			const projectData: Project = JSON.parse(cardElement.dataset.project || "{}")
			openProjectModal(projectData)
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
				"project-card group animate-in fade-in slide-in-from-bottom-8 fill-mode-both relative cursor-pointer overflow-hidden rounded-xl shadow-lg"
			article.style.animationDelay = `${index * 100}ms`
			article.dataset.project = JSON.stringify(project)
			article.innerHTML = `<img src="${project.images[0]}" alt="${project.title}" class="h-80 w-full transform object-cover transition duration-700 group-hover:scale-105" loading="lazy" /><div class="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-8 text-white"><span class="text-primary-light mb-2 translate-y-2 text-sm font-bold tracking-wider uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">${project.location}</span><h3 class="mb-2 text-2xl font-bold">${project.title}</h3></div>`
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
		const closeBtn = target.closest("#modal-close, #modal-backdrop, #modal-close-btn")
		if (closeBtn || target.id === "modal-backdrop") {
			closeProjectModal()
		}
	})

	document.addEventListener("keydown", (e: KeyboardEvent) => {
		if (e.key === "Escape") closeProjectModal()
	})

	document.addEventListener("click", (e: MouseEvent) => {
		const target = e.target as HTMLElement
		const prevBtn = target.closest("#carousel-prev")
		const nextBtn = target.closest("#carousel-next")

		if (prevBtn || nextBtn) {
			const images = document.querySelectorAll(".carousel-image")
			const total = images.length
			if (total === 0) return

			if (prevBtn) {
				currentImageIndex = (currentImageIndex - 1 + total) % total
			} else if (nextBtn) {
				currentImageIndex = (currentImageIndex + 1) % total
			}

			images.forEach((img, index) => {
				img.classList.toggle("opacity-100", index === currentImageIndex)
				img.classList.toggle("opacity-0", index !== currentImageIndex)
			})
		}
	})
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
