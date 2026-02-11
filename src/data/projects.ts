export interface Project {
	id: number
	title: string
	location: string
	year: number
	description: string
	images: string[]
}

export const projects: Project[] = [
	{
		id: 1,
		title: "Reforma Integral Barrio Salamanca",
		location: "Madrid",
		year: 2024,
		description:
			"Renovación completa de un piso de 120m2. Se redistribuyeron los espacios para crear un salón-comedor diáfano y se actualizaron todas las instalaciones.",
		images: [
			"https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1600566752355-35792bedcfe1?q=80&w=800&auto=format&fit=crop",
		],
	},
	{
		id: 2,
		title: "Chalet Unifamiliar Pozuelo",
		location: "Pozuelo de Alarcón",
		year: 2023,
		description:
			"Construcción de vivienda unifamiliar de diseño moderno. Estructura de hormigón visto y grandes ventanales para maximizar la luz natural.",
		images: [
			"https://images.unsplash.com/photo-1600596542815-3ad19fb2a211?q=80&w=800&auto=format&fit=crop",
			"https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
		],
	},
	{
		id: 3,
		title: "Rehabilitación Fachada Centro",
		location: "Madrid Centro",
		year: 2024,
		description:
			"Restauración de fachada protegida. Limpieza de piedra, reparación de cornisas y pintura con materiales tradicionales.",
		images: ["https://images.unsplash.com/photo-1599809275372-b403641738d2?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 4,
		title: "Reforma Cocina y Baños",
		location: "Getafe",
		year: 2025,
		description: "Actualización de zonas húmedas. Mobiliario a medida, encimeras de porcelánico y grifería empotrada.",
		images: ["https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 5,
		title: "Ático con Terraza",
		location: "Madrid",
		year: 2023,
		description: "Reforma de ático incluyendo impermeabilización y solado de terraza exterior.",
		images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 6,
		title: "Reforma Completa Chamberí",
		location: "Madrid",
		year: 2024,
		description:
			"Renovación integral de vivienda histórica. Recuperación de molduras originales y modernización de instalaciones.",
		images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 7,
		title: "Local Comercial Gran Vía",
		location: "Madrid",
		year: 2024,
		description:
			"Adecuación de local comercial para tienda de moda. Instalación de iluminación LED y mobiliario expositor.",
		images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 8,
		title: "Duplex en Aravaca",
		location: "Aravaca",
		year: 2023,
		description: "Reforma de duplex con ampliación de cocina abierta al salón. Instalación de sistema domótico.",
		images: ["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 9,
		title: "Reforma Baño de Lujo",
		location: "Madrid",
		year: 2025,
		description: "Baño principal con materiales de alta gama. Mármol nacional, grifería termostática y suelo radiante.",
		images: ["https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 10,
		title: "Oficina Startup",
		location: "Madrid",
		year: 2024,
		description: "Espacio de oficina open space para startup tecnológica. Mobiliario ergonómico y salas de reunión.",
		images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 11,
		title: "Casa de Pueblo Valdemoro",
		location: "Valdemoro",
		year: 2023,
		description:
			"Rehabilitación integral de vivienda antigua. Conservación de elementos originales y mejora energética.",
		images: ["https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=800&auto=format&fit=crop"],
	},
	{
		id: 12,
		title: "Cocina Abierta",
		location: "Madrid",
		year: 2024,
		description:
			"Apertura de cocina al salón tirando tabique maestro. Refuerzo con viga de acero y campaña extractora silenciosa.",
		images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop"],
	},
]
