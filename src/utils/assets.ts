export const ASSETS = {
	LOGOS: {
		MONOGRAM: "/logo.svg",
		FULL: "/full-logo.svg",
	},
	HOME: {
		HERO: "/images/hero.jpg",
	},
	ABOUT: {
		MAIN: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop",
	},
	CONTACT: {
		MAP: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19441.896017543613!2d-3.8!3d40.28!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1600000000000!5m2!1ses!2ses",
	},
	MANIFEST: "/manifest.json",
} as const

export type AssetPath = string
