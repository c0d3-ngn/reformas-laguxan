interface MenuElements {
	btn: HTMLElement | null
	backdrop: HTMLElement | null
	drawer: HTMLElement | null
	closeBtn: HTMLElement | null
	menuIcon: Element | null
	closeIcon: Element | null
}

let isOpen = false
let scrollPosition = 0

function getElements(): MenuElements {
	return {
		btn: document.getElementById("mobile-menu-btn"),
		backdrop: document.getElementById("mobile-backdrop"),
		drawer: document.getElementById("mobile-drawer"),
		closeBtn: document.getElementById("mobile-menu-close"),
		menuIcon: document.querySelector(".menu-icon"),
		closeIcon: document.querySelector(".close-icon"),
	}
}

function openMenu(): void {
	const { backdrop, drawer, menuIcon, closeIcon } = getElements()
	if (!backdrop || !drawer) return

	isOpen = true
	scrollPosition = window.scrollY

	document.body.classList.add("overflow-hidden")
	document.body.style.top = `-${scrollPosition}px`

	drawer.classList.remove("translate-x-full")
	backdrop.classList.remove("hidden")

	requestAnimationFrame(() => {
		backdrop.classList.remove("opacity-0")
		menuIcon?.classList.add("hidden")
		closeIcon?.classList.remove("hidden")
	})
}

function closeMenu(): void {
	const { backdrop, drawer, menuIcon, closeIcon } = getElements()
	if (!backdrop || !drawer || !isOpen) return

	isOpen = false

	document.body.classList.remove("overflow-hidden")
	document.body.style.top = ""
	document.body.style.position = ""
	document.body.style.width = ""

	drawer.classList.add("translate-x-full")
	backdrop.classList.add("opacity-0")

	setTimeout(() => {
		backdrop.classList.add("hidden")
		menuIcon?.classList.remove("hidden")
		closeIcon?.classList.add("hidden")
	}, 300)

	window.scrollTo(0, scrollPosition)
}

function toggleMenu(): void {
	isOpen ? closeMenu() : openMenu()
}

function attachMenuListeners(): void {
	const { btn, closeBtn, backdrop } = getElements()

	btn?.addEventListener("click", toggleMenu)
	closeBtn?.addEventListener("click", closeMenu)
	backdrop?.addEventListener("click", closeMenu)

	document.addEventListener("keydown", (e: KeyboardEvent) => {
		if (e.key === "Escape" && isOpen) {
			closeMenu()
		}
	})

	document.querySelectorAll(".mobile-nav-link").forEach(link => {
		link.addEventListener("click", closeMenu)
	})
}

function initMobileMenu(): void {
	if (typeof document === "undefined") return

	attachMenuListeners()

	document.addEventListener("astro:after-swap", () => {
		isOpen = false
		attachMenuListeners()
	})
}

initMobileMenu()
